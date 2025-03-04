package com.example.javaspringboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.aspectj.weaver.patterns.TypePatternQuestions;

import java.util.List;

@Entity
public class Images {
    @Id
    @GeneratedValue
    private int image_id;
    private String image_url;
    private int like_count;
    @JsonIgnore
    @OneToMany(mappedBy = "images",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Likes> likes;
    @JoinColumn(name = "question_id")
    @ManyToOne
    private Questions questions;

    public Images(int image_id, String image_url, int like_count, List<Likes> likes, Questions questions) {
        this.image_id = image_id;
        this.image_url = image_url;
        this.like_count = like_count;
        this.likes = likes;
        this.questions = questions;
    }

    public Images() {
    }

    public int getImage_id() {
        return image_id;
    }

    public void setImage_id(int image_id) {
        this.image_id = image_id;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public int getLike_count() {
        return like_count;
    }

    public void setLike_count(int like_count) {
        this.like_count = like_count;
    }

    public List<Likes> getLikes() {
        return likes;
    }

    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }

    public Questions getQuestions() {
        return questions;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }
}