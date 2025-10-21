package com.zosh.repository;



import com.zosh.modal.ShiftReport;
import com.zosh.modal.User;
import com.zosh.modal.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShiftReportRepository extends JpaRepository<ShiftReport, Long> {

    /**
     * Get all shift reports for a specific cashier.
     */
    List<ShiftReport> findByCashier(User cashier);

    /**
     * Get all shift reports for a specific branch.
     */
    List<ShiftReport> findByBranch(Branch branch);

    /**
     * Get latest open shift for a cashier (where shiftEnd is null).
     */
    Optional<ShiftReport> findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(User cashier);

    /**
     * Get shift report for a specific date for a cashier.
     */
    Optional<ShiftReport> findByCashierAndShiftStartBetween(User cashier, LocalDateTime start, LocalDateTime end);
}
