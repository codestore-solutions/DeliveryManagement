import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import styles from './HeaderStyles';
import { useRoute } from '@react-navigation/native';
import {LeftArrowIconHeader, MenuIcon, NotificationIcon} from '../../assets';

interface TabHeaderProps {
  title: string;
  type?: number;
}

const TabHeader: React.FC<TabHeaderProps> = ({title, type}) => {
  const route = useRoute();
  console.log('route', route)
  const { params } = route;
  const navigation = useNavigation<NavigationProps>();

  const goBackHandler = () =>{
      if(route.name === 'CreateProfile'){
          navigation.navigate('Home', {screen: 'Dashboard'})
      }else{
         navigation.goBack();
      }
  }
  return (
    <View style={styles.container}>
      {type === 0 ? (
        <Pressable style={styles.left} onPress={goBackHandler}>
          <LeftArrowIconHeader width={30} height={30} />
        </Pressable>
      ) : (
        <Pressable style={styles.left} onPress={() => navigation.openDrawer()}>
          <MenuIcon width={30} height={30} />
        </Pressable>
      )}
      <Text style={styles.heading}>{title}</Text>
      <TouchableOpacity
        style={styles.bellIcon}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'Notification',
          })
        }>
        <NotificationIcon width={30} height={30} />
        <Text style={styles.tag}>9</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
