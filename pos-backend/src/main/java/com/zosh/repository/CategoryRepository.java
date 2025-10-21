package com.zosh.repository;


import com.zosh.modal.Category;
import com.zosh.modal.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByStoreId(Long storeId);
    
    // ✅ NEW: Leverages unique constraint (name, store_id)
    Optional<Category> findByNameAndStoreId(String name, Long storeId);
    
    // ✅ NEW: Type-safe version
    Optional<Category> findByNameAndStore(String name, Store store);
    
    // ✅ NEW: Check before insert to avoid duplicate violations
    boolean existsByNameAndStoreId(String name, Long storeId);
}
