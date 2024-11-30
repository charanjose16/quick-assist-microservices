package com.ust.worker_service.service;

import com.ust.worker_service.model.WorkerModel;
import com.ust.worker_service.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerServiceImpl implements WorkerService{

    @Autowired
    private WorkerRepository workerRepository;


    public WorkerModel createWorker(WorkerModel workerModel) {
        return workerRepository.save(workerModel);
    }

    public WorkerModel findById(int id) {
        return workerRepository.findById(id).orElse(null);
    }

    public List<WorkerModel> findAllWorkers() {
        return workerRepository.findAll();
    }

    public WorkerModel updateWorker(int id, WorkerModel workerModel) {
        WorkerModel worker=workerRepository.findById(id).orElse(null);
        return workerRepository.save(worker);
    }

    public void deleteWorker(int id) {
        workerRepository.deleteById(id);

    }
}
