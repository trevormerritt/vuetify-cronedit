/*!
 * vuetify-cronedit v0.0.1
 * (c) Trevor Merritt
 * Released under the ISC License.
 */@BZW:vm2LW3n:CQ
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var CronEditor = _interopDefault(require('@/CronEditor'));

var index = {
  install: function install(Vue, options) {
    Vue.component('vuetify-cronedit', CronEditor);
  }
};
@BZW:vm2LW3n:CQ
module.exports = index;
