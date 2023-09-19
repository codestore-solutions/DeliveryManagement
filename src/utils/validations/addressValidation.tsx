import * as Yup from 'yup';

export const addAddresschema = Yup.object().shape({
  location: Yup.string()
    .trim() // Trim whitespace
    .required('Location Name is required'),
  address: Yup.string()
    .trim() // Trim whitespace
    .required('Address is required'),
  dayAndtime: Yup.object()
    .shape({
      days: Yup.array().min(1, 'Please select at least one day'),
      timeSlotIds: Yup.array().min(1, 'Please select at least one time slot'),
    })
    .required('Please select the day & timeslot'),
});
