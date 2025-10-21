package com.zosh.repository;

import com.zosh.modal.OrderItem;
import com.zosh.payload.StoreAnalysis.BranchSalesDTO;
import com.zosh.payload.StoreAnalysis.CategorySalesDTO;
import com.zosh.payload.StoreAnalysis.PaymentInsightDTO;
import com.zosh.payload.StoreAnalysis.TimeSeriesPointDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("""
        SELECT p.id, p.name, SUM(oi.quantity)
        FROM OrderItem oi
        JOIN oi.product p
        JOIN oi.order o
        WHERE o.branch.id = :branchId
        GROUP BY p.id, p.name
        ORDER BY SUM(oi.quantity) DESC
    """)
    List<Object[]> getTopProductsByQuantity(@Param("branchId") Long branchId);

    @Query("""
        SELECT c.name, SUM(oi.quantity * oi.price), SUM(oi.quantity)
        FROM OrderItem oi
        JOIN oi.product p
        JOIN p.category c
        JOIN oi.order o
        WHERE o.branch.id = :branchId AND o.createdAt BETWEEN :start AND :end
        GROUP BY c.name
        ORDER BY SUM(oi.quantity * oi.price) DESC
    """)
    List<Object[]> getCategoryWiseSales(
            @Param("branchId") Long branchId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );




}
