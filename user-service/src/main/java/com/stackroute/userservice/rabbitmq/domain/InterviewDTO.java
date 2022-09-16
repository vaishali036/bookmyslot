package com.stackroute.userservice.rabbitmq.domain;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class InterviewDTO {
    private String userEmailId;
    private String userName;
    private String techTrack;
}
