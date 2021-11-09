import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList
} from 'react-native';
import { MovieCard } from '../component/major/MovieCard';
import { AppName } from '../component/mini/AppName';

export const FavoriteMovies = () =>{

  const [movie, setMovie] = useState([]);

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
                  date={theMovie.item.release_date} 
                image={`https://image.tmdb.org/t/p/w342${theMovie.item.poster_path}`}
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