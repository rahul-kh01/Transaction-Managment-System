package com.zosh.payload.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefundDTO {
    private Long id;
    private Long orderId;
    private String reason;
    private Double amount;
    private String cashierName;
    private Long shiftReportId;
    private Long branchId;
    private LocalDateTime createdAt;
}
