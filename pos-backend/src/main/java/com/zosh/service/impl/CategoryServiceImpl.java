
package com.zosh.service.impl;

import com.zosh.domain.UserRole;
import com.zosh.exception.UserException;
import com.zosh.mapper.CategoryMapper;
import com.zosh.modal.*;
import com.zosh.payload.dto.CategoryDTO;
import com.zosh.repository.*;

import com.zosh.service.CategoryService;
import com.zosh.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public CategoryDTO createCategory(CategoryDTO dto) throws UserException {
        User user = userService.getCurrentUser();
        Store store = storeRepository.findById(dto.getStoreId())
                .orElseThrow(() -> new EntityNotFoundException("Store not found"));

        checkAuthority(user, store);

        // ✅ NEW: Check for duplicate category name in store
        if (categoryRepository.existsByNameAndStoreId(dto.getName(), dto.getStoreId())) {
            throw new IllegalArgumentException(
                "Category with name '" + dto.getName() + "' already exists in this store"
            );
        }

        Category category = Category.builder()
                .name(dto.getName())
                .store(store)
                .build();

        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public List<CategoryDTO> getCategoriesByStore(Long storeId) {
        return categoryRepository.findByStoreId(storeId).stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) throws UserException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        User user = userService.getCurrentUser();
        checkAuthority(user, category.getStore());

        category.setName(dto.getName());
        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(Long id) throws UserException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        User user = userService.getCurrentUser();
        checkAuthority(user, category.getStore());

        categoryRepository.delete(category);
    }

    private void checkAuthority(User user, Store store) {
        boolean isAdmin = user.getRole().equals(UserRole.ROLE_STORE_ADMIN);
        boolean isManager = user.getRole().equals(UserRole.ROLE_STORE_MANAGER);
        boolean isSameStore = user.equals(store.getStoreAdmin()); // or check based on employee-store relation

        if (!(isAdmin && isSameStore) && !isManager) {
            throw new SecurityException("You do not have permission to manage this category.");
        }
    }
}

