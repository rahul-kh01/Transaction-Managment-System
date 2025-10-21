package com.zosh.payload.dto;



import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String sku;
    private String description;
    private Double mrp;
    private Double sellingPrice;
    private String brand;
    private Long categoryId;
    private String category;
    private Long storeId;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
