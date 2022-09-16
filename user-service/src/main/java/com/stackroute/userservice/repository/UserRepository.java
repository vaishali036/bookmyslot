package com.stackroute.userservice.repository;

import com.stackroute.userservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface will extends MongoRepository and implement all the
 * functions available in MongoRepository
 */

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
