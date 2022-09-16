package com.stackroute.interviewerservice.service;

import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.exception.InterviewAlreadyExistException;
import com.stackroute.interviewerservice.exception.ResourceNotFoundException;
import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.repository.InterviewerRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.stackroute.interviewerservice.enums.BookedStatus.PAST;
import static com.stackroute.interviewerservice.enums.BookedStatus.UPCOMING;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
public class InterviewerServiceTest {
    @Mock
    private InterviewerRepository interviewerRepository;

    @InjectMocks
    private InterviewerServiceImpl interviewerService;
    private List<Interview> interviewList;
    private Interview interview;
    private Optional optional;
    private Interview fetchedSlot;

    @BeforeEach
    public void setUp() throws ParseException {
        MockitoAnnotations.initMocks(this);
        fetchedSlot = new Interview();
        //fetchedSlot.setSlotId("101");
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
        fetchedSlot.setDate("2022:10:09");
        optional = Optional.of(fetchedSlot);
        interviewList = new ArrayList<>();
        interviewList.add(fetchedSlot);
    }

    @AfterEach
    public void tearDown(){
        fetchedSlot = null;
    }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot() throws InterviewAlreadyExistException {
        when(interviewerRepository.save(fetchedSlot)).thenReturn(fetchedSlot);
        Assertions.assertEquals(fetchedSlot,interviewerService.createSlot(fetchedSlot));
        verify(interviewerRepository,times(1)).save(any());
    }
    @Test
    public void givenSlotToUpdateThenShouldReturnUpdatedSlot() {
        when(interviewerRepository.findById(fetchedSlot.getSlotId())).thenReturn(optional);
        fetchedSlot.setInterviewerEmailId("arvind@gmail.com");
        fetchedSlot.setInterviewerName("Arvind");
        Interview updatedSlot = interviewerService.updateSlot(fetchedSlot);
        assertEquals(fetchedSlot, updatedSlot);
    }



//    @Test
//    public void givenSlotToUpdateSlotStatusThenShouldReturnUpdatedSlotStatus() throws ResourceNotFoundException {
//        when(interviewerRepository.findById(fetchedSlot.getSlotId())).thenReturn(optional);
//        fetchedSlot.setBookedStatus(UPCOMING);
//        Interview updatedSlot = interviewerService.updateSlotStatus(fetchedSlot);
//        Assertions.assertEquals( fetchedSlot,updatedSlot);
//    }



    @Test
    public void givenInterviewerEmailIdToGetSlotByEmailIdThenReturnSlots() throws  ParseException{
        interviewerService.createSlot(fetchedSlot);
        interviewerRepository.save(fetchedSlot);
        when(interviewerRepository.findByInterviewerEmailId("chhavi.k@gmail.com")).thenReturn(interviewList);
        List<Interview> interview = interviewerService.getAllSlotsByInterviewerEmailId("chhavi.k@gmail.com");
        assertEquals(interviewList, interview);

    }

    @Test
    public void givenTechTrackToGetSlotByTechTrackThenReturnSlots() throws  ParseException{
        interviewerService.createSlot(fetchedSlot);
        interviewerRepository.save(fetchedSlot);
        when(interviewerRepository.findByTechTrack("backend")).thenReturn(interviewList);
        List<Interview> interview = interviewerService.getAllSlotsByTechTrack("backend");
        assertEquals(interviewList, interview);

    }

    @Test
    public void givenSlotIdToDeleteThenShouldDeleteRespectiveSlot() {
        when(interviewerRepository.findBySlotId(fetchedSlot.getSlotId())).thenReturn(fetchedSlot);
        Interview slotDel = interviewerService.deleteSlot(fetchedSlot.getSlotId());
        assertEquals(fetchedSlot, slotDel);
    }

}
