import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  username: Yup.string().min(2).required('Please enter your username'),
});
