const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an object of error messages keyed by field. Empty object means valid.
export function validate({ name, email, password }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter your name.';
  if (!email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter an email like name@example.com.';
  if (!password) errors.password = 'Enter a password.';
  else if (password.length < 8) errors.password = 'Use at least 8 characters.';
  return errors;
}

// Focus order requested by the exam.
export const FIELD_ORDER = ['name', 'email', 'password'];
