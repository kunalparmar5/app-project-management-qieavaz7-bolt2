import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { PasswordStrength } from '../utils/validation';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  password: string;
  className?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  strength,
  password,
  className = ''
}) => {
  const getStrengthColor = (score: number): string => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number): string => {
    if (score <= 1) return 'Weak';
    if (score <= 2) return 'Fair';
    if (score <= 3) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Password Strength</span>
          <span className={`text-sm font-medium ${
            strength.score <= 1 ? 'text-red-600' :
            strength.score <= 2 ? 'text-orange-600' :
            strength.score <= 3 ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {getStrengthText(strength.score)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength.score)}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
        <div className="grid grid-cols-1 gap-1 text-sm">
          <RequirementItem
            met={password.length >= 8}
            text="At least 8 characters"
          />
          <RequirementItem
            met={/(?=.*[a-z])/.test(password)}
            text="One lowercase letter"
          />
          <RequirementItem
            met={/(?=.*[A-Z])/.test(password)}
            text="One uppercase letter"
          />
          <RequirementItem
            met={/(?=.*\d)/.test(password)}
            text="One number"
          />
          <RequirementItem
            met={/(?=.*[@$!%*?&])/.test(password)}
            text="One special character (@$!%*?&)"
          />
        </div>
      </div>

      {/* Additional Feedback */}
      {strength.feedback.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800 mb-1">Suggestions:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li key={index}>• {feedback}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface RequirementItemProps {
  met: boolean;
  text: string;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => (
  <div className="flex items-center space-x-2">
    {met ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-gray-400" />
    )}
    <span className={`text-sm ${met ? 'text-green-700' : 'text-gray-600'}`}>
      {text}
    </span>
  </div>
);

export default PasswordStrengthIndicator;