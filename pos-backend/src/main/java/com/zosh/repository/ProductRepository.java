package com.zosh.repository;


import com.zosh.modal.Product;
import com.zosh.payload.StoreAnalysis.CategorySalesDTO;
import com.zosh.payload.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStoreId(Long storeId);

    @Query("SELECT p FROM Product p " +
            "WHERE p.store.id = :storeId AND (" +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(p.category.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :query, '%'))" +
            ")"
    )
    List<Product> searchByKeyword(@Param("storeId") Long storeId,
                                  @Param("query") String query);


// store analysis

    @Query("SELECT COUNT(p) FROM Product p WHERE p.store.storeAdmin.id = :storeAdminId")
    int countByStoreAdminId(@Param("storeAdminId") Long storeAdminId);

    @Query("""
        SELECT new com.zosh.payload.StoreAnalysis.CategorySalesDTO(
            p.category.name,
            SUM(oi.quantity * p.sellingPrice)
        )
        FROM OrderItem oi
        JOIN oi.product p
        WHERE p.store.storeAdmin.id = :storeAdminId
        GROUP BY p.category.name
    """)
    List<CategorySalesDTO> getSalesGroupedByCategory(@Param("storeAdminId") Long storeAdminId);

    // ✅ FIXED: Proper low stock query with threshold
    @Query("""
        SELECT new com.zosh.payload.dto.ProductDTO(
                p.id,
                p.name,
                p.sku,
                p.description,
                p.mrp,
                p.sellingPrice,
                p.brand,
                p.category.id,
                p.category.name,
                p.store.id,
                p.image,
                p.createdAt,
                p.updatedAt
            )
        FROM Product p 
        JOIN Inventory i ON i.product.id = p.id
        WHERE p.store.storeAdmin.id = :storeAdminId 
        AND i.quantity <= :threshold
        GROUP BY p.id, p.name, p.sku, p.description, p.mrp, p.sellingPrice, 
                 p.brand, p.category.id, p.category.name, p.store.id, 
                 p.image, p.createdAt, p.updatedAt
    """)
    List<ProductDTO> findLowStockProducts(
        @Param("storeAdminId") Long storeAdminId,
        @Param("threshold") Integer threshold
    );
    
    // ✅ NEW: Find products with no inventory at all
    @Query("""
        SELECT new com.zosh.payload.dto.ProductDTO(
                p.id,
                p.name,
                p.sku,
                p.description,
                p.mrp,
                p.sellingPrice,
                p.brand,
                p.category.id,
                p.category.name,
                p.store.id,
                p.image,
                p.createdAt,
                p.updatedAt
            )
        FROM Product p 
        WHERE p.store.storeAdmin.id = :storeAdminId 
        AND NOT EXISTS (
            SELECT 1 FROM Inventory i WHERE i.product.id = p.id
        )
    """)
    List<ProductDTO> findProductsWithoutInventory(@Param("storeAdminId") Long storeAdminId);
}
