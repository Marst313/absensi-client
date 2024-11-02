import { IoClose } from 'react-icons/io5';

export default function HeaderModal({ title, isLoading, name, setOpenModal }) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="modal-new__header">
      <h3>{title}</h3>
      <button type="button" onClick={handleCloseModal} disabled={isLoading || name === null} className="close-button__small">
        <IoClose />
      </button>
    </div>
  );
}
