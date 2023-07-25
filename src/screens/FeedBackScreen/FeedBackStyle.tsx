import { StyleSheet} from 'react-native'
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
    container:{
         paddingVertical: 10,
    },
    imageHeading:{
         color:globalStyle.colors.labelColor,
         fontSize:18,
         lineHeight:25,
         fontWeight:"500",
         paddingBottom:15,
    },
    imageContainer:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        padding:5,
       
    },
    image:{  
         borderColor:"#CCCCCC",
         borderWidth:1,
         borderRadius:10,
         padding: 5,
    },
    tag:{
        flex:6,
        justifyContent:'center',
        alignItems:'center',
    }
})


export default styles;