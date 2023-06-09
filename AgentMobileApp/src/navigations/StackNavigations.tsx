import {View, Text} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {LandingScreen, LoginScreen, VerifyScreen, ProfileScreen} from '../screens';
import TabNavigation from './TabNavigation';


const RootStack = createStackNavigator<RootStackParamList>();
const StackNavigations = () => {
  return (
    <RootStack.Navigator initialRouteName="Landing">
      <RootStack.Screen
        component={LandingScreen}
        name="Landing"
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={VerifyScreen}
        name="Verify"
        options={{headerShown: true}}
      />
       <RootStack.Screen
        component={ProfileScreen}
        name="VerifyStatus"
        options={{headerShown: true}}
      />
      <RootStack.Screen
        component={TabNavigation}
        name="Home"
        options={{headerShown: false}}
      />
      
    </RootStack.Navigator>
  );
};
export default StackNavigations;
