import {CREATE_MOVIE,ADD_TAG,DELETE_MOVIE,CHECK_MOVIE,UNCHECK_MOVIE,EDIT_MOVIE} from './wlTypes'


export const createMovie = theMovie => {
    return{
        type:CREATE_MOVIE,
        payload:theMovie
    }
}

export const addTag = theTag => {
    return{
        type:ADD_TAG,
        payload:theTag
    }
}

export const deleteMovie = id => {
    return{
        type:DELETE_MOVIE,
        payload:id
    }
}

export const checkMovie = id => {
    return{
        type:CHECK_MOVIE,
        payload:id,
    }
}

export const unCheckMovie = id => {
    return{
        type:UNCHECK_MOVIE,
        payload:id,
        
    }
}

export const editMovie = info => {
    return{
        type:EDIT_MOVIE,
        payload:info
    }
}
