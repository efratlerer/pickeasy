package com.example.javaspringboot.service;

import com.example.javaspringboot.model.EmailDetails;

public interface EmailService {

        String sendSimpleMail(EmailDetails details);

}
