import UserService from "@/utils/UserService";
const { getUserAppearance, updateUserAppearance } = UserService;
export const colors = {
  namespaced: true,
  state: {
    colorTheme: "light_mode",
    currentColor: null,
    colorMode: [
      {
        id: 1,
        name: "light_mode",
        img: require("@/assets/color/light_mode.svg"),
        color: {
          primary: "#f6f4ee",
          secondary: "#2e2e2e",
          // secondary: "#171717",
          // secondary: "#c2c2c2",
          primary_200: "#fbfbf9",
          primary_600: "#e8e6e2",
          secondary_200: "#1b1b1b",
          secondary_600: "#101010",
          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#2e2e2e",
          // dark_color_600: "#101010",

          success: "#175f36",
          alert: "#941010",
        },
      },
      {
        id: 2,
        name: "dark_mode",
        img: require("@/assets/color/dark_mode.svg"),
        color: {
          primary: "#171717",
          // secondary: "#f6f4ee",
          secondary: "#c2c2c2",

          primary_200: "#1b1b1b",
          primary_600: "#101010",
          secondary_200: "#fbfbf9",
          secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#c2c2c2",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#229755",
          alert: "#d41f1f",
          alert_200: "#ff3030",
        },
      },
    ],
    colorSpecs: [
      {
        id: 1,
        name: "light_protan",
        img: require("@/assets/color/light_protan.svg"),
        color: {
          primary: "#f6f4ee",
          secondary: "#171717",

          primary_200: "#fbfbf9",
          primary_600: "#e8e6e2",
          secondary_200: "#1b1b1b",
          secondary_600: "#101010",

          // primary_200: "#1b1b1b",
          // primary_600: "#101010",
          // secondary_200: "#fbfbf9",
          // secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#4550d4",
          alert: "#c5b02b",
        },
      },
      {
        id: 2,
        name: "dark_protan",
        img: require("@/assets/color/dark_protan.svg"),
        color: {
          primary: "#171717",
          secondary: "#f6f4ee",

          primary_200: "#1b1b1b",
          primary_600: "#101010",
          secondary_200: "#fbfbf9",
          secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#4550d4",
          alert: "#d6be26",
        },
      },
      {
        id: 3,
        name: "light_deutan",
        img: require("@/assets/color/light_deutan.svg"),
        color: {
          primary: "#f6f4ee",
          secondary: "#171717",

          primary_200: "#fbfbf9",
          primary_600: "#e8e6e2",
          secondary_200: "#1b1b1b",
          secondary_600: "#101010",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#1a68b7",
          alert: "#ffb51b",
        },
      },
      {
        id: 4,
        name: "dark_deutan",
        img: require("@/assets/color/dark_deutan.svg"),
        color: {
          primary: "#171717",
          secondary: "#f6f4ee",

          primary_200: "#1b1b1b",
          primary_600: "#101010",
          secondary_200: "#fbfbf9",
          secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#1a68b7",
          alert: "#ffb51b",
        },
      },
      {
        id: 5,
        name: "light_tritan",
        img: require("@/assets/color/light_tritan.svg"),
        color: {
          primary: "#f6f4ee",
          secondary: "#171717",

          primary_200: "#fbfbf9",
          primary_600: "#e8e6e2",
          secondary_200: "#1b1b1b",
          secondary_600: "#101010",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#00bbb6",
          alert: "#d60202",
        },
      },
      {
        id: 6,
        name: "dark_tritan",
        img: require("@/assets/color/dark_tritan.svg"),
        color: {
          primary: "#171717",
          secondary: "#f6f4ee",

          primary_200: "#1b1b1b",
          primary_600: "#101010",
          secondary_200: "#fbfbf9",
          secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#00bbb6",
          alert: "#d60202",
        },
      },
    ],
    colorContrast: [
      {
        id: 1,
        name: "light_high_contrast",
        img: require("@/assets/color/light_high_contrast.svg"),
        color: {
          primary: "#f6f4ee",
          secondary: "#171717",

          primary_200: "#fbfbf9",
          primary_600: "#e8e6e2",
          secondary_200: "#1b1b1b",
          secondary_600: "#101010",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#175f36",
          alert: "#941010",
        },
      },
      {
        id: 1,
        name: "dark_high_contrast",
        img: require("@/assets/color/dark_high_contrast.svg"),
        color: {
          primary: "#171717",
          secondary: "#f6f4ee",

          primary_200: "#1b1b1b",
          primary_600: "#101010",
          secondary_200: "#fbfbf9",
          secondary_600: "#e8e6e2",

          // light_color_200: "#fbfbf9",
          // light_color_400: "#f6f4ee",
          // light_color_600: "#e8e6e2",
          // dark_color_200: "#1b1b1b",
          // dark_color_400: "#171717",
          // dark_color_600: "#101010",

          success: "#229755",
          alert: "#d41f1f",
          alert_200: "#ff3030",
        },
      },
    ],
  },
  mutations: {
    setColor(state, colorName) {
      if (!colorName) {
        colorName = "light_mode";
      }

      let allColors = [
        ...state.colorMode,
        ...state.colorSpecs,
        ...state.colorContrast,
      ];
      let colors = allColors.find((color) => color.name === colorName);

      let root = document.querySelector(":root");

      state.colorTheme = colorName;

      root.style.setProperty("--primary-color", colors.color.primary);
      root.style.setProperty("--secondary-color", colors.color.secondary);
      root.style.setProperty("--primary-color-200", colors.color.primary_200);
      root.style.setProperty("--primary-color-600", colors.color.primary_600);
      root.style.setProperty(
        "--secondary-color-200",
        colors.color.secondary_200
      );
      root.style.setProperty(
        "--secondary-color-600",
        colors.color.secondary_600
      );
      root.style.setProperty("--success-color", colors.color.success);
      root.style.setProperty("--alert-color", colors.color.alert);
    },
  },

  actions: {
    async updateColor({ state }, userColor) {
      await updateUserAppearance(userColor);
    },
    async getColor({ state }, { user_id }) {
      const { data } = await getUserAppearance(user_id);
      state.colorTheme = data.color_theme ? data.color_theme : "light_mode";
    },
  },
};
