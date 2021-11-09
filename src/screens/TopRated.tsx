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
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppName } from '../component/mini/AppName';
import {useNavigation} from '@react-navigation/native'

type RootStackParamList = {
  Details: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const TopRated = () =>{
  const navigation = useNavigation();
  const [movie, setMovie] = useState([]);
  const handleClick = () => {
    // Alert.alert('should navigate')
    navigation.navigate('Details')
  }
  const handleSave = () => {
    Alert.alert('should save')
  }

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US&page=1');
      const json = await response.json();
        setMovie(json.results);
      console.log(movie)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

    return(
      <View style={styles.view}>
          <View style={{padding: 10, marginHorizontal: 10, marginTop: 30, borderWidth: 1, borderColor: 'red', borderRadius: 5}}>
            <AppName />
          </View>
          <View style={styles.textView}>
            <Text style={styles.header}>Top Rated Movies</Text>
          </View>
          <View style={styles.cardStyle}>
            <FlatList 
              style={{width: '100%', marginBottom: 160}}
              keyExtractor={(item: any, index: number)=>index.toString()}
              data={movie}
              numColumns={2}
              renderItem={theMovie =>(
                <View style={{margin: 10, flex: 1}}>
                  <MovieCard 
                    title={theMovie.item.title}
                    date={theMovie.item.release_date} 
                  image={`https://image.tmdb.org/t/p/w342${theMovie.item.poster_path}`}
                    handleMovieClick={() =>  navigation.navigate('Details', {movieId: theMovie.item.id})}
                    handleSaveMovie={handleSave}
                    iconName={true}
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
    view: {
      flex: 1,
      backgroundColor: 'black',
    },
    textView:{
      marginTop: 30
    },
    header:{
      fontSize: 20,
      fontWeight: '600',
      marginLeft: 20,
      color: 'white'
    },
    cardStyle:{
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20
    },
})