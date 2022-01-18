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
  Alert,
  ToastAndroid
} from 'react-native';
import { MovieCard } from '../component/major/MovieCard';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppName } from '../component/mini/AppName';
import {useNavigation} from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { getPopularMovies, handleSaveToDb } from '../redux/action';
import { DB } from '../database/FavoriteDb'
import { createTable } from '../database/Tables'
import ProgressIndicator from '../component/mini/ProgressIndicator';

type RootStackParamList = {
  Details: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const PopularMovies = () => {

  const {loading, popularMovies} = useSelector(state => state.movieReducer)
  const {result} = useSelector(state => state.dbReducer)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1)

  const loadMore = () => {
    setCurrentPage(currentPage + 1)
}

  useEffect(() => {
    createTable();
    dispatch(getPopularMovies(currentPage));
  }, [currentPage]);

  const handleSave = (movieTitle: string, movieImage: string, movieDate: string, movieId: number) => {
    console.log(`DB SAVE clicked FROM UI`)
     dispatch(handleSaveToDb(movieTitle, movieImage, movieDate, movieId))
     if (result) {
      ToastAndroid.showWithGravity(`${movieTitle} saved successfully`, ToastAndroid.SHORT, ToastAndroid.CENTER)
     }else{
      ToastAndroid.showWithGravity(`${movieTitle} failed`, ToastAndroid.SHORT, ToastAndroid.CENTER)
     }
  }

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ProgressIndicator />
      </View>
    )
  }else{
    return (
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
              data={popularMovies}
              numColumns={2}
              renderItem={theMovie =>(
                <View style={{margin: 10, flex: 1}}>
                  <MovieCard 
                    title={theMovie.item.title}
                    date={theMovie.item.release_date} 
                    image={`https://image.tmdb.org/t/p/w342${theMovie.item.poster_path}`}
                    handleMovieClick={() => navigation.navigate('Details', {movieId: theMovie.item.id})}
                    handleSaveMovie={async () => handleSave(theMovie.item.title, theMovie.item.poster_path, theMovie.item.release_date, theMovie.item.id)}
                    iconName={true}
                  />
                </View>
                )
              }
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
            />
          </View>
          
        </View>
      </View>
    )
  }
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