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
import { Videos } from '../component/major/Video';
import { AppName } from '../component/mini/AppName';

export const Trailers = ( { route }) =>{
    //https://api.themoviedb.org/3/movie/438631/videos?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US
  const [video, setVideo] = useState([]);
  const { id } = route.params

  const handleDelete = () =>{

  }

  const getTrailers = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=878ced4f74f38d8ebeccdcc96c9d94fb&language=en-US`);
      const json = await response.json();
      setVideo(json.results);
      console.log(`Results ${json.results}`)
      console.log(`${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTrailers();
  }, []);

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
            data={video}
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