import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBDAVUdsWScuRa20pAA7cSYXk-K8Zp_kLs",
  authDomain: "lockit-tdp1.firebaseapp.com",
  databaseURL: "https://lockit-tdp1.firebaseio.com",
  projectId: "lockit-tdp1",
  storageBucket: "lockit-tdp1.appspot.com",
  messagingSenderId: "351929988099",
  appId: "1:351929988099:web:db76b9c5c95b7d2fc48a36",
  measurementId: "G-2R1B6QTBRV"
}

firebase.initializeApp(config);

export function getBikeCoordinates(objectId){
  return firebase.firestore().doc("bikeCoordinates/" + objectId).get();
}

/*localStorage.availableLockers = JSON.stringify([
    {id: "1", latitude: -34.618043, longitude: -58.367896, name: "FIUBA", address: "Av. Paseo Colón 850", price: 150},
    {id: "2", latitude: -34.616489, longitude: -58.365291, name: "Starbucks (UCA)", address: "Av. Alicia Moreau de Justo 1604", price: 150},
    {id: "3", latitude: -34.615473, longitude: -58.369561, name: "Che Viejo", address: "Av. Paseo Colón 667", price: 150},
    {id: "4", latitude: -34.620704, longitude: -58.371348, name: "Starbucks", address: "Defensa 1102", price: 150}
]);*/
export async function getAvailableLockers(){
  const snapshot = await firebase.firestore().collection('availableLockers').get()
  return snapshot.docs.map(doc => doc.data());
}

/*localStorage.savedItems = JSON.stringify([
    {id: "1", name: "Mochila de Trabajo", locker: "1", status: "STORED", moveTo: undefined},
    {id: "2", name: "Comida", locker: "3", status: "STORED", moveTo: undefined}
]);*/
export async function getSavedItems(userID){
  const snapshot = await firebase.firestore()
      .collection('savedItems')
      .where("userID", "==", userID).get()
  return snapshot.docs.map(doc => doc.data());
}

export function setSavedItem(item){
  let saveItem = Object.assign({}, item);
  saveItem.locker = Object.assign({}, item.locker);
  firebase.firestore().doc('savedItems/' + item.id).set(saveItem);
}

export function login(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
