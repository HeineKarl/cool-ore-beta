import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/notfound",
    name: "notfound",
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/SettingsView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/audio-synthesis",
    name: "audio",
    component: () => import("../views/AudioView.vue"),
  },
  {
    path: "/appearance",
    name: "appearance",
    component: () => import("../views/AppearanceView.vue"),
  },
  {
    path: "/change-password",
    name: "change_password",
    component: () => import("../views/ChangePasswordView.vue"),
  },
  {
    path: "/vision-test",
    name: "vision-test",
    component: () => import("../views/VisionTestView.vue"),
  },
  {
    path: "/article",
    name: "article",
    component: () => import("../views/ArticleView.vue"),
  },
  {
    path: "/article/:id",
    name: "article_detail",
    component: () => import("../views/ArticleDetailView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(!store.state.isGuest);
  if (!store.state.isGuest) {
    if (to.name == "login" || to.name == "register") {
      alert("You are accessing a restricted route!");
      return { name: from.name };
    }
  }

  let documentTitle = `Cool-ore | ${properCase(to.name)}`;
  if (to.params.title) {
    documentTitle += ` - ${to.params.title}`;
  }
  document.title = documentTitle;

  next();
});

function properCase(string) {
  const splitText = string.toLowerCase().split(" ");
  const text = splitText[0].charAt(0).toUpperCase() + splitText[0].substring(1);
  splitText.shift();

  const newArray = [text, ...splitText];

  // txt[0];
  // txt.join(" ");

  return newArray.join(" ");
}

export default router;
