import { useState } from 'react';

import useActivityStore from '../features/activityStore';
import useUserStore from '../features/userStore';

import { HeaderModal, BodyModalForm } from './';
import { formFieldsActivity } from '../utils/constants';

function ModalActivity() {
  const [newActivityForm, setNewActivityForm] = useState({ activityName: '', activityDescription: '', activityWaktuMulai: '', activityWaktuSelesai: '' });
  const { modalActivity, isLoading, setModalActivity, createNewActivity, getAllActivity } = useActivityStore((state) => state);
  const { id } = useUserStore((state) => state);

  // ! HANDLE CHANGE STATE
  const handleChangeCreateActivity = (e) => {
    const { name, value } = e.target;
    setNewActivityForm((prev) => ({ ...prev, [name]: value }));
  };
  // ! CREATE NEW ACTIVITY
  const handleSubmitCreateActivity = async (e) => {
    e.preventDefault();
    await createNewActivity({ ...newActivityForm, creatorId: id });
    await getAllActivity(id);
    setNewActivityForm({ activityName: '', activityDescription: '', activityWaktuMulai: '', activityWaktuSelesai: '' });
  };

  return (
    <div className={`${modalActivity ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalActivity} title={'Tambah Kegiatan Baru'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModalForm formFields={formFieldsActivity} formData={newActivityForm} handleChange={handleChangeCreateActivity} handleSubmit={handleSubmitCreateActivity} isLoading={isLoading} setOpenModal={setModalActivity} />
        </div>
      </div>
    </div>
  );
}

export default ModalActivity;
