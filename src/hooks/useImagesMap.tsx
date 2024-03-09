import { create } from "zustand";
import { ImagesMap } from "../utils/imagesMap";

const useImagesMap = create<{
  imagesMap: ImagesMap | undefined;
  setImagesMap: (decryptedImageMap: ImagesMap) => void;
}>((set) => ({
  imagesMap: undefined,
  setImagesMap: (decryptedImagesMap: ImagesMap) =>
    set((state) => ({ ...state, imagesMap: decryptedImagesMap })),
}));

export default useImagesMap;
