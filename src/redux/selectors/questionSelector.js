import {createSelector} from "reselect"

export const getQuestions = (state) => {
    return state.questions.questions
}

export const getCurrentPage = (state) => {
    return state.questions.currentPage
}

export const getPageLimit = (state) => {
    return state.questions.pageLimit
}

export const getIsFinished = (state) => {
    return state.questions.isFinished
}

export const getScores = (state) => {
    return {
        E: state.questions.E,
        I: state.questions.I,
        S: state.questions.S,
        N: state.questions.N,
        T: state.questions.T,
        F: state.questions.F,
        J: state.questions.J,
        P: state.questions.P,
    }
}