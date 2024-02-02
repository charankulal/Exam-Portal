package com.exam.examserver.controller;



import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    //add Question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // update the question

    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get questions of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid)
    {
        Quiz quiz=new Quiz();
        quiz.setQid(qid);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }


}
