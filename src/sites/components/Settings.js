import React, { Component } from 'react'
import {createStringUrl} from '../../api/createStringUrl'
import {getQuestions} from '../../api/getQuestions'
import {CATEGORIES} from '../../enums/Categories'

export default class Settings extends Component {

  constructor(props){
    super(props)

    this.state = {
      numberOfQuestions: 10,
      difficulty: "any",
      category: "any"
    }
  }

  changeNumberOfQuestions(evt){
    this.setState({
      numberOfQuestions: evt.target.value
    })
  }

  changeDifficulty(evt){
    this.setState({
      difficulty: evt.target.value
    })
  }

  changeCategory(evt){
    this.setState({
      category: evt.target.value
    })
  }

  async fetchQuestions(){
    try{
      let url = createStringUrl(this.state.numberOfQuestions, this.state.difficulty, this.state.category)
      let questions = await getQuestions(url)
      if(questions.length == 0) throw `Question list is empty! Could't fetch data from database!`
      this.props.onLoad(questions)
    }
    catch(err){
      alert("ERROR: " + err)
    }
  }

  render() {

    const CapitalizeFirstLetterOfWord = str => {
      let words = str.toLowerCase().split('_')
      return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ")
    }

    let categories = (
      <select name="category" id="category" onChange={evt => this.changeCategory(evt)}>
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <option key={key} value={value}>
            {CapitalizeFirstLetterOfWord(key)}
          </option>
        ))}
      </select>
    )

    return (
      <form className="setting-box">
        <h2>Question Settings</h2>
        <label for="number-of-questions">Number of Questions: {this.state.numberOfQuestions}</label><br/>
        <input type="range" min="1" max="50" name="number-of-questions" value={this.state.numberOfQuestions} id="number-of-questions" onChange={evt => this.changeNumberOfQuestions(evt)}></input>

        <label for="difficulty">Difficulty</label>
        <select name="difficulty" id="difficulty" onChange={evt => this.changeDifficulty(evt)}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label for="category">Category</label>
        {categories}

        <button type="button" class="submit-btn" onClick={() => this.fetchQuestions()}>Start Quiz</button>
      </form>
    )
  }
}
