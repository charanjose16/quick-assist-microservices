package com.ust.auth_service.client;

import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.dto.WorkerSignupDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "WORKER-SERVICE")
public interface WorkerServiceClient {

    @PostMapping("/workers/createW")
    WorkerSignupDto createWorker(WorkerSignupDto userSignupDto);
}
