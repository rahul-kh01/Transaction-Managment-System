package com.zosh.payload.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDTO {
    private Long id;
    private Long branchId;
    private Long productId;
    private Integer quantity;
}

