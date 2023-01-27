import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Photos, UserAlbums} from '../screens/photos';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="UserAlbums" component={UserAlbums} />
    </Stack.Navigator>
  );
};

export default AppStack;
