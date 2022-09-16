package com.stackroute.emailservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Email {
    String subject;
    String statusCode;
    String interviewerEmailId;
    String tagEmailId;
    String messageText;
    @JsonFormat(pattern = "HH:mm")
    private Date startTime;
    @JsonFormat(pattern = "HH:mm")
    private Date endTime;
    @JsonFormat(pattern = "yyyy:MM:dd")
    private Date date;

}
