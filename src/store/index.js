import { createStore } from "vuex";
import { textToSpeech } from "./modules/textToSpeech";
import { colorblind } from "./modules/colorblindTypes";
import { navigationList } from "./modules/navigationList";
import { colors } from "./modules/colors";
import { profile } from "./modules/profile";
import { visionTest } from "./modules/visionTest";
import { article } from "./modules/article";

import router from "@/router";

import UserService from "@/utils/UserService";
const { getUser, insertUser, logoutUser, verifyUser, generateToken } =
  UserService;

const store = createStore({
  state: {
    templateValidation: false,
    validateUsingLogin: false,
    showPassword: false,
    duration: 0,
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
    progressVal: 0,
    progressShow: false,
  },
  mutations: {
    showPassword(state) {
      state.showPassword = !state.showPassword;
    },
    setDuration(state, duration) {
      state.duration = duration;
    },
    resetForm(state) {
      state.message = null;
      state.ok = false;
      state.username = null;
      state.email = null;
      state.password = null;
      state.user = null;
    },
    setTemplateValidation(state, bool) {
      if (bool) return (state.templateValidation = bool);

      state.templateValidation = !state.templateValidation;
    },
    setProgressBar(state, progress) {
      state.progressVal = progress;
      state.progressShow = true;

      if (progress == 100) {
        setTimeout(() => {
          state.progressShow = false;
        }, 500);
      }
    },
  },
  actions: {
    async generateToken({ state }) {
      // const userId = sessionStorage.getItem("id");
      // if (!userId) {
      //   state.isGuest = true;
      //   return;
      // } else {
      //   state.isGuest = false;
      // }
      state.templateValidation = false;
      state.isGuest = true;

      const response = await generateToken();

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 500
      ) {
        state.isGuest = true;
        state.templateValidation = false;
        state.message = response.data.message;

        setTimeout(async () => {
          await router.push("/notfound");
          sessionStorage.clear();
        }, 500);

        return;
      }

      state.user = response.data.user;
      state.ok = response.data.ok;

      // Set Null values to ""
      Object.keys(state.user).forEach(
        (accessor) =>
          (state.user[accessor] =
            state.user[accessor] === null ? "" : state.user[accessor])
      );

      // Converting Byte Array to Base64
      let bytesView, profile_image;

      if (response.data.user.profile_image?.data) {
        bytesView = new Uint8Array(response.data.user.profile_image.data);
        profile_image = new TextDecoder().decode(bytesView);
        state.user.profile_image = profile_image;
      }

      setTimeout(async () => {
        state.templateValidation = true;
        state.isGuest = false;
      }, state.duration + 1000);
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
      state.message = data.msg;
      state.ok = data.ok;
      state.templateValidation = true;
      state.validateUsingLogin = true;
      state.isGuest = false;

      // Converting Byte Array to Base64
      let bytesView, profile_image;

      if (data.user.profile_image?.data) {
        bytesView = new Uint8Array(data.user.profile_image.data);
        profile_image = new TextDecoder().decode(bytesView);
        state.user.profile_image = profile_image;
      }

      sessionStorage.setItem("id", data.user.id);

      setTimeout(async () => {
        await router.push({ name: "profile" });
      }, 3 * state.duration);
    },
  },
  getters: {},
  modules: {
    textToSpeech,
    colorblind,
    navigationList,
    colors,
    profile,
    visionTest,
    article,
  },
});

export default store;
