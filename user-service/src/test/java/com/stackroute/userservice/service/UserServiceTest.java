package com.stackroute.userservice.service;

import com.stackroute.userservice.enums.UserRole;
import com.stackroute.userservice.exception.ResourceNotFoundException;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
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
        user = new User("peter@gmail.com","Hari",UserRole.INTERVIEWER,6353673,"hari12345","FrontEnd");
        optional = Optional.of(user);
    }

    @AfterEach
    public void tearDown(){
        user = null;
    }


    @Test
    public void givenGetAllUsersThenShouldReturnListOfAllUsers(){
        userRepository.save(user);
        when(userRepository.findAll()).thenReturn(userlist);
        List<User> list = userService.getAllUsers();
        assertEquals(list, userlist);
        verify(userRepository, times(1)).save(user);
        verify(userRepository, times(1)).findAll();

    }
    @Test
    public void givenUserToUpdateThenShouldReturnUpdatedUSer() throws ResourceNotFoundException{
        when(userRepository.findById(user.getUserEmailId())).thenReturn(optional);
        user.setPhoneNo(1234567789);
        User fetchuser = userService.updateUser(user);
        assertEquals(user, fetchuser);
    }


    @Test
    public void givenEmailToDeleteThenShouldDeleteRespectiveUser() throws ResourceNotFoundException {
        when(userRepository.findById(user.getUserEmailId())).thenReturn(optional);
        User userDel = userService.deleteUser(user.getUserEmailId());
        assertEquals(user, userDel);
    }

    @Test
    public void givenEmailIdToGetUserGetUserByIdThenReturnUser() throws ResourceNotFoundException {
        when(userRepository.findById(user.getUserEmailId())).thenReturn(optional);
        User fetchedUser = userService.getUserByEmailId(user.getUserEmailId());
        assertEquals(user, fetchedUser);

    }

}
