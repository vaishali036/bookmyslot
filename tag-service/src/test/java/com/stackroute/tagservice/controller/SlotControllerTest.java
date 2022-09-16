package com.stackroute.tagservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.tagservice.enums.BookedStatus;
import com.stackroute.tagservice.exception.InterviewerNotFoundException;
import com.stackroute.tagservice.exception.SlotNotFoundException;
import com.stackroute.tagservice.model.Slot;
import com.stackroute.tagservice.service.SlotService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class SlotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private SlotService slotService;
    private Slot fetchedSlot;
    private List<Slot> slotList;

    @InjectMocks
    private SlotController slotController;

    @BeforeEach
    public void setUp() throws ParseException {
        fetchedSlot = new Slot();
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
        //optional = Optional.of(fetchedSlot);
        slotList = new ArrayList<>();
        slotList.add(fetchedSlot);
        mockMvc = MockMvcBuilders.standaloneSetup(slotController).build();
    }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot() throws Exception, SlotNotFoundException {
        when(slotService.bookSlot(any())).thenReturn(fetchedSlot);
        mockMvc.perform(post("/api/v1/interview/slot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)))
                .andExpect(status().isCreated());
        verify(slotService,times(1)).bookSlot(any());
    }

    @Test
    public void getAllSlotsByInterviewerEmailIdThenShouldReturnListOfAllSlots() throws Exception, InterviewerNotFoundException {
        lenient().when(slotService.getAllSlotsByInterviewerEmailId(fetchedSlot.getInterviewerEmailId())).thenReturn(slotList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/interview/slot/interviewer@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(fetchedSlot)))
                .andDo(MockMvcResultHandlers.print());
        verify(slotService, times(1)).getAllSlotsByInterviewerEmailId(any());
    }

    @Test
    public void getAllSlotsByTagEmailIdThenShouldReturnListOfAllSlots() throws Exception {
        lenient().when(slotService.getAllSlotsByTagEmailId(fetchedSlot.getBookedTagEmailId())).thenReturn(slotList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/interview/tag/slot/tag@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(fetchedSlot)))
                .andDo(MockMvcResultHandlers.print());
        verify(slotService, times(1)).getAllSlotsByTagEmailId(any());
    }

    @Test
    public void givenSlotIdToDeleteThenShouldReturnDeletedSlot() throws Exception, SlotNotFoundException {
        lenient().when(slotService.deleteSlot(fetchedSlot.getBookedSlotId())).thenReturn(fetchedSlot);
        mockMvc.perform(delete("/api/v1/interview/slot/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        verify(slotService, times(1)).deleteSlot(any());
    }

    @Test
    public void givenUserToUpdateThenShouldReturnUpdatedUser() throws Exception {
        when(slotService.updateSlot(any())).thenReturn(fetchedSlot);
        mockMvc.perform(put("/api/v1//interview/slot/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(slotService, times(1)).updateSlot(any());
    }


    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
