import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyCb-3GUO9b3ea-tXLMFLwYDH4AxGgC4euc',
  databaseURL: 'https://react-shop-ad0b1-default-rtdb.firebaseio.com/',
});
const auth = getAuth(app);

export async function signIn(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
