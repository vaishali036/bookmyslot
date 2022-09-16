package com.stackroute.userservice.service;

import com.stackroute.userservice.model.User;

import java.util.List;

/**
 * This interface is implemented by UserServiceImpl
 */
public interface UserService {
    User createUser(User user);

    User updateUser(User user);

    User getUserByEmailId(String emailId);

    User deleteUser(String emailId);

    List<User> getAllUsers();

}
