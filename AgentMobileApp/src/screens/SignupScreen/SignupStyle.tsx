import { StyleSheet } from 'react-native';
import globalStyle from '../../global/globalStyle';


const styles =  StyleSheet.create({
      logoSection: {
        alignItems: 'center',
        borderRadius:15
      },
      loginPageLogo: {
        height:100,
        width:300,
        resizeMode:'center',
        paddingVertical: 20,
        backgroundColor:'#eee',
      },
      formSection: {
        flex: 1,
        marginVertical: 15,
        justifyContent:'center'
      },
      formHeading: {
        color: '#000000',
        fontSize: 30,
        lineHeight: 48,
        fontWeight: '300',
        marginBottom: 15,
        textAlign:'center'
      },
      formElememt: globalStyle.inputBox,
      formElememtCheck: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      phoneStyle: {
        flexDirection: 'row',
      },
      contactInput:{
        flex:0.9
      },
      countryInput:{
        flex:0.1
      },
      formInput: globalStyle.input,
      formInputcode: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.1)',
        paddingRight: 7,
        fontSize: 16,
        lineHeight: 18,
      },
      errorText: {
        fontSize: 10,
        color: 'red',
        lineHeight: 15,
      },
      passwordElement: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      passwordInput: {
        flex: 0.9,
      },
      passwordIcons: {
        flex: 0.1,
      },
      formInputNumber: {
        fontSize: 18,
        lineHeight: 20,
        paddingHorizontal: 5,
      },
      formButton: {
        marginVertical: 10,
        backgroundColor: globalStyle.colors.baseColor,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
      },
      formButtonText: {
        fontSize: 25,
        lineHeight: 30,
        color: '#fff',
        fontWeight: '400',
      },
      containerFooter: {},
      footerHeading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
      },
      info: {
        color: '#000000',
        fontSize: 15,
        lineHeight: 30,
        fontWeight: '500',
      },
      signInBtn: {
        color: globalStyle.colors.baseColor,
      },
});

export default styles;