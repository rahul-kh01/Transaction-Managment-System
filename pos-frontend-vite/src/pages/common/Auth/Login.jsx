import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {FiEye, FiEyeOff, FiMail, FiLock, FiShoppingCart, FiArrowLeft, FiCheckCircle} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/Redux Toolkit/features/auth/authThunk'
import { getUserProfile } from '../../../Redux Toolkit/features/user/userThunks'
import { startShift } from '../../../Redux Toolkit/features/shiftReport/shiftReportThunks'
import { ThemeToggle } from '../../../components/theme-toggle'
import { forgotPassword } from '../../../Redux Toolkit/features/auth/authThunk'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [forgotEmail, setForgotEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { error, loading } = useSelector((state) => state.auth)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resultAction = await dispatch(login(formData))
      if (login.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Login successful!",
        })

        const user=resultAction.payload.user;

        console.log('Login success:', resultAction.payload.user.role)
        dispatch(getUserProfile(resultAction.payload.jwt)); 
        
        
        // Redirect based on user role
        const userRole = user.role
        if (userRole === 'ROLE_BRANCH_CASHIER') {
          navigate('/cashier')
          dispatch(startShift(user.branchId))
        
        } else if (userRole === 'ROLE_STORE_ADMIN' || userRole === 'ROLE_STORE_MANAGER') {
          navigate('/store')
        } else if (userRole === 'ROLE_BRANCH_MANAGER' || userRole === 'ROLE_BRANCH_ADMIN') {
          navigate('/branch')
        } else {
          // Unknown role, redirect to landing page
          navigate('/')
        }
      } else {
        toast({
          title: "Error",
          description: resultAction.payload || 'Login failed',
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || 'Login failed',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    try {
      const resultAction = await dispatch(forgotPassword(forgotEmail))
       if (forgotPassword.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Password reset email sent!",
        })
      }else{
        console.log("error", error)
        toast({
        title: "Error",
        description: error || 'Failed to send reset email',
        variant: "destructive",
      })
      }
    } catch (error) {
      console.log("error", error)
      toast({
        title: "Error",
        description: error || 'Failed to send reset email',
        variant: "destructive",
      })
      return
    }

    
    
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setEmailSent(false)
    setForgotEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        {/* Logo and Back Button */}
        <div className="text-center mb-8">
         
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FiShoppingCart  className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Transaction Management System Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {showForgotPassword 
              ? 'Enter your email to receive reset instructions'
              : 'Sign in to your account to continue'
            }
          </p>
        </div>

        {/* Login Form */}
        {!showForgotPassword && !emailSent && (
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <FiMail  className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <FiLock  className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    ) : (
                      <FiEye  className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Demo Account Info */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo Account:</strong><br />
                Email: demo@pospro.com<br />
                Password: demo123
              </p>
            </div>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && !emailSent && (
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <FiMail  className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    id="forgot-email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetForgotPassword}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Email Sent Success */}
        {emailSent && (
          <div className="bg-card rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle  className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Check Your Email
            </h3>
            <p className="text-muted-foreground mb-6">
              We've sent password reset instructions to <strong>{forgotEmail}</strong>
            </p>
            <div className="space-y-3">
              <Button
                onClick={resetForgotPassword}
                className="w-full"
              >
                Back to Login
              </Button>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-primary hover:text-primary/80"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Footer
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default Login 