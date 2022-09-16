package com.stackroute.authenticationservice.service;

import com.stackroute.authenticationservice.model.User;

import java.util.Map;
//This the interface to generate token.

public interface SecurityTokenGenerator {
    Map<String,String> generateToken(User user);
}
