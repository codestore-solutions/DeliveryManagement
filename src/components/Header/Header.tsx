import {View, Text, TouchableOpacity, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, drawerParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import styles from './HeaderStyles';
import { MenuIcon, NotificationIcon } from '../../assets';
interface TabHeaderProps{
     title: string;
}

const TabHeader:React.FC<TabHeaderProps> = ({title}) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const drawer = useNavigation<DrawerNavigationProp<drawerParamList>>();
  return (
    <View style={styles.container}>
      <Pressable style={styles.left} onPress={() => drawer.openDrawer()}>
            <MenuIcon width={30} height={30} />
      </Pressable>
      <Text style={styles.heading}>{title}</Text>
      <TouchableOpacity
          style={styles.bellIcon}
          onPress={() => navigation.navigate('Home', {
             screen:"Notification"
          })}>
          <NotificationIcon width={30} height={30} />
          <Text style={styles.tag}>9</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TabHeader;