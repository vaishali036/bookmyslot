package com.stackroute.emailservice.service;

import com.stackroute.emailservice.model.Email;

public interface EmailService {
    Email sendEmail(Email email);

    Email sendEmailCancel(Email email);
}
