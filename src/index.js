import CronEditor from '@/CronEditor';

export default {
    install (Vue, options) {
        Vue.component('vuetify-cronedit', CronEditor);
    }
};