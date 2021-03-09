import React, {useEffect, useState} from "react"
import {Box, Button, Grid, LinearProgress, Typography} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {resetScores, setCurrentPage, setIsFinished} from "../../redux/actions/questionAction"
import {getScores} from "../../redux/selectors/questionSelector"
import personTypesData from "../../data/personTypes.json"

const Result = () => {

    const types = {
        E: 'Интроверсия',
        I: 'Экстраверсия',
        S: 'Сенсорика',
        N: 'Интуиция',
        T: 'Мышление',
        F: 'Чувства',
        J: 'Организованность',
        P: 'Гибкость',
    }

    const [personType, setPersonType] = useState('')
    const dispatch = useDispatch()
    const scores = useSelector(getScores)

    const calculatePersonType = () => {
        let type = ''
        type += (scores.E >= scores.I) ? "E" : "I";
        type += (scores.S >= scores.N) ? "S" : "N";
        type += (scores.T >= scores.F) ? "T" : "F";
        type += (scores.J >= scores.P) ? "J" : "P";
        return type
    }

    useEffect(() => {
        const personType = calculatePersonType()
        setPersonType(personType)
    }, [])

    const retry = () => {
        dispatch(resetScores())
        dispatch(setIsFinished(false))
        dispatch(setCurrentPage(1))
    }

    return (
        <div>
            <div>
                <Box mb="1rem">
                    <Typography variant="h4"
                                component="h4"
                                align="center">
                        <span>{personType}</span>
                        {/*<span>{personTypes[`${personType}`]}</span>*/}
                    </Typography>
                </Box>
            </div>
            <div>
                <Grid container
                      direction="row"
                      justify="center">
                    <Box mr="1rem">
                        <Button variant="outlined">Полное описание</Button>
                    </Box>
                    <Box>
                        <Button variant="outlined">Перейти на сайт</Button>
                    </Box>
                </Grid>
            </div>
            <div>
                {
                    Object.keys(scores).map((key, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <span>{types[key]}</span>
                                </div>
                                <Box mb="1rem"
                                     display="flex"
                                     alignItems="center">
                                    <Box width="100%"
                                         mr={1}>
                                        <LinearProgress variant="determinate"
                                                        value={scores[key]}/>
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography variant="body2"
                                                    color="textSecondary">{`${Math.round(scores[key])}%`}</Typography>
                                    </Box>
                                </Box>
                            </div>
                        )
                    })
                }
            </div>
            <Button variant="outlined"
                    color="secondary"
                    onClick={retry}>Начать сначала</Button>
        </div>
    )
}

export default Result