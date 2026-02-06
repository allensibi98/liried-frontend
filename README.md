# Liried Frontend

React application for product management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend running on http://localhost:5000

### Setup & Run

```bash
# 1. Navigate to frontend directory
cd lired-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
# Create .env file with:
REACT_APP_API_BASE_URL=http://localhost:5000/api

# 4. Start development server
npm start
```

Visit **http://localhost:3000**

### Default Login
- Username: `admin`
- Password: `admin123`

## 📝 Scripts

```bash
npm start       # Start dev server
npm run build   # Build for production
npm test        # Run tests
```

## 🐛 Common Issues

**Port already in use:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `.env` file has correct API URL
- Restart after changing `.env`

---

Built with React + React Router + Axios
