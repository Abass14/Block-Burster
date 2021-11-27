import { DB } from './FavoriteDb'

export const createTable = () => {
    DB.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Movies (Title TEXT, Image TEXT, Date TEXT, Id INTEGER);",
            [],
            () =>{console.log("old table created")},
            error => console.log("error" + error)
        )
        // console.log("table created")
    })
}