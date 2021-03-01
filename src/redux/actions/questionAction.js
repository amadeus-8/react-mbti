import * as actionType from "../actionTypes/actionType"

export const setCurrentPage = (currentPage) => {
    return {
        type: actionType.SET_CURRENT_PAGE,
        currentPage,
    }
}

export const resetScores = () => {
    return {
        type: actionType.RESET_SCORES
    }
}

export const setExtraversy = () => {
    return {
        type: actionType.SET_EXTROVERSY_VALUE
    }
}

export const setIntroversy = () => {
    return {
        type: actionType.SET_INTROVERSY_VALUE
    }
}

export const setSensing = () => {
    return {
        type: actionType.SET_SENSING_VALUE
    }
}

export const setIntuition = () => {
    return {
        type: actionType.SET_INTUITION_VALUE
    }
}

export const setThinking = () => {
    return {
        type: actionType.SET_THINKING_VALUE
    }
}

export const setFeeling = () => {
    return {
        type: actionType.SET_FEELING_VALUE
    }
}

export const setJudging = () => {
    return {
        type: actionType.SET_JUDGING_VALUE
    }
}

export const setPerception = () => {
    return {
        type: actionType.SET_PERCEPTION_VALUE
    }
}

export const calculatePercentage = () => {
    return {
        type: actionType.CALCULATE_PERCENTAGE
    }
}

export const setIsFinished = (value) => {
    return {
        type: actionType.SET_IS_FINISHED,
        value
    }
}

export const setUncheckedRadios = (radio) => {
    return {
        type: actionType.SET_UNCHECKED_RADIOS,
        radio
    }
}