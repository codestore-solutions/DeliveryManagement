import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import styles from './LoginStyle';
import {LogoDark, InputEmailIcon, InputEyeOffIcon} from '../../assets';
import {loginValidationSchema} from '../../utils/validations/userValidation';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {RootState} from '../../store';
import {loginUser} from '../../store/features/authSlice';
import {loginPayload} from '../../utils/types/UserTypes';
import { Pressable } from 'react-native';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginHandler = (values: any) => {
    let payload: loginPayload = {
      username: values?.email,
      password: values?.password,
    };
    console.log("p", payload);
    dispatch(loginUser(payload));
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={loginHandler}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.icon}>
              <LogoDark width={85} height={85} />
            </View>
            <Text style={styles.heading}>Sign In</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formElement}>
              <TextInput
                style={styles.formInput}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <InputEmailIcon width={20} height={20} />
            </View>
            {errors && <Text style={styles.errorMessage}>{errors.email}</Text>}
            <View style={styles.formElement}>
              <TextInput
                style={styles.formInput}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <InputEyeOffIcon width={20} height={20} />
              </Pressable>
            </View>
            {errors && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
            <View style={styles.formtag}>
              <View />
              <Text style={styles.formText}>Forgot Password?</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              disabled={loading}
              onPress={handleSubmit}>
              <Text style={styles.btnTxt}>Login</Text>
              {loading && <ActivityIndicator size="small" color="#fff" />}
            </TouchableOpacity>
            {/* <Toast /> */}
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
