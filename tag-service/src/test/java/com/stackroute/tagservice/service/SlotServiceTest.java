package com.stackroute.tagservice.service;

import com.stackroute.tagservice.enums.BookedStatus;
import com.stackroute.tagservice.exception.InterviewerNotFoundException;
import com.stackroute.tagservice.exception.SlotNotFoundException;
import com.stackroute.tagservice.model.Slot;
import com.stackroute.tagservice.repository.SlotRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SlotServiceTest {
    @Mock
    private SlotRepository slotRepository;

    @InjectMocks
    private SlotServiceImpl slotService;
    private List<Slot> slotList;
    private Slot fetchedSlot;
    private Optional optional;

    @BeforeEach
    public void setUp() throws ParseException {
        MockitoAnnotations.initMocks(this);
        fetchedSlot = new Slot();
        fetchedSlot.setBookedSlotId("101");
        fetchedSlot.setBookedTagEmailId("tag@gmail.com");
        fetchedSlot.setBookedTagName("Ram");
        fetchedSlot.setInterviewerEmailId("interviewer@gmail.com");
        fetchedSlot.setInterviewerName("Charan");
        fetchedSlot.setInterviewTopic("Java Backend interview");
        fetchedSlot.setDescription("Follow all the guideline to attend the interview");
        fetchedSlot.setTechTrack("Backend");
        fetchedSlot.setBookedStatus(BookedStatus.UPCOMING);
        fetchedSlot.setBookingTime(new Date(System.currentTimeMillis()));
        Date d1 = new SimpleDateFormat("HH:mm:ss").parse("10:30:00");
        fetchedSlot.setStartTime(d1);
        Date d2 = new SimpleDateFormat("HH:mm:ss").parse("11:30:00");
        fetchedSlot.setEndTime(d2);
        fetchedSlot.setBookingDate(new Date(System.currentTimeMillis()));
        optional = Optional.of(fetchedSlot);
        slotList = new ArrayList<>();
        slotList.add(fetchedSlot);
    }

    @AfterEach
    public void tearDown(){
        fetchedSlot = null;
    }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot() {
        when(slotRepository.save(fetchedSlot)).thenReturn(fetchedSlot);
        assertEquals(fetchedSlot,slotService.bookSlot(fetchedSlot));
        verify(slotRepository,times(1)).save(any());
    }

    @Test
    public void givenInterviewerEmailIdToGetSlotByEmailIdThenReturnSlots() throws InterviewerNotFoundException, ParseException{
            slotService.bookSlot(fetchedSlot);
            slotRepository.save(fetchedSlot);
            when(slotRepository.findByInterviewerEmailId("interviewer@gmail.com")).thenReturn(slotList);
            List<Slot> slots = slotService.getAllSlotsByInterviewerEmailId("interviewer@gmail.com");
            assertEquals(slotList, slots);

    }

    @Test
    public void givenTagMemberEmailIdToGetAllSlotByTagEmailIdThenReturnSlots() throws InterviewerNotFoundException, ParseException{
        slotService.bookSlot(fetchedSlot);
        slotRepository.save(fetchedSlot);
        when(slotRepository.findByBookedTagEmailId("tag@gmail.com")).thenReturn(slotList);
        List<Slot> slots = slotService.getAllSlotsByTagEmailId("tag@gmail.com");
        assertEquals(slotList, slots);

    }

    @Test
    public void givenSlotIdToDeleteThenShouldDeleteRespectiveSlot() throws SlotNotFoundException{
        when(slotRepository.findByBookedSlotId(fetchedSlot.getBookedSlotId())).thenReturn(fetchedSlot);
        Slot slotDel = slotService.deleteSlot(fetchedSlot.getBookedSlotId());
        assertEquals(fetchedSlot, slotDel);
    }

    @Test
    public void givenSlotToUpdateThenShouldReturnUpdatedSlot() throws SlotNotFoundException{
        when(slotRepository.findByBookedSlotId(fetchedSlot.getBookedSlotId())).thenReturn(fetchedSlot);
        fetchedSlot.setInterviewerEmailId("arvind@gmail.com");
        fetchedSlot.setInterviewerName("Arvind");
        Slot updatedSlot = slotService.updateSlot(fetchedSlot);
        assertEquals(fetchedSlot, updatedSlot);
    }


}

