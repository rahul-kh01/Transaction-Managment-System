# 🎨 Frontend Deployment Guide - Render

## Quick Deploy

### Option 1: Using Render Dashboard (Recommended)

1. **Create New Static Site**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Select the repository containing your POS system

2. **Configure Build Settings**
   ```
   Name: pos-frontend
   Branch: main
   Root Directory: pos-frontend-vite
   Build Command: pnpm install && pnpm build
   Publish Directory: dist
   ```

3. **Add Environment Variables**
   ```bash
   VITE_API_URL=https://your-backend-name.onrender.com
   VITE_APP_NAME=Zosh POS
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait 3-5 minutes for build
   - Your app will be live at `https://your-frontend-name.onrender.com`

---

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `https://pos-backend.onrender.com` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | `Zosh POS` |
| `VITE_APP_VERSION` | App version | `1.0.0` |
| `VITE_ENABLE_DEBUG` | Debug mode | `false` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |

---

## Build Configuration

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Vite Config (vite.config.js)

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false, // Disabled for production
    chunkSizeWarningLimit: 1000,
  }
})
```

---

## Post-Deployment

### 1. Update Backend CORS

After frontend is deployed, update backend environment variables:

```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-name.onrender.com,http://localhost:5173
FRONTEND_RESET_URL=https://your-frontend-name.onrender.com/auth/reset-password?token=
```

Then redeploy the backend.

### 2. Test the Deployment

1. **Access the app**: `https://your-frontend-name.onrender.com`
2. **Check console** for any errors
3. **Test login** with your credentials
4. **Verify API calls** are working

### 3. Custom Domain (Optional)

1. Go to Static Site Settings
2. Click "Custom Domains"
3. Add your domain (e.g., `pos.yourdomain.com`)
4. Update DNS:
   ```
   Type: CNAME
   Name: pos (or @)
   Value: your-frontend-name.onrender.com
   ```
5. SSL certificate will be auto-generated

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Solution: Check package.json has all dependencies
pnpm install
pnpm build
```

**Error: "Out of memory"**
```bash
# Solution: Increase Node memory
# In Render build command:
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

### API Calls Not Working

**CORS Errors in Console**
- Verify `VITE_API_URL` is correct
- Check backend `CORS_ALLOWED_ORIGINS` includes frontend URL
- Redeploy backend after CORS changes

**404 on API Calls**
- Check `VITE_API_URL` doesn't have trailing slash
- Verify backend is running
- Test backend health: `https://backend-url/actuator/health`

### Environment Variables Not Applied

**Remember:**
- All frontend env vars must start with `VITE_`
- Changes require rebuild
- Clear Render build cache if needed

### Routing Issues (404 on Refresh)

**Problem:** Page refreshes show 404

**Solution:** Add `_redirects` file in `public/` folder:
```
/*  /index.html  200
```

This is already handled by Vite's SPA mode, but if issues persist, ensure this file exists.

---

## Performance Optimization

### 1. Enable Gzip Compression
Render automatically compresses static assets.

### 2. Code Splitting
Already configured in `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
        'ui-vendor': ['lucide-react', 'recharts'],
      }
    }
  }
}
```

### 3. Image Optimization
- Use WebP format
- Compress images before upload
- Use lazy loading for images

### 4. Bundle Size
Check bundle size:
```bash
pnpm build
```

Look for warnings about large chunks. Split if necessary.

---

## Monitoring

### Performance Metrics

Use browser DevTools to monitor:
- Load time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

### Error Tracking

Consider adding:
- Sentry for error tracking
- Google Analytics for usage stats
- LogRocket for session replay

---

## Local Testing

Test production build locally before deploying:

```bash
# Build
pnpm build

# Preview production build
pnpm preview

# Test at http://localhost:4173
```

---

## CI/CD (Automatic Deployment)

Render automatically deploys on push to `main` branch.

### Manual Deployment
1. Go to your static site in Render
2. Click "Manual Deploy"
3. Select "Deploy latest commit"

### Deployment Hooks
You can trigger deploys via webhook:
```bash
curl -X POST https://api.render.com/deploy/srv-xxxxx?key=yyyy
```

---

## Checklist Before Going Live

- [ ] Backend is deployed and healthy
- [ ] `VITE_API_URL` points to production backend
- [ ] Backend CORS includes frontend URL
- [ ] All features tested in production
- [ ] Performance metrics are acceptable
- [ ] Error tracking is set up
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics configured (if desired)

---

## Quick Reference

### Build Locally
```bash
cd pos-frontend-vite
pnpm install
pnpm build
pnpm preview
```

### Common Render Commands
```bash
# View build logs
# In Render Dashboard → Your Static Site → Logs

# Clear build cache
# In Render Dashboard → Your Static Site → Settings → Clear Build Cache

# Redeploy
# In Render Dashboard → Your Static Site → Manual Deploy
```

### Support Resources
- [Render Static Sites Docs](https://render.com/docs/static-sites)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [React Router on Render](https://render.com/docs/deploy-react-router-spa)

---

**Last Updated:** October 2025

