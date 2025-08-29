import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpoSecureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};


const SUPABASE_URL = 'https://yulykztzhmoxfztykeop.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bHlrenR6aG1veGZ6dHlrZW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUyNjAsImV4cCI6MjA2NjE5MTI2MH0.sFnTOu8fRgkycEZatgy4eVK-SyRjyrKKUChdByoiy1c'

// autoRefreshToken: true,
// storage: AsyncStorage,
// persistSession: true,

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    detectSessionInUrl: false,
  },
});