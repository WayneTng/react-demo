import firebase from 'firebase/app'
require('firebase/database')

let config = {
    apiKey: "AIzaSyAY3rPi3ZEVhFir8C9Bjtnu1B-XyLWR-_o",
    authDomain: "catch-of-the-day-e58d9.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-e58d9.firebaseio.com"
};

firebase.initializeApp(config);

const database = firebase.database()
export default database
