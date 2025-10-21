package com.zosh.service.impl;

import com.zosh.domain.UserRole;
import com.zosh.exception.ResourceNotFoundException;
import com.zosh.exception.UserException;
import com.zosh.mapper.UserMapper;
import com.zosh.modal.Branch;
import com.zosh.modal.Store;
import com.zosh.modal.User;
import com.zosh.payload.dto.UserDTO;
import com.zosh.repository.BranchRepository;
import com.zosh.repository.StoreRepository;
import com.zosh.repository.UserRepository;
import com.zosh.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepository userRepository;


    private final StoreRepository storeRepository;

    private final BranchRepository branchRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDTO createStoreEmployee(UserDTO dto, Long storeId) throws Exception {

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with ID: " + storeId));

        Branch branch = null;

        if (dto.getRole() == UserRole.ROLE_BRANCH_MANAGER) {
            if (dto.getBranchId() == null) {
                throw new IllegalArgumentException("Branch ID is required for Branch Manager role.");
            }

            branch = branchRepository.findById(dto.getBranchId())
                    .orElseThrow(() -> new EntityNotFoundException("Branch not found with ID: " + dto.getBranchId()));
        }

        User employee = UserMapper.toEntity(dto);
        employee.setStore(store);
        employee.setBranch(branch);
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        System.out.println("employee: " + employee);

        User isExist=userRepository.findByEmail(dto.getEmail());

        System.out.println("isExist: " + isExist);
        if(isExist!=null){
            employee.setId(isExist.getId());
        }

        User savedEmployee = userRepository.save(employee);

        System.out.println("savedEmployee: " + savedEmployee);

        // Assign manager to the branch if applicable
        if (dto.getRole() == UserRole.ROLE_BRANCH_MANAGER && branch != null) {
            branch.setManager(savedEmployee);
            branchRepository.save(branch); // make sure manager is saved
        }

        return UserMapper.toDTO(savedEmployee);
    }

    @Override
    public User createBranchEmployee(User employee, Long branchId) throws Exception {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with ID: " + branchId));

        if (!(employee.getRole().equals(UserRole.ROLE_BRANCH_CASHIER) || employee.getRole().equals(UserRole.ROLE_BRANCH_MANAGER))) {
            throw new UserException("Invalid role for branch employee. Must be ROLE_BRANCH_ADMIN or ROLE_BRANCH_MANAGER");
        }

        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setBranch(branch);

        User isExist=userRepository.findByEmail(employee.getEmail());
        if(isExist!=null){
            employee.setId(isExist.getId());
        }

        return userRepository.save(employee);
    }

    @Override
    public User updateEmployee(Long employeeId, User employeeDetails) throws Exception {
        User existingEmployee = findEmployeeById(employeeId);

        if (employeeDetails.getFullName() != null) {
            existingEmployee.setFullName(employeeDetails.getFullName());
        }
        if (employeeDetails.getEmail() != null) {
            existingEmployee.setEmail(employeeDetails.getEmail());
        }
        if (employeeDetails.getPhone() != null) {
            existingEmployee.setPhone(employeeDetails.getPhone());
        }
        if (employeeDetails.getRole() != null) {
            // Add logic to restrict role changes based on current user's role if necessary
            existingEmployee.setRole(employeeDetails.getRole());
        }
        // Password should be updated via a separate method for security reasons

        return userRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) throws Exception {
        User employee = findEmployeeById(employeeId);
        userRepository.delete(employee);
    }

    @Override
    public User findEmployeeById(Long employeeId) throws Exception {
        Optional<User> opt = userRepository.findById(employeeId);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new ResourceNotFoundException("Employee not found with ID: " + employeeId);
    }

    @Override
    public List<User> findStoreEmployees(Long storeId, UserRole role) throws Exception {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with ID: " + storeId));
        return userRepository.findByStoreAndRoleIn(store, List.of(
                UserRole.ROLE_STORE_ADMIN,
                UserRole.ROLE_BRANCH_MANAGER,
                UserRole.ROLE_STORE_MANAGER
        ));
    }

    @Override
    public List<User> findBranchEmployees(Long branchId, UserRole role) throws Exception {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with ID: " + branchId));
        List<User> employees = userRepository.findByBranchId(branch.getId()).stream()
                .filter(user -> role == null || user.getRole() == role)
                .collect(Collectors.toList());

        return employees;
    }
}