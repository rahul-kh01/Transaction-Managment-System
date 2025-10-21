package com.zosh.mapper;


import com.zosh.modal.Refund;
import com.zosh.payload.dto.RefundDTO;

public class RefundMapper {

    public static RefundDTO toDTO(Refund refund) {
        RefundDTO dto = new RefundDTO();
        dto.setId(refund.getId());
        dto.setOrderId(refund.getOrder().getId());
        dto.setReason(refund.getReason());
        dto.setAmount(refund.getAmount());
        dto.setCashierName(refund.getCashier().getFullName());
        dto.setBranchId(refund.getBranch().getId());
        dto.setShiftReportId(refund.getShiftReport() != null ? refund.getShiftReport().getId() : null);
        dto.setCreatedAt(refund.getCreatedAt());
        return dto;
    }
}
