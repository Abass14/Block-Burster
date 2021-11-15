import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert
} from 'react-native';
import { MovieCard } from '../component/major/MovieCard';
import { AppName } from '../component/mini/AppName';
import SQLite from 'react-native-sqlite-storage';
import { DB } from '../database/FavoriteDb'

// const db = SQLite.openDatabase(
//   {
//     name: 'SavedDB',
//     location:'default'
//   },
//   () => {},
//   error=>{console.log(error)} 
// );
type MovieType= {
  title: string,
  image: string,
  id: number
}
export const FavoriteMovies = () =>{
  const [tit, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);
  const [movie, setMovie] = useState([]);

  const getData = () => {
    try {
      DB.transaction((tx) =>{
        tx.executeSql(
          "SELECT * FROM Movies",
          [],
          (tx, res) => {
            var len = res.rows.length
            let results = []
            if(len > 0){
              for (let i = 0; i < len; i++) {
                results = res.rows.item(i)
              }
              setMovie(results)
            }
          }
        )
        console.log({movie})
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    getData();
  }, [])

  const handleDelete = () =>{

  }

    return(
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={{padding: 10, marginHorizontal: 10, marginTop: 30, borderWidth: 1, borderColor: 'red', borderRadius: 5}}>
            <AppName />
          </View>
          <View>
            <Text style={styles.header}>Favorite Movies</Text>
          </View>
          <View style={styles.cardStyle}>
          <FlatList 
            style={{width: '100%', marginBottom: 310}}
            keyExtractor={(item: any, index: number)=>index.toString()}
            data={movie}
            renderItem={theMovie =>(
              <View style={{margin: 10, flex: 1}}>
                <MovieCard 
                  title={theMovie.item.title}
                  date={theMovie.item.date} 
                  image={`https://image.tmdb.org/t/p/w342${theMovie.item.image}`}
                  handleSaveMovie={handleDelete}
                  iconName={false}
                />
              </View>
              )
            }
          />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
      color: 'white',
      fontSize: 20
    },
    header:{
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 20,
      color: 'white',
      marginTop: 30
    },
    cardStyle:{
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
    },
})