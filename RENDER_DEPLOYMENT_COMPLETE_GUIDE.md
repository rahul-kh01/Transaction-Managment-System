# 🚀 Complete Render Deployment Guide - POS System

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers deploying both the **POS Backend (Java/Spring Boot)** and **POS Frontend (React/Vite)** on Render.

### Architecture
```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   React App     │─────▶│   Spring Boot   │─────▶│   PostgreSQL    │
│  (Frontend)     │      │    (Backend)    │      │   (Database)    │
│  Static Site    │      │   Web Service   │      │   Database      │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## Prerequisites

### ✅ Required:
- [ ] GitHub account
- [ ] Render account (free tier available)
- [ ] Your code pushed to GitHub
- [ ] Gmail account (for email features)

### 📦 What You Need:
- JWT Secret (generated)
- Email credentials (Gmail App Password)
- Payment gateway keys (Razorpay/Stripe) - optional

---

## Backend Deployment

### Step 1: Create PostgreSQL Database

1. **Go to Render Dashboard** → Click **"New +"** → Select **"PostgreSQL"**

2. **Configure Database:**
   ```
   Name: pos-database
   Database: pos_production
   User: (auto-generated)
   Region: Oregon (or nearest to you)
   Plan: Free (or Starter for production)
   ```

3. **Click "Create Database"**

4. **Save Database Credentials:**
   - Internal Database URL
   - External Database URL
   - Host, Port, Database Name, User, Password

### Step 2: Create Backend Web Service

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository:**
   - Connect your GitHub account
   - Select your POS repository
   - Click "Connect"

3. **Configure Web Service:**
   ```
   Name: pos-backend
   Region: Oregon (same as database)
   Branch: main
   Root Directory: pos-backend
   Runtime: Docker
   Plan: Free (or Starter for production)
   ```

4. **Build Settings:**
   - **Docker Command:** (leave empty, uses Dockerfile)
   - **Dockerfile Path:** `./Dockerfile`

5. **Click "Create Web Service"** (don't deploy yet!)

### Step 3: Configure Backend Environment Variables

In your backend service settings, add these environment variables:

#### Database (Auto-fill from PostgreSQL)
```bash
DB_HOST=<from Render PostgreSQL>
DB_PORT=5432
DB_NAME=<from Render PostgreSQL>
DB_USERNAME=<from Render PostgreSQL>
DB_PASSWORD=<from Render PostgreSQL>
```

#### JPA Configuration
```bash
JPA_DDL_AUTO=update
JPA_SHOW_SQL=false
```

#### Server Configuration
```bash
SERVER_PORT=5000
```

#### JWT Configuration (CRITICAL!)
```bash
# Generate a strong secret:
# Run: openssl rand -base64 64
JWT_SECRET=<your-super-secret-256-bit-key>
JWT_EXPIRATION=86400000
```

#### Email Configuration (Gmail)
```bash
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=<your-gmail-app-password>
```

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate password for "Mail"
5. Use that 16-character password

#### CORS Configuration (IMPORTANT!)
```bash
# You'll update this after frontend deployment
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

#### Frontend URL (for password reset emails)
```bash
# You'll update this after frontend deployment
FRONTEND_RESET_URL=http://localhost:5173/auth/reset-password?token=
```

#### Payment Gateways (Optional)
```bash
RAZORPAY_API_KEY=<your-key>
RAZORPAY_API_SECRET=<your-secret>
STRIPE_API_KEY=<your-key>
```

#### Logging
```bash
LOG_LEVEL_ROOT=INFO
LOG_LEVEL_APP=INFO
LOG_LEVEL_SPRING=WARN
LOG_LEVEL_SECURITY=WARN
```

### Step 4: Deploy Backend

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Wait for build to complete (5-10 minutes)
3. Check logs for any errors
4. Once deployed, test the health endpoint:
   ```
   https://your-backend-name.onrender.com/actuator/health
   ```

---

## Frontend Deployment

### Step 1: Create Static Site

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Static Site"**

2. **Connect Repository:**
   - Select your POS repository
   - Click "Connect"

3. **Configure Static Site:**
   ```
   Name: pos-frontend
   Region: Oregon (same as backend)
   Branch: main
   Root Directory: pos-frontend-vite
   ```

4. **Build Settings:**
   ```
   Build Command: pnpm install && pnpm build
   Publish Directory: dist
   ```

### Step 2: Configure Frontend Environment Variables

Add these environment variables:

```bash
# Backend API URL (use your backend URL from Step 4)
VITE_API_URL=https://your-backend-name.onrender.com

# App Configuration
VITE_APP_NAME=Zosh POS
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

### Step 3: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for build to complete (3-5 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://your-frontend-name.onrender.com
   ```

### Step 4: Update Backend CORS

**IMPORTANT:** Go back to your backend service and update these environment variables:

```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-name.onrender.com,http://localhost:5173

FRONTEND_RESET_URL=https://your-frontend-name.onrender.com/auth/reset-password?token=
```

Then **redeploy the backend** for changes to take effect.

---

## Environment Variables Summary

### Backend Environment Variables Checklist

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `DB_HOST` | ✅ | from Render | Auto from PostgreSQL |
| `DB_PORT` | ✅ | 5432 | Auto from PostgreSQL |
| `DB_NAME` | ✅ | pos_production | Auto from PostgreSQL |
| `DB_USERNAME` | ✅ | from Render | Auto from PostgreSQL |
| `DB_PASSWORD` | ✅ | from Render | Auto from PostgreSQL |
| `JWT_SECRET` | ✅ | <generated> | Use `openssl rand -base64 64` |
| `JWT_EXPIRATION` | ✅ | 86400000 | 24 hours in ms |
| `MAIL_HOST` | ✅ | smtp.gmail.com | For Gmail |
| `MAIL_PORT` | ✅ | 587 | For Gmail |
| `MAIL_USERNAME` | ✅ | your@gmail.com | Your email |
| `MAIL_PASSWORD` | ✅ | app-password | Gmail app password |
| `CORS_ALLOWED_ORIGINS` | ✅ | frontend-url | Update after frontend deploy |
| `FRONTEND_RESET_URL` | ✅ | frontend-url/reset | Update after frontend deploy |
| `RAZORPAY_API_KEY` | ❌ | optional | If using Razorpay |
| `RAZORPAY_API_SECRET` | ❌ | optional | If using Razorpay |
| `STRIPE_API_KEY` | ❌ | optional | If using Stripe |

### Frontend Environment Variables Checklist

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_API_URL` | ✅ | https://backend.onrender.com |
| `VITE_APP_NAME` | ❌ | Zosh POS |
| `VITE_APP_VERSION` | ❌ | 1.0.0 |

---

## Post-Deployment

### 1. Test the Application

#### Backend Health Check
```bash
curl https://your-backend-name.onrender.com/actuator/health
```

Expected response:
```json
{
  "status": "UP"
}
```

#### Frontend Access
Open: `https://your-frontend-name.onrender.com`

You should see the landing page.

### 2. Create Super Admin Account

The system should auto-create a super admin on first run. Check backend logs for credentials, or use the default:

```
Email: admin@pos.com
Password: Admin@123
```

**IMPORTANT:** Change this password immediately after first login!

### 3. Configure Custom Domain (Optional)

#### For Frontend:
1. Go to your static site settings
2. Click "Custom Domain"
3. Add your domain (e.g., `pos.yourdomain.com`)
4. Update DNS records as instructed

#### For Backend:
1. Go to your web service settings
2. Click "Custom Domain"
3. Add your domain (e.g., `api.yourdomain.com`)
4. Update DNS records
5. **Update CORS in backend** with new frontend domain

---

## Troubleshooting

### Backend Issues

#### ❌ Build Fails
**Check:**
- Dockerfile is in `pos-backend/` directory
- `pom.xml` has correct dependencies
- Java version in Dockerfile matches your code

**Solution:**
```bash
# Test locally first
cd pos-backend
docker build -t pos-backend .
docker run -p 5000:5000 pos-backend
```

#### ❌ Database Connection Fails
**Check:**
- All DB environment variables are set correctly
- Database is in the same region as web service
- Database is running (not suspended)

**Solution:**
- Verify database credentials match
- Check Render PostgreSQL logs
- Ensure internal database URL is used

#### ❌ App Crashes on Startup
**Check backend logs for:**
- Missing environment variables
- Invalid JWT secret
- Email configuration errors

**Solution:**
- Add all required environment variables
- Generate new JWT secret: `openssl rand -base64 64`
- Verify email credentials

### Frontend Issues

#### ❌ Build Fails
**Check:**
- `package.json` has correct scripts
- All dependencies are in `package.json`
- Node version compatibility

**Solution:**
```bash
# Test build locally
cd pos-frontend-vite
pnpm install
pnpm build
```

#### ❌ API Calls Fail (CORS)
**Symptoms:**
- Console shows CORS errors
- Login doesn't work
- API requests blocked

**Solution:**
1. Verify `VITE_API_URL` in frontend matches backend URL
2. Update `CORS_ALLOWED_ORIGINS` in backend with frontend URL
3. Redeploy backend after CORS change

#### ❌ Environment Variables Not Working
**Remember:**
- Frontend env vars must start with `VITE_`
- Changes require rebuild
- Clear cache: `pnpm build --force`

### Performance Issues

#### ⚠️ Cold Starts (Free Tier)
Render free tier services spin down after 15 minutes of inactivity.

**Solutions:**
1. Upgrade to paid tier (no cold starts)
2. Use a ping service to keep it warm
3. Expect 30-60s delay on first load

#### ⚠️ Slow Database Queries
**Solutions:**
1. Add database indexes
2. Optimize queries
3. Upgrade database plan
4. Use database connection pooling

---

## Quick Reference

### Useful Commands

#### Generate JWT Secret
```bash
openssl rand -base64 64
```

#### Test Backend Locally with Docker
```bash
cd pos-backend
docker build -t pos-backend .
docker run -p 5000:5000 --env-file .env pos-backend
```

#### Test Frontend Build
```bash
cd pos-frontend-vite
pnpm build
pnpm preview
```

#### View Render Logs
```bash
# In Render Dashboard
Service → Logs → Select time range
```

### Important URLs

After deployment, save these URLs:

```
Frontend: https://your-frontend-name.onrender.com
Backend:  https://your-backend-name.onrender.com
Database: (internal URL only)
Health:   https://your-backend-name.onrender.com/actuator/health
```

---

## 🎉 Deployment Complete!

Your POS system should now be live on Render!

### Next Steps:
1. ✅ Test all features thoroughly
2. ✅ Change default admin password
3. ✅ Set up monitoring/alerts
4. ✅ Configure backups for database
5. ✅ Add custom domains (optional)
6. ✅ Set up SSL certificates (automatic on Render)

### Support:
- Render Docs: https://render.com/docs
- Backend Issues: Check `pos-backend/RENDER_DEPLOYMENT_GUIDE.md`
- Frontend Issues: Check `pos-frontend-vite/README.md`

---

**Last Updated:** October 2025
**Version:** 1.0.0

