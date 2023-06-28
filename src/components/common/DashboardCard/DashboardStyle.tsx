import { StyleSheet} from "react-native";
import globalStyle from "../../../global/globalStyle";


const styles = StyleSheet.create({
    dashboardCard:{
        position:'relative' ,
        borderRadius:15,
        minHeight:200,
    },
    
    cardIconBack:{
         position:'absolute',
         top:-42,
         right:-60,
         opacity:0.2
    },
    cardContent:{
        display:'flex',
        flexDirection:'column',
        paddingTop:40,
        paddingLeft:10,
        paddingBottom:10
        
    },
    cardIcon:{
       padding:10,
    //    backgroundColor:'#A39AFF',
       borderRadius:15,
       width:50,
    },
    cardHeading:{
        paddingTop:5,
        color:globalStyle.colors.backgroundColor,
        fontWeight:'800',
        fontSize:30,
        lineHeight:35,
    },
    cardDesc:{
        color:globalStyle.colors.backgroundColor,
        fontSize:15,
        lineHeight:25,
    }
});

export default styles;