package com.zosh.repository;

import com.zosh.domain.PaymentOrderStatus;
import com.zosh.modal.PaymentOrder;
import com.zosh.modal.SubscriptionPlan;
import com.zosh.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {

    PaymentOrder findByPaymentLinkId(String paymentId);
    
    // ✅ NEW: Query by plan (uses new ManyToOne relationship)
    List<PaymentOrder> findByPlan(SubscriptionPlan plan);
    
    List<PaymentOrder> findByPlanId(Long planId);
    
    // ✅ NEW: Find user's payments for a specific plan
    List<PaymentOrder> findByUserAndPlan(User user, SubscriptionPlan plan);
    
    // ✅ NEW: Find by status
    List<PaymentOrder> findByStatus(PaymentOrderStatus status);
    
    // ✅ NEW: Find user's pending payments
    List<PaymentOrder> findByUserAndStatus(User user, PaymentOrderStatus status);
}
