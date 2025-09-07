// Validation middleware for common input validation

/**
 * Validates that a parameter is a positive integer
 */
const validatePositiveInteger = (paramName) => {
    return (req, res, next) => {
        const value = parseInt(req.params[paramName], 10);
        if (isNaN(value) || value <= 0) {
            return res.status(400).json({ error: `Invalid ${paramName}` });
        }
        req.params[paramName] = value; // Store the parsed value
        next();
    };
};

/**
 * Validates email format
 */
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates domain format
 */
const validateDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
    return domainRegex.test(domain);
};

/**
 * Sanitizes string input by trimming whitespace
 */
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.trim();
};

/**
 * Sanitizes email by converting to lowercase and trimming
 */
const sanitizeEmail = (email) => {
    if (typeof email !== 'string') return email;
    return email.toLowerCase().trim();
};

/**
 * Sanitizes domain by converting to lowercase and trimming
 */
const sanitizeDomain = (domain) => {
    if (typeof domain !== 'string') return domain;
    return domain.toLowerCase().trim();
};

/**
 * Validates string length
 */
const validateStringLength = (str, minLength, maxLength, fieldName) => {
    if (typeof str !== 'string') {
        return `${fieldName} must be a string`;
    }

    const trimmed = str.trim();
    if (trimmed.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters long`;
    }

    if (trimmed.length > maxLength) {
        return `${fieldName} must be less than ${maxLength} characters`;
    }

    return null;
};

/**
 * Validates that a value is one of the allowed values
 */
const validateEnum = (value, allowedValues, fieldName) => {
    if (!allowedValues.includes(value)) {
        return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
    }
    return null;
};

/**
 * Validates that a value is a boolean
 */
const validateBoolean = (value, fieldName) => {
    if (typeof value !== 'boolean') {
        return `${fieldName} must be a boolean value`;
    }
    return null;
};

module.exports = {
    validatePositiveInteger,
    validateEmail,
    validateDomain,
    sanitizeString,
    sanitizeEmail,
    sanitizeDomain,
    validateStringLength,
    validateEnum,
    validateBoolean
};
