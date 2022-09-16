package com.stackroute.userservice.repository;

import com.stackroute.userservice.enums.UserRole;
import com.stackroute.userservice.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User user;

    @BeforeEach
    void setUp(){
        user = new User();
        user.setUserEmailId("arvind@gmail.com");
        user.setUserName("Arvind");
        user.setUserRole(UserRole.INTERVIEWER);
        user.setDepartment("Backend");
        user.setPassword("12345");
        user.setPhoneNo(93373733);
    }

    @AfterEach
    void tearDown(){
        userRepository.deleteAll();
        user = null;
    }

    @Test
    public void givenUserToSaveShouldReturnSavedUser(){
        userRepository.save(user);
        User user1 = userRepository.findById(user.getUserEmailId()).get();
        assertEquals("arvind@gmail.com", user1.getUserEmailId(),user1.getUserEmailId());
    }

    @Test
    public void givenGetAllUsersThenShouldReturnListOfAllUsers(){
        User user = new User("bala@gmail.com","Bala",UserRole.INTERVIEWER, 764774,"bala@123","FullStack");
        User user1 = new User("kishore@gmail.com","Kishor",UserRole.INTERVIEWER, 764774,"bala@123","FullStack");
        userRepository.save(user);
        userRepository.save(user1);

        List<User> userList = userRepository.findAll();
        assertEquals("kishore@gmail.com", userList.get(1).getUserEmailId());
    }

    @Test
    public void givenEmailThenShouldReturnRespectiveUser(){
        User user = new User("bala@gmail.com","Bala",UserRole.INTERVIEWER, 764774,"bala@123","FullStack");
        User user1 = userRepository.save(user);
        Optional<User> optional = userRepository.findById(user1.getUserEmailId());
        assertEquals(user1.getUserName(),optional.get().getUserName());
        assertEquals(user1.getUserRole(),optional.get().getUserRole());
        assertEquals(user1.getDepartment(),optional.get().getDepartment());
        assertEquals(user1.getPhoneNo(),optional.get().getPhoneNo());
        assertEquals(user1.getPassword(),optional.get().getPassword());
    }

    @Test
    public void givenEmailToDeleteThenShouldReturnDeleteUser(){
        User user = new User("bala@gmail.com","Bala",UserRole.INTERVIEWER, 764774,"bala@123","FullStack");
        userRepository.save(user);
        userRepository.deleteById(user.getUserEmailId());
        Optional optional = userRepository.findById(user.getUserEmailId());
        assertEquals(Optional.empty(), optional);
    }



}