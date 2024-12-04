package com.ust.worker_service.api;

import com.ust.worker_service.model.WorkerModel;
import com.ust.worker_service.service.WorkerService;
import com.ust.worker_service.service.WorkerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workers")
public class WorkerController {

    @Autowired
    private WorkerServiceImpl workerService;

    @PostMapping("createW")
    public WorkerModel createWorker(@RequestBody  WorkerModel workerModel){
        return workerService.createWorker(workerModel);
    }

    @GetMapping("/{id}")
    public WorkerModel findWorkerById(@PathVariable int id){
        return workerService.findById(id);
    }

    @GetMapping("/all")
    public List<WorkerModel> getAllWorkers(){
        return workerService.findAllWorkers();
    }

    @PutMapping("/{id}")
    public WorkerModel updateWorker(@PathVariable int id,@RequestBody WorkerModel workerModel){
        return workerService.updateWorker(id,workerModel);
    }

    @DeleteMapping("{id}")
    public void deleteWorker(@PathVariable int id){
        workerService.deleteWorker(id);
    }

}
