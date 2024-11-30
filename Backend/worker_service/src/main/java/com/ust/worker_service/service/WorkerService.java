package com.ust.worker_service.service;

import com.ust.worker_service.model.WorkerModel;

import java.util.List;

public interface WorkerService {

    public WorkerModel createWorker(WorkerModel workerModel);
    public WorkerModel findById(int id);
    public List<WorkerModel> findAllWorkers();
    public WorkerModel updateWorker(int id,WorkerModel workerModel);
    public void deleteWorker(int id);
}
