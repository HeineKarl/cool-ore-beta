const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/main.scss";`,
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/routes/api/users": {
        target: "http://localhost:5000",
        // target: "https://cool-ore-beta-abhx.onrender.com/",
      },
    },
  },
});
