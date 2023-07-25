import { View, Text, TouchableOpacity, Image, Switch, Pressable } from 'react-native';
import React from 'react';
import styles from './DrawerMenuStyle';
import { useNavigation } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationProps } from './types';

const CustomDrawerMenu = (props: any) => {
  const navigation =
    useNavigation<NavigationProps>();
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.drawerHeader}>
        <Pressable style={styles.avatarImg} onPress={() => navigation.navigate('CreateProfile')}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatarImg}
          />
        </Pressable>
        <View style={styles.info}>
          <Text style={styles.name}>Agent Name</Text>
          <View style={styles.statusContainer}>
            <Switch />
           <Text style={styles.company}>OnDuty</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerMenu;
