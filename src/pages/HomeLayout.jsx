import { useEffect, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { IoMdNotifications } from 'react-icons/io';
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
    <section>
      {/* HEADER LAYOUT */}
      <div className="header-nav">
        <button onClick={() => setSideBar(true)} type="button">
          <RiMenu2Line />
        </button>
        <button>
          <IoMdNotifications />
        </button>
      </div>
      {/* HEADER LAYOUT */}

      {/* SIDEBAR */}
      <Sidebar openSidebar={openSidebar} setSidebar={setSideBar} />

      {/* CONTENT */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>

      {modalProfile && !isLoading && <ModalProfile />}
    </section>
  );
}
export default HomeLayout;
