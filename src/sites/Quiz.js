import React, { Component } from 'react'
import '../styles/Quiz.css'
import {getQuestions} from '../api/getQuestions'
import Question from './components/Question'

export default class Quiz extends Component {

    numberOfQuestions = 10

    constructor(){
        super()

        this.state = {
            questions: [],
            loading: true,
            index: 0,
            score: 0
        }

        this.executeApiCommand()
        this.nextQuestion = this.nextQuestion.bind(this)
    }

    async executeApiCommand(){
        this.setState({
            questions: await getQuestions(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}&type=multiple`),
            loading: false
        })
    }

    nextQuestion(isCorrect){
        this.setState(
            {
                index: this.state.index+1,
                score: this.state.score + isCorrect
            }
        )
    }

    render() {
        if(this.state.index >= this.numberOfQuestions) 
        return <div className="question-box">
            <h1>Your Score: {this.state.score}/{this.numberOfQuestions}</h1>
            <button className='check-btn' onClick={() => window.location.reload()}>Restart</button>
        </div>
        else return (
            (this.state.loading == false) && <Question question={this.state.questions[this.state.index]} index={this.state.index+1} amountOfQuestions={this.numberOfQuestions} nextQuestionCallback={this.nextQuestion}/>
        )
    }
}
