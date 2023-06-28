import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
     container:globalStyle.container,
     header:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
     },
     menuIcon:{
       height:35,
       width:35,
       lineHeight:35,
       padding:7,
       borderColor:'#CCCCCC',
       borderWidth:1,
       borderRadius:50,
     },
     pageHeading:{
        color:globalStyle.colors.labelColor,
        fontSize:20,
        lineHeight:25,
        letterSpacing:0.01,
        fontWeight:'600',
        marginBottom:8,
     },
      content:{
        marginVertical:10
     },
     card:{}
});

export default styles;