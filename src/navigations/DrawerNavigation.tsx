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
  LocationScreen,
  AssignmentTabination,
} from '../screens/index';
import CustomDrawerMenu from './CustomDrawerMenu';
// import {StackScreenHeader} from '../components';
import {drawerParamList} from './types';
import {TabHeader} from '../components';
import {constant} from '../constant/GenralConstant';
import globalStyle from '../global/globalStyle';
// Import Icons

const Drawer = createDrawerNavigator<drawerParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerMenu {...props} />}
      screenOptions={{
        header: () => {
          return <TabHeader title={constant.appTitle} />;
        },
        drawerLabelStyle: {
          fontSize: 18,
          lineHeight: 20,
          color: globalStyle.colors.labelColor,
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: constant.drawernavItems.item1,
        }}
      />
      <Drawer.Screen
        name="Assignments"
        component={AssignmentTabination}
        
        options={{
          drawerLabel: constant.drawernavItems.item2,
        }}
      />
      <Drawer.Screen
        name="Location"
        component={LocationScreen}
        options={{
          drawerLabel: constant.drawernavItems.item3,
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerLabel: constant.drawernavItems.item4,
        }}
      />
      <Drawer.Screen
        name="Settigns"
        component={SettignScreen}
        options={{
          drawerLabel: constant.drawernavItems.item5,
        }}
      />
      <Drawer.Screen
        name="HelpAndSupport"
        component={HelpAndSupportScreen}
        options={{
          drawerLabel: 'Help & Support',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
