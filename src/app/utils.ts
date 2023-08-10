

const getRandomElement = (arr: WordData[]): WordData => {
    return arr[Math.floor((Math.random()*arr.length))];
}

export function getQuestion(words: WordData[]): VocabQuestion {
    const word = getRandomElement(words);
    let question: VocabQuestion = {
        definition: word.definition,
        type: word.type,
        options: [word.word],
        answer: 0
    };

    while (question.options.length < 4) {
        const optionWord = getRandomElement(words);
        if (question.options.includes(optionWord.word) || optionWord.type !== question.type) {
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