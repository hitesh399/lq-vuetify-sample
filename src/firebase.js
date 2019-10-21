import firebase from 'firebase/app'
import 'firebase/messaging';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCC071nsX1yOBGVW_j-CqBbse6ZTcoxeT8",
  authDomain: "lq-vuetify-sample.firebaseapp.com",
  databaseURL: "https://lq-vuetify-sample.firebaseio.com",
  projectId: "lq-vuetify-sample",
  storageBucket: "lq-vuetify-sample.appspot.com",
  messagingSenderId: "272460278301",
  appId: "1:272460278301:web:1a398ad9048f3f9487f4f4",
  measurementId: "G-SR164XWHTE"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.usePublicVapidKey(currentPortal.get('VUE_APP_FIREBASE_KEYPAIR')); // 1. Generate a new key pair

export default {
  messaging
}