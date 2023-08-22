import React, { use, useState } from 'react';
import Image from 'next/image';

const GOOGLE_SEARCH_URL_BASE = "https://www.google.com/search?q="

export interface SearchProps {
    resetState: () => void,
    word: VocabQuestion,
    wasCorrect: boolean
}

export default function Search(props: SearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    };

    const doSearch = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery.length > 0) {
            const encodedQuery = encodeURIComponent(trimmedQuery);
            window.location.href = `${GOOGLE_SEARCH_URL_BASE}${encodedQuery}`;
        }
    }

    const gotItRight = () => {
        return (
            <div>
                <div className='w-full flex flex-row justify-center text-3xl font-semibold'>
                    <div className='pl-1'>You got it!</div>
                    <Image src={"/potion.png"} height={36} width={36} alt={'Potion'} className='pixel'/>
                </div>
                <div className='flex flex-row justify-between h-full'>
                    <div className='hero-slash pixel'></div>
                    <div className='text-lg w-1/2 pt-6'>
                        <b className='text-2xl'>{props.word.options[props.word.answer]} ({props.word.type}): </b>{props.word.definition}
                    </div>
                </div>
            </div>
        );
    }

    const gotItWrong = () => {
        return (
            <div>
                <div className='text-center  text-3xl font-semibold'>Not quite!</div>
                <div className='flex flex-row justify-between h-full'>
                    <div className='hero-death pixel'></div>
                    <div className='text-lg w-1/2 pt-6'>
                        <b className='text-2xl'>{props.word.options[props.word.answer]} ({props.word.type}): </b>{props.word.definition}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            { props.wasCorrect ? gotItRight() : gotItWrong() }
            <div className={`pb-6 md:pb-0`}>
                <form onSubmit={doSearch} className={`flex flex-row w-full `}>
                    <input type="text" placeholder="Be on with your quest..." value={searchQuery} onChange={onTextChange} alt='Google Search'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                        </input>
                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>
                <div 
                    className='text-red-800 dark:text-red-400 w-full text-center text-sm cursor-pointer pt-2'
                    onClick={props.resetState}>
                        Or try another word...?
                </div>
            </div>
        </div>
    )
}