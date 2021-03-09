import React from "react"
import {useDispatch} from "react-redux"
import {
    calculatePercentage,
    setIsFinished,
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

const Question = ({currentQuestions, currentPage, pagesCount, getScores}) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const handleClick = () => {
        // dispatch(resetScores())
        getScores()
        dispatch(calculatePercentage())
        dispatch(setIsFinished(true))
    }

    return (
        <div>
            {
                currentQuestions.map(question => {
                    return (
                        <Box mb="1rem"
                             key={question.id}>
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