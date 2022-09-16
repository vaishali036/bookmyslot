package com.stackroute.interviewerservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.beans.Transient;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "dbSequence")
public class DbSequence {

    @Id
    private String id;
    private int seq;

}
