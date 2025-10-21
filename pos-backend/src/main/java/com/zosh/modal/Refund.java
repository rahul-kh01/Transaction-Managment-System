package com.zosh.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zosh.domain.PaymentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "refunds",
    indexes = {
        @Index(name = "idx_refund_order", columnList = "order_id"),
        @Index(name = "idx_refund_branch", columnList = "branch_id"),
        @Index(name = "idx_refund_cashier", columnList = "cashier_id"),
        @Index(name = "idx_refund_shift_report", columnList = "shift_report_id"),
        @Index(name = "idx_refund_created_at", columnList = "createdAt")
    }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String reason;

    private Double amount;

    @ManyToOne
    @JoinColumn(name = "shift_report_id")
    @JsonIgnore
    private ShiftReport shiftReport;

    @ManyToOne
    @JoinColumn(name = "cashier_id")
    private User cashier;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private LocalDateTime createdAt;

    private PaymentType paymentType;

//    @ManyToOne
//    private OrderItem orderItem;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
