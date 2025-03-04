package com.example.javaspringboot.service;

import com.example.javaspringboot.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagesRepository extends JpaRepository<Images, Long> {

    List<Images> findByQuestions_Id(Long questionId);
    List<Images> findByLikes_Users_Id(Long userId);
}
