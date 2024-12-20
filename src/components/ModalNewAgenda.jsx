import { useState } from 'react';

import useUserStore from '../features/userStore';
import useAgendaStore from '../features/agendaStore';
import { BodyModalForm, HeaderModal } from './';
import { formFieldsAgenda } from '../utils/constants';
import useGroupStore from '../features/groupStore';

function ModalNewAgenda() {
  const [newAgendaForm, setNewAgendaForm] = useState({ agendaName: '', agendaDescription: '' });
  const { modalAgenda, isLoading, setModalAgenda, createNewAgenda } = useAgendaStore((state) => state);
  const { id } = useUserStore((state) => state);
  const { id: idGroup } = useGroupStore((state) => state);
  const handleSubmitNewAgenda = async (e) => {
    e.preventDefault();

    await createNewAgenda({ ...newAgendaForm, grupId: idGroup, id });
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
          <BodyModalForm formData={newAgendaForm} formFields={formFieldsAgenda} handleChange={handleChangeCreateAgenda} handleSubmit={handleSubmitNewAgenda} isLoading={isLoading} setOpenModal={setModalAgenda} />
        </div>
      </div>
    </div>
  );
}

export default ModalNewAgenda;
