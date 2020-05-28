import React, {useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {addTag,checkMovie,unCheckMovie,editMovie} from './../../../redux'

import Tag from './../tag/Tag'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox'


const MovieCard = ({id,deleteCard}) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const movie = useSelector(state=>state.wl.watchlist.find(elm => elm.id === id))
    const [values, setValues] = useState({tag:'',isEditing:false,title:movie.title});

    const handleChange = e => setValues({...values,[e.target.name]:e.target.value})

    const handleTag = e => {

      let duplicate=false

      movie.tags.forEach(elm => elm===values.tag.toLowerCase()?duplicate=true:duplicate=false)

      !duplicate&&dispatch(addTag({tag:values.tag.toLowerCase(),id:movie.id}))

      setValues({...values,tag:''})

      e.preventDefault();
  }

    const handleEdit = (e) => {
      dispatch(editMovie({title:values.title,id:movie.id}))
      setValues({...values,isEditing:false})
      e.preventDefault();

    }

  const handleCheckbox = () => !movie.checked?dispatch(checkMovie({id:movie.id})):dispatch(unCheckMovie({id:movie.id}))
  
      

    return (
        <Grid item lg={3}>
            <Card className={classes.root} variant="outlined" raised={true} style={{backgroundColor:movie.checked?'gray':'white'}}>

                <CardContent>

                    {values.isEditing?
                      <form noValidate autoComplete="off" onSubmit={handleEdit} >

                        <TextField name='title' value={values.title} label="Title" variant="outlined" onChange={handleChange}/>

                      </form>
                    
                    :

                    <Typography variant="h5" component="h2">
                        {movie.title}
                     </Typography>
                    }

                    <div className={classes.tagWrapper}>

                      {movie&&movie.tags.map( (elm,idx) => <Tag tag={elm} key={idx}/> )}

                    </div>
                
                </CardContent>

                <CardActions>
                
                    <form noValidate autoComplete="off" onSubmit={handleTag}>
                        <TextField id="outlined-basic" name='tag' value={values.tag} label="Genre" variant="outlined" onChange={handleChange}/>
                        <input type="submit" style={{display:'none'}}/>
                    </form>

                    <Button size="small" onClick={()=>setValues({...values,isEditing:true})}>Edit</Button>
                    <Button size="small" onClick={()=>deleteCard(movie.id)}>Delete</Button>
                    <Checkbox
                      color="primary"
                      checked={movie.checked}
                      onChange={handleCheckbox}
                    />

                    </CardActions>

            </Card>
        </Grid>
        

      );
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: '1.5rem',
    },
    pos: {
      marginBottom: 12,
    },
    tagWrapper:{
        display:'flex',
        flexWrap:'wrap'
    }
  });

export default MovieCard

