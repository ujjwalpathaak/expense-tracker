import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

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

const formatMonth = (monthString) => {
  const [year, month] = monthString.split("-");
  const date = new Date(year, month - 1); // Month is 0-based in JS Date
  return date.toLocaleString("en-US", { month: "long", year: "numeric" }).replace(" ", "-");
};

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

export const fetchExpenses = async (currentMonth) => {
  try {
    console.log("Fetching expenses for", getMonthCollection(currentMonth));
    const snapshot = await getDocs(collection(db, getMonthCollection(currentMonth)));
    console.log("Fetched expenses successfully", snapshot.docs);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return [];
  }
};


export const deleteExpense = async (id) => {
  try {
    const collectionName = getMonthCollection(new Date());

    if (typeof collectionName !== "string") {
      console.error("Invalid collection name:", collectionName);
      return { success: false, error: "Invalid collection name" };
    }

    // Query Firestore to find the document with the matching 'id' field
    const q = query(collection(db, collectionName), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`No document found with id: ${id}`);
      return { success: false, error: "Document not found" };
    }

    // Delete all matching documents
    querySnapshot.forEach(async (docSnap) => {
      const expenseRef = doc(db, collectionName, docSnap.id);
      await deleteDoc(expenseRef);
    });

    console.log(`Expense with id ${id} deleted successfully`);
    return { success: true };

  } catch (error) {
    console.error(`Error deleting expense (ID: ${id}):`, error);
    return { success: false, error };
  }
};

export { db };