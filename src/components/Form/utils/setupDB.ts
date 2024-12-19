import { openDB } from "idb";

export const setupDB = async (dbName: string, storeName: string) => {
  try {
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      },
    });
    return db;
  } catch (error) {
    console.error("Error setting up IndexedDB:", error);
    throw error;
  }
};
