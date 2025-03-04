package com.example.javaspringboot.dto;

import com.example.javaspringboot.model.Likes;
import com.example.javaspringboot.model.Questions;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;

import java.util.List;

public class UserDTO {
    private long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private int points;
    private int status;
    private  int like_count;
    private  int win_count;
    @JsonIgnore
    private List<Questions> Questions;
    @JsonIgnore
    private List<Likes> likes;
    private byte[] profile;
    private  boolean admin = false;

    public UserDTO() {
    }

    public int getLike_count() {
        return like_count;
    }

    public void setLike_count(int like_count) {
        this.like_count = like_count;
    }

    public int getWin_count() {
        return win_count;
    }

    public void setWin_count(int win_count) {
        this.win_count = win_count;
    }

    public boolean isAdmin() {
        return admin;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
@JsonIgnore
    public List<Questions> getQuestions() {
        return Questions;
    }

    public void setQuestions(List<Questions> questions) {
        Questions = questions;
    }

    public List<Likes> getLikes() {
        return likes;
    }

    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }

    public byte[] getProfile() {
        return profile;
    }

    public void setProfile(byte[] profile) {
        this.profile = profile;
    }
}
