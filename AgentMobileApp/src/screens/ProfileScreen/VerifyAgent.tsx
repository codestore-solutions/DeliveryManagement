import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import styles from './ProfileStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {verifyValidationSchema} from '../../utils/validations/profileValidation';

const VerifyAgent = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUpload = (values: any) => {};
  return (
    <Formik
      initialValues={{
        businessId: '',
        panCardPath: '',
        aadhaarCardPath: '',
        otherDocumentPath: '',
      }}
      validationSchema={verifyValidationSchema}
      onSubmit={handleUpload}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.heading}>Details</Text>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <View style={styles.formElement}>
                  <TextInput
                    placeholder="Enter the BusnessId"
                    onChangeText={handleChange('businessId')}
                    onBlur={handleBlur('businessId')}
                    value={values.businessId}
                    style={styles.formInput}
                  />
                </View>
                {errors?.businessId && (
                  <Text style={styles.errorText}>{errors?.businessId}</Text>
                )}
                <View style={styles.formElement}>
                  {values.panCardPath ? (
                    <Text>{values.panCardPath}</Text>
                  ) : null}
                   <TouchableOpacity style={[styles.btnOutline, styles.btn]}  onPress={() => console.log('Pick ')}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                       Select PAN Card
                    </Text>
                  </TouchableOpacity>
                 
                </View>
                {errors?.panCardPath && (
                  <Text style={styles.errorText}>{errors?.panCardPath}</Text>
                )}
                <View style={styles.formElement}>
                  {values.aadhaarCardPath ? (
                    <Text>{values.aadhaarCardPath}</Text>
                  ) : null}
                   <TouchableOpacity style={[styles.btnOutline, styles.btn]}  onPress={() => console.log('Pick ')}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                       Select AadharCard
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors?.aadhaarCardPath && (
                  <Text style={styles.errorText}>
                    {errors?.aadhaarCardPath}
                  </Text>
                )}
                <View style={styles.formElement}>
                  {values.otherDocumentPath ? (
                    <Text>{values.otherDocumentPath}</Text>
                  ) : null}
                 <TouchableOpacity style={[styles.btnOutline, styles.btn]}  onPress={() => console.log('Pick ')}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                        Other Documents
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors?.otherDocumentPath && (
                  <Text style={styles.errorText}>
                    {errors?.otherDocumentPath}
                  </Text>
                )}
              </View>
              <View style={[styles.butttonElements]}>
                <View style={styles.btnWidth}>
                  <TouchableOpacity style={styles.btnOutline}>
                    <Text style={{color: '#E74C43', textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnWidth}>
                  <TouchableOpacity style={[styles.btnOutline, styles.btn]}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Verify Me
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={{color: '#E74C43', textAlign: 'center'}}>
                  {' '}
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default VerifyAgent;
