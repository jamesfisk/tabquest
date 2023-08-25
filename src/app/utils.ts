import { Settings, settingsState } from "@/store";
import { Lato, VT323 } from "next/font/google";
import { RecoilState, useRecoilValue } from "recoil";


export function getRandomElement(arr: any[]): any {
    return arr[Math.floor((Math.random()*arr.length))];
}

export function getMathQuestion(questions: MathQuestion[]): QuizQuestion {
    let question = getRandomElement(questions) as MathQuestion;
    while (question.choices === undefined || question.diagramRef !== undefined) {
        question = getRandomElement(questions);
    }
    let formattedQuestion = {
        question: question.question,
        answer: 0,
        answerDescription: "",
        options: [] as string[],
        useLatex: true
    };
    const choices = Object.keys(question.choices);
    choices.forEach((choice, i) => {
        formattedQuestion.options.push(question.choices[choice]);
        if (choice === question.answer) {
            formattedQuestion.answer = i;
            formattedQuestion.answerDescription = `${question.question}\n${question.choices[choice]}`
        }
    });
    return formattedQuestion;
}

export function getVocabQuestion(words: WordData[]): QuizQuestion {
    const word = getRandomElement(words) as WordData;
    let question: QuizQuestion = {
        question: `${word.definition} (${word.type})`,
        options: [word.word],
        answer: 0,
        answerDescription: `${word.word} (${word.type}):\n${word.definition}`,
        useLatex: false
    };

    while (question.options.length < 4) {
        const optionWord = getRandomElement(words);
        if (question.options.includes(optionWord.word) || optionWord.type !== word.type) {
            continue;
        }
        const shouldPrepend = Math.random() > 0.5;
        if (shouldPrepend) {
            question.options.unshift(optionWord.word);
            question.answer += 1
        }
        else {
            question.options.push(optionWord.word);
        }
    }
    return question;
}

const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
});
const lato = Lato({
    weight: '400',
    subsets: ['latin']
});
  
export function getFont(settings: Settings) {
    return settings.usePixelFont
        ? vt323.className
        : lato.className;
}