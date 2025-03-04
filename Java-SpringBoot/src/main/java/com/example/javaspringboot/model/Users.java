package com.example.javaspringboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Null;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue
    private long id;
    @Null(message = "username is null")
    private String username;
    @Null(message = "password is null")
    @Length(message = "you need  atleast 7 tav")
    private String password;
    @Null(message = "email is null")
    @Email(message = "email worng")
    private String email;
    @Null(message = "phone is null")
    @Length(message = "you need 10 tav")
    private String phone;
    private int points;
    private int status;
    private int like_count;
    private int win_count;

    @JsonIgnore
    @OneToMany(mappedBy = "users",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Questions> Questions;
    @JsonIgnore
    @OneToMany(mappedBy = "users",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comments> comments;
    @JsonIgnore
    @OneToMany(mappedBy = "users",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Likes> likes;
    private String profile;
    @Column(nullable = false)
    private boolean admin = false;

    public Users() {
    }

    public Users(String username, String password, Collection<? extends GrantedAuthority> authorities) {
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
    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
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


@JsonIgnore
    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
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

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
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
}