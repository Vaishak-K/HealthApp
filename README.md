# Assessment Management System

A web application with PDF report generation system that generates different types of health reports from pre-existing assessment data along with User Authentication.

## Features

- User authentication (signup/login)
- Configuration-driven PDF report generation
- Support for multiple assessment types
- Dynamic field mapping from JSON data
- Configurable value classification ranges
- No code changes required for new assessment types

## Tech Stack

### Backend

- Node.js with TypeScript
- Express.js
- Puppeteer for PDF generation
- Handlebars for templates
- JWT for authentication
- Bcrypt for password hashing

### Frontend

- Next.js 14 with TypeScript
- Tailwind CSS
- React Hook Form
- Axios for API calls

## Installation

### Prerequisites

- Node.js 16+
- pnpm

### Backend Setup

```bash
cd backend
pnpm install
pnpm run dev
```
