import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class ReportController {
  static async generateReport(req: AuthRequest, res: Response) {
    try {
      const { session_id } = req.body;

      if (!session_id) {
        return res.status(400).json({ error: "session_id is required" });
      }

      const filename = await ReportService.generateReport(session_id);

      res.json({
        success: true,
        message: "Report generated successfully",
        filename,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
