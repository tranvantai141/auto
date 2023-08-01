import EncryptedStorage from 'react-native-encrypted-storage';

export const TRANSACTION_ID = 'TRANSACTION_ID';
export const IS_AUTHENTICATED= 'IS_AUTHENTICATED';
export const storeData = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const removeData = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await EncryptedStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await EncryptedStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    return null;
    // error reading value
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await EncryptedStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
    // error reading value
  }
};

export const clearAsynStorage = async () => {
  try {
    await EncryptedStorage.clear();
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};
