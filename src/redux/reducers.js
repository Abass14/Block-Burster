import { GET_DETAILS, GET_MOVIE_FROM_DB, GET_POPULAR_MOVIES, GET_TOP_RATED, GET_TRAILERS, SAVE_MOVIE_TO_DB } from "./action";


const initialState = {
    loading: true,
    popularMovies: [],
    topMovies: [],
    movieDetails: {},
    movieTrailers: []
}

const dbInitialState = {
    loading: true,
    result: []
}

const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POPULAR_MOVIES:
            return {
                ...state, 
                loading: false, 
                popularMovies: [...state.popularMovies, ...action.payload],
            };
        case GET_TOP_RATED:
            return {
                ...state,
                loading: false,
                topMovies: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                loading: false,
                movieDetails: action.payload
            };
        case GET_TRAILERS:
            return {
                ...state,
                loading: false,
                movieTrailers: action.payload
            }
        default:
            return state
    }
}

export const dbReducer = (state = dbInitialState, action) => {
    switch(action.type) {
        case SAVE_MOVIE_TO_DB:
            return {
                ...state,
                loading: false,
                result: action.payload
            }
        case GET_MOVIE_FROM_DB:
            return {
                ...state,
                loading: false,
                result: action.payload
            }
        default:
            return state
    }
}

export default movieReducer;