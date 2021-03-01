import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Question from "../Question/Question"
import Result from "../Result/Result"
import {
    getCurrentPage,
    getIsFinished,
    getPageLimit,
    getQuestions,
} from "../../redux/selectors/questionSelector"
import {setCurrentPage, setUncheckedRadios} from "../../redux/actions/questionAction"
import {Pagination} from "@material-ui/lab"
import {Box, Grid, Typography} from "@material-ui/core"

const Test = () => {

    const [currentQuestions, setCurrentQuestions] = useState([])

    const currentPage = useSelector(getCurrentPage)
    const pageLimit = useSelector(getPageLimit)
    const questions = useSelector(getQuestions)
    const isFinished = useSelector(getIsFinished)
    const dispatch = useDispatch()

    let pagesCount = Math.ceil( questions.length / pageLimit)

    const offset = (currentPage - 1) * pageLimit
    const activeQuestions = questions.slice(offset, offset + pageLimit)

    useEffect(() => {
        const activeQuestions = questions.slice(0, pageLimit)
        setCurrentQuestions(activeQuestions)
    },[])

    useEffect(() => {
        setCurrentQuestions(activeQuestions)
    }, [currentPage])

    const checkRadios = () => {
        const radioGrops = document.getElementsByClassName('radio-group')
        // const inputs = document.getElementsByTagName('input')
        Array.prototype.forEach.call(radioGrops, group => {
            console.log(group)

            // if(!input.checked) {
            //     dispatch(setUncheckedRadios())
            // }
        })
    }

    const onPageChanged = (event, value) => {
        checkRadios()
        dispatch(setCurrentPage(value))
        scrollToTop()
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
                                        disabled={isFinished}
                                        onChange={onPageChanged}
                                        variant="outlined"
                                        shape="rounded" />
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
                        !isFinished &&
                        <Question currentQuestions={currentQuestions}
                                  currentPage={currentPage}
                                  pagesCount={pagesCount} />
                    }
                    {
                        isFinished &&
                        <Result />
                    }
                </Box>
            </main>
        </div>
    )
}

export default Test