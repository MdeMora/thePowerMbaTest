import {CREATE_MOVIE,ADD_TAG,DELETE_MOVIE,CHECK_MOVIE,UNCHECK_MOVIE,EDIT_MOVIE} from './wlTypes'


const initialState = {
    watchlist:[ {title:'Im at redux initial state',tags:['romance','to test the query:','?genre=romance'],checked:false,id:'_00000',pos:99} ]
}

const wlReducer = (state=initialState,action) => {
    switch(action.type) {
        case CREATE_MOVIE:

            const newState = {...state}
            newState.watchlist.push({title:action.payload.title,tags:[],checked:false,id:action.payload.id,pos:action.payload.pos})

            return {...newState}
        case ADD_TAG:

            const newState2={...state}
            newState2.watchlist.find(elm => elm.id===action.payload.id).tags.push(action.payload.tag)

            return {...newState2}

        case DELETE_MOVIE:

            const newState3={...state}
            console.log(newState3.watchlist.filter( elm => elm.id !== action.payload))
            return {...newState3,watchlist:[].concat(newState3.watchlist.filter( elm => elm.id !== action.payload))}

        case CHECK_MOVIE:

            const newState4={...state}
            newState4.watchlist.find(elm => elm.id===action.payload.id).checked=true
            
            
            return {...newState4,watchlist:[].concat(newState4.watchlist.sort((x,y)=> (x.checked === y.checked)? 0 : x.checked? 1 : -1))}

        case UNCHECK_MOVIE:

            const newState5={...state}
            newState5.watchlist.find(elm => elm.id===action.payload.id).checked=false
            

            return {...newState5,watchlist:[].concat(newState5.watchlist.sort( (a,b) => a.checked?1: a.pos-b.pos ))}

        case EDIT_MOVIE:
            const newState6={...state}
            newState6.watchlist.find(elm => elm.id===action.payload.id).title=action.payload.title

            return{...newState6}

        default:
            return state
    }
}

export default wlReducer



