import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
  container:{
     display: 'flex',
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:globalStyle.colors.baseColor,
     paddingTop:20,
     paddingBottom:5,
     paddingHorizontal:10
  },
  left:{},
  heading:{
     color: globalStyle.colors.titleColor,
     fontSize:20,
     lineHeight:25,
     letterSpacing:0.03,
     fontWeight:'bold'
  },
  bellIcon:{
     position: 'relative'
  },
  tag:{
      position:'absolute',
      top:-2,
      right:0,
      borderRadius:50,
      backgroundColor:'red',
      height:18,
      width:18,
      paddingHorizontal:3,
      color: globalStyle.colors.buttonTextColor,
      fontSize:10,
      textAlign:'center'
  }
})

export default styles;