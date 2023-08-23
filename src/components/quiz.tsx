import React, { useState } from 'react';
import useSWR from 'swr';
import Search from './search';
import Latex from 'react-latex';
import { useRecoilValue } from "recoil";
import { Subject, settingsState } from '@/store';
import { getRandomElement } from '@/app/utils';

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
  const settings = useRecoilValue(settingsState);
  const subject = getRandomElement(settings.subjects) as Subject;
  let endpoint = "";
  switch(subject){
    case(Subject.Math):
      endpoint = '/api/mathquestion'
      break;
    case(Subject.Vocabulary):
      endpoint = '/api/vocabquestion'
      break;
    default:
      endpoint = '/api/vocabquestion'
  }
  const { data, error } = useSWR(endpoint, fetcher);
  const [question, setQuestion] = useState<QuizQuestion | undefined>(undefined);
  const [answerState, setAnswerState] = useState(QuestionAnswerState.Loading);

  //Handle the error state
  if (error && answerState !== QuestionAnswerState.Error) {
    setAnswerState(QuestionAnswerState.Error);
  }
  else if (!data && ![QuestionAnswerState.Loading, QuestionAnswerState.Error].includes(answerState)) {
    setAnswerState(QuestionAnswerState.Loading);
  }
  else if (data && question === undefined) {
    setQuestion(data);
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
      <div id="question" className='flex flex-col justify-between h-full'>
        <div className='flex flex-row justify-between h-1/2 min-h-fit'>
          <div className='hero pixel h-32'></div>
          <div className='definition text-center text-2xl w-3/4 pt-6'>
            {
            question?.useLatex
            ? <Latex>{question.question}</Latex>
            : question?.question
            }
          </div>
        </div>
        <div className='options flex flex-wrap pt-4 justify-center'>
            {
            question!.options.map((val, i) => {
                return <button 
                    key={i} 
                    className='w-full sm:w-1/3 m-1 p-3 z-50 text-xl bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' 
                    value={i} 
                    onClick={onAnswerClick}>
                      {
                        question?.useLatex
                        ? <Latex>{val}</Latex>
                        : val
                      }
                    </button>
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
        return <Search answer={question!.answerDescription} useLatex={question?.useLatex!} wasCorrect={true} resetState={resetAnswerState} />;
      case(QuestionAnswerState.AnsweredIncorrectly):
        return <Search answer={question!.answerDescription} useLatex={question?.useLatex!} wasCorrect={false} resetState={resetAnswerState} />;
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