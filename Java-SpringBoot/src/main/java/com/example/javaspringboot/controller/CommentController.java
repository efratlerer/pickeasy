package com.example.javaspringboot.controller;

import com.example.javaspringboot.model.Comments;
import com.example.javaspringboot.service.CommentsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Comments")
@CrossOrigin
public class CommentController {
    private CommentsRepository commentsRepository;
    public CommentController(CommentsRepository commentsRepository) {

        this.commentsRepository = commentsRepository;
    }

    @GetMapping("/Comments")
    public ResponseEntity<List<Comments>> getComments(){
        return new ResponseEntity<>(commentsRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/AddComments")
    public ResponseEntity<Comments> addComments(@RequestBody Comments comments) {
        return new ResponseEntity<>(commentsRepository.save(comments), HttpStatus.CREATED);

    }

    @DeleteMapping("/DeleteComments/{id}")
    public ResponseEntity deleteComments(@PathVariable Long id) {
        Comments comments = commentsRepository.findById(id).orElse(null);
        if (comments == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        commentsRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
