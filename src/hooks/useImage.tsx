import useImagesMap from "./useImagesMap";
import { getNestedProperty } from "../utils/object-utils";

const useImage = (path: string) => {
  const imageMap = useImagesMap((state) => state.imagesMap);
  return getNestedProperty(imageMap, path) as string;
};

export default useImage;
