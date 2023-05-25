import * as Yup from 'yup';

export const verifyValidationSchema = Yup.object().shape({
    businessId: Yup.string().required('Business Id is required'),
    panCardPath: Yup.string().required('PAN Card is required'),
    aadhaarCardPath: Yup.string().required('Aadhaar Card is required'),

});