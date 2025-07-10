export const baseTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #5046e5;
            --primary-light: #6366f1;
            --primary-dark: #4338ca;
            --secondary: #7c3aed;
            --accent: #ec4899;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --dark: #0f172a;
            --gray: #64748b;
            --light-gray: #f8fafc;
            --border-light: #e2e8f0;
            --white: #ffffff;
        }
        
        @page {
            size: A4;
            margin: 0;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--dark);
            background: var(--white);
            font-size: 11pt;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 0;
            margin: 0;
            background: white;
            position: relative;
        }
        
        /* Page break controls */
        .page-break {
            page-break-after: always;
            break-after: always;
        }
        
        .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        .keep-together {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        
        /* Premium Header Design */
        .header {
            position: relative;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 40px 40px 50px 40px;
            margin: 0;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 70%;
            height: 200%;
            background: rgba(255, 255, 255, 0.05);
            transform: rotate(35deg);
            pointer-events: none;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: white;
            border-radius: 30px 30px 0 0;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
            max-width: 100%;
        }
        
        .report-title {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 30px;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .report-meta {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 16px;
            backdrop-filter: blur(10px);
        }
        
        .meta-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .meta-label {
            font-size: 11px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 500;
        }
        
        .meta-value {
            font-size: 18px;
            font-weight: 700;
        }
        
        /* Content Container */
        .content {
            padding: 40px;
            margin: 0;
        }
        
        /* Executive Summary Card */
        .executive-summary {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
            border-radius: 24px;
            padding: 40px;
            margin-bottom: 40px;
            border: 2px solid #dbeafe;
            position: relative;
            overflow: hidden;
        }
        
        .executive-summary::before {
            content: '';
            position: absolute;
            top: -100px;
            right: -100px;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .summary-header {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-dark);
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .score-display {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        
        .score-info h3 {
            font-size: 16px;
            color: var(--gray);
            font-weight: 500;
            margin-bottom: 8px;
        }
        
        .score-value {
            font-size: 72px;
            font-weight: 900;
            color: var(--primary);
            line-height: 1;
            text-align: right;
        }
        
        .score-visual {
            position: relative;
            height: 16px;
            background: #e0e7ff;
            border-radius: 100px;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
        }
        
        .score-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
            border-radius: 100px;
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        }
        
        .score-scale {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            font-size: 11px;
            color: var(--gray);
            font-weight: 500;
        }
        
        /* Section Styling */
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 28px;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--border-light);
        }
        
        .section-icon {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            margin-right: 16px;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }
        
        .section-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--dark);
            letter-spacing: -0.3px;
        }
        
        /* Metrics Grid */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .metrics-grid.single-column {
            grid-template-columns: 1fr;
        }
        
        /* Metric Card Design */
        .metric-card {
            background: var(--white);
            border: 2px solid var(--border-light);
            border-radius: 16px;
            padding: 24px;
            position: relative;
            transition: all 0.3s ease;
            page-break-inside: avoid;
        }
        
        .metric-card.highlighted {
            background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);
            border-color: #fde047;
        }
        
        .metric-card.success {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-color: #86efac;
        }
        
        .metric-card.warning {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border-color: #fde68a;
        }
        
        .metric-card.danger {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: #fecaca;
        }
        
        .metric-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        
        .metric-label {
            font-size: 14px;
            font-weight: 600;
            color: var(--dark);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .metric-badge {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .metric-badge.normal {
            background: #dcfce7;
            color: #16a34a;
        }
        
        .metric-badge.high,
        .metric-badge.warning {
            background: #fef3c7;
            color: #d97706;
        }
        
        .metric-badge.low {
            background: #dbeafe;
            color: #2563eb;
        }
        
        .metric-badge.danger,
        .metric-badge.critical {
            background: #fee2e2;
            color: #dc2626;
        }
        
        .metric-description {
            font-size: 11px;
            color: var(--gray);
            line-height: 1.5;
            margin-bottom: 16px;
        }
        
        .metric-value-row {
            display: flex;
            align-items: baseline;
            gap: 6px;
            margin-bottom: 16px;
        }
        
        .metric-value {
            font-size: 32px;
            font-weight: 800;
            color: var(--dark);
            line-height: 1;
        }
        
        .metric-unit {
            font-size: 13px;
            color: var(--gray);
            font-weight: 500;
        }
        
        /* Dynamic Progress Bar */
        .progress-container {
            margin-top: 12px;
        }
        
        .progress-bar {
            position: relative;
                        height: 10px;
            background: var(--light-gray);
            border-radius: 100px;
            overflow: visible;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .progress-fill {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 100px;
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .progress-fill.success {
            background: linear-gradient(90deg, #34d399 0%, #10b981 100%);
        }
        
        .progress-fill.warning {
            background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
        }
        
        .progress-fill.danger {
            background: linear-gradient(90deg, #f87171 0%, #ef4444 100%);
        }
        
        .progress-fill.primary {
            background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
        }
        
        .progress-marker {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 18px;
            height: 18px;
            background: white;
            border: 3px solid var(--primary);
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            z-index: 2;
        }
        
        .progress-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 10px;
            color: var(--gray);
            font-weight: 500;
        }
        
        /* Special Visual Cards */
        .highlight-card {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            border-radius: 20px;
            padding: 32px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
            page-break-inside: avoid;
        }
        
        .highlight-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 60%;
            height: 200%;
            background: rgba(255, 255, 255, 0.1);
            transform: rotate(35deg);
        }
        
        .highlight-content {
            position: relative;
            z-index: 1;
        }
        
        .highlight-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .highlight-text {
            font-size: 14px;
            line-height: 1.8;
            opacity: 0.95;
        }
        
        /* Insights Section */
        .insights-container {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .insights-header {
            font-size: 22px;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .insight-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-left: 4px solid var(--primary);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }
        
        .insight-text {
            font-size: 13px;
            color: var(--dark);
            line-height: 1.7;
        }
        
        /* Recommendations Grid */
        .recommendations-container {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .recommendations-header {
            font-size: 22px;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .recommendations-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        
        .recommendation-card {
            background: white;
            border: 2px solid var(--border-light);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
            page-break-inside: avoid;
        }
        
        .recommendation-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin-bottom: 16px;
        }
        
        .recommendation-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 12px;
        }
        
        .recommendation-text {
            font-size: 12px;
            color: var(--gray);
            line-height: 1.6;
        }
        
        /* Footer Design */
        .footer {
            margin-top: 60px;
            padding: 40px;
            background: var(--light-gray);
            border-top: 2px solid var(--border-light);
            page-break-inside: avoid;
        }
        
        .disclaimer {
            background: white;
            border: 2px solid #fde68a;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
        }
        
        .disclaimer-header {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
            color: #d97706;
            margin-bottom: 12px;
        }
        
        .disclaimer-text {
            font-size: 12px;
            color: var(--dark);
            line-height: 1.6;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            margin-top: 30px;
        }
        
        .footer-section h4 {
            font-size: 14px;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 12px;
        }
        
        .footer-section p {
            font-size: 12px;
            color: var(--gray);
            line-height: 1.6;
        }
        
        /* Utility Classes */
        .text-center {
            text-align: center;
        }
        
        .mt-20 {
            margin-top: 20px;
        }
        
        .mt-30 {
            margin-top: 30px;
        }
        
        .mt-40 {
            margin-top: 40px;
        }
        
        /* Print Optimizations */
        @media print {
            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .page {
                margin: 0;
                box-shadow: none;
            }
            
            .metric-card,
            .insight-card,
            .recommendation-card {
                box-shadow: none !important;
            }
        }
    </style>
</head>
<body>
    <!-- Page 1 -->
    <div class="page">
        <!-- Premium Header -->
        <div class="header">
            <div class="header-content">
                <h1 class="report-title">{{title}}</h1>
                <div class="report-meta">
                    <div class="meta-item">
                        <span class="meta-label">Patient Name</span>
                        <span class="meta-value">{{patientName}}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Assessment Date</span>
                        <span class="meta-value">{{date}}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Gender / Age</span>
                        <span class="meta-value">{{gender}} / {{age}} years</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Report ID</span>
                        <span class="meta-value">{{sessionId}}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <!-- Executive Summary -->
            {{#if healthScore}}
            <div class="executive-summary">
                <h2 class="summary-header">
                    <span>📊</span>
                    Overall Health Assessment
                </h2>
                <div class="score-display">
                    <div class="score-info">
                        <h3>Your comprehensive health score based on all assessments</h3>
                    </div>
                    <div class="score-value">{{healthScore.value}}</div>
                </div>
                <div class="score-visual">
                    <div class="score-bar" style="width: {{healthScore.value}}%;"></div>
                </div>
                <div class="score-scale">
                    <span>0</span>
                    <span>Poor (0-40)</span>
                    <span>Fair (40-70)</span>
                    <span>Good (70-85)</span>
                    <span>Excellent (85-100)</span>
                </div>
            </div>
            {{/if}}
            
            <!-- First sections that fit on page 1 -->
            {{#each sections}}
            {{#if @first}}
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">{{sectionIcon}}</div>
                    <h2 class="section-title">{{title}}</h2>
                </div>
                
                <div class="metrics-grid">
                    {{#each fields}}
                    <div class="metric-card {{#if classification}}{{toLowerCase classification.label}}{{/if}}">
                        <div class="metric-header">
                            <div class="metric-label">
                                {{metricIcon}} {{label}}
                            </div>
                            {{#if classification}}
                            <span class="metric-badge {{toLowerCase classification.label}}">
                                {{classification.label}}
                            </span>
                            {{/if}}
                        </div>
                        
                        {{#if description}}
                        <p class="metric-description">{{description}}</p>
                        {{/if}}
                        
                        <div class="metric-value-row">
                            <span class="metric-value">{{value}}</span>
                            {{#if unit}}
                            <span class="metric-unit">{{unit}}</span>
                            {{/if}}
                        </div>
                        
                        {{#if showProgress}}
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill {{progressClass}}" style="width: {{progressPercentage}}%;"></div>
                                <div class="progress-marker" style="left: {{progressPercentage}}%;"></div>
                            </div>
                            {{#if progressLabels}}
                            <div class="progress-labels">
                                {{#each progressLabels}}
                                <span>{{this}}</span>
                                {{/each}}
                            </div>
                            {{/if}}
                        </div>
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/if}}
            {{/each}}
        </div>
    </div>
    
    <!-- Remaining sections on subsequent pages -->
    {{#each sections}}
    {{#unless @first}}
    <div class="page">
        <div class="content">
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">{{sectionIcon}}</div>
                    <h2 class="section-title">{{title}}</h2>
                </div>
                
                <div class="metrics-grid {{#if singleColumn}}single-column{{/if}}">
                    {{#each fields}}
                    <div class="metric-card {{#if classification}}{{toLowerCase classification.label}}{{/if}}">
                        <div class="metric-header">
                            <div class="metric-label">
                                {{metricIcon}} {{label}}
                            </div>
                            {{#if classification}}
                            <span class="metric-badge {{toLowerCase classification.label}}">
                                {{classification.label}}
                            </span>
                            {{/if}}
                        </div>
                        
                        {{#if description}}
                        <p class="metric-description">{{description}}</p>
                        {{/if}}
                        
                        <div class="metric-value-row">
                            <span class="metric-value">{{value}}</span>
                            {{#if unit}}
                            <span class="metric-unit">{{unit}}</span>
                            {{/if}}
                        </div>
                        
                        {{#if showProgress}}
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill {{progressClass}}" style="width: {{progressPercentage}}%;"></div>
                                <div class="progress-marker" style="left: {{progressPercentage}}%;"></div>
                            </div>
                            {{#if progressLabels}}
                            <div class="progress-labels">
                                {{#each progressLabels}}
                                <span>{{this}}</span>
                                {{/each}}
                            </div>
                            {{/if}}
                        </div>
                        {{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
    {{/unless}}
    {{/each}}
    
    <!-- Final page with insights and recommendations -->
    <div class="page">
        <div class="content">
            {{#if insights}}
            <div class="insights-container">
                <h3 class="insights-header">
                    <span>💡</span>
                    Key Health Insights
                </h3>
                {{#each insights}}
                <div class="insight-card">
                    <p class="insight-text">{{this}}</p>
                </div>
                {{/each}}
            </div>
            {{/if}}
            
            {{#if recommendations}}
            <div class="recommendations-container">
                <h3 class="recommendations-header">
                    <span>🎯</span>
                    Personalized Recommendations
                </h3>
                <div class="recommendations-grid">
                    {{#each recommendations}}
                    <div class="recommendation-card">
                                               <div class="recommendation-icon">{{icon}}</div>
                        <h4 class="recommendation-title">{{title}}</h4>
                        <p class="recommendation-text">{{text}}</p>
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/if}}
            
            <!-- Footer -->
            <div class="footer">
                <div class="disclaimer">
                    <div class="disclaimer-header">
                        <span>⚠️</span>
                        Important Medical Disclaimer
                    </div>
                    <p class="disclaimer-text">
                        This health assessment report is generated based on the data collected during your assessment session. 
                        It provides general health insights and should not replace professional medical advice, diagnosis, or treatment. 
                        Always consult with qualified healthcare professionals for medical decisions and before making any changes to your health regimen.
                    </p>
                </div>
                
                <div class="footer-grid">
                    <div class="footer-section">
                        <h4>Report Information</h4>
                        <p>
                            Generated by: Assessment Management System v2.0<br>
                            Report Date: {{currentDate}}<br>
                            Report ID: {{sessionId}}
                        </p>
                    </div>
                    <div class="footer-section">
                        <h4>Healthcare Provider</h4>
                        <p>
                            For medical consultations:<br>
                            Dr. Medical Professional<br>
                            License: #12345678
                        </p>
                    </div>
                    <div class="footer-section">
                        <h4>Contact Support</h4>
                        <p>
                            Email: support@healthassessment.com<br>
                            Phone: 1-800-HEALTH-1<br>
                            Web: www.healthassessment.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const registerHelpers = () => {
  const Handlebars = require("handlebars");

  Handlebars.registerHelper("toLowerCase", function (str: string) {
    return str ? str.toLowerCase().replace(/\s+/g, "-") : "";
  });

  Handlebars.registerHelper("currentDate", function () {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  });
};
