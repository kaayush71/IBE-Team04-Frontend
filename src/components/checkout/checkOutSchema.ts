import * as yup from "yup";

export const travelerInfoSchema = yup.object().shape({
  travellerFirstName: yup
    .string()
    .trim()
    .required("First name is required")
    .matches(/^[a-z ,.'-]+$/i, "Please enter valid firstname"),
  travellerLastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .matches(/^[a-z ,.'-]+$/i, "Please enter valid lastname"),
  travellerPhoneNumber: yup
    .string()
    .trim()
    .length(10, "Please enter 10 digit phone number")
    .required("Phone number is required")
    .matches(/^(?![0])[0-9]{10}$/, "Phone number is not valid"),
  travellerEmail: yup.string().trim().email("Email is not valid").required("Email is required"),
});

export const billingInfoSchema = yup.object().shape({
  billingFirstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-z ,.'-]+$/i, "Please enter valid firstname"),
  billingLastName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-z ,.'-]+$/i, "Please enter valid lastname"),

  billingMailingAddress1: yup.string().required("Address is required"),
  billingMailingAddress2: yup.string().optional(),
  billingCountry: yup.string().required("Country is required"),
  billingCity: yup.string().required("City is required"),
  billingState: yup.string().required("State is required"),
  billingZip: yup
    .string()
    .matches(/^\d{6}(?:[-\s]\d{4})?$/, "Zip code is not valid")
    .required("Zip code is required"),
  billingPhoneNumber: yup
    .string()
    .length(10, "Please enter 10 digit phone number")
    .matches(/^(?![0])[0-9]{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  billingEmail: yup.string().email("Email is not valid").required("Email is required"),
});

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
    .test("expiration-month", "Expiry month is not valid", function (value: any) {
      const currentMonth = new Date().getMonth() + 1;
      const selectedMonth = parseInt(value, 10);
      if (selectedMonth < currentMonth) {
        return false;
      }
      return true;
    })
    .required("Expiry month is required"),
  expYY: yup
    .string()
    .length(2, "Please enter valid expiry year")
    .matches(/^([2-9][3-9])$/, "Expiry year is not valid")
    .required("Expiry year is required"),
  cvv: yup
    .string()
    .length(3, "Please enter 3 digit number")
    .matches(/^[0-9]{3,4}$/, "CVV is not valid")
    .required("CVV is required"),
  specialDeal: yup.boolean().oneOf([true, false]),
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
});
