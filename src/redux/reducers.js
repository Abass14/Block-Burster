import { GET_MOVIE_FROM_DB, GET_POPULAR_MOVIES, SAVE_MOVIE_TO_DB } from "./action";


const initialState = {
    loading: true,
    popularMovies: []
}

const dbInitialState = {
    result: []
}

const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POPULAR_MOVIES:
            return {...state, loading: false, popularMovies: action.payload};
        default:
            return state
    }
}

export const dbReducer = (state = dbInitialState, action) => {
    switch(action.type) {
        case SAVE_MOVIE_TO_DB:
            return {
                ...state,
                result: action.payload
            }
        case GET_MOVIE_FROM_DB:
            const prevState = state.result
            return {
                ...state,
                result: action.payload
            }
        default:
            return state
    }
}

export default movieReducer;