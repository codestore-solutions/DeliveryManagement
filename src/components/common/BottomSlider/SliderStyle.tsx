import {StyleSheet, Dimensions} from 'react-native';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
 
  container: {
    padding: 10,
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    borderRadius: 25,
  },
  contentContainer: {
    display: 'flex',
    padding: 10,
    position: 'relative',
  },
  headingText: {
    color: '#05264E',
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '700',
  },

  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginHorizontal: 3,
    backgroundColor: '#3C65F5',
    padding: 5,
    borderRadius: 50,
  },
  inputStyle:{
    flex:0.9,
    fontSize:18,
    lineHeight:22,
    fontWeight:'500',
  },
  searchIcon:{
    flex:0.1,
    padding: 8,
    backgroundColor: '#3C65F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  crossIcon: {
    marginHorizontal: 5,
    backgroundColor: '#F5F5F5',
    padding: 5,
    borderRadius: 50,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterForm: {
    marginVertical: 15,
  },
  label: {
    color: 'black',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '500',
  },
  filterFormElement: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  filterFormInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  filterFormInputBox:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: '#F2F6FD',
    borderRadius: 7,
    margin: 2,
  },
  tagText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  labelView: {
    marginVertical: 10,
  },
  value: {
    color: '#3C65F5',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    alignSelf: 'center',
  },
  checkBoxContainer: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  slider: {
    width: 300,
    height: 40,
  },
  sreachList: {
    paddingHorizontal: 10,
    
    
  },
  item: {
    padding:5,
    marginVertical:5,
    borderRadius: 5,
    borderColor:'#eee',
    borderBottomWidth:0.8,
  },
  title: {
    color:'#00000',
    letterSpacing:0.2,
    fontSize:15,
    lineHeight:20,
    fontWeight:'500'
  },
  filterButtons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
   
  },
  cancelButtons:{
     flex:0.45,
     paddingHorizontal:2
  }
});

export default styles;
