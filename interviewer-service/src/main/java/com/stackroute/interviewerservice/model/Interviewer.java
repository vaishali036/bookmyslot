package com.stackroute.interviewerservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackroute.interviewerservice.enums.BookedStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
public class Interviewer {
    @Id
    private String interviewerEmailId;
    private String techTrack;


    private String interviewerName;
    @JsonFormat(pattern = "yyyy:MM:dd")
    private String date;
    private Long phoneNo;
    private BookedStatus status;
    List<Interview> slots;
}
