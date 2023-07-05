import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import globalStyle from '../../global/globalStyle';


const Settings = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Faq')}>
        <Text style={styles.btnText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('About')}>
        <Text style={styles.btnText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TandC')}>
        <Text style={styles.btnText}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Policy')}>
        <Text style={styles.btnText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.logout]}>
        <Text style={[styles.btnText, styles.baseText]}>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:30,
        flex:1,
        alignItems:'center',
    },
    btn:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:12,
        backgroundColor:'#F9F9F9',
        borderRadius:10,
        marginVertical:10
    },
    btnText:{
      color:globalStyle.colors.labelColor,
      fontWeight:'400',
      fontSize:18
    },
    logout:{
      position:'absolute',
      bottom:0
    },
    baseText:{
       color: globalStyle.colors.baseColor
    }
})