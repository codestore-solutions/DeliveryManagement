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
import styles from '../SignupScreen/SignupStyle';
import {Formik} from 'formik';
import {LogoImg, ShowPasswordIcon, HidePasswordIcon} from '../../assets';
import {loginValidationSchema} from '../../utils/validations/authValidation';
import data from '../../dummyData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Userheplers } from '../../utils/helpers/user';
const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const loginHandler =  (values: any) => {
     data?.user?.map((ele:any) =>{
          if(ele.email === values.email && ele.password === values.password){
              Userheplers.storeUser(ele);
               if(ele.status=== 1){
                  navigation.navigate('Home',{ 
                    screen:'Assignments'
                  })
                  return;
               }else if(ele.status === 2){
                  navigation.navigate('Verify');
                  return;
               }else{
                navigation.navigate('VerifyStatus');
                return;
               }
          }
     })
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={values => loginHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[styles.formSection, globalStyle.container]}>
          <View style={styles.logoSection}>
            <Image source={LogoImg} style={styles.loginPageLogo} />
          </View>
          <Text style={styles.formHeading}>Agent Login</Text>
          <View style={styles.formElememt}>
            <TextInput
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              style={styles.formInput}
            />
          </View>
          {errors?.email && (
            <Text style={styles.errorText}>{errors?.email}</Text>
          )}
          <View style={[styles.formElememt, styles.passwordElement]}>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={[styles.formInput, styles.passwordInput]}
            />

            {showPassword ? (
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordIcons}>
                <ShowPasswordIcon width={20} height={20} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordIcons}>
                <HidePasswordIcon width={20} height={20} />
              </Pressable>
            )}
          </View>
          {errors?.password && (
            <Text style={styles.errorText}>{errors?.password}</Text>
          )}
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.formButtonText}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.containerFooter}>
            {/* <View style={styles.footerHeading}>
              <Text style={styles.info}>I have'nt an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.info, styles.signInBtn]}> Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('VerifyAgent')
                }>
                <Text style={[styles.info, styles.signInBtn]}> Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Home', {
                    screen:'Assignments'
                  })
                }>
                <Text style={[styles.info, styles.signInBtn]}> Home</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <Text style={styles.info}>© Copyright 2022 AgentApp </Text>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
