package com.example.javaspringboot.model;

import jakarta.persistence.*;

@Entity
public class Likes {
   @Id
   @GeneratedValue
    private int like_id;
    @JoinColumn(name = "image_id")
    @ManyToOne
    private Images images;
    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users users;

    public Likes() {
    }

    public Likes(int like_id, Images images, Users users) {
        this.like_id = like_id;
        this.images = images;
        this.users = users;
    }

    public int getLike_id() {
        return like_id;
    }

    public void setLike_id(int like_id) {
        this.like_id = like_id;
    }

    public Images getImages() {
        return images;
    }

    public void setImages(Images images) {
        this.images = images;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
