import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import styles from './VerifyStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {verifyValidationSchema} from '../../utils/validations/profileValidation';
import agentServices from '../../services/agentServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Userheplers } from '../../utils/helpers/user';
interface PayloadInterface{
  businessId: number,
  id: number
}
const VerifyScreen = () => {
  const[loading, setLoading]  = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const verifyAgentHandler =  (values: any) => {
    let user = Userheplers.retrieveUser();
    console.log('Values', user);
    let payload: PayloadInterface = {
      businessId: Number(values?.businessId),
      id: Number(user.id)
  };
    let instance = agentServices.getInstance();
    setLoading(true);
    instance.verifyAgent(payload).then(res => setLoading(false));
    

  };
  return (
    <Formik
      initialValues={{
        businessId: '',
        panCardPath: '',
        aadhaarCardPath: '',
        otherDocumentPath: '',
      }}
      validationSchema={verifyValidationSchema}
      onSubmit={verifyAgentHandler}>
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
                  <TouchableOpacity
                    style={[styles.btnOutline, styles.btn]}
                    onPress={() => console.log('Pick ')}>
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
                  <TouchableOpacity
                    style={[styles.btnOutline, styles.btn]}
                    onPress={() => console.log('Pick ')}>
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
                  <TouchableOpacity
                    style={[styles.btnOutline, styles.btn]}
                    onPress={() => console.log('Pick ')}>
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
                  <TouchableOpacity
                    style={[styles.btnOutline, styles.btn]}
                    disabled={loading}
                    onPress={handleSubmit}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                       {loading ?  <ActivityIndicator size="small" color="#fff" /> : "Verify Me"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default VerifyScreen;
