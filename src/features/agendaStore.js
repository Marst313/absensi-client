import { create } from 'zustand';
import { toast } from 'react-toastify';
import { createNewAgenda as createNewAgendaApi, getAllAgenda as getAllAgendaApi, getSingleAgenda } from '../services/agendaServices';

const agendaStore = (set, get) => ({
  id: '',

  allAgenda: [],

  modalAgenda: false,
  isLoading: false,

  singleAgenda: {},

  // ! SET MODAL CREATE NEW AGENDA
  setModalAgenda: (state) => set(() => ({ modalAgenda: state })),

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

  // ! CREATE NEW AGENDA
  createNewAgenda: async (data) => {
    set({ isLoading: true });

    try {
      const response = await createNewAgendaApi(data);

      set({ modalAgenda: false, isLoading: false });
      toast.success(response?.data?.message);

      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! GET ALL AGENDA
  getAllAgenda: async (data) => {
    set({ isLoading: true });

    try {
      const response = await getAllAgendaApi(data);
      set({ isLoading: false, allAgenda: response.data.agendas });

      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },

  // ! GET SINGLE AGENDA
  getSingleAgenda: async (data) => {
    set({ isLoading: true });

    try {
      const response = await getSingleAgenda(data);

      set({ isLoading: false, singleAgenda: response.data.data });

      return true;
    } catch (error) {
      get().handleApiError(error);
      set({ isLoading: false });
      return false;
    }
  },
});

const useAgendaStore = create(agendaStore);
export default useAgendaStore;
