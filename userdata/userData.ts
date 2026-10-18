import { randomUUID } from 'crypto';

export const userData = {
  firstName: 'Test',
  lastName: 'User',
  dob: '2002-05-07',
  country: 'LK',
  postalCode: '10510',
  houseNumber: '52',
  phone: '0781234567',
  email: `${randomUUID()}@example.com`,   // new unique email on every run
  password: 'Sangeeth213#',
  street: "Galle Road",
    city: "Moratuwa",
    state: "Western",

  // for negative and login tests later
  existingEmail: 'customer@practicesoftwaretesting.com', 
    // the site's public demo account
    invalidFormatEmail: 'invalid-email',
  existingPassword: 'welcome01',
  weakPassword: 'abc',
  invalidEmail: 'abc@',
  wrongPassword: 'Wrong@1234',
  futureDob: "2027-07-07",
  notAdultDob: "2010-01-01",
      shortPassword: "Ab@1xyz",
        unregisteredEmail: 'nouser.qa.test@example.com',

        upperCaseEmail: 'CUSTOMER@PRACTICESOFTWARETESTING.COM',
  emailWithSpaces: '  customer@practicesoftwaretesting.com  ',
  wrongCasePassword: 'WELCOME01',
     
};