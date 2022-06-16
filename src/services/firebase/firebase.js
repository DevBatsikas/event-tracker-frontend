// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyDN-24qN0CakivNXH15D26k53gwhJ87iRY',

  authDomain: 'event-tracker-4bebe.firebaseapp.com',

  projectId: 'event-tracker-4bebe',

  storageBucket: 'event-tracker-4bebe.appspot.com',

  messagingSenderId: '732743565272',

  appId: '1:732743565272:web:0d76a432b9df0f28ffbcad',

  measurementId: 'G-2QZYC812XR',
};

// Initialize Firebase

export default initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
