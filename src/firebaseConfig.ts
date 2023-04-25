import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: 'AIzaSyDyFLorYH8PKlgxzQdqCdXchCqQnN2u-qY',

  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,

  // authDomain: 'instagram-clone-a7711.firebaseapp.com',
  // projectId: 'instagram-clone-a7711',
  // storageBucket: 'instagram-clone-a7711.appspot.com',
  // messagingSenderId: '493954406382',
  // appId: '1:493954406382:web:4612f0245872e056a820ff',
  // measurementId: 'G-G8Q5GWQBBJ',
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);

export { app, fireDb };
