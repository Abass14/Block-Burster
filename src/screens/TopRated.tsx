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
import { useDispatch, useSelector } from 'react-redux';
import { getTopMovies } from '../redux/action';
import ProgressIndicator from '../component/mini/ProgressIndicator';
import colors from '../assests/colors/colors';

type RootStackParamList = {
  Details: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const TopRated = () =>{
  const navigation = useNavigation();
  const [movie, setMovie] = useState([]);
  const {loading, topMovies} = useSelector(state => state.movieReducer)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const handleSave = () => {
    Alert.alert('should save')
  }

  useEffect(() => {
    dispatch(getTopMovies())
    if (topMovies.length > 1) {
      setIsLoading(false)
    }
  }, [topMovies.length]);

  if (isLoading) {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.BLACK}}>
        <ProgressIndicator />
      </View>
    )
  }else{
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
              data={topMovies}
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