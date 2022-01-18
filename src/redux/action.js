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

export const getPopularMovies = () =>{
    console.log("response")
    try {
        return async dispatch => {
            console.log("succ")
            const result = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US')
            const response = await result.json()
            console.log("yay")
            if (response) {
                dispatch({
                    type: GET_POPULAR_MOVIES,
                    payload: response.results
                })
                console.log("success " + result)
            } else {
                console.log("Unable to fetch movies")
            }
        }
    } catch (error) {
        console.log(error)
        console.log("error")
    }
}

export const handleSaveToDb = (movieTitle, movieImage, movieDate, movieId) => {
  console.log("DB SAVE ENTERED FROM ACTION")
    try {
      return async dispatch => {
        console.log("DB SAVE ENTERED FROM ACTION DISPATCH")
        await DB.transaction((tx) =>{
          console.log("DB SAVE ENTERED FROM ACTION TRANSACTION")
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
                    console.log(`DB RESULT ==== ${result.rows.length}`)
                    console.log(result.rows, "DB SAVE ENTERED FROM ACTION SUCCESSFUL")
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
    console.log("DB GETDATA FROM ACTION ENTERED")
    try {
      console.log("DB GETDATA FROM ACTION TRY ENTERED")
      return async dispatch => {
        console.log("DB GETDATA FROM ACTION DISPATCH ENTERED")
        await DB.transaction((tx) =>{
          console.log("DB GETDATA FROM ACTION TRANSACTION ENTERED")
            tx.executeSql(
              "SELECT * FROM Movies",
              [],
              (tx, res) => {
                console.log(`The res: ${res.rows.length}`)
                var len = res.rows.length
                if (res && len > 0) {
                    dispatch({
                        type: GET_MOVIE_FROM_DB,
                        payload: res.rows
                    })
                    console.log(res.rows.item, "DB DATA FETCH SUCCESS")
                }else{
                    console.log("DB DATA FETCH FAILED")
                }
              }
            )
            console.log("yayayayaay5")
            console.log("movie: ")
          })
      }
    } catch (error) {
      console.log(error, "DB DATA ERROR")
    }
  }