import { openDatabase } from 'react-native-sqlite-storage'

export const DB = openDatabase(
    {
        name: 'FavoriteDb',
        location: 'default'
    },
    () => {console.log("db created")},
    error => console.log(error)
    
)

