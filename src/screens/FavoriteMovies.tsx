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
import { DB } from '../database/FavoriteDb'
import {useNavigation} from '@react-navigation/native'


export const FavoriteMovies = () =>{
  const [movie, setMovie] = useState([]);

  const navigation = useNavigation();

  const getData = () => {
    try {
      DB.transaction((tx) =>{
        tx.executeSql(
          "SELECT * FROM Movies",
          [],
          (tx, res) => {
            console.log(`The res: ${res.rows.length}`)
            var len = res.rows.length
            let results = []
            if(len > 0){
              for (let i = 0; i < len; i++) {
                results.push(res.rows.item(i))
              }
              setMovie(results)
            }
            console.log(`result: ${results}`)
          }
        )
        console.log(movie)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    getData();
  })

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
            style={{width: '100%'}}
            keyExtractor={(item: any, index: number)=>index.toString()}
            data={movie}
            renderItem={theMovie =>(
              <View style={{margin: 10, flex: 1}}>
                <MovieCard 
                  title={theMovie.item.Title}
                  date={theMovie.item.Date} 
                  image={`https://image.tmdb.org/t/p/w342${theMovie.item.Image}`}
                  handleSaveMovie={handleDelete}
                  handleMovieClick={() => {
                    navigation.navigate("Details", {movieId: theMovie.item.Id})
                  }}
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
      marginBottom: 150
    },
})