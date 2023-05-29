import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  AssignmentScreen,
  SettignScreen,
  NotificationScreen,
} from '../screens';
import {Image} from 'react-native';
import {ChatIcon, SearchIcon} from '../assets';
import {TabHeader} from '../components';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => <TabHeader title={route.name} />,
      })}>
      <Tab.Screen
        name="Assigned Orders"
        component={AssignmentScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/svgs/Assignment2.png')}
              style={{
                width: 30,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          ),
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <SearchIcon width={30} height={20} color={'#E74C43'} />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={SettignScreen}
        options={{
          tabBarIcon: () => (
            <ChatIcon width={30} height={20} color={'#E74C43'} />
          ),
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={NotificationScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/svgs/setting.png')}
              style={{
                width: 30,
                height: 20,
                resizeMode: 'contain',
              }}
            />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
