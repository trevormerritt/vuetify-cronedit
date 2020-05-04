/*!
 * vuetify-cronedit v0.0.1
 * (c) Trevor Merritt
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var CronEditor = _interopDefault(require('@/CronEditor'));

var index = {
  install: function install(Vue, options) {
    Vue.component('vuetify-cronedit', CronEditor);
  }
};
module.exports = index;
