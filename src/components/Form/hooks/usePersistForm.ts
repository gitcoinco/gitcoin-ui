import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInterval } from "react-use";

import { setupDB } from "../utils/setupDB";

const dbName = "formDB";
const storeName = "formDrafts";

const initializeForm = async (form: ReturnType<typeof useForm>, persistKey?: string) => {
  try {
    const db = await setupDB(dbName, storeName);
    if (persistKey) {
      const draft = await db.get(storeName, persistKey);
      if (draft) {
        form.reset(draft);
      }
    }
  } catch (error) {
    console.error("Error initializing form:", error);
  }
};

export const usePersistForm = (form: ReturnType<typeof useForm>, persistKey?: string) => {
  useEffect(() => {
    initializeForm(form, persistKey);
  }, [form, persistKey]);

  useInterval(() => {
    if (persistKey) {
      (async () => {
        try {
          const db = await setupDB(dbName, storeName);
          const values = form.getValues();
          await db.put(storeName, values, persistKey);
        } catch (error) {
          console.error("Error saving to IndexedDB:", error);
        }
      })();
    }
  }, 1000);
};

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
