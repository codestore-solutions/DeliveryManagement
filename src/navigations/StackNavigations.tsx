import {View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProps, RootStackParamList,} from './types';
import {
  LandingScreen,
  LoginScreen,
  CreateProfileScreen,
  AboutUsScreen,
  FaqScreen,
  PolicyScreen,
  TandCScreen,
  AssignmentDetails,
} from '../screens';
import {useNavigation} from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import {TabHeader} from '../components';
import {constant} from '../constant/GenralConstant';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {AuthStateInterface, initializeAuthStateUser, userSelector} from '../store/features/authSlice';
const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigations = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NavigationProps>();
  const {isAuthenticated, loading, data} = useAppSelector(
    userSelector,
  ) as AuthStateInterface;
  console.log("A", data);
  // Initalize the state
  useEffect(() => {
    dispatch(initializeAuthStateUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('Init Value', isAuthenticated);
    if (isAuthenticated) {
      navigation.navigate('Home', {
        screen: 'Dashboard',
      });
    } else {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  if (loading && !isAuthenticated) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'#7E72FF'} />
      </View>
    );
  }
  return (
    <RootStack.Navigator>
      {/* <RootStack.Screen
        component={LandingScreen}
        name="Landing"
        options={{headerShown: false}}
      /> */}
      {!isAuthenticated ? (
        <RootStack.Screen
          component={LoginScreen}
          name="Login"
          options={{headerShown: false}}
        />
      ) : (
        <>
          <RootStack.Screen
            component={CreateProfileScreen}
            name="CreateProfile"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={constant.appTitle} />;
              },
            }}
          />
          <RootStack.Screen
            component={AboutUsScreen}
            name="About"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={'About US'} />;
              },
            }}
          />
          <RootStack.Screen
            component={TandCScreen}
            name="TandC"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={'Terms & Conditions'} />;
              },
            }}
          />
          <RootStack.Screen
            component={FaqScreen}
            name="Faq"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={'FAQ'} />;
              },
            }}
          />
          <RootStack.Screen
            component={PolicyScreen}
            name="Policy"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={'Privacy Policy'} />;
              },
            }}
          />
          <RootStack.Screen
            component={AssignmentDetails}
            name="AssignmentDetail"
            options={{
              headerShown: true,
              header() {
                return <TabHeader type={0} title={'Assignment Details'} />;
              },
            }}
          />
          <RootStack.Screen
            component={DrawerNavigation}
            name="Home"
            options={{headerShown: false}}
            initialParams={{screen: 'Dashboard'}}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
export default StackNavigations;
