import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
      alternateMobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    address: Yup.string().required('Address is required'),
    pinCode: Yup.string()
      .required('Pin code is required')
      .matches(/^[0-9]{6}$/, 'Invalid pin code'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    location: Yup.object()
      .nullable()
      .required('Location is required'),
    maxServiceDistance: Yup.number()
      .typeError('Max service distance must be a number')
      .min(0, 'Max service distance must be a positive number or zero'),
    documnet: Yup.mixed().nullable().required('Document is required'),
});