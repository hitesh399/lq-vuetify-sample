import firebase from 'firebase/app'
import 'firebase/messaging';

var config = {
    apiKey: "AIzaSyCC071nsX1yOBGVW_j-CqBbse6ZTcoxeT8",
    authDomain: "lq-vuetify-sample.firebaseapp.com",
    databaseURL: "https://lq-vuetify-sample.firebaseio.com",
    projectId: "lq-vuetify-sample",
    storageBucket: "lq-vuetify-sample.appspot.com",
    messagingSenderId: "272460278301",
    appId: "1:272460278301:web:1a398ad9048f3f9487f4f4",
    measurementId: "G-SR164XWHTE"
  }; // 4. Get Firebase Configuration
  firebase.initializeApp(config);
  
  const messaging = firebase.messaging();
  
  messaging.usePublicVapidKey("BMua41RLI2pJq6MFSyswl3CG0VUVNjN25MztVvu5OKLwcZxvHcAp53FpDOsPl_jAgjN8yoKv2CiKyC180Dcq9FU"); // 1. Generate a new key pair
  
  export default {
    messaging
  }