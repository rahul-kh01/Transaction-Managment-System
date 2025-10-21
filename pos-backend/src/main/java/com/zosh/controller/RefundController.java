package com.zosh.controller;

import com.zosh.exception.ResourceNotFoundException;
import com.zosh.exception.UserException;
import com.zosh.mapper.RefundMapper;
import com.zosh.modal.Refund;
import com.zosh.payload.dto.RefundDTO;
import com.zosh.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/refunds")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;

    // ✅ 1. Create a refund
    @PostMapping
    public ResponseEntity<RefundDTO> createRefund(@RequestBody RefundDTO refundDTO)
            throws UserException, ResourceNotFoundException {
        Refund refund = refundService.createRefund(refundDTO);
        return ResponseEntity.ok(RefundMapper.toDTO(refund));
    }

    // ✅ 2. Get all refunds (admin)
    @GetMapping
    public ResponseEntity<List<RefundDTO>> getAllRefunds() {
        List<RefundDTO> refunds = refundService.getAllRefunds().stream()
                .map(RefundMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(refunds);
    }

    // ✅ 3. Get refunds by cashier
    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByCashier(
            @PathVariable Long cashierId) {
        List<RefundDTO> refunds = refundService.getRefundsByCashier(cashierId).stream()
                .map(RefundMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(refunds);
    }

    // ✅ 4. Get refunds by branch
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByBranch(@PathVariable Long branchId) {
        List<RefundDTO> refunds = refundService.getRefundsByBranch(branchId).stream()
                .map(RefundMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(refunds);
    }

    // ✅ 5. Get refunds by shift report
    @GetMapping("/shift/{shiftReportId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByShift(@PathVariable Long shiftReportId) {
        List<RefundDTO> refunds = refundService.getRefundsByShiftReport(shiftReportId).stream()
                .map(RefundMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(refunds);
    }

    // ✅ 6. Get refunds by cashier and date range
    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDTO>> getRefundsByCashierAndDateRange(
            @PathVariable Long cashierId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        List<RefundDTO> refunds = refundService
                .getRefundsByCashierAndDateRange(cashierId, from, to).stream()
                .map(RefundMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(refunds);
    }

    // ✅ 7. Get refund by ID
    @GetMapping("/{id}")
    public ResponseEntity<RefundDTO> getRefundById(@PathVariable Long id) throws ResourceNotFoundException {
        Refund refund = refundService.getRefundById(id);
        return ResponseEntity.ok(RefundMapper.toDTO(refund));
    }

    // ✅ 8. Delete refund
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRefund(@PathVariable Long id) throws ResourceNotFoundException {
        refundService.deleteRefund(id);
        return ResponseEntity.ok("Refund deleted successfully.");
    }
}
