import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const Tag = ({tag}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {tag}
        </div>
    )
}

const useStyles = makeStyles({
    root:{
        fontSize:'0.75rem',
        textAlign:'center',
        padding:8,
        margin:2,
        border:'1px solid black',
        backgroundColor:'#EFEEF1'
    }
  })

export default Tag;