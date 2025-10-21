package com.zosh.service.impl;

import com.zosh.domain.PaymentType;
import com.zosh.modal.PaymentSummary;
import com.zosh.payload.dto.*;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.InventoryRepository;
import com.zosh.repository.OrderItemRepository;
import com.zosh.repository.OrderRepository;
import com.zosh.service.BranchAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BranchAnalyticsServiceImpl implements BranchAnalyticsService{

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public List<DailySalesDTO> getDailySalesChart(Long branchId, int days) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(days - 1); // includes today

        List<DailySalesDTO> salesChart = new ArrayList<>();

        for (int i = 0; i < days; i++) {
            LocalDate currentDate = startDate.plusDays(i);
            LocalDateTime start = currentDate.atStartOfDay();
            LocalDateTime end = currentDate.atTime(LocalTime.MAX);

            BigDecimal total = orderRepository
                    .getTotalSalesBetween(branchId, start, end)
                    .orElse(BigDecimal.ZERO);

            salesChart.add(DailySalesDTO.builder()
                    .date(currentDate)
                    .totalSales(total)
                    .build());
        }

        return salesChart;
    }

    @Override
    public List<ProductPerformanceDTO> getTopProductsByQuantityWithPercentage(Long branchId) {
        List<Object[]> rawData = orderItemRepository.getTopProductsByQuantity(branchId);

        long totalQuantity = rawData.stream()
                .mapToLong(obj -> (Long) obj[2])
                .sum();

        return rawData.stream()
                .limit(5)
                .map(obj -> {
                    String name = (String) obj[1];
                    Long quantity = (Long) obj[2];
                    double percentage = totalQuantity == 0 ? 0 :
                            ((double) quantity / totalQuantity) * 100;
                    return ProductPerformanceDTO.builder()
                            .productName(name)
                            .quantitySold(quantity)
                            .percentage(Math.round(percentage * 10.0) / 10.0) // rounded to 1 decimal
                            .build();
                }).collect(Collectors.toList());
    }

    @Override
    public List<CashierPerformanceDTO> getTopCashierPerformanceByOrders(Long branchId) {
        List<Object[]> rawData = orderRepository.getTopCashiersByRevenue(branchId);

        return rawData
                .stream()
                .limit(5)
                .map(obj -> CashierPerformanceDTO.builder()
                        .cashierId((Long) obj[0])
                        .cashierName((String) obj[1])
                        .totalRevenue((Double) obj[2])
                        .build()
                ).collect(Collectors.toList());
    }

    @Override
    public List<CategorySalesDTO> getCategoryWiseSalesBreakdown(Long branchId, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<Object[]> rawData = orderItemRepository.getCategoryWiseSales(branchId, start, end);

        return rawData.stream().map(obj -> CategorySalesDTO.builder()
                .categoryName((String) obj[0])
                .totalSales((Double) obj[1])
                .quantitySold((Long) obj[2])
                .build()
        ).collect(Collectors.toList());
    }

    @Override
    public List<PaymentSummary> getPaymentMethodBreakdown(Long branchId, LocalDate date) {
        List<Object[]> rawData = orderRepository.getPaymentBreakdownByMethod(branchId, date);

        double total = rawData.stream()
                .mapToDouble(obj -> (Double) obj[1])
                .sum();

        return rawData.stream().map(obj -> {
            PaymentType type = (PaymentType) obj[0];
            double amount = (Double) obj[1];
            int count = ((Long) obj[2]).intValue();

            double percentage = total == 0 ? 0 : (amount / total) * 100;

            return new PaymentSummary(type,
                    amount,
                    count, Math.round(percentage * 10.0) / 10.0);
        }).collect(Collectors.toList());
    }


    @Override
    public BranchDashboardOverviewDTO getBranchOverview(Long branchId) {
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        // ---- Total Sales ----
        BigDecimal todaySales = orderRepository.getTotalSalesBetween(
                branchId, today.atStartOfDay(), today.atTime(LocalTime.MAX)
        ).orElse(BigDecimal.ZERO);

        BigDecimal yesterdaySales = orderRepository.getTotalSalesBetween(
                branchId, yesterday.atStartOfDay(), yesterday.atTime(LocalTime.MAX)
        ).orElse(BigDecimal.ZERO);

        double salesGrowth = calculateGrowth(todaySales, yesterdaySales);

        // ---- Orders ----
        int todayOrders = orderRepository.countOrdersByBranchAndDate(branchId, today);
        int yesterdayOrders = orderRepository.countOrdersByBranchAndDate(branchId, yesterday);
        double orderGrowth = calculateGrowth(todayOrders, yesterdayOrders);

        // ---- Active Cashiers ----
        int todayCashiers = orderRepository.countDistinctCashiersByBranchAndDate(branchId, today);
        int yesterdayCashiers = orderRepository.countDistinctCashiersByBranchAndDate(branchId, yesterday);
        double cashierGrowth = calculateGrowth(todayCashiers, yesterdayCashiers);

        // ---- Low Stock ----
        int todayLowStock = inventoryRepository.countLowStockItems(branchId, 5);  // ✅ FIXED: Added threshold
        int yesterdayLowStock = 12; // You may store yesterday's value in DB or Redis if needed.
        double lowStockGrowth = calculateGrowth(todayLowStock, yesterdayLowStock);

        return BranchDashboardOverviewDTO.builder()
                .totalSales(todaySales)
                .salesGrowth(salesGrowth)
                .ordersToday(todayOrders)
                .orderGrowth(orderGrowth)
                .activeCashiers(todayCashiers)
                .cashierGrowth(cashierGrowth)
                .lowStockItems(todayLowStock)
                .lowStockGrowth(lowStockGrowth)
                .build();
    }

    private double calculateGrowth(Number today, Number yesterday) {
        if (yesterday == null || yesterday.doubleValue() == 0.0) return 0.0;
        return ((today.doubleValue() - yesterday.doubleValue()) / yesterday.doubleValue()) * 100;
    }

}
