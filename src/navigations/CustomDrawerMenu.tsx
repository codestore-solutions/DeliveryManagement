import {View, Text, TouchableOpacity, Image, Switch} from 'react-native';
import React from 'react';
import styles from './DrawerMenuStyle';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawerMenu = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatarImg}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatarImg}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Agent Name</Text>
          <View style={styles.statusContainer}>
            <Switch />
           <Text style={styles.company}>OnDuty</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.drawerFooter}>
        {/* <LogoutIcon /> */}
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerMenu;
