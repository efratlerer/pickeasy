package com.example.javaspringboot.service;


import com.example.javaspringboot.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository extends JpaRepository<Questions, Long> {

}
