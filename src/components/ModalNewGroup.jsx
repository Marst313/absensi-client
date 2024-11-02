import { useState } from 'react';

import useGroupStore from '../features/groupStore';
import useUserStore from '../features/userStore';
import useActivityStore from '../features/activityStore';
import { HeaderModal } from './';

function ModalNewGroup() {
  const [newGroup, setNewGroup] = useState({ groupName: '' });
  const { modalGroup, isLoading, setModalGroup, createNewGroup, getAllGroup } = useGroupStore((state) => state);
  const { id } = useUserStore((state) => state);
  const { id: idActivity } = useActivityStore((state) => state);

  // ! CLOSE MODAL GROUP
  const handleCloseNewModalGroup = () => {
    setModalGroup(false);
  };
  //! HANDLE FORM SUBMISSION
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    await createNewGroup({ idActivity, groupName: newGroup.groupName, id });
    // ! GET THE NEWEST GROUP
    await getAllGroup(idActivity);
    setNewGroup({ groupName: '' });
  };
  // ! HANDLE STATE FORM
  const handleChangeCreateGroup = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${modalGroup ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalGroup} title={'Tambah Grup Baru'} isLoading={isLoading} />
          {/* MODAL BODY */}
          <BodyModal handleChangeCreateGroup={handleChangeCreateGroup} handleCloseNewModalGroup={handleCloseNewModalGroup} handleCreateGroup={handleCreateGroup} newGroup={newGroup} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleCreateGroup, newGroup, handleChangeCreateGroup, isLoading, handleCloseNewModalGroup }) {
  return (
    <div className="modal-new__body">
      <form onSubmit={handleCreateGroup}>
        {/* NAME Field */}
        <div className="container-input">
          <label htmlFor="groupName">Nama Grup</label>
          <input type="text" id="groupName" name="groupName" value={newGroup.groupName} onChange={handleChangeCreateGroup} placeholder="Nama Grup" required />
        </div>

        {/* Modal footer */}
        <div className="modal-new__footer">
          <button type="submit" disabled={isLoading} className="submit-button__medium">
            {isLoading ? 'Loading...' : 'Tambah'}
          </button>
          <button type="button" onClick={handleCloseNewModalGroup} className="cancel-button__medium" disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalNewGroup;
