package com.ust.user_service.api;

import com.ust.user_service.model.UserModel;
import com.ust.user_service.service.UserServiceImpl;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping
    private UserModel createUser(@RequestBody UserModel userModel){
        return userService.createUser(userModel);
    }

    @GetMapping("/{id}")
    public UserModel findUserById(@PathVariable int id) {
        return userService.findUserById(id);
    }

    @GetMapping("/all")
    public List<UserModel> getAllUserModel(){
        return  userService.getAllUserModel();
    }

    @PutMapping("/update/{id}")
    public UserModel updateUser(@PathVariable  int id,@RequestBody UserModel user){
        return userService.updateUser(id,user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userService.deleteUser(id);
    }

//    @GetMapping("/hello")
//    public String hello(){
//        return "Hello Ji. Sb shi hai !!";
//    }

    @GetMapping("/getByUsername/{username}")
    public UserModel getByUsername(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }

    @GetMapping("/allWorkers/{expertise}")
    public List<UserModel> getAllWorkersByExpertise(@PathVariable String expertise){
        return userService.getAllWorkers(expertise);
    }
}
