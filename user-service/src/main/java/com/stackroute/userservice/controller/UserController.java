package com.stackroute.userservice.controller;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This is the controller class and maps all the mappings and api's
 * to perform operations
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class UserController {

    // Injecting UserServiceImpl object dependency.
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // This api will save the new user to the database
    @PostMapping("/user")
    public ResponseEntity <User> saveUser(@RequestBody User user){
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    // This api will update user details based on their email id.
    @PutMapping("/user/{userEmailId}")
    public ResponseEntity < User > updateUser(@PathVariable String userEmailId, @RequestBody User user) {
        user.setUserEmailId(userEmailId);
        return ResponseEntity.ok().body(this.userService.updateUser(user));
    }

    // This api will get the user details based on their email id
    @GetMapping("/user/{userEmailId}")
    public ResponseEntity<User> getUserByEmailId(@PathVariable String userEmailId){
        return ResponseEntity.ok().body(userService.getUserByEmailId(userEmailId));
    }

    // This api will delete the use from database.
    @DeleteMapping("/user/{userEmailId}")
    public ResponseEntity<User> deleteUser(@PathVariable("userEmailId") String email)
    {
        return new ResponseEntity<>(userService.deleteUser(email),HttpStatus.OK);
    }

    // This api is used to get all users details.
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
