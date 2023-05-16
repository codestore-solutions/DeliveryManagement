import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import StackNavigations from './src/navigations/StackNavigations';

const App =() => {
  return (
    <NavigationContainer>
      <StackNavigations />
    </NavigationContainer>
  )
}

export default App;