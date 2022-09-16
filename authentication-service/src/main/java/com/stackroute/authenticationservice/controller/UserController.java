package com.stackroute.authenticationservice.controller;

import com.stackroute.authenticationservice.service.SecurityTokenGenerator;
import com.stackroute.authenticationservice.service.UserService;
import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class UserController {
    private ResponseEntity responseEntity;
    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;

    //This is User controller class
    @Autowired
    public UserController(UserService userService,SecurityTokenGenerator securityTokenGenerator)
    {
        this.userService = userService;
        this.securityTokenGenerator=securityTokenGenerator;

    }
    //This is login for mapping for user using which user can login using the credentials
    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) throws UserNotFoundException {
        Map<String, String> map = null;
        try {
            User userObj = userService.findByUserEmailIdAndPassword(user.getUserEmailId(), user.getPassword());
            if (userObj.getUserEmailId().equals(user.getUserEmailId())) {
                map=securityTokenGenerator.generateToken(user);
                map.put("userRole",userObj.getUserRole().name());

            }
            responseEntity = new ResponseEntity(map,HttpStatus.OK);
        }
       catch(UserNotFoundException e){
            throw new UserNotFoundException();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity("Try after sometime!!!", HttpStatus.OK);
        }
        return responseEntity;
    }
    //First step is to register the user
    @PostMapping("/register")
    public ResponseEntity<User>  saveUser(@Valid @RequestBody User user) {

        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }


}
