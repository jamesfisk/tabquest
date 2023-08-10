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
}