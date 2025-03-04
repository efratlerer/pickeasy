package com.example.javaspringboot.service;

import com.example.javaspringboot.model.Comments;
import com.example.javaspringboot.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
}
