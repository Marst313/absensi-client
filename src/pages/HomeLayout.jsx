import { useEffect, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router-dom';

import { ModalProfile, Sidebar } from '../components';
import useUserStore from '../features/userStore';

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { token, name, email, modalProfile, isLoading, setModalProfile, validateToken } = useUserStore((store) => store);

  const navigate = useNavigate();

  // ! Set Sidebar in Mobile View
  const setSideBar = (data) => setOpenSidebar(data);

  useEffect(() => {
    // ! Check if token exist and valid
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
    checkToken();
  }, [token, validateToken, navigate]);

  // ! Initial Render If no name or email
  useEffect(() => {
    if (name === null || !email) {
      setModalProfile(true);
    } else {
      setModalProfile(false);
    }
  }, [name, email]);

  return (
    <div>
      <button
        onClick={() => setSideBar(true)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-primary hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <RiMenu2Line className="w-7 h-7" />
      </button>

      {/* SIDEBAR */}
      <Sidebar openSidebar={openSidebar} setSidebar={setSideBar} />

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>

      {modalProfile && !isLoading && <ModalProfile />}
    </div>
  );
}
export default HomeLayout;
