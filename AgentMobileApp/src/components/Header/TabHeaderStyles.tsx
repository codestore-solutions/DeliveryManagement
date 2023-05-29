import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    paddingVertical: 7,
    paddingHorizontal:20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomColor:'#eee',
    borderBottomWidth:0.7,
    elevation:5
  },
  pageHeader:{
    // color: globalStyle.colors.baseColor,
    // fontSize: 16,
    // lineHeight: 28,
    // fontWeight:'600'
  },
  heading: {
    color: globalStyle.colors.baseColor,
    fontSize: 16,
    lineHeight: 28,
    fontWeight:'600'
  },
  leftArrowIcon: {
    width: 43,
    height: 43,
    paddingVertical: 10,
  },
  avatar: {
   
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  avatarText: {
    padding: 8,
    textTransform: 'uppercase',
    fontSize: 23,
    fontWeight: '600',
    alignItems: 'center',
    alignSelf: 'center',
    color:  globalStyle.colors.baseColor,
  },
  avatarDummy: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
})

export default styles;