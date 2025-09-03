import { onMounted, openBlock, createElementBlock, renderSlot, ref, computed, watch, onBeforeUnmount, resolveComponent, createBlock, withCtx, createElementVNode } from 'vue';

var VIDEO_HOST = 'https://kinescope.io/embed/';
var PLAYER_LATEST = 'https://player.kinescope.io/latest/iframe.player.js';
var NODE_JS_ID = '__kinescope_player_vue_js';
var PLAYER_ID_PREFIX = '__kinescope_player_';
var IS_BROWSER = typeof window !== "undefined" && window.document;
var EVENTS_MAP = [['auto-quality-changed', 'autoqualitychanged'], ['call-action', 'callaction'], ['call-bookmark', 'callbookmark'], ['destroy', 'destroy'], ['duration-change', 'durationchange'], ['ended', 'ended'], ['error', 'error'], ['fullscreen-change', 'fullscreenchange'], ['pause', 'pause'], ['play', 'play'], ['playback-rate-change', 'ratechange'], ['playing', 'playing'], ['progress', 'progress'], ['quality-changed', 'qualitychanged'], ['ready', 'ready'], ['seek-chapter', 'seekchapter'], ['seeked', 'seeked'], ['seeking', 'seeking'], ['size-changed', 'sizechanged'], ['time-update', 'timeupdate'], ['volume-change', 'volumechange'], ['waiting', 'waiting']];

// polyfill for replaceChildren
(function () {
  if (IS_BROWSER && Node.prototype.replaceChildren === undefined) {
    Node.prototype.replaceChildren = function (addNodes) {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      if (addNodes !== undefined) {
        this.append(addNodes);
      }
    };
  }
})();

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

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
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var regeneratorRuntime$1 = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (_typeof));

var _typeofExports = _typeof.exports;

(function (module) {
	var _typeof = _typeofExports["default"];
	function _regeneratorRuntime() {
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
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
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
	    for (var n in e) r.push(n);
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
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
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
} (regeneratorRuntime$1));

var regeneratorRuntimeExports = regeneratorRuntime$1.exports;

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntimeExports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

var script$1 = {
  name: 'Loader',
  emits: ['js-load', 'js-load-error'],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var loadJsNotLoad = function loadJsNotLoad() {
      var el = document.getElementById(NODE_JS_ID);
      if (el) {
        el.addEventListener('load', _loadJs);
      }
    };
    var _loadJs = function loadJs() {
      var el = document.getElementById(NODE_JS_ID);
      if (el) {
        el.removeEventListener('load', _loadJs);
      }
      handleJsLoad();
    };
    var testLoadJs = function testLoadJs() {
      return !!document.getElementById(NODE_JS_ID);
    };
    var handleJsLoad = function handleJsLoad() {
      emit('js-load');
    };
    var handleJsLoadError = function handleJsLoadError(e) {
      emit('js-load-error', e);
    };
    var jsLoading = function jsLoading() {
      if (testLoadJs()) {
        if (window && window.Kinescope && window.Kinescope.IframePlayer) {
          handleJsLoad();
        } else {
          loadJsNotLoad();
        }
        return;
      }
      var el = document.createElement('script');
      el.id = NODE_JS_ID;
      el.async = false;
      document.body.appendChild(el);
      el.onload = handleJsLoad;
      el.onerror = handleJsLoadError;
      el.src = PLAYER_LATEST;
    };
    onMounted(function () {
      if (!IS_BROWSER) return;
      jsLoading();
    });
    return {
      handleJsLoad: handleJsLoad,
      handleJsLoadError: handleJsLoadError
    };
  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [renderSlot(_ctx.$slots, "default")]);
}

script$1.render = render$1;
script$1.__file = "src/loader.vue";

var index = 1;
var script = {
  name: 'VueKinescopePlayer',
  components: {
    Loader: script$1
  },
  props: {
    videoId: {
      type: [Number, String],
      required: true
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    playsInline: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    },
    controls: {
      type: Boolean,
      default: true
    },
    mainPlayButton: {
      type: Boolean,
      default: true
    },
    playbackRateButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['js-load', 'js-load-error'].concat(_toConsumableArray(EVENTS_MAP.map(function (item) {
    return item[0];
  }))),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
      expose = _ref.expose;
    var playerRef = ref(null);
    var playerLoad = ref(false);
    var player = ref(null);
    var getNextIndex = function getNextIndex() {
      return index++;
    };
    var getNextPlayerId = function getNextPlayerId() {
      return PLAYER_ID_PREFIX + getNextIndex();
    };
    var propsChanged = computed(function () {
      return {
        videoId: props.videoId,
        width: props.width,
        height: props.height,
        autoPlay: props.autoPlay,
        muted: props.muted,
        loop: props.loop,
        playsInline: props.playsInline,
        language: props.language,
        controls: props.controls,
        mainPlayButton: props.mainPlayButton,
        playbackRateButton: props.playbackRateButton
      };
    });
    var getIFrameUrl = function getIFrameUrl() {
      return VIDEO_HOST + props.videoId;
    };
    var createPlayer = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(playerId) {
        var options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = {
                url: getIFrameUrl(),
                size: {
                  width: props.width,
                  height: props.height
                },
                behaviour: {
                  autoPlay: props.autoPlay,
                  muted: props.muted,
                  loop: props.loop,
                  playsInline: props.playsInline
                },
                ui: {
                  language: props.language,
                  controls: props.controls,
                  mainPlayButton: props.mainPlayButton,
                  playbackRateButton: props.playbackRateButton
                }
              };
              return _context.abrupt("return", window.Kinescope.IframePlayer.create(playerId, options));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function createPlayer(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var destroy = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (player.value) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              _context2.next = 4;
              return player.value.destroy();
            case 4:
              player.value = null;
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function destroy() {
        return _ref3.apply(this, arguments);
      };
    }();
    var create = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var playerId, playerDiv;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (playerRef.value) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              playerId = getNextPlayerId();
              playerDiv = document.createElement('div');
              playerDiv.setAttribute('id', playerId);
              playerRef.value.replaceChildren(playerDiv);
              _context3.next = 8;
              return createPlayer(playerId);
            case 8:
              player.value = _context3.sent;
              EVENTS_MAP.forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                  vueEvent = _ref6[0],
                  playerEvent = _ref6[1];
                if (player.value) {
                  player.value.on(playerEvent, function (e) {
                    emit(vueEvent, e.data);
                  });
                }
              });
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function create() {
        return _ref4.apply(this, arguments);
      };
    }();
    var updatePlayer = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return destroy();
            case 2:
              _context4.next = 4;
              return create();
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function updatePlayer() {
        return _ref7.apply(this, arguments);
      };
    }();
    var handleJsLoad = function handleJsLoad() {
      playerLoad.value = true;
      emit('js-load');
      create();
    };
    var handleJsLoadError = function handleJsLoadError(e) {
      emit('js-load-error', e);
    };
    expose({
      player: player
    });
    watch(propsChanged, updatePlayer);
    onMounted(function () {
      if (playerLoad.value) {
        create();
      }
    });
    onBeforeUnmount(destroy);
    return {
      playerRef: playerRef,
      handleJsLoad: handleJsLoad,
      handleJsLoadError: handleJsLoadError
    };
  }
};

var _hoisted_1 = {
  ref: "playerRef"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Loader = resolveComponent("Loader");
  return openBlock(), createBlock(_component_Loader, {
    onJsLoad: $setup.handleJsLoad,
    onJsLoadError: $setup.handleJsLoadError
  }, {
    default: withCtx(function () {
      return [createElementVNode("div", _hoisted_1, null, 512 /* NEED_PATCH */)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["onJsLoad", "onJsLoadError"]);
}

script.render = render;
script.__file = "src/main.vue";

var plugin = {
  install: function install(app) {
    app.component('kinescope-player', script);
  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export { script as KinescopePlayer, plugin as default };
