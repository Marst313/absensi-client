import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Activity, Dashboard, Error, HomeLayout, Login, Profile, ProtectedRoutes, SingleActivity, SingleGroup, Users } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/mahasiswa',
        element: (
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/kegiatan',
        element: <Activity />,
      },
      {
        path: '/kegiatan/:id',
        element: <SingleActivity />,
      },
      {
        path: 'kegiatan/:idActivity/group/:idGroup',
        element: <SingleGroup />,
      },
      {
        path: '/profil',
        element: <Profile />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
