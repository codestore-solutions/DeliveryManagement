
import { StyleSheet } from "react-native";
import globalStyle from "../../../global/globalStyle";

const styles = StyleSheet.create({
    requstCard: {
        backgroundColor:'#F9F9F9',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical:5,
        borderRadius:15,
        elevation:1,
      },
      selected:{
        borderWidth:1,
        borderColor: globalStyle.colors.baseColor,
        borderRadius:10,
      },
      requstCardRow: {
        marginVertical:5,
        display: 'flex',
        flexDirection: 'row',
        gap:10,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      requstColOne: {
        color:'#7E8299',
        fontSize:16,
        fontWeight:'400'
      },
      requstColTow: {
         color:'#000000',
         fontSize:16,
         fontWeight:'400',
        
      },
      btnConaṭiner:{
         display:'flex',
         flexDirection:'row',
         gap:5,
         paddingVertical:13,
      },
      ignoreBtn:{
           width:'50%',
           alignItems:'center',
           backgroundColor:'#E0DEFA',
           paddingVertical:12,
           borderRadius:5
      },
      acceptBtn:{
        width:'50%',
        alignItems:'center',
        paddingVertical:12,
        backgroundColor:'#7E72FF',
        borderRadius:5
      },
      ignoreBtnText:{
        color:globalStyle.colors.baseColor,
        fontSize:18,
        fontWeight:'600'
      },
      acceptBtnText:{
        color:'#fff',
        fontSize:18,
        fontWeight:'600'
      }
});


export default styles;