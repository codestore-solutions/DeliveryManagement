import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import globalStyle from '../../global/globalStyle';
import CustomTextInput from '../common/CustomInput/CustomTextInput';
import DateInput from '../common/CustomDateInput/DateInput';
import CustomButton from '../common/CustomButton/CustomButton';
import {personaDetailsValidation, vechileDetailvalidationSchema} from '../../utils/validations/userValidation';
import styles from './VechileStyle';
import {UploadIcon} from '../../assets';

interface Props {
  onCancel: () => void;
}

const VechileDetailsForm: React.FC<Props> = ({onCancel}) => {
  const handleDateChange = (handleChange: any, date: any) => {
    // Custom logic for handling date changes
    console.log('Selected date:', date);
    handleChange('dob')(date);
    // Update the state or perform any other necessary operations
  };

  const submitHandler = (values: any) => {
    console.log('values', values);
  };
  return (
    <Formik
      initialValues={{
        vechileType: '',
        company: '',
        model: '',
        numberPlate: '',
        dob: '',
        image: '',
      }}
      validationSchema={vechileDetailvalidationSchema}
      onSubmit={values => submitHandler(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={[globalStyle.container, styles.formContainer]}>
          <ScrollView style={{marginBottom:60}}>
            <CustomTextInput
              placeholder={'ComboBox'}
              label={'Vehicle Type'}
              name={'vechileType'}
              value={values.vechileType}
              onChangeText={text => handleChange('vechileType')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: Hero'}
              label={'Company Name'}
              value={values.company}
              name={'company'}
              onChangeText={text => handleChange('company')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: 2013'}
              label={'Model'}
              name={'model'}
              value={values.model}
              onChangeText={text => handleChange('model')(text)}
              errors={errors}
            />
            <CustomTextInput
              placeholder={'Eg: 123sddsd'}
              label={'Registration Number'}
              name={'numberPlate'}
              value={values.numberPlate}
              onChangeText={text => handleChange('numberPlate')(text)}
              errors={errors}
            />
            <DateInput
              label={'D.O.B'}
              value={values.dob}
              handleChange={handleChange}
              onChange={handleDateChange}
              
            />
            <View style={styles.image}>
              <Text style={styles.label}>Vehicle Image</Text>
              <View style={styles.imageConatiner}>
                <UploadIcon width={70} height={70} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.lower}>
            <View style={styles.btnConatiner}>
              <View style={{width: '50%'}}>
                <CustomButton title={'Add Details'} onPress={handleSubmit} />
              </View>
              <View style={{width: '50%'}}>
                <CustomButton
                  title={'Cancel'}
                  outline={true}
                  onPress={onCancel}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default VechileDetailsForm;
