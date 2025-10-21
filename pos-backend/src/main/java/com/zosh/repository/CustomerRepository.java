package com.zosh.repository;

import com.zosh.modal.Customer;
import com.zosh.modal.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // ❌ DEPRECATED: No store filtering - tenant leak risk
    @Deprecated
    List<Customer> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String fullName, String email);
    
    // ✅ NEW: Multi-tenant safe queries
    List<Customer> findByStoreId(Long storeId);
    
    List<Customer> findByStore(Store store);
    
    // ✅ CRITICAL: Find customer by phone within store (prevents tenant leak)
    Optional<Customer> findByPhoneAndStoreId(String phone, Long storeId);
    
    Optional<Customer> findByEmailAndStoreId(String email, Long storeId);
    
    // ✅ IMPROVED: Store-scoped search
    List<Customer> findByStoreIdAndFullNameContainingIgnoreCase(Long storeId, String name);
    
    @Query("""
        SELECT c FROM Customer c 
        WHERE c.store.id = :storeId 
        AND (LOWER(c.fullName) LIKE LOWER(CONCAT('%', :search, '%')) 
        OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%'))
        OR c.phone LIKE CONCAT('%', :search, '%'))
    """)
    List<Customer> searchByStoreId(@Param("storeId") Long storeId, @Param("search") String search);

//    analysis
@Query("""
        SELECT COUNT(DISTINCT o.customer.id)
        FROM Order o
        WHERE o.branch.store.storeAdmin.id = :storeAdminId
    """)
int countByStoreAdminId(@Param("storeAdminId") Long storeAdminId);
}
