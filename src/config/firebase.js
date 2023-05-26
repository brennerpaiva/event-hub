import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDGdefbtE47b4R19u-2GV-ERn9KdZMgXDU",
    authDomain: "event-hub-e15c0.firebaseapp.com",
    projectId: "event-hub-e15c0",
    storageBucket: "event-hub-e15c0.appspot.com",
    messagingSenderId: "582924021988",
    appId: "1:582924021988:web:f5f24bab08e88d31e8bcf1",
    measurementId: "G-6NE2WZ5393"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp) 
  export { db, auth, storage };
