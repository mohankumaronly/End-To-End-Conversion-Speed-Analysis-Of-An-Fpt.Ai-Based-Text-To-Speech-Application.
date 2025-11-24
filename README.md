# MERN TTS — Text-to-Speech Web App (using FPT.AI)

## Table of contents
- Project overview
- Features
- Tech stack
- Demo / Screenshots
- Architecture
- Setup / Installation
- API endpoints (summary & examples)
- Authentication & security details
- Testing
- Deployment tips
- Security checklist & best practices
- Contributing
- License
- Credits & references

## Project overview
This project is a college-grade web application that converts user-provided text into speech using the FPT.AI Text-to-Speech API. The frontend is built with React, backend with Node.js + Express, and MongoDB for persistent storage. Authentication includes email verification, OTP for password reset, and secure JWT-based sessions.

---

## Demo / Screenshots

> The images are referenced from your repository location: `frontend/src/assets/`.  
> If you keep the images at that location, GitHub will render them correctly.

Homepage (after login):
![Homepage](frontend/src/assets/Screenshot%202025-11-24%20194727.png)

Login / Register page:
![Login Page](frontend/src/assets/Screenshot%202025-11-24%20194745.png)

TTS input interface:
![TTS Interface - 1](frontend/src/assets/Screenshot%202025-11-24%20194751.png)

TTS conversion result / player:
![TTS Player - 1](frontend/src/assets/Screenshot%202025-11-24%20194755.png)

Profile / Settings:
![Profile](frontend/src/assets/Screenshot%202025-11-24%20195308.png)

Conversion history:
![History 1](frontend/src/assets/Screenshot%202025-11-24%20195315.png)

Another TTS screenshot:
![TTS Interface - 2](frontend/src/assets/Screenshot%202025-11-24%20195319.png)

Admin / Additional page:
![Admin](frontend/src/assets/Screenshot%202025-11-24%20195326.png)

Mobile / Responsive view:
![Mobile View](frontend/src/assets/Screenshot%202025-11-24%20195337.png)

---

## Features
- User registration with email verification  
- OTP-based password reset  
- JWT authentication  
- TTS conversion using FPT.AI  
- Voice & speed selection  
- User-friendly React UI  
- Secure backend with rate limiting  
- Optional TTS history tracking

## Tech stack
- Frontend: React, Tailwind CSS  
- Backend: Node.js, Express  
- Database: MongoDB  
- Auth: JWT, bcrypt  
- Mail: Nodemailer (SMTP)  
- Third-party APIs: FPT.AI Text-to-Speech

## Architecture
- React frontend communicates with backend API  
- Backend handles auth, mailing, TTS proxy requests  
- MongoDB stores users, otp, logs, etc.  
- FPT.AI API used server-side for text-to-speech

## Setup / Installation

### Prerequisites
- Node.js (v16+)  
- MongoDB (Atlas recommended)  
- FPT.AI API key  
- SMTP email account (Gmail App Password / SendGrid)

### Backend `.env`
```
PORT=8000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
FPT_API_KEY=your_fpt_api_key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_smtp_password
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

## API endpoints (summary)
### Auth
- POST `/api/auth/register`
- GET  `/api/auth/verify?token=...`
- POST `/api/auth/login`
- POST `/api/auth/request-otp`
- POST `/api/auth/reset-password`
- POST `/api/auth/change-password`

### TTS
- POST `/api/tts` → Convert text to speech (server proxies to FPT.AI)

## Security & Auth Details
- Passwords hashed with bcrypt  
- Email verification tokens (short-lived)  
- OTPs for password reset (hashed in DB + expiry)  
- Short-lived JWT access tokens; optional refresh tokens stored securely

## Deployment tips
- Use environment variables in production (don't commit `.env`)  
- Keep FPT API key server-side only  
- Use HTTPS in production  
- Monitor FPT API usage to avoid unexpected costs

## Notes about images / paths
- The images in this README reference `frontend/src/assets/<filename>`.  
- **If you rename or move images**, update the paths accordingly.
- Filenames with spaces are supported on GitHub, but it's better to remove spaces. Example rename (from your repo root):
```bash
# Recommended: remove spaces and use kebab-case
git mv "frontend/src/assets/Screenshot 2025-11-24 194727.png" frontend/src/assets/homepage.png
git mv "frontend/src/assets/Screenshot 2025-11-24 194745.png" frontend/src/assets/login.png
git mv "frontend/src/assets/Screenshot 2025-11-24 194751.png" frontend/src/assets/tts-1.png
git mv "frontend/src/assets/Screenshot 2025-11-24 194755.png" frontend/src/assets/tts-player.png
git mv "frontend/src/assets/Screenshot 2025-11-24 195308.png" frontend/src/assets/profile.png
git mv "frontend/src/assets/Screenshot 2025-11-24 195315.png" frontend/src/assets/history-1.png
git mv "frontend/src/assets/Screenshot 2025-11-24 195319.png" frontend/src/assets/tts-2.png
git mv "frontend/src/assets/Screenshot 2025-11-24 195326.png" frontend/src/assets/admin.png
git mv "frontend/src/assets/Screenshot 2025-11-24 195337.png" frontend/src/assets/mobile.png

# Then commit the renames:
git add frontend/src/assets
git commit -m "Rename screenshots and add README with screenshot references"
git push
```

---

## Contributing
1. Fork  
2. Create branch `feat/your-feature`  
3. Commit & PR

## License
MIT

## Credits & references
- FPT.AI TTS documentation
