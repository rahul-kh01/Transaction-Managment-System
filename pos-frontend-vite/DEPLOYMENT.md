# Frontend Deployment Guide

## Quick Deploy to Render

### Prerequisites
- GitHub repository connected to Render
- Backend already deployed (for API URL)

### Deploy Steps

1. **Use the root `render.yaml`** - It's already configured for pnpm

2. **Set Environment Variables in Render Dashboard:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

3. **Deploy:**
   - Render auto-deploys on push to main
   - Or manually trigger: Dashboard → Manual Deploy

4. **Verify:**
   - Open: `https://your-frontend.onrender.com`
   - Check console for any errors

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Environment Variables

Create `.env.local` for local development:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Transaction Management System
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Build Configuration

- **Build Tool:** Vite
- **Package Manager:** pnpm (required)
- **Output Directory:** `dist/`
- **Node Version:** 22.x (Render default)

## Troubleshooting

### Build fails with npm errors
→ Make sure root `render.yaml` uses pnpm (already configured)

### Blank page after deployment
→ Check browser console, verify VITE_API_URL is set

### API calls failing
→ Update VITE_API_URL to your backend URL
→ Verify backend CORS allows your frontend domain

## Performance

- Production build uses minification and tree-shaking
- Code splitting enabled for optimal loading
- Vite optimizes dependencies automatically

---

For detailed troubleshooting, see `/RENDER_FRONTEND_DEPLOYMENT_FIX.md`

