package com.stackroute.emailservice.service;

import com.stackroute.emailservice.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;


    public Email sendEmail(Email email) {
        System.out.println(email.toString());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getInterviewerEmailId());
        message.setSubject(email.getSubject());
        String pattern = "dd MMM yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        String date = simpleDateFormat.format(email.getDate());
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("HH:mm:SS");
        simpleDateFormat1.setTimeZone(TimeZone.getTimeZone("UTC"));
        String startTime = simpleDateFormat1.format(email.getStartTime());
        String endTime = simpleDateFormat1.format(email.getEndTime());



        message.setText("Hi "+email.getInterviewerEmailId().split("@")[0]+",\n\n"+ "Greeting from BookMySlot, \nYour slot is booked successfully.\nPlease ensure your availability for the following Schedule-" +
                "\nBooked Date\t:\t"+date+"\nStart Time\t:\t"+startTime+"\nEnd Time\t:\t"+endTime+"\n\nThanks & Regards\nBookMySlot Corp. Ltd.");

        mailSender.send(message);
        return email;

    }

    @Override
    public Email sendEmailCancel(Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email.getInterviewerEmailId(),email.getTagEmailId());
        message.setSubject(email.getSubject());
        String pattern = "dd MMM yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        String date = simpleDateFormat.format(email.getDate());
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("HH:mm");
        simpleDateFormat1.setTimeZone(TimeZone.getTimeZone("UTC"));
        String startTime = simpleDateFormat1.format(email.getStartTime());
        String endTime = simpleDateFormat1.format(email.getEndTime());
        message.setText("Hi"+",\n\n"+ "Greeting from BookMySlot, \nThis is confirm that slot with the below details is cancelled.\nCancelled slot details is-" +
                "\nBooked Date\t:\t"+date+"\nStart Time\t:\t"+startTime+"\nEnd Time\t:\t"+endTime+"\n\nThanks & Regards\nBookMySlot Corp. Ltd.");

        mailSender.send(message);
        return email;
    }
}
