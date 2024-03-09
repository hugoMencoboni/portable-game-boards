import Modal from "../Modal";
import useModalStore from "../../hooks/useModalStore";

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  const modalContent = useModalStore((state) => state.content);
  const isVisible = modalContent !== null;

  return (
    <>
      {children}
      {isVisible ? <Modal children={modalContent} /> : null}
    </>
  );
};

export default ModalWrapper;
