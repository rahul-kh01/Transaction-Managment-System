package com.zosh.payload.StoreAnalysis;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CategorySalesDTO {
    private String categoryName;
    private Double totalSales;
}

