package com.example.javaspringboot.security;

import com.example.javaspringboot.model.Users;
import com.example.javaspringboot.security.CustomUserDetails;
import com.example.javaspringboot.service.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UsersRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //לאמת את המשתמש עם המשתמש שנמצא ב-DB
        Users user=userRepository.findByUsername(username);
        if (user==null)
            throw new UsernameNotFoundException("user not found");
        List<GrantedAuthority> grantedAuthorities=new ArrayList<>();
        //יוצר משתמש עבור האבטחה
        return (UserDetails) new CustomUserDetails(username,user.getPassword(),grantedAuthorities);
    }
}