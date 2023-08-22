import * as Yup from 'yup';

export const addAddresschema = Yup.object().shape({
  location: Yup.string().required(),
  address: Yup.string().required(),
  dayAndtime: Yup.object()
    .shape({
      days: Yup.array().of(Yup.string()).required(),
      timeSlotIds:Yup.array().of(Yup.string()).required(),
    })
    .required(),
});
