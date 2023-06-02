import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './SignupStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import globalStyle from '../../global/globalStyle';
import {LogoImg, ShowPasswordIcon, HidePasswordIcon} from '../../assets';
import {Formik} from 'formik';
import {SignupValidationSchema} from '../../utils/validations/authValidation';
import userAuthServices from '../../services/userAuthService';


const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConformPassword, setShowConformPassword] =
    useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const signupHandler = (values: any) => {
    console.log('values', values);
    let instance = userAuthServices.getInstance();
    instance.registerUser(values);  
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        countryCode: '',
        confirmPassword: '',
        contact: '',
      }}
      validationSchema={SignupValidationSchema}
      onSubmit={values => signupHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[styles.formSection, globalStyle.container]}>
          <View style={styles.logoSection}>
            <Image source={LogoImg} style={styles.loginPageLogo} />
          </View>
          <Text style={styles.formHeading}>Agent Sign Up</Text>
          <View style={styles.formElememt}>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
              style={styles.formInput}
            />
          </View>
          {errors?.name && <Text style={styles.errorText}>{errors?.name}</Text>}
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
          <View style={[styles.formElememt, styles.phoneStyle]}>
            <TextInput
              onChangeText={handleChange('countryCode')}
              onBlur={handleBlur('countryCode')}
              value={values.countryCode}
              placeholder="+91"
              style={[styles.formInputcode, styles.countryInput]}
            />
            <TextInput
              onChangeText={handleChange('contact')}
              onBlur={handleBlur('contact')}
              value={values.contact}
              placeholder="Phone No"
              style={[styles.formInputNumber, styles.contactInput]}
            />
          </View>
          {errors?.contact && (
            <Text style={styles.errorText}>{errors?.contact}</Text>
          )}
          {errors?.countryCode && (
            <Text style={styles.errorText}>{errors?.countryCode}</Text>
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
          <View style={[styles.formElememt, styles.passwordElement]}>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Conform Password"
              secureTextEntry={!showConformPassword}
              style={[styles.formInput, styles.passwordInput]}
            />
            {showConformPassword ? (
              <Pressable
                onPress={() => setShowConformPassword(!showConformPassword)}
                style={styles.passwordIcons}>
                <ShowPasswordIcon width={20} height={20} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setShowConformPassword(!showConformPassword)}
                style={styles.passwordIcons}>
                <HidePasswordIcon width={20} height={20} />
              </Pressable>
            )}
          </View>
          {errors?.confirmPassword && (
            <Text style={styles.errorText}>{errors?.confirmPassword}</Text>
          )}
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.formButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.containerFooter}>
            <View style={styles.footerHeading}>
              <Text style={styles.info}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.info, styles.signInBtn]}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.info}>© Copyright 2022 AgentApp </Text>
        </View>
      )}
    </Formik>
  );
};

export default SignupScreen;
