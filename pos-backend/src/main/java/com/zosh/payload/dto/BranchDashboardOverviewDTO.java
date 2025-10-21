package com.zosh.payload.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BranchDashboardOverviewDTO {

    private BigDecimal totalSales;
    private double salesGrowth;

    private int ordersToday;
    private double orderGrowth;

    private int activeCashiers;
    private double cashierGrowth;

    private int lowStockItems;
    private double lowStockGrowth;


}
