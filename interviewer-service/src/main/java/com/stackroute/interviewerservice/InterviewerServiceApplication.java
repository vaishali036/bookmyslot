package com.stackroute.interviewerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class InterviewerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewerServiceApplication.class, args);
	}

}
