package com.zosh.payload.dto;

import com.zosh.modal.PaymentSummary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShiftReportDTO {
    private Long id;
    private LocalDateTime shiftStart;
    private LocalDateTime shiftEnd;
    private double totalSales;
    private double totalRefunds;
    private double netSales;
    private int totalOrders;
    private UserDTO cashier;
    private Long cashierId;
    private Long branchId;
    private List<OrderDTO> recentOrders;
    private List<ProductDTO> topSellingProducts;
    private List<RefundDTO> refunds;
    private List<PaymentSummary> paymentSummaries;
}
