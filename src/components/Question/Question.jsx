import React from "react"
import {useDispatch} from "react-redux"
import {
    calculatePercentage,
    resetScores,
    setExtraversy,
    setFeeling,
    setIntroversy,
    setIntuition,
    setIsFinished,
    setJudging,
    setPerception,
    setSensing,
    setThinking
} from "../../redux/actions/questionAction"
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button, Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    radio: {
        '&$checked': {
            color: '#FFD400'
        }
    },
    checked: {},
    formLabel: {
        color: '#313A4A',
        fontWeight: 'bold'
    }
})

const Question = ({currentQuestions, currentPage, pagesCount}) => {

    const classes = useStyles()

    const dispatch = useDispatch()

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

    const handleClick = () => {
        dispatch(resetScores())
        getScores()
        dispatch(calculatePercentage())
        dispatch(setIsFinished(true))
    }

    return (
        <div>
            {
                currentQuestions.map((question, index) => {
                    return (
                        <Box mb="1rem"
                             key={index}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.formLabel}
                                           component="legend">{question.title}</FormLabel>
                                <RadioGroup aria-label={question.title} className="radio-group">
                                    {
                                        question.answers.map((answer, index) => {
                                            return (
                                                <FormControlLabel value={answer.type}
                                                                  control={<Radio classes={{
                                                                      root: classes.radio,
                                                                      checked: classes.checked
                                                                  }} required={true}/>}
                                                                  label={answer.title}
                                                                  key={index}/>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    )
                })
            }
            {
                currentPage === pagesCount &&
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                    <Button variant="outlined"
                            color="primary"
                            onClick={handleClick}>Результат</Button>
                </Grid>
            }
        </div>
    )
}

export default Question