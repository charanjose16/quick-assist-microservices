package com.ust.admin_service.repository;

import com.ust.admin_service.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminModel,Integer> {
}
