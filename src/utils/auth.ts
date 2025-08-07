// Phone number validation and formatting utilities
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters except +
  let formatted = phoneNumber.replace(/[^\d+]/g, "");

  // If no country code, assume US (+1)
  if (!formatted.startsWith("+")) {
    if (formatted.length === 10) {
      formatted = "+1" + formatted;
    } else if (formatted.length === 11 && formatted.startsWith("1")) {
      formatted = "+" + formatted;
    } else {
      // For other lengths, add + if missing
      formatted = "+" + formatted;
    }
  }

  return formatted;
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Basic validation for international phone numbers
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return (
    phoneRegex.test(phoneNumber) &&
    phoneNumber.length >= 8 &&
    phoneNumber.length <= 16
  );
};
