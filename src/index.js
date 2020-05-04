import CronEditor from './CronEditor';

export default {
    install (Vue) {
        Vue.component(CronEditor.name, CronEditor);

        Vue.mixin({
            mounted() {
                console.log('CronEditor->Mounted');
            }
        })
    }
};