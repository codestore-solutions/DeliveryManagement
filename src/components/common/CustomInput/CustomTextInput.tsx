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
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  errors,
  name,
  label,
  disabled,
  ...rest
}) => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.inputlabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={(text:any) =>onChangeText(text) }
          placeholder={placeholder}
          editable={!disabled}
          {...rest}
        />
      </View>
      {errors && <Text style={styles.errorMessage}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomTextInput;
