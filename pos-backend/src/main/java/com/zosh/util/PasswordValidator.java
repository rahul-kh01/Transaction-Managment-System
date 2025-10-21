package com.zosh.util;

import org.springframework.stereotype.Component;

/**
 * Password validation utility to enforce strong password policies
 * 
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - Maximum 100 characters
 */
@Component
public class PasswordValidator {
    
    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 100;
    
    // Pattern: At least one lowercase, one uppercase, one digit, 8-100 characters
    private static final String PASSWORD_PATTERN = 
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,100}$";
    
    /**
     * Validates password strength
     * @param password Password to validate
     * @throws IllegalArgumentException if password doesn't meet requirements
     */
    public void validate(String password) {
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        
        if (password.length() < MIN_LENGTH) {
            throw new IllegalArgumentException(
                "Password must be at least " + MIN_LENGTH + " characters");
        }
        
        if (password.length() > MAX_LENGTH) {
            throw new IllegalArgumentException(
                "Password must not exceed " + MAX_LENGTH + " characters");
        }
        
        if (!password.matches(PASSWORD_PATTERN)) {
            throw new IllegalArgumentException(
                "Password must contain at least one uppercase letter, " +
                "one lowercase letter, and one digit");
        }
    }
    
    /**
     * Checks if password is valid without throwing exception
     * @param password Password to check
     * @return true if valid, false otherwise
     */
    public boolean isValid(String password) {
        try {
            validate(password);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}

