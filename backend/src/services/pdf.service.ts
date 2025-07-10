import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import { baseTemplate, registerHelpers } from "../config/report-templates";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";

export class PDFService {
  private static getChromePath(): string | undefined {
    const platform = os.platform();

    if (platform === "win32") {
      const paths = [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        `${os.homedir()}\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`,
      ];

      for (const chromePath of paths) {
        if (fs.existsSync(chromePath)) {
          return chromePath;
        }
      }
    } else if (platform === "darwin") {
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    } else {
      return "/usr/bin/google-chrome";
    }

    return undefined;
  }

  static async generatePDF(data: any): Promise<Buffer> {
    // Register Handlebars helpers
    registerHelpers();

    // Compile template
    const template = Handlebars.compile(baseTemplate);
    const html = template(data);

    // Save HTML for debugging (optional)
    const debugDir = path.join(process.cwd(), "debug");
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }
    fs.writeFileSync(path.join(debugDir, "report.html"), html);

    // Try to find Chrome executable
    const executablePath = this.getChromePath();

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
      ...(executablePath && { executablePath }),
    });

    try {
      const page = await browser.newPage();

      // Set viewport for A4 size
      await page.setViewport({
        width: 794, // A4 width at 96 DPI
        height: 1123, // A4 height at 96 DPI
        deviceScaleFactor: 2, // For better quality
      });

      // Set content with proper encoding
      await page.setContent(html, {
        waitUntil: ["domcontentloaded", "networkidle0"],
        timeout: 30000,
      });

      // Wait for any animations or dynamic content
      await page.waitForTimeout(2000);

      // Evaluate page to ensure all dynamic widths are set
      await page.evaluate(() => {
        // Force all progress bars to render with their width
        const progressBars = document.querySelectorAll<HTMLElement>(
          ".progress-fill, .score-bar"
        );
        progressBars.forEach((bar) => {
          if (bar.style.width) {
            bar.style.transition = "none";
            bar.offsetHeight; // Force reflow
          }
        });
      });

      // Generate PDF with high quality settings
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: "0mm",
          right: "0mm",
          bottom: "0mm",
          left: "0mm",
        },
        displayHeaderFooter: false,
        scale: 1,
        pageRanges: "",
        timeout: 30000,
      });

      return pdfBuffer;
    } catch (error) {
      console.error("PDF generation error:", error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}