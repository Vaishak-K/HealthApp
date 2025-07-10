export interface FieldMapping {
  label: string;
  path: string;
  unit?: string;
  format?: "number" | "text" | "percentage";
  icon?: string;
  description?: string;
  showProgress?: boolean;
  progressLabels?: string[];
  classification?: {
    ranges: Array<{
      min: number;
      max: number;
      label: string;
      color: string;
    }>;
  };
}

export interface SectionConfig {
  title: string;
  fields: FieldMapping[];
}

export interface AssessmentConfig {
  [assessmentId: string]: {
    title: string;
    sections: SectionConfig[];
  };
}
export interface SectionConfig {
  title: string;
  icon?: string;
  fields: FieldMapping[];
}

export const assessmentConfig: AssessmentConfig = {
  as_hr_02: {
    title: "Health & Fitness Assessment Report",
    sections: [
      {
        title: "Key Body Vitals",
        icon: "🫀",
        fields: [
          {
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "beats/min",
            format: "number",
            icon: "❤️",
            description:
              "The heart rate is the number of times heart beats in a minute. A normal resting heart rate for adults ranges from 60 to 100 beats per minute.",
            showProgress: true,
            progressLabels: ["30", "60", "100", "220"],
            classification: {
              ranges: [
                { min: 0, max: 60, label: "Low", color: "#3B82F6" },
                { min: 60, max: 100, label: "Normal", color: "#10B981" },
                { min: 100, max: 220, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Respiration Rate",
            path: "vitalsMap.vitals.resp_rate",
            unit: "breaths/min",
            format: "number",
            icon: "🫁",
            description:
              "The respiration rate is the number of breaths taken per minute. It is typically measured at rest by counting the chest rises for one minute.",
            showProgress: true,
            progressLabels: ["6", "12", "21", "30"],
            classification: {
              ranges: [
                { min: 0, max: 12, label: "Low", color: "#3B82F6" },
                { min: 12, max: 21, label: "Normal", color: "#10B981" },
                { min: 21, max: 30, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Oxygen Saturation",
            path: "vitalsMap.vitals.oxy_sat_prcnt",
            unit: "%",
            format: "percentage",
            icon: "🩸",
            description:
              "Oxygen saturation (SpO2) is the measurement of how much oxygen the blood is carrying as a percentage of the maximum it could carry.",
            showProgress: true,
            progressLabels: ["80", "91", "94", "100"],
            classification: {
              ranges: [
                { min: 0, max: 91, label: "Very Low", color: "#DC2626" },
                { min: 91, max: 94, label: "Low", color: "#F59E0B" },
                { min: 94, max: 100, label: "Normal", color: "#10B981" },
              ],
            },
          },
          {
            label: "Blood Pressure",
            path: "vitalsMap.vitals.bp_sys|vitalsMap.vitals.bp_dia",
            unit: "mmHg",
            format: "text",
            icon: "🩺",
            description:
              "Blood pressure is a measure of the force that the heart uses to pump blood around the body. Blood pressure is measured in millimeters of mercury (mmHg) and is given as 2 figures: Systolic pressure - the pressure when your heart pushes blood out Diastolic pressure - the pressure when your heart rests between beats.",
            classification: {
              ranges: [
                { min: 120, max: 140, label: "High", color: "#F59E0B" },
                { min: 90, max: 120, label: "Normal", color: "#10B981" },
                { min: 0, max: 90, label: "Low", color: "#3B82F6" },
              ],
            },
          },
        ],
      },
      {
        title: "Heart Health",
        fields: [
          {
            label: "SDNN",
            path: "vitalsMap.metadata.heart_scores.sdnn",
            unit: "MS",
            format: "number",
            icon: "💓",
            description:
              "The standard deviation of all of the NN intervals (the time intervals between each heartbeat). Higher numbers usually indicate that your body is coping better with stress.",
            showProgress: true,
            progressLabels: ["0", "30", "96", "150"],
            classification: {
              ranges: [
                { min: 0, max: 30, label: "Low", color: "#EF4444" },
                { min: 30, max: 96, label: "Normal", color: "#10B981" },
                { min: 96, max: 150, label: "High", color: "#3B82F6" },
              ],
            },
          },
          {
            label: "RMSSD",
            path: "vitalsMap.metadata.heart_scores.rmssd",
            unit: "MS",
            format: "number",
            icon: "💓",
            description:
              "The root mean square of successive intervals between normal heartbeats (RMSSD). RMSSD is obtained by first calculating each successive time intervals between heartbeats in msec.",
            showProgress: true,
            progressLabels: ["0", "20", "90", "150"],
            classification: {
              ranges: [
                { min: 0, max: 20, label: "Low", color: "#EF4444" },
                { min: 20, max: 90, label: "Normal", color: "#10B981" },
                { min: 90, max: 150, label: "High", color: "#3B82F6" },
              ],
            },
          },
          {
            label: "PNN50",
            path: "vitalsMap.metadata.heart_scores.pNN50_per",
            unit: "%",
            format: "percentage",
            icon: "💓",
            description:
              "PNN50 is the proportion of adjacent N-N intervals differing by more than 50 msec. pNN50 lower than 3% is considered indicative of high risk",
            showProgress: true,
            progressLabels: ["0", "5", "41", "90"],
            classification: {
              ranges: [
                { min: 0, max: 5, label: "Low", color: "#EF4444" },
                { min: 5, max: 41, label: "Normal", color: "#10B981" },
                { min: 41, max: 90, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Cardiac Output",
            path: "vitalsMap.metadata.cardiovascular.cardiac_out",
            unit: "L/M",
            format: "number",
            icon: "🫀",
            description:
              "The amount of blood heart pumps through the circulatory system in a minute. Cardiac output in humans is generally 4-8 L/min in an at-rest.",
            showProgress: true,
            progressLabels: ["0", "4", "8", "10"],
            classification: {
              ranges: [
                { min: 0, max: 4, label: "Low", color: "#EF4444" },
                { min: 4, max: 8, label: "Normal", color: "#10B981" },
                { min: 8, max: 10, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Mean Arterial Pressure",
            path: "vitalsMap.metadata.cardiovascular.map",
            unit: "mmHg",
            format: "number",
            icon: "🩺",
            description:
              "MAP is the average arterial pressure throughout one heart cycle. MAP anything between 70 and 100 mmHg is considered to be normal.",
            showProgress: true,
            progressLabels: ["0", "70", "100", "130"],
            classification: {
              ranges: [
                { min: 0, max: 70, label: "Low", color: "#EF4444" },
                { min: 70, max: 100, label: "Normal", color: "#10B981" },
                { min: 100, max: 130, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Heart Utilised",
            path: "vitalsMap.metadata.heart_scores.heart_utilized",
            unit: "%",
            format: "percentage",
            icon: "❤️",
            description:
              "Heart utilization is the percentage of overall heart usage to its maximum peak heart rate. Generally less than 50% utilization at rest and 51-85% utilization at moderate intensity is considered as normal.",
            showProgress: true,
            progressLabels: ["20", "41", "71", "100"],
            classification: {
              ranges: [
                { min: 0, max: 41, label: "Low", color: "#3B82F6" },
                { min: 41, max: 71, label: "Normal", color: "#10B981" },
                { min: 71, max: 100, label: "High", color: "#F59E0B" },
              ],
            },
          },
        ],
      },
      {
        title: "Stress Level",
        fields: [
          {
            label: "Stress Index",
            path: "vitalsMap.metadata.heart_scores.stress_index",
            format: "number",
            icon: "🧘",
            description:
              "Stress is the reaction to everyday pressure due to emotional or physical tension. Stress Index < 1.5 is considered to be normal",
            classification: {
              ranges: [
                { min: 0, max: 1.5, label: "NORMAL", color: "#10B981" },
                { min: 1.5, max: 3, label: "MODERATE", color: "#F59E0B" },
                { min: 3, max: 10, label: "HIGH", color: "#EF4444" },
              ],
            },
          },
        ],
      },
      {
        title: "Fitness Levels",
        fields: [
          {
            label: "Cardiovascular Endurance",
            path: "exercises[id=235].setList[0].time",
            unit: "sec",
            format: "number",
            icon: "🏃",
            description:
              "Cardiovascular endurance is the ability of the heart and lungs to sustain prolonged physical activity, crucial for overall health, athletic performance, and reducing fatigue.",
            classification: {
              ranges: [
                { min: 0, max: 30, label: "Poor", color: "#EF4444" },
                { min: 30, max: 45, label: "Fair", color: "#F59E0B" },
                { min: 45, max: 60, label: "Good", color: "#10B981" },
                { min: 60, max: 120, label: "Great", color: "#059669" },
              ],
            },
          },
          {
            label: "Muscular Endurance",
            path: "exercises[id=259].correctReps",
            unit: "",
            format: "number",
            icon: "💪",
            description:
              "Muscular endurance is the ability of muscles to perform repeated contractions over time, crucial for daily activities, athletic performance, and injury prevention.",
            classification: {
              ranges: [
                { min: 0, max: 20, label: "Poor", color: "#EF4444" },
                { min: 20, max: 30, label: "Fair", color: "#F59E0B" },
                { min: 30, max: 40, label: "Good", color: "#10B981" },
                { min: 40, max: 100, label: "Great", color: "#059669" },
              ],
            },
          },
          {
            label: "Flexibility",
            path: "exercises[id=281].setList[0].additionalFields[fieldName=accuracy].fieldValue",
            unit: "",
            format: "percentage",
            icon: "🤸",
            description:
              "Flexibility is the ability of muscles and joints to move through their full range of motion, enhancing daily activities, athletic performance, and reducing injury risk.",
            classification: {
              ranges: [
                { min: 0, max: 40, label: "Poor", color: "#EF4444" },
                { min: 40, max: 60, label: "Normal", color: "#F59E0B" },
                { min: 60, max: 80, label: "Good", color: "#10B981" },
                { min: 80, max: 100, label: "Great", color: "#059669" },
              ],
            },
          },
        ],
      },
      {
        title: "Posture",
        fields: [
          {
            label: "Front Posture",
            path: "exercises[id=73].analysisScore",
            unit: "",
            format: "number",
            icon: "🧍",
            showProgress: true,
            progressLabels: ["0", "35", "70", "100"],
            classification: {
              ranges: [
                { min: 0, max: 35, label: "Very Low", color: "#EF4444" },
                { min: 35, max: 70, label: "Low", color: "#F59E0B" },
                { min: 70, max: 100, label: "Normal", color: "#10B981" },
              ],
            },
          },
          {
            label: "Side Posture",
            path: "exercises[id=74].analysisScore",
            unit: "",
            format: "number",
            icon: "🚶",
            showProgress: true,
            progressLabels: ["0", "35", "70", "100"],
            classification: {
              ranges: [
                { min: 0, max: 35, label: "Very Low", color: "#EF4444" },
                { min: 35, max: 70, label: "Low", color: "#F59E0B" },
                { min: 70, max: 100, label: "Normal", color: "#10B981" },
              ],
            },
          },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          {
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²",
            format: "number",
            icon: "📊",
            description:
              "BMI is the measure of body fat based on height and weight. The normal range of BMI is 18.5 - 24.9 kg/m2.",
            showProgress: true,
            progressLabels: ["0", "18.5", "24.9", "29.9", "40"],
            classification: {
              ranges: [
                { min: 0, max: 18.5, label: "Low", color: "#3B82F6" },
                { min: 18.5, max: 24.9, label: "Normal", color: "#10B981" },
                { min: 24.9, max: 29.9, label: "High", color: "#F59E0B" },
                { min: 29.9, max: 100, label: "Obese", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Body Fat Percentage",
            path: "bodyCompositionData.BFC",
            unit: "%",
            format: "percentage",
            icon: "🏋️",
            description:
              "The percentage of your total body weight that is made up of fat mass. It is strongly correlated with obesity-related and cardiovascular health risks. Body fat percentage reference ranges are age and gender specific.",
            showProgress: true,
            progressLabels: ["0", "10", "25", "100"],
            classification: {
              ranges: [
                { min: 0, max: 10, label: "Low", color: "#3B82F6" },
                { min: 10, max: 25, label: "Normal", color: "#10B981" },
                { min: 25, max: 100, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "A/G Ratio",
            path: "bodyCompositionData.AGR",
            unit: "",
            format: "number",
            icon: "📏",
            description:
              "Linked to an increased risk of metabolic syndrome and obesity-related health risks. Android Fat Percentage: Concentrated in the abdomen and waist, is linked to visceral fat. Gynoid Fat Percentage: Concentrated in the hips, thighs, and buttocks, creates a 'pear shape' common in women.",
            showProgress: true,
            progressLabels: ["0", "0.9", "1", "100"],
            classification: {
              ranges: [
                { min: 0, max: 0.9, label: "Low", color: "#10B981" },
                { min: 0.9, max: 1, label: "Normal", color: "#F59E0B" },
                { min: 1, max: 100, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Lean Mass Index",
            path: "bodyCompositionData.LMI",
            unit: "kg/m2",
            format: "number",
            icon: "💪",
            description:
              "Measure of muscularity based on lean mass and height and is correlated with both fitness and health outcomes. A higher LMI indicates more muscularity.",
            showProgress: true,
            progressLabels: ["0", "10.5", "13.5", "40"],
            classification: {
              ranges: [
                { min: 0, max: 10.5, label: "Low", color: "#EF4444" },
                { min: 10.5, max: 13.5, label: "Normal", color: "#10B981" },
                { min: 13.5, max: 40, label: "High", color: "#059669" },
              ],
            },
          },
          {
            label: "Fat Mass Index",
            path: "bodyCompositionData.FMI",
            unit: "kg/m2",
            format: "number",
            icon: "📊",
            description:
              "Measure of excess fat, not including lean mass. Unlike BMI, FMI provides a gender-specific measure of fat that is not confounded by lean mass.",
            showProgress: true,
            progressLabels: ["0", "5", "9", "40"],
            classification: {
              ranges: [
                { min: 0, max: 5, label: "Low", color: "#3B82F6" },
                { min: 5, max: 9, label: "Normal", color: "#10B981" },
                { min: 9, max: 40, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Waist-Hip Ratio",
            path: "bodyCompositionData.WHR",
            unit: "",
            format: "number",
            icon: "📐",
            description:
              "It is a measurement that compares the circumference of the waist to that of the hips. Important indicator of health in assessing the risk of cardiovascular diseases and metabolic disorders.",
            showProgress: true,
            progressLabels: ["0", "0.75", "0.86", "2"],
            classification: {
              ranges: [
                { min: 0, max: 0.75, label: "Low", color: "#10B981" },
                { min: 0.75, max: 0.86, label: "Moderate", color: "#F59E0B" },
                { min: 0.86, max: 2, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Waist-Height Ratio",
            path: "bodyCompositionData.WHGR",
            unit: "",
            format: "number",
            icon: "📏",
            description:
              "It is a measurement that compares the circumference of the waist to the height of an individual. It is a useful indicator of central obesity and related health risks.",
            showProgress: true,
            progressLabels: ["0", "0.5", "0.6", "1"],
            classification: {
              ranges: [
                { min: 0, max: 0.5, label: "Low", color: "#10B981" },
                { min: 0.5, max: 0.6, label: "Normal", color: "#10B981" },
                { min: 0.6, max: 1, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Metabolic Rate",
            path: "bodyCompositionData.BMR",
            unit: "kCal",
            format: "number",
            icon: "🔥",
            description:
              "It is the rate at which the body burns calories to maintain vital functions and perform activities, encompassing all processes like breathing, circulation, cell production, and digestion.",
            showProgress: true,
            progressLabels: ["0", "1600", "1800", "2499"],
            classification: {
              ranges: [
                { min: 0, max: 1600, label: "Low", color: "#3B82F6" },
                { min: 1600, max: 1800, label: "Normal", color: "#10B981" },
                { min: 1800, max: 2499, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Metabolic Age",
            path: "bodyCompositionData.M_Age",
            unit: "",
            format: "number",
            icon: "📅",
            description:
              "Metabolic age indicates how your body functions compared to your actual age, based on factors like metabolism, muscle mass, and fitness levels. A younger metabolic age suggests better overall health and fitness.",
            classification: {
              ranges: [
                { min: 0, max: 35, label: "Great", color: "#059669" },
                { min: 35, max: 45, label: "Good", color: "#10B981" },
                { min: 45, max: 55, label: "Normal", color: "#F59E0B" },
                { min: 55, max: 100, label: "Poor", color: "#EF4444" },
              ],
            },
          },
        ],
      },
    ],
  },
  as_card_01: {
    title: "Cardiac Assessment Report",
    sections: [
      {
        title: "Key Body Vitals",
        fields: [
          {
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "beats/min",
            format: "number",
            icon: "❤️",
            description:
              "The heart rate is the number of times heart beats in a minute. A normal resting heart rate for adults ranges from 60 to 100 beats per minute.",
            showProgress: true,
            progressLabels: ["30", "60", "100", "220"],
            classification: {
              ranges: [
                { min: 0, max: 60, label: "Low", color: "#3B82F6" },
                { min: 60, max: 100, label: "Normal", color: "#10B981" },
                { min: 100, max: 220, label: "High", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Blood Pressure",
            path: "vitalsMap.vitals.bp_sys|vitalsMap.vitals.bp_dia",
            unit: "mmHg",
            format: "text",
            icon: "🩺",
            description:
              "Blood pressure is a measure of the force that the heart uses to pump blood around the body.",
            classification: {
              ranges: [
                { min: 110, max: 140, label: "Normal", color: "#10B981" },
              ],
            },
          },
          {
            label: "Oxygen Saturation",
            path: "vitalsMap.vitals.oxy_sat_prcnt",
            unit: "%",
            format: "percentage",
            icon: "🩸",
            description:
              "Oxygen saturation (SpO2) is the measurement of how much oxygen the blood is carrying.",
            showProgress: true,
            progressLabels: ["80", "91", "94", "100"],
            classification: {
              ranges: [
                { min: 0, max: 91, label: "Very Low", color: "#DC2626" },
                { min: 91, max: 94, label: "Low", color: "#F59E0B" },
                { min: 94, max: 100, label: "Normal", color: "#10B981" },
              ],
            },
          },
          {
            label: "Respiratory Rate",
            path: "vitalsMap.vitals.resp_rate",
            unit: "breaths/min",
            format: "number",
            icon: "🫁",
            description: "The number of breaths taken per minute.",
            showProgress: true,
            progressLabels: ["6", "12", "21", "30"],
            classification: {
              ranges: [
                { min: 0, max: 12, label: "Low", color: "#3B82F6" },
                { min: 12, max: 21, label: "Normal", color: "#10B981" },
                { min: 21, max: 30, label: "High", color: "#EF4444" },
              ],
            },
          },
        ],
      },
      {
        title: "Cardiovascular Endurance",
        fields: [
          {
            label: "Cardiac Output",
            path: "vitalsMap.metadata.cardiovascular.cardiac_out",
            unit: "L/min",
            format: "number",
            icon: "🫀",
            description: "The amount of blood your heart pumps in one minute.",
            showProgress: true,
            progressLabels: ["0", "4", "8", "10"],
            classification: {
              ranges: [
                { min: 0, max: 4, label: "Low", color: "#EF4444" },
                { min: 4, max: 8, label: "Normal", color: "#10B981" },
                { min: 8, max: 10, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "MAP (Mean Arterial Pressure)",
            path: "vitalsMap.metadata.cardiovascular.map",
            unit: "mmHg",
            format: "number",
            icon: "🩺",
            description:
              "Average arterial pressure throughout one cardiac cycle.",
            showProgress: true,
            progressLabels: ["0", "70", "100", "130"],
            classification: {
              ranges: [
                { min: 0, max: 70, label: "Low", color: "#EF4444" },
                { min: 70, max: 100, label: "Normal", color: "#10B981" },
                { min: 100, max: 130, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Heart Rate Reserve",
            path: "vitalsMap.metadata.heart_scores.HRR",
            unit: "bpm",
            format: "text",
            icon: "💓",
            description:
              "The difference between maximum and resting heart rate.",
          },
          {
            label: "Exercise Performance",
            path: "exercises[id=235].setList[0].additionalFields[fieldName=accuracy].fieldValue",
            unit: "%",
            format: "percentage",
            icon: "🏃",
            description: "Your cardiovascular performance during the jog test.",
            classification: {
              ranges: [
                { min: 0, max: 40, label: "Poor", color: "#EF4444" },
                { min: 40, max: 70, label: "Fair", color: "#F59E0B" },
                { min: 70, max: 85, label: "Good", color: "#10B981" },
                { min: 85, max: 100, label: "Excellent", color: "#059669" },
              ],
            },
          },
        ],
      },
      {
        title: "Body Composition",
        fields: [
          {
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²",
            format: "number",
            icon: "📊",
            description:
              "Body Mass Index - a measure of body fat based on height and weight.",
            showProgress: true,
            progressLabels: ["0", "18.5", "24.9", "29.9", "40"],
            classification: {
              ranges: [
                { min: 0, max: 18.5, label: "Underweight", color: "#3B82F6" },
                { min: 18.5, max: 24.9, label: "Normal", color: "#10B981" },
                { min: 24.9, max: 29.9, label: "Overweight", color: "#F59E0B" },
                { min: 29.9, max: 100, label: "Obese", color: "#EF4444" },
              ],
            },
          },
          {
            label: "Body Fat",
            path: "bodyCompositionData.BFC",
            unit: "%",
            format: "percentage",
            icon: "🏋️",
            description: "Percentage of total body weight that is fat.",
            classification: {
              ranges: [
                { min: -100, max: 10, label: "Low", color: "#3B82F6" },
                { min: 10, max: 25, label: "Normal", color: "#10B981" },
                { min: 25, max: 100, label: "High", color: "#F59E0B" },
              ],
            },
          },
          {
            label: "Metabolic Age",
            path: "bodyCompositionData.M_Age",
            unit: "years",
            format: "number",
            icon: "📅",
            description:
              "How your body's metabolism compares to your chronological age.",
            classification: {
              ranges: [
                { min: 0, max: 35, label: "Excellent", color: "#059669" },
                { min: 35, max: 45, label: "Good", color: "#10B981" },
                { min: 45, max: 55, label: "Fair", color: "#F59E0B" },
                { min: 55, max: 100, label: "Poor", color: "#EF4444" },
              ],
            },
          },
        ],
      },
    ],
  },
};
