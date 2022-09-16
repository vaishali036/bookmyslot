package com.stackroute.interviewerservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.interviewerservice.enums.BookedStatus;
import com.stackroute.interviewerservice.exception.InterviewAlreadyExistException;
import com.stackroute.interviewerservice.model.Interview;
import com.stackroute.interviewerservice.service.InterviewerService;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class InterviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private InterviewerService interviewerService;
    private Interview fetchedSlot;
    private List<Interview> interviewList;

    @InjectMocks
    private InterviewerController interviewerController;

    @BeforeEach
    public void setUp() throws ParseException {
        fetchedSlot = new Interview();
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
        fetchedSlot.setDate("2022:02:03");
        //optional = Optional.of(fetchedSlot);
        interviewList = new ArrayList<>();
        interviewList.add(fetchedSlot);
        mockMvc = MockMvcBuilders.standaloneSetup(interviewerController).build();
    }

    @Test
    public void givenSlotToSaveShouldReturnSavedSlot() throws Exception {
        when(interviewerService.createSlot(any())).thenReturn(fetchedSlot);
        mockMvc.perform(post("/api/v1/slot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)))
                .andExpect(status().isCreated());
        verify(interviewerService,times(1)).createSlot(any());
    }

    @Test
    public void getAllSlotsByInterviewerEmailIdThenShouldReturnListOfAllSlots() throws Exception {
        lenient().when(interviewerService.getAllSlotsByInterviewerEmailId(fetchedSlot.getInterviewerEmailId())).thenReturn(interviewList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/slot/chhavi.k@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(fetchedSlot)))
                .andDo(MockMvcResultHandlers.print());
        verify(interviewerService, times(1)).getAllSlotsByInterviewerEmailId(any());
   }

    @Test
    public void getAllSlotsByTechTrackThenShouldReturnListOfAllSlots() throws Exception {
        lenient().when(interviewerService.getAllSlotsByTechTrack(fetchedSlot.getTechTrack())).thenReturn(interviewList);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/slot/interview/slot/backend")
                        .contentType(MediaType.APPLICATION_JSON).content(asJsonString(fetchedSlot)))
                .andDo(MockMvcResultHandlers.print());
        verify(interviewerService, times(1)).getAllSlotsByTechTrack(any());
    }


   @Test
    public void givenInterviewerToUpdateThenShouldReturnUpdatedUser() throws Exception, InterviewAlreadyExistException {
        when(interviewerService.updateSlot(any())).thenReturn(fetchedSlot);
        mockMvc.perform(put("/api/v1/slot/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)));
                //.andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(interviewerService, times(1)).updateSlot(any());
    }

    @Test
    public void givenSlotIdToDeleteThenShouldReturnDeletedSlot() throws Exception {
        lenient().when(interviewerService.deleteSlot(fetchedSlot.getSlotId())).thenReturn(fetchedSlot);
        mockMvc.perform(delete("/api/v1/interview/slot/SLOT1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(fetchedSlot)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        verify(interviewerService, times(1)).deleteSlot(any());
    }


    public static String asJsonString(final Object obj){
        try{
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
