package com.zosh.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "shift_reports",
    indexes = {
        @Index(name = "idx_shift_report_cashier", columnList = "cashier_id"),
        @Index(name = "idx_shift_report_branch", columnList = "branch_id"),
        @Index(name = "idx_shift_report_start", columnList = "shiftStart"),
        @Index(name = "idx_shift_report_end", columnList = "shiftEnd")
    }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShiftReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime shiftStart;
    private LocalDateTime shiftEnd;

    private Double totalSales;
    private Double totalRefunds;
    private Double netSales;
    private int totalOrders;

    @ManyToOne
    @JoinColumn(name = "cashier_id")
    private User cashier;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

//    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
//    @ElementCollection
    @Transient
    private List<PaymentSummary> paymentSummaries;

    @ManyToMany
    @JoinTable(
        name = "shift_report_top_products",
        joinColumns = @JoinColumn(name = "shift_report_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> topSellingProducts;

    @ManyToMany
    @JoinTable(
        name = "shift_report_recent_orders",
        joinColumns = @JoinColumn(name = "shift_report_id"),
        inverseJoinColumns = @JoinColumn(name = "order_id")
    )
    private List<Order> recentOrders;

    @OneToMany(mappedBy = "shiftReport", cascade = CascadeType.ALL)
    private List<Refund> refunds;
}
