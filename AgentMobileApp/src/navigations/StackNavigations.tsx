import {View, Text} from 'react-native';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {LandingScreen, SignupScreen, LoginScreen, VerifyScreen, AddUpdateProfile} from '../screens';


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
        component={SignupScreen}
        name="Signup"
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
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={AddUpdateProfile}
        name="AddupdateProfile"
        options={{headerShown: false}}
      />
      
    </RootStack.Navigator>
  );
};
export default StackNavigations;
