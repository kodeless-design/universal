/*!
  * Universal button.js v1.0.2 (undefined)
  * Copyright 2020-2020 Kodeless Design
  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./dom/data.js'), require('./dom/event-handler.js')) :
  typeof define === 'function' && define.amd ? define(['./dom/data', './dom/event-handler'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Button = factory(global.Data, global.EventHandler));
}(this, (function (Data, EventHandler) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Universal (v1.0.2): util/index.js
   * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-un-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var onDOMContentLoaded = function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  var isRTL = document.documentElement.dir === 'rtl';

  var defineJQueryPlugin = function defineJQueryPlugin(name, plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var VERSION = '5.0.0-beta1';

  var BaseComponent = /*#__PURE__*/function () {
    function BaseComponent(element) {
      if (!element) {
        return;
      }

      this._element = element;
      Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
    }

    var _proto = BaseComponent.prototype;

    _proto.dispose = function dispose() {
      Data__default['default'].removeData(this._element, this.constructor.DATA_KEY);
      this._element = null;
    }
    /** Static */
    ;

    BaseComponent.getInstance = function getInstance(element) {
      return Data__default['default'].getData(element, this.DATA_KEY);
    };

    _createClass(BaseComponent, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return BaseComponent;
  }();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var CLASS_NAME_ACTIVE = 'active';
  var SELECTOR_DATA_TOGGLE = '[data-un-toggle="button"]';
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function (_BaseComponent) {
    _inheritsLoose(Button, _BaseComponent);

    function Button() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
    } // Static
    ;

    Button.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        var data = Data__default['default'].getData(this, DATA_KEY);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "DATA_KEY",
      // Getters
      get: function get() {
        return DATA_KEY;
      }
    }]);

    return Button;
  }(BaseComponent);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target.closest(SELECTOR_DATA_TOGGLE);
    var data = Data__default['default'].getData(button, DATA_KEY);

    if (!data) {
      data = new Button(button);
    }

    data.toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  defineJQueryPlugin(NAME, Button);

  return Button;

})));
//# sourceMappingURL=button.js.map
