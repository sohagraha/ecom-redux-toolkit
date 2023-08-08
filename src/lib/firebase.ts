import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,

  apiKey: 'AIzaSyBHQWxlGYTaOUG8GFdS7l1a5UcEkQr_fPY',
  authDomain: 'ecom-redux-11a34.firebaseapp.com',
  projectId: 'ecom-redux-11a34',
  storageBucket: 'ecom-redux-11a34.appspot.com',
  messagingSenderId: '799053363839',
  appId: '1:799053363839:web:87dc52dc6c43fda3d1dd4a',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
