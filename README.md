# MERN TTS — Text-to-Speech Web App (using FPT.AI)

## Table of contents
- Project overview
- Features
- Tech stack
- Demo / Screenshots
- Architecture
- Project structure
- Setup / Installation
- API endpoints (summary & examples)
- Authentication & security details
- Deployment tips
- Security checklist & best practices
- Contributing
- License
- Credits & references

---

## Project overview
This project is a web application that converts user-provided text into speech using the FPT.AI Text-to-Speech API.  
It includes secure authentication such as:
- email verification
- OTP-based password reset
- JWT-based sessions

Frontend is built with **React**, backend with **Node.js + Express**, and **MongoDB** for data storage.

---

## Demo / Screenshots

> All images are stored in:  
`/frontend/src/assets/screenshots/`  
Make sure the folder exists in your repo.

Homepage:
![Homepage](frontend/src/assets/screenshots/homepage.png)

Login Page:
![Login](frontend/src/assets/screenshots/login.png)

TTS Input Interface:
![TTS Input](frontend/src/assets/screenshots/tts-input.png)

TTS Output / Audio Player:
![TTS Output](frontend/src/assets/screenshots/tts-output.png)

Profile / Settings:
![Profile](frontend/src/assets/screenshots/profile.png)

Conversion History:
![History](frontend/src/assets/screenshots/history.png)

Admin / Additional Page:
![Admin](frontend/src/assets/screenshots/admin.png)

Mobile Responsive View:
![Mobile](frontend/src/assets/screenshots/mobile.png)

---

## Features
- User registration with **email verification**
- **OTP**-based password reset flow
- Secure **JWT** authentication
- Convert text → speech using FPT.AI
- Voice & speed options
- Responsive UI built in React
- Optional TTS history tracking
- Backend rate limiting for protection

---

## Tech stack
### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Nodemailer
- JWT + bcrypt

### External services
- **FPT.AI** Text-to-Speech API
- SMTP (Gmail App Password / SendGrid / Mailgun)

---

## Architecture
- React frontend communicates with backend REST API
- Backend handles:
  - authentication
  - email sending
  - TTS proxying to FPT.AI
- MongoDB stores:
  - users
  - OTPs
  - verification tokens
  - optional history
- FPT.AI API requests happen **server-side** (never exposed to client)

---

## Project structure

```
college_project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env  (NOT committed)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── assets/
│   │   │   └── screenshots/
│   │   │       ├── homepage.png
│   │   │       ├── login.png
│   │   │       ├── tts-input.png
│   │   │       ├── tts-output.png
│   │   │       ├── profile.png
│   │   │       ├── history.png
│   │   │       ├── admin.png
│   │   │       └── mobile.png
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## Setup / Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local instance
- FPT.AI API key
- SMTP email account

### Backend `.env`
```
PORT=8000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
FPT_API_KEY=your_fpt_api_key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:8000/api
```

### Backend setup
```bash
cd backend
npm install
npm run dev
```

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```

---

## API endpoints (summary)

### Auth
- `POST /api/auth/register`
- `GET /api/auth/verify?token=...`
- `POST /api/auth/login`
- `POST /api/auth/request-otp`
- `POST /api/auth/reset-password`
- `POST /api/auth/change-password`

### TTS
- `POST /api/tts` → Convert text to speech

---

## Deployment tips
- Never commit `.env` files
- Use HTTPS in production
- FPT API key must remain server-side
- Host suggestions:
  - Frontend: **Vercel / Netlify**
  - Backend: **Render / Railway / DigitalOcean**
  - Database: **MongoDB Atlas**

---

## License
MIT

---

## Credits & references
- FPT.AI Text-to-Speech API docs
- MERN documentation
