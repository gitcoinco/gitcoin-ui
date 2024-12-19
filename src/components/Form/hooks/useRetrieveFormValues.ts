import { setupDB } from "../utils/setupDB";

const dbName = "formDB";
const storeName = "formDrafts";

export const useRetrieveFormValues = async (persistKey: string) => {
  try {
    const db = await setupDB(dbName, storeName);
    const values = await db.get(storeName, persistKey);
    return values;
  } catch (error) {
    console.error("Error retrieving values from IndexedDB:", error);
    return null;
  }
};
