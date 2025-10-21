package com.zosh.repository;

import com.zosh.domain.StoreStatus;
import com.zosh.modal.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Store findByStoreAdminId(Long storeAdminId);

    List<Store> findByStatus(StoreStatus storeStatus);

//    analysis
    Long countByStatus(StoreStatus status);

    @Query("""
        SELECT COUNT(s)
        FROM Store s
        WHERE CAST(s.createdAt AS DATE) = :date
    """)
    Long countByDate(LocalDate date);

    @Query("""
    SELECT s.createdAt AS regDate, COUNT(s) AS count
    FROM Store s
    WHERE s.createdAt >= :startDate
    GROUP BY s.createdAt
    ORDER BY regDate ASC
""")
    List<Object[]> getStoreRegistrationStats(@Param("startDate") LocalDateTime startDate);

}
