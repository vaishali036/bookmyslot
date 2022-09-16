package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.exception.InterviewAlreadyExistException;
import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.model.Interviewer;

import java.util.Date;
import java.util.List;
//This will contain the methods to be implemented in service implementation
public interface InterviewerService {
     Interview createSlot(Interview interview);
    Interview updateSlot(Interview interview);
    Interview deleteSlot(String slotId);
    Interview updateSlotStatus(Interview interview);
     List<Interview> getAllSlotsByInterviewerEmailId(String interviewerEmailId);
     List<Interview> getAllSlotsByTechTrack(String techTrack);
     int getSequenceNumber(String sequenceName);

     Interviewer getAllSlotsByDateAndInterviewerEmailId(String date, String interviewerEmailId);

    List<Interviewer> getAllSlotsByTechTrackFormatted(String techTrack);



}

