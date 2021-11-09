import React from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from '../Details';
import { TopRated } from '../TopRated';

const Stack = createStackNavigator()

export const SecondScreenNavigator = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
                header: () => null  //To remove all default toolbars on all Screens
            }}
        >
            <Stack.Screen
                name="TopRated"
                component={TopRated}
            />
            <Stack.Screen
                name="Details"
                component={Details}
            />
        </Stack.Navigator>
    )
}