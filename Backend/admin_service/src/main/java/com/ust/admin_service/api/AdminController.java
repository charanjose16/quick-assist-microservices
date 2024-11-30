package com.ust.admin_service.api;

import com.ust.admin_service.dto.UserModel;
import com.ust.admin_service.dto.WorkerModel;
import com.ust.admin_service.service.AdminServiceImpl;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    @GetMapping("/users")
    public List<UserModel> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/workers")
    public  List<WorkerModel> getAllWorkers(){
        return adminService.getAllWorkers();
    }
}
