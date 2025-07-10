"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { reportApi } from "@/src/lib/api";

export default function ReportGenerator() {
  const [sessionId, setSessionId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!sessionId.trim()) {
      toast.error("Please enter a session ID");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await reportApi.generateReport(sessionId);
      toast.success(response.message);
      setSessionId("");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Generate Report
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="sessionId"
            className="block text-sm font-medium text-gray-700"
          >
            Session ID
          </label>
          <input
            type="text"
            id="sessionId"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Enter session ID (e.g., session_001)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate PDF Report"}
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Available session IDs for testing:</p>
        <ul className="list-disc list-inside mt-2">
          <li>session_001 (Health & Fitness Assessment)</li>
          <li>session_002 (Cardiac Assessment)</li>
        </ul>
      </div>
    </div>
  );
}
