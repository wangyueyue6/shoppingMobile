(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
if (!target[key].canIUse('getAppBaseInfo')) {
  target[key].getAppBaseInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getWindowInfo')) {
  target[key].getWindowInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getDeviceInfo')) {
  target[key].getDeviceInfo = target[key].getSystemInfoSync;
}
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (!res) {
          resolve(res);
          return;
        }
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|__f__|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|rpx2px|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _Object$assign = Object.assign({}, wx.getWindowInfo(), {
      platform: wx.getDeviceInfo().platform
    }),
    windowWidth = _Object$assign.windowWidth,
    pixelRatio = _Object$assign.pixelRatio,
    platform = _Object$assign.platform; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
function getLocaleLanguage() {
  var localeLanguage = '';
  {
    var appBaseInfo = wx.getAppBaseInfo();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
var locale;
{
  locale = getLocaleLanguage();
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return getLocaleLanguage();
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  rpx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = (language || '').replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__66A6048",
    appName: "mcyx-shop-h5",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.57",
    uniCompilerVersion: "4.57",
    uniRuntimeVersion: "4.57",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined,
    isUniAppX: false
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = (language || '').replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__66A6048",
      appName: "mcyx-shop-h5",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      isUniAppX: false,
      uniPlatform: undefined || "mp-weixin",
      uniCompileVersion: "4.57",
      uniCompilerVersion: "4.57",
      uniRuntimeVersion: "4.57"
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
function __f__(type) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  console[type].apply(console, args);
}
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback,
  __f__: __f__
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mcyx-shop-h5","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, getLocaleLanguage$1());
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function getLocaleLanguage$1() {
  var localeLanguage = '';
  {
    var appBaseInfo = wx.getAppBaseInfo();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2024 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mcyx-shop-h5","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mcyx-shop-h5","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mcyx-shop-h5","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mcyx-shop-h5","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!********************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!**********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni.promisify.adaptor.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (_typeof(res) === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (!res) return resolve(res);
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */
/*!***************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 35));
var _mpMixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpMixin.js */ 36));
var _luchRequest = _interopRequireDefault(__webpack_require__(/*! ./libs/luch-request */ 37));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/util/route.js */ 55));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 59));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 60));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 61));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 62));
var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index.js */ 63));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 66));
var _props = _interopRequireDefault(__webpack_require__(/*! ./libs/config/props.js */ 67));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 157));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/config/color.js */ 115));
var _platform = _interopRequireDefault(__webpack_require__(/*! ./libs/function/platform */ 158));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 看到此报错，是因为没有配置vue.config.js的【transpileDependencies】，详见：https://www.uviewui.com/components/npmSetting.html#_5-cli模式额外配置
var pleaseSetTranspileDependencies = {},
  babelTest = pleaseSetTranspileDependencies === null || pleaseSetTranspileDependencies === void 0 ? void 0 : pleaseSetTranspileDependencies.test;

// 引入全局mixin

var $u = _objectSpread(_objectSpread({
  route: _route.default,
  date: _index.default.timeFormat,
  // 另名date
  colorGradient: _colorGradient.default.colorGradient,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  colorToRgba: _colorGradient.default.colorToRgba,
  test: _test.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: new _luchRequest.default(),
  config: _config.default,
  // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default,
  mixin: _mixin.default,
  mpMixin: _mpMixin.default,
  props: _props.default
}, _index.default), {}, {
  color: _color.default,
  platform: _platform.default
});

// $u挂载到uni对象上
uni.$u = $u;
var install = function install(Vue) {
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return uni.$u.timeFrom(timestamp, format);
  });
  // 同时挂载到uni和Vue.prototype中

  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.prototype.$u = $u;
  Vue.mixin(_mixin.default);
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 35 */
/*!**************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/mixin/mixin.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ''
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u: function $u() {
      // 在非nvue端，移除props，http，mixin等对象，避免在小程序setData时数据过大影响性能
      return uni.$u.deepMerge(uni.$u, {
        props: undefined,
        http: undefined,
        mixin: undefined
      });
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem: function bem() {
      return function (name, fixed, change) {
        var _this = this;
        // 类名前缀
        var prefix = "u-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
        // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      };
    }
  },

  methods: {
    // 跳转某一个页面
    openPage: function openPage() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {
      var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this2)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this3 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = uni.$u.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 36 */
/*!****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/mixin/mpMixin.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
};
exports.default = _default;

/***/ }),
/* 37 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 38));
var _default = _Request.default;
exports.default = _default;

/***/ }),
/* 38 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/Request.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 39));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 47));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 48));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 49));
var _utils = __webpack_require__(/*! ../utils */ 42);
var _clone = _interopRequireDefault(__webpack_require__(/*! ../utils/clone */ 50));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  /**
  * @param {Object} arg - 全局配置
  * @param {String} arg.baseURL - 全局根路径
  * @param {Object} arg.header - 全局header
  * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
  * @param {String} arg.dataType = [json] - 全局默认的dataType
  * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
  * @param {Object} arg.custom - 全局默认的自定义参数
  * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
  * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
  * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
  * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
  * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
  */
  function Request() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = (0, _clone.default)(_objectSpread(_objectSpread({}, _defaults.default), arg));
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
  * @Function
  * @param {Request~setConfigCallback} f - 设置全局默认配置
  */
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value: function setConfig(f) {
      this.config = f(this.config);
    }
  }, {
    key: "middleware",
    value: function middleware(config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }

    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
  }, {
    key: "request",
    value: function request() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET'
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "connect",
    value: function connect(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT'
      }, options));
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD'
      }, options));
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS'
      }, _options));
    }
  }, {
    key: "trace",
    value: function trace(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE'
      }, options));
    }
  }, {
    key: "upload",
    value: function upload(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    }
  }, {
    key: "download",
    value: function download(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    }
  }]);
  return Request;
}();
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
exports.default = Request;

/***/ }),
/* 39 */
/*!************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/dispatchRequest.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 40));
var _default = function _default(config) {
  return (0, _index.default)(config);
};
exports.default = _default;

/***/ }),
/* 40 */
/*!******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/adapters/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 41));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 43));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 46));
var _utils = __webpack_require__(/*! ../utils */ 42);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 返回可选值存在的配置
 * @param {Array} keys - 可选值数组
 * @param {Object} config2 - 配置
 * @return {{}} - 存在的配置项
 */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
var _default = function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        (0, _settle.default)(resolve, reject, response);
      }
    };
    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      var optionalKeys = ['formData'];
      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = ['data', 'method', 'timeout', 'dataType', 'responseType'];
      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 41 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/helpers/buildURL.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var utils = _interopRequireWildcard(__webpack_require__(/*! ../utils */ 42));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }
  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils.isArray(val)) {
        key = "".concat(key, "[]");
      } else {
        val = [val];
      }
      utils.forEach(val, function (v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push("".concat(encode(key), "=").concat(encode(v)));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/***/ }),
/* 42 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/utils.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMerge = deepMerge;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isURLSearchParams = isURLSearchParams;
exports.isUndefined = isUndefined;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((0, _typeof2.default)(obj) !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 43 */
/*!**********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/buildFullPath.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 44));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 45));
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 44 */
/*!*************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 45 */
/*!***********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/helpers/combineURLs.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? "".concat(baseURL.replace(/\/+$/, ''), "/").concat(relativeURL.replace(/^\/+/, '')) : baseURL;
}

/***/ }),
/* 46 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/settle.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 47 */
/*!***************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/InterceptorManager.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var _default = InterceptorManager;
exports.default = _default;

/***/ }),
/* 48 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/mergeConfig.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../utils */ 42);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
 * @param {Array} keys - 配置项
 * @param {Object} globalsConfig - 当前的全局配置
 * @param {Object} config2 - 局部配置
 * @return {{}}
 */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
 *
 * @param globalsConfig - 当前实例的全局配置
 * @param config2 - 当前的局部配置
 * @return - 合并后的配置
 */
var _default = function _default(globalsConfig) {
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {})
  };
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {} else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = ['filePath', 'name', 'formData'];
    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = ['data', 'timeout', 'dataType', 'responseType'];
    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.default = _default;

/***/ }),
/* 49 */
/*!*****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/core/defaults.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 默认的全局配置
 */
var _default = {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  custom: {},
  timeout: 60000,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
exports.default = _default;

/***/ }),
/* 50 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/luch-request/utils/clone.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/* eslint-disable */
var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
   */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((0, _typeof2.default)(circular) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != 'undefined';
    if (typeof circular == 'undefined') circular = true;
    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;
      if (depth === 0) return parent;
      var child;
      var proto;
      if ((0, _typeof2.default)(parent) != 'object') {
        return parent;
      }
      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        if (Buffer.from) {
          // Node.js >= 5.10.0
          child = Buffer.from(parent);
        } else {
          // Older Node.js versions
          child = new Buffer(parent.length);
          parent.copy(child);
        }
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index = allParents.indexOf(parent);
        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }
      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }
      for (var i in parent) {
        var attrs = Object.getOwnPropertyDescriptor(parent, i);
        if (attrs) {
          child[i] = _clone(parent[i], depth - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent, i);
          if (objProperty.set === 'undefined') {
            // no setter defined. Skip cloning this property
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        } catch (e) {
          if (e instanceof TypeError) {
            // when in strict mode, TypeError will be thrown if child[i] property only has a getter
            // we can't do anything about this, other than inform the user that this property cannot be set.
            continue;
          } else if (e instanceof ReferenceError) {
            //this may happen in non strict mode
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;
    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;
  function __isDate(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;
  function __isArray(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;
  function __isRegExp(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;
  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;
  return clone;
}();
var _default = clone;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 51).Buffer))

/***/ }),
/* 51 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 52)
var ieee754 = __webpack_require__(/*! ieee754 */ 53)
var isArray = __webpack_require__(/*! isarray */ 54)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 52 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 53 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 54 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 55 */
/*!*************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/util/route.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: 'pop-in',
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = uni.$u.queryParams(params);
      return url += query;
    }

    // 对外的方法名称
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};
                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepMerge(this.config, options);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === uni.$u.page())) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {
                  _context.next = 16;
                  break;
                }
                _context.next = 12;
                return new Promise(function (resolve, reject) {
                  uni.$u.routeIntercept(mergeConfig, resolve);
                });
              case 12:
                isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);
                _context.next = 17;
                break;
              case 16:
                this.openPage(mergeConfig);
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // 执行路由跳转
  }, {
    key: "openPage",
    value: function openPage(config) {
      // 解构参数
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 56 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 57)();
module.exports = runtime;

/***/ }),
/* 57 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 58 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 59 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/colorGradient.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; // 总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    var hex = rgbToHex("rgb(".concat(Math.round(sR * i + startR), ",").concat(Math.round(sG * i + startG), ",").concat(Math.round(sB * i + startB), ")"));
    // 确保第一个颜色值为startColor的值
    if (i === 0) hex = rgbToHex(startColor);
    // 确保最后一个颜色值为endColor的值
    if (i === step - 1) hex = rgbToHex(endColor);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i, _i + 2))));
    }
    if (!str) {
      return sColorChange;
    }
    return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return arr.map(function (val) {
      return Number(val);
    });
  }
  return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? "".concat(0, hex) : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    var aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      var numHex = '#';
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
* JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
* sHex为传入的十六进制的色值
* alpha为rgba的透明度
*/
function colorToRgba(color, alpha) {
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = String(color).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i3, _i3 + 2))));
    }
    // return sColorChange.join(',')
    return "rgba(".concat(sColorChange.join(','), ",").concat(alpha, ")");
  }
  return sColor;
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba
};
exports.default = _default;

/***/ }),
/* 60 */
/*!****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/test.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证字符串
 */
function string(value) {
  return typeof value === 'string';
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function func(value) {
  return typeof value === 'function';
}

/**
 * 是否promise对象
 * @param {Object} value
 */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
 * @param {Object} value
 */
function image(value) {
  var newValue = value.split('?')[0];
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}

/**
 * 是否为正则对象
 * @param {Object}
 * @return {Boolean}
 */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code,
  func: func,
  promise: promise,
  video: video,
  image: image,
  regExp: regExp,
  string: string
};
exports.default = _default;

/***/ }),
/* 61 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/debounce.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 62 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/throttle.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer;
var flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = throttle;
exports.default = _default;

/***/ }),
/* 63 */
/*!*****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 60));
var _digit = __webpack_require__(/*! ./digit.js */ 64);
/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_test.default.number(value)) {
    return unit ? "".concat(value, "px") : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$u.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
function sleep() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}
/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
function sys() {
  return uni.getSystemInfoSync();
}

/**
 * @description 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
function addStyle(customStyle) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if (_test.default.empty(customStyle) || (0, _typeof2.default)(customStyle) === 'object' && target === 'object' || target === 'string' && typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
function addUnit() {
  var _uni$$u$config$unit, _uni, _uni$$u, _uni$$u$config;
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_uni$$u$config$unit = (_uni = uni) === null || _uni === void 0 ? void 0 : (_uni$$u = _uni.$u) === null || _uni$$u === void 0 ? void 0 : (_uni$$u$config = _uni$$u.config) === null || _uni$$u$config === void 0 ? void 0 : _uni$$u$config.unit) !== null && _uni$$u$config$unit !== void 0 ? _uni$$u$config$unit : 'px';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (obj === null || (0, _typeof2.default)(obj) !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  var clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return [key, deepClone(value, cache)];
    }));
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, function (value) {
      return deepClone(value, cache);
    }));
  } else if (Array.isArray(obj)) {
    clone = obj.map(function (value) {
      return deepClone(value, cache);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (var _i3 = 0, _Object$entries = Object.entries(obj); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i3], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if ((0, _typeof2.default)(target) !== 'object' || target === null || (0, _typeof2.default)(source) !== 'object' || source === null) return target;
  var merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    var sourceValue = source[prop];
    var targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if ((0, _typeof2.default)(sourceValue) === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}

/**
 * @description error提示
 * @param {*} err 错误内容
 */
function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uView\u63D0\u793A\uFF1A".concat(err));
  }
}

/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String');
    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  var date;
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date();
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime === null || dateTime === void 0 ? void 0 : dateTime.toString().trim())) {
    date = new Date(dateTime * 1000);
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime));
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'));
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime);
  }
  var timeSource = {
    'y': date.getFullYear().toString(),
    // 年
    'm': (date.getMonth() + 1).toString().padStart(2, '0'),
    // 月
    'd': date.getDate().toString().padStart(2, '0'),
    // 日
    'h': date.getHours().toString().padStart(2, '0'),
    // 时
    'M': date.getMinutes().toString().padStart(2, '0'),
    // 分
    's': date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var key in timeSource) {
    var _ref3 = new RegExp("".concat(key, "+")).exec(formatStr) || [],
      _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
      ret = _ref4[0];
    if (ret) {
      // 年可能只需展示两位
      var beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }
  return formatStr;
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }
  }
  return tips;
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
      }
    } else {
      _result.push("".concat(key, "=").concat(value));
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration
  });
}

/**
 * @description 根据主题type值,获取对应的图标
 * @param {String} type 主题名称,primary|info|error|warning|success
 * @param {boolean} fill 是否使用fill填充实体的图标
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
function priceFormat(number) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  s = (prec ? (0, _digit.round)(n, prec) + '' : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @description 获取duration值
 * 如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
 * 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
 * @param {String|number} value 比如: "1s"|"100ms"|1|100
 * @param {boolean} unit  提示: 如果是false 默认返回number
 * @return {string|number}
 */
function getDuration(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
function padZero(value) {
  return "00".concat(value).slice(-2);
}

/**
 * @description 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
function formValidate(instance, event) {
  var formItem = uni.$u.$parent.call(instance, 'u-form-item');
  var form = uni.$u.$parent.call(instance, 'u-form');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }
  if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};
    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

/**
 * @description 设置对象的属性值，如果'a.b.c'的形式进行设置
 * @param {object} obj 对象
 * @param {string} key 需要设置的属性
 * @param {string} value 设置的值
 */
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || (0, _typeof2.default)(_obj[k]) !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== 'string' || key === '') {} else if (key.indexOf('.') !== -1) {
    // 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

/**
 * @description 获取当前页面路径
 */
function page() {
  var _pages$route, _pages;
  var pages = getCurrentPages();
  // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
  return "/".concat((_pages$route = (_pages = pages[pages.length - 1]) === null || _pages === void 0 ? void 0 : _pages.route) !== null && _pages$route !== void 0 ? _pages$route : '');
}

/**
 * @description 获取当前路由栈实例数组
 */
function pages() {
  var pages = getCurrentPages();
  return pages;
}

/**
 * 获取页面历史栈指定层实例
 * @param back {number} [0] - 0或者负数，表示获取历史栈的哪一层，0表示获取当前页面实例，-1 表示获取上一个页面实例。默认0。
 */
function getHistoryPage() {
  var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pages = getCurrentPages();
  var len = pages.length;
  return pages[len - 1 + back];
}

/**
 * @description 修改uView内置属性值
 * @param {object} props 修改内置props属性
 * @param {object} config 修改内置config属性
 * @param {object} color 修改内置color属性
 * @param {object} zIndex 修改内置zIndex属性
 */
function setConfig(_ref5) {
  var _ref5$props = _ref5.props,
    props = _ref5$props === void 0 ? {} : _ref5$props,
    _ref5$config = _ref5.config,
    config = _ref5$config === void 0 ? {} : _ref5$config,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? {} : _ref5$color,
    _ref5$zIndex = _ref5.zIndex,
    zIndex = _ref5$zIndex === void 0 ? {} : _ref5$zIndex;
  var deepMerge = uni.$u.deepMerge;
  uni.$u.config = deepMerge(uni.$u.config, config);
  uni.$u.props = deepMerge(uni.$u.props, props);
  uni.$u.color = deepMerge(uni.$u.color, color);
  uni.$u.zIndex = deepMerge(uni.$u.zIndex, zIndex);
}
var _default = {
  range: range,
  getPx: getPx,
  sleep: sleep,
  os: os,
  sys: sys,
  random: random,
  guid: guid,
  $parent: $parent,
  addStyle: addStyle,
  addUnit: addUnit,
  deepClone: deepClone,
  deepMerge: deepMerge,
  error: error,
  randomArray: randomArray,
  timeFormat: timeFormat,
  timeFrom: timeFrom,
  trim: trim,
  queryParams: queryParams,
  toast: toast,
  type2icon: type2icon,
  priceFormat: priceFormat,
  getDuration: getDuration,
  padZero: padZero,
  formValidate: formValidate,
  getProperty: getProperty,
  setProperty: setProperty,
  page: page,
  pages: pages,
  getHistoryPage: getHistoryPage,
  setConfig: setConfig
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 64 */
/*!*****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/digit.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.divide = divide;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports.minus = minus;
exports.plus = plus;
exports.round = round;
exports.times = times;
var _toArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toArray */ 65));
var _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn("".concat(num, " \u8D85\u51FA\u4E86\u7CBE\u5EA6\u9650\u5236\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u6B63\u786E"));
    }
  }
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {function} operation 迭代操作
 * @private
 */
function iteratorOperation(arr, operation) {
  var _arr = (0, _toArray2.default)(arr),
    num1 = _arr[0],
    num2 = _arr[1],
    others = _arr.slice(2);
  var res = operation(num1, num2);
  others.forEach(function (num) {
    res = operation(res, num);
  });
  return res;
}

/**
 * 高精度乘法
 * @export
 */
function times() {
  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 */
function plus() {
  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  // 取最大的小数位
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 */
function minus() {
  for (var _len3 = arguments.length, nums = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    nums[_key3] = arguments[_key3];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 */
function divide() {
  for (var _len4 = arguments.length, nums = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    nums[_key4] = arguments[_key4];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // 重要，这里必须用strip进行修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 * @export
 */
function round(num, ratio) {
  var base = Math.pow(10, ratio);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  // 位数不足则补0
  return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
function enableBoundaryChecking() {
  var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  _boundaryCheckingState = flag;
}
var _default = {
  times: times,
  plus: plus,
  minus: minus,
  divide: divide,
  round: round,
  enableBoundaryChecking: enableBoundaryChecking
};
exports.default = _default;

/***/ }),
/* 65 */
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 66 */
/*!****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/config.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 此版本发布于2024-03-17
var version = '2.0.37';

// 开发环境才提示，生产环境不会提示
if (true) {
  console.log("\n %c uView V".concat(version, " %c https://uviewui.com/ \n\n"), 'color: #ffffff; background: #3c9cff; padding:5px 0; border-radius: 5px;');
}
var _default = {
  v: version,
  version: version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning'],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'u-primary': '#2979ff',
    'u-warning': '#ff9900',
    'u-success': '#19be6b',
    'u-error': '#fa3534',
    'u-info': '#909399',
    'u-main-color': '#303133',
    'u-content-color': '#606266',
    'u-tips-color': '#909399',
    'u-light-color': '#c0c4cc'
  },
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: 'px'
};
exports.default = _default;

/***/ }),
/* 67 */
/*!***************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 66));
var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./props/actionSheet.js */ 68));
var _album = _interopRequireDefault(__webpack_require__(/*! ./props/album.js */ 69));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./props/alert.js */ 70));
var _avatar = _interopRequireDefault(__webpack_require__(/*! ./props/avatar */ 71));
var _avatarGroup = _interopRequireDefault(__webpack_require__(/*! ./props/avatarGroup */ 72));
var _backtop = _interopRequireDefault(__webpack_require__(/*! ./props/backtop */ 73));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./props/badge */ 74));
var _button = _interopRequireDefault(__webpack_require__(/*! ./props/button */ 75));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./props/calendar */ 76));
var _carKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/carKeyboard */ 77));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./props/cell */ 78));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./props/cellGroup */ 79));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./props/checkbox */ 80));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./props/checkboxGroup */ 81));
var _circleProgress = _interopRequireDefault(__webpack_require__(/*! ./props/circleProgress */ 82));
var _code = _interopRequireDefault(__webpack_require__(/*! ./props/code */ 83));
var _codeInput = _interopRequireDefault(__webpack_require__(/*! ./props/codeInput */ 84));
var _col = _interopRequireDefault(__webpack_require__(/*! ./props/col */ 85));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./props/collapse */ 86));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./props/collapseItem */ 87));
var _columnNotice = _interopRequireDefault(__webpack_require__(/*! ./props/columnNotice */ 88));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./props/countDown */ 89));
var _countTo = _interopRequireDefault(__webpack_require__(/*! ./props/countTo */ 90));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./props/datetimePicker */ 91));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./props/divider */ 92));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./props/empty */ 93));
var _form = _interopRequireDefault(__webpack_require__(/*! ./props/form */ 94));
var _formItem = _interopRequireDefault(__webpack_require__(/*! ./props/formItem */ 95));
var _gap = _interopRequireDefault(__webpack_require__(/*! ./props/gap */ 96));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./props/grid */ 97));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./props/gridItem */ 98));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./props/icon */ 99));
var _image = _interopRequireDefault(__webpack_require__(/*! ./props/image */ 100));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./props/indexAnchor */ 101));
var _indexList = _interopRequireDefault(__webpack_require__(/*! ./props/indexList */ 102));
var _input = _interopRequireDefault(__webpack_require__(/*! ./props/input */ 103));
var _keyboard = _interopRequireDefault(__webpack_require__(/*! ./props/keyboard */ 104));
var _line = _interopRequireDefault(__webpack_require__(/*! ./props/line */ 105));
var _lineProgress = _interopRequireDefault(__webpack_require__(/*! ./props/lineProgress */ 106));
var _link = _interopRequireDefault(__webpack_require__(/*! ./props/link */ 107));
var _list = _interopRequireDefault(__webpack_require__(/*! ./props/list */ 108));
var _listItem = _interopRequireDefault(__webpack_require__(/*! ./props/listItem */ 109));
var _loadingIcon = _interopRequireDefault(__webpack_require__(/*! ./props/loadingIcon */ 110));
var _loadingPage = _interopRequireDefault(__webpack_require__(/*! ./props/loadingPage */ 111));
var _loadmore = _interopRequireDefault(__webpack_require__(/*! ./props/loadmore */ 112));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./props/modal */ 113));
var _navbar = _interopRequireDefault(__webpack_require__(/*! ./props/navbar */ 114));
var _noNetwork = _interopRequireDefault(__webpack_require__(/*! ./props/noNetwork */ 116));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./props/noticeBar */ 117));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./props/notify */ 118));
var _numberBox = _interopRequireDefault(__webpack_require__(/*! ./props/numberBox */ 119));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/numberKeyboard */ 120));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./props/overlay */ 121));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./props/parse */ 122));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./props/picker */ 123));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./props/popup */ 124));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./props/radio */ 125));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./props/radioGroup */ 126));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./props/rate */ 127));
var _readMore = _interopRequireDefault(__webpack_require__(/*! ./props/readMore */ 128));
var _row = _interopRequireDefault(__webpack_require__(/*! ./props/row */ 129));
var _rowNotice = _interopRequireDefault(__webpack_require__(/*! ./props/rowNotice */ 130));
var _scrollList = _interopRequireDefault(__webpack_require__(/*! ./props/scrollList */ 131));
var _search = _interopRequireDefault(__webpack_require__(/*! ./props/search */ 132));
var _section = _interopRequireDefault(__webpack_require__(/*! ./props/section */ 133));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./props/skeleton */ 134));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./props/slider */ 135));
var _statusBar = _interopRequireDefault(__webpack_require__(/*! ./props/statusBar */ 136));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./props/steps */ 137));
var _stepsItem = _interopRequireDefault(__webpack_require__(/*! ./props/stepsItem */ 138));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./props/sticky */ 139));
var _subsection = _interopRequireDefault(__webpack_require__(/*! ./props/subsection */ 140));
var _swipeAction = _interopRequireDefault(__webpack_require__(/*! ./props/swipeAction */ 141));
var _swipeActionItem = _interopRequireDefault(__webpack_require__(/*! ./props/swipeActionItem */ 142));
var _swiper = _interopRequireDefault(__webpack_require__(/*! ./props/swiper */ 143));
var _swipterIndicator = _interopRequireDefault(__webpack_require__(/*! ./props/swipterIndicator */ 144));
var _switch2 = _interopRequireDefault(__webpack_require__(/*! ./props/switch */ 145));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./props/tabbar */ 146));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./props/tabbarItem */ 147));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./props/tabs */ 148));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./props/tag */ 149));
var _text = _interopRequireDefault(__webpack_require__(/*! ./props/text */ 150));
var _textarea = _interopRequireDefault(__webpack_require__(/*! ./props/textarea */ 151));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./props/toast */ 152));
var _toolbar = _interopRequireDefault(__webpack_require__(/*! ./props/toolbar */ 153));
var _tooltip = _interopRequireDefault(__webpack_require__(/*! ./props/tooltip */ 154));
var _transition = _interopRequireDefault(__webpack_require__(/*! ./props/transition */ 155));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./props/upload */ 156));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var color = _config.default.color;
var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actionSheet.default), _album.default), _alert.default), _avatar.default), _avatarGroup.default), _backtop.default), _badge.default), _button.default), _calendar.default), _carKeyboard.default), _cell.default), _cellGroup.default), _checkbox.default), _checkboxGroup.default), _circleProgress.default), _code.default), _codeInput.default), _col.default), _collapse.default), _collapseItem.default), _columnNotice.default), _countDown.default), _countTo.default), _datetimePicker.default), _divider.default), _empty.default), _form.default), _formItem.default), _gap.default), _grid.default), _gridItem.default), _icon.default), _image.default), _indexAnchor.default), _indexList.default), _input.default), _keyboard.default), _line.default), _lineProgress.default), _link.default), _list.default), _listItem.default), _loadingIcon.default), _loadingPage.default), _loadmore.default), _modal.default), _navbar.default), _noNetwork.default), _noticeBar.default), _notify.default), _numberBox.default), _numberKeyboard.default), _overlay.default), _parse.default), _picker.default), _popup.default), _radio.default), _radioGroup.default), _rate.default), _readMore.default), _row.default), _rowNotice.default), _scrollList.default), _search.default), _section.default), _skeleton.default), _slider.default), _statusBar.default), _steps.default), _stepsItem.default), _sticky.default), _subsection.default), _swipeAction.default), _swipeActionItem.default), _swiper.default), _swipterIndicator.default), _switch2.default), _tabbar.default), _tabbarItem.default), _tabs.default), _tag.default), _text.default), _textarea.default), _toast.default), _toolbar.default), _tooltip.default), _transition.default), _upload.default);
exports.default = _default;

/***/ }),
/* 68 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/actionSheet.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:44:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
 */
var _default = {
  // action-sheet组件
  actionSheet: {
    show: false,
    title: '',
    description: '',
    actions: function actions() {
      return [];
    },
    index: '',
    cancelText: '',
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: '',
    closeOnClickOverlay: true,
    round: 0
  }
};
exports.default = _default;

/***/ }),
/* 69 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/album.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:47:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/album.js
 */
var _default = {
  // album 组件
  album: {
    urls: function urls() {
      return [];
    },
    keyName: '',
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: 'scaleToFill',
    multipleMode: 'aspectFill',
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true
  }
};
exports.default = _default;

/***/ }),
/* 70 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/alert.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:48:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/alert.js
 */
var _default = {
  // alert警告组件
  alert: {
    title: '',
    type: 'warning',
    description: '',
    closable: false,
    showIcon: false,
    effect: 'light',
    center: false,
    fontSize: 14
  }
};
exports.default = _default;

/***/ }),
/* 71 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/avatar.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:22
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatar.js
 */
var _default = {
  // avatar 组件
  avatar: {
    src: '',
    shape: 'circle',
    size: 40,
    mode: 'scaleToFill',
    text: '',
    bgColor: '#c0c4cc',
    color: '#ffffff',
    fontSize: 18,
    icon: '',
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: '',
    colorIndex: '',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 72 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/avatarGroup.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatarGroup.js
 */
var _default = {
  // avatarGroup 组件
  avatarGroup: {
    urls: function urls() {
      return [];
    },
    maxCount: 5,
    shape: 'circle',
    mode: 'scaleToFill',
    showMore: true,
    size: 40,
    keyName: '',
    gap: 0.5,
    extraValue: 0
  }
};
exports.default = _default;

/***/ }),
/* 73 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/backtop.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:50:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/backtop.js
 */
var _default = {
  // backtop组件
  backtop: {
    mode: 'circle',
    icon: 'arrow-upward',
    text: '',
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: function iconStyle() {
      return {
        color: '#909399',
        fontSize: '19px'
      };
    }
  }
};
exports.default = _default;

/***/ }),
/* 74 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/badge.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 19:51:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/badge.js
 */
var _default = {
  // 徽标数组件
  badge: {
    isDot: false,
    value: '',
    show: true,
    max: 999,
    type: 'error',
    showZero: false,
    bgColor: null,
    color: null,
    shape: 'circle',
    numberType: 'overflow',
    offset: function offset() {
      return [];
    },
    inverted: false,
    absolute: false
  }
};
exports.default = _default;

/***/ }),
/* 75 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/button.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:51:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/button.js
 */
var _default = {
  // button组件
  button: {
    hairline: false,
    type: 'info',
    size: 'normal',
    shape: 'square',
    plain: false,
    disabled: false,
    loading: false,
    loadingText: '',
    loadingMode: 'spinner',
    loadingSize: 15,
    openType: '',
    formType: '',
    appParameter: '',
    hoverStopPropagation: true,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataName: '',
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: '',
    icon: '',
    iconColor: '',
    color: ''
  }
};
exports.default = _default;

/***/ }),
/* 76 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/calendar.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:52:43
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
 */
var _default = {
  // calendar 组件
  calendar: {
    title: '日期选择',
    showTitle: true,
    showSubtitle: true,
    mode: 'single',
    startText: '开始',
    endText: '结束',
    customList: function customList() {
      return [];
    },
    color: '#3c9cff',
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: '确定',
    confirmDisabledText: '确定',
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    // Infinity
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false,
    round: 0,
    monthNum: 3
  }
};
exports.default = _default;

/***/ }),
/* 77 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/carKeyboard.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:53:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/carKeyboard.js
 */
var _default = {
  // 车牌号键盘
  carKeyboard: {
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 78 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/cell.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 20:53:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cell.js
 */
var _default = {
  // cell组件的props
  cell: {
    customClass: '',
    title: '',
    label: '',
    value: '',
    icon: '',
    disabled: false,
    border: true,
    center: false,
    url: '',
    linkType: 'navigateTo',
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: '',
    iconStyle: {},
    rightIconStyle: {},
    rightIcon: 'arrow-right',
    titleStyle: {},
    size: '',
    stop: true,
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 79 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/cellGroup.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cellGroup.js
 */
var _default = {
  // cell-group组件的props
  cellGroup: {
    title: '',
    border: true,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 80 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/checkbox.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 21:06:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkbox.js
 */
var _default = {
  // checkbox组件
  checkbox: {
    name: '',
    shape: '',
    size: '',
    checkbox: false,
    disabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    iconColor: '',
    label: '',
    labelSize: '',
    labelColor: '',
    labelDisabled: ''
  }
};
exports.default = _default;

/***/ }),
/* 81 */
/*!*****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/checkboxGroup.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkboxGroup.js
 */
var _default = {
  // checkbox-group组件
  checkboxGroup: {
    name: '',
    value: function value() {
      return [];
    },
    shape: 'square',
    disabled: false,
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    size: 18,
    placement: 'row',
    labelSize: 14,
    labelColor: '#303133',
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    iconPlacement: 'left',
    borderBottom: false
  }
};
exports.default = _default;

/***/ }),
/* 82 */
/*!******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/circleProgress.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:02
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/circleProgress.js
 */
var _default = {
  // circleProgress 组件
  circleProgress: {
    percentage: 30
  }
};
exports.default = _default;

/***/ }),
/* 83 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/code.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
 */
var _default = {
  // code 组件
  code: {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    keepRunning: false,
    uniqueKey: ''
  }
};
exports.default = _default;

/***/ }),
/* 84 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/codeInput.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
 */
var _default = {
  // codeInput 组件
  codeInput: {
    adjustPosition: true,
    maxlength: 6,
    dot: false,
    mode: 'box',
    hairline: false,
    space: 10,
    value: '',
    focus: false,
    bold: false,
    color: '#606266',
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: '#c9cacc',
    disabledDot: true
  }
};
exports.default = _default;

/***/ }),
/* 85 */
/*!*******************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/col.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/col.js
 */
var _default = {
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: 'start',
    align: 'stretch',
    textAlign: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 86 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/collapse.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapse.js
 */
var _default = {
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true
  }
};
exports.default = _default;

/***/ }),
/* 87 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/collapseItem.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapseItem.js
 */
var _default = {
  // collapseItem 组件
  collapseItem: {
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: 'left',
    name: '',
    icon: '',
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 88 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/columnNotice.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/columnNotice.js
 */
var _default = {
  // columnNotice 组件
  columnNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true
  }
};
exports.default = _default;

/***/ }),
/* 89 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/countDown.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:29
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countDown.js
 */
var _default = {
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    millisecond: false
  }
};
exports.default = _default;

/***/ }),
/* 90 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/countTo.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countTo.js
 */
var _default = {
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: '.',
    color: '#606266',
    fontSize: 22,
    bold: false,
    separator: ''
  }
};
exports.default = _default;

/***/ }),
/* 91 */
/*!******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/datetimePicker.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:48
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
 */
var _default = {
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: '',
    title: '',
    mode: 'datetime',
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    }
  }
};
exports.default = _default;

/***/ }),
/* 92 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/divider.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:58:03
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/divider.js
 */
var _default = {
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
    text: '',
    textSize: 14,
    textColor: '#909399',
    lineColor: '#dcdfe6'
  }
};
exports.default = _default;

/***/ }),
/* 93 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/empty.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/empty.js
 */
var _default = {
  // empty组件
  empty: {
    icon: '',
    text: '',
    textColor: '#c0c4cc',
    textSize: 14,
    iconColor: '#c0c4cc',
    iconSize: 90,
    mode: 'data',
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
exports.default = _default;

/***/ }),
/* 94 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/form.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/form.js
 */
var _default = {
  // form 组件
  form: {
    model: function model() {
      return {};
    },
    rules: function rules() {
      return {};
    },
    errorType: 'message',
    borderBottom: true,
    labelPosition: 'left',
    labelWidth: 45,
    labelAlign: 'left',
    labelStyle: function labelStyle() {
      return {};
    }
  }
};
exports.default = _default;

/***/ }),
/* 95 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/formItem.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/formItem.js
 */
var _default = {
  // formItem 组件
  formItem: {
    label: '',
    prop: '',
    borderBottom: '',
    labelPosition: '',
    labelWidth: '',
    rightIcon: '',
    leftIcon: '',
    required: false,
    leftIconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 96 */
/*!*******************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/gap.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gap.js
 */
var _default = {
  // gap组件
  gap: {
    bgColor: 'transparent',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 97 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/grid.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:57
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/grid.js
 */
var _default = {
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 98 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/gridItem.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gridItem.js
 */
var _default = {
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 99 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/icon.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 66));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 18:00:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/icon.js
 */

var color = _config.default.color;
var _default = {
  // icon组件
  icon: {
    name: '',
    color: color['u-content-color'],
    size: '16px',
    bold: false,
    index: '',
    hoverClass: '',
    customPrefix: 'uicon',
    label: '',
    labelPos: 'right',
    labelSize: '15px',
    labelColor: color['u-content-color'],
    space: '3px',
    imgMode: '',
    width: '',
    height: '',
    top: 0,
    stop: false
  }
};
exports.default = _default;

/***/ }),
/* 100 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/image.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:51
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/image.js
 */
var _default = {
  // image组件
  image: {
    src: '',
    mode: 'aspectFill',
    width: '300',
    height: '225',
    shape: 'square',
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: 'photo',
    errorIcon: 'error-circle',
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: '#f3f4f6'
  }
};
exports.default = _default;

/***/ }),
/* 101 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/indexAnchor.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:15
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexAnchor.js
 */
var _default = {
  // indexAnchor 组件
  indexAnchor: {
    text: '',
    color: '#606266',
    size: 14,
    bgColor: '#dedede',
    height: 32
  }
};
exports.default = _default;

/***/ }),
/* 102 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/indexList.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexList.js
 */
var _default = {
  // indexList 组件
  indexList: {
    inactiveColor: '#606266',
    activeColor: '#5677fc',
    indexList: function indexList() {
      return [];
    },
    sticky: true,
    customNavHeight: 0
  }
};
exports.default = _default;

/***/ }),
/* 103 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/input.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
 */
var _default = {
  // index 组件
  input: {
    value: '',
    type: 'text',
    fixed: false,
    disabled: false,
    disabledColor: '#f5f7fa',
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: null,
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    showWordLimit: false,
    confirmType: 'done',
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: 'left',
    fontSize: '15px',
    color: '#303133',
    prefixIcon: '',
    prefixIconStyle: '',
    suffixIcon: '',
    suffixIconStyle: '',
    border: 'surround',
    readonly: false,
    shape: 'square',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 104 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/keyboard.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/keyboard.js
 */
var _default = {
  // 键盘组件
  keyboard: {
    mode: 'number',
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: '',
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: '取消',
    confirmText: '确定',
    autoChange: false
  }
};
exports.default = _default;

/***/ }),
/* 105 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/line.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/line.js
 */
var _default = {
  // line组件
  line: {
    color: '#d6d7d9',
    length: '100%',
    direction: 'row',
    hairline: true,
    margin: 0,
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 106 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/lineProgress.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:11
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/lineProgress.js
 */
var _default = {
  // lineProgress 组件
  lineProgress: {
    activeColor: '#19be6b',
    inactiveColor: '#ececec',
    percentage: 0,
    showText: true,
    height: 12
  }
};
exports.default = _default;

/***/ }),
/* 107 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/link.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 66));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:36
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/link.js
 */

var color = _config.default.color;
var _default = {
  // link超链接组件props参数
  link: {
    color: color['u-primary'],
    fontSize: 15,
    underLine: false,
    href: '',
    mpTips: '链接已复制，请在浏览器打开',
    lineColor: '',
    text: ''
  }
};
exports.default = _default;

/***/ }),
/* 108 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/list.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/list.js
 */
var _default = {
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: '',
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1
  }
};
exports.default = _default;

/***/ }),
/* 109 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/listItem.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/listItem.js
 */
var _default = {
  // listItem 组件
  listItem: {
    anchor: ''
  }
};
exports.default = _default;

/***/ }),
/* 110 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/loadingIcon.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 66));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
 */

var color = _config.default.color;
var _default = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color['u-tips-color'],
    textColor: color['u-tips-color'],
    vertical: false,
    mode: 'spinner',
    size: 24,
    textSize: 15,
    text: '',
    timingFunction: 'ease-in-out',
    duration: 1200,
    inactiveColor: ''
  }
};
exports.default = _default;

/***/ }),
/* 111 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/loadingPage.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:23
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingPage.js
 */
var _default = {
  // loading-page组件
  loadingPage: {
    loadingText: '正在加载',
    image: '',
    loadingMode: 'circle',
    loading: false,
    bgColor: '#ffffff',
    color: '#C8C8C8',
    fontSize: 19,
    iconSize: 28,
    loadingColor: '#C8C8C8'
  }
};
exports.default = _default;

/***/ }),
/* 112 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/loadmore.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:26
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadmore.js
 */
var _default = {
  // loadmore 组件
  loadmore: {
    status: 'loadmore',
    bgColor: 'transparent',
    icon: true,
    fontSize: 14,
    iconSize: 17,
    color: '#606266',
    loadingIcon: 'spinner',
    loadmoreText: '加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    isDot: false,
    iconColor: '#b7b7b7',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    line: false,
    lineColor: '#E6E8EB',
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 113 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/modal.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
 */
var _default = {
  // modal 组件
  modal: {
    show: false,
    title: '',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: '650rpx',
    confirmButtonShape: '',
    duration: 400
  }
};
exports.default = _default;

/***/ }),
/* 114 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/navbar.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _color = _interopRequireDefault(__webpack_require__(/*! ../color */ 115));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/navbar.js
 */
var _default = {
  // navbar 组件
  navbar: {
    safeAreaInsetTop: true,
    placeholder: false,
    fixed: true,
    border: false,
    leftIcon: 'arrow-left',
    leftText: '',
    rightText: '',
    rightIcon: '',
    title: '',
    bgColor: '#ffffff',
    titleWidth: '400rpx',
    height: '44px',
    leftIconSize: 20,
    leftIconColor: _color.default.mainColor,
    autoBack: false,
    titleStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 115 */
/*!***************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/color.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: '#3c9cff',
  info: '#909399',
  default: '#909399',
  warning: '#f9ae3d',
  error: '#f56c6c',
  success: '#5ac725',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#e4e7ed'
};
var _default = color;
exports.default = _default;

/***/ }),
/* 116 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/noNetwork.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noNetwork.js
 */
var _default = {
  // noNetwork
  noNetwork: {
    tips: '哎呀，网络信号丢失',
    zIndex: '',
    image: 'data:image/png;base64,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'
  }
};
exports.default = _default;

/***/ }),
/* 117 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/noticeBar.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
 */
var _default = {
  // noticeBar
  noticeBar: {
    text: function text() {
      return [];
    },
    direction: 'row',
    step: false,
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    speed: 80,
    fontSize: 14,
    duration: 2000,
    disableTouch: true,
    url: '',
    linkType: 'navigateTo'
  }
};
exports.default = _default;

/***/ }),
/* 118 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/notify.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:10:21
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/notify.js
 */
var _default = {
  // notify组件
  notify: {
    top: 0,
    type: 'primary',
    color: '#ffffff',
    bgColor: '',
    message: '',
    duration: 3000,
    fontSize: 15,
    safeAreaInsetTop: false
  }
};
exports.default = _default;

/***/ }),
/* 119 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/numberBox.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:46
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberBox.js
 */
var _default = {
  // 步进器组件
  numberBox: {
    name: '',
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: '#323233',
    buttonSize: 30,
    bgColor: '#EBECEE',
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 120 */
/*!******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/numberKeyboard.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:05
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberKeyboard.js
 */
var _default = {
  // 数字键盘
  numberKeyboard: {
    mode: 'number',
    dotDisabled: false,
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 121 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/overlay.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/overlay.js
 */
var _default = {
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 122 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/parse.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/parse.js
 */
var _default = {
  // parse
  parse: {
    copyLink: true,
    errorImg: '',
    lazyLoad: false,
    loadingImg: '',
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true
  }
};
exports.default = _default;

/***/ }),
/* 123 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/picker.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
 */
var _default = {
  // picker
  picker: {
    show: false,
    showToolbar: true,
    title: '',
    columns: function columns() {
      return [];
    },
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确定',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    keyName: 'text',
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    },
    immediateChange: false
  }
};
exports.default = _default;

/***/ }),
/* 124 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/popup.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
 */
var _default = {
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: 'bottom',
    duration: 300,
    closeable: false,
    overlayStyle: function overlayStyle() {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: 'top-right',
    round: 0,
    zoom: true,
    bgColor: '',
    overlayOpacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 125 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/radio.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:02:34
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radio.js
 */
var _default = {
  // radio组件
  radio: {
    name: '',
    shape: '',
    disabled: '',
    labelDisabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    labelSize: '',
    label: '',
    labelColor: '',
    size: '',
    iconColor: '',
    placement: ''
  }
};
exports.default = _default;

/***/ }),
/* 126 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/radioGroup.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
 */
var _default = {
  // radio-group组件
  radioGroup: {
    value: '',
    disabled: false,
    shape: 'circle',
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    name: '',
    size: 18,
    placement: 'row',
    label: '',
    labelColor: '#303133',
    labelSize: 14,
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    borderBottom: false,
    iconPlacement: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 127 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/rate.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rate.js
 */
var _default = {
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: '#b2b2b2',
    activeColor: '#FA3534',
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: 'star-fill',
    inactiveIcon: 'star',
    touchable: true
  }
};
exports.default = _default;

/***/ }),
/* 128 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/readMore.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:41
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/readMore.js
 */
var _default = {
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: '展开阅读全文',
    openText: '收起',
    color: '#2979ff',
    fontSize: 14,
    textIndent: '2em',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 129 */
/*!*******************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/row.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/row.js
 */
var _default = {
  // row
  row: {
    gutter: 0,
    justify: 'start',
    align: 'center'
  }
};
exports.default = _default;

/***/ }),
/* 130 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/rowNotice.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rowNotice.js
 */
var _default = {
  // rowNotice
  rowNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80
  }
};
exports.default = _default;

/***/ }),
/* 131 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/scrollList.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:28
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/scrollList.js
 */
var _default = {
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#3c9cff',
    indicatorStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 132 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/search.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:45
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
 */
var _default = {
  // search
  search: {
    shape: 'round',
    bgColor: '#f2f2f2',
    placeholder: '请输入关键字',
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: function actionStyle() {
      return {};
    },
    actionText: '搜索',
    inputAlign: 'left',
    inputStyle: function inputStyle() {
      return {};
    },
    disabled: false,
    borderColor: 'transparent',
    searchIconColor: '#909399',
    searchIconSize: 22,
    color: '#606266',
    placeholderColor: '#909399',
    searchIcon: 'search',
    margin: '0',
    animation: false,
    value: '',
    maxlength: '-1',
    height: 32,
    label: null
  }
};
exports.default = _default;

/***/ }),
/* 133 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/section.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/section.js
 */
var _default = {
  // u-section组件
  section: {
    title: '',
    subTitle: '更多',
    right: true,
    fontSize: 15,
    bold: true,
    color: '#303133',
    subColor: '#909399',
    showLine: true,
    lineColor: '',
    arrow: true
  }
};
exports.default = _default;

/***/ }),
/* 134 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/skeleton.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/skeleton.js
 */
var _default = {
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle'
  }
};
exports.default = _default;

/***/ }),
/* 135 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/slider.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/slider.js
 */
var _default = {
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: '#2979ff',
    inactiveColor: '#c0c4cc',
    blockColor: '#ffffff',
    showValue: false,
    disabled: false,
    blockStyle: function blockStyle() {}
  }
};
exports.default = _default;

/***/ }),
/* 136 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/statusBar.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/statusBar.js
 */
var _default = {
  // statusBar
  statusBar: {
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 137 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/steps.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
 */
var _default = {
  // steps组件
  steps: {
    direction: 'row',
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#969799',
    activeIcon: '',
    inactiveIcon: '',
    dot: false
  }
};
exports.default = _default;

/***/ }),
/* 138 */
/*!*************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/stepsItem.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/stepsItem.js
 */
var _default = {
  // steps-item组件
  stepsItem: {
    title: '',
    desc: '',
    iconSize: 17,
    error: false
  }
};
exports.default = _default;

/***/ }),
/* 139 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/sticky.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sticky.js
 */
var _default = {
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: 'transparent',
    zIndex: '',
    index: ''
  }
};
exports.default = _default;

/***/ }),
/* 140 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/subsection.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
 */
var _default = {
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#303133',
    mode: 'button',
    fontSize: 12,
    bold: true,
    bgColor: '#eeeeef',
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 141 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/swipeAction.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeAction.js
 */
var _default = {
  // swipe-action组件
  swipeAction: {
    autoClose: true
  }
};
exports.default = _default;

/***/ }),
/* 142 */
/*!*******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/swipeActionItem.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeActionItem.js
 */
var _default = {
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: '',
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 143 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/swiper.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:21:38
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiper.js
 */
var _default = {
  // swiper 组件
  swiper: {
    list: function list() {
      return [];
    },
    indicator: false,
    indicatorActiveColor: '#FFFFFF',
    indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
    indicatorStyle: '',
    indicatorMode: 'line',
    autoplay: true,
    current: 0,
    currentItemId: '',
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: 'default',
    keyName: 'url',
    imgMode: 'aspectFill',
    height: 130,
    bgColor: '#f3f4f6',
    radius: 4,
    loading: false,
    showTitle: false
  }
};
exports.default = _default;

/***/ }),
/* 144 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/swipterIndicator.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiperIndicator.js
 */
var _default = {
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: '',
    indicatorInactiveColor: '',
    indicatorMode: 'line'
  }
};
exports.default = _default;

/***/ }),
/* 145 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/switch.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/switch.js
 */
var _default = {
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: '#2979ff',
    inactiveColor: '#ffffff',
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0
  }
};
exports.default = _default;

/***/ }),
/* 146 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/tabbar.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbar.js
 */
var _default = {
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    fixed: true,
    placeholder: true
  }
};
exports.default = _default;

/***/ }),
/* 147 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/tabbarItem.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbarItem.js
 */
var _default = {
  //
  tabbarItem: {
    name: null,
    icon: '',
    badge: null,
    dot: false,
    text: '',
    badgeStyle: 'top: 6px;right:2px;'
  }
};
exports.default = _default;

/***/ }),
/* 148 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/tabs.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
 */
var _default = {
  //
  tabs: {
    duration: 300,
    list: function list() {
      return [];
    },
    lineColor: '#3c9cff',
    activeStyle: function activeStyle() {
      return {
        color: '#303133'
      };
    },
    inactiveStyle: function inactiveStyle() {
      return {
        color: '#606266'
      };
    },
    lineWidth: 20,
    lineHeight: 3,
    lineBgSize: 'cover',
    itemStyle: function itemStyle() {
      return {
        height: '44px'
      };
    },
    scrollable: true,
    current: 0,
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 149 */
/*!*******************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/tag.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tag.js
 */
var _default = {
  // tag 组件
  tag: {
    type: 'primary',
    disabled: false,
    size: 'medium',
    shape: 'square',
    text: '',
    bgColor: '',
    color: '',
    borderColor: '',
    closeColor: '#C6C7CB',
    name: '',
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: ''
  }
};
exports.default = _default;

/***/ }),
/* 150 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/text.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/text.js
 */
var _default = {
  // text 组件
  text: {
    type: '',
    show: true,
    text: '',
    prefixIcon: '',
    suffixIcon: '',
    mode: '',
    href: '',
    format: '',
    call: false,
    openType: '',
    bold: false,
    block: false,
    lines: '',
    color: '#303133',
    size: 15,
    iconStyle: function iconStyle() {
      return {
        fontSize: '15px'
      };
    },
    decoration: 'none',
    margin: 0,
    lineHeight: '',
    align: 'left',
    wordWrap: 'normal'
  }
};
exports.default = _default;

/***/ }),
/* 151 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/textarea.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/textarea.js
 */
var _default = {
  // textarea 组件
  textarea: {
    value: '',
    placeholder: '',
    placeholderClass: 'textarea-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: 70,
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 152 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/toast.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toast.js
 */
var _default = {
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: '',
    icon: '',
    type: '',
    loadingMode: '',
    show: '',
    overlay: false,
    position: 'center',
    params: function params() {},
    duration: 2000,
    isTab: false,
    url: '',
    callback: null,
    back: false
  }
};
exports.default = _default;

/***/ }),
/* 153 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/toolbar.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toolbar.js
 */
var _default = {
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    title: ''
  }
};
exports.default = _default;

/***/ }),
/* 154 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/tooltip.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:25:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tooltip.js
 */
var _default = {
  // tooltip 组件
  tooltip: {
    text: '',
    copyText: '',
    size: 14,
    color: '#606266',
    bgColor: 'transparent',
    direction: 'top',
    zIndex: 10071,
    showCopy: true,
    buttons: function buttons() {
      return [];
    },
    overlay: true,
    showToast: true
  }
};
exports.default = _default;

/***/ }),
/* 155 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/transition.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:59:00
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/transition.js
 */
var _default = {
  // transition动画组件的props
  transition: {
    show: false,
    mode: 'fade',
    duration: '300',
    timingFunction: 'ease-out'
  }
};
exports.default = _default;

/***/ }),
/* 156 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/props/upload.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:09:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/upload.js
 */
var _default = {
  // upload组件
  upload: {
    accept: 'image',
    capture: function capture() {
      return ['album', 'camera'];
    },
    compressed: true,
    camera: 'back',
    maxDuration: 60,
    uploadIcon: 'camera-fill',
    uploadIconColor: '#D3D4D6',
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: 'aspectFill',
    name: '',
    sizeType: function sizeType() {
      return ['original', 'compressed'];
    },
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: function fileList() {
      return [];
    },
    uploadText: '',
    width: 80,
    height: 80,
    previewImage: true
  }
};
exports.default = _default;

/***/ }),
/* 157 */
/*!****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/config/zIndex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),
/* 158 */
/*!********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/function/platform.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 注意：
 * 此部分内容，在vue-cli模式下，需要在vue.config.js加入如下内容才有效：
 * module.exports = {
 *     transpileDependencies: ['uview-v2']
 * }
 */

var platform = 'none';
platform = 'vue2';
platform = 'weixin';
platform = 'mp';
var _default = platform;
exports.default = _default;

/***/ }),
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/*!***********************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/utils/tool.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisibleArea = void 0;
var getVisibleArea = function getVisibleArea() {
  var contentHeight;
  // 获取系统信息
  uni.getSystemInfo({
    success: function success(res) {
      var pxToRpxRatio = 750 / res.windowWidth;
      // 计算可视区域高度（屏幕高度 - TabBar高度 - 状态栏高度）
      // 假设TabBar高度为50px
      var tabBarHeight = 50 * pxToRpxRatio;
      var bottomSafeArea = res.safeAreaInsets && res.safeAreaInsets.bottom ? res.safeAreaInsets.bottom : 0;
      contentHeight = res.windowHeight * pxToRpxRatio - tabBarHeight - res.statusBarHeight * pxToRpxRatio - bottomSafeArea * pxToRpxRatio;
    }
  });
  return contentHeight;
};
exports.getVisibleArea = getVisibleArea;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/*!***********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-mixin.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// [z-paging]使用页面滚动时引入此mixin，用于监听和处理onPullDownRefresh等页面生命周期方法
var _default = {
  onPullDownRefresh: function onPullDownRefresh() {
    if (this.isPagingRefNotFound()) return;
    this.$refs.paging.reload().catch(function () {});
  },
  onPageScroll: function onPageScroll(e) {
    if (this.isPagingRefNotFound()) return;
    this.$refs.paging.updatePageScrollTop(e.scrollTop);
    e.scrollTop < 10 && this.$refs.paging.doChatRecordLoadMore();
  },
  onReachBottom: function onReachBottom() {
    if (this.isPagingRefNotFound()) return;
    this.$refs.paging.pageReachBottom();
  },
  methods: {
    isPagingRefNotFound: function isPagingRefNotFound() {
      return !this.$refs.paging;
    }
  }
};
exports.default = _default;

/***/ }),
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-tabbar/props.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 当前匹配项的name
    value: {
      type: [String, Number, null],
      default: uni.$u.props.tabbar.value
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni.$u.props.tabbar.safeAreaInsetBottom
    },
    // 是否显示上方边框
    border: {
      type: Boolean,
      default: uni.$u.props.tabbar.border
    },
    // 元素层级z-index
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.tabbar.zIndex
    },
    // 选中标签的颜色
    activeColor: {
      type: String,
      default: uni.$u.props.tabbar.activeColor
    },
    // 未选中标签的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.tabbar.inactiveColor
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      default: uni.$u.props.tabbar.fixed
    },
    // fixed定位固定在底部时，是否生成一个等高元素防止塌陷
    placeholder: {
      type: Boolean,
      default: uni.$u.props.tabbar.placeholder
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-tabbar-item/props.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // item标签的名称，作为与u-tabbar的value参数匹配的标识符
    name: {
      type: [String, Number, null],
      default: uni.$u.props.tabbarItem.name
    },
    // uView内置图标或者绝对路径的图片
    icon: {
      icon: String,
      default: uni.$u.props.tabbarItem.icon
    },
    // 右上角的角标提示信息
    badge: {
      type: [String, Number, null],
      default: uni.$u.props.tabbarItem.badge
    },
    // 是否显示圆点，将会覆盖badge参数
    dot: {
      type: Boolean,
      default: uni.$u.props.tabbarItem.dot
    },
    // 描述文本
    text: {
      type: String,
      default: uni.$u.props.tabbarItem.text
    },
    // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
    badgeStyle: {
      type: [Object, String],
      default: uni.$u.props.tabbarItem.badgeStyle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */
/*!******************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/components/tabbar-home/config.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activeList = void 0;
var activeList = [{
  name: '每日签到',
  icon: __webpack_require__(/*! ../../static/home/icon1.png */ 623),
  link: ''
}, {
  name: '品牌专区',
  icon: __webpack_require__(/*! ../../static/home/icon2.png */ 624),
  link: ''
}, {
  name: '拼团',
  icon: __webpack_require__(/*! ../../static/home/icon3.png */ 625),
  link: ''
}, {
  name: '砍价',
  icon: __webpack_require__(/*! ../../static/home/icon4.png */ 626),
  link: ''
}, {
  name: '会员商品',
  icon: __webpack_require__(/*! ../../static/home/icon5.png */ 627),
  link: ''
}, {
  name: '领券中心',
  icon: __webpack_require__(/*! ../../static/home/icon6.png */ 628),
  link: ''
}, {
  name: '居家百货',
  icon: __webpack_require__(/*! ../../static/home/icon7.png */ 629),
  link: ''
}, {
  name: '排行榜',
  icon: __webpack_require__(/*! ../../static/home/icon8.png */ 630),
  link: ''
}, {
  name: '余额充值',
  icon: __webpack_require__(/*! ../../static/home/icon9.png */ 631),
  link: ''
}, {
  name: '生鲜好货',
  icon: __webpack_require__(/*! ../../static/home/icon10.png */ 632),
  link: ''
}];
exports.activeList = activeList;

/***/ }),
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */
/*!***********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/order_icon1.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA+VBMVEUAAAD/aQz/nAT/iAj/cgr/jwb/eAr/iQf/gAD+hQf/gwj/gAD/hQj/fQr/gwj/oAP/lwD+nwT/hAj/bAz/gQj9mQT/bQv/ggj/kQX/fQj/oAD/mwD+oAT+mgT+nwT+lQb+ogT/hAj/ngT/ogT/kwf/hAn/mwX/owT/dAb+lgb+fwr+lQX/aw3+lwb+lwb+owT/fAn/ag3/gAr/gwn/aQ3+eQr/bgz+dQv+iQj+jgf+iwf+lwb/cwv+gwn+gAn+kAf/awz+hAj/cAz/cQv+ewr+jQf+kwb+kgb+hgj+lAb+nAX+fQn+fgr/eAr/bQz+oAT+ngT+ogT+bAyS4TFyAAAANXRSTlMAv39Af39/fwRJHwn2f39yEPnSsaeYaF80Lh8Y7+nh27ePjYNvbV09Fvvv79vb18e/n5t3UFV7SkcAAAFNSURBVFjD7dBnT8JQFMbxI7OlxbL3kCW4t0ABoU5ExfH9P4w1Jo5z4bYP8QWJ/E5O7qvzT1Na+U9yRs1o0sKaG68fDnK0kKx9/qkUIVw+GX3+4iFUpGqffyuAn6B5Ci+/1aBzozjhonlyS9ksTWaour/3zGQotLRyyb2eO1v7yTwJMjs9QDFDjFK+h5T5v/TeglQWqN+B6izgH4L8PNDtdofIigGQELgBCQETxANB0+yYyAZ5oAPCA3pF9f4Q4oGxgxi/4AFrLB3dvs+kJZF1Sy5B1LAsXZ0fGMidkKbbT2zhQINaA3ngQu6YKGE/aZon7BDYjpCSrqg0P/DoIKGQVPjByaEakgauQQEWCJyBljDQfsKGB3xtkE8I9LERAn2MGLgCCYFLEA+kzkEpFsiigSwx8elo+uZ+48RpayPAbotEp0drLsVTGq2s/Kl3gDygcgx56foAAAAASUVORK5CYII="

/***/ }),
/* 236 */
/*!***********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/order_icon2.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAulBMVEUAAAD/pQT+eAn9pQP+pAP/nQT8mQX/kAb/mwT/gwj/fwj/hwf/jAb/lgX/kgb8kAX9ogP+owT/kgb/oAP/kAD+kAb/egn/pQP/ggj/ogP+ngL+jgf+pQP/pQP/oAP/pQT8egn/kgf+jAf+jwf+eAr+pAP/fQn/fQn/owL/jgX6pAD+pQT+ggj+jQf+nAT+fgn+igf+hwf+egn+nwT+oQT+kQb+fAn+hAj+kwb+kAb+lQb+mQX+mAX+lwX5E81tAAAAK3RSTlMAf7+f359gn3+fn5+fn39gYMefTA/xtntvVkPfp5OThVgj47+7t5OPb184fcQNpwAAATRJREFUWMPtzmlPg0AQgOGpttbepdzY01sreABKr///t8ziJKyzYcMkfOgHnmQSdpJ5AzQaZyZYXVa2MkEx37I8AGFumaYk0OIGFnX/ASx493NQvLqt6gI4Q5ZrtIXnYuW3yxiuBZSR/GkVq2lSzgDCT7QBlU8CyxjJgVhjSQKdGF0XuytdoEMDURTFYuSAeJeNGkAkUKr+wAHJgYMGDYyOSA4cNUY0cEJy4KShBPZoLAX2GjQwy5AUmGQaMxpI0zQTkwesTR4Q77KhgW6KRMC0bS8PaHRpYIfGYOXfdxuY7DSUQIjGwU2Ys18moQYNDEMkztGtLjBUAypW4IOJBgbcwIAGPplqD/R+mHo08MZUe6DPDfRp4J2p9sDjN9MTCay/mNZAOLx7BxTe/UVljgeNRuO/X+k7MNaHtz1ZAAAAAElFTkSuQmCC"

/***/ }),
/* 237 */
/*!***********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/order_icon3.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABX1BMVEUAAAD/pQP/ag3/fAr/lQX/cAr/bQv/bwv/bgz/gQn/bgv/dwn/mwX/bAv/XwD/bAz/dgv/bAz/kgb/igb/bAr/awr/aAD/dAv/bQz/gwj/iAf/bQz/bQv/mwX/bAz/dQj/aQj/ewD/dwD/dAv/bQ3/dwv/fQr/awz/bQz/bgv/bQn/dQf/ewb/dgv/fQr/hAn/jgf/bA3/iwj/pQT/cQv/bwv/hAj/lwX/eAr/iwf/bwv/gwj/bAv/cQv/iwX/gQn/jQf/iAj/kQb/lAf/bAz/cQv/bQ3/bQz/gQn/bQ3/bwz/owT/dAv/cwv/lwX/ag3/jAj/fAr/oAX/pQT/gAn/lQX/pwP/owP/oQP/hQf/pAX/bQz/dwr/ewr/iwf/nQX/ogT/kgb/lQb/gAn/jQf/eQr/mgX/lwX/gwn/fgn/cAv/kAf/hgj/iAj/hQj/nwT/dAv/pAT/cgv/jwf/bAwZeryRAAAAW3RSTlMAn99/YBX6kVhY0FhYQATb0btYWE8wCPDr09KtnJZ9OR8QCvby6NKXh20mJB386+PSy8Ozsqalk4yBZF5bUTX++vbz6Ofg39PJx8XFwb+9tqqclnx0al1QTEs4+y5UKgAAAiNJREFUWMPt1PlT2kAUwPFX2xCqJZSWwxYKcilY1Nb7qPa+7/ugoSppJVaoVf//6UtIspuFZJfMONMf+DDMvN1svkPGjDA09H/7dMbX+2+c+xf+8izkwcfnbb7nfoGVbQFffALv/gi44BO49kPA6QZ+CfAP7PE/vQHlnO3VHl+fwMfdgVwCRuH+zu4An97A2s5g2IB07/dg2MDKsXasWZs3cOZ+LoPL9Tuaps2DFdD42MCbRqOhbVmLqw0B7sCWsbUMwQPz7Xb7bs0JtAW4Al8P0Bo4gQMB5+nAlU6nM1egl3x0YKOFNqheSwAVSM61ms0n9A/CdZP3pQIfcHk7RwUmm1x0ID+r6/oy0AFdAAmsqqqqvz1LmVV13ON8SWBSDWTMCVz8GQgV+B5I/8BMuTzjdUeqXPQIHFpSqzkF34qcXDzs8WJMwqO1dTxsIYHRo65Fyd6pvTxyS22CrVq09sIksG+SgVCW9mkPp4GIpLqbbGARkFSVK+GkUXhG3R9K4E7yViY2FVdw2uwJ1FFJwikbMsYHERyncbRlcZ2ImuPNCZyXzJEKnKAKDrJ1Q8goZE5spQL+yxy3rkUljJvbJPB6BOGvzNVtj5L4qCO2KTyTdq7JuIoZ23FgZeoO9mKePNA4eHpMP7VbpE5MeAai5FAlUCBNDq0HeoSwc6gkecdl8BazD1WBRf8ZvRW6hVAWWPSL5CueHn0qJ6AfxXyVYWjoNPwDWYFqhW/FHtAAAAAASUVORK5CYII="

/***/ }),
/* 238 */
/*!***********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/order_icon4.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABEVBMVEUAAAD/pQP8cgv/mgT+jQX/jAb/kQX/lAP/gAD/gAD/egD8hgj8gQj8ewj/cQD/kQf+kAf/jAf9dAn9bQf+iwf+iQf/kgb+cgr/ogT+cgr/eAn/kQb+bAv/dAr/jgb/awv/pgT/kQb/pQL/igf+jgb+jQb8cAr/jgf7cQr/gAD+jQf/jgf+iwf/oQT+dgr/pAP+iAf/igf+agv/kQf/cQv/igf/aQv/cQv/bgz/pQP/dwn/igf/cgr8cwr/pQP/nwT/dQv/nAX+dQr+fQn+lQb+eQn/ogT+kgb+jAf+iAf+lwX+gQj+hAj/kAb/mQX+hQj+gAn+fAn/nwT/oAT+eAr/pAT+iQf/ngX+cAv+bQv+cgqghOqVAAAAQXRSTlMAn2BgYKJAHxYMCGBgYATo56hXIPfz8/Hx6+Xf3cG1h4N9c2lVTkxIPhD78+/r4+PX08/Ds7Ono5eTj29nZFtIMFsiYJcAAAFlSURBVFjD7cxnT8JgEMDxA+lUy97IBsG99x5YkeFe3/+D6PNYKFfT4DU14UV/TZO75Lk/eDyTRT0p+v5qvyyBlbj6QlIETEq1iMqA+FpUKQUFlp/ITlHgkW4KBc7fyJ8lQOZ2oEeHA+1eu038LQE6HLiiczlwQxewDSSyI0s2Yc7BoH2gayqpIOeNeVMGrWTMIRFADJnv7AICW5Wfh8EmW4QuV2XzvF1AH6oBI/A5DPyIzwsaMIv6gF2gCkx4JFDTOZXNWmxsIM9WeYnPMYkt2zpXYXNAtwm8mgQJxHVjXhNBEow5fqgolbj5bhoFbul+BfrEHwf6dDjQoZtBgbsO+bME6HDgng4HLulm3Q080OHANR0OZOiBBgocPFNlVBSQVy6IIoBF50jnaX6Pnfmx0WLy2I/UVRgvmvwcOgInIu8DW+DMrnGflsGZZu6Dq4NTDX6/B84Vvu9zCjinFTZ2ouDx/L8vHsEFmvZ68jsAAAAASUVORK5CYII="

/***/ }),
/* 239 */
/*!***********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/order_icon5.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABBVBMVEUAAAD/lgD/lAb/agz/hgf9dQj+gwj+fgj/hwX/gAD/iQf/kAT+gAn/pAP/iwf8egj/hAD/egD+hAf9dgr+bwv/egr+cAr/jwb+hQj/jAf/nQT/nQT/hAj/pQP/fQn/bwr/mwX/mgX/egr+dgr/bAv/fwn/awv/agv/hgf/nwX8bQv/pAP9gAf/egD/jAf/ewn/iAj+gwn/ggn/oAP/oAP/fQj/gwj/hQb/hAn7eAf/ngT/oAT/eQn/dwf/mQD+jQf+cQr+kgb+bAv+fQn+igf/nQX+dQr+fwn+gwj+mgX+eAr/pQT+egn+dAr+jwb+bwv+bgv/nwT/oQT/ogT+hgj+hwj/mwXCGROhAAAAP3RSTlMAIN9/QEC/QCgEQUDnvI9gDAjzn+/STTn7+/vx6+vh3dm9u6mhl3dvbWtgVzQU28PDr6ubl4N7WFdIR0M3JRSzCJ3FAAABcklEQVRYw+3M11LCQBiG4U9FzUaCCVKU3jv23kVAil3w/i9FGB3dlpCd0RkP8uxw8H9DXng8f6FuJIcOkkYdTkxjOJNhwhYx3lwwCOzsvbqyDxvVF5eqkDqNdVyKnUFCi3dci2sQXGb67+5fxgSHZPtKsgQsa06Rhf8mOq8oCtbKjaKVXw88KuID+pWimYEA0TecAvqMQADApkrA12YEptNG24GPDwjfR4NtpcCYEsBEw0fRK9tjlhAY/UhA5ig4ogmB3uj7rWuQ0dep/0gCFP+0UFmi7BwDKPYofGC5xxfILjMdAhp9L/OBO8a0YCXoJQggSN1iQCgQP7M0gZRT4JbjP8gxdxiw6FsMOEs1gIhTYPHextbq1IkFkDC9i4GB/DXxhRSZfZEPDGyc45OWY2Yx0B10u7JfKL82kQ/zuxhQIwYeFAmBa0V84EI1MAdO+klJGrzas5IaBIWWggIkSqGWS6ESpMxIecGFcsSEx+PhfQBIALwvxYemdgAAAABJRU5ErkJggg=="

/***/ }),
/* 240 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon1.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAz1BMVEUAAAAyMjIyMjL5kx4qKiovLy/4lB8AAAAyMjL3kh4vLy8yMjIyMjIwMDAxMTEyMjIyMjIyMjIxMTEyMjIyMjIyMjIyMjIyMjIxMTEuLi5BLxwyMjIyMjIyMjIwMDAvLy8yMjIyMjIyMjL4kx4yMjIxMTExMTEwMDAxMTExMTEyMjIuLi7skxMqKir4kx4yMjIyMjIxMTH4kx4yMjIwMDD5kx4yMjIyMjIyMjIzMzP4kx4xMTExMTH6khz0ixf4kx73kh75kx73kBwyMjL4kx/lLcQaAAAAQ3RSTlMA/PmfFxK3BO+5J/VwMSHk3Hliwq6Tj4FIGwjPvrZFQPHp062poH5VUUs4Kw0M9cqlmph1PPzXnYxqal1bRBbbw4BclP2x1QAAAjhJREFUSMftlcd24kAQRbvaYsQghJDIOZoMBoOzPenx/9801cAAypjFrHwXOod3+rZKTUklvvi/aJlU5bNOwnmqESCBZLfQrF6qlRuScIbRn1yk1Q4W21JiB+VTsUXe7lfmnoetTMYsO8Us7XZ51iO9iQUmuz4/lYydVG4uEVhfYVfL0OAVHUf3llGSaruAclOErPIIoGXQzhX14Em/uSGQJpqSvfQxnM3EiXmezaxvzwQbzUqSr8Nj9rFY/DlfU2Qz5zshdtJ1AM4put9ue641fTYLXpEli8s9z2+22++uNfM7gEyPWNj112M1ShQa19XwiGsoBi/FfHaph4miREDLHY1JifvLJFSsWr5bziX+0dZCRZEGaO6JiDNq3z3ZKREuarzq3ZOZdrq5v1eEKPhgb0UAsWIJsK4SRwRcJW4MQIsXf/nCDIGmMSL36kPv5sj9hwp1+FrAx+vWzeIHh9quQaKZ/XSLD0qcSiAj4szfvW8neq8qaxGgiytIA21xDX2gfo1XNYD1NWKZAs6mVTRjxRzw6M00iaQWd0MJ2L5Prox/Y2qA5Z95atqMIr0SQI4/TnSATtQ0eyegFvTvjwB0wx9zY7imh/cj3w3rxLEaEGMRiJ5n02qKIOyzgeSn2mATq4R/DDbA2CIUvaDMdsmtaivJqRF95G9JMDLvTA/BdJBTCVlxfaX1CQoysvV6t4P9L8lFxGLyGbkgudLERVTSOZIHSxrLt4S4HN107EFx8DI2dfHFZ/kLFHdpEYYKnbQAAAAASUVORK5CYII="

/***/ }),
/* 241 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon2.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA+VBMVEUAAAAzMzMAAAAyMjIyMjIzMzMyMjIxMTH4kh4uLi7/gAAxMTEwMDAyMjIwMDAgICAyMjIzMzP4kh4wMDD5kh0xMTEwMDAyMjIyMjIzMzP4kh0yMjIyMjIwMDAwMDAuLi4qKioyMjIyMjIyMjIyMjL5kx0zMzP5kx4yMjIxMTEzMzP4kx0zMzMyMjL4kx34kx0yMjL4kBjyjBr4kx74kx/4kx74kx74kx74kh8yMjIyMjL5kx4yMjIxMTEzMzMyMjL4kx32kh34jhwqKirfgAD3kh74kx4xMTH4kxv3kx4yMjL4kh/4kx31jh35kxr3jxjvjxAzMzP4kx/cPWkQAAAAUXRSTlMA+QSOzcDhX/smBGUQ21EI7+fFQD0zH/PrrI5aRzsvGxjGu7eTeNasn5uXlIeAcGA3GRTy5+Pazrqzppx7d3Nsa1QkDAjrg0M3o0xLRzQoIBAyTyXEAAACx0lEQVRIx+1W15biMAxNIQkwQIbeex86U3aoU2DK9o3+/2NWKcR2zC5h3vacvQ85sqVryYpkW/iPDyAU09YjrZg+l1Y3HETL5/BqccNF9hynskGh6Z8XuTQMVUtO08liAJkh38QWWl/YYgzFhV/eBo0vd7YsqThoSScYUgQ/5aZhOyQujU5MFwR99wdaCfcTV7OGibw3UaKKrqPaMd6FQdCnYxtSigeeVxFdbTTGqpIBVyVWuO2ZSqWnKE35jU9FedhUlF4DTepe1QNOBngGv7hnm3ocwwidrGAR9yFxmRmyVql2odBOhZm5EZoVmRkFf3mEGocnt2DhZbz31KLCEHGiRQ3n9+Di04wtxhxD7BhGg4x+3SHhZjUeD25NgTAlBTfJ9dHGHaG/YHtvhfwYRJ/uRtdodsU2kopZrTmDrwDw5OYImZNDf4sYac1THbiW7MgJgAHRtAHuqLhKggcLN/p5EIJzothfA/ywRZVkgkDD1Wp2cAAJWtM9xFpz2o2P1a7gCcCK1rwCtC0hjSbJo8S0JT0BdGnNAODREqZoUj7ajlVLereyQZA45LjK1zgCe0Z1yg2z8U4UzyRXqns0EJSoX7vC7ITp3Nw74hUfayRHtRX6gM8OM1wAgO9UW6lOL1Brye5obNb2N5OaSqBYYCpTZohRtv8LgLhOJF4A0Q0zZ0CHbSvPSljbDoKvnmbIcY2s0xOzgtXJN4Nn7wmjcAU3EljMUqmfnqk1V3S6ihdhVTiBTBbPep2dK/q4CCXl2FluTublZb5/ccRxZdvP94ZLcvayYTgQlxlWNVXoK4BDTCTqInOYEgXJDI1yQxQD9ZxloPHXXBzjjAl/QXph2k2Zi7X+RcJ63gknsDWT4Mi6GYEsnfF4KJHKyPt/rojo8i2UyYRKUQy7KvhG36DQE/wjQz/JMh97BHbOfT9WS9p2oxUrwr+P34L5teDxyEq7AAAAAElFTkSuQmCC"

/***/ }),
/* 242 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon3.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA81BMVEUAAAAzMzMzMzMxMTEyMjIxMTEwMDAyMjIqKioxMTExMTEAAAAxMTEyMjIyMjIxMTEqKiowMDAyMjIxMTEyMjIyMjIyMjIwMDAyMjIwMDAwMDAyMjIxMTEyMjIxMTExMTEuLi4gICAyMjIxMTEyMjIxMTEwMDAzMzMxMTEyMjIyMjL3kh0wMDAwMDAuLi7/gAAzMzP3kx4yMjIxMTH4kh74kh4xMTExMTH4kx0xMTH4jhrvjxDkiQr4kx74kx74kx/4kh4yMjL4kh74kx35kx75kx34kh0yMjIxMTExMTH5kxzzkhv2kR34kh70jxsyMjL4kx8nEjkpAAAAT3RSTlMA/Pdo+nJAfwyPPwRc9t+sFxDZKPjw5CCMVTzTo4dYMiwI7LSSeWXBn5VPSDYvHATo5s3IuqaYbWtqIhAJ9dnPw7ubj397c0dEQzkqWEQw2jQZPgAAAvhJREFUSMftlteW2jAQQCUjwMSm2PQeWOpStvdekm1JRv//NRnZGFnCsCSvyX3x0dgXjTQaHcg/S86uPOwDsv9QsXPbWk5sWIAQhWGss42WLMIKxaT5mWeXAGHFRt9OAaTsfrZIAcm0NmpmVnxljF4sHMQAYviwXhoMgzS7YdJ8XczWE7shRSR3KlQ3v877KtI8bBOiiUj7EF+Vvq6ZDz06tkiUSKwRRTNyTscVeSZItEiqKELdiRB3ACgFI6GJ0qOo7qx6MQz34tJUxQQDGh8D0IHu5bDsRxYJm1WAauAZ6BHrCKCrJ4vVTuPSw2an0eiEPdy+Ap4JbUIMNYlAyVbxkAr+vHrm+wBFhwRm0a/J1ZU/czHwiJMG6CtiJpRDvOASj6dH/+ky9Hx6AK5yZiiwtszbX9o75+/+CZ6TgCl+GD4/cYAM0di74/x2T4/i6YqHhlmRqcZ3jnwjq7ufVZd4QVQub4R4c6mFz9TcGMBUS/SYe9xrydYAmBzNDTBaX3wWDXDO+fn19fky2fzidQs/lZUsGxAQlOyWP/sLPQiKu8QoR4pQ8UKcf3gr5fzKPzLrRJZK+pyZC/GXeHxwfu2V8mzxOsXCosWAzYjCPT8Rj0d+p8bb+Kklh10A7fqbcH4ymZxw/kO7PgG6avc3icoz93jSwk31FkhiFxONn8cHB8cTPXoIkAwN3yiwOdmCOQP6Fhpb3dDZTWSyRCGbSYT6tiv3xq9Txlr2e0F51zGWd4JVEnXWGhIG6j0hadLAHADQvJYOQMnRvMEg6KWF6eyLplKZMYCG6r1S+qqaDZD9Hy4Qs6UnL2Rp2kyWW2LWAQrSk6I0CwB1k6wwS8umkmLYBEjPSAS7DLOtrhNtFNkuiaSKJh2bUaI5psqv6nOm5d8ERWxlRJ67ZC1tV6yzfmGGRfOiLtbntskGzFMKSDobrzlCzNXiO2lA6KlJNjMdUvAwAEHJ04ZT8jm1kQEKxqhGtsO0ey41PIe6Pdskf0S5lkjUyuQ/f8FvyTSiSlWpJT0AAAAASUVORK5CYII="

/***/ }),
/* 243 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon4.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA81BMVEUAAAAwMDAzMzMwMDAyMjIzMzMzMzMAAAAyMjIyMjIgICAzMzMyMjIuLi4yMjIyMjIyMjIuLi4sLCwyMjIyMjIyMjIwMDAxMTEzMzMyMjIyMjIzMzMyMjIzMzMxMTEwMDDDdx8xMTEvLy/GYwDvjh/sjB/nih8yMjIyMjIyMjIyMjLjiB8xMTHWgiAxMTExMTEwMDAqKirpjB8zMzPchB/SfyHpix/tjR8zMzMyMjIxMTG7dCG1biEyMjIzMzPykB/ghyDniiDoiyDZgyHUgCLVgSLujSDOfSHTgCHHeSK7dCLEeiGsbCKqZiIzMzP4kx/oiyD2uBuNAAAATnRSTlMAQPcf89K/BNqVCPufKOu5jhsN79/DT0Tjy6+DfnNYSz40Lgb99t7Hs6ijkndpZVM7GPPntaCZi29rXVArIxT9/PLnwb2uoZOFaWFWNB59p53fAAACAUlEQVRIx+2VaVeCQBSGAcFYEjEVrczU1Mylfd/3vZf+/6/pAh474MwInb50Ts8XOfP6CDP3XpT++QFzmaYs5woprYqhWQhQy7VcUss8riLCupvIWy3Bp7iYJcY3zmdmb80AoU2ez5SNIgC1PsNbKAPQ3ejaUAUwnO05Zny54C/XROIGYNVZG5gnc5PvHZO3xY7IVLl1ySjACu/Q8lQWwYPmJR47dLin7KgFKIJ6bQL6HG8bjqjCOuAyO00FhA1yAiwxW83foYhLC4rJWHf8IxWSBWT2clMsLrN/2gZMsbgFGIxlwBYPj0lib3r5AkS1tsBtqw0FgDaVb6sIWBwnvFzbiQ1OEVDKGiU9dilsytf9PBsNDLpXgWqpANucA9Upr6hAJRKUgNb4C8ssURvXagVw4kcavheBeZZIOwk+5XjbAaUw4Ij4FrO/JVaFojIRY5OwBwQFGnJmUgdywTTHu65Pm6bxztnAKks06E4mtU8VqEeClgXoTl+hckosLigpGX11+vVxgpA9zjuwboW53Yonrg5iiTsgFQ1Ej5U3T13R/2jj+rP9JKXnfdfzumvpvQZ5nXMpIS/7+6PgENeerzyv3Ujq3XvEHV2Mbumik9h79QIODm88okvPmZBD75v2IMW5DCZaZ/AhpeAstLqPo7RVOPC9B+kHnB0dvUn//AW+AAWmcRHnDQIjAAAAAElFTkSuQmCC"

/***/ }),
/* 244 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon5.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAn1BMVEUAAABERERCQkJERET7kRj5lB75kx55SiJERERAQEBDQ0NDQ0NDQ0NCQkJDQ0NDQ0NDQ0NDQ0NCQkJCQkJCQkJCQkJAQEA7OztERERDQ0NCQkJDQ0NDQ0NDQ0NDQ0NBQUE/Pz/3kh73kh5DQ0NERERERERCQkL5kx34lB73kh75kx35kR35kxo/Pz//lxzfgABDQ0NDQ0NCQkJERET4kx8v8wI0AAAAM3RSTlMAwW9AH59/BPwS+O6TR/PkzsZqYVIrDgnUvGUasp5ZTBbr49vLqIl7bWJXTygkGwiZeTofZ0FyAAABUUlEQVRIx+2V2XKCQBBFByUZQFB2WdyN+5bk+v/fFns0KRCUeUiljMV5oejmdE8PD81qHhXuxS3cpBV7vNwbvaECRy/zwgiV2N0S0QSgJM2bJA6AeUlDA+jfv4IZ0C629E/RkN1F14BmIeoCDqvABpJCsAEoVaICNJ5FXL/mWMuKm+MVG0lxdS2uJEW+eMmx4I97q/9J3KsZ9tKiOjnmmKiS4vJ4xVJS3I7z3ngrO+NBzXF45N9Ri78t6mbk+NnMMJ7202qx2QGgZfIfYh0PK0Q+1yDocyboznDG7N4Td2Kbv1NTRRfr3aF2JlWzg9ti0gbQsVhqA5gGjAVUItqxT3q2vVLRA8QpeyM6YI8aWUMqFFNrnQL0gVcQU4NShssE3MSlkHkZ1j3nU1ZgYIg5vnGFprk/gSA6eYPSFe9bPPNqtei0mQC3fJ3JEA78kNX8KV93lF/zc2hldgAAAABJRU5ErkJggg=="

/***/ }),
/* 245 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon6.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABDlBMVEUAAAAyMjL5kx4yMjIzMzMxMTH5kx4yMjL4kh4yMjL4kh4xMTEyMjIzMzP4kRv6kBggICDfgAD4kx4yMjIyMjL4kh4zMzMyMjIyMjIyMjIwMDD7khwxMTH2kBswMDD4kx/3kh4yMjL4kx4yMjIyMjIyMjL3kh0yMjL4kx4wMDAvLy8rKyv3kx8yMjL4kh4yMjL4kx74kh74kx4yMjL3kh0wMDD3kRwwMDDyjBorKyswMDAqKir4kh/4kx/4kx74kh8zMzP4kx74kh35kx34kR4xMTH5kh4xMTH5kR72kxwxMTH8khvqlRX4kx74lB75lB33kx/2kh73kh3zkR0tLS36jRX3lBD/gAAzMzP4kx+vqbOpAAAAWHRSTlMAn59/92F/4ODp+3jEvy8fCAjz8dbFmJCGcUE/OSUe9+vOvrKli2BIQz4tGOfb07mym3FqWE9JIxQTEAzv1823q5eOhGZbW1M7NTMbDNupeWtUTywoFw8EVh4tqgAAAp9JREFUSMft1Ndy4jAUgGEZ2xhiQzAdQu+EGloIpPdk08tGev8X2WNHgdiyFbjZmZ3Z74oBfmwfCaH//ortcSohHAcCFSE5rLdWjHbVXgRb+Cvy3k9VSC5iJ9Jxk9ulO/R7xeOEOJTllBgvR2nby7l3SWzQ1NsQ+mZeTyoYRFwvqhrXSuw63krA+OzWZSoSxtE35OIKJlZEjkSMlTnn+eGa28iJgHESccC8L9xCjdPl4ElktxDHQ25dK4p5IY6OkZN5KoL5IaSqfQShdBwybtiRPjdnuSrXM7lcbrc5HiY0+qafE4pvFQk78ouzAC+EIaQCElNVxjA0fmgINVPxXlSBQlKK5eoFfWZ+yKEKQnPt8HdwC2T1tcLNp6MCoQ48I33FcPNhg1gUvDobxpnuJUxMYR+gP3H4zoTSla27Nr57fzaZIlN2tBM2bli3hVBWZ5b3jghpP1vHdAa/dW4PQaT6favuE9JANieE7DC3arZKXM7QgxTuK/bL2jXahHiYE0D1Y0pSFA1CkN9p3CHq/TJGABOKcCL38BcFwk8b3b4HlHwEOIdgdpXQ/MuwQGz2nUNqnkunM2aYHT2El5Xv5MbLCSkz3ETo4/Vl4AXnE2NQq4cWq4dBZHPmtBwO4YGtvAzbQxXOiBYTgv7lYg8EH7vscrQkWIEME5oKhyVPv9TNO64jkjEoZ2zhPbHaaDMhGkoYdBL1ve9TbZz4llnMm2WmCm61rwNRqwhiarEc05ta7fGp9hzU2eWg6mVpuVd568jak4XOIoTR3yCb08X/kTXLXKiiUEUoBrtzy/KRPoATYMAmTmdObBD8QKa7yWnb2Ok6+tGILp0vVip1C/R1Fq0geESs8qd3aDWv3sP84k/cP5+idWS3JrVa43qK/lV/AIqV62VmkRt+AAAAAElFTkSuQmCC"

/***/ }),
/* 246 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon7.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA81BMVEUAAAAyMjIqKioxMTEzGQAzMzMwMDAyMjIyMjIqKiozMzMyMjIzMzMxMTH5kh74kh4zMzP2khwxMTEwMDAzMzMxMTEyMjIyMjIvLy8zMzMyMjIyMjIyMjIyMjIyMjIyMjIxMTEuLi4yMjIgICD5kx74kx4zMzMyMjIxMTEzMzP4kh4yMjL4kx35kh0xMTH3kh0xMTExMTHfgAD4kx34kx34kx0yMjIzMzP4kh0wMDD4jhv4kh74kx74kh35kh34kx74kh71jxnvjxD4kx73kx74kh74kx4zMzP5kh34kh72khz3kB36jxv5kR34jx4zMzP4kx7BpOjTAAAAT3RSTlMAYAwfBPsR8t0Y582/Wvn160dEO/eelX8n08W4s6+Nh2ksIwj86aulVOPa142HdXRIMwivnpV7b1lAJevUtquAbxkQ7t3c24N6Z1I+MCwimi6H0gAAApZJREFUSMftVddi4jAQdIxtqiHEhoQOAQIECC0QuEu93q3//5qbFdJRzrL9lKfMi6SVRivtrFbaG14Pul1IpzwvlS72dS06Lgqu9w9u4TKqt7rpHcCs65HcDfnq01pjtWrU4nxQugjnOae0snYmx2c1Gqdmof6Il3AOtkoQM+SiegmLqvqRsQJjuh1IrBPPoJ6R/7YcTd5pvE/Mr0G8SxPn5P7WnzsMyC441cJp3WQAsYideVhGWSbQ/clDhIm6mtdG8DPUee7A2fXy8T0x/5AlA4EMJXGDfftoX3JYn0dnPsYOC5qyMeUoiefIErrhE2O531vTGK7pmhZuf6Mk9hB1aj8xNhKmOU77TB3oVFASM9CCWpx0LW0LxsZirhJE7AliXtpuGVtSW6W4qSAnPzI2kbYvol+mTVUoQH7h5Xq+NeWzrMO9x4OEbCLmye1q9siZv7rYg/SbYcpWEluYbVLngWH9JL8e4badH2Rp8D2VKOGstP+HeyaR5THVUYDKmho32PdOI+aDSNbcd006tAOI7YHnxS+2Ubnt5nL3Ty98MEPeDJWpKlMy8d9dYin5atS4wpKy7lMWimG1MY1FV3K0e/8ZQwtBckBv9vh1Dy0tFK24UFPgTtS4cJwhhOZUjqYYuY4WCSfwEW/t+bejsKTcgyS/MQmxisaSoqR1EeNC+PpmbyYyqAxCzTCqpKohglRW1pw+SqAUJUGa7wsRUydPOyGJ8vMBTuUHZ7n47QxFcdyvgI5JPNM5iFjTjxdzxWMU6MchSn83tlIYW4pITg+Sz7aTx/IWffLFo8IZCGhjtvysbkhGOqTRsdEipWM7WIovwtOP36HpRYPlE5tw+H0DViUKb+AXhtZmMz1RoXlOsNvaGyLgL3aFrbnReLLHAAAAAElFTkSuQmCC"

/***/ }),
/* 247 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/my/s_icon8.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA5FBMVEUAAAAmJTYkJDQNDSUbGysmJTUmJTUlJDQmJTUmJTUmJTUlJDQcHC0mJTUmJTUkJDQhITQmJTUlJDUlJTQmJTYmJTUmJjUmJTUmJjUmJTUlJTUmJDUmJDUkJDQkJDQgIDUmJTUmJTUmJTUmJTUmJTUmJDQlJTUkIzQjIzMiIjMiIjLzgAAmJTX4kh4mJTUmJTUlJTUlJTQmJDMlIzMkIzMkJDH4kx/4kh/4kx/5kx4nJTX4kx36kx0kJDQjITIkJDT5kRv7kRggIDP3kx/4kh/4kh75kx32kR37kx70jxsnJjb4kx+Q2TepAAAASnRSTlMA/FoFC7XVcPjOxVQI3cAvG+KBeu7r5cOwo5x1Y01FD8q8rKiMamA0KyUfBfPHoJhvZlBIQSn379epkWlHPzw4JhkX57ePe1g7MOaz8kkAAAIpSURBVEjH7ZbpcqJAFIVpRQZE3NBBUVziGjUmGrNOkkky++H932e6owSo7mkgP+ZPcqqstvr6VXvPvX1B+dB/VU7TjfO3cKAi95m5fA1MRmawCxD6gZcVtICRUgYGb8iwovQA9LKBGnBElwFQzsSZ7EC6egC+ZgENoBB+Sa/z14O2+6PTqggMY8mm1A7AfWgvuUjJlYaAEytoKQmp9ia3wxoBEHb3FACxCuPJripCjnP1kbFCIINrWqbVoG2biyimthCTvo0ENwQxufkwdopAn8uubc73uz+/3+3PrJj22mkikB2CTUo4bsesqEqoJ9+/ViLqz3J2u9gEtHCvAZLj0l5e+f4fbvdTDHQhIm98/2TJc6jHK8eTj5eUvFsqT7+XUe4oVvOyiPziH3QT4Vr52G9UMXm5B79xXBL5+OPa969OfnFclCxyJO9LgXJyUs7JSTnHk6YwdBbjOPUZuRAEZoyT3co5BUXxKoC+IpEHaMJAA5jJwE7YUdz4msrANlAXBlxgnDCITXE1EgazDsyFgR5gSbhjQGfFEtuq/hvcRk3t161OKaWtNjAKbminyWbXJvgDDjBNY2o3mKaa+ToIx8mmehpjnK7BlsHu0KwFqan0AfNQfDnKY48cC6BE5cXWmtzUSgFUtUNC+TOWKmkvpLZeUDfWBEAjYqdaXwHQb3VZPSww6eP4RXg+JQCkrxEPDYCsq3wOLVaauaR1niebqjCwmHRV5d3pL8rtfYfFqKYUAAAAAElFTkSuQmCC"

/***/ }),
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */
/*!***********************************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-main.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../../hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../../hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./z-paging-main.js?vue&type=script&lang=js& */ 254);
/* harmony import */ var _hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_z_paging_main_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 254 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-main.js?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _zPagingStatic = _interopRequireDefault(__webpack_require__(/*! ./z-paging-static */ 255));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! ./z-paging-constant */ 256));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! ./z-paging-utils */ 257));
var _commonLayout = _interopRequireDefault(__webpack_require__(/*! ./modules/common-layout */ 259));
var _dataHandle = _interopRequireDefault(__webpack_require__(/*! ./modules/data-handle */ 260));
var _i18n = _interopRequireDefault(__webpack_require__(/*! ./modules/i18n */ 263));
var _nvue = _interopRequireDefault(__webpack_require__(/*! ./modules/nvue */ 268));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./modules/empty */ 269));
var _refresher = _interopRequireDefault(__webpack_require__(/*! ./modules/refresher */ 270));
var _loadMore = _interopRequireDefault(__webpack_require__(/*! ./modules/load-more */ 271));
var _loading = _interopRequireDefault(__webpack_require__(/*! ./modules/loading */ 272));
var _chatRecordMode = _interopRequireDefault(__webpack_require__(/*! ./modules/chat-record-mode */ 273));
var _scroller = _interopRequireDefault(__webpack_require__(/*! ./modules/scroller */ 274));
var _backToTop = _interopRequireDefault(__webpack_require__(/*! ./modules/back-to-top */ 275));
var _virtualList = _interopRequireDefault(__webpack_require__(/*! ./modules/virtual-list */ 276));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! ./z-paging-enum */ 261));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var zPagingRefresh = function zPagingRefresh() {
  __webpack_require__.e(/*! require.ensure | uni_modules/z-paging/components/z-paging/components/z-paging-refresh */ "uni_modules/z-paging/components/z-paging/components/z-paging-refresh").then((function () {
    return resolve(__webpack_require__(/*! ../components/z-paging-refresh */ 462));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var zPagingLoadMore = function zPagingLoadMore() {
  __webpack_require__.e(/*! require.ensure | uni_modules/z-paging/components/z-paging/components/z-paging-load-more */ "uni_modules/z-paging/components/z-paging/components/z-paging-load-more").then((function () {
    return resolve(__webpack_require__(/*! ../components/z-paging-load-more */ 469));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var zPagingEmptyView = function zPagingEmptyView() {
  __webpack_require__.e(/*! require.ensure | uni_modules/z-paging/components/z-paging-empty-view/z-paging-empty-view */ "uni_modules/z-paging/components/z-paging-empty-view/z-paging-empty-view").then((function () {
    return resolve(__webpack_require__(/*! ../../z-paging-empty-view/z-paging-empty-view */ 455));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var systemInfo = _zPagingUtils.default.getSystemInfoSync();
var _default = {
  name: "z-paging",
  components: {
    zPagingRefresh: zPagingRefresh,
    zPagingLoadMore: zPagingLoadMore,
    zPagingEmptyView: zPagingEmptyView
  },
  mixins: [_commonLayout.default, _dataHandle.default, _i18n.default, _nvue.default, _empty.default, _refresher.default, _loadMore.default, _loading.default, _chatRecordMode.default, _scroller.default, _backToTop.default, _virtualList.default],
  data: function data() {
    return {
      // --------------静态资源---------------
      base64BackToTop: _zPagingStatic.default.base64BackToTop,
      // -------------全局数据相关--------------
      // 当前加载类型
      loadingType: _zPagingEnum.default.LoadingType.Refresher,
      requestTimeStamp: 0,
      wxsPropType: '',
      renderPropScrollTop: -1,
      checkScrolledToBottomTimeOut: null,
      cacheTopHeight: -1,
      statusBarHeight: systemInfo.statusBarHeight,
      scrollViewHeight: 0,
      pagingOrgTop: -1,
      // --------------状态&判断---------------
      insideOfPaging: -1,
      isLoadFailed: false,
      isIos: systemInfo.platform === 'ios',
      disabledBounce: false,
      fromCompleteEmit: false,
      disabledCompleteEmit: false,
      pageLaunched: false,
      active: false,
      // ---------------wxs相关---------------
      wxsIsScrollTopInTopRange: true,
      wxsScrollTop: 0,
      wxsPageScrollTop: 0,
      wxsOnPullingDown: false
    };
  },
  props: {
    // 调用complete后延迟处理的时间，单位为毫秒，默认0毫秒，优先级高于minDelay
    delay: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('delay', 0)
    },
    // 触发@query后最小延迟处理的时间，单位为毫秒，默认0毫秒，优先级低于delay（假设设置为300毫秒，若分页请求时间小于300毫秒，则在调用complete后延迟[300毫秒-请求时长]；若请求时长大于300毫秒，则不延迟），当show-refresher-when-reload为true或reload(true)时，其最小值为400
    minDelay: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('minDelay', 0)
    },
    // 设置z-paging的style，部分平台(如微信小程序)无法直接修改组件的style，可使用此属性代替
    pagingStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('pagingStyle', {})
    },
    // 设置z-paging的class，优先级低于pagingStyle和height、width、maxWidth、bgColor
    pagingClass: {
      type: [String, Array, Object],
      default: _zPagingUtils.default.gc('pagingClass', '')
    },
    // z-paging的高度，优先级低于pagingStyle中设置的height；传字符串，如100px、100rpx、100%
    height: {
      type: String,
      default: _zPagingUtils.default.gc('height', '')
    },
    // z-paging的宽度，优先级低于pagingStyle中设置的width；传字符串，如100px、100rpx、100%
    width: {
      type: String,
      default: _zPagingUtils.default.gc('width', '')
    },
    // z-paging的最大宽度，优先级低于pagingStyle中设置的max-width；传字符串，如100px、100rpx、100%。默认为空，也就是铺满窗口宽度，若设置了特定值则会自动添加margin: 0 auto
    maxWidth: {
      type: String,
      default: _zPagingUtils.default.gc('maxWidth', '')
    },
    // z-paging的背景色，优先级低于pagingStyle中设置的background。传字符串，如"#ffffff"
    bgColor: {
      type: String,
      default: _zPagingUtils.default.gc('bgColor', '')
    },
    // 设置z-paging的容器(插槽的父view)的style
    pagingContentStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('pagingContentStyle', {})
    },
    // z-paging是否自动高度，若自动高度则会自动铺满屏幕
    autoHeight: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoHeight', false)
    },
    // z-paging是否自动高度时，附加的高度，注意添加单位px或rpx，若需要减少高度，则传负数
    autoHeightAddition: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('autoHeightAddition', '0px')
    },
    // loading(下拉刷新、上拉加载更多)的主题样式，支持black，white，默认black
    defaultThemeStyle: {
      type: String,
      default: _zPagingUtils.default.gc('defaultThemeStyle', 'black')
    },
    // z-paging是否使用fixed布局，若使用fixed布局，则z-paging的父view无需固定高度，z-paging高度默认为100%，默认为是(当使用内置scroll-view滚动时有效)
    fixed: {
      type: Boolean,
      default: _zPagingUtils.default.gc('fixed', true)
    },
    // 是否开启底部安全区域适配
    safeAreaInsetBottom: {
      type: Boolean,
      default: _zPagingUtils.default.gc('safeAreaInsetBottom', false)
    },
    // 开启底部安全区域适配后，是否使用placeholder形式实现，默认为否。为否时滚动区域会自动避开底部安全区域，也就是所有滚动内容都不会挡住底部安全区域，若设置为是，则滚动时滚动内容会挡住底部安全区域，但是当滚动到底部时才会避开底部安全区域
    useSafeAreaPlaceholder: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useSafeAreaPlaceholder', false)
    },
    // z-paging bottom的背景色，默认透明，传字符串，如"#ffffff"
    bottomBgColor: {
      type: String,
      default: _zPagingUtils.default.gc('bottomBgColor', '')
    },
    // slot="top"的view的z-index，默认为99，仅使用页面滚动时有效
    topZIndex: {
      type: Number,
      default: _zPagingUtils.default.gc('topZIndex', 99)
    },
    // z-paging内容容器父view的z-index，默认为1
    superContentZIndex: {
      type: Number,
      default: _zPagingUtils.default.gc('superContentZIndex', 1)
    },
    // z-paging内容容器部分的z-index，默认为1
    contentZIndex: {
      type: Number,
      default: _zPagingUtils.default.gc('contentZIndex', 1)
    },
    // z-paging二楼的z-index，默认为100
    f2ZIndex: {
      type: Number,
      default: _zPagingUtils.default.gc('f2ZIndex', 100)
    },
    // 使用页面滚动时，是否在不满屏时自动填充满屏幕，默认为是
    autoFullHeight: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoFullHeight', true)
    },
    // 是否监听列表触摸方向改变，默认为否
    watchTouchDirectionChange: {
      type: Boolean,
      default: _zPagingUtils.default.gc('watchTouchDirectionChange', false)
    },
    // 是否监听列表滚动方向改变，默认为否
    watchScrollDirectionChange: {
      type: Boolean,
      default: _zPagingUtils.default.gc('watchScrollDirectionChange', false)
    },
    // 是否只使用基础布局，设置为true后将关闭mounted自动请求数据、关闭下拉刷新和滚动到底部加载更多，强制隐藏空数据图。默认为否
    layoutOnly: {
      type: Boolean,
      default: _zPagingUtils.default.gc('layoutOnly', false)
    },
    // z-paging中布局的单位，默认为rpx
    unit: {
      type: String,
      default: _zPagingUtils.default.gc('unit', 'rpx')
    }
  },
  created: function created() {
    // 组件创建时，检测是否开始加载状态
    if (this.createdReload && !this.isOnly && this.auto) {
      this._startLoading();
      this.$nextTick(this._preReload);
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.active = true;
    this.wxsPropType = _zPagingUtils.default.getTime().toString();
    this.renderJsIgnore;
    if (!this.createdReload && !this.isOnly && this.auto) {
      // 开始预加载
      _zPagingUtils.default.delay(function () {
        return _this.$nextTick(_this._preReload);
      }, 0);
    }
    // 如果开启了列表缓存，在初始化的时候通过缓存数据填充列表数据
    this.finalUseCache && this._setListByLocalCache();
    var delay = 0;
    delay = _zPagingConstant.default.delayTime;
    this.$nextTick(function () {
      // 初始化systemInfo
      _this.systemInfo = _zPagingUtils.default.getSystemInfoSync();
      // 初始化z-paging高度
      !_this.usePageScroll && _this.autoHeight && _this._setAutoHeight();
      _this.loaded = true;
      _zPagingUtils.default.delay(function () {
        // 更新fixed模式下z-paging的布局，主要是更新windowTop、windowBottom
        _this.updateFixedLayout();
        // 更新缓存中z-paging整个内容容器高度
        _this._updateCachedSuperContentHeight();
        // 更新z-paging中scroll-view高度
        _this._updateScrollViewHeight();
      });
    });
    // 初始化页面滚动模式下slot="top"、slot="bottom"高度
    this.updatePageScrollTopHeight();
    this.updatePageScrollBottomHeight();
    // 初始化slot="left"、slot="right"宽度
    this.updateLeftAndRightWidth();
    if (this.finalRefresherEnabled && this.useCustomRefresher) {
      this.$nextTick(function () {
        _this.isTouchmoving = true;
      });
    }
    if (!this.layoutOnly) {
      // 监听uni.$emit中全局emit的complete error等事件
      this._onEmit();
    }
    this.$nextTick(function () {
      // 非app平台中，在通过获取css设置的底部安全区域占位view高度设置bottom距离后，更新页面滚动底部高度
      setTimeout(function () {
        _this._getCssSafeAreaInsetBottom(function () {
          return _this.safeAreaInsetBottom && _this.updatePageScrollBottomHeight();
        });
      }, delay);
    });
  },
  destroyed: function destroyed() {
    this._handleUnmounted();
  },
  watch: {
    defaultThemeStyle: {
      handler: function handler(newVal) {
        if (newVal.length) {
          this.finalRefresherDefaultStyle = newVal;
        }
      },
      immediate: true
    },
    autoHeight: function autoHeight(newVal) {
      this.loaded && !this.usePageScroll && this._setAutoHeight(newVal);
    },
    autoHeightAddition: function autoHeightAddition(newVal) {
      this.loaded && !this.usePageScroll && this.autoHeight && this._setAutoHeight(newVal);
    }
  },
  computed: {
    // 当前z-paging的内置样式
    finalPagingStyle: function finalPagingStyle() {
      var pagingStyle = _objectSpread({}, this.pagingStyle);
      if (!this.systemInfo) return pagingStyle;
      var windowTop = this.windowTop,
        windowBottom = this.windowBottom;
      if (!this.usePageScroll && this.fixed) {
        if (windowTop && !pagingStyle.top) {
          pagingStyle.top = windowTop + 'px';
        }
        if (windowBottom && !pagingStyle.bottom) {
          pagingStyle.bottom = windowBottom + 'px';
        }
      }
      if (this.bgColor.length && !pagingStyle['background']) {
        pagingStyle['background'] = this.bgColor;
      }
      if (this.height.length && !pagingStyle['height']) {
        pagingStyle['height'] = this.height;
      }
      if (this.width.length && !pagingStyle['width']) {
        pagingStyle['width'] = this.width;
      }
      if (this.maxWidth.length && !pagingStyle['max-width']) {
        pagingStyle['max-width'] = this.maxWidth;
        pagingStyle['margin'] = '0 auto';
      }
      return pagingStyle;
    },
    // 当前z-paging内容的样式
    finalPagingContentStyle: function finalPagingContentStyle() {
      if (this.contentZIndex != 1) {
        this.pagingContentStyle['z-index'] = this.contentZIndex;
        this.pagingContentStyle['position'] = 'relative';
      }
      return this.pagingContentStyle;
    },
    // 最终的当前开启安全区域适配后，是否使用placeholder形式实现。如果slot=bottom存在，则应当交由固定在底部的view处理，因此需排除此情况
    finalUseSafeAreaPlaceholder: function finalUseSafeAreaPlaceholder() {
      return this.useSafeAreaPlaceholder && !this.zSlots.bottom;
    },
    renderJsIgnore: function renderJsIgnore() {
      var _this2 = this;
      if (this.usePageScroll && this.useChatRecordMode || !this.refresherEnabled && this.scrollable || !this.useCustomRefresher) {
        this.$nextTick(function () {
          _this2.renderPropScrollTop = 10;
        });
      }
      return 0;
    },
    windowHeight: function windowHeight() {
      if (!this.systemInfo) return 0;
      return this.systemInfo.windowHeight || 0;
    },
    windowBottom: function windowBottom() {
      if (!this.systemInfo) return 0;
      return this.systemInfo.windowBottom || 0;
    },
    // 是否是ios+h5
    isIosAndH5: function isIosAndH5() {
      return false;
      return this.isIos;
    },
    // 是否是只使用基础布局或者只使用下拉刷新
    isOnly: function isOnly() {
      return this.layoutOnly || this.refresherOnly;
    }
  },
  methods: {
    // 当前版本号
    getVersion: function getVersion() {
      return "z-paging v".concat(_zPagingConstant.default.version);
    },
    // 设置nvue List的specialEffects
    setSpecialEffects: function setSpecialEffects(args) {
      this.setListSpecialEffects(args);
    },
    // 与setSpecialEffects等效，兼容旧版本
    setListSpecialEffects: function setListSpecialEffects(args) {
      this.nFixFreezing = args && Object.keys(args).length;
      if (this.isIos) {
        this.privateRefresherEnabled = 0;
      }
      !this.usePageScroll && this.$refs['zp-n-list'].setSpecialEffects(args);
    },
    // 使手机发生较短时间的振动（15ms）
    _doVibrateShort: function _doVibrateShort() {
      uni.vibrateShort();
    },
    // 设置z-paging高度
    _setAutoHeight: function _setAutoHeight() {
      var _arguments = arguments,
        _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var shouldFullHeight, scrollViewNode, heightKey, finalScrollViewNode, finalScrollBottomNode, scrollViewTop, scrollViewHeight, additionHeight, importantSuffix, finalHeight;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shouldFullHeight = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : true;
                scrollViewNode = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
                heightKey = 'min-height';
                _context.prev = 3;
                if (!shouldFullHeight) {
                  _context.next = 17;
                  break;
                }
                _context.t0 = scrollViewNode;
                if (_context.t0) {
                  _context.next = 10;
                  break;
                }
                _context.next = 9;
                return _this3._getNodeClientRect('.zp-scroll-view');
              case 9:
                _context.t0 = _context.sent;
              case 10:
                finalScrollViewNode = _context.t0;
                _context.next = 13;
                return _this3._getNodeClientRect('.zp-page-bottom');
              case 13:
                finalScrollBottomNode = _context.sent;
                if (finalScrollViewNode) {
                  scrollViewTop = finalScrollViewNode[0].top;
                  scrollViewHeight = _this3.windowHeight - scrollViewTop;
                  scrollViewHeight -= finalScrollBottomNode ? finalScrollBottomNode[0].height : 0;
                  additionHeight = _zPagingUtils.default.convertToPx(_this3.autoHeightAddition); // 在支付宝小程序中，添加!important会导致min-height失效，因此在支付宝小程序中需要去掉
                  importantSuffix = ' !important';
                  finalHeight = scrollViewHeight + additionHeight - (_this3.insideMore ? 1 : 0) + 'px' + importantSuffix;
                  _this3.$set(_this3.scrollViewStyle, heightKey, finalHeight);
                  _this3.$set(_this3.scrollViewInStyle, heightKey, finalHeight);
                }
                _context.next = 19;
                break;
              case 17:
                _this3.$delete(_this3.scrollViewStyle, heightKey);
                _this3.$delete(_this3.scrollViewInStyle, heightKey);
              case 19:
                _context.next = 23;
                break;
              case 21:
                _context.prev = 21;
                _context.t1 = _context["catch"](3);
              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 21]]);
      }))();
    },
    // 更新scroll-view高度
    _updateScrollViewHeight: function _updateScrollViewHeight() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var scrollViewNode, scrollViewNodeHeight;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this4._getNodeClientRect('.zp-scroll-view');
              case 2:
                scrollViewNode = _context2.sent;
                if (scrollViewNode) {
                  scrollViewNodeHeight = scrollViewNode[0].height;
                  _this4.scrollViewHeight = scrollViewNodeHeight;
                  _this4.pagingOrgTop = scrollViewNode[0].top;
                  // 设置scroll-view内容器的最小高度等于scroll-view的高度(为了解决在快手小程序中内容较少时scroll-view内容器高度无法铺满scroll-view的问题)
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 组件销毁后续处理
    _handleUnmounted: function _handleUnmounted() {
      this.active = false;
      if (!this.layoutOnly) {
        this._offEmit();
      }
      // 取消监听键盘高度变化事件（H5、百度小程序、抖音小程序、飞书小程序、QQ小程序、快手小程序不支持）

      this.useChatRecordMode && uni.offKeyboardHeightChange(this._handleKeyboardHeightChange);
    },
    // 触发更新是否超出页面状态
    _updateInsideOfPaging: function _updateInsideOfPaging() {
      this.insideMore && this.insideOfPaging === true && setTimeout(this.doLoadMore, 200);
    },
    // 清除timeout
    _cleanTimeout: function _cleanTimeout(timeout) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      return timeout;
    },
    // 添加全局emit监听
    _onEmit: function _onEmit() {
      var _this5 = this;
      uni.$on(_zPagingConstant.default.errorUpdateKey, function (errorMsg) {
        if (_this5.loading) {
          if (!!errorMsg) {
            _this5.customerEmptyViewErrorText = errorMsg;
          }
          _this5.complete(false).catch(function () {});
        }
      });
      uni.$on(_zPagingConstant.default.completeUpdateKey, function (data) {
        setTimeout(function () {
          if (_this5.loading) {
            if (!_this5.disabledCompleteEmit) {
              var type = data.type || 'normal';
              var list = data.list || data;
              var rule = data.rule;
              _this5.fromCompleteEmit = true;
              switch (type) {
                case 'normal':
                  _this5.complete(list);
                  break;
                case 'total':
                  _this5.completeByTotal(list, rule);
                  break;
                case 'nomore':
                  _this5.completeByNoMore(list, rule);
                  break;
                case 'key':
                  _this5.completeByKey(list, rule);
                  break;
                default:
                  break;
              }
            } else {
              _this5.disabledCompleteEmit = false;
            }
          }
        }, 1);
      });
    },
    // 销毁全局emit和listener监听
    _offEmit: function _offEmit() {
      uni.$off(_zPagingConstant.default.errorUpdateKey);
      uni.$off(_zPagingConstant.default.completeUpdateKey);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 255 */
/*!************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-static.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// [z-paging]公用的静态图片资源
var _default = {
  base64Arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAD1BMVEVHcExRUVFMTExRUVFRUVE9CdWsAAAABHRSTlMAjjrY9ZnUjwAAAQFJREFUWMPt2MsNgzAMgGEEE1B1gKJmAIRYoCH7z9RCXrabh33iYktcIv35EEg5ZBh07pvxJU6MFSPOSRnjnBUjUsaciRUjMsb4xIoRCWNiYsUInzE5sWKEyxiYWDbyefqHx1zIeiYTk7mQYziTYecxHvEJjwmIT3hMQELCYSISEg4TkZj0mYTEpM8kJCU9JiMp6TEZyUmbAUhO2gxAQNJiIAKSFgMRmNQZhMCkziAEJTUGIyipMRjBSZkhCE7KDEFIUmTeGCHJxWz0zXaE0GTCG8ZFtEaS347r/1fe11YyHYVfubxayfjoHmc0YYwmmmiiiSaaaKLJ7ckyz5ve+dw3Xw2emdwm9xSbAAAAAElFTkSuQmCC',
  base64ArrowWhite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVHcEz///////////////////+IGTx/AAAABnRSTlMA/dAkXZOhASU/AAABYElEQVRYw+2YwXLCIBCGsdAHWGbyAKZ4zxi9O017rxLf/1UaWFAgA1m8dcpedNSPf/l/Vh0Ya/Wn6hN0JcGvoCqRM4C8VBFiDwBqqNuJKV0rAnCgy3AUqZE57x0iqTL8Br4U3WBf/YWaIlTKfAcELU/h9w72CSVPa3C3OCDvhpHbRp/s2vq4fHhCeiCl2A3m4Qd71DQR257mFBlMcTlbFnFWzNtHxewYEfSiaLS4el8d8nyhmKJd1CF4eOS0keLMAuSxubLBIeIGQW8YHCFFo7EH9+YDcQt9FMZEswTheaNxTHwHT8SZorJjMrEVwo4Zo0U8HSEyZvJMOg4RjnmmRr8nDYeIz3OMkbfE/QhBo+U9RnZJxjGCRh/WKmHEMWLNkfPKsGh/CWJk1JjG0kcuJggTt34VDP8aWAFhp4nybVb5+9qQhjSkIQ1pSEMa8k+Q5U9rV3dF8MpFBK+/7miVq1/HZ2qmo9D+pAAAAABJRU5ErkJggg==',
  base64Flower: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAKlBMVEVHcEzDw8Ovr6+pqamUlJTCwsKenp61tbWxsbGysrLNzc2bm5u5ubmjo6MpovhuAAAACnRSTlMA/P79/sHDhiZS0DxZowAABBBJREFUWMPtl89rE0EUx7ctTXatB3MI1SWnDbUKPUgXqh4ED8Uf7KUVSm3ooVSpSii0Fn/gD4j4o+APiEoVmos9FO2celiqZVgwgaKHPQiCCkv+F99kM7Ozm5kxq1dfD91k9pPve9/3ZjbRNHHok/mKli4eIPNgSuRObuN9SqSEzM20iGnm0yIbqCuV7NSSSIV7uyPM6JMBYdeTOanh/QihJYZsUCSby+VkMj2AvOt0rAeQAwqE3lfKMZVlQCZk1QOCKkkVPadITCfIRNKxfoJI5+0OIFtJx14CMSg1mRSDko7VAfksRQzEbGYqxOJcVTWMCH2I1/IACNW0PWU2M8cmAVHtnH5mM1VRWtwKZjOd5JbF6s1IbaYqaotjNlPHgDAnlAizubTR6ovMYn052g/U5qcmOpi0WL8xTS/3IfSet5m8MEr5ajjF5le6dq/OJpobrdY0t3i9QgefWrxW9/1BLhk0E9m8FeUMhhXal499iD0eQRfDF+ts/tttORRerfp+oV7f4xJj82iUYm1Yzod+ZQEAlS/8mMBwKebVmCVp1f0JLS6zKd17+iwRKTARVg2SHtz3iEbBH+Q+U28zW2Jiza8Tjb1YFoYZMsJyjDqp3M9XBQdSdPLFdxEpvOB37JrHcmR/y9+LgoTlCFGZEa2sc6d4PGlweEa2JSVPoVm+IfGG3ZL037iV9oH+P+Jxc4HGVflNq1M0pivao/EopO4b/ojVCP9GjmiXOeS0DOn1o/iiccT4ORnyvBGF3yUywkQajW4Ti0SGuiy/wVSg/L8w+X/8Q+hvUx8Xd90z4oV5a1i88MbFWHz0WZZ1UrTwBGPX3Rat9AFiXRMRjoMdIdJLEOt2h7jrYOzgOamKZSWSNspOS0X8SAqRYmxRL7sg4eLzYmNehcxh3uoyud/BH2Udux4ywxFTc1xC7Mgf4vMhc5S+kSH3Y7yj+qpwIWSoPTVCOOPVthGx9FbGqrwFw6wSFxJr+17zeKcztt3u+2roAEVgUjDd+AHGuxHy2rZHaa8JMkTHEeyi85ANPO9j9BVuBRD2FY5LDMo/Sz/2hReqGIs/KiFin+CsPsYO/yvM3jL2vE8EbX7/Bf8ejtr2GLN65bioAdgLd8Bis/mD5GmP2qeqyo2ZwQEOtAjRIDH7mBKpUcMoApbZJ5UIxkEwxyMZyMxW/uKFvHCFR3SSmerHyDNQ2dF4JG6zIMpBgLfjSF9x1D6smFcYnGApjmSLICO3ecCDWrQ48geba9DI3STy2i7ax6WIB62fSyIZIiO3GFQqSURp8wCo7GhJBGwuSovJBNjb7kT6FPVnIa9qJ2Ko+l9mefGIdinaMp0yC1URYiwsdfNE45EuA5Cx9EhalfvN5s+UyItm81vaB3p4joniN+SCP7Qc1hblAAAAAElFTkSuQmCC',
  base64FlowerWhite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP/AGzCOYZj5g1nAAACfklEQVRYw+2YTVPDIBCGtza9Jw25a0bvcax30o73OOr//yvma2F3YWlpPTijXNpAHrK8LLALVPFium2vNIFSbwGKTGQA2GUiHcD29yDNy3sMIdUBQl7r2H8mOEVqAHgPkYZUS6Qc2zYhQqtjyDZEximCZwWZLIBeIgYShs2NzxKpSUehYpMJhURGb+O+w5BpMCAREKPnCDHbIY20SzhM5yxziAXpOiBXydrekT9i5XDEq4NIIHHgyU5mRGqviII4mREJJA4QJzMiILwlRJzpKxJKvCBm8OsBBbLux0tsPl4RKYm5aPu6jw1U4mGxEUR9g8M1PcqBEp/WJliNgYOXueBzS4jZSIcgY5lCtevgDSgyzE+rAfuOTQMq0yzvoGH18qju27Mayzs4fPyMziCx81NJa5RNfW7vPYK9KOfDiVkBxFHG8hAj9txuoBuSWORsFfkpBf7xKFLSeaOefEojh5jz22DJEqMP8fUyaKdQx+RnG+yXMpe8Aars8ueR1pVH/bW3FyyvPRw90upLDHwpgBDtg4aUBNkxRLXMAi03IhcZtr1m+FeI/O/JNyDmmL1djLOauSlNflBpW18RQ2bPqXI22MXXEk75KRHTnkPkYbESbdKP2ZFk0r5sIwffAjy1lx+vx7NLjB6/E7Jfv5ERKhzpN0w8IDE8IGFDv5dhz10s7GFiXRZcUeLCEG5P5nDq9k4PFDcoMpE3GY4OuxuCXhmuyNB6k0RsLIAvqp9NE5r8ZCSS8gxnUp7ODdYhZTqxuiJ9uyJJtPmpqJ7wVj+XVieS903iViHziqAhchLEJAyb7jWU647EpUofQ0ziUuXXXhDddtlllSwjgSQu7r4BRWhQqfDPMVwAAAAASUVORK5CYII=',
  base64Success: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVRUVFHcExTU1NRUVFRUVFRUVFOSlSUAAAABnRSTlP/AI6+VySB3ZENAAACcElEQVRYw+2YyYKCMAyGI8hdpdxdZu7gcpdZ7jL6/s8yYheSNi0aPdqbwOffpGmaFOYPD3gj4bisN7vddv17N/JVgxn5x12IWgIaWTuO/IE3PseQbwjGPo2cgRmHFLJwdm/X643zwiqOKPPJ1nj3sjEP2iiifZWj5bhopSyGaEO2HX5fbQJzwJ+W7x/jw5ZFjsEU0PMph9xE8i5EqprKALW95eJQURkgzw98uJ/JvwGecR7bIjWWsUgVrrIfFZ2HlLy3sKETD1mmRLRMRhGVssRa0xJkdn3SpJBymBkM8+pSSDXMDNyDaToVHd2fgpNt0sjwiUZO19+jGQ+gQEg9Oq+bufmAVGihomNmjQG7UG3020vrlm7lkFnKFGU3kZ0KGAdmKe821pipQ+qEKcrZeTL2g5FsUks4cStjEZWwXg0b0n4GxmEpkWwIs5VBynjgK7xZaz1/0D7OxkVuLpsY5BQNFyLS84VBjjbg0iL2r2EQHBOxBhikuUOkdxODVF1cxHoWtPPsiyXO455Iv34hssCO8EV4ZIYTjS8SR4qYSHRiTiYQ4ZFbHi0iIhhBTi6dTCgSWRcnw4h4yGTuyTAiOGBIWGoZTgSHJQl+LcOJ4OCnW6yX2bMnJ9pidCOXtkTkTrIGpYuOynAiOF14SamMiOCk5Ke+mq8BcOrrvym8d0zKIQnWT+M1WwOQNO4fFiWb18hhERxJPx2fblbPHHyC41VyiAtKBUFBIih7JMWVoIQTFIr3lKPN80WvoLSWFPC653ioTZA0I0FrQ7qU6asaK0H7JmkSJa2ooOGVtNUsc3j9FYHkIkJy3SG6VHnfXKXGP9t4N9Q4Ye98AAAAAElFTkSuQmCC',
  base64SuccessWhite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAiVYk6KvDHLfaegAAAo1JREFUWMPtWEtzmzAQNhCTq910ytXpiyvxTNOr60zrayepx9d02gnX4sTm7xcEiJX2gdnkGJ1A4tOnfWqXyeR1vMRYzrcPD9v5h5MBl3/Ldvx4cxIg/FWC8X0xjLjalM54uhhCfCrRuJURX0pi3EmIqZV7O59vrRZmguStHL9b7S7ftfLwOtiZDw7AHMtmquAQ12b5Wwbnordm8g9zLLO49qc/m2n6aKnhwPOGZ08hAiNHhheiHae1lOUPGZpQkPKa3q0mOUjaRzSRaGUjpy/mmWSwySSpllcEteBKAT52KEnSbblA51pJEPxBQoiH1FP4E3s5+FJv07h6/ylD6ui7B+9fq/ehrFB98ghec9EoVtyjK8pqCHLmCBOwMWSCeWFNN4MbPAk55NhsvoFHSSVR0k5TCTTEzlUGcqV/nVp7n9oIVkmtaqbAEqEgfdgHJPwsEAyZ9r4VAZXFjpEwyaw3+H2v42KYxKhs1XvY/gSSGv+IHyUSuHXCeZhLAgVI3EjgSGo1Fb3xO0tGGU9S2/KAIbtjxpJASG73qox6w5LUq0cEOa+iIONIWIilQSQ0pPa2jgaRQAgQP7c0mITRWGxpMAmEQFN2NAQJNCV0mI6GIIEO47hlQ0ORQLd0nL+hoUjg1m6I1TRr8uYEAriBHLcVFQ5UEMiBe3XkTBEG04WXlGKGxPnMS305XQPA1Ocn2JiuAZwE66fxnKwBnDTuXxZTMq85lwW6kt5ndLqZPefiU1yvmktcUSooChJF2aMprhQlnKJQ5FxRKkcVRa+itNYU8Io2oVkY14w0NMWYlqft91Bj9VHq+ca3b43BxjWJmla0sfKohlfTVpPN+93L/yLQ/IjQ/O5Q/VR5HdL4D7mlxmjwVdELAAAAAElFTkSuQmCC',
  base64Empty: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjA5OjQwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWQwMWYzNWQtOWRjOC00MDBiLWEyMmQtNjM5OGZiNzVhNGRiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZDhlMzQ3ZmEtMDY2My1jYTRiLTgzNTctNTk4YjBkNGIzOTU2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYmJkZmUyZC0xY2Q2LTJiNDgtYjUyNS05YzlhZjdlNjA4NDMiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MjM6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTQ5MjM5MDAtNDhiZC03YTQ1LWI4NGItYmVlZTVjOWUxYTM1IiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjIzOjQwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVkMDFmMzVkLTlkYzgtNDAwYi1hMjJkLTYzOThmYjc1YTRkYiIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBz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',
  base64Error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjEwOjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ3NTExNjAtZDY5MC00ZTkzLWFhNGUtNGMwYTViNGU1ZGFjIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRiNzlkYWMtZTJmYS1iNzQ0LWIxM2ItOWU1N2VjMDhhM2YwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZjk1NTE1OC04MjFiLTA4NDUtYWJmNS05YTE1NGM1ZTY4NjEiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MDQ6MDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGM1Y2IyNWItZDZlNC0yZjQ2LTgyODQtZmUwOTNlY2M2ZTkxIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjA0OjA0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NzUxMTYwLWQ2OTAtNGU5My1hYTRlLTRjMGE1YjRlNWRhYyIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNmOTU1MTU4LTgyMWItMDg0NS1hYmY1LTlhMTU0YzVlNjg2MSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2ZGQ4NTQxLWQ0MWEtYmY0Yy1iZjA3LWNmNjZhNjZhMDg2MSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwODAyODAyLTM1MmEtODU0YS05MWI3LTZkZTZkNTJlYjNkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph2LDQsAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA5UExURUdwTNra2s7Ozq2tre3t7dPT087OzuPj4+3t7dbW1u/v79bW1vz8/MrKytDQ0Nzc3MPDw/X19bi4uMZQDnEAAAAKdFJOUwBqEPywotz+wzqApqiTAAAHW0lEQVR42u1b25akIAwcbx2UFoj//7HLTQVBRcSZfTDnbM/uTl/KSlEkwf75eeONN95444033njjjTduR9/0/yOsbqoevObL7101tYX1HFs9QFtfZalRP+rpQVgdAFx990ZnT8L6eZItUl99jeGpf1DxdV/VP9fV1f/PFlF1bYHoVFSRC60IyVjrFRnuB8IoxpExSrstsErKHpJw1eqybNLbAQvAYkKjUrjoBgKRqAaeIjG5+qaps6hKcMWmcdSwqAJWBbAgCZZaIYbsqggqqlHNbFFa5yVR4jKvrKEErOEjNCqNSwHrfE8lpLsod/u+cOPPMPBJ+Gz5dM0cXNgclre+pSxhYI1WW5Tf9ENSMIdLCiWs6q9hwQprBVYKFqyPlx4WtoSvrT9lC/wkGt8qlkQooC3hi6sgW3Bb8gtdpSV/za/mn49pC0oYhONbfyd5hzDLFivKFpTS1gKM0we0tQCEncfgQn7Rt+DC/299i1MSRJcBC0r7VviG5KZvwV5WIUobxHyrJKy8VRjXVgFYsPu5kOtbxdhycCDuihziXVLoW7xwEiUmDgd544B46luWLW+nugMLB2BimmC3cxTNxCDg8xFtuUSNqoFsDKzY8psa+XtBNWXr74N6qxwsS5T6VL5robKl10+ZRu5S9qBvUYuJwVHzjwjrE3G33qKh+WXBgmkmCvHYquTvZ8oo7rLFA4PJgYW0MdePIRQIGUPNbSMw5lubJMKtJI6+Wk6cVFMmACO+VVryeL7ZgI8MhwS2fnNPPK0geHBRd11eJSiyL4KjrL2umm1XIpRii1MKB/mU/iCZwF+pt5z3UJ7UiF3nQqadAXC3T3xEW2IyuDBe3yDTe0+A64it2WTyYSGVHymUI/EduvSWKJ80Dtv2NbYSoQxbMkVC7yzNGIWFvDF7gRD79RYrWW/BDGti4wwLtgvO7gWKUZ8Mt94qX8vLJE70+xVNwzDm9ghNM+FX7p/jlZUId2HJD+Tf79hMe3WNrAK/30E+C8/6xOCqbqxE5JNMYrNbnaLUvJAewfCg8zF0Ba/tbviWLvPYfsGFA1PVD8ZdnjlVc/DS/o7LK4NHjOjKKbfCTSCo5XmwKbaZM4jlc9NGEYd9Ijd0QS5ZGaOR2O+DPlGyRb2nXZzgnI1GdFWF+0gh3ifyTRqvzpXI2eElk58FeHziCF5hY+hSMV9Ge/mohUTGuQ4vzHYe8bW5sNdFQ58St22Vcf5zzJbtcGT4iYQ7iz8dFuxoWRYMjAM7KCnypHOTLSqdUwYIFpndOD/6B2FBzNQxYmW/zxYE4j8yLHga1s2Rbm/O5PXtGcuNDIW1dTj5hpjGsO+7z2Kk9NP1JWDlnWKAM4H6zCUNM05KyVPHBclYzUbgjE3N3tP2JWHBmbqD4GLeCs2jhMT13lMVljwcEbetwZgtHUxVQ21ho3fE7inf2s8vzMWq0EWpfOBg5hcDSGwaF2+LaysRIzNFqRgBv2sMhi/Ix0WiW8rBKNBv4ExBI7eorx9ANazsPCb5FkSNH+Reacos+AYxaFzX76KMH65c8ytzZ40YvpFAqtgC/otn1eCmMI5K8yVRQVVwq3aVtU+jJktwjyP7x+BKv8vtoH098vXYSJcrWGJcAW11r8WVRxe5vgcuFbXqwnaEZejS6mrLwYKUg1ch2RJswTFYgMOwoau+AQsSp/FuDhVZi7J402ifgGla/GJIzGLYG5H4rnKMCUydL9wcsmZSuPikR2QmjQbWqaV2ob2RdMvaLEvFlRiXpYeTwqVOtMZF+qi0dS4uEjJKMvWuYK3S0jHZwaq7BylYp/O2uu3q04lNqudLWEJQd/3paTBz12IaLIPtzE5P1AUuW9TB8NVzaG9/TIfV+eXsWeezz6HWlptEbo4SIAeWur/Y/RZC/gmZTiLzUY2j5ct6fjKsFvxqgyQxE9sbmfYtnJMIciEKo6+FL0wziJmtkzspIcUl0PgWrL7VCKP7hl61U4WLeN+7Ieli2vZhmq0VgjDOgIyhJ62sSpDkWNZa1wiB8WoLlxzy29XpGVPgn1ut5VYcGyRLK7OCiJaDYMrAneJUkZWdw0yDgNm5nDowqLc0Kp581FO7QS4pC9S/YRW9xkVdNOj0ZHCp9anEZw3VEK/fopiDrkMObkcdJtT1g6+uzQ60bIdUPztdWZWy53m+v/zFYPOGHO4AZsalmtJNkyHrCAx1RXX7mt5g1L1pDezpkXv8wJwpVRSSaf2c26Y0rrXXxyWBptu/ovdak+VhkqjGBZUdvKygqANKA/MqZ/36kcGwFn90RnWp66ksKuHgitLFY8BU+F2ZvqpxpMY9qR3YwOUJ12fc0KUHVKdswcKXuwetErCnwvMKuXxfc/3RVJ2yFc+iosQd3X+WGSVz1UiuN2J156FyVyHbsOUp3krezaPUT/VxXqdfwvknb/Zgp+idTxTbrkLqYuKreRnhy65Gf4W0NsDoYiqf6uZsvr8V9eo6XWc5+3TVf/3N1TfeeOONN95444033njjjTfeSI1/IeOYOeO4fGAAAAAASUVORK5CYII=',
  base64BackToTop: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAElBMVEVRUVH+/v5HcEyZmZlRUVFRUVGm1ByOAAAABnRSTlPMzADMTZAJBBGsAAAEnElEQVR42t2cS27jMAyGf7/2U+QCQeDsbeQCgZDujaC5/1UmkzaJn+JDFGcw3LdfflKibJkkDnxrL7dbg7sNt6+L4O8OYBM+B0ys+QrGkHZG+OEEQ8g6go8Bx1GIGMdpNOQyIG6XdMgnSPtKhLQDGEZFBgYMkhKFtGBb0EIEjDgFRowoBVaMGAWpMedEfxMiZtwpUsgZCqtlkCNUdpVAWigtCCCDFtLwIWeoreZCWiRYYEKGFEjDg+yRZCUH0iLRAgNyToXUNCRZyMqWhGnUN2IPm3wSlwJ7IUspyCBkIQUZhCykIIeQuRTkEDKXAuM9srrtYbrZN7Y98giZSoFd+t1OxmMITG0dcrSFXFchZ1tIvQZpYWxhBbK3hpQrkMEa0iwh5t4a+QvZvDXyF7J5a+Qv5PPW21/I5623v5DPW29/IaO3Xv5Clrw1y1/Ikrdm+Qs5svw83yNnSJ5BQb4F/F7EIEJSnThGBAXxkFQfLOviQUE8JAUPsosHBfGQfDAtHhREQ1JxIV00KIgmrnRI84S0yAd5BAXxxJUck0f6Qnwr9qmr6xF5xLMjcwn/iudIEAdWnyjkEXlQKZiRVzoqRyLbgeUKKR8Q4alY7cSnoxzSf2ggsqehKr6YVpcXpOd7H93f60cKhOd7Re2LteUF4eLqiVS1mr0ge4io6C2+soaFkJ7MuuuQs1yITEp9hwwKISIpzR2iESKSIoT0rLNwuVHQqoSIpAQJpGce60vIUSdEIuUqgPTsJ5QFZK8UIpBS8iG94GFrDjlrhfCl8CG96Llxmle4kEr6vKWBPIVo9kqDQSRk9/3cWoikcCFPAd33v4dIChPyEvLzBA6RlEYWke4JEUnhKXkLeUEKxRHJFfKCQHGucIW8IdZSRkLeEGMpYyEjiK2UsZARxFTKRMgYYillImQMMZQyFTKB2EmZCplAuFLIHT8TMoWwpQwiIVMIUwqpZP5bp5CCvCTiQKr5f5lCQN+tPCBn2ZvVDFJwIDUP0m1BYAfZYRNSsCB7BqTbhoARePIxtZ9tgwWkoJcwCalmv3MBAemtO4R6dah2HaKQqj8Zvp9sQDjvJ21+SPCBHPJDDk6QITekEV7gqCC19CpKAym9IMfckKv4olMBCeIrWwVEfvkshzQekO9r9P1/ALk+IG1eSPCDiCJfyG+FyU+A6ZCa/piZDinpz7LpkCv5gdkAEshP5emQhv7onw6pGeULyZCSUYiRDAmMkpJkCKs4JhFSq8p8hJBSVbAkhARV6ZUQoisik0FqXTmcDHLVFfbJIEFXoiiCNMpiSxGkVJaNiiBBWQArgTTaUl4JpNQWJUsgQVteXQg+AKkLxQWFGKW+5J2+eVp4S168X3CF1CltCKdTJ8lb84YK2bUBO+wZW0Pqv9nk4tKu49N45NJC5dMM5tLW5tOg59Jq6NM06dL+abFXwr/RkuvTXJwae1abtE/Dt0/ruksTvs84AZ/BCC4jHnyGVfiM3VBQFANEXEah+Ax18RlP4zNox2dkkM/wI58xTn8yDCXGYCDV3W5RGSajtXyGhG1jbpbjzpwGt/0MJft8jqC7iUbQ/QZaxdnKqcIftwAAAABJRU5ErkJggg=='
};
exports.default = _default;

/***/ }),
/* 256 */
/*!**************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-constant.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// [z-paging]常量
var _default = {
  // 当前版本号
  version: '2.8.7',
  // 延迟操作的通用时间
  delayTime: 100,
  // 请求失败时候全局emit使用的key
  errorUpdateKey: 'z-paging-error-emit',
  // 全局emit complete的key
  completeUpdateKey: 'z-paging-complete-emit',
  // z-paging缓存的前缀key
  cachePrefixKey: 'z-paging-cache',
  // 虚拟列表中列表index的key
  listCellIndexKey: 'zp_index',
  // 虚拟列表中列表的唯一key
  listCellIndexUniqueKey: 'zp_unique_index'
};
exports.default = _default;

/***/ }),
/* 257 */
/*!***********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-utils.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _index = _interopRequireDefault(__webpack_require__(/*! ../config/index */ 258));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! ./z-paging-constant */ 256));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var storageKey = 'Z-PAGING-REFRESHER-TIME-STORAGE-KEY';
var config = null;
var configLoaded = false;
var cachedSystemInfo = null;
var timeoutMap = {};

// 获取默认配置信息
function gc(key, defaultValue) {
  // 这里return一个函数以解决在vue3+appvue中，props默认配置读取在main.js之前执行导致uni.$zp全局配置无效的问题。相当于props的default中传入一个带有返回值的函数
  return function () {
    // 处理z-paging全局配置
    _handleDefaultConfig();
    // 如果全局配置不存在，则返回默认值
    if (!config) return defaultValue;
    var value = config[key];
    // 如果全局配置存在但对应的配置项不存在，则返回默认值；反之返回配置项
    return value === undefined ? defaultValue : value;
  };
}

// 获取最终的touch位置
function getTouch(e) {
  var touch = null;
  if (e.touches && e.touches.length) {
    touch = e.touches[0];
  } else if (e.changedTouches && e.changedTouches.length) {
    touch = e.changedTouches[0];
  } else if (e.datail && e.datail != {}) {
    touch = e.datail;
  } else {
    return {
      touchX: 0,
      touchY: 0
    };
  }
  return {
    touchX: touch.clientX,
    touchY: touch.clientY
  };
}

// 判断当前手势是否在z-paging内触发
function getTouchFromZPaging(target) {
  if (target && target.tagName && target.tagName !== 'BODY' && target.tagName !== 'UNI-PAGE-BODY') {
    var classList = target.classList;
    if (classList && classList.contains('z-paging-content')) {
      // 此处额外记录当前z-paging是否是页面滚动、是否滚动到了顶部、是否是聊天记录模式以传给renderjs。避免不同z-paging组件renderjs内部判断数据互相影响导致的各种问题
      return {
        isFromZp: true,
        isPageScroll: classList.contains('z-paging-content-page'),
        isReachedTop: classList.contains('z-paging-reached-top'),
        isUseChatRecordMode: classList.contains('z-paging-use-chat-record-mode')
      };
    } else {
      return getTouchFromZPaging(target.parentNode);
    }
  } else {
    return {
      isFromZp: false
    };
  }
}

// 递归获取z-paging所在的parent，如果查找不到则返回null
function getParent(parent) {
  if (!parent) return null;
  if (parent.$refs.paging) return parent;
  return getParent(parent.$parent);
}

// 打印错误信息
function consoleErr(err) {
  console.error("[z-paging]".concat(err));
}

// 延时操作，如果key存在，调用时清除对应key之前的延时操作
function delay(callback) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _zPagingConstant.default.delayTime;
  var key = arguments.length > 2 ? arguments[2] : undefined;
  var timeout = setTimeout(callback, ms);
  ;
  if (!!key) {
    timeoutMap[key] && clearTimeout(timeoutMap[key]);
    timeoutMap[key] = timeout;
  }
  return timeout;
}

// 设置下拉刷新时间
function setRefesrherTime(time, key) {
  var datas = getRefesrherTime() || {};
  datas[key] = time;
  uni.setStorageSync(storageKey, datas);
}

// 获取下拉刷新时间
function getRefesrherTime() {
  return uni.getStorageSync(storageKey);
}

// 通过下拉刷新标识key获取下拉刷新时间
function getRefesrherTimeByKey(key) {
  var datas = getRefesrherTime();
  return datas && datas[key] ? datas[key] : null;
}

// 通过下拉刷新标识key获取下拉刷新时间(格式化之后)
function getRefesrherFormatTimeByKey(key, textMap) {
  var time = getRefesrherTimeByKey(key);
  var timeText = time ? _timeFormat(time, textMap) : textMap.none;
  return "".concat(textMap.title).concat(timeText);
}

// 将文本的px或者rpx转为px的值
function convertToPx(text) {
  var dataType = Object.prototype.toString.call(text);
  if (dataType === '[object Number]') return text;
  var isRpx = false;
  if (text.indexOf('rpx') !== -1 || text.indexOf('upx') !== -1) {
    text = text.replace('rpx', '').replace('upx', '');
    isRpx = true;
  } else if (text.indexOf('px') !== -1) {
    text = text.replace('px', '');
  }
  if (!isNaN(text)) {
    if (isRpx) return Number(rpx2px(text));
    return Number(text);
  }
  return 0;
}

// rpx => px，预留的兼容处理
function rpx2px(rpx) {
  return uni.upx2px(rpx);
}

// 同步获取系统信息，兼容不同平台
function getSystemInfoSync() {
  var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (useCache && cachedSystemInfo) {
    return cachedSystemInfo;
  }
  // 目前只用到了deviceInfo、appBaseInfo和windowInfo中的信息，因此仅整合这两个信息数据
  var infoTypes = ['DeviceInfo', 'AppBaseInfo', 'WindowInfo'];
  var _infoTypes$reduce = infoTypes.reduce(function (acc, key) {
      var method = "get".concat(key);
      if (uni[method] && uni.canIUse(method)) {
        acc[key.charAt(0).toLowerCase() + key.slice(1)] = uni[method]();
      }
      return acc;
    }, {}),
    deviceInfo = _infoTypes$reduce.deviceInfo,
    appBaseInfo = _infoTypes$reduce.appBaseInfo,
    windowInfo = _infoTypes$reduce.windowInfo;
  // 如果deviceInfo、appBaseInfo和windowInfo都可以从各自专属的api中获取，则整合它们的数据
  if (deviceInfo && appBaseInfo && windowInfo) {
    cachedSystemInfo = _objectSpread(_objectSpread(_objectSpread({}, deviceInfo), appBaseInfo), windowInfo);
  } else {
    // 使用uni.getSystemInfoSync兜底，确保能获取到最终的系统信息
    cachedSystemInfo = uni.getSystemInfoSync();
  }
  return cachedSystemInfo;
}

// 获取当前时间
function getTime() {
  return new Date().getTime();
}

// 获取z-paging实例id，随机生成10位数字+字母
function getInstanceId() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 10; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  return s.join('') + getTime();
}

// 等待一段时间
function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

// 是否是promise
function isPromise(func) {
  return Object.prototype.toString.call(func) === '[object Promise]';
}

// 添加单位
function addUnit(value, unit) {
  if (Object.prototype.toString.call(value) === '[object String]') {
    var tempValue = value;
    tempValue = tempValue.replace('rpx', '').replace('upx', '').replace('px', '');
    if (value.indexOf('rpx') === -1 && value.indexOf('upx') === -1 && value.indexOf('px') !== -1) {
      tempValue = parseFloat(tempValue) * 2;
    }
    value = tempValue;
  }
  return unit === 'rpx' ? value + 'rpx' : value / 2 + 'px';
}

// 深拷贝
function deepCopy(obj) {
  if ((0, _typeof2.default)(obj) !== 'object' || obj === null) return obj;
  var newObj = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  return newObj;
}

// 对短时间内重复插入的数据进行整合，并一次性插入
function useBufferedInsert(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var buffer = [];
  var timer = null;
  var latestArgs = [];
  return function insertBuffered(data) {
    var _buffer;
    var newData = Object.prototype.toString.call(data) !== '[object Array]' ? [data] : data;
    (_buffer = buffer).push.apply(_buffer, (0, _toConsumableArray2.default)(newData));
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    latestArgs = args;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(void 0, [buffer.length === 1 ? buffer[0] : buffer].concat((0, _toConsumableArray2.default)(latestArgs)));
        buffer = [];
        timer = null;
      }, buffer.length === 1 ? 10 : delay);
    }
  };
}

// ------------------ 私有方法 ------------------------
// 处理全局配置
function _handleDefaultConfig() {
  // 确保只加载一次全局配置
  if (configLoaded) return;
  // 优先从config.js中读取
  if (_index.default && Object.keys(_index.default).length) {
    config = _index.default;
  }
  // 如果在config.js中读取不到，则尝试到uni.$zp读取
  if (!config && uni.$zp) {
    config = uni.$zp.config;
  }
  // 将config中的短横线写法全部转为驼峰写法，使得读取配置时可以直接通过key去匹配，而非读取每个配置时候再去转，减少不必要的性能开支
  config = config ? Object.keys(config).reduce(function (result, key) {
    result[_toCamelCase(key)] = config[key];
    return result;
  }, {}) : null;
  configLoaded = true;
}

// 时间格式化
function _timeFormat(time, textMap) {
  var date = new Date(time);
  var currentDate = new Date();
  // 设置time对应的天，去除时分秒，使得可以直接比较日期
  var dateDay = new Date(time).setHours(0, 0, 0, 0);
  // 设置当前的天，去除时分秒，使得可以直接比较日期
  var currentDateDay = new Date().setHours(0, 0, 0, 0);
  var disTime = dateDay - currentDateDay;
  var dayStr = '';
  var timeStr = _dateTimeFormat(date);
  if (disTime === 0) {
    dayStr = textMap.today;
  } else if (disTime === -86400000) {
    dayStr = textMap.yesterday;
  } else {
    dayStr = _dateDayFormat(date, date.getFullYear() !== currentDate.getFullYear());
  }
  return "".concat(dayStr, " ").concat(timeStr);
}

// date格式化为年月日
function _dateDayFormat(date) {
  var showYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return showYear ? "".concat(year, "-").concat(_fullZeroToTwo(month), "-").concat(_fullZeroToTwo(day)) : "".concat(_fullZeroToTwo(month), "-").concat(_fullZeroToTwo(day));
}

// data格式化为时分
function _dateTimeFormat(date) {
  var hour = date.getHours();
  var minute = date.getMinutes();
  return "".concat(_fullZeroToTwo(hour), ":").concat(_fullZeroToTwo(minute));
}

// 不满2位在前面填充0
function _fullZeroToTwo(str) {
  str = str.toString();
  return str.length === 1 ? '0' + str : str;
}

// 驼峰转短横线
function _toKebab(value) {
  return value.replace(/([A-Z])/g, "-$1").toLowerCase();
}

// 短横线转驼峰
function _toCamelCase(value) {
  return value.replace(/-([a-z])/g, function (_, group1) {
    return group1.toUpperCase();
  });
}
var _default = {
  gc: gc,
  setRefesrherTime: setRefesrherTime,
  getRefesrherFormatTimeByKey: getRefesrherFormatTimeByKey,
  getTouch: getTouch,
  getTouchFromZPaging: getTouchFromZPaging,
  getParent: getParent,
  convertToPx: convertToPx,
  getTime: getTime,
  getInstanceId: getInstanceId,
  consoleErr: consoleErr,
  delay: delay,
  wait: wait,
  isPromise: isPromise,
  addUnit: addUnit,
  deepCopy: deepCopy,
  rpx2px: rpx2px,
  getSystemInfoSync: getSystemInfoSync,
  useBufferedInsert: useBufferedInsert
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 258 */
/*!******************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/config/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// z-paging全局配置文件，注意避免更新时此文件被覆盖，若被覆盖，可在此文件中右键->点击本地历史记录，找回覆盖前的配置
var _default = {};
exports.default = _default;

/***/ }),
/* 259 */
/*!******************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/common-layout.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
// [z-paging]通用布局相关模块
var _default = {
  data: function data() {
    return {
      systemInfo: null,
      cssSafeAreaInsetBottom: -1,
      isReadyDestroy: false
    };
  },
  computed: {
    // 顶部可用距离
    windowTop: function windowTop() {
      if (!this.systemInfo) return 0;
      // 暂时修复vue3中隐藏系统导航栏后windowTop获取不正确的问题，具体bug详见https://ask.dcloud.net.cn/question/141634
      // 感谢litangyu！！https://github.com/SmileZXLee/uni-z-paging/issues/25

      return this.systemInfo.windowTop || 0;
    },
    // 底部安全区域高度
    safeAreaBottom: function safeAreaBottom() {
      if (!this.systemInfo) return 0;
      var safeAreaBottom = 0;
      safeAreaBottom = Math.max(this.cssSafeAreaInsetBottom, 0);
      return safeAreaBottom;
    },
    // 是否是比较老的webview，在一些老的webview中，需要进行一些特殊处理
    isOldWebView: function isOldWebView() {
      try {
        var systemInfos = _zPagingUtils.default.getSystemInfoSync(true).system.split(' ');
        var deviceType = systemInfos[0];
        var version = parseInt(systemInfos[1]);
        if (deviceType === 'iOS' && version <= 10 || deviceType === 'Android' && version <= 6) {
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    // 当前组件的$slots，兼容不同平台
    zSlots: function zSlots() {
      return this.$scopedSlots || this.$slots;
      return this.$slots;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.isReadyDestroy = true;
  },
  methods: {
    // 更新fixed模式下z-paging的布局
    updateFixedLayout: function updateFixedLayout() {
      var _this = this;
      this.fixed && this.$nextTick(function () {
        _this.systemInfo = _zPagingUtils.default.getSystemInfoSync();
      });
    },
    // 获取节点尺寸
    _getNodeClientRect: function _getNodeClientRect(select) {
      var inDom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var scrollOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.isReadyDestroy) {
        return Promise.resolve(false);
      }
      ;
      // nvue中获取节点信息

      // vue中获取节点信息

      /*
      inDom可能是true、false，也可能是具体的dom节点
      如果inDom不为false，则使用uni.createSelectorQuery().in()进行查询，如果inDom为true，则in中的是this，否则in中的为具体的dom
      如果inDom为false，则使用uni.createSelectorQuery()进行查询
      */
      var res = !!inDom ? uni.createSelectorQuery().in(inDom === true ? this : inDom) : uni.createSelectorQuery();
      scrollOffset ? res.select(select).scrollOffset() : res.select(select).boundingClientRect();
      return new Promise(function (resolve, reject) {
        res.exec(function (data) {
          resolve(data && data != '' && data != undefined && data.length ? data : false);
        });
      });
    },
    // 获取slot="left"和slot="right"宽度并且更新布局
    _updateLeftAndRightWidth: function _updateLeftAndRightWidth(targetStyle, parentNodePrefix) {
      var _this2 = this;
      this.$nextTick(function () {
        var delayTime = 0;
        setTimeout(function () {
          ['left', 'right'].map(function (position) {
            _this2._getNodeClientRect(".".concat(parentNodePrefix, "-").concat(position)).then(function (res) {
              _this2.$set(targetStyle, position, res ? res[0].width + 'px' : '0px');
            });
          });
        }, delayTime);
      });
    },
    // 通过获取css设置的底部安全区域占位view高度设置bottom距离（直接通过systemInfo在部分平台上无法获取到底部安全区域）
    _getCssSafeAreaInsetBottom: function _getCssSafeAreaInsetBottom(success) {
      var _this3 = this;
      this._getNodeClientRect('.zp-safe-area-inset-bottom').then(function (res) {
        _this3.cssSafeAreaInsetBottom = res ? res[0].height : -1;
        res && success && success();
      });
    },
    // 同步获取系统信息，兼容不同平台（供z-paging-swiper使用）
    _getSystemInfoSync: function _getSystemInfoSync() {
      var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return _zPagingUtils.default.getSystemInfoSync(useCache);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 260 */
/*!****************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/data-handle.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! .././z-paging-constant */ 256));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
var _zPagingInterceptor = _interopRequireDefault(__webpack_require__(/*! ../z-paging-interceptor */ 262));
// [z-paging]数据处理模块
var _default2 = {
  props: {
    // 自定义初始的pageNo，默认为1
    defaultPageNo: {
      type: Number,
      default: _zPagingUtils.default.gc('defaultPageNo', 1),
      observer: function observer(newVal) {
        this.pageNo = newVal;
      }
    },
    // 自定义pageSize，默认为10
    defaultPageSize: {
      type: Number,
      default: _zPagingUtils.default.gc('defaultPageSize', 10),
      validator: function validator(value) {
        if (value <= 0) _zPagingUtils.default.consoleErr('default-page-size必须大于0！');
        return value > 0;
      }
    },
    // 为保证数据一致，设置当前tab切换时的标识key，并在complete中传递相同key，若二者不一致，则complete将不会生效
    dataKey: {
      type: [Number, String, Object],
      default: _zPagingUtils.default.gc('dataKey', null)
    },
    // 使用缓存，若开启将自动缓存第一页的数据，默认为否。请注意，因考虑到切换tab时不同tab数据不同的情况，默认仅会缓存组件首次加载时第一次请求到的数据，后续的下拉刷新操作不会更新缓存。
    useCache: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useCache', false)
    },
    // 使用缓存时缓存的key，用于区分不同列表的缓存数据，useCache为true时必须设置，否则缓存无效
    cacheKey: {
      type: String,
      default: _zPagingUtils.default.gc('cacheKey', null)
    },
    // 缓存模式，默认仅会缓存组件首次加载时第一次请求到的数据，可设置为always，即代表总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
    cacheMode: {
      type: String,
      default: _zPagingUtils.default.gc('cacheMode', _zPagingEnum.default.CacheMode.Default)
    },
    // 自动注入的list名，可自动修改父view(包含ref="paging")中对应name的list值
    autowireListName: {
      type: String,
      default: _zPagingUtils.default.gc('autowireListName', '')
    },
    // 自动注入的query名，可自动调用父view(包含ref="paging")中的query方法
    autowireQueryName: {
      type: String,
      default: _zPagingUtils.default.gc('autowireQueryName', '')
    },
    // 获取分页数据Function，功能与@query类似。若设置了fetch则@query将不再触发
    fetch: {
      type: Function,
      default: null
    },
    // fetch的附加参数，fetch配置后有效
    fetchParams: {
      type: Object,
      default: _zPagingUtils.default.gc('fetchParams', null)
    },
    // z-paging mounted后自动调用reload方法(mounted后自动调用接口)，默认为是
    auto: {
      type: Boolean,
      default: _zPagingUtils.default.gc('auto', true)
    },
    // 用户下拉刷新时是否触发reload方法，默认为是
    reloadWhenRefresh: {
      type: Boolean,
      default: _zPagingUtils.default.gc('reloadWhenRefresh', true)
    },
    // reload时自动滚动到顶部，默认为是
    autoScrollToTopWhenReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoScrollToTopWhenReload', true)
    },
    // reload时立即自动清空原list，默认为是，若立即自动清空，则在reload之后、请求回调之前页面是空白的
    autoCleanListWhenReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoCleanListWhenReload', true)
    },
    // 列表刷新时自动显示下拉刷新view，默认为否
    showRefresherWhenReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showRefresherWhenReload', false)
    },
    // 列表刷新时自动显示加载更多view，且为加载中状态，默认为否
    showLoadingMoreWhenReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showLoadingMoreWhenReload', false)
    },
    // 组件created时立即触发reload(可解决一些情况下先看到页面再看到loading的问题)，auto为true时有效。为否时将在mounted+nextTick后触发reload，默认为否
    createdReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('createdReload', false)
    },
    // 本地分页时上拉加载更多延迟时间，单位为毫秒，默认200毫秒
    localPagingLoadingTime: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('localPagingLoadingTime', 200)
    },
    // 自动拼接complete中传过来的数组(使用聊天记录模式时无效)
    concat: {
      type: Boolean,
      default: _zPagingUtils.default.gc('concat', true)
    },
    // 请求失败是否触发reject，默认为是
    callNetworkReject: {
      type: Boolean,
      default: _zPagingUtils.default.gc('callNetworkReject', true)
    },
    // 父组件v-model所绑定的list的值
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      currentData: [],
      totalData: [],
      realTotalData: [],
      totalLocalPagingList: [],
      dataPromiseResultMap: {
        reload: null,
        complete: null,
        localPaging: null
      },
      isSettingCacheList: false,
      pageNo: 1,
      currentRefreshPageSize: 0,
      isLocalPaging: false,
      isAddedData: false,
      isTotalChangeFromAddData: false,
      privateConcat: true,
      myParentQuery: -1,
      firstPageLoaded: false,
      pagingLoaded: false,
      loaded: false,
      isUserReload: true,
      fromEmptyViewReload: false,
      queryFrom: '',
      listRendering: false,
      isHandlingRefreshToPage: false,
      isFirstPageAndNoMore: false,
      totalDataChangeThrow: true,
      addDataFromTopBufferedInsert: _zPagingUtils.default.useBufferedInsert(this._addDataFromTop)
    };
  },
  computed: {
    pageSize: function pageSize() {
      return this.defaultPageSize;
    },
    finalConcat: function finalConcat() {
      return this.concat && this.privateConcat;
    },
    finalUseCache: function finalUseCache() {
      if (this.useCache && !this.cacheKey) {
        _zPagingUtils.default.consoleErr('use-cache为true时，必须设置cache-key，否则缓存无效！');
      }
      return this.useCache && !!this.cacheKey;
    },
    finalCacheKey: function finalCacheKey() {
      return this.cacheKey ? "".concat(_zPagingConstant.default.cachePrefixKey, "-").concat(this.cacheKey) : null;
    },
    isFirstPage: function isFirstPage() {
      return this.pageNo === this.defaultPageNo;
    }
  },
  watch: {
    totalData: function totalData(newVal, oldVal) {
      this._totalDataChange(newVal, oldVal, this.totalDataChangeThrow);
      this.totalDataChangeThrow = true;
    },
    currentData: function currentData(newVal, oldVal) {
      this._currentDataChange(newVal, oldVal);
    },
    useChatRecordMode: function useChatRecordMode(newVal, oldVal) {
      if (newVal) {
        this.nLoadingMoreFixedHeight = false;
      }
    },
    value: {
      handler: function handler(newVal) {
        // 当v-model绑定的数据源被更改时，此时数据源改变不emit input事件，避免循环调用
        if (newVal !== this.totalData) {
          this.totalDataChangeThrow = false;
          this.totalData = newVal;
        }
      },
      immediate: true
    }
  },
  methods: {
    // 请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否成功(默认为是）
    complete: function complete(data) {
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.customNoMore = -1;
      return this.addData(data, success);
    },
    //【保证数据一致】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为dataKey，需与:data-key绑定的一致，第三个参数为是否成功(默认为是）
    completeByKey: function completeByKey(data) {
      var dataKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (dataKey !== null && this.dataKey !== null && dataKey !== this.dataKey) {
        this.isFirstPage && this.endRefresh();
        return new Promise(function (resolve) {
          return resolve();
        });
      }
      this.customNoMore = -1;
      return this.addData(data, success);
    },
    //【通过total判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为total(列表总数)，第三个参数为是否成功(默认为是）
    completeByTotal: function completeByTotal(data, total) {
      var _this = this;
      var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (total == 'undefined') {
        this.customNoMore = -1;
      } else {
        var dataTypeRes = this._checkDataType(data, success, false);
        data = dataTypeRes.data;
        success = dataTypeRes.success;
        if (total >= 0 && success) {
          return new Promise(function (resolve, reject) {
            _this.$nextTick(function () {
              var nomore = false;
              var realTotalDataCount = _this.pageNo == _this.defaultPageNo ? 0 : _this.realTotalData.length;
              var dataLength = _this.privateConcat ? data.length : 0;
              var exceedCount = realTotalDataCount + dataLength - total;
              // 没有更多数据了
              if (exceedCount >= 0) {
                nomore = true;
                // 仅截取total内部分的数据
                exceedCount = _this.defaultPageSize - exceedCount;
                if (_this.privateConcat && exceedCount > 0 && exceedCount < data.length) {
                  data = data.splice(0, exceedCount);
                }
              }
              _this.completeByNoMore(data, nomore, success).then(function (res) {
                return resolve(res);
              }).catch(function () {
                return reject();
              });
            });
          });
        }
      }
      return this.addData(data, success);
    },
    //【自行判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否没有更多数据，第三个参数为是否成功(默认是是）
    completeByNoMore: function completeByNoMore(data, nomore) {
      var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (nomore != 'undefined') {
        this.customNoMore = nomore == true ? 1 : 0;
      }
      return this.addData(data, success);
    },
    // 请求结束且请求失败时调用，支持传入请求失败原因
    completeByError: function completeByError(errorMsg) {
      this.customerEmptyViewErrorText = errorMsg;
      return this.complete(false);
    },
    // 与上方complete方法功能一致，新版本中设置服务端回调数组请使用complete方法
    addData: function addData(data) {
      var _this2 = this;
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.fromCompleteEmit) {
        this.disabledCompleteEmit = true;
        this.fromCompleteEmit = false;
      }
      var currentTimeStamp = _zPagingUtils.default.getTime();
      var disTime = currentTimeStamp - this.requestTimeStamp;
      var minDelay = this.minDelay;
      if (this.isFirstPage && this.finalShowRefresherWhenReload) {
        minDelay = Math.max(400, minDelay);
      }
      var addDataDalay = this.requestTimeStamp > 0 && disTime < minDelay ? minDelay - disTime : 0;
      this.$nextTick(function () {
        _zPagingUtils.default.delay(function () {
          _this2._addData(data, success, false);
        }, _this2.delay > 0 ? _this2.delay : addDataDalay);
      });
      return new Promise(function (resolve, reject) {
        _this2.dataPromiseResultMap.complete = {
          resolve: resolve,
          reject: reject
        };
      });
    },
    // 从顶部添加数据，不会影响分页的pageNo和pageSize
    addDataFromTop: function addDataFromTop(data) {
      var toTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var toTopWithAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // 如果使用了虚拟列表，则需要对短时间内的大量数据进行整合然后一次性添加，避免设置虚拟列表cellIndex时候key冲突的问题，否则正常调用
      (this.finalUseVirtualList ? this.addDataFromTopBufferedInsert : this._addDataFromTop)(data, toTop, toTopWithAnimate);
    },
    // 重新设置列表数据，调用此方法不会影响pageNo和pageSize，也不会触发请求。适用场景：当需要删除列表中某一项时，将删除对应项后的数组通过此方法传递给z-paging。(当出现类似的需要修改列表数组的场景时，请使用此方法，请勿直接修改page中:list.sync绑定的数组)
    resetTotalData: function resetTotalData(data) {
      this.isTotalChangeFromAddData = true;
      data = Object.prototype.toString.call(data) !== '[object Array]' ? [data] : data;
      this.totalData = data;
    },
    // 设置本地分页数据，请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging作分页处理（若调用了此方法，则上拉加载更多时内部会自动分页，不会触发@query所绑定的事件）
    setLocalPaging: function setLocalPaging(data) {
      var _this3 = this;
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.isLocalPaging = true;
      this.$nextTick(function () {
        _this3._addData(data, success, true);
      });
      return new Promise(function (resolve, reject) {
        _this3.dataPromiseResultMap.localPaging = {
          resolve: resolve,
          reject: reject
        };
      });
    },
    // 重新加载分页数据，pageNo会恢复为默认值，相当于下拉刷新的效果(animate为true时会展示下拉刷新动画，默认为false)
    reload: function reload() {
      var _this4 = this;
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.showRefresherWhenReload;
      if (animate) {
        this.privateShowRefresherWhenReload = animate;
        this.isUserPullDown = true;
      }
      if (!this.showLoadingMoreWhenReload) {
        this.listRendering = true;
      }
      this.$nextTick(function () {
        _this4._preReload(animate, false);
      });
      return new Promise(function (resolve, reject) {
        _this4.dataPromiseResultMap.reload = {
          resolve: resolve,
          reject: reject
        };
      });
    },
    // 刷新列表数据，pageNo和pageSize不会重置，列表数据会重新从服务端获取。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
    refresh: function refresh() {
      return this._handleRefreshWithDisPageNo(this.pageNo - this.defaultPageNo + 1);
    },
    // 刷新列表数据至指定页，例如pageNo=5时则代表刷新列表至第5页，此时pageNo会变为5，列表会展示前5页的数据。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
    refreshToPage: function refreshToPage(pageNo) {
      this.isHandlingRefreshToPage = true;
      return this._handleRefreshWithDisPageNo(pageNo + this.defaultPageNo - 1);
    },
    // 手动更新列表缓存数据，将自动截取v-model绑定的list中的前pageSize条覆盖缓存，请确保在list数据更新到预期结果后再调用此方法
    updateCache: function updateCache() {
      if (this.finalUseCache && this.totalData.length) {
        this._saveLocalCache(this.totalData.slice(0, Math.min(this.totalData.length, this.pageSize)));
      }
    },
    // 清空分页数据
    clean: function clean() {
      this._reload(true);
      this._addData([], true, false);
    },
    // 清空分页数据
    clear: function clear() {
      this.clean();
    },
    // reload之前的一些处理
    _preReload: function _preReload() {
      var _this5 = this;
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.showRefresherWhenReload;
      var isFromMounted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var retryCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var showRefresher = this.finalRefresherEnabled && this.useCustomRefresher;

      // 如果获取slot="refresher"高度失败，则不触发reload，直到获取slot="refresher"高度成功
      if (this.customRefresherHeight === -1 && showRefresher) {
        _zPagingUtils.default.delay(function () {
          retryCount++;
          // 如果重试次数是10的倍数(也就是每500毫秒)，尝试重新获取一下slot="refresher"高度
          // 此举是为了解决在某些特殊情况下，z-paging组件mounted了，但是未展示在用户面前，（比如在tabbar页面中，未切换到对应tabbar但是通过代码让z-paging展示了，此时控制台会报Error: Not Found：Page，因为这时候去获取dom节点信息获取不到）
          // 当用户在某个时刻让此z-paging展示在面前时，即可顺利获取到slot="refresher"高度，递归停止
          if (retryCount % 10 === 0) {
            _this5._updateCustomRefresherHeight();
          }
          _this5._preReload(animate, isFromMounted, retryCount);
        }, _zPagingConstant.default.delayTime / 2);
        return;
      }
      this.isUserReload = true;
      this.loadingType = _zPagingEnum.default.LoadingType.Refresher;
      if (animate) {
        this.privateShowRefresherWhenReload = animate;
        if (this.useCustomRefresher) {
          this._doRefresherRefreshAnimate();
        } else {
          this.refresherTriggered = true;
        }
      } else {
        this._refresherEnd(false, false, false, false);
      }
      this._reload(false, isFromMounted);
    },
    // 重新加载分页数据
    _reload: function _reload() {
      var isClean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var isFromMounted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isUserPullDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.isAddedData = false;
      this.insideOfPaging = -1;
      this.cacheScrollNodeHeight = -1;
      this.pageNo = this.defaultPageNo;
      this._cleanRefresherEndTimeout();
      !this.privateShowRefresherWhenReload && !isClean && this._startLoading(true);
      this.firstPageLoaded = true;
      this.isTotalChangeFromAddData = false;
      if (!this.isSettingCacheList) {
        this.totalData = [];
      }
      if (!isClean) {
        this._emitQuery(this.pageNo, this.defaultPageSize, isUserPullDown ? _zPagingEnum.default.QueryFrom.UserPullDown : _zPagingEnum.default.QueryFrom.Reload);
        var delay = 0;
        _zPagingUtils.default.delay(this._callMyParentQuery, delay);
        if (!isFromMounted && this.autoScrollToTopWhenReload) {
          var checkedNRefresherLoading = true;
          checkedNRefresherLoading && this._scrollToTop(false);
        }
      }
    },
    // 处理服务端返回的数组
    _addData: function _addData(data, success, isLocal) {
      var _this6 = this;
      this.isAddedData = true;
      this.fromEmptyViewReload = false;
      this.isTotalChangeFromAddData = true;
      this.refresherTriggered = false;
      this._endSystemLoadingAndRefresh();
      var tempIsUserPullDown = this.isUserPullDown;
      if (this.showRefresherUpdateTime && this.isFirstPage) {
        _zPagingUtils.default.setRefesrherTime(_zPagingUtils.default.getTime(), this.refresherUpdateTimeKey);
        this.$refs.refresh && this.$refs.refresh.updateTime();
      }
      if (!isLocal && tempIsUserPullDown && this.isFirstPage) {
        this.isUserPullDown = false;
      }
      this.listRendering = true;
      this.$nextTick(function () {
        _zPagingUtils.default.delay(function () {
          return _this6.listRendering = false;
        });
      });
      var dataTypeRes = this._checkDataType(data, success, isLocal);
      data = dataTypeRes.data;
      success = dataTypeRes.success;
      var delayTime = _zPagingConstant.default.delayTime;
      if (this.useChatRecordMode) delayTime = 0;
      this.loadingForNow = false;
      _zPagingUtils.default.delay(function () {
        _this6.pagingLoaded = true;
        _this6.$nextTick(function () {
          !isLocal && _this6._refresherEnd(delayTime > 0, true, tempIsUserPullDown);
        });
      });
      if (this.isFirstPage) {
        this.isLoadFailed = !success;
        this.$emit('isLoadFailedChange', this.isLoadFailed);
        if (this.finalUseCache && success && (this.cacheMode === _zPagingEnum.default.CacheMode.Always ? true : this.isSettingCacheList)) {
          this._saveLocalCache(data);
        }
      }
      this.isSettingCacheList = false;
      if (success) {
        if (!(this.privateConcat === false && !this.isHandlingRefreshToPage && this.loadingStatus === _zPagingEnum.default.More.NoMore)) {
          this.loadingStatus = _zPagingEnum.default.More.Default;
        }
        if (isLocal) {
          // 如果当前是本地分页，则必然是由setLocalPaging方法触发，此时直接本地加载第一页数据即可。后续本地分页加载更多方法由滚动到底部加载更多事件处理
          this.totalLocalPagingList = data;
          var localPageNo = this.defaultPageNo;
          var localPageSize = this.queryFrom !== _zPagingEnum.default.QueryFrom.Refresh ? this.defaultPageSize : this.currentRefreshPageSize;
          this._localPagingQueryList(localPageNo, localPageSize, 0, function (res) {
            _zPagingUtils.default.delay(function () {
              _this6.completeByTotal(res, _this6.totalLocalPagingList.length);
              ;
            }, 0);
          });
        } else {
          // 如果当前不是本地分页，则按照正常分页逻辑进行数据处理&emit数据
          var dataChangeDelayTime = 0;
          _zPagingUtils.default.delay(function () {
            _this6._currentDataChange(data, _this6.currentData);
            _this6._callDataPromise(true, _this6.totalData);
          }, dataChangeDelayTime);
        }
        if (this.isHandlingRefreshToPage) {
          this.isHandlingRefreshToPage = false;
          this.pageNo = this.defaultPageNo + Math.ceil(data.length / this.pageSize) - 1;
          if (data.length % this.pageSize !== 0) {
            this.customNoMore = 1;
          }
        }
      } else {
        this._currentDataChange(data, this.currentData);
        this._callDataPromise(false);
        this.loadingStatus = _zPagingEnum.default.More.Fail;
        this.isHandlingRefreshToPage = false;
        if (this.loadingType === _zPagingEnum.default.LoadingType.LoadMore) {
          this.pageNo--;
        }
      }
    },
    // 所有数据改变时调用
    _totalDataChange: function _totalDataChange(newVal, oldVal) {
      var _this7 = this;
      var eventThrow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if ((!this.isUserReload || !this.autoCleanListWhenReload) && this.firstPageLoaded && !newVal.length && oldVal.length) {
        return;
      }
      this._doCheckScrollViewShouldFullHeight(newVal);
      if (!this.realTotalData.length && !newVal.length) {
        eventThrow = false;
      }
      this.realTotalData = newVal;
      // emit列表更新事件
      if (eventThrow) {
        this.$emit('input', newVal);
        this.$emit('update:list', newVal);
        this.$emit('listChange', newVal);
        this._callMyParentList(newVal);
      }
      this.firstPageLoaded = false;
      this.isTotalChangeFromAddData = false;
      this.$nextTick(function () {
        _zPagingUtils.default.delay(function () {
          // emit z-paging内容区域高度改变事件
          _this7._getNodeClientRect('.zp-paging-container-content').then(function (res) {
            res && _this7.$emit('contentHeightChanged', res[0].height);
          });
        }, _zPagingConstant.default.delayTime * (_this7.isIos ? 1 : 3));
      });
    },
    // 当前数据改变时调用
    _currentDataChange: function _currentDataChange(newVal, oldVal) {
      var _this8 = this;
      newVal = (0, _toConsumableArray2.default)(newVal);
      this.finalUseVirtualList && this._setCellIndex(newVal, 'bottom');
      if (this.isFirstPage && this.finalConcat) {
        this.totalData = [];
      }
      // customNoMore：-1代表交由z-paging自行判断；1代表没有更多了；0代表还有更多数据
      if (this.customNoMore !== -1) {
        // 如果customNoMore等于1 或者 customNoMore不是0并且新增数组长度为0(也就是不是明确的还有更多数据并且新增的数组长度为0)，则没有更多数据了
        if (this.customNoMore === 1 || this.customNoMore !== 0 && !newVal.length) {
          this.loadingStatus = _zPagingEnum.default.More.NoMore;
        }
      } else {
        // 如果新增的数据数组长度为0 或者 新增的数组长度小于默认的pageSize，则没有更多数据了
        if (!newVal.length || newVal.length && newVal.length < this.defaultPageSize) {
          this.loadingStatus = _zPagingEnum.default.More.NoMore;
        }
      }
      if (!this.totalData.length) {
        this.totalData = newVal;
      } else {
        if (this.finalConcat) {
          var currentScrollTop = this.oldScrollTop;
          this.totalData = [].concat((0, _toConsumableArray2.default)(this.totalData), (0, _toConsumableArray2.default)(newVal));
          // 此处是为了解决在微信小程序中，在某些情况下滚动到底部加载更多后滚动位置直接变为最底部的问题，因此需要通过代码强制滚动回加载更多前的位置

          if (!this.isIos && !this.isOnly && !this.usePageScroll && newVal.length) {
            this.loadingMoreTimeStamp = _zPagingUtils.default.getTime();
            this.$nextTick(function () {
              _this8.scrollToY(currentScrollTop);
            });
          }
        } else {
          this.totalData = newVal;
        }
      }
      this.privateConcat = true;
    },
    // 根据pageNo处理refresh操作
    _handleRefreshWithDisPageNo: function _handleRefreshWithDisPageNo(pageNo) {
      var _this9 = this;
      if (!this.isHandlingRefreshToPage && !this.realTotalData.length) return this.reload();
      if (pageNo >= 1) {
        this.loading = true;
        this.privateConcat = false;
        var totalPageSize = pageNo * this.pageSize;
        this.currentRefreshPageSize = totalPageSize;
        // 如果调用refresh时是本地分页，则在组件内部自己处理分页逻辑，不emit query相关事件
        if (this.isLocalPaging && this.isHandlingRefreshToPage) {
          this._localPagingQueryList(this.defaultPageNo, totalPageSize, 0, function (res) {
            _this9.complete(res);
          });
        } else {
          // emit query相关事件
          this._emitQuery(this.defaultPageNo, totalPageSize, _zPagingEnum.default.QueryFrom.Refresh);
          this._callMyParentQuery(this.defaultPageNo, totalPageSize);
        }
      }
      return new Promise(function (resolve, reject) {
        _this9.dataPromiseResultMap.reload = {
          resolve: resolve,
          reject: reject
        };
      });
    },
    // 本地分页请求
    _localPagingQueryList: function _localPagingQueryList(pageNo, pageSize, localPagingLoadingTime, callback) {
      pageNo = Math.max(1, pageNo);
      pageSize = Math.max(1, pageSize);
      var totalPagingList = (0, _toConsumableArray2.default)(this.totalLocalPagingList);
      var pageNoIndex = (pageNo - 1) * pageSize;
      var finalPageNoIndex = Math.min(totalPagingList.length, pageNoIndex + pageSize);
      var resultPagingList = totalPagingList.splice(pageNoIndex, finalPageNoIndex - pageNoIndex);
      _zPagingUtils.default.delay(function () {
        return callback(resultPagingList);
      }, localPagingLoadingTime);
    },
    // 从顶部添加数据，不会影响分页的pageNo和pageSize
    _addDataFromTop: function _addDataFromTop(data) {
      var _this10 = this;
      var toTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var toTopWithAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // 数据是否拼接到顶部，如果是聊天记录模式并且列表没有倒置，则应该拼接在底部
      var addFromTop = !this.isChatRecordModeAndNotInversion;
      data = Object.prototype.toString.call(data) !== '[object Array]' ? [data] : addFromTop ? data.reverse() : data;
      this.finalUseVirtualList && this._setCellIndex(data, 'top');
      this.totalData = addFromTop ? [].concat((0, _toConsumableArray2.default)(data), (0, _toConsumableArray2.default)(this.totalData)) : [].concat((0, _toConsumableArray2.default)(this.totalData), (0, _toConsumableArray2.default)(data));
      if (toTop) {
        _zPagingUtils.default.delay(function () {
          return _this10.useChatRecordMode ? _this10.scrollToBottom(toTopWithAnimate) : _this10.scrollToTop(toTopWithAnimate);
        });
      }
    },
    // 存储列表缓存数据
    _saveLocalCache: function _saveLocalCache(data) {
      uni.setStorageSync(this.finalCacheKey, data);
    },
    // 通过缓存数据填充列表数据
    _setListByLocalCache: function _setListByLocalCache() {
      this.totalData = uni.getStorageSync(this.finalCacheKey) || [];
      this.isSettingCacheList = true;
    },
    // 修改父view的list
    _callMyParentList: function _callMyParentList(newVal) {
      if (this.autowireListName.length) {
        var myParent = _zPagingUtils.default.getParent(this.$parent);
        if (myParent && myParent[this.autowireListName]) {
          myParent[this.autowireListName] = newVal;
        }
      }
    },
    // 调用父view的query
    _callMyParentQuery: function _callMyParentQuery() {
      var customPageNo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var customPageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.autowireQueryName) {
        if (this.myParentQuery === -1) {
          var myParent = _zPagingUtils.default.getParent(this.$parent);
          if (myParent && myParent[this.autowireQueryName]) {
            this.myParentQuery = myParent[this.autowireQueryName];
          }
        }
        if (this.myParentQuery !== -1) {
          customPageSize > 0 ? this.myParentQuery(customPageNo, customPageSize) : this.myParentQuery(this.pageNo, this.defaultPageSize);
        }
      }
    },
    // emit query事件
    _emitQuery: function _emitQuery(pageNo, pageSize, from) {
      var _this11 = this;
      this.queryFrom = from;
      this.requestTimeStamp = _zPagingUtils.default.getTime();
      var _this$realTotalData$s = this.realTotalData.slice(-1),
        _this$realTotalData$s2 = (0, _slicedToArray2.default)(_this$realTotalData$s, 1),
        lastItem = _this$realTotalData$s2[0];
      if (this.fetch) {
        var fetchParams = _zPagingInterceptor.default._handleFetchParams({
          pageNo: pageNo,
          pageSize: pageSize,
          from: from,
          lastItem: lastItem || null
        }, this.fetchParams);
        var fetchResult = this.fetch(fetchParams);
        if (!_zPagingInterceptor.default._handleFetchResult(fetchResult, this, fetchParams)) {
          _zPagingUtils.default.isPromise(fetchResult) ? fetchResult.then(function (res) {
            _this11.complete(res);
          }).catch(function (err) {
            _this11.complete(false);
          }) : this.complete(fetchResult);
        }
      } else {
        this.$emit.apply(this, ['query'].concat((0, _toConsumableArray2.default)(_zPagingInterceptor.default._handleQuery(pageNo, pageSize, from, lastItem || null))));
      }
    },
    // 触发数据改变promise
    _callDataPromise: function _callDataPromise(success, totalList) {
      for (var key in this.dataPromiseResultMap) {
        var obj = this.dataPromiseResultMap[key];
        if (!obj) continue;
        success ? obj.resolve({
          totalList: totalList,
          noMore: this.loadingStatus === _zPagingEnum.default.More.NoMore
        }) : this.callNetworkReject && obj.reject("z-paging-".concat(key, "-error"));
      }
    },
    // 检查complete data的类型
    _checkDataType: function _checkDataType(data, success, isLocal) {
      var dataType = Object.prototype.toString.call(data);
      if (dataType === '[object Boolean]') {
        success = data;
        data = [];
      } else if (dataType !== '[object Array]') {
        data = [];
        if (dataType !== '[object Undefined]' && dataType !== '[object Null]') {
          _zPagingUtils.default.consoleErr("".concat(isLocal ? 'setLocalPaging' : 'complete', "\u53C2\u6570\u7C7B\u578B\u4E0D\u6B63\u786E\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u7C7B\u578B\u5FC5\u987B\u4E3AArray!"));
        }
      }
      return {
        data: data,
        success: success
      };
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 261 */
/*!**********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-enum.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// [z-paging]枚举
var _default = {
  // 当前加载类型 refresher:下拉刷新 load-more:上拉加载更多
  LoadingType: {
    Refresher: 'refresher',
    LoadMore: 'load-more'
  },
  // 下拉刷新状态 default:默认状态 release-to-refresh:松手立即刷新 loading:刷新中 complete:刷新结束 go-f2:松手进入二楼
  Refresher: {
    Default: 'default',
    ReleaseToRefresh: 'release-to-refresh',
    Loading: 'loading',
    Complete: 'complete',
    GoF2: 'go-f2'
  },
  // 底部加载更多状态 default:默认状态 loading:加载中 no-more:没有更多数据 fail:加载失败
  More: {
    Default: 'default',
    Loading: 'loading',
    NoMore: 'no-more',
    Fail: 'fail'
  },
  // @query触发来源 user-pull-down:用户主动下拉刷新 reload:通过reload触发 refresh:通过refresh触发 load-more:通过滚动到底部加载更多或点击底部加载更多触发
  QueryFrom: {
    UserPullDown: 'user-pull-down',
    Reload: 'reload',
    Refresh: 'refresh',
    LoadMore: 'load-more'
  },
  // 虚拟列表cell高度模式
  CellHeightMode: {
    // 固定高度
    Fixed: 'fixed',
    // 动态高度
    Dynamic: 'dynamic'
  },
  // 列表缓存模式
  CacheMode: {
    // 默认模式，只会缓存一次
    Default: 'default',
    // 总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
    Always: 'always'
  }
};
exports.default = _default;

/***/ }),
/* 262 */
/*!*****************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/z-paging-interceptor.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// [z-paging]拦截器

var queryKey = 'Query';
var fetchParamsKey = 'FetchParams';
var fetchResultKey = 'FetchResult';
var language2LocalKey = 'Language2Local';

// 拦截&处理@query事件
function handleQuery(callback) {
  _addHandleByKey(queryKey, callback);
  return this;
}

// 拦截&处理@query事件(私有，请勿调用)
function _handleQuery(pageNo, pageSize, from, lastItem) {
  var callback = _getHandleByKey(queryKey);
  return callback ? callback(pageNo, pageSize, from, lastItem) : [pageNo, pageSize, from];
}

// 拦截&处理:fetch参数
function handleFetchParams(callback) {
  _addHandleByKey(fetchParamsKey, callback);
  return this;
}

// 拦截&处理:fetch参数(私有，请勿调用)
function _handleFetchParams(parmas, extraParams) {
  var callback = _getHandleByKey(fetchParamsKey);
  return callback ? callback(parmas, extraParams || {}) : _objectSpread({
    pageNo: parmas.pageNo,
    pageSize: parmas.pageSize
  }, extraParams || {});
}

// 拦截&处理:fetch结果
function handleFetchResult(callback) {
  _addHandleByKey(fetchResultKey, callback);
  return this;
}

// 拦截&处理:fetch结果(私有，请勿调用)
function _handleFetchResult(result, paging, params) {
  var callback = _getHandleByKey(fetchResultKey);
  callback && callback(result, paging, params);
  return callback ? true : false;
}

// 拦截&处理系统language转i18n local
function handleLanguage2Local(callback) {
  _addHandleByKey(language2LocalKey, callback);
  return this;
}

// 拦截&处理系统language转i18n local(私有，请勿调用)
function _handleLanguage2Local(language, local) {
  var callback = _getHandleByKey(language2LocalKey);
  return callback ? callback(language, local) : local;
}

// 获取当前app对象
function _getApp() {
  return getApp();
}

// 是否可以访问globalData
function _hasGlobalData() {
  return _getApp() && _getApp().globalData;
}

// 添加处理函数
function _addHandleByKey(key, callback) {
  try {
    setTimeout(function () {
      if (_hasGlobalData()) {
        _getApp().globalData["zp_handle".concat(key, "Callback")] = callback;
      }
    }, 1);
  } catch (_) {}
}

// 获取处理回调函数
function _getHandleByKey(key) {
  return _hasGlobalData() ? _getApp().globalData["zp_handle".concat(key, "Callback")] : null;
}
var _default = {
  handleQuery: handleQuery,
  _handleQuery: _handleQuery,
  handleFetchParams: handleFetchParams,
  _handleFetchParams: _handleFetchParams,
  handleFetchResult: handleFetchResult,
  _handleFetchResult: _handleFetchResult,
  handleLanguage2Local: handleLanguage2Local,
  _handleLanguage2Local: _handleLanguage2Local
};
exports.default = _default;

/***/ }),
/* 263 */
/*!*********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/i18n.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _index = _interopRequireDefault(__webpack_require__(/*! ../../i18n/index.js */ 264));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! .././z-paging-constant */ 256));
var _zPagingInterceptor = _interopRequireDefault(__webpack_require__(/*! ../z-paging-interceptor */ 262));
// [z-paging]i18n模块

var _initVueI18n = (0, _uniI18n.initVueI18n)(_index.default),
  t = _initVueI18n.t;
var _default = {
  computed: {
    finalLanguage: function finalLanguage() {
      try {
        var local = uni.getLocale();
        var language = this.systemInfo.appLanguage;
        return local === 'auto' ? _zPagingInterceptor.default._handleLanguage2Local(language, this._language2Local(language)) : local;
      } catch (e) {
        // 如果获取系统本地语言异常，则默认返回中文，uni.getLocale在部分低版本HX或者cli中可能报找不到的问题
        return 'zh-Hans';
      }
    },
    // 最终的下拉刷新默认状态的文字
    finalRefresherDefaultText: function finalRefresherDefaultText() {
      return this._getI18nText('zp.refresher.default', this.refresherDefaultText);
    },
    // 最终的下拉刷新下拉中的文字
    finalRefresherPullingText: function finalRefresherPullingText() {
      return this._getI18nText('zp.refresher.pulling', this.refresherPullingText);
    },
    // 最终的下拉刷新中文字
    finalRefresherRefreshingText: function finalRefresherRefreshingText() {
      return this._getI18nText('zp.refresher.refreshing', this.refresherRefreshingText);
    },
    // 最终的下拉刷新完成文字
    finalRefresherCompleteText: function finalRefresherCompleteText() {
      return this._getI18nText('zp.refresher.complete', this.refresherCompleteText);
    },
    // 最终的下拉刷新上次更新时间文字
    finalRefresherUpdateTimeTextMap: function finalRefresherUpdateTimeTextMap() {
      return {
        title: t('zp.refresherUpdateTime.title'),
        none: t('zp.refresherUpdateTime.none'),
        today: t('zp.refresherUpdateTime.today'),
        yesterday: t('zp.refresherUpdateTime.yesterday')
      };
    },
    // 最终的继续下拉进入二楼文字
    finalRefresherGoF2Text: function finalRefresherGoF2Text() {
      return this._getI18nText('zp.refresher.f2', this.refresherGoF2Text);
    },
    // 最终的底部加载更多默认状态文字
    finalLoadingMoreDefaultText: function finalLoadingMoreDefaultText() {
      return this._getI18nText('zp.loadingMore.default', this.loadingMoreDefaultText);
    },
    // 最终的底部加载更多加载中文字
    finalLoadingMoreLoadingText: function finalLoadingMoreLoadingText() {
      return this._getI18nText('zp.loadingMore.loading', this.loadingMoreLoadingText);
    },
    // 最终的底部加载更多没有更多数据文字
    finalLoadingMoreNoMoreText: function finalLoadingMoreNoMoreText() {
      return this._getI18nText('zp.loadingMore.noMore', this.loadingMoreNoMoreText);
    },
    // 最终的底部加载更多加载失败文字
    finalLoadingMoreFailText: function finalLoadingMoreFailText() {
      return this._getI18nText('zp.loadingMore.fail', this.loadingMoreFailText);
    },
    // 最终的空数据图title
    finalEmptyViewText: function finalEmptyViewText() {
      return this.isLoadFailed ? this.finalEmptyViewErrorText : this._getI18nText('zp.emptyView.title', this.emptyViewText);
    },
    // 最终的空数据图reload title
    finalEmptyViewReloadText: function finalEmptyViewReloadText() {
      return this._getI18nText('zp.emptyView.reload', this.emptyViewReloadText);
    },
    // 最终的空数据图加载失败文字
    finalEmptyViewErrorText: function finalEmptyViewErrorText() {
      return this.customerEmptyViewErrorText || this._getI18nText('zp.emptyView.error', this.emptyViewErrorText);
    },
    // 最终的系统loading title
    finalSystemLoadingText: function finalSystemLoadingText() {
      return this._getI18nText('zp.systemLoading.title', this.systemLoadingText);
    }
  },
  methods: {
    // 获取当前z-paging的语言
    getLanguage: function getLanguage() {
      return this.finalLanguage;
    },
    // 获取国际化转换后的文本
    _getI18nText: function _getI18nText(key, value) {
      var dataType = Object.prototype.toString.call(value);
      if (dataType === '[object Object]') {
        var nextValue = value[this.finalLanguage];
        if (nextValue) return nextValue;
      } else if (dataType === '[object String]') {
        return value;
      }
      return t(key);
    },
    // 系统language转i18n local
    _language2Local: function _language2Local(language) {
      var formatedLanguage = language.toLowerCase().replace(new RegExp('_', ''), '-');
      if (formatedLanguage.indexOf('zh') !== -1) {
        if (formatedLanguage === 'zh' || formatedLanguage === 'zh-cn' || formatedLanguage.indexOf('zh-hans') !== -1) {
          return 'zh-Hans';
        }
        return 'zh-Hant';
      }
      if (formatedLanguage.indexOf('en') !== -1) return 'en';
      return language;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 264 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/i18n/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 265));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 266));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 267));
var _default = {
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default
};
exports.default = _default;

/***/ }),
/* 265 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/i18n/en.json ***!
  \***************************************************************************************/
/*! exports provided: zp.refresher.default, zp.refresher.pulling, zp.refresher.refreshing, zp.refresher.complete, zp.refresher.f2, zp.loadingMore.default, zp.loadingMore.loading, zp.loadingMore.noMore, zp.loadingMore.fail, zp.emptyView.title, zp.emptyView.reload, zp.emptyView.error, zp.refresherUpdateTime.title, zp.refresherUpdateTime.none, zp.refresherUpdateTime.today, zp.refresherUpdateTime.yesterday, zp.systemLoading.title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"zp.refresher.default\":\"Pull down to refresh\",\"zp.refresher.pulling\":\"Release to refresh\",\"zp.refresher.refreshing\":\"Refreshing...\",\"zp.refresher.complete\":\"Refresh succeeded\",\"zp.refresher.f2\":\"Refresh to enter 2f\",\"zp.loadingMore.default\":\"Click to load more\",\"zp.loadingMore.loading\":\"Loading...\",\"zp.loadingMore.noMore\":\"No more data\",\"zp.loadingMore.fail\":\"Load failed,click to reload\",\"zp.emptyView.title\":\"No data\",\"zp.emptyView.reload\":\"Reload\",\"zp.emptyView.error\":\"Sorry,load failed\",\"zp.refresherUpdateTime.title\":\"Last update: \",\"zp.refresherUpdateTime.none\":\"None\",\"zp.refresherUpdateTime.today\":\"Today\",\"zp.refresherUpdateTime.yesterday\":\"Yesterday\",\"zp.systemLoading.title\":\"Loading...\"}");

/***/ }),
/* 266 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/i18n/zh-Hans.json ***!
  \********************************************************************************************/
/*! exports provided: zp.refresher.default, zp.refresher.pulling, zp.refresher.refreshing, zp.refresher.complete, zp.refresher.f2, zp.loadingMore.default, zp.loadingMore.loading, zp.loadingMore.noMore, zp.loadingMore.fail, zp.emptyView.title, zp.emptyView.reload, zp.emptyView.error, zp.refresherUpdateTime.title, zp.refresherUpdateTime.none, zp.refresherUpdateTime.today, zp.refresherUpdateTime.yesterday, zp.systemLoading.title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"zp.refresher.default\":\"继续下拉刷新\",\"zp.refresher.pulling\":\"松开立即刷新\",\"zp.refresher.refreshing\":\"正在刷新...\",\"zp.refresher.complete\":\"刷新成功\",\"zp.refresher.f2\":\"松手进入二楼\",\"zp.loadingMore.default\":\"点击加载更多\",\"zp.loadingMore.loading\":\"正在加载...\",\"zp.loadingMore.noMore\":\"没有更多了\",\"zp.loadingMore.fail\":\"加载失败，点击重新加载\",\"zp.emptyView.title\":\"没有数据哦~\",\"zp.emptyView.reload\":\"重新加载\",\"zp.emptyView.error\":\"很抱歉，加载失败\",\"zp.refresherUpdateTime.title\":\"最后更新：\",\"zp.refresherUpdateTime.none\":\"无\",\"zp.refresherUpdateTime.today\":\"今天\",\"zp.refresherUpdateTime.yesterday\":\"昨天\",\"zp.systemLoading.title\":\"加载中...\"}");

/***/ }),
/* 267 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/i18n/zh-Hant.json ***!
  \********************************************************************************************/
/*! exports provided: zp.refresher.default, zp.refresher.pulling, zp.refresher.refreshing, zp.refresher.complete, zp.refresher.f2, zp.loadingMore.default, zp.loadingMore.loading, zp.loadingMore.noMore, zp.loadingMore.fail, zp.emptyView.title, zp.emptyView.reload, zp.emptyView.error, zp.refresherUpdateTime.title, zp.refresherUpdateTime.none, zp.refresherUpdateTime.today, zp.refresherUpdateTime.yesterday, zp.systemLoading.title, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"zp.refresher.default\":\"繼續下拉重繪\",\"zp.refresher.pulling\":\"鬆開立即重繪\",\"zp.refresher.refreshing\":\"正在重繪...\",\"zp.refresher.complete\":\"重繪成功\",\"zp.refresher.f2\":\"鬆手進入二樓\",\"zp.loadingMore.default\":\"點擊加載更多\",\"zp.loadingMore.loading\":\"正在加載...\",\"zp.loadingMore.noMore\":\"沒有更多了\",\"zp.loadingMore.fail\":\"加載失敗，點擊重新加載\",\"zp.emptyView.title\":\"沒有數據哦~\",\"zp.emptyView.reload\":\"重新加載\",\"zp.emptyView.error\":\"很抱歉，加載失敗\",\"zp.refresherUpdateTime.title\":\"最後更新：\",\"zp.refresherUpdateTime.none\":\"無\",\"zp.refresherUpdateTime.today\":\"今天\",\"zp.refresherUpdateTime.yesterday\":\"昨天\",\"zp.systemLoading.title\":\"加載中...\"}");

/***/ }),
/* 268 */
/*!*********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/nvue.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! .././z-paging-constant */ 256));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]nvue独有部分模块
var _default = {
  props: {},
  data: function data() {
    return {
      nRefresherLoading: false,
      nListIsDragging: false,
      nShowBottom: true,
      nFixFreezing: false,
      nShowRefresherReveal: false,
      nLoadingMoreFixedHeight: false,
      nShowRefresherRevealHeight: 0,
      nOldShowRefresherRevealHeight: -1,
      nRefresherWidth: _zPagingUtils.default.rpx2px(750),
      nListHeight: 0,
      nF2Opacity: 0
    };
  },
  computed: {},
  mounted: function mounted() {},
  methods: {}
};
exports.default = _default;

/***/ }),
/* 269 */
/*!**********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/empty.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
// [z-paging]空数据图view模块
var _default = {
  props: {
    // 是否强制隐藏空数据图，默认为否
    hideEmptyView: {
      type: Boolean,
      default: _zPagingUtils.default.gc('hideEmptyView', false)
    },
    // 空数据图描述文字，默认为“没有数据哦~”
    emptyViewText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('emptyViewText', null)
    },
    // 是否显示空数据图重新加载按钮(无数据时)，默认为否
    showEmptyViewReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showEmptyViewReload', false)
    },
    // 加载失败时是否显示空数据图重新加载按钮，默认为是
    showEmptyViewReloadWhenError: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showEmptyViewReloadWhenError', true)
    },
    // 空数据图点击重新加载文字，默认为“重新加载”
    emptyViewReloadText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('emptyViewReloadText', null)
    },
    // 空数据图图片，默认使用z-paging内置的图片
    emptyViewImg: {
      type: String,
      default: _zPagingUtils.default.gc('emptyViewImg', '')
    },
    // 空数据图“加载失败”描述文字，默认为“很抱歉，加载失败”
    emptyViewErrorText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('emptyViewErrorText', null)
    },
    // 空数据图“加载失败”图片，默认使用z-paging内置的图片
    emptyViewErrorImg: {
      type: String,
      default: _zPagingUtils.default.gc('emptyViewErrorImg', '')
    },
    // 空数据图样式
    emptyViewStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('emptyViewStyle', {})
    },
    // 空数据图容器样式
    emptyViewSuperStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('emptyViewSuperStyle', {})
    },
    // 空数据图img样式
    emptyViewImgStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('emptyViewImgStyle', {})
    },
    // 空数据图描述文字样式
    emptyViewTitleStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('emptyViewTitleStyle', {})
    },
    // 空数据图重新加载按钮样式
    emptyViewReloadStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('emptyViewReloadStyle', {})
    },
    // 空数据图片是否铺满z-paging，默认为否，即填充满z-paging内列表(滚动区域)部分。若设置为否，则为填铺满整个z-paging
    emptyViewFixed: {
      type: Boolean,
      default: _zPagingUtils.default.gc('emptyViewFixed', false)
    },
    // 空数据图片是否垂直居中，默认为是，若设置为否即为从空数据容器顶部开始显示。emptyViewFixed为false时有效
    emptyViewCenter: {
      type: Boolean,
      default: _zPagingUtils.default.gc('emptyViewCenter', true)
    },
    // 加载中时是否自动隐藏空数据图，默认为是
    autoHideEmptyViewWhenLoading: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoHideEmptyViewWhenLoading', true)
    },
    // 用户下拉列表触发下拉刷新加载中时是否自动隐藏空数据图，默认为是
    autoHideEmptyViewWhenPull: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoHideEmptyViewWhenPull', true)
    },
    // 空数据view的z-index，默认为9
    emptyViewZIndex: {
      type: Number,
      default: _zPagingUtils.default.gc('emptyViewZIndex', 9)
    }
  },
  data: function data() {
    return {
      customerEmptyViewErrorText: ''
    };
  },
  computed: {
    finalEmptyViewImg: function finalEmptyViewImg() {
      return this.isLoadFailed ? this.emptyViewErrorImg : this.emptyViewImg;
    },
    finalShowEmptyViewReload: function finalShowEmptyViewReload() {
      return this.isLoadFailed ? this.showEmptyViewReloadWhenError : this.showEmptyViewReload;
    },
    // 是否展示空数据图
    showEmpty: function showEmpty() {
      if (this.isOnly || this.hideEmptyView || this.realTotalData.length) return false;
      if (this.autoHideEmptyViewWhenLoading) {
        if (this.isAddedData && !this.firstPageLoaded && !this.loading) return true;
      } else {
        return true;
      }
      return !this.autoHideEmptyViewWhenPull && !this.isUserReload;
    }
  },
  methods: {
    // 点击了空数据view重新加载按钮
    _emptyViewReload: function _emptyViewReload() {
      var _this = this;
      var callbacked = false;
      this.$emit('emptyViewReload', function (reload) {
        if (reload === undefined || reload === true) {
          _this.fromEmptyViewReload = true;
          _this.reload().catch(function () {});
        }
        callbacked = true;
      });
      // 如果用户没有禁止默认的点击重新加载刷新列表事件，则触发列表重新刷新
      this.$nextTick(function () {
        if (!callbacked) {
          _this.fromEmptyViewReload = true;
          _this.reload().catch(function () {});
        }
      });
    },
    // 点击了空数据view
    _emptyViewClick: function _emptyViewClick() {
      this.$emit('emptyViewClick');
    }
  }
};
exports.default = _default;

/***/ }),
/* 270 */
/*!**************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/refresher.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! .././z-paging-constant */ 256));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]下拉刷新view模块
var _default = {
  props: {
    // 下拉刷新的主题样式，支持black，white，默认black
    refresherThemeStyle: {
      type: String,
      default: _zPagingUtils.default.gc('refresherThemeStyle', '')
    },
    // 自定义下拉刷新中左侧图标的样式
    refresherImgStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('refresherImgStyle', {})
    },
    // 自定义下拉刷新中右侧状态描述文字的样式
    refresherTitleStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('refresherTitleStyle', {})
    },
    // 自定义下拉刷新中右侧最后更新时间文字的样式(show-refresher-update-time为true时有效)
    refresherUpdateTimeStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('refresherUpdateTimeStyle', {})
    },
    // 在微信小程序和QQ小程序中，是否实时监听下拉刷新中进度，默认为否
    watchRefresherTouchmove: {
      type: Boolean,
      default: _zPagingUtils.default.gc('watchRefresherTouchmove', false)
    },
    // 底部加载更多的主题样式，支持black，white，默认black
    loadingMoreThemeStyle: {
      type: String,
      default: _zPagingUtils.default.gc('loadingMoreThemeStyle', '')
    },
    // 是否只使用下拉刷新，设置为true后将关闭mounted自动请求数据、关闭滚动到底部加载更多，强制隐藏空数据图。默认为否
    refresherOnly: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherOnly', false)
    },
    // 自定义下拉刷新默认状态下回弹动画时间，单位为毫秒，默认为100毫秒，nvue无效
    refresherDefaultDuration: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherDefaultDuration', 100)
    },
    // 自定义下拉刷新结束以后延迟回弹的时间，单位为毫秒，默认为0
    refresherCompleteDelay: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherCompleteDelay', 0)
    },
    // 自定义下拉刷新结束回弹动画时间，单位为毫秒，默认为300毫秒(refresherEndBounceEnabled为false时，refresherCompleteDuration为设定值的1/3)，nvue无效
    refresherCompleteDuration: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherCompleteDuration', 300)
    },
    // 自定义下拉刷新中是否允许列表滚动，默认为是
    refresherRefreshingScrollable: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherRefreshingScrollable', true)
    },
    // 自定义下拉刷新结束状态下是否允许列表滚动，默认为否
    refresherCompleteScrollable: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherCompleteScrollable', false)
    },
    // 是否使用自定义的下拉刷新，默认为是，即使用z-paging的下拉刷新。设置为false即代表使用uni scroll-view自带的下拉刷新，h5、App、微信小程序以外的平台不支持uni scroll-view自带的下拉刷新
    useCustomRefresher: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useCustomRefresher', true)
    },
    // 自定义下拉刷新下拉帧率，默认为40，过高可能会出现抖动问题
    refresherFps: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherFps', 40)
    },
    // 自定义下拉刷新允许触发的最大下拉角度，默认为40度，当下拉角度小于设定值时，自定义下拉刷新动画不会被触发
    refresherMaxAngle: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherMaxAngle', 40)
    },
    // 自定义下拉刷新的角度由未达到最大角度变到达到最大角度时，是否继续下拉刷新手势，默认为否
    refresherAngleEnableChangeContinued: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherAngleEnableChangeContinued', false)
    },
    // 自定义下拉刷新默认状态下的文字
    refresherDefaultText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('refresherDefaultText', null)
    },
    // 自定义下拉刷新松手立即刷新状态下的文字
    refresherPullingText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('refresherPullingText', null)
    },
    // 自定义下拉刷新刷新中状态下的文字
    refresherRefreshingText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('refresherRefreshingText', null)
    },
    // 自定义下拉刷新刷新结束状态下的文字
    refresherCompleteText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('refresherCompleteText', null)
    },
    // 自定义继续下拉进入二楼文字
    refresherGoF2Text: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('refresherGoF2Text', null)
    },
    // 自定义下拉刷新默认状态下的图片
    refresherDefaultImg: {
      type: String,
      default: _zPagingUtils.default.gc('refresherDefaultImg', null)
    },
    // 自定义下拉刷新松手立即刷新状态下的图片，默认与refresherDefaultImg一致
    refresherPullingImg: {
      type: String,
      default: _zPagingUtils.default.gc('refresherPullingImg', null)
    },
    // 自定义下拉刷新刷新中状态下的图片
    refresherRefreshingImg: {
      type: String,
      default: _zPagingUtils.default.gc('refresherRefreshingImg', null)
    },
    // 自定义下拉刷新刷新结束状态下的图片
    refresherCompleteImg: {
      type: String,
      default: _zPagingUtils.default.gc('refresherCompleteImg', null)
    },
    // 自定义下拉刷新刷新中状态下是否展示旋转动画
    refresherRefreshingAnimated: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherRefreshingAnimated', true)
    },
    // 是否开启自定义下拉刷新刷新结束回弹效果，默认为是
    refresherEndBounceEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherEndBounceEnabled', true)
    },
    // 是否开启自定义下拉刷新，默认为是
    refresherEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherEnabled', true)
    },
    // 设置自定义下拉刷新阈值，默认为80rpx
    refresherThreshold: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherThreshold', '80rpx')
    },
    // 设置系统下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式，默认为black
    refresherDefaultStyle: {
      type: String,
      default: _zPagingUtils.default.gc('refresherDefaultStyle', 'black')
    },
    // 设置自定义下拉刷新区域背景
    refresherBackground: {
      type: String,
      default: _zPagingUtils.default.gc('refresherBackground', 'transparent')
    },
    // 设置固定的自定义下拉刷新区域背景
    refresherFixedBackground: {
      type: String,
      default: _zPagingUtils.default.gc('refresherFixedBackground', 'transparent')
    },
    // 设置固定的自定义下拉刷新区域高度，默认为0
    refresherFixedBacHeight: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherFixedBacHeight', 0)
    },
    // 设置自定义下拉刷新下拉超出阈值后继续下拉位移衰减的比例，范围0-1，值越大代表衰减越多。默认为0.65(nvue无效)
    refresherOutRate: {
      type: Number,
      default: _zPagingUtils.default.gc('refresherOutRate', 0.65)
    },
    // 是否开启下拉进入二楼功能，默认为否
    refresherF2Enabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherF2Enabled', false)
    },
    // 下拉进入二楼阈值，默认为200rpx
    refresherF2Threshold: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherF2Threshold', '200rpx')
    },
    // 下拉进入二楼动画时间，单位为毫秒，默认为200毫秒
    refresherF2Duration: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('refresherF2Duration', 200)
    },
    // 下拉进入二楼状态松手后是否弹出二楼，默认为是
    showRefresherF2: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showRefresherF2', true)
    },
    // 设置自定义下拉刷新下拉时实际下拉位移与用户下拉距离的比值，默认为0.75，即代表若用户下拉10px，则实际位移为7.5px(nvue无效)
    refresherPullRate: {
      type: Number,
      default: _zPagingUtils.default.gc('refresherPullRate', 0.75)
    },
    // 是否显示最后更新时间，默认为否
    showRefresherUpdateTime: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showRefresherUpdateTime', false)
    },
    // 如果需要区别不同页面的最后更新时间，请为不同页面的z-paging的`refresher-update-time-key`设置不同的字符串
    refresherUpdateTimeKey: {
      type: String,
      default: _zPagingUtils.default.gc('refresherUpdateTimeKey', 'default')
    },
    // 下拉刷新时下拉到“松手立即刷新”或“松手进入二楼”状态时是否使手机短振动，默认为否（h5无效）
    refresherVibrate: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherVibrate', false)
    },
    // 下拉刷新时是否禁止下拉刷新view跟随用户触摸竖直移动，默认为否。注意此属性只是禁止下拉刷新view移动，其他下拉刷新逻辑依然会正常触发
    refresherNoTransform: {
      type: Boolean,
      default: _zPagingUtils.default.gc('refresherNoTransform', false)
    },
    // 是否开启下拉刷新状态栏占位，适用于隐藏导航栏时，下拉刷新需要避开状态栏高度的情况，默认为否
    useRefresherStatusBarPlaceholder: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useRefresherStatusBarPlaceholder', false)
    }
  },
  data: function data() {
    return {
      R: _zPagingEnum.default.Refresher,
      //下拉刷新状态
      refresherStatus: _zPagingEnum.default.Refresher.Default,
      refresherTouchstartY: 0,
      lastRefresherTouchmove: null,
      refresherReachMaxAngle: true,
      refresherTransform: 'translateY(0px)',
      refresherTransition: '',
      finalRefresherDefaultStyle: 'black',
      refresherRevealStackCount: 0,
      refresherCompleteTimeout: null,
      refresherCompleteSubTimeout: null,
      refresherEndTimeout: null,
      isTouchmovingTimeout: null,
      refresherTriggered: false,
      isTouchmoving: false,
      isTouchEnded: false,
      isUserPullDown: false,
      privateRefresherEnabled: -1,
      privateShowRefresherWhenReload: false,
      customRefresherHeight: -1,
      showCustomRefresher: false,
      doRefreshAnimateAfter: false,
      isRefresherInComplete: false,
      showF2: false,
      f2Transform: '',
      pullDownTimeStamp: 0,
      moveDis: 0,
      oldMoveDis: 0,
      currentDis: 0,
      oldCurrentMoveDis: 0,
      oldRefresherTouchmoveY: 0,
      oldTouchDirection: '',
      oldEmitedTouchDirection: '',
      oldPullingDistance: -1,
      refresherThresholdUpdateTag: 0
    };
  },
  watch: {
    refresherDefaultStyle: {
      handler: function handler(newVal) {
        if (newVal.length) {
          this.finalRefresherDefaultStyle = newVal;
        }
      },
      immediate: true
    },
    refresherStatus: function refresherStatus(newVal) {
      newVal === _zPagingEnum.default.Refresher.Loading && this._cleanRefresherEndTimeout();
      this.refresherVibrate && (newVal === _zPagingEnum.default.Refresher.ReleaseToRefresh || newVal === _zPagingEnum.default.Refresher.GoF2) && this._doVibrateShort();
      this.$emit('refresherStatusChange', newVal);
      this.$emit('update:refresherStatus', newVal);
    },
    // 监听当前下拉刷新启用/禁用状态
    refresherEnabled: function refresherEnabled(newVal) {
      // 当禁用下拉刷新时，强制收回正在展示的下拉刷新view
      !newVal && this.endRefresh();
    }
  },
  computed: {
    pullDownDisTimeStamp: function pullDownDisTimeStamp() {
      return 1000 / this.refresherFps;
    },
    refresherThresholdUnitConverted: function refresherThresholdUnitConverted() {
      return _zPagingUtils.default.addUnit(this.refresherThreshold, this.unit);
    },
    finalRefresherEnabled: function finalRefresherEnabled() {
      if (this.layoutOnly || this.useChatRecordMode) return false;
      if (this.privateRefresherEnabled === -1) return this.refresherEnabled;
      return this.privateRefresherEnabled === 1;
    },
    finalRefresherThreshold: function finalRefresherThreshold() {
      var refresherThreshold = this.refresherThresholdUnitConverted;
      var idDefault = false;
      if (refresherThreshold === _zPagingUtils.default.addUnit(80, this.unit)) {
        idDefault = true;
        if (this.showRefresherUpdateTime) {
          refresherThreshold = _zPagingUtils.default.addUnit(120, this.unit);
        }
      }
      if (idDefault && this.customRefresherHeight > 0) return this.customRefresherHeight + this.finalRefresherThresholdPlaceholder;
      return _zPagingUtils.default.convertToPx(refresherThreshold) + this.finalRefresherThresholdPlaceholder;
    },
    finalRefresherF2Threshold: function finalRefresherF2Threshold() {
      return _zPagingUtils.default.convertToPx(_zPagingUtils.default.addUnit(this.refresherF2Threshold, this.unit));
    },
    finalRefresherThresholdPlaceholder: function finalRefresherThresholdPlaceholder() {
      return this.useRefresherStatusBarPlaceholder ? this.statusBarHeight : 0;
    },
    finalRefresherFixedBacHeight: function finalRefresherFixedBacHeight() {
      return _zPagingUtils.default.convertToPx(this.refresherFixedBacHeight);
    },
    finalRefresherThemeStyle: function finalRefresherThemeStyle() {
      return this.refresherThemeStyle.length ? this.refresherThemeStyle : this.defaultThemeStyle;
    },
    finalRefresherOutRate: function finalRefresherOutRate() {
      var rate = this.refresherOutRate;
      rate = Math.max(0, rate);
      rate = Math.min(1, rate);
      return rate;
    },
    finalRefresherPullRate: function finalRefresherPullRate() {
      var rate = this.refresherPullRate;
      rate = Math.max(0, rate);
      return rate;
    },
    finalRefresherTransform: function finalRefresherTransform() {
      if (this.refresherNoTransform || this.refresherTransform === 'translateY(0px)') return 'none';
      return this.refresherTransform;
    },
    finalShowRefresherWhenReload: function finalShowRefresherWhenReload() {
      return this.showRefresherWhenReload || this.privateShowRefresherWhenReload;
    },
    finalRefresherTriggered: function finalRefresherTriggered() {
      if (!(this.finalRefresherEnabled && !this.useCustomRefresher)) return false;
      return this.refresherTriggered;
    },
    showRefresher: function showRefresher() {
      var showRefresher = this.finalRefresherEnabled || this.useCustomRefresher && !this.useChatRecordMode;
      this.active && this.customRefresherHeight === -1 && showRefresher && this.updateCustomRefresherHeight();
      return showRefresher;
    },
    hasTouchmove: function hasTouchmove() {
      return this.watchRefresherTouchmove;
      return true;
      return this.watchRefresherTouchmove;
    }
  },
  methods: {
    // 终止下拉刷新状态
    endRefresh: function endRefresh() {
      var _this = this;
      this.totalData = this.realTotalData;
      this._refresherEnd();
      this._endSystemLoadingAndRefresh();
      this._handleScrollViewBounce({
        bounce: true
      });
      this.$nextTick(function () {
        _this.refresherTriggered = false;
      });
    },
    // 手动更新自定义下拉刷新view高度
    updateCustomRefresherHeight: function updateCustomRefresherHeight() {
      var _this2 = this;
      _zPagingUtils.default.delay(function () {
        return _this2.$nextTick(_this2._updateCustomRefresherHeight);
      });
    },
    // 进入二楼
    goF2: function goF2() {
      this._handleGoF2();
    },
    // 关闭二楼
    closeF2: function closeF2() {
      this._handleCloseF2();
    },
    // 自定义下拉刷新被触发
    _onRefresh: function _onRefresh() {
      var fromScrollView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var isUserPullDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (fromScrollView && !(this.finalRefresherEnabled && !this.useCustomRefresher)) return;
      this.$emit('onRefresh');
      this.$emit('Refresh');
      if (this.loading || this.isRefresherInComplete) return;
      this.loadingType = _zPagingEnum.default.LoadingType.Refresher;
      if (this.nShowRefresherReveal) return;
      this.isUserPullDown = isUserPullDown;
      this.isUserReload = !isUserPullDown;
      this._startLoading(true);
      this.refresherTriggered = true;
      if (this.reloadWhenRefresh && isUserPullDown) {
        this.useChatRecordMode ? this._onLoadingMore('click') : this._reload(false, false, isUserPullDown);
      }
    },
    // 自定义下拉刷新被复位
    _onRestore: function _onRestore() {
      this.refresherTriggered = 'restore';
      this.$emit('onRestore');
      this.$emit('Restore');
    },
    // 进一步处理touch开始结果
    _handleRefresherTouchstart: function _handleRefresherTouchstart(touch) {
      if (!this.loading && this.isTouchEnded) {
        this.isTouchmoving = false;
      }
      this.loadingType = _zPagingEnum.default.LoadingType.Refresher;
      this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
      this.isTouchEnded = false;
      this.refresherTransition = '';
      this.refresherTouchstartY = touch.touchY;
      this.$emit('refresherTouchstart', this.refresherTouchstartY);
      this.lastRefresherTouchmove = touch;
      this._cleanRefresherCompleteTimeout();
      this._cleanRefresherEndTimeout();
    },
    // 非app-vue或微信小程序或QQ小程序或h5平台，使用js控制下拉刷新
    // 进一步处理touch中结果
    _handleRefresherTouchmove: function _handleRefresherTouchmove(moveDis, touch) {
      this.refresherReachMaxAngle = true;
      this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
      this.isTouchmoving = true;
      this.isTouchEnded = false;
      // 更新下拉刷新状态
      // 下拉刷新距离超过阈值
      if (moveDis >= this.finalRefresherThreshold) {
        // 如果开启了下拉进入二楼并且下拉刷新距离超过进入二楼阈值，则当前下拉刷新状态为松手进入二楼，否则为松手立即刷新
        this.refresherStatus = this.refresherF2Enabled && moveDis >= this.finalRefresherF2Threshold ? _zPagingEnum.default.Refresher.GoF2 : _zPagingEnum.default.Refresher.ReleaseToRefresh;
      } else {
        // 下拉刷新距离未超过阈值，显示默认状态
        this.refresherStatus = _zPagingEnum.default.Refresher.Default;
      }
      this.moveDis = moveDis;
    },
    // 进一步处理touch结束结果
    _handleRefresherTouchend: function _handleRefresherTouchend(moveDis) {
      var _this3 = this;
      this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
      this.refresherReachMaxAngle = true;
      this.isTouchEnded = true;
      var refresherThreshold = this.finalRefresherThreshold;
      if (moveDis >= refresherThreshold && [_zPagingEnum.default.Refresher.ReleaseToRefresh, _zPagingEnum.default.Refresher.GoF2].indexOf(this.refresherStatus) >= 0) {
        // 如果是松手进入二楼状态，则触发进入二楼
        if (this.refresherStatus === _zPagingEnum.default.Refresher.GoF2) {
          this._handleGoF2();
          this._refresherEnd();
        } else {
          // 如果是松手立即刷新状态，则触发下拉刷新

          _zPagingUtils.default.delay(function () {
            _this3._emitTouchmove({
              pullingDistance: refresherThreshold,
              dy: _this3.moveDis - refresherThreshold
            });
          }, 0.1);
          this.moveDis = refresherThreshold;
          this.refresherStatus = _zPagingEnum.default.Refresher.Loading;
          this._doRefresherLoad();
        }
      } else {
        this._refresherEnd();
        this.isTouchmovingTimeout = _zPagingUtils.default.delay(function () {
          _this3.isTouchmoving = false;
        }, this.refresherDefaultDuration);
      }
      this.scrollEnable = true;
      this.$emit('refresherTouchend', moveDis);
    },
    // 处理列表触摸开始事件
    _handleListTouchstart: function _handleListTouchstart() {
      if (this.useChatRecordMode && this.autoHideKeyboardWhenChat) {
        uni.hideKeyboard();
        this.$emit('hidedKeyboard');
      }
    },
    // 处理scroll-view bounce是否生效
    _handleScrollViewBounce: function _handleScrollViewBounce(_ref) {
      var bounce = _ref.bounce;
      if (!this.usePageScroll && !this.scrollToTopBounceEnabled) {
        if (this.wxsScrollTop <= 5) {
          this.refresherTransition = '';
          this.scrollEnable = bounce;
        } else if (bounce) {
          this.scrollEnable = bounce;
        }
      }
    },
    // wxs正在下拉状态改变处理
    _handleWxsPullingDownStatusChange: function _handleWxsPullingDownStatusChange(onPullingDown) {
      this.wxsOnPullingDown = onPullingDown;
      if (onPullingDown && !this.useChatRecordMode) {
        this.renderPropScrollTop = 0;
      }
    },
    // wxs正在下拉处理
    _handleWxsPullingDown: function _handleWxsPullingDown(_ref2) {
      var moveDis = _ref2.moveDis,
        diffDis = _ref2.diffDis;
      this._emitTouchmove({
        pullingDistance: moveDis,
        dy: diffDis
      });
    },
    // wxs触摸方向改变
    _handleTouchDirectionChange: function _handleTouchDirectionChange(_ref3) {
      var direction = _ref3.direction;
      this.$emit('touchDirectionChange', direction);
    },
    // wxs通知更新其props
    _handlePropUpdate: function _handlePropUpdate() {
      this.wxsPropType = _zPagingUtils.default.getTime().toString();
    },
    // 下拉刷新结束
    _refresherEnd: function _refresherEnd() {
      var _this4 = this;
      var shouldEndLoadingDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var fromAddData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isUserPullDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var setLoading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      if (this.loadingType === _zPagingEnum.default.LoadingType.Refresher) {
        // 计算当前下拉刷新结束需要延迟的时间
        var refresherCompleteDelay = fromAddData && (isUserPullDown || this.showRefresherWhenReload) ? this.refresherCompleteDelay : 0;
        // 如果延迟时间大于0，则展示刷新结束状态，否则直接展示默认状态
        var refresherStatus = refresherCompleteDelay > 0 ? _zPagingEnum.default.Refresher.Complete : _zPagingEnum.default.Refresher.Default;
        if (this.finalShowRefresherWhenReload) {
          var stackCount = this.refresherRevealStackCount;
          this.refresherRevealStackCount--;
          if (stackCount > 1) return;
        }
        this._cleanRefresherEndTimeout();
        this.refresherEndTimeout = _zPagingUtils.default.delay(function () {
          // 更新下拉刷新状态
          _this4.refresherStatus = refresherStatus;
          // 如果当前下拉刷新状态不是刷新结束，则认为其不在刷新结束状态
          if (refresherStatus !== _zPagingEnum.default.Refresher.Complete) {
            _this4.isRefresherInComplete = false;
          }
        }, this.refresherStatus !== _zPagingEnum.default.Refresher.Default && refresherStatus === _zPagingEnum.default.Refresher.Default ? this.refresherCompleteDuration : 0);
        if (refresherCompleteDelay > 0) {
          this.isRefresherInComplete = true;
        }
        this._cleanRefresherCompleteTimeout();
        this.refresherCompleteTimeout = _zPagingUtils.default.delay(function () {
          var animateDuration = 1;
          var animateType = _this4.refresherEndBounceEnabled && fromAddData ? 'cubic-bezier(0.19,1.64,0.42,0.72)' : 'linear';
          if (fromAddData) {
            animateDuration = _this4.refresherEndBounceEnabled ? _this4.refresherCompleteDuration / 1000 : _this4.refresherCompleteDuration / 3000;
          }
          _this4.refresherTransition = "transform ".concat(fromAddData ? animateDuration : _this4.refresherDefaultDuration / 1000, "s ").concat(animateType);
          _this4.wxsPropType = _this4.refresherTransition + 'end' + _zPagingUtils.default.getTime();
          _this4.moveDis = 0;
          if (refresherStatus === _zPagingEnum.default.Refresher.Complete) {
            if (_this4.refresherCompleteSubTimeout) {
              clearTimeout(_this4.refresherCompleteSubTimeout);
              _this4.refresherCompleteSubTimeout = null;
            }
            _this4.refresherCompleteSubTimeout = _zPagingUtils.default.delay(function () {
              _this4.$nextTick(function () {
                _this4.refresherStatus = _zPagingEnum.default.Refresher.Default;
                _this4.isRefresherInComplete = false;
              });
            }, animateDuration * 800);
          }
          _this4._emitTouchmove({
            pullingDistance: 0,
            dy: _this4.moveDis
          });
        }, refresherCompleteDelay);
      }
      if (setLoading) {
        _zPagingUtils.default.delay(function () {
          return _this4.loading = false;
        }, shouldEndLoadingDelay ? 10 : 0);
        isUserPullDown && this._onRestore();
      }
    },
    // 处理进入二楼
    _handleGoF2: function _handleGoF2() {
      var _this5 = this;
      if (this.showF2 || !this.refresherF2Enabled) return;
      this.$emit('refresherF2Change', 'go');
      if (!this.showRefresherF2) return;
      this.f2Transform = "translateY(".concat(-this.superContentHeight, "px)");
      this.showF2 = true;
      _zPagingUtils.default.delay(function () {
        _this5.f2Transform = 'translateY(0px)';
      }, 100, 'f2ShowDelay');
    },
    // 处理退出二楼
    _handleCloseF2: function _handleCloseF2() {
      var _this6 = this;
      if (!this.showF2 || !this.refresherF2Enabled) return;
      this.$emit('refresherF2Change', 'close');
      if (!this.showRefresherF2) return;
      this.f2Transform = "translateY(".concat(-this.superContentHeight, "px)");
      _zPagingUtils.default.delay(function () {
        _this6.showF2 = false;
        _this6.nF2Opacity = 0;
      }, this.refresherF2Duration, 'f2CloseDelay');
    },
    // 模拟用户手动触发下拉刷新
    _doRefresherRefreshAnimate: function _doRefresherRefreshAnimate() {
      this._cleanRefresherCompleteTimeout();
      // 用户处理用户在短时间内多次调用reload的情况，此时下拉刷新view不需要重复显示，只需要保证最后一次reload对应的请求结束后收回下拉刷新view即可

      var doRefreshAnimateAfter = !this.doRefreshAnimateAfter && this.finalShowRefresherWhenReload && this.customRefresherHeight === -1 && this.refresherThreshold === _zPagingUtils.default.addUnit(80, this.unit);
      if (doRefreshAnimateAfter) {
        this.doRefreshAnimateAfter = true;
        return;
      }
      this.refresherRevealStackCount++;
      this.wxsPropType = 'begin' + _zPagingUtils.default.getTime();
      this.moveDis = this.finalRefresherThreshold;
      this.refresherStatus = _zPagingEnum.default.Refresher.Loading;
      this.isTouchmoving = true;
      this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
      this._doRefresherLoad(false);
    },
    // 触发下拉刷新
    _doRefresherLoad: function _doRefresherLoad() {
      var isUserPullDown = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._onRefresh(false, isUserPullDown);
      this.loading = true;
    },
    // 更新自定义下拉刷新view高度
    _updateCustomRefresherHeight: function _updateCustomRefresherHeight() {
      var _this7 = this;
      this._getNodeClientRect('.zp-custom-refresher-slot-view').then(function (res) {
        _this7.customRefresherHeight = res ? res[0].height : 0;
        _this7.showCustomRefresher = _this7.customRefresherHeight > 0;
        if (_this7.doRefreshAnimateAfter) {
          _this7.doRefreshAnimateAfter = false;
          _this7._doRefresherRefreshAnimate();
        }
      });
    },
    // emit pullingDown事件
    _emitTouchmove: function _emitTouchmove(e) {
      e.viewHeight = this.finalRefresherThreshold;
      e.rate = e.viewHeight > 0 ? e.pullingDistance / e.viewHeight : 0;
      this.hasTouchmove && this.oldPullingDistance !== e.pullingDistance && this.$emit('refresherTouchmove', e);
      this.oldPullingDistance = e.pullingDistance;
    },
    // 清除refresherCompleteTimeout
    _cleanRefresherCompleteTimeout: function _cleanRefresherCompleteTimeout() {
      this.refresherCompleteTimeout = this._cleanTimeout(this.refresherCompleteTimeout);
    },
    // 清除refresherEndTimeout
    _cleanRefresherEndTimeout: function _cleanRefresherEndTimeout() {
      this.refresherEndTimeout = this._cleanTimeout(this.refresherEndTimeout);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 271 */
/*!**************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/load-more.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]滚动到底部加载更多模块
var _default = {
  props: {
    // 自定义底部加载更多样式
    loadingMoreCustomStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('loadingMoreCustomStyle', {})
    },
    // 自定义底部加载更多文字样式
    loadingMoreTitleCustomStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('loadingMoreTitleCustomStyle', {})
    },
    // 自定义底部加载更多加载中动画样式
    loadingMoreLoadingIconCustomStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('loadingMoreLoadingIconCustomStyle', {})
    },
    // 自定义底部加载更多加载中动画图标类型，可选flower或circle，默认为flower
    loadingMoreLoadingIconType: {
      type: String,
      default: _zPagingUtils.default.gc('loadingMoreLoadingIconType', 'flower')
    },
    // 自定义底部加载更多加载中动画图标图片
    loadingMoreLoadingIconCustomImage: {
      type: String,
      default: _zPagingUtils.default.gc('loadingMoreLoadingIconCustomImage', '')
    },
    // 底部加载更多加载中view是否展示旋转动画，默认为是
    loadingMoreLoadingAnimated: {
      type: Boolean,
      default: _zPagingUtils.default.gc('loadingMoreLoadingAnimated', true)
    },
    // 是否启用加载更多数据(含滑动到底部加载更多数据和点击加载更多数据)，默认为是
    loadingMoreEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('loadingMoreEnabled', true)
    },
    // 是否启用滑动到底部加载更多数据，默认为是
    toBottomLoadingMoreEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('toBottomLoadingMoreEnabled', true)
    },
    // 滑动到底部状态为默认状态时，以加载中的状态展示，默认为否。若设置为是，可避免滚动到底部看到默认状态然后立刻变为加载中状态的问题，但分页数量未超过一屏时，不会显示【点击加载更多】
    loadingMoreDefaultAsLoading: {
      type: Boolean,
      default: _zPagingUtils.default.gc('loadingMoreDefaultAsLoading', false)
    },
    // 滑动到底部"默认"文字，默认为【点击加载更多】
    loadingMoreDefaultText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('loadingMoreDefaultText', null)
    },
    // 滑动到底部"加载中"文字，默认为【正在加载...】
    loadingMoreLoadingText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('loadingMoreLoadingText', null)
    },
    // 滑动到底部"没有更多"文字，默认为【没有更多了】
    loadingMoreNoMoreText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('loadingMoreNoMoreText', null)
    },
    // 滑动到底部"加载失败"文字，默认为【加载失败，点击重新加载】
    loadingMoreFailText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('loadingMoreFailText', null)
    },
    // 当没有更多数据且分页内容未超出z-paging时是否隐藏没有更多数据的view，默认为否
    hideNoMoreInside: {
      type: Boolean,
      default: _zPagingUtils.default.gc('hideNoMoreInside', false)
    },
    // 当没有更多数据且分页数组长度少于这个值时，隐藏没有更多数据的view，默认为0，代表不限制。
    hideNoMoreByLimit: {
      type: Number,
      default: _zPagingUtils.default.gc('hideNoMoreByLimit', 0)
    },
    // 是否显示默认的加载更多text，默认为是
    showDefaultLoadingMoreText: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showDefaultLoadingMoreText', true)
    },
    // 是否显示没有更多数据的view
    showLoadingMoreNoMoreView: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showLoadingMoreNoMoreView', true)
    },
    // 是否显示没有更多数据的分割线，默认为是
    showLoadingMoreNoMoreLine: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showLoadingMoreNoMoreLine', true)
    },
    // 自定义底部没有更多数据的分割线样式
    loadingMoreNoMoreLineCustomStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('loadingMoreNoMoreLineCustomStyle', {})
    },
    // 当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)
    insideMore: {
      type: Boolean,
      default: _zPagingUtils.default.gc('insideMore', false)
    },
    // 距底部/右边多远时（单位px），触发 scrolltolower 事件，默认为100rpx
    lowerThreshold: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('lowerThreshold', '100rpx')
    }
  },
  data: function data() {
    return {
      M: _zPagingEnum.default.More,
      // 底部加载更多状态
      loadingStatus: _zPagingEnum.default.More.Default,
      // 在渲染之后的底部加载更多状态
      loadingStatusAfterRender: _zPagingEnum.default.More.Default,
      // 底部加载更多时间戳
      loadingMoreTimeStamp: 0,
      // 底部加载更多slot
      loadingMoreDefaultSlot: null,
      // 是否展示底部加载更多
      showLoadingMore: false,
      // 是否是开发者自定义的加载更多，-1代表交由z-paging自行判断；1代表没有更多了；0代表还有更多数据
      customNoMore: -1
    };
  },
  computed: {
    // 底部加载更多配置
    zLoadMoreConfig: function zLoadMoreConfig() {
      return {
        status: this.loadingStatusAfterRender,
        defaultAsLoading: this.loadingMoreDefaultAsLoading || this.useChatRecordMode && this.chatLoadingMoreDefaultAsLoading,
        defaultThemeStyle: this.finalLoadingMoreThemeStyle,
        customStyle: this.loadingMoreCustomStyle,
        titleCustomStyle: this.loadingMoreTitleCustomStyle,
        iconCustomStyle: this.loadingMoreLoadingIconCustomStyle,
        loadingIconType: this.loadingMoreLoadingIconType,
        loadingIconCustomImage: this.loadingMoreLoadingIconCustomImage,
        loadingAnimated: this.loadingMoreLoadingAnimated,
        showNoMoreLine: this.showLoadingMoreNoMoreLine,
        noMoreLineCustomStyle: this.loadingMoreNoMoreLineCustomStyle,
        defaultText: this.finalLoadingMoreDefaultText,
        loadingText: this.finalLoadingMoreLoadingText,
        noMoreText: this.finalLoadingMoreNoMoreText,
        failText: this.finalLoadingMoreFailText,
        hideContent: !this.loadingMoreDefaultAsLoading && this.listRendering,
        unit: this.unit,
        isChat: this.useChatRecordMode,
        chatDefaultAsLoading: this.chatLoadingMoreDefaultAsLoading
      };
    },
    // 最终的底部加载更多主题
    finalLoadingMoreThemeStyle: function finalLoadingMoreThemeStyle() {
      return this.loadingMoreThemeStyle.length ? this.loadingMoreThemeStyle : this.defaultThemeStyle;
    },
    // 最终的底部加载更多触发阈值
    finalLowerThreshold: function finalLowerThreshold() {
      return _zPagingUtils.default.convertToPx(this.lowerThreshold);
    },
    // 是否显示默认状态下的底部加载更多
    showLoadingMoreDefault: function showLoadingMoreDefault() {
      return this._showLoadingMore('Default');
    },
    // 是否显示加载中状态下的底部加载更多
    showLoadingMoreLoading: function showLoadingMoreLoading() {
      return this._showLoadingMore('Loading');
    },
    // 是否显示没有更多了状态下的底部加载更多
    showLoadingMoreNoMore: function showLoadingMoreNoMore() {
      return this._showLoadingMore('NoMore');
    },
    // 是否显示加载失败状态下的底部加载更多
    showLoadingMoreFail: function showLoadingMoreFail() {
      return this._showLoadingMore('Fail');
    },
    // 是否显示自定义状态下的底部加载更多
    showLoadingMoreCustom: function showLoadingMoreCustom() {
      return this._showLoadingMore('Custom');
    },
    // 底部加载更多固定高度
    loadingMoreFixedHeight: function loadingMoreFixedHeight() {
      return _zPagingUtils.default.addUnit('80rpx', this.unit);
    }
  },
  methods: {
    // 页面滚动到底部时通知z-paging进行进一步处理
    pageReachBottom: function pageReachBottom() {
      !this.useChatRecordMode && this.toBottomLoadingMoreEnabled && this._onLoadingMore('toBottom');
    },
    // 手动触发上拉加载更多(非必须，可依据具体需求使用)
    doLoadMore: function doLoadMore(type) {
      this._onLoadingMore(type);
    },
    // 通过@scroll事件检测是否滚动到了底部(顺带检测下是否滚动到了顶部)
    _checkScrolledToBottom: function _checkScrolledToBottom(scrollDiff) {
      var _this = this;
      var checked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 如果当前scroll-view高度未获取，则获取其高度
      if (this.cacheScrollNodeHeight === -1) {
        // 获取当前scroll-view高度
        this._getNodeClientRect('.zp-scroll-view').then(function (res) {
          if (res) {
            var scrollNodeHeight = res[0].height;
            // 缓存当前scroll-view高度，如果获取过了不再获取
            _this.cacheScrollNodeHeight = scrollNodeHeight;
            // // scrollDiff - this.cacheScrollNodeHeight = 当前滚动区域的顶部与内容底部的距离 - scroll-view高度 = 当前滚动区域的底部与内容底部的距离(也就是最终的与底部的距离)
            if (scrollDiff - scrollNodeHeight <= _this.finalLowerThreshold) {
              // 如果与底部的距离小于阈值，则判断为滚动到了底部，触发滚动到底部事件
              _this._onLoadingMore('toBottom');
            }
          }
        });
      } else {
        // scrollDiff - this.cacheScrollNodeHeight = 当前滚动区域的顶部与内容底部的距离 - scroll-view高度 = 当前滚动区域的底部与内容底部的距离(也就是最终的与底部的距离)
        if (scrollDiff - this.cacheScrollNodeHeight <= this.finalLowerThreshold) {
          // 如果与底部的距离小于阈值，则判断为滚动到了底部，触发滚动到底部事件
          this._onLoadingMore('toBottom');
        } else if (scrollDiff - this.cacheScrollNodeHeight <= 500 && !checked) {
          // 如果与底部的距离小于500px，则获取当前滚动的位置，延迟150毫秒重复上述步骤再次检测(避免@scroll触发时获取的scrollTop不正确导致的其他问题，此时获取的scrollTop不一定可信)。防止因为部分性能较差安卓设备@scroll采样率过低导致的滚动到底部但是依然没有触发的问题
          _zPagingUtils.default.delay(function () {
            _this._getNodeClientRect('.zp-scroll-view', true, true).then(function (res) {
              if (res) {
                _this.oldScrollTop = res[0].scrollTop;
                var newScrollDiff = res[0].scrollHeight - _this.oldScrollTop;
                _this._checkScrolledToBottom(newScrollDiff, true);
              }
            });
          }, 150, 'checkScrolledToBottomDelay');
        }
        // 检测一下是否已经滚动到了顶部了，因为在安卓中滚动到顶部时scrollTop不一定为0(和滚动到底部一样的原因)，所以需要在scrollTop小于150px时，通过获取.zp-scroll-view的scrollTop再判断一下
        if (this.oldScrollTop <= 150 && this.oldScrollTop !== 0) {
          _zPagingUtils.default.delay(function () {
            // 这里再判断一下是否确实已经滚动到顶部了，如果已经滚动到顶部了，则不用再判断了，再次判断的原因是可能150毫秒之后oldScrollTop才是0
            if (_this.oldScrollTop !== 0) {
              _this._getNodeClientRect('.zp-scroll-view', true, true).then(function (res) {
                // 如果150毫秒后.zp-scroll-view的scrollTop为0，则认为已经滚动到了顶部了
                if (res && res[0].scrollTop === 0 && _this.oldScrollTop !== 0) {
                  _this._onScrollToUpper();
                }
              });
            }
          }, 150, 'checkScrolledToTopDelay');
        }
      }
    },
    // 触发加载更多时调用,from:toBottom-滑动到底部触发；click-点击加载更多触发
    _onLoadingMore: function _onLoadingMore() {
      var _this2 = this;
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
      // 如果是ios并且是滚动到底部的，则在滚动到底部时候尝试将列表设置为禁止滚动然后设置为允许滚动，以禁止底部bounce的效果
      if (this.isIos && from === 'toBottom' && !this.scrollToBottomBounceEnabled && this.scrollEnable) {
        this.scrollEnable = false;
        this.$nextTick(function () {
          _this2.scrollEnable = true;
        });
      }
      // emit scrolltolower
      this._emitScrollEvent('scrolltolower');
      // 如果是只使用布局或下拉刷新 或者 禁用底部加载更多 或者 底部加载更多不是默认状态或加载失败状态 或者 是加载中状态 或者 空数据图已经展示了，则return，不触发内部加载更多逻辑
      if (this.isOnly || !this.loadingMoreEnabled || !(this.loadingStatus === _zPagingEnum.default.More.Default || this.loadingStatus === _zPagingEnum.default.More.Fail) || this.loading || this.showEmpty) return;
      if (!this.isIos && !this.isOnly && !this.usePageScroll) {
        var currentTimestamp = _zPagingUtils.default.getTime();
        // 在非ios平台+scroll-view中节流处理
        if (this.loadingMoreTimeStamp > 0 && currentTimestamp - this.loadingMoreTimeStamp < 100) {
          this.loadingMoreTimeStamp = 0;
          return;
        }
      }

      // 处理加载更多数据
      this._doLoadingMore();
    },
    // 处理开始加载更多
    _doLoadingMore: function _doLoadingMore() {
      var _this3 = this;
      if (this.pageNo >= this.defaultPageNo && this.loadingStatus !== _zPagingEnum.default.More.NoMore) {
        this.pageNo++;
        this._startLoading(false);
        if (this.isLocalPaging) {
          // 如果是本地分页，则在组件内部对数据进行分页处理，不触发@query事件
          this._localPagingQueryList(this.pageNo, this.defaultPageSize, this.localPagingLoadingTime, function (res) {
            _this3.completeByTotal(res, _this3.totalLocalPagingList.length);
            _this3.queryFrom = _zPagingEnum.default.QueryFrom.LoadMore;
          });
        } else {
          // emit @query相关加载更多事件
          this._emitQuery(this.pageNo, this.defaultPageSize, _zPagingEnum.default.QueryFrom.LoadMore);
          this._callMyParentQuery();
        }
        // 设置当前加载状态为底部加载更多状态
        this.loadingType = _zPagingEnum.default.LoadingType.LoadMore;
      }
    },
    // (预处理)判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
    _preCheckShowNoMoreInside: function _preCheckShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode) {
      var _this4 = this;
      if (this.loadingStatus === _zPagingEnum.default.More.NoMore && this.hideNoMoreByLimit > 0 && newVal.length) {
        this.showLoadingMore = newVal.length > this.hideNoMoreByLimit;
      } else if (this.loadingStatus === _zPagingEnum.default.More.NoMore && this.hideNoMoreInside && newVal.length || this.insideMore && this.insideOfPaging !== false && newVal.length) {
        this.$nextTick(function () {
          _this4._checkShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode);
        });
        if (this.insideMore && this.insideOfPaging !== false && newVal.length) {
          this.showLoadingMore = newVal.length;
        }
      } else {
        this.showLoadingMore = newVal.length;
      }
    },
    // 判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
    _checkShowNoMoreInside: function _checkShowNoMoreInside(totalData, oldScrollViewNode, oldPagingContainerNode) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var scrollViewNode, scrollViewTotalH, pagingContainerNode, pagingContainerH, scrollViewH;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = oldScrollViewNode;
                if (_context.t0) {
                  _context.next = 6;
                  break;
                }
                _context.next = 5;
                return _this5._getNodeClientRect('.zp-scroll-view');
              case 5:
                _context.t0 = _context.sent;
              case 6:
                scrollViewNode = _context.t0;
                if (!_this5.usePageScroll) {
                  _context.next = 11;
                  break;
                }
                if (scrollViewNode) {
                  // 获取滚动内容总高度
                  scrollViewTotalH = scrollViewNode[0].top + scrollViewNode[0].height; // 如果滚动内容总高度小于窗口高度，则认为内容未超出z-paging
                  _this5.insideOfPaging = scrollViewTotalH < _this5.windowHeight;
                  // 如果需要没有更多数据时，隐藏底部加载更多view，并且内容未超过z-paging，则隐藏底部加载更多
                  if (_this5.hideNoMoreInside) {
                    _this5.showLoadingMore = !_this5.insideOfPaging;
                  }
                  // 如果需要内容未超过z-paging时自动加载更多，则触发加载更多
                  _this5._updateInsideOfPaging();
                }
                _context.next = 22;
                break;
              case 11:
                _context.t1 = oldPagingContainerNode;
                if (_context.t1) {
                  _context.next = 16;
                  break;
                }
                _context.next = 15;
                return _this5._getNodeClientRect('.zp-paging-container-content');
              case 15:
                _context.t1 = _context.sent;
              case 16:
                pagingContainerNode = _context.t1;
                // 获取滚动内容总高度
                pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0; // 获取z-paging内置scroll-view高度
                scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0; // 如果滚动内容总高度小于z-paging内置scroll-view高度，则认为内容未超出z-paging
                _this5.insideOfPaging = pagingContainerH < scrollViewH;
                if (_this5.hideNoMoreInside) {
                  _this5.showLoadingMore = !_this5.insideOfPaging;
                }
                // 如果需要内容未超过z-paging时自动加载更多，则触发加载更多
                _this5._updateInsideOfPaging();
              case 22:
                _context.next = 29;
                break;
              case 24:
                _context.prev = 24;
                _context.t2 = _context["catch"](0);
                // 如果发生了异常，判断totalData数组长度为0，则认为内容未超出z-paging
                _this5.insideOfPaging = !totalData.length;
                if (_this5.hideNoMoreInside) {
                  _this5.showLoadingMore = !_this5.insideOfPaging;
                }
                // 如果需要内容未超过z-paging时自动加载更多，则触发加载更多
                _this5._updateInsideOfPaging();
              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 24]]);
      }))();
    },
    // 是否要展示上拉加载更多view
    _showLoadingMore: function _showLoadingMore(type) {
      if (!this.showLoadingMoreWhenReload && (!(this.loadingStatus === _zPagingEnum.default.More.Default ? this.nShowBottom : true) || !this.realTotalData.length)) return false;
      if ((!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== _zPagingEnum.default.More.Loading) && !this.showLoadingMore || !this.loadingMoreEnabled && (!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== _zPagingEnum.default.More.Loading) || this.isOnly) {
        return false;
      }
      if (this.useChatRecordMode && type !== 'Loading') return false;
      if (!this.zSlots) return false;
      if (type === 'Custom') {
        return this.showDefaultLoadingMoreText && !(this.loadingStatus === _zPagingEnum.default.More.NoMore && !this.showLoadingMoreNoMoreView);
      }
      var res = this.loadingStatus === _zPagingEnum.default.More[type] && this.zSlots["loadingMore".concat(type)] && (type === 'NoMore' ? this.showLoadingMoreNoMoreView : true);
      if (res) {}
      return res;
    }
  }
};
exports.default = _default;

/***/ }),
/* 272 */
/*!************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/loading.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]loading相关模块
var _default = {
  props: {
    // 第一次加载后自动隐藏loading slot，默认为是
    autoHideLoadingAfterFirstLoaded: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoHideLoadingAfterFirstLoaded', true)
    },
    // loading slot是否铺满屏幕并固定，默认为否
    loadingFullFixed: {
      type: Boolean,
      default: _zPagingUtils.default.gc('loadingFullFixed', false)
    },
    // 是否自动显示系统Loading：即uni.showLoading，若开启则将在刷新列表时(调用reload、refresh时)显示，下拉刷新和滚动到底部加载更多不会显示，默认为false。
    autoShowSystemLoading: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoShowSystemLoading', false)
    },
    // 显示系统Loading时是否显示透明蒙层，防止触摸穿透，默认为是(H5、App、微信小程序、百度小程序有效)
    systemLoadingMask: {
      type: Boolean,
      default: _zPagingUtils.default.gc('systemLoadingMask', true)
    },
    // 显示系统Loading时显示的文字，默认为"加载中"
    systemLoadingText: {
      type: [String, Object],
      default: _zPagingUtils.default.gc('systemLoadingText', null)
    }
  },
  data: function data() {
    return {
      loading: false,
      loadingForNow: false
    };
  },
  watch: {
    // loading状态
    loadingStatus: function loadingStatus(newVal) {
      var _this = this;
      this.$emit('loadingStatusChange', newVal);
      this.$nextTick(function () {
        _this.loadingStatusAfterRender = newVal;
      });
      if (this.useChatRecordMode) {
        if (this.isFirstPage && (newVal === _zPagingEnum.default.More.NoMore || newVal === _zPagingEnum.default.More.Fail)) {
          this.isFirstPageAndNoMore = true;
          return;
        }
      }
      this.isFirstPageAndNoMore = false;
    },
    loading: function loading(newVal) {
      if (newVal) {
        this.loadingForNow = newVal;
      }
    }
  },
  computed: {
    // 是否显示loading
    showLoading: function showLoading() {
      if (this.firstPageLoaded || !this.loading || !this.loadingForNow) return false;
      if (this.finalShowSystemLoading) {
        // 显示系统loading
        uni.showLoading({
          title: this.finalSystemLoadingText,
          mask: this.systemLoadingMask
        });
      }
      return this.autoHideLoadingAfterFirstLoaded ? this.fromEmptyViewReload ? true : !this.pagingLoaded : this.loadingType === _zPagingEnum.default.LoadingType.Refresher;
    },
    // 最终的是否显示系统loading
    finalShowSystemLoading: function finalShowSystemLoading() {
      return this.autoShowSystemLoading && this.loadingType === _zPagingEnum.default.LoadingType.Refresher;
    }
  },
  methods: {
    // 处理开始加载更多状态
    _startLoading: function _startLoading() {
      var isReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.showLoadingMoreWhenReload && !this.isUserPullDown || !isReload) {
        this.loadingStatus = _zPagingEnum.default.More.Loading;
      }
      this.loading = true;
    },
    // 停止系统loading和refresh
    _endSystemLoadingAndRefresh: function _endSystemLoadingAndRefresh() {
      this.finalShowSystemLoading && uni.hideLoading();
      !this.useCustomRefresher && uni.stopPullDownRefresh();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 273 */
/*!*********************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/chat-record-mode.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
// [z-paging]聊天记录模式模块
var _default = {
  props: {
    // 使用聊天记录模式，默认为否
    useChatRecordMode: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useChatRecordMode', false)
    },
    // 使用聊天记录模式时滚动到顶部后，列表垂直移动偏移距离。默认0rpx。单位px（暂时无效）
    chatRecordMoreOffset: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('chatRecordMoreOffset', '0rpx')
    },
    // 使用聊天记录模式时是否自动隐藏键盘：在用户触摸列表时候自动隐藏键盘，默认为是
    autoHideKeyboardWhenChat: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoHideKeyboardWhenChat', true)
    },
    // 使用聊天记录模式中键盘弹出时是否自动调整slot="bottom"高度，默认为是
    autoAdjustPositionWhenChat: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoAdjustPositionWhenChat', true)
    },
    // 使用聊天记录模式中键盘弹出时占位高度偏移距离。默认0rpx。单位px
    chatAdjustPositionOffset: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('chatAdjustPositionOffset', '0rpx')
    },
    // 使用聊天记录模式中键盘弹出时是否自动滚动到底部，默认为否
    autoToBottomWhenChat: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoToBottomWhenChat', false)
    },
    // 使用聊天记录模式中reload时是否显示chatLoading，默认为否
    showChatLoadingWhenReload: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showChatLoadingWhenReload', false)
    },
    // 在聊天记录模式中滑动到顶部状态为默认状态时，以加载中的状态展示，默认为是。若设置为否，则默认会显示【点击加载更多】，然后才会显示loading
    chatLoadingMoreDefaultAsLoading: {
      type: Boolean,
      default: _zPagingUtils.default.gc('chatLoadingMoreDefaultAsLoading', true)
    }
  },
  data: function data() {
    return {
      // 键盘高度
      keyboardHeight: 0,
      // 键盘高度是否未改变，此时占位高度变化不需要动画效果
      isKeyboardHeightChanged: false
    };
  },
  computed: {
    finalChatRecordMoreOffset: function finalChatRecordMoreOffset() {
      return _zPagingUtils.default.convertToPx(this.chatRecordMoreOffset);
    },
    finalChatAdjustPositionOffset: function finalChatAdjustPositionOffset() {
      return _zPagingUtils.default.convertToPx(this.chatAdjustPositionOffset);
    },
    // 聊天记录模式旋转180度style
    chatRecordRotateStyle: function chatRecordRotateStyle() {
      var _this = this;
      var cellStyle;
      // 在vue中，直接将列表倒置，因此在vue的cell中，也直接写style="transform: scaleY(-1)"转回来即可。

      cellStyle = this.useChatRecordMode ? {
        transform: 'scaleY(-1)'
      } : {};

      // 在nvue中，需要考虑数据量不满一页的情况，因为nvue中的list无法通过flex-end修改不满一页的起始位置，会导致不满一页时列表数据从底部开始，因此需要特别判断
      // 当数据不满一屏的时候，不进行列表倒置

      this.$emit('update:cellStyle', cellStyle);
      this.$emit('cellStyleChange', cellStyle);

      // 在聊天记录模式中，如果列表没有倒置并且当前是第一页，则需要自动滚动到最底部
      this.$nextTick(function () {
        if (_this.isFirstPage && _this.isChatRecordModeAndNotInversion) {
          _this.$nextTick(function () {
            // 这里多次触发滚动到底部是为了避免在某些情况下，即使是在nextTick但是cell未渲染完毕导致滚动到底部位置不正确的问题
            _this._scrollToBottom(false);
            _zPagingUtils.default.delay(function () {
              _this._scrollToBottom(false);
              _zPagingUtils.default.delay(function () {
                _this._scrollToBottom(false);
              }, 50);
            }, 50);
          });
        }
      });
      return cellStyle;
    },
    // 是否是聊天记录列表并且有配置transform
    isChatRecordModeHasTransform: function isChatRecordModeHasTransform() {
      return this.useChatRecordMode && this.chatRecordRotateStyle && this.chatRecordRotateStyle.transform;
    },
    // 是否是聊天记录列表并且列表未倒置
    isChatRecordModeAndNotInversion: function isChatRecordModeAndNotInversion() {
      return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === 'scaleY(1)';
    },
    // 是否是聊天记录列表并且列表倒置
    isChatRecordModeAndInversion: function isChatRecordModeAndInversion() {
      return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === 'scaleY(-1)';
    },
    // 最终的聊天记录模式中底部安全区域的高度，如果开启了底部安全区域并且键盘未弹出，则添加底部区域高度
    chatRecordModeSafeAreaBottom: function chatRecordModeSafeAreaBottom() {
      return this.safeAreaInsetBottom && !this.keyboardHeight ? this.safeAreaBottom : 0;
    }
  },
  mounted: function mounted() {
    this.addKeyboardHeightChangeListener();
  },
  methods: {
    // 添加聊天记录
    addChatRecordData: function addChatRecordData(data) {
      var toBottom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var toBottomWithAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!this.useChatRecordMode) return;
      this.isTotalChangeFromAddData = true;
      this.addDataFromTop(data, toBottom, toBottomWithAnimate);
    },
    // 手动触发滚动到顶部加载更多，聊天记录模式时有效
    doChatRecordLoadMore: function doChatRecordLoadMore() {
      this.useChatRecordMode && this._onLoadingMore('click');
    },
    // 手动添加键盘高度变化监听
    addKeyboardHeightChangeListener: function addKeyboardHeightChangeListener() {
      // 监听键盘高度变化（H5、百度小程序、抖音小程序、飞书小程序不支持）

      if (this.useChatRecordMode) {
        uni.onKeyboardHeightChange(this._handleKeyboardHeightChange);
      }
    },
    // 处理键盘高度变化
    _handleKeyboardHeightChange: function _handleKeyboardHeightChange(res) {
      var _this2 = this;
      this.$emit('keyboardHeightChange', res);
      if (this.autoAdjustPositionWhenChat) {
        this.isKeyboardHeightChanged = true;
        this.keyboardHeight = res.height > 0 ? res.height + this.finalChatAdjustPositionOffset : res.height;
      }
      if (this.autoToBottomWhenChat && this.keyboardHeight > 0) {
        _zPagingUtils.default.delay(function () {
          _this2.scrollToBottom(false);
          _zPagingUtils.default.delay(function () {
            _this2.scrollToBottom(false);
          });
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 274 */
/*!*************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/scroller.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]scroll相关模块
var _default = {
  props: {
    // 使用页面滚动，默认为否，当设置为是时则使用页面的滚动而非此组件内部的scroll-view的滚动，使用页面滚动时z-paging无需设置确定的高度且对于长列表展示性能更高，但配置会略微繁琐
    usePageScroll: {
      type: Boolean,
      default: _zPagingUtils.default.gc('usePageScroll', false)
    },
    // 是否可以滚动，使用内置scroll-view和nvue时有效，默认为是
    scrollable: {
      type: Boolean,
      default: _zPagingUtils.default.gc('scrollable', true)
    },
    // 控制是否出现滚动条，默认为是
    showScrollbar: {
      type: Boolean,
      default: _zPagingUtils.default.gc('showScrollbar', true)
    },
    // 是否允许横向滚动，默认为否
    scrollX: {
      type: Boolean,
      default: _zPagingUtils.default.gc('scrollX', false)
    },
    // iOS设备上滚动到顶部时是否允许回弹效果，默认为否。关闭回弹效果后可使滚动到顶部与下拉刷新更连贯，但是有吸顶view时滚动到顶部时可能出现抖动。
    scrollToTopBounceEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('scrollToTopBounceEnabled', false)
    },
    // iOS设备上滚动到底部时是否允许回弹效果，默认为是。
    scrollToBottomBounceEnabled: {
      type: Boolean,
      default: _zPagingUtils.default.gc('scrollToBottomBounceEnabled', true)
    },
    // 在设置滚动条位置时使用动画过渡，默认为否
    scrollWithAnimation: {
      type: Boolean,
      default: _zPagingUtils.default.gc('scrollWithAnimation', false)
    },
    // 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
    scrollIntoView: {
      type: String,
      default: _zPagingUtils.default.gc('scrollIntoView', '')
    }
  },
  data: function data() {
    return {
      scrollTop: 0,
      oldScrollTop: 0,
      scrollLeft: 0,
      oldScrollLeft: 0,
      scrollViewStyle: {},
      scrollViewContainerStyle: {},
      scrollViewInStyle: {},
      pageScrollTop: -1,
      scrollEnable: true,
      privateScrollWithAnimation: -1,
      cacheScrollNodeHeight: -1,
      superContentHeight: 0,
      lastScrollHeight: 0,
      lastScrollDirection: '',
      setContentHeightPending: false
    };
  },
  watch: {
    oldScrollTop: function oldScrollTop(newVal) {
      !this.usePageScroll && this._scrollTopChange(newVal, false);
    },
    pageScrollTop: function pageScrollTop(newVal) {
      this.usePageScroll && this._scrollTopChange(newVal, true);
    },
    usePageScroll: {
      handler: function handler(newVal) {
        this.loaded && this.autoHeight && this._setAutoHeight(!newVal);
      },
      immediate: true
    },
    finalScrollTop: function finalScrollTop(newVal) {
      this.renderPropScrollTop = newVal < 6 ? 0 : 10;
    }
  },
  computed: {
    finalScrollWithAnimation: function finalScrollWithAnimation() {
      if (this.privateScrollWithAnimation !== -1) {
        return this.privateScrollWithAnimation === 1;
      }
      return this.scrollWithAnimation;
    },
    finalScrollViewStyle: function finalScrollViewStyle() {
      if (this.superContentZIndex != 1) {
        this.scrollViewStyle['z-index'] = this.superContentZIndex;
        this.scrollViewStyle['position'] = 'relative';
      }
      return this.scrollViewStyle;
    },
    finalScrollTop: function finalScrollTop() {
      return this.usePageScroll ? this.pageScrollTop : this.oldScrollTop;
    },
    // 当前是否是旧版webview
    finalIsOldWebView: function finalIsOldWebView() {
      return this.isOldWebView && !this.usePageScroll;
    },
    // 当前scroll-view/list-view是否允许滚动
    finalScrollable: function finalScrollable() {
      return this.scrollable && !this.usePageScroll && this.scrollEnable && (this.refresherCompleteScrollable ? true : this.refresherStatus !== _zPagingEnum.default.Refresher.Complete) && (this.refresherRefreshingScrollable ? true : this.refresherStatus !== _zPagingEnum.default.Refresher.Loading);
    }
  },
  methods: {
    // 滚动到顶部，animate为是否展示滚动动画，默认为是
    scrollToTop: function scrollToTop(animate) {
      var _this = this;
      var checkReverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // 如果是聊天记录模式并且列表倒置了，则滚动到顶部实际上是滚动到底部
      if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
        this.scrollToBottom(animate, false);
        return;
      }
      this.$nextTick(function () {
        _this._scrollToTop(animate, false);
      });
    },
    // 滚动到底部，animate为是否展示滚动动画，默认为是
    scrollToBottom: function scrollToBottom(animate) {
      var _this2 = this;
      var checkReverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // 如果是聊天记录模式并且列表倒置了，则滚动到底部实际上是滚动到顶部
      if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
        this.scrollToTop(animate, false);
        return;
      }
      this.$nextTick(function () {
        _this2._scrollToBottom(animate);
      });
    },
    // 滚动到指定view(vue中有效)。sel为需要滚动的view的id值，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollIntoViewById: function scrollIntoViewById(sel, offset, animate) {
      this._scrollIntoView(sel, offset, animate);
    },
    // 滚动到指定view(vue中有效)。nodeTop为需要滚动的view的top值(通过uni.createSelectorQuery()获取)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollIntoViewByNodeTop: function scrollIntoViewByNodeTop(nodeTop, offset, animate) {
      var _this3 = this;
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(function () {
        _this3._scrollIntoViewByNodeTop(nodeTop, offset, animate);
      });
    },
    // y轴滚动到指定位置(vue中有效)。y为与顶部的距离，单位为px；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollToY: function scrollToY(y, offset, animate) {
      var _this4 = this;
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(function () {
        _this4._scrollToY(y, offset, animate);
      });
    },
    // x轴滚动到指定位置(非页面滚动且在vue中有效)。x为与左侧的距离，单位为px；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollToX: function scrollToX(x, offset, animate) {
      var _this5 = this;
      this.scrollLeft = this.oldScrollLeft;
      this.$nextTick(function () {
        _this5._scrollToX(x, offset, animate);
      });
    },
    // 滚动到指定view(nvue中和虚拟列表中有效)。index为需要滚动的view的index(第几个，从0开始)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollIntoViewByIndex: function scrollIntoViewByIndex(index, offset, animate) {
      var _this6 = this;
      if (index >= this.realTotalData.length) {
        _zPagingUtils.default.consoleErr('当前滚动的index超出已渲染列表长度，请先通过refreshToPage加载到对应index页并等待渲染成功后再调用此方法！');
        return;
      }
      this.$nextTick(function () {
        if (_this6.finalUseVirtualList) {
          var isCellFixed = _this6.cellHeightMode === _zPagingEnum.default.CellHeightMode.Fixed;
          _zPagingUtils.default.delay(function () {
            if (_this6.finalUseVirtualList) {
              // 虚拟列表 + 每个cell高度完全相同模式下，此时滚动到对应index的cell就是滚动到scrollTop = cellHeight * index的位置
              // 虚拟列表 + 高度是动态非固定的模式下，此时滚动到对应index的cell就是滚动到scrollTop = 缓存的cell高度数组中第index个的lastTotalHeight的位置
              var scrollTop = isCellFixed ? _this6.virtualCellHeight * index : _this6.virtualHeightCacheList[index].lastTotalHeight;
              _this6.scrollToY(scrollTop, offset, animate);
            }
          }, isCellFixed ? 0 : 100);
        }
      });
    },
    // 滚动到指定view(nvue中有效)。view为需要滚动的view(通过`this.$refs.xxx`获取)，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
    scrollIntoViewByView: function scrollIntoViewByView(view, offset, animate) {
      this._scrollIntoView(view, offset, animate);
    },
    // 当使用页面滚动并且自定义下拉刷新时，请在页面的onPageScroll中调用此方法，告知z-paging当前的pageScrollTop，否则会导致在任意位置都可以下拉刷新
    updatePageScrollTop: function updatePageScrollTop(value) {
      this.pageScrollTop = value;
    },
    // 当使用页面滚动并且设置了slot="top"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="top"的view高度动态改变时，在其高度需要更新时调用此方法
    updatePageScrollTopHeight: function updatePageScrollTopHeight() {
      this._updatePageScrollTopOrBottomHeight('top');
    },
    // 当使用页面滚动并且设置了slot="bottom"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="bottom"的view高度动态改变时，在其高度需要更新时调用此方法
    updatePageScrollBottomHeight: function updatePageScrollBottomHeight() {
      this._updatePageScrollTopOrBottomHeight('bottom');
    },
    // 更新slot="left"和slot="right"宽度，当slot="left"或slot="right"宽度动态改变时调用
    updateLeftAndRightWidth: function updateLeftAndRightWidth() {
      var _this7 = this;
      if (!this.finalIsOldWebView) return;
      this.$nextTick(function () {
        return _this7._updateLeftAndRightWidth(_this7.scrollViewContainerStyle, 'zp-page');
      });
    },
    // 更新z-paging内置scroll-view的scrollTop
    updateScrollViewScrollTop: function updateScrollViewScrollTop(scrollTop) {
      var _this8 = this;
      var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this._updatePrivateScrollWithAnimation(animate);
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(function () {
        _this8.scrollTop = scrollTop;
        _this8.oldScrollTop = _this8.scrollTop;
      });
    },
    // 当滚动到顶部时
    _onScrollToUpper: function _onScrollToUpper() {
      var _this9 = this;
      this._emitScrollEvent('scrolltoupper');
      this.$emit('scrollTopChange', 0);
      this.$nextTick(function () {
        _this9.oldScrollTop = 0;
      });
    },
    // 当滚动到底部时
    _onScrollToLower: function _onScrollToLower(e) {
      (!e.detail || !e.detail.direction || e.detail.direction === 'bottom') && this.toBottomLoadingMoreEnabled && this._onLoadingMore(this.useChatRecordMode ? 'click' : 'toBottom');
    },
    // 滚动到顶部
    _scrollToTop: function _scrollToTop() {
      var _this10 = this;
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var isPrivate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (this.usePageScroll) {
        this.$nextTick(function () {
          uni.pageScrollTo({
            scrollTop: 0,
            duration: animate ? 100 : 0
          });
        });
        return;
      }
      this._updatePrivateScrollWithAnimation(animate);
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(function () {
        _this10.scrollTop = 0;
        _this10.oldScrollTop = _this10.scrollTop;
      });
    },
    // 滚动到底部
    _scrollToBottom: function _scrollToBottom() {
      var _arguments = arguments,
        _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var animate, pagingContainerNode, scrollViewNode, pagingContainerH, scrollViewH;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                animate = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : true;
                if (!_this11.usePageScroll) {
                  _context.next = 4;
                  break;
                }
                _this11.$nextTick(function () {
                  uni.pageScrollTo({
                    scrollTop: Number.MAX_VALUE,
                    duration: animate ? 100 : 0
                  });
                });
                return _context.abrupt("return");
              case 4:
                _context.prev = 4;
                _this11._updatePrivateScrollWithAnimation(animate);
                _context.next = 8;
                return _this11._getNodeClientRect('.zp-paging-container');
              case 8:
                pagingContainerNode = _context.sent;
                _context.next = 11;
                return _this11._getNodeClientRect('.zp-scroll-view');
              case 11:
                scrollViewNode = _context.sent;
                pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
                scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
                if (pagingContainerH > scrollViewH) {
                  _this11.scrollTop = _this11.oldScrollTop;
                  _this11.$nextTick(function () {
                    _this11.scrollTop = pagingContainerH - scrollViewH + _this11.virtualPlaceholderTopHeight;
                    _this11.oldScrollTop = _this11.scrollTop;
                  });
                }
                _context.next = 19;
                break;
              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](4);
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 17]]);
      }))();
    },
    // 滚动到指定view
    _scrollIntoView: function _scrollIntoView(sel) {
      var _this12 = this;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var finishCallback = arguments.length > 3 ? arguments[3] : undefined;
      try {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(function () {
          // 获取指定view的节点信息
          _this12._getNodeClientRect('#' + sel.replace('#', ''), false).then(function (node) {
            if (node) {
              // 获取zp-scroll-view-container的节点信息
              _this12._getNodeClientRect('.zp-scroll-view-container').then(function (svContainerNode) {
                if (svContainerNode) {
                  // 滚动的top为指定view的top减zp-scroll-view-container的top，因为指定view的top是相对于整个窗口的，需要考虑相对的位置关系
                  _this12._scrollIntoViewByNodeTop(node[0].top - svContainerNode[0].top, offset, animate);
                  finishCallback && finishCallback();
                }
              });
            } else {
              _zPagingUtils.default.consoleErr("\u65E0\u6CD5\u83B7\u53D6".concat(sel, "\u7684\u8282\u70B9\u4FE1\u606F\uFF0C\u8BF7\u68C0\u67E5\uFF01"));
            }
          });
        });
      } catch (e) {}
    },
    // 通过nodeTop滚动到指定view
    _scrollIntoViewByNodeTop: function _scrollIntoViewByNodeTop(nodeTop) {
      var _this13 = this;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // 如果是聊天记录模式并且列表倒置了，此时nodeTop需要等于scroll-view高度 - nodeTop
      if (this.isChatRecordModeAndInversion) {
        this._getNodeClientRect('.zp-scroll-view').then(function (sNode) {
          if (sNode) {
            _this13._scrollToY(sNode[0].height - nodeTop, offset, animate, true);
          }
        });
      } else {
        this._scrollToY(nodeTop, offset, animate, true);
      }
    },
    // y轴滚动到指定位置
    _scrollToY: function _scrollToY(y) {
      var _this14 = this;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var addScrollTop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this._updatePrivateScrollWithAnimation(animate);
      _zPagingUtils.default.delay(function () {
        if (_this14.usePageScroll) {
          if (addScrollTop && _this14.pageScrollTop !== -1) {
            y += _this14.pageScrollTop;
          }
          var scrollTop = y - offset;
          uni.pageScrollTo({
            scrollTop: scrollTop,
            duration: animate ? 100 : 0
          });
        } else {
          if (addScrollTop) {
            y += _this14.oldScrollTop;
          }
          _this14.scrollTop = y - offset;
        }
      }, 10);
    },
    // x轴滚动到指定位置
    _scrollToX: function _scrollToX(x) {
      var _this15 = this;
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this._updatePrivateScrollWithAnimation(animate);
      _zPagingUtils.default.delay(function () {
        if (!_this15.usePageScroll) {
          _this15.scrollLeft = x - offset;
        } else {
          _zPagingUtils.default.consoleErr('使用页面滚动时不支持scrollToX');
        }
      }, 10);
    },
    // scroll-view滚动中
    _scroll: function _scroll(e) {
      var _this16 = this;
      this.$emit('scroll', e);
      var _e$detail = e.detail,
        scrollTop = _e$detail.scrollTop,
        scrollLeft = _e$detail.scrollLeft,
        scrollHeight = _e$detail.scrollHeight;
      if (this.watchScrollDirectionChange) {
        // 计算scroll-view滚动方向，正常情况下上次滚动的oldScrollTop大于当前scrollTop即为向上滚动，反之为向下滚动
        var direction = this.oldScrollTop > scrollTop ? 'top' : 'bottom';
        // 此处为解决在iOS中，滚动到顶部因bounce的影响回弹导致滚动方向为bottom的问题：如果滚动到顶部了并且scrollTop小于顶部滚动区域，则强制设置direction为top
        // 此外发现在h5中下拉刷新时direction有概率被判断为bottom(oldScrollTop > scrollTop)，因为下拉刷新时会禁止scroll-view滚动，则以此为依据强制设置direction为top
        if (scrollTop <= 0 || !this.scrollEnable) {
          direction = 'top';
        }
        // 此处为解决在iOS中，滚动到底部因bounce的影响回弹导致滚动方向为top的问题：如果滚动到底部了并且scrollTop超过底部滚动区域，则强制设置direction为bottom
        if (scrollTop > this.lastScrollHeight - this.scrollViewHeight - 1 && this.scrollEnable) {
          direction = 'bottom';
        }
        // emit 列表滚动方向改变事件
        if (direction !== this.lastScrollDirection) {
          this.$emit('scrollDirectionChange', direction);
          this.lastScrollDirection = direction;
        }
        // 当scrollHeight变化时，需要延迟100毫秒设置lastScrollHeight，如果直接根据scrollHeight的话，因为此时数据还未改变，会导致滚动方向从bottom变为top
        if (this.lastScrollHeight !== scrollHeight && !this.setContentHeightPending) {
          // 因此处会多次触发，因此加个标识确保在延时期间仅触发一次
          this.setContentHeightPending = true;
          _zPagingUtils.default.delay(function () {
            _this16.lastScrollHeight = scrollHeight;
            _this16.setContentHeightPending = false;
          });
        }
      }
      this.finalUseVirtualList && this._updateVirtualScroll(scrollTop, this.oldScrollTop - scrollTop);
      this.oldScrollTop = scrollTop;
      this.oldScrollLeft = scrollLeft;
      // 滚动区域内容的总高度 - 当前滚动的scrollTop = 当前滚动区域的顶部与内容底部的距离
      var scrollDiff = e.detail.scrollHeight - this.oldScrollTop;
      // 在非ios平台滚动中，再次验证一下是否滚动到了底部。因为在一些安卓设备中，有概率滚动到底部不触发@scrolltolower事件，因此添加双重检测逻辑
      !this.isIos && this._checkScrolledToBottom(scrollDiff);
    },
    // emit scrolltolower/scrolltoupper事件
    _emitScrollEvent: function _emitScrollEvent(type) {
      var reversedType = type === 'scrolltolower' ? 'scrolltoupper' : 'scrolltolower';
      var eventType = this.useChatRecordMode && !this.isChatRecordModeAndNotInversion ? reversedType : type;
      this.$emit(eventType);
    },
    // 更新内置的scroll-view是否启用滚动动画
    _updatePrivateScrollWithAnimation: function _updatePrivateScrollWithAnimation(animate) {
      var _this17 = this;
      this.privateScrollWithAnimation = animate ? 1 : 0;
      _zPagingUtils.default.delay(function () {
        return _this17.$nextTick(function () {
          // 在滚动结束后将滚动动画状态设置回初始状态
          _this17.privateScrollWithAnimation = -1;
        });
      }, 100, 'updateScrollWithAnimationDelay');
    },
    // 检测scrollView是否要铺满屏幕
    _doCheckScrollViewShouldFullHeight: function _doCheckScrollViewShouldFullHeight(totalData) {
      var _this18 = this;
      if (this.autoFullHeight && this.usePageScroll && this.isTotalChangeFromAddData) {
        this.$nextTick(function () {
          _this18._checkScrollViewShouldFullHeight(function (scrollViewNode, pagingContainerNode) {
            _this18._preCheckShowNoMoreInside(totalData, scrollViewNode, pagingContainerNode);
          });
        });
      } else {
        this._preCheckShowNoMoreInside(totalData);
      }
    },
    // 检测z-paging是否要全屏覆盖(当使用页面滚动并且不满全屏时，默认z-paging需要铺满全屏，避免数据过少时内部的empty-view无法正确展示)
    _checkScrollViewShouldFullHeight: function _checkScrollViewShouldFullHeight(callback) {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var scrollViewNode, pagingContainerNode, scrollViewHeight, scrollViewTop;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this19._getNodeClientRect('.zp-scroll-view');
              case 3:
                scrollViewNode = _context2.sent;
                _context2.next = 6;
                return _this19._getNodeClientRect('.zp-paging-container-content');
              case 6:
                pagingContainerNode = _context2.sent;
                if (!(!scrollViewNode || !pagingContainerNode)) {
                  _context2.next = 9;
                  break;
                }
                return _context2.abrupt("return");
              case 9:
                scrollViewHeight = pagingContainerNode[0].height;
                scrollViewTop = scrollViewNode[0].top;
                if (_this19.isAddedData && scrollViewHeight + scrollViewTop <= _this19.windowHeight) {
                  _this19._setAutoHeight(true, scrollViewNode);
                  callback(scrollViewNode, pagingContainerNode);
                } else {
                  _this19._setAutoHeight(false);
                  callback(null, null);
                }
                _context2.next = 17;
                break;
              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](0);
                callback(null, null);
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 14]]);
      }))();
    },
    // 更新缓存中z-paging整个内容容器高度
    _updateCachedSuperContentHeight: function _updateCachedSuperContentHeight() {
      var _this20 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var superContentNode;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this20._getNodeClientRect('.z-paging-content');
              case 2:
                superContentNode = _context3.sent;
                if (superContentNode) {
                  _this20.superContentHeight = superContentNode[0].height;
                }
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // scrollTop改变时触发
    _scrollTopChange: function _scrollTopChange(newVal, isPageScrollTop) {
      this.$emit('scrollTopChange', newVal);
      this.$emit('update:scrollTop', newVal);
      this._checkShouldShowBackToTop(newVal);
      // 之前在安卓中scroll-view有概率滚动到顶部时scrollTop不为0导致下拉刷新判断异常，因此判断scrollTop在105之内都允许下拉刷新，但此方案会导致某些情况（例如滚动到距离顶部10px处）下拉抖动，因此改为通过获取zp-scroll-view的节点信息中的scrollTop进行验证的方案
      // const scrollTop = this.isIos ? (newVal > 5 ? 6 : 0) : (newVal > 105 ? 106 : (newVal > 5 ? 6 : 0));
      var scrollTop = newVal > 5 ? 6 : 0;
      if (isPageScrollTop && this.wxsPageScrollTop !== scrollTop) {
        this.wxsPageScrollTop = scrollTop;
      } else if (!isPageScrollTop && this.wxsScrollTop !== scrollTop) {
        this.wxsScrollTop = scrollTop;
        if (scrollTop > 6) {
          this.scrollEnable = true;
        }
      }
    },
    // 更新使用页面滚动时slot="top"或"bottom"插入view的高度
    _updatePageScrollTopOrBottomHeight: function _updatePageScrollTopOrBottomHeight(type) {
      var _this21 = this;
      if (!this.usePageScroll) return;
      this._doCheckScrollViewShouldFullHeight(this.realTotalData);
      var node = ".zp-page-".concat(type);
      var marginText = "margin".concat(type.slice(0, 1).toUpperCase() + type.slice(1));
      // 是否设置底部安全区域间距，仅当开启底部安全区域并且slot=bottom不存在的时候才处理，如果slot=bottom存在则直接在bottom底部插入占位view
      // 如果useSafeAreaPlaceholder为true，这里也不需要额外通过marginBottom设置底部安全区域了
      var safeAreaInsetBottomAdd = this.safeAreaInsetBottom && !this.zSlots.bottom && !this.useSafeAreaPlaceholder;
      this.$nextTick(function () {
        var delayTime = 0;
        _zPagingUtils.default.delay(function () {
          _this21._getNodeClientRect(node).then(function (res) {
            if (res) {
              var pageScrollNodeHeight = res[0].height;
              if (type === 'bottom') {
                if (safeAreaInsetBottomAdd) {
                  pageScrollNodeHeight += _this21.safeAreaBottom;
                }
              } else {
                _this21.cacheTopHeight = pageScrollNodeHeight;
              }
              _this21.$set(_this21.scrollViewStyle, marginText, "".concat(pageScrollNodeHeight, "px"));
            } else if (safeAreaInsetBottomAdd) {
              _this21.$set(_this21.scrollViewStyle, marginText, "".concat(_this21.safeAreaBottom, "px"));
            }
          });
        }, delayTime);
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 275 */
/*!****************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/back-to-top.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
// [z-paging]点击返回顶部view模块
var _default = {
  props: {
    // 自动显示点击返回顶部按钮，默认为否
    autoShowBackToTop: {
      type: Boolean,
      default: _zPagingUtils.default.gc('autoShowBackToTop', false)
    },
    // 点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px，默认为400rpx
    backToTopThreshold: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('backToTopThreshold', '400rpx')
    },
    // 点击返回顶部按钮的自定义图片地址，默认使用z-paging内置的图片
    backToTopImg: {
      type: String,
      default: _zPagingUtils.default.gc('backToTopImg', '')
    },
    // 点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是
    backToTopWithAnimate: {
      type: Boolean,
      default: _zPagingUtils.default.gc('backToTopWithAnimate', true)
    },
    // 点击返回顶部按钮与底部的距离，注意添加单位px或rpx，默认为160rpx
    backToTopBottom: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('backToTopBottom', '160rpx')
    },
    // 点击返回顶部按钮的自定义样式
    backToTopStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('backToTopStyle', {})
    },
    // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向，默认为是
    enableBackToTop: {
      type: Boolean,
      default: _zPagingUtils.default.gc('enableBackToTop', true)
    }
  },
  data: function data() {
    return {
      // 点击返回顶部的class
      backToTopClass: 'zp-back-to-top zp-back-to-top-hide',
      // 上次点击返回顶部的时间
      lastBackToTopShowTime: 0,
      // 点击返回顶部显示的class是否在展示中，使得按钮展示/隐藏过度效果更自然
      showBackToTopClass: false
    };
  },
  computed: {
    backToTopThresholdUnitConverted: function backToTopThresholdUnitConverted() {
      return _zPagingUtils.default.addUnit(this.backToTopThreshold, this.unit);
    },
    backToTopBottomUnitConverted: function backToTopBottomUnitConverted() {
      return _zPagingUtils.default.addUnit(this.backToTopBottom, this.unit);
    },
    finalEnableBackToTop: function finalEnableBackToTop() {
      return this.usePageScroll ? false : this.enableBackToTop;
    },
    finalBackToTopThreshold: function finalBackToTopThreshold() {
      return _zPagingUtils.default.convertToPx(this.backToTopThresholdUnitConverted);
    },
    finalBackToTopStyle: function finalBackToTopStyle() {
      var backToTopStyle = this.backToTopStyle;
      if (!backToTopStyle.bottom) {
        backToTopStyle.bottom = this.windowBottom + _zPagingUtils.default.convertToPx(this.backToTopBottomUnitConverted) + 'px';
      }
      if (!backToTopStyle.position) {
        backToTopStyle.position = this.usePageScroll ? 'fixed' : 'absolute';
      }
      return backToTopStyle;
    },
    finalBackToTopClass: function finalBackToTopClass() {
      return "".concat(this.backToTopClass, " zp-back-to-top-").concat(this.unit);
    }
  },
  methods: {
    // 点击了返回顶部
    _backToTopClick: function _backToTopClick() {
      var _this = this;
      var callbacked = false;
      this.$emit('backToTopClick', function (toTop) {
        (toTop === undefined || toTop === true) && _this._handleToTop();
        callbacked = true;
      });
      // 如果用户没有禁止默认的返回顶部事件，则触发滚动到顶部
      this.$nextTick(function () {
        !callbacked && _this._handleToTop();
      });
    },
    // 处理滚动到顶部（聊天记录模式中为滚动到底部）
    _handleToTop: function _handleToTop() {
      !this.backToTopWithAnimate && this._checkShouldShowBackToTop(0);
      !this.useChatRecordMode ? this.scrollToTop(this.backToTopWithAnimate) : this.scrollToBottom(this.backToTopWithAnimate);
    },
    // 判断是否要显示返回顶部按钮
    _checkShouldShowBackToTop: function _checkShouldShowBackToTop(scrollTop) {
      var _this2 = this;
      if (!this.autoShowBackToTop) {
        this.showBackToTopClass = false;
        return;
      }
      if (scrollTop > this.finalBackToTopThreshold) {
        if (!this.showBackToTopClass) {
          // 记录当前点击返回顶部按钮显示的class生效了
          this.showBackToTopClass = true;
          this.lastBackToTopShowTime = new Date().getTime();
          // 当滚动到需要展示返回顶部的阈值内，则延迟300毫秒展示返回到顶部按钮
          _zPagingUtils.default.delay(function () {
            _this2.backToTopClass = 'zp-back-to-top zp-back-to-top-show';
          }, 300);
        }
      } else {
        // 如果当前点击返回顶部按钮显示的class是生效状态并且滚动小于触发阈值，则隐藏返回顶部按钮
        if (this.showBackToTopClass) {
          this.backToTopClass = 'zp-back-to-top zp-back-to-top-hide';
          _zPagingUtils.default.delay(function () {
            _this2.showBackToTopClass = false;
          }, new Date().getTime() - this.lastBackToTopShowTime < 500 ? 0 : 300);
        }
      }
    }
  }
};
exports.default = _default;

/***/ }),
/* 276 */
/*!*****************************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/z-paging/components/z-paging/js/modules/virtual-list.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _zPagingUtils = _interopRequireDefault(__webpack_require__(/*! .././z-paging-utils */ 257));
var _zPagingConstant = _interopRequireDefault(__webpack_require__(/*! .././z-paging-constant */ 256));
var _zPagingEnum = _interopRequireDefault(__webpack_require__(/*! .././z-paging-enum */ 261));
// [z-paging]虚拟列表模块
var _default = {
  props: {
    // 是否使用虚拟列表，默认为否
    useVirtualList: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useVirtualList', false)
    },
    // 在使用虚拟列表时，是否使用兼容模式，默认为否
    useCompatibilityMode: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useCompatibilityMode', false)
    },
    // 使用兼容模式时传递的附加数据
    extraData: {
      type: Object,
      default: _zPagingUtils.default.gc('extraData', {})
    },
    // 是否在z-paging内部循环渲染列表(内置列表)，默认为否。若use-virtual-list为true，则此项恒为true
    useInnerList: {
      type: Boolean,
      default: _zPagingUtils.default.gc('useInnerList', false)
    },
    // 强制关闭inner-list，默认为false，如果为true将强制关闭innerList，适用于开启了虚拟列表后需要强制关闭inner-list的情况
    forceCloseInnerList: {
      type: Boolean,
      default: _zPagingUtils.default.gc('forceCloseInnerList', false)
    },
    // 内置列表cell的key名称，仅nvue有效，在nvue中开启use-inner-list时必须填此项
    cellKeyName: {
      type: String,
      default: _zPagingUtils.default.gc('cellKeyName', '')
    },
    // innerList样式
    innerListStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('innerListStyle', {})
    },
    // innerCell样式
    innerCellStyle: {
      type: Object,
      default: _zPagingUtils.default.gc('innerCellStyle', {})
    },
    // 预加载的列表可视范围(列表高度)页数，默认为12，即预加载当前页及上下各12页的cell。此数值越大，则虚拟列表中加载的dom越多，内存消耗越大(会维持在一个稳定值)，但增加预加载页面数量可缓解快速滚动短暂白屏问题
    preloadPage: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('preloadPage', 12),
      validator: function validator(value) {
        if (value <= 0) _zPagingUtils.default.consoleErr('preload-page必须大于0！');
        return value > 0;
      }
    },
    // 虚拟列表cell高度模式，默认为fixed，也就是每个cell高度完全相同，将以第一个cell高度为准进行计算。可选值【dynamic】，即代表高度是动态非固定的，【dynamic】性能低于【fixed】。
    cellHeightMode: {
      type: String,
      default: _zPagingUtils.default.gc('cellHeightMode', _zPagingEnum.default.CellHeightMode.Fixed)
    },
    // 固定的cell高度，cellHeightMode=fixed才有效，若设置了值，则不计算第一个cell高度而使用设置的cell高度
    fixedCellHeight: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('fixedCellHeight', 0)
    },
    // 虚拟列表列数，默认为1。常用于每行有多列的情况，例如每行有2列数据，需要将此值设置为2
    virtualListCol: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('virtualListCol', 1)
    },
    // 虚拟列表scroll取样帧率，默认为80，过低容易出现白屏问题，过高容易出现卡顿问题
    virtualScrollFps: {
      type: [Number, String],
      default: _zPagingUtils.default.gc('virtualScrollFps', 80)
    },
    // 虚拟列表cell id的前缀，适用于一个页面有多个虚拟列表的情况，用以区分不同虚拟列表cell的id，注意：请勿传数字或以数字开头的字符串。如设置为list1，则cell的id应为：list1-zp-id-${item.zp_index}
    virtualCellIdPrefix: {
      type: String,
      default: _zPagingUtils.default.gc('virtualCellIdPrefix', '')
    },
    // 虚拟列表是否使用swiper-item包裹，默认为否，此属性为了解决vue3+(微信小程序或QQ小程序)中，使用非内置列表写法时，若z-paging在swiper-item内存在无法获取slot插入的cell高度进而导致虚拟列表失败的问题
    // 仅vue3+(微信小程序或QQ小程序)+非内置列表写法虚拟列表有效，其他情况此属性设置任何值都无效，所以如果您在swiper-item内使用z-paging的非内置虚拟列表写法，将此属性设置为true即可
    virtualInSwiperSlot: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      virtualListKey: _zPagingUtils.default.getInstanceId(),
      virtualCellHeight: 0,
      virtualScrollTimeStamp: 0,
      virtualList: [],
      virtualPlaceholderTopHeight: 0,
      virtualPlaceholderBottomHeight: 0,
      virtualTopRangeIndex: 0,
      virtualBottomRangeIndex: 0,
      lastVirtualTopRangeIndex: 0,
      lastVirtualBottomRangeIndex: 0,
      virtualItemInsertedCount: 0,
      virtualHeightCacheList: [],
      getCellHeightRetryCount: {
        fixed: 0,
        dynamic: 0
      },
      updateVirtualListFromDataChange: false
    };
  },
  watch: {
    // 监听总数据的改变，刷新虚拟列表布局
    realTotalData: function realTotalData() {
      this.updateVirtualListRender();
    },
    // 监听虚拟列表渲染数组的改变并emit
    virtualList: function virtualList(newVal) {
      this.$emit('update:virtualList', newVal);
      this.$emit('virtualListChange', newVal);
    },
    // 监听虚拟列表顶部占位高度改变并emit
    virtualPlaceholderTopHeight: function virtualPlaceholderTopHeight(newVal) {
      this.$emit('virtualTopHeightChange', newVal);
    }
  },
  computed: {
    virtualCellIndexKey: function virtualCellIndexKey() {
      return _zPagingConstant.default.listCellIndexKey;
    },
    finalUseVirtualList: function finalUseVirtualList() {
      if (this.useVirtualList && this.usePageScroll) {
        _zPagingUtils.default.consoleErr('使用页面滚动时，开启虚拟列表无效！');
      }
      return this.useVirtualList && !this.usePageScroll;
    },
    finalUseInnerList: function finalUseInnerList() {
      return this.useInnerList || this.finalUseVirtualList && !this.forceCloseInnerList;
    },
    finalCellKeyName: function finalCellKeyName() {
      return this.cellKeyName;
    },
    finalVirtualPageHeight: function finalVirtualPageHeight() {
      return this.scrollViewHeight > 0 ? this.scrollViewHeight : this.windowHeight;
    },
    finalFixedCellHeight: function finalFixedCellHeight() {
      return _zPagingUtils.default.convertToPx(this.fixedCellHeight);
    },
    fianlVirtualCellIdPrefix: function fianlVirtualCellIdPrefix() {
      var prefix = this.virtualCellIdPrefix ? this.virtualCellIdPrefix + '-' : '';
      return prefix + 'zp-id';
    },
    finalPlaceholderTopHeightStyle: function finalPlaceholderTopHeightStyle() {
      return {
        transform: this.virtualPlaceholderTopHeight > 0 ? "translateY(".concat(this.virtualPlaceholderTopHeight, "px)") : 'none'
      };
      return {};
    },
    virtualRangePageHeight: function virtualRangePageHeight() {
      return this.finalVirtualPageHeight * this.preloadPage;
    },
    virtualScrollDisTimeStamp: function virtualScrollDisTimeStamp() {
      return 1000 / this.virtualScrollFps;
    }
  },
  methods: {
    // 在使用动态高度虚拟列表时，若在列表数组中需要插入某个item，需要调用此方法；item:需要插入的item，index:插入的cell位置，若index为2，则插入的item在原list的index=1之后，index从0开始
    doInsertVirtualListItem: function doInsertVirtualListItem(item, index) {
      var _this = this;
      if (this.cellHeightMode !== _zPagingEnum.default.CellHeightMode.Dynamic) return;
      this.realTotalData.splice(index, 0, item);
      this.virtualItemInsertedCount++;
      if (!item || Object.prototype.toString.call(item) !== '[object Object]') {
        item = {
          item: item
        };
      }
      var cellIndexKey = this.virtualCellIndexKey;
      item[cellIndexKey] = "custom-".concat(this.virtualItemInsertedCount);
      item[_zPagingConstant.default.listCellIndexUniqueKey] = "".concat(this.virtualListKey, "-").concat(item[cellIndexKey]);
      this.$nextTick( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var retryCount, cellNode, currentHeight, lastHeightCache, lastTotalHeight, i, thisNode;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                retryCount = 0;
              case 1:
                if (!(retryCount <= 10)) {
                  _context.next = 19;
                  break;
                }
                _context.next = 4;
                return _zPagingUtils.default.wait(_zPagingConstant.default.delayTime);
              case 4:
                _context.next = 6;
                return _this._getVirtualCellNodeByIndex(item[cellIndexKey]);
              case 6:
                cellNode = _context.sent;
                if (cellNode) {
                  _context.next = 10;
                  break;
                }
                retryCount++;
                return _context.abrupt("continue", 1);
              case 10:
                currentHeight = cellNode ? cellNode[0].height : 0;
                lastHeightCache = _this.virtualHeightCacheList[index - 1];
                lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0; // 在缓存的cell高度数组中，插入此cell高度信息
                _this.virtualHeightCacheList.splice(index, 0, {
                  height: currentHeight,
                  lastTotalHeight: lastTotalHeight,
                  totalHeight: lastTotalHeight + currentHeight
                });

                // 从当前index起后续的cell缓存高度的lastTotalHeight和totalHeight需要加上当前cell的高度
                for (i = index + 1; i < _this.virtualHeightCacheList.length; i++) {
                  thisNode = _this.virtualHeightCacheList[i];
                  thisNode.lastTotalHeight += currentHeight;
                  thisNode.totalHeight += currentHeight;
                }
                _this._updateVirtualScroll(_this.oldScrollTop);
                return _context.abrupt("break", 19);
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    },
    // 在使用动态高度虚拟列表时，手动更新指定cell的缓存高度(当cell高度在初始化之后再次改变后调用)；index:需要更新的cell在列表中的位置，从0开始
    didUpdateVirtualListCell: function didUpdateVirtualListCell(index) {
      var _this2 = this;
      if (this.cellHeightMode !== _zPagingEnum.default.CellHeightMode.Dynamic) return;
      var currentNode = this.virtualHeightCacheList[index];
      this.$nextTick(function () {
        _this2._getVirtualCellNodeByIndex(index).then(function (cellNode) {
          // 更新当前cell的高度
          var cellNodeHeight = cellNode ? cellNode[0].height : 0;
          var heightDis = cellNodeHeight - currentNode.height;
          currentNode.height = cellNodeHeight;
          currentNode.totalHeight = currentNode.lastTotalHeight + cellNodeHeight;

          // 从当前index起后续的cell缓存高度的lastTotalHeight和totalHeight需要加上当前cell变化的高度
          for (var i = index + 1; i < _this2.virtualHeightCacheList.length; i++) {
            var thisNode = _this2.virtualHeightCacheList[i];
            thisNode.totalHeight += heightDis;
            thisNode.lastTotalHeight += heightDis;
          }
        });
      });
    },
    // 在使用动态高度虚拟列表时，若删除了列表数组中的某个item，需要调用此方法以更新高度缓存数组；index:删除的cell在列表中的位置，从0开始
    didDeleteVirtualListCell: function didDeleteVirtualListCell(index) {
      if (this.cellHeightMode !== _zPagingEnum.default.CellHeightMode.Dynamic) return;
      var currentNode = this.virtualHeightCacheList[index];
      // 从当前index起后续的cell缓存高度的lastTotalHeight和totalHeight需要减去当前cell的高度
      for (var i = index + 1; i < this.virtualHeightCacheList.length; i++) {
        var thisNode = this.virtualHeightCacheList[i];
        thisNode.totalHeight -= currentNode.height;
        thisNode.lastTotalHeight -= currentNode.height;
      }
      // 将当前cell的高度信息从高度缓存数组中删除
      this.virtualHeightCacheList.splice(index, 1);
    },
    // 手动触发虚拟列表渲染更新，可用于解决例如修改了虚拟列表数组中元素，但展示未更新的情况
    updateVirtualListRender: function updateVirtualListRender() {
      var _this3 = this;
      if (this.finalUseVirtualList) {
        this.updateVirtualListFromDataChange = true;
        this.$nextTick(function () {
          _this3.getCellHeightRetryCount.fixed = 0;
          if (_this3.realTotalData.length) {
            _this3.cellHeightMode === _zPagingEnum.default.CellHeightMode.Fixed && _this3.isFirstPage && _this3._updateFixedCellHeight();
          } else {
            _this3._resetDynamicListState(!_this3.isUserPullDown);
          }
          _this3._updateVirtualScroll(_this3.oldScrollTop);
        });
      }
    },
    // cellHeightMode为fixed时获取第一个cell高度
    _updateFixedCellHeight: function _updateFixedCellHeight() {
      var _this4 = this;
      if (!this.finalFixedCellHeight) {
        this.$nextTick(function () {
          _zPagingUtils.default.delay(function () {
            _this4._getVirtualCellNodeByIndex(0).then(function (cellNode) {
              if (!cellNode) {
                if (_this4.getCellHeightRetryCount.fixed > 10) return;
                _this4.getCellHeightRetryCount.fixed++;
                // 如果获取第一个cell的节点信息失败，则重试（不超过10次）
                _this4._updateFixedCellHeight();
              } else {
                _this4.virtualCellHeight = cellNode[0].height;
                _this4._updateVirtualScroll(_this4.oldScrollTop);
              }
            });
          }, _zPagingConstant.default.delayTime, 'updateFixedCellHeightDelay');
        });
      } else {
        this.virtualCellHeight = this.finalFixedCellHeight;
      }
    },
    // cellHeightMode为dynamic时获取每个cell高度
    _updateDynamicCellHeight: function _updateDynamicCellHeight(list) {
      var _this5 = this;
      var dataFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bottom';
      var dataFromTop = dataFrom === 'top';
      var heightCacheList = this.virtualHeightCacheList;
      var currentCacheList = dataFromTop ? [] : heightCacheList;
      var listTotalHeight = 0;
      this.$nextTick(function () {
        _zPagingUtils.default.delay( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
          var i, cellNode, currentHeight, lastHeightCache, lastTotalHeight, _i, heightCacheItem;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  i = 0;
                case 1:
                  if (!(i < list.length)) {
                    _context2.next = 16;
                    break;
                  }
                  _context2.next = 4;
                  return _this5._getVirtualCellNodeByIndex(list[i][_this5.virtualCellIndexKey]);
                case 4:
                  cellNode = _context2.sent;
                  currentHeight = cellNode ? cellNode[0].height : 0;
                  if (cellNode) {
                    _context2.next = 9;
                    break;
                  }
                  if (_this5.getCellHeightRetryCount.dynamic <= 10) {
                    heightCacheList.splice(heightCacheList.length - i, i);
                    _this5.getCellHeightRetryCount.dynamic++;
                    // 如果获取当前cell的节点信息失败，则重试（不超过10次）
                    _this5._updateDynamicCellHeight(list, dataFrom);
                  }
                  return _context2.abrupt("return");
                case 9:
                  lastHeightCache = currentCacheList.length ? currentCacheList.slice(-1)[0] : null;
                  lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0; // 缓存当前cell的高度信息：height-当前cell高度；lastTotalHeight-前面所有cell的高度总和；totalHeight-包含当前cell的所有高度总和
                  currentCacheList.push({
                    height: currentHeight,
                    lastTotalHeight: lastTotalHeight,
                    totalHeight: lastTotalHeight + currentHeight
                  });
                  if (dataFromTop) {
                    listTotalHeight += currentHeight;
                  }
                case 13:
                  i++;
                  _context2.next = 1;
                  break;
                case 16:
                  // 如果数据是从顶部拼接的
                  if (dataFromTop && list.length) {
                    for (_i = 0; _i < heightCacheList.length; _i++) {
                      // 更新之前所有项的缓存高度，需要加上此次插入的所有cell高度之和（因为是从顶部插入的cell）
                      heightCacheItem = heightCacheList[_i];
                      heightCacheItem.lastTotalHeight += listTotalHeight;
                      heightCacheItem.totalHeight += listTotalHeight;
                    }
                    _this5.virtualHeightCacheList = currentCacheList.concat(heightCacheList);
                  }
                  _this5._updateVirtualScroll(_this5.oldScrollTop);
                case 18:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })), _zPagingConstant.default.delayTime, 'updateDynamicCellHeightDelay');
      });
    },
    // 设置cellItem的index
    _setCellIndex: function _setCellIndex(list) {
      var dataFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bottom';
      var currentItemIndex = 0;
      var cellIndexKey = this.virtualCellIndexKey;
      dataFrom === 'bottom' && [_zPagingEnum.default.QueryFrom.Refresh, _zPagingEnum.default.QueryFrom.Reload].indexOf(this.queryFrom) >= 0 && this._resetDynamicListState();
      if (this.totalData.length && this.queryFrom !== _zPagingEnum.default.QueryFrom.Refresh) {
        if (dataFrom === 'bottom') {
          currentItemIndex = this.realTotalData.length;
          var lastItem = this.realTotalData.length ? this.realTotalData.slice(-1)[0] : null;
          if (lastItem && lastItem[cellIndexKey] !== undefined) {
            currentItemIndex = lastItem[cellIndexKey] + 1;
          }
        } else if (dataFrom === 'top') {
          var firstItem = this.realTotalData.length ? this.realTotalData[0] : null;
          if (firstItem && firstItem[cellIndexKey] !== undefined) {
            currentItemIndex = firstItem[cellIndexKey] - list.length;
          }
        }
      } else {
        this._resetDynamicListState();
      }
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (!item || Object.prototype.toString.call(item) !== '[object Object]') {
          item = {
            item: item
          };
        }
        if (item[_zPagingConstant.default.listCellIndexUniqueKey]) {
          item = _zPagingUtils.default.deepCopy(item);
        }
        item[cellIndexKey] = currentItemIndex + i;
        item[_zPagingConstant.default.listCellIndexUniqueKey] = "".concat(this.virtualListKey, "-").concat(item[cellIndexKey]);
        list[i] = item;
      }
      this.getCellHeightRetryCount.dynamic = 0;
      this.cellHeightMode === _zPagingEnum.default.CellHeightMode.Dynamic && this._updateDynamicCellHeight(list, dataFrom);
    },
    // 更新scroll滚动（虚拟列表滚动时触发）
    _updateVirtualScroll: function _updateVirtualScroll(scrollTop) {
      var scrollDiff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var currentTimeStamp = _zPagingUtils.default.getTime();
      scrollTop === 0 && this._resetTopRange();
      if (scrollTop !== 0 && this.virtualScrollTimeStamp && currentTimeStamp - this.virtualScrollTimeStamp <= this.virtualScrollDisTimeStamp) {
        return;
      }
      this.virtualScrollTimeStamp = currentTimeStamp;
      var scrollIndex = 0;
      var cellHeightMode = this.cellHeightMode;
      if (cellHeightMode === _zPagingEnum.default.CellHeightMode.Fixed) {
        // 如果是固定高度的虚拟列表
        // 计算当前滚动到的cell的index = scrollTop / 虚拟列表cell的固定高度
        scrollIndex = parseInt(scrollTop / this.virtualCellHeight) || 0;
        // 更新顶部和底部占位view的高度（为兼容考虑，顶部采用transformY的方式占位)
        this._updateFixedTopRangeIndex(scrollIndex);
        this._updateFixedBottomRangeIndex(scrollIndex);
      } else if (cellHeightMode === _zPagingEnum.default.CellHeightMode.Dynamic) {
        // 如果是不固定高度的虚拟列表
        // 当前滚动的方向
        var scrollDirection = scrollDiff > 0 ? 'top' : 'bottom';
        // 视图区域的高度
        var rangePageHeight = this.virtualRangePageHeight;
        // 顶部视图区域外的高度（顶部不需要渲染而是需要占位部分的高度）
        var topRangePageOffset = scrollTop - rangePageHeight;
        // 底部视图区域外的高度（底部不需要渲染而是需要占位部分的高度）
        var bottomRangePageOffset = scrollTop + this.finalVirtualPageHeight + rangePageHeight;
        var virtualBottomRangeIndex = 0;
        var virtualPlaceholderBottomHeight = 0;
        var reachedLimitBottom = false;
        var heightCacheList = this.virtualHeightCacheList;
        var lastHeightCache = !!heightCacheList ? heightCacheList.slice(-1)[0] : null;
        var startTopRangeIndex = this.virtualTopRangeIndex;
        // 如果是向底部滚动（顶部占位的高度不断增大，顶部的实际渲染cell数量不断减少）
        if (scrollDirection === 'bottom') {
          // 从顶部视图边缘的cell的位置开始向后查找
          for (var i = startTopRangeIndex; i < heightCacheList.length; i++) {
            var heightCacheItem = heightCacheList[i];
            // 如果查找到某个cell对应的totalHeight大于顶部视图区域外的高度，则此cell为顶部视图边缘的cell
            if (heightCacheItem && heightCacheItem.totalHeight > topRangePageOffset) {
              // 记录顶部视图边缘cell的index并更新顶部占位区域的高度并停止继续查找
              this.virtualTopRangeIndex = i;
              this.virtualPlaceholderTopHeight = heightCacheItem.lastTotalHeight;
              break;
            }
          }
        } else {
          // 如果是向顶部滚动（顶部占位的高度不断减少，顶部的实际渲染cell数量不断增加）
          var topRangeMatched = false;
          // 从顶部视图边缘的cell的位置开始向前查找
          for (var _i2 = startTopRangeIndex; _i2 >= 0; _i2--) {
            var _heightCacheItem = heightCacheList[_i2];
            // 如果查找到某个cell对应的totalHeight小于顶部视图区域外的高度，则此cell为顶部视图边缘的cell
            if (_heightCacheItem && _heightCacheItem.totalHeight < topRangePageOffset) {
              // 记录顶部视图边缘cell的index并更新顶部占位区域的高度并停止继续查找
              this.virtualTopRangeIndex = _i2;
              this.virtualPlaceholderTopHeight = _heightCacheItem.lastTotalHeight;
              topRangeMatched = true;
              break;
            }
          }
          // 如果查找不到，则认为顶部占位高度为0了，顶部cell不需要继续复用，重置topRangeIndex和placeholderTopHeight
          !topRangeMatched && this._resetTopRange();
        }
        // 从顶部视图边缘的cell的位置开始向后查找
        for (var _i3 = this.virtualTopRangeIndex; _i3 < heightCacheList.length; _i3++) {
          var _heightCacheItem2 = heightCacheList[_i3];
          // 如果查找到某个cell对应的totalHeight大于底部视图区域外的高度，则此cell为底部视图边缘的cell
          if (_heightCacheItem2 && _heightCacheItem2.totalHeight > bottomRangePageOffset) {
            // 记录底部视图边缘cell的index并更新底部占位区域的高度并停止继续查找
            virtualBottomRangeIndex = _i3;
            virtualPlaceholderBottomHeight = lastHeightCache.totalHeight - _heightCacheItem2.totalHeight;
            reachedLimitBottom = true;
            break;
          }
        }
        if (!reachedLimitBottom || this.virtualBottomRangeIndex === 0) {
          this.virtualBottomRangeIndex = this.realTotalData.length ? this.realTotalData.length - 1 : this.pageSize;
          this.virtualPlaceholderBottomHeight = 0;
        } else {
          this.virtualBottomRangeIndex = virtualBottomRangeIndex;
          this.virtualPlaceholderBottomHeight = virtualPlaceholderBottomHeight;
        }
        this._updateVirtualList();
      }
    },
    // 更新fixedCell模式下topRangeIndex&placeholderTopHeight
    _updateFixedTopRangeIndex: function _updateFixedTopRangeIndex(scrollIndex) {
      var virtualTopRangeIndex = this.virtualCellHeight === 0 ? 0 : scrollIndex - (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * this.preloadPage;
      virtualTopRangeIndex *= this.virtualListCol;
      virtualTopRangeIndex = Math.max(0, virtualTopRangeIndex);
      this.virtualTopRangeIndex = virtualTopRangeIndex;
      this.virtualPlaceholderTopHeight = virtualTopRangeIndex / this.virtualListCol * this.virtualCellHeight;
    },
    // 更新fixedCell模式下bottomRangeIndex&placeholderBottomHeight
    _updateFixedBottomRangeIndex: function _updateFixedBottomRangeIndex(scrollIndex) {
      var virtualBottomRangeIndex = this.virtualCellHeight === 0 ? this.pageSize : scrollIndex + (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * (this.preloadPage + 1);
      virtualBottomRangeIndex *= this.virtualListCol;
      virtualBottomRangeIndex = Math.min(this.realTotalData.length, virtualBottomRangeIndex);
      this.virtualBottomRangeIndex = virtualBottomRangeIndex;
      this.virtualPlaceholderBottomHeight = (this.realTotalData.length - virtualBottomRangeIndex) * this.virtualCellHeight / this.virtualListCol;
      this._updateVirtualList();
    },
    // 更新virtualList
    _updateVirtualList: function _updateVirtualList() {
      var shouldUpdateList = this.updateVirtualListFromDataChange || this.lastVirtualTopRangeIndex !== this.virtualTopRangeIndex || this.lastVirtualBottomRangeIndex !== this.virtualBottomRangeIndex;
      if (shouldUpdateList) {
        this.updateVirtualListFromDataChange = false;
        this.lastVirtualTopRangeIndex = this.virtualTopRangeIndex;
        this.lastVirtualBottomRangeIndex = this.virtualBottomRangeIndex;
        this.virtualList = this.realTotalData.slice(this.virtualTopRangeIndex, this.virtualBottomRangeIndex + 1);
      }
    },
    // 重置动态cell模式下的高度缓存数据、虚拟列表和滚动状态
    _resetDynamicListState: function _resetDynamicListState() {
      var resetVirtualList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.virtualHeightCacheList = [];
      if (resetVirtualList) {
        this.virtualList = [];
      }
      this.virtualTopRangeIndex = 0;
      this.virtualPlaceholderTopHeight = 0;
    },
    // 重置topRangeIndex和placeholderTopHeight
    _resetTopRange: function _resetTopRange() {
      this.virtualTopRangeIndex = 0;
      this.virtualPlaceholderTopHeight = 0;
      this._updateVirtualList();
    },
    // 检测虚拟列表当前滚动位置，如发现滚动位置不正确则重新计算虚拟列表相关参数(为解决在App中可能出现的长时间进入后台后打开App白屏的问题)
    _checkVirtualListScroll: function _checkVirtualListScroll() {
      var _this6 = this;
      if (this.finalUseVirtualList) {
        this.$nextTick(function () {
          _this6._getNodeClientRect('.zp-paging-touch-view').then(function (node) {
            var currentTop = node ? node[0].top : 0;
            if (!node || currentTop === _this6.pagingOrgTop && _this6.virtualPlaceholderTopHeight !== 0) {
              _this6._updateVirtualScroll(0);
            }
          });
        });
      }
    },
    // 获取对应index的虚拟列表cell节点信息
    _getVirtualCellNodeByIndex: function _getVirtualCellNodeByIndex(index) {
      var inDom = this.finalUseInnerList;
      // 在vue3+(微信小程序或QQ小程序)中，使用非内置列表写法时，若z-paging在swiper-item内存在无法获取slot插入的cell高度的问题
      // 通过uni.createSelectorQuery().in(this.$parent)来解决此问题

      return this._getNodeClientRect("#".concat(this.fianlVirtualCellIdPrefix, "-").concat(index), inDom);
    },
    // 处理使用内置列表时点击了cell事件
    _innerCellClick: function _innerCellClick(item, index) {
      this.$emit('innerCellClick', item, index);
    }
  }
};
exports.default = _default;

/***/ }),
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */
/*!***************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/mixin/button.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
};
exports.default = _default;

/***/ }),
/* 287 */
/*!*****************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/libs/mixin/openType.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo: function onGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    onContact: function onContact(event) {
      this.$emit('contact', event.detail);
    },
    onGetPhoneNumber: function onGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    onError: function onError(event) {
      this.$emit('error', event.detail);
    },
    onLaunchApp: function onLaunchApp(event) {
      this.$emit('launchapp', event.detail);
    },
    onOpenSetting: function onOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    }
  }
};
exports.default = _default;

/***/ }),
/* 288 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-button/props.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-16 10:04:04
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-16 10:04:24
 * @FilePath     : /u-view2.0/uview-ui/components/u-button/props.js
 */
var _default = {
  props: {
    // 是否细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.button.hairline
    },
    // 按钮的预置样式，info，primary，error，warning，success
    type: {
      type: String,
      default: uni.$u.props.button.type
    },
    // 按钮尺寸，large，normal，small，mini
    size: {
      type: String,
      default: uni.$u.props.button.size
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: uni.$u.props.button.shape
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: uni.$u.props.button.plain
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: uni.$u.props.button.disabled
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.button.loading
    },
    // 加载中提示文字
    loadingText: {
      type: [String, Number],
      default: uni.$u.props.button.loadingText
    },
    // 加载状态图标类型
    loadingMode: {
      type: String,
      default: uni.$u.props.button.loadingMode
    },
    // 加载图标大小
    loadingSize: {
      type: [String, Number],
      default: uni.$u.props.button.loadingSize
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: uni.$u.props.button.openType
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: uni.$u.props.button.formType
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: uni.$u.props.button.appParameter
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: uni.$u.props.button.hoverStopPropagation
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: uni.$u.props.button.lang
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: uni.$u.props.button.sessionFrom
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: uni.$u.props.button.sendMessageTitle
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: uni.$u.props.button.sendMessagePath
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: uni.$u.props.button.sendMessageImg
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: uni.$u.props.button.showMessageCard
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: uni.$u.props.button.dataName
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: uni.$u.props.button.throttleTime
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStartTime
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStayTime
    },
    // 按钮文字，之所以通过props传入，是因为slot传入的话
    // nvue中无法控制文字的样式
    text: {
      type: [String, Number],
      default: uni.$u.props.button.text
    },
    // 按钮图标
    icon: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮图标
    iconColor: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮颜色，支持传入linear-gradient渐变色
    color: {
      type: String,
      default: uni.$u.props.button.color
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-safe-bottom/props.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {}
};
exports.default = _default;

/***/ }),
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-icon/icons.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'uicon-level': "\uE693",
  'uicon-column-line': "\uE68E",
  'uicon-checkbox-mark': "\uE807",
  'uicon-folder': "\uE7F5",
  'uicon-movie': "\uE7F6",
  'uicon-star-fill': "\uE669",
  'uicon-star': "\uE65F",
  'uicon-phone-fill': "\uE64F",
  'uicon-phone': "\uE622",
  'uicon-apple-fill': "\uE881",
  'uicon-chrome-circle-fill': "\uE885",
  'uicon-backspace': "\uE67B",
  'uicon-attach': "\uE632",
  'uicon-cut': "\uE948",
  'uicon-empty-car': "\uE602",
  'uicon-empty-coupon': "\uE682",
  'uicon-empty-address': "\uE646",
  'uicon-empty-favor': "\uE67C",
  'uicon-empty-permission': "\uE686",
  'uicon-empty-news': "\uE687",
  'uicon-empty-search': "\uE664",
  'uicon-github-circle-fill': "\uE887",
  'uicon-rmb': "\uE608",
  'uicon-person-delete-fill': "\uE66A",
  'uicon-reload': "\uE788",
  'uicon-order': "\uE68F",
  'uicon-server-man': "\uE6BC",
  'uicon-search': "\uE62A",
  'uicon-fingerprint': "\uE955",
  'uicon-more-dot-fill': "\uE630",
  'uicon-scan': "\uE662",
  'uicon-share-square': "\uE60B",
  'uicon-map': "\uE61D",
  'uicon-map-fill': "\uE64E",
  'uicon-tags': "\uE629",
  'uicon-tags-fill': "\uE651",
  'uicon-bookmark-fill': "\uE63B",
  'uicon-bookmark': "\uE60A",
  'uicon-eye': "\uE613",
  'uicon-eye-fill': "\uE641",
  'uicon-mic': "\uE64A",
  'uicon-mic-off': "\uE649",
  'uicon-calendar': "\uE66E",
  'uicon-calendar-fill': "\uE634",
  'uicon-trash': "\uE623",
  'uicon-trash-fill': "\uE658",
  'uicon-play-left': "\uE66D",
  'uicon-play-right': "\uE610",
  'uicon-minus': "\uE618",
  'uicon-plus': "\uE62D",
  'uicon-info': "\uE653",
  'uicon-info-circle': "\uE7D2",
  'uicon-info-circle-fill': "\uE64B",
  'uicon-question': "\uE715",
  'uicon-error': "\uE6D3",
  'uicon-close': "\uE685",
  'uicon-checkmark': "\uE6A8",
  'uicon-android-circle-fill': "\uE67E",
  'uicon-android-fill': "\uE67D",
  'uicon-ie': "\uE87B",
  'uicon-IE-circle-fill': "\uE889",
  'uicon-google': "\uE87A",
  'uicon-google-circle-fill': "\uE88A",
  'uicon-setting-fill': "\uE872",
  'uicon-setting': "\uE61F",
  'uicon-minus-square-fill': "\uE855",
  'uicon-plus-square-fill': "\uE856",
  'uicon-heart': "\uE7DF",
  'uicon-heart-fill': "\uE851",
  'uicon-camera': "\uE7D7",
  'uicon-camera-fill': "\uE870",
  'uicon-more-circle': "\uE63E",
  'uicon-more-circle-fill': "\uE645",
  'uicon-chat': "\uE620",
  'uicon-chat-fill': "\uE61E",
  'uicon-bag-fill': "\uE617",
  'uicon-bag': "\uE619",
  'uicon-error-circle-fill': "\uE62C",
  'uicon-error-circle': "\uE624",
  'uicon-close-circle': "\uE63F",
  'uicon-close-circle-fill': "\uE637",
  'uicon-checkmark-circle': "\uE63D",
  'uicon-checkmark-circle-fill': "\uE635",
  'uicon-question-circle-fill': "\uE666",
  'uicon-question-circle': "\uE625",
  'uicon-share': "\uE631",
  'uicon-share-fill': "\uE65E",
  'uicon-shopping-cart': "\uE621",
  'uicon-shopping-cart-fill': "\uE65D",
  'uicon-bell': "\uE609",
  'uicon-bell-fill': "\uE640",
  'uicon-list': "\uE650",
  'uicon-list-dot': "\uE616",
  'uicon-zhihu': "\uE6BA",
  'uicon-zhihu-circle-fill': "\uE709",
  'uicon-zhifubao': "\uE6B9",
  'uicon-zhifubao-circle-fill': "\uE6B8",
  'uicon-weixin-circle-fill': "\uE6B1",
  'uicon-weixin-fill': "\uE6B2",
  'uicon-twitter-circle-fill': "\uE6AB",
  'uicon-twitter': "\uE6AA",
  'uicon-taobao-circle-fill': "\uE6A7",
  'uicon-taobao': "\uE6A6",
  'uicon-weibo-circle-fill': "\uE6A5",
  'uicon-weibo': "\uE6A4",
  'uicon-qq-fill': "\uE6A1",
  'uicon-qq-circle-fill': "\uE6A0",
  'uicon-moments-circel-fill': "\uE69A",
  'uicon-moments': "\uE69B",
  'uicon-qzone': "\uE695",
  'uicon-qzone-circle-fill': "\uE696",
  'uicon-baidu-circle-fill': "\uE680",
  'uicon-baidu': "\uE681",
  'uicon-facebook-circle-fill': "\uE68A",
  'uicon-facebook': "\uE689",
  'uicon-car': "\uE60C",
  'uicon-car-fill': "\uE636",
  'uicon-warning-fill': "\uE64D",
  'uicon-warning': "\uE694",
  'uicon-clock-fill': "\uE638",
  'uicon-clock': "\uE60F",
  'uicon-edit-pen': "\uE612",
  'uicon-edit-pen-fill': "\uE66B",
  'uicon-email': "\uE611",
  'uicon-email-fill': "\uE642",
  'uicon-minus-circle': "\uE61B",
  'uicon-minus-circle-fill': "\uE652",
  'uicon-plus-circle': "\uE62E",
  'uicon-plus-circle-fill': "\uE661",
  'uicon-file-text': "\uE663",
  'uicon-file-text-fill': "\uE665",
  'uicon-pushpin': "\uE7E3",
  'uicon-pushpin-fill': "\uE86E",
  'uicon-grid': "\uE673",
  'uicon-grid-fill': "\uE678",
  'uicon-play-circle': "\uE647",
  'uicon-play-circle-fill': "\uE655",
  'uicon-pause-circle-fill': "\uE654",
  'uicon-pause': "\uE8FA",
  'uicon-pause-circle': "\uE643",
  'uicon-eye-off': "\uE648",
  'uicon-eye-off-outline': "\uE62B",
  'uicon-gift-fill': "\uE65C",
  'uicon-gift': "\uE65B",
  'uicon-rmb-circle-fill': "\uE657",
  'uicon-rmb-circle': "\uE677",
  'uicon-kefu-ermai': "\uE656",
  'uicon-server-fill': "\uE751",
  'uicon-coupon-fill': "\uE8C4",
  'uicon-coupon': "\uE8AE",
  'uicon-integral': "\uE704",
  'uicon-integral-fill': "\uE703",
  'uicon-home-fill': "\uE964",
  'uicon-home': "\uE965",
  'uicon-hourglass-half-fill': "\uE966",
  'uicon-hourglass': "\uE967",
  'uicon-account': "\uE628",
  'uicon-plus-people-fill': "\uE626",
  'uicon-minus-people-fill': "\uE615",
  'uicon-account-fill': "\uE614",
  'uicon-thumb-down-fill': "\uE726",
  'uicon-thumb-down': "\uE727",
  'uicon-thumb-up': "\uE733",
  'uicon-thumb-up-fill': "\uE72F",
  'uicon-lock-fill': "\uE979",
  'uicon-lock-open': "\uE973",
  'uicon-lock-opened-fill': "\uE974",
  'uicon-lock': "\uE97A",
  'uicon-red-packet-fill': "\uE690",
  'uicon-photo-fill': "\uE98B",
  'uicon-photo': "\uE98D",
  'uicon-volume-off-fill': "\uE659",
  'uicon-volume-off': "\uE644",
  'uicon-volume-fill': "\uE670",
  'uicon-volume': "\uE633",
  'uicon-red-packet': "\uE691",
  'uicon-download': "\uE63C",
  'uicon-arrow-up-fill': "\uE6B0",
  'uicon-arrow-down-fill': "\uE600",
  'uicon-play-left-fill': "\uE675",
  'uicon-play-right-fill': "\uE676",
  'uicon-rewind-left-fill': "\uE679",
  'uicon-rewind-right-fill': "\uE67A",
  'uicon-arrow-downward': "\uE604",
  'uicon-arrow-leftward': "\uE601",
  'uicon-arrow-rightward': "\uE603",
  'uicon-arrow-upward': "\uE607",
  'uicon-arrow-down': "\uE60D",
  'uicon-arrow-right': "\uE605",
  'uicon-arrow-left': "\uE60E",
  'uicon-arrow-up': "\uE606",
  'uicon-skip-back-left': "\uE674",
  'uicon-skip-forward-right': "\uE672",
  'uicon-rewind-right': "\uE66F",
  'uicon-rewind-left': "\uE671",
  'uicon-arrow-right-double': "\uE68D",
  'uicon-arrow-left-double': "\uE68C",
  'uicon-wifi-off': "\uE668",
  'uicon-wifi': "\uE667",
  'uicon-empty-data': "\uE62F",
  'uicon-empty-history': "\uE684",
  'uicon-empty-list': "\uE68B",
  'uicon-empty-page': "\uE627",
  'uicon-empty-order': "\uE639",
  'uicon-man': "\uE697",
  'uicon-woman': "\uE69C",
  'uicon-man-add': "\uE61C",
  'uicon-man-add-fill': "\uE64C",
  'uicon-man-delete': "\uE61A",
  'uicon-man-delete-fill': "\uE66A",
  'uicon-zh': "\uE70A",
  'uicon-en': "\uE692"
};
exports.default = _default;

/***/ }),
/* 319 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-icon/props.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图标类名
    name: {
      type: String,
      default: uni.$u.props.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: uni.$u.props.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: uni.$u.props.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: uni.$u.props.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: uni.$u.props.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: uni.$u.props.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: uni.$u.props.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: uni.$u.props.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: uni.$u.props.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: uni.$u.props.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: uni.$u.props.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: uni.$u.props.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: uni.$u.props.icon.stop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-badge/props.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示圆点
    isDot: {
      type: Boolean,
      default: uni.$u.props.badge.isDot
    },
    // 显示的内容
    value: {
      type: [Number, String],
      default: uni.$u.props.badge.value
    },
    // 是否显示
    show: {
      type: Boolean,
      default: uni.$u.props.badge.show
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: [Number, String],
      default: uni.$u.props.badge.max
    },
    // 主题类型，error|warning|success|primary
    type: {
      type: String,
      default: uni.$u.props.badge.type
    },
    // 当数值为 0 时，是否展示 Badge
    showZero: {
      type: Boolean,
      default: uni.$u.props.badge.showZero
    },
    // 背景颜色，优先级比type高，如设置，type参数会失效
    bgColor: {
      type: [String, null],
      default: uni.$u.props.badge.bgColor
    },
    // 字体颜色
    color: {
      type: [String, null],
      default: uni.$u.props.badge.color
    },
    // 徽标形状，circle-四角均为圆角，horn-左下角为直角
    shape: {
      type: String,
      default: uni.$u.props.badge.shape
    },
    // 设置数字的显示方式，overflow|ellipsis|limit
    // overflow会根据max字段判断，超出显示`${max}+`
    // ellipsis会根据max判断，超出显示`${max}...`
    // limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
    numberType: {
      type: String,
      default: uni.$u.props.badge.numberType
    },
    // 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
    offset: {
      type: Array,
      default: uni.$u.props.badge.offset
    },
    // 是否反转背景和字体颜色
    inverted: {
      type: Boolean,
      default: uni.$u.props.badge.inverted
    },
    // 是否绝对定位
    absolute: {
      type: Boolean,
      default: uni.$u.props.badge.absolute
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-swiper/props.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
    list: {
      type: Array,
      default: uni.$u.props.swiper.list
    },
    // 是否显示面板指示器
    indicator: {
      type: Boolean,
      default: uni.$u.props.swiper.indicator
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorInactiveColor
    },
    // 指示器样式，可通过bottom，left，right进行定位
    indicatorStyle: {
      type: [String, Object],
      default: uni.$u.props.swiper.indicatorStyle
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiper.indicatorMode
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: uni.$u.props.swiper.autoplay
    },
    // 当前所在滑块的 index
    current: {
      type: [String, Number],
      default: uni.$u.props.swiper.current
    },
    // 当前所在滑块的 item-id ，不能与 current 被同时指定
    currentItemId: {
      type: String,
      default: uni.$u.props.swiper.currentItemId
    },
    // 滑块自动切换时间间隔
    interval: {
      type: [String, Number],
      default: uni.$u.props.swiper.interval
    },
    // 滑块切换过程所需时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.swiper.duration
    },
    // 播放到末尾后是否重新回到开头
    circular: {
      type: Boolean,
      default: uni.$u.props.swiper.circular
    },
    // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
    previousMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.previousMargin
    },
    // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
    nextMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.nextMargin
    },
    // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
    acceleration: {
      type: Boolean,
      default: uni.$u.props.swiper.acceleration
    },
    // 同时显示的滑块数量，nvue、支付宝小程序不支持
    displayMultipleItems: {
      type: Number,
      default: uni.$u.props.swiper.displayMultipleItems
    },
    // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
    // 只对微信小程序有效
    easingFunction: {
      type: String,
      default: uni.$u.props.swiper.easingFunction
    },
    // list数组中指定对象的目标属性名
    keyName: {
      type: String,
      default: uni.$u.props.swiper.keyName
    },
    // 图片的裁剪模式
    imgMode: {
      type: String,
      default: uni.$u.props.swiper.imgMode
    },
    // 组件高度
    height: {
      type: [String, Number],
      default: uni.$u.props.swiper.height
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.swiper.bgColor
    },
    // 组件圆角，数值或带单位的字符串
    radius: {
      type: [String, Number],
      default: uni.$u.props.swiper.radius
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.swiper.loading
    },
    // 是否显示标题，要求数组对象中有title属性
    showTitle: {
      type: Boolean,
      default: uni.$u.props.swiper.showTitle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-popup/props.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示弹窗
    show: {
      type: Boolean,
      default: uni.$u.props.popup.show
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: uni.$u.props.popup.overlay
    },
    // 弹出的方向，可选值为 top bottom right left center
    mode: {
      type: String,
      default: uni.$u.props.popup.mode
    },
    // 动画时长，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.popup.duration
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: uni.$u.props.popup.closeable
    },
    // 自定义遮罩的样式
    overlayStyle: {
      type: [Object, String],
      default: uni.$u.props.popup.overlayStyle
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.popup.closeOnClickOverlay
    },
    // 层级
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.popup.zIndex
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetBottom
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetTop
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: uni.$u.props.popup.closeIconPos
    },
    // 是否显示圆角
    round: {
      type: [Boolean, String, Number],
      default: uni.$u.props.popup.round
    },
    // mode=center，也即中部弹出时，是否使用缩放模式
    zoom: {
      type: Boolean,
      default: uni.$u.props.popup.zoom
    },
    // 弹窗背景色，设置为transparent可去除白色背景
    bgColor: {
      type: String,
      default: uni.$u.props.popup.bgColor
    },
    // 遮罩的透明度，0-1之间
    overlayOpacity: {
      type: [Number, String],
      default: uni.$u.props.popup.overlayOpacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-divider/props.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否虚线
    dashed: {
      type: Boolean,
      default: uni.$u.props.divider.dashed
    },
    // 是否细线
    hairline: {
      type: Boolean,
      default: uni.$u.props.divider.hairline
    },
    // 是否以点替代文字，优先于text字段起作用
    dot: {
      type: Boolean,
      default: uni.$u.props.divider.dot
    },
    // 内容文本的位置，left-左边，center-中间，right-右边
    textPosition: {
      type: String,
      default: uni.$u.props.divider.textPosition
    },
    // 文本内容
    text: {
      type: [String, Number],
      default: uni.$u.props.divider.text
    },
    // 文本大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.divider.textSize
    },
    // 文本颜色
    textColor: {
      type: String,
      default: uni.$u.props.divider.textColor
    },
    // 线条颜色
    lineColor: {
      type: String,
      default: uni.$u.props.divider.lineColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-empty/props.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 内置图标名称，或图片路径，建议绝对路径
    icon: {
      type: String,
      default: uni.$u.props.empty.icon
    },
    // 提示文字
    text: {
      type: String,
      default: uni.$u.props.empty.text
    },
    // 文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.empty.textColor
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.empty.textSize
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: uni.$u.props.empty.iconColor
    },
    // 图标的大小
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.empty.iconSize
    },
    // 选择预置的图标类型
    mode: {
      type: String,
      default: uni.$u.props.empty.mode
    },
    //  图标宽度，单位px
    width: {
      type: [String, Number],
      default: uni.$u.props.empty.width
    },
    // 图标高度，单位px
    height: {
      type: [String, Number],
      default: uni.$u.props.empty.height
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.empty.show
    },
    // 组件距离上一个元素之间的距离，默认px单位
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.empty.marginTop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */
/*!****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-radio-group/props.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 绑定的值
    value: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radioGroup.value
    },
    // 是否禁用全部radio
    disabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.disabled
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.radioGroup.shape
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radioGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radioGroup.inactiveColor
    },
    // 标识符
    name: {
      type: String,
      default: uni.$u.props.radioGroup.name
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: uni.$u.props.radioGroup.placement
    },
    // label的文本
    label: {
      type: [String],
      default: uni.$u.props.radioGroup.label
    },
    // label的颜色 （默认 '#303133' ）
    labelColor: {
      type: [String],
      default: uni.$u.props.radioGroup.labelColor
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.labelSize
    },
    // 是否禁止点击文本操作checkbox(默认 false )
    labelDisabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.radioGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.iconSize
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.radioGroup.borderBottom
    },
    // 图标与文字的对齐方式
    iconPlacement: {
      type: String,
      default: uni.$u.props.radio.iconPlacement
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-radio/props.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // radio的名称
    name: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radio.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni.$u.props.radio.shape
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.disabled
    },
    // 是否禁止点击提示语选中单选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.labelDisabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radio.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radio.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radio.iconSize
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radio.labelSize
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni.$u.props.radio.label
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni.$u.props.radio.size
    },
    // 图标颜色
    color: {
      type: String,
      default: uni.$u.props.radio.color
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.radio.labelColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */
/*!**********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-image/props.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图片地址
    src: {
      type: String,
      default: uni.$u.props.image.src
    },
    // 裁剪模式
    mode: {
      type: String,
      default: uni.$u.props.image.mode
    },
    // 宽度，单位任意
    width: {
      type: [String, Number],
      default: uni.$u.props.image.width
    },
    // 高度，单位任意
    height: {
      type: [String, Number],
      default: uni.$u.props.image.height
    },
    // 图片形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.image.shape
    },
    // 圆角，单位任意
    radius: {
      type: [String, Number],
      default: uni.$u.props.image.radius
    },
    // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
    lazyLoad: {
      type: Boolean,
      default: uni.$u.props.image.lazyLoad
    },
    // 开启长按图片显示识别微信小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      default: uni.$u.props.image.showMenuByLongpress
    },
    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: uni.$u.props.image.loadingIcon
    },
    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: uni.$u.props.image.errorIcon
    },
    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: uni.$u.props.image.showLoading
    },
    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: uni.$u.props.image.showError
    },
    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: uni.$u.props.image.fade
    },
    // 只支持网络资源，只对微信小程序有效
    webp: {
      type: Boolean,
      default: uni.$u.props.image.webp
    },
    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.image.duration
    },
    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    bgColor: {
      type: String,
      default: uni.$u.props.image.bgColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-grid/props.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 分成几列
    col: {
      type: [String, Number],
      default: uni.$u.props.grid.col
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: uni.$u.props.grid.border
    },
    // 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
    align: {
      type: String,
      default: uni.$u.props.grid.align
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */
/*!**************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-grid-item/props.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 宫格的name
    name: {
      type: [String, Number, null],
      default: uni.$u.props.gridItem.name
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.gridItem.bgColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */
/*!*************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/utils/config.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.baseURL = void 0;
// 环境配置
var env =  true ? 'dev' : undefined;
var config = {
  dev: {
    baseURL: 'http://192.168.1.16:8848/api',
    timeout: 5000
  },
  prod: {
    baseURL: 'https://api.example.com',
    timeout: 10000
  }
};
var _default = config[env];
exports.default = _default;
var baseURL = config[env].baseURL;
exports.baseURL = baseURL;

/***/ }),
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */
/*!*****************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-loading-icon/props.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: uni.$u.props.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: uni.$u.props.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: uni.$u.props.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.loadingIcon.inactiveColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-navbar/props.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否开启顶部安全区适配
    safeAreaInsetTop: {
      type: Boolean,
      default: uni.$u.props.navbar.safeAreaInsetTop
    },
    // 固定在顶部时，是否生成一个等高元素，以防止塌陷
    placeholder: {
      type: Boolean,
      default: uni.$u.props.navbar.placeholder
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      default: uni.$u.props.navbar.fixed
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: uni.$u.props.navbar.border
    },
    // 左边的图标
    leftIcon: {
      type: String,
      default: uni.$u.props.navbar.leftIcon
    },
    // 左边的提示文字
    leftText: {
      type: String,
      default: uni.$u.props.navbar.leftText
    },
    // 左右的提示文字
    rightText: {
      type: String,
      default: uni.$u.props.navbar.rightText
    },
    // 右边的图标
    rightIcon: {
      type: String,
      default: uni.$u.props.navbar.rightIcon
    },
    // 标题
    title: {
      type: [String, Number],
      default: uni.$u.props.navbar.title
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.navbar.bgColor
    },
    // 标题的宽度
    titleWidth: {
      type: [String, Number],
      default: uni.$u.props.navbar.titleWidth
    },
    // 导航栏高度
    height: {
      type: [String, Number],
      default: uni.$u.props.navbar.height
    },
    // 左侧返回图标的大小
    leftIconSize: {
      type: [String, Number],
      default: uni.$u.props.navbar.leftIconSize
    },
    // 左侧返回图标的颜色
    leftIconColor: {
      type: String,
      default: uni.$u.props.navbar.leftIconColor
    },
    // 点击左侧区域(返回图标)，是否自动返回上一页
    autoBack: {
      type: Boolean,
      default: uni.$u.props.navbar.autoBack
    },
    // 标题的样式，对象或字符串
    titleStyle: {
      type: [String, Object],
      default: uni.$u.props.navbar.titleStyle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */
/*!*********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-swiper-indicator/props.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 轮播的长度
    length: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.length
    },
    // 当前处于活动状态的轮播的索引
    current: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.current
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorInactiveColor
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorMode
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-count-down/props.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 倒计时时长，单位ms
    time: {
      type: [String, Number],
      default: uni.$u.props.countDown.time
    },
    // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
    format: {
      type: String,
      default: uni.$u.props.countDown.format
    },
    // 是否自动开始倒计时
    autoStart: {
      type: Boolean,
      default: uni.$u.props.countDown.autoStart
    },
    // 是否展示毫秒倒计时
    millisecond: {
      type: Boolean,
      default: uni.$u.props.countDown.millisecond
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 506 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-count-down/utils.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameSecond = isSameSecond;
exports.parseFormat = parseFormat;
exports.parseTimeData = parseTimeData;
// 补0，如1 -> 01
function padZero(num) {
  var targetLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var str = "".concat(num);
  while (str.length < targetLength) {
    str = "0".concat(str);
  }
  return str;
}
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTimeData(time) {
  var days = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}
function parseFormat(format, timeData) {
  var days = timeData.days,
    hours = timeData.hours,
    minutes = timeData.minutes,
    seconds = timeData.seconds,
    milliseconds = timeData.milliseconds;
  // 如果格式化字符串中不存在DD(天)，则将天的时间转为小时中去
  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    // 对天补0
    format = format.replace('DD', padZero(days));
  }
  // 其他同理于DD的格式化处理方式
  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', padZero(hours));
  }
  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', padZero(minutes));
  }
  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', padZero(seconds));
  }
  return format.replace('SSS', padZero(milliseconds, 3));
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

/***/ }),
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */
/*!************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-overlay/props.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: uni.$u.props.overlay.show
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.overlay.zIndex
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.overlay.duration
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: uni.$u.props.overlay.opacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-transition/props.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: uni.$u.props.transition.show
    },
    // 使用的动画模式
    mode: {
      type: String,
      default: uni.$u.props.transition.mode
    },
    // 动画的执行时间，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.transition.duration
    },
    // 使用的动画过渡函数
    timingFunction: {
      type: String,
      default: uni.$u.props.transition.timingFunction
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 530 */
/*!********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-transition/transition.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 56));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 58));
var _nvueAniMap = _interopRequireDefault(__webpack_require__(/*! ./nvue.ani-map.js */ 531));
// 定义一个一定时间后自动成功的promise，让调用nextTick方法处，进入下一个then方法
var nextTick = function nextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 1000 / 50);
  });
};
// nvue动画模块实现细节抽离在外部文件

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
var getClassNames = function getClassNames(name) {
  return {
    enter: "u-".concat(name, "-enter u-").concat(name, "-enter-active"),
    'enter-to': "u-".concat(name, "-enter-to u-").concat(name, "-enter-active"),
    leave: "u-".concat(name, "-leave u-").concat(name, "-leave-active"),
    'leave-to': "u-".concat(name, "-leave-to u-").concat(name, "-leave-active")
  };
};
var _default = {
  methods: {
    // 组件被点击发出事件
    clickHandler: function clickHandler() {
      this.$emit('click');
    },
    // vue版本的组件进场处理
    vueEnter: function vueEnter() {
      var _this = this;
      // 动画进入时的类名
      var classNames = getClassNames(this.mode);
      // 定义状态和发出动画进入前事件
      this.status = 'enter';
      this.$emit('beforeEnter');
      this.inited = true;
      this.display = true;
      this.classes = classNames.enter;
      this.$nextTick( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 标识动画尚未结束
                _this.$emit('enter');
                _this.transitionEnded = false;
                // 组件动画进入后触发的事件
                _this.$emit('afterEnter');
                // 赋予组件enter-to类名
                _this.classes = classNames['enter-to'];
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    },
    // 动画离场处理
    vueLeave: function vueLeave() {
      var _this2 = this;
      // 如果不是展示状态，无需执行逻辑
      if (!this.display) return;
      var classNames = getClassNames(this.mode);
      // 标记离开状态和发出事件
      this.status = 'leave';
      this.$emit('beforeLeave');
      // 获得类名
      this.classes = classNames.leave;
      this.$nextTick(function () {
        // 动画正在离场的状态
        _this2.transitionEnded = false;
        _this2.$emit('leave');
        // 组件执行动画，到了执行的执行时间后，执行一些额外处理
        setTimeout(_this2.onTransitionEnd, _this2.duration);
        _this2.classes = classNames['leave-to'];
      });
    },
    // 完成过渡后触发
    onTransitionEnd: function onTransitionEnd() {
      // 如果已经是结束的状态，无需再处理
      if (this.transitionEnded) return;
      this.transitionEnded = true;
      // 发出组件动画执行后的事件
      this.$emit(this.status === 'leave' ? 'afterLeave' : 'afterEnter');
      if (!this.show && this.display) {
        this.display = false;
        this.inited = false;
      }
    }
  }
};
exports.default = _default;

/***/ }),
/* 531 */
/*!**********************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-transition/nvue.ani-map.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  fade: {
    enter: {
      opacity: 0
    },
    'enter-to': {
      opacity: 1
    },
    leave: {
      opacity: 1
    },
    'leave-to': {
      opacity: 0
    }
  },
  'fade-up': {
    enter: {
      opacity: 0,
      transform: 'translateY(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(100%)'
    }
  },
  'fade-down': {
    enter: {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(-100%)'
    }
  },
  'fade-left': {
    enter: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(-100%)'
    }
  },
  'fade-right': {
    enter: {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(100%)'
    }
  },
  'slide-up': {
    enter: {
      transform: 'translateY(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(100%)'
    }
  },
  'slide-down': {
    enter: {
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(-100%)'
    }
  },
  'slide-left': {
    enter: {
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(-100%)'
    }
  },
  'slide-right': {
    enter: {
      transform: 'translateX(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(100%)'
    }
  },
  zoom: {
    enter: {
      transform: 'scale(0.95)'
    },
    'enter-to': {
      transform: 'scale(1)'
    },
    leave: {
      transform: 'scale(1)'
    },
    'leave-to': {
      transform: 'scale(0.95)'
    }
  },
  'fade-zoom': {
    enter: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 1,
      transform: 'scale(1)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'scale(0.95)'
    }
  }
};
exports.default = _default;

/***/ }),
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-status-bar/props.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    bgColor: {
      type: String,
      default: uni.$u.props.statusBar.bgColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */
/*!*********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-line/props.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    color: {
      type: String,
      default: uni.$u.props.line.color
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
    length: {
      type: [String, Number],
      default: uni.$u.props.line.length
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: uni.$u.props.line.direction
    },
    // 是否显示细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.line.hairline
    },
    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
    margin: {
      type: [String, Number],
      default: uni.$u.props.line.margin
    },
    // 是否虚线，true-虚线，false-实线
    dashed: {
      type: Boolean,
      default: uni.$u.props.line.dashed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */
/*!***************************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-number-box/props.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 步进器标识符，在change回调返回
    name: {
      type: [String, Number],
      default: uni.$u.props.numberBox.name
    },
    // 用于双向绑定的值，初始化时设置设为默认min值(最小值)
    value: {
      type: [String, Number],
      default: uni.$u.props.numberBox.value
    },
    // 最小值
    min: {
      type: [String, Number],
      default: uni.$u.props.numberBox.min
    },
    // 最大值
    max: {
      type: [String, Number],
      default: uni.$u.props.numberBox.max
    },
    // 加减的步长，可为小数
    step: {
      type: [String, Number],
      default: uni.$u.props.numberBox.step
    },
    // 是否只允许输入整数
    integer: {
      type: Boolean,
      default: uni.$u.props.numberBox.integer
    },
    // 是否禁用，包括输入框，加减按钮
    disabled: {
      type: Boolean,
      default: uni.$u.props.numberBox.disabled
    },
    // 是否禁用输入框
    disabledInput: {
      type: Boolean,
      default: uni.$u.props.numberBox.disabledInput
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      default: uni.$u.props.numberBox.asyncChange
    },
    // 输入框宽度，单位为px
    inputWidth: {
      type: [String, Number],
      default: uni.$u.props.numberBox.inputWidth
    },
    // 是否显示减少按钮
    showMinus: {
      type: Boolean,
      default: uni.$u.props.numberBox.showMinus
    },
    // 是否显示增加按钮
    showPlus: {
      type: Boolean,
      default: uni.$u.props.numberBox.showPlus
    },
    // 显示的小数位数
    decimalLength: {
      type: [String, Number, null],
      default: uni.$u.props.numberBox.decimalLength
    },
    // 是否开启长按加减手势
    longPress: {
      type: Boolean,
      default: uni.$u.props.numberBox.longPress
    },
    // 输入框文字和加减按钮图标的颜色
    color: {
      type: String,
      default: uni.$u.props.numberBox.color
    },
    // 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致
    buttonSize: {
      type: [String, Number],
      default: uni.$u.props.numberBox.buttonSize
    },
    // 输入框和按钮的背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.numberBox.bgColor
    },
    // 指定光标于键盘的距离，避免键盘遮挡输入框，单位px
    cursorSpacing: {
      type: [String, Number],
      default: uni.$u.props.numberBox.cursorSpacing
    },
    // 是否禁用增加按钮
    disablePlus: {
      type: Boolean,
      default: uni.$u.props.numberBox.disablePlus
    },
    // 是否禁用减少按钮
    disableMinus: {
      type: Boolean,
      default: uni.$u.props.numberBox.disableMinus
    },
    // 加减按钮图标的样式
    iconStyle: {
      type: [Object, String],
      default: uni.$u.props.numberBox.iconStyle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-upload/utils.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chooseFile = chooseFile;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function pickExclude(obj, keys) {
  // 某些情况下，type可能会为
  if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
    return {};
  }
  return Object.keys(obj).reduce(function (prev, key) {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function formatImage(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['path'])), {}, {
      type: 'image',
      url: item.path,
      thumb: item.path,
      size: item.size
    });
  });
}
function formatVideo(res) {
  return [_objectSpread(_objectSpread({}, pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg'])), {}, {
    type: 'video',
    url: res.tempFilePath,
    thumb: res.thumbTempFilePath,
    size: res.size
  })];
}
function formatMedia(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath'])), {}, {
      type: res.type,
      url: item.tempFilePath,
      thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
      size: item.size
    });
  });
}
function formatFile(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['path'])), {}, {
      url: item.path,
      size: item.size
    });
  });
}
function chooseFile(_ref) {
  var accept = _ref.accept,
    multiple = _ref.multiple,
    capture = _ref.capture,
    compressed = _ref.compressed,
    maxDuration = _ref.maxDuration,
    sizeType = _ref.sizeType,
    camera = _ref.camera,
    maxCount = _ref.maxCount;
  return new Promise(function (resolve, reject) {
    switch (accept) {
      case 'image':
        uni.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType: sizeType,
          success: function success(res) {
            return resolve(formatImage(res));
          },
          fail: reject
        });
        break;

      // 只有微信小程序才支持chooseMedia接口
      case 'media':
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration: maxDuration,
          sizeType: sizeType,
          camera: camera,
          success: function success(res) {
            return resolve(formatMedia(res));
          },
          fail: reject
        });
        break;
      case 'video':
        uni.chooseVideo({
          sourceType: capture,
          compressed: compressed,
          maxDuration: maxDuration,
          camera: camera,
          success: function success(res) {
            return resolve(formatVideo(res));
          },
          fail: reject
        });
        break;

      // 只有微信小程序才支持chooseMessageFile接口
      case 'file':
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: function success(res) {
            return resolve(formatFile(res));
          },
          fail: reject
        });
        break;
      default:
        // 此为保底选项，在accept不为上面任意一项的时候选取全部文件

        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: 'all',
          success: function success(res) {
            return resolve(formatFile(res));
          },
          fail: reject
        });
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 571 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-upload/mixin.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  watch: {
    // 监听accept的变化，判断是否符合个平台要求
    // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
    accept: {
      immediate: true,
      handler: function handler(val) {}
    }
  }
};
exports.default = _default;

/***/ }),
/* 572 */
/*!***********************************************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/uni_modules/uview-ui/components/u-upload/props.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 接受的文件类型, 可选值为all media image file video
    accept: {
      type: String,
      default: uni.$u.props.upload.accept
    },
    // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
    capture: {
      type: [String, Array],
      default: uni.$u.props.upload.capture
    },
    // 当accept为video时生效，是否压缩视频，默认为true
    compressed: {
      type: Boolean,
      default: uni.$u.props.upload.compressed
    },
    // 当accept为video时生效，可选值为back或front
    camera: {
      type: String,
      default: uni.$u.props.upload.camera
    },
    // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
    maxDuration: {
      type: Number,
      default: uni.$u.props.upload.maxDuration
    },
    // 上传区域的图标，只能内置图标
    uploadIcon: {
      type: String,
      default: uni.$u.props.upload.uploadIcon
    },
    // 上传区域的图标的颜色，默认
    uploadIconColor: {
      type: String,
      default: uni.$u.props.upload.uploadIconColor
    },
    // 是否开启文件读取前事件
    useBeforeRead: {
      type: Boolean,
      default: uni.$u.props.upload.useBeforeRead
    },
    // 读取后的处理函数
    afterRead: {
      type: Function,
      default: null
    },
    // 读取前的处理函数
    beforeRead: {
      type: Function,
      default: null
    },
    // 是否显示组件自带的图片预览功能
    previewFullImage: {
      type: Boolean,
      default: uni.$u.props.upload.previewFullImage
    },
    // 最大上传数量
    maxCount: {
      type: [String, Number],
      default: uni.$u.props.upload.maxCount
    },
    // 是否启用
    disabled: {
      type: Boolean,
      default: uni.$u.props.upload.disabled
    },
    // 预览上传的图片时的裁剪模式，和image组件mode属性一致
    imageMode: {
      type: String,
      default: uni.$u.props.upload.imageMode
    },
    // 标识符，可以在回调函数的第二项参数中获取
    name: {
      type: String,
      default: uni.$u.props.upload.name
    },
    // 所选的图片的尺寸, 可选值为original compressed
    sizeType: {
      type: Array,
      default: uni.$u.props.upload.sizeType
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: uni.$u.props.upload.multiple
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      default: uni.$u.props.upload.deletable
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: [String, Number],
      default: uni.$u.props.upload.maxSize
    },
    // 显示已上传的文件列表
    fileList: {
      type: Array,
      default: uni.$u.props.upload.fileList
    },
    // 上传区域的提示文字
    uploadText: {
      type: String,
      default: uni.$u.props.upload.uploadText
    },
    // 内部预览图片区域和选择图片按钮的区域宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.upload.width
    },
    // 内部预览图片区域和选择图片按钮的区域高度
    height: {
      type: [String, Number],
      default: uni.$u.props.upload.height
    },
    // 是否在上传完成后展示预览图
    previewImage: {
      type: Boolean,
      default: uni.$u.props.upload.previewImage
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon1.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 624 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon2.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 625 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon3.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 626 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon4.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 627 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon5.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 628 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon6.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 629 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon7.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 630 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon8.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 631 */
/*!*******************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon9.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 632 */
/*!********************************************************!*\
  !*** D:/开发/uniapp/mcyx-shop-h5/static/home/icon10.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map