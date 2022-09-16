package com.stackroute.tagservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackroute.tagservice.enums.BookedStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
@Data
public class Slot {

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    private String bookedSlotId;
    @NonNull
    private String bookedTagEmailId;
    private String bookedTagName;
    @NonNull
    private String interviewerEmailId;
    private String interviewerName;
    private String interviewTopic;
    private String description;
    private  String techTrack;
    private String slotId;
    private BookedStatus bookedStatus;
    //@Temporal(TemporalType.TIME)
    @JsonFormat(pattern="HH:mm")
    private Date bookingTime;
    @JsonFormat(pattern="HH:mm")
    private Date startTime;
    @JsonFormat(pattern="HH:mm")
    private Date endTime;
    @JsonFormat(pattern="yyyy:MM:dd")
    private Date bookingDate;
    @JsonFormat(pattern="yyyy:MM:dd")
    private Date interviewerAvailDate;
}
