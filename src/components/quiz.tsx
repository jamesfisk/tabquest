'use client'
import React, { useState } from 'react';
import useSWR from 'swr';
import { getQuestion } from '../app/utils';
import Search from './search';


//fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export enum QuestionAnswerState {
  Loading,
  Unanswered,
  AnsweredCorrectly,
  AnsweredIncorrectly,
  Error
}

export default function Quiz() {
  const { data, error } = useSWR('/api/staticdata', fetcher);
  const [question, setQuestion] = useState<VocabQuestion | undefined>(undefined);
  const [answerState, setAnswerState] = useState(QuestionAnswerState.Loading);

  //Handle the error state
  if (error && answerState !== QuestionAnswerState.Error) {
    setAnswerState(QuestionAnswerState.Error);
  }
  else if (!data && ![QuestionAnswerState.Loading, QuestionAnswerState.Error].includes(answerState)) {
    setAnswerState(QuestionAnswerState.Loading);
  }
  else if (data && question === undefined) {
    const parsed = JSON.parse(data) as WordData[];
    const question = getQuestion(parsed);
    setQuestion(question);
    setAnswerState(QuestionAnswerState.Unanswered);
  }

  const onAnswerClick = (e: React.FormEvent<HTMLButtonElement>) => {
      if (Number(e.currentTarget.value) === question!.answer) {
        setAnswerState(QuestionAnswerState.AnsweredCorrectly);
      }
      else {
        setAnswerState(QuestionAnswerState.AnsweredIncorrectly);
      }
  }

  const resetAnswerState = () => {
    setAnswerState(QuestionAnswerState.Loading);
    setQuestion(undefined);
  }

  const renderLoading = () => {
    return (
        <div className='h-full flex flex-row justify-center'>
            <div className='hero-loading pixel h-full'></div>
      </div>
    );
  }

  const renderError = () => {
    return (
      <div>
        Sorry, there&apos;s been an error.
      </div>
    );
  }

  const renderQuestion = () => {
    return (
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-row justify-between h-1/2'>
          <div className='hero pixel h-full'></div>
          <div className='definition text-center text-2xl w-3/4 pt-6'>
            {question!.definition} ({question!.type})
          </div>
        </div>
        <div className='options grid gap-2 md:gap-4 p-2 grid-cols-2'>
            {
            question!.options.map((val, i) => {
                return <button 
                    key={i} 
                    className='p-3 z-50 text-xl bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' 
                    value={i} 
                    onClick={onAnswerClick}>{val}</button>
            })
            }
        </div>
      </div>
    );
  }

  const renderBody = () => {
    switch(answerState) {
      case(QuestionAnswerState.Unanswered):
        return renderQuestion();
      case(QuestionAnswerState.AnsweredCorrectly):
        return <Search word={question!} wasCorrect={true} resetState={resetAnswerState} />;
      case(QuestionAnswerState.AnsweredIncorrectly):
        return <Search word={question!} wasCorrect={false} resetState={resetAnswerState} />;
      case(QuestionAnswerState.Loading):
        return renderLoading();
      case(QuestionAnswerState.Error):
        return renderError();
      default:
        return <div>Something went wrong</div>
    }
  }

  return renderBody();
}