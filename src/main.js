import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  LayoutPlugin,
  NavbarPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CarouselPlugin,
  CardPlugin,
  IconsPlugin,
  SpinnerPlugin,
  ModalPlugin,
  BreadcrumbPlugin
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(LayoutPlugin);
Vue.use(NavbarPlugin);
Vue.use(FormInputPlugin);
Vue.use(ButtonPlugin);
Vue.use(CarouselPlugin)
Vue.use(CardPlugin)
Vue.use(IconsPlugin)
Vue.use(SpinnerPlugin)
Vue.use(ModalPlugin)
Vue.use(BreadcrumbPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
