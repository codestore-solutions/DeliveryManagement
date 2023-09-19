import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from '../../../global/globalStyle'
import { NotAvailableIcon } from '../../../assets'

const NotAvailable:React.FC<{message?:string}> = ({message}) => {
  return (
    <View style={styles.container}>
      <NotAvailableIcon width={40} height={40} /> 
      <Text style={styles.text}>{message ? message: 'No Available Orders'}</Text>
    </View>
  )
}

export default NotAvailable

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:30,
        minHeight:300
    },
    text:{
        fontSize:20,
        fontWeight:'500',
        color:globalStyle.colors.labelColor
    }
})