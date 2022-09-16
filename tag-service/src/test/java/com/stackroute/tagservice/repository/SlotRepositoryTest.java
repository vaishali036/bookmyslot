package com.stackroute.tagservice.repository;

import com.stackroute.tagservice.enums.BookedStatus;
import com.stackroute.tagservice.model.Slot;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class SlotRepositoryTest {

    @Autowired
    private SlotRepository slotRepository;
    private Slot fetchedSlot;

    @BeforeEach
    void setUp() throws ParseException {
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
    }

    @AfterEach
    void tearDown(){
        slotRepository.deleteAll();
        fetchedSlot = null;
    }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot(){
        slotRepository.save(fetchedSlot);
        Slot slot = slotRepository.findByBookedSlotId(fetchedSlot.getBookedSlotId());
        assertEquals("101", slot.getBookedSlotId(),slot.getBookedTagEmailId());
    }

   @Test
    public void givenGetAllSlotsThenShouldReturnListOfAllSlots() throws ParseException {Slot slot = new Slot();
       slot.setBookedSlotId("102");
       slot.setBookedTagEmailId("tag2@gmail.com");
       slot.setBookedTagName("Ram Jivan");
       slot.setInterviewerEmailId("interviewer@gmail.com");
       slot.setInterviewerName("Charan");
       slot.setInterviewTopic("Java Backend interview");
       slot.setDescription("Follow all the guideline to attend the interview");
       slot.setTechTrack("Backend");
       slot.setBookedStatus(BookedStatus.UPCOMING);
       slot.setBookingTime(new Date(System.currentTimeMillis()));
       Date d1 = new SimpleDateFormat("HH:mm:ss").parse("11:30:00");
       slot.setStartTime(d1);
       Date d2 = new SimpleDateFormat("HH:mm:ss").parse("12:30:00");
       slot.setEndTime(d2);
       slot.setBookingDate(new Date(System.currentTimeMillis()));
        slotRepository.save(fetchedSlot);
        slotRepository.save(slot);

        List<Slot> slotList = slotRepository.findAll();
        assertEquals("102", slotList.get(1).getBookedSlotId());
    }

    @Test
    public void givenInterviewerEmailThenShouldReturnListOfAllSlots(){
        Slot slot = slotRepository.save(fetchedSlot);
        List<Slot> slotList = slotRepository.findByInterviewerEmailId(fetchedSlot.getInterviewerEmailId());
        assertEquals(fetchedSlot.getBookedSlotId(),slotList.get(0).getBookedSlotId());
        assertEquals(fetchedSlot.getInterviewerEmailId(),slotList.get(0).getInterviewerEmailId());
        assertEquals(fetchedSlot.getInterviewerName(),slotList.get(0).getInterviewerName());

    }

    @Test
    public void givenTagEmailIdThenShouldReturnListOfAllSlots(){
        Slot slot = slotRepository.save(fetchedSlot);
        List<Slot> slotList = slotRepository.findByBookedTagEmailId(fetchedSlot.getBookedTagEmailId());
        assertEquals(fetchedSlot.getBookedSlotId(),slotList.get(0).getBookedSlotId());
        assertEquals(fetchedSlot.getBookedTagEmailId(),slotList.get(0).getBookedTagEmailId());
        assertEquals(fetchedSlot.getBookedTagName(),slotList.get(0).getBookedTagName());

    }

    @Test
    public void givenSlotIdToDeleteThenShouldReturnDeleteSlot(){
        slotRepository.save(fetchedSlot);
        slotRepository.delete(fetchedSlot);
        Slot optional = slotRepository.findByBookedSlotId(fetchedSlot.getBookedSlotId());
        assertEquals(null, optional);
    }



}