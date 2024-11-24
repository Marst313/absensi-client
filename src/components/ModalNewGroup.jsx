import { useState } from 'react';

import useGroupStore from '../features/groupStore';
import useUserStore from '../features/userStore';
import useActivityStore from '../features/activityStore';
import { BodyModalForm, FooterModal, HeaderModal } from './';
import { formFieldsGroup } from '../utils/constants';

function ModalNewGroup() {
  const [newGroup, setNewGroup] = useState({ groupName: '' });
  const { modalGroup, isLoading, id: idActivity, setModalGroup, createNewGroup, getAllGroup } = useGroupStore((state) => state);
  const { id } = useUserStore((state) => state);

  //! HANDLE FORM SUBMISSION
  const handleSubmitNewGroup = async (e) => {
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
          <BodyModalForm formData={newGroup} formFields={formFieldsGroup} handleChange={handleChangeCreateGroup} handleSubmit={handleSubmitNewGroup} isLoading={isLoading} setOpenModal={setModalGroup} />
        </div>
      </div>
    </div>
  );
}

export default ModalNewGroup;
