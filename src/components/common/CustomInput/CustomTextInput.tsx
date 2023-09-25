import React, {useState} from 'react';
import {TextInput, TextInputProps, View, Text} from 'react-native';
import styles from './InputStyle';


interface CustomTextInputProps  {
  value?:string;
  label:string;
  name: string;
  placeholder?:string;
  errors?: any;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  touched?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  errors,
  name,
  label,
  disabled,
  touched,
  ...rest
}) => {
  return (
    <View style={styles.conatiner}>
     { name !== 'mobileNo' && <Text style={styles.inputlabel}>{label}<Text style={{color:'red', fontWeight:'700',paddingLeft:3, paddingBottom:5}}>*</Text> </Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={!disabled && styles.inputBox}
          value={value}
          onChangeText={(text:any) =>onChangeText(text) }
          placeholder={placeholder}
          editable={!disabled}
          {...rest}
        />
      </View>
      {touched[name] && errors[name] && <Text style={styles.errorMessage}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomTextInput;