# ✅ Deployment Checklist - Render

## Pre-Deployment

### Repository Setup
- [ ] Code is pushed to GitHub
- [ ] All changes are committed
- [ ] `.gitignore` excludes `.env` files
- [ ] `render.yaml` is in repository root
- [ ] Dockerfile exists in `pos-backend/`

### Prerequisites
- [ ] Render account created
- [ ] GitHub account connected to Render
- [ ] Gmail account for email features
- [ ] 2FA enabled on Gmail
- [ ] Gmail App Password generated

### Required Credentials
- [ ] JWT Secret generated (`openssl rand -base64 64`)
- [ ] Gmail address ready
- [ ] Gmail App Password ready
- [ ] Payment gateway keys (if applicable)

---

## Backend Deployment

### Database Setup
- [ ] PostgreSQL database created on Render
- [ ] Database credentials saved
- [ ] Database is in same region as backend

### Backend Service
- [ ] Web service created (Docker runtime)
- [ ] Repository connected
- [ ] Root directory set to `pos-backend`
- [ ] Branch set to `main`

### Environment Variables Set
- [ ] `DB_HOST` (from database)
- [ ] `DB_PORT` (from database)
- [ ] `DB_NAME` (from database)
- [ ] `DB_USERNAME` (from database)
- [ ] `DB_PASSWORD` (from database)
- [ ] `JWT_SECRET` (generated)
- [ ] `JWT_EXPIRATION=86400000`
- [ ] `MAIL_HOST=smtp.gmail.com`
- [ ] `MAIL_PORT=587`
- [ ] `MAIL_USERNAME` (your Gmail)
- [ ] `MAIL_PASSWORD` (Gmail App Password)
- [ ] `SERVER_PORT=5000`
- [ ] `JPA_DDL_AUTO=update`
- [ ] `JPA_SHOW_SQL=false`
- [ ] `LOG_LEVEL_ROOT=INFO`

### Backend Deployment
- [ ] First deploy initiated
- [ ] Build completed successfully
- [ ] Service is running
- [ ] Health check passes
- [ ] Backend URL saved

---

## Frontend Deployment

### Static Site Setup
- [ ] Static site created on Render
- [ ] Repository connected
- [ ] Root directory set to `pos-frontend-vite`
- [ ] Build command: `pnpm install && pnpm build`
- [ ] Publish directory: `dist`

### Environment Variables Set
- [ ] `VITE_API_URL` (backend URL)
- [ ] `VITE_APP_NAME=Zosh POS`
- [ ] `VITE_APP_VERSION=1.0.0`

### Frontend Deployment
- [ ] First deploy initiated
- [ ] Build completed successfully
- [ ] Site is accessible
- [ ] Frontend URL saved

---

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Update `CORS_ALLOWED_ORIGINS` with frontend URL
- [ ] Update `FRONTEND_RESET_URL` with frontend URL
- [ ] Redeploy backend service

### URLs Configured
```
Frontend: https://__________.onrender.com
Backend:  https://__________.onrender.com
Health:   https://__________.onrender.com/actuator/health
```

---

## Testing

### Backend Tests
- [ ] Health endpoint returns `{"status":"UP"}`
- [ ] Can access API docs (if enabled)
- [ ] Database connection works
- [ ] Logs show no errors

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] No console errors
- [ ] Assets load properly
- [ ] Routing works (refresh on sub-pages)

### Integration Tests
- [ ] Login page displays
- [ ] Can register new account
- [ ] API calls reach backend
- [ ] No CORS errors in console
- [ ] Password reset email sent
- [ ] Can create/edit data

### User Flows
- [ ] Super admin can login
- [ ] Store owner can register
- [ ] Email verification works
- [ ] Password reset works
- [ ] Dashboard loads with data
- [ ] All major features work

---

## Security

### Credentials
- [ ] Default admin password changed
- [ ] JWT secret is strong (64+ characters)
- [ ] Environment variables are hidden
- [ ] No secrets in code or logs

### CORS
- [ ] CORS only allows frontend domain
- [ ] No wildcard (`*`) in production
- [ ] localhost removed from production CORS

### SSL/HTTPS
- [ ] Render SSL certificate active
- [ ] All requests use HTTPS
- [ ] No mixed content warnings

---

## Performance & Monitoring

### Performance
- [ ] Frontend loads in < 3 seconds
- [ ] API responses < 1 second
- [ ] No large bundle warnings
- [ ] Images optimized

### Monitoring Setup
- [ ] Render metrics enabled
- [ ] Log retention configured
- [ ] Error alerts set up (optional)
- [ ] Uptime monitoring (optional)

---

## Production Readiness

### Documentation
- [ ] Deployment guide reviewed
- [ ] Admin credentials documented (securely)
- [ ] API documentation available
- [ ] User guide prepared

### Backup & Recovery
- [ ] Database backup enabled
- [ ] Backup schedule configured
- [ ] Recovery process tested

### Scaling (if needed)
- [ ] Upgraded from free tier
- [ ] Database plan appropriate for load
- [ ] Connection pooling configured
- [ ] Caching strategy in place

---

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured
- [ ] SSL certificate generated
- [ ] Backend CORS updated with custom domain

### Additional Services
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Session replay (LogRocket)
- [ ] Email service (SendGrid/Mailgun)

### CI/CD
- [ ] Automated tests running
- [ ] Pre-deploy checks configured
- [ ] Deployment notifications set up
- [ ] Rollback procedure documented

---

## Launch Day

### Final Checks
- [ ] All tests passing
- [ ] No critical errors in logs
- [ ] Performance acceptable
- [ ] Security scan completed
- [ ] Team trained on system

### Go Live
- [ ] DNS updated (if custom domain)
- [ ] Users notified
- [ ] Support channels ready
- [ ] Monitoring active

### Post-Launch
- [ ] Monitor logs for 24 hours
- [ ] Check error rates
- [ ] Verify backups running
- [ ] Collect user feedback

---

## Troubleshooting Reference

### If Backend Fails
1. Check environment variables
2. Review build logs
3. Verify database connection
4. Check Dockerfile syntax
5. Test locally with Docker

### If Frontend Fails
1. Verify `VITE_API_URL`
2. Check build logs
3. Test build locally (`pnpm build`)
4. Verify `package.json` scripts
5. Clear Render build cache

### If API Calls Fail
1. Check CORS configuration
2. Verify backend is running
3. Test backend health endpoint
4. Check browser console for errors
5. Verify `VITE_API_URL` is correct

---

## Quick Commands

### Test Backend Locally
```bash
cd pos-backend
./mvnw spring-boot:run
# or with Docker
docker build -t pos-backend .
docker run -p 5000:5000 --env-file .env pos-backend
```

### Test Frontend Locally
```bash
cd pos-frontend-vite
pnpm install
pnpm dev
# Test production build
pnpm build
pnpm preview
```

### Generate JWT Secret
```bash
openssl rand -base64 64
```

### Check Backend Health
```bash
curl https://your-backend.onrender.com/actuator/health
```

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Deployment Guide**: See `RENDER_DEPLOYMENT_COMPLETE_GUIDE.md`
- **Backend Specific**: See `pos-backend/RENDER_DEPLOYMENT_GUIDE.md`
- **Frontend Specific**: See `pos-frontend-vite/RENDER_DEPLOYMENT.md`

---

**Status:** ⬜ Not Started | 🟨 In Progress | ✅ Complete

**Deployment Date:** _______________

**Deployed By:** _______________

**Backend URL:** _______________

**Frontend URL:** _______________

