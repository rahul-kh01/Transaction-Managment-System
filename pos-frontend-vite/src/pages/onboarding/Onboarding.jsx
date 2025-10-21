import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import OwnerDetailsForm from './OwnerDetailsForm';
import StoreDetailsForm from './StoreDetailsForm';
import { signup } from '../../Redux Toolkit/features/auth/authThunk';
import { createStore, getStoreByAdmin } from '../../Redux Toolkit/features/store/storeThunks';
import { getUserProfile } from '../../Redux Toolkit/features/user/userThunks';
import { useNavigate } from 'react-router';
// import { completeOnboarding, resetOnboarding } from '../../Redux Toolkit/features/onboarding/onboardingSlice';

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isCompleted } = useSelector((state) => state.onboarding);
  
  const [step, setStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [formData, setFormData] = useState({
    // Owner Details
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Store Details
    storeName: '',
    storeType: '',
    storeAddress: '',
  });
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  // On mount: check JWT, fetch profile, and store
  useEffect(() => {
    const checkOnboarding = async () => {
      const jwt = localStorage.getItem('jwt');
      
      if (jwt) {
        setLocalLoading(true);
        try {
          const userRes = await dispatch(getUserProfile(jwt)).unwrap();
          if (userRes && userRes.role === 'ROLE_STORE_ADMIN') {
            try {
              const storeRes = await dispatch(getStoreByAdmin(jwt)).unwrap();
              if (storeRes && storeRes.id) {
                // Store exists, redirect to dashboard or show message
                navigate('/store');
                
                return;
              } else {
                // No store, skip to store details
                setStep(2);
              }
            } catch (err) {
              // No store found, skip to store details
              setStep(2);
            }
          }
        } catch (err) {
          // Invalid jwt or error, clear jwt and stay on step 1
          localStorage.removeItem('jwt');
        }
        setLocalLoading(false);
      }
    };
    checkOnboarding();
    // eslint-disable-next-line
  }, [dispatch]);

  const handleStepSubmit = async (stepData) => {
    setLocalError(null);
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);
    if (step === 1) {
      // Signup step
      setLocalLoading(true);
      try {
        const signupRes = await dispatch(signup({
          fullName: updatedFormData.fullName,
          email: updatedFormData.email,
          password: updatedFormData.password,
          role: 'ROLE_STORE_ADMIN',
        })).unwrap();
        if (signupRes && signupRes.jwt) {
          localStorage.setItem('jwt', signupRes.data.jwt);
        }
        setFadeIn(false);
        setTimeout(() => {
          setStep(2);
          setFadeIn(true);
        }, 150);
      } catch (err) {
        setLocalError(err || 'Signup failed');
      }
      setLocalLoading(false);
    } else if (step === 2) {
      // Store creation step
      setLocalLoading(true);
      try {
        await dispatch(createStore({
         
            brand: updatedFormData.storeName,
            storeType: updatedFormData.storeType,
            storeAddress: updatedFormData.storeAddress,
          
        })).unwrap();
        // On success, redirect or show success
        navigate('/store');
      } catch (err) {
        setLocalError(err || 'Store creation failed');
      }
      setLocalLoading(false);
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      // Fade out current step
      setFadeIn(false);
      setTimeout(() => {
        setStep(step - 1);
        setFadeIn(true);
      }, 150);
    }
  };



  // Handle successful completion
  useEffect(() => {
    if (isCompleted) {
      alert('Onboarding completed successfully!');
      // TODO: Redirect to dashboard or login
    }
  }, [isCompleted]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OwnerDetailsForm
            initialValues={{
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      case 2:
        return (
          <StoreDetailsForm
            initialValues={{
              storeName: formData.storeName,
              storeType: formData.storeType,
              storeAddress: formData.storeAddress,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-indigo-50">
      <div className="flex min-h-screen">
        {/* Mobile Header - Only visible on small screens */}
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-purple-600 text-white p-6 z-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome to Your POS System
            </h1>
            <p className="text-primary/80 text-sm">
              Set up your business profile in minutes
            </p>
          </div>
        </div>

        {/* Left Side - Image Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-[#047857] to-[#022c22] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-white px-12">
            <div className="text-center max-w-md">
              {/* Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Welcome to Your
                <span className="block text-yellow-300">POS System</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg text-primary/80 mb-8 leading-relaxed">
                Set up your business profile and start managing your store efficiently. 
                It only takes a few minutes to get everything configured.
              </p>
              
              {/* Features List */}
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-primary/80">Easy inventory management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-primary/80">Real-time sales tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-primary/80">Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-8 pt-32 lg:pt-8 lg:h-screen lg:overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Step {step} of 2
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {step === 1 ? 'Owner Details' : 'Store Details'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-600 to-[#022c22] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Error Display */}
            {(error || localError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error || localError}
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {localLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-50">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {/* Form Card */}
            <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {step === 1 ? 'Create Your Account' : 'Store Information'}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {step === 1 
                    ? 'Let\'s start by setting up your account details' 
                    : 'Tell us about your business'
                  }
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  {renderStep()}
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-primary hover:text-green-900 font-medium">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 