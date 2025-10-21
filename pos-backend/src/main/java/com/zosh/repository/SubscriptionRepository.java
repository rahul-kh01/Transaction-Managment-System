package com.zosh.repository;

import com.zosh.domain.PaymentStatus;
import com.zosh.domain.SubscriptionStatus;
import com.zosh.modal.Store;
import com.zosh.modal.Subscription;
import com.zosh.modal.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    // 📌 Get all subscriptions for a store
    List<Subscription> findByStore(Store store);

    // 📌 Get subscriptions by store + status
    List<Subscription> findByStoreAndStatus(Store store, SubscriptionStatus status);

    // 📌 Admin: Get all subscriptions with a specific status
    List<Subscription> findByStatus(SubscriptionStatus status);

    // ⏳ Get subscriptions expiring within a date range
    List<Subscription> findByEndDateBetween(LocalDate startDate, LocalDate endDate);

    // 🔢 Count by status (dashboard, stats)
    Long countByStatus(SubscriptionStatus status);
    
    // ✅ NEW: Query by plan
    List<Subscription> findByPlan(SubscriptionPlan plan);
    
    List<Subscription> findByPlanId(Long planId);
    
    // ✅ NEW: Find store's subscription for a specific plan
    Optional<Subscription> findByStoreAndPlan(Store store, SubscriptionPlan plan);
    
    // ✅ NEW: Complex query for payment processing
    Optional<Subscription> findByStoreAndPlanAndPaymentStatus(
        Store store, 
        SubscriptionPlan plan, 
        PaymentStatus paymentStatus
    );
    
    // ✅ NEW: Get active subscription for a store
    Optional<Subscription> findFirstByStoreAndStatusOrderByEndDateDesc(
        Store store, 
        SubscriptionStatus status
    );
}
