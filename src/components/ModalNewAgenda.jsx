import { useState } from 'react';
import { useParams } from 'react-router-dom';

import useUserStore from '../features/userStore';
import useAgendaStore from '../features/agendaStore';
import { FooterModal, HeaderModal } from './';

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

  return (
    <div className={`${modalAgenda ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalAgenda} title={'Tambah Agenda Baru'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModal handleChangeCreateAgenda={handleChangeCreateAgenda} handleCreateNewAgenda={handleCreateNewAgenda} isLoading={isLoading} newAgendaForm={newAgendaForm} setModalAgenda={setModalAgenda} />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleCreateNewAgenda, handleChangeCreateAgenda, newAgendaForm, isLoading, setModalAgenda }) {
  return (
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
        <FooterModal isLoading={isLoading} setOpenModal={setModalAgenda} />
      </form>
    </div>
  );
}

export default ModalNewAgenda;
