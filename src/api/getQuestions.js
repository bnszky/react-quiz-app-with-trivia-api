import axios from 'axios'

const fetchQuestions = async (apiURL) => {
    try{
        const response = await axios.get(apiURL)
        return response.data.results
    }
    catch (err) {
        console.log(err)
    }
}

const parseToHTML = str => {
    const txt = document.createElement("textarea")
    txt.innerHTML = str;
    return txt.value;
}

const createListOfAnswers = question => {
    let answers = []
    answers.push(parseToHTML(question.correct_answer))
    let incorrect_answers = question.incorrect_answers.map(answer => parseToHTML(answer))
    answers.push(...incorrect_answers)
    return answers 
}

const changeQuestionFormat = (question, index) => {
    return {
        id: index,
        category: question.category,
        difficulty: question.difficulty,
        text: parseToHTML(question.question),
        correct: parseToHTML(question.correct_answer),
        answers: createListOfAnswers(question),
    }
}

const shuffleAnswers = answers => {
    answers = answers.sort((a, b) => Math.random()-0.5)
    console.log(answers)
    return answers
}

const getQuestions = async (apiURL) => {
    try{
        let questions = await fetchQuestions(apiURL)
        questions = questions.map((question, index) => changeQuestionFormat(question, index))
        questions.forEach(question => {
            question.answers = shuffleAnswers(question.answers)
        })
        return questions
    }
    catch(err){
        console.log(err)
    }
}

export {getQuestions}