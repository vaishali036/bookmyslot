package com.stackroute.authenticationservice.model;

import com.stackroute.authenticationservice.enums.UserRole;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
//This is model class where all the fields are declared
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @NotNull
    @Email
    private String userEmailId;
   @Pattern(regexp="^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$",message="password must 8 characters, 2 UpperCase, 1 Special Character, 2 Numbers & 3 LowerCase")
    private String password;
    private UserRole userRole;

}
