import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: '*',
    name: 'All',
    redirect: { name: 'Login' }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const estaAutenticado = store.getters.estaAutenticado;
  // Ruta es distinta a la ruta de login y el usuario no esta autenticado
  switch (to.name) {
    case 'Home':
      if (!estaAutenticado) next({ name: 'Login' })
      else next()
      break;
    case 'Login':
      if (estaAutenticado) next({ name: 'Home' })
      else next()
      break;
    default:
      next();
      break;
  }
})

export default router;
