package com.zosh.repository;

import com.zosh.modal.Branch;
import com.zosh.modal.Inventory;
import com.zosh.modal.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
    // ✅ FIXED: Returns all inventories for a product across all branches
    List<Inventory> findByProductId(Long productId);
    
    // ✅ NEW: Find inventory for specific branch and product (uses unique constraint)
    Optional<Inventory> findByBranchIdAndProductId(Long branchId, Long productId);
    
    // ✅ NEW: Type-safe version
    Optional<Inventory> findByBranchAndProduct(Branch branch, Product product);
    
    // ✅ NEW: Check if inventory exists before insert
    boolean existsByBranchIdAndProductId(Long branchId, Long productId);
    
    List<Inventory> findByBranchId(Long branchId);
    
    // ✅ IMPROVED: More flexible low stock query
    List<Inventory> findByBranchIdAndQuantityLessThanEqual(Long branchId, Integer threshold);

    @Query("""
        SELECT COUNT(i)
        FROM Inventory i
        JOIN i.product p
        WHERE i.branch.id = :branchId
        AND i.quantity <= :threshold
    """)
    int countLowStockItems(@Param("branchId") Long branchId, @Param("threshold") Integer threshold);

}
