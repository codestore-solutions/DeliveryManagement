import { StyleSheet } from 'react-native'
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
    landingContainer:{
      position:"relative",
      backgroundColor:globalStyle.colors.bacgroundColor,
      marginTop:30,
      flex:1,
      flexDirection:'column'
    },
    landingImg:{
        width:400,
        height:300,
        resizeMode:"contain",
        marginVertical: 20,
        alignContent:'center'
    },
    welcomeText:{
        // marginVertical:20,  
    },
    text:{
        textAlign:'center',
        letterSpacing:.3,
        fontSize:25,
        fontWeight:"600",
        color:globalStyle.colors.baseColor
    }, 
    btnContainer:{
        position:'absolute'  ,
        bottom:40,
        width:"100%",
        marginLeft:10,
       
    },
    startBtn:{
      alignContent:'center',
      backgroundColor:globalStyle.colors.baseColor,
      paddingVertical:10,
      borderRadius:5,  
    },
    btnText:{
        textAlign:'center',
        fontWeight:"500",
        letterSpacing:0.03,
        fontSize:25,
        lineHeight:35,
        color: globalStyle.colors.buttonTextColor,
    },
    pageFooter:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:10,
    },
    pageFooterTxt:{
        color: '#000000',
        fontSize: 15,
        lineHeight: 30,
    },
    pageFooterLink:{
        color:globalStyle.colors.baseColor
    }
});

export default styles;