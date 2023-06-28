import { StyleSheet } from 'react-native'
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    noticationCard:{
      paddingHorizontal:8,
       backgroundColor:'#F9F9F9',
       marginVertical:5,
       paddingVertical:15,
       borderRadius:15,
       
    },
    noticationCardRow:{
       display:'flex',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between'
    },
    noticationColOne:{
          color: globalStyle.colors.labelColor
    },
    noticationColTow:{
        color:'#7E8299'
    }
})


export default styles;