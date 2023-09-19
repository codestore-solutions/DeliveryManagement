import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationProps, RootStackParamList} from './types';
import {
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
import {
  AuthStateInterface,
  getAgentProfileStatus,
  initializeAuthStateUser,
  userSelector,
} from '../store/features/authSlice';
import UserService from '../services/UserService';
import {ApiConstant} from '../constant/ApiConstant';
const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigations = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<boolean>(false);
  const [statusLoader, setStatusLoader] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProps>();
  const {isAuthenticated, loading, data} = useAppSelector(
    userSelector,
  ) as AuthStateInterface;

  useEffect(() => {
    dispatch(initializeAuthStateUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      UserService.getUserProfileStatus(data?.id)
        .then(res => {
          setStatusLoader(true)
          if (res?.statusCode === 200) {
            setStatus(res?.data?.isProfileCompleted);
            if (res?.data?.isProfileCompleted) {
              console.log('first', res?.data?.isProfileCompleted);
              navigation.navigate('Home', {
                screen: 'Dashboard',
              });
            } else {
              console.log('comes first');
              navigation.navigate('CreateProfile');
            }
          }
        })
        .catch(err => {
          if(err?.status === 404){
             setStatus(false);
          }
          console.log('profile status fetching err', err?.data);
        }).finally(() =>{
            setStatusLoader(false);
        });
    } else {
      navigation.navigate('Login');
    }
  }, [isAuthenticated]);

  if (loading && !isAuthenticated && statusLoader) {
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
                return (
                  <TabHeader
                    status={status}
                    type={0}
                    title={constant.appTitle}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            component={AboutUsScreen}
            name="About"
            options={{
              headerShown: true,
              header() {
                return (
                  <TabHeader status={status} type={0} title={'About US'} />
                );
              },
            }}
          />
          <RootStack.Screen
            component={TandCScreen}
            name="TandC"
            options={{
              headerShown: true,
              header() {
                return (
                  <TabHeader
                    status={status}
                    type={0}
                    title={'Terms & Conditions'}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            component={FaqScreen}
            name="Faq"
            options={{
              headerShown: true,
              header() {
                return <TabHeader status={status} type={0} title={'FAQ'} />;
              },
            }}
          />
          <RootStack.Screen
            component={PolicyScreen}
            name="Policy"
            options={{
              headerShown: true,
              header() {
                return (
                  <TabHeader
                    status={status}
                    type={0}
                    title={'Privacy Policy'}
                  />
                );
              },
            }}
          />
          <RootStack.Screen
            component={AssignmentDetails}
            name="AssignmentDetail"
            options={{
              headerShown: true,
              header() {
                return (
                  <TabHeader
                    status={status}
                    type={0}
                    title={'Assignment Details'}
                  />
                );
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
