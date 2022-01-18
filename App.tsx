/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FavoriteMovies } from './src/screens/FavoriteMovies';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {FirstScreenNavigator} from './src/screens/nested/FirstScreenNavigator'
import { SecondScreenNavigator } from './src/screens/nested/SecondScreenNavigator';
import { ThirdScreenNavigator } from './src/screens/nested/ThirdScreenNavigation';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';



const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator(); 


const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) =>({
            tabBarIcon: ({focused, color}) => {
              let icomName: string;
              if(route.name === 'Popular Movies'){
                icomName = 'home';
                color = focused? 'red' : 'white';
              }else if(route.name === 'Top Movies'){
                icomName = 'video';
                color = focused? 'red' : 'white';
              }else{
                icomName = 'bookmark'
                color = focused? 'red' : 'white';
              }
              return(
                <FontAwesome5
                  name={icomName}
                  color={color}
                  size={20}
                />
              )
            }
          })}
          barStyle={{backgroundColor: 'black', borderWidth: 1, borderTopColor: 'red'}}
          activeColor='red'
          inactiveColor='white'
        >
          <Tab.Screen 
            name="Popular Movies"
            component={FirstScreenNavigator}
          />
          <Tab.Screen 
            name="Top Movies"
            component={SecondScreenNavigator}
          />
          <Tab.Screen 
            name="Third Movies"
            component={ThirdScreenNavigator}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
