import React, { Component } from 'react'
import '../styles/Quiz.css'
import '../styles/Settings.css'
import Question from './components/Question'
import Settings from './components/Settings'
import EndMessage from './components/EndMessage'

export default class Quiz extends Component {

    constructor(){
        super()

        this.state = {
            questions: [],
            questionListIsLoaded: false,
            index: 0,
            score: 0
        }

        this.nextQuestion = this.nextQuestion.bind(this)
    }

    nextQuestion(isCorrect){
        this.setState(
            {
                index: this.state.index+1,
                score: this.state.score + isCorrect
            }
        )
    }

    getQuestionList(questions){
        this.setState({
            questions: questions,
            questionListIsLoaded: true
        }, () => {
            console.log(this.state.questions)
        })
    }

    render() {

        return this.state.questionListIsLoaded ? (
            (this.state.index < this.state.questions.length) ? (
                <Question question={this.state.questions[this.state.index]} index={this.state.index+1} amountOfQuestions={this.state.questions.length} nextQuestionCallback={this.nextQuestion}/>
            ) : <EndMessage score={this.state.score} numberOfQuestions={this.state.questions.length}/>       
        ) : <Settings onLoad={questions => this.getQuestionList(questions)}/>

    }
}
