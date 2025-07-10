import express from "express";
import cors from "cors";
import { AuthController } from "./controllers/auth.controller";
import { ReportController } from "./controllers/report.controller";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/auth/register", AuthController.register);
app.post("/api/auth/login", AuthController.login);
app.post(
  "/api/generate-report",
  authMiddleware,
  ReportController.generateReport
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
