package com.stackroute.authenticationservice.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.authenticationservice.controller.UserController;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.service.UserService;
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

import static com.stackroute.authenticationservice.enums.UserRole.TAG;
import static org.junit.jupiter.api.Assertions.*;
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
        user =  new User("chhavi.kriti@gmail.com","PW@23abc",TAG);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void givenUserToSaveShouldReturnSavedUser() throws Exception {
        when(userService.saveUser(any())).thenReturn(user);
        mockMvc.perform(post("/api/v1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(status().isCreated());
        verify(userService,times(1)).saveUser(any());
    }


    @Test
    public void givenEmailToFindByEmailThenShouldReturnUser() throws Exception{
        userService.saveUser(user);
        when(userService.findByUserEmailIdAndPassword(user.getUserEmailId(), user.getPassword())).thenReturn(user);
        mockMvc.perform(post("/api/v1/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        verify(userService, times(1)).findByUserEmailIdAndPassword(any(),any());   }


    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}