import * as Yup from 'yup';

export const personaDetailsValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNo: Yup.string()
    .matches(/^[0-9]+$/, 'Mobile number must be numeric')
    .required('Mobile number is required'),
  // dob: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
});


export const bankDetailvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  bankname: Yup.string()
    .required('Bank name is required'),
  ifsccode: Yup.string()
    .required('IFSC code is required'),
  accountNumber: Yup.string()
    .required('Account number is required')
});

export const vechileDetailvalidationSchema = Yup.object().shape({
  vechileType: Yup.string().required('Vehicle type is required'),
  company: Yup.string().required('Company name is required'),
  model: Yup.string().required('Model name is required'),
  numberPlate: Yup.string().required('Vechile Registration Number is required'),
  dob: Yup.date().required('Date of birth is required'),
});