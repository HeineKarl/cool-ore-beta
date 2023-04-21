import Speech from "@/utils/Speech";
import UserService from "@/utils/UserService";

const { getUserAudio, updateUserAudio } = UserService;

export const textToSpeech = {
  namespaced: true,
  state: {
    event: null,
    isListening: false,
    dialog: false,
    isSpeaking: false,
    message: null,
    accents: null,
    accent: null,
    defaultVoice: null,
    voices: null,
    pitch: null,
    pitchTicks: [0, 0.5, 1, 1.5, 2],
    rate: null,
    rateTicks: [0.5, 1, 1.5, 2],
    volume: null,
    volumeTicks: [0, 0.25, 0.5, 0.75, 1],

    isUpdateDialog: false,
  },
  getters: {},
  mutations: {
    setValue(
      state,
      { accents, accent, voices, pitch, rate, volume, defaultVoice }
    ) {
      state.accents = accents;
      state.accent = accent;
      state.voices = voices;
      state.pitch = pitch;
      state.rate = rate;
      state.volume = volume;
      state.defaultVoice = defaultVoice;
    },

    setAccent(state) {
      const defaultVoice = state.accents.indexOf(state.accent);
      state.defaultVoice = defaultVoice;
    },

    handleDialog(state, { event }) {
      // Preventing the Default Context Menu
      event.preventDefault();
      //   Open Dialog
      state.dialog = !state.dialog;
      //   Only Right Click
      if (event.which !== 3) return;
      //   Store the current target
      state.event = event;
    },

    allowSpeaking(state) {
      state.isSpeaking = !state.isSpeaking;
      state.dialog = !state.dialog;
    },

    textToSpeech(state, object) {
      const event = object?.event;

      // Prevent Spamming
      if (state.isListening) return;

      let say, btn, span, img, anchor, linkPath;

      if (!event) {
        say = state.message;
      } else {
        btn = event.target.closest("button");
        span = event.target.closest("span");
        img = event.target.closest("img");
        anchor = event.target.closest("a");
        linkPath = anchor?.attributes["href"].nodeValue;

        // Routnames for Speech
        switch (linkPath) {
          case "/":
            if (img) {
              say = `This is the homepage logo that goes to the ${linkPath} homepage.`;
            } else {
              say = `This is home link and goes to the ${linkPath} homepage.`;
            }
            break;
          case "/about":
            say = `This is about link and goes to the ${linkPath} page.`;
            break;
          case "/contact":
            say = `This is contact link and goes to the ${linkPath} page.`;
            break;
          case "/article":
            say = `This is article link and goes to the ${linkPath} page.`;
            break;

          default:
            console.log(event);
            if (!!btn) {
              say = `This is ${event.target.textContent} button`;
            } else if (!!span) {
              say = `This is ${span.textContent} button`;
            } else if (!!anchor) {
              say = `This is ${anchor.textContent} button`;
            } else if (event.which === 3) {
              say = `${event.target.textContent}`;
            } else {
              say = "This is going to nothing route";
            }
        }
      }

      // Initialization of Important Components
      // Creating the Speech Object
      const speech = new Speech(say, {
        voices: state.voices,
        defaultVoice: state.defaultVoice,
        pitch: state.pitch,
        rate: state.rate,
        volume: state.volume,
      });

      // Start the speech
      speech.start();

      // Listening for the start and turn isListening to true
      speech.listening.onstart = () => {
        state.isListening = !state.isListening;
      };

      // Listening for the end and turn isListening to false
      speech.listening.onend = () => {
        state.isListening = !state.isListening;
      };
    },

    setAudio(state, { accent, pitch, speed, volume }) {
      console.log(accent, pitch, speed, volume);
      console.log("Set Audio");
      state.accent = accent;
      state.pitch = pitch;
      state.rate = speed;
      state.volume = volume;
    },
    async getAudio(state, { id }) {
      const data = await getUserAudio(id);

      state.accent = data.data.audio_accent;
      state.pitch = data.data.audio_pitch;
      state.rate = data.data.audio_speed;
      state.volume = data.data.audio_volume;
    },
    handleUpdateDialog(state) {
      state.isUpdateDialog = !state.isUpdateDialog;
    },
    updateAudio(state, { id }) {
      state.isUpdateDialog = !state.isUpdateDialog;
      const audioObj = {
        user_id: id,
        audio_accent: state.accent,
        audio_pitch: state.pitch,
        audio_speed: state.rate,
        audio_volume: state.volume,
      };

      updateUserAudio(audioObj);
    },
  },
  actions: {},
  modules: {},
};
