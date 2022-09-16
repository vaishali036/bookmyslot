package com.stackroute.authenticationservice.repository;

import com.stackroute.authenticationservice.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static com.stackroute.authenticationservice.enums.UserRole.TAG;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User user;

    @BeforeEach
    void setUp(){
        user = new User();
        user.setUserEmailId("chhavi.kriti@gmail.com");
        user.setUserRole(TAG);
        user.setPassword("PW@23abc");
    }

    @AfterEach
    void tearDown(){
        userRepository.deleteAll();
        user = null;
    }

    @Test
    public void givenUserToSaveShouldReturnSavedUser(){
        User user1=userRepository.save(user);
        assertEquals("chhavi.kriti@gmail.com", user1.getUserEmailId(),user1.getUserEmailId());
    }



   @Test
    public void givenEmailIdAndPasswordToGetUserThenReturnUser(){
        User user1 = userRepository.save(user);
        Optional<User> optional = Optional.ofNullable(userRepository.findByUserEmailIdAndPassword(user1.getUserEmailId(), user1.getPassword()));
        assertEquals(user1.getUserEmailId(),optional.get().getUserEmailId());
        assertEquals(user1.getUserRole(),optional.get().getUserRole());
        assertEquals(user1.getPassword(),optional.get().getPassword());
    }





}