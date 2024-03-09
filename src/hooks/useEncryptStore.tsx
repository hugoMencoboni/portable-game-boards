import { create } from "zustand";
import CryptoJS from "crypto-js";

const useEncryptStore = create<{
  key: string | undefined;
  setKey: (key: string) => void;
  encrypt: (data: string) => string;
  decrypt: (data: string) => string;
}>((set, get) => ({
  key: undefined,
  ncryptInstance: undefined,
  imageMap: undefined,
  setKey: (key: string) => set((state) => ({ ...state, key })),
  encrypt: (data: string) => {
    const key = get().key;
    if (!key) throw new Error("Key not set");

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encryptedData;
  },
  decrypt: (data: string) => {
    const key = get().key;
    if (!key) throw new Error("Key not set");

    var bytes = CryptoJS.AES.decrypt(data, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  },
}));

export default useEncryptStore;
