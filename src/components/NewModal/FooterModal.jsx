function FooterModal({ isLoading, setOpenModal, name, title }) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="modal-new__footer">
      <button type="submit" disabled={isLoading} className="submit-button__medium">
        {isLoading ? 'Loading...' : title || 'Tambah'}
      </button>
      <button type="button" onClick={handleCloseModal} className="cancel-button__medium" disabled={isLoading || name === null}>
        Cancel
      </button>
    </div>
  );
}
export default FooterModal;
