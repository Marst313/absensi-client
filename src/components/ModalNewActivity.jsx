import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import useActivityStore from '../features/activityStore';
import useUserStore from '../features/userStore';
import HeaderModal from './HeaderModal';

function ModalActivity() {
  const [newActivityForm, setNewActivityForm] = useState({ nama: '', deskripsi: '', waktumulai: '', waktuselesai: '' });

  const { modalActivity, isLoading, setModalActivity, createNewActivity, getAllActivity } = useActivityStore((state) => state);
  const { id } = useUserStore((state) => state);

  // ! HANDLE CHANGE STATE
  const handleChangeCreateActivity = (e) => {
    const { name, value } = e.target;
    setNewActivityForm((prev) => ({ ...prev, [name]: value }));
  };

  // ! CREATE NEW ACTIVITY
  const handleCreateNewActivity = async (e) => {
    e.preventDefault();

    await createNewActivity({ ...newActivityForm, creatorId: id });
    await getAllActivity(id);

    setNewActivityForm({ nama: '', deskripsi: '', waktumulai: '', waktuselesai: '' });
  };

  // ! CLOSE MODAL ACTIVITY
  const handleCloseModalActivity = () => {
    setModalActivity(false);
  };

  return (
    <div className={`${modalActivity ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalActivity} title={'Tambah Kegiatan Baru'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModal handleChangeCreateActivity={handleChangeCreateActivity} handleCloseModalActivity={handleCloseModalActivity} handleCreateNewActivity={handleCreateNewActivity} newActivityForm={newActivityForm} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleCreateNewActivity, newActivityForm, handleChangeCreateActivity, handleCloseModalActivity, isLoading }) {
  return (
    <div className="modal-new__body">
      <form onSubmit={handleCreateNewActivity}>
        {/* NAME Field */}
        <div className="container-input">
          <label htmlFor="nama">Nama Kegiatan</label>
          <input type="text" id="nama" name="nama" value={newActivityForm.nama} onChange={handleChangeCreateActivity} placeholder="Nama Kegiatan" required />
        </div>

        {/* DESKRIPSI FIELD */}
        <div className="container-input">
          <label htmlFor="deskripsi">Deskripsi Kegiatan</label>
          <textarea id="deskripsi" name="deskripsi" value={newActivityForm.deskripsi} onChange={handleChangeCreateActivity} placeholder="Deskripsi Kegiatan" required />
        </div>

        {/* WAKTU MULAI FIELD */}
        <div className="container-input">
          <label htmlFor="waktumulai">Waktu Mulai Kegiatan</label>
          <input id="waktumulai" name="waktumulai" type="date" value={newActivityForm.waktumulai} onChange={handleChangeCreateActivity} placeholder="Kegiatan belajar teknologi baru" required />
        </div>

        {/* WAKTU SELESAI FIELD */}
        <div className="container-input">
          <label htmlFor="waktuselesai">Waktu Selesai Kegiatan</label>
          <input id="waktuselesai" name="waktuselesai" type="date" value={newActivityForm.waktuselesai} onChange={handleChangeCreateActivity} placeholder="Kegiatan belajar teknologi baru" required />
        </div>

        {/* MODAL FOOTER */}
        <div className="modal-new__footer">
          <button type="submit" disabled={isLoading} className="submit-button__medium">
            {isLoading ? 'Loading...' : 'Tambah'}
          </button>
          <button type="button" onClick={handleCloseModalActivity} className="cancel-button__medium" disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalActivity;
