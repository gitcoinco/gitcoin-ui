import { setupDB } from "./setupDB";

export const deleteFormValues = async (keys: string[]) => {
  const dbName = "formDB";
  const storeName = "formDrafts";

  try {
    const db = await setupDB(dbName, storeName);
    for (const key of keys) {
      await db.delete(storeName, key);
    }
  } catch (error) {
    console.error("Error deleting values from IndexedDB:", error);
  }
};
