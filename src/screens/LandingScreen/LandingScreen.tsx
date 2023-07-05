import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React,{useEffect, useState} from 'react';
import './LandingStyle';
import globalStyle from '../../global/globalStyle';
import { DeliveryImg } from '../../assets';
import styles from './LandingStyle';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { constant } from '../../constant/GenralConstant';

const LandingScreen = () => {
  const [count, setCount] = useState<number>(8);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const navigate = () =>{
      navigation.navigate('Login')
    }
    useEffect(() =>{
       if(count <= 0){ navigate()}
       else{
           setTimeout(() =>{
                 setCount(count-1);
           }, count)
       }
    }, [count])
  return (
    <View style={[globalStyle.container, styles.landingContainer]}>
      <View style={styles.landingImg}>
          {constant.appLogo}
          <Text style={styles.text}>{constant.splashScreenTiltle}</Text>
      </View>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default LandingScreen;
