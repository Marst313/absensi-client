import customFetch from '../utils/axios';

// ! VALIDATE TOKEN IF IT'S VALID OR NOT
export const validateToken = async (jwt) => {
  const { data: response } = await customFetch.post('/session', { token: jwt });
  return response;
};

// ! LOGIN
export const login = async (data) => {
  const { data: response } = await customFetch.post('/login', { nim: data.nim.toString(), password: data.password });
  return response;
};

// ! LOGOUT
export const logout = async (id) => {
  const { data: response } = await customFetch.post('/logout', { id });
  return response;
};

// ! REGISTER ONLY FOR ADMIN AND DOSEN
export const register = async (data) => {
  const { data: response } = await customFetch.post('/register', { nim: data.nim, password: data.password, role: data.role });
  return response;
};

// ! GET ALL USER ONLY FOR ADMIN AND DOSEN
export const getAllUser = async () => {
  const { data: response } = await customFetch.get('/user');
  return response;
};

// ! UPDATE USER PROFILE
export const updateUserProfile = async (id, data) => {
  const { data: response } = await customFetch.put(`/update/profile/${id}`, { name: data.name, email: data.email });
  return response;
};

// ! UPDATE USER AVATAR
export const updateUserAvatar = async (id, file) => {
  const { data: response } = await customFetch.put(
    `/update/avatar/${id}`,
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};
