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
    inputlabel:{
        paddingLeft:3,
        paddingBottom:5,
        color:'#7E8299',
        fontWeight:'500'
    },
    textItem:{
        color: globalStyle.colors.labelColor,
    },
    dropdown:{
        paddingVertical:7,
        paddingHorizontal:10,
        borderColor:'#CCCCCC',
        borderWidth:1,
        borderRadius:10,
    },
    placeholderStyle:{
        color: globalStyle.colors.labelColor,
    },
    iconStyle:{},
    inputSearchStyle:{}
})

export default styles;