package com.ust.booking_service.service;

import com.netflix.discovery.converters.Auto;
import com.ust.booking_service.enums.ServiceStatus;
import com.ust.booking_service.model.ServiceRequest;
import com.ust.booking_service.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;


    public ServiceRequest createServiceRequest(ServiceRequest serviceRequest){
        return serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> getAllServiceRequestByUserId(int id){
        return serviceRequestRepository.findAllByUserId(id);
    }

    public List<ServiceRequest> getAllServiceRequestByWorkerId(int id){
        return serviceRequestRepository.findAllByWorkerId(id);
    }

    public ServiceRequest updateServiceRequestStatus(int id,ServiceRequest serviceRequest,ServiceStatus serviceStatus){
        ServiceRequest updatedServiceRequest=serviceRequestRepository.findById(id).orElse(null);
        updatedServiceRequest.setServiceStatus(serviceStatus);
        return serviceRequestRepository.save(updatedServiceRequest);
    }



}
