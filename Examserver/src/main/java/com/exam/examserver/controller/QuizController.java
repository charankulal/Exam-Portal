package com.exam.examserver.controller;

import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;


    // add quiz service
    @PostMapping("/")
    public ResponseEntity<Quiz> add(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    // update quiz service
    @PutMapping("/")
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    //get all quiz method
    @GetMapping ("/")
    public ResponseEntity<?> quizzes(){
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    // get a quiz by id
    @GetMapping("/{qid}")
    public Quiz quiz(@PathVariable("qid") Long qid)
    {
        return this.quizService.getQuiz(qid);
    }

    //delete method

    @DeleteMapping("/{qid}")
    public void delete(@PathVariable("qid") Long qid)
    {
        this.quizService.deleteQuiz(qid);
    }
}
