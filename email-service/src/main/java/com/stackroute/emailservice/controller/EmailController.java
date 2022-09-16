package com.stackroute.emailservice.controller;


import com.stackroute.emailservice.model.Email;
import com.stackroute.emailservice.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class EmailController {
    private EmailService emailService;
    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendemail/booked")
    public ResponseEntity<?> sendEmail(@RequestBody Email email){
        try {
           Email email1= emailService.sendEmail(email);
            return new ResponseEntity<Email>(email1, HttpStatus.OK);
        }
        catch (Exception e){
         e.printStackTrace();
         return new ResponseEntity<String>("failed", HttpStatus.CONFLICT);

        }
      //  return new ResponseEntity<Email>(email, HttpStatus.OK);
    }
    @PostMapping("/sendemail/cancel")
    public ResponseEntity<?> sendEmailCancelled(@RequestBody Email email){
        try {
            Email email1= emailService.sendEmailCancel(email);
            return new ResponseEntity<Email>(email1, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("failed", HttpStatus.CONFLICT);

        }
        //  return new ResponseEntity<Email>(email, HttpStatus.OK);
    }
}
