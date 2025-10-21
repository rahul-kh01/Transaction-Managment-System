# JWT Validation Testing Guide

This guide provides comprehensive test scenarios to verify JWT authentication and validation between the frontend and backend.

---

## 🎯 Testing Objectives

1. Verify JWT token is correctly generated on login/signup
2. Verify JWT token is automatically attached to API requests
3. Verify backend correctly validates JWT tokens
4. Verify 401 handling and automatic logout
5. Verify token expiry handling
6. Verify CORS configuration works correctly

---

## 🔧 Test Environment Setup

### Prerequisites:
- ✅ Backend running on `http://localhost:5000`
- ✅ Frontend running on `http://localhost:5173`
- ✅ MySQL database running and accessible
- ✅ Environment variables configured

### Required Environment Variables (Backend):
```bash
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pos
DB_USERNAME=root
DB_PASSWORD=your-password
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

---

## 📋 Test Scenarios

### Test Category 1: Authentication Flow

#### Test 1.1: User Signup ✅
**Endpoint**: `POST /auth/signup`
**Expected Behavior**:
1. User fills signup form with valid data
2. Frontend sends request to `/auth/signup`
3. Backend creates user and generates JWT
4. Backend returns `ApiResponseBody<AuthResponse>` with structure:
   ```json
   {
     "success": true,
     "message": "User created successfully",
     "timestamp": "2025-10-21T10:30:00+00:00",
     "data": {
       "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "message": "Register success",
       "title": "Welcome user@example.com",
       "user": {
         "id": 1,
         "email": "user@example.com",
         "fullName": "John Doe",
         "role": "ROLE_STORE_MANAGER"
       }
     }
   }
   ```
5. Frontend extracts: `res.data.data.jwt` ✅
6. JWT stored in localStorage under key "jwt"
7. User redirected to dashboard

**Manual Test Steps**:
```javascript
// Open browser console on signup page
// Fill form and click signup
// Check localStorage:
console.log('JWT Token:', localStorage.getItem('jwt'));
// Should see JWT token starting with "eyJ..."
```

**Validation Checklist**:
- [ ] Response has `success: true`
- [ ] Response has `data.jwt` field
- [ ] Response has `data.user` with correct user data
- [ ] JWT token stored in localStorage
- [ ] Token format: `eyJ...` (Base64 encoded)
- [ ] User redirected to appropriate page

---

#### Test 1.2: User Login ✅
**Endpoint**: `POST /auth/login`
**Expected Behavior**:
1. User enters email and password
2. Frontend sends credentials to `/auth/login`
3. Backend validates credentials
4. Backend generates JWT with user info
5. Backend returns same structure as signup
6. Frontend stores JWT and redirects

**Manual Test Steps**:
```javascript
// Open browser console on login page
// Before login:
console.log('JWT Before:', localStorage.getItem('jwt')); // Should be null

// After login:
console.log('JWT After:', localStorage.getItem('jwt')); // Should have token
```

**Validation Checklist**:
- [ ] Correct credentials → successful login
- [ ] Wrong password → error message displayed
- [ ] Non-existent email → error message displayed
- [ ] JWT token stored in localStorage
- [ ] `lastLogin` updated in database
- [ ] User redirected to dashboard

---

#### Test 1.3: Password Reset Flow ✅
**Endpoints**: 
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

**Expected Behavior**:
1. User enters email for password reset
2. Backend generates reset token (valid 5 minutes)
3. Backend sends email with reset link
4. User clicks link with token
5. User enters new password
6. Backend validates token and updates password
7. User can login with new password

**Manual Test Steps**:
```javascript
// Test forgot password:
const email = "test@example.com";
const response = await fetch('http://localhost:5000/auth/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
console.log(await response.json());
// Expected: { message: "A Reset link was sent to your email." }

// Check email for reset link
// Click link or extract token from URL

// Test reset password:
const token = "extracted-token-from-email";
const response2 = await fetch('http://localhost:5000/auth/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, password: "newPassword123" })
});
console.log(await response2.json());
// Expected: { message: "Password reset successful" }
```

**Validation Checklist**:
- [ ] Email sent for valid user email
- [ ] No error for non-existent email (security)
- [ ] Token expires after 5 minutes
- [ ] Expired token rejected
- [ ] Password successfully updated
- [ ] Can login with new password
- [ ] Old password no longer works

---

### Test Category 2: JWT Token Validation

#### Test 2.1: Valid Token Request ✅
**Expected Behavior**:
1. User logged in with valid JWT in localStorage
2. Any API request automatically includes: `Authorization: Bearer <token>`
3. Backend validates token signature
4. Backend extracts email and authorities from token
5. Request succeeds

**Manual Test Steps**:
```javascript
// In browser console (after login):
const token = localStorage.getItem('jwt');
console.log('Token:', token);

// Make authenticated request:
const response = await fetch('http://localhost:5000/api/stores', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
console.log('Status:', response.status); // Should be 200
console.log('Data:', await response.json());
```

**Validation Checklist**:
- [ ] Request header contains `Authorization: Bearer <token>`
- [ ] Token correctly parsed by JwtValidator
- [ ] Email extracted from token claims
- [ ] Authorities extracted from token claims
- [ ] SecurityContext populated with authentication
- [ ] Request succeeds with 200 status

---

#### Test 2.2: Missing Token Request ❌
**Expected Behavior**:
1. User not logged in (no JWT in localStorage)
2. Request to protected endpoint
3. Interceptor doesn't add Authorization header
4. Backend returns 401 Unauthorized
5. Response interceptor catches 401
6. localStorage cleared
7. User redirected to login page

**Manual Test Steps**:
```javascript
// Clear localStorage:
localStorage.clear();

// Try to access protected endpoint:
const response = await fetch('http://localhost:5000/api/stores', {
  headers: { 'Content-Type': 'application/json' }
});
console.log('Status:', response.status); // Should be 401
console.log('Error:', await response.json());

// Check if redirected to login page automatically
console.log('Current URL:', window.location.pathname);
```

**Validation Checklist**:
- [ ] Request sent without Authorization header
- [ ] Backend returns 401 Unauthorized
- [ ] Response body: `{ "message": "Invalid token...." }`
- [ ] Interceptor logs error message
- [ ] localStorage cleared
- [ ] Page redirected to `/auth/login`

---

#### Test 2.3: Invalid/Malformed Token ❌
**Expected Behavior**:
1. Manually set invalid token in localStorage
2. Make API request
3. Interceptor adds invalid token
4. Backend JwtValidator throws BadCredentialsException
5. 401 response returned
6. Automatic logout and redirect

**Manual Test Steps**:
```javascript
// Set invalid token:
localStorage.setItem('jwt', 'invalid-token-12345');

// Try API request:
const response = await fetch('http://localhost:5000/api/stores', {
  headers: {
    'Authorization': `Bearer invalid-token-12345`,
    'Content-Type': 'application/json'
  }
});
console.log('Status:', response.status); // Should be 401

// Verify automatic handling:
setTimeout(() => {
  console.log('Token cleared?', localStorage.getItem('jwt')); // Should be null
  console.log('Redirected?', window.location.pathname); // Should be /auth/login
}, 100);
```

**Validation Checklist**:
- [ ] Invalid token sent in request
- [ ] Backend catches exception in JwtValidator
- [ ] 401 status returned
- [ ] Error message: "Invalid token...."
- [ ] localStorage cleared by interceptor
- [ ] Redirect to login page

---

#### Test 2.4: Expired Token ❌
**Expected Behavior**:
1. JWT token expired (after 24 hours by default)
2. User tries to make request
3. Backend JwtValidator detects expired token
4. 401 Unauthorized returned
5. Automatic logout and redirect

**Manual Test Steps** (Requires backend code change for testing):
```java
// Temporarily change JWT expiration in JwtProvider.java:
.expiration(new Date(new Date().getTime() + 1000)) // 1 second

// After login, wait 2 seconds, then:
const response = await fetch('http://localhost:5000/api/stores', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});
console.log('Status:', response.status); // Should be 401
```

**Validation Checklist**:
- [ ] Expired token detected by backend
- [ ] 401 status returned
- [ ] Automatic logout triggered
- [ ] User redirected to login
- [ ] localStorage cleared

---

### Test Category 3: Axios Interceptor Behavior

#### Test 3.1: Request Interceptor Adds Token ✅
**Expected Behavior**:
1. JWT exists in localStorage
2. Any axios request made via `api` instance
3. Request interceptor runs before request
4. Interceptor adds `Authorization: Bearer <token>` header
5. Request sent with token

**Manual Test Steps**:
```javascript
// In browser console (after login):
import api from './utils/api';

// Log the interceptor behavior:
api.interceptors.request.use((config) => {
  console.log('Request Headers:', config.headers);
  return config;
});

// Make request:
await api.get('/api/stores');

// Check console - should show:
// Request Headers: { Authorization: "Bearer eyJ...", Content-Type: "application/json" }
```

**Validation Checklist**:
- [ ] Interceptor runs on every request
- [ ] Token retrieved from localStorage
- [ ] Authorization header added
- [ ] Token format: `Bearer <token>`
- [ ] Request succeeds

---

#### Test 3.2: Response Interceptor Handles 401 ✅
**Expected Behavior**:
1. Backend returns 401 (token invalid/expired)
2. Response interceptor catches error
3. Logs error message to console
4. Clears localStorage (jwt and token)
5. Redirects to login page if not already there

**Manual Test Steps**:
```javascript
// Set invalid token:
localStorage.setItem('jwt', 'invalid-token');

// Make request using api instance:
import api from './utils/api';
try {
  await api.get('/api/stores');
} catch (error) {
  console.log('Error caught by interceptor');
  console.log('localStorage cleared?', localStorage.getItem('jwt') === null);
  console.log('Redirected?', window.location.pathname === '/auth/login');
}
```

**Validation Checklist**:
- [ ] 401 error caught by response interceptor
- [ ] Console error logged: "❌ Authentication failed..."
- [ ] localStorage.removeItem('jwt') called
- [ ] localStorage.removeItem('token') called
- [ ] window.location.href set to '/auth/login'
- [ ] Redirect only happens if not already on login page

---

#### Test 3.3: Response Interceptor Handles Other Errors ✅
**Test 403 Forbidden**:
```javascript
// Try to access endpoint without permission
// E.g., non-admin trying to access /api/super-admin/dashboard/summary
try {
  await api.get('/api/super-admin/dashboard/summary');
} catch (error) {
  // Check console for: "❌ Access denied. You do not have permission..."
}
```

**Test 404 Not Found**:
```javascript
// Request non-existent resource
try {
  await api.get('/api/stores/999999');
} catch (error) {
  // Check console for: "❌ Resource not found: /api/stores/999999"
}
```

**Test 500 Server Error**:
```javascript
// Trigger server error (e.g., database connection issue)
try {
  await api.get('/api/some-broken-endpoint');
} catch (error) {
  // Check console for: "❌ Server error. Please try again later."
}
```

**Validation Checklist**:
- [ ] 403: Logs "Access denied" message
- [ ] 404: Logs "Resource not found" with URL
- [ ] 500: Logs "Server error" message
- [ ] Other errors: Logs status and message
- [ ] Network errors: Logs "No response from server"

---

### Test Category 4: Backend JWT Validation

#### Test 4.1: JwtValidator Filter Chain ✅
**Expected Behavior**:
1. Request arrives at backend
2. JwtValidator filter intercepts (before controller)
3. Extracts JWT from `Authorization` header
4. Removes "Bearer " prefix (7 characters)
5. Parses token using secret key
6. Extracts claims: email, authorities
7. Creates Authentication object
8. Sets SecurityContext
9. Request proceeds to controller

**Manual Test Steps** (Backend logs):
```bash
# Enable debug logging in application-dev.yml:
logging:
  level:
    com.zosh.configrations.JwtValidator: DEBUG

# Restart backend and check logs when making request
# Should see JWT validation process
```

**Validation Checklist**:
- [ ] Filter runs on every request to `/api/**`
- [ ] JWT header extracted correctly
- [ ] "Bearer " prefix removed (substring 7)
- [ ] Token parsed successfully
- [ ] Email claim extracted
- [ ] Authorities claim extracted
- [ ] Authentication object created
- [ ] SecurityContext populated
- [ ] Request continues to controller

---

#### Test 4.2: JwtProvider Token Generation ✅
**Expected Behavior**:
1. User authenticates successfully
2. JwtProvider.generateToken() called
3. Token created with:
   - Issue date: current time
   - Expiration: current time + 24 hours
   - Claim "email": user's email
   - Claim "authorities": user's roles (comma-separated)
   - Signed with secret key

**Manual Test Steps** (Decode JWT):
```javascript
// Copy JWT token from localStorage
const token = localStorage.getItem('jwt');

// Decode at jwt.io or:
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
  return JSON.parse(jsonPayload);
}

const decoded = parseJwt(token);
console.log('Decoded JWT:', decoded);
// Expected structure:
// {
//   "email": "user@example.com",
//   "authorities": "ROLE_STORE_MANAGER",
//   "iat": 1729506000,
//   "exp": 1729592400
// }
```

**Validation Checklist**:
- [ ] Token has 3 parts (header.payload.signature)
- [ ] Payload contains "email" claim
- [ ] Payload contains "authorities" claim
- [ ] Issue time (iat) is current time
- [ ] Expiry (exp) is iat + 86400000ms (24 hours)
- [ ] Token signed with correct secret key
- [ ] Token can be validated by backend

---

### Test Category 5: Role-Based Access Control

#### Test 5.1: ROLE_ADMIN Endpoints ✅
**Expected Behavior**:
1. User with ROLE_ADMIN can access `/api/super-admin/**`
2. User without ROLE_ADMIN gets 403 Forbidden

**Manual Test Steps**:
```javascript
// Login as admin user
const adminToken = localStorage.getItem('jwt');

// Should succeed:
const response1 = await api.get('/api/super-admin/dashboard/summary');
console.log('Admin access:', response1.status); // Should be 200

// Login as non-admin (e.g., ROLE_STORE_MANAGER)
const nonAdminToken = localStorage.getItem('jwt');

// Should fail with 403:
try {
  const response2 = await api.get('/api/super-admin/dashboard/summary');
} catch (error) {
  console.log('Non-admin blocked:', error.response.status); // Should be 403
}
```

**Validation Checklist**:
- [ ] Admin user: 200 OK
- [ ] Store Manager: 403 Forbidden
- [ ] Cashier: 403 Forbidden
- [ ] Customer: 403 Forbidden
- [ ] No token: 401 Unauthorized

---

#### Test 5.2: ROLE_CASHIER Endpoints ✅
**Expected Behavior**:
1. `POST /api/orders` requires `@PreAuthorize("hasAuthority('ROLE_CASHIER')")`
2. Only users with ROLE_CASHIER can create orders

**Manual Test Steps**:
```javascript
// Login as cashier
const cashierToken = localStorage.getItem('jwt');

// Should succeed:
const orderData = {
  branchId: 1,
  customerId: 1,
  items: [{ productId: 1, quantity: 2, price: 10.00 }],
  paymentMethod: "CASH"
};

const response = await api.post('/api/orders', orderData);
console.log('Cashier creates order:', response.status); // Should be 200

// Login as customer
// Should fail with 403:
try {
  const response2 = await api.post('/api/orders', orderData);
} catch (error) {
  console.log('Customer blocked:', error.response.status); // Should be 403
}
```

**Validation Checklist**:
- [ ] ROLE_CASHIER: Can create orders
- [ ] ROLE_STORE_MANAGER: Cannot create orders (403)
- [ ] ROLE_CUSTOMER: Cannot create orders (403)
- [ ] No token: 401 Unauthorized

---

### Test Category 6: CORS Validation

#### Test 6.1: CORS Headers Present ✅
**Expected Behavior**:
1. Frontend on `http://localhost:5173` makes request
2. Backend on `http://localhost:5000` receives request
3. CORS headers added to response:
   - `Access-Control-Allow-Origin: http://localhost:5173`
   - `Access-Control-Allow-Methods: *`
   - `Access-Control-Allow-Headers: *`
   - `Access-Control-Allow-Credentials: true`
   - `Access-Control-Expose-Headers: Authorization`

**Manual Test Steps**:
```javascript
// In browser console (check network tab):
const response = await api.get('/api/stores');

// Check response headers in Network tab:
// Should see CORS headers listed above
```

**Validation Checklist**:
- [ ] Access-Control-Allow-Origin header present
- [ ] Origin matches frontend URL
- [ ] Credentials allowed (true)
- [ ] Authorization header exposed
- [ ] No CORS errors in console

---

## 🎯 Quick Test Checklist

Use this checklist to quickly verify all critical functionality:

### Authentication Flow:
- [ ] ✅ Signup creates user and returns JWT
- [ ] ✅ Login validates credentials and returns JWT
- [ ] ✅ JWT stored in localStorage
- [ ] ✅ Password reset flow works end-to-end

### Token Handling:
- [ ] ✅ Valid token → request succeeds
- [ ] ❌ No token → 401 error
- [ ] ❌ Invalid token → 401 error
- [ ] ❌ Expired token → 401 error

### Interceptor Behavior:
- [ ] ✅ Request interceptor adds token automatically
- [ ] ✅ Response interceptor handles 401 (logout + redirect)
- [ ] ✅ Response interceptor logs other errors

### Backend Validation:
- [ ] ✅ JwtValidator extracts and validates token
- [ ] ✅ Claims (email, authorities) extracted correctly
- [ ] ✅ SecurityContext populated
- [ ] ✅ Role-based access control works

### CORS:
- [ ] ✅ CORS headers present in response
- [ ] ✅ No CORS errors in console
- [ ] ✅ Preflight requests succeed

---

## 🐛 Common Issues and Solutions

### Issue 1: "401 Unauthorized" on every request
**Symptoms**: All requests fail with 401, even after login
**Possible Causes**:
- JWT not stored in localStorage
- Wrong localStorage key (should be 'jwt')
- Token not included in Authorization header
- Backend can't validate token (wrong secret)

**Solutions**:
```javascript
// Check if token exists:
console.log('Token:', localStorage.getItem('jwt'));

// Check if interceptor is working:
import api from './utils/api';
console.log('Interceptors:', api.interceptors.request.handlers.length);

// Check backend logs for JWT validation errors
```

---

### Issue 2: "CORS error" in browser console
**Symptoms**: Request blocked by CORS policy
**Possible Causes**:
- Backend CORS not configured for frontend URL
- Wrong port in backend configuration
- Preflight request failing

**Solutions**:
```yaml
# Check backend application.yml:
cors:
  allowed-origins: http://localhost:5173,http://localhost:3000

# Verify frontend is running on allowed port
```

---

### Issue 3: Token not automatically added to requests
**Symptoms**: Manual headers needed, interceptor not working
**Possible Causes**:
- Using different axios instance (not `api`)
- Interceptor not registered
- Token not in localStorage

**Solutions**:
```javascript
// Always use the configured api instance:
import api from './utils/api';

// DON'T use raw axios:
// import axios from 'axios'; ❌

// Verify interceptor registered:
console.log(api.interceptors.request.handlers.length); // Should be > 0
```

---

### Issue 4: "No response from server"
**Symptoms**: Request fails with network error
**Possible Causes**:
- Backend not running
- Wrong base URL in api.js
- Firewall blocking port 5000

**Solutions**:
```bash
# Check backend is running:
curl http://localhost:5000/auth/login

# Check frontend baseURL:
# Should be: http://localhost:5000
```

---

## 📊 Test Report Template

Use this template to document test results:

```
# JWT Validation Test Report
Date: [DATE]
Tester: [NAME]
Environment: [DEV/STAGING/PROD]

## Test Results Summary
- Total Tests: 24
- Passed: __
- Failed: __
- Skipped: __

## Detailed Results

### Authentication Flow
- [✅/❌] Signup: [NOTES]
- [✅/❌] Login: [NOTES]
- [✅/❌] Password Reset: [NOTES]

### Token Validation
- [✅/❌] Valid Token: [NOTES]
- [✅/❌] Invalid Token: [NOTES]
- [✅/❌] Expired Token: [NOTES]

### Interceptors
- [✅/❌] Request Interceptor: [NOTES]
- [✅/❌] Response Interceptor: [NOTES]

### Backend Validation
- [✅/❌] JwtValidator: [NOTES]
- [✅/❌] Role-Based Access: [NOTES]

### CORS
- [✅/❌] CORS Headers: [NOTES]

## Issues Found
1. [Issue description]
   - Impact: [HIGH/MEDIUM/LOW]
   - Steps to reproduce: [STEPS]
   - Solution: [SOLUTION]

## Recommendations
- [RECOMMENDATION 1]
- [RECOMMENDATION 2]

## Conclusion
[PASS/FAIL/CONDITIONAL PASS]
```

---

## ✅ Success Criteria

All tests pass when:
1. ✅ Users can signup and login successfully
2. ✅ JWT token automatically added to all authenticated requests
3. ✅ Invalid/expired tokens handled gracefully (logout + redirect)
4. ✅ Role-based access control works correctly
5. ✅ CORS allows frontend-backend communication
6. ✅ Error messages are clear and helpful
7. ✅ No console errors during normal operation
8. ✅ Security best practices followed

---

## 🔗 Related Documents
- `FRONTEND_BACKEND_ALIGNMENT_ANALYSIS.md` - Overall alignment analysis
- `TOKEN_HANDLING_OPTIMIZATION_REPORT.md` - Token handling patterns
- Backend: `SecurityConfig.java` - Security configuration
- Backend: `JwtValidator.java` - Token validation logic
- Backend: `JwtProvider.java` - Token generation logic
- Frontend: `api.js` - Axios configuration with interceptors

---

## 📝 Notes
- JWT expiration is 24 hours (86400000ms)
- Password reset token expires in 5 minutes
- Backend secret key must match between JwtProvider and JwtValidator
- localStorage key is 'jwt' (not 'token')
- All `/api/**` endpoints require authentication except `/auth/**`
- Only `/api/super-admin/**` requires ROLE_ADMIN

