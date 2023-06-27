import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  DashboardScreen,
  AssignmentScreen,
  ProfileScreen,
  SettignScreen,
  NotificationScreen,
  HelpAndSupportScreen,
  RevenueScreen
} from '../screens/index';
import CustomDrawerMenu from './CustomDrawerMenu';
// import {StackScreenHeader} from '../components';
import { drawerParamList } from './types';
import { TabHeader } from '../components';
import { constant } from '../constant/GenralConstant';
import globalStyle from '../global/globalStyle';
// Import Icons


const Drawer = createDrawerNavigator<drawerParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerMenu {...props} />}
      screenOptions={{
        header: () =>{
             return <TabHeader title={constant.appTitle} />
        },
        drawerLabelStyle: {
          fontSize: 18,
          lineHeight: 20,
          color: globalStyle.colors.labelColor,
        },
      }}  >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: 'Dashboard'
        }}
      />
      <Drawer.Screen
        name="Assignments"
        component={AssignmentScreen}
        options={{
          drawerLabel: 'My Delivery Request'
        }}
      />
      <Drawer.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{
          drawerLabel: 'Revenue'
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerLabel: 'Notification'
        }}
      />
      <Drawer.Screen
        name="Settigns"
        component={SettignScreen}
        options={{
          drawerLabel: 'Settigns'
        }}
      />
      <Drawer.Screen
        name="HelpAndSupport"
        component={HelpAndSupportScreen}
        options={{
          drawerLabel: 'Help & Support'
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
