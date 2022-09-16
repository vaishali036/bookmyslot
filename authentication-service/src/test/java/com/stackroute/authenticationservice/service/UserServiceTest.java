package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.exception.UserNotFoundException;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static com.stackroute.authenticationservice.enums.UserRole.TAG;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;
    private List<User> userlist;
    private User user;
    private Optional optional;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        user = new User("chhavi.kriti@gmail.com","P@ssWO12",TAG);
        optional = Optional.of(user);
    }

    @AfterEach
    public void tearDown(){
        user = null;
    }

    @Test
    public void givenUserToSaveShouldReturnSavedUser() {
        when(userRepository.save(any())).thenReturn(user);
        assertEquals(user,userService.saveUser(user));
        verify(userRepository,times(1)).save(any());
    }



    @Test
    public void givenEmailIdAndPasswordToGetUserThenReturnUser() throws  UserNotFoundException {
        when(userRepository.findByUserEmailIdAndPassword(user.getUserEmailId(), user.getPassword())).thenReturn(user);
        User fetchedUser = userService.findByUserEmailIdAndPassword(user.getUserEmailId(), user.getPassword());
        assertEquals(user, fetchedUser);

    }

}