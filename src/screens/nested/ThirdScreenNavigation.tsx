import React from 'react';
import {
  SafeAreaView,
  
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from '../Details';
import { TopRated } from '../TopRated';
import { Trailers } from '../Trailers';
import { FavoriteMovies } from '../FavoriteMovies';

const Stack = createStackNavigator()

export const ThirdScreenNavigator = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
                header: () => null  //To remove all default toolbars on all Screens
            }}
        >
            <Stack.Screen
                name="Favorite Movies"
                component={FavoriteMovies}
            />
            <Stack.Screen
                name="Details"
                component={Details}
            />
        </Stack.Navigator>
    )
}