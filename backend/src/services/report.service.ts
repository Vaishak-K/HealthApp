import { assessmentData } from "../data/data";
import { assessmentConfig } from "../config/assessment-config";
import { pdfDesignConfig } from "../config/pdf-design-config";
import { DataMapper } from "../utils/data-mapper.utils";
import { PDFService } from "./pdf.service";
import * as fs from "fs";
import * as path from "path";

export class ReportService {
  static async generateReport(sessionId: string): Promise<string> {
    // Find assessment data
    const assessment = assessmentData.find((a) => a.session_id === sessionId);
    if (!assessment) {
      throw new Error("Assessment not found");
    }

    // Get configuration for this assessment type
    const config = assessmentConfig[assessment.assessment_id];
    if (!config) {
      throw new Error("Configuration not found for assessment type");
    }

    // Extract user info
    const patientName = this.extractPatientName(assessment);
    const age = this.calculateAge(assessment);

    // Build report data with proper icon mapping
    const reportData = {
      title: config.title,
      sessionId: assessment.session_id,
      date: new Date(assessment.timestamp).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      patientName,
      gender: assessment.gender?.toUpperCase() || "N/A",
      age,
      healthScore: this.getHealthScore(assessment),
      sections: config.sections.map((section, sectionIndex) => ({
        title: section.title,
        sectionIcon: pdfDesignConfig.icons.sections[section.title] || "📊",
        singleColumn: section.fields.length <= 2,
        fields: section.fields.map((field) => {
          const rawValue = DataMapper.extractValue(assessment, field.path);
          const formattedValue = DataMapper.formatValue(rawValue, field.format);
          const numericValue = parseFloat(rawValue) || 0;
          const classification = field.classification
            ? DataMapper.classifyValue(numericValue, field.classification)
            : null;

          // Calculate progress percentage dynamically
          let progressPercentage = 0;
          let progressClass = "primary";

          if (field.showProgress && field.classification) {
            const ranges = field.classification.ranges;
            const minValue = Math.min(...ranges.map((r) => r.min));
            const maxValue = Math.max(...ranges.map((r) => r.max));

            // Calculate percentage based on actual value range
            progressPercentage =
              ((numericValue - minValue) / (maxValue - minValue)) * 100;
            progressPercentage = Math.max(0, Math.min(100, progressPercentage)); // Clamp between 0-100

            // Determine progress class based on classification
            if (classification) {
              const label = classification.label.toLowerCase();
              if (["normal", "good", "excellent", "great"].includes(label)) {
                progressClass = "success";
              } else if (
                ["warning", "fair", "moderate", "high"].includes(label)
              ) {
                progressClass = "warning";
              } else if (
                ["danger", "poor", "critical", "very low", "obese"].includes(
                  label
                )
              ) {
                progressClass = "danger";
              } else if (["low"].includes(label)) {
                // Low can be good or bad depending on context
                if (
                  field.label.includes("Stress") ||
                  field.label.includes("Heart Rate")
                ) {
                  progressClass = "success";
                } else {
                  progressClass = "warning";
                }
              }
            }
          }

          return {
            label: field.label,
            value: formattedValue,
            unit: field.unit,
            metricIcon: pdfDesignConfig.icons.metrics[field.label] || "",
            description: field.description,
            classification,
            showProgress: field.showProgress,
            progressLabels: field.progressLabels,
            progressPercentage: Math.round(progressPercentage),
            progressClass,
          };
        }),
      })),
      insights: this.generateInsights(assessment),
      recommendations: this.generateRecommendations(assessment),
    };

    // Generate PDF
    const pdfBuffer = await PDFService.generatePDF(reportData);

    // Save to filesystem
    const reportsDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filename = `report_${sessionId}_${Date.now()}.pdf`;
    const filepath = path.join(reportsDir, filename);

    fs.writeFileSync(filepath, pdfBuffer);

    return filename;
  }

  private static extractPatientName(assessment: any): string {
    if (assessment.patientName) return assessment.patientName;
    if (assessment.name) return assessment.name;
    if (assessment.user?.name) return assessment.user.name;
    return "John Doe";
  }

  private static calculateAge(assessment: any): string {
    if (assessment.age) return String(assessment.age);
    if (assessment.bodyCompositionData?.Age)
      return assessment.bodyCompositionData.Age;

    if (assessment.vitalsMap?.metadata?.physiological_scores?.dob) {
      const dob = new Date(
        assessment.vitalsMap.metadata.physiological_scores.dob
      );
      const age = new Date().getFullYear() - dob.getFullYear();
      return String(age);
    }

    return "25";
  }

  private static getHealthScore(assessment: any): any {
    const accuracy = assessment.accuracy || 0;
    const classification = DataMapper.classifyValue(accuracy, {
      ranges: [
        { min: 0, max: 40, label: "Poor", color: "#ef4444" },
        { min: 40, max: 70, label: "Fair", color: "#f59e0b" },
        { min: 70, max: 85, label: "Good", color: "#10b981" },
        { min: 85, max: 100, label: "Excellent", color: "#059669" },
      ],
    });

    return {
      value: accuracy,
      classification,
    };
  }

  private static generateInsights(assessment: any): string[] {
    const insights: string[] = [];
    const accuracy = assessment.accuracy || 0;

    // Health score insights
    if (accuracy >= 85) {
      insights.push(
        "🌟 Outstanding Performance: Your overall health score of " +
          accuracy +
          "% places you in the excellent category. This indicates exceptional physical fitness, proper body mechanics, and healthy vital signs. Continue maintaining your current lifestyle habits."
      );
    } else if (accuracy >= 70) {
      insights.push(
        "✅ Good Health Status: With a score of " +
          accuracy +
          "%, you're demonstrating good overall health. There are opportunities to enhance your fitness level through targeted improvements in specific areas identified in this report."
      );
    } else if (accuracy >= 40) {
      insights.push(
        "⚡ Room for Improvement: Your health score of " +
          accuracy +
          "% indicates fair fitness levels. Focus on the recommendations provided to gradually improve your physical condition and overall wellness."
      );
    } else {
      insights.push(
        "🎯 Health Priority Alert: Your score of " +
          accuracy +
          "% suggests significant opportunities for health improvement. Consider working with healthcare professionals to develop a comprehensive wellness plan."
      );
    }

    // BMI insights
    const bmi = parseFloat(assessment.bodyCompositionData?.BMI) || 0;
    if (bmi > 0) {
      if (bmi < 18.5) {
        insights.push(
          "📊 Body Composition: Your BMI of " +
            bmi.toFixed(1) +
            " indicates you're underweight. Focus on nutrient-dense foods and strength training to build healthy muscle mass."
        );
      } else if (bmi >= 18.5 && bmi < 25) {
        insights.push(
          "💪 Optimal Weight Range: Your BMI of " +
            bmi.toFixed(1) +
            " falls within the healthy range, supporting good metabolic function and reducing health risks."
        );
      } else if (bmi >= 25 && bmi < 30) {
        insights.push(
          "⚖️ Weight Management: With a BMI of " +
            bmi.toFixed(1) +
            ", you're slightly overweight. Small lifestyle changes can help you achieve a healthier weight range."
        );
      } else if (bmi >= 30) {
        insights.push(
          "🏥 Medical Attention Recommended: Your BMI of " +
            bmi.toFixed(1) +
            " indicates obesity. Consult healthcare providers for a safe, effective weight management program."
        );
      }
    }

    // Heart health insights
    const heartRate = assessment.vitalsMap?.vitals?.heart_rate;
    const stressIndex =
      assessment.vitalsMap?.metadata?.heart_scores?.stress_index;

    if (heartRate) {
      if (heartRate >= 60 && heartRate <= 100) {
        insights.push(
          "❤️ Cardiovascular Health: Your resting heart rate of " +
            heartRate +
            " bpm is within the normal range, indicating good cardiovascular efficiency."
        );
      } else if (heartRate < 60) {
        insights.push(
          "🏃 Athletic Heart Rate: Your resting heart rate of " +
            heartRate +
            " bpm is below average, which often indicates excellent cardiovascular fitness in athletes."
        );
      } else {
        insights.push(
          "⚠️ Elevated Heart Rate: Your resting heart rate of " +
            heartRate +
            " bpm is above normal. Consider stress reduction techniques and cardiovascular exercise."
        );
      }
    }

    if (stressIndex && stressIndex < 1.5) {
      insights.push(
        "🧘 Stress Management: Your stress index of " +
          stressIndex.toFixed(1) +
          " indicates excellent stress control. Your body is managing daily pressures effectively."
      );
    } else if (stressIndex && stressIndex >= 1.5) {
      insights.push(
        "😰 Stress Alert: Your stress index of " +
          stressIndex.toFixed(1) +
          " suggests elevated stress levels. Implement stress reduction strategies for better health."
      );
    }

    return insights;
  }

  private static generateRecommendations(assessment: any): any[] {
    const recommendations: any[] = [];
    const accuracy = assessment.accuracy || 0;
    const bmi = parseFloat(assessment.bodyCompositionData?.BMI) || 0;
    const stressIndex =
      assessment.vitalsMap?.metadata?.heart_scores?.stress_index;
    const vo2max =
      parseFloat(
        assessment.vitalsMap?.metadata?.physiological_scores?.vo2max
      ) || 0;

    // Exercise recommendations based on fitness level
    if (accuracy < 70 || vo2max < 40) {
      recommendations.push({
        icon: "🏃",
        title: "Cardiovascular Exercise Program",
        text: "Start with 20-30 minutes of moderate cardio 3x per week. Activities like brisk walking, swimming, or cycling will improve your cardiovascular endurance. Gradually increase duration and intensity as your fitness improves.",
      });
    } else {
      recommendations.push({
        icon: "💪",
        title: "Advanced Fitness Training",
        text: "Incorporate high-intensity interval training (HIIT) 2x per week and strength training 3x per week. This will help maintain your excellent fitness level and continue improving performance.",
      });
    }

    // Nutrition recommendations based on BMI
    if (bmi >= 25) {
      recommendations.push({
        icon: "🥗",
        title: "Nutritional Optimization",
        text: "Focus on portion control and nutrient-dense foods. Aim for a balanced plate: 50% vegetables, 25% lean protein, 25% whole grains. Track your intake and maintain a moderate caloric deficit for healthy weight loss.",
      });
    } else if (bmi < 18.5) {
      recommendations.push({
        icon: "🍽️",
        title: "Healthy Weight Gain Strategy",
        text: "Increase caloric intake with nutrient-rich foods. Add healthy snacks between meals, include protein with each meal, and consider strength training to build muscle mass.",
      });
    } else {
      recommendations.push({
        icon: "🥦",
        title: "Maintain Balanced Nutrition",
        text: "Continue your current balanced eating habits. Focus on whole foods, adequate hydration, and mindful eating practices to maintain your healthy weight.",
      });
    }

    // Stress management recommendations
    if (stressIndex && stressIndex > 1.5) {
      recommendations.push({
        icon: "🧘",
        title: "Stress Reduction Techniques",
        text: "Practice daily meditation or deep breathing exercises for 10-15 minutes. Consider yoga, progressive muscle relaxation, or mindfulness apps. Ensure 7-9 hours of quality sleep nightly.",
      });
    }

    // Posture recommendations
    const frontPosture = assessment.exercises?.find(
      (e: any) => e.id === 73
    )?.analysisScore;
    const sidePosture = assessment.exercises?.find(
      (e: any) => e.id === 74
    )?.analysisScore;

    if (
      (frontPosture && frontPosture < 70) ||
      (sidePosture && sidePosture < 70)
    ) {
      recommendations.push({
        icon: "🧍",
        title: "Posture Correction Program",
        text: "Perform daily posture exercises including wall angels, cat-cow stretches, and plank holds. Set hourly reminders to check and correct your posture. Consider ergonomic workspace adjustments.",
      });
    }

    // Recovery and flexibility
    recommendations.push({
      icon: "🛌",
      title: "Recovery and Flexibility",
      text: "Dedicate 10-15 minutes daily to stretching and mobility work. Include foam rolling, dynamic stretches before exercise, and static stretches after. Prioritize rest days for optimal recovery.",
    });

    // Regular health monitoring
    recommendations.push({
      icon: "📊",
      title: "Regular Health Monitoring",
      text: "Schedule follow-up assessments every 3-6 months to track progress. Keep a health journal documenting exercise, nutrition, and how you feel. This helps identify patterns and optimize your health strategy.",
    });

    return recommendations;
  }
}
