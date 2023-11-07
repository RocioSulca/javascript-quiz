import {create} from 'zustand'
import {type Question} from '../types'
// se usa para que los datos persistan, se envuelve en el store
import { persist } from 'zustand/middleware'
import data from '../../public/data.json'

interface State {
    question: Question[]
    currenteQuestion:number
    //Como el método será asíncrono debe devolver una promesa
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId:number, answeIndex:number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        question: [],
        currenteQuestion: 0, // posicion del array
        fetchQuestions: async (limit: number) => {
            const res = data.games

            const question = res.sort(() => Math.random() - 0.5).slice(0, limit)
            console.log(res)
            set({question})
        },
        selectAnswer: (questionId: number, answerIdIndex: number) => {
            const {question} = get()
            //clonamos el objeto
            const newQuestion= structuredClone(question)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestion.findIndex(q=> q.id === questionId)
            // obtenemos la info de la pregunta
            const questionInfo =  newQuestion[questionIndex]
            // averiguamos si ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIdIndex
            // cambiamos la info en la copia misma 
            newQuestion[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIdIndex
            }
            // actualizamos el estado
            set({question:newQuestion})
        },

        goNextQuestion: () => {
            const {currenteQuestion, question} = get()
            const nextQuestion = currenteQuestion + 1
            
            if(nextQuestion < question.length) {
                set({currenteQuestion: nextQuestion})
            }
        },

        goPreviousQuestion: () => {
            const {currenteQuestion} = get()
            const previousQuestion = currenteQuestion - 1
            
            if(previousQuestion >= 0) {
                set({currenteQuestion: previousQuestion})
            }
        },
        reset: () => {
            set({currenteQuestion: 0, question:[]})
        }
    }
}, {
    name: 'questions'
}))