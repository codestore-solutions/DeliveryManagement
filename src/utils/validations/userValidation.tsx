import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


export const personaDetailsValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  code: Yup.string().required('Country Code is required'),
  mobileNo: Yup.string()
    .matches(/^[0-9]+$/, 'Mobile number must be numeric')
    .required('Mobile number is required').min(10).max(12),
  // dob: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
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

export const vehicleDetailValidationSchema = Yup.object().shape({
  vehicleType: Yup.string().required('Vehicle type is required'),
  company: Yup.string().matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid company name').required('Company name is required'),
  manufacturedYear: Yup.string().matches(/^[0-9]+$/, 'Invalid  manufacturedYear year').required('Company name is required'),
  model: Yup.string().matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid model name').required('Model name is required'),
  numberPlate: Yup.string().required('Number Plate Details is required'),
  registrationNumber: Yup.string().required('Vehicle Registration Number is required'),
});