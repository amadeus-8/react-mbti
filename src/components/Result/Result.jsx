import React from "react"
import {Box, Button, Grid, LinearProgress, Typography} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {resetScores, setCurrentPage, setIsFinished} from "../../redux/actions/questionAction"
import {getPersonTypes, getScores} from "../../redux/selectors/questionSelector"

const Result = () => {

    const types = {
        I: 'Интроверсия',
        E: 'Экстраверсия',
        S: 'Сенсорика',
        N: 'Интуиция',
        T: 'Мышление',
        F: 'Чувства',
        J: 'Организованность',
        P: 'Гибкость',
    }

    const dispatch = useDispatch()
    const scores = useSelector(getScores)
    const personTypes = useSelector(getPersonTypes)

    const calculatePersonType = () => {
        let type = ''
        type += (scores.E >= scores.I) ? "E" : "I"
        type += (scores.S >= scores.N) ? "S" : "N"
        type += (scores.T >= scores.F) ? "T" : "F"
        type += (scores.J >= scores.P) ? "J" : "P"
        return type
    }

    const downloadURI = (type) => {
        let uri
        if (type === 'download')
            uri = personTypes[personType].download
        else
            uri = personTypes[personType].site

        const name = 'Результат теста личности.pdf'
        let link = document.createElement("a")
        link.download = name
        link.href = uri
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        link = null
    }

    const personType = calculatePersonType()

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
                        <Grid container
                              direction="row"
                              justify="center">
                            <Box mr="1rem">
                                <span>{personType}</span>
                            </Box>
                            <Box>
                                <span>{personTypes[`${personType}`].title}</span>
                            </Box>
                        </Grid>
                    </Typography>
                    <Typography align="center">
                        {personTypes[`${personType}`].description}
                    </Typography>
                </Box>
            </div>
            <div>
                <Grid container
                      direction="row"
                      alignItems="center"
                      justify="center">
                    <Box mr="1rem" mb="1rem" justifyContent="center">
                        <Button variant="outlined" onClick={() => {
                            downloadURI('download')
                        }}>Полное описание</Button>
                    </Box>
                    <Box mb="1rem" justifyContent="center">
                        <Button variant="outlined" onClick={() => {
                            downloadURI()
                        }}>Перейти на сайт</Button>
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
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <Button variant="outlined"
                        color="secondary"
                        onClick={retry}>Начать сначала</Button>
            </Grid>
        </div>
    )
}

export default Result