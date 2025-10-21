package com.zosh.payload.dto;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CashierPerformanceDTO {

    private Long cashierId;
    private String cashierName;
    private Long totalOrders;
    private Double totalRevenue;

}
