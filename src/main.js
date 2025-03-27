import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createI18n} from "vue-i18n";
import en from "./locales/en.json";
import it from "./locales/it.json";


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap";

import {
    BCard, BCardBody, BCardHeader, BForm, BButton, BTable,
    BFormInput, BFormGroup, BFormSelect, BFormText, BFormTextarea, BModal, BBadge
} from "bootstrap-vue-next";


const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en", // Default language
    fallbackLocale: "en",
    messages: {en, it}
});


const app = createApp(App);
const components = {
    BCard, BCardBody, BCardHeader, BForm, BButton, BTable,
    BFormInput, BFormGroup, BFormSelect, BFormText, BFormTextarea, BModal, BBadge
};

Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
});


app.use(router);
app.use(i18n);


app.mount("#app");
