import { StyleSheet } from "react-native";
import globalStyle from "../../../global/globalStyle";


const styles = StyleSheet.create({
    dropitem:{
        padding:10,
        color: globalStyle.colors.labelColor,
         display:'flex',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between'
    },
   
    textItem:{
        color: globalStyle.colors.labelColor,
    },
    dropdown:{
    },
    placeholderStyle:{
        color: globalStyle.colors.labelColor,
    },
    iconStyle:{},
    inputSearchStyle:{}
})

export default styles;