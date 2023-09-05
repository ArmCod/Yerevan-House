import * as Yup from "yup";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const formingValidateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .min(5, "Must be 5-20 characters or less")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(5, "Must be 5-20 characters or less")
    .max(20, "Must be 20 characters or less"),
  secondPhoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(5, "Must be 5-20 characters or less")
    .max(20, "Must be 20 characters or less"),
  secondEmail: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
});



export const getPartnerValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .min(5, "Must be 5-20 characters or less")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]*$/, "Invalid phone number"),
  countryCode: Yup.string().required("Country code is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  price: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  type: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  streat: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  city: Yup.number().required("Required"),
  saleType: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  currencyType: Yup.string()
    .min(2, "Must be 5-15 characters or less")
    .max(15, "Must be 5-15 characters or less")
    .required("Required"),
  hoodType: Yup.number().required("Required"),
  houseNumber: Yup.number()
    .min(1, "Must be 1-200 characters or less")
    .max(200, "Must be 5-15 characters or less"),
  appartementNumber: Yup.number()
    .min(1, "Must be 1-200 characters or less")
    .max(200, "Must be 1-200 characters or less"),
});
