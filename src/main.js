import { createApp } from "vue";

import Profile from "./Profile.vue";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbgiq3M74emLIfjNSTOOQz6JCkiZgqKxU",
  authDomain: "nbprofile-a12f8.firebaseapp.com",
  databaseURL:
    "https://nbprofile-a12f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nbprofile-a12f8",
  storageBucket: "nbprofile-a12f8.appspot.com",
  messagingSenderId: "863529157280",
  appId: "1:863529157280:web:4d80d8f967055fd903bfc5",
  measurementId: "G-4H67XQ0FC6",
};

initializeApp(firebaseConfig);

const app = createApp(Profile);

app.mount("#app");
