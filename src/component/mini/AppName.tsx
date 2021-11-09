import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export const AppName = () =>{
    return (
        <Text style={styles.view}>Block-Burster</Text>
    )
}

const styles = StyleSheet.create({
    view:{
        width: '100%',
        fontSize: 40,
        color: 'white'
    }
})