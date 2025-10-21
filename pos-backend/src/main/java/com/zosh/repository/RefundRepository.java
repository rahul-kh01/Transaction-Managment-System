package com.zosh.repository;

import com.zosh.modal.Order;
import com.zosh.modal.Refund;
import com.zosh.modal.User;
import com.zosh.payload.dto.RefundDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface RefundRepository extends JpaRepository<Refund, Long> {

    List<Refund> findByCashierAndCreatedAtBetween(User cashier,
                                                 LocalDateTime start,
                                                 LocalDateTime end);

    List<Refund> findByCashierId(Long cashierId);

    List<Refund> findByShiftReportId(Long shiftReportId);

    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime from, LocalDateTime to);

    List<Refund> findByBranchId(Long branchId);

//    store analysis
    @Query("SELECT COUNT(r) FROM Refund r WHERE r.order.branch.store.storeAdmin.id = :storeAdminId")
    int countByStoreAdminId(@Param("storeAdminId") Long storeAdminId);

    @Query("""
          SELECT new com.zosh.payload.dto.RefundDTO(
                  r.id,
                  r.order.id,
                  r.reason,
                  r.amount,
                  r.cashier.fullName,
                  r.shiftReport.id,
                  r.branch.id,
                  r.createdAt
              )
            FROM Refund r
            WHERE r.branch.store.storeAdmin.id = :storeAdminId
            GROUP BY FUNCTION('DATE', r.createdAt),\s
                         r.id, r.order.id, r.reason, r.amount,\s
                         r.cashier.fullName, r.shiftReport.id,\s
                         r.branch.id, r.createdAt
            HAVING SUM(r.amount) > 5000
    """)
    List<RefundDTO> findRefundSpikes(@Param("storeAdminId") Long storeAdminId);

}
