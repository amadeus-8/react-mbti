import * as actionType from "../actionTypes/actionType"
import data from "../../data/data.json"

let initialState = {
    questions: data.questions,
    currentPage: 1,
    pageLimit: 10,
    isFinished: false,
    uncheckedRadios: [],
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
}

const questionReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case actionType.RESET_SCORES:
            return {
                ...state,
                E: 0,
                I: 0,
                S: 0,
                N: 0,
                T: 0,
                F: 0,
                J: 0,
                P: 0,
            }
        case actionType.SET_EXTROVERSY_VALUE:
            return {
                ...state,
                E: state.E + 1
            }
        case actionType.SET_INTROVERSY_VALUE:
            return {
                ...state,
                I: state.I + 1
            }
        case actionType.SET_SENSING_VALUE:
            return {
                ...state,
                S: state.S + 1
            }
        case actionType.SET_INTUITION_VALUE:
            return {
                ...state,
                N: state.N + 1
            }
        case actionType.SET_THINKING_VALUE:
            return {
                ...state,
                T: state.T + 1
            }
        case actionType.SET_FEELING_VALUE:
            return {
                ...state,
                F: state.F + 1
            }
        case actionType.SET_JUDGING_VALUE:
            return {
                ...state,
                J: state.J + 1
            }
        case actionType.SET_PERCEPTION_VALUE:
            return {
                ...state,
                P: state.P + 1
            }
        case actionType.CALCULATE_PERCENTAGE:
            return {
                ...state,
                E: Math.floor(state.E / 10 * 100),
                I: Math.floor(state.I / 10 * 100),
                S: Math.floor(state.S / 20 * 100),
                N: Math.floor(state.N / 20 * 100),
                T: Math.floor(state.T / 20 * 100),
                F: Math.floor(state.F / 20 * 100),
                J: Math.floor(state.J / 20 * 100),
                P: Math.floor(state.P / 20 * 100)
            }
        case actionType.SET_IS_FINISHED:
            return {
                ...state,
                isFinished: action.value
            }
        case actionType.SET_UNCHECKED_RADIOS:
            return {
                ...state,
                uncheckedRadios: [...state.uncheckedRadios, action.radio]
            }
        default:
            return state
    }
}

export default questionReducer