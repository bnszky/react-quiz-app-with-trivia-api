import React, { Component } from 'react'

export default class Question extends Component {

    constructor(){
        super()

        this.state = {
            selectedAnswer: -1,
            answerClasses: ['', '', '', ''],
            isChecked: false,
            isCorrect: false
        }
    }

    restart(){
        this.setState({
            selectedAnswer: -1,
            answerClasses: ['', '', '', ''],
            isChecked: false,
            isCorrect: false
        })
    }

    selectAnswer(index){
        let currentAnswerClasses = ['', '', '', '']
        currentAnswerClasses[index] = 'selected'
        this.setState({
            selectedAnswer: index,
            answerClasses: currentAnswerClasses
        })
    }

    checkAnswer(answers){
        let currentAnswerClasses = ['', '', '', '']
        currentAnswerClasses.forEach((elem, id, arr) => arr[id] = "blocked")
        currentAnswerClasses[this.state.selectedAnswer] = 'incorrect'

        console.log(currentAnswerClasses)

        for(let i = 0; i < answers.length; i++) {
            if(answers[i] == this.props.question.correct){
                if(currentAnswerClasses[i] == 'incorrect') {
                    this.setState({
                        isCorrect: true
                    })
                }
                currentAnswerClasses[i] = 'correct'
            }
        }

        this.setState({
            answerClasses: currentAnswerClasses,
            isChecked: true
        })
    }

    nextQuestion(){
        this.props.nextQuestionCallback(this.state.isCorrect)
        this.restart()
    }

    render() {
        const {question, index, amountOfQuestions} = this.props
        const {isChecked, answerClasses, selectedAnswer} = this.state
        return (
            <div>
                <div className='progress-bar'>
                <div className='progress' style={{'width': `${index/amountOfQuestions*100}%`}}>
                <span className='progress-text'>Question {index}/{amountOfQuestions}</span>
                </div>
                </div>
                <div className='question-box'>
                <div className='question'>{index}. {question.text}</div>
                <div className='answers-box'>
                <button className={`answer-btn ${answerClasses[0]}`} onClick={() => !isChecked && this.selectAnswer(0)}>A. {question.answers[0]}</button>
                <button className={`answer-btn ${answerClasses[1]}`} onClick={() => !isChecked && this.selectAnswer(1)}>B. {question.answers[1]}</button>
                <button className={`answer-btn ${answerClasses[2]}`} onClick={() => !isChecked && this.selectAnswer(2)}>C. {question.answers[2]}</button>
                <button className={`answer-btn ${answerClasses[3]}`} onClick={() => !isChecked && this.selectAnswer(3)}>D. {question.answers[3]}</button>
                </div>
                <button className='check-btn' onClick={() => isChecked ? this.nextQuestion() : (selectedAnswer != -1 && this.checkAnswer(question.answers))}>
                    {isChecked ? 'Next' : 'Check'}
                </button>
            </div>
            </div>
        )
    }
}
