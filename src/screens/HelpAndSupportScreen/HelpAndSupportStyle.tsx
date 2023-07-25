import { StyleSheet } from "react-native";
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
     container:{
         flex: 1,
         backgroundColor:'#fff',
         alignItems:'center',
         paddingVertical:50,
        //  justifyContent:'center'
     },
     microIcon:{
        marginBottom:20
     },
     content:{
        marginVertical:30,
        paddingHorizontal:10,
         display:'flex',
         flexDirection:"column",
         alignItems:'center'
     },
     heading:{
        color:globalStyle.colors.labelColor,
        fontSize:25,
        fontWeight:'500',
        paddingVertical:15,
     },
     subheading:{
        color:'#7E8299',
        lineHeight:30,
        fontWeight:'400',
        fontSize:18
     },
     icons:{
        display:'flex',
        flexDirection:'row',
        
     },
     icon:{
        width:150, 
       display:'flex',
        alignItems:'center',
        padding:20,
        backgroundColor:'#fff',
        borderRadius:10,
        marginHorizontal:15,
        elevation:1,
        shadowColor:'black',
        shadowOffset:{
            width:1,
            height:1
        },
        shadowOpacity:0.1,

     },
     iconText:{
        paddingVertical:10,
        color:globalStyle.colors.labelColor,
        fontSize:20,
        lineHeight:25
     }
})

export default styles;