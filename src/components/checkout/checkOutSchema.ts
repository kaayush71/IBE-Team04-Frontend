import * as yup from "yup";

export const travelerInfoSchema = yup
  .object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().optional(),
    phone: yup
      .string()
      .trim()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    email: yup.string().trim().email("Email is not valid").required("Email is required"),
  })
  .required();

export const billingInfoSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().optional(),
    mailingAddress1: yup.string().required("Address is required"),
    mailingAddress2: yup.string().optional(),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup
      .string()
      .matches(/^\d{6}(?:[-\s]\d{4})?$/, "Zip code is not valid")
      .required("Zip code is required"),
    phone: yup
      .string()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    email: yup.string().email("Email is not valid").required("Email is required"),
  })
  .required();

export const paymentInfoSchema = yup.object({
  cardNumber: yup
    .string()
    .length(19, "Please enter valid card number")
    .matches(/^(\d{4}-){3}\d{4}$/, 'Card number must have "-" after every 4 digits')
    .required("Card number is required"),
  expMM: yup
    .string()
    .length(2, "Please enter valid expiry month")
    .matches(/^(0[1-9]|1[0-2])$/, "Expiry month is not valid")
    .required("Expiry month is required"),
  expYY: yup
    .string()
    .length(2, "Please enter valid expiry year")
    .matches(/^([0-9]{2})$/, "Expiry year is not valid")
    .required("Expiry year is required"),
  cvv: yup
    .string()
    .length(3, "Please enter 3 digit number")
    .matches(/^[0-9]{3,4}$/, "CVV is not valid")
    .required("CVV is required"),
  specialDeal: yup.boolean().oneOf([true, false]),
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
});
