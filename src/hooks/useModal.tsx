import useModalStore from "./useModalStore";

const useModal = () => {
  const { showModal, hideModal } = useModalStore((state) => state);
  return { showModal, hideModal };
};

export default useModal;
