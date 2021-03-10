import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Question from "../Question/Question"
import Result from "../Result/Result"
import {
    getCurrentPage,
    getIsFinished,
    getPageLimit,
    getQuestions,
} from "../../redux/selectors/questionSelector"
import {
    setCurrentPage,
    setExtraversy,
    setFeeling,
    setIntroversy,
    setIntuition,
    setJudging,
    setPerception,
    setSensing,
    setThinking
} from "../../redux/actions/questionAction"
import {Pagination} from "@material-ui/lab"
import {Box, Button, Grid, Typography} from "@material-ui/core"

const Test = () => {

    const [currentQuestions, setCurrentQuestions] = useState([])

    const currentPage = useSelector(getCurrentPage)
    const pageLimit = useSelector(getPageLimit)
    const questions = useSelector(getQuestions)
    const isFinished = useSelector(getIsFinished)
    const dispatch = useDispatch()

    let pagesCount = Math.ceil(questions.length / pageLimit)

    const offset = (currentPage - 1) * pageLimit
    const activeQuestions = questions.slice(offset, offset + pageLimit)

    useEffect(() => {
        const activeQuestions = questions.slice(0, pageLimit)
        setCurrentQuestions(activeQuestions)
    }, [])

    useEffect(() => {
        setCurrentQuestions(activeQuestions)
    }, [currentPage])

    const checkRadios = () => {
        const inputs = document.getElementsByTagName('input')
        let checkedRadios = 0
        let allRadios = activeQuestions.length
        Array.prototype.forEach.call(inputs, input => {
            if (input.checked) {
                checkedRadios = checkedRadios + 1
            }
        })
        return (checkedRadios === allRadios)
    }

    const getScores = () => {
        const inputs = document.getElementsByTagName('input')
        Array.prototype.forEach.call(inputs, input => {
            if (input.checked) {
                switch (input.value) {
                    case 'E':
                        dispatch(setExtraversy())
                        break
                    case 'I':
                        dispatch(setIntroversy())
                        break
                    case 'S':
                        dispatch(setSensing())
                        break
                    case 'N':
                        dispatch(setIntuition())
                        break
                    case 'T':
                        dispatch(setThinking())
                        break
                    case 'F':
                        dispatch(setFeeling())
                        break
                    case 'J':
                        dispatch(setJudging())
                        break
                    case 'P':
                        dispatch(setPerception())
                        break
                    default:
                        break
                }
            }
        })
    }

    const onPageChanged = (event) => {
        // if (checkRadios()) {
            getScores()
            dispatch(setCurrentPage(currentPage + 1))
            scrollToTop()
        // } else
        //     event.preventDefault()
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="section">
            <header className="header">
                <Box p="1rem">
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center">
                        <Grid item
                              xs={12}
                              sm={12}
                              md={6}>
                            <Pagination count={pagesCount}
                                        page={currentPage}
                                        disabled={true}
                                        variant="outlined"
                                        shape="rounded"/>
                        </Grid>
                    </Grid>
                </Box>
            </header>
            <main className="main">
                <Box p="2rem">
                    {
                        currentPage === 1 &&
                        <Box mb="1rem">
                            <Typography variant="h4" component="h4">
                                Тест MBTI
                            </Typography>
                        </Box>
                    }
                    {
                        isFinished &&
                        <Question currentQuestions={currentQuestions}
                                  currentPage={currentPage}
                                  getScores={getScores}
                                  pagesCount={pagesCount}/>
                    }
                    {
                        currentPage !== pagesCount &&
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center">
                            <Button variant="outlined"
                                    color="primary"
                                    onClick={onPageChanged}>Далее</Button>
                        </Grid>
                    }
                    {
                        !isFinished &&
                        <Result/>
                    }
                </Box>
            </main>
        </div>
    )
}

export default Test