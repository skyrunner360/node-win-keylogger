import { initializeApp } from "firebase/app";
import { getDatabase, ref,  set } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_DB_URL,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MSG_ID,
    appId: process.env.FIRE_APP_ID,
    measurementId: process.env.FIRE_MEASURE_ID
  };

initializeApp(firebaseConfig)

export const writeUserData= async(userId, filePath,fileName,word,machineName) =>{
  const db = getDatabase();
  await set(ref(db, 'users/' + userId), {
    filePath,
    fileName,
    word,
    machineName,
    createdAt: new Date().toLocaleString(),
  });
}