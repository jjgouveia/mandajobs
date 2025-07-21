import { db } from "../utils/firebaseConfig"; // Import Firestore
import { collection, getCountFromServer } from "firebase/firestore"; // Import Firestore functions

const getQueriesCount = async (callback: Function): Promise<void | null> => {
  try {
    const collectionRef = collection(db, "queries");
    const snapshot = await getCountFromServer(collectionRef);
    const count = snapshot.data().count;
    callback(count);
  } catch (error) {
    console.error("Error getting queries count from Firestore: ", error);
    return null;
  }
};

export default getQueriesCount;
