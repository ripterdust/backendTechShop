const firebase = require('firebase')
import {firebaseConfig} from './firebaseConfig';

export const db = firebase.initializeApp(firebaseConfig);



