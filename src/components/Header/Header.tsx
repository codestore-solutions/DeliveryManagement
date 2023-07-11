import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../navigations/types';
import styles from './HeaderStyles';
import {LeftArrowIconHeader, MenuIcon, NotificationIcon} from '../../assets';

interface TabHeaderProps {
  title: string;
  type?: number;
}

const TabHeader: React.FC<TabHeaderProps> = ({title, type}) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      {type === 0 ? (
        <Pressable style={styles.left} onPress={() => navigation.navigate('Home', {screen:'Dashboard'})}>
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
