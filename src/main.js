import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import Amplify, { API } from "aws-amplify";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import aws_exports from "./aws-exports";
// import awsconfig from "./aws-exports";

Amplify.configure(aws_exports);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
