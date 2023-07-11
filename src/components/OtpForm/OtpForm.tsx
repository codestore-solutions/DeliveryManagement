import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';

const OtpForm = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (text:any, index:any) => {
    const updatedOtp = otp.split('');
    updatedOtp[index] = text;
    setOtp(updatedOtp.join(''));
  };

  const handleSubmit = () => {
    console.log('Entered OTP:', otp);
  };

  const renderOtpBoxes = () => {
    const otpBoxes = [];
    for (let i = 0; i < 4; i++) {
      otpBoxes.push(
        <TextInput
          key={i}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleOtpChange(text, i)}
          value={otp[i]}
        />
      );
    }
    return otpBoxes;
  };

  return (
    <View style={styles.container}>
       <Text style={styles.heading}>Please enter the OTP to verify</Text>
      <View style={styles.otpcontainer}>{renderOtpBoxes()}</View>
      <View style={styles.btn}>
      <CustomButton title={"Submit"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        marginVertical:15,
    },
    heading:{
        color:globalStyle.colors.labelColor,
        fontWeight:'500',
        fontSize:18,
        lineHeight:29
    },
    otpcontainer: {
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center',
    marginVertical: 10,
    
  },
  otpInput: {
    width: 40,
    height: 40,
    borderColor:'#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal:10,
  },
  btn:{
     marginVertical:15,
     width:"40%"
  }
});

export default OtpForm;
