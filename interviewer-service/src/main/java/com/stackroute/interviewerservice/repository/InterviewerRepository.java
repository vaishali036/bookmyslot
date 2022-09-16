package com.stackroute.interviewerservice.repository;

import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.model.Interviewer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
//This is the interview repository which contains the methods to be implemented
@Repository
public interface InterviewerRepository extends MongoRepository<Interview,String> {

    List<Interview> findByInterviewerEmailId(String interviewerEmailId);
    List<Interview> findByTechTrack(String techTrack);
    Interview findBySlotId(String slotId);

    List<Interview> findByDateAndInterviewerEmailId(String date, String interviewerEmailId);
}
