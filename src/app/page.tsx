'use client'
import React, { useState } from 'react';

export enum AnswerState {
  None,
  AnsweredCorrectly,
  AnsweredIncorrectly
}

export default function Home() {
  const [question, setQuestion] = useState({
    definition: "something stomething",
    partOfSpeech: "verb",
    options: ["word1", "word2", "word3", "word4"],
    answer: 0
  });
  const [answerState, setAnswerState] = useState(AnswerState.None);

  const onAnswerClick = (e: React.FormEvent<HTMLButtonElement>) => {
      if (Number(e.currentTarget.value) === question.answer) {
        setAnswerState(AnswerState.AnsweredCorrectly);
      }
      else {
        setAnswerState(AnswerState.AnsweredIncorrectly);
      }
  }

  const resetAnswerState = () => {
    setAnswerState(AnswerState.None);
  }

  const renderQuestion = () => {
    return (
      <div className='flex flex-col'>
      <div className='flex-row'>{question.definition} ({question.partOfSpeech})</div>
      <div className='options grid p-2 grid-cols-2'>
        {
          question.options.map((val, i) => {
            return <button key={i} className='py-1' value={i} onClick={onAnswerClick}>{val}</button>
          })
        }
      </div>
    </div>
    );
  }

  const renderBody = () => {
    switch(answerState) {
      case(AnswerState.None):
        return renderQuestion();
      case(AnswerState.AnsweredCorrectly):
        return <div>Hooray! You did it! <a onClick={resetAnswerState}>Try again?</a></div>
      case(AnswerState.AnsweredIncorrectly):
        return <div>Sorry :( better luck next time <a onClick={resetAnswerState}>Try again?</a></div>
      default:
        return <div>Something went wrong</div>
    }
  }

  return (
    <main className="flex flex-col min-h-screen p-24">
      <h1 className='text-3xl font-bold underline'>Tanukichan's Super Special New Tab App</h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono p-5 text-sm lg:flex">
        {renderBody()}
      </div>
    </main>
  )
}
