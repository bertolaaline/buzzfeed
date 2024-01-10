import { Component } from '@angular/core';
import quizz_questions from './../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title:string
  questionIndex:number
  questionMaxIndex:number

  questions: any
  questionSelected: any 

  answers:string[] = []
  answerSelected:string= ""
  
  finished:boolean

  constructor () {
    this.title = quizz_questions.title
    this.questions = quizz_questions.questions
    this.questionIndex = 0
    this.questionSelected = this.questions[this.questionIndex]
    this.questionMaxIndex = this.questions.length -1
    this.finished = false

  }

  public buttonPress(alias:string) {
    this.answers.push(alias)
  } 

  async nextStep() {
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex) {
        this.questionSelected = this.questions[this.questionMaxIndex]
    }else {
      this.finished = true
    }
  }
}
