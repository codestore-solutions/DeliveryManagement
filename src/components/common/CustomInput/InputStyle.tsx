import {StyleSheet} from 'react-native';
import globalStyle from '../../../global/globalStyle';


const styles = StyleSheet.create({
      conatiner:{
        marginVertical:3,
      },
      inputlabel:{
         paddingLeft:3,
         paddingBottom:5,
         color:'#7E8299',
         fontWeight:'500'
      },
      inputContainer:{
        paddingHorizontal:10,
        borderColor:'#CCCCCC',
        borderWidth:1,
        borderRadius:10,
      },
       inputContainermob:{
        paddingVertical:10,
        borderColor:'#CCCCCC',
        borderWidth:1,
        borderRadius:10,
      },
      inputBox:{
         color:globalStyle.colors.labelColor
      }, 
      errorMessage:{
         fontSize:13,
         color:'red',
         paddingLeft:4,
         
      }
});

export default styles;
