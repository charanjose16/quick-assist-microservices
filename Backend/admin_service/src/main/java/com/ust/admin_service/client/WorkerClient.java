package com.ust.admin_service.client;

import com.ust.admin_service.dto.UserModel;
import com.ust.admin_service.dto.WorkerModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "WORKER-SERVICE")
public interface WorkerClient {

    @GetMapping("/workers/all")
    List<WorkerModel> getAllWorkerModule();
}
