import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SuccessIcon } from '../../../assets'
import globalStyle from '../../../global/globalStyle'

interface Props{
     type: number;
     message:string;
}


const ModalMessage: React.FC<Props> = ({type, message}) => {
  return (
    <View style={styles.container}>
        <View style={styles.messageIcon}>
            <SuccessIcon width={40} height={40} />
        </View>
       <Text style={styles.message}>{message}</Text>
    </View>
  )
}

export default ModalMessage

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    messageIcon:{
        paddingVertical:10
    },
    message:{
         color:globalStyle.colors.labelColor,
         fontWeight:'500',
         fontSize:18,
         letterSpacing:0.02
    }
})