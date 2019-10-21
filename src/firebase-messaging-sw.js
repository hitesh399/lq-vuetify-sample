importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/img/favicon-16x16.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});