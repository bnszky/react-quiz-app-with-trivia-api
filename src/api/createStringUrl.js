const createStringUrl = (numberOfQuestions, difficulty, category) => {
    let difficultyStr = ""
    if(difficulty != "any") difficultyStr = `&difficulty=${difficulty}`
    let categoryStr = ""
    if(category != "any") categoryStr = `&category=${category}`
    return `https://opentdb.com/api.php?amount=${numberOfQuestions}${categoryStr}${difficultyStr}&type=multiple`
}

export {createStringUrl}