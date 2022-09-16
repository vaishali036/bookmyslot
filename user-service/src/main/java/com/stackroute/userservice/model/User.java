package com.stackroute.userservice.model;

import com.stackroute.userservice.enums.UserRole;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * This is model class and contains all user
 * related field and this model is mapped with the database
 * relatonal table.
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "user")
public class User {
    //@Id will specify the primary key of table mapped with this model
    @Id
    @NonNull
    private String userEmailId;
    @NonNull
    private String userName;
    private UserRole userRole;
    @NonNull
    private long phoneNo;
    private String password;
    private String department;


}
