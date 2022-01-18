import { DB } from "../database/FavoriteDb"

export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES"
export const GET_TOP_RATED = "GET_TOP_RATED"
export const GET_DETAILS = "GET_DETAILS"
export const GET_TRAILERS = "GET_TRAILERS"
export const GET_ID = "GET_ID"
export const SAVE_MOVIE_TO_DB = "SAVE_MOVIE_TO_DB"
export const GET_MOVIE_FROM_DB = "GET_MOVIE_FROM_DB"


const BASE_URL = "https://api.themoviedb.org/3/movie/"
const GET_POPULAR_MOVIES_API = "popular?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US"
const GET_DETAILS_API = "?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US"

export const getPopularMovies = (currentPage) =>{
    try {
        return async dispatch => {
            const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US&page=${currentPage}`)
            const response = await result.json()
            if (response) {
                dispatch({
                    type: GET_POPULAR_MOVIES,
                    payload: response.results
                })
            } else {
                console.log("Unable to fetch movies")
            }
        }
    } catch (error) {
        console.log(error)
        console.log("error")
    }
}

export const getTopMovies = () => {
  try {
    return async dispatch => {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US&page=1');
      const json = await response.json();
      if (json) {
        dispatch({
          type: GET_TOP_RATED,
          payload: json.results
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const getMovieDetail = (movieId) => {
  try {
    return async dispatch => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${JSON.stringify(movieId)}?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US`);
      const json = await response.json();
      if (json) {
        dispatch({
          type: GET_DETAILS,
          payload: json
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTrailers = (id) => {
  try {
    return async dispatch => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US`);
      const json = await response.json();
      if (json) {
        dispatch({
          type: GET_TRAILERS,
          payload: json.results
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const handleSaveToDb = (movieTitle, movieImage, movieDate, movieId) => {
    try {
      return async dispatch => {
        await DB.transaction((tx) =>{
            tx.executeSql(
              'INSERT INTO Movies (Title, Image, Date, Id) VALUES (?,?,?,?)',
              [movieTitle, movieImage, movieDate, movieId],
              (tx, result) =>{
                console.log("Result" + result.rowsAffected)
                if (result.rowsAffected > 0) {
                    dispatch({
                        type: SAVE_MOVIE_TO_DB,
                        payload: result.rows
                    })
                }else{
                    console.log("DB SAVE ENTERED FROM ACTION FAILED")
                }
              },
              error => console.log(error)
            )
          })
      }
    } catch (error) {
      console.log(error)
      console.log(error, "DB SAVE ENTERED FROM ACTION ERROR")
    }
  }

  export const getData = () => {
    try {
      return async dispatch => {
        await DB.transaction((tx) =>{
            tx.executeSql(
              "SELECT * FROM Movies",
              [],
              (tx, res) => {
                var len = res.rows.length
                if (res && len > 0) {
                    dispatch({
                        type: GET_MOVIE_FROM_DB,
                        payload: res.rows
                    })
                }else{
                    console.log("DB DATA FETCH FAILED")
                }
              }
            )
          })
      }
    } catch (error) {
      console.log(error, "DB DATA ERROR")
    }
  }