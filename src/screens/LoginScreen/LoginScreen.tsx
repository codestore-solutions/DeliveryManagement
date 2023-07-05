import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import globalStyle from '../../global/globalStyle';
import styles from './LoginStyle';
import {Formik} from 'formik';
import {LogoImg, ShowPasswordIcon, HidePasswordIcon, LeftArrowIcon} from '../../assets';
// import {loginValidationSchema} from '../../utils/validations/userValidation';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      // validationSchema={loginValidationSchema}
      onSubmit={values => {}}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={styles.btnContainer}>
          <TouchableOpacity 
            onPress={() =>
              navigation.navigate('CreateProfile')
            }>
            <Text style={{ color:'red'}}>Login Page</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
