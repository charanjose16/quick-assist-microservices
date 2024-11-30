package com.ust.booking_service.dto;

import com.ust.booking_service.enums.ServiceStatus;
import com.ust.booking_service.model.ServiceRequest;
import lombok.Data;

@Data
public class ServiceRequestDTO {

    private int id;
    private ServiceStatus serviceStatus;
    private int userId;
    private int workerId;
    private int paymentId;

    public ServiceRequest convertToEntity() {
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setId(this.id);
        serviceRequest.setServiceStatus(this.serviceStatus);
        serviceRequest.setUserId(this.userId);
        serviceRequest.setWorkerId(this.workerId);
        serviceRequest.setPaymentId(this.paymentId);
        return serviceRequest;
    }

    public static ServiceRequestDTO convertToDTO(ServiceRequest serviceRequest) {
        ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO();
        serviceRequestDTO.setId(serviceRequest.getId());
        serviceRequestDTO.setServiceStatus(serviceRequest.getServiceStatus());
        serviceRequestDTO.setUserId(serviceRequest.getUserId());
        serviceRequestDTO.setWorkerId(serviceRequest.getWorkerId());
        serviceRequestDTO.setPaymentId(serviceRequestDTO.paymentId);
        return serviceRequestDTO;
    }
}
