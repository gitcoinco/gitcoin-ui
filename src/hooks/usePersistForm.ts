"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInterval } from "react-use";

import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

import { setupDB } from "@/lib/indexDB";

/**
 * Initialize the form with values from IndexedDB
 * @param form - The form instance
 * @param persistKey - The key of the value to retrieve
 * @param dbName - The name of the database
 * @param storeName - The name of the store
 */
const initializeForm = async (
  form: ReturnType<typeof useForm>,
  persistKey: string,
  dbName: string,
  storeName: string,
) => {
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

/**
 * Use the form with persist
 * @param form - The form instance
 * @param persistKey - The key of the value to retrieve
 * @param dbName - The name of the database
 * @param storeName - The name of the store
 */
export const usePersistForm = (
  form: ReturnType<typeof useForm>,
  persistKey: string,
  dbName: string,
  storeName: string,
) => {
  useEffect(() => {
    initializeForm(form, persistKey, dbName, storeName);
  }, [form, persistKey, dbName, storeName]);

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
  }, 500);
};

/**
 * Use the form with persist
 * @param schema - The schema of the form
 * @param defaultValues - The default values of the form
 * @param persistKey - The key of the value to retrieve
 * @param dbName - The name of the database
 * @param storeName - The name of the store
 */
export const useFormWithPersist = ({
  schema,
  defaultValues,
  persistKey,
  dbName,
  storeName,
}: {
  schema: ZodSchema;
  defaultValues: any;
  persistKey: string;
  dbName: string;
  storeName: string;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });
  usePersistForm(form, persistKey, dbName, storeName);
  return form;
};
