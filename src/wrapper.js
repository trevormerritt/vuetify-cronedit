// Import Component
import vuetifyCronedit from './CronEditor.vue';

export function install(Vue) {
    if (install.installed) return;
    install.install = true;
    Vue.component('VuetifyCronEdit', vuetifyCronedit);
}

const plugin = {
    install
};

let GlobalVue= null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if ( typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(vvuetifyCronedit);
}

export default vuetifyCronedit;