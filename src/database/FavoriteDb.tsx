import SQLite from 'react-native-sqlite-storage'

export const DB = SQLite.openDatabase(
    {
        name: 'FavoriteDb',
        location: 'default'
    },
    () => {},
    error => console.log(error)
)