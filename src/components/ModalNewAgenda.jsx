import { IoClose } from 'react-icons/io5';
import useAgendaStore from '../features/agendaStore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from '../features/userStore';

function ModalNewAgenda() {
  const [newAgendaForm, setNewAgendaForm] = useState({ name: '', deskripsi: '' });
  const { modalAgenda, isLoading, setModalAgenda, createNewAgenda } = useAgendaStore((state) => state);
  const { id } = useUserStore((state) => state);
  const { idGroup: groupId } = useParams();

  const handleCreateNewAgenda = async (e) => {
    e.preventDefault();

    await createNewAgenda({ ...newAgendaForm, grupId: groupId, id });
  };

  const handleChangeCreateAgenda = (e) => {
    const { name, value } = e.target;
    setNewAgendaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModalAgenda = () => {
    setModalAgenda(false);
  };

  return (
    <div className={`${modalAgenda ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <div className="modal-new__header">
            <h3>Tambah Agenda Baru</h3>
            <button type="button" onClick={handleCloseModalAgenda} disabled={isLoading} className="close-button__small">
              <IoClose />
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-new__body">
            <form onSubmit={handleCreateNewAgenda}>
              {/* NAME Field */}
              <div className="container-input">
                <label htmlFor="nama">Nama Agenda</label>
                <input type="text" id="nama" name="name" value={newAgendaForm.name} onChange={handleChangeCreateAgenda} placeholder="Nama Agenda" required />
              </div>

              {/* DESKRIPSI FIELD */}
              <div className="container-input">
                <label htmlFor="deskripsi">Deskripsi Agenda</label>
                <textarea id="deskripsi" name="deskripsi" value={newAgendaForm.deskripsi} onChange={handleChangeCreateAgenda} placeholder="Deskripsi Agenda" required />
              </div>

              {/* MODAL FOOTER */}
              <div className="modal-new__footer">
                <button type="submit" disabled={isLoading} className="submit-button__medium">
                  {isLoading ? 'Loading...' : 'Tambah'}
                </button>
                <button type="button" onClick={handleCloseModalAgenda} className="cancel-button__medium" disabled={isLoading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalNewAgenda;
