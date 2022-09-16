package com.stackroute.interviewerservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackroute.interviewerservice.enums.BookedStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.Date;
//This is the model class which will contain all the data fields and getters,setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "interview")
public class Interview {
    @Transient
    public static final String SEQUENCE_NAME="user_sequence";
    @Id
    private String slotId;
    private String techTrack;
    @NonNull
    private String interviewerEmailId;
    private String interviewerName;
    @JsonFormat(pattern = "HH:mm")
    private Date startTime;
    @JsonFormat(pattern = "HH:mm")
    private Date endTime;
    private String date;
    private String description;
    private long phoneNo;
    @NonNull
    private BookedStatus bookedStatus;

}
