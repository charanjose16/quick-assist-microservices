package com.ust.booking_service.api;

import com.ust.booking_service.enums.ServiceStatus;
import com.ust.booking_service.model.ServiceRequest;
import com.ust.booking_service.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/serviceRequest")
public class ServiceRequestController {


    @Autowired
    private ServiceRequestService serviceRequestService;


    @PostMapping
    public ServiceRequest createServiceRequest(@RequestBody ServiceRequest serviceRequest){
        return serviceRequestService.createServiceRequest(serviceRequest);
    }

    @GetMapping("/user/{userId}")
    public List<ServiceRequest> getAllServiceRequestByUserId(@PathVariable int userId){
        return serviceRequestService.getAllServiceRequestByUserId(userId);
    }

    @GetMapping("/worker/{workerId}")
    public List<ServiceRequest> getAllServiceRequestByWorkerId(@PathVariable int workerId){
        return serviceRequestService.getAllServiceRequestByWorkerId(workerId);
    }

    @PutMapping("/{serviceRequestId}/{requestStatus}")
    public ServiceRequest updateServiceRequestStatus(@PathVariable int serviceRequestId, @PathVariable ServiceStatus requestStatus, @RequestBody ServiceRequest serviceRequest){
        return serviceRequestService.updateServiceRequestStatus(serviceRequestId,serviceRequest,requestStatus);
    }




}
