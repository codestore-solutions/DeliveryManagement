import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import styles from './CreateProfileStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface PayloadInterface{
  businessId: number,
  id: number
}
const CreateProfile = () => {
  const[loading, setLoading]  = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const verifyAgentHandler =  (values: any) => {};
    
  return (
    <Formik
      initialValues={{
        businessId: '',
        panCardPath: '',
        aadhaarCardPath: '',
        otherDocumentPath: '',
      }}
      validationSchema=""
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
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default CreateProfile;
