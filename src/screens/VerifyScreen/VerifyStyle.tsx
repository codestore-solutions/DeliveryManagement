import {StyleSheet} from 'react-native';
import globalStyle from '../../global/globalStyle';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0.3, height: 1},
    shadowOpacity: 0.4,
    borderRadius: 10,
  },
  errorText:{
    fontSize: 10,
        color: 'red',
        lineHeight: 15,
  },
  heading: {
    color: '#05264E',
    fontSize: 25,
    lineHeight: 28,
    paddingLeft: 20,
    paddingTop: 10,
    marginVertical: 10,
  },

  formContainer: {
    flex: 1,
    marginVertical: 15,
    paddingTop: 15,
  },
  formElement: {
    marginVertical: 5,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  label: {
    color: '#05264E',
    fontSize: 13,
    lineHeight: 18,
    paddingVertical: 5,
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadIcon: {
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#A0ABB8',
    borderStyle: 'dashed',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  avatarImg: {
    height: 85,
    width: 85,
    borderRadius: 50,
    borderColor: '#A0ABB8',
    borderWidth: 1,
    resizeMode: 'contain',
  },
  formInput: {},
  InputEle: {
    letterSpacing: 0.2,
    color: '#000000',
    fontSize: 18,
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneStyle: {
    flexDirection: 'row',
  },
  contactInput: {
    flex: 0.9,
  },
  countryInput: {
    flex: 0.1,
  },
  formInputNumber: {
    fontSize: 18,
    lineHeight: 20,
    paddingHorizontal: 5,
  },
  formInputcode: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    paddingRight: 7,
    fontSize: 16,
    lineHeight: 18,
  },
  butttonElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnWidth: {
       width:'50%',
       marginHorizontal: 5,
  },
  btnOutline: {
    borderColor: globalStyle.colors.baseColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  btn: {
    backgroundColor: globalStyle.colors.baseColor,
  },
});

export default styles;
