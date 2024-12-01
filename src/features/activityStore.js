import { create } from 'zustand';
import { toast } from 'react-toastify';
import { createNewActivity, getAllActivity } from '../services/activityServices';

const activityStore = (set, get) => ({
  id: '',
  activity: {
    name: '',
    deskripsi: '',
    waktumulai: '',
    waktuselesai: '',
  },
  isCacheValid: false,
  modalActivity: false,
  isLoading: false,

  currentPage: 1,
  pageSize: 10,
  totalPage: 1,

  searchResults: [],
  allActivity: [],
  singleActivity: {},

  // ! SET MODAL CREATE NEW ACTIVITY
  setModalActivity: (state) => set(() => ({ modalActivity: state })),

  // ! SET CURRENT PAGE
  setCurrentPage: (page) => {
    const { allActivity, pageSize } = get();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    set({
      searchResults: allActivity.slice(startIndex, endIndex),
      currentPage: page,
    });
  },

  // ! SEARCH ACTIVITY
  searchActivity: (query) => {
    const { allActivity, pageSize } = get();

    const filtered = allActivity.filter((activity) => activity.nama.toLowerCase().includes(query.toLowerCase()));

    set({
      searchResults: filtered.slice(0, pageSize),
      totalPage: Math.ceil(filtered.length / pageSize),
      currentPage: 1,
    });
  },

  // ! SET SINGLE ACTIVITY
  setSingleActivity: (idActivity, allActivity) => {
    set({ isLoading: true });

    const currentActivity = allActivity?.find((activity) => activity.id === idActivity);

    set({ singleActivity: currentActivity, isLoading: false });
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

  /*!!!!!!!!!!!  API   !!!!!!!!!!!!!!! */
  /*////////////////////////////////////*/

  // ! CREATE NEW ACTIVITY
  createNewActivity: async (data) => {
    set({ isLoading: true, isCacheValid: false });

    try {
      const response = await createNewActivity(data);

      set({ modalActivity: false, isLoading: false });
      toast.success(response?.data?.message);

      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! GET ALL ACTIVITY
  getAllActivity: async (id) => {
    const { allActivity, isCacheValid, pageSize, currentPage } = get();

    if (isCacheValid && allActivity.length > 0) {
      return;
    }
    set({ isLoading: true });

    try {
      const { data } = await getAllActivity(id);

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const sortedData = data?.data?.sort((a, b) => a.nama.localeCompare(b.nama));

      set({
        modalActivity: false,
        isLoading: false,
        isCacheValid: true,
        allActivity: sortedData,
        searchResults: sortedData.slice(startIndex, endIndex),
        totalPage: Math.ceil(sortedData.length / pageSize),
      });
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
    }
  },
});

const useActivityStore = create(activityStore);
export default useActivityStore;
