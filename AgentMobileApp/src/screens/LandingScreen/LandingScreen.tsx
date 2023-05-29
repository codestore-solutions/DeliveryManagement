import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import './LandingStyle';
import globalStyle from '../../global/globalStyle';
import { DeliveryImg } from '../../assets';
import styles from './LandingStyle';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LandingScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={[globalStyle.container, styles.landingContainer]}>
      <Image source={DeliveryImg} style={styles.landingImg} />
      <View style={styles.welcomeText}>
        <Text style={styles.text}>Welcome to Delivery Agent App</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
