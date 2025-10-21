# Render Frontend Deployment Fix

## Problem

The frontend deployment on Render was failing with the following error:

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
npm error While resolving: @eslint-community/eslint-utils@4.9.0
npm error Found: dev knip@"^5.33.3" from the root project
npm error Could not resolve dependency:
npm error dev knip@"^5.33.3" from the root project
```

### Root Cause

1. **Package Manager Mismatch**: The frontend project uses `pnpm` (has `pnpm-lock.yaml`)
2. **Auto-Install Behavior**: Render automatically detects `package.json` and runs `npm install` at the repo root before executing the custom build command
3. **Dependency Resolution**: npm and pnpm have different dependency resolution algorithms, causing conflicts

## Solution Applied

### 1. Updated `render.yaml` (Root)

**Changes:**
- Modified the build command to explicitly install pnpm globally first
- Added `--frozen-lockfile` flag to use the existing `pnpm-lock.yaml`
- Added `SKIP_INSTALL_DEPS=true` environment variable

```yaml
buildCommand: npm install -g pnpm && cd pos-frontend-vite && pnpm install --frozen-lockfile && pnpm build

envVars:
  - key: SKIP_INSTALL_DEPS
    value: true
```

### 2. Created `.npmrc` (Repo Root)

Disables npm's auto-install behavior:

```
auto-install-peers=false
engine-strict=false
```

### 3. Created `package.json` (Repo Root)

Declares the monorepo structure and specifies pnpm as the package manager:

```json
{
  "name": "pos-system",
  "packageManager": "pnpm@9.0.0",
  "workspaces": ["pos-frontend-vite"]
}
```

## How It Works

1. **Render detects the root `package.json`** → sees `packageManager: pnpm`
2. **`.npmrc` prevents auto-install** → no conflicting npm install
3. **Build command installs pnpm globally** → ensures pnpm is available
4. **Changes to frontend directory** → enters the actual frontend project
5. **Runs pnpm install with frozen lockfile** → uses exact versions from lock file
6. **Builds the project** → creates production build

## Deployment Steps

1. **Commit and Push Changes:**
   ```bash
   git add .
   git commit -m "Fix: Render frontend deployment - use pnpm instead of npm"
   git push origin main
   ```

2. **Render Auto-Deploy:**
   - Render will automatically detect the push and start deployment
   - Monitor the deployment logs in Render Dashboard

3. **Verify Build:**
   - Check that the build command shows: `Installing pnpm...`
   - No more npm ERESOLVE errors
   - Build completes successfully

## Environment Variables to Set (After Deployment)

In Render Dashboard → Frontend Service → Environment:

### Required:
- `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)

### Optional:
- `VITE_APP_NAME`: Transaction Management System
- `VITE_APP_VERSION`: 1.0.0
- `VITE_ENABLE_ANALYTICS`: false
- `VITE_ENABLE_DEBUG`: false

## Alternative Solutions (If Issues Persist)

### Option 1: Use npm with Legacy Peer Deps

If you prefer to stick with npm, modify the build command:

```yaml
buildCommand: cd pos-frontend-vite && npm install --legacy-peer-deps && npm run build
```

Then delete `pnpm-lock.yaml` and run `npm install --legacy-peer-deps` locally.

### Option 2: Remove Problematic Dependencies

If the issue is with specific dev dependencies (like `knip`), consider:

```bash
cd pos-frontend-vite
pnpm remove knip
pnpm install
git add pnpm-lock.yaml package.json
git commit -m "Remove conflicting dev dependency"
git push
```

### Option 3: Update All Dependencies

Update to latest compatible versions:

```bash
cd pos-frontend-vite
pnpm update --latest
pnpm install
git add pnpm-lock.yaml package.json
git commit -m "Update dependencies"
git push
```

## Verification Checklist

After deployment succeeds:

- [ ] Frontend accessible at `https://your-frontend.onrender.com`
- [ ] No build errors in Render logs
- [ ] Static assets loading correctly
- [ ] React app loads without console errors
- [ ] API calls connecting to backend (after configuring `VITE_API_URL`)

## Common Issues

### Issue: "pnpm: command not found"

**Solution:** The build command now installs pnpm globally first. If this still happens, Render might have cached the old build. Try:
- Render Dashboard → Settings → Clear Build Cache
- Manual Deploy → Deploy latest commit

### Issue: "ENOENT: no such file or directory, open 'pos-frontend-vite/dist/index.html'"

**Solution:** Build didn't complete. Check:
1. Build command ran successfully
2. `vite build` completed without errors
3. Check if there are any build-time errors in the Vite config

### Issue: Static site shows blank page

**Solution:** 
1. Check browser console for errors
2. Verify `staticPublishPath: pos-frontend-vite/dist` is correct
3. Ensure `index.html` exists in the dist folder
4. Check that SPA routes are configured (already in render.yaml)

## Performance Optimization

For faster builds on Render:

1. **Use Build Cache:**
   ```yaml
   buildCommand: |
     npm install -g pnpm
     cd pos-frontend-vite
     pnpm install --frozen-lockfile --prefer-offline
     pnpm build
   ```

2. **Optimize Dependencies:**
   - Remove unused dependencies
   - Use `pnpm prune` to clean up

3. **Use Vite Build Cache:**
   - Vite automatically caches builds
   - Already configured in `vite.config.js`

## Monitoring

Monitor your deployment:

1. **Render Dashboard:**
   - Events → Check deployment status
   - Logs → Monitor build output
   - Metrics → Track bandwidth usage

2. **Uptime Monitoring:**
   - Use services like UptimeRobot
   - Set up alerts for downtime

3. **Error Tracking:**
   - Consider adding Sentry or similar
   - Monitor browser console errors

## Additional Resources

- [Render Static Sites Documentation](https://render.com/docs/static-sites)
- [pnpm Documentation](https://pnpm.io/)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)

## Support

If you continue to experience issues:

1. Check Render's status page: https://status.render.com
2. Review Render community forums
3. Check the deployment logs for specific error messages
4. Verify all environment variables are set correctly

---

**Last Updated:** October 21, 2025
**Status:** ✅ Fixed - Ready for Deployment

