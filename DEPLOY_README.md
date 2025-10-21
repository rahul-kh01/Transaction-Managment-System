# 🚀 POS System - Deployment Guide

## 📦 What's Included

This repository contains a complete Point of Sale (POS) system ready for deployment on Render:

- **Backend**: Spring Boot API (`pos-backend/`)
- **Frontend**: React + Vite SPA (`pos-frontend-vite/`)
- **Database**: PostgreSQL (configured via Render)

---

## 🎯 Quick Start - Deploy in 15 Minutes

### Method 1: One-Click Blueprint Deploy (Fastest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will read `render.yaml` and create all services

3. **Configure Secrets** (in Render Dashboard)
   
   Go to Backend Service → Environment and set:
   
   ```bash
   # Generate this: openssl rand -base64 64
   JWT_SECRET=<your-generated-secret>
   
   # Your Gmail account
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=<gmail-app-password>
   ```

4. **Update URLs** (after both services deploy)
   
   Frontend Service → Environment:
   ```bash
   VITE_API_URL=https://pos-backend.onrender.com
   ```
   
   Backend Service → Environment:
   ```bash
   CORS_ALLOWED_ORIGINS=https://pos-frontend.onrender.com
   FRONTEND_RESET_URL=https://pos-frontend.onrender.com/auth/reset-password?token=
   ```

5. **Redeploy** both services and you're live! 🎉

---

### Method 2: Manual Step-by-Step Deploy

For detailed instructions, see: **[RENDER_DEPLOYMENT_COMPLETE_GUIDE.md](./RENDER_DEPLOYMENT_COMPLETE_GUIDE.md)**

---

## 📋 Pre-Deployment Requirements

### Required:
- ✅ GitHub repository
- ✅ Render account (free tier works)
- ✅ Gmail account (for email features)
- ✅ Gmail 2FA enabled
- ✅ Gmail App Password generated

### Generate Gmail App Password:
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Search for "App passwords"
4. Select "Mail" and your device
5. Copy the 16-character password

### Generate JWT Secret:
```bash
openssl rand -base64 64
```

---

## 📁 Project Structure

```
pos/
├── pos-backend/              # Spring Boot API
│   ├── src/
│   ├── Dockerfile           # Docker configuration
│   ├── pom.xml             # Maven dependencies
│   └── env.example         # Environment variables template
│
├── pos-frontend-vite/        # React Frontend
│   ├── src/
│   ├── package.json        # NPM dependencies
│   ├── vite.config.js      # Vite configuration
│   └── env.example         # Frontend env template
│
├── render.yaml              # Render Blueprint (auto-deploy)
├── RENDER_DEPLOYMENT_COMPLETE_GUIDE.md  # Detailed guide
├── DEPLOYMENT_CHECKLIST.md  # Step-by-step checklist
└── README.md               # This file
```

---

## 🔧 Configuration Files

### Backend (pos-backend/)

**Dockerfile**: Builds Java application
- Uses Maven to compile
- Creates optimized production image
- Exposes port 5000

**application.yml**: Spring Boot configuration
- Database connection
- JPA settings
- Logging configuration
- CORS settings

### Frontend (pos-frontend-vite/)

**vite.config.js**: Build configuration
- React plugin setup
- Build optimizations
- Path aliases

**package.json**: Dependencies and scripts
- `dev`: Run development server
- `build`: Create production build
- `preview`: Test production build

---

## 🌍 Environment Variables

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | from Render |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `pos_production` |
| `DB_USERNAME` | Database user | from Render |
| `DB_PASSWORD` | Database password | from Render |
| `JWT_SECRET` | JWT signing key | Generate with openssl |
| `MAIL_USERNAME` | Gmail address | your@gmail.com |
| `MAIL_PASSWORD` | Gmail app password | 16-char password |
| `CORS_ALLOWED_ORIGINS` | Allowed domains | Frontend URL |
| `FRONTEND_RESET_URL` | Password reset link | Frontend URL/reset |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | https://backend.onrender.com |

---

## 🧪 Testing Deployment

### 1. Test Backend
```bash
# Health check
curl https://your-backend.onrender.com/actuator/health

# Expected response:
# {"status":"UP"}
```

### 2. Test Frontend
- Open: `https://your-frontend.onrender.com`
- Check browser console for errors
- Verify assets load correctly

### 3. Test Integration
- Try logging in
- Check if API calls work
- Test password reset email
- Verify all features work

---

## 🔒 Security Checklist

- [ ] JWT secret is strong (64+ characters)
- [ ] Default admin password changed
- [ ] CORS only allows your domain (no `*`)
- [ ] Environment variables are secret
- [ ] HTTPS is enforced
- [ ] Gmail App Password is used (not regular password)
- [ ] Database credentials are secure
- [ ] No secrets in code or logs

---

## 📊 Cost Breakdown

### Free Tier (Testing)
- Backend Web Service: $0 (with limitations)
- Frontend Static Site: $0
- PostgreSQL Database: $0 (256MB RAM, 1GB storage)
- **Total**: $0/month
- **Limitation**: Services spin down after 15 min inactivity

### Recommended Production
- Backend Web Service (Standard): $25/month
- Frontend Static Site: $0
- PostgreSQL Database (Standard): $7/month
- **Total**: $32/month
- **Benefits**: No spin-down, better performance, more resources

---

## 🆘 Troubleshooting

### Backend won't start
- Check all environment variables are set
- Verify database is running
- Review build logs in Render
- Ensure JWT_SECRET is set

### Frontend shows API errors
- Verify `VITE_API_URL` is correct
- Check backend CORS includes frontend URL
- Ensure backend is running
- Check browser console for details

### CORS errors
- Backend `CORS_ALLOWED_ORIGINS` must include frontend URL
- Redeploy backend after CORS changes
- Don't use `http` when frontend is `https`

### Build fails
- **Backend**: Check Dockerfile syntax, verify `pom.xml`
- **Frontend**: Check `package.json`, try `pnpm build` locally

---

## 📚 Documentation

- **[RENDER_DEPLOYMENT_COMPLETE_GUIDE.md](./RENDER_DEPLOYMENT_COMPLETE_GUIDE.md)**: Comprehensive deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**: Step-by-step checklist
- **[pos-backend/RENDER_DEPLOYMENT_GUIDE.md](./pos-backend/RENDER_DEPLOYMENT_GUIDE.md)**: Backend-specific guide
- **[pos-frontend-vite/RENDER_DEPLOYMENT.md](./pos-frontend-vite/RENDER_DEPLOYMENT.md)**: Frontend-specific guide

---

## 🎯 Post-Deployment

### Immediately After Deployment
1. Change default admin password
2. Test all critical features
3. Set up monitoring/alerts
4. Configure database backups
5. Review security settings

### Within First Week
1. Monitor error logs
2. Check performance metrics
3. Gather user feedback
4. Fix any issues discovered
5. Plan for scaling if needed

### Ongoing
1. Regular security updates
2. Database backups verification
3. Performance monitoring
4. Feature additions
5. User support

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Spring Boot Deployment](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Production Best Practices](https://react.dev/learn/start-a-new-react-project)

---

## 💬 Support

### Issues with Deployment?
1. Check [RENDER_DEPLOYMENT_COMPLETE_GUIDE.md](./RENDER_DEPLOYMENT_COMPLETE_GUIDE.md)
2. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
3. Check Render service logs
4. Test locally first

### Common Issues & Solutions
See the **Troubleshooting** section in each guide:
- Backend issues → `pos-backend/RENDER_DEPLOYMENT_GUIDE.md`
- Frontend issues → `pos-frontend-vite/RENDER_DEPLOYMENT.md`
- Integration issues → `RENDER_DEPLOYMENT_COMPLETE_GUIDE.md`

---

## ✅ Deployment Status

Use this to track your deployment:

- [ ] Repository pushed to GitHub
- [ ] Render account created
- [ ] Gmail App Password generated
- [ ] JWT Secret generated
- [ ] Database created on Render
- [ ] Backend service created
- [ ] Backend environment variables set
- [ ] Backend deployed successfully
- [ ] Frontend service created
- [ ] Frontend environment variables set
- [ ] Frontend deployed successfully
- [ ] URLs updated in both services
- [ ] Services redeployed with new URLs
- [ ] All tests passed
- [ ] Default password changed
- [ ] System is live! 🎉

---

**Good luck with your deployment!** 🚀

For detailed step-by-step instructions, start with:
**[RENDER_DEPLOYMENT_COMPLETE_GUIDE.md](./RENDER_DEPLOYMENT_COMPLETE_GUIDE.md)**

For a quick checklist format:
**[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**

