import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import AppStack from './MainStack';

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Routes;
