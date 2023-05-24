import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './ProfileStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import globalStyle from '../../global/globalStyle';
import {
  LogoImg,
  ShowPasswordIcon,
  HidePasswordIcon,
  UploadIcon,
} from '../../assets';
import {Formik} from 'formik';
import {profileValidationSchema} from '../../utils/validations/profileValidation';
import * as ImagePicker from 'react-native-image-picker';

const AddUpdateProfile = () => {
  const [file, setFile] = useState<any>(null);
  let options = {
    mediaType: 'photo',
    quality: 1,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const chooseFile = () => {
    ImagePicker.launchImageLibrary(options, function (result) {
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorMessage) {
        console.log(
          'ImagePicker Error: ',
          result.errorMessage + ' ' + result.errorCode,
        );
      } else {
        setFile(result.assets);
      }
    });
  };

  const profileHandler = (values: any) => {};
  return (
    <Formik
      initialValues={{
        name: '',
        mobileNumber: '',
        alternateMobileNumber: '',
        address: '',
        pinCode: '',
        district: '',
        state: '',
        location: null,
        maxServiceDistance: '0',
        documnet: null,
      }}
      validationSchema={profileValidationSchema}
      onSubmit={values => profileHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.heading}>Complete Your Profile</Text>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <View style={styles.formElement}>
                  <View style={styles.avatar}>
                    <Pressable style={styles.uploadIcon} onPress={chooseFile}>
                      <UploadIcon width={30} height={30} />
                    </Pressable>
                    {file && (
                      <Pressable onPress={chooseFile}>
                        <Image
                          source={{
                            uri: file[0].uri,
                          }}
                          style={styles.avatarImg}
                        />
                      </Pressable>
                    )}
                  </View>
                  <Text>Upload Profile Image</Text>
                </View>
                <View style={styles.formElement}>
                  <TextInput
                    placeholder="Enter Your Name.."
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    style={styles.formInput}
                  />
                </View>
                {errors?.name && <Text style={styles.errorText}>{errors?.name}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('mobileNumber')}
                    onBlur={handleBlur('mobileNumber')}
                    value={values.mobileNumber}
                    placeholder="Mobile Number"
                    style={styles.formInput}
                  />
                </View>
                {errors?.mobileNumber && <Text style={styles.errorText}>{errors?.mobileNumber}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    placeholder="Address"
                    style={styles.formInput}
                  />
                </View>
                {errors?.address && <Text style={styles.errorText}>{errors?.address}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('alternateMobileNumber')}
                    onBlur={handleBlur('alternateMobileNumber')}
                    value={values.alternateMobileNumber}
                    placeholder="Mobile Number"
                    style={styles.formInput}
                  />
                </View>
                {errors?.alternateMobileNumber && <Text style={styles.errorText}>{errors?.alternateMobileNumber}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('pinCode')}
                    onBlur={handleBlur('pinCode')}
                    value={values.pinCode}
                    placeholder="Postal Code"
                    style={styles.formInput}
                  />
                </View>
                {errors?.pinCode && <Text style={styles.errorText}>{errors?.pinCode}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('district')}
                    onBlur={handleBlur('district')}
                    value={values.district}
                    placeholder="district"
                    style={styles.formInput}
                  />
                </View>
                {errors?.district && <Text style={styles.errorText}>{errors?.district}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    value={values.state}
                    placeholder="State"
                    style={styles.formInput}
                  />
                </View>
                {errors?.state && <Text style={styles.errorText}>{errors?.state}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    // value={values.location}
                    placeholder="location"
                    style={styles.formInput}
                  />
                </View>
                {errors?.location && <Text style={styles.errorText}>{errors?.location}</Text>}
                <View style={styles.formElement}>
                  <TextInput
                    onChangeText={handleChange('maxServiceDistance')}
                    onBlur={handleBlur('maxServiceDistance')}
                    value={values.maxServiceDistance}
                    placeholder="MaxServiceDistance eg: 10 kms"
                    style={styles.formInput}
                  />
                </View>
                {errors?.maxServiceDistance && <Text style={styles.errorText}>{errors?.maxServiceDistance}</Text>}
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
                      Save
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

export default AddUpdateProfile;
