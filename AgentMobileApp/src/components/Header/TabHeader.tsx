import {View, Text, TouchableOpacity, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './TabHeaderStyles';
import { LeftArrowIcon, NotificationIcon } from '../../assets';

interface TabHeaderProps{
     title: string;
}

const TabHeader:React.FC<TabHeaderProps> = ({title}) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
      <Pressable
        style={styles.avatar}>
         <View style={styles.avatarDummy}>
            <Text style={styles.avatarText}>rc</Text>
          </View>
      </Pressable>
        
      </View>
      <Text style={styles.heading}>{title}</Text>
      <TouchableOpacity
          style={styles.leftArrowIcon}
          onPress={() => navigation.navigate('Home', {
             screen:"Assignments"
          })}>
          <NotificationIcon width={23} height={23} />
          {/* <Text>Back</Text> */}
        </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
