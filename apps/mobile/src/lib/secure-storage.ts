import * as SecureStore from "expo-secure-store";

// Adapts Expo SecureStore to the storage interface Supabase's auth client expects.
export const secureStorageAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};
