package com.example.javaspringboot.controller;

import com.example.javaspringboot.model.EmailDetails;
import com.example.javaspringboot.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
// Class
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public String sendMail(@Valid @RequestBody EmailDetails details) {
        String status = emailService.sendSimpleMail(details);

        return status;
    }   }