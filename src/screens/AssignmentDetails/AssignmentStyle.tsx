import { StyleSheet } from 'react-native'
import globalStyle from '../../global/globalStyle';



const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
      },
    container:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:15,
    },
    detailsRow:{
        display:'flex',
        justifyContent:'center',
        marginVertical:5,
    },
    details:{
        paddingBottom:15,
       borderColor:'#EAEAEA',
       borderBottomWidth:1,
    },
    label:{
        color:globalStyle.colors.labelColor,
        fontWeight:"500",
        fontSize:16,
        lineHeight:24,
    },
    valueContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    value:{
        color:'#7E8299',
        fontWeight:"400",
        fontSize:16,
        lineHeight:24,
        paddingVertical:4
    },
    detailsUser:{
        marginVertical:15
    },
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between' ,
        paddingVertical:5,

    },
    rowLeft:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center', 
    },
    rowRight:{},
    callIcon:{
         padding:5,
         lineHeight:30,
         backgroundColor:'#D6EEDD',
         borderRadius:50
    }, 
    avatar:{},
    avatarLabel:{
        color:globalStyle.colors.labelColor,
        paddingLeft:15,
        fontWeight:'500',
        fontSize:20,
        lineHeight:25
    },
    labeltxt:{
        color:'#7E8299',
        fontWeight:'400',
        fontSize:16,
        lineHeight:25
    },
    payment:{
        color:'#4CD964',
        fontWeight:'400',
    },
    red:{
       color:'red',
       fontWeight:'500' 
    },
    qrContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    btntxt:{
       color: '#34A853',
       fontWeight:'600',
       fontSize:16,
       lineHeight:22,
       paddingBottom:20
    },
    qr:{
      padding:10,
      borderColor:'#000000',
      borderWidth:1,
    },
    btnContainer:{
        width:'100%',
        marginVertical:20
    },
    btnContainerDel:{
       
    },
    timeLineContainer:{
        display:'flex',
        flexDirection:'row' ,
        justifyContent:'space-between'
    },
   
    imagesButtons:{
        
    }
});

export default styles;