package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.exception.InterviewAlreadyExistException;
import com.stackroute.interviewerservice.exception.ResourceNotFoundException;
import com.stackroute.interviewerservice.model.DbSequence;
import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.model.Interviewer;
import com.stackroute.interviewerservice.repository.InterviewerRepo;
import com.stackroute.interviewerservice.repository.InterviewerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.management.Query;
import java.util.*;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class InterviewerServiceImpl implements InterviewerService{
    @Autowired
    InterviewerRepository interviewerRepository;
    @Autowired
    InterviewerRepo interviewerRepo;
    //This method will create new slot
    @Override
    public Interview createSlot(Interview interview) {
       Interview objDb = this.interviewerRepository.findBySlotId(interview.getSlotId());
        if (objDb!=null){
            throw new InterviewAlreadyExistException("Record already exists with id : " + interview.getSlotId());
        }
        else {
            return interviewerRepository.save(interview);
        }
    }
   //This method will update slot
    @Override
    public Interview updateSlot(Interview interview) {
        try {
        Interview fecthedSlot = interviewerRepository.findById(interview.getSlotId()).get();
        fecthedSlot.setTechTrack(interview.getTechTrack());
        fecthedSlot.setInterviewerEmailId(interview.getInterviewerEmailId());
        fecthedSlot.setStartTime(interview.getStartTime());
        fecthedSlot.setEndTime(interview.getEndTime());
        fecthedSlot.setDescription(interview.getDescription());
        fecthedSlot.setDate(interview.getDate());
        interviewerRepository.save(fecthedSlot);
        return fecthedSlot;}
            catch (ResourceNotFoundException exception) {

                throw new ResourceNotFoundException("slot does not exists for id:"+ interview.getSlotId());
            }

    }

    @Override
    public Interview deleteSlot(String slotId) {
        try {
            Interview slot = interviewerRepository.findBySlotId(slotId);

            if (slot != null) {
                interviewerRepository.delete(slot);
                return slot;
            }else{
                throw new ResourceNotFoundException("slot does not exists with id: "+slotId);
            }
        }catch (Exception exception){
            throw new ResourceNotFoundException("slot does not exists with id: "+slotId);
        }
    }

    //This method will update slot status
    @Override
    public Interview updateSlotStatus(Interview interview) {
        Interview interview1 = interviewerRepository.findById(interview.getSlotId()).get();
        if (interview1 != null) {
            interview1.setBookedStatus(interview.getBookedStatus());
            return interviewerRepository.save(interview1);
        }
        else {
            throw new ResourceNotFoundException("slot does not exists for id:"+ interview.getSlotId());
        }
    }
  //This method will get all the slots by InterviewerEmailId
    @Override
    public List<Interview> getAllSlotsByInterviewerEmailId(String interviewerEmailId) {
        return interviewerRepository.findByInterviewerEmailId(interviewerEmailId);
    }
//This method will get all the slots by tech track
    @Override
    public List<Interview> getAllSlotsByTechTrack(String techTrack) {
        return interviewerRepository.findByTechTrack(techTrack);
    }

    public List<Interviewer> getAllSlotsByTechTrackFormatted(String techTrack) {
        List<Interview>  interviews = interviewerRepository.findByTechTrack(techTrack);
        List<Interviewer> interviewers = new ArrayList<>();
        List<String> email = new ArrayList<>();
        List<String> date = new ArrayList<>();
        for(Interview interview:interviews){
            Interviewer interviewer = getAllSlotsByDateAndInterviewerEmailId(interview.getDate(),interview.getInterviewerEmailId());
            if(email.contains(interviewer.getInterviewerEmailId()) && date.contains(interviewer.getDate())){
                continue;
            }else{
                date.add(interviewer.getDate());
                email.add(interviewer.getInterviewerEmailId());
                interviewers.add(interviewer);

            }

        }

        return interviewers;
    }

  @Autowired
    public InterviewerServiceImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    private MongoOperations mongoOperations;

    public int getSequenceNumber(String sequenceName){
        DbSequence counter = mongoOperations.findAndModify(query(where("_id").is(sequenceName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DbSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 10000;

    }

    @Override
    public Interviewer getAllSlotsByDateAndInterviewerEmailId(String date, String interviewerEmailId) {
        System.out.println(date);
        List<Interview> interviews= interviewerRepository.findByDateAndInterviewerEmailId(date, interviewerEmailId);
        if(interviews.isEmpty()){
            throw new ResourceNotFoundException("Interviewer with the email id and date not found");
        }else{
            Interviewer interviewer = new Interviewer();
            Interview interview = interviews.get(0);
            interviewer.setInterviewerEmailId(interview.getInterviewerEmailId());
            interviewer.setTechTrack(interview.getTechTrack());
            interviewer.setInterviewerName(interview.getInterviewerName());
            interviewer.setDate(interview.getDate());
            interviewer.setPhoneNo(interview.getPhoneNo());
            interviewer.setStatus(interview.getBookedStatus());
            interviewer.setSlots(interviews);
            return interviewer;
        }
    }

}
