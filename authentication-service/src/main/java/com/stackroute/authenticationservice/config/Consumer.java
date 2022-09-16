package com.stackroute.authenticationservice.config;

import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.rabbitmq.domain.UserDTO;
import com.stackroute.authenticationservice.exception.UserAlreadyExistsException;
import com.stackroute.authenticationservice.service.UserServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private UserServiceImpl userService;

    @RabbitListener(queues="user_queue")
    public void getUserDtoFromRabbitMq(UserDTO userDto) throws UserAlreadyExistsException
    {
        System.out.println(userDto.toString());
        User user=new User();
        user.setUserEmailId(userDto.getUserEmailId());
        user.setPassword(userDto.getPassword());
        user.setUserRole(userDto.getUserRole());
        userService.saveUser(user);
    }
}
