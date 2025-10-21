#!/bin/bash

# ======================================================
# Environment Variables Verification Script
# ======================================================
# This script checks if all required environment variables
# are properly set for Render deployment
# ======================================================

echo "========================================================"
echo "🔍 POS System - Environment Variables Verification"
echo "========================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
MISSING=0
SET=0

# Function to check environment variable
check_env() {
    local var_name=$1
    local is_required=$2
    local description=$3
    
    TOTAL=$((TOTAL + 1))
    
    if [ -z "${!var_name}" ]; then
        if [ "$is_required" = "required" ]; then
            echo -e "${RED}❌ MISSING (REQUIRED)${NC} - $var_name"
            echo "   Description: $description"
            MISSING=$((MISSING + 1))
        else
            echo -e "${YELLOW}⚠️  MISSING (OPTIONAL)${NC} - $var_name"
            echo "   Description: $description"
        fi
    else
        echo -e "${GREEN}✅ SET${NC} - $var_name"
        if [ "$var_name" != "DB_PASSWORD" ] && [ "$var_name" != "JWT_SECRET" ] && [ "$var_name" != "MAIL_PASSWORD" ] && [ "$var_name" != "RAZORPAY_API_SECRET" ]; then
            echo "   Value: ${!var_name}"
        else
            echo "   Value: [HIDDEN]"
        fi
        SET=$((SET + 1))
    fi
    echo ""
}

echo "========================================"
echo "📊 DATABASE CONFIGURATION"
echo "========================================"
check_env "DB_HOST" "required" "Neon database host (e.g., ep-xxx.us-east-1.aws.neon.tech)"
check_env "DB_PORT" "required" "Database port (default: 5432)"
check_env "DB_NAME" "required" "Database name (e.g., neondb)"
check_env "DB_USERNAME" "required" "Database username"
check_env "DB_PASSWORD" "required" "Database password"
check_env "DB_SSL_MODE" "required" "SSL mode (should be 'require' for Neon)"
check_env "DB_POOL_SIZE" "optional" "Connection pool size (default: 10)"
check_env "DB_MIN_IDLE" "optional" "Minimum idle connections (default: 5)"

echo "========================================"
echo "🖥️  SERVER CONFIGURATION"
echo "========================================"
check_env "SERVER_PORT" "required" "Server port (should be 10000 for Render)"

echo "========================================"
echo "🗄️  JPA/HIBERNATE CONFIGURATION"
echo "========================================"
check_env "JPA_DDL_AUTO" "required" "Hibernate DDL mode (should be 'update')"
check_env "JPA_SHOW_SQL" "optional" "Show SQL in logs (false for production)"

echo "========================================"
echo "🔐 JWT CONFIGURATION"
echo "========================================"
check_env "JWT_SECRET" "required" "JWT secret key (generate with: openssl rand -base64 64)"
check_env "JWT_EXPIRATION" "optional" "JWT token expiration in ms (default: 86400000 = 24h)"

echo "========================================"
echo "📧 EMAIL CONFIGURATION"
echo "========================================"
check_env "MAIL_HOST" "optional" "SMTP server host"
check_env "MAIL_PORT" "optional" "SMTP server port"
check_env "MAIL_USERNAME" "optional" "SMTP username"
check_env "MAIL_PASSWORD" "optional" "SMTP password"

echo "========================================"
echo "💳 PAYMENT GATEWAY CONFIGURATION"
echo "========================================"
check_env "RAZORPAY_API_KEY" "optional" "Razorpay API key"
check_env "RAZORPAY_API_SECRET" "optional" "Razorpay API secret"
check_env "STRIPE_API_KEY" "optional" "Stripe API key"

echo "========================================"
echo "🌐 CORS & FRONTEND CONFIGURATION"
echo "========================================"
check_env "CORS_ALLOWED_ORIGINS" "required" "Allowed CORS origins (comma-separated)"
check_env "FRONTEND_RESET_URL" "required" "Frontend password reset URL"

echo "========================================"
echo "📝 LOGGING CONFIGURATION"
echo "========================================"
check_env "LOG_LEVEL_ROOT" "optional" "Root log level (default: INFO)"
check_env "LOG_LEVEL_APP" "optional" "Application log level (default: DEBUG)"
check_env "LOG_LEVEL_SPRING" "optional" "Spring log level (default: INFO)"
check_env "LOG_LEVEL_SECURITY" "optional" "Security log level (default: INFO)"
check_env "LOG_LEVEL_SQL" "optional" "SQL log level (default: WARN)"
check_env "LOG_LEVEL_SQL_TRACE" "optional" "SQL trace log level (default: WARN)"
check_env "LOG_FILE" "optional" "Log file path (default: logs/pos-system.log)"

echo "========================================"
echo "🛠️  DEVELOPMENT CONFIGURATION"
echo "========================================"
check_env "DEVTOOLS_ENABLED" "optional" "DevTools enabled (should be false for production)"

echo ""
echo "========================================================"
echo "📊 VERIFICATION SUMMARY"
echo "========================================================"
echo -e "Total Variables Checked: ${TOTAL}"
echo -e "${GREEN}✅ Set: ${SET}${NC}"
echo -e "${RED}❌ Missing (Required): ${MISSING}${NC}"
echo ""

if [ $MISSING -gt 0 ]; then
    echo -e "${RED}⚠️  WARNING: ${MISSING} required environment variable(s) missing!${NC}"
    echo "   Please set these variables in Render Dashboard before deployment."
    echo ""
    echo "   Steps:"
    echo "   1. Go to Render Dashboard"
    echo "   2. Open your service (pos-backend)"
    echo "   3. Go to Environment tab"
    echo "   4. Add the missing variables"
    echo "   5. Click 'Save Changes'"
    echo ""
    exit 1
else
    echo -e "${GREEN}✅ All required environment variables are set!${NC}"
    echo ""
    echo "   Your application is ready for deployment! 🚀"
    echo ""
    echo "   Next steps:"
    echo "   1. Commit and push your changes"
    echo "   2. Monitor deployment in Render Dashboard"
    echo "   3. Test health endpoint: /actuator/health"
    echo ""
    exit 0
fi

