import Axios from "axios";
import store from "@/store/index";
import router from "@/router";

let axios = Axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://localhost:5000",
  // baseURL: "https://cool-ore-beta.onrender.com/",
  // baseURL: "https://cool-ore-beta-abhx.onrender.com/",
  withCredentials: true,
});

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
    console.log("REQUEST INTERCEPTOR");

    // Set Start Time of Request
    request.metadata = { startTime: new Date() };

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("RESPONSE INTERCEPTOR");
    console.log(response);

    // Set End Time of Response
    response.config.metadata.endTime = new Date();

    // Calculate Duration of Response and Request
    const duration =
      response.config.metadata.endTime - response.config.metadata.startTime;

    console.log("Duration", duration);

    store.commit("setDuration", duration);

    let progress = 0;
    const interval = setInterval(() => {
      // console.log("Home");
      progress++;
      // console.log(progress);
      store.commit("setProgressBar", progress);
      if (progress == 100) {
        clearInterval(interval);
      }
    }, 1000 / duration);

    // Only Token and Login commits user preferences
    if (
      !response.config.url?.match("token") &&
      !response.config.url?.match("login")
    )
      return response;

    // Set Template Show
    setTimeout(() => {
      store.commit("setTemplateValidation", true);
    }, 3 * duration);

    // Get User Data
    const user = response.data.user;

    // Set Color Theme
    store.commit("colors/setColor", user.color_theme);

    // Set Audio Value
    console.log(user);
    store.commit("textToSpeech/setAudio", {
      accent: user.audio_accent,
      pitch: user.audio_pitch,
      speed: user.audio_speed,
      volume: user.audio_volume,
    });

    store.commit("textToSpeech/setSynthesis", duration);

    return response;
  },
  (error) => {
    if (error.message == "Network Error") {
      return Promise.resolve({
        status: 500,
        data: { message: "Server is down", ok: false, report: error.message },
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
