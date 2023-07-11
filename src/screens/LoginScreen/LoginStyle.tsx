import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
    container:{
           backgroundColor:'#fff',
           flex:1,
           alignItems:'center',
           paddingTop:100,
        //    justifyContent:'center',
          
    },
    text:{
         color:globalStyle.colors.baseColor
    },
    header:{
        flexDirection:'column',
        justifyContent:'center' ,
        alignItems:'center'
    },
    icon:{
        padding:10,
        backgroundColor:'#F1F3F6',
        borderRadius:50
    },
    heading:{
      color:globalStyle.colors.labelColor,
      lineHeight:50,
      fontSize:22
    },
    formContainer:{
        marginTop:60
    },
    formElement:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:10,
        marginVertical:10,
        borderColor:'#CCCCCC',
        borderWidth: 1,
        borderRadius:10,
    },
    formInput:{
        width:'80%',
        fontSize:18,
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:15,
        alignItems:'center',
        paddingVertical:20,
        backgroundColor:globalStyle.colors.labelColor,
        borderRadius:15,
    },
    btnTxt:{
        color:'#fff',
        fontWeight:'500',
        letterSpacing:0.03,
        fontSize:18,
        lineHeight:22
    },
    formtag:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    formText:{
        color:globalStyle.colors.labelColor,
        fontWeight:'500',
        lineHeight:28,
    },
    errorMessage:{
         color:'red',
         fontSize:14,
         
    }
});

export default styles;