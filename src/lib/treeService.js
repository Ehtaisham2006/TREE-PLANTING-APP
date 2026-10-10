import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";

const TREES_COLLECTION = "trees";

// Real-time trees listen  function (Firebase live data fetch)
export const subscribeToTrees = (callback) => {
  const q = query(collection(db, TREES_COLLECTION), orderBy("createdAt", "desc"));
  
  return onSnapshot(q, (snapshot) => {
    const trees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(trees);
  });
};

// New tree Firebase Firestore add 
export const addTreeToFirebase = async (treeData) => {
  try {
    const docRef = await addDoc(collection(db, TREES_COLLECTION), {
      ...treeData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding tree to Firebase: ", error);
    throw error;
  }
};