package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;

    }
    //This method updates the user details.
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    //This is implemetation method of finding user by email id and password
    @Override
    public User findByUserEmailIdAndPassword(String userEmailId, String password) throws UserNotFoundException {
        User user =  userRepository.findByUserEmailIdAndPassword(userEmailId , password);
        if(user == null){
            throw new UserNotFoundException();
        }
        return user;
    }
}
