package com.example.javaspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class JavaSpringBootApplication {

    public static void main(String[] args) {

        SpringApplication.run(JavaSpringBootApplication.class, args);
        System.out.println(new BCryptPasswordEncoder(8).encode("@Efrat1234"));
    }

}
