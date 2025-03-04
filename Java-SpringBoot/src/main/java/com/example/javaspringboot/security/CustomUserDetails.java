package com.example.javaspringboot.security;

import com.example.javaspringboot.model.Users;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CustomUserDetails extends User {
    private Users user;

    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

}
