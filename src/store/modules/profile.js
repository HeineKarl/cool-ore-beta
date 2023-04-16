import UserService from "@/utils/UserService";

const { updateUserProfile } = UserService;
export const profile = {
  namespaced: true,
  state: {
    isUpdateDialog: false,
    profile_image: null,
  },
  mutations: {
    handleUpdateDialog(state) {
      state.isUpdateDialog = !state.isUpdateDialog;
    },
    updateProfile(state, userProfile) {
      state.isUpdateDialog = !state.isUpdateDialog;
      updateUserProfile(userProfile);
    },
    selectedFile(state, profile_image) {
      console.log(profile_image);
      state.profile_image = profile_image;
    },
  },
  actions: {},
};
