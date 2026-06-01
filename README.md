# ATS Pro 🎯

> An AI-powered resume analyzer that helps you beat Applicant Tracking Systems and land your dream job.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-4f46e5?style=for-the-badge)](https://ai-resume-analyzer-ecru-omega.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/harsh2005-singh/AI-Resume-Analyzer)

## 🌐 Live Demo
**[https://ai-resume-analyzer-ecru-omega.vercel.app](https://ai-resume-analyzer-ecru-omega.vercel.app)**

> ⚡ Try it without creating an account using the **"Try Without Login"** button!

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Guest Mode** | Try the analyzer without creating an account |
| 📄 **PDF Upload** | Upload your resume as a PDF file |
| 🤖 **AI Analysis** | Google Gemini AI analyzes your resume against job descriptions |
| 📊 **ATS Score** | Get an overall compatibility score out of 100 |
| 🔍 **Section Breakdown** | Detailed scores for Skills, Experience, Education, Keywords and Formatting |
| 💡 **Smart Suggestions** | Top 5 actionable improvement tips |
| 📥 **Download Report** | Download your full analysis as a PDF report |
| 📁 **History** | Track all your past analyses |
| 🔐 **Authentication** | Secure JWT-based login and registration |
| 🔔 **Toast Notifications** | Real-time feedback on all actions |
| 🌙 **Dark Theme** | Modern dark UI throughout |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### AI & Security
![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-338?style=for-the-badge)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/harsh2005-singh/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

**2. Setup Backend**
```bash
cd server
npm install
```

**3. Create `server/.env` file**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

**4. Start Backend**
```bash
npm run dev
```

**5. Setup Frontend**
```bash
cd ../client
npm install
npm run dev
```

**6. Open in browser**
http://localhost:5173

---

## 📁 Project Structure

```
AI-Resume-Analyzer/
├── client/                     # React Frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx      
│       │   └── ScoreCard.jsx   
│       ├── pages/
│       │   ├── Landing.jsx     
│       │   ├── Guest.jsx       
│       │   ├── Login.jsx       
│       │   ├── Register.jsx    
│       │   ├── Upload.jsx      
│       │   ├── Results.jsx     
│       │   └── History.jsx     
│       └── context/
│           └── AuthContext.jsx 
├── server/                     
│   ├── config/
│   │   └── db.js               
│   ├── models/
│   │   ├── User.js             
│   │   └── Analysis.js         
│   ├── routes/
│   │   ├── auth.js             
│   │   └── resume.js           
│   ├── middleware/
│   │   └── authMiddleware.js   
│   └── index.js                
└── README.md
---

## 🔒 Security Features

- JWT based authentication with 7 day expiry
- bcrypt password hashing (salt rounds: 10)
- Rate limiting — 100 requests per 15 mins globally
- Analysis rate limiting — 10 analyses per hour
- Protected API routes with middleware
- Trust proxy enabled for accurate rate limiting

---

## 🌊 How It Works

User uploads PDF resume
↓
pdf-parse extracts raw text from PDF
↓
User enters job description
↓
Backend sends resume + JD to Gemini API
↓
Gemini returns structured JSON analysis
↓
Results saved to MongoDB
↓
Frontend displays score, breakdown and suggestions


---

## 👨‍💻 Author

**Harshit Singh**
- 🎓 B.Tech Information Technology | Techno Main Salt Lake | MAKAUT
- 💼 GitHub: [@harsh2005-singh](https://github.com/harsh2005-singh)
- 🔍 Open to Internship Opportunities in Full Stack Development

---

## 📄 License

MIT License — feel free to use this project for learning and portfolio purposes!

---

⭐ **If you found this project helpful, please give it a star on GitHub!**