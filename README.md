# XSmart - SaaS IT Solutions Website

A comprehensive, full-stack SaaS IT solutions website with modern design, animations, and a real backend API.

## 📁 Project Structure

```
/mnt/okcomputer/output/
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── data/          # Services & blog data
│   │   ├── pages/         # Page components
│   │   ├── sections/      # Homepage sections
│   │   ├── config/        # API configuration
│   │   └── ...
│   ├── public/            # Static assets (images)
│   └── package.json
│
└── xsmart-server/         # Backend (Express.js)
    ├── index.js           # Main server file
    ├── .env.example       # Environment variables template
    └── package.json
```

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd xsmart-server

# Install dependencies (if not already installed)
npm install

# Create environment file
cp .env.example .env

# Edit .env with your email settings
# For Gmail: Use App Password from https://myaccount.google.com/apppasswords

# Start the server
npm start
```

The server will run on **http://localhost:3001**

### 2. Start the Frontend

```bash
cd app

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:3000**

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- A **Gmail account** (or other SMTP provider) for email functionality

## 🔧 Backend Configuration

### Gmail Setup (Recommended for testing)

1. Go to https://myaccount.google.com/apppasswords
2. Generate an App Password
3. Use your Gmail address as `SMTP_USER`
4. Use the App Password (not your regular password) as `SMTP_PASS`

### Environment Variables

Create a `.env` file in `xsmart-server/`:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Contact Settings
CONTACT_EMAIL=hello@xsmart.io

# Server Settings
PORT=3001
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/newsletter` | POST | Subscribe to newsletter |
| `/api/health` | GET | Health check |

### Example API Request

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello, I am interested in your services..."
  }'
```

## 📦 Frontend Configuration

The frontend API URL is configured in `app/src/config/api.ts`:

```typescript
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'  // Local development
  : 'https://your-api-domain.com';  // Production
```

**For production deployment**, update this file with your production API URL.

## 🎨 Features

### Frontend
- ✅ **9 Services**: Cloud, Security, Software Dev, AI/ML, Data Science, Mobile, DevOps, Network, Consulting
- ✅ **Multi-page routing** with React Router
- ✅ **Dark/Light theme** toggle
- ✅ **GSAP animations** throughout
- ✅ **Custom cursor** (desktop)
- ✅ **Responsive design**
- ✅ **Blog with search & filters**
- ✅ **Service detail pages**
- ✅ **Pricing page**
- ✅ **Privacy Policy & Terms**

### Backend
- ✅ **Contact form** with email notifications
- ✅ **Newsletter subscription**
- ✅ **CORS enabled**
- ✅ **Input validation**
- ✅ **Error handling**

## 🏗️ Building for Production

### Frontend Build

```bash
cd app
npm run build
```

Output goes to `app/dist/`

### Backend Deployment

For production, deploy the backend to:
- **Heroku**
- **Railway**
- **Render**
- **AWS/GCP/Azure**

Update `app/src/config/api.ts` with your production API URL.

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/services` | All services overview |
| `/services/:id` | Individual service details |
| `/blog` | Blog listing with search |
| `/blog/:id` | Individual blog post |
| `/about` | About us page |
| `/contact` | Contact form |
| `/pricing` | Pricing plans |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms & conditions |

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router DOM
- GSAP (animations)
- Framer Motion
- Lucide React (icons)

### Backend
- Express.js
- Nodemailer (email)
- CORS
- dotenv

## 📝 Scripts

### Frontend (`app/`)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend (`xsmart-server/`)
```bash
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- Website: https://xsmart.io
- Email: hello@xsmart.io
- Phone: +1 (555) 123-4567

---

Built with ❤️ by the XSmart Team
