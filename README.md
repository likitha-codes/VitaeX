# VitaeX — AI-Powered Resume Analyser & Skill Gap Tool

<div align="center">

![VitaeX Logo](client/src/assets/logo.png)

**Build smarter resumes. Bridge the skill gap. Land the role.**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.1-orange)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?logo=mongodb)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)

</div>

---

## 🌍 Product Overview

**VitaeX** is a full-stack AI-powered resume analyser and skill gap tool that empowers job seekers to build, edit, and analyse their resumes against specific job roles — or even specific company job descriptions.

### The Problem
Most job seekers don't know why they're getting rejected. They send the same resume everywhere, unaware of the skills they're missing or how poorly their resume matches what an employer is actually looking for.

### The Solution
VitaeX gives every job seeker access to AI-powered career coaching — something previously only available to those who could afford professional resume consultants.

### 🎯 UN SDG Alignment
**SDG 8 — Decent Work and Economic Growth**
VitaeX directly supports SDG 8 by reducing barriers to employment. By helping job seekers identify and bridge skill gaps, VitaeX contributes to reducing unemployment and enabling access to quality jobs — especially for first-generation job seekers and students who can't afford career coaching.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 Resume Builder | Build a professional resume from scratch with guided form inputs |
| ✏️ Inline Resume Editor | Edit any section of your resume directly in the live preview |
| 📄 PDF Download | Export your resume as a polished PDF with one click |
| 📤 Resume Upload | Upload an existing PDF resume for instant analysis |
| 🤖 AI Analysis | Get a resume score, missing skills, and actionable tips powered by Groq AI |
| 🎯 Job Description Matching | Paste a company's job description for a targeted, company-specific analysis |
| 📊 Skill Gap Report | See exactly which skills you have vs. what the role requires |
| 💡 Professional Summary | AI-generated professional summary tailored to your target role |

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Frontend** | React + Tailwind CSS | Component-based UI with utility-first styling |
| **Backend** | Node.js + Express | Lightweight, fast REST API server |
| **AI Layer** | Groq API (Llama 3.1 8B) | Fast, free-tier LLM for resume analysis |
| **Database** | MongoDB + Mongoose | Flexible document store for resume data |
| **Resume Editor** | React Controlled Components | Lightweight inline editing without extra dependencies |
| **PDF Generation** | jsPDF + html2canvas | Client-side PDF export from live resume preview |
| **PDF Parsing** | pdf2json | Server-side text extraction from uploaded PDFs |
| **File Upload** | Multer | Multipart form data handling for PDF uploads |
| **Hosting** | Vercel (frontend) + Render (backend) | Free-tier cloud hosting for both layers |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        USER                              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (React)                         │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ Resume      │  │ Upload      │  │ Analysis        │ │
│  │ Builder     │  │ Resume Page │  │ Page            │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐                       │
│  │ Live        │  │ Resume      │                       │
│  │ Preview     │  │ Editor      │                       │
│  └─────────────┘  └─────────────┘                       │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP REST API
                       ▼
┌─────────────────────────────────────────────────────────┐
│                BACKEND (Node.js + Express)                │
│                                                          │
│  POST /api/upload     →  PDF Parse + Groq Analysis      │
│  POST /api/analyse    →  Text Analysis + Groq            │
│                                                          │
└──────────┬────────────────────────┬─────────────────────┘
           │                        │
           ▼                        ▼
┌──────────────────┐    ┌───────────────────────┐
│   MongoDB        │    │   Groq API            │
│   (Resume Store) │    │   (Llama 3.1 8B)      │
└──────────────────┘    └───────────────────────┘
```

---

## 🚀 Installation Guide

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (free tier)
- Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the Repository

```bash
git clone https://github.com/likitha-codes/VitaeX.git
cd VitaeX
git checkout frontend
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

Start the backend server:

```bash
node index.js
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd client
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
VitaeX/
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── NavBar.js
│       │   ├── LivePreview.js       # Live resume preview
│       │   ├── ResumeEditor.js      # Inline resume editor
│       │   ├── ResumeForm.js        # Resume builder form
│       │   └── ParticleBackground.js
│       ├── pages/
│       │   ├── LandingPage.js       # Home page
│       │   ├── BuildResumePage.js   # Resume builder
│       │   ├── ResumeResultPage.js  # Resume preview + download
│       │   ├── UploadResumePage.js  # PDF upload + job description
│       │   └── AnalysisPage.js      # AI analysis results
│       └── App.js                   # Routes
│
└── server/                          # Node.js backend
    ├── routes/
    │   ├── upload.js                # PDF upload + Groq analysis
    │   └── analyse.js               # Text-based analysis
    ├── models/
    │   └── Resume.js                # MongoDB schema
    └── index.js                     # Express server entry point
```

---

## 🔄 User Flow

```
Landing Page
     │
     ├──► Build Resume
     │         │
     │         ▼
     │    Fill in details (name, skills, experience, projects...)
     │         │
     │         ▼
     │    Live Preview → Edit Inline → Download PDF
     │         │
     │         ▼
     │    Analyse Resume → Enter Role → Get AI Score + Tips
     │
     └──► Upload Resume
               │
               ▼
          Upload PDF + Enter Role + (Optional) Paste Job Description
               │
               ▼
          AI Analysis → Score + Missing Skills + Tips + Summary
```

---

## 🤖 AI Analysis Features

When you analyse a resume, VitaeX returns:

- **Resume Score** — out of 100, based on role match
- **Required Skills** — what the role demands
- **Missing Skills** — what's absent from your resume
- **Actionable Tips** — 3–5 specific improvements
- **Professional Summary** — AI-written summary tailored to the role

### Job Description Mode
Paste a company's actual job description to get:
- ATS keyword matching against that specific JD
- Company-specific skill gap analysis
- Tailored tips for that exact application

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | Coming soon |
| Backend | Render | Coming soon |

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
Empowering job seekers with AI — one resume at a time.
</div>
