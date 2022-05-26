import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  questionList: any = [];
  nb_question: number=0;
  public currentQuestion: number = 0;
  points: number = 0;
  points_history: any = [];
  counter = "Illimité";
  isQuizCompleted=false;
  progress:number=0;

  constructor(private questionService: QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe(res => {
      this.questionList = res.questions;
      this.nb_question=res.questions.length;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    this.progress+=100/this.nb_question;
  }

  previousQuestion() {
    this.currentQuestion--;
    this.progress-=100/this.nb_question;
    this.points-=this.points_history[this.points_history.length-1]
    this.points_history.pop()
  }

  answer(option: any) {
    console.log(option);
    this.points += option.points;
    this.points_history.push(option.points);
    if (this.currentQuestion+1!=this.nb_question){
      this.nextQuestion();
    } else {
      this.isQuizCompleted=true;
    }
  }

  resetQuiz() {
    this.getAllQuestions();
    this.points=0;
    this.points_history=[];
    this.progress=0;
    this.currentQuestion=0;
  }
}
