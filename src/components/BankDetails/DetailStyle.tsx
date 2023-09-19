import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 6,
        flex: 1,
      
      },
     
      container:{
        flex:1,
        overflow:'scroll',
        paddingVertical: 10,
        paddingHorizontal:10,
        backgroundColor:"#fff"
     },
      lower: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        marginLeft: 5,
        marginBottom: 15,
      },
      row: {
        marginVertical: 10,
      },
      btnConatiner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
})



export default styles;