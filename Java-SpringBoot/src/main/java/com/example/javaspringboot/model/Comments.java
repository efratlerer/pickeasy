package com.example.javaspringboot.model;

import jakarta.persistence.*;

@Entity
public class Comments {
    @Id
    @GeneratedValue
    private int id;
    private String comment;
    @JoinColumn(name = "question_id")
    @ManyToOne
    private Questions questions;
    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users users;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Questions getQuestions() {
        return questions;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Comments() {
    }

    public Comments(int id, String comment, Questions questions, Users users) {
        this.id = id;
        this.comment = comment;
        this.questions = questions;
        this.users = users;
    }


}
