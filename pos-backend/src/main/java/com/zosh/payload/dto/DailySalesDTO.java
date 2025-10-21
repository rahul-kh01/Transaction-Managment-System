package com.zosh.payload.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class DailySalesDTO {
    private LocalDate date;
    private BigDecimal totalSales;
}

