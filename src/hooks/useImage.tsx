import useImagesMap from "./useImagesMap";
import get from "lodash.get";

const useImage = (path: string) => {
  const imageMap = useImagesMap((state) => state.imagesMap);
  return get(imageMap, path) as string;
};

export default useImage;
