package com.example.javaspringboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Entity
public class Questions {

    @Id
    @GeneratedValue
    private int id;
    @Null(message = "text is null")
    private String text;
    @Null(message = "deadline is null")
    private String deadline;
    private int winner_image_id;
    @Null(message = "category is null")
    private String category;
    @JsonIgnore
    @OneToMany(mappedBy = "questions", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Images> images;
    @JsonIgnore
    @OneToMany(mappedBy = "questions", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments;
    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users users;

    public Questions(int id, int user_id, String text,String deadline, int winner_image_id) {
        this.id = id;
        this.text = text;
        this.deadline = deadline;
        this.winner_image_id = winner_image_id;
    }
    public Questions() {
    }

    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public int getWinner_image_id() {
        return winner_image_id;
    }

    public void setWinner_image_id(int winner_image_id) {
        this.winner_image_id = winner_image_id;
    }

    public List<Images> getImages() {
        return images;
    }

    public void setImages(List<Images> images) {
        this.images = images;
    }


    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}


