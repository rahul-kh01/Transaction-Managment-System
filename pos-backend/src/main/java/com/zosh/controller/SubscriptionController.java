package com.zosh.controller;

import com.zosh.domain.PaymentStatus;
import com.zosh.domain.SubscriptionStatus;
import com.zosh.modal.Subscription;
import com.zosh.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;


    // 🆕 Store subscribes to a plan (TRIAL or NEW)
    @PostMapping("/subscribe")
    public Subscription createSubscription(
            @RequestParam Long storeId,
            @RequestParam Long planId,
            @RequestParam(defaultValue = "RAZORPAY") String gateway,
            @RequestParam(required = false) String transactionId
    ) {


        return subscriptionService.createSubscription(storeId, planId, gateway, transactionId);
    }

    // 🔁 Store upgrades to a new plan (ACTIVE)
    @PostMapping("/upgrade")
    public Subscription upgradePlan(
            @RequestParam Long storeId,
            @RequestParam Long planId,
            @RequestParam(defaultValue = "RAZORPAY") String gateway,
            @RequestParam(required = false) String transactionId
    ) {

        return subscriptionService.upgradeSubscription(storeId, planId, gateway, transactionId);
    }

    // ✅ Admin activates a subscription
    @PutMapping("/{subscriptionId}/activate")
    public Subscription activateSubscription(@PathVariable Long subscriptionId) {
        return subscriptionService.activateSubscription(subscriptionId);
    }

    // ❌ Admin cancels a subscription
    @PutMapping("/{subscriptionId}/cancel")
    public Subscription cancelSubscription(@PathVariable Long subscriptionId) {
        return subscriptionService.cancelSubscription(subscriptionId);
    }

    // 💳 Update payment status manually (if needed)
    @PutMapping("/{subscriptionId}/payment-status")
    public Subscription updatePaymentStatus(
            @PathVariable Long subscriptionId,
            @RequestParam PaymentStatus status
    ) {
        return subscriptionService.updatePaymentStatus(subscriptionId, status);
    }

    // 📦 Store: Get all subscriptions (or by status)
    @GetMapping("/store/{storeId}")
    public List<Subscription> getStoreSubscriptions(
            @PathVariable Long storeId,
            @RequestParam(required = false) SubscriptionStatus status
    ) {
        return subscriptionService.getSubscriptionsByStore(storeId, status);
    }

    // 🗂️ Admin: Get all subscriptions (optionally filter by status)
    @GetMapping("/admin")
    public List<Subscription> getAllSubscriptions(
            @RequestParam(required = false) SubscriptionStatus status
    ) {
        return subscriptionService.getAllSubscriptions(status);
    }

    // ⌛ Admin: Get subscriptions expiring within X days
    @GetMapping("/admin/expiring")
    public List<Subscription> getExpiringSubscriptions(
            @RequestParam(defaultValue = "7") int days
    ) {
        return subscriptionService.getExpiringSubscriptionsWithin(days);
    }

    // 📊 Count total subscriptions by status
    @GetMapping("/admin/count")
    public Long countByStatus(
            @RequestParam SubscriptionStatus status
    ) {
        return subscriptionService.countByStatus(status);
    }
}
