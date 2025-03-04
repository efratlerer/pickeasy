package com.example.javaspringboot.service;


import com.example.javaspringboot.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Long> {
}
