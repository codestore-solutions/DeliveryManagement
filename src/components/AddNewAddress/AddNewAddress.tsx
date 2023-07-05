import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import SelectTimeScreen from '../DayandTime/SelectTimeScreen';
import globalStyle from '../../global/globalStyle';
import CustomButton from '../common/CustomButton/CustomButton';

interface Props{
     onCancel : () => void;
}

const AddNewAddress:React.FC<Props> = ({onCancel}) => {
  const onChangeText = (text: any) => {};
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please fill the following details</Text>
      <View style={styles.form}>
        <CustomTextInput
          label={'Location'}
          name="location"
          onChangeText={onChangeText}
        />
        <CustomTextInput
          label={'Address'}
          name="address"
          onChangeText={onChangeText}
        />
      <SelectTimeScreen />
      </View>
      <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton title={'Add Details'} />
              </View>
              <View style={{width: '50%'}}>
                <CustomButton
                  title={'Cancel'}
                  outline={true}
                  onPress={onCancel}
                />
              </View>
            </View>
    </View>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    padding:10
  },
  heading: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
  },
  form: {
     marginBottom:55
  },
  btnConatiner:{
     display:'flex',
     flexDirection:'row',
     gap:10,
     position:'absolute',
     bottom: 0,
     width:'100%'
  }
});
