import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable
} from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Title = {
    title: string,
    date: string,
    image: string,
    iconName: boolean,
    handleMovieClick?: () => void,
    handleSaveMovie: () => void
}

export const MovieCard = (props: Title) =>{
    const [icon, setIcon] = useState(true)
    //trash-alt bookmark
    return(
        <Pressable onPress={props.handleMovieClick}>
            <Card style={styles.card}>
                <View style={styles.viewImage}>
                    <Image style={{width: '100%', flex: 1, resizeMode: 'contain'}} source={{uri: props.image}} />
                </View>
                <View style={styles.viewText}>
                    <View style={{flex: 3.5, justifyContent: 'space-evenly'}}>
                        <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                        <Text style={styles.text}>{props.date}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginHorizontal: 0}}>
                        <Pressable style={styles.button}  onPress={props.handleSaveMovie}>
                            {/* <Text style={{color: 'white', textAlign: 'center'}}>Save</Text> */}
                            <FontAwesome5 size={30} color="red" name={icon === props.iconName ? 'bookmark' : 'trash-alt'}/>
                        </Pressable>
                    </View>
                </View>
            </Card>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 300,
        alignItems: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'red',
        overflow: 'hidden'
    },
    viewImage: {
        flex: 4,
        width: '100%',
        alignItems: 'stretch',
        backgroundColor: 'black'
    },
    viewText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginLeft: 10
    },
    title: {
        fontSize: 15,
        color: 'white',
        marginHorizontal: 10,
    },
    button:{
        fontSize: 12,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'flex-end',
        borderRadius: 5,
    }

})