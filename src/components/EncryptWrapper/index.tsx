import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import KeyModal from "./KeyModal";
import useEncryptStore from "../../hooks/useEncryptStore";
import { ImagesMap, encryptedImageMap } from "../../utils/imagesMap";
import useImagesMap from "../../hooks/useImagesMap";
import set from "lodash.set";
import get from "lodash.get";

interface EncryptWrapperProps {
  children: React.ReactNode;
}

const decryptImageMap = (
  decrypt: (encryptedSrc: string) => string
): ImagesMap => {
  const decryptedImageMap = {} as ImagesMap;

  const decryptRecursive = (path?: string) => {
    const map = path
      ? get(encryptedImageMap, path as string)
      : encryptedImageMap;
    Object.entries(map).forEach(([key, value]) => {
      const valuePath = path ? path + "." + key : key;
      if (typeof value === "string") {
        const decryptedSrc = value ? decrypt(value) : value;
        set(decryptedImageMap, valuePath, decryptedSrc);
      } else if (typeof value === "object" && value !== null) {
        decryptRecursive(valuePath);
      }
    });
  };

  decryptRecursive("");

  return decryptedImageMap;
};

const EncryptWrapper = ({ children }: EncryptWrapperProps) => {
  const { showModal, hideModal } = useModal();
  const key = useEncryptStore((state) => state.key);
  const setKey = useEncryptStore((state) => state.setKey);
  const decrypt = useEncryptStore((state) => state.decrypt);
  const setImagesMap = useImagesMap((state) => state.setImagesMap);
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    const inMemoryKey = localStorage.getItem("key");
    if (inMemoryKey) {
      setKey(inMemoryKey);
    } else {
      setShowKeyModal(true);
    }
  }, [setKey]);

  useEffect(() => {
    const handleSubmit = async (userKey: string) => {
      setKey(userKey);
      setShowKeyModal(false);
    };

    if (showKeyModal) {
      showModal(<KeyModal onSubmit={handleSubmit} />);
    } else {
      hideModal();
    }
  }, [showKeyModal, showModal, hideModal, setKey, setImagesMap, decrypt]);

  useEffect(() => {
    if (!key) return;

    const decryptedImageMap = decryptImageMap(decrypt);
    localStorage.setItem("key", key);
    setImagesMap(decryptedImageMap);
  }, [key, setImagesMap, decrypt]);

  return <>{children}</>;
};

export default EncryptWrapper;
