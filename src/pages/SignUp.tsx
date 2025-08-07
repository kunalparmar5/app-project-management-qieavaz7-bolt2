import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Phone,
  AlertCircle,
  Loader2,
  Home,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword,
  validateName,
  validatePhoneNumber,
  checkPasswordStrength,
  sanitizeInput,
  RateLimiter 
} from '../utils/validation';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import { setupRecaptcha } from '../config/firebase';
import { ConfirmationResult } from 'firebase/auth';

interface FirebaseError extends Error {
  code?: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithGoogleRedirect, signInWithPhone, confirmPhoneSignIn } = useAuth();
  
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    verificationCode: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeToMarketing: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneStep, setPhoneStep] = useState<'phone' | 'verification'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(checkPasswordStrength(''));
  const [rateLimiter] = useState(() => new RateLimiter(3, 15 * 60 * 1000));

  useEffect(() => {
    // Setup reCAPTCHA for phone authentication
    if (authMethod === 'phone') {
      try {
        window.recaptchaVerifier = setupRecaptcha('recaptcha-container');
      } catch (error) {
        console.error('reCAPTCHA setup error:', error);
      }
    }
  }, [authMethod]);

  useEffect(() => {
    // Update password strength when password changes
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? sanitizeInput(value) : value
    }));
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (authMethod === 'email') {
      // Name validation
      const nameValidation = validateName(formData.name);
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.errors[0];
      }

      // Email validation
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.errors[0];
      }

      // Password validation
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }

      // Confirm password validation
      const confirmPasswordValidation = validateConfirmPassword(
        formData.password, 
        formData.confirmPassword
      );
      if (!confirmPasswordValidation.isValid) {
        newErrors.confirmPassword = confirmPasswordValidation.errors[0];
      }
    } else {
      // Name validation for phone signup
      const nameValidation = validateName(formData.name);
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.errors[0];
      }

      // Phone validation
      const phoneValidation = validatePhoneNumber(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        newErrors.phoneNumber = phoneValidation.errors[0];
      }
      
      if (phoneStep === 'verification' && !formData.verificationCode) {
        newErrors.verificationCode = 'Verification code is required';
      }
    }

    // Terms and privacy validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Rate limiting
    const identifier = formData.email;
    if (!rateLimiter.isAllowed(identifier)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(identifier) / 60000);
      setErrors({ general: `Too many attempts. Please try again in ${remainingTime} minutes.` });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signUp(formData.email, formData.password, formData.name);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const error = err as FirebaseError;
      console.error('Sign up error:', error);
      
      let errorMessage = 'An error occurred during sign up';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
      setErrors({ 
        general: 'Please agree to the Terms of Service and Privacy Policy before continuing' 
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // First try popup method
      await signInWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const error = err as FirebaseError;
      console.error('Google sign up error:', error);
      
      // If popup is blocked, try redirect method
      if (error.code === 'auth/popup-blocked') {
        try {
          // Use redirect method as fallback
          await signInWithGoogleRedirect();
          // Note: redirect will handle navigation automatically
        } catch (redirectErr) {
          const redirectError = redirectErr as FirebaseError;
          console.error('Google redirect sign up error:', redirectError);
          setErrors({ 
            general: 'Unable to sign up with Google. Please try again or use email signup.' 
          });
        }
      } else {
        // Handle other Google auth errors
        let errorMessage = 'Failed to sign up with Google';
        
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign up was cancelled. Please try again.';
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = 'Sign up was cancelled. Please try again.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with this email using a different sign-in method.';
            break;
          default:
            errorMessage = error.message || errorMessage;
        }
        
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (phoneStep === 'phone') {
        const result = await signInWithPhone(formData.phoneNumber);
        setConfirmationResult(result);
        setPhoneStep('verification');
      } else {
        if (confirmationResult) {
          await confirmPhoneSignIn(confirmationResult, formData.verificationCode);
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (err) {
      const error = err as FirebaseError;
      console.error('Phone sign up error:', error);
      
      let errorMessage = 'Phone authentication failed';
      
      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorMessage = 'Invalid phone number format';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        case 'auth/invalid-verification-code':
          errorMessage = 'Invalid verification code';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    if (phoneStep === 'verification') {
      setPhoneStep('phone');
      setFormData(prev => ({ ...prev, verificationCode: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PropertyHub</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Join thousands of users finding their perfect property</p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              authMethod === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              authMethod === 'phone'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Phone className="h-4 w-4" />
            <span>Phone</span>
          </button>
        </div>

        {/* Error Display */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Email Sign Up Form */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSignUp} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              
              {/* Password Strength Indicator */}
              <PasswordStrengthIndicator 
                strength={passwordStrength}
                password={formData.password}
                className="mt-3"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToPrivacy}
                  onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToPrivacy && (
                <p className="text-sm text-red-600">{errors.agreeToPrivacy}</p>
              )}

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.subscribeToMarketing}
                  onChange={(e) => handleInputChange('subscribeToMarketing', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I'd like to receive marketing emails about new properties and features (optional)
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwordStrength.isStrong}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>
        )}

        {/* Phone Sign Up Form */}
        {authMethod === 'phone' && (
          <form onSubmit={handlePhoneSignUp} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {phoneStep === 'phone' ? (
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                    disabled={isLoading}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
                <p className="mt-2 text-sm text-gray-600">
                  We'll send you a verification code via SMS
                </p>
              </div>
            ) : (
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.verificationCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter 6-digit code"
                  disabled={isLoading}
                />
                {errors.verificationCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.verificationCode}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Code sent to {formData.phoneNumber}
                  </p>
                  <button
                    type="button"
                    onClick={resendVerificationCode}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}

            {/* Terms and Privacy for Phone */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToPrivacy}
                  onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToPrivacy && (
                <p className="text-sm text-red-600">{errors.agreeToPrivacy}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {phoneStep === 'phone' ? 'Sending code...' : 'Verifying...'}
                  </span>
                </>
              ) : (
                <span>
                  {phoneStep === 'phone' ? 'Send Code' : 'Verify & Create Account'}
                </span>
              )}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignUp;