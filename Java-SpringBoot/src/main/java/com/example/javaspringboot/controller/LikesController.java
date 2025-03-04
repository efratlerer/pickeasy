package com.example.javaspringboot.controller;

import com.example.javaspringboot.model.Images;
import com.example.javaspringboot.model.Likes;
import com.example.javaspringboot.model.Questions;
import com.example.javaspringboot.model.Users;
import com.example.javaspringboot.service.ImagesRepository;
import com.example.javaspringboot.service.LikesRepository;
import com.example.javaspringboot.service.QuestionsRepository;
import com.example.javaspringboot.service.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/Likes")
@CrossOrigin(origins = "http://localhost:5173")
public class LikesController {
    private LikesRepository likesRepository;
   private ImagesRepository imagesRepository;
 private UsersRepository usersRepository;

    public LikesController(LikesRepository likesRepository, ImagesRepository imagesRepository,UsersRepository usersRepository)
    {
        this.likesRepository =likesRepository;
        this.imagesRepository =imagesRepository;
        this.usersRepository =usersRepository;
    }

        @PostMapping("/AddLikes")
        public ResponseEntity<Likes> addLikes(@RequestBody Likes likes) {
            return new ResponseEntity<>(likesRepository.save(likes), HttpStatus.CREATED);

    }
    @GetMapping("/Likes")
    public ResponseEntity<List<Likes>> getLikes(){
        return new ResponseEntity<>(likesRepository.findAll(), HttpStatus.OK);
    }


    @DeleteMapping("/DeleteLikes/{id}")
    public ResponseEntity deleteLikes(@PathVariable Long id) {
        Likes likes = likesRepository.findById(id).orElse(null);
        if (likes == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        likesRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
