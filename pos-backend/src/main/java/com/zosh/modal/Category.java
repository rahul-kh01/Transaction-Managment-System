package com.zosh.modal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories",
    indexes = {
        @Index(name = "idx_category_store", columnList = "store_id")
    },
    uniqueConstraints = @UniqueConstraint(
        name = "uk_category_name_store",
        columnNames = {"name", "store_id"}
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;
}
