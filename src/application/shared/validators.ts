const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_PATTERN = /^\d+$/;

export const isBlank = (value: string): boolean => value.trim().length === 0;

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value);

export const isDigitsOnly = (value: string): boolean => DIGITS_PATTERN.test(value);

export const isNonNegativeNumber = (value: number): boolean =>
  Number.isFinite(value) && value >= 0;

export const isNonNegativeInteger = (value: number): boolean =>
  Number.isInteger(value) && value >= 0;
