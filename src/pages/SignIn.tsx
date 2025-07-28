import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  AlertCircle,
  Loader2,
  Home,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  validateEmail,
  validatePassword,
  sanitizeInput,
  RateLimiter,
} from "../utils/validation";
import { setupRecaptcha } from "../config/firebase";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    signIn,
    signInWithGoogle,
    signInWithGoogleRedirect,
    signInWithPhone,
    confirmPhoneSignIn,
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    verificationCode: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneStep, setPhoneStep] = useState<"phone" | "verification">("phone");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [rateLimiter] = useState(() => new RateLimiter(5, 15 * 60 * 1000));

  // Redirect if already authenticated
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Setup reCAPTCHA for phone authentication
    if (authMethod === "phone") {
      try {
        window.recaptchaVerifier = setupRecaptcha("recaptcha-container");
      } catch (error) {
        console.error("reCAPTCHA setup error:", error);
      }
    }
  }, [authMethod]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? sanitizeInput(value) : value,
    }));

    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (authMethod === "email") {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.errors[0];
      }

      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    } else {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      } else {
        // Basic phone number format validation
        const cleanPhone = formData.phoneNumber.replace(/[^\d+]/g, "");
        if (!cleanPhone.startsWith("+") && cleanPhone.length < 10) {
          newErrors.phoneNumber =
            "Please enter a valid phone number with country code";
        }
      }

      if (phoneStep === "verification") {
        if (!formData.verificationCode) {
          newErrors.verificationCode = "Verification code is required";
        } else if (formData.verificationCode.length !== 6) {
          newErrors.verificationCode = "Verification code must be 6 digits";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Rate limiting
    const identifier = formData.email;
    if (!rateLimiter.isAllowed(identifier)) {
      const remainingTime = Math.ceil(
        rateLimiter.getRemainingTime(identifier) / 60000,
      );
      setErrors({
        general: `Too many attempts. Please try again in ${remainingTime} minutes.`,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signIn(formData.email, formData.password, formData.rememberMe);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Sign in error:", error);

      let errorMessage = "An error occurred during sign in";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      // First try popup method
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Google sign in error:", error);

      // If popup is blocked, fall back to redirect method
      if (error.code === "auth/popup-blocked") {
        try {
          // Use redirect method as fallback
          await signInWithGoogleRedirect();
          // Note: redirect will handle navigation automatically
        } catch (redirectError: any) {
          console.error("Google redirect sign in error:", redirectError);
          setErrors({
            general:
              "Unable to sign in with Google. Please try again or use email sign in.",
          });
        }
      } else {
        setErrors({
          general: error.message || "Failed to sign in with Google",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (phoneStep === "phone") {
        const result = await signInWithPhone(formData.phoneNumber);
        setConfirmationResult(result);
        setPhoneStep("verification");
      } else {
        await confirmPhoneSignIn(confirmationResult, formData.verificationCode);
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error("Phone sign in error:", error);

      let errorMessage = "Phone authentication failed";

      switch (error.code) {
        case "auth/invalid-phone-number":
          errorMessage = "Invalid phone number format";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please try again later";
          break;
        case "auth/invalid-verification-code":
          errorMessage = "Invalid verification code";
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
    if (phoneStep === "verification") {
      setPhoneStep("phone");
      setFormData((prev) => ({ ...prev, verificationCode: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PropertyHub</h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setAuthMethod("email")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              authMethod === "email"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </button>
          <button
            onClick={() => setAuthMethod("phone")}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              authMethod === "phone"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
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

        {/* Email Sign In Form */}
        {authMethod === "email" && (
          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        )}

        {/* Phone Sign In Form */}
        {authMethod === "phone" && (
          <form onSubmit={handlePhoneSignIn} className="space-y-6">
            {phoneStep === "phone" ? (
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.phoneNumber
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567 or 5551234567"
                    disabled={isLoading}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-600">
                  Enter your phone number with country code (e.g., +1 for US).
                  We'll send you a verification code via SMS.
                </p>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) =>
                    handleInputChange("verificationCode", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.verificationCode
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter 6-digit code"
                  disabled={isLoading}
                />
                {errors.verificationCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.verificationCode}
                  </p>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {phoneStep === "phone" ? "Sending code..." : "Verifying..."}
                  </span>
                </>
              ) : (
                <span>
                  {phoneStep === "phone" ? "Send Code" : "Verify & Sign In"}
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
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
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
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;
