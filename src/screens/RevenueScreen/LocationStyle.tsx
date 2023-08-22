import { StyleSheet } from 'react-native'
import globalStyle from '../../global/globalStyle'



const styles = StyleSheet.create({
    container:{
         padding:10,
         color:globalStyle.colors.baseColor, 
        //  flex:1,
         alignItems:'center',
         justifyContent:'center'
    },
    textColor:{
        color:globalStyle.colors.baseColor,
        fontSize:25,
        fontWeight:'500'
    }
})
export default styles