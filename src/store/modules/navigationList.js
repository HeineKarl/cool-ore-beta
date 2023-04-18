import store from "@/store/index";
export const navigationList = {
  namespaced: true,
  state: {
    settingsLists: [
      {
        id: 4,
        text: "Profile",
        icon: "mdi-account",
        name: "profile",
      },
      {
        id: 5,
        text: "Audio",
        icon: "mdi-volume-high",
        name: "audio",
      },
      { id: 6, text: "Appearance", icon: "mdi-brush", name: "appearance" },
      { id: 7, text: "Vision Test", icon: "mdi-eye", name: "vision-test" },
      // {
      //   text: "Change Password",
      //   icon: "mdi-lock-outline",
      //   name: "change_password",
      // },
    ],

    navigationLists: [
      {
        id: 1,
        text: "Home",
        icon: "mdi-home",
        name: "home",
      },
      {
        id: 2,
        text: "About",
        icon: "mdi-information",
        name: "about",
      },
      {
        id: 3,
        text: "Article",
        icon: "mdi-newspaper",
        name: "article",
      },
    ],
    logout: {
      text: "Logout",
      icon: "mdi-logout",
      func: () => {
        store.commit("colors/setColor", "light_mode");
        store.dispatch("logoutUser");
      },
    },
    login: {
      text: "Login",
      icon: "mdi-login",
      name: "login",
    },
  },

  mutations: {
    handleAccountList(state, userId) {},
  },
};
