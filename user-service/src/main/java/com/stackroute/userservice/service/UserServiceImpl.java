package com.stackroute.userservice.service;

import com.stackroute.userservice.config.Producer;
import com.stackroute.userservice.exception.ResourceNotFoundException;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.rabbitmq.domain.InterviewDTO;
import com.stackroute.userservice.rabbitmq.domain.UserDTO;
import com.stackroute.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * It encapsulates the application's business logic,
 * and coor-dinating responses in the implementation of its operations.
 */

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    Producer producer;

    // Injecting UserRepository  object dependency.
    @Autowired
    UserRepository userRepository;

    // This method will take User object as parameter and it will create the user by calling
    // MongoRepository save method
    @Override
    public User createUser(User user) {
        Optional<User> userDb = this.userRepository.findById(user.getUserEmailId());
        if (userDb.isPresent()){
            throw new UserAlreadyExistsException("Record already exists with id : " + user.getUserEmailId());
        }
        else {
            UserDTO userdto=new UserDTO();
            userdto.setUserEmailId(user.getUserEmailId());
            userdto.setPassword(user.getPassword());
            userdto.setUserRole(user.getUserRole());
            producer.sendMessageToRabbitMq(userdto);
            return userRepository.save(user);
        }
    }

    // This method will update the user details based on userEmailId
    @Override
    public User updateUser(User user) {
        try {
            User fecthedUser = userRepository.findById(user.getUserEmailId()).get();
            fecthedUser.setUserName(user.getUserName());
            fecthedUser.setUserRole(user.getUserRole());
            fecthedUser.setPassword(user.getPassword());
            fecthedUser.setUserEmailId(user.getUserEmailId());
            fecthedUser.setPhoneNo(user.getPhoneNo());
            fecthedUser.setDepartment(user.getDepartment());
            userRepository.save(fecthedUser);
            return fecthedUser;

        } catch (ResourceNotFoundException exception) {

            throw new ResourceNotFoundException("User does not exists");
        }
    }

    // This method will User details based on their userEmailId
    @Override
    public User getUserByEmailId(String emailId) {
        Optional <User> userDb = this.userRepository.findById(emailId);

        if (userDb.isPresent()) {
            return userDb.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + emailId);
        }
    }

    // This methdod will detete the user
    @Override
    public User deleteUser(String emailId) throws ResourceNotFoundException{
        User user = null;
        Optional optional = userRepository.findById(emailId);
        if (optional.isPresent())
        {
            user = userRepository.findById(emailId).get();
            userRepository.deleteById(emailId);
        }
        return user;
    }

    // this table returns a list of all users available
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
