import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 6,
    flex: 1,
  },
  lower: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginLeft: 5,
    marginBottom: 15,
  },
  dropDown:{
    
  },
  row: {
    marginVertical: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    marginVertical: 5,
  },
  imageContainer: {
    height: 150,
    width: '100%',
    display: 'flex',
    padding:15,
    justifyContent: 'center',
    alignItems:'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    borderStyle: 'dotted',
    resizeMode:'cover'
  },
  imageContainerImage:{
    height: 200,
    width: '100%',
    display: 'flex',
    padding:15,
    justifyContent: 'center',
    alignItems:'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dotted',
    resizeMode:'contain'
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  label: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
});

export default styles;
