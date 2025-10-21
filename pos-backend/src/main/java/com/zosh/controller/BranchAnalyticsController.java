package com.zosh.controller;

import com.zosh.modal.PaymentSummary;
import com.zosh.payload.dto.*;
import com.zosh.service.BranchAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/branch-analytics")
@RequiredArgsConstructor
public class BranchAnalyticsController {

    private final BranchAnalyticsService branchAnalyticsService;

    // ✅ Allow only BRANCH_MANAGER or BRANCH_ADMIN
    private static final String ALLOWED_ROLES = "hasRole('BRANCH_MANAGER') or hasRole('BRANCH_ADMIN')";

    /**
     * Get daily sales chart data (last n days)
     */
    @GetMapping("/daily-sales")
    @PreAuthorize(ALLOWED_ROLES)
    public ResponseEntity<List<DailySalesDTO>> getDailySalesChart(
            @RequestParam Long branchId,
            @RequestParam(defaultValue = "7") int days
    ) {
        return ResponseEntity.ok(branchAnalyticsService.getDailySalesChart(branchId, days));
    }

    /**
     * Get top 5 products by quantity (with % contribution)
     */
    @GetMapping("/top-products")
    @PreAuthorize(ALLOWED_ROLES)
    public ResponseEntity<List<ProductPerformanceDTO>> getTopProductsByQuantity(
            @RequestParam Long branchId
    ) {
        return ResponseEntity.ok(branchAnalyticsService.getTopProductsByQuantityWithPercentage(branchId));
    }

    /**
     * Get top 5 cashiers by revenue
     */
    @GetMapping("/top-cashiers")
    @PreAuthorize(ALLOWED_ROLES)
    public ResponseEntity<List<CashierPerformanceDTO>> getTopCashiersByRevenue(
            @RequestParam Long branchId
    ) {
        return ResponseEntity.ok(branchAnalyticsService.getTopCashierPerformanceByOrders(branchId));
    }

    /**
     * Get category-wise sales breakdown
     */
    @GetMapping("/category-sales")
    @PreAuthorize(ALLOWED_ROLES)
    public ResponseEntity<List<CategorySalesDTO>> getCategoryWiseSalesBreakdown(
            @RequestParam Long branchId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(branchAnalyticsService.getCategoryWiseSalesBreakdown(branchId, date));
    }

    @GetMapping("/today-overview")
    @PreAuthorize("hasRole('BRANCH_MANAGER') or hasRole('BRANCH_ADMIN')")
    public ResponseEntity<BranchDashboardOverviewDTO> getTodayOverview(
            @RequestParam Long branchId
    ) {
        return ResponseEntity.ok(branchAnalyticsService.getBranchOverview(branchId));
    }


    @GetMapping("/payment-breakdown")
    @PreAuthorize("hasRole('BRANCH_MANAGER') or hasRole('BRANCH_ADMIN')")
    public ResponseEntity<List<PaymentSummary>> getPaymentBreakdown(
            @RequestParam Long branchId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(
                branchAnalyticsService.getPaymentMethodBreakdown(branchId, date)
        );
    }

}
