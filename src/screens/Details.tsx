import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Modal
} from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { Videos } from '../component/major/Video';
import ProgressIndicator from '../component/mini/ProgressIndicator';
import { getMovieDetail } from '../redux/action';

type RootStackParamList = {
  PopularMovies: {};
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const Details = ({ navigation, route }) =>{

  const { movieId } = route.params;
  const [showVideo, setShowVideo] = useState(false)
  const handleCancel = () => {
    setShowVideo(false)
  }

  const {loading, movieDetails} = useSelector(state => state.movieReducer)
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(getMovieDetail(movieId))
  }, []);
  const screenHeight = Dimensions.get('window').height

  if (loading) {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ProgressIndicator />
      </View>
    )
  }else{
    return(
      <ScrollView style={{height: screenHeight}}>
        <View style={styles.imageView}>
          <ImageBackground style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}}>
            <Text style={styles.backgroundTxt}>{movieDetails.original_title}</Text>
            <Pressable onPress={() => {navigation.navigate("Trailers", { id: movieDetails.id})}} style={styles.playBtn}>
              <FontAwesome5 name="play" size={50} color='white' />
            </Pressable>
          </ImageBackground>
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.overview}>
            {movieDetails.overview}
          </Text>
        </View>
        <View style={styles.column}>
          <Card style={{width: 150, height: 200, margin: 15, borderRadius: 5, overflow: 'hidden'}}>
            <Image style={{width: '100%', height: 200, resizeMode: 'cover'}} source={{uri: `https://image.tmdb.org/t/p/w342${movieDetails.backdrop_path}`}} />
          </Card>
          <View style={{justifyContent: 'space-between', margin: 15}}>
            <Text style={styles.detailsTxt}>Release Date: {movieDetails.release_date}</Text>
            <Text style={styles.detailsTxt}>Status: {movieDetails.status}</Text>
            <Text style={styles.detailsTxt}>Language: {movieDetails.original_language}</Text>
            <Text style={styles.detailsTxt}>Popularity: {movieDetails.popularity}</Text>
            <Text style={styles.detailsTxt}>Rating: {movieDetails.vote_average}</Text>
            <Text style={styles.detailsTxt}>Revenue: {movieDetails.revenue}</Text>
          </View>
        </View>
        <Modal
          visible={showVideo}
          transparent
          onRequestClose={handleCancel}
        >
          <View style={styles.video}>
           <Videos video="A47y6VJNols" apiKey="878ced4f74f38d8ebeccdcc96c9d94fb"/>
           <Pressable onPress={handleCancel} style={styles.videoCancelBtn}>
            <Text style={{color:'white', fontWeight: '600'}}>CANCEL</Text>
           </Pressable>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

    imageView: {
      width: '100%',
      height: 400
    },
    image:{
      width: '100%',
      flex: 1, 
      resizeMode: 'cover'
    },
    detailsView: {
    },
    backgroundTxt: {
      color: 'white',
      fontWeight: '800',
      fontSize: 45,
      marginHorizontal: 15,
      marginTop: 20
    },
    overview:{
      color: 'black',
      fontSize: 16,
      margin: 15
    },
    column:{
      flexDirection: 'row'
    },
    playBtn:{
      width: 100,
      height:100,
      backgroundColor: 'blue',
      borderRadius: 100,
      alignSelf: 'center',
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    detailsTxt: {
      color: 'black', 
      fontWeight: '600'
    },
    video: {
      flex: 1, 
      width:"80%", 
      height: 300, 
      alignSelf:'center', 
      marginTop: 100
    },
    videoCancelBtn: {
      backgroundColor: 'red', 
      height: 40, 
      alignItems: 'center', 
      justifyContent:'center', 
      borderRadius: 10
    }
})