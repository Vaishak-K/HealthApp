interface IconMap {
  [key: string]: string;
}

export const pdfDesignConfig = {
  icons: {
    sections: {
      "Key Body Vitals": "🫀",
      "Heart Health": "❤️",
      "Stress Level": "🧠",
      "Fitness Levels": "💪",
      Posture: "🧍",
      "Posture Analysis": "🧍",
      "Body Composition": "📊",
      "Cardiovascular Endurance": "🏃",
    } as IconMap,
    metrics: {
      "Heart Rate": "❤️",
      "Blood Pressure": "🩺",
      "Oxygen Saturation": "🩸",
      "Respiration Rate": "🫁",
      "Respiratory Rate": "🫁",
      SDNN: "💓",
      RMSSD: "💓",
      PNN50: "💓",
      "Cardiac Output": "🫀",
      "Mean Arterial Pressure": "🩺",
      "Stress Index": "🧘",
      BMI: "📊",
      "Body Fat Percentage": "🏋️",
    } as IconMap,
  },
  colors: {
    primary: "#5046e5",
    secondary: "#7c3aed",
    accent: "#ec4899",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    dark: "#1e293b",
    gray: "#64748b",
    lightGray: "#f1f5f9",
  },
};
