package com.zosh.service;

import com.zosh.exception.UserException;
import com.zosh.modal.ShiftReport;

import com.zosh.modal.ShiftReport;

import java.time.LocalDateTime;
import java.util.List;

    public interface ShiftReportService {

        /**
         * Start a new shift for the cashier at a specific branch.
         */
        ShiftReport startShift(Long cashierId, Long branchId, LocalDateTime shiftStart) throws UserException;

        /**
         * End the shift and generate full summary report including:
         * - total sales, refunds, net sales
         * - payment breakdown
         * - top selling products
         * - recent orders
         * - refunds processed
         */
        ShiftReport endShift(Long shiftReportId, LocalDateTime shiftEnd) throws UserException;

        /**
         * Get a single shift report by ID.
         */
        ShiftReport getShiftReportById(Long id);

        /**
         * Get all shift reports.
         */
        List<ShiftReport> getAllShiftReports();

        /**
         * Get shift reports for a specific cashier.
         */
        List<ShiftReport> getShiftReportsByCashier(Long cashierId);

        /**
         * Get current shift progress without ending the shift.
         */
        ShiftReport getCurrentShiftProgress(Long cashierId) throws UserException;

        /**
         * Get shift reports for a specific branch.
         */
        List<ShiftReport> getShiftReportsByBranch(Long branchId);

        /**
         * Get a cashier's shift report for a specific date.
         */
        ShiftReport getShiftReportByCashierAndDate(Long cashierId, LocalDateTime date);


        /**
         * Delete a shift report by ID.
         */
        void deleteShiftReport(Long id);
    }


