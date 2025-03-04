package com.example.javaspringboot.controller;


import com.example.javaspringboot.model.Questions;
import com.example.javaspringboot.service.MapStruct;
import com.example.javaspringboot.service.QuestionsRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/Questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionsController {

    private QuestionsRepository questionsRepository;
    private MapStruct mapper;
    private static String DIRECTORY_URL=System.getProperty("user.dir")+"\\image\\";

    public QuestionsController(QuestionsRepository questionsRepository, MapStruct mapper) {
        this.questionsRepository =questionsRepository;
        this.mapper = mapper;
    }

    @GetMapping("/Questions")
    public ResponseEntity<List<Questions>> getQuestions(){
        return new ResponseEntity<>(questionsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/Questionsbyid/{id}")
    public ResponseEntity<Questions>getQuestionsById( @PathVariable Long id){
        Questions questions =questionsRepository.findById(id).orElse(null);
        if(questions == null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/AddQuestions")
    public ResponseEntity<Questions> addQuestions(@Valid @RequestBody Questions questions) {
        return new ResponseEntity<>(questionsRepository.save(questions), HttpStatus.CREATED);
    }



    @PutMapping("/UpdateQuestions/{id}")
    public ResponseEntity<Questions> updateQuestion(@Valid @RequestBody Questions questions, @PathVariable Long id) {
        Questions question1 = questionsRepository.findById(id).orElse(null);
        if (question1 == null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if (questions.getId() != id)
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        question1.setWinner_image_id(questions.getWinner_image_id());
        question1.setDeadline(questions.getDeadline());
        questionsRepository.save(question1);
        return new ResponseEntity<>(question1, HttpStatus.CREATED);
    }

    @DeleteMapping("/DeleteQuestions/{id}")
    public ResponseEntity deleteQuestions(@PathVariable Long id) {
        Questions questions = questionsRepository.findById(id).orElse(null);
        if (questions == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        questionsRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

