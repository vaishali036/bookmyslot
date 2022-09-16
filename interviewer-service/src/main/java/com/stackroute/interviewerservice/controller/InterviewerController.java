package com.stackroute.interviewerservice.controller;

import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.model.Interviewer;
import com.stackroute.interviewerservice.service.InterviewerService;
import com.stackroute.interviewerservice.service.InterviewerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.stackroute.interviewerservice.model.Interview.SEQUENCE_NAME;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class InterviewerController {


    InterviewerService interviewerService;
@Autowired
    public InterviewerController(InterviewerService interviewerService) {
        this.interviewerService = interviewerService;
    }


    //It will return the slot created
    @PostMapping("/slot")
    public ResponseEntity<Interview> saveUser(@RequestBody Interview interview){
        //generate sequence
        interview.setSlotId("SLOT"+String.valueOf(interviewerService.getSequenceNumber(Interview.SEQUENCE_NAME)));
        return new ResponseEntity<>(interviewerService.createSlot(interview), HttpStatus.CREATED);
    }
    //It will return all available slots by Interviewer Email id
    @GetMapping("slot/{interviewerEmailId}")
    public ResponseEntity <List<Interview>> getByInterviewerEmailId(@PathVariable String interviewerEmailId){
        return new ResponseEntity<List<Interview>>(interviewerService.getAllSlotsByInterviewerEmailId(interviewerEmailId), HttpStatus.CREATED);
    }
    //It will return all available slots by tech track
    @GetMapping("slot/interview/slot/{techTrack}")
    public ResponseEntity <List<Interview>> getByTechTrack(@PathVariable String techTrack){
        return new ResponseEntity<List<Interview>>(interviewerService.getAllSlotsByTechTrack(techTrack), HttpStatus.CREATED);
    }
    //It will return the updated slot
    @PutMapping("slot/{slotId}")
    public ResponseEntity <Interview> updateSlot(@PathVariable String slotId,@RequestBody Interview interview){
        interview.setSlotId(slotId);
        return new ResponseEntity<>(interviewerService.updateSlot(interview), HttpStatus.CREATED);
    }
    //It will return the updated slot status
    @PutMapping("slot/status/{slotId}")
    public ResponseEntity <Interview> updateSlotStatus(@PathVariable String slotId,@RequestBody Interview interview){
        interview.setSlotId(slotId);
        return new ResponseEntity<>(interviewerService.updateSlotStatus(interview), HttpStatus.CREATED);
    }
    @DeleteMapping("/interview/slot/{slotId}")
    public ResponseEntity<Interview> deleteSlot(@PathVariable String slotId){
        return new ResponseEntity<>(interviewerService.deleteSlot(slotId),HttpStatus.OK);
    }

    @GetMapping("/interviewer/interviewerEmailId/{interviewerEmailId}/date/{date}")
    public ResponseEntity<Interviewer> getInterviewerByEmailIdAndDate(@PathVariable String interviewerEmailId, @PathVariable String date) throws ParseException {

        return new ResponseEntity<Interviewer>(interviewerService.getAllSlotsByDateAndInterviewerEmailId(date, interviewerEmailId), HttpStatus.OK);
    }

    @GetMapping("interviews/techtrach/{techTrack}")
    public ResponseEntity <List<Interviewer>> getAllInterviewersByTechTrack(@PathVariable String techTrack){
        return new ResponseEntity<List<Interviewer>>(interviewerService.getAllSlotsByTechTrackFormatted(techTrack), HttpStatus.OK);
    }
}
