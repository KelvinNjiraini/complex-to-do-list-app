import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDPyIyYCXRd0SWyZP9ieFhSEhJFFrodTIw',
    authDomain: 'complex-to-do.firebaseapp.com',
    projectId: 'complex-to-do',
    storageBucket: 'complex-to-do.appspot.com',
    messagingSenderId: '685189555829',
    appId: '1:685189555829:web:8c9e97a724475f45fbfa3c',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const activitiesRef = db.ref('activities');
