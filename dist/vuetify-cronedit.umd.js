(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VuetifyCronedit = {}));
}(this, (function (exports) { 'use strict';

    var array2string = {
        created: function () {
            console.log('array2string:mixin:created');
        },
        methods: {
            array2string: function (inputArray) {
                if (inputArray !== '_') {
                    var toReturn = "";
                    inputArray.forEach(function (item) {
                        toReturn += item + ",";
                    });
                    return toReturn.substring(0, toReturn.length - 1);
                }
                return inputArray;
            }
        }
    };

    //

    var script = {
      name: "MinutePicker",
      mixins: [array2string],
      methods: {
        changedMinuteList: function changedMinuteList(newValue) {
          newValue.sort();
          this.minutes = this.array2string(newValue);
        },
        changed: function changed(newValue, newvalue2) {
          console.log('minutepicker:changed', this.picker, newValue, newvalue2);
          this.picker = newValue;
          if (newValue === "_") {
            var newMinutes = this.array2string(newValue);
            if (newMinutes.length > 1) {
              this.minutes = newMinutes;
            }
          } else {
            this.minutes = newValue;
          }
        }
      },
      computed: {
        minuteOptions: function minuteOptions() {
          var toReturn = [];
          for (var i = 0; i < 60; i++) {
            toReturn.push(i);
          }
          return toReturn;
        }
      },
      data: function data() {
        return {
          picker: "*",
          minutes: "",
          selectedMinutesList: []
        };
      },
      watch: {
        minutes: function minutes() {
          this.$emit("update", this.minutes);
        }
      },
      created: function created() {
        this.minutes = this.picker;
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c("v-card-title", [_vm._v("Minute")]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-radio-group",
                        {
                          on: {
                            change: function($event) {
                              return _vm.changed($event)
                            }
                          },
                          model: {
                            value: _vm.picker,
                            callback: function($$v) {
                              _vm.picker = $$v;
                            },
                            expression: "picker"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*",
                                      label: "Every Minute"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/2",
                                      label: "Even Minutes"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "1-59/2",
                                      label: "Odd Minutes"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/5",
                                      label: "Every 5 Minutes"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/15",
                                      label: "Every 15 Minutes"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/30",
                                      label: "Every 30 Minutes"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "12" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "_",
                                      label: "Other"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.picker === "_"
                    ? _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c("v-select", {
                            attrs: {
                              multiple: "",
                              chips: "",
                              clearable: "",
                              disabled: _vm.picker !== "_",
                              items: _vm.minuteOptions,
                              value: _vm.selectedMinutesList
                            },
                            on: {
                              change: function($event) {
                                return _vm.changedMinuteList($event)
                              }
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$1 = {
      name: "DayPicker",
      mixins: [array2string],
      methods: {
        changedDaysList: function changedDaysList(newValue) {
          newValue.sort();
          this.days = this.array2string(newValue);
        },
        changed: function changed(newValue) {
          this.picker = newValue;
          if (newValue !== '_') {
            this.days = newValue;
          } else {
            var newString = this.array2string(newValue);
            if (this.days !== newString) {
              this.days = newString;
            }
          }
        },
      },
      computed: {
        daysOptions: function daysOptions() {
          var toReturn = [];
          for(var i = 1; i < 32; i++) {
            toReturn.push(i);
          }      
          return toReturn;
        }
      },
      data: function data() {
        return {
          picker: "*",
          days: "",
          selectedDaysList: []
        };
      },
      watch: {
        days: function days() {
          this.$emit('update', this.days);
        }
      },
      created: function created() {
        this.days = this.picker;
      }
    };

    /* script */
    var __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c("v-card-title", [_vm._v("Days of the Month")]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-radio-group",
                        {
                          on: {
                            change: function($event) {
                              return _vm.changed($event)
                            }
                          },
                          model: {
                            value: _vm.picker,
                            callback: function($$v) {
                              _vm.picker = $$v;
                            },
                            expression: "picker"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*",
                                      label: "Every Day"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/2",
                                      label: "Even Days"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "1-31/2",
                                      label: "Odd Days"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/5",
                                      label: "Every 5 Days"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/7",
                                      label: "Every 7 Days"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/15",
                                      label: "Every Half Month"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "_",
                                      label: "Other"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.picker === "_"
                    ? _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c("v-select", {
                            attrs: {
                              multiple: "",
                              chips: "",
                              clearable: "",
                              disabled: _vm.picker !== "_",
                              items: _vm.daysOptions,
                              value: _vm.selectedDaysList
                            },
                            on: {
                              change: function($event) {
                                return _vm.changedDaysList($event)
                              }
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      var __vue_inject_styles__$1 = undefined;
      /* scoped */
      var __vue_scope_id__$1 = undefined;
      /* module identifier */
      var __vue_module_identifier__$1 = undefined;
      /* functional template */
      var __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$1 = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$2 = {
      name: "HourPicker",
      mixins: [array2string],
      methods: {
        changedHoursList: function changedHoursList(newValue) {
          newValue.sort();
         this.hours = this.array2string(newValue);
        },
        changed: function changed(newValue) {
          this.picker = newValue;
          if (newValue !== "_") {
            this.hours = newValue;
          } else {
            var newString = this.array2string(newValue);
            if (newString.length > 1) {
              this.hours = newString;
            }
          }
        }
      },
      computed: {
        hoursOptions: function hoursOptions() {
          var toReturn = [];
          for (var i = 1; i < 25; i++) {
            toReturn.push(i);
          }
          return toReturn;
        }
      },
      data: function data() {
        return {
          picker: "*",
          hours: "",
          selectedHoursList: []
        };
      },
      watch: {
        hours: function hours() {
          this.$emit("update", this.hours);
        }
      },
      created: function created() {
        this.hours = this.picker;
      }
    };

    /* script */
    var __vue_script__$2 = script$2;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c("v-card-title", [_vm._v("Hour")]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-radio-group",
                        {
                          on: {
                            change: function($event) {
                              return _vm.changed($event)
                            }
                          },
                          model: {
                            value: _vm.picker,
                            callback: function($$v) {
                              _vm.picker = $$v;
                            },
                            expression: "picker"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*",
                                      label: "Every Hour"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/2",
                                      label: "Even Hours"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "1-59/2",
                                      label: "Odd Hours"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/5",
                                      label: "Every 6 Hours"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/15",
                                      label: "Every 12 Hours"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "_",
                                      label: "Other"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.picker === "_"
                    ? _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c("v-select", {
                            attrs: {
                              multiple: "",
                              chips: "",
                              clearable: "",
                              disabled: _vm.picker !== "_",
                              items: _vm.hoursOptions,
                              value: _vm.selectedHoursList
                            },
                            on: {
                              change: function($event) {
                                return _vm.changedHoursList($event)
                              }
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      var __vue_inject_styles__$2 = undefined;
      /* scoped */
      var __vue_scope_id__$2 = undefined;
      /* module identifier */
      var __vue_module_identifier__$2 = undefined;
      /* functional template */
      var __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$2 = normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$3 = {
      name: "MonthPicker",
      mixins: [ array2string ],
      methods: {
        changedMonthsList: function changedMonthsList(newValue) {
          newValue.sort();
          this.months = this.array2string(newValue);
        },
        changed: function changed(newValue) {
          this.picker = newValue;
          if (newValue !== "_") {
            this.months = newValue;
          } else {
            var newString = this.array2string(newValue);
            if (newString.length > 1) {
              this.months = newString;
            }
          }
        }
      },
      computed: {
        monthsOptions: function monthsOptions() {
          return [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
        }
      },
      data: function data() {
        return {
          picker: "*",
          months: "",
          selectedMonthsList: []
        };
      },
      watch: {
        months: function months() {
          this.$emit('update', this.months);
        }
      },
      created: function created() {
        this.months = this.picker;
      }
    };

    /* script */
    var __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c("v-card-title", [_vm._v("Month")]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-radio-group",
                        {
                          on: {
                            change: function($event) {
                              return _vm.changed($event)
                            }
                          },
                          model: {
                            value: _vm.picker,
                            callback: function($$v) {
                              _vm.picker = $$v;
                            },
                            expression: "picker"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*",
                                      label: "Every Month"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/2",
                                      label: "Even Months"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "1-31/2",
                                      label: "Odd Months"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/4",
                                      label: "Every 4 Months"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*/6",
                                      label: "Every Half Year"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "4" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "_",
                                      label: "Other"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.picker === "_"
                    ? _c(
                        "v-col",
                        { attrs: { cols: "12" } },
                        [
                          _c("v-select", {
                            attrs: {
                              multiple: "",
                              chips: "",
                              clearable: "",
                              disabled: _vm.picker !== "_",
                              items: _vm.monthsOptions,
                              value: _vm.selectedMonthsList
                            },
                            on: {
                              change: function($event) {
                                return _vm.changedMonthsList($event)
                              }
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

      /* style */
      var __vue_inject_styles__$3 = undefined;
      /* scoped */
      var __vue_scope_id__$3 = undefined;
      /* module identifier */
      var __vue_module_identifier__$3 = undefined;
      /* functional template */
      var __vue_is_functional_template__$3 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$3 = normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$4 = {
      name: "WeekdayPicker",
      mixins: [array2string],
      methods: {
        changedWeekdayList: function changedWeekdayList(newValue) {
          newValue.sort();
          this.weekdays = this.array2string(newValue);
        },
        changed: function changed(newValue) {
          this.picker = newValue;
          if (newValue !== "_") {
            this.weekdays = newValue;
          } else {
            var newString = this.array2string(newValue);
            if (newString.length > 1) {
              this.weekdays = newString;
            }
          }
        }
      },
      computed: {
        weekdaysOptions: function weekdaysOptions() {
          return ["Sat", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        }
      },
      data: function data() {
        return {
          picker: "",
          weekdays: "",
          selectedWeekdaysList: []
        };
      },
      watch: {
        weekdays: function weekdays() {
          this.$emit("update", this.weekdays);
        }
      },
      created: function created() {
        this.weekdays = this.picker;
      }
    };

    /* script */
    var __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-card",
        { attrs: { outlined: "" } },
        [
          _c("v-card-title", [_vm._v("Weekdays")]),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _c(
                "v-row",
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c(
                        "v-radio-group",
                        {
                          on: {
                            change: function($event) {
                              return _vm.changed($event)
                            }
                          },
                          model: {
                            value: _vm.picker,
                            callback: function($$v) {
                              _vm.picker = $$v;
                            },
                            expression: "picker"
                          }
                        },
                        [
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "*",
                                      label: "Every Day"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "1,2,3,4,5",
                                      label: "Every Weekday"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-row",
                            [
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "0,6",
                                      label: "Weekends"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-col",
                                { attrs: { cols: "6" } },
                                [
                                  _c("v-radio", {
                                    attrs: {
                                      name: "picker",
                                      value: "_",
                                      label: "Other"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12" } },
                    [
                      _c("v-select", {
                        attrs: {
                          multiple: "",
                          chips: "",
                          clearable: "",
                          disabled: _vm.picker !== "_",
                          items: _vm.weekdaysOptions,
                          value: _vm.selectedWeekdaysList
                        },
                        on: {
                          change: function($event) {
                            return _vm.changedWeekdayList($event)
                          }
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      var __vue_inject_styles__$4 = undefined;
      /* scoped */
      var __vue_scope_id__$4 = undefined;
      /* module identifier */
      var __vue_module_identifier__$4 = undefined;
      /* functional template */
      var __vue_is_functional_template__$4 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$4 = normalizeComponent(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$5 = {
      name: "CronEditorAdvancedEditor",
      components: {
        MinutePicker: __vue_component__,
        HourPicker: __vue_component__$2,
        DayPicker: __vue_component__$1,
        MonthPicker: __vue_component__$3,
        WeekdayPicker: __vue_component__$4
      },
      props: {
        cron: {
          type: String,
          required: false
        }
      },
      data: function data() {
        return {
          storedId: 0,
          raw: {
            minutes: "",
            hours: "",
            days: "",
            months: "",
            weekday: ""
          }
        };
      },
      computed: {
        crontab: function crontab() {
          var newValue = this.raw.minutes + " " +
            this.raw.hours + " " + this.raw.days + " " +
            this.raw.months + " " + this.raw.weekday;
          this.$emit("update", newValue);
          return newValue;
        }
      },
      methods: {
        changeMinute: function changeMinute(newValue) {
          this.raw.minutes = newValue;
        },
        changeHour: function changeHour(newValue) {
          this.raw.hours = newValue;
        },
        changeDay: function changeDay(newValue) {
          this.raw.days = newValue;
        },
        changeMonths: function changeMonths(newValue) {
          this.raw.months = newValue;
        },
        changeWeekday: function changeWeekday(newValue) {
          this.raw.weekday = newValue;
        }
      },
      created: function created() {
        if (this.cron !== undefined) {
          this.crontab = this.cron;
        }
        if (this.id !== undefined) {
          this.storedId = this.id;
          console.log("weve got an id of ", this.storedId);
        }
        console.log("CRON/ID", this.cron, this.id);
      }
    };

    /* script */
    var __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-container",
        [
          _c(
            "v-row",
            { attrs: { "no-gutters": "" } },
            [
              _c(
                "v-col",
                { attrs: { cols: "4" } },
                [
                  _c("MinutePicker", {
                    on: {
                      update: function($event) {
                        return _vm.changeMinute($event)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "4" } },
                [
                  _c("HourPicker", {
                    on: {
                      update: function($event) {
                        return _vm.changeHour($event)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "4" } },
                [
                  _c("DayPicker", {
                    on: {
                      update: function($event) {
                        return _vm.changeDay($event)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("MonthPicker", {
                    on: {
                      update: function($event) {
                        return _vm.changeMonths($event)
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("WeekdayPicker", {
                    on: {
                      update: function($event) {
                        return _vm.changeWeekday($event)
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      var __vue_inject_styles__$5 = undefined;
      /* scoped */
      var __vue_scope_id__$5 = undefined;
      /* module identifier */
      var __vue_module_identifier__$5 = undefined;
      /* functional template */
      var __vue_is_functional_template__$5 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$5 = normalizeComponent(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$6 = {
      name: "CronSimpleEditor",
      methods: {
        updateValue: function updateValue(newValue) {
          this.crontab = newValue;
          this.$emit("update", this.crontab);
        },
      },
      data: function data() {
        return {
          crontab: "",
        };
      },
    };

    /* script */
    var __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-container",
        [
          _c(
            "v-row",
            { attrs: { "no-gutters": "" } },
            [
              _c(
                "v-col",
                { attrs: { cols: "3" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { rounded: "", block: "", "x-large": "" },
                      on: {
                        click: function($event) {
                          return _vm.updateValue("* */6 * * *")
                        }
                      }
                    },
                    [_vm._v("Every 6 Hours")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "3" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { rounded: "", block: "", "x-large": "" },
                      on: {
                        click: function($event) {
                          return _vm.updateValue("* 9 * *")
                        }
                      }
                    },
                    [_vm._v("Daily at 9am")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "3" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { rounded: "", block: "", "x-large": "" },
                      on: {
                        click: function($event) {
                          return _vm.updateValue("* 9-17 * * mon-fri")
                        }
                      }
                    },
                    [_vm._v("Monday to Friday, 9-5")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "3" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { rounded: "", block: "", "x-large": "" },
                      on: {
                        click: function($event) {
                          return _vm.updateValue("* 10-16 * * sat,sun")
                        }
                      }
                    },
                    [_vm._v("Saturday and Sunday, 10-4")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      var __vue_inject_styles__$6 = undefined;
      /* scoped */
      var __vue_scope_id__$6 = undefined;
      /* module identifier */
      var __vue_module_identifier__$6 = undefined;
      /* functional template */
      var __vue_is_functional_template__$6 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$6 = normalizeComponent(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        false,
        undefined,
        undefined,
        undefined
      );

    //

    var script$7 = {
        name: 'vuetifyCronedit',
        created: function created() {
            this.crontab = this.cron;
        },
        components: {
        AdvancedEditor: __vue_component__$5,
        SimpleEditor: __vue_component__$6
      },
      props: {
        cron: {
          type: String,
          required: false
        }
      },
      data: function data() {
        return {
          crontab: "* * * * *"
        };
      },
      methods: {
        update: function update(newValue) {
          console.log('vuetify-cronedit:update', newValue);
          this.crontab = newValue;
          this.$emit('changed', newValue);
        }
      }
    };

    /* script */
    var __vue_script__$7 = script$7;

    /* template */
    var __vue_render__$7 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        [
          _c(
            "v-card",
            [
              _c(
                "v-toolbar",
                { attrs: { flat: "", color: "primary", dark: "" } },
                [_c("v-toolbar-title", [_vm._v("Schedule")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c("p", [_vm._v(_vm._s(_vm.crontab))]),
                  _vm._v(" "),
                  _c(
                    "v-tabs",
                    [
                      _c("v-tab", [_vm._v("Simple Mode")]),
                      _vm._v(" "),
                      _c("v-tab", [_vm._v("Advanced Mode")]),
                      _vm._v(" "),
                      _c(
                        "v-tab-item",
                        [
                          _c(
                            "v-card",
                            [
                              _c(
                                "v-card-text",
                                [
                                  _c("SimpleEditor", {
                                    on: {
                                      update: function($event) {
                                        return _vm.update($event)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tab-item",
                        [
                          _c(
                            "v-card",
                            [
                              _c(
                                "v-card-text",
                                [
                                  _c("AdvancedEditor", {
                                    on: {
                                      update: function($event) {
                                        return _vm.update($event)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    };
    var __vue_staticRenderFns__$7 = [];
    __vue_render__$7._withStripped = true;

      /* style */
      var __vue_inject_styles__$7 = undefined;
      /* scoped */
      var __vue_scope_id__$7 = undefined;
      /* module identifier */
      var __vue_module_identifier__$7 = undefined;
      /* functional template */
      var __vue_is_functional_template__$7 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__$7 = normalizeComponent(
        { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
        __vue_inject_styles__$7,
        __vue_script__$7,
        __vue_scope_id__$7,
        __vue_is_functional_template__$7,
        __vue_module_identifier__$7,
        false,
        undefined,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('VuetifyCronedit', __vue_component__$7);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.default = __vue_component__$7;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
