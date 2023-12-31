import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Search from './search';
import Latex from 'react-latex';
import { useRecoilValue } from "recoil";
import { Subject, settingsState } from '@/store';
import { getRandomElement } from '@/app/utils';

//fetcher function to wrap the native fetch function and return the result of a call to url in json format

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
  const fetcher = (url: string) => {
    if (![QuestionAnswerState.AnsweredCorrectly, QuestionAnswerState.AnsweredIncorrectly].includes(answerState)){
      setAnswerState(QuestionAnswerState.Loading);
    }
    return fetch(url).then((res) => res.json())
  };
  useSWR(endpoint, fetcher, {
    onSuccess: (data: QuizQuestion) => { 
      console.log(`success: ${JSON.stringify(data)}`)
      setQuestion(data);
      if (![QuestionAnswerState.AnsweredCorrectly, QuestionAnswerState.AnsweredIncorrectly].includes(answerState)){
        setAnswerState(QuestionAnswerState.Unanswered);
      }
    },
    onError: (error) => {
      console.log(`error: ${JSON.stringify(error)}`)
      setAnswerState(QuestionAnswerState.Error);

    },
    revalidateOnFocus: false,
    revalidateOnMount:true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
  });
  const [question, setQuestion] = useState<QuizQuestion | undefined>(undefined);
  const [answer, setAnswer] = useState<QuizQuestion | undefined>();
  const [answerState, setAnswerState] = useState(QuestionAnswerState.Loading);

  // //Handle the error state
  // if (error && answerState !== QuestionAnswerState.Error) {
  //   setAnswerState(QuestionAnswerState.Error);
  // }
  // else if (!data && ![QuestionAnswerState.Loading, QuestionAnswerState.Error].includes(answerState)) {
  //   setAnswerState(QuestionAnswerState.Loading);
  // }
  // else if (data && question === undefined && ![QuestionAnswerState.AnsweredCorrectly, QuestionAnswerState.AnsweredIncorrectly].includes(answerState)) {
  //   setQuestion(data);
  //   setAnswerState(QuestionAnswerState.Unanswered);
  // }

  const onAnswerClick = (e: React.FormEvent<HTMLButtonElement>) => {
      setAnswer(question);
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
    mutate(endpoint);
  }

  const renderLoading = () => {
    return (
        <div className='h-80 flex flex-row justify-center'>
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
        <div className={`options ${question!.options.length % 2 === 0 ? 'grid gap-2 md:gap-4 p-2 grid-cols-2' :'flex flex-wrap'} pt-4 justify-center`}>
            {
            question!.options.map((val, i) => {
                return <button 
                    key={i} 
                    className={`w-full ${question!.options.length % 2 === 0 ? 'w-1/2' : 'sm:w-1/3 m-1'} p-3 z-50 text-xl bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`} 
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
        return <Search answer={answer!.answerDescription} useLatex={answer?.useLatex!} wasCorrect={true} resetState={resetAnswerState} />;
      case(QuestionAnswerState.AnsweredIncorrectly):
        return <Search answer={answer!.answerDescription} useLatex={answer?.useLatex!} wasCorrect={false} resetState={resetAnswerState} />;
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