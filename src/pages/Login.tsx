import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useFormik } from 'formik';

import { app, fireDb } from '../firebaseConfig';
import { signUpSchema } from '../schemas/index';

function Login() {
  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    // eslint-disable-next-line object-shorthand
    initialValues: initialValues,

    validationSchema: signUpSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: App.jsx ~ line 17 ~ App ~ values', values);
    },
  });

  const navigate = useNavigate();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDb, 'users', user.uid)).then((user) => {
          localStorage.setItem('Instagram-clone', JSON.stringify({ ...user.data(), id: user.id }));
        navigate('/home');
        });

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
              aria-label="Enter your email address"
              className="login_username"
              name="email"
              placeholder="Email address"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="form-error">{formik.errors.email}</p>
            <input
              aria-label="Enter your password"
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
            <button className="login_btn" type="submit" onClick={handleClick}>
              LogIn
            </button>
          </form>
        </div>
        <div className="login_acct">
          <p className="dont_signip">
            Don't have an account?{` `}
            <Link className="login_signup" to="/Signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
