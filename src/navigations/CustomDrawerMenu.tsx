import { View, Text, TouchableOpacity, Image, Switch, Pressable } from 'react-native';
import React from 'react';
import styles from './DrawerMenuStyle';
import { useNavigation } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationProps } from './types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AuthStateInterface, reset, userSelector } from '../store/features/authSlice';
import { RootState } from '../store';


const CustomDrawerMenu = (props: any) => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(
    userSelector,
    ) as AuthStateInterface;
    console.log('data', data)
  const navigation =
    useNavigation<NavigationProps>();
    const logoutHandler = () =>{
      dispatch(reset());
  }
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
          <Text style={styles.name}>{data?.name}</Text>
          <View style={styles.statusContainer}>
           <Text style={styles.company}>
              Rating: 4.5
           </Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <Pressable style={styles.logoutContainer} onPress={logoutHandler}>
          <Text style={styles.logout}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerMenu;
