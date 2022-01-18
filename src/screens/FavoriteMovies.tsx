import React, {useState, useEffect, useRef, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../redux/action';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  FlatList,
  Alert,
  ToastAndroid
} from 'react-native';
import { MovieCard } from '../component/major/MovieCard';
import { AppName } from '../component/mini/AppName';
import { DB } from '../database/FavoriteDb'
import {useNavigation} from '@react-navigation/native'


export const FavoriteMovies = () =>{
  const [movie, setMovie] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const {result} = useSelector(state => state.dbReducer)
  console.log(result, "RESULT FROM DB SAVE")
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getData())
  }, [])

  useEffect(() => {
      dispatch(getData())
      let res = []
      var len = result.length
      for (let i = 0; i < len; i++) {
        res.push(result.item(i))
      }
      setMovie(res)
  }, [result.length])

  const handleClk = () =>{
    setRefresh(prevState => !prevState)
    console.log(`${refresh}`)
    ToastAndroid.showWithGravity("clicked", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
  }
  const handleDelete = () =>{

  }

    return(
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <Pressable onPress={handleClk} style={{padding: 10, marginHorizontal: 10, marginTop: 30, borderWidth: 1, borderColor: 'red', borderRadius: 5}}>
            <AppName />
          </Pressable>
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