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
  modalActivity: false,
  isLoading: false,
  allActivity: [],
  singleActivity: {},

  // ! SET MODAL CREATE NEW ACTIVITY
  setModalActivity: (state) => set(() => ({ modalActivity: state })),

  // ! SET SINGLE ACTIVITY
  setSingleActivity: (state) =>
    set(() => ({
      singleActivity: state,
      id: state?.id,
    })),

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
    set({ isLoading: true });

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
    set({ isLoading: true });

    try {
      const { data } = await getAllActivity(id);

      const sortedData = data?.data?.sort((a, b) => {
        if (a.nama.toLowerCase() < b.nama.toLowerCase()) {
          return -1;
        }
        if (a.nama.toLowerCase() > b.nama.toLowerCase()) {
          return 1;
        }
        return 0;
      });

      set({ modalActivity: false, isLoading: false, allActivity: sortedData });
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
    }
  },
});

const useActivityStore = create(activityStore);
export default useActivityStore;
