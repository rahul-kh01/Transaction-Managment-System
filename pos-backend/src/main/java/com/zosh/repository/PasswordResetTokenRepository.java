package com.zosh.repository;

import com.zosh.modal.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    // Count tokens that expired before the given time
    long countByExpiryDateBefore(LocalDateTime dateTime);

    // Delete tokens that expired before the given time
    void deleteAllByExpiryDateBefore(LocalDateTime dateTime);
}
