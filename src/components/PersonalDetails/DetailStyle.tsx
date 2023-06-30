import {StyleSheet} from 'react-native';
import globalStyle from '../../global/globalStyle';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex:1,
  },
  lower: {
    width:'100%',
    position:'absolute',
    bottom:0,
    marginLeft:5,
    marginBottom:15,
  },
  row: {
    marginVertical: 10,
  },
  btnConatiner:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:5
  }
});

export default styles;
