package com.zosh.payload.StoreAnalysis;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BranchSalesDTO {
    private String branchName;
    private Double totalSales;
}

