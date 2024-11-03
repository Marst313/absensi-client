import useUserStore from '../features/userStore';
import { useState } from 'react';
import { HeaderModal, BodyModalForm } from './';

function ModalUser() {
  const [newUserForm, setNewUserForm] = useState({ nim: '', password: '', role: 'MHS' });
  const { isLoading, modalUser, setModalUser, register, getAllUser } = useUserStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ! HANDLE CHANGE STATE
  const handleChangeCreateUser = (e) => {
    const { name, value } = e.target;
    setNewUserForm((prev) => ({ ...prev, [name]: value }));
  };

  // ! HANDLE SUBMIT FORM
  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    await register(newUserForm);
    await getAllUser();
  };

  const formFieldsUser = [
    { label: 'NIM / NIP', id: 'nim', placeholder: '21.11.4110', required: true },
    {
      label: 'Password',
      id: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: '********',
      required: true,
      isPassword: true,
      toggleVisibilityHandler: togglePasswordVisibility,
    },
    {
      label: 'Role',
      id: 'role',
      type: 'select',
      options: ['MHS', 'DOSEN'],
      required: true,
    },
  ];

  return (
    <div className={`${modalUser ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalUser} title={'Tambah Mahasiswa Baru'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModalForm
            formFields={formFieldsUser} //
            handleSubmit={handleCreateNewUser}
            handleChange={handleChangeCreateUser}
            formData={newUserForm}
            isLoading={isLoading}
            setOpenModal={setModalUser}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalUser;
