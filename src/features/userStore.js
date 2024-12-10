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

  isCacheValid: false,
  isLogin: false,
  isLoading: false,
  modalUser: false,
  modalProfile: false,

  currentPage: 1,
  pageSize: 10,
  totalPage: 1,

  searchResults: [],
  Groups: [],
  allUser: [],

  // ! MODAL MANAGEMENT
  setModalProfile: (state) => set(() => ({ modalProfile: state })),
  setModalUser: (state) => set(() => ({ modalUser: state })),

  // ! SET CURRENT PAGE
  setCurrentPage: (page) => {
    const { allUser, pageSize } = get();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    set({
      searchResults: allUser.slice(startIndex, endIndex),
      currentPage: page,
    });
  },

  // ! SET USER DATA TO STATE
  setUserData: (response) => {
    const { token, email, isLogin, role, nim, id, avatar, name, Group = [] } = response.data;

    set({ token, email, isLogin, role, nim, id, avatar, name, Groups: Group, isLoading: false });
  },

  // ! SEARCH USER
  searchUser: (query) => {
    const { allUser, pageSize } = get();

    const filtered = allUser.filter((activity) => activity.nim.toLowerCase().includes(query.toLowerCase()));

    set({
      searchResults: filtered.slice(0, pageSize),
      totalPage: Math.ceil(filtered.length / pageSize),
      currentPage: 1,
    });
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
      setLocalStorage('token', response?.data?.token);

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
    set({ isLoading: true, isCacheValid: false });
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
    const { allUser, isCacheValid, currentPage, pageSize } = get();

    if (isCacheValid && allUser.length > 0) {
      return;
    }

    set({ isLoading: true });

    try {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const response = await getAllUserService();
      const sortedData = response?.data?.sort((a, b) => {
        return a.nim.localeCompare(b.nim);
      });

      set({ allUser: sortedData, searchResults: sortedData.slice(startIndex, endIndex), isLoading: false, isCacheValid: true, totalPage: Math.ceil(sortedData.length / pageSize) });
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
