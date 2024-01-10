import { Component, signal, computed } from '@angular/core';
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
  questionIndex = signal(0)
  questionMaxIndex:number

  questions: any
  questionSelected = computed(() => this.questions[this.questionIndex()])

  answers:string[] = []
  answerSelected:string= ""
  
  finished = signal(false)

  constructor () {
    this.title = quizz_questions.title
    this.questions = quizz_questions.questions
    this.questionMaxIndex = this.questions.length - 1

  }

  public buttonPress(alias:string) {
    this.answers.push(alias)
    this.nextStep()
  } 

  public nextStep() {
    this.questionIndex.update(value => value + 1)
    
    if(this.questionIndex() > this.questionMaxIndex) {
      this.finished.set(true)
      this.answerSelected = quizz_questions.results[this.checkResult(this.answers) as keyof typeof quizz_questions.results]
    }
  }

  private checkResult(answers:string[]):string {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length 
      ){
        return previous
      }else{
        return current
      }
    })

    return result
  } 
}
