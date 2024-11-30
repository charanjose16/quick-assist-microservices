package com.ust.booking_service.repository;

import com.ust.booking_service.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest,Integer> {

//    public List<ServiceRequest> findAllByWorkerId(int id);
//    public List<ServiceRequest> findAllByUserId(int id);

}
