package com.example.javaspringboot.dto;

import com.example.javaspringboot.model.Likes;
import com.example.javaspringboot.model.Questions;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

public class ImageDTO {
    private int image_id;
    private byte[] image_url;
    private int like_count;
    @JsonIgnore
    private List<Likes> likes;

    public ImageDTO() {
    }

    public int getImage_id() {
        return image_id;
    }

    public void setImage_id(int image_id) {
        this.image_id = image_id;
    }

    public byte[] getImage_url() {
        return image_url;
    }

    public void setImage_url(byte[] image_url) {
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

    private Questions questions;
}
