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
  row: {
    marginVertical: 10,
  },
  btnConatiner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    marginVertical: 5,
  },
  imageConatiner: {
    height: 100,
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
  },
  label: {
    paddingLeft: 3,
    paddingBottom: 5,
    color: '#7E8299',
    fontWeight: '500',
  },
});

export default styles;
