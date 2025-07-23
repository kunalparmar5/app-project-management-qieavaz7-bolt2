// Validation utilities for authentication forms

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isStrong: boolean;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password strength checker
export const checkPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  const feedback: string[] = [];
  
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');
  
  if (/(?=.*[a-z])/.test(password)) score++;
  else feedback.push('Add lowercase letters');
  
  if (/(?=.*[A-Z])/.test(password)) score++;
  else feedback.push('Add uppercase letters');
  
  if (/(?=.*\d)/.test(password)) score++;
  else feedback.push('Add numbers');
  
  if (/(?=.*[@$!%*?&])/.test(password)) score++;
  else feedback.push('Add special characters');
  
  // Bonus points for length and complexity
  if (password.length >= 12) score += 0.5;
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) score += 0.5;
  
  return {
    score: Math.min(Math.floor(score), 4),
    feedback,
    isStrong: score >= 4
  };
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('Please confirm your password');
  } else if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else {
    if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (name.length > 50) {
      errors.push('Name must be less than 50 characters');
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.push('Name can only contain letters and spaces');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Phone number validation
export const validatePhoneNumber = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
  } else {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
      errors.push('Phone number must be at least 10 digits');
    }
    if (cleanPhone.length > 15) {
      errors.push('Phone number must be less than 15 digits');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone;
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim(); // Remove leading/trailing whitespace
};

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if under limit
    if (record.count < this.maxAttempts) {
      record.count++;
      record.lastAttempt = now;
      return true;
    }

    return false;
  }

  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;

    const elapsed = Date.now() - record.lastAttempt;
    return Math.max(0, this.windowMs - elapsed);
  }
}