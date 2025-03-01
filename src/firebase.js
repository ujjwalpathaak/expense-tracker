import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to get the collection name based on month & year
const getMonthCollection = (date) => {
  const expenseDate = new Date(date);
  const year = expenseDate.getFullYear();
  const month = expenseDate.toLocaleString("default", { month: "long" }); // "January", "February", etc.
  return `${month}-${year}`; // Example: "March-2025"
};

export const fetchAvailableMonths = async () => {
  const collections = await getDocs(collection(db, "expenses"));
  return collections.docs.map((doc) => doc.id); // Returns array of month names (e.g., ["January-2025", "February-2025"])
};

// Firestore functions
export const addExpense = async (expense) => {
  try {
    const collectionName = getMonthCollection(expense.date);
    await addDoc(collection(db, collectionName), expense);
  } catch (error) {
    console.error("Error adding expense:", error);
  }
};

export const fetchExpenses = async (monthYear) => {
  try {
    const snapshot = await getDocs(collection(db, monthYear));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};

export const deleteExpense = async (id, monthYear) => {
  try {
    const expenseRef = doc(db, monthYear, id);
    await deleteDoc(expenseRef);
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

export { db };