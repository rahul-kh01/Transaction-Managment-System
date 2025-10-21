package com.zosh.service.impl;

import com.zosh.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Scheduled task to clean up expired password reset tokens
 * 
 * Runs every hour to prevent database bloat and maintain security
 */
@Component
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class PasswordResetTokenCleanupTask {
    
    private final PasswordResetTokenRepository tokenRepository;
    
    /**
     * Deletes all expired password reset tokens from database
     * Runs every hour at minute 0
     */
    @Scheduled(cron = "0 0 * * * *") // Every hour
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            LocalDateTime now = LocalDateTime.now();
            long deletedCount = tokenRepository.countByExpiryDateBefore(now);
            
            if (deletedCount > 0) {
                tokenRepository.deleteAllByExpiryDateBefore(now);
                log.info("Cleaned up {} expired password reset tokens", deletedCount);
            } else {
                log.debug("No expired password reset tokens to clean up");
            }
        } catch (Exception e) {
            log.error("Error cleaning up expired password reset tokens", e);
        }
    }
}

