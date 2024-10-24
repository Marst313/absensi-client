import ModalProfile from '../components/ModalProfile';
import useUserStore from '../features/userStore';

function Profile() {
  const { avatar, name, role, nim, modalProfile, setModalProfile } = useUserStore((state) => state);

  const handleSetModal = (data) => {
    setModalProfile(data);
  };

  return (
    <div>
      {modalProfile && <ModalProfile />}

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <div className="flex justify-end px-4 pt-4">
          <button className="inline-block px-5 bg-yellow-500 text-white  hover:bg-yellow-600  focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5" type="button" onClick={() => handleSetModal(true)}>
            <span className="">Edit Profile</span>
          </button>
        </div>

        {/* PROFILE */}
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt="Bonnie image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">{name || '-'}</h5>
          <span className="text-sm text-gray-500 ">{role}</span>
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">{nim}</h5>
        </div>
      </div>
    </div>
  );
}
export default Profile;
