import React,{useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {deleteMovie} from './../../redux'



import MovieCard from '../ui/movieCard/MovieCard'
import RadioButtons from '../ui/radioButtons/RadioButtons'
import { useHistory,  useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Loader from 'react-loader-spinner'





const useQuery = () => new URLSearchParams(useLocation().search);


const Home = (props) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const watchlist = useSelector(state=>state.wl.watchlist)
    const history = useHistory();

    let query = useQuery();
    

    const [values, setValues] = useState({title:'',filter:'',loading:false});

    const handleChange = e => setValues({...values,[e.target.name]:e.target.value})

    const deleteCard = idc => { 

      setValues({...values,loading:true})
      
      setTimeout(() => {
        
        dispatch(deleteMovie(idc))
        setValues({...values,loading:false})
        
          
        }, 1000)
    
    }

    return (
       <section className={classes.root}>

        
        <TextField id="outlined" name='title' value={values.title} label="Filter by title" variant="outlined" fullWidth={true} onChange={handleChange}/>

        <Button onClick={()=>history.push('/create')}> Create a Movie</Button>
      
        <RadioButtons setStateFilter={setValues} stateValues={values}/>


        {!values.loading?
          !query.get("genre")?
            <Grid container spacing={2} justify="center" alignItems="stretch">

            
              {
                (values.title===''&&values.filter==='')? watchlist.map( (elm,idx) => <MovieCard title={elm.title} key={idx} id={elm.id} deleteCard={deleteCard}/>)
                :
                watchlist.filter( elm => values.title!==''? elm.title.toLowerCase().includes(values.title.toLowerCase()):elm ) // Filtra por nombre, si no hay busqueda no filtra 
                .filter( elm => values.filter!==''?elm.tags.find((tag)=>tag===values.filter):elm) // Filtra por generos, si no hay generos no filtra
                .map( (elm,idx) => <MovieCard key={idx} id={elm.id} deleteCard={deleteCard}/>) // mapea las Movie card
                
              
              }
              
            </Grid>
          :
            <Grid container spacing={2} justify="center" alignItems="stretch">
              {watchlist.filter( elm => elm.tags.find((tag)=>tag===query.get("genre"))).map( (elm,idx) => <MovieCard key={idx} id={elm.id} deleteCard={deleteCard}/>)}
            </Grid>
            
        :
          <div className={classes.loaderWrapper}>
            <Loader type="Circles" color="#00BFFF" height={40} width={40} />
          </div>
        }
        
       </section> 
    )

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

export default Home