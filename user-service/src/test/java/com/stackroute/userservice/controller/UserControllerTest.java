package com.stackroute.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.enums.UserRole;
import com.stackroute.userservice.exception.ResourceNotFoundException;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;
    private User user;
    private List<User> userList;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp(){
        user =  new User("bala@gmail.com","Bala", UserRole.INTERVIEWER, 764774,"bala@123","FullStack");
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void givenUserToSaveShouldReturnSavedUser() throws Exception, UserAlreadyExistsException {
        when(userService.createUser(any())).thenReturn(user);
        mockMvc.perform(post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(status().isCreated());
        verify(userService,times(1)).createUser(any());
    }

    @Test
    public void getAllUsersThenShouldReturnListOfAllUsers() throws Exception{
        when(userService.getAllUsers()).thenReturn(userList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    public void givenEmailToFindByEmailThenShouldReturnUser() throws Exception, ResourceNotFoundException {
        lenient().when(userService.getUserByEmailId(user.getUserEmailId())).thenReturn(user);
        mockMvc.perform(get("/api/v1/user/bala@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        verify(userService, times(1)).getUserByEmailId(any());
    }

    @Test
    public void givenEmailToDeleteThenShouldReturnDeletedUser() throws Exception, ResourceNotFoundException {
        lenient().when(userService.deleteUser(user.getUserEmailId())).thenReturn(user);
        mockMvc.perform(delete("/api/v1/user/bala@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk());
       verify(userService, times(1)).deleteUser(any());
    }

    @Test
    public void givenUserToUpdateThenShouldReturnUpdatedUser() throws Exception {
        when(userService.updateUser(any())).thenReturn(user);
        mockMvc.perform(put("/api/v1/user/bala@gmail.com").contentType(MediaType.APPLICATION_JSON).content(asJsonString(user)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(userService, times(1)).updateUser(any());
    }


    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
