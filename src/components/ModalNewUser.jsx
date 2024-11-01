import { IoClose, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import useUserStore from '../features/userStore';
import { useState } from 'react';

function ModalUser() {
  const [newUserForm, setNewUserForm] = useState({ nim: '', password: '', role: 'MHS' });
  const { isLoading, modalUser, setModalUser, register, getAllUser } = useUserStore((state) => state);

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

  // ! CLOSE MODAL USER
  const handleCloseModalUser = () => {
    setModalUser(false);
  };

  return (
    <div className={`${modalUser ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal handleCloseModalUser={handleCloseModalUser} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModal handleChangeCreateUser={handleChangeCreateUser} handleCreateNewUser={handleCreateNewUser} isLoading={isLoading} newUserForm={newUserForm} handleCloseModalUser={handleCloseModalUser} />
        </div>
      </div>
    </div>
  );
}

function HeaderModal({ handleCloseModalUser, isLoading }) {
  return (
    <div className="modal-new__header">
      <h3>Tambah Mahasiswa Baru</h3>
      <button type="button" onClick={handleCloseModalUser} disabled={isLoading} className="close-button__small">
        <IoClose />
      </button>
    </div>
  );
}

function BodyModal({ handleCreateNewUser, handleChangeCreateUser, handleCloseModalUser, newUserForm, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);

  // ! Toggle password vissible or not
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="modal-new__body">
      <form onSubmit={handleCreateNewUser}>
        {/* NIM Field */}
        <div className="container-input">
          <label htmlFor="nim">NIM / NIP</label>
          <input type="text" id="nim" name="nim" value={newUserForm.nim} onChange={handleChangeCreateUser} placeholder="21.11.4110" required />
        </div>

        {/* PASSWORD FIELD */}
        <div className="container-input relative">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={newUserForm.password} onChange={handleChangeCreateUser} placeholder="********" required />
          <button type="button" onClick={togglePasswordVisibility} className="eye-button">
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>

        {/* ROLE FIELD */}
        <div className="container-input relative">
          <label htmlFor="role">Role</label>
          <select name="role" id="role" onChange={handleChangeCreateUser}>
            <option value="MHS">Mahasiswa</option>
            <option value="DOSEN">Dosen</option>
          </select>
        </div>

        {/* Modal footer */}
        <div className="modal-new__footer">
          <button type="submit" disabled={isLoading} className="submit-button__medium">
            {isLoading ? 'Loading...' : 'Tambah'}
          </button>
          <button type="button" onClick={handleCloseModalUser} className="cancel-button__medium" disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalUser;
