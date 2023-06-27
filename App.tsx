import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import StackNavigations from './src/navigations/StackNavigations';
import Toast from 'react-native-toast-message';
const App =() => {
  return (
    <NavigationContainer>
      <StackNavigations  />
      <Toast />
    </NavigationContainer>
  )
}

export default App;