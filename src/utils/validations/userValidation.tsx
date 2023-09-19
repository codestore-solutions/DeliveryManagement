import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().trim()
    .matches(/^\S+@\S+\.\S+\s*$/, 'Invalid email address')
    .required('Email is required'),
  password: Yup.string().trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


export const personaDetailsValidation = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  // mobileNo: Yup.string()
  //    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
  //   .required('Mobile number is required').min(10).max(12),
  dob: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().trim().required('Address is required'),
  profileImage: Yup.string().required('Profile Image  is required'),
});


export const bankDetailValidationSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters')
    .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid characters in Name'),
  
  bankname: Yup.string().trim()
    .required('Bank name is required')
    .max(50, 'Bank name must be at most 50 characters')
    .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid characters in Bank name'),

  ifsccode: Yup.string().trim()
    .required('IFSC code is required')
    .max(50, 'IFSC code must be at most 50 characters')
    .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid characters in IFSC code'),

  accountNumber: Yup.string().trim()
    .required('Account number is required')
    .max(50, 'Account number must be at most 50 characters')
    .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid characters in Account number'),
});


export const vehicleDetailValidationSchema = Yup.object().shape({
  // vehicleType: Yup.string()
  //   .required('Vehicle type is required'),

  company: Yup.string().trim()
    .required('Company name is required')
    .max(25, 'Company name must be at most 25 characters')
    .min(1, 'Company name must be at least 1 character'),

  manufacturedYear: Yup.string().trim()
    .required('Manufactured year is required')
    .max(10, 'Manufactured year must be at most 10 characters')
    .min(4, 'Manufactured year must be at least 4 characters'),

  model: Yup.string().trim()
    // .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid model name')
    .required('Model name is required')
    .max(25, 'Model name must be at most 25 characters')
    .min(1, 'Model name must be at least 1 character'),

  image: Yup.string()
    // .matches(/^https?:\/\/[A-Za-z0-9:/.? -]+$/, 'Invalid URL format')
    .required('Vehicle image URL is required'),


  registrationNumber: Yup.string().trim()
    // .matches(/^[A-Za-z0-9.:,/ -]+$/, 'Invalid registration number')
    .required('Vehicle Registration Number is required')
    .max(25, 'Registration number must be at most 25 characters'),
  
});
