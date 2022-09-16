package com.stackroute.interviewerservice.repository;

import com.stackroute.interviewerservice.model.Interviewer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InterviewerRepo extends MongoRepository<Interviewer, String> {
    Interviewer findByInterviewerEmailId(String  interviewerEmailId);
}
