# Transaction Management System (POS)

A full-stack Transaction Management System with modern web technologies.

## 🏗️ Architecture

```
pos/
├── pos-backend/           # Spring Boot API
├── pos-frontend-vite/     # React + Vite Frontend
└── render.yaml           # Deployment configuration
```

## 🚀 Quick Start

### Local Development

#### Backend
```bash
cd pos-backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd pos-frontend-vite
pnpm install
pnpm dev
```

### Deploy to Render

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Create Blueprint in Render:**
   - Go to Render Dashboard
   - New → Blueprint
   - Connect your repository
   - Render will auto-create both services

3. **Configure Environment Variables:**
   
   **Backend (Required):**
   - `DB_HOST` - Your Neon/PostgreSQL host
   - `DB_NAME` - Database name
   - `DB_USERNAME` - Database username
   - `DB_PASSWORD` - Database password
   - `JWT_SECRET` - Generate with: `openssl rand -base64 64`
   
   **Backend (Optional):**
   - `MAIL_USERNAME` - Gmail for password reset
   - `MAIL_PASSWORD` - Gmail app password
   - `RAZORPAY_API_KEY` - Payment gateway
   - `STRIPE_API_KEY` - Payment gateway
   
   **Frontend:**
   - `VITE_API_URL` - Your backend URL (e.g., `https://your-backend.onrender.com`)

4. **Update URLs:**
   After both services deploy, update:
   - Backend `CORS_ALLOWED_ORIGINS` with frontend URL
   - Backend `FRONTEND_RESET_URL` with frontend URL
   - Redeploy both services

## 📚 Documentation

- **[RENDER_FRONTEND_DEPLOYMENT_FIX.md](/RENDER_FRONTEND_DEPLOYMENT_FIX.md)** - Frontend deployment fixes
- **[pos-frontend-vite/DEPLOYMENT.md](/pos-frontend-vite/DEPLOYMENT.md)** - Frontend deployment guide
- **[pos-backend/render.yaml](/pos-backend/render.yaml)** - Backend deployment config

## 🛠️ Technology Stack

### Backend
- Java 17
- Spring Boot 3.x
- PostgreSQL (Neon)
- JWT Authentication
- Spring Security

### Frontend
- React 19
- Vite 7
- TailwindCSS 4
- Redux Toolkit
- React Router 7
- Radix UI Components

### Deployment
- Render (Backend + Frontend)
- Neon (PostgreSQL Database)
- Docker (Backend containerization)

## 🐛 Troubleshooting

### Frontend Build Fails
**Error:** `npm error ERESOLVE could not resolve`

**Solution:** The project uses pnpm. The root `render.yaml` is already configured correctly. Make sure:
1. Root `package.json` exists (declares pnpm)
2. Root `.npmrc` exists (prevents auto-install)
3. Build command uses pnpm: `npm install -g pnpm && cd pos-frontend-vite && pnpm install --frozen-lockfile && pnpm build`

See [RENDER_FRONTEND_DEPLOYMENT_FIX.md](/RENDER_FRONTEND_DEPLOYMENT_FIX.md) for details.

### Backend Won't Start
**Error:** Database connection failed

**Solution:** Set all database environment variables in Render:
- `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`

### CORS Errors
**Solution:** Update backend's `CORS_ALLOWED_ORIGINS` to include your frontend URL

## 📊 Monitoring

- **Health Check:** `https://your-backend.onrender.com/actuator/health`
- **Frontend:** `https://your-frontend.onrender.com`

## 💰 Cost (Free Tier)

- Backend: Free (sleeps after 15min inactivity)
- Frontend: Free (static site)
- Database: Free (Neon 256MB)

**Total:** $0/month

## 🔒 Security

- [ ] Change default admin password
- [ ] Set strong `JWT_SECRET`
- [ ] Use Gmail App Password (not account password)
- [ ] Enable HTTPS only (automatic on Render)
- [ ] Review CORS settings
- [ ] Never commit `.env` files

## 📝 License

[Your License Here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Need Help?** Check the documentation files or open an issue.

