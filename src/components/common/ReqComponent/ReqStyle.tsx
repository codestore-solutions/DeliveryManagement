
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    requstCard: {
        backgroundColor:'#F9F9F9',
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginVertical:5,
        borderRadius:15,
      },
      requstCardRow: {
        marginVertical:5,
        display: 'flex',
        flexDirection: 'row',
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
         fontWeight:'400'
      },
});


export default styles;