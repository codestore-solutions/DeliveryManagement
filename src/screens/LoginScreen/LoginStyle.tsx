import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
    btnContainer:{
           flex:1,
           justifyContent:'center',
           alignItems:'center',
       
    },
    text:{
         color:globalStyle.colors.baseColor
    }
});

export default styles;