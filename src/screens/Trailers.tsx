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
import { useDispatch, useSelector } from 'react-redux';
import { MovieCard } from '../component/major/MovieCard';
import { Videos } from '../component/major/Video';
import { AppName } from '../component/mini/AppName';
import ProgressIndicator from '../component/mini/ProgressIndicator';
import { getTrailers } from '../redux/action';

export const Trailers = ( { route }) =>{
  const { id } = route.params

  const {loading, movieTrailers} = useSelector(state => state.movieReducer)
  const dispatch = useDispatch()

  const handleDelete = () =>{

  }

  useEffect(() => {
    dispatch(getTrailers(id))
  }, []);

  if (loading) {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ProgressIndicator />
      </View>
    )
  }else{
    return(
      <View style={{flex: 1, backgroundColor: 'purple'}}>
        <View style={{padding: 10, marginHorizontal: 10, marginTop: 30, borderWidth: 1, borderColor: 'red', borderRadius: 5, backgroundColor: 'black'}}>
          <AppName />
        </View>
        <View>
          <Text style={styles.header}>Movie Trailers</Text>
        </View>
        <View style={styles.cardStyle}>
        <FlatList 
          style={{width: '100%'}}
          keyExtractor={(item: any, index: number)=>index.toString()}
          data={movieTrailers}
          renderItem={theVideo =>(
            <View style={{margin: 10, flex: 1}}>
                <Videos video={theVideo.item.key} />
                <Text style={{color: 'white', alignSelf: 'flex-end'}}>{theVideo.item.name}</Text>
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
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
    },
})