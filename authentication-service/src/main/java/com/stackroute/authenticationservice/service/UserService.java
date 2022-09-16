package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.User;

public interface UserService {
    User saveUser(User user);
    User findByUserEmailIdAndPassword(String userEmailId , String password) throws UserNotFoundException;
}
