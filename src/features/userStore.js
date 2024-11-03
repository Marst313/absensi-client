import { create } from 'zustand';
import { toast } from 'react-toastify';

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localstorage';
import {
  validateToken,
  login as loginService,
  logout as logoutService,
  register as registerService,
  getAllUser as getAllUserService,
  updateUserProfile as updateUserProfileService,
  updateUserAvatar as updateUserAvatarService,
} from '../services/userServices';

const userStore = (set, get) => ({
  name: '',
  email: '',
  role: '',
  nim: '',
  id: '',
  avatar: '',
  token: getLocalStorage('token'),
  isLogin: false,
  isLoading: false,
  modalUser: false,
  modalProfile: false,

  Groups: [],
  allUser: [],

  // ! MODAL MANAGEMENT
  setModalProfile: (state) => set(() => ({ modalProfile: state })),
  setModalUser: (state) => set(() => ({ modalUser: state })),

  // ! SET USER DATA TO STATE
  setUserData: (response) => {
    const { token, email, isLogin, role, nim, id, avatar, name, Group = [] } = response?.data;

    set({ token, email, isLogin, role, nim, id, avatar, name, Groups: Group, isLoading: false });
  },

  // ! HANDLE ERROR ON API
  handleApiError: (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';

    if (status) {
      console.error(`Error status: ${status}`);
    }

    toast.error(message);
  },

  // ! VALIDATE TOKEN
  validateToken: async (jwt) => {
    set({ isLoading: true });
    try {
      const response = await validateToken(jwt);

      get().setUserData(response);
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! LOGIN
  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await loginService(data);
      setLocalStorage('token', response?.data?.token);
      get().setUserData(response);
      toast.success(response.message);
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! LOGOUT
  logout: async (id) => {
    set({ isLoading: true });
    try {
      const response = await logoutService(id);
      toast.success(response?.message);
      removeLocalStorage('token');
      set({ role: '', nim: '', id: '', token: '', isLogin: false, isLoading: false });
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! REGISTER
  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await registerService(data);
      toast.success(response.message);
      set({ isLoading: false, modalUser: false });
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! GET ALL USER
  getAllUser: async () => {
    set({ isLoading: true });
    try {
      const response = await getAllUserService();
      const sortedData = response?.data?.sort((a, b) => {
        return a.nim.localeCompare(b.nim);
      });

      set({ allUser: sortedData, isLoading: false });
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! UPDATE USER PROFILE
  updateUserProfile: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await updateUserProfileService(id, data);
      const { avatar, email, name } = response?.data;
      set({ avatar, email, name, id, isLoading: false, modalProfile: false });
      toast.success(response.message);
      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! UPDATE USER AVATAR
  updateUserAvatar: async (id, file) => {
    set({ isLoading: true });
    try {
      const response = await updateUserAvatarService(id, file);

      set({ avatar: response.avatar, isLoading: false, modalProfile: false });
      toast.success(response.message);

      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },
});

const useUserStore = create(userStore);
export default useUserStore;
