package com.ust.admin_service.service;

import com.ust.admin_service.client.UserClient;
import com.ust.admin_service.client.WorkerClient;
import com.ust.admin_service.dto.UserModel;
import com.ust.admin_service.dto.WorkerModel;
import com.ust.admin_service.model.AdminModel;
import com.ust.admin_service.repository.AdminRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private UserClient userClient;

    @Autowired
    private WorkerClient workerClient;

    @Autowired
    private AdminRepository adminRepository;

    public AdminModel createAdmin(AdminModel adminModel) {
        return adminRepository.save(adminModel);
    }

    public List<UserModel> getAllUsers(){
         return userClient.getAllUserModel();
    }

    public List<WorkerModel> getAllWorkers(){
        return workerClient.getAllWorkerModule();
    }


}
