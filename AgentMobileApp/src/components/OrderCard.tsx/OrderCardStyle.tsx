import {StyleSheet} from 'react-native';
import globalStyle from '../../global/globalStyle';

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:"center",
    padding: 10,
    marginVertical:5,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.8,
    elevation: 0.5,
  },
  cardLeft: {
    flex: 9,
  },
  cardHeading: {
      fontSize:20,
      color:globalStyle.colors.baseColor,
      lineHeight:22,
      letterSpacing:0.03,
      fontWeight:'700'
  },
  cardDescription: {
    paddingVertical:5,
    color:'#66789C',
    fontSize:16,
    lineHeight:18,
    letterSpacing:0.2
  },
  cardFooter: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  cardRight: {
    flex: 3,
  },
  payType:{
      backgroundColor: globalStyle.colors.baseColor,
      paddingVertical:3,
      paddingHorizontal:8,
      marginLeft:15,
      color:'#fff',
      fontWeight:'700',
      borderRadius:5,

  },
  pickupBtn: {
    backgroundColor: globalStyle.colors.baseColor,
    paddingVertical:5,
    paddingHorizontal:1,
    borderRadius:5,

  },
  btnText: {
    color:'#fff',
    fontWeight:'700',
    textAlign:"center"
  },
  address:{}
});

export default styles;
