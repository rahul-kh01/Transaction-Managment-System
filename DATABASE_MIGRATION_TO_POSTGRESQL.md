# 🔄 Database Migration: MySQL → PostgreSQL

## ✅ What Was Fixed

Your application was configured for **MySQL** but Render's free tier uses **PostgreSQL**. This caused the deployment to fail with:

```
Unable to determine Dialect without JDBC metadata
```

## 🛠️ Changes Made

### 1. Updated `pom.xml`
- ✅ Added PostgreSQL driver dependency
- ✅ Made MySQL driver optional (for local development only)

```xml
<!-- PostgreSQL Driver for Render deployment -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 2. Updated `application.yml`
- ✅ Changed default database URL to PostgreSQL format
- ✅ Changed driver class to `org.postgresql.Driver`
- ✅ Added PostgreSQL dialect configuration
- ✅ Added support for `DATABASE_URL` environment variable (Render best practice)

```yaml
datasource:
  url: ${DATABASE_URL:jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:pos}?sslmode=${DB_SSL_MODE:disable}}
  driver-class-name: ${DB_DRIVER:org.postgresql.Driver}
```

### 3. Updated `application-dev.yml`
- ✅ Configured to use MySQL for local development
- ✅ Added MySQL-specific settings

This allows you to:
- Use **PostgreSQL** on Render (production)
- Use **MySQL** locally (development)

### 4. Updated `render.yaml` (both files)
- ✅ Simplified database configuration to use `DATABASE_URL`
- ✅ Added `DB_SSL_MODE=require` for secure connections

## 📋 Next Steps

### Step 1: Commit and Push Changes
```bash
cd /home/maverick/E/Project/Temp/pos

git add .
git commit -m "Fix: Migrate from MySQL to PostgreSQL for Render deployment"
git push origin main
```

### Step 2: Deploy on Render

**Option A: Using Blueprint (Recommended)**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Select the repository with your code
5. Render will automatically:
   - Create PostgreSQL database
   - Deploy backend
   - Deploy frontend (if using root `render.yaml`)
   - Link them together

**Option B: Manual Deployment**
1. Create PostgreSQL database first
2. Create backend web service
3. Link database to backend
4. Deploy

### Step 3: Set Required Environment Variables

After deployment, go to **Backend Service → Environment** and add:

#### Critical (Required):
```bash
JWT_SECRET=<generate with: openssl rand -base64 64>
MAIL_USERNAME=<your-gmail@gmail.com>
MAIL_PASSWORD=<gmail-app-password>
```

#### Optional (for features):
```bash
RAZORPAY_API_KEY=<your-key>
RAZORPAY_API_SECRET=<your-secret>
STRIPE_API_KEY=<your-key>
```

### Step 4: Update URLs After Deployment

Once deployed, you'll get URLs like:
- Backend: `https://pos-backend.onrender.com`
- Frontend: `https://pos-frontend.onrender.com`

Update these in **Backend Environment**:
```bash
CORS_ALLOWED_ORIGINS=https://pos-frontend.onrender.com,http://localhost:5173
FRONTEND_RESET_URL=https://pos-frontend.onrender.com/auth/reset-password?token=
```

Update in **Frontend Environment**:
```bash
VITE_API_URL=https://pos-backend.onrender.com
```

Then **redeploy both services**.

## 🔧 Local Development

### For MySQL (Default Dev Setup)
```bash
# Use dev profile
export SPRING_PROFILES_ACTIVE=dev

# Start application
./mvnw spring-boot:run
```

### For PostgreSQL (Test Render Setup Locally)
```bash
# Install PostgreSQL locally
sudo apt install postgresql  # Ubuntu/Debian
brew install postgresql      # macOS

# Create database
sudo -u postgres psql
CREATE DATABASE pos;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE pos TO postgres;
\q

# Start application (uses default profile)
./mvnw spring-boot:run
```

## 📊 Database Comparison

| Feature | MySQL (Local Dev) | PostgreSQL (Render) |
|---------|------------------|---------------------|
| Profile | `dev` | `default` / `prod` |
| URL Format | `jdbc:mysql://...` | `jdbc:postgresql://...` |
| Driver | `com.mysql.cj.jdbc.Driver` | `org.postgresql.Driver` |
| Dialect | `MySQLDialect` | `PostgreSQLDialect` |
| Port | 3306 | 5432 |
| SSL | Optional | Required on Render |

## ⚠️ Important Notes

### Database Schema Differences
PostgreSQL and MySQL have some differences:
- **Case Sensitivity**: PostgreSQL is case-sensitive for table/column names
- **Auto-increment**: PostgreSQL uses `SERIAL` instead of `AUTO_INCREMENT`
- **Data Types**: Some types differ (e.g., `TEXT` vs `LONGTEXT`)

Your JPA entities should work fine with both, but be aware when writing native queries.

### First Deployment
On first deployment, Hibernate will create all tables automatically (`ddl-auto: update`).

### Data Initialization
Your `DataInitializationComponent` will run on startup and create sample data.

## 🎯 Testing the Fix

### 1. Check Backend Health
```bash
curl https://pos-backend.onrender.com/actuator/health
```

Expected response:
```json
{"status":"UP"}
```

### 2. Check Database Connection
Look for these logs in Render:
```
HikariPool-1 - Starting...
HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection
Initialized JPA EntityManagerFactory
```

### 3. Check Sample Data
If data initialization is enabled, you should see:
```
Starting data initialization...
Created 5 restaurants
Created 50 products
Created 100 orders
Data initialization completed successfully
```

## 🆘 Troubleshooting

### Error: "password authentication failed"
- Check that `DATABASE_URL` is set correctly
- Render auto-sets this when you link the database

### Error: "database does not exist"
- Make sure you created the database in Render
- Database should be linked to the web service

### Error: "SSL connection required"
- Ensure `DB_SSL_MODE=require` is set
- This is required for Render PostgreSQL

### Error: "Driver not found"
- Make sure you pushed the updated `pom.xml`
- Render needs to rebuild with PostgreSQL driver

## 📚 Additional Resources

- [Render PostgreSQL Docs](https://render.com/docs/databases)
- [Spring Boot with PostgreSQL](https://spring.io/guides/gs/accessing-data-jpa/)
- [Hibernate PostgreSQL Dialect](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#database-dialect)

---

**Your application is now ready for Render deployment with PostgreSQL!** 🚀

