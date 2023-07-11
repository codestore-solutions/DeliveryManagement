import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalStyle from '../../../global/globalStyle';


interface Props{
    title:string;
    onPress: () => void;
    outline?: boolean;
}

const CustomButton:React.FC<Props> = ({title, onPress, outline}) => {
  return (
    <TouchableOpacity style={ !outline? styles.btnContainer : [styles.btnContainer,styles.outLine]} onPress={onPress}>
      <Text style={ !outline ? styles.btnText : [styles.btnText, styles.outLineText]}>{title}</Text>
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