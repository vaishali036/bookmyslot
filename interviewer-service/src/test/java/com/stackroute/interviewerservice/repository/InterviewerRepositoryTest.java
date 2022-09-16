package com.stackroute.interviewerservice.repository;

import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.model.Interview;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;
@ExtendWith(SpringExtension.class)
@DataMongoTest
public class InterviewerRepositoryTest {
        @Autowired
        private InterviewerRepository interviewerRepository;
        private Interview fetchedSlot;

        @BeforeEach
        void setUp() throws ParseException {
            fetchedSlot = new Interview();
           // fetchedSlot.setSlotId("101");
            fetchedSlot.setTechTrack("backend");
            fetchedSlot.setInterviewerEmailId("chhavi.k@gmail.com");
            fetchedSlot.setInterviewerName("Chhavi");
            fetchedSlot.setDescription("Java Backend interview");
            fetchedSlot.setBookedStatus(BookedStatus.UPCOMING);
            fetchedSlot.setStartTime(new Date(System.currentTimeMillis()));
            Date d1 = new SimpleDateFormat("HH:mm:ss").parse("10:30:00");
            fetchedSlot.setStartTime(d1);
            Date d2 = new SimpleDateFormat("HH:mm:ss").parse("11:30:00");
            fetchedSlot.setEndTime(d2);
            fetchedSlot.setDate("2022:09:09");
        }

        @AfterEach
        void tearDown() {
            interviewerRepository.deleteAll();
            fetchedSlot = null;
        }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot(){
        interviewerRepository.save(fetchedSlot);
        Interview interview = interviewerRepository.findById(fetchedSlot.getSlotId()).get();
        Assertions.assertEquals(interview.getSlotId(),fetchedSlot.getSlotId());
    }


 @Test
    public void givenInterviewerEmailThenShouldReturnListOfAllSlots(){
        Interview interview = interviewerRepository.save(fetchedSlot);
        List<Interview> interviewList = interviewerRepository.findByInterviewerEmailId(interview.getInterviewerEmailId());
        Assertions.assertEquals(fetchedSlot.getSlotId(),interviewList.get(0).getSlotId());
        Assertions.assertEquals(fetchedSlot.getInterviewerEmailId(),interviewList.get(0).getInterviewerEmailId());
        Assertions.assertEquals(fetchedSlot.getInterviewerName(),interviewList.get(0).getInterviewerName());

  }
    @Test
    public void givenTechTrackThenShouldReturnListOfAllSlots(){
        Interview interview = interviewerRepository.save(fetchedSlot);
        List<Interview> interviewList = interviewerRepository.findByTechTrack(interview.getTechTrack());
        Assertions.assertEquals(fetchedSlot.getSlotId(),interviewList.get(0).getSlotId());
        Assertions.assertEquals(fetchedSlot.getTechTrack(),interviewList.get(0).getTechTrack());
        Assertions.assertEquals(fetchedSlot.getInterviewerName(),interviewList.get(0).getInterviewerName());

    }

    @Test
    public void givenSlotIdToDeleteThenShouldReturnDeleteSlot(){
        interviewerRepository.save(fetchedSlot);
        interviewerRepository.delete(fetchedSlot);
        Interview optional = interviewerRepository.findBySlotId(fetchedSlot.getSlotId());
        Assertions.assertEquals(null, optional);
    }


}





