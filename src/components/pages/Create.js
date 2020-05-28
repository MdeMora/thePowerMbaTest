import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {createMovie,deleteMovie} from './../../redux'


import MovieCard from '../ui/movieCard/MovieCard'

import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';




const Create = () => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const watchlist = useSelector(state=>state.wl.watchlist)
    const history = useHistory();

    const [values, setValues] = useState({title:'',pos:0,loading:false});

    const createId = () => '_' + Math.random().toString(36).substr(2, 9)

    const handleChange = e => setValues({...values,[e.target.name]:e.target.value})

    const deleteCard = idc => { 

      setValues({...values,loading:true})

      setTimeout(() => {

        dispatch(deleteMovie(idc))
        setValues({...values,loading:false})
        
          
        }, 1000)
    
    }



    const handleSubmit = e => {

      setValues({...values,loading:true})

      setTimeout(() => {

        dispatch(createMovie({title:values.title,id:createId(),pos:values.pos}))
  
        setValues({title:'',pos:values.pos+1,loading:false})
          
        }, 1000)
        

        e.preventDefault()
    }


    return (
        <section className={classes.root}>

        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.m10}>
            <TextField id="outlined-basic" name='title' value={values.title} label="Title" variant="outlined" fullWidth={true} onChange={handleChange}/>
            <Button type='submit' >Submit</Button>
            <Button onClick={()=>history.push('/')}> Go back</Button>

        </form>

        {!values.loading?
          <Grid container spacing={2} justify="center" alignItems="stretch">
            {watchlist.map( (elm,idx) => <MovieCard key={idx} id={elm.id} deleteCard={deleteCard}/> )}
          </Grid>
          :
            <div className={classes.loaderWrapper}>
              <Loader type="Circles" color="#00BFFF" height={40} width={40} />
            </div>
          }
        

        </section>
    );
}

const useStyles = makeStyles({
    root: {
      margin:10,
    },
    m10:{
      marginBottom:10
    },
    loaderWrapper:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      height:'100%'
    }
    
  });

export default Create;