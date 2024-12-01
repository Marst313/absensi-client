import ModalProfile from '../components/ModalProfile';
import useUserStore from '../features/userStore';

function Profile() {
  const { avatar, name, role, nim, email, setModalProfile } = useUserStore((state) => state);

  const handleSetModal = (data) => {
    setModalProfile(data);
  };

  return (
    <div className="flex flex-col items-center  min-h-[calc(100vh-8rem)] p-4 ">
      <ModalProfile />

      <div className="w-full max-w-lg lg:max-w-full  border border-gray-200 rounded-lg shadow-lg p-6 ">
        {/* Edit Profile Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 rounded-lg text-sm transition-colors duration-200" type="button" onClick={() => handleSetModal(true)}>
            Edit Profile
          </button>
        </div>

        {/* Profile Information */}
        <div className="flex flex-col items-start mt-4">
          <img className="w-24 h-24 mb-4 rounded-full shadow-md" src={avatar} alt="Profile Avatar" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Username : {name || '-'} <p className="text-sm text-gray-500  capitalize">({role})</p>{' '}
          </h2>

          {/* Profile Details */}
          <div>
            <div className="flex text-gray-800">
              <span className="font-semibold mr-3">NIM:</span>
              <span>{nim || '-'}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span className="font-semibold mr-3">Email:</span>
              <span>{email || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
