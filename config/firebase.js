import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyBNcAGfIbrRDixfHoCBHcVwbY5Yj05LUc8',
//   authDomain: 'quizapp-2a1cc.firebaseapp.com',
//   projectId: 'quizapp-2a1cc',
//   storageBucket: 'quizapp-2a1cc.appspot.com',
//   messagingSenderId: '816117472177',
//   appId: '1:816117472177:web:ae49f4da55438cf4a57b90',
//   measurementId: 'G-VWJ4Z8BDWN',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBBha89PPBWeSkyUaHlJ9m3ePqEsWWWUpQ',
  authDomain: 'mad-project-d6af7.firebaseapp.com',
  databaseURL: 'https://mad-project-d6af7-default-rtdb.firebaseio.com',
  projectId: 'mad-project-d6af7',
  storageBucket: 'mad-project-d6af7.appspot.com',
  messagingSenderId: '668118336886',
  appId: '1:668118336886:web:c1556890759c27922c2657',
  measurementId: 'G-3DZDHV5GM7',
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
} else {
  Firebase = firebase.app();
}

export default Firebase;
