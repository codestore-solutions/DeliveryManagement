import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React from 'react'
import globalStyle from '../../../global/globalStyle';

interface Props{
    title:string;
    onPress: () => void;
    outline?: boolean;
    disabled?: boolean;
}

const CustomButton:React.FC<Props> = ({title, onPress, outline, disabled}) => {
  return (
    <TouchableOpacity  disabled={disabled} style={ !outline? styles.btnContainer : [styles.btnContainer,styles.outLine]} onPress={onPress}>
      <View style={styles.row}>
      <Text style={ !outline ? styles.btnText : [styles.btnText, styles.outLineText]}>{title}</Text>
      {disabled && <ActivityIndicator color={'#fff'} size={'small'} />}
      </View>
    </TouchableOpacity>
  )
}


export default CustomButton

const styles = StyleSheet.create({
    btnContainer: {
        alignItems:'center',
        paddingVertical:15,
        backgroundColor:globalStyle.colors.baseColor,
        borderRadius:15, 
      },
      row:{
        display:'flex',
        flexDirection:'row'
      },
     outLine:{
        backgroundColor:globalStyle.colors.backgroundColor,
        borderColor: globalStyle.colors.baseColor,
        borderWidth:1,
     },
     outLineText:{
        color:globalStyle.colors.baseColor
     },
      btnText: {
        color: globalStyle.colors.backgroundColor,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
       
      },
})