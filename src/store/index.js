import { createStore } from "vuex";
import { textToSpeech } from "./modules/textToSpeech";
import { colorblind } from "./modules/colorblindTypes";
import { navigationList } from "./modules/navigationList";
import { colors } from "./modules/colors";
import { profile } from "./modules/profile";

import router from "@/router";
import axios from "axios";

import UserService from "@/utils/UserService";
const { getUser, insertUser, logoutUser, verifyUser, generateToken } =
  UserService;

const store = createStore({
  state: {
    templateValidation: false,
    validateUsingLogin: false,
    test: null,
    accessToken: "",
    refreshToken: "",
    isGuest: true,
    message: "",
    ok: false,
    user: null,
    username: "",
    email: "",
    password: "",
    lists: [],
    listname: "",
    isDone: false,
  },
  mutations: {
    resetForm(state) {
      state.message = null;
      state.ok = false;
      state.username = null;
      state.email = null;
      state.password = null;
      state.user = null;
    },
    setTemplateValidation(state) {
      state.templateValidation = !state.templateValidation;
    },
  },
  actions: {
    async generateToken({ state }) {
      const userId = sessionStorage.getItem("id");
      if (!userId) {
        state.isGuest = true;
        return;
      } else {
        state.isGuest = false;
      }

      const response = await generateToken();

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 500
      ) {
        state.isGuest = true;
        state.message = response.data.message;

        setTimeout(async () => {
          await router.push("/notfound");
        }, 1000);

        return;
      }

      state.user = response.data.user;
      state.ok = response.data.ok;

      // Converting Byte Array to Base64
      let bytesView, profile_image;

      if (response.data.user.profile_image?.data) {
        bytesView = new Uint8Array(response.data.user.profile_image.data);
        profile_image = new TextDecoder().decode(bytesView);
        state.user.profile_image = profile_image;
      }

      setTimeout(async () => {
        state.templateValidation = await response.data.ok;
      }, 100);
    },

    async logoutUser({ state }) {
      state.isGuest = true;

      const data = await logoutUser(state.user.id);
      state.message = data.message;

      sessionStorage.clear();

      await router.push("/notfound");

      setTimeout(async () => {
        state.user = null;
      }, 100);
    },
    // Register User
    async insertUser({ state }) {
      if (state.username == null || state.username == "")
        return (state.message = "Username is empty");

      if (state.email == null || state.email == "")
        return (state.message = "Email is empty");

      if (state.password == null || state.password == "")
        return (state.message = "Password is empty");

      const { data } = await insertUser(
        state.username,
        state.email,
        state.password
      );

      // If the email is already used
      if (!data.ok) {
        return (state.message = data.msg);
      }

      state.message = data.msg;
      state.ok = data.ok;

      setTimeout(async () => {
        await router.push("/login");
      }, 2000);
    },
    // Login User
    async verifyUser({ state }) {
      if (state.email == "" && state.password == "") {
        state.message = "All fields are empty!";
        return;
      }

      if (state.email == null || state.email == "") {
        state.message = "Email is empty";
        return;
      }

      if (state.password == null || state.password == "")
        return (state.message = "Password is empty");

      const data = await verifyUser(state.email, state.password);

      if (!data.ok) {
        state.ok = data.ok;
        state.message = data.msg;
        return;
      }

      state.user = data.user;
      state.message = data.message;
      state.ok = data.ok;
      state.templateValidation = true;
      state.validateUsingLogin = true;
      state.isGuest = false;

      sessionStorage.setItem("id", data.user.id);
      sessionStorage.setItem("uimg", data.user.img);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      setTimeout(async () => {
        await router.push({ name: "profile" });
      }, 500);
    },
  },
  getters: {},
  modules: {
    textToSpeech,
    colorblind,
    navigationList,
    colors,
    profile,
  },
});

export default store;
