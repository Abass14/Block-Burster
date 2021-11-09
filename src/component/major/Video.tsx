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
import Youtube from 'react-native-youtube'
import Video from 'react-native-video'
import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import YoutubeIframe from 'react-native-youtube-iframe';

type VideoUrl ={
  video: string,
}
export const Videos = (props: VideoUrl) => {
    return (
       <View style={styles.view}>
           <YoutubeIframe volume={100} videoId={props.video} height={300} />
       </View>
    )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: 'black',
    overflow: 'hidden'
  }
})