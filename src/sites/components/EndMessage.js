import React from 'react'

export default function EndMessage({score, numberOfQuestions}) {
  return (
    <div className="question-box">
        <h1>Your Score: {score}/{numberOfQuestions}</h1>
        <button className='check-btn' onClick={() => window.location.reload()}>Restart</button>
    </div>
  )
}
