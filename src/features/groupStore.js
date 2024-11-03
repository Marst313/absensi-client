import { toast } from 'react-toastify';
import { create } from 'zustand';
import { fetchConnectUserToGroup, fetchCreateNewGroup, fetchGetAllGroup } from '../services/groupServices';

const groupStore = (set, get) => ({
  id: '',

  modalGroup: false,
  modalGroupUsers: false,
  isLoading: false,

  allGroup: [],

  singleGroup: {},

  // ! MODAL MANAGEMENT
  setModalGroup: (state) => set({ modalGroup: state }),
  setModalGroupUsers: (state) => set({ modalGroupUsers: state }),

  // ! HANDLE ERROR ON API
  handleApiError: (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';

    if (status) {
      console.error(`Error status: ${status}`);
    }

    toast.error(message);
  },

  // ! SET SINGLE GROUP
  setSingleGroup: (idGroup, allGroup) => {
    set({ isLoading: true });
    const currentGroup = allGroup?.find((group) => group.id === idGroup);
    set({ singleGroup: currentGroup, isLoading: false });
  },

  setGroupId: (idGroup) => set({ id: idGroup }),
  clearSingleGroup: () => set({ singleGroup: {} }),

  /*!!!!!!!!!!!  API   !!!!!!!!!!!!!!! */
  /*////////////////////////////////////*/

  // ! CREATE NEW GROUP
  createNewGroup: async (data) => {
    set({ isLoading: true });
    try {
      const { data: response } = await fetchCreateNewGroup(data);
      set({ modalGroup: false, isLoading: false });
      toast.success(response?.message);

      return response.message === 'Group kegiatan berhasil dibuat';
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! GET ALL ACTIVITY
  getAllGroup: async (idActivity) => {
    set({ isLoading: true });
    try {
      const { data: response } = await fetchGetAllGroup(idActivity);
      const sortedData = response.data.groups?.sort((a, b) => a.nama_grup.localeCompare(b.nama_grup));
      set({ modalActivity: false, isLoading: false, allGroup: sortedData });

      return sortedData;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! CONNECT A USER TO A GROUP
  connectUserToGroup: async (data) => {
    set({ isLoading: true });
    try {
      const { data: response } = await fetchConnectUserToGroup(data);
      set({ modalGroupUsers: false, isLoading: false });

      toast.success(response?.message);

      return response.message === 'Berhasil ditemukan';
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error('Mahasiswa sudah terdaftar di grup lain');
      }

      set({ isLoading: false });

      return false;
    }
  },

  /*!!!!!!!!!!!  API   !!!!!!!!!!!!!!! */
  /*////////////////////////////////////*/
});

const useGroupStore = create(groupStore);
export default useGroupStore;
