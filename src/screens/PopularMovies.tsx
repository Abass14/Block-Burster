import { stringLiteral } from '@babel/types';
import React, {useState, useEffect} from 'react';
// import { useNavigation } from '@react-navigation/core';
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
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppName } from '../component/mini/AppName';
import {useNavigation} from '@react-navigation/native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

// type AuthStackParamList ={
//   Details: undefined
// }



type RootStackParamList = {
  Details: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;


export const PopularMovies = () => {
  const navigation = useNavigation();
  const [movie, setMovie] = useState([]);
 
  const handleSave = () => {
    Alert.alert('should save')
  }

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US');
      const json = await response.json();
      setMovie(json.results);
      console.log(json.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

    return(
      <View style={{backgroundColor: 'black', flex: 1}}>
        <View>
          <View style={{padding: 10, marginHorizontal: 10, marginTop: 30, borderWidth: 1, borderColor: 'red', borderRadius: 5}}>
            <AppName />
          </View>
          <View>
            <Text style={styles.header}>Popular Movies</Text>
          </View>
          
          <View style={styles.cardStyle}>
            <FlatList 
              style={{width: '100%', marginBottom: 310}}
              keyExtractor={(item: any, index: number)=>index.toString()}
              data={movie}
              numColumns={2}
              renderItem={theMovie =>(
                <View style={{margin: 10, flex: 1}}>
                  <MovieCard 
                    title={theMovie.item.title}
                    date={theMovie.item.release_date} 
                  image={`https://image.tmdb.org/t/p/w342${theMovie.item.poster_path}`}
                    handleMovieClick={() => navigation.navigate('Details', {movieId: theMovie.item.id})}
                    handleSaveMovie={handleSave}
                    iconName={true}
                  />
                </View>
                )
              }
            />
          </View>
          
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    cardStyle:{
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
    },
    header:{
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 20,
      color: 'white',
      marginTop: 30
    }
})