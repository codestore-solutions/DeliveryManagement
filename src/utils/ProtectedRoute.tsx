import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {LoginScreen} from '../screens';
import {useAppSelector} from '../store/hooks';
import {AuthStateInterface, userSelector} from '../store/features/authSlice';
interface Props {
  component: React.ComponentType<any>;
  name: any;
  RootStack:any;
  options?: any;
}
const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  name,
  options,
  RootStack,
  ...rest
}) => {
  const {isAuthenticated, loading} = useAppSelector(
    userSelector,
  ) as AuthStateInterface;
  if (loading) {
    // Render a loading indicator while checking authentication status
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RootStack.Screen
      name={isAuthenticated ? name : 'Login'}
      {...rest}
      component={isAuthenticated ? Component : LoginScreen}
      options={isAuthenticated ? options : {headerShown: false}}
    />
  );
};

export default ProtectedRoute;
