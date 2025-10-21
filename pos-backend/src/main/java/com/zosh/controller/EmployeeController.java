package com.zosh.controller;

import com.zosh.domain.UserRole;
import com.zosh.modal.User;
import com.zosh.payload.dto.UserDTO;
import com.zosh.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/store/{storeId}")
    @PreAuthorize("hasAnyRole('ROLE_STORE_ADMIN', 'ROLE_STORE_MANAGER')")
    public ResponseEntity<UserDTO> createStoreEmployee(
            @RequestBody UserDTO employee, @PathVariable Long storeId) throws Exception {
        UserDTO createdEmployee = employeeService.createStoreEmployee(employee, storeId);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PostMapping("/branch/{branchId}")
    @PreAuthorize("hasAnyRole('ROLE_BRANCH_ADMIN', 'ROLE_BRANCH_MANAGER')")
    public ResponseEntity<UserDTO> createBranchEmployee(@RequestBody User employee, @PathVariable Long branchId) throws Exception {
        User createdEmployee = employeeService.createBranchEmployee(employee, branchId);
        UserDTO employeeDTO = com.zosh.mapper.UserMapper.toDTO(createdEmployee);
        return new ResponseEntity<>(employeeDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ROLE_STORE_ADMIN', 'ROLE_STORE_MANAGER', 'ROLE_BRANCH_ADMIN', 'ROLE_BRANCH_MANAGER')")
    public ResponseEntity<UserDTO> updateEmployee(@PathVariable Long employeeId, @RequestBody User employeeDetails) throws Exception {
        User updatedEmployee = employeeService.updateEmployee(employeeId, employeeDetails);
        UserDTO employeeDTO = com.zosh.mapper.UserMapper.toDTO(updatedEmployee);
        return new ResponseEntity<>(employeeDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ROLE_STORE_ADMIN', 'ROLE_BRANCH_ADMIN')")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long employeeId) throws Exception {
        employeeService.deleteEmployee(employeeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{employeeId}")
    @PreAuthorize("hasAnyRole('ROLE_STORE_ADMIN', 'ROLE_STORE_MANAGER', 'ROLE_BRANCH_ADMIN', 'ROLE_BRANCH_MANAGER')")
    public ResponseEntity<UserDTO> findEmployeeById(@PathVariable Long employeeId) throws Exception {
        User employee = employeeService.findEmployeeById(employeeId);
        UserDTO employeeDTO = com.zosh.mapper.UserMapper.toDTO(employee);
        return new ResponseEntity<>(employeeDTO, HttpStatus.OK);
    }

    @GetMapping("/store/{storeId}")
    @PreAuthorize("hasAnyRole('ROLE_STORE_ADMIN', 'ROLE_STORE_MANAGER')")
    public ResponseEntity<List<UserDTO>> findStoreEmployees(@PathVariable Long storeId) throws Exception {
        List<User> employees = employeeService.findStoreEmployees(storeId, null);
        List<UserDTO> employeeDTOs = com.zosh.mapper.UserMapper.toDTOList(employees);
        return new ResponseEntity<>(employeeDTOs, HttpStatus.OK);
    }

    @GetMapping("/branch/{branchId}")
    @PreAuthorize("hasAnyRole('ROLE_BRANCH_ADMIN', 'ROLE_BRANCH_MANAGER')")
    public ResponseEntity<List<UserDTO>> findBranchEmployees(
            @PathVariable Long branchId,
            @RequestParam(required = false) UserRole role
    ) throws Exception {
        List<User> employees = employeeService.findBranchEmployees(branchId,role);
        List<UserDTO> employeeDTOs = com.zosh.mapper.UserMapper.toDTOList(employees);
        return new ResponseEntity<>(employeeDTOs, HttpStatus.OK);
    }
}