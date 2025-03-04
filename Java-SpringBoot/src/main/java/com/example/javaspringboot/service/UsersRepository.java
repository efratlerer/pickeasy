package com.example.javaspringboot.service;


import com.example.javaspringboot.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
   Users findByUsername(String username);
}
