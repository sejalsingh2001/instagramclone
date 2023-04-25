import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';

import { app, fireDb } from '../firebaseConfig';
import { signUpSchema } from '../schemas/index';

function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    username: '',
  };

  const formik = useFormik({
    initialValues,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: App.jsx ~ line 17 ~ App ~ values', values);
    },
  });

  const register = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          profilePicture: '',
          bio: 'Hi, Im using Instagram',
        };
        setDoc(doc(fireDb, 'users', user.uid), userData);

        navigate('/home');
      })
      .catch();
  };
  useEffect(() => {
    if (localStorage.getItem('Instagram-clone')) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="container_login">
      <div className="login_img">
        <img alt="iphone with instagram" src="/assets/iphone-with-profile.jpeg" />
      </div>
      <div className="login_form">
        <div className="row">
          <h1 className="insta_logo">
            <img alt="instagram" className="insta_logo1" src="/assets/logo.png" />
          </h1>

          <form>
            <input
              aria-label=" Username"
              className="login_username"
              name="username"
              placeholder="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <p className="form-error">{formik.errors.username}</p>
            <input
              aria-label="Email address"
              className="login_username"
              name="email"
              placeholder="Email address"
              type="text"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="form-error">{formik.errors.email}</p>
            <input
              aria-label="Password"
              className="login_password"
              name="password"
              placeholder="Password"
              type="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="form-error">{formik.errors.password}</p>
            <button className="login_btn" type="submit" onClick={register}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="login_acct">
          <p className="dont_signip">
            Have an account?{` `}
            <Link className="login_signup" to="/">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
