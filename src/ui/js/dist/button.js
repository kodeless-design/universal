/*!
  * Universal button.js v1.0.0 (undefined)
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

  /**
   * --------------------------------------------------------------------------
   * Universal (v1.0.0): util/index.js
   * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const getjQuery = () => {
    const {
      jQuery
    } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  const isRTL = document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = (name, plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Universal (v1.0.0): base-component.js
   * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.0.0-beta1';

  class BaseComponent {
    constructor(element) {
      if (!element) {
        return;
      }

      this._element = element;
      Data__default['default'].setData(element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data__default['default'].removeData(this._element, this.constructor.DATA_KEY);
      this._element = null;
    }
    /** Static */


    static getInstance(element) {
      return Data__default['default'].getData(element, this.DATA_KEY);
    }

    static get VERSION() {
      return VERSION;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Universal (v1.0.0): button.js
   * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'button';
  const DATA_KEY = 'bs.button';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const CLASS_NAME_ACTIVE = 'active';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Button extends BaseComponent {
    // Getters
    static get DATA_KEY() {
      return DATA_KEY;
    } // Public


    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        let data = Data__default['default'].getData(this, DATA_KEY);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default['default'].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
    let data = Data__default['default'].getData(button, DATA_KEY);

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
