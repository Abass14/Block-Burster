import { DB } from './FavoriteDb'

export const createTable = () =>{
    DB.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            +"Movies "
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title: TEXT, Image: TEXT, Date: TEXT, Id: INTEGER);"
        )
    })
}