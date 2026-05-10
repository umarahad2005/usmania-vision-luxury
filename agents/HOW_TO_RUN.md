# 🚀 How to Run the Agent System

## Prerequisites
- Cursor IDE or Claude Code
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Brevo account

## Quick Start

### 1. Setup Environment
```bash
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, Cloudinary keys, Brevo API key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```

### 4. Deploy to Vercel
```bash
vercel --prod
```

## Running Specific Agents

### Design Agent (01)
Paste `agents/skills/01-design-agent.md` into Claude/Cursor for design decisions.

### Animation Agent (04)
Paste `agents/skills/04-animation-agent.md` for GSAP timeline help.

### Structure Agent (02)
Paste `agents/skills/02-structure-agent.md` for adding new routes/components.

## Environment Variables Required
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-min-32-chars
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
BREVO_API_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=...  (client-side)
```
