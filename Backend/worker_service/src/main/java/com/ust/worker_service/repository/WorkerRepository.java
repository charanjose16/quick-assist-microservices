package com.ust.worker_service.repository;

import com.ust.worker_service.model.WorkerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<WorkerModel,Integer> {
}
