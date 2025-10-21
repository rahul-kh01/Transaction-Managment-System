package com.zosh.modal;

import com.zosh.domain.BillingCycle;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subscription_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., Starter, Pro

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private BillingCycle billingCycle;

    // 🚀 Feature Flags (Plan Limits + Toggles)

    @Column(nullable = false)
    private Integer maxBranches;
    @Column(nullable = false)
    private Integer maxUsers; // Max cashier/staff accounts
    @Column(nullable = false)
    private Integer maxProducts;             // Max products allowed

    private Boolean enableAdvancedReports;   // Access to detailed reports
    private Boolean enableInventory;         // Enable inventory system
    private Boolean enableIntegrations;      // Integrate with other apps
    private Boolean enableEcommerce;         // Connect to online stores
    private Boolean enableInvoiceBranding;   // Customize invoice template
    private Boolean prioritySupport;         // Priority support access

    @ElementCollection
    private List<String> extraFeatures=new ArrayList<>();

    // Optional extra
    private Boolean enableMultiLocation;     // Existing field

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
