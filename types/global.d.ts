// types/global.d.ts

export {}

declare global {
    interface WordData {
        word: string,
        type: string,
        definition: string
    }
    interface VocabQuestion {
        definition: string,
        type: string,
        options: string[],
        answer: number
    }
    interface MathQuestion {
        answer: string,
        choices: { [key: string]: string },
        question: string,
        diagramRef: string
    }
    interface QuizQuestion {
        answer: number,
        answerDescription: string,
        question: string,
        options: string[],
        useLatex: boolean
    }
}