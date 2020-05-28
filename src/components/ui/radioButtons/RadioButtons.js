import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'



const RadioButtons = ({setStateFilter,stateValues}) => {
    const classes = useStyles();

    const handleChange = e => setStateFilter({...stateValues,[e.target.name]:e.target.value})

    const handleReset = () => setStateFilter({...stateValues,filter:''})

    return (
        <FormControl component="fieldset" fullWidth={true}>
          <RadioGroup aria-label="gender" name="filter" value={stateValues.filter} onChange={handleChange} className={classes.adjust}>
            <FormControlLabel value="horror" control={<Radio />} label="Horror" labelPlacement="top"/>
            <FormControlLabel value="romance" control={<Radio />} label="Romance" labelPlacement="top"/>
            <FormControlLabel value="comedy" control={<Radio />} label="Comedy" labelPlacement="top"/>
            <Button size="small" onClick={handleReset}>Reset</Button>
          </RadioGroup>
        </FormControl>
    )
}

const useStyles = makeStyles({
    adjust:{
        flexDirection:"row"
    }
  })

export default RadioButtons;