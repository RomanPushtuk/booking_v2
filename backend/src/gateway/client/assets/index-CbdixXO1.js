function rw(e, r) {
  for (var a = 0; a < r.length; a++) {
    const i = r[a];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const s in i)
        if (s !== "default" && !(s in e)) {
          const u = Object.getOwnPropertyDescriptor(i, s);
          u &&
            Object.defineProperty(
              e,
              s,
              u.get ? u : { enumerable: !0, get: () => i[s] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const u of s)
      if (u.type === "childList")
        for (const f of u.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && i(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(s) {
    const u = {};
    return (
      s.integrity && (u.integrity = s.integrity),
      s.referrerPolicy && (u.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const u = a(s);
    fetch(s.href, u);
  }
})();
function qd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Jf = { exports: {} },
  qi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vy;
function aw() {
  if (Vy) return qi;
  Vy = 1;
  var e = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.fragment");
  function a(i, s, u) {
    var f = null;
    if (
      (u !== void 0 && (f = "" + u),
      s.key !== void 0 && (f = "" + s.key),
      "key" in s)
    ) {
      u = {};
      for (var h in s) h !== "key" && (u[h] = s[h]);
    } else u = s;
    return (
      (s = u.ref),
      { $$typeof: e, type: i, key: f, ref: s !== void 0 ? s : null, props: u }
    );
  }
  return (qi.Fragment = r), (qi.jsx = a), (qi.jsxs = a), qi;
}
var qy;
function ow() {
  return qy || ((qy = 1), (Jf.exports = aw())), Jf.exports;
}
var v = ow(),
  ed = { exports: {} },
  Yi = {},
  td = { exports: {} },
  nd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yy;
function iw() {
  return (
    Yy ||
      ((Yy = 1),
      (function (e) {
        function r(M, Q) {
          var Y = M.length;
          M.push(Q);
          e: for (; 0 < Y; ) {
            var re = (Y - 1) >>> 1,
              O = M[re];
            if (0 < s(O, Q)) (M[re] = Q), (M[Y] = O), (Y = re);
            else break e;
          }
        }
        function a(M) {
          return M.length === 0 ? null : M[0];
        }
        function i(M) {
          if (M.length === 0) return null;
          var Q = M[0],
            Y = M.pop();
          if (Y !== Q) {
            M[0] = Y;
            e: for (var re = 0, O = M.length, G = O >>> 1; re < G; ) {
              var ne = 2 * (re + 1) - 1,
                J = M[ne],
                ie = ne + 1,
                me = M[ie];
              if (0 > s(J, Y))
                ie < O && 0 > s(me, J)
                  ? ((M[re] = me), (M[ie] = Y), (re = ie))
                  : ((M[re] = J), (M[ne] = Y), (re = ne));
              else if (ie < O && 0 > s(me, Y))
                (M[re] = me), (M[ie] = Y), (re = ie);
              else break e;
            }
          }
          return Q;
        }
        function s(M, Q) {
          var Y = M.sortIndex - Q.sortIndex;
          return Y !== 0 ? Y : M.id - Q.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var f = Date,
            h = f.now();
          e.unstable_now = function () {
            return f.now() - h;
          };
        }
        var p = [],
          m = [],
          g = 1,
          y = null,
          S = 3,
          w = !1,
          E = !1,
          T = !1,
          R = !1,
          _ = typeof setTimeout == "function" ? setTimeout : null,
          j = typeof clearTimeout == "function" ? clearTimeout : null,
          A = typeof setImmediate < "u" ? setImmediate : null;
        function D(M) {
          for (var Q = a(m); Q !== null; ) {
            if (Q.callback === null) i(m);
            else if (Q.startTime <= M)
              i(m), (Q.sortIndex = Q.expirationTime), r(p, Q);
            else break;
            Q = a(m);
          }
        }
        function U(M) {
          if (((T = !1), D(M), !E))
            if (a(p) !== null) (E = !0), k || ((k = !0), oe());
            else {
              var Q = a(m);
              Q !== null && le(U, Q.startTime - M);
            }
        }
        var k = !1,
          Z = -1,
          V = 5,
          W = -1;
        function ee() {
          return R ? !0 : !(e.unstable_now() - W < V);
        }
        function pe() {
          if (((R = !1), k)) {
            var M = e.unstable_now();
            W = M;
            var Q = !0;
            try {
              e: {
                (E = !1), T && ((T = !1), j(Z), (Z = -1)), (w = !0);
                var Y = S;
                try {
                  t: {
                    for (
                      D(M), y = a(p);
                      y !== null && !(y.expirationTime > M && ee());

                    ) {
                      var re = y.callback;
                      if (typeof re == "function") {
                        (y.callback = null), (S = y.priorityLevel);
                        var O = re(y.expirationTime <= M);
                        if (((M = e.unstable_now()), typeof O == "function")) {
                          (y.callback = O), D(M), (Q = !0);
                          break t;
                        }
                        y === a(p) && i(p), D(M);
                      } else i(p);
                      y = a(p);
                    }
                    if (y !== null) Q = !0;
                    else {
                      var G = a(m);
                      G !== null && le(U, G.startTime - M), (Q = !1);
                    }
                  }
                  break e;
                } finally {
                  (y = null), (S = Y), (w = !1);
                }
                Q = void 0;
              }
            } finally {
              Q ? oe() : (k = !1);
            }
          }
        }
        var oe;
        if (typeof A == "function")
          oe = function () {
            A(pe);
          };
        else if (typeof MessageChannel < "u") {
          var ce = new MessageChannel(),
            fe = ce.port2;
          (ce.port1.onmessage = pe),
            (oe = function () {
              fe.postMessage(null);
            });
        } else
          oe = function () {
            _(pe, 0);
          };
        function le(M, Q) {
          Z = _(function () {
            M(e.unstable_now());
          }, Q);
        }
        (e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (e.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (V = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (e.unstable_next = function (M) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = S;
            }
            var Y = S;
            S = Q;
            try {
              return M();
            } finally {
              S = Y;
            }
          }),
          (e.unstable_requestPaint = function () {
            R = !0;
          }),
          (e.unstable_runWithPriority = function (M, Q) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var Y = S;
            S = M;
            try {
              return Q();
            } finally {
              S = Y;
            }
          }),
          (e.unstable_scheduleCallback = function (M, Q, Y) {
            var re = e.unstable_now();
            switch (
              (typeof Y == "object" && Y !== null
                ? ((Y = Y.delay),
                  (Y = typeof Y == "number" && 0 < Y ? re + Y : re))
                : (Y = re),
              M)
            ) {
              case 1:
                var O = -1;
                break;
              case 2:
                O = 250;
                break;
              case 5:
                O = 1073741823;
                break;
              case 4:
                O = 1e4;
                break;
              default:
                O = 5e3;
            }
            return (
              (O = Y + O),
              (M = {
                id: g++,
                callback: Q,
                priorityLevel: M,
                startTime: Y,
                expirationTime: O,
                sortIndex: -1,
              }),
              Y > re
                ? ((M.sortIndex = Y),
                  r(m, M),
                  a(p) === null &&
                    M === a(m) &&
                    (T ? (j(Z), (Z = -1)) : (T = !0), le(U, Y - re)))
                : ((M.sortIndex = O),
                  r(p, M),
                  E || w || ((E = !0), k || ((k = !0), oe()))),
              M
            );
          }),
          (e.unstable_shouldYield = ee),
          (e.unstable_wrapCallback = function (M) {
            var Q = S;
            return function () {
              var Y = S;
              S = Q;
              try {
                return M.apply(this, arguments);
              } finally {
                S = Y;
              }
            };
          });
      })(nd)),
    nd
  );
}
var Gy;
function lw() {
  return Gy || ((Gy = 1), (td.exports = iw())), td.exports;
}
var rd = { exports: {} },
  we = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fy;
function sw() {
  if (Fy) return we;
  Fy = 1;
  var e = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.portal"),
    a = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    u = Symbol.for("react.consumer"),
    f = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function S(O) {
    return O === null || typeof O != "object"
      ? null
      : ((O = (y && O[y]) || O["@@iterator"]),
        typeof O == "function" ? O : null);
  }
  var w = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    E = Object.assign,
    T = {};
  function R(O, G, ne) {
    (this.props = O),
      (this.context = G),
      (this.refs = T),
      (this.updater = ne || w);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (O, G) {
      if (typeof O != "object" && typeof O != "function" && O != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, O, G, "setState");
    }),
    (R.prototype.forceUpdate = function (O) {
      this.updater.enqueueForceUpdate(this, O, "forceUpdate");
    });
  function _() {}
  _.prototype = R.prototype;
  function j(O, G, ne) {
    (this.props = O),
      (this.context = G),
      (this.refs = T),
      (this.updater = ne || w);
  }
  var A = (j.prototype = new _());
  (A.constructor = j), E(A, R.prototype), (A.isPureReactComponent = !0);
  var D = Array.isArray,
    U = { H: null, A: null, T: null, S: null, V: null },
    k = Object.prototype.hasOwnProperty;
  function Z(O, G, ne, J, ie, me) {
    return (
      (ne = me.ref),
      {
        $$typeof: e,
        type: O,
        key: G,
        ref: ne !== void 0 ? ne : null,
        props: me,
      }
    );
  }
  function V(O, G) {
    return Z(O.type, G, void 0, void 0, void 0, O.props);
  }
  function W(O) {
    return typeof O == "object" && O !== null && O.$$typeof === e;
  }
  function ee(O) {
    var G = { "=": "=0", ":": "=2" };
    return (
      "$" +
      O.replace(/[=:]/g, function (ne) {
        return G[ne];
      })
    );
  }
  var pe = /\/+/g;
  function oe(O, G) {
    return typeof O == "object" && O !== null && O.key != null
      ? ee("" + O.key)
      : G.toString(36);
  }
  function ce() {}
  function fe(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (
          (typeof O.status == "string"
            ? O.then(ce, ce)
            : ((O.status = "pending"),
              O.then(
                function (G) {
                  O.status === "pending" &&
                    ((O.status = "fulfilled"), (O.value = G));
                },
                function (G) {
                  O.status === "pending" &&
                    ((O.status = "rejected"), (O.reason = G));
                },
              )),
          O.status)
        ) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function le(O, G, ne, J, ie) {
    var me = typeof O;
    (me === "undefined" || me === "boolean") && (O = null);
    var de = !1;
    if (O === null) de = !0;
    else
      switch (me) {
        case "bigint":
        case "string":
        case "number":
          de = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case e:
            case r:
              de = !0;
              break;
            case g:
              return (de = O._init), le(de(O._payload), G, ne, J, ie);
          }
      }
    if (de)
      return (
        (ie = ie(O)),
        (de = J === "" ? "." + oe(O, 0) : J),
        D(ie)
          ? ((ne = ""),
            de != null && (ne = de.replace(pe, "$&/") + "/"),
            le(ie, G, ne, "", function (Ae) {
              return Ae;
            }))
          : ie != null &&
            (W(ie) &&
              (ie = V(
                ie,
                ne +
                  (ie.key == null || (O && O.key === ie.key)
                    ? ""
                    : ("" + ie.key).replace(pe, "$&/") + "/") +
                  de,
              )),
            G.push(ie)),
        1
      );
    de = 0;
    var te = J === "" ? "." : J + ":";
    if (D(O))
      for (var ue = 0; ue < O.length; ue++)
        (J = O[ue]), (me = te + oe(J, ue)), (de += le(J, G, ne, me, ie));
    else if (((ue = S(O)), typeof ue == "function"))
      for (O = ue.call(O), ue = 0; !(J = O.next()).done; )
        (J = J.value), (me = te + oe(J, ue++)), (de += le(J, G, ne, me, ie));
    else if (me === "object") {
      if (typeof O.then == "function") return le(fe(O), G, ne, J, ie);
      throw (
        ((G = String(O)),
        Error(
          "Objects are not valid as a React child (found: " +
            (G === "[object Object]"
              ? "object with keys {" + Object.keys(O).join(", ") + "}"
              : G) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    }
    return de;
  }
  function M(O, G, ne) {
    if (O == null) return O;
    var J = [],
      ie = 0;
    return (
      le(O, J, "", "", function (me) {
        return G.call(ne, me, ie++);
      }),
      J
    );
  }
  function Q(O) {
    if (O._status === -1) {
      var G = O._result;
      (G = G()),
        G.then(
          function (ne) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 1), (O._result = ne));
          },
          function (ne) {
            (O._status === 0 || O._status === -1) &&
              ((O._status = 2), (O._result = ne));
          },
        ),
        O._status === -1 && ((O._status = 0), (O._result = G));
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var Y =
    typeof reportError == "function"
      ? reportError
      : function (O) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var G = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof O == "object" &&
                O !== null &&
                typeof O.message == "string"
                  ? String(O.message)
                  : String(O),
              error: O,
            });
            if (!window.dispatchEvent(G)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", O);
            return;
          }
          console.error(O);
        };
  function re() {}
  return (
    (we.Children = {
      map: M,
      forEach: function (O, G, ne) {
        M(
          O,
          function () {
            G.apply(this, arguments);
          },
          ne,
        );
      },
      count: function (O) {
        var G = 0;
        return (
          M(O, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (O) {
        return (
          M(O, function (G) {
            return G;
          }) || []
        );
      },
      only: function (O) {
        if (!W(O))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return O;
      },
    }),
    (we.Component = R),
    (we.Fragment = a),
    (we.Profiler = s),
    (we.PureComponent = j),
    (we.StrictMode = i),
    (we.Suspense = p),
    (we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U),
    (we.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (O) {
        return U.H.useMemoCache(O);
      },
    }),
    (we.cache = function (O) {
      return function () {
        return O.apply(null, arguments);
      };
    }),
    (we.cloneElement = function (O, G, ne) {
      if (O == null)
        throw Error(
          "The argument must be a React element, but you passed " + O + ".",
        );
      var J = E({}, O.props),
        ie = O.key,
        me = void 0;
      if (G != null)
        for (de in (G.ref !== void 0 && (me = void 0),
        G.key !== void 0 && (ie = "" + G.key),
        G))
          !k.call(G, de) ||
            de === "key" ||
            de === "__self" ||
            de === "__source" ||
            (de === "ref" && G.ref === void 0) ||
            (J[de] = G[de]);
      var de = arguments.length - 2;
      if (de === 1) J.children = ne;
      else if (1 < de) {
        for (var te = Array(de), ue = 0; ue < de; ue++)
          te[ue] = arguments[ue + 2];
        J.children = te;
      }
      return Z(O.type, ie, void 0, void 0, me, J);
    }),
    (we.createContext = function (O) {
      return (
        (O = {
          $$typeof: f,
          _currentValue: O,
          _currentValue2: O,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (O.Provider = O),
        (O.Consumer = { $$typeof: u, _context: O }),
        O
      );
    }),
    (we.createElement = function (O, G, ne) {
      var J,
        ie = {},
        me = null;
      if (G != null)
        for (J in (G.key !== void 0 && (me = "" + G.key), G))
          k.call(G, J) &&
            J !== "key" &&
            J !== "__self" &&
            J !== "__source" &&
            (ie[J] = G[J]);
      var de = arguments.length - 2;
      if (de === 1) ie.children = ne;
      else if (1 < de) {
        for (var te = Array(de), ue = 0; ue < de; ue++)
          te[ue] = arguments[ue + 2];
        ie.children = te;
      }
      if (O && O.defaultProps)
        for (J in ((de = O.defaultProps), de))
          ie[J] === void 0 && (ie[J] = de[J]);
      return Z(O, me, void 0, void 0, null, ie);
    }),
    (we.createRef = function () {
      return { current: null };
    }),
    (we.forwardRef = function (O) {
      return { $$typeof: h, render: O };
    }),
    (we.isValidElement = W),
    (we.lazy = function (O) {
      return { $$typeof: g, _payload: { _status: -1, _result: O }, _init: Q };
    }),
    (we.memo = function (O, G) {
      return { $$typeof: m, type: O, compare: G === void 0 ? null : G };
    }),
    (we.startTransition = function (O) {
      var G = U.T,
        ne = {};
      U.T = ne;
      try {
        var J = O(),
          ie = U.S;
        ie !== null && ie(ne, J),
          typeof J == "object" &&
            J !== null &&
            typeof J.then == "function" &&
            J.then(re, Y);
      } catch (me) {
        Y(me);
      } finally {
        U.T = G;
      }
    }),
    (we.unstable_useCacheRefresh = function () {
      return U.H.useCacheRefresh();
    }),
    (we.use = function (O) {
      return U.H.use(O);
    }),
    (we.useActionState = function (O, G, ne) {
      return U.H.useActionState(O, G, ne);
    }),
    (we.useCallback = function (O, G) {
      return U.H.useCallback(O, G);
    }),
    (we.useContext = function (O) {
      return U.H.useContext(O);
    }),
    (we.useDebugValue = function () {}),
    (we.useDeferredValue = function (O, G) {
      return U.H.useDeferredValue(O, G);
    }),
    (we.useEffect = function (O, G, ne) {
      var J = U.H;
      if (typeof ne == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return J.useEffect(O, G);
    }),
    (we.useId = function () {
      return U.H.useId();
    }),
    (we.useImperativeHandle = function (O, G, ne) {
      return U.H.useImperativeHandle(O, G, ne);
    }),
    (we.useInsertionEffect = function (O, G) {
      return U.H.useInsertionEffect(O, G);
    }),
    (we.useLayoutEffect = function (O, G) {
      return U.H.useLayoutEffect(O, G);
    }),
    (we.useMemo = function (O, G) {
      return U.H.useMemo(O, G);
    }),
    (we.useOptimistic = function (O, G) {
      return U.H.useOptimistic(O, G);
    }),
    (we.useReducer = function (O, G, ne) {
      return U.H.useReducer(O, G, ne);
    }),
    (we.useRef = function (O) {
      return U.H.useRef(O);
    }),
    (we.useState = function (O) {
      return U.H.useState(O);
    }),
    (we.useSyncExternalStore = function (O, G, ne) {
      return U.H.useSyncExternalStore(O, G, ne);
    }),
    (we.useTransition = function () {
      return U.H.useTransition();
    }),
    (we.version = "19.1.0"),
    we
  );
}
var Qy;
function Yd() {
  return Qy || ((Qy = 1), (rd.exports = sw())), rd.exports;
}
var ad = { exports: {} },
  Ot = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xy;
function uw() {
  if (Xy) return Ot;
  Xy = 1;
  var e = Yd();
  function r(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        m += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function a() {}
  var i = {
      d: {
        f: a,
        r: function () {
          throw Error(r(522));
        },
        D: a,
        C: a,
        L: a,
        m: a,
        X: a,
        S: a,
        M: a,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function u(p, m, g) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: m,
      implementation: g,
    };
  }
  var f = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
    (Ot.createPortal = function (p, m) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(r(299));
      return u(p, m, null, g);
    }),
    (Ot.flushSync = function (p) {
      var m = f.T,
        g = i.p;
      try {
        if (((f.T = null), (i.p = 2), p)) return p();
      } finally {
        (f.T = m), (i.p = g), i.d.f();
      }
    }),
    (Ot.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        i.d.C(p, m));
    }),
    (Ot.prefetchDNS = function (p) {
      typeof p == "string" && i.d.D(p);
    }),
    (Ot.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var g = m.as,
          y = h(g, m.crossOrigin),
          S = typeof m.integrity == "string" ? m.integrity : void 0,
          w = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        g === "style"
          ? i.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: w,
            })
          : g === "script" &&
            i.d.X(p, {
              crossOrigin: y,
              integrity: S,
              fetchPriority: w,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Ot.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var g = h(m.as, m.crossOrigin);
            i.d.M(p, {
              crossOrigin: g,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && i.d.M(p);
    }),
    (Ot.preload = function (p, m) {
      if (
        typeof p == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var g = m.as,
          y = h(g, m.crossOrigin);
        i.d.L(p, g, {
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Ot.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var g = h(m.as, m.crossOrigin);
          i.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: g,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else i.d.m(p);
    }),
    (Ot.requestFormReset = function (p) {
      i.d.r(p);
    }),
    (Ot.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (Ot.useFormState = function (p, m, g) {
      return f.H.useFormState(p, m, g);
    }),
    (Ot.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (Ot.version = "19.1.0"),
    Ot
  );
}
var Ky;
function E0() {
  if (Ky) return ad.exports;
  Ky = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (r) {
        console.error(r);
      }
  }
  return e(), (ad.exports = uw()), ad.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Iy;
function cw() {
  if (Iy) return Yi;
  Iy = 1;
  var e = lw(),
    r = Yd(),
    a = E0();
  function i(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var o = 2; o < arguments.length; o++)
        n += "&args[]=" + encodeURIComponent(arguments[o]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function u(t) {
    var n = t,
      o = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do (n = t), (n.flags & 4098) !== 0 && (o = n.return), (t = n.return);
      while (t);
    }
    return n.tag === 3 ? o : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        (n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)),
        n !== null)
      )
        return n.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (u(t) !== t) throw Error(i(188));
  }
  function p(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = u(t)), n === null)) throw Error(i(188));
      return n !== t ? null : t;
    }
    for (var o = t, l = n; ; ) {
      var c = o.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (((l = c.return), l !== null)) {
          o = l;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === o) return h(c), t;
          if (d === l) return h(c), n;
          d = d.sibling;
        }
        throw Error(i(188));
      }
      if (o.return !== l.return) (o = c), (l = d);
      else {
        for (var b = !1, C = c.child; C; ) {
          if (C === o) {
            (b = !0), (o = c), (l = d);
            break;
          }
          if (C === l) {
            (b = !0), (l = c), (o = d);
            break;
          }
          C = C.sibling;
        }
        if (!b) {
          for (C = d.child; C; ) {
            if (C === o) {
              (b = !0), (o = d), (l = c);
              break;
            }
            if (C === l) {
              (b = !0), (l = d), (o = c);
              break;
            }
            C = C.sibling;
          }
          if (!b) throw Error(i(189));
        }
      }
      if (o.alternate !== l) throw Error(i(190));
    }
    if (o.tag !== 3) throw Error(i(188));
    return o.stateNode.current === o ? t : n;
  }
  function m(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((n = m(t)), n !== null)) return n;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign,
    y = Symbol.for("react.element"),
    S = Symbol.for("react.transitional.element"),
    w = Symbol.for("react.portal"),
    E = Symbol.for("react.fragment"),
    T = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    _ = Symbol.for("react.provider"),
    j = Symbol.for("react.consumer"),
    A = Symbol.for("react.context"),
    D = Symbol.for("react.forward_ref"),
    U = Symbol.for("react.suspense"),
    k = Symbol.for("react.suspense_list"),
    Z = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    W = Symbol.for("react.activity"),
    ee = Symbol.for("react.memo_cache_sentinel"),
    pe = Symbol.iterator;
  function oe(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (pe && t[pe]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var ce = Symbol.for("react.client.reference");
  function fe(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ce ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case T:
        return "StrictMode";
      case U:
        return "Suspense";
      case k:
        return "SuspenseList";
      case W:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case A:
          return (t.displayName || "Context") + ".Provider";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case D:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case Z:
          return (
            (n = t.displayName || null), n !== null ? n : fe(t.type) || "Memo"
          );
        case V:
          (n = t._payload), (t = t._init);
          try {
            return fe(t(n));
          } catch {}
      }
    return null;
  }
  var le = Array.isArray,
    M = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = { pending: !1, data: null, method: null, action: null },
    re = [],
    O = -1;
  function G(t) {
    return { current: t };
  }
  function ne(t) {
    0 > O || ((t.current = re[O]), (re[O] = null), O--);
  }
  function J(t, n) {
    O++, (re[O] = t.current), (t.current = n);
  }
  var ie = G(null),
    me = G(null),
    de = G(null),
    te = G(null);
  function ue(t, n) {
    switch ((J(de, n), J(me, t), J(ie, null), n.nodeType)) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? yy(t) : 0;
        break;
      default:
        if (((t = n.tagName), (n = n.namespaceURI)))
          (n = yy(n)), (t = vy(n, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    ne(ie), J(ie, t);
  }
  function Ae() {
    ne(ie), ne(me), ne(de);
  }
  function Ve(t) {
    t.memoizedState !== null && J(te, t);
    var n = ie.current,
      o = vy(n, t.type);
    n !== o && (J(me, t), J(ie, o));
  }
  function Ie(t) {
    me.current === t && (ne(ie), ne(me)),
      te.current === t && (ne(te), (Hi._currentValue = Y));
  }
  var St = Object.prototype.hasOwnProperty,
    qe = e.unstable_scheduleCallback,
    xt = e.unstable_cancelCallback,
    un = e.unstable_shouldYield,
    qn = e.unstable_requestPaint,
    ft = e.unstable_now,
    it = e.unstable_getCurrentPriorityLevel,
    _n = e.unstable_ImmediatePriority,
    Yn = e.unstable_UserBlockingPriority,
    lt = e.unstable_NormalPriority,
    Go = e.unstable_LowPriority,
    ja = e.unstable_IdlePriority,
    Fo = e.log,
    Da = e.unstable_setDisableYieldValue,
    Ye = null,
    wt = null;
  function cn(t) {
    if (
      (typeof Fo == "function" && Da(t),
      wt && typeof wt.setStrictMode == "function")
    )
      try {
        wt.setStrictMode(Ye, t);
      } catch {}
  }
  var Ct = Math.clz32 ? Math.clz32 : Zu,
    Na = Math.log,
    Rn = Math.LN2;
  function Zu(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((Na(t) / Rn) | 0)) | 0;
  }
  var Ma = 256,
    $a = 4194304;
  function Tn(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ka(t, n, o) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var c = 0,
      d = t.suspendedLanes,
      b = t.pingedLanes;
    t = t.warmLanes;
    var C = l & 134217727;
    return (
      C !== 0
        ? ((l = C & ~d),
          l !== 0
            ? (c = Tn(l))
            : ((b &= C),
              b !== 0
                ? (c = Tn(b))
                : o || ((o = C & ~t), o !== 0 && (c = Tn(o)))))
        : ((C = l & ~d),
          C !== 0
            ? (c = Tn(C))
            : b !== 0
              ? (c = Tn(b))
              : o || ((o = l & ~t), o !== 0 && (c = Tn(o)))),
      c === 0
        ? 0
        : n !== 0 &&
            n !== c &&
            (n & d) === 0 &&
            ((d = c & -c),
            (o = n & -n),
            d >= o || (d === 32 && (o & 4194048) !== 0))
          ? n
          : c
    );
  }
  function ta(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Vu(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Qo() {
    var t = Ma;
    return (Ma <<= 1), (Ma & 4194048) === 0 && (Ma = 256), t;
  }
  function La() {
    var t = $a;
    return ($a <<= 1), ($a & 62914560) === 0 && ($a = 4194304), t;
  }
  function na(t) {
    for (var n = [], o = 0; 31 > o; o++) n.push(t);
    return n;
  }
  function fn(t, n) {
    (t.pendingLanes |= n),
      n !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function Lt(t, n, o, l, c, d) {
    var b = t.pendingLanes;
    (t.pendingLanes = o),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= o),
      (t.entangledLanes &= o),
      (t.errorRecoveryDisabledLanes &= o),
      (t.shellSuspendCounter = 0);
    var C = t.entanglements,
      z = t.expirationTimes,
      H = t.hiddenUpdates;
    for (o = b & ~o; 0 < o; ) {
      var q = 31 - Ct(o),
        X = 1 << q;
      (C[q] = 0), (z[q] = -1);
      var B = H[q];
      if (B !== null)
        for (H[q] = null, q = 0; q < B.length; q++) {
          var P = B[q];
          P !== null && (P.lane &= -536870913);
        }
      o &= ~X;
    }
    l !== 0 && zl(t, l, 0),
      d !== 0 && c === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(b & ~n));
  }
  function zl(t, n, o) {
    (t.pendingLanes |= n), (t.suspendedLanes &= ~n);
    var l = 31 - Ct(n);
    (t.entangledLanes |= n),
      (t.entanglements[l] = t.entanglements[l] | 1073741824 | (o & 4194090));
  }
  function qu(t, n) {
    var o = (t.entangledLanes |= n);
    for (t = t.entanglements; o; ) {
      var l = 31 - Ct(o),
        c = 1 << l;
      (c & n) | (t[l] & n) && (t[l] |= n), (o &= ~c);
    }
  }
  function Xo(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Ko(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function dt() {
    var t = Q.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Ly(t.type));
  }
  function ra(t, n) {
    var o = Q.p;
    try {
      return (Q.p = t), n();
    } finally {
      Q.p = o;
    }
  }
  var Wt = Math.random().toString(36).slice(2),
    ht = "__reactFiber$" + Wt,
    st = "__reactProps$" + Wt,
    Gn = "__reactContainer$" + Wt,
    Ua = "__reactEvents$" + Wt,
    Ol = "__reactListeners$" + Wt,
    Yu = "__reactHandles$" + Wt,
    jl = "__reactResources$" + Wt,
    Rr = "__reactMarker$" + Wt;
  function Io(t) {
    delete t[ht], delete t[st], delete t[Ua], delete t[Ol], delete t[Yu];
  }
  function ir(t) {
    var n = t[ht];
    if (n) return n;
    for (var o = t.parentNode; o; ) {
      if ((n = o[Gn] || o[ht])) {
        if (
          ((o = n.alternate),
          n.child !== null || (o !== null && o.child !== null))
        )
          for (t = wy(t); t !== null; ) {
            if ((o = t[ht])) return o;
            t = wy(t);
          }
        return n;
      }
      (t = o), (o = t.parentNode);
    }
    return null;
  }
  function je(t) {
    if ((t = t[ht] || t[Gn])) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function lr(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(i(33));
  }
  function Tr(t) {
    var n = t[jl];
    return (
      n ||
        (n = t[jl] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      n
    );
  }
  function pt(t) {
    t[Rr] = !0;
  }
  var ip = new Set(),
    lp = {};
  function aa(t, n) {
    Ha(t, n), Ha(t + "Capture", n);
  }
  function Ha(t, n) {
    for (lp[t] = n, t = 0; t < n.length; t++) ip.add(n[t]);
  }
  var X1 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    sp = {},
    up = {};
  function K1(t) {
    return St.call(up, t)
      ? !0
      : St.call(sp, t)
        ? !1
        : X1.test(t)
          ? (up[t] = !0)
          : ((sp[t] = !0), !1);
  }
  function Dl(t, n, o) {
    if (K1(n))
      if (o === null) t.removeAttribute(n);
      else {
        switch (typeof o) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + o);
      }
  }
  function Nl(t, n, o) {
    if (o === null) t.removeAttribute(n);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + o);
    }
  }
  function sr(t, n, o, l) {
    if (l === null) t.removeAttribute(o);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(o);
          return;
      }
      t.setAttributeNS(n, o, "" + l);
    }
  }
  var Gu, cp;
  function Ba(t) {
    if (Gu === void 0)
      try {
        throw Error();
      } catch (o) {
        var n = o.stack.trim().match(/\n( *(at )?)/);
        (Gu = (n && n[1]) || ""),
          (cp =
            -1 <
            o.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < o.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
      }
    return (
      `
` +
      Gu +
      t +
      cp
    );
  }
  var Fu = !1;
  function Qu(t, n) {
    if (!t || Fu) return "";
    Fu = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var X = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(X.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(X, []);
                } catch (P) {
                  var B = P;
                }
                Reflect.construct(t, [], X);
              } else {
                try {
                  X.call();
                } catch (P) {
                  B = P;
                }
                t.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                B = P;
              }
              (X = t()) &&
                typeof X.catch == "function" &&
                X.catch(function () {});
            }
          } catch (P) {
            if (P && B && typeof P.stack == "string") return [P.stack, B.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name",
      );
      c &&
        c.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = l.DetermineComponentFrameRoot(),
        b = d[0],
        C = d[1];
      if (b && C) {
        var z = b.split(`
`),
          H = C.split(`
`);
        for (
          c = l = 0;
          l < z.length && !z[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; c < H.length && !H[c].includes("DetermineComponentFrameRoot"); )
          c++;
        if (l === z.length || c === H.length)
          for (
            l = z.length - 1, c = H.length - 1;
            1 <= l && 0 <= c && z[l] !== H[c];

          )
            c--;
        for (; 1 <= l && 0 <= c; l--, c--)
          if (z[l] !== H[c]) {
            if (l !== 1 || c !== 1)
              do
                if ((l--, c--, 0 > c || z[l] !== H[c])) {
                  var q =
                    `
` + z[l].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      q.includes("<anonymous>") &&
                      (q = q.replace("<anonymous>", t.displayName)),
                    q
                  );
                }
              while (1 <= l && 0 <= c);
            break;
          }
      }
    } finally {
      (Fu = !1), (Error.prepareStackTrace = o);
    }
    return (o = t ? t.displayName || t.name : "") ? Ba(o) : "";
  }
  function I1(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ba(t.type);
      case 16:
        return Ba("Lazy");
      case 13:
        return Ba("Suspense");
      case 19:
        return Ba("SuspenseList");
      case 0:
      case 15:
        return Qu(t.type, !1);
      case 11:
        return Qu(t.type.render, !1);
      case 1:
        return Qu(t.type, !0);
      case 31:
        return Ba("Activity");
      default:
        return "";
    }
  }
  function fp(t) {
    try {
      var n = "";
      do (n += I1(t)), (t = t.return);
      while (t);
      return n;
    } catch (o) {
      return (
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack
      );
    }
  }
  function dn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function dp(t) {
    var n = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (n === "checkbox" || n === "radio")
    );
  }
  function W1(t) {
    var n = dp(t) ? "checked" : "value",
      o = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
      l = "" + t[n];
    if (
      !t.hasOwnProperty(n) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var c = o.get,
        d = o.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return c.call(this);
          },
          set: function (b) {
            (l = "" + b), d.call(this, b);
          },
        }),
        Object.defineProperty(t, n, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (b) {
            l = "" + b;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[n];
          },
        }
      );
    }
  }
  function Ml(t) {
    t._valueTracker || (t._valueTracker = W1(t));
  }
  function hp(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var o = n.getValue(),
      l = "";
    return (
      t && (l = dp(t) ? (t.checked ? "true" : "false") : t.value),
      (t = l),
      t !== o ? (n.setValue(t), !0) : !1
    );
  }
  function $l(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var J1 = /[\n"\\]/g;
  function hn(t) {
    return t.replace(J1, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function Xu(t, n, o, l, c, d, b, C) {
    (t.name = ""),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (t.type = b)
        : t.removeAttribute("type"),
      n != null
        ? b === "number"
          ? ((n === 0 && t.value === "") || t.value != n) &&
            (t.value = "" + dn(n))
          : t.value !== "" + dn(n) && (t.value = "" + dn(n))
        : (b !== "submit" && b !== "reset") || t.removeAttribute("value"),
      n != null
        ? Ku(t, b, dn(n))
        : o != null
          ? Ku(t, b, dn(o))
          : l != null && t.removeAttribute("value"),
      c == null && d != null && (t.defaultChecked = !!d),
      c != null &&
        (t.checked = c && typeof c != "function" && typeof c != "symbol"),
      C != null &&
      typeof C != "function" &&
      typeof C != "symbol" &&
      typeof C != "boolean"
        ? (t.name = "" + dn(C))
        : t.removeAttribute("name");
  }
  function pp(t, n, o, l, c, d, b, C) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (t.type = d),
      n != null || o != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || n != null)) return;
      (o = o != null ? "" + dn(o) : ""),
        (n = n != null ? "" + dn(n) : o),
        C || n === t.value || (t.value = n),
        (t.defaultValue = n);
    }
    (l = l ?? c),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (t.checked = C ? t.checked : !!l),
      (t.defaultChecked = !!l),
      b != null &&
        typeof b != "function" &&
        typeof b != "symbol" &&
        typeof b != "boolean" &&
        (t.name = b);
  }
  function Ku(t, n, o) {
    (n === "number" && $l(t.ownerDocument) === t) ||
      t.defaultValue === "" + o ||
      (t.defaultValue = "" + o);
  }
  function Pa(t, n, o, l) {
    if (((t = t.options), n)) {
      n = {};
      for (var c = 0; c < o.length; c++) n["$" + o[c]] = !0;
      for (o = 0; o < t.length; o++)
        (c = n.hasOwnProperty("$" + t[o].value)),
          t[o].selected !== c && (t[o].selected = c),
          c && l && (t[o].defaultSelected = !0);
    } else {
      for (o = "" + dn(o), n = null, c = 0; c < t.length; c++) {
        if (t[c].value === o) {
          (t[c].selected = !0), l && (t[c].defaultSelected = !0);
          return;
        }
        n !== null || t[c].disabled || (n = t[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function mp(t, n, o) {
    if (
      n != null &&
      ((n = "" + dn(n)), n !== t.value && (t.value = n), o == null)
    ) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = o != null ? "" + dn(o) : "";
  }
  function gp(t, n, o, l) {
    if (n == null) {
      if (l != null) {
        if (o != null) throw Error(i(92));
        if (le(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        o = l;
      }
      o == null && (o = ""), (n = o);
    }
    (o = dn(n)),
      (t.defaultValue = o),
      (l = t.textContent),
      l === o && l !== "" && l !== null && (t.value = l);
  }
  function Za(t, n) {
    if (n) {
      var o = t.firstChild;
      if (o && o === t.lastChild && o.nodeType === 3) {
        o.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var eS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function yp(t, n, o) {
    var l = n.indexOf("--") === 0;
    o == null || typeof o == "boolean" || o === ""
      ? l
        ? t.setProperty(n, "")
        : n === "float"
          ? (t.cssFloat = "")
          : (t[n] = "")
      : l
        ? t.setProperty(n, o)
        : typeof o != "number" || o === 0 || eS.has(n)
          ? n === "float"
            ? (t.cssFloat = o)
            : (t[n] = ("" + o).trim())
          : (t[n] = o + "px");
  }
  function vp(t, n, o) {
    if (n != null && typeof n != "object") throw Error(i(62));
    if (((t = t.style), o != null)) {
      for (var l in o)
        !o.hasOwnProperty(l) ||
          (n != null && n.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? t.setProperty(l, "")
            : l === "float"
              ? (t.cssFloat = "")
              : (t[l] = ""));
      for (var c in n)
        (l = n[c]), n.hasOwnProperty(c) && o[c] !== l && yp(t, c, l);
    } else for (var d in n) n.hasOwnProperty(d) && yp(t, d, n[d]);
  }
  function Iu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var tS = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    nS =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function kl(t) {
    return nS.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  var Wu = null;
  function Ju(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Va = null,
    qa = null;
  function bp(t) {
    var n = je(t);
    if (n && (t = n.stateNode)) {
      var o = t[st] || null;
      e: switch (((t = n.stateNode), n.type)) {
        case "input":
          if (
            (Xu(
              t,
              o.value,
              o.defaultValue,
              o.defaultValue,
              o.checked,
              o.defaultChecked,
              o.type,
              o.name,
            ),
            (n = o.name),
            o.type === "radio" && n != null)
          ) {
            for (o = t; o.parentNode; ) o = o.parentNode;
            for (
              o = o.querySelectorAll(
                'input[name="' + hn("" + n) + '"][type="radio"]',
              ),
                n = 0;
              n < o.length;
              n++
            ) {
              var l = o[n];
              if (l !== t && l.form === t.form) {
                var c = l[st] || null;
                if (!c) throw Error(i(90));
                Xu(
                  l,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name,
                );
              }
            }
            for (n = 0; n < o.length; n++)
              (l = o[n]), l.form === t.form && hp(l);
          }
          break e;
        case "textarea":
          mp(t, o.value, o.defaultValue);
          break e;
        case "select":
          (n = o.value), n != null && Pa(t, !!o.multiple, n, !1);
      }
    }
  }
  var ec = !1;
  function Sp(t, n, o) {
    if (ec) return t(n, o);
    ec = !0;
    try {
      var l = t(n);
      return l;
    } finally {
      if (
        ((ec = !1),
        (Va !== null || qa !== null) &&
          (xs(), Va && ((n = Va), (t = qa), (qa = Va = null), bp(n), t)))
      )
        for (n = 0; n < t.length; n++) bp(t[n]);
    }
  }
  function Wo(t, n) {
    var o = t.stateNode;
    if (o === null) return null;
    var l = o[st] || null;
    if (l === null) return null;
    o = l[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) ||
          ((t = t.type),
          (l = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !l);
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (o && typeof o != "function") throw Error(i(231, n, typeof o));
    return o;
  }
  var ur = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    tc = !1;
  if (ur)
    try {
      var Jo = {};
      Object.defineProperty(Jo, "passive", {
        get: function () {
          tc = !0;
        },
      }),
        window.addEventListener("test", Jo, Jo),
        window.removeEventListener("test", Jo, Jo);
    } catch {
      tc = !1;
    }
  var Ar = null,
    nc = null,
    Ll = null;
  function xp() {
    if (Ll) return Ll;
    var t,
      n = nc,
      o = n.length,
      l,
      c = "value" in Ar ? Ar.value : Ar.textContent,
      d = c.length;
    for (t = 0; t < o && n[t] === c[t]; t++);
    var b = o - t;
    for (l = 1; l <= b && n[o - l] === c[d - l]; l++);
    return (Ll = c.slice(t, 1 < l ? 1 - l : void 0));
  }
  function Ul(t) {
    var n = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && n === 13 && (t = 13))
        : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Hl() {
    return !0;
  }
  function wp() {
    return !1;
  }
  function Yt(t) {
    function n(o, l, c, d, b) {
      (this._reactName = o),
        (this._targetInst = c),
        (this.type = l),
        (this.nativeEvent = d),
        (this.target = b),
        (this.currentTarget = null);
      for (var C in t)
        t.hasOwnProperty(C) && ((o = t[C]), (this[C] = o ? o(d) : d[C]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Hl
          : wp),
        (this.isPropagationStopped = wp),
        this
      );
    }
    return (
      g(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var o = this.nativeEvent;
          o &&
            (o.preventDefault
              ? o.preventDefault()
              : typeof o.returnValue != "unknown" && (o.returnValue = !1),
            (this.isDefaultPrevented = Hl));
        },
        stopPropagation: function () {
          var o = this.nativeEvent;
          o &&
            (o.stopPropagation
              ? o.stopPropagation()
              : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0),
            (this.isPropagationStopped = Hl));
        },
        persist: function () {},
        isPersistent: Hl,
      }),
      n
    );
  }
  var oa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Bl = Yt(oa),
    ei = g({}, oa, { view: 0, detail: 0 }),
    rS = Yt(ei),
    rc,
    ac,
    ti,
    Pl = g({}, ei, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ic,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== ti &&
              (ti && t.type === "mousemove"
                ? ((rc = t.screenX - ti.screenX), (ac = t.screenY - ti.screenY))
                : (ac = rc = 0),
              (ti = t)),
            rc);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : ac;
      },
    }),
    Cp = Yt(Pl),
    aS = g({}, Pl, { dataTransfer: 0 }),
    oS = Yt(aS),
    iS = g({}, ei, { relatedTarget: 0 }),
    oc = Yt(iS),
    lS = g({}, oa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    sS = Yt(lS),
    uS = g({}, oa, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    cS = Yt(uS),
    fS = g({}, oa, { data: 0 }),
    Ep = Yt(fS),
    dS = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    hS = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    pS = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function mS(t) {
    var n = this.nativeEvent;
    return n.getModifierState
      ? n.getModifierState(t)
      : (t = pS[t])
        ? !!n[t]
        : !1;
  }
  function ic() {
    return mS;
  }
  var gS = g({}, ei, {
      key: function (t) {
        if (t.key) {
          var n = dS[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = Ul(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? hS[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ic,
      charCode: function (t) {
        return t.type === "keypress" ? Ul(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Ul(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    yS = Yt(gS),
    vS = g({}, Pl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    _p = Yt(vS),
    bS = g({}, ei, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ic,
    }),
    SS = Yt(bS),
    xS = g({}, oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    wS = Yt(xS),
    CS = g({}, Pl, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    ES = Yt(CS),
    _S = g({}, oa, { newState: 0, oldState: 0 }),
    RS = Yt(_S),
    TS = [9, 13, 27, 32],
    lc = ur && "CompositionEvent" in window,
    ni = null;
  ur && "documentMode" in document && (ni = document.documentMode);
  var AS = ur && "TextEvent" in window && !ni,
    Rp = ur && (!lc || (ni && 8 < ni && 11 >= ni)),
    Tp = " ",
    Ap = !1;
  function zp(t, n) {
    switch (t) {
      case "keyup":
        return TS.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Op(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ya = !1;
  function zS(t, n) {
    switch (t) {
      case "compositionend":
        return Op(n);
      case "keypress":
        return n.which !== 32 ? null : ((Ap = !0), Tp);
      case "textInput":
        return (t = n.data), t === Tp && Ap ? null : t;
      default:
        return null;
    }
  }
  function OS(t, n) {
    if (Ya)
      return t === "compositionend" || (!lc && zp(t, n))
        ? ((t = xp()), (Ll = nc = Ar = null), (Ya = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Rp && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var jS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function jp(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!jS[t.type] : n === "textarea";
  }
  function Dp(t, n, o, l) {
    Va ? (qa ? qa.push(l) : (qa = [l])) : (Va = l),
      (n = Ts(n, "onChange")),
      0 < n.length &&
        ((o = new Bl("onChange", "change", null, o, l)),
        t.push({ event: o, listeners: n }));
  }
  var ri = null,
    ai = null;
  function DS(t) {
    dy(t, 0);
  }
  function Zl(t) {
    var n = lr(t);
    if (hp(n)) return t;
  }
  function Np(t, n) {
    if (t === "change") return n;
  }
  var Mp = !1;
  if (ur) {
    var sc;
    if (ur) {
      var uc = "oninput" in document;
      if (!uc) {
        var $p = document.createElement("div");
        $p.setAttribute("oninput", "return;"),
          (uc = typeof $p.oninput == "function");
      }
      sc = uc;
    } else sc = !1;
    Mp = sc && (!document.documentMode || 9 < document.documentMode);
  }
  function kp() {
    ri && (ri.detachEvent("onpropertychange", Lp), (ai = ri = null));
  }
  function Lp(t) {
    if (t.propertyName === "value" && Zl(ai)) {
      var n = [];
      Dp(n, ai, t, Ju(t)), Sp(DS, n);
    }
  }
  function NS(t, n, o) {
    t === "focusin"
      ? (kp(), (ri = n), (ai = o), ri.attachEvent("onpropertychange", Lp))
      : t === "focusout" && kp();
  }
  function MS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Zl(ai);
  }
  function $S(t, n) {
    if (t === "click") return Zl(n);
  }
  function kS(t, n) {
    if (t === "input" || t === "change") return Zl(n);
  }
  function LS(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var Jt = typeof Object.is == "function" ? Object.is : LS;
  function oi(t, n) {
    if (Jt(t, n)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof n != "object" ||
      n === null
    )
      return !1;
    var o = Object.keys(t),
      l = Object.keys(n);
    if (o.length !== l.length) return !1;
    for (l = 0; l < o.length; l++) {
      var c = o[l];
      if (!St.call(n, c) || !Jt(t[c], n[c])) return !1;
    }
    return !0;
  }
  function Up(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Hp(t, n) {
    var o = Up(t);
    t = 0;
    for (var l; o; ) {
      if (o.nodeType === 3) {
        if (((l = t + o.textContent.length), t <= n && l >= n))
          return { node: o, offset: n - t };
        t = l;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Up(o);
    }
  }
  function Bp(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Bp(t, n.parentNode)
            : "contains" in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Pp(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var n = $l(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var o = typeof n.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) t = n.contentWindow;
      else break;
      n = $l(t.document);
    }
    return n;
  }
  function cc(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        n === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var US = ur && "documentMode" in document && 11 >= document.documentMode,
    Ga = null,
    fc = null,
    ii = null,
    dc = !1;
  function Zp(t, n, o) {
    var l =
      o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    dc ||
      Ga == null ||
      Ga !== $l(l) ||
      ((l = Ga),
      "selectionStart" in l && cc(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (ii && oi(ii, l)) ||
        ((ii = l),
        (l = Ts(fc, "onSelect")),
        0 < l.length &&
          ((n = new Bl("onSelect", "select", null, n, o)),
          t.push({ event: n, listeners: l }),
          (n.target = Ga))));
  }
  function ia(t, n) {
    var o = {};
    return (
      (o[t.toLowerCase()] = n.toLowerCase()),
      (o["Webkit" + t] = "webkit" + n),
      (o["Moz" + t] = "moz" + n),
      o
    );
  }
  var Fa = {
      animationend: ia("Animation", "AnimationEnd"),
      animationiteration: ia("Animation", "AnimationIteration"),
      animationstart: ia("Animation", "AnimationStart"),
      transitionrun: ia("Transition", "TransitionRun"),
      transitionstart: ia("Transition", "TransitionStart"),
      transitioncancel: ia("Transition", "TransitionCancel"),
      transitionend: ia("Transition", "TransitionEnd"),
    },
    hc = {},
    Vp = {};
  ur &&
    ((Vp = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Fa.animationend.animation,
      delete Fa.animationiteration.animation,
      delete Fa.animationstart.animation),
    "TransitionEvent" in window || delete Fa.transitionend.transition);
  function la(t) {
    if (hc[t]) return hc[t];
    if (!Fa[t]) return t;
    var n = Fa[t],
      o;
    for (o in n) if (n.hasOwnProperty(o) && o in Vp) return (hc[t] = n[o]);
    return t;
  }
  var qp = la("animationend"),
    Yp = la("animationiteration"),
    Gp = la("animationstart"),
    HS = la("transitionrun"),
    BS = la("transitionstart"),
    PS = la("transitioncancel"),
    Fp = la("transitionend"),
    Qp = new Map(),
    pc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  pc.push("scrollEnd");
  function An(t, n) {
    Qp.set(t, n), aa(n, [t]);
  }
  var Xp = new WeakMap();
  function pn(t, n) {
    if (typeof t == "object" && t !== null) {
      var o = Xp.get(t);
      return o !== void 0
        ? o
        : ((n = { value: t, source: n, stack: fp(n) }), Xp.set(t, n), n);
    }
    return { value: t, source: n, stack: fp(n) };
  }
  var mn = [],
    Qa = 0,
    mc = 0;
  function Vl() {
    for (var t = Qa, n = (mc = Qa = 0); n < t; ) {
      var o = mn[n];
      mn[n++] = null;
      var l = mn[n];
      mn[n++] = null;
      var c = mn[n];
      mn[n++] = null;
      var d = mn[n];
      if (((mn[n++] = null), l !== null && c !== null)) {
        var b = l.pending;
        b === null ? (c.next = c) : ((c.next = b.next), (b.next = c)),
          (l.pending = c);
      }
      d !== 0 && Kp(o, c, d);
    }
  }
  function ql(t, n, o, l) {
    (mn[Qa++] = t),
      (mn[Qa++] = n),
      (mn[Qa++] = o),
      (mn[Qa++] = l),
      (mc |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l);
  }
  function gc(t, n, o, l) {
    return ql(t, n, o, l), Yl(t);
  }
  function Xa(t, n) {
    return ql(t, null, null, n), Yl(t);
  }
  function Kp(t, n, o) {
    t.lanes |= o;
    var l = t.alternate;
    l !== null && (l.lanes |= o);
    for (var c = !1, d = t.return; d !== null; )
      (d.childLanes |= o),
        (l = d.alternate),
        l !== null && (l.childLanes |= o),
        d.tag === 22 &&
          ((t = d.stateNode), t === null || t._visibility & 1 || (c = !0)),
        (t = d),
        (d = d.return);
    return t.tag === 3
      ? ((d = t.stateNode),
        c &&
          n !== null &&
          ((c = 31 - Ct(o)),
          (t = d.hiddenUpdates),
          (l = t[c]),
          l === null ? (t[c] = [n]) : l.push(n),
          (n.lane = o | 536870912)),
        d)
      : null;
  }
  function Yl(t) {
    if (50 < ji) throw ((ji = 0), (Cf = null), Error(i(185)));
    for (var n = t.return; n !== null; ) (t = n), (n = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ka = {};
  function ZS(t, n, o, l) {
    (this.tag = t),
      (this.key = o),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function en(t, n, o, l) {
    return new ZS(t, n, o, l);
  }
  function yc(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function cr(t, n) {
    var o = t.alternate;
    return (
      o === null
        ? ((o = en(t.tag, n, t.key, t.mode)),
          (o.elementType = t.elementType),
          (o.type = t.type),
          (o.stateNode = t.stateNode),
          (o.alternate = t),
          (t.alternate = o))
        : ((o.pendingProps = n),
          (o.type = t.type),
          (o.flags = 0),
          (o.subtreeFlags = 0),
          (o.deletions = null)),
      (o.flags = t.flags & 65011712),
      (o.childLanes = t.childLanes),
      (o.lanes = t.lanes),
      (o.child = t.child),
      (o.memoizedProps = t.memoizedProps),
      (o.memoizedState = t.memoizedState),
      (o.updateQueue = t.updateQueue),
      (n = t.dependencies),
      (o.dependencies =
        n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (o.sibling = t.sibling),
      (o.index = t.index),
      (o.ref = t.ref),
      (o.refCleanup = t.refCleanup),
      o
    );
  }
  function Ip(t, n) {
    t.flags &= 65011714;
    var o = t.alternate;
    return (
      o === null
        ? ((t.childLanes = 0),
          (t.lanes = n),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = o.childLanes),
          (t.lanes = o.lanes),
          (t.child = o.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = o.memoizedProps),
          (t.memoizedState = o.memoizedState),
          (t.updateQueue = o.updateQueue),
          (t.type = o.type),
          (n = o.dependencies),
          (t.dependencies =
            n === null
              ? null
              : { lanes: n.lanes, firstContext: n.firstContext })),
      t
    );
  }
  function Gl(t, n, o, l, c, d) {
    var b = 0;
    if (((l = t), typeof t == "function")) yc(t) && (b = 1);
    else if (typeof t == "string")
      b = qx(t, o, ie.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      e: switch (t) {
        case W:
          return (t = en(31, o, n, c)), (t.elementType = W), (t.lanes = d), t;
        case E:
          return sa(o.children, c, d, n);
        case T:
          (b = 8), (c |= 24);
          break;
        case R:
          return (
            (t = en(12, o, n, c | 2)), (t.elementType = R), (t.lanes = d), t
          );
        case U:
          return (t = en(13, o, n, c)), (t.elementType = U), (t.lanes = d), t;
        case k:
          return (t = en(19, o, n, c)), (t.elementType = k), (t.lanes = d), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case _:
              case A:
                b = 10;
                break e;
              case j:
                b = 9;
                break e;
              case D:
                b = 11;
                break e;
              case Z:
                b = 14;
                break e;
              case V:
                (b = 16), (l = null);
                break e;
            }
          (b = 29),
            (o = Error(i(130, t === null ? "null" : typeof t, ""))),
            (l = null);
      }
    return (
      (n = en(b, o, n, c)), (n.elementType = t), (n.type = l), (n.lanes = d), n
    );
  }
  function sa(t, n, o, l) {
    return (t = en(7, t, l, n)), (t.lanes = o), t;
  }
  function vc(t, n, o) {
    return (t = en(6, t, null, n)), (t.lanes = o), t;
  }
  function bc(t, n, o) {
    return (
      (n = en(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = o),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  var Ia = [],
    Wa = 0,
    Fl = null,
    Ql = 0,
    gn = [],
    yn = 0,
    ua = null,
    fr = 1,
    dr = "";
  function ca(t, n) {
    (Ia[Wa++] = Ql), (Ia[Wa++] = Fl), (Fl = t), (Ql = n);
  }
  function Wp(t, n, o) {
    (gn[yn++] = fr), (gn[yn++] = dr), (gn[yn++] = ua), (ua = t);
    var l = fr;
    t = dr;
    var c = 32 - Ct(l) - 1;
    (l &= ~(1 << c)), (o += 1);
    var d = 32 - Ct(n) + c;
    if (30 < d) {
      var b = c - (c % 5);
      (d = (l & ((1 << b) - 1)).toString(32)),
        (l >>= b),
        (c -= b),
        (fr = (1 << (32 - Ct(n) + c)) | (o << c) | l),
        (dr = d + t);
    } else (fr = (1 << d) | (o << c) | l), (dr = t);
  }
  function Sc(t) {
    t.return !== null && (ca(t, 1), Wp(t, 1, 0));
  }
  function xc(t) {
    for (; t === Fl; )
      (Fl = Ia[--Wa]), (Ia[Wa] = null), (Ql = Ia[--Wa]), (Ia[Wa] = null);
    for (; t === ua; )
      (ua = gn[--yn]),
        (gn[yn] = null),
        (dr = gn[--yn]),
        (gn[yn] = null),
        (fr = gn[--yn]),
        (gn[yn] = null);
  }
  var Ut = null,
    We = null,
    Ne = !1,
    fa = null,
    Fn = !1,
    wc = Error(i(519));
  function da(t) {
    var n = Error(i(418, ""));
    throw (ui(pn(n, t)), wc);
  }
  function Jp(t) {
    var n = t.stateNode,
      o = t.type,
      l = t.memoizedProps;
    switch (((n[ht] = t), (n[st] = l), o)) {
      case "dialog":
        Te("cancel", n), Te("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Te("load", n);
        break;
      case "video":
      case "audio":
        for (o = 0; o < Ni.length; o++) Te(Ni[o], n);
        break;
      case "source":
        Te("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Te("error", n), Te("load", n);
        break;
      case "details":
        Te("toggle", n);
        break;
      case "input":
        Te("invalid", n),
          pp(
            n,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ),
          Ml(n);
        break;
      case "select":
        Te("invalid", n);
        break;
      case "textarea":
        Te("invalid", n), gp(n, l.value, l.defaultValue, l.children), Ml(n);
    }
    (o = l.children),
      (typeof o != "string" && typeof o != "number" && typeof o != "bigint") ||
      n.textContent === "" + o ||
      l.suppressHydrationWarning === !0 ||
      gy(n.textContent, o)
        ? (l.popover != null && (Te("beforetoggle", n), Te("toggle", n)),
          l.onScroll != null && Te("scroll", n),
          l.onScrollEnd != null && Te("scrollend", n),
          l.onClick != null && (n.onclick = As),
          (n = !0))
        : (n = !1),
      n || da(t);
  }
  function em(t) {
    for (Ut = t.return; Ut; )
      switch (Ut.tag) {
        case 5:
        case 13:
          Fn = !1;
          return;
        case 27:
        case 3:
          Fn = !0;
          return;
        default:
          Ut = Ut.return;
      }
  }
  function li(t) {
    if (t !== Ut) return !1;
    if (!Ne) return em(t), (Ne = !0), !1;
    var n = t.tag,
      o;
    if (
      ((o = n !== 3 && n !== 27) &&
        ((o = n === 5) &&
          ((o = t.type),
          (o =
            !(o !== "form" && o !== "button") || Hf(t.type, t.memoizedProps))),
        (o = !o)),
      o && We && da(t),
      em(t),
      n === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(i(317));
      e: {
        for (t = t.nextSibling, n = 0; t; ) {
          if (t.nodeType === 8)
            if (((o = t.data), o === "/$")) {
              if (n === 0) {
                We = On(t.nextSibling);
                break e;
              }
              n--;
            } else (o !== "$" && o !== "$!" && o !== "$?") || n++;
          t = t.nextSibling;
        }
        We = null;
      }
    } else
      n === 27
        ? ((n = We), qr(t.type) ? ((t = Vf), (Vf = null), (We = t)) : (We = n))
        : (We = Ut ? On(t.stateNode.nextSibling) : null);
    return !0;
  }
  function si() {
    (We = Ut = null), (Ne = !1);
  }
  function tm() {
    var t = fa;
    return (
      t !== null &&
        (Qt === null ? (Qt = t) : Qt.push.apply(Qt, t), (fa = null)),
      t
    );
  }
  function ui(t) {
    fa === null ? (fa = [t]) : fa.push(t);
  }
  var Cc = G(null),
    ha = null,
    hr = null;
  function zr(t, n, o) {
    J(Cc, n._currentValue), (n._currentValue = o);
  }
  function pr(t) {
    (t._currentValue = Cc.current), ne(Cc);
  }
  function Ec(t, n, o) {
    for (; t !== null; ) {
      var l = t.alternate;
      if (
        ((t.childLanes & n) !== n
          ? ((t.childLanes |= n), l !== null && (l.childLanes |= n))
          : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n),
        t === o)
      )
        break;
      t = t.return;
    }
  }
  function _c(t, n, o, l) {
    var c = t.child;
    for (c !== null && (c.return = t); c !== null; ) {
      var d = c.dependencies;
      if (d !== null) {
        var b = c.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var C = d;
          d = c;
          for (var z = 0; z < n.length; z++)
            if (C.context === n[z]) {
              (d.lanes |= o),
                (C = d.alternate),
                C !== null && (C.lanes |= o),
                Ec(d.return, o, t),
                l || (b = null);
              break e;
            }
          d = C.next;
        }
      } else if (c.tag === 18) {
        if (((b = c.return), b === null)) throw Error(i(341));
        (b.lanes |= o),
          (d = b.alternate),
          d !== null && (d.lanes |= o),
          Ec(b, o, t),
          (b = null);
      } else b = c.child;
      if (b !== null) b.return = c;
      else
        for (b = c; b !== null; ) {
          if (b === t) {
            b = null;
            break;
          }
          if (((c = b.sibling), c !== null)) {
            (c.return = b.return), (b = c);
            break;
          }
          b = b.return;
        }
      c = b;
    }
  }
  function ci(t, n, o, l) {
    t = null;
    for (var c = n, d = !1; c !== null; ) {
      if (!d) {
        if ((c.flags & 524288) !== 0) d = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var b = c.alternate;
        if (b === null) throw Error(i(387));
        if (((b = b.memoizedProps), b !== null)) {
          var C = c.type;
          Jt(c.pendingProps.value, b.value) ||
            (t !== null ? t.push(C) : (t = [C]));
        }
      } else if (c === te.current) {
        if (((b = c.alternate), b === null)) throw Error(i(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState &&
          (t !== null ? t.push(Hi) : (t = [Hi]));
      }
      c = c.return;
    }
    t !== null && _c(n, t, o, l), (n.flags |= 262144);
  }
  function Xl(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Jt(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function pa(t) {
    (ha = t),
      (hr = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function zt(t) {
    return nm(ha, t);
  }
  function Kl(t, n) {
    return ha === null && pa(t), nm(t, n);
  }
  function nm(t, n) {
    var o = n._currentValue;
    if (((n = { context: n, memoizedValue: o, next: null }), hr === null)) {
      if (t === null) throw Error(i(308));
      (hr = n),
        (t.dependencies = { lanes: 0, firstContext: n }),
        (t.flags |= 524288);
    } else hr = hr.next = n;
    return o;
  }
  var VS =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (o, l) {
                  t.push(l);
                },
              });
            this.abort = function () {
              (n.aborted = !0),
                t.forEach(function (o) {
                  return o();
                });
            };
          },
    qS = e.unstable_scheduleCallback,
    YS = e.unstable_NormalPriority,
    ut = {
      $$typeof: A,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Rc() {
    return { controller: new VS(), data: new Map(), refCount: 0 };
  }
  function fi(t) {
    t.refCount--,
      t.refCount === 0 &&
        qS(YS, function () {
          t.controller.abort();
        });
  }
  var di = null,
    Tc = 0,
    Ja = 0,
    eo = null;
  function GS(t, n) {
    if (di === null) {
      var o = (di = []);
      (Tc = 0),
        (Ja = Of()),
        (eo = {
          status: "pending",
          value: void 0,
          then: function (l) {
            o.push(l);
          },
        });
    }
    return Tc++, n.then(rm, rm), n;
  }
  function rm() {
    if (--Tc === 0 && di !== null) {
      eo !== null && (eo.status = "fulfilled");
      var t = di;
      (di = null), (Ja = 0), (eo = null);
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function FS(t, n) {
    var o = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (c) {
          o.push(c);
        },
      };
    return (
      t.then(
        function () {
          (l.status = "fulfilled"), (l.value = n);
          for (var c = 0; c < o.length; c++) (0, o[c])(n);
        },
        function (c) {
          for (l.status = "rejected", l.reason = c, c = 0; c < o.length; c++)
            (0, o[c])(void 0);
        },
      ),
      l
    );
  }
  var am = M.S;
  M.S = function (t, n) {
    typeof n == "object" &&
      n !== null &&
      typeof n.then == "function" &&
      GS(t, n),
      am !== null && am(t, n);
  };
  var ma = G(null);
  function Ac() {
    var t = ma.current;
    return t !== null ? t : Pe.pooledCache;
  }
  function Il(t, n) {
    n === null ? J(ma, ma.current) : J(ma, n.pool);
  }
  function om() {
    var t = Ac();
    return t === null ? null : { parent: ut._currentValue, pool: t };
  }
  var hi = Error(i(460)),
    im = Error(i(474)),
    Wl = Error(i(542)),
    zc = { then: function () {} };
  function lm(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function Jl() {}
  function sm(t, n, o) {
    switch (
      ((o = t[o]),
      o === void 0 ? t.push(n) : o !== n && (n.then(Jl, Jl), (n = o)),
      n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((t = n.reason), cm(t), t);
      default:
        if (typeof n.status == "string") n.then(Jl, Jl);
        else {
          if (((t = Pe), t !== null && 100 < t.shellSuspendCounter))
            throw Error(i(482));
          (t = n),
            (t.status = "pending"),
            t.then(
              function (l) {
                if (n.status === "pending") {
                  var c = n;
                  (c.status = "fulfilled"), (c.value = l);
                }
              },
              function (l) {
                if (n.status === "pending") {
                  var c = n;
                  (c.status = "rejected"), (c.reason = l);
                }
              },
            );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((t = n.reason), cm(t), t);
        }
        throw ((pi = n), hi);
    }
  }
  var pi = null;
  function um() {
    if (pi === null) throw Error(i(459));
    var t = pi;
    return (pi = null), t;
  }
  function cm(t) {
    if (t === hi || t === Wl) throw Error(i(483));
  }
  var Or = !1;
  function Oc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function jc(t, n) {
    (t = t.updateQueue),
      n.updateQueue === t &&
        (n.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function jr(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Dr(t, n, o) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (Me & 2) !== 0)) {
      var c = l.pending;
      return (
        c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
        (l.pending = n),
        (n = Yl(t)),
        Kp(t, null, o),
        n
      );
    }
    return ql(t, l, n, o), Yl(t);
  }
  function mi(t, n, o) {
    if (
      ((n = n.updateQueue), n !== null && ((n = n.shared), (o & 4194048) !== 0))
    ) {
      var l = n.lanes;
      (l &= t.pendingLanes), (o |= l), (n.lanes = o), qu(t, o);
    }
  }
  function Dc(t, n) {
    var o = t.updateQueue,
      l = t.alternate;
    if (l !== null && ((l = l.updateQueue), o === l)) {
      var c = null,
        d = null;
      if (((o = o.firstBaseUpdate), o !== null)) {
        do {
          var b = {
            lane: o.lane,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null,
          };
          d === null ? (c = d = b) : (d = d.next = b), (o = o.next);
        } while (o !== null);
        d === null ? (c = d = n) : (d = d.next = n);
      } else c = d = n;
      (o = {
        baseState: l.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: d,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (t.updateQueue = o);
      return;
    }
    (t = o.lastBaseUpdate),
      t === null ? (o.firstBaseUpdate = n) : (t.next = n),
      (o.lastBaseUpdate = n);
  }
  var Nc = !1;
  function gi() {
    if (Nc) {
      var t = eo;
      if (t !== null) throw t;
    }
  }
  function yi(t, n, o, l) {
    Nc = !1;
    var c = t.updateQueue;
    Or = !1;
    var d = c.firstBaseUpdate,
      b = c.lastBaseUpdate,
      C = c.shared.pending;
    if (C !== null) {
      c.shared.pending = null;
      var z = C,
        H = z.next;
      (z.next = null), b === null ? (d = H) : (b.next = H), (b = z);
      var q = t.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (C = q.lastBaseUpdate),
        C !== b &&
          (C === null ? (q.firstBaseUpdate = H) : (C.next = H),
          (q.lastBaseUpdate = z)));
    }
    if (d !== null) {
      var X = c.baseState;
      (b = 0), (q = H = z = null), (C = d);
      do {
        var B = C.lane & -536870913,
          P = B !== C.lane;
        if (P ? (Oe & B) === B : (l & B) === B) {
          B !== 0 && B === Ja && (Nc = !0),
            q !== null &&
              (q = q.next =
                {
                  lane: 0,
                  tag: C.tag,
                  payload: C.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var be = t,
              ye = C;
            B = n;
            var Ue = o;
            switch (ye.tag) {
              case 1:
                if (((be = ye.payload), typeof be == "function")) {
                  X = be.call(Ue, X, B);
                  break e;
                }
                X = be;
                break e;
              case 3:
                be.flags = (be.flags & -65537) | 128;
              case 0:
                if (
                  ((be = ye.payload),
                  (B = typeof be == "function" ? be.call(Ue, X, B) : be),
                  B == null)
                )
                  break e;
                X = g({}, X, B);
                break e;
              case 2:
                Or = !0;
            }
          }
          (B = C.callback),
            B !== null &&
              ((t.flags |= 64),
              P && (t.flags |= 8192),
              (P = c.callbacks),
              P === null ? (c.callbacks = [B]) : P.push(B));
        } else
          (P = {
            lane: B,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null,
          }),
            q === null ? ((H = q = P), (z = X)) : (q = q.next = P),
            (b |= B);
        if (((C = C.next), C === null)) {
          if (((C = c.shared.pending), C === null)) break;
          (P = C),
            (C = P.next),
            (P.next = null),
            (c.lastBaseUpdate = P),
            (c.shared.pending = null);
        }
      } while (!0);
      q === null && (z = X),
        (c.baseState = z),
        (c.firstBaseUpdate = H),
        (c.lastBaseUpdate = q),
        d === null && (c.shared.lanes = 0),
        (Br |= b),
        (t.lanes = b),
        (t.memoizedState = X);
    }
  }
  function fm(t, n) {
    if (typeof t != "function") throw Error(i(191, t));
    t.call(n);
  }
  function dm(t, n) {
    var o = t.callbacks;
    if (o !== null)
      for (t.callbacks = null, t = 0; t < o.length; t++) fm(o[t], n);
  }
  var to = G(null),
    es = G(0);
  function hm(t, n) {
    (t = xr), J(es, t), J(to, n), (xr = t | n.baseLanes);
  }
  function Mc() {
    J(es, xr), J(to, to.current);
  }
  function $c() {
    (xr = es.current), ne(to), ne(es);
  }
  var Nr = 0,
    Ce = null,
    ke = null,
    nt = null,
    ts = !1,
    no = !1,
    ga = !1,
    ns = 0,
    vi = 0,
    ro = null,
    QS = 0;
  function et() {
    throw Error(i(321));
  }
  function kc(t, n) {
    if (n === null) return !1;
    for (var o = 0; o < n.length && o < t.length; o++)
      if (!Jt(t[o], n[o])) return !1;
    return !0;
  }
  function Lc(t, n, o, l, c, d) {
    return (
      (Nr = d),
      (Ce = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (M.H = t === null || t.memoizedState === null ? Km : Im),
      (ga = !1),
      (d = o(l, c)),
      (ga = !1),
      no && (d = mm(n, o, l, c)),
      pm(t),
      d
    );
  }
  function pm(t) {
    M.H = ss;
    var n = ke !== null && ke.next !== null;
    if (((Nr = 0), (nt = ke = Ce = null), (ts = !1), (vi = 0), (ro = null), n))
      throw Error(i(300));
    t === null ||
      mt ||
      ((t = t.dependencies), t !== null && Xl(t) && (mt = !0));
  }
  function mm(t, n, o, l) {
    Ce = t;
    var c = 0;
    do {
      if ((no && (ro = null), (vi = 0), (no = !1), 25 <= c))
        throw Error(i(301));
      if (((c += 1), (nt = ke = null), t.updateQueue != null)) {
        var d = t.updateQueue;
        (d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0);
      }
      (M.H = tx), (d = n(o, l));
    } while (no);
    return d;
  }
  function XS() {
    var t = M.H,
      n = t.useState()[0];
    return (
      (n = typeof n.then == "function" ? bi(n) : n),
      (t = t.useState()[0]),
      (ke !== null ? ke.memoizedState : null) !== t && (Ce.flags |= 1024),
      n
    );
  }
  function Uc() {
    var t = ns !== 0;
    return (ns = 0), t;
  }
  function Hc(t, n, o) {
    (n.updateQueue = t.updateQueue), (n.flags &= -2053), (t.lanes &= ~o);
  }
  function Bc(t) {
    if (ts) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), (t = t.next);
      }
      ts = !1;
    }
    (Nr = 0), (nt = ke = Ce = null), (no = !1), (vi = ns = 0), (ro = null);
  }
  function Gt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return nt === null ? (Ce.memoizedState = nt = t) : (nt = nt.next = t), nt;
  }
  function rt() {
    if (ke === null) {
      var t = Ce.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = ke.next;
    var n = nt === null ? Ce.memoizedState : nt.next;
    if (n !== null) (nt = n), (ke = t);
    else {
      if (t === null)
        throw Ce.alternate === null ? Error(i(467)) : Error(i(310));
      (ke = t),
        (t = {
          memoizedState: ke.memoizedState,
          baseState: ke.baseState,
          baseQueue: ke.baseQueue,
          queue: ke.queue,
          next: null,
        }),
        nt === null ? (Ce.memoizedState = nt = t) : (nt = nt.next = t);
    }
    return nt;
  }
  function Pc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function bi(t) {
    var n = vi;
    return (
      (vi += 1),
      ro === null && (ro = []),
      (t = sm(ro, t, n)),
      (n = Ce),
      (nt === null ? n.memoizedState : nt.next) === null &&
        ((n = n.alternate),
        (M.H = n === null || n.memoizedState === null ? Km : Im)),
      t
    );
  }
  function rs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return bi(t);
      if (t.$$typeof === A) return zt(t);
    }
    throw Error(i(438, String(t)));
  }
  function Zc(t) {
    var n = null,
      o = Ce.updateQueue;
    if ((o !== null && (n = o.memoCache), n == null)) {
      var l = Ce.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (n = {
              data: l.data.map(function (c) {
                return c.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      o === null && ((o = Pc()), (Ce.updateQueue = o)),
      (o.memoCache = n),
      (o = n.data[n.index]),
      o === void 0)
    )
      for (o = n.data[n.index] = Array(t), l = 0; l < t; l++) o[l] = ee;
    return n.index++, o;
  }
  function mr(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function as(t) {
    var n = rt();
    return Vc(n, ke, t);
  }
  function Vc(t, n, o) {
    var l = t.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = o;
    var c = t.baseQueue,
      d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var b = c.next;
        (c.next = d.next), (d.next = b);
      }
      (n.baseQueue = c = d), (l.pending = null);
    }
    if (((d = t.baseState), c === null)) t.memoizedState = d;
    else {
      n = c.next;
      var C = (b = null),
        z = null,
        H = n,
        q = !1;
      do {
        var X = H.lane & -536870913;
        if (X !== H.lane ? (Oe & X) === X : (Nr & X) === X) {
          var B = H.revertLane;
          if (B === 0)
            z !== null &&
              (z = z.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              X === Ja && (q = !0);
          else if ((Nr & B) === B) {
            (H = H.next), B === Ja && (q = !0);
            continue;
          } else
            (X = {
              lane: 0,
              revertLane: H.revertLane,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              z === null ? ((C = z = X), (b = d)) : (z = z.next = X),
              (Ce.lanes |= B),
              (Br |= B);
          (X = H.action),
            ga && o(d, X),
            (d = H.hasEagerState ? H.eagerState : o(d, X));
        } else
          (B = {
            lane: X,
            revertLane: H.revertLane,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            z === null ? ((C = z = B), (b = d)) : (z = z.next = B),
            (Ce.lanes |= X),
            (Br |= X);
        H = H.next;
      } while (H !== null && H !== n);
      if (
        (z === null ? (b = d) : (z.next = C),
        !Jt(d, t.memoizedState) && ((mt = !0), q && ((o = eo), o !== null)))
      )
        throw o;
      (t.memoizedState = d),
        (t.baseState = b),
        (t.baseQueue = z),
        (l.lastRenderedState = d);
    }
    return c === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function qc(t) {
    var n = rt(),
      o = n.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = t;
    var l = o.dispatch,
      c = o.pending,
      d = n.memoizedState;
    if (c !== null) {
      o.pending = null;
      var b = (c = c.next);
      do (d = t(d, b.action)), (b = b.next);
      while (b !== c);
      Jt(d, n.memoizedState) || (mt = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (o.lastRenderedState = d);
    }
    return [d, l];
  }
  function gm(t, n, o) {
    var l = Ce,
      c = rt(),
      d = Ne;
    if (d) {
      if (o === void 0) throw Error(i(407));
      o = o();
    } else o = n();
    var b = !Jt((ke || c).memoizedState, o);
    b && ((c.memoizedState = o), (mt = !0)), (c = c.queue);
    var C = bm.bind(null, l, c, t);
    if (
      (Si(2048, 8, C, [t]),
      c.getSnapshot !== n || b || (nt !== null && nt.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        ao(9, os(), vm.bind(null, l, c, o, n), null),
        Pe === null)
      )
        throw Error(i(349));
      d || (Nr & 124) !== 0 || ym(l, n, o);
    }
    return o;
  }
  function ym(t, n, o) {
    (t.flags |= 16384),
      (t = { getSnapshot: n, value: o }),
      (n = Ce.updateQueue),
      n === null
        ? ((n = Pc()), (Ce.updateQueue = n), (n.stores = [t]))
        : ((o = n.stores), o === null ? (n.stores = [t]) : o.push(t));
  }
  function vm(t, n, o, l) {
    (n.value = o), (n.getSnapshot = l), Sm(n) && xm(t);
  }
  function bm(t, n, o) {
    return o(function () {
      Sm(n) && xm(t);
    });
  }
  function Sm(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var o = n();
      return !Jt(t, o);
    } catch {
      return !0;
    }
  }
  function xm(t) {
    var n = Xa(t, 2);
    n !== null && on(n, t, 2);
  }
  function Yc(t) {
    var n = Gt();
    if (typeof t == "function") {
      var o = t;
      if (((t = o()), ga)) {
        cn(!0);
        try {
          o();
        } finally {
          cn(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = t),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mr,
        lastRenderedState: t,
      }),
      n
    );
  }
  function wm(t, n, o, l) {
    return (t.baseState = o), Vc(t, ke, typeof l == "function" ? l : mr);
  }
  function KS(t, n, o, l, c) {
    if (ls(t)) throw Error(i(485));
    if (((t = n.action), t !== null)) {
      var d = {
        payload: c,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (b) {
          d.listeners.push(b);
        },
      };
      M.T !== null ? o(!0) : (d.isTransition = !1),
        l(d),
        (o = n.pending),
        o === null
          ? ((d.next = n.pending = d), Cm(n, d))
          : ((d.next = o.next), (n.pending = o.next = d));
    }
  }
  function Cm(t, n) {
    var o = n.action,
      l = n.payload,
      c = t.state;
    if (n.isTransition) {
      var d = M.T,
        b = {};
      M.T = b;
      try {
        var C = o(c, l),
          z = M.S;
        z !== null && z(b, C), Em(t, n, C);
      } catch (H) {
        Gc(t, n, H);
      } finally {
        M.T = d;
      }
    } else
      try {
        (d = o(c, l)), Em(t, n, d);
      } catch (H) {
        Gc(t, n, H);
      }
  }
  function Em(t, n, o) {
    o !== null && typeof o == "object" && typeof o.then == "function"
      ? o.then(
          function (l) {
            _m(t, n, l);
          },
          function (l) {
            return Gc(t, n, l);
          },
        )
      : _m(t, n, o);
  }
  function _m(t, n, o) {
    (n.status = "fulfilled"),
      (n.value = o),
      Rm(n),
      (t.state = o),
      (n = t.pending),
      n !== null &&
        ((o = n.next),
        o === n ? (t.pending = null) : ((o = o.next), (n.next = o), Cm(t, o)));
  }
  function Gc(t, n, o) {
    var l = t.pending;
    if (((t.pending = null), l !== null)) {
      l = l.next;
      do (n.status = "rejected"), (n.reason = o), Rm(n), (n = n.next);
      while (n !== l);
    }
    t.action = null;
  }
  function Rm(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Tm(t, n) {
    return n;
  }
  function Am(t, n) {
    if (Ne) {
      var o = Pe.formState;
      if (o !== null) {
        e: {
          var l = Ce;
          if (Ne) {
            if (We) {
              t: {
                for (var c = We, d = Fn; c.nodeType !== 8; ) {
                  if (!d) {
                    c = null;
                    break t;
                  }
                  if (((c = On(c.nextSibling)), c === null)) {
                    c = null;
                    break t;
                  }
                }
                (d = c.data), (c = d === "F!" || d === "F" ? c : null);
              }
              if (c) {
                (We = On(c.nextSibling)), (l = c.data === "F!");
                break e;
              }
            }
            da(l);
          }
          l = !1;
        }
        l && (n = o[0]);
      }
    }
    return (
      (o = Gt()),
      (o.memoizedState = o.baseState = n),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Tm,
        lastRenderedState: n,
      }),
      (o.queue = l),
      (o = Fm.bind(null, Ce, l)),
      (l.dispatch = o),
      (l = Yc(!1)),
      (d = Ic.bind(null, Ce, !1, l.queue)),
      (l = Gt()),
      (c = { state: n, dispatch: null, action: t, pending: null }),
      (l.queue = c),
      (o = KS.bind(null, Ce, c, d, o)),
      (c.dispatch = o),
      (l.memoizedState = t),
      [n, o, !1]
    );
  }
  function zm(t) {
    var n = rt();
    return Om(n, ke, t);
  }
  function Om(t, n, o) {
    if (
      ((n = Vc(t, n, Tm)[0]),
      (t = as(mr)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var l = bi(n);
      } catch (b) {
        throw b === hi ? Wl : b;
      }
    else l = n;
    n = rt();
    var c = n.queue,
      d = c.dispatch;
    return (
      o !== n.memoizedState &&
        ((Ce.flags |= 2048), ao(9, os(), IS.bind(null, c, o), null)),
      [l, d, t]
    );
  }
  function IS(t, n) {
    t.action = n;
  }
  function jm(t) {
    var n = rt(),
      o = ke;
    if (o !== null) return Om(n, o, t);
    rt(), (n = n.memoizedState), (o = rt());
    var l = o.queue.dispatch;
    return (o.memoizedState = t), [n, l, !1];
  }
  function ao(t, n, o, l) {
    return (
      (t = { tag: t, create: o, deps: l, inst: n, next: null }),
      (n = Ce.updateQueue),
      n === null && ((n = Pc()), (Ce.updateQueue = n)),
      (o = n.lastEffect),
      o === null
        ? (n.lastEffect = t.next = t)
        : ((l = o.next), (o.next = t), (t.next = l), (n.lastEffect = t)),
      t
    );
  }
  function os() {
    return { destroy: void 0, resource: void 0 };
  }
  function Dm() {
    return rt().memoizedState;
  }
  function is(t, n, o, l) {
    var c = Gt();
    (l = l === void 0 ? null : l),
      (Ce.flags |= t),
      (c.memoizedState = ao(1 | n, os(), o, l));
  }
  function Si(t, n, o, l) {
    var c = rt();
    l = l === void 0 ? null : l;
    var d = c.memoizedState.inst;
    ke !== null && l !== null && kc(l, ke.memoizedState.deps)
      ? (c.memoizedState = ao(n, d, o, l))
      : ((Ce.flags |= t), (c.memoizedState = ao(1 | n, d, o, l)));
  }
  function Nm(t, n) {
    is(8390656, 8, t, n);
  }
  function Mm(t, n) {
    Si(2048, 8, t, n);
  }
  function $m(t, n) {
    return Si(4, 2, t, n);
  }
  function km(t, n) {
    return Si(4, 4, t, n);
  }
  function Lm(t, n) {
    if (typeof n == "function") {
      t = t();
      var o = n(t);
      return function () {
        typeof o == "function" ? o() : n(null);
      };
    }
    if (n != null)
      return (
        (t = t()),
        (n.current = t),
        function () {
          n.current = null;
        }
      );
  }
  function Um(t, n, o) {
    (o = o != null ? o.concat([t]) : null), Si(4, 4, Lm.bind(null, n, t), o);
  }
  function Fc() {}
  function Hm(t, n) {
    var o = rt();
    n = n === void 0 ? null : n;
    var l = o.memoizedState;
    return n !== null && kc(n, l[1]) ? l[0] : ((o.memoizedState = [t, n]), t);
  }
  function Bm(t, n) {
    var o = rt();
    n = n === void 0 ? null : n;
    var l = o.memoizedState;
    if (n !== null && kc(n, l[1])) return l[0];
    if (((l = t()), ga)) {
      cn(!0);
      try {
        t();
      } finally {
        cn(!1);
      }
    }
    return (o.memoizedState = [l, n]), l;
  }
  function Qc(t, n, o) {
    return o === void 0 || (Nr & 1073741824) !== 0
      ? (t.memoizedState = n)
      : ((t.memoizedState = o), (t = Vg()), (Ce.lanes |= t), (Br |= t), o);
  }
  function Pm(t, n, o, l) {
    return Jt(o, n)
      ? o
      : to.current !== null
        ? ((t = Qc(t, o, l)), Jt(t, n) || (mt = !0), t)
        : (Nr & 42) === 0
          ? ((mt = !0), (t.memoizedState = o))
          : ((t = Vg()), (Ce.lanes |= t), (Br |= t), n);
  }
  function Zm(t, n, o, l, c) {
    var d = Q.p;
    Q.p = d !== 0 && 8 > d ? d : 8;
    var b = M.T,
      C = {};
    (M.T = C), Ic(t, !1, n, o);
    try {
      var z = c(),
        H = M.S;
      if (
        (H !== null && H(C, z),
        z !== null && typeof z == "object" && typeof z.then == "function")
      ) {
        var q = FS(z, l);
        xi(t, n, q, an(t));
      } else xi(t, n, l, an(t));
    } catch (X) {
      xi(t, n, { then: function () {}, status: "rejected", reason: X }, an());
    } finally {
      (Q.p = d), (M.T = b);
    }
  }
  function WS() {}
  function Xc(t, n, o, l) {
    if (t.tag !== 5) throw Error(i(476));
    var c = Vm(t).queue;
    Zm(
      t,
      c,
      n,
      Y,
      o === null
        ? WS
        : function () {
            return qm(t), o(l);
          },
    );
  }
  function Vm(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mr,
        lastRenderedState: Y,
      },
      next: null,
    };
    var o = {};
    return (
      (n.next = {
        memoizedState: o,
        baseState: o,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: mr,
          lastRenderedState: o,
        },
        next: null,
      }),
      (t.memoizedState = n),
      (t = t.alternate),
      t !== null && (t.memoizedState = n),
      n
    );
  }
  function qm(t) {
    var n = Vm(t).next.queue;
    xi(t, n, {}, an());
  }
  function Kc() {
    return zt(Hi);
  }
  function Ym() {
    return rt().memoizedState;
  }
  function Gm() {
    return rt().memoizedState;
  }
  function JS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var o = an();
          t = jr(o);
          var l = Dr(n, t, o);
          l !== null && (on(l, n, o), mi(l, n, o)),
            (n = { cache: Rc() }),
            (t.payload = n);
          return;
      }
      n = n.return;
    }
  }
  function ex(t, n, o) {
    var l = an();
    (o = {
      lane: l,
      revertLane: 0,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ls(t)
        ? Qm(n, o)
        : ((o = gc(t, n, o, l)), o !== null && (on(o, t, l), Xm(o, n, l)));
  }
  function Fm(t, n, o) {
    var l = an();
    xi(t, n, o, l);
  }
  function xi(t, n, o, l) {
    var c = {
      lane: l,
      revertLane: 0,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ls(t)) Qm(n, c);
    else {
      var d = t.alternate;
      if (
        t.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var b = n.lastRenderedState,
            C = d(b, o);
          if (((c.hasEagerState = !0), (c.eagerState = C), Jt(C, b)))
            return ql(t, n, c, 0), Pe === null && Vl(), !1;
        } catch {
        } finally {
        }
      if (((o = gc(t, n, c, l)), o !== null))
        return on(o, t, l), Xm(o, n, l), !0;
    }
    return !1;
  }
  function Ic(t, n, o, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Of(),
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ls(t))
    ) {
      if (n) throw Error(i(479));
    } else (n = gc(t, o, l, 2)), n !== null && on(n, t, 2);
  }
  function ls(t) {
    var n = t.alternate;
    return t === Ce || (n !== null && n === Ce);
  }
  function Qm(t, n) {
    no = ts = !0;
    var o = t.pending;
    o === null ? (n.next = n) : ((n.next = o.next), (o.next = n)),
      (t.pending = n);
  }
  function Xm(t, n, o) {
    if ((o & 4194048) !== 0) {
      var l = n.lanes;
      (l &= t.pendingLanes), (o |= l), (n.lanes = o), qu(t, o);
    }
  }
  var ss = {
      readContext: zt,
      use: rs,
      useCallback: et,
      useContext: et,
      useEffect: et,
      useImperativeHandle: et,
      useLayoutEffect: et,
      useInsertionEffect: et,
      useMemo: et,
      useReducer: et,
      useRef: et,
      useState: et,
      useDebugValue: et,
      useDeferredValue: et,
      useTransition: et,
      useSyncExternalStore: et,
      useId: et,
      useHostTransitionStatus: et,
      useFormState: et,
      useActionState: et,
      useOptimistic: et,
      useMemoCache: et,
      useCacheRefresh: et,
    },
    Km = {
      readContext: zt,
      use: rs,
      useCallback: function (t, n) {
        return (Gt().memoizedState = [t, n === void 0 ? null : n]), t;
      },
      useContext: zt,
      useEffect: Nm,
      useImperativeHandle: function (t, n, o) {
        (o = o != null ? o.concat([t]) : null),
          is(4194308, 4, Lm.bind(null, n, t), o);
      },
      useLayoutEffect: function (t, n) {
        return is(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        is(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var o = Gt();
        n = n === void 0 ? null : n;
        var l = t();
        if (ga) {
          cn(!0);
          try {
            t();
          } finally {
            cn(!1);
          }
        }
        return (o.memoizedState = [l, n]), l;
      },
      useReducer: function (t, n, o) {
        var l = Gt();
        if (o !== void 0) {
          var c = o(n);
          if (ga) {
            cn(!0);
            try {
              o(n);
            } finally {
              cn(!1);
            }
          }
        } else c = n;
        return (
          (l.memoizedState = l.baseState = c),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: c,
          }),
          (l.queue = t),
          (t = t.dispatch = ex.bind(null, Ce, t)),
          [l.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = Gt();
        return (t = { current: t }), (n.memoizedState = t);
      },
      useState: function (t) {
        t = Yc(t);
        var n = t.queue,
          o = Fm.bind(null, Ce, n);
        return (n.dispatch = o), [t.memoizedState, o];
      },
      useDebugValue: Fc,
      useDeferredValue: function (t, n) {
        var o = Gt();
        return Qc(o, t, n);
      },
      useTransition: function () {
        var t = Yc(!1);
        return (
          (t = Zm.bind(null, Ce, t.queue, !0, !1)),
          (Gt().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, n, o) {
        var l = Ce,
          c = Gt();
        if (Ne) {
          if (o === void 0) throw Error(i(407));
          o = o();
        } else {
          if (((o = n()), Pe === null)) throw Error(i(349));
          (Oe & 124) !== 0 || ym(l, n, o);
        }
        c.memoizedState = o;
        var d = { value: o, getSnapshot: n };
        return (
          (c.queue = d),
          Nm(bm.bind(null, l, d, t), [t]),
          (l.flags |= 2048),
          ao(9, os(), vm.bind(null, l, d, o, n), null),
          o
        );
      },
      useId: function () {
        var t = Gt(),
          n = Pe.identifierPrefix;
        if (Ne) {
          var o = dr,
            l = fr;
          (o = (l & ~(1 << (32 - Ct(l) - 1))).toString(32) + o),
            (n = "«" + n + "R" + o),
            (o = ns++),
            0 < o && (n += "H" + o.toString(32)),
            (n += "»");
        } else (o = QS++), (n = "«" + n + "r" + o.toString(32) + "»");
        return (t.memoizedState = n);
      },
      useHostTransitionStatus: Kc,
      useFormState: Am,
      useActionState: Am,
      useOptimistic: function (t) {
        var n = Gt();
        n.memoizedState = n.baseState = t;
        var o = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (n.queue = o),
          (n = Ic.bind(null, Ce, !0, o)),
          (o.dispatch = n),
          [t, n]
        );
      },
      useMemoCache: Zc,
      useCacheRefresh: function () {
        return (Gt().memoizedState = JS.bind(null, Ce));
      },
    },
    Im = {
      readContext: zt,
      use: rs,
      useCallback: Hm,
      useContext: zt,
      useEffect: Mm,
      useImperativeHandle: Um,
      useInsertionEffect: $m,
      useLayoutEffect: km,
      useMemo: Bm,
      useReducer: as,
      useRef: Dm,
      useState: function () {
        return as(mr);
      },
      useDebugValue: Fc,
      useDeferredValue: function (t, n) {
        var o = rt();
        return Pm(o, ke.memoizedState, t, n);
      },
      useTransition: function () {
        var t = as(mr)[0],
          n = rt().memoizedState;
        return [typeof t == "boolean" ? t : bi(t), n];
      },
      useSyncExternalStore: gm,
      useId: Ym,
      useHostTransitionStatus: Kc,
      useFormState: zm,
      useActionState: zm,
      useOptimistic: function (t, n) {
        var o = rt();
        return wm(o, ke, t, n);
      },
      useMemoCache: Zc,
      useCacheRefresh: Gm,
    },
    tx = {
      readContext: zt,
      use: rs,
      useCallback: Hm,
      useContext: zt,
      useEffect: Mm,
      useImperativeHandle: Um,
      useInsertionEffect: $m,
      useLayoutEffect: km,
      useMemo: Bm,
      useReducer: qc,
      useRef: Dm,
      useState: function () {
        return qc(mr);
      },
      useDebugValue: Fc,
      useDeferredValue: function (t, n) {
        var o = rt();
        return ke === null ? Qc(o, t, n) : Pm(o, ke.memoizedState, t, n);
      },
      useTransition: function () {
        var t = qc(mr)[0],
          n = rt().memoizedState;
        return [typeof t == "boolean" ? t : bi(t), n];
      },
      useSyncExternalStore: gm,
      useId: Ym,
      useHostTransitionStatus: Kc,
      useFormState: jm,
      useActionState: jm,
      useOptimistic: function (t, n) {
        var o = rt();
        return ke !== null
          ? wm(o, ke, t, n)
          : ((o.baseState = t), [t, o.queue.dispatch]);
      },
      useMemoCache: Zc,
      useCacheRefresh: Gm,
    },
    oo = null,
    wi = 0;
  function us(t) {
    var n = wi;
    return (wi += 1), oo === null && (oo = []), sm(oo, t, n);
  }
  function Ci(t, n) {
    (n = n.props.ref), (t.ref = n !== void 0 ? n : null);
  }
  function cs(t, n) {
    throw n.$$typeof === y
      ? Error(i(525))
      : ((t = Object.prototype.toString.call(n)),
        Error(
          i(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(n).join(", ") + "}"
              : t,
          ),
        ));
  }
  function Wm(t) {
    var n = t._init;
    return n(t._payload);
  }
  function Jm(t) {
    function n($, N) {
      if (t) {
        var L = $.deletions;
        L === null ? (($.deletions = [N]), ($.flags |= 16)) : L.push(N);
      }
    }
    function o($, N) {
      if (!t) return null;
      for (; N !== null; ) n($, N), (N = N.sibling);
      return null;
    }
    function l($) {
      for (var N = new Map(); $ !== null; )
        $.key !== null ? N.set($.key, $) : N.set($.index, $), ($ = $.sibling);
      return N;
    }
    function c($, N) {
      return ($ = cr($, N)), ($.index = 0), ($.sibling = null), $;
    }
    function d($, N, L) {
      return (
        ($.index = L),
        t
          ? ((L = $.alternate),
            L !== null
              ? ((L = L.index), L < N ? (($.flags |= 67108866), N) : L)
              : (($.flags |= 67108866), N))
          : (($.flags |= 1048576), N)
      );
    }
    function b($) {
      return t && $.alternate === null && ($.flags |= 67108866), $;
    }
    function C($, N, L, F) {
      return N === null || N.tag !== 6
        ? ((N = vc(L, $.mode, F)), (N.return = $), N)
        : ((N = c(N, L)), (N.return = $), N);
    }
    function z($, N, L, F) {
      var se = L.type;
      return se === E
        ? q($, N, L.props.children, F, L.key)
        : N !== null &&
            (N.elementType === se ||
              (typeof se == "object" &&
                se !== null &&
                se.$$typeof === V &&
                Wm(se) === N.type))
          ? ((N = c(N, L.props)), Ci(N, L), (N.return = $), N)
          : ((N = Gl(L.type, L.key, L.props, null, $.mode, F)),
            Ci(N, L),
            (N.return = $),
            N);
    }
    function H($, N, L, F) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== L.containerInfo ||
        N.stateNode.implementation !== L.implementation
        ? ((N = bc(L, $.mode, F)), (N.return = $), N)
        : ((N = c(N, L.children || [])), (N.return = $), N);
    }
    function q($, N, L, F, se) {
      return N === null || N.tag !== 7
        ? ((N = sa(L, $.mode, F, se)), (N.return = $), N)
        : ((N = c(N, L)), (N.return = $), N);
    }
    function X($, N, L) {
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return (N = vc("" + N, $.mode, L)), (N.return = $), N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case S:
            return (
              (L = Gl(N.type, N.key, N.props, null, $.mode, L)),
              Ci(L, N),
              (L.return = $),
              L
            );
          case w:
            return (N = bc(N, $.mode, L)), (N.return = $), N;
          case V:
            var F = N._init;
            return (N = F(N._payload)), X($, N, L);
        }
        if (le(N) || oe(N))
          return (N = sa(N, $.mode, L, null)), (N.return = $), N;
        if (typeof N.then == "function") return X($, us(N), L);
        if (N.$$typeof === A) return X($, Kl($, N), L);
        cs($, N);
      }
      return null;
    }
    function B($, N, L, F) {
      var se = N !== null ? N.key : null;
      if (
        (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
      )
        return se !== null ? null : C($, N, "" + L, F);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case S:
            return L.key === se ? z($, N, L, F) : null;
          case w:
            return L.key === se ? H($, N, L, F) : null;
          case V:
            return (se = L._init), (L = se(L._payload)), B($, N, L, F);
        }
        if (le(L) || oe(L)) return se !== null ? null : q($, N, L, F, null);
        if (typeof L.then == "function") return B($, N, us(L), F);
        if (L.$$typeof === A) return B($, N, Kl($, L), F);
        cs($, L);
      }
      return null;
    }
    function P($, N, L, F, se) {
      if (
        (typeof F == "string" && F !== "") ||
        typeof F == "number" ||
        typeof F == "bigint"
      )
        return ($ = $.get(L) || null), C(N, $, "" + F, se);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case S:
            return (
              ($ = $.get(F.key === null ? L : F.key) || null), z(N, $, F, se)
            );
          case w:
            return (
              ($ = $.get(F.key === null ? L : F.key) || null), H(N, $, F, se)
            );
          case V:
            var _e = F._init;
            return (F = _e(F._payload)), P($, N, L, F, se);
        }
        if (le(F) || oe(F)) return ($ = $.get(L) || null), q(N, $, F, se, null);
        if (typeof F.then == "function") return P($, N, L, us(F), se);
        if (F.$$typeof === A) return P($, N, L, Kl(N, F), se);
        cs(N, F);
      }
      return null;
    }
    function be($, N, L, F) {
      for (
        var se = null, _e = null, he = N, ve = (N = 0), yt = null;
        he !== null && ve < L.length;
        ve++
      ) {
        he.index > ve ? ((yt = he), (he = null)) : (yt = he.sibling);
        var De = B($, he, L[ve], F);
        if (De === null) {
          he === null && (he = yt);
          break;
        }
        t && he && De.alternate === null && n($, he),
          (N = d(De, N, ve)),
          _e === null ? (se = De) : (_e.sibling = De),
          (_e = De),
          (he = yt);
      }
      if (ve === L.length) return o($, he), Ne && ca($, ve), se;
      if (he === null) {
        for (; ve < L.length; ve++)
          (he = X($, L[ve], F)),
            he !== null &&
              ((N = d(he, N, ve)),
              _e === null ? (se = he) : (_e.sibling = he),
              (_e = he));
        return Ne && ca($, ve), se;
      }
      for (he = l(he); ve < L.length; ve++)
        (yt = P(he, $, ve, L[ve], F)),
          yt !== null &&
            (t &&
              yt.alternate !== null &&
              he.delete(yt.key === null ? ve : yt.key),
            (N = d(yt, N, ve)),
            _e === null ? (se = yt) : (_e.sibling = yt),
            (_e = yt));
      return (
        t &&
          he.forEach(function (Xr) {
            return n($, Xr);
          }),
        Ne && ca($, ve),
        se
      );
    }
    function ye($, N, L, F) {
      if (L == null) throw Error(i(151));
      for (
        var se = null,
          _e = null,
          he = N,
          ve = (N = 0),
          yt = null,
          De = L.next();
        he !== null && !De.done;
        ve++, De = L.next()
      ) {
        he.index > ve ? ((yt = he), (he = null)) : (yt = he.sibling);
        var Xr = B($, he, De.value, F);
        if (Xr === null) {
          he === null && (he = yt);
          break;
        }
        t && he && Xr.alternate === null && n($, he),
          (N = d(Xr, N, ve)),
          _e === null ? (se = Xr) : (_e.sibling = Xr),
          (_e = Xr),
          (he = yt);
      }
      if (De.done) return o($, he), Ne && ca($, ve), se;
      if (he === null) {
        for (; !De.done; ve++, De = L.next())
          (De = X($, De.value, F)),
            De !== null &&
              ((N = d(De, N, ve)),
              _e === null ? (se = De) : (_e.sibling = De),
              (_e = De));
        return Ne && ca($, ve), se;
      }
      for (he = l(he); !De.done; ve++, De = L.next())
        (De = P(he, $, ve, De.value, F)),
          De !== null &&
            (t &&
              De.alternate !== null &&
              he.delete(De.key === null ? ve : De.key),
            (N = d(De, N, ve)),
            _e === null ? (se = De) : (_e.sibling = De),
            (_e = De));
      return (
        t &&
          he.forEach(function (nw) {
            return n($, nw);
          }),
        Ne && ca($, ve),
        se
      );
    }
    function Ue($, N, L, F) {
      if (
        (typeof L == "object" &&
          L !== null &&
          L.type === E &&
          L.key === null &&
          (L = L.props.children),
        typeof L == "object" && L !== null)
      ) {
        switch (L.$$typeof) {
          case S:
            e: {
              for (var se = L.key; N !== null; ) {
                if (N.key === se) {
                  if (((se = L.type), se === E)) {
                    if (N.tag === 7) {
                      o($, N.sibling),
                        (F = c(N, L.props.children)),
                        (F.return = $),
                        ($ = F);
                      break e;
                    }
                  } else if (
                    N.elementType === se ||
                    (typeof se == "object" &&
                      se !== null &&
                      se.$$typeof === V &&
                      Wm(se) === N.type)
                  ) {
                    o($, N.sibling),
                      (F = c(N, L.props)),
                      Ci(F, L),
                      (F.return = $),
                      ($ = F);
                    break e;
                  }
                  o($, N);
                  break;
                } else n($, N);
                N = N.sibling;
              }
              L.type === E
                ? ((F = sa(L.props.children, $.mode, F, L.key)),
                  (F.return = $),
                  ($ = F))
                : ((F = Gl(L.type, L.key, L.props, null, $.mode, F)),
                  Ci(F, L),
                  (F.return = $),
                  ($ = F));
            }
            return b($);
          case w:
            e: {
              for (se = L.key; N !== null; ) {
                if (N.key === se)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === L.containerInfo &&
                    N.stateNode.implementation === L.implementation
                  ) {
                    o($, N.sibling),
                      (F = c(N, L.children || [])),
                      (F.return = $),
                      ($ = F);
                    break e;
                  } else {
                    o($, N);
                    break;
                  }
                else n($, N);
                N = N.sibling;
              }
              (F = bc(L, $.mode, F)), (F.return = $), ($ = F);
            }
            return b($);
          case V:
            return (se = L._init), (L = se(L._payload)), Ue($, N, L, F);
        }
        if (le(L)) return be($, N, L, F);
        if (oe(L)) {
          if (((se = oe(L)), typeof se != "function")) throw Error(i(150));
          return (L = se.call(L)), ye($, N, L, F);
        }
        if (typeof L.then == "function") return Ue($, N, us(L), F);
        if (L.$$typeof === A) return Ue($, N, Kl($, L), F);
        cs($, L);
      }
      return (typeof L == "string" && L !== "") ||
        typeof L == "number" ||
        typeof L == "bigint"
        ? ((L = "" + L),
          N !== null && N.tag === 6
            ? (o($, N.sibling), (F = c(N, L)), (F.return = $), ($ = F))
            : (o($, N), (F = vc(L, $.mode, F)), (F.return = $), ($ = F)),
          b($))
        : o($, N);
    }
    return function ($, N, L, F) {
      try {
        wi = 0;
        var se = Ue($, N, L, F);
        return (oo = null), se;
      } catch (he) {
        if (he === hi || he === Wl) throw he;
        var _e = en(29, he, null, $.mode);
        return (_e.lanes = F), (_e.return = $), _e;
      } finally {
      }
    };
  }
  var io = Jm(!0),
    eg = Jm(!1),
    vn = G(null),
    Qn = null;
  function Mr(t) {
    var n = t.alternate;
    J(ct, ct.current & 1),
      J(vn, t),
      Qn === null &&
        (n === null || to.current !== null || n.memoizedState !== null) &&
        (Qn = t);
  }
  function tg(t) {
    if (t.tag === 22) {
      if ((J(ct, ct.current), J(vn, t), Qn === null)) {
        var n = t.alternate;
        n !== null && n.memoizedState !== null && (Qn = t);
      }
    } else $r();
  }
  function $r() {
    J(ct, ct.current), J(vn, vn.current);
  }
  function gr(t) {
    ne(vn), Qn === t && (Qn = null), ne(ct);
  }
  var ct = G(0);
  function fs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var o = n.memoizedState;
        if (
          o !== null &&
          ((o = o.dehydrated), o === null || o.data === "$?" || Zf(o))
        )
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
    return null;
  }
  function Wc(t, n, o, l) {
    (n = t.memoizedState),
      (o = o(l, n)),
      (o = o == null ? n : g({}, n, o)),
      (t.memoizedState = o),
      t.lanes === 0 && (t.updateQueue.baseState = o);
  }
  var Jc = {
    enqueueSetState: function (t, n, o) {
      t = t._reactInternals;
      var l = an(),
        c = jr(l);
      (c.payload = n),
        o != null && (c.callback = o),
        (n = Dr(t, c, l)),
        n !== null && (on(n, t, l), mi(n, t, l));
    },
    enqueueReplaceState: function (t, n, o) {
      t = t._reactInternals;
      var l = an(),
        c = jr(l);
      (c.tag = 1),
        (c.payload = n),
        o != null && (c.callback = o),
        (n = Dr(t, c, l)),
        n !== null && (on(n, t, l), mi(n, t, l));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var o = an(),
        l = jr(o);
      (l.tag = 2),
        n != null && (l.callback = n),
        (n = Dr(t, l, o)),
        n !== null && (on(n, t, o), mi(n, t, o));
    },
  };
  function ng(t, n, o, l, c, d, b) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(l, d, b)
        : n.prototype && n.prototype.isPureReactComponent
          ? !oi(o, l) || !oi(c, d)
          : !0
    );
  }
  function rg(t, n, o, l) {
    (t = n.state),
      typeof n.componentWillReceiveProps == "function" &&
        n.componentWillReceiveProps(o, l),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(o, l),
      n.state !== t && Jc.enqueueReplaceState(n, n.state, null);
  }
  function ya(t, n) {
    var o = n;
    if ("ref" in n) {
      o = {};
      for (var l in n) l !== "ref" && (o[l] = n[l]);
    }
    if ((t = t.defaultProps)) {
      o === n && (o = g({}, o));
      for (var c in t) o[c] === void 0 && (o[c] = t[c]);
    }
    return o;
  }
  var ds =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var n = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(n)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function ag(t) {
    ds(t);
  }
  function og(t) {
    console.error(t);
  }
  function ig(t) {
    ds(t);
  }
  function hs(t, n) {
    try {
      var o = t.onUncaughtError;
      o(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function lg(t, n, o) {
    try {
      var l = t.onCaughtError;
      l(o.value, {
        componentStack: o.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null,
      });
    } catch (c) {
      setTimeout(function () {
        throw c;
      });
    }
  }
  function ef(t, n, o) {
    return (
      (o = jr(o)),
      (o.tag = 3),
      (o.payload = { element: null }),
      (o.callback = function () {
        hs(t, n);
      }),
      o
    );
  }
  function sg(t) {
    return (t = jr(t)), (t.tag = 3), t;
  }
  function ug(t, n, o, l) {
    var c = o.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var d = l.value;
      (t.payload = function () {
        return c(d);
      }),
        (t.callback = function () {
          lg(n, o, l);
        });
    }
    var b = o.stateNode;
    b !== null &&
      typeof b.componentDidCatch == "function" &&
      (t.callback = function () {
        lg(n, o, l),
          typeof c != "function" &&
            (Pr === null ? (Pr = new Set([this])) : Pr.add(this));
        var C = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: C !== null ? C : "",
        });
      });
  }
  function nx(t, n, o, l, c) {
    if (
      ((o.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((n = o.alternate),
        n !== null && ci(n, o, c, !0),
        (o = vn.current),
        o !== null)
      ) {
        switch (o.tag) {
          case 13:
            return (
              Qn === null ? _f() : o.alternate === null && Je === 0 && (Je = 3),
              (o.flags &= -257),
              (o.flags |= 65536),
              (o.lanes = c),
              l === zc
                ? (o.flags |= 16384)
                : ((n = o.updateQueue),
                  n === null ? (o.updateQueue = new Set([l])) : n.add(l),
                  Tf(t, l, c)),
              !1
            );
          case 22:
            return (
              (o.flags |= 65536),
              l === zc
                ? (o.flags |= 16384)
                : ((n = o.updateQueue),
                  n === null
                    ? ((n = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (o.updateQueue = n))
                    : ((o = n.retryQueue),
                      o === null ? (n.retryQueue = new Set([l])) : o.add(l)),
                  Tf(t, l, c)),
              !1
            );
        }
        throw Error(i(435, o.tag));
      }
      return Tf(t, l, c), _f(), !1;
    }
    if (Ne)
      return (
        (n = vn.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = c),
            l !== wc && ((t = Error(i(422), { cause: l })), ui(pn(t, o))))
          : (l !== wc && ((n = Error(i(423), { cause: l })), ui(pn(n, o))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (c &= -c),
            (t.lanes |= c),
            (l = pn(l, o)),
            (c = ef(t.stateNode, l, c)),
            Dc(t, c),
            Je !== 4 && (Je = 2)),
        !1
      );
    var d = Error(i(520), { cause: l });
    if (
      ((d = pn(d, o)),
      Oi === null ? (Oi = [d]) : Oi.push(d),
      Je !== 4 && (Je = 2),
      n === null)
    )
      return !0;
    (l = pn(l, o)), (o = n);
    do {
      switch (o.tag) {
        case 3:
          return (
            (o.flags |= 65536),
            (t = c & -c),
            (o.lanes |= t),
            (t = ef(o.stateNode, l, t)),
            Dc(o, t),
            !1
          );
        case 1:
          if (
            ((n = o.type),
            (d = o.stateNode),
            (o.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (Pr === null || !Pr.has(d)))))
          )
            return (
              (o.flags |= 65536),
              (c &= -c),
              (o.lanes |= c),
              (c = sg(c)),
              ug(c, t, o, l),
              Dc(o, c),
              !1
            );
      }
      o = o.return;
    } while (o !== null);
    return !1;
  }
  var cg = Error(i(461)),
    mt = !1;
  function Et(t, n, o, l) {
    n.child = t === null ? eg(n, null, o, l) : io(n, t.child, o, l);
  }
  function fg(t, n, o, l, c) {
    o = o.render;
    var d = n.ref;
    if ("ref" in l) {
      var b = {};
      for (var C in l) C !== "ref" && (b[C] = l[C]);
    } else b = l;
    return (
      pa(n),
      (l = Lc(t, n, o, b, d, c)),
      (C = Uc()),
      t !== null && !mt
        ? (Hc(t, n, c), yr(t, n, c))
        : (Ne && C && Sc(n), (n.flags |= 1), Et(t, n, l, c), n.child)
    );
  }
  function dg(t, n, o, l, c) {
    if (t === null) {
      var d = o.type;
      return typeof d == "function" &&
        !yc(d) &&
        d.defaultProps === void 0 &&
        o.compare === null
        ? ((n.tag = 15), (n.type = d), hg(t, n, d, l, c))
        : ((t = Gl(o.type, null, l, n, n.mode, c)),
          (t.ref = n.ref),
          (t.return = n),
          (n.child = t));
    }
    if (((d = t.child), !uf(t, c))) {
      var b = d.memoizedProps;
      if (
        ((o = o.compare), (o = o !== null ? o : oi), o(b, l) && t.ref === n.ref)
      )
        return yr(t, n, c);
    }
    return (
      (n.flags |= 1),
      (t = cr(d, l)),
      (t.ref = n.ref),
      (t.return = n),
      (n.child = t)
    );
  }
  function hg(t, n, o, l, c) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (oi(d, l) && t.ref === n.ref)
        if (((mt = !1), (n.pendingProps = l = d), uf(t, c)))
          (t.flags & 131072) !== 0 && (mt = !0);
        else return (n.lanes = t.lanes), yr(t, n, c);
    }
    return tf(t, n, o, l, c);
  }
  function pg(t, n, o) {
    var l = n.pendingProps,
      c = l.children,
      d = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (((l = d !== null ? d.baseLanes | o : o), t !== null)) {
          for (c = n.child = t.child, d = 0; c !== null; )
            (d = d | c.lanes | c.childLanes), (c = c.sibling);
          n.childLanes = d & ~l;
        } else (n.childLanes = 0), (n.child = null);
        return mg(t, n, l, o);
      }
      if ((o & 536870912) !== 0)
        (n.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Il(n, d !== null ? d.cachePool : null),
          d !== null ? hm(n, d) : Mc(),
          tg(n);
      else
        return (
          (n.lanes = n.childLanes = 536870912),
          mg(t, n, d !== null ? d.baseLanes | o : o, o)
        );
    } else
      d !== null
        ? (Il(n, d.cachePool), hm(n, d), $r(), (n.memoizedState = null))
        : (t !== null && Il(n, null), Mc(), $r());
    return Et(t, n, c, o), n.child;
  }
  function mg(t, n, o, l) {
    var c = Ac();
    return (
      (c = c === null ? null : { parent: ut._currentValue, pool: c }),
      (n.memoizedState = { baseLanes: o, cachePool: c }),
      t !== null && Il(n, null),
      Mc(),
      tg(n),
      t !== null && ci(t, n, l, !0),
      null
    );
  }
  function ps(t, n) {
    var o = n.ref;
    if (o === null) t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof o != "function" && typeof o != "object") throw Error(i(284));
      (t === null || t.ref !== o) && (n.flags |= 4194816);
    }
  }
  function tf(t, n, o, l, c) {
    return (
      pa(n),
      (o = Lc(t, n, o, l, void 0, c)),
      (l = Uc()),
      t !== null && !mt
        ? (Hc(t, n, c), yr(t, n, c))
        : (Ne && l && Sc(n), (n.flags |= 1), Et(t, n, o, c), n.child)
    );
  }
  function gg(t, n, o, l, c, d) {
    return (
      pa(n),
      (n.updateQueue = null),
      (o = mm(n, l, o, c)),
      pm(t),
      (l = Uc()),
      t !== null && !mt
        ? (Hc(t, n, d), yr(t, n, d))
        : (Ne && l && Sc(n), (n.flags |= 1), Et(t, n, o, d), n.child)
    );
  }
  function yg(t, n, o, l, c) {
    if ((pa(n), n.stateNode === null)) {
      var d = Ka,
        b = o.contextType;
      typeof b == "object" && b !== null && (d = zt(b)),
        (d = new o(l, d)),
        (n.memoizedState =
          d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = Jc),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = l),
        (d.state = n.memoizedState),
        (d.refs = {}),
        Oc(n),
        (b = o.contextType),
        (d.context = typeof b == "object" && b !== null ? zt(b) : Ka),
        (d.state = n.memoizedState),
        (b = o.getDerivedStateFromProps),
        typeof b == "function" && (Wc(n, o, b, l), (d.state = n.memoizedState)),
        typeof o.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((b = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" &&
            d.UNSAFE_componentWillMount(),
          b !== d.state && Jc.enqueueReplaceState(d, d.state, null),
          yi(n, l, d, c),
          gi(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == "function" && (n.flags |= 4194308),
        (l = !0);
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps,
        z = ya(o, C);
      d.props = z;
      var H = d.context,
        q = o.contextType;
      (b = Ka), typeof q == "object" && q !== null && (b = zt(q));
      var X = o.getDerivedStateFromProps;
      (q =
        typeof X == "function" ||
        typeof d.getSnapshotBeforeUpdate == "function"),
        (C = n.pendingProps !== C),
        q ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((C || H !== b) && rg(n, d, l, b)),
        (Or = !1);
      var B = n.memoizedState;
      (d.state = B),
        yi(n, l, d, c),
        gi(),
        (H = n.memoizedState),
        C || B !== H || Or
          ? (typeof X == "function" && (Wc(n, o, X, l), (H = n.memoizedState)),
            (z = Or || ng(n, o, z, l, B, H, b))
              ? (q ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" &&
                    d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308))
              : (typeof d.componentDidMount == "function" &&
                  (n.flags |= 4194308),
                (n.memoizedProps = l),
                (n.memoizedState = H)),
            (d.props = l),
            (d.state = H),
            (d.context = b),
            (l = z))
          : (typeof d.componentDidMount == "function" && (n.flags |= 4194308),
            (l = !1));
    } else {
      (d = n.stateNode),
        jc(t, n),
        (b = n.memoizedProps),
        (q = ya(o, b)),
        (d.props = q),
        (X = n.pendingProps),
        (B = d.context),
        (H = o.contextType),
        (z = Ka),
        typeof H == "object" && H !== null && (z = zt(H)),
        (C = o.getDerivedStateFromProps),
        (H =
          typeof C == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((b !== X || B !== z) && rg(n, d, l, z)),
        (Or = !1),
        (B = n.memoizedState),
        (d.state = B),
        yi(n, l, d, c),
        gi();
      var P = n.memoizedState;
      b !== X ||
      B !== P ||
      Or ||
      (t !== null && t.dependencies !== null && Xl(t.dependencies))
        ? (typeof C == "function" && (Wc(n, o, C, l), (P = n.memoizedState)),
          (q =
            Or ||
            ng(n, o, q, l, B, P, z) ||
            (t !== null && t.dependencies !== null && Xl(t.dependencies)))
            ? (H ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" &&
                  d.componentWillUpdate(l, P, z),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(l, P, z)),
              typeof d.componentDidUpdate == "function" && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" &&
                (n.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (b === t.memoizedProps && B === t.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (b === t.memoizedProps && B === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = l),
              (n.memoizedState = P)),
          (d.props = l),
          (d.state = P),
          (d.context = z),
          (l = q))
        : (typeof d.componentDidUpdate != "function" ||
            (b === t.memoizedProps && B === t.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (b === t.memoizedProps && B === t.memoizedState) ||
            (n.flags |= 1024),
          (l = !1));
    }
    return (
      (d = l),
      ps(t, n),
      (l = (n.flags & 128) !== 0),
      d || l
        ? ((d = n.stateNode),
          (o =
            l && typeof o.getDerivedStateFromError != "function"
              ? null
              : d.render()),
          (n.flags |= 1),
          t !== null && l
            ? ((n.child = io(n, t.child, null, c)),
              (n.child = io(n, null, o, c)))
            : Et(t, n, o, c),
          (n.memoizedState = d.state),
          (t = n.child))
        : (t = yr(t, n, c)),
      t
    );
  }
  function vg(t, n, o, l) {
    return si(), (n.flags |= 256), Et(t, n, o, l), n.child;
  }
  var nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function rf(t) {
    return { baseLanes: t, cachePool: om() };
  }
  function af(t, n, o) {
    return (t = t !== null ? t.childLanes & ~o : 0), n && (t |= bn), t;
  }
  function bg(t, n, o) {
    var l = n.pendingProps,
      c = !1,
      d = (n.flags & 128) !== 0,
      b;
    if (
      ((b = d) ||
        (b =
          t !== null && t.memoizedState === null ? !1 : (ct.current & 2) !== 0),
      b && ((c = !0), (n.flags &= -129)),
      (b = (n.flags & 32) !== 0),
      (n.flags &= -33),
      t === null)
    ) {
      if (Ne) {
        if ((c ? Mr(n) : $r(), Ne)) {
          var C = We,
            z;
          if ((z = C)) {
            e: {
              for (z = C, C = Fn; z.nodeType !== 8; ) {
                if (!C) {
                  C = null;
                  break e;
                }
                if (((z = On(z.nextSibling)), z === null)) {
                  C = null;
                  break e;
                }
              }
              C = z;
            }
            C !== null
              ? ((n.memoizedState = {
                  dehydrated: C,
                  treeContext: ua !== null ? { id: fr, overflow: dr } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (z = en(18, null, null, 0)),
                (z.stateNode = C),
                (z.return = n),
                (n.child = z),
                (Ut = n),
                (We = null),
                (z = !0))
              : (z = !1);
          }
          z || da(n);
        }
        if (
          ((C = n.memoizedState),
          C !== null && ((C = C.dehydrated), C !== null))
        )
          return Zf(C) ? (n.lanes = 32) : (n.lanes = 536870912), null;
        gr(n);
      }
      return (
        (C = l.children),
        (l = l.fallback),
        c
          ? ($r(),
            (c = n.mode),
            (C = ms({ mode: "hidden", children: C }, c)),
            (l = sa(l, c, o, null)),
            (C.return = n),
            (l.return = n),
            (C.sibling = l),
            (n.child = C),
            (c = n.child),
            (c.memoizedState = rf(o)),
            (c.childLanes = af(t, b, o)),
            (n.memoizedState = nf),
            l)
          : (Mr(n), of(n, C))
      );
    }
    if (
      ((z = t.memoizedState), z !== null && ((C = z.dehydrated), C !== null))
    ) {
      if (d)
        n.flags & 256
          ? (Mr(n), (n.flags &= -257), (n = lf(t, n, o)))
          : n.memoizedState !== null
            ? ($r(), (n.child = t.child), (n.flags |= 128), (n = null))
            : ($r(),
              (c = l.fallback),
              (C = n.mode),
              (l = ms({ mode: "visible", children: l.children }, C)),
              (c = sa(c, C, o, null)),
              (c.flags |= 2),
              (l.return = n),
              (c.return = n),
              (l.sibling = c),
              (n.child = l),
              io(n, t.child, null, o),
              (l = n.child),
              (l.memoizedState = rf(o)),
              (l.childLanes = af(t, b, o)),
              (n.memoizedState = nf),
              (n = c));
      else if ((Mr(n), Zf(C))) {
        if (((b = C.nextSibling && C.nextSibling.dataset), b)) var H = b.dgst;
        (b = H),
          (l = Error(i(419))),
          (l.stack = ""),
          (l.digest = b),
          ui({ value: l, source: null, stack: null }),
          (n = lf(t, n, o));
      } else if (
        (mt || ci(t, n, o, !1), (b = (o & t.childLanes) !== 0), mt || b)
      ) {
        if (
          ((b = Pe),
          b !== null &&
            ((l = o & -o),
            (l = (l & 42) !== 0 ? 1 : Xo(l)),
            (l = (l & (b.suspendedLanes | o)) !== 0 ? 0 : l),
            l !== 0 && l !== z.retryLane))
        )
          throw ((z.retryLane = l), Xa(t, l), on(b, t, l), cg);
        C.data === "$?" || _f(), (n = lf(t, n, o));
      } else
        C.data === "$?"
          ? ((n.flags |= 192), (n.child = t.child), (n = null))
          : ((t = z.treeContext),
            (We = On(C.nextSibling)),
            (Ut = n),
            (Ne = !0),
            (fa = null),
            (Fn = !1),
            t !== null &&
              ((gn[yn++] = fr),
              (gn[yn++] = dr),
              (gn[yn++] = ua),
              (fr = t.id),
              (dr = t.overflow),
              (ua = n)),
            (n = of(n, l.children)),
            (n.flags |= 4096));
      return n;
    }
    return c
      ? ($r(),
        (c = l.fallback),
        (C = n.mode),
        (z = t.child),
        (H = z.sibling),
        (l = cr(z, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = z.subtreeFlags & 65011712),
        H !== null ? (c = cr(H, c)) : ((c = sa(c, C, o, null)), (c.flags |= 2)),
        (c.return = n),
        (l.return = n),
        (l.sibling = c),
        (n.child = l),
        (l = c),
        (c = n.child),
        (C = t.child.memoizedState),
        C === null
          ? (C = rf(o))
          : ((z = C.cachePool),
            z !== null
              ? ((H = ut._currentValue),
                (z = z.parent !== H ? { parent: H, pool: H } : z))
              : (z = om()),
            (C = { baseLanes: C.baseLanes | o, cachePool: z })),
        (c.memoizedState = C),
        (c.childLanes = af(t, b, o)),
        (n.memoizedState = nf),
        l)
      : (Mr(n),
        (o = t.child),
        (t = o.sibling),
        (o = cr(o, { mode: "visible", children: l.children })),
        (o.return = n),
        (o.sibling = null),
        t !== null &&
          ((b = n.deletions),
          b === null ? ((n.deletions = [t]), (n.flags |= 16)) : b.push(t)),
        (n.child = o),
        (n.memoizedState = null),
        o);
  }
  function of(t, n) {
    return (
      (n = ms({ mode: "visible", children: n }, t.mode)),
      (n.return = t),
      (t.child = n)
    );
  }
  function ms(t, n) {
    return (
      (t = en(22, t, null, n)),
      (t.lanes = 0),
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      t
    );
  }
  function lf(t, n, o) {
    return (
      io(n, t.child, null, o),
      (t = of(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function Sg(t, n, o) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n), Ec(t.return, n, o);
  }
  function sf(t, n, o, l, c) {
    var d = t.memoizedState;
    d === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: o,
          tailMode: c,
        })
      : ((d.isBackwards = n),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = l),
        (d.tail = o),
        (d.tailMode = c));
  }
  function xg(t, n, o) {
    var l = n.pendingProps,
      c = l.revealOrder,
      d = l.tail;
    if ((Et(t, n, l.children, o), (l = ct.current), (l & 2) !== 0))
      (l = (l & 1) | 2), (n.flags |= 128);
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = n.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && Sg(t, o, n);
          else if (t.tag === 19) Sg(t, o, n);
          else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === n) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === n) break e;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      l &= 1;
    }
    switch ((J(ct, l), c)) {
      case "forwards":
        for (o = n.child, c = null; o !== null; )
          (t = o.alternate),
            t !== null && fs(t) === null && (c = o),
            (o = o.sibling);
        (o = c),
          o === null
            ? ((c = n.child), (n.child = null))
            : ((c = o.sibling), (o.sibling = null)),
          sf(n, !1, c, o, d);
        break;
      case "backwards":
        for (o = null, c = n.child, n.child = null; c !== null; ) {
          if (((t = c.alternate), t !== null && fs(t) === null)) {
            n.child = c;
            break;
          }
          (t = c.sibling), (c.sibling = o), (o = c), (c = t);
        }
        sf(n, !0, o, null, d);
        break;
      case "together":
        sf(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function yr(t, n, o) {
    if (
      (t !== null && (n.dependencies = t.dependencies),
      (Br |= n.lanes),
      (o & n.childLanes) === 0)
    )
      if (t !== null) {
        if ((ci(t, n, o, !1), (o & n.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && n.child !== t.child) throw Error(i(153));
    if (n.child !== null) {
      for (
        t = n.child, o = cr(t, t.pendingProps), n.child = o, o.return = n;
        t.sibling !== null;

      )
        (t = t.sibling),
          (o = o.sibling = cr(t, t.pendingProps)),
          (o.return = n);
      o.sibling = null;
    }
    return n.child;
  }
  function uf(t, n) {
    return (t.lanes & n) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && Xl(t)));
  }
  function rx(t, n, o) {
    switch (n.tag) {
      case 3:
        ue(n, n.stateNode.containerInfo),
          zr(n, ut, t.memoizedState.cache),
          si();
        break;
      case 27:
      case 5:
        Ve(n);
        break;
      case 4:
        ue(n, n.stateNode.containerInfo);
        break;
      case 10:
        zr(n, n.type, n.memoizedProps.value);
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Mr(n), (n.flags |= 128), null)
            : (o & n.child.childLanes) !== 0
              ? bg(t, n, o)
              : (Mr(n), (t = yr(t, n, o)), t !== null ? t.sibling : null);
        Mr(n);
        break;
      case 19:
        var c = (t.flags & 128) !== 0;
        if (
          ((l = (o & n.childLanes) !== 0),
          l || (ci(t, n, o, !1), (l = (o & n.childLanes) !== 0)),
          c)
        ) {
          if (l) return xg(t, n, o);
          n.flags |= 128;
        }
        if (
          ((c = n.memoizedState),
          c !== null &&
            ((c.rendering = null), (c.tail = null), (c.lastEffect = null)),
          J(ct, ct.current),
          l)
        )
          break;
        return null;
      case 22:
      case 23:
        return (n.lanes = 0), pg(t, n, o);
      case 24:
        zr(n, ut, t.memoizedState.cache);
    }
    return yr(t, n, o);
  }
  function wg(t, n, o) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps) mt = !0;
      else {
        if (!uf(t, o) && (n.flags & 128) === 0) return (mt = !1), rx(t, n, o);
        mt = (t.flags & 131072) !== 0;
      }
    else (mt = !1), Ne && (n.flags & 1048576) !== 0 && Wp(n, Ql, n.index);
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          t = n.pendingProps;
          var l = n.elementType,
            c = l._init;
          if (((l = c(l._payload)), (n.type = l), typeof l == "function"))
            yc(l)
              ? ((t = ya(l, t)), (n.tag = 1), (n = yg(null, n, l, t, o)))
              : ((n.tag = 0), (n = tf(null, n, l, t, o)));
          else {
            if (l != null) {
              if (((c = l.$$typeof), c === D)) {
                (n.tag = 11), (n = fg(null, n, l, t, o));
                break e;
              } else if (c === Z) {
                (n.tag = 14), (n = dg(null, n, l, t, o));
                break e;
              }
            }
            throw ((n = fe(l) || l), Error(i(306, n, "")));
          }
        }
        return n;
      case 0:
        return tf(t, n, n.type, n.pendingProps, o);
      case 1:
        return (l = n.type), (c = ya(l, n.pendingProps)), yg(t, n, l, c, o);
      case 3:
        e: {
          if ((ue(n, n.stateNode.containerInfo), t === null))
            throw Error(i(387));
          l = n.pendingProps;
          var d = n.memoizedState;
          (c = d.element), jc(t, n), yi(n, l, null, o);
          var b = n.memoizedState;
          if (
            ((l = b.cache),
            zr(n, ut, l),
            l !== d.cache && _c(n, [ut], o, !0),
            gi(),
            (l = b.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: l, isDehydrated: !1, cache: b.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = vg(t, n, l, o);
              break e;
            } else if (l !== c) {
              (c = pn(Error(i(424)), n)), ui(c), (n = vg(t, n, l, o));
              break e;
            } else {
              switch (((t = n.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                We = On(t.firstChild),
                  Ut = n,
                  Ne = !0,
                  fa = null,
                  Fn = !0,
                  o = eg(n, null, l, o),
                  n.child = o;
                o;

              )
                (o.flags = (o.flags & -3) | 4096), (o = o.sibling);
            }
          else {
            if ((si(), l === c)) {
              n = yr(t, n, o);
              break e;
            }
            Et(t, n, l, o);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          ps(t, n),
          t === null
            ? (o = Ry(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = o)
              : Ne ||
                ((o = n.type),
                (t = n.pendingProps),
                (l = zs(de.current).createElement(o)),
                (l[ht] = n),
                (l[st] = t),
                Rt(l, o, t),
                pt(l),
                (n.stateNode = l))
            : (n.memoizedState = Ry(
                n.type,
                t.memoizedProps,
                n.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ve(n),
          t === null &&
            Ne &&
            ((l = n.stateNode = Cy(n.type, n.pendingProps, de.current)),
            (Ut = n),
            (Fn = !0),
            (c = We),
            qr(n.type) ? ((Vf = c), (We = On(l.firstChild))) : (We = c)),
          Et(t, n, n.pendingProps.children, o),
          ps(t, n),
          t === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          t === null &&
            Ne &&
            ((c = l = We) &&
              ((l = jx(l, n.type, n.pendingProps, Fn)),
              l !== null
                ? ((n.stateNode = l),
                  (Ut = n),
                  (We = On(l.firstChild)),
                  (Fn = !1),
                  (c = !0))
                : (c = !1)),
            c || da(n)),
          Ve(n),
          (c = n.type),
          (d = n.pendingProps),
          (b = t !== null ? t.memoizedProps : null),
          (l = d.children),
          Hf(c, d) ? (l = null) : b !== null && Hf(c, b) && (n.flags |= 32),
          n.memoizedState !== null &&
            ((c = Lc(t, n, XS, null, null, o)), (Hi._currentValue = c)),
          ps(t, n),
          Et(t, n, l, o),
          n.child
        );
      case 6:
        return (
          t === null &&
            Ne &&
            ((t = o = We) &&
              ((o = Dx(o, n.pendingProps, Fn)),
              o !== null
                ? ((n.stateNode = o), (Ut = n), (We = null), (t = !0))
                : (t = !1)),
            t || da(n)),
          null
        );
      case 13:
        return bg(t, n, o);
      case 4:
        return (
          ue(n, n.stateNode.containerInfo),
          (l = n.pendingProps),
          t === null ? (n.child = io(n, null, l, o)) : Et(t, n, l, o),
          n.child
        );
      case 11:
        return fg(t, n, n.type, n.pendingProps, o);
      case 7:
        return Et(t, n, n.pendingProps, o), n.child;
      case 8:
        return Et(t, n, n.pendingProps.children, o), n.child;
      case 12:
        return Et(t, n, n.pendingProps.children, o), n.child;
      case 10:
        return (
          (l = n.pendingProps),
          zr(n, n.type, l.value),
          Et(t, n, l.children, o),
          n.child
        );
      case 9:
        return (
          (c = n.type._context),
          (l = n.pendingProps.children),
          pa(n),
          (c = zt(c)),
          (l = l(c)),
          (n.flags |= 1),
          Et(t, n, l, o),
          n.child
        );
      case 14:
        return dg(t, n, n.type, n.pendingProps, o);
      case 15:
        return hg(t, n, n.type, n.pendingProps, o);
      case 19:
        return xg(t, n, o);
      case 31:
        return (
          (l = n.pendingProps),
          (o = n.mode),
          (l = { mode: l.mode, children: l.children }),
          t === null
            ? ((o = ms(l, o)),
              (o.ref = n.ref),
              (n.child = o),
              (o.return = n),
              (n = o))
            : ((o = cr(t.child, l)),
              (o.ref = n.ref),
              (n.child = o),
              (o.return = n),
              (n = o)),
          n
        );
      case 22:
        return pg(t, n, o);
      case 24:
        return (
          pa(n),
          (l = zt(ut)),
          t === null
            ? ((c = Ac()),
              c === null &&
                ((c = Pe),
                (d = Rc()),
                (c.pooledCache = d),
                d.refCount++,
                d !== null && (c.pooledCacheLanes |= o),
                (c = d)),
              (n.memoizedState = { parent: l, cache: c }),
              Oc(n),
              zr(n, ut, c))
            : ((t.lanes & o) !== 0 && (jc(t, n), yi(n, null, null, o), gi()),
              (c = t.memoizedState),
              (d = n.memoizedState),
              c.parent !== l
                ? ((c = { parent: l, cache: l }),
                  (n.memoizedState = c),
                  n.lanes === 0 &&
                    (n.memoizedState = n.updateQueue.baseState = c),
                  zr(n, ut, l))
                : ((l = d.cache),
                  zr(n, ut, l),
                  l !== c.cache && _c(n, [ut], o, !0))),
          Et(t, n, n.pendingProps.children, o),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(i(156, n.tag));
  }
  function vr(t) {
    t.flags |= 4;
  }
  function Cg(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !jy(n))) {
      if (
        ((n = vn.current),
        n !== null &&
          ((Oe & 4194048) === Oe
            ? Qn !== null
            : ((Oe & 62914560) !== Oe && (Oe & 536870912) === 0) || n !== Qn))
      )
        throw ((pi = zc), im);
      t.flags |= 8192;
    }
  }
  function gs(t, n) {
    n !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((n = t.tag !== 22 ? La() : 536870912), (t.lanes |= n), (co |= n));
  }
  function Ei(t, n) {
    if (!Ne)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var o = null; n !== null; )
            n.alternate !== null && (o = n), (n = n.sibling);
          o === null ? (t.tail = null) : (o.sibling = null);
          break;
        case "collapsed":
          o = t.tail;
          for (var l = null; o !== null; )
            o.alternate !== null && (l = o), (o = o.sibling);
          l === null
            ? n || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Xe(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      o = 0,
      l = 0;
    if (n)
      for (var c = t.child; c !== null; )
        (o |= c.lanes | c.childLanes),
          (l |= c.subtreeFlags & 65011712),
          (l |= c.flags & 65011712),
          (c.return = t),
          (c = c.sibling);
    else
      for (c = t.child; c !== null; )
        (o |= c.lanes | c.childLanes),
          (l |= c.subtreeFlags),
          (l |= c.flags),
          (c.return = t),
          (c = c.sibling);
    return (t.subtreeFlags |= l), (t.childLanes = o), n;
  }
  function ax(t, n, o) {
    var l = n.pendingProps;
    switch ((xc(n), n.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xe(n), null;
      case 1:
        return Xe(n), null;
      case 3:
        return (
          (o = n.stateNode),
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          n.memoizedState.cache !== l && (n.flags |= 2048),
          pr(ut),
          Ae(),
          o.pendingContext &&
            ((o.context = o.pendingContext), (o.pendingContext = null)),
          (t === null || t.child === null) &&
            (li(n)
              ? vr(n)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), tm())),
          Xe(n),
          null
        );
      case 26:
        return (
          (o = n.memoizedState),
          t === null
            ? (vr(n),
              o !== null ? (Xe(n), Cg(n, o)) : (Xe(n), (n.flags &= -16777217)))
            : o
              ? o !== t.memoizedState
                ? (vr(n), Xe(n), Cg(n, o))
                : (Xe(n), (n.flags &= -16777217))
              : (t.memoizedProps !== l && vr(n), Xe(n), (n.flags &= -16777217)),
          null
        );
      case 27:
        Ie(n), (o = de.current);
        var c = n.type;
        if (t !== null && n.stateNode != null) t.memoizedProps !== l && vr(n);
        else {
          if (!l) {
            if (n.stateNode === null) throw Error(i(166));
            return Xe(n), null;
          }
          (t = ie.current),
            li(n) ? Jp(n) : ((t = Cy(c, l, o)), (n.stateNode = t), vr(n));
        }
        return Xe(n), null;
      case 5:
        if ((Ie(n), (o = n.type), t !== null && n.stateNode != null))
          t.memoizedProps !== l && vr(n);
        else {
          if (!l) {
            if (n.stateNode === null) throw Error(i(166));
            return Xe(n), null;
          }
          if (((t = ie.current), li(n))) Jp(n);
          else {
            switch (((c = zs(de.current)), t)) {
              case 1:
                t = c.createElementNS("http://www.w3.org/2000/svg", o);
                break;
              case 2:
                t = c.createElementNS("http://www.w3.org/1998/Math/MathML", o);
                break;
              default:
                switch (o) {
                  case "svg":
                    t = c.createElementNS("http://www.w3.org/2000/svg", o);
                    break;
                  case "math":
                    t = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o,
                    );
                    break;
                  case "script":
                    (t = c.createElement("div")),
                      (t.innerHTML = "<script><\/script>"),
                      (t = t.removeChild(t.firstChild));
                    break;
                  case "select":
                    (t =
                      typeof l.is == "string"
                        ? c.createElement("select", { is: l.is })
                        : c.createElement("select")),
                      l.multiple
                        ? (t.multiple = !0)
                        : l.size && (t.size = l.size);
                    break;
                  default:
                    t =
                      typeof l.is == "string"
                        ? c.createElement(o, { is: l.is })
                        : c.createElement(o);
                }
            }
            (t[ht] = n), (t[st] = l);
            e: for (c = n.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) t.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                (c.child.return = c), (c = c.child);
                continue;
              }
              if (c === n) break e;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === n) break e;
                c = c.return;
              }
              (c.sibling.return = c.return), (c = c.sibling);
            }
            n.stateNode = t;
            e: switch ((Rt(t, o, l), o)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!l.autoFocus;
                break e;
              case "img":
                t = !0;
                break e;
              default:
                t = !1;
            }
            t && vr(n);
          }
        }
        return Xe(n), (n.flags &= -16777217), null;
      case 6:
        if (t && n.stateNode != null) t.memoizedProps !== l && vr(n);
        else {
          if (typeof l != "string" && n.stateNode === null) throw Error(i(166));
          if (((t = de.current), li(n))) {
            if (
              ((t = n.stateNode),
              (o = n.memoizedProps),
              (l = null),
              (c = Ut),
              c !== null)
            )
              switch (c.tag) {
                case 27:
                case 5:
                  l = c.memoizedProps;
              }
            (t[ht] = n),
              (t = !!(
                t.nodeValue === o ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                gy(t.nodeValue, o)
              )),
              t || da(n);
          } else (t = zs(t).createTextNode(l)), (t[ht] = n), (n.stateNode = t);
        }
        return Xe(n), null;
      case 13:
        if (
          ((l = n.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((c = li(n)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!c) throw Error(i(318));
              if (
                ((c = n.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              )
                throw Error(i(317));
              c[ht] = n;
            } else
              si(),
                (n.flags & 128) === 0 && (n.memoizedState = null),
                (n.flags |= 4);
            Xe(n), (c = !1);
          } else
            (c = tm()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = c),
              (c = !0);
          if (!c) return n.flags & 256 ? (gr(n), n) : (gr(n), null);
        }
        if ((gr(n), (n.flags & 128) !== 0)) return (n.lanes = o), n;
        if (
          ((o = l !== null), (t = t !== null && t.memoizedState !== null), o)
        ) {
          (l = n.child),
            (c = null),
            l.alternate !== null &&
              l.alternate.memoizedState !== null &&
              l.alternate.memoizedState.cachePool !== null &&
              (c = l.alternate.memoizedState.cachePool.pool);
          var d = null;
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (d = l.memoizedState.cachePool.pool),
            d !== c && (l.flags |= 2048);
        }
        return (
          o !== t && o && (n.child.flags |= 8192),
          gs(n, n.updateQueue),
          Xe(n),
          null
        );
      case 4:
        return Ae(), t === null && Mf(n.stateNode.containerInfo), Xe(n), null;
      case 10:
        return pr(n.type), Xe(n), null;
      case 19:
        if ((ne(ct), (c = n.memoizedState), c === null)) return Xe(n), null;
        if (((l = (n.flags & 128) !== 0), (d = c.rendering), d === null))
          if (l) Ei(c, !1);
          else {
            if (Je !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((d = fs(t)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Ei(c, !1),
                      t = d.updateQueue,
                      n.updateQueue = t,
                      gs(n, t),
                      n.subtreeFlags = 0,
                      t = o,
                      o = n.child;
                    o !== null;

                  )
                    Ip(o, t), (o = o.sibling);
                  return J(ct, (ct.current & 1) | 2), n.child;
                }
                t = t.sibling;
              }
            c.tail !== null &&
              ft() > bs &&
              ((n.flags |= 128), (l = !0), Ei(c, !1), (n.lanes = 4194304));
          }
        else {
          if (!l)
            if (((t = fs(d)), t !== null)) {
              if (
                ((n.flags |= 128),
                (l = !0),
                (t = t.updateQueue),
                (n.updateQueue = t),
                gs(n, t),
                Ei(c, !0),
                c.tail === null &&
                  c.tailMode === "hidden" &&
                  !d.alternate &&
                  !Ne)
              )
                return Xe(n), null;
            } else
              2 * ft() - c.renderingStartTime > bs &&
                o !== 536870912 &&
                ((n.flags |= 128), (l = !0), Ei(c, !1), (n.lanes = 4194304));
          c.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((t = c.last),
              t !== null ? (t.sibling = d) : (n.child = d),
              (c.last = d));
        }
        return c.tail !== null
          ? ((n = c.tail),
            (c.rendering = n),
            (c.tail = n.sibling),
            (c.renderingStartTime = ft()),
            (n.sibling = null),
            (t = ct.current),
            J(ct, l ? (t & 1) | 2 : t & 1),
            n)
          : (Xe(n), null);
      case 22:
      case 23:
        return (
          gr(n),
          $c(),
          (l = n.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== l && (n.flags |= 8192)
            : l && (n.flags |= 8192),
          l
            ? (o & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (Xe(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : Xe(n),
          (o = n.updateQueue),
          o !== null && gs(n, o.retryQueue),
          (o = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (o = t.memoizedState.cachePool.pool),
          (l = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (l = n.memoizedState.cachePool.pool),
          l !== o && (n.flags |= 2048),
          t !== null && ne(ma),
          null
        );
      case 24:
        return (
          (o = null),
          t !== null && (o = t.memoizedState.cache),
          n.memoizedState.cache !== o && (n.flags |= 2048),
          pr(ut),
          Xe(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function ox(t, n) {
    switch ((xc(n), n.tag)) {
      case 1:
        return (
          (t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 3:
        return (
          pr(ut),
          Ae(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((n.flags = (t & -65537) | 128), n)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Ie(n), null;
      case 13:
        if (
          (gr(n), (t = n.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (n.alternate === null) throw Error(i(340));
          si();
        }
        return (
          (t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 19:
        return ne(ct), null;
      case 4:
        return Ae(), null;
      case 10:
        return pr(n.type), null;
      case 22:
      case 23:
        return (
          gr(n),
          $c(),
          t !== null && ne(ma),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 24:
        return pr(ut), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Eg(t, n) {
    switch ((xc(n), n.tag)) {
      case 3:
        pr(ut), Ae();
        break;
      case 26:
      case 27:
      case 5:
        Ie(n);
        break;
      case 4:
        Ae();
        break;
      case 13:
        gr(n);
        break;
      case 19:
        ne(ct);
        break;
      case 10:
        pr(n.type);
        break;
      case 22:
      case 23:
        gr(n), $c(), t !== null && ne(ma);
        break;
      case 24:
        pr(ut);
    }
  }
  function _i(t, n) {
    try {
      var o = n.updateQueue,
        l = o !== null ? o.lastEffect : null;
      if (l !== null) {
        var c = l.next;
        o = c;
        do {
          if ((o.tag & t) === t) {
            l = void 0;
            var d = o.create,
              b = o.inst;
            (l = d()), (b.destroy = l);
          }
          o = o.next;
        } while (o !== c);
      }
    } catch (C) {
      Be(n, n.return, C);
    }
  }
  function kr(t, n, o) {
    try {
      var l = n.updateQueue,
        c = l !== null ? l.lastEffect : null;
      if (c !== null) {
        var d = c.next;
        l = d;
        do {
          if ((l.tag & t) === t) {
            var b = l.inst,
              C = b.destroy;
            if (C !== void 0) {
              (b.destroy = void 0), (c = n);
              var z = o,
                H = C;
              try {
                H();
              } catch (q) {
                Be(c, z, q);
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (q) {
      Be(n, n.return, q);
    }
  }
  function _g(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var o = t.stateNode;
      try {
        dm(n, o);
      } catch (l) {
        Be(t, t.return, l);
      }
    }
  }
  function Rg(t, n, o) {
    (o.props = ya(t.type, t.memoizedProps)), (o.state = t.memoizedState);
    try {
      o.componentWillUnmount();
    } catch (l) {
      Be(t, n, l);
    }
  }
  function Ri(t, n) {
    try {
      var o = t.ref;
      if (o !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof o == "function" ? (t.refCleanup = o(l)) : (o.current = l);
      }
    } catch (c) {
      Be(t, n, c);
    }
  }
  function Xn(t, n) {
    var o = t.ref,
      l = t.refCleanup;
    if (o !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (c) {
          Be(t, n, c);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof o == "function")
        try {
          o(null);
        } catch (c) {
          Be(t, n, c);
        }
      else o.current = null;
  }
  function Tg(t) {
    var n = t.type,
      o = t.memoizedProps,
      l = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          o.autoFocus && l.focus();
          break e;
        case "img":
          o.src ? (l.src = o.src) : o.srcSet && (l.srcset = o.srcSet);
      }
    } catch (c) {
      Be(t, t.return, c);
    }
  }
  function cf(t, n, o) {
    try {
      var l = t.stateNode;
      Rx(l, t.type, o, n), (l[st] = n);
    } catch (c) {
      Be(t, t.return, c);
    }
  }
  function Ag(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && qr(t.type)) ||
      t.tag === 4
    );
  }
  function ff(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ag(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && qr(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue e;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function df(t, n, o) {
    var l = t.tag;
    if (l === 5 || l === 6)
      (t = t.stateNode),
        n
          ? (o.nodeType === 9
              ? o.body
              : o.nodeName === "HTML"
                ? o.ownerDocument.body
                : o
            ).insertBefore(t, n)
          : ((n =
              o.nodeType === 9
                ? o.body
                : o.nodeName === "HTML"
                  ? o.ownerDocument.body
                  : o),
            n.appendChild(t),
            (o = o._reactRootContainer),
            o != null || n.onclick !== null || (n.onclick = As));
    else if (
      l !== 4 &&
      (l === 27 && qr(t.type) && ((o = t.stateNode), (n = null)),
      (t = t.child),
      t !== null)
    )
      for (df(t, n, o), t = t.sibling; t !== null; )
        df(t, n, o), (t = t.sibling);
  }
  function ys(t, n, o) {
    var l = t.tag;
    if (l === 5 || l === 6)
      (t = t.stateNode), n ? o.insertBefore(t, n) : o.appendChild(t);
    else if (
      l !== 4 &&
      (l === 27 && qr(t.type) && (o = t.stateNode), (t = t.child), t !== null)
    )
      for (ys(t, n, o), t = t.sibling; t !== null; )
        ys(t, n, o), (t = t.sibling);
  }
  function zg(t) {
    var n = t.stateNode,
      o = t.memoizedProps;
    try {
      for (var l = t.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      Rt(n, l, o), (n[ht] = t), (n[st] = o);
    } catch (d) {
      Be(t, t.return, d);
    }
  }
  var br = !1,
    tt = !1,
    hf = !1,
    Og = typeof WeakSet == "function" ? WeakSet : Set,
    gt = null;
  function ix(t, n) {
    if (((t = t.containerInfo), (Lf = $s), (t = Pp(t)), cc(t))) {
      if ("selectionStart" in t)
        var o = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          o = ((o = t.ownerDocument) && o.defaultView) || window;
          var l = o.getSelection && o.getSelection();
          if (l && l.rangeCount !== 0) {
            o = l.anchorNode;
            var c = l.anchorOffset,
              d = l.focusNode;
            l = l.focusOffset;
            try {
              o.nodeType, d.nodeType;
            } catch {
              o = null;
              break e;
            }
            var b = 0,
              C = -1,
              z = -1,
              H = 0,
              q = 0,
              X = t,
              B = null;
            t: for (;;) {
              for (
                var P;
                X !== o || (c !== 0 && X.nodeType !== 3) || (C = b + c),
                  X !== d || (l !== 0 && X.nodeType !== 3) || (z = b + l),
                  X.nodeType === 3 && (b += X.nodeValue.length),
                  (P = X.firstChild) !== null;

              )
                (B = X), (X = P);
              for (;;) {
                if (X === t) break t;
                if (
                  (B === o && ++H === c && (C = b),
                  B === d && ++q === l && (z = b),
                  (P = X.nextSibling) !== null)
                )
                  break;
                (X = B), (B = X.parentNode);
              }
              X = P;
            }
            o = C === -1 || z === -1 ? null : { start: C, end: z };
          } else o = null;
        }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (
      Uf = { focusedElem: t, selectionRange: o }, $s = !1, gt = n;
      gt !== null;

    )
      if (
        ((n = gt), (t = n.child), (n.subtreeFlags & 1024) !== 0 && t !== null)
      )
        (t.return = n), (gt = t);
      else
        for (; gt !== null; ) {
          switch (((n = gt), (d = n.alternate), (t = n.flags), n.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && d !== null) {
                (t = void 0),
                  (o = n),
                  (c = d.memoizedProps),
                  (d = d.memoizedState),
                  (l = o.stateNode);
                try {
                  var be = ya(o.type, c, o.elementType === o.type);
                  (t = l.getSnapshotBeforeUpdate(be, d)),
                    (l.__reactInternalSnapshotBeforeUpdate = t);
                } catch (ye) {
                  Be(o, o.return, ye);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = n.stateNode.containerInfo), (o = t.nodeType), o === 9)
                )
                  Pf(t);
                else if (o === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Pf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(i(163));
          }
          if (((t = n.sibling), t !== null)) {
            (t.return = n.return), (gt = t);
            break;
          }
          gt = n.return;
        }
  }
  function jg(t, n, o) {
    var l = o.flags;
    switch (o.tag) {
      case 0:
      case 11:
      case 15:
        Lr(t, o), l & 4 && _i(5, o);
        break;
      case 1:
        if ((Lr(t, o), l & 4))
          if (((t = o.stateNode), n === null))
            try {
              t.componentDidMount();
            } catch (b) {
              Be(o, o.return, b);
            }
          else {
            var c = ya(o.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              t.componentDidUpdate(c, n, t.__reactInternalSnapshotBeforeUpdate);
            } catch (b) {
              Be(o, o.return, b);
            }
          }
        l & 64 && _g(o), l & 512 && Ri(o, o.return);
        break;
      case 3:
        if ((Lr(t, o), l & 64 && ((t = o.updateQueue), t !== null))) {
          if (((n = null), o.child !== null))
            switch (o.child.tag) {
              case 27:
              case 5:
                n = o.child.stateNode;
                break;
              case 1:
                n = o.child.stateNode;
            }
          try {
            dm(t, n);
          } catch (b) {
            Be(o, o.return, b);
          }
        }
        break;
      case 27:
        n === null && l & 4 && zg(o);
      case 26:
      case 5:
        Lr(t, o), n === null && l & 4 && Tg(o), l & 512 && Ri(o, o.return);
        break;
      case 12:
        Lr(t, o);
        break;
      case 13:
        Lr(t, o),
          l & 4 && Mg(t, o),
          l & 64 &&
            ((t = o.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((o = mx.bind(null, o)), Nx(t, o))));
        break;
      case 22:
        if (((l = o.memoizedState !== null || br), !l)) {
          (n = (n !== null && n.memoizedState !== null) || tt), (c = br);
          var d = tt;
          (br = l),
            (tt = n) && !d ? Ur(t, o, (o.subtreeFlags & 8772) !== 0) : Lr(t, o),
            (br = c),
            (tt = d);
        }
        break;
      case 30:
        break;
      default:
        Lr(t, o);
    }
  }
  function Dg(t) {
    var n = t.alternate;
    n !== null && ((t.alternate = null), Dg(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((n = t.stateNode), n !== null && Io(n)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Ge = null,
    Ft = !1;
  function Sr(t, n, o) {
    for (o = o.child; o !== null; ) Ng(t, n, o), (o = o.sibling);
  }
  function Ng(t, n, o) {
    if (wt && typeof wt.onCommitFiberUnmount == "function")
      try {
        wt.onCommitFiberUnmount(Ye, o);
      } catch {}
    switch (o.tag) {
      case 26:
        tt || Xn(o, n),
          Sr(t, n, o),
          o.memoizedState
            ? o.memoizedState.count--
            : o.stateNode && ((o = o.stateNode), o.parentNode.removeChild(o));
        break;
      case 27:
        tt || Xn(o, n);
        var l = Ge,
          c = Ft;
        qr(o.type) && ((Ge = o.stateNode), (Ft = !1)),
          Sr(t, n, o),
          $i(o.stateNode),
          (Ge = l),
          (Ft = c);
        break;
      case 5:
        tt || Xn(o, n);
      case 6:
        if (
          ((l = Ge),
          (c = Ft),
          (Ge = null),
          Sr(t, n, o),
          (Ge = l),
          (Ft = c),
          Ge !== null)
        )
          if (Ft)
            try {
              (Ge.nodeType === 9
                ? Ge.body
                : Ge.nodeName === "HTML"
                  ? Ge.ownerDocument.body
                  : Ge
              ).removeChild(o.stateNode);
            } catch (d) {
              Be(o, n, d);
            }
          else
            try {
              Ge.removeChild(o.stateNode);
            } catch (d) {
              Be(o, n, d);
            }
        break;
      case 18:
        Ge !== null &&
          (Ft
            ? ((t = Ge),
              xy(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                o.stateNode,
              ),
              Vi(t))
            : xy(Ge, o.stateNode));
        break;
      case 4:
        (l = Ge),
          (c = Ft),
          (Ge = o.stateNode.containerInfo),
          (Ft = !0),
          Sr(t, n, o),
          (Ge = l),
          (Ft = c);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tt || kr(2, o, n), tt || kr(4, o, n), Sr(t, n, o);
        break;
      case 1:
        tt ||
          (Xn(o, n),
          (l = o.stateNode),
          typeof l.componentWillUnmount == "function" && Rg(o, n, l)),
          Sr(t, n, o);
        break;
      case 21:
        Sr(t, n, o);
        break;
      case 22:
        (tt = (l = tt) || o.memoizedState !== null), Sr(t, n, o), (tt = l);
        break;
      default:
        Sr(t, n, o);
    }
  }
  function Mg(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Vi(t);
      } catch (o) {
        Be(n, n.return, o);
      }
  }
  function lx(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new Og()), n;
      case 22:
        return (
          (t = t.stateNode),
          (n = t._retryCache),
          n === null && (n = t._retryCache = new Og()),
          n
        );
      default:
        throw Error(i(435, t.tag));
    }
  }
  function pf(t, n) {
    var o = lx(t);
    n.forEach(function (l) {
      var c = gx.bind(null, t, l);
      o.has(l) || (o.add(l), l.then(c, c));
    });
  }
  function tn(t, n) {
    var o = n.deletions;
    if (o !== null)
      for (var l = 0; l < o.length; l++) {
        var c = o[l],
          d = t,
          b = n,
          C = b;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (qr(C.type)) {
                (Ge = C.stateNode), (Ft = !1);
                break e;
              }
              break;
            case 5:
              (Ge = C.stateNode), (Ft = !1);
              break e;
            case 3:
            case 4:
              (Ge = C.stateNode.containerInfo), (Ft = !0);
              break e;
          }
          C = C.return;
        }
        if (Ge === null) throw Error(i(160));
        Ng(d, b, c),
          (Ge = null),
          (Ft = !1),
          (d = c.alternate),
          d !== null && (d.return = null),
          (c.return = null);
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; ) $g(n, t), (n = n.sibling);
  }
  var zn = null;
  function $g(t, n) {
    var o = t.alternate,
      l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        tn(n, t),
          nn(t),
          l & 4 && (kr(3, t, t.return), _i(3, t), kr(5, t, t.return));
        break;
      case 1:
        tn(n, t),
          nn(t),
          l & 512 && (tt || o === null || Xn(o, o.return)),
          l & 64 &&
            br &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((o = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = o === null ? l : o.concat(l)))));
        break;
      case 26:
        var c = zn;
        if (
          (tn(n, t),
          nn(t),
          l & 512 && (tt || o === null || Xn(o, o.return)),
          l & 4)
        ) {
          var d = o !== null ? o.memoizedState : null;
          if (((l = t.memoizedState), o === null))
            if (l === null)
              if (t.stateNode === null) {
                e: {
                  (l = t.type),
                    (o = t.memoizedProps),
                    (c = c.ownerDocument || c);
                  t: switch (l) {
                    case "title":
                      (d = c.getElementsByTagName("title")[0]),
                        (!d ||
                          d[Rr] ||
                          d[ht] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = c.createElement(l)),
                          c.head.insertBefore(
                            d,
                            c.querySelector("head > title"),
                          )),
                        Rt(d, l, o),
                        (d[ht] = t),
                        pt(d),
                        (l = d);
                      break e;
                    case "link":
                      var b = zy("link", "href", c).get(l + (o.href || ""));
                      if (b) {
                        for (var C = 0; C < b.length; C++)
                          if (
                            ((d = b[C]),
                            d.getAttribute("href") ===
                              (o.href == null || o.href === ""
                                ? null
                                : o.href) &&
                              d.getAttribute("rel") ===
                                (o.rel == null ? null : o.rel) &&
                              d.getAttribute("title") ===
                                (o.title == null ? null : o.title) &&
                              d.getAttribute("crossorigin") ===
                                (o.crossOrigin == null ? null : o.crossOrigin))
                          ) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      (d = c.createElement(l)),
                        Rt(d, l, o),
                        c.head.appendChild(d);
                      break;
                    case "meta":
                      if (
                        (b = zy("meta", "content", c).get(
                          l + (o.content || ""),
                        ))
                      ) {
                        for (C = 0; C < b.length; C++)
                          if (
                            ((d = b[C]),
                            d.getAttribute("content") ===
                              (o.content == null ? null : "" + o.content) &&
                              d.getAttribute("name") ===
                                (o.name == null ? null : o.name) &&
                              d.getAttribute("property") ===
                                (o.property == null ? null : o.property) &&
                              d.getAttribute("http-equiv") ===
                                (o.httpEquiv == null ? null : o.httpEquiv) &&
                              d.getAttribute("charset") ===
                                (o.charSet == null ? null : o.charSet))
                          ) {
                            b.splice(C, 1);
                            break t;
                          }
                      }
                      (d = c.createElement(l)),
                        Rt(d, l, o),
                        c.head.appendChild(d);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  (d[ht] = t), pt(d), (l = d);
                }
                t.stateNode = l;
              } else Oy(c, t.type, t.stateNode);
            else t.stateNode = Ay(c, l, t.memoizedProps);
          else
            d !== l
              ? (d === null
                  ? o.stateNode !== null &&
                    ((o = o.stateNode), o.parentNode.removeChild(o))
                  : d.count--,
                l === null
                  ? Oy(c, t.type, t.stateNode)
                  : Ay(c, l, t.memoizedProps))
              : l === null &&
                t.stateNode !== null &&
                cf(t, t.memoizedProps, o.memoizedProps);
        }
        break;
      case 27:
        tn(n, t),
          nn(t),
          l & 512 && (tt || o === null || Xn(o, o.return)),
          o !== null && l & 4 && cf(t, t.memoizedProps, o.memoizedProps);
        break;
      case 5:
        if (
          (tn(n, t),
          nn(t),
          l & 512 && (tt || o === null || Xn(o, o.return)),
          t.flags & 32)
        ) {
          c = t.stateNode;
          try {
            Za(c, "");
          } catch (P) {
            Be(t, t.return, P);
          }
        }
        l & 4 &&
          t.stateNode != null &&
          ((c = t.memoizedProps), cf(t, c, o !== null ? o.memoizedProps : c)),
          l & 1024 && (hf = !0);
        break;
      case 6:
        if ((tn(n, t), nn(t), l & 4)) {
          if (t.stateNode === null) throw Error(i(162));
          (l = t.memoizedProps), (o = t.stateNode);
          try {
            o.nodeValue = l;
          } catch (P) {
            Be(t, t.return, P);
          }
        }
        break;
      case 3:
        if (
          ((Ds = null),
          (c = zn),
          (zn = Os(n.containerInfo)),
          tn(n, t),
          (zn = c),
          nn(t),
          l & 4 && o !== null && o.memoizedState.isDehydrated)
        )
          try {
            Vi(n.containerInfo);
          } catch (P) {
            Be(t, t.return, P);
          }
        hf && ((hf = !1), kg(t));
        break;
      case 4:
        (l = zn),
          (zn = Os(t.stateNode.containerInfo)),
          tn(n, t),
          nn(t),
          (zn = l);
        break;
      case 12:
        tn(n, t), nn(t);
        break;
      case 13:
        tn(n, t),
          nn(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (o !== null && o.memoizedState !== null) &&
            (Sf = ft()),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), pf(t, l)));
        break;
      case 22:
        c = t.memoizedState !== null;
        var z = o !== null && o.memoizedState !== null,
          H = br,
          q = tt;
        if (
          ((br = H || c),
          (tt = q || z),
          tn(n, t),
          (tt = q),
          (br = H),
          nn(t),
          l & 8192)
        )
          e: for (
            n = t.stateNode,
              n._visibility = c ? n._visibility & -2 : n._visibility | 1,
              c && (o === null || z || br || tt || va(t)),
              o = null,
              n = t;
            ;

          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (o === null) {
                z = o = n;
                try {
                  if (((d = z.stateNode), c))
                    (b = d.style),
                      typeof b.setProperty == "function"
                        ? b.setProperty("display", "none", "important")
                        : (b.display = "none");
                  else {
                    C = z.stateNode;
                    var X = z.memoizedProps.style,
                      B =
                        X != null && X.hasOwnProperty("display")
                          ? X.display
                          : null;
                    C.style.display =
                      B == null || typeof B == "boolean" ? "" : ("" + B).trim();
                  }
                } catch (P) {
                  Be(z, z.return, P);
                }
              }
            } else if (n.tag === 6) {
              if (o === null) {
                z = n;
                try {
                  z.stateNode.nodeValue = c ? "" : z.memoizedProps;
                } catch (P) {
                  Be(z, z.return, P);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) ||
                n.memoizedState === null ||
                n === t) &&
              n.child !== null
            ) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              o === n && (o = null), (n = n.return);
            }
            o === n && (o = null),
              (n.sibling.return = n.return),
              (n = n.sibling);
          }
        l & 4 &&
          ((l = t.updateQueue),
          l !== null &&
            ((o = l.retryQueue),
            o !== null && ((l.retryQueue = null), pf(t, o))));
        break;
      case 19:
        tn(n, t),
          nn(t),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), pf(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        tn(n, t), nn(t);
    }
  }
  function nn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var o, l = t.return; l !== null; ) {
          if (Ag(l)) {
            o = l;
            break;
          }
          l = l.return;
        }
        if (o == null) throw Error(i(160));
        switch (o.tag) {
          case 27:
            var c = o.stateNode,
              d = ff(t);
            ys(t, d, c);
            break;
          case 5:
            var b = o.stateNode;
            o.flags & 32 && (Za(b, ""), (o.flags &= -33));
            var C = ff(t);
            ys(t, C, b);
            break;
          case 3:
          case 4:
            var z = o.stateNode.containerInfo,
              H = ff(t);
            df(t, H, z);
            break;
          default:
            throw Error(i(161));
        }
      } catch (q) {
        Be(t, t.return, q);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function kg(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        kg(n),
          n.tag === 5 && n.flags & 1024 && n.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function Lr(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) jg(t, n.alternate, n), (n = n.sibling);
  }
  function va(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kr(4, n, n.return), va(n);
          break;
        case 1:
          Xn(n, n.return);
          var o = n.stateNode;
          typeof o.componentWillUnmount == "function" && Rg(n, n.return, o),
            va(n);
          break;
        case 27:
          $i(n.stateNode);
        case 26:
        case 5:
          Xn(n, n.return), va(n);
          break;
        case 22:
          n.memoizedState === null && va(n);
          break;
        case 30:
          va(n);
          break;
        default:
          va(n);
      }
      t = t.sibling;
    }
  }
  function Ur(t, n, o) {
    for (o = o && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate,
        c = t,
        d = n,
        b = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ur(c, d, o), _i(4, d);
          break;
        case 1:
          if (
            (Ur(c, d, o),
            (l = d),
            (c = l.stateNode),
            typeof c.componentDidMount == "function")
          )
            try {
              c.componentDidMount();
            } catch (H) {
              Be(l, l.return, H);
            }
          if (((l = d), (c = l.updateQueue), c !== null)) {
            var C = l.stateNode;
            try {
              var z = c.shared.hiddenCallbacks;
              if (z !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < z.length; c++)
                  fm(z[c], C);
            } catch (H) {
              Be(l, l.return, H);
            }
          }
          o && b & 64 && _g(d), Ri(d, d.return);
          break;
        case 27:
          zg(d);
        case 26:
        case 5:
          Ur(c, d, o), o && l === null && b & 4 && Tg(d), Ri(d, d.return);
          break;
        case 12:
          Ur(c, d, o);
          break;
        case 13:
          Ur(c, d, o), o && b & 4 && Mg(c, d);
          break;
        case 22:
          d.memoizedState === null && Ur(c, d, o), Ri(d, d.return);
          break;
        case 30:
          break;
        default:
          Ur(c, d, o);
      }
      n = n.sibling;
    }
  }
  function mf(t, n) {
    var o = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (o = t.memoizedState.cachePool.pool),
      (t = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (t = n.memoizedState.cachePool.pool),
      t !== o && (t != null && t.refCount++, o != null && fi(o));
  }
  function gf(t, n) {
    (t = null),
      n.alternate !== null && (t = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== t && (n.refCount++, t != null && fi(t));
  }
  function Kn(t, n, o, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) Lg(t, n, o, l), (n = n.sibling);
  }
  function Lg(t, n, o, l) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Kn(t, n, o, l), c & 2048 && _i(9, n);
        break;
      case 1:
        Kn(t, n, o, l);
        break;
      case 3:
        Kn(t, n, o, l),
          c & 2048 &&
            ((t = null),
            n.alternate !== null && (t = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== t && (n.refCount++, t != null && fi(t)));
        break;
      case 12:
        if (c & 2048) {
          Kn(t, n, o, l), (t = n.stateNode);
          try {
            var d = n.memoizedProps,
              b = d.id,
              C = d.onPostCommit;
            typeof C == "function" &&
              C(
                b,
                n.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (z) {
            Be(n, n.return, z);
          }
        } else Kn(t, n, o, l);
        break;
      case 13:
        Kn(t, n, o, l);
        break;
      case 23:
        break;
      case 22:
        (d = n.stateNode),
          (b = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? Kn(t, n, o, l)
              : Ti(t, n)
            : d._visibility & 2
              ? Kn(t, n, o, l)
              : ((d._visibility |= 2),
                lo(t, n, o, l, (n.subtreeFlags & 10256) !== 0)),
          c & 2048 && mf(b, n);
        break;
      case 24:
        Kn(t, n, o, l), c & 2048 && gf(n.alternate, n);
        break;
      default:
        Kn(t, n, o, l);
    }
  }
  function lo(t, n, o, l, c) {
    for (c = c && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var d = t,
        b = n,
        C = o,
        z = l,
        H = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          lo(d, b, C, z, c), _i(8, b);
          break;
        case 23:
          break;
        case 22:
          var q = b.stateNode;
          b.memoizedState !== null
            ? q._visibility & 2
              ? lo(d, b, C, z, c)
              : Ti(d, b)
            : ((q._visibility |= 2), lo(d, b, C, z, c)),
            c && H & 2048 && mf(b.alternate, b);
          break;
        case 24:
          lo(d, b, C, z, c), c && H & 2048 && gf(b.alternate, b);
          break;
        default:
          lo(d, b, C, z, c);
      }
      n = n.sibling;
    }
  }
  function Ti(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var o = t,
          l = n,
          c = l.flags;
        switch (l.tag) {
          case 22:
            Ti(o, l), c & 2048 && mf(l.alternate, l);
            break;
          case 24:
            Ti(o, l), c & 2048 && gf(l.alternate, l);
            break;
          default:
            Ti(o, l);
        }
        n = n.sibling;
      }
  }
  var Ai = 8192;
  function so(t) {
    if (t.subtreeFlags & Ai)
      for (t = t.child; t !== null; ) Ug(t), (t = t.sibling);
  }
  function Ug(t) {
    switch (t.tag) {
      case 26:
        so(t),
          t.flags & Ai &&
            t.memoizedState !== null &&
            Gx(zn, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        so(t);
        break;
      case 3:
      case 4:
        var n = zn;
        (zn = Os(t.stateNode.containerInfo)), so(t), (zn = n);
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ai), (Ai = 16777216), so(t), (Ai = n))
            : so(t));
        break;
      default:
        so(t);
    }
  }
  function Hg(t) {
    var n = t.alternate;
    if (n !== null && ((t = n.child), t !== null)) {
      n.child = null;
      do (n = t.sibling), (t.sibling = null), (t = n);
      while (t !== null);
    }
  }
  function zi(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var o = 0; o < n.length; o++) {
          var l = n[o];
          (gt = l), Pg(l, t);
        }
      Hg(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Bg(t), (t = t.sibling);
  }
  function Bg(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        zi(t), t.flags & 2048 && kr(9, t, t.return);
        break;
      case 3:
        zi(t);
        break;
      case 12:
        zi(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null &&
        n._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((n._visibility &= -3), vs(t))
          : zi(t);
        break;
      default:
        zi(t);
    }
  }
  function vs(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var o = 0; o < n.length; o++) {
          var l = n[o];
          (gt = l), Pg(l, t);
        }
      Hg(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((n = t), n.tag)) {
        case 0:
        case 11:
        case 15:
          kr(8, n, n.return), vs(n);
          break;
        case 22:
          (o = n.stateNode),
            o._visibility & 2 && ((o._visibility &= -3), vs(n));
          break;
        default:
          vs(n);
      }
      t = t.sibling;
    }
  }
  function Pg(t, n) {
    for (; gt !== null; ) {
      var o = gt;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          kr(8, o, n);
          break;
        case 23:
        case 22:
          if (o.memoizedState !== null && o.memoizedState.cachePool !== null) {
            var l = o.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          fi(o.memoizedState.cache);
      }
      if (((l = o.child), l !== null)) (l.return = o), (gt = l);
      else
        e: for (o = t; gt !== null; ) {
          l = gt;
          var c = l.sibling,
            d = l.return;
          if ((Dg(l), l === o)) {
            gt = null;
            break e;
          }
          if (c !== null) {
            (c.return = d), (gt = c);
            break e;
          }
          gt = d;
        }
    }
  }
  var sx = {
      getCacheForType: function (t) {
        var n = zt(ut),
          o = n.data.get(t);
        return o === void 0 && ((o = t()), n.data.set(t, o)), o;
      },
    },
    ux = typeof WeakMap == "function" ? WeakMap : Map,
    Me = 0,
    Pe = null,
    Re = null,
    Oe = 0,
    $e = 0,
    rn = null,
    Hr = !1,
    uo = !1,
    yf = !1,
    xr = 0,
    Je = 0,
    Br = 0,
    ba = 0,
    vf = 0,
    bn = 0,
    co = 0,
    Oi = null,
    Qt = null,
    bf = !1,
    Sf = 0,
    bs = 1 / 0,
    Ss = null,
    Pr = null,
    _t = 0,
    Zr = null,
    fo = null,
    ho = 0,
    xf = 0,
    wf = null,
    Zg = null,
    ji = 0,
    Cf = null;
  function an() {
    if ((Me & 2) !== 0 && Oe !== 0) return Oe & -Oe;
    if (M.T !== null) {
      var t = Ja;
      return t !== 0 ? t : Of();
    }
    return dt();
  }
  function Vg() {
    bn === 0 && (bn = (Oe & 536870912) === 0 || Ne ? Qo() : 536870912);
    var t = vn.current;
    return t !== null && (t.flags |= 32), bn;
  }
  function on(t, n, o) {
    ((t === Pe && ($e === 2 || $e === 9)) || t.cancelPendingCommit !== null) &&
      (po(t, 0), Vr(t, Oe, bn, !1)),
      fn(t, o),
      ((Me & 2) === 0 || t !== Pe) &&
        (t === Pe &&
          ((Me & 2) === 0 && (ba |= o), Je === 4 && Vr(t, Oe, bn, !1)),
        In(t));
  }
  function qg(t, n, o) {
    if ((Me & 6) !== 0) throw Error(i(327));
    var l = (!o && (n & 124) === 0 && (n & t.expiredLanes) === 0) || ta(t, n),
      c = l ? dx(t, n) : Rf(t, n, !0),
      d = l;
    do {
      if (c === 0) {
        uo && !l && Vr(t, n, 0, !1);
        break;
      } else {
        if (((o = t.current.alternate), d && !cx(o))) {
          (c = Rf(t, n, !1)), (d = !1);
          continue;
        }
        if (c === 2) {
          if (((d = n), t.errorRecoveryDisabledLanes & d)) var b = 0;
          else
            (b = t.pendingLanes & -536870913),
              (b = b !== 0 ? b : b & 536870912 ? 536870912 : 0);
          if (b !== 0) {
            n = b;
            e: {
              var C = t;
              c = Oi;
              var z = C.current.memoizedState.isDehydrated;
              if ((z && (po(C, b).flags |= 256), (b = Rf(C, b, !1)), b !== 2)) {
                if (yf && !z) {
                  (C.errorRecoveryDisabledLanes |= d), (ba |= d), (c = 4);
                  break e;
                }
                (d = Qt),
                  (Qt = c),
                  d !== null && (Qt === null ? (Qt = d) : Qt.push.apply(Qt, d));
              }
              c = b;
            }
            if (((d = !1), c !== 2)) continue;
          }
        }
        if (c === 1) {
          po(t, 0), Vr(t, n, 0, !0);
          break;
        }
        e: {
          switch (((l = t), (d = c), d)) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Vr(l, n, bn, !Hr);
              break e;
            case 2:
              Qt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && ((c = Sf + 300 - ft()), 10 < c)) {
            if ((Vr(l, n, bn, !Hr), ka(l, 0, !0) !== 0)) break e;
            l.timeoutHandle = by(
              Yg.bind(null, l, o, Qt, Ss, bf, n, bn, ba, co, Hr, d, 2, -0, 0),
              c,
            );
            break e;
          }
          Yg(l, o, Qt, Ss, bf, n, bn, ba, co, Hr, d, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    In(t);
  }
  function Yg(t, n, o, l, c, d, b, C, z, H, q, X, B, P) {
    if (
      ((t.timeoutHandle = -1),
      (X = n.subtreeFlags),
      (X & 8192 || (X & 16785408) === 16785408) &&
        ((Ui = { stylesheets: null, count: 0, unsuspend: Yx }),
        Ug(n),
        (X = Fx()),
        X !== null))
    ) {
      (t.cancelPendingCommit = X(
        Wg.bind(null, t, n, d, o, l, c, b, C, z, q, 1, B, P),
      )),
        Vr(t, d, b, !H);
      return;
    }
    Wg(t, n, d, o, l, c, b, C, z);
  }
  function cx(t) {
    for (var n = t; ; ) {
      var o = n.tag;
      if (
        (o === 0 || o === 11 || o === 15) &&
        n.flags & 16384 &&
        ((o = n.updateQueue), o !== null && ((o = o.stores), o !== null))
      )
        for (var l = 0; l < o.length; l++) {
          var c = o[l],
            d = c.getSnapshot;
          c = c.value;
          try {
            if (!Jt(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (((o = n.child), n.subtreeFlags & 16384 && o !== null))
        (o.return = n), (n = o);
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }
    return !0;
  }
  function Vr(t, n, o, l) {
    (n &= ~vf),
      (n &= ~ba),
      (t.suspendedLanes |= n),
      (t.pingedLanes &= ~n),
      l && (t.warmLanes |= n),
      (l = t.expirationTimes);
    for (var c = n; 0 < c; ) {
      var d = 31 - Ct(c),
        b = 1 << d;
      (l[d] = -1), (c &= ~b);
    }
    o !== 0 && zl(t, o, n);
  }
  function xs() {
    return (Me & 6) === 0 ? (Di(0), !1) : !0;
  }
  function Ef() {
    if (Re !== null) {
      if ($e === 0) var t = Re.return;
      else (t = Re), (hr = ha = null), Bc(t), (oo = null), (wi = 0), (t = Re);
      for (; t !== null; ) Eg(t.alternate, t), (t = t.return);
      Re = null;
    }
  }
  function po(t, n) {
    var o = t.timeoutHandle;
    o !== -1 && ((t.timeoutHandle = -1), Ax(o)),
      (o = t.cancelPendingCommit),
      o !== null && ((t.cancelPendingCommit = null), o()),
      Ef(),
      (Pe = t),
      (Re = o = cr(t.current, null)),
      (Oe = n),
      ($e = 0),
      (rn = null),
      (Hr = !1),
      (uo = ta(t, n)),
      (yf = !1),
      (co = bn = vf = ba = Br = Je = 0),
      (Qt = Oi = null),
      (bf = !1),
      (n & 8) !== 0 && (n |= n & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= n; 0 < l; ) {
        var c = 31 - Ct(l),
          d = 1 << c;
        (n |= t[c]), (l &= ~d);
      }
    return (xr = n), Vl(), o;
  }
  function Gg(t, n) {
    (Ce = null),
      (M.H = ss),
      n === hi || n === Wl
        ? ((n = um()), ($e = 3))
        : n === im
          ? ((n = um()), ($e = 4))
          : ($e =
              n === cg
                ? 8
                : n !== null &&
                    typeof n == "object" &&
                    typeof n.then == "function"
                  ? 6
                  : 1),
      (rn = n),
      Re === null && ((Je = 1), hs(t, pn(n, t.current)));
  }
  function Fg() {
    var t = M.H;
    return (M.H = ss), t === null ? ss : t;
  }
  function Qg() {
    var t = M.A;
    return (M.A = sx), t;
  }
  function _f() {
    (Je = 4),
      Hr || ((Oe & 4194048) !== Oe && vn.current !== null) || (uo = !0),
      ((Br & 134217727) === 0 && (ba & 134217727) === 0) ||
        Pe === null ||
        Vr(Pe, Oe, bn, !1);
  }
  function Rf(t, n, o) {
    var l = Me;
    Me |= 2;
    var c = Fg(),
      d = Qg();
    (Pe !== t || Oe !== n) && ((Ss = null), po(t, n)), (n = !1);
    var b = Je;
    e: do
      try {
        if ($e !== 0 && Re !== null) {
          var C = Re,
            z = rn;
          switch ($e) {
            case 8:
              Ef(), (b = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              vn.current === null && (n = !0);
              var H = $e;
              if ((($e = 0), (rn = null), mo(t, C, z, H), o && uo)) {
                b = 0;
                break e;
              }
              break;
            default:
              (H = $e), ($e = 0), (rn = null), mo(t, C, z, H);
          }
        }
        fx(), (b = Je);
        break;
      } catch (q) {
        Gg(t, q);
      }
    while (!0);
    return (
      n && t.shellSuspendCounter++,
      (hr = ha = null),
      (Me = l),
      (M.H = c),
      (M.A = d),
      Re === null && ((Pe = null), (Oe = 0), Vl()),
      b
    );
  }
  function fx() {
    for (; Re !== null; ) Xg(Re);
  }
  function dx(t, n) {
    var o = Me;
    Me |= 2;
    var l = Fg(),
      c = Qg();
    Pe !== t || Oe !== n
      ? ((Ss = null), (bs = ft() + 500), po(t, n))
      : (uo = ta(t, n));
    e: do
      try {
        if ($e !== 0 && Re !== null) {
          n = Re;
          var d = rn;
          t: switch ($e) {
            case 1:
              ($e = 0), (rn = null), mo(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (lm(d)) {
                ($e = 0), (rn = null), Kg(n);
                break;
              }
              (n = function () {
                ($e !== 2 && $e !== 9) || Pe !== t || ($e = 7), In(t);
              }),
                d.then(n, n);
              break e;
            case 3:
              $e = 7;
              break e;
            case 4:
              $e = 5;
              break e;
            case 7:
              lm(d)
                ? (($e = 0), (rn = null), Kg(n))
                : (($e = 0), (rn = null), mo(t, n, d, 7));
              break;
            case 5:
              var b = null;
              switch (Re.tag) {
                case 26:
                  b = Re.memoizedState;
                case 5:
                case 27:
                  var C = Re;
                  if (!b || jy(b)) {
                    ($e = 0), (rn = null);
                    var z = C.sibling;
                    if (z !== null) Re = z;
                    else {
                      var H = C.return;
                      H !== null ? ((Re = H), ws(H)) : (Re = null);
                    }
                    break t;
                  }
              }
              ($e = 0), (rn = null), mo(t, n, d, 5);
              break;
            case 6:
              ($e = 0), (rn = null), mo(t, n, d, 6);
              break;
            case 8:
              Ef(), (Je = 6);
              break e;
            default:
              throw Error(i(462));
          }
        }
        hx();
        break;
      } catch (q) {
        Gg(t, q);
      }
    while (!0);
    return (
      (hr = ha = null),
      (M.H = l),
      (M.A = c),
      (Me = o),
      Re !== null ? 0 : ((Pe = null), (Oe = 0), Vl(), Je)
    );
  }
  function hx() {
    for (; Re !== null && !un(); ) Xg(Re);
  }
  function Xg(t) {
    var n = wg(t.alternate, t, xr);
    (t.memoizedProps = t.pendingProps), n === null ? ws(t) : (Re = n);
  }
  function Kg(t) {
    var n = t,
      o = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = gg(o, n, n.pendingProps, n.type, void 0, Oe);
        break;
      case 11:
        n = gg(o, n, n.pendingProps, n.type.render, n.ref, Oe);
        break;
      case 5:
        Bc(n);
      default:
        Eg(o, n), (n = Re = Ip(n, xr)), (n = wg(o, n, xr));
    }
    (t.memoizedProps = t.pendingProps), n === null ? ws(t) : (Re = n);
  }
  function mo(t, n, o, l) {
    (hr = ha = null), Bc(n), (oo = null), (wi = 0);
    var c = n.return;
    try {
      if (nx(t, c, n, o, Oe)) {
        (Je = 1), hs(t, pn(o, t.current)), (Re = null);
        return;
      }
    } catch (d) {
      if (c !== null) throw ((Re = c), d);
      (Je = 1), hs(t, pn(o, t.current)), (Re = null);
      return;
    }
    n.flags & 32768
      ? (Ne || l === 1
          ? (t = !0)
          : uo || (Oe & 536870912) !== 0
            ? (t = !1)
            : ((Hr = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = vn.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        Ig(n, t))
      : ws(n);
  }
  function ws(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Ig(n, Hr);
        return;
      }
      t = n.return;
      var o = ax(n.alternate, n, xr);
      if (o !== null) {
        Re = o;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        Re = n;
        return;
      }
      Re = n = t;
    } while (n !== null);
    Je === 0 && (Je = 5);
  }
  function Ig(t, n) {
    do {
      var o = ox(t.alternate, t);
      if (o !== null) {
        (o.flags &= 32767), (Re = o);
        return;
      }
      if (
        ((o = t.return),
        o !== null &&
          ((o.flags |= 32768), (o.subtreeFlags = 0), (o.deletions = null)),
        !n && ((t = t.sibling), t !== null))
      ) {
        Re = t;
        return;
      }
      Re = t = o;
    } while (t !== null);
    (Je = 6), (Re = null);
  }
  function Wg(t, n, o, l, c, d, b, C, z) {
    t.cancelPendingCommit = null;
    do Cs();
    while (_t !== 0);
    if ((Me & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === t.current) throw Error(i(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= mc),
        Lt(t, o, d, b, C, z),
        t === Pe && ((Re = Pe = null), (Oe = 0)),
        (fo = n),
        (Zr = t),
        (ho = o),
        (xf = d),
        (wf = c),
        (Zg = l),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            yx(lt, function () {
              return ry(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || l)
      ) {
        (l = M.T), (M.T = null), (c = Q.p), (Q.p = 2), (b = Me), (Me |= 4);
        try {
          ix(t, n, o);
        } finally {
          (Me = b), (Q.p = c), (M.T = l);
        }
      }
      (_t = 1), Jg(), ey(), ty();
    }
  }
  function Jg() {
    if (_t === 1) {
      _t = 0;
      var t = Zr,
        n = fo,
        o = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || o) {
        (o = M.T), (M.T = null);
        var l = Q.p;
        Q.p = 2;
        var c = Me;
        Me |= 4;
        try {
          $g(n, t);
          var d = Uf,
            b = Pp(t.containerInfo),
            C = d.focusedElem,
            z = d.selectionRange;
          if (
            b !== C &&
            C &&
            C.ownerDocument &&
            Bp(C.ownerDocument.documentElement, C)
          ) {
            if (z !== null && cc(C)) {
              var H = z.start,
                q = z.end;
              if ((q === void 0 && (q = H), "selectionStart" in C))
                (C.selectionStart = H),
                  (C.selectionEnd = Math.min(q, C.value.length));
              else {
                var X = C.ownerDocument || document,
                  B = (X && X.defaultView) || window;
                if (B.getSelection) {
                  var P = B.getSelection(),
                    be = C.textContent.length,
                    ye = Math.min(z.start, be),
                    Ue = z.end === void 0 ? ye : Math.min(z.end, be);
                  !P.extend && ye > Ue && ((b = Ue), (Ue = ye), (ye = b));
                  var $ = Hp(C, ye),
                    N = Hp(C, Ue);
                  if (
                    $ &&
                    N &&
                    (P.rangeCount !== 1 ||
                      P.anchorNode !== $.node ||
                      P.anchorOffset !== $.offset ||
                      P.focusNode !== N.node ||
                      P.focusOffset !== N.offset)
                  ) {
                    var L = X.createRange();
                    L.setStart($.node, $.offset),
                      P.removeAllRanges(),
                      ye > Ue
                        ? (P.addRange(L), P.extend(N.node, N.offset))
                        : (L.setEnd(N.node, N.offset), P.addRange(L));
                  }
                }
              }
            }
            for (X = [], P = C; (P = P.parentNode); )
              P.nodeType === 1 &&
                X.push({ element: P, left: P.scrollLeft, top: P.scrollTop });
            for (
              typeof C.focus == "function" && C.focus(), C = 0;
              C < X.length;
              C++
            ) {
              var F = X[C];
              (F.element.scrollLeft = F.left), (F.element.scrollTop = F.top);
            }
          }
          ($s = !!Lf), (Uf = Lf = null);
        } finally {
          (Me = c), (Q.p = l), (M.T = o);
        }
      }
      (t.current = n), (_t = 2);
    }
  }
  function ey() {
    if (_t === 2) {
      _t = 0;
      var t = Zr,
        n = fo,
        o = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || o) {
        (o = M.T), (M.T = null);
        var l = Q.p;
        Q.p = 2;
        var c = Me;
        Me |= 4;
        try {
          jg(t, n.alternate, n);
        } finally {
          (Me = c), (Q.p = l), (M.T = o);
        }
      }
      _t = 3;
    }
  }
  function ty() {
    if (_t === 4 || _t === 3) {
      (_t = 0), qn();
      var t = Zr,
        n = fo,
        o = ho,
        l = Zg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (_t = 5)
        : ((_t = 0), (fo = Zr = null), ny(t, t.pendingLanes));
      var c = t.pendingLanes;
      if (
        (c === 0 && (Pr = null),
        Ko(o),
        (n = n.stateNode),
        wt && typeof wt.onCommitFiberRoot == "function")
      )
        try {
          wt.onCommitFiberRoot(Ye, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        (n = M.T), (c = Q.p), (Q.p = 2), (M.T = null);
        try {
          for (var d = t.onRecoverableError, b = 0; b < l.length; b++) {
            var C = l[b];
            d(C.value, { componentStack: C.stack });
          }
        } finally {
          (M.T = n), (Q.p = c);
        }
      }
      (ho & 3) !== 0 && Cs(),
        In(t),
        (c = t.pendingLanes),
        (o & 4194090) !== 0 && (c & 42) !== 0
          ? t === Cf
            ? ji++
            : ((ji = 0), (Cf = t))
          : (ji = 0),
        Di(0);
    }
  }
  function ny(t, n) {
    (t.pooledCacheLanes &= n) === 0 &&
      ((n = t.pooledCache), n != null && ((t.pooledCache = null), fi(n)));
  }
  function Cs(t) {
    return Jg(), ey(), ty(), ry();
  }
  function ry() {
    if (_t !== 5) return !1;
    var t = Zr,
      n = xf;
    xf = 0;
    var o = Ko(ho),
      l = M.T,
      c = Q.p;
    try {
      (Q.p = 32 > o ? 32 : o), (M.T = null), (o = wf), (wf = null);
      var d = Zr,
        b = ho;
      if (((_t = 0), (fo = Zr = null), (ho = 0), (Me & 6) !== 0))
        throw Error(i(331));
      var C = Me;
      if (
        ((Me |= 4),
        Bg(d.current),
        Lg(d, d.current, b, o),
        (Me = C),
        Di(0, !1),
        wt && typeof wt.onPostCommitFiberRoot == "function")
      )
        try {
          wt.onPostCommitFiberRoot(Ye, d);
        } catch {}
      return !0;
    } finally {
      (Q.p = c), (M.T = l), ny(t, n);
    }
  }
  function ay(t, n, o) {
    (n = pn(o, n)),
      (n = ef(t.stateNode, n, 2)),
      (t = Dr(t, n, 2)),
      t !== null && (fn(t, 2), In(t));
  }
  function Be(t, n, o) {
    if (t.tag === 3) ay(t, t, o);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          ay(n, t, o);
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (Pr === null || !Pr.has(l)))
          ) {
            (t = pn(o, t)),
              (o = sg(2)),
              (l = Dr(n, o, 2)),
              l !== null && (ug(o, l, n, t), fn(l, 2), In(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Tf(t, n, o) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new ux();
      var c = new Set();
      l.set(n, c);
    } else (c = l.get(n)), c === void 0 && ((c = new Set()), l.set(n, c));
    c.has(o) ||
      ((yf = !0), c.add(o), (t = px.bind(null, t, n, o)), n.then(t, t));
  }
  function px(t, n, o) {
    var l = t.pingCache;
    l !== null && l.delete(n),
      (t.pingedLanes |= t.suspendedLanes & o),
      (t.warmLanes &= ~o),
      Pe === t &&
        (Oe & o) === o &&
        (Je === 4 || (Je === 3 && (Oe & 62914560) === Oe && 300 > ft() - Sf)
          ? (Me & 2) === 0 && po(t, 0)
          : (vf |= o),
        co === Oe && (co = 0)),
      In(t);
  }
  function oy(t, n) {
    n === 0 && (n = La()), (t = Xa(t, n)), t !== null && (fn(t, n), In(t));
  }
  function mx(t) {
    var n = t.memoizedState,
      o = 0;
    n !== null && (o = n.retryLane), oy(t, o);
  }
  function gx(t, n) {
    var o = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode,
          c = t.memoizedState;
        c !== null && (o = c.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    l !== null && l.delete(n), oy(t, o);
  }
  function yx(t, n) {
    return qe(t, n);
  }
  var Es = null,
    go = null,
    Af = !1,
    _s = !1,
    zf = !1,
    Sa = 0;
  function In(t) {
    t !== go &&
      t.next === null &&
      (go === null ? (Es = go = t) : (go = go.next = t)),
      (_s = !0),
      Af || ((Af = !0), bx());
  }
  function Di(t, n) {
    if (!zf && _s) {
      zf = !0;
      do
        for (var o = !1, l = Es; l !== null; ) {
          if (t !== 0) {
            var c = l.pendingLanes;
            if (c === 0) var d = 0;
            else {
              var b = l.suspendedLanes,
                C = l.pingedLanes;
              (d = (1 << (31 - Ct(42 | t) + 1)) - 1),
                (d &= c & ~(b & ~C)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0);
            }
            d !== 0 && ((o = !0), uy(l, d));
          } else
            (d = Oe),
              (d = ka(
                l,
                l === Pe ? d : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || ta(l, d) || ((o = !0), uy(l, d));
          l = l.next;
        }
      while (o);
      zf = !1;
    }
  }
  function vx() {
    iy();
  }
  function iy() {
    _s = Af = !1;
    var t = 0;
    Sa !== 0 && (Tx() && (t = Sa), (Sa = 0));
    for (var n = ft(), o = null, l = Es; l !== null; ) {
      var c = l.next,
        d = ly(l, n);
      d === 0
        ? ((l.next = null),
          o === null ? (Es = c) : (o.next = c),
          c === null && (go = o))
        : ((o = l), (t !== 0 || (d & 3) !== 0) && (_s = !0)),
        (l = c);
    }
    Di(t);
  }
  function ly(t, n) {
    for (
      var o = t.suspendedLanes,
        l = t.pingedLanes,
        c = t.expirationTimes,
        d = t.pendingLanes & -62914561;
      0 < d;

    ) {
      var b = 31 - Ct(d),
        C = 1 << b,
        z = c[b];
      z === -1
        ? ((C & o) === 0 || (C & l) !== 0) && (c[b] = Vu(C, n))
        : z <= n && (t.expiredLanes |= C),
        (d &= ~C);
    }
    if (
      ((n = Pe),
      (o = Oe),
      (o = ka(
        t,
        t === n ? o : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (l = t.callbackNode),
      o === 0 ||
        (t === n && ($e === 2 || $e === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && xt(l),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((o & 3) === 0 || ta(t, o)) {
      if (((n = o & -o), n === t.callbackPriority)) return n;
      switch ((l !== null && xt(l), Ko(o))) {
        case 2:
        case 8:
          o = Yn;
          break;
        case 32:
          o = lt;
          break;
        case 268435456:
          o = ja;
          break;
        default:
          o = lt;
      }
      return (
        (l = sy.bind(null, t)),
        (o = qe(o, l)),
        (t.callbackPriority = n),
        (t.callbackNode = o),
        n
      );
    }
    return (
      l !== null && l !== null && xt(l),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function sy(t, n) {
    if (_t !== 0 && _t !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var o = t.callbackNode;
    if (Cs() && t.callbackNode !== o) return null;
    var l = Oe;
    return (
      (l = ka(
        t,
        t === Pe ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (qg(t, l, n),
          ly(t, ft()),
          t.callbackNode != null && t.callbackNode === o
            ? sy.bind(null, t)
            : null)
    );
  }
  function uy(t, n) {
    if (Cs()) return null;
    qg(t, n, !0);
  }
  function bx() {
    zx(function () {
      (Me & 6) !== 0 ? qe(_n, vx) : iy();
    });
  }
  function Of() {
    return Sa === 0 && (Sa = Qo()), Sa;
  }
  function cy(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : kl("" + t);
  }
  function fy(t, n) {
    var o = n.ownerDocument.createElement("input");
    return (
      (o.name = n.name),
      (o.value = n.value),
      t.id && o.setAttribute("form", t.id),
      n.parentNode.insertBefore(o, n),
      (t = new FormData(t)),
      o.parentNode.removeChild(o),
      t
    );
  }
  function Sx(t, n, o, l, c) {
    if (n === "submit" && o && o.stateNode === c) {
      var d = cy((c[st] || null).action),
        b = l.submitter;
      b &&
        ((n = (n = b[st] || null)
          ? cy(n.formAction)
          : b.getAttribute("formAction")),
        n !== null && ((d = n), (b = null)));
      var C = new Bl("action", "action", null, l, c);
      t.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Sa !== 0) {
                  var z = b ? fy(c, b) : new FormData(c);
                  Xc(
                    o,
                    { pending: !0, data: z, method: c.method, action: d },
                    null,
                    z,
                  );
                }
              } else
                typeof d == "function" &&
                  (C.preventDefault(),
                  (z = b ? fy(c, b) : new FormData(c)),
                  Xc(
                    o,
                    { pending: !0, data: z, method: c.method, action: d },
                    d,
                    z,
                  ));
            },
            currentTarget: c,
          },
        ],
      });
    }
  }
  for (var jf = 0; jf < pc.length; jf++) {
    var Df = pc[jf],
      xx = Df.toLowerCase(),
      wx = Df[0].toUpperCase() + Df.slice(1);
    An(xx, "on" + wx);
  }
  An(qp, "onAnimationEnd"),
    An(Yp, "onAnimationIteration"),
    An(Gp, "onAnimationStart"),
    An("dblclick", "onDoubleClick"),
    An("focusin", "onFocus"),
    An("focusout", "onBlur"),
    An(HS, "onTransitionRun"),
    An(BS, "onTransitionStart"),
    An(PS, "onTransitionCancel"),
    An(Fp, "onTransitionEnd"),
    Ha("onMouseEnter", ["mouseout", "mouseover"]),
    Ha("onMouseLeave", ["mouseout", "mouseover"]),
    Ha("onPointerEnter", ["pointerout", "pointerover"]),
    Ha("onPointerLeave", ["pointerout", "pointerover"]),
    aa(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    aa(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    aa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    aa(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    aa(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    aa(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var Ni =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Cx = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ni),
    );
  function dy(t, n) {
    n = (n & 4) !== 0;
    for (var o = 0; o < t.length; o++) {
      var l = t[o],
        c = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var b = l.length - 1; 0 <= b; b--) {
            var C = l[b],
              z = C.instance,
              H = C.currentTarget;
            if (((C = C.listener), z !== d && c.isPropagationStopped()))
              break e;
            (d = C), (c.currentTarget = H);
            try {
              d(c);
            } catch (q) {
              ds(q);
            }
            (c.currentTarget = null), (d = z);
          }
        else
          for (b = 0; b < l.length; b++) {
            if (
              ((C = l[b]),
              (z = C.instance),
              (H = C.currentTarget),
              (C = C.listener),
              z !== d && c.isPropagationStopped())
            )
              break e;
            (d = C), (c.currentTarget = H);
            try {
              d(c);
            } catch (q) {
              ds(q);
            }
            (c.currentTarget = null), (d = z);
          }
      }
    }
  }
  function Te(t, n) {
    var o = n[Ua];
    o === void 0 && (o = n[Ua] = new Set());
    var l = t + "__bubble";
    o.has(l) || (hy(n, t, 2, !1), o.add(l));
  }
  function Nf(t, n, o) {
    var l = 0;
    n && (l |= 4), hy(o, t, l, n);
  }
  var Rs = "_reactListening" + Math.random().toString(36).slice(2);
  function Mf(t) {
    if (!t[Rs]) {
      (t[Rs] = !0),
        ip.forEach(function (o) {
          o !== "selectionchange" && (Cx.has(o) || Nf(o, !1, t), Nf(o, !0, t));
        });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Rs] || ((n[Rs] = !0), Nf("selectionchange", !1, n));
    }
  }
  function hy(t, n, o, l) {
    switch (Ly(n)) {
      case 2:
        var c = Kx;
        break;
      case 8:
        c = Ix;
        break;
      default:
        c = Qf;
    }
    (o = c.bind(null, n, o, t)),
      (c = void 0),
      !tc ||
        (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
        (c = !0),
      l
        ? c !== void 0
          ? t.addEventListener(n, o, { capture: !0, passive: c })
          : t.addEventListener(n, o, !0)
        : c !== void 0
          ? t.addEventListener(n, o, { passive: c })
          : t.addEventListener(n, o, !1);
  }
  function $f(t, n, o, l, c) {
    var d = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var b = l.tag;
        if (b === 3 || b === 4) {
          var C = l.stateNode.containerInfo;
          if (C === c) break;
          if (b === 4)
            for (b = l.return; b !== null; ) {
              var z = b.tag;
              if ((z === 3 || z === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; C !== null; ) {
            if (((b = ir(C)), b === null)) return;
            if (((z = b.tag), z === 5 || z === 6 || z === 26 || z === 27)) {
              l = d = b;
              continue e;
            }
            C = C.parentNode;
          }
        }
        l = l.return;
      }
    Sp(function () {
      var H = d,
        q = Ju(o),
        X = [];
      e: {
        var B = Qp.get(t);
        if (B !== void 0) {
          var P = Bl,
            be = t;
          switch (t) {
            case "keypress":
              if (Ul(o) === 0) break e;
            case "keydown":
            case "keyup":
              P = yS;
              break;
            case "focusin":
              (be = "focus"), (P = oc);
              break;
            case "focusout":
              (be = "blur"), (P = oc);
              break;
            case "beforeblur":
            case "afterblur":
              P = oc;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              P = Cp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = oS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = SS;
              break;
            case qp:
            case Yp:
            case Gp:
              P = sS;
              break;
            case Fp:
              P = wS;
              break;
            case "scroll":
            case "scrollend":
              P = rS;
              break;
            case "wheel":
              P = ES;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = cS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = _p;
              break;
            case "toggle":
            case "beforetoggle":
              P = RS;
          }
          var ye = (n & 4) !== 0,
            Ue = !ye && (t === "scroll" || t === "scrollend"),
            $ = ye ? (B !== null ? B + "Capture" : null) : B;
          ye = [];
          for (var N = H, L; N !== null; ) {
            var F = N;
            if (
              ((L = F.stateNode),
              (F = F.tag),
              (F !== 5 && F !== 26 && F !== 27) ||
                L === null ||
                $ === null ||
                ((F = Wo(N, $)), F != null && ye.push(Mi(N, F, L))),
              Ue)
            )
              break;
            N = N.return;
          }
          0 < ye.length &&
            ((B = new P(B, be, null, o, q)),
            X.push({ event: B, listeners: ye }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((B = t === "mouseover" || t === "pointerover"),
            (P = t === "mouseout" || t === "pointerout"),
            B &&
              o !== Wu &&
              (be = o.relatedTarget || o.fromElement) &&
              (ir(be) || be[Gn]))
          )
            break e;
          if (
            (P || B) &&
            ((B =
              q.window === q
                ? q
                : (B = q.ownerDocument)
                  ? B.defaultView || B.parentWindow
                  : window),
            P
              ? ((be = o.relatedTarget || o.toElement),
                (P = H),
                (be = be ? ir(be) : null),
                be !== null &&
                  ((Ue = u(be)),
                  (ye = be.tag),
                  be !== Ue || (ye !== 5 && ye !== 27 && ye !== 6)) &&
                  (be = null))
              : ((P = null), (be = H)),
            P !== be)
          ) {
            if (
              ((ye = Cp),
              (F = "onMouseLeave"),
              ($ = "onMouseEnter"),
              (N = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ye = _p),
                (F = "onPointerLeave"),
                ($ = "onPointerEnter"),
                (N = "pointer")),
              (Ue = P == null ? B : lr(P)),
              (L = be == null ? B : lr(be)),
              (B = new ye(F, N + "leave", P, o, q)),
              (B.target = Ue),
              (B.relatedTarget = L),
              (F = null),
              ir(q) === H &&
                ((ye = new ye($, N + "enter", be, o, q)),
                (ye.target = L),
                (ye.relatedTarget = Ue),
                (F = ye)),
              (Ue = F),
              P && be)
            )
              t: {
                for (ye = P, $ = be, N = 0, L = ye; L; L = yo(L)) N++;
                for (L = 0, F = $; F; F = yo(F)) L++;
                for (; 0 < N - L; ) (ye = yo(ye)), N--;
                for (; 0 < L - N; ) ($ = yo($)), L--;
                for (; N--; ) {
                  if (ye === $ || ($ !== null && ye === $.alternate)) break t;
                  (ye = yo(ye)), ($ = yo($));
                }
                ye = null;
              }
            else ye = null;
            P !== null && py(X, B, P, ye, !1),
              be !== null && Ue !== null && py(X, Ue, be, ye, !0);
          }
        }
        e: {
          if (
            ((B = H ? lr(H) : window),
            (P = B.nodeName && B.nodeName.toLowerCase()),
            P === "select" || (P === "input" && B.type === "file"))
          )
            var se = Np;
          else if (jp(B))
            if (Mp) se = kS;
            else {
              se = MS;
              var _e = NS;
            }
          else
            (P = B.nodeName),
              !P ||
              P.toLowerCase() !== "input" ||
              (B.type !== "checkbox" && B.type !== "radio")
                ? H && Iu(H.elementType) && (se = Np)
                : (se = $S);
          if (se && (se = se(t, H))) {
            Dp(X, se, o, q);
            break e;
          }
          _e && _e(t, B, H),
            t === "focusout" &&
              H &&
              B.type === "number" &&
              H.memoizedProps.value != null &&
              Ku(B, "number", B.value);
        }
        switch (((_e = H ? lr(H) : window), t)) {
          case "focusin":
            (jp(_e) || _e.contentEditable === "true") &&
              ((Ga = _e), (fc = H), (ii = null));
            break;
          case "focusout":
            ii = fc = Ga = null;
            break;
          case "mousedown":
            dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (dc = !1), Zp(X, o, q);
            break;
          case "selectionchange":
            if (US) break;
          case "keydown":
          case "keyup":
            Zp(X, o, q);
        }
        var he;
        if (lc)
          e: {
            switch (t) {
              case "compositionstart":
                var ve = "onCompositionStart";
                break e;
              case "compositionend":
                ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ve = "onCompositionUpdate";
                break e;
            }
            ve = void 0;
          }
        else
          Ya
            ? zp(t, o) && (ve = "onCompositionEnd")
            : t === "keydown" &&
              o.keyCode === 229 &&
              (ve = "onCompositionStart");
        ve &&
          (Rp &&
            o.locale !== "ko" &&
            (Ya || ve !== "onCompositionStart"
              ? ve === "onCompositionEnd" && Ya && (he = xp())
              : ((Ar = q),
                (nc = "value" in Ar ? Ar.value : Ar.textContent),
                (Ya = !0))),
          (_e = Ts(H, ve)),
          0 < _e.length &&
            ((ve = new Ep(ve, t, null, o, q)),
            X.push({ event: ve, listeners: _e }),
            he
              ? (ve.data = he)
              : ((he = Op(o)), he !== null && (ve.data = he)))),
          (he = AS ? zS(t, o) : OS(t, o)) &&
            ((ve = Ts(H, "onBeforeInput")),
            0 < ve.length &&
              ((_e = new Ep("onBeforeInput", "beforeinput", null, o, q)),
              X.push({ event: _e, listeners: ve }),
              (_e.data = he))),
          Sx(X, t, H, o, q);
      }
      dy(X, n);
    });
  }
  function Mi(t, n, o) {
    return { instance: t, listener: n, currentTarget: o };
  }
  function Ts(t, n) {
    for (var o = n + "Capture", l = []; t !== null; ) {
      var c = t,
        d = c.stateNode;
      if (
        ((c = c.tag),
        (c !== 5 && c !== 26 && c !== 27) ||
          d === null ||
          ((c = Wo(t, o)),
          c != null && l.unshift(Mi(t, c, d)),
          (c = Wo(t, n)),
          c != null && l.push(Mi(t, c, d))),
        t.tag === 3)
      )
        return l;
      t = t.return;
    }
    return [];
  }
  function yo(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function py(t, n, o, l, c) {
    for (var d = n._reactName, b = []; o !== null && o !== l; ) {
      var C = o,
        z = C.alternate,
        H = C.stateNode;
      if (((C = C.tag), z !== null && z === l)) break;
      (C !== 5 && C !== 26 && C !== 27) ||
        H === null ||
        ((z = H),
        c
          ? ((H = Wo(o, d)), H != null && b.unshift(Mi(o, H, z)))
          : c || ((H = Wo(o, d)), H != null && b.push(Mi(o, H, z)))),
        (o = o.return);
    }
    b.length !== 0 && t.push({ event: n, listeners: b });
  }
  var Ex = /\r\n?/g,
    _x = /\u0000|\uFFFD/g;
  function my(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        Ex,
        `
`,
      )
      .replace(_x, "");
  }
  function gy(t, n) {
    return (n = my(n)), my(t) === n;
  }
  function As() {}
  function Le(t, n, o, l, c, d) {
    switch (o) {
      case "children":
        typeof l == "string"
          ? n === "body" || (n === "textarea" && l === "") || Za(t, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            n !== "body" &&
            Za(t, "" + l);
        break;
      case "className":
        Nl(t, "class", l);
        break;
      case "tabIndex":
        Nl(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Nl(t, o, l);
        break;
      case "style":
        vp(t, l, d);
        break;
      case "data":
        if (n !== "object") {
          Nl(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || o !== "href")) {
          t.removeAttribute(o);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          t.removeAttribute(o);
          break;
        }
        (l = kl("" + l)), t.setAttribute(o, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            o,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == "function" &&
            (o === "formAction"
              ? (n !== "input" && Le(t, n, "name", c.name, c, null),
                Le(t, n, "formEncType", c.formEncType, c, null),
                Le(t, n, "formMethod", c.formMethod, c, null),
                Le(t, n, "formTarget", c.formTarget, c, null))
              : (Le(t, n, "encType", c.encType, c, null),
                Le(t, n, "method", c.method, c, null),
                Le(t, n, "target", c.target, c, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(o);
          break;
        }
        (l = kl("" + l)), t.setAttribute(o, l);
        break;
      case "onClick":
        l != null && (t.onclick = As);
        break;
      case "onScroll":
        l != null && Te("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Te("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(i(61));
          if (((o = l.__html), o != null)) {
            if (c.children != null) throw Error(i(60));
            t.innerHTML = o;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (o = kl("" + l)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? t.setAttribute(o, "" + l)
          : t.removeAttribute(o);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? t.setAttribute(o, "")
          : t.removeAttribute(o);
        break;
      case "capture":
      case "download":
        l === !0
          ? t.setAttribute(o, "")
          : l !== !1 &&
              l != null &&
              typeof l != "function" &&
              typeof l != "symbol"
            ? t.setAttribute(o, l)
            : t.removeAttribute(o);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? t.setAttribute(o, l)
          : t.removeAttribute(o);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? t.removeAttribute(o)
          : t.setAttribute(o, l);
        break;
      case "popover":
        Te("beforetoggle", t), Te("toggle", t), Dl(t, "popover", l);
        break;
      case "xlinkActuate":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        sr(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        sr(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        sr(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        sr(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        Dl(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < o.length) ||
          (o[0] !== "o" && o[0] !== "O") ||
          (o[1] !== "n" && o[1] !== "N")) &&
          ((o = tS.get(o) || o), Dl(t, o, l));
    }
  }
  function kf(t, n, o, l, c, d) {
    switch (o) {
      case "style":
        vp(t, l, d);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(i(61));
          if (((o = l.__html), o != null)) {
            if (c.children != null) throw Error(i(60));
            t.innerHTML = o;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? Za(t, l)
          : (typeof l == "number" || typeof l == "bigint") && Za(t, "" + l);
        break;
      case "onScroll":
        l != null && Te("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Te("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = As);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!lp.hasOwnProperty(o))
          e: {
            if (
              o[0] === "o" &&
              o[1] === "n" &&
              ((c = o.endsWith("Capture")),
              (n = o.slice(2, c ? o.length - 7 : void 0)),
              (d = t[st] || null),
              (d = d != null ? d[o] : null),
              typeof d == "function" && t.removeEventListener(n, d, c),
              typeof l == "function")
            ) {
              typeof d != "function" &&
                d !== null &&
                (o in t
                  ? (t[o] = null)
                  : t.hasAttribute(o) && t.removeAttribute(o)),
                t.addEventListener(n, l, c);
              break e;
            }
            o in t
              ? (t[o] = l)
              : l === !0
                ? t.setAttribute(o, "")
                : Dl(t, o, l);
          }
    }
  }
  function Rt(t, n, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Te("error", t), Te("load", t);
        var l = !1,
          c = !1,
          d;
        for (d in o)
          if (o.hasOwnProperty(d)) {
            var b = o[d];
            if (b != null)
              switch (d) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, n));
                default:
                  Le(t, n, d, b, o, null);
              }
          }
        c && Le(t, n, "srcSet", o.srcSet, o, null),
          l && Le(t, n, "src", o.src, o, null);
        return;
      case "input":
        Te("invalid", t);
        var C = (d = b = c = null),
          z = null,
          H = null;
        for (l in o)
          if (o.hasOwnProperty(l)) {
            var q = o[l];
            if (q != null)
              switch (l) {
                case "name":
                  c = q;
                  break;
                case "type":
                  b = q;
                  break;
                case "checked":
                  z = q;
                  break;
                case "defaultChecked":
                  H = q;
                  break;
                case "value":
                  d = q;
                  break;
                case "defaultValue":
                  C = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null) throw Error(i(137, n));
                  break;
                default:
                  Le(t, n, l, q, o, null);
              }
          }
        pp(t, d, C, z, H, b, c, !1), Ml(t);
        return;
      case "select":
        Te("invalid", t), (l = b = d = null);
        for (c in o)
          if (o.hasOwnProperty(c) && ((C = o[c]), C != null))
            switch (c) {
              case "value":
                d = C;
                break;
              case "defaultValue":
                b = C;
                break;
              case "multiple":
                l = C;
              default:
                Le(t, n, c, C, o, null);
            }
        (n = d),
          (o = b),
          (t.multiple = !!l),
          n != null ? Pa(t, !!l, n, !1) : o != null && Pa(t, !!l, o, !0);
        return;
      case "textarea":
        Te("invalid", t), (d = c = l = null);
        for (b in o)
          if (o.hasOwnProperty(b) && ((C = o[b]), C != null))
            switch (b) {
              case "value":
                l = C;
                break;
              case "defaultValue":
                c = C;
                break;
              case "children":
                d = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(i(91));
                break;
              default:
                Le(t, n, b, C, o, null);
            }
        gp(t, l, c, d), Ml(t);
        return;
      case "option":
        for (z in o)
          if (o.hasOwnProperty(z) && ((l = o[z]), l != null))
            switch (z) {
              case "selected":
                t.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Le(t, n, z, l, o, null);
            }
        return;
      case "dialog":
        Te("beforetoggle", t), Te("toggle", t), Te("cancel", t), Te("close", t);
        break;
      case "iframe":
      case "object":
        Te("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ni.length; l++) Te(Ni[l], t);
        break;
      case "image":
        Te("error", t), Te("load", t);
        break;
      case "details":
        Te("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Te("error", t), Te("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in o)
          if (o.hasOwnProperty(H) && ((l = o[H]), l != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                Le(t, n, H, l, o, null);
            }
        return;
      default:
        if (Iu(n)) {
          for (q in o)
            o.hasOwnProperty(q) &&
              ((l = o[q]), l !== void 0 && kf(t, n, q, l, o, void 0));
          return;
        }
    }
    for (C in o)
      o.hasOwnProperty(C) && ((l = o[C]), l != null && Le(t, n, C, l, o, null));
  }
  function Rx(t, n, o, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var c = null,
          d = null,
          b = null,
          C = null,
          z = null,
          H = null,
          q = null;
        for (P in o) {
          var X = o[P];
          if (o.hasOwnProperty(P) && X != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                z = X;
              default:
                l.hasOwnProperty(P) || Le(t, n, P, null, l, X);
            }
        }
        for (var B in l) {
          var P = l[B];
          if (((X = o[B]), l.hasOwnProperty(B) && (P != null || X != null)))
            switch (B) {
              case "type":
                d = P;
                break;
              case "name":
                c = P;
                break;
              case "checked":
                H = P;
                break;
              case "defaultChecked":
                q = P;
                break;
              case "value":
                b = P;
                break;
              case "defaultValue":
                C = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null) throw Error(i(137, n));
                break;
              default:
                P !== X && Le(t, n, B, P, l, X);
            }
        }
        Xu(t, b, C, z, H, q, d, c);
        return;
      case "select":
        P = b = C = B = null;
        for (d in o)
          if (((z = o[d]), o.hasOwnProperty(d) && z != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = z;
              default:
                l.hasOwnProperty(d) || Le(t, n, d, null, l, z);
            }
        for (c in l)
          if (
            ((d = l[c]),
            (z = o[c]),
            l.hasOwnProperty(c) && (d != null || z != null))
          )
            switch (c) {
              case "value":
                B = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                b = d;
              default:
                d !== z && Le(t, n, c, d, l, z);
            }
        (n = C),
          (o = b),
          (l = P),
          B != null
            ? Pa(t, !!o, B, !1)
            : !!l != !!o &&
              (n != null ? Pa(t, !!o, n, !0) : Pa(t, !!o, o ? [] : "", !1));
        return;
      case "textarea":
        P = B = null;
        for (C in o)
          if (
            ((c = o[C]),
            o.hasOwnProperty(C) && c != null && !l.hasOwnProperty(C))
          )
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Le(t, n, C, null, l, c);
            }
        for (b in l)
          if (
            ((c = l[b]),
            (d = o[b]),
            l.hasOwnProperty(b) && (c != null || d != null))
          )
            switch (b) {
              case "value":
                B = c;
                break;
              case "defaultValue":
                P = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(i(91));
                break;
              default:
                c !== d && Le(t, n, b, c, l, d);
            }
        mp(t, B, P);
        return;
      case "option":
        for (var be in o)
          if (
            ((B = o[be]),
            o.hasOwnProperty(be) && B != null && !l.hasOwnProperty(be))
          )
            switch (be) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Le(t, n, be, null, l, B);
            }
        for (z in l)
          if (
            ((B = l[z]),
            (P = o[z]),
            l.hasOwnProperty(z) && B !== P && (B != null || P != null))
          )
            switch (z) {
              case "selected":
                t.selected =
                  B && typeof B != "function" && typeof B != "symbol";
                break;
              default:
                Le(t, n, z, B, l, P);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ye in o)
          (B = o[ye]),
            o.hasOwnProperty(ye) &&
              B != null &&
              !l.hasOwnProperty(ye) &&
              Le(t, n, ye, null, l, B);
        for (H in l)
          if (
            ((B = l[H]),
            (P = o[H]),
            l.hasOwnProperty(H) && B !== P && (B != null || P != null))
          )
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null) throw Error(i(137, n));
                break;
              default:
                Le(t, n, H, B, l, P);
            }
        return;
      default:
        if (Iu(n)) {
          for (var Ue in o)
            (B = o[Ue]),
              o.hasOwnProperty(Ue) &&
                B !== void 0 &&
                !l.hasOwnProperty(Ue) &&
                kf(t, n, Ue, void 0, l, B);
          for (q in l)
            (B = l[q]),
              (P = o[q]),
              !l.hasOwnProperty(q) ||
                B === P ||
                (B === void 0 && P === void 0) ||
                kf(t, n, q, B, l, P);
          return;
        }
    }
    for (var $ in o)
      (B = o[$]),
        o.hasOwnProperty($) &&
          B != null &&
          !l.hasOwnProperty($) &&
          Le(t, n, $, null, l, B);
    for (X in l)
      (B = l[X]),
        (P = o[X]),
        !l.hasOwnProperty(X) ||
          B === P ||
          (B == null && P == null) ||
          Le(t, n, X, B, l, P);
  }
  var Lf = null,
    Uf = null;
  function zs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function yy(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function vy(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function Hf(t, n) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Bf = null;
  function Tx() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Bf
        ? !1
        : ((Bf = t), !0)
      : ((Bf = null), !1);
  }
  var by = typeof setTimeout == "function" ? setTimeout : void 0,
    Ax = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Sy = typeof Promise == "function" ? Promise : void 0,
    zx =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Sy < "u"
          ? function (t) {
              return Sy.resolve(null).then(t).catch(Ox);
            }
          : by;
  function Ox(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function qr(t) {
    return t === "head";
  }
  function xy(t, n) {
    var o = n,
      l = 0,
      c = 0;
    do {
      var d = o.nextSibling;
      if ((t.removeChild(o), d && d.nodeType === 8))
        if (((o = d.data), o === "/$")) {
          if (0 < l && 8 > l) {
            o = l;
            var b = t.ownerDocument;
            if ((o & 1 && $i(b.documentElement), o & 2 && $i(b.body), o & 4))
              for (o = b.head, $i(o), b = o.firstChild; b; ) {
                var C = b.nextSibling,
                  z = b.nodeName;
                b[Rr] ||
                  z === "SCRIPT" ||
                  z === "STYLE" ||
                  (z === "LINK" && b.rel.toLowerCase() === "stylesheet") ||
                  o.removeChild(b),
                  (b = C);
              }
          }
          if (c === 0) {
            t.removeChild(d), Vi(n);
            return;
          }
          c--;
        } else
          o === "$" || o === "$?" || o === "$!"
            ? c++
            : (l = o.charCodeAt(0) - 48);
      else l = 0;
      o = d;
    } while (o);
    Vi(n);
  }
  function Pf(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var o = n;
      switch (((n = n.nextSibling), o.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Pf(o), Io(o);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (o.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(o);
    }
  }
  function jx(t, n, o, l) {
    for (; t.nodeType === 1; ) {
      var c = o;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (l) {
        if (!t[Rr])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((d = t.getAttribute("rel")),
                d === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== c.rel ||
                t.getAttribute("href") !==
                  (c.href == null || c.href === "" ? null : c.href) ||
                t.getAttribute("crossorigin") !==
                  (c.crossOrigin == null ? null : c.crossOrigin) ||
                t.getAttribute("title") !== (c.title == null ? null : c.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((d = t.getAttribute("src")),
                (d !== (c.src == null ? null : c.src) ||
                  t.getAttribute("type") !== (c.type == null ? null : c.type) ||
                  t.getAttribute("crossorigin") !==
                    (c.crossOrigin == null ? null : c.crossOrigin)) &&
                  d &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var d = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && t.getAttribute("name") === d) return t;
      } else return t;
      if (((t = On(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Dx(t, n, o) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !o) ||
        ((t = On(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Zf(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState === "complete")
    );
  }
  function Nx(t, n) {
    var o = t.ownerDocument;
    if (t.data !== "$?" || o.readyState === "complete") n();
    else {
      var l = function () {
        n(), o.removeEventListener("DOMContentLoaded", l);
      };
      o.addEventListener("DOMContentLoaded", l), (t._reactRetry = l);
    }
  }
  function On(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = t.data),
          n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
        )
          break;
        if (n === "/$") return null;
      }
    }
    return t;
  }
  var Vf = null;
  function wy(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var o = t.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (n === 0) return t;
          n--;
        } else o === "/$" && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Cy(t, n, o) {
    switch (((n = zs(o)), t)) {
      case "html":
        if (((t = n.documentElement), !t)) throw Error(i(452));
        return t;
      case "head":
        if (((t = n.head), !t)) throw Error(i(453));
        return t;
      case "body":
        if (((t = n.body), !t)) throw Error(i(454));
        return t;
      default:
        throw Error(i(451));
    }
  }
  function $i(t) {
    for (var n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
    Io(t);
  }
  var Sn = new Map(),
    Ey = new Set();
  function Os(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var wr = Q.d;
  Q.d = { f: Mx, r: $x, D: kx, C: Lx, L: Ux, m: Hx, X: Px, S: Bx, M: Zx };
  function Mx() {
    var t = wr.f(),
      n = xs();
    return t || n;
  }
  function $x(t) {
    var n = je(t);
    n !== null && n.tag === 5 && n.type === "form" ? qm(n) : wr.r(t);
  }
  var vo = typeof document > "u" ? null : document;
  function _y(t, n, o) {
    var l = vo;
    if (l && typeof n == "string" && n) {
      var c = hn(n);
      (c = 'link[rel="' + t + '"][href="' + c + '"]'),
        typeof o == "string" && (c += '[crossorigin="' + o + '"]'),
        Ey.has(c) ||
          (Ey.add(c),
          (t = { rel: t, crossOrigin: o, href: n }),
          l.querySelector(c) === null &&
            ((n = l.createElement("link")),
            Rt(n, "link", t),
            pt(n),
            l.head.appendChild(n)));
    }
  }
  function kx(t) {
    wr.D(t), _y("dns-prefetch", t, null);
  }
  function Lx(t, n) {
    wr.C(t, n), _y("preconnect", t, n);
  }
  function Ux(t, n, o) {
    wr.L(t, n, o);
    var l = vo;
    if (l && t && n) {
      var c = 'link[rel="preload"][as="' + hn(n) + '"]';
      n === "image" && o && o.imageSrcSet
        ? ((c += '[imagesrcset="' + hn(o.imageSrcSet) + '"]'),
          typeof o.imageSizes == "string" &&
            (c += '[imagesizes="' + hn(o.imageSizes) + '"]'))
        : (c += '[href="' + hn(t) + '"]');
      var d = c;
      switch (n) {
        case "style":
          d = bo(t);
          break;
        case "script":
          d = So(t);
      }
      Sn.has(d) ||
        ((t = g(
          {
            rel: "preload",
            href: n === "image" && o && o.imageSrcSet ? void 0 : t,
            as: n,
          },
          o,
        )),
        Sn.set(d, t),
        l.querySelector(c) !== null ||
          (n === "style" && l.querySelector(ki(d))) ||
          (n === "script" && l.querySelector(Li(d))) ||
          ((n = l.createElement("link")),
          Rt(n, "link", t),
          pt(n),
          l.head.appendChild(n)));
    }
  }
  function Hx(t, n) {
    wr.m(t, n);
    var o = vo;
    if (o && t) {
      var l = n && typeof n.as == "string" ? n.as : "script",
        c =
          'link[rel="modulepreload"][as="' + hn(l) + '"][href="' + hn(t) + '"]',
        d = c;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = So(t);
      }
      if (
        !Sn.has(d) &&
        ((t = g({ rel: "modulepreload", href: t }, n)),
        Sn.set(d, t),
        o.querySelector(c) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (o.querySelector(Li(d))) return;
        }
        (l = o.createElement("link")),
          Rt(l, "link", t),
          pt(l),
          o.head.appendChild(l);
      }
    }
  }
  function Bx(t, n, o) {
    wr.S(t, n, o);
    var l = vo;
    if (l && t) {
      var c = Tr(l).hoistableStyles,
        d = bo(t);
      n = n || "default";
      var b = c.get(d);
      if (!b) {
        var C = { loading: 0, preload: null };
        if ((b = l.querySelector(ki(d)))) C.loading = 5;
        else {
          (t = g({ rel: "stylesheet", href: t, "data-precedence": n }, o)),
            (o = Sn.get(d)) && qf(t, o);
          var z = (b = l.createElement("link"));
          pt(z),
            Rt(z, "link", t),
            (z._p = new Promise(function (H, q) {
              (z.onload = H), (z.onerror = q);
            })),
            z.addEventListener("load", function () {
              C.loading |= 1;
            }),
            z.addEventListener("error", function () {
              C.loading |= 2;
            }),
            (C.loading |= 4),
            js(b, n, l);
        }
        (b = { type: "stylesheet", instance: b, count: 1, state: C }),
          c.set(d, b);
      }
    }
  }
  function Px(t, n) {
    wr.X(t, n);
    var o = vo;
    if (o && t) {
      var l = Tr(o).hoistableScripts,
        c = So(t),
        d = l.get(c);
      d ||
        ((d = o.querySelector(Li(c))),
        d ||
          ((t = g({ src: t, async: !0 }, n)),
          (n = Sn.get(c)) && Yf(t, n),
          (d = o.createElement("script")),
          pt(d),
          Rt(d, "link", t),
          o.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        l.set(c, d));
    }
  }
  function Zx(t, n) {
    wr.M(t, n);
    var o = vo;
    if (o && t) {
      var l = Tr(o).hoistableScripts,
        c = So(t),
        d = l.get(c);
      d ||
        ((d = o.querySelector(Li(c))),
        d ||
          ((t = g({ src: t, async: !0, type: "module" }, n)),
          (n = Sn.get(c)) && Yf(t, n),
          (d = o.createElement("script")),
          pt(d),
          Rt(d, "link", t),
          o.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        l.set(c, d));
    }
  }
  function Ry(t, n, o, l) {
    var c = (c = de.current) ? Os(c) : null;
    if (!c) throw Error(i(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof o.precedence == "string" && typeof o.href == "string"
          ? ((n = bo(o.href)),
            (o = Tr(c).hoistableStyles),
            (l = o.get(n)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              o.set(n, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          o.rel === "stylesheet" &&
          typeof o.href == "string" &&
          typeof o.precedence == "string"
        ) {
          t = bo(o.href);
          var d = Tr(c).hoistableStyles,
            b = d.get(t);
          if (
            (b ||
              ((c = c.ownerDocument || c),
              (b = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(t, b),
              (d = c.querySelector(ki(t))) &&
                !d._p &&
                ((b.instance = d), (b.state.loading = 5)),
              Sn.has(t) ||
                ((o = {
                  rel: "preload",
                  as: "style",
                  href: o.href,
                  crossOrigin: o.crossOrigin,
                  integrity: o.integrity,
                  media: o.media,
                  hrefLang: o.hrefLang,
                  referrerPolicy: o.referrerPolicy,
                }),
                Sn.set(t, o),
                d || Vx(c, t, o, b.state))),
            n && l === null)
          )
            throw Error(i(528, ""));
          return b;
        }
        if (n && l !== null) throw Error(i(529, ""));
        return null;
      case "script":
        return (
          (n = o.async),
          (o = o.src),
          typeof o == "string" &&
          n &&
          typeof n != "function" &&
          typeof n != "symbol"
            ? ((n = So(o)),
              (o = Tr(c).hoistableScripts),
              (l = o.get(n)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                o.set(n, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(i(444, t));
    }
  }
  function bo(t) {
    return 'href="' + hn(t) + '"';
  }
  function ki(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ty(t) {
    return g({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function Vx(t, n, o, l) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (l.loading = 1)
      : ((n = t.createElement("link")),
        (l.preload = n),
        n.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Rt(n, "link", o),
        pt(n),
        t.head.appendChild(n));
  }
  function So(t) {
    return '[src="' + hn(t) + '"]';
  }
  function Li(t) {
    return "script[async]" + t;
  }
  function Ay(t, n, o) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var l = t.querySelector('style[data-href~="' + hn(o.href) + '"]');
          if (l) return (n.instance = l), pt(l), l;
          var c = g({}, o, {
            "data-href": o.href,
            "data-precedence": o.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (t.ownerDocument || t).createElement("style")),
            pt(l),
            Rt(l, "style", c),
            js(l, o.precedence, t),
            (n.instance = l)
          );
        case "stylesheet":
          c = bo(o.href);
          var d = t.querySelector(ki(c));
          if (d) return (n.state.loading |= 4), (n.instance = d), pt(d), d;
          (l = Ty(o)),
            (c = Sn.get(c)) && qf(l, c),
            (d = (t.ownerDocument || t).createElement("link")),
            pt(d);
          var b = d;
          return (
            (b._p = new Promise(function (C, z) {
              (b.onload = C), (b.onerror = z);
            })),
            Rt(d, "link", l),
            (n.state.loading |= 4),
            js(d, o.precedence, t),
            (n.instance = d)
          );
        case "script":
          return (
            (d = So(o.src)),
            (c = t.querySelector(Li(d)))
              ? ((n.instance = c), pt(c), c)
              : ((l = o),
                (c = Sn.get(d)) && ((l = g({}, o)), Yf(l, c)),
                (t = t.ownerDocument || t),
                (c = t.createElement("script")),
                pt(c),
                Rt(c, "link", l),
                t.head.appendChild(c),
                (n.instance = c))
          );
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((l = n.instance), (n.state.loading |= 4), js(l, o.precedence, t));
    return n.instance;
  }
  function js(t, n, o) {
    for (
      var l = o.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        c = l.length ? l[l.length - 1] : null,
        d = c,
        b = 0;
      b < l.length;
      b++
    ) {
      var C = l[b];
      if (C.dataset.precedence === n) d = C;
      else if (d !== c) break;
    }
    d
      ? d.parentNode.insertBefore(t, d.nextSibling)
      : ((n = o.nodeType === 9 ? o.head : o), n.insertBefore(t, n.firstChild));
  }
  function qf(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.title == null && (t.title = n.title);
  }
  function Yf(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.integrity == null && (t.integrity = n.integrity);
  }
  var Ds = null;
  function zy(t, n, o) {
    if (Ds === null) {
      var l = new Map(),
        c = (Ds = new Map());
      c.set(o, l);
    } else (c = Ds), (l = c.get(o)), l || ((l = new Map()), c.set(o, l));
    if (l.has(t)) return l;
    for (
      l.set(t, null), o = o.getElementsByTagName(t), c = 0;
      c < o.length;
      c++
    ) {
      var d = o[c];
      if (
        !(
          d[Rr] ||
          d[ht] ||
          (t === "link" && d.getAttribute("rel") === "stylesheet")
        ) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var b = d.getAttribute(n) || "";
        b = t + b;
        var C = l.get(b);
        C ? C.push(d) : l.set(b, [d]);
      }
    }
    return l;
  }
  function Oy(t, n, o) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        o,
        n === "title" ? t.querySelector("head > title") : null,
      );
  }
  function qx(t, n, o) {
    if (o === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof n.precedence != "string" ||
          typeof n.href != "string" ||
          n.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        switch (n.rel) {
          case "stylesheet":
            return (
              (t = n.disabled), typeof n.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function jy(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var Ui = null;
  function Yx() {}
  function Gx(t, n, o) {
    if (Ui === null) throw Error(i(475));
    var l = Ui;
    if (
      n.type === "stylesheet" &&
      (typeof o.media != "string" || matchMedia(o.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var c = bo(o.href),
          d = t.querySelector(ki(c));
        if (d) {
          (t = d._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = Ns.bind(l)), t.then(l, l)),
            (n.state.loading |= 4),
            (n.instance = d),
            pt(d);
          return;
        }
        (d = t.ownerDocument || t),
          (o = Ty(o)),
          (c = Sn.get(c)) && qf(o, c),
          (d = d.createElement("link")),
          pt(d);
        var b = d;
        (b._p = new Promise(function (C, z) {
          (b.onload = C), (b.onerror = z);
        })),
          Rt(d, "link", o),
          (n.instance = d);
      }
      l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (l.count++,
          (n = Ns.bind(l)),
          t.addEventListener("load", n),
          t.addEventListener("error", n));
    }
  }
  function Fx() {
    if (Ui === null) throw Error(i(475));
    var t = Ui;
    return (
      t.stylesheets && t.count === 0 && Gf(t, t.stylesheets),
      0 < t.count
        ? function (n) {
            var o = setTimeout(function () {
              if ((t.stylesheets && Gf(t, t.stylesheets), t.unsuspend)) {
                var l = t.unsuspend;
                (t.unsuspend = null), l();
              }
            }, 6e4);
            return (
              (t.unsuspend = n),
              function () {
                (t.unsuspend = null), clearTimeout(o);
              }
            );
          }
        : null
    );
  }
  function Ns() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Gf(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var Ms = null;
  function Gf(t, n) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Ms = new Map()),
        n.forEach(Qx, t),
        (Ms = null),
        Ns.call(t));
  }
  function Qx(t, n) {
    if (!(n.state.loading & 4)) {
      var o = Ms.get(t);
      if (o) var l = o.get(null);
      else {
        (o = new Map()), Ms.set(t, o);
        for (
          var c = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            d = 0;
          d < c.length;
          d++
        ) {
          var b = c[d];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") &&
            (o.set(b.dataset.precedence, b), (l = b));
        }
        l && o.set(null, l);
      }
      (c = n.instance),
        (b = c.getAttribute("data-precedence")),
        (d = o.get(b) || l),
        d === l && o.set(null, c),
        o.set(b, c),
        this.count++,
        (l = Ns.bind(this)),
        c.addEventListener("load", l),
        c.addEventListener("error", l),
        d
          ? d.parentNode.insertBefore(c, d.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(c, t.firstChild)),
        (n.state.loading |= 4);
    }
  }
  var Hi = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0,
  };
  function Xx(t, n, o, l, c, d, b, C) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = na(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = na(0)),
      (this.hiddenUpdates = na(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = c),
      (this.onCaughtError = d),
      (this.onRecoverableError = b),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = C),
      (this.incompleteTransitions = new Map());
  }
  function Dy(t, n, o, l, c, d, b, C, z, H, q, X) {
    return (
      (t = new Xx(t, n, o, b, C, z, H, X)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = en(3, null, null, n)),
      (t.current = d),
      (d.stateNode = t),
      (n = Rc()),
      n.refCount++,
      (t.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: l, isDehydrated: o, cache: n }),
      Oc(d),
      t
    );
  }
  function Ny(t) {
    return t ? ((t = Ka), t) : Ka;
  }
  function My(t, n, o, l, c, d) {
    (c = Ny(c)),
      l.context === null ? (l.context = c) : (l.pendingContext = c),
      (l = jr(n)),
      (l.payload = { element: o }),
      (d = d === void 0 ? null : d),
      d !== null && (l.callback = d),
      (o = Dr(t, l, n)),
      o !== null && (on(o, t, n), mi(o, t, n));
  }
  function $y(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var o = t.retryLane;
      t.retryLane = o !== 0 && o < n ? o : n;
    }
  }
  function Ff(t, n) {
    $y(t, n), (t = t.alternate) && $y(t, n);
  }
  function ky(t) {
    if (t.tag === 13) {
      var n = Xa(t, 67108864);
      n !== null && on(n, t, 67108864), Ff(t, 67108864);
    }
  }
  var $s = !0;
  function Kx(t, n, o, l) {
    var c = M.T;
    M.T = null;
    var d = Q.p;
    try {
      (Q.p = 2), Qf(t, n, o, l);
    } finally {
      (Q.p = d), (M.T = c);
    }
  }
  function Ix(t, n, o, l) {
    var c = M.T;
    M.T = null;
    var d = Q.p;
    try {
      (Q.p = 8), Qf(t, n, o, l);
    } finally {
      (Q.p = d), (M.T = c);
    }
  }
  function Qf(t, n, o, l) {
    if ($s) {
      var c = Xf(l);
      if (c === null) $f(t, n, l, ks, o), Uy(t, l);
      else if (Jx(c, t, n, o, l)) l.stopPropagation();
      else if ((Uy(t, l), n & 4 && -1 < Wx.indexOf(t))) {
        for (; c !== null; ) {
          var d = je(c);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var b = Tn(d.pendingLanes);
                  if (b !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; b; ) {
                      var z = 1 << (31 - Ct(b));
                      (C.entanglements[1] |= z), (b &= ~z);
                    }
                    In(d), (Me & 6) === 0 && ((bs = ft() + 500), Di(0));
                  }
                }
                break;
              case 13:
                (C = Xa(d, 2)), C !== null && on(C, d, 2), xs(), Ff(d, 2);
            }
          if (((d = Xf(l)), d === null && $f(t, n, l, ks, o), d === c)) break;
          c = d;
        }
        c !== null && l.stopPropagation();
      } else $f(t, n, l, null, o);
    }
  }
  function Xf(t) {
    return (t = Ju(t)), Kf(t);
  }
  var ks = null;
  function Kf(t) {
    if (((ks = null), (t = ir(t)), t !== null)) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var o = n.tag;
        if (o === 13) {
          if (((t = f(n)), t !== null)) return t;
          t = null;
        } else if (o === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return (ks = t), null;
  }
  function Ly(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (it()) {
          case _n:
            return 2;
          case Yn:
            return 8;
          case lt:
          case Go:
            return 32;
          case ja:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var If = !1,
    Yr = null,
    Gr = null,
    Fr = null,
    Bi = new Map(),
    Pi = new Map(),
    Qr = [],
    Wx =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Uy(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Yr = null;
        break;
      case "dragenter":
      case "dragleave":
        Gr = null;
        break;
      case "mouseover":
      case "mouseout":
        Fr = null;
        break;
      case "pointerover":
      case "pointerout":
        Bi.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pi.delete(n.pointerId);
    }
  }
  function Zi(t, n, o, l, c, d) {
    return t === null || t.nativeEvent !== d
      ? ((t = {
          blockedOn: n,
          domEventName: o,
          eventSystemFlags: l,
          nativeEvent: d,
          targetContainers: [c],
        }),
        n !== null && ((n = je(n)), n !== null && ky(n)),
        t)
      : ((t.eventSystemFlags |= l),
        (n = t.targetContainers),
        c !== null && n.indexOf(c) === -1 && n.push(c),
        t);
  }
  function Jx(t, n, o, l, c) {
    switch (n) {
      case "focusin":
        return (Yr = Zi(Yr, t, n, o, l, c)), !0;
      case "dragenter":
        return (Gr = Zi(Gr, t, n, o, l, c)), !0;
      case "mouseover":
        return (Fr = Zi(Fr, t, n, o, l, c)), !0;
      case "pointerover":
        var d = c.pointerId;
        return Bi.set(d, Zi(Bi.get(d) || null, t, n, o, l, c)), !0;
      case "gotpointercapture":
        return (
          (d = c.pointerId), Pi.set(d, Zi(Pi.get(d) || null, t, n, o, l, c)), !0
        );
    }
    return !1;
  }
  function Hy(t) {
    var n = ir(t.target);
    if (n !== null) {
      var o = u(n);
      if (o !== null) {
        if (((n = o.tag), n === 13)) {
          if (((n = f(o)), n !== null)) {
            (t.blockedOn = n),
              ra(t.priority, function () {
                if (o.tag === 13) {
                  var l = an();
                  l = Xo(l);
                  var c = Xa(o, l);
                  c !== null && on(c, o, l), Ff(o, l);
                }
              });
            return;
          }
        } else if (n === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ls(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var o = Xf(t.nativeEvent);
      if (o === null) {
        o = t.nativeEvent;
        var l = new o.constructor(o.type, o);
        (Wu = l), o.target.dispatchEvent(l), (Wu = null);
      } else return (n = je(o)), n !== null && ky(n), (t.blockedOn = o), !1;
      n.shift();
    }
    return !0;
  }
  function By(t, n, o) {
    Ls(t) && o.delete(n);
  }
  function ew() {
    (If = !1),
      Yr !== null && Ls(Yr) && (Yr = null),
      Gr !== null && Ls(Gr) && (Gr = null),
      Fr !== null && Ls(Fr) && (Fr = null),
      Bi.forEach(By),
      Pi.forEach(By);
  }
  function Us(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      If ||
        ((If = !0),
        e.unstable_scheduleCallback(e.unstable_NormalPriority, ew)));
  }
  var Hs = null;
  function Py(t) {
    Hs !== t &&
      ((Hs = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        Hs === t && (Hs = null);
        for (var n = 0; n < t.length; n += 3) {
          var o = t[n],
            l = t[n + 1],
            c = t[n + 2];
          if (typeof l != "function") {
            if (Kf(l || o) === null) continue;
            break;
          }
          var d = je(o);
          d !== null &&
            (t.splice(n, 3),
            (n -= 3),
            Xc(d, { pending: !0, data: c, method: o.method, action: l }, l, c));
        }
      }));
  }
  function Vi(t) {
    function n(z) {
      return Us(z, t);
    }
    Yr !== null && Us(Yr, t),
      Gr !== null && Us(Gr, t),
      Fr !== null && Us(Fr, t),
      Bi.forEach(n),
      Pi.forEach(n);
    for (var o = 0; o < Qr.length; o++) {
      var l = Qr[o];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Qr.length && ((o = Qr[0]), o.blockedOn === null); )
      Hy(o), o.blockedOn === null && Qr.shift();
    if (((o = (t.ownerDocument || t).$$reactFormReplay), o != null))
      for (l = 0; l < o.length; l += 3) {
        var c = o[l],
          d = o[l + 1],
          b = c[st] || null;
        if (typeof d == "function") b || Py(o);
        else if (b) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (((c = d), (b = d[st] || null))) C = b.formAction;
            else if (Kf(c) !== null) continue;
          } else C = b.action;
          typeof C == "function" ? (o[l + 1] = C) : (o.splice(l, 3), (l -= 3)),
            Py(o);
        }
      }
  }
  function Wf(t) {
    this._internalRoot = t;
  }
  (Bs.prototype.render = Wf.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(i(409));
      var o = n.current,
        l = an();
      My(o, l, t, n, null, null);
    }),
    (Bs.prototype.unmount = Wf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          My(t.current, 2, null, t, null, null), xs(), (n[Gn] = null);
        }
      });
  function Bs(t) {
    this._internalRoot = t;
  }
  Bs.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = dt();
      t = { blockedOn: null, target: t, priority: n };
      for (var o = 0; o < Qr.length && n !== 0 && n < Qr[o].priority; o++);
      Qr.splice(o, 0, t), o === 0 && Hy(t);
    }
  };
  var Zy = r.version;
  if (Zy !== "19.1.0") throw Error(i(527, Zy, "19.1.0"));
  Q.findDOMNode = function (t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function"
        ? Error(i(188))
        : ((t = Object.keys(t).join(",")), Error(i(268, t)));
    return (
      (t = p(n)),
      (t = t !== null ? m(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var tw = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ps = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ps.isDisabled && Ps.supportsFiber)
      try {
        (Ye = Ps.inject(tw)), (wt = Ps);
      } catch {}
  }
  return (
    (Yi.createRoot = function (t, n) {
      if (!s(t)) throw Error(i(299));
      var o = !1,
        l = "",
        c = ag,
        d = og,
        b = ig,
        C = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (b = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (C = n.unstable_transitionCallbacks)),
        (n = Dy(t, 1, !1, null, null, o, l, c, d, b, C, null)),
        (t[Gn] = n.current),
        Mf(t),
        new Wf(n)
      );
    }),
    (Yi.hydrateRoot = function (t, n, o) {
      if (!s(t)) throw Error(i(299));
      var l = !1,
        c = "",
        d = ag,
        b = og,
        C = ig,
        z = null,
        H = null;
      return (
        o != null &&
          (o.unstable_strictMode === !0 && (l = !0),
          o.identifierPrefix !== void 0 && (c = o.identifierPrefix),
          o.onUncaughtError !== void 0 && (d = o.onUncaughtError),
          o.onCaughtError !== void 0 && (b = o.onCaughtError),
          o.onRecoverableError !== void 0 && (C = o.onRecoverableError),
          o.unstable_transitionCallbacks !== void 0 &&
            (z = o.unstable_transitionCallbacks),
          o.formState !== void 0 && (H = o.formState)),
        (n = Dy(t, 1, !0, n, o ?? null, l, c, d, b, C, z, H)),
        (n.context = Ny(null)),
        (o = n.current),
        (l = an()),
        (l = Xo(l)),
        (c = jr(l)),
        (c.callback = null),
        Dr(o, c, l),
        (o = l),
        (n.current.lanes = o),
        fn(n, o),
        In(n),
        (t[Gn] = n.current),
        Mf(t),
        new Bs(n)
      );
    }),
    (Yi.version = "19.1.0"),
    Yi
  );
}
var Wy;
function fw() {
  if (Wy) return ed.exports;
  Wy = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (r) {
        console.error(r);
      }
  }
  return e(), (ed.exports = cw()), ed.exports;
}
var dw = fw(),
  x = Yd();
const Ca = qd(x),
  hw = rw({ __proto__: null, default: Ca }, [x]);
var Gi = {},
  Jy;
function pw() {
  if (Jy) return Gi;
  (Jy = 1),
    Object.defineProperty(Gi, "__esModule", { value: !0 }),
    (Gi.parse = f),
    (Gi.serialize = m);
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    r = /^[\u0021-\u003A\u003C-\u007E]*$/,
    a =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    i = /^[\u0020-\u003A\u003D-\u007E]*$/,
    s = Object.prototype.toString,
    u = (() => {
      const S = function () {};
      return (S.prototype = Object.create(null)), S;
    })();
  function f(S, w) {
    const E = new u(),
      T = S.length;
    if (T < 2) return E;
    const R = w?.decode || g;
    let _ = 0;
    do {
      const j = S.indexOf("=", _);
      if (j === -1) break;
      const A = S.indexOf(";", _),
        D = A === -1 ? T : A;
      if (j > D) {
        _ = S.lastIndexOf(";", j - 1) + 1;
        continue;
      }
      const U = h(S, _, j),
        k = p(S, j, U),
        Z = S.slice(U, k);
      if (E[Z] === void 0) {
        let V = h(S, j + 1, D),
          W = p(S, D, V);
        const ee = R(S.slice(V, W));
        E[Z] = ee;
      }
      _ = D + 1;
    } while (_ < T);
    return E;
  }
  function h(S, w, E) {
    do {
      const T = S.charCodeAt(w);
      if (T !== 32 && T !== 9) return w;
    } while (++w < E);
    return E;
  }
  function p(S, w, E) {
    for (; w > E; ) {
      const T = S.charCodeAt(--w);
      if (T !== 32 && T !== 9) return w + 1;
    }
    return E;
  }
  function m(S, w, E) {
    const T = E?.encode || encodeURIComponent;
    if (!e.test(S)) throw new TypeError(`argument name is invalid: ${S}`);
    const R = T(w);
    if (!r.test(R)) throw new TypeError(`argument val is invalid: ${w}`);
    let _ = S + "=" + R;
    if (!E) return _;
    if (E.maxAge !== void 0) {
      if (!Number.isInteger(E.maxAge))
        throw new TypeError(`option maxAge is invalid: ${E.maxAge}`);
      _ += "; Max-Age=" + E.maxAge;
    }
    if (E.domain) {
      if (!a.test(E.domain))
        throw new TypeError(`option domain is invalid: ${E.domain}`);
      _ += "; Domain=" + E.domain;
    }
    if (E.path) {
      if (!i.test(E.path))
        throw new TypeError(`option path is invalid: ${E.path}`);
      _ += "; Path=" + E.path;
    }
    if (E.expires) {
      if (!y(E.expires) || !Number.isFinite(E.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${E.expires}`);
      _ += "; Expires=" + E.expires.toUTCString();
    }
    if (
      (E.httpOnly && (_ += "; HttpOnly"),
      E.secure && (_ += "; Secure"),
      E.partitioned && (_ += "; Partitioned"),
      E.priority)
    )
      switch (
        typeof E.priority == "string" ? E.priority.toLowerCase() : void 0
      ) {
        case "low":
          _ += "; Priority=Low";
          break;
        case "medium":
          _ += "; Priority=Medium";
          break;
        case "high":
          _ += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${E.priority}`);
      }
    if (E.sameSite)
      switch (
        typeof E.sameSite == "string" ? E.sameSite.toLowerCase() : E.sameSite
      ) {
        case !0:
        case "strict":
          _ += "; SameSite=Strict";
          break;
        case "lax":
          _ += "; SameSite=Lax";
          break;
        case "none":
          _ += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${E.sameSite}`);
      }
    return _;
  }
  function g(S) {
    if (S.indexOf("%") === -1) return S;
    try {
      return decodeURIComponent(S);
    } catch {
      return S;
    }
  }
  function y(S) {
    return s.call(S) === "[object Date]";
  }
  return Gi;
}
pw();
var ev = "popstate";
function mw(e = {}) {
  function r(i, s) {
    let { pathname: u, search: f, hash: h } = i.location;
    return bd(
      "",
      { pathname: u, search: f, hash: h },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default",
    );
  }
  function a(i, s) {
    return typeof s == "string" ? s : tl(s);
  }
  return yw(r, a, null, e);
}
function Fe(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
function Mn(e, r) {
  if (!e) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {}
  }
}
function gw() {
  return Math.random().toString(36).substring(2, 10);
}
function tv(e, r) {
  return { usr: e.state, key: e.key, idx: r };
}
function bd(e, r, a = null, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof r == "string" ? $o(r) : r),
    state: a,
    key: (r && r.key) || i || gw(),
  };
}
function tl({ pathname: e = "/", search: r = "", hash: a = "" }) {
  return (
    r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r),
    a && a !== "#" && (e += a.charAt(0) === "#" ? a : "#" + a),
    e
  );
}
function $o(e) {
  let r = {};
  if (e) {
    let a = e.indexOf("#");
    a >= 0 && ((r.hash = e.substring(a)), (e = e.substring(0, a)));
    let i = e.indexOf("?");
    i >= 0 && ((r.search = e.substring(i)), (e = e.substring(0, i))),
      e && (r.pathname = e);
  }
  return r;
}
function yw(e, r, a, i = {}) {
  let { window: s = document.defaultView, v5Compat: u = !1 } = i,
    f = s.history,
    h = "POP",
    p = null,
    m = g();
  m == null && ((m = 0), f.replaceState({ ...f.state, idx: m }, ""));
  function g() {
    return (f.state || { idx: null }).idx;
  }
  function y() {
    h = "POP";
    let R = g(),
      _ = R == null ? null : R - m;
    (m = R), p && p({ action: h, location: T.location, delta: _ });
  }
  function S(R, _) {
    h = "PUSH";
    let j = bd(T.location, R, _);
    m = g() + 1;
    let A = tv(j, m),
      D = T.createHref(j);
    try {
      f.pushState(A, "", D);
    } catch (U) {
      if (U instanceof DOMException && U.name === "DataCloneError") throw U;
      s.location.assign(D);
    }
    u && p && p({ action: h, location: T.location, delta: 1 });
  }
  function w(R, _) {
    h = "REPLACE";
    let j = bd(T.location, R, _);
    m = g();
    let A = tv(j, m),
      D = T.createHref(j);
    f.replaceState(A, "", D),
      u && p && p({ action: h, location: T.location, delta: 0 });
  }
  function E(R) {
    return vw(R);
  }
  let T = {
    get action() {
      return h;
    },
    get location() {
      return e(s, f);
    },
    listen(R) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(ev, y),
        (p = R),
        () => {
          s.removeEventListener(ev, y), (p = null);
        }
      );
    },
    createHref(R) {
      return r(s, R);
    },
    createURL: E,
    encodeLocation(R) {
      let _ = E(R);
      return { pathname: _.pathname, search: _.search, hash: _.hash };
    },
    push: S,
    replace: w,
    go(R) {
      return f.go(R);
    },
  };
  return T;
}
function vw(e, r = !1) {
  let a = "http://localhost";
  typeof window < "u" &&
    (a =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Fe(a, "No window.location.(origin|href) available to create URL");
  let i = typeof e == "string" ? e : tl(e);
  return (
    (i = i.replace(/ $/, "%20")),
    !r && i.startsWith("//") && (i = a + i),
    new URL(i, a)
  );
}
function _0(e, r, a = "/") {
  return bw(e, r, a, !1);
}
function bw(e, r, a, i) {
  let s = typeof r == "string" ? $o(r) : r,
    u = _r(s.pathname || "/", a);
  if (u == null) return null;
  let f = R0(e);
  Sw(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let m = jw(u);
    h = zw(f[p], m, i);
  }
  return h;
}
function R0(e, r = [], a = [], i = "") {
  let s = (u, f, h) => {
    let p = {
      relativePath: h === void 0 ? u.path || "" : h,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: f,
      route: u,
    };
    p.relativePath.startsWith("/") &&
      (Fe(
        p.relativePath.startsWith(i),
        `Absolute route path "${p.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (p.relativePath = p.relativePath.slice(i.length)));
    let m = Er([i, p.relativePath]),
      g = a.concat(p);
    u.children &&
      u.children.length > 0 &&
      (Fe(
        u.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`,
      ),
      R0(u.children, r, g, m)),
      !(u.path == null && !u.index) &&
        r.push({ path: m, score: Tw(m, u.index), routesMeta: g });
  };
  return (
    e.forEach((u, f) => {
      if (u.path === "" || !u.path?.includes("?")) s(u, f);
      else for (let h of T0(u.path)) s(u, f, h);
    }),
    r
  );
}
function T0(e) {
  let r = e.split("/");
  if (r.length === 0) return [];
  let [a, ...i] = r,
    s = a.endsWith("?"),
    u = a.replace(/\?$/, "");
  if (i.length === 0) return s ? [u, ""] : [u];
  let f = T0(i.join("/")),
    h = [];
  return (
    h.push(...f.map((p) => (p === "" ? u : [u, p].join("/")))),
    s && h.push(...f),
    h.map((p) => (e.startsWith("/") && p === "" ? "/" : p))
  );
}
function Sw(e) {
  e.sort((r, a) =>
    r.score !== a.score
      ? a.score - r.score
      : Aw(
          r.routesMeta.map((i) => i.childrenIndex),
          a.routesMeta.map((i) => i.childrenIndex),
        ),
  );
}
var xw = /^:[\w-]+$/,
  ww = 3,
  Cw = 2,
  Ew = 1,
  _w = 10,
  Rw = -2,
  nv = (e) => e === "*";
function Tw(e, r) {
  let a = e.split("/"),
    i = a.length;
  return (
    a.some(nv) && (i += Rw),
    r && (i += Cw),
    a
      .filter((s) => !nv(s))
      .reduce((s, u) => s + (xw.test(u) ? ww : u === "" ? Ew : _w), i)
  );
}
function Aw(e, r) {
  return e.length === r.length && e.slice(0, -1).every((i, s) => i === r[s])
    ? e[e.length - 1] - r[r.length - 1]
    : 0;
}
function zw(e, r, a = !1) {
  let { routesMeta: i } = e,
    s = {},
    u = "/",
    f = [];
  for (let h = 0; h < i.length; ++h) {
    let p = i[h],
      m = h === i.length - 1,
      g = u === "/" ? r : r.slice(u.length) || "/",
      y = ou(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
        g,
      ),
      S = p.route;
    if (
      (!y &&
        m &&
        a &&
        !i[i.length - 1].route.index &&
        (y = ou(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          g,
        )),
      !y)
    )
      return null;
    Object.assign(s, y.params),
      f.push({
        params: s,
        pathname: Er([u, y.pathname]),
        pathnameBase: $w(Er([u, y.pathnameBase])),
        route: S,
      }),
      y.pathnameBase !== "/" && (u = Er([u, y.pathnameBase]));
  }
  return f;
}
function ou(e, r) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [a, i] = Ow(e.path, e.caseSensitive, e.end),
    s = r.match(a);
  if (!s) return null;
  let u = s[0],
    f = u.replace(/(.)\/+$/, "$1"),
    h = s.slice(1);
  return {
    params: i.reduce((m, { paramName: g, isOptional: y }, S) => {
      if (g === "*") {
        let E = h[S] || "";
        f = u.slice(0, u.length - E.length).replace(/(.)\/+$/, "$1");
      }
      const w = h[S];
      return (
        y && !w ? (m[g] = void 0) : (m[g] = (w || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: u,
    pathnameBase: f,
    pattern: e,
  };
}
function Ow(e, r = !1, a = !0) {
  Mn(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let i = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, h, p) => (
            i.push({ paramName: h, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (i.push({ paramName: "*" }),
        (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : a
        ? (s += "\\/*$")
        : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, r ? void 0 : "i"), i]
  );
}
function jw(e) {
  try {
    return e
      .split("/")
      .map((r) => decodeURIComponent(r).replace(/\//g, "%2F"))
      .join("/");
  } catch (r) {
    return (
      Mn(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`,
      ),
      e
    );
  }
}
function _r(e, r) {
  if (r === "/") return e;
  if (!e.toLowerCase().startsWith(r.toLowerCase())) return null;
  let a = r.endsWith("/") ? r.length - 1 : r.length,
    i = e.charAt(a);
  return i && i !== "/" ? null : e.slice(a) || "/";
}
function Dw(e, r = "/") {
  let {
    pathname: a,
    search: i = "",
    hash: s = "",
  } = typeof e == "string" ? $o(e) : e;
  return {
    pathname: a ? (a.startsWith("/") ? a : Nw(a, r)) : r,
    search: kw(i),
    hash: Lw(s),
  };
}
function Nw(e, r) {
  let a = r.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? a.length > 1 && a.pop() : s !== "." && a.push(s);
    }),
    a.length > 1 ? a.join("/") : "/"
  );
}
function od(e, r, a, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${r}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${a}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Mw(e) {
  return e.filter(
    (r, a) => a === 0 || (r.route.path && r.route.path.length > 0),
  );
}
function Gd(e) {
  let r = Mw(e);
  return r.map((a, i) => (i === r.length - 1 ? a.pathname : a.pathnameBase));
}
function Fd(e, r, a, i = !1) {
  let s;
  typeof e == "string"
    ? (s = $o(e))
    : ((s = { ...e }),
      Fe(
        !s.pathname || !s.pathname.includes("?"),
        od("?", "pathname", "search", s),
      ),
      Fe(
        !s.pathname || !s.pathname.includes("#"),
        od("#", "pathname", "hash", s),
      ),
      Fe(!s.search || !s.search.includes("#"), od("#", "search", "hash", s)));
  let u = e === "" || s.pathname === "",
    f = u ? "/" : s.pathname,
    h;
  if (f == null) h = a;
  else {
    let y = r.length - 1;
    if (!i && f.startsWith("..")) {
      let S = f.split("/");
      for (; S[0] === ".."; ) S.shift(), (y -= 1);
      s.pathname = S.join("/");
    }
    h = y >= 0 ? r[y] : "/";
  }
  let p = Dw(s, h),
    m = f && f !== "/" && f.endsWith("/"),
    g = (u || f === ".") && a.endsWith("/");
  return !p.pathname.endsWith("/") && (m || g) && (p.pathname += "/"), p;
}
var Er = (e) => e.join("/").replace(/\/\/+/g, "/"),
  $w = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  kw = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Lw = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Uw(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var A0 = ["POST", "PUT", "PATCH", "DELETE"];
new Set(A0);
var Hw = ["GET", ...A0];
new Set(Hw);
var ko = x.createContext(null);
ko.displayName = "DataRouter";
var mu = x.createContext(null);
mu.displayName = "DataRouterState";
var z0 = x.createContext({ isTransitioning: !1 });
z0.displayName = "ViewTransition";
var Bw = x.createContext(new Map());
Bw.displayName = "Fetchers";
var Pw = x.createContext(null);
Pw.displayName = "Await";
var Un = x.createContext(null);
Un.displayName = "Navigation";
var cl = x.createContext(null);
cl.displayName = "Location";
var Hn = x.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Hn.displayName = "Route";
var Qd = x.createContext(null);
Qd.displayName = "RouteError";
function Zw(e, { relative: r } = {}) {
  Fe(
    Lo(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: a, navigator: i } = x.useContext(Un),
    { hash: s, pathname: u, search: f } = fl(e, { relative: r }),
    h = u;
  return (
    a !== "/" && (h = u === "/" ? a : Er([a, u])),
    i.createHref({ pathname: h, search: f, hash: s })
  );
}
function Lo() {
  return x.useContext(cl) != null;
}
function Ir() {
  return (
    Fe(
      Lo(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    x.useContext(cl).location
  );
}
var O0 =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function j0(e) {
  x.useContext(Un).static || x.useLayoutEffect(e);
}
function kt() {
  let { isDataRoute: e } = x.useContext(Hn);
  return e ? r2() : Vw();
}
function Vw() {
  Fe(
    Lo(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = x.useContext(ko),
    { basename: r, navigator: a } = x.useContext(Un),
    { matches: i } = x.useContext(Hn),
    { pathname: s } = Ir(),
    u = JSON.stringify(Gd(i)),
    f = x.useRef(!1);
  return (
    j0(() => {
      f.current = !0;
    }),
    x.useCallback(
      (p, m = {}) => {
        if ((Mn(f.current, O0), !f.current)) return;
        if (typeof p == "number") {
          a.go(p);
          return;
        }
        let g = Fd(p, JSON.parse(u), s, m.relative === "path");
        e == null &&
          r !== "/" &&
          (g.pathname = g.pathname === "/" ? r : Er([r, g.pathname])),
          (m.replace ? a.replace : a.push)(g, m.state, m);
      },
      [r, a, u, s, e],
    )
  );
}
var qw = x.createContext(null);
function Yw(e) {
  let r = x.useContext(Hn).outlet;
  return r && x.createElement(qw.Provider, { value: e }, r);
}
function fl(e, { relative: r } = {}) {
  let { matches: a } = x.useContext(Hn),
    { pathname: i } = Ir(),
    s = JSON.stringify(Gd(a));
  return x.useMemo(() => Fd(e, JSON.parse(s), i, r === "path"), [e, s, i, r]);
}
function Gw(e, r) {
  return D0(e, r);
}
function D0(e, r, a, i) {
  Fe(
    Lo(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: s } = x.useContext(Un),
    { matches: u } = x.useContext(Hn),
    f = u[u.length - 1],
    h = f ? f.params : {},
    p = f ? f.pathname : "/",
    m = f ? f.pathnameBase : "/",
    g = f && f.route;
  {
    let _ = (g && g.path) || "";
    N0(
      p,
      !g || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === "/" ? "*" : `${_}/*`}">.`,
    );
  }
  let y = Ir(),
    S;
  if (r) {
    let _ = typeof r == "string" ? $o(r) : r;
    Fe(
      m === "/" || _.pathname?.startsWith(m),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${_.pathname}" was given in the \`location\` prop.`,
    ),
      (S = _);
  } else S = y;
  let w = S.pathname || "/",
    E = w;
  if (m !== "/") {
    let _ = m.replace(/^\//, "").split("/");
    E = "/" + w.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let T = _0(e, { pathname: E });
  Mn(
    g || T != null,
    `No routes matched location "${S.pathname}${S.search}${S.hash}" `,
  ),
    Mn(
      T == null ||
        T[T.length - 1].route.element !== void 0 ||
        T[T.length - 1].route.Component !== void 0 ||
        T[T.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let R = Iw(
    T &&
      T.map((_) =>
        Object.assign({}, _, {
          params: Object.assign({}, h, _.params),
          pathname: Er([
            m,
            s.encodeLocation
              ? s.encodeLocation(_.pathname).pathname
              : _.pathname,
          ]),
          pathnameBase:
            _.pathnameBase === "/"
              ? m
              : Er([
                  m,
                  s.encodeLocation
                    ? s.encodeLocation(_.pathnameBase).pathname
                    : _.pathnameBase,
                ]),
        }),
      ),
    u,
    a,
    i,
  );
  return r && R
    ? x.createElement(
        cl.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...S,
            },
            navigationType: "POP",
          },
        },
        R,
      )
    : R;
}
function Fw() {
  let e = n2(),
    r = Uw(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    a = e instanceof Error ? e.stack : null,
    i = "rgba(200,200,200, 0.5)",
    s = { padding: "0.5rem", backgroundColor: i },
    u = { padding: "2px 4px", backgroundColor: i },
    f = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (f = x.createElement(
      x.Fragment,
      null,
      x.createElement("p", null, "💿 Hey developer 👋"),
      x.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        x.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        x.createElement("code", { style: u }, "errorElement"),
        " prop on your route.",
      ),
    )),
    x.createElement(
      x.Fragment,
      null,
      x.createElement("h2", null, "Unexpected Application Error!"),
      x.createElement("h3", { style: { fontStyle: "italic" } }, r),
      a ? x.createElement("pre", { style: s }, a) : null,
      f,
    )
  );
}
var Qw = x.createElement(Fw, null),
  Xw = class extends x.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, r) {
      return r.location !== e.location ||
        (r.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : r.error,
            location: r.location,
            revalidation: e.revalidation || r.revalidation,
          };
    }
    componentDidCatch(e, r) {
      console.error(
        "React Router caught the following error during render",
        e,
        r,
      );
    }
    render() {
      return this.state.error !== void 0
        ? x.createElement(
            Hn.Provider,
            { value: this.props.routeContext },
            x.createElement(Qd.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function Kw({ routeContext: e, match: r, children: a }) {
  let i = x.useContext(ko);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = r.route.id),
    x.createElement(Hn.Provider, { value: e }, a)
  );
}
function Iw(e, r = [], a = null, i = null) {
  if (e == null) {
    if (!a) return null;
    if (a.errors) e = a.matches;
    else if (r.length === 0 && !a.initialized && a.matches.length > 0)
      e = a.matches;
    else return null;
  }
  let s = e,
    u = a?.errors;
  if (u != null) {
    let p = s.findIndex((m) => m.route.id && u?.[m.route.id] !== void 0);
    Fe(
      p >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`,
    ),
      (s = s.slice(0, Math.min(s.length, p + 1)));
  }
  let f = !1,
    h = -1;
  if (a)
    for (let p = 0; p < s.length; p++) {
      let m = s[p];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (h = p),
        m.route.id)
      ) {
        let { loaderData: g, errors: y } = a,
          S =
            m.route.loader &&
            !g.hasOwnProperty(m.route.id) &&
            (!y || y[m.route.id] === void 0);
        if (m.route.lazy || S) {
          (f = !0), h >= 0 ? (s = s.slice(0, h + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((p, m, g) => {
    let y,
      S = !1,
      w = null,
      E = null;
    a &&
      ((y = u && m.route.id ? u[m.route.id] : void 0),
      (w = m.route.errorElement || Qw),
      f &&
        (h < 0 && g === 0
          ? (N0(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (S = !0),
            (E = null))
          : h === g &&
            ((S = !0), (E = m.route.hydrateFallbackElement || null))));
    let T = r.concat(s.slice(0, g + 1)),
      R = () => {
        let _;
        return (
          y
            ? (_ = w)
            : S
              ? (_ = E)
              : m.route.Component
                ? (_ = x.createElement(m.route.Component, null))
                : m.route.element
                  ? (_ = m.route.element)
                  : (_ = p),
          x.createElement(Kw, {
            match: m,
            routeContext: { outlet: p, matches: T, isDataRoute: a != null },
            children: _,
          })
        );
      };
    return a && (m.route.ErrorBoundary || m.route.errorElement || g === 0)
      ? x.createElement(Xw, {
          location: a.location,
          revalidation: a.revalidation,
          component: w,
          error: y,
          children: R(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
        })
      : R();
  }, null);
}
function Xd(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ww(e) {
  let r = x.useContext(ko);
  return Fe(r, Xd(e)), r;
}
function Jw(e) {
  let r = x.useContext(mu);
  return Fe(r, Xd(e)), r;
}
function e2(e) {
  let r = x.useContext(Hn);
  return Fe(r, Xd(e)), r;
}
function Kd(e) {
  let r = e2(e),
    a = r.matches[r.matches.length - 1];
  return (
    Fe(
      a.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    a.route.id
  );
}
function t2() {
  return Kd("useRouteId");
}
function n2() {
  let e = x.useContext(Qd),
    r = Jw("useRouteError"),
    a = Kd("useRouteError");
  return e !== void 0 ? e : r.errors?.[a];
}
function r2() {
  let { router: e } = Ww("useNavigate"),
    r = Kd("useNavigate"),
    a = x.useRef(!1);
  return (
    j0(() => {
      a.current = !0;
    }),
    x.useCallback(
      async (s, u = {}) => {
        Mn(a.current, O0),
          a.current &&
            (typeof s == "number"
              ? e.navigate(s)
              : await e.navigate(s, { fromRouteId: r, ...u }));
      },
      [e, r],
    )
  );
}
var rv = {};
function N0(e, r, a) {
  !r && !rv[e] && ((rv[e] = !0), Mn(!1, a));
}
x.memo(a2);
function a2({ routes: e, future: r, state: a }) {
  return D0(e, void 0, a, r);
}
function o2({ to: e, replace: r, state: a, relative: i }) {
  Fe(
    Lo(),
    "<Navigate> may be used only in the context of a <Router> component.",
  );
  let { static: s } = x.useContext(Un);
  Mn(
    !s,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: u } = x.useContext(Hn),
    { pathname: f } = Ir(),
    h = kt(),
    p = Fd(e, Gd(u), f, i === "path"),
    m = JSON.stringify(p);
  return (
    x.useEffect(() => {
      h(JSON.parse(m), { replace: r, state: a, relative: i });
    }, [h, m, i, r, a]),
    null
  );
}
function i2(e) {
  return Yw(e.context);
}
function jt(e) {
  Fe(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function l2({
  basename: e = "/",
  children: r = null,
  location: a,
  navigationType: i = "POP",
  navigator: s,
  static: u = !1,
}) {
  Fe(
    !Lo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let f = e.replace(/^\/*/, "/"),
    h = x.useMemo(
      () => ({ basename: f, navigator: s, static: u, future: {} }),
      [f, s, u],
    );
  typeof a == "string" && (a = $o(a));
  let {
      pathname: p = "/",
      search: m = "",
      hash: g = "",
      state: y = null,
      key: S = "default",
    } = a,
    w = x.useMemo(() => {
      let E = _r(p, f);
      return E == null
        ? null
        : {
            location: { pathname: E, search: m, hash: g, state: y, key: S },
            navigationType: i,
          };
    }, [f, p, m, g, y, S, i]);
  return (
    Mn(
      w != null,
      `<Router basename="${f}"> is not able to match the URL "${p}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    w == null
      ? null
      : x.createElement(
          Un.Provider,
          { value: h },
          x.createElement(cl.Provider, { children: r, value: w }),
        )
  );
}
function s2({ children: e, location: r }) {
  return Gw(Sd(e), r);
}
function Sd(e, r = []) {
  let a = [];
  return (
    x.Children.forEach(e, (i, s) => {
      if (!x.isValidElement(i)) return;
      let u = [...r, s];
      if (i.type === x.Fragment) {
        a.push.apply(a, Sd(i.props.children, u));
        return;
      }
      Fe(
        i.type === jt,
        `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        Fe(
          !i.props.index || !i.props.children,
          "An index route cannot have child routes.",
        );
      let f = {
        id: i.props.id || u.join("-"),
        caseSensitive: i.props.caseSensitive,
        element: i.props.element,
        Component: i.props.Component,
        index: i.props.index,
        path: i.props.path,
        loader: i.props.loader,
        action: i.props.action,
        hydrateFallbackElement: i.props.hydrateFallbackElement,
        HydrateFallback: i.props.HydrateFallback,
        errorElement: i.props.errorElement,
        ErrorBoundary: i.props.ErrorBoundary,
        hasErrorBoundary:
          i.props.hasErrorBoundary === !0 ||
          i.props.ErrorBoundary != null ||
          i.props.errorElement != null,
        shouldRevalidate: i.props.shouldRevalidate,
        handle: i.props.handle,
        lazy: i.props.lazy,
      };
      i.props.children && (f.children = Sd(i.props.children, u)), a.push(f);
    }),
    a
  );
}
var tu = "get",
  nu = "application/x-www-form-urlencoded";
function gu(e) {
  return e != null && typeof e.tagName == "string";
}
function u2(e) {
  return gu(e) && e.tagName.toLowerCase() === "button";
}
function c2(e) {
  return gu(e) && e.tagName.toLowerCase() === "form";
}
function f2(e) {
  return gu(e) && e.tagName.toLowerCase() === "input";
}
function d2(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function h2(e, r) {
  return e.button === 0 && (!r || r === "_self") && !d2(e);
}
var Zs = null;
function p2() {
  if (Zs === null)
    try {
      new FormData(document.createElement("form"), 0), (Zs = !1);
    } catch {
      Zs = !0;
    }
  return Zs;
}
var m2 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function id(e) {
  return e != null && !m2.has(e)
    ? (Mn(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${nu}"`,
      ),
      null)
    : e;
}
function g2(e, r) {
  let a, i, s, u, f;
  if (c2(e)) {
    let h = e.getAttribute("action");
    (i = h ? _r(h, r) : null),
      (a = e.getAttribute("method") || tu),
      (s = id(e.getAttribute("enctype")) || nu),
      (u = new FormData(e));
  } else if (u2(e) || (f2(e) && (e.type === "submit" || e.type === "image"))) {
    let h = e.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let p = e.getAttribute("formaction") || h.getAttribute("action");
    if (
      ((i = p ? _r(p, r) : null),
      (a = e.getAttribute("formmethod") || h.getAttribute("method") || tu),
      (s =
        id(e.getAttribute("formenctype")) ||
        id(h.getAttribute("enctype")) ||
        nu),
      (u = new FormData(h, e)),
      !p2())
    ) {
      let { name: m, type: g, value: y } = e;
      if (g === "image") {
        let S = m ? `${m}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else m && u.append(m, y);
    }
  } else {
    if (gu(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (a = tu), (i = null), (s = nu), (f = e);
  }
  return (
    u && s === "text/plain" && ((f = u), (u = void 0)),
    { action: i, method: a.toLowerCase(), encType: s, formData: u, body: f }
  );
}
function Id(e, r) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(r);
}
async function y2(e, r) {
  if (e.id in r) return r[e.id];
  try {
    let a = await import(e.module);
    return (r[e.id] = a), a;
  } catch (a) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(a),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function v2(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function b2(e, r, a) {
  let i = await Promise.all(
    e.map(async (s) => {
      let u = r.routes[s.route.id];
      if (u) {
        let f = await y2(u, a);
        return f.links ? f.links() : [];
      }
      return [];
    }),
  );
  return C2(
    i
      .flat(1)
      .filter(v2)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" },
      ),
  );
}
function av(e, r, a, i, s, u) {
  let f = (p, m) => (a[m] ? p.route.id !== a[m].route.id : !0),
    h = (p, m) =>
      a[m].pathname !== p.pathname ||
      (a[m].route.path?.endsWith("*") && a[m].params["*"] !== p.params["*"]);
  return u === "assets"
    ? r.filter((p, m) => f(p, m) || h(p, m))
    : u === "data"
      ? r.filter((p, m) => {
          let g = i.routes[p.route.id];
          if (!g || !g.hasLoader) return !1;
          if (f(p, m) || h(p, m)) return !0;
          if (p.route.shouldRevalidate) {
            let y = p.route.shouldRevalidate({
              currentUrl: new URL(
                s.pathname + s.search + s.hash,
                window.origin,
              ),
              currentParams: a[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof y == "boolean") return y;
          }
          return !0;
        })
      : [];
}
function S2(e, r, { includeHydrateFallback: a } = {}) {
  return x2(
    e
      .map((i) => {
        let s = r.routes[i.route.id];
        if (!s) return [];
        let u = [s.module];
        return (
          s.clientActionModule && (u = u.concat(s.clientActionModule)),
          s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)),
          a &&
            s.hydrateFallbackModule &&
            (u = u.concat(s.hydrateFallbackModule)),
          s.imports && (u = u.concat(s.imports)),
          u
        );
      })
      .flat(1),
  );
}
function x2(e) {
  return [...new Set(e)];
}
function w2(e) {
  let r = {},
    a = Object.keys(e).sort();
  for (let i of a) r[i] = e[i];
  return r;
}
function C2(e, r) {
  let a = new Set();
  return (
    new Set(r),
    e.reduce((i, s) => {
      let u = JSON.stringify(w2(s));
      return a.has(u) || (a.add(u), i.push({ key: u, link: s })), i;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var E2 = new Set([100, 101, 204, 205]);
function _2(e, r) {
  let a =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    a.pathname === "/"
      ? (a.pathname = "_root.data")
      : r && _r(a.pathname, r) === "/"
        ? (a.pathname = `${r.replace(/\/$/, "")}/_root.data`)
        : (a.pathname = `${a.pathname.replace(/\/$/, "")}.data`),
    a
  );
}
function M0() {
  let e = x.useContext(ko);
  return (
    Id(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function R2() {
  let e = x.useContext(mu);
  return (
    Id(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Wd = x.createContext(void 0);
Wd.displayName = "FrameworkContext";
function $0() {
  let e = x.useContext(Wd);
  return (
    Id(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function T2(e, r) {
  let a = x.useContext(Wd),
    [i, s] = x.useState(!1),
    [u, f] = x.useState(!1),
    {
      onFocus: h,
      onBlur: p,
      onMouseEnter: m,
      onMouseLeave: g,
      onTouchStart: y,
    } = r,
    S = x.useRef(null);
  x.useEffect(() => {
    if ((e === "render" && f(!0), e === "viewport")) {
      let T = (_) => {
          _.forEach((j) => {
            f(j.isIntersecting);
          });
        },
        R = new IntersectionObserver(T, { threshold: 0.5 });
      return (
        S.current && R.observe(S.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [e]),
    x.useEffect(() => {
      if (i) {
        let T = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(T);
        };
      }
    }, [i]);
  let w = () => {
      s(!0);
    },
    E = () => {
      s(!1), f(!1);
    };
  return a
    ? e !== "intent"
      ? [u, S, {}]
      : [
          u,
          S,
          {
            onFocus: Fi(h, w),
            onBlur: Fi(p, E),
            onMouseEnter: Fi(m, w),
            onMouseLeave: Fi(g, E),
            onTouchStart: Fi(y, w),
          },
        ]
    : [!1, S, {}];
}
function Fi(e, r) {
  return (a) => {
    e && e(a), a.defaultPrevented || r(a);
  };
}
function A2({ page: e, ...r }) {
  let { router: a } = M0(),
    i = x.useMemo(() => _0(a.routes, e, a.basename), [a.routes, e, a.basename]);
  return i ? x.createElement(O2, { page: e, matches: i, ...r }) : null;
}
function z2(e) {
  let { manifest: r, routeModules: a } = $0(),
    [i, s] = x.useState([]);
  return (
    x.useEffect(() => {
      let u = !1;
      return (
        b2(e, r, a).then((f) => {
          u || s(f);
        }),
        () => {
          u = !0;
        }
      );
    }, [e, r, a]),
    i
  );
}
function O2({ page: e, matches: r, ...a }) {
  let i = Ir(),
    { manifest: s, routeModules: u } = $0(),
    { basename: f } = M0(),
    { loaderData: h, matches: p } = R2(),
    m = x.useMemo(() => av(e, r, p, s, i, "data"), [e, r, p, s, i]),
    g = x.useMemo(() => av(e, r, p, s, i, "assets"), [e, r, p, s, i]),
    y = x.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let E = new Set(),
        T = !1;
      if (
        (r.forEach((_) => {
          let j = s.routes[_.route.id];
          !j ||
            !j.hasLoader ||
            ((!m.some((A) => A.route.id === _.route.id) &&
              _.route.id in h &&
              u[_.route.id]?.shouldRevalidate) ||
            j.hasClientLoader
              ? (T = !0)
              : E.add(_.route.id));
        }),
        E.size === 0)
      )
        return [];
      let R = _2(e, f);
      return (
        T &&
          E.size > 0 &&
          R.searchParams.set(
            "_routes",
            r
              .filter((_) => E.has(_.route.id))
              .map((_) => _.route.id)
              .join(","),
          ),
        [R.pathname + R.search]
      );
    }, [f, h, i, s, m, r, e, u]),
    S = x.useMemo(() => S2(g, s), [g, s]),
    w = z2(g);
  return x.createElement(
    x.Fragment,
    null,
    y.map((E) =>
      x.createElement("link", {
        key: E,
        rel: "prefetch",
        as: "fetch",
        href: E,
        ...a,
      }),
    ),
    S.map((E) =>
      x.createElement("link", { key: E, rel: "modulepreload", href: E, ...a }),
    ),
    w.map(({ key: E, link: T }) => x.createElement("link", { key: E, ...T })),
  );
}
function j2(...e) {
  return (r) => {
    e.forEach((a) => {
      typeof a == "function" ? a(r) : a != null && (a.current = r);
    });
  };
}
var k0 =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  k0 && (window.__reactRouterVersion = "7.6.3");
} catch {}
function D2({ basename: e, children: r, window: a }) {
  let i = x.useRef();
  i.current == null && (i.current = mw({ window: a, v5Compat: !0 }));
  let s = i.current,
    [u, f] = x.useState({ action: s.action, location: s.location }),
    h = x.useCallback(
      (p) => {
        x.startTransition(() => f(p));
      },
      [f],
    );
  return (
    x.useLayoutEffect(() => s.listen(h), [s, h]),
    x.createElement(l2, {
      basename: e,
      children: r,
      location: u.location,
      navigationType: u.action,
      navigator: s,
    })
  );
}
var L0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  U0 = x.forwardRef(function (
    {
      onClick: r,
      discover: a = "render",
      prefetch: i = "none",
      relative: s,
      reloadDocument: u,
      replace: f,
      state: h,
      target: p,
      to: m,
      preventScrollReset: g,
      viewTransition: y,
      ...S
    },
    w,
  ) {
    let { basename: E } = x.useContext(Un),
      T = typeof m == "string" && L0.test(m),
      R,
      _ = !1;
    if (typeof m == "string" && T && ((R = m), k0))
      try {
        let W = new URL(window.location.href),
          ee = m.startsWith("//") ? new URL(W.protocol + m) : new URL(m),
          pe = _r(ee.pathname, E);
        ee.origin === W.origin && pe != null
          ? (m = pe + ee.search + ee.hash)
          : (_ = !0);
      } catch {
        Mn(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let j = Zw(m, { relative: s }),
      [A, D, U] = T2(i, S),
      k = k2(m, {
        replace: f,
        state: h,
        target: p,
        preventScrollReset: g,
        relative: s,
        viewTransition: y,
      });
    function Z(W) {
      r && r(W), W.defaultPrevented || k(W);
    }
    let V = x.createElement("a", {
      ...S,
      ...U,
      href: R || j,
      onClick: _ || u ? r : Z,
      ref: j2(w, D),
      target: p,
      "data-discover": !T && a === "render" ? "true" : void 0,
    });
    return A && !T
      ? x.createElement(x.Fragment, null, V, x.createElement(A2, { page: j }))
      : V;
  });
U0.displayName = "Link";
var N2 = x.forwardRef(function (
  {
    "aria-current": r = "page",
    caseSensitive: a = !1,
    className: i = "",
    end: s = !1,
    style: u,
    to: f,
    viewTransition: h,
    children: p,
    ...m
  },
  g,
) {
  let y = fl(f, { relative: m.relative }),
    S = Ir(),
    w = x.useContext(mu),
    { navigator: E, basename: T } = x.useContext(Un),
    R = w != null && P2(y) && h === !0,
    _ = E.encodeLocation ? E.encodeLocation(y).pathname : y.pathname,
    j = S.pathname,
    A =
      w && w.navigation && w.navigation.location
        ? w.navigation.location.pathname
        : null;
  a ||
    ((j = j.toLowerCase()),
    (A = A ? A.toLowerCase() : null),
    (_ = _.toLowerCase())),
    A && T && (A = _r(A, T) || A);
  const D = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
  let U = j === _ || (!s && j.startsWith(_) && j.charAt(D) === "/"),
    k =
      A != null &&
      (A === _ || (!s && A.startsWith(_) && A.charAt(_.length) === "/")),
    Z = { isActive: U, isPending: k, isTransitioning: R },
    V = U ? r : void 0,
    W;
  typeof i == "function"
    ? (W = i(Z))
    : (W = [
        i,
        U ? "active" : null,
        k ? "pending" : null,
        R ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ee = typeof u == "function" ? u(Z) : u;
  return x.createElement(
    U0,
    {
      ...m,
      "aria-current": V,
      className: W,
      ref: g,
      style: ee,
      to: f,
      viewTransition: h,
    },
    typeof p == "function" ? p(Z) : p,
  );
});
N2.displayName = "NavLink";
var M2 = x.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: r,
      navigate: a,
      reloadDocument: i,
      replace: s,
      state: u,
      method: f = tu,
      action: h,
      onSubmit: p,
      relative: m,
      preventScrollReset: g,
      viewTransition: y,
      ...S
    },
    w,
  ) => {
    let E = H2(),
      T = B2(h, { relative: m }),
      R = f.toLowerCase() === "get" ? "get" : "post",
      _ = typeof h == "string" && L0.test(h),
      j = (A) => {
        if ((p && p(A), A.defaultPrevented)) return;
        A.preventDefault();
        let D = A.nativeEvent.submitter,
          U = D?.getAttribute("formmethod") || f;
        E(D || A.currentTarget, {
          fetcherKey: r,
          method: U,
          navigate: a,
          replace: s,
          state: u,
          relative: m,
          preventScrollReset: g,
          viewTransition: y,
        });
      };
    return x.createElement("form", {
      ref: w,
      method: R,
      action: T,
      onSubmit: i ? p : j,
      ...S,
      "data-discover": !_ && e === "render" ? "true" : void 0,
    });
  },
);
M2.displayName = "Form";
function $2(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function H0(e) {
  let r = x.useContext(ko);
  return Fe(r, $2(e)), r;
}
function k2(
  e,
  {
    target: r,
    replace: a,
    state: i,
    preventScrollReset: s,
    relative: u,
    viewTransition: f,
  } = {},
) {
  let h = kt(),
    p = Ir(),
    m = fl(e, { relative: u });
  return x.useCallback(
    (g) => {
      if (h2(g, r)) {
        g.preventDefault();
        let y = a !== void 0 ? a : tl(p) === tl(m);
        h(e, {
          replace: y,
          state: i,
          preventScrollReset: s,
          relative: u,
          viewTransition: f,
        });
      }
    },
    [p, h, m, a, i, r, e, s, u, f],
  );
}
var L2 = 0,
  U2 = () => `__${String(++L2)}__`;
function H2() {
  let { router: e } = H0("useSubmit"),
    { basename: r } = x.useContext(Un),
    a = t2();
  return x.useCallback(
    async (i, s = {}) => {
      let { action: u, method: f, encType: h, formData: p, body: m } = g2(i, r);
      if (s.navigate === !1) {
        let g = s.fetcherKey || U2();
        await e.fetch(g, a, s.action || u, {
          preventScrollReset: s.preventScrollReset,
          formData: p,
          body: m,
          formMethod: s.method || f,
          formEncType: s.encType || h,
          flushSync: s.flushSync,
        });
      } else
        await e.navigate(s.action || u, {
          preventScrollReset: s.preventScrollReset,
          formData: p,
          body: m,
          formMethod: s.method || f,
          formEncType: s.encType || h,
          replace: s.replace,
          state: s.state,
          fromRouteId: a,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition,
        });
    },
    [e, r, a],
  );
}
function B2(e, { relative: r } = {}) {
  let { basename: a } = x.useContext(Un),
    i = x.useContext(Hn);
  Fe(i, "useFormAction must be used inside a RouteContext");
  let [s] = i.matches.slice(-1),
    u = { ...fl(e || ".", { relative: r }) },
    f = Ir();
  if (e == null) {
    u.search = f.search;
    let h = new URLSearchParams(u.search),
      p = h.getAll("index");
    if (p.some((g) => g === "")) {
      h.delete("index"),
        p.filter((y) => y).forEach((y) => h.append("index", y));
      let g = h.toString();
      u.search = g ? `?${g}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      s.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    a !== "/" && (u.pathname = u.pathname === "/" ? a : Er([a, u.pathname])),
    tl(u)
  );
}
function P2(e, r = {}) {
  let a = x.useContext(z0);
  Fe(
    a != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: i } = H0("useViewTransitionState"),
    s = fl(e, { relative: r.relative });
  if (!a.isTransitioning) return !1;
  let u = _r(a.currentLocation.pathname, i) || a.currentLocation.pathname,
    f = _r(a.nextLocation.pathname, i) || a.nextLocation.pathname;
  return ou(s.pathname, f) != null || ou(s.pathname, u) != null;
}
[...E2];
function Jn(e) {
  return Object.keys(e);
}
function ld(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function Jd(e, r) {
  const a = { ...e },
    i = r;
  return (
    ld(e) &&
      ld(r) &&
      Object.keys(r).forEach((s) => {
        ld(i[s]) && s in e ? (a[s] = Jd(a[s], i[s])) : (a[s] = i[s]);
      }),
    a
  );
}
function Z2(e) {
  return e.replace(/[A-Z]/g, (r) => `-${r.toLowerCase()}`);
}
function V2(e) {
  return typeof e != "string" || !e.includes("var(--mantine-scale)")
    ? e
    : e
        .match(/^calc\((.*?)\)$/)?.[1]
        .split("*")[0]
        .trim();
}
function q2(e) {
  const r = V2(e);
  return typeof r == "number"
    ? r
    : typeof r == "string"
      ? r.includes("calc") || r.includes("var")
        ? r
        : r.includes("px")
          ? Number(r.replace("px", ""))
          : r.includes("rem")
            ? Number(r.replace("rem", "")) * 16
            : r.includes("em")
              ? Number(r.replace("em", "")) * 16
              : Number(r)
      : NaN;
}
function ov(e) {
  return e === "0rem" ? "0rem" : `calc(${e} * var(--mantine-scale))`;
}
function B0(e, { shouldScale: r = !1 } = {}) {
  function a(i) {
    if (i === 0 || i === "0") return `0${e}`;
    if (typeof i == "number") {
      const s = `${i / 16}${e}`;
      return r ? ov(s) : s;
    }
    if (typeof i == "string") {
      if (
        i === "" ||
        i.startsWith("calc(") ||
        i.startsWith("clamp(") ||
        i.includes("rgba(")
      )
        return i;
      if (i.includes(","))
        return i
          .split(",")
          .map((u) => a(u))
          .join(",");
      if (i.includes(" "))
        return i
          .split(" ")
          .map((u) => a(u))
          .join(" ");
      const s = i.replace("px", "");
      if (!Number.isNaN(Number(s))) {
        const u = `${Number(s) / 16}${e}`;
        return r ? ov(u) : u;
      }
    }
    return i;
  }
  return a;
}
const K = B0("rem", { shouldScale: !0 }),
  iv = B0("em");
function yu(e) {
  return Object.keys(e).reduce(
    (r, a) => (e[a] !== void 0 && (r[a] = e[a]), r),
    {},
  );
}
function P0(e) {
  if (typeof e == "number") return !0;
  if (typeof e == "string") {
    if (
      e.startsWith("calc(") ||
      e.startsWith("var(") ||
      (e.includes(" ") && e.trim() !== "")
    )
      return !0;
    const r =
      /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return e
      .trim()
      .split(/\s+/)
      .every((i) => r.test(i));
  }
  return !1;
}
function dl(e) {
  return Array.isArray(e) || e === null
    ? !1
    : typeof e == "object"
      ? e.type !== x.Fragment
      : !1;
}
function hl(e) {
  const r = x.createContext(null);
  return [
    ({ children: s, value: u }) => v.jsx(r.Provider, { value: u, children: s }),
    () => {
      const s = x.useContext(r);
      if (s === null) throw new Error(e);
      return s;
    },
  ];
}
function vu(e = null) {
  const r = x.createContext(e);
  return [
    ({ children: s, value: u }) => v.jsx(r.Provider, { value: u, children: s }),
    () => x.useContext(r),
  ];
}
const Y2 = { app: 100, modal: 200, popover: 300, overlay: 400, max: 9999 };
function eh(e) {
  return Y2[e];
}
const G2 = () => {};
function F2(e, r = { active: !0 }) {
  return typeof e != "function" || !r.active
    ? r.onKeyDown || G2
    : (a) => {
        a.key === "Escape" && (e(a), r.onTrigger?.());
      };
}
function He(e, r = "size", a = !0) {
  if (e !== void 0) return P0(e) ? (a ? K(e) : e) : `var(--${r}-${e})`;
}
function Cr(e) {
  return He(e, "mantine-spacing");
}
function Bn(e) {
  return e === void 0
    ? "var(--mantine-radius-default)"
    : He(e, "mantine-radius");
}
function Pt(e) {
  return He(e, "mantine-font-size");
}
function Q2(e) {
  return He(e, "mantine-line-height", !1);
}
function Z0(e) {
  if (e) return He(e, "mantine-shadow", !1);
}
function X2(e = "mantine-") {
  return `${e}${Math.random().toString(36).slice(2, 11)}`;
}
function xa(e) {
  const r = x.useRef(e);
  return (
    x.useEffect(() => {
      r.current = e;
    }),
    x.useMemo(
      () =>
        (...a) =>
          r.current?.(...a),
      [],
    )
  );
}
function bu(e, r) {
  const {
      delay: a,
      flushOnUnmount: i,
      leading: s,
    } = typeof r == "number"
      ? { delay: r, flushOnUnmount: !1, leading: !1 }
      : r,
    u = xa(e),
    f = x.useRef(0),
    h = x.useMemo(() => {
      const p = Object.assign(
        (...m) => {
          window.clearTimeout(f.current);
          const g = p._isFirstCall;
          p._isFirstCall = !1;
          function y() {
            window.clearTimeout(f.current),
              (f.current = 0),
              (p._isFirstCall = !0);
          }
          if (s && g) {
            u(...m);
            const E = () => {
                y();
              },
              T = () => {
                f.current !== 0 && (y(), u(...m));
              },
              R = () => {
                y();
              };
            (p.flush = T),
              (p.cancel = R),
              (f.current = window.setTimeout(E, a));
            return;
          }
          if (s && !g) {
            const E = () => {
                f.current !== 0 && (y(), u(...m));
              },
              T = () => {
                y();
              };
            (p.flush = E), (p.cancel = T);
            const R = () => {
              y();
            };
            f.current = window.setTimeout(R, a);
            return;
          }
          const S = () => {
              f.current !== 0 && (y(), u(...m));
            },
            w = () => {
              y();
            };
          (p.flush = S), (p.cancel = w), (f.current = window.setTimeout(S, a));
        },
        { flush: () => {}, cancel: () => {}, _isFirstCall: !0 },
      );
      return p;
    }, [u, a, s]);
  return (
    x.useEffect(
      () => () => {
        i ? h.flush() : h.cancel();
      },
      [h, i],
    ),
    h
  );
}
const lv = ["mousedown", "touchstart"];
function K2(e, r, a) {
  const i = x.useRef(null);
  return (
    x.useEffect(() => {
      const s = (u) => {
        const { target: f } = u ?? {};
        if (Array.isArray(a)) {
          const h =
            f?.hasAttribute("data-ignore-outside-clicks") ||
            (!document.body.contains(f) && f.tagName !== "HTML");
          a.every((m) => !!m && !u.composedPath().includes(m)) && !h && e();
        } else i.current && !i.current.contains(f) && e();
      };
      return (
        (r || lv).forEach((u) => document.addEventListener(u, s)),
        () => {
          (r || lv).forEach((u) => document.removeEventListener(u, s));
        }
      );
    }, [i, e, a]),
    i
  );
}
function I2(e, r) {
  try {
    return (
      e.addEventListener("change", r), () => e.removeEventListener("change", r)
    );
  } catch {
    return e.addListener(r), () => e.removeListener(r);
  }
}
function W2(e, r) {
  return typeof window < "u" && "matchMedia" in window
    ? window.matchMedia(e).matches
    : !1;
}
function J2(
  e,
  r,
  { getInitialValueInEffect: a } = { getInitialValueInEffect: !0 },
) {
  const [i, s] = x.useState(a ? r : W2(e)),
    u = x.useRef(null);
  return (
    x.useEffect(() => {
      if ("matchMedia" in window)
        return (
          (u.current = window.matchMedia(e)),
          s(u.current.matches),
          I2(u.current, (f) => s(f.matches))
        );
    }, [e]),
    i || !1
  );
}
const pl = typeof document < "u" ? x.useLayoutEffect : x.useEffect;
function Ji(e, r) {
  const a = x.useRef(!1);
  x.useEffect(
    () => () => {
      a.current = !1;
    },
    [],
  ),
    x.useEffect(() => {
      if (a.current) return e();
      a.current = !0;
    }, r);
}
function eC({ opened: e, shouldReturnFocus: r = !0 }) {
  const a = x.useRef(null),
    i = () => {
      a.current &&
        "focus" in a.current &&
        typeof a.current.focus == "function" &&
        a.current?.focus({ preventScroll: !0 });
    };
  return (
    Ji(() => {
      let s = -1;
      const u = (f) => {
        f.key === "Tab" && window.clearTimeout(s);
      };
      return (
        document.addEventListener("keydown", u),
        e
          ? (a.current = document.activeElement)
          : r && (s = window.setTimeout(i, 10)),
        () => {
          window.clearTimeout(s), document.removeEventListener("keydown", u);
        }
      );
    }, [e, r]),
    i
  );
}
const tC = /input|select|textarea|button|object/,
  V0 = "a, input, select, textarea, button, object, [tabindex]";
function nC(e) {
  return e.style.display === "none";
}
function rC(e) {
  if (
    e.getAttribute("aria-hidden") ||
    e.getAttribute("hidden") ||
    e.getAttribute("type") === "hidden"
  )
    return !1;
  let a = e;
  for (; a && !(a === document.body || a.nodeType === 11); ) {
    if (nC(a)) return !1;
    a = a.parentNode;
  }
  return !0;
}
function q0(e) {
  let r = e.getAttribute("tabindex");
  return r === null && (r = void 0), parseInt(r, 10);
}
function xd(e) {
  const r = e.nodeName.toLowerCase(),
    a = !Number.isNaN(q0(e));
  return (
    ((tC.test(r) && !e.disabled) ||
      (e instanceof HTMLAnchorElement && e.href) ||
      a) &&
    rC(e)
  );
}
function Y0(e) {
  const r = q0(e);
  return (Number.isNaN(r) || r >= 0) && xd(e);
}
function aC(e) {
  return Array.from(e.querySelectorAll(V0)).filter(Y0);
}
function oC(e, r) {
  const a = aC(e);
  if (!a.length) {
    r.preventDefault();
    return;
  }
  const i = a[r.shiftKey ? 0 : a.length - 1],
    s = e.getRootNode();
  let u = i === s.activeElement || e === s.activeElement;
  const f = s.activeElement;
  if (
    (f.tagName === "INPUT" &&
      f.getAttribute("type") === "radio" &&
      (u = a
        .filter(
          (g) =>
            g.getAttribute("type") === "radio" &&
            g.getAttribute("name") === f.getAttribute("name"),
        )
        .includes(i)),
    !u)
  )
    return;
  r.preventDefault();
  const p = a[r.shiftKey ? a.length - 1 : 0];
  p && p.focus();
}
function iC(e = !0) {
  const r = x.useRef(null),
    a = (s) => {
      let u = s.querySelector("[data-autofocus]");
      if (!u) {
        const f = Array.from(s.querySelectorAll(V0));
        (u = f.find(Y0) || f.find(xd) || null), !u && xd(s) && (u = s);
      }
      u && u.focus({ preventScroll: !0 });
    },
    i = x.useCallback(
      (s) => {
        e &&
          s !== null &&
          r.current !== s &&
          (s
            ? (setTimeout(() => {
                s.getRootNode() && a(s);
              }),
              (r.current = s))
            : (r.current = null));
      },
      [e],
    );
  return (
    x.useEffect(() => {
      if (!e) return;
      r.current && setTimeout(() => a(r.current));
      const s = (u) => {
        u.key === "Tab" && r.current && oC(r.current, u);
      };
      return (
        document.addEventListener("keydown", s),
        () => document.removeEventListener("keydown", s)
      );
    }, [e]),
    i
  );
}
const lC = Ca.useId || (() => {});
function sC() {
  const e = lC();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function ml(e) {
  const r = sC(),
    [a, i] = x.useState(r);
  return (
    pl(() => {
      i(X2());
    }, []),
    typeof e == "string" ? e : typeof window > "u" ? r : a
  );
}
function iu(e, r) {
  if (typeof e == "function") return e(r);
  typeof e == "object" && e !== null && "current" in e && (e.current = r);
}
function uC(...e) {
  const r = new Map();
  return (a) => {
    if (
      (e.forEach((i) => {
        const s = iu(i, a);
        s && r.set(i, s);
      }),
      r.size > 0)
    )
      return () => {
        e.forEach((i) => {
          const s = r.get(i);
          s ? s() : iu(i, null);
        }),
          r.clear();
      };
  };
}
function Zt(...e) {
  return x.useCallback(uC(...e), e);
}
function To({
  value: e,
  defaultValue: r,
  finalValue: a,
  onChange: i = () => {},
}) {
  const [s, u] = x.useState(r !== void 0 ? r : a),
    f = (h, ...p) => {
      u(h), i?.(h, ...p);
    };
  return e !== void 0 ? [e, i, !0] : [s, f, !1];
}
function cC(e, r) {
  return J2("(prefers-reduced-motion: reduce)", e, r);
}
var fC = {};
function dC() {
  return typeof process < "u" && fC ? "production" : "development";
}
function G0(e) {
  const r = Ca.version;
  return typeof Ca.version != "string" || r.startsWith("18.")
    ? e?.ref
    : e?.props?.ref;
}
function F0(e) {
  var r,
    a,
    i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var s = e.length;
      for (r = 0; r < s; r++)
        e[r] && (a = F0(e[r])) && (i && (i += " "), (i += a));
    } else for (a in e) e[a] && (i && (i += " "), (i += a));
  return i;
}
function Pn() {
  for (var e, r, a = 0, i = "", s = arguments.length; a < s; a++)
    (e = arguments[a]) && (r = F0(e)) && (i && (i += " "), (i += r));
  return i;
}
const hC = {};
function pC(e) {
  const r = {};
  return (
    e.forEach((a) => {
      Object.entries(a).forEach(([i, s]) => {
        r[i] ? (r[i] = Pn(r[i], s)) : (r[i] = s);
      });
    }),
    r
  );
}
function Su({ theme: e, classNames: r, props: a, stylesCtx: i }) {
  const u = (Array.isArray(r) ? r : [r]).map((f) =>
    typeof f == "function" ? f(e, a, i) : f || hC,
  );
  return pC(u);
}
function lu({ theme: e, styles: r, props: a, stylesCtx: i }) {
  return (Array.isArray(r) ? r : [r]).reduce(
    (u, f) =>
      typeof f == "function" ? { ...u, ...f(e, a, i) } : { ...u, ...f },
    {},
  );
}
const Q0 = x.createContext(null);
function Wr() {
  const e = x.useContext(Q0);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function mC() {
  return Wr().cssVariablesResolver;
}
function gC() {
  return Wr().classNamesPrefix;
}
function th() {
  return Wr().getStyleNonce;
}
function yC() {
  return Wr().withStaticClasses;
}
function vC() {
  return Wr().headless;
}
function bC() {
  return Wr().stylesTransform?.sx;
}
function SC() {
  return Wr().stylesTransform?.styles;
}
function xu() {
  return Wr().env || "default";
}
function xC(e) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(e);
}
function wC(e) {
  let r = e.replace("#", "");
  if (r.length === 3) {
    const f = r.split("");
    r = [f[0], f[0], f[1], f[1], f[2], f[2]].join("");
  }
  if (r.length === 8) {
    const f = parseInt(r.slice(6, 8), 16) / 255;
    return {
      r: parseInt(r.slice(0, 2), 16),
      g: parseInt(r.slice(2, 4), 16),
      b: parseInt(r.slice(4, 6), 16),
      a: f,
    };
  }
  const a = parseInt(r, 16),
    i = (a >> 16) & 255,
    s = (a >> 8) & 255,
    u = a & 255;
  return { r: i, g: s, b: u, a: 1 };
}
function CC(e) {
  const [r, a, i, s] = e
    .replace(/[^0-9,./]/g, "")
    .split(/[/,]/)
    .map(Number);
  return { r, g: a, b: i, a: s === void 0 ? 1 : s };
}
function EC(e) {
  const r =
      /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,
    a = e.match(r);
  if (!a) return { r: 0, g: 0, b: 0, a: 1 };
  const i = parseInt(a[1], 10),
    s = parseInt(a[2], 10) / 100,
    u = parseInt(a[3], 10) / 100,
    f = a[5] ? parseFloat(a[5]) : void 0,
    h = (1 - Math.abs(2 * u - 1)) * s,
    p = i / 60,
    m = h * (1 - Math.abs((p % 2) - 1)),
    g = u - h / 2;
  let y, S, w;
  return (
    p >= 0 && p < 1
      ? ((y = h), (S = m), (w = 0))
      : p >= 1 && p < 2
        ? ((y = m), (S = h), (w = 0))
        : p >= 2 && p < 3
          ? ((y = 0), (S = h), (w = m))
          : p >= 3 && p < 4
            ? ((y = 0), (S = m), (w = h))
            : p >= 4 && p < 5
              ? ((y = m), (S = 0), (w = h))
              : ((y = h), (S = 0), (w = m)),
    {
      r: Math.round((y + g) * 255),
      g: Math.round((S + g) * 255),
      b: Math.round((w + g) * 255),
      a: f || 1,
    }
  );
}
function nh(e) {
  return xC(e)
    ? wC(e)
    : e.startsWith("rgb")
      ? CC(e)
      : e.startsWith("hsl")
        ? EC(e)
        : { r: 0, g: 0, b: 0, a: 1 };
}
function Vs(e, r) {
  if (e.startsWith("var("))
    return `color-mix(in srgb, ${e}, black ${r * 100}%)`;
  const { r: a, g: i, b: s, a: u } = nh(e),
    f = 1 - r,
    h = (p) => Math.round(p * f);
  return `rgba(${h(a)}, ${h(i)}, ${h(s)}, ${u})`;
}
function nl(e, r) {
  return typeof e.primaryShade == "number"
    ? e.primaryShade
    : r === "dark"
      ? e.primaryShade.dark
      : e.primaryShade.light;
}
function sd(e) {
  return e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
}
function _C(e) {
  const r = e.match(/oklch\((.*?)%\s/);
  return r ? parseFloat(r[1]) : null;
}
function RC(e) {
  if (e.startsWith("oklch(")) return (_C(e) || 0) / 100;
  const { r, g: a, b: i } = nh(e),
    s = r / 255,
    u = a / 255,
    f = i / 255,
    h = sd(s),
    p = sd(u),
    m = sd(f);
  return 0.2126 * h + 0.7152 * p + 0.0722 * m;
}
function Qi(e, r = 0.179) {
  return e.startsWith("var(") ? !1 : RC(e) > r;
}
function gl({ color: e, theme: r, colorScheme: a }) {
  if (typeof e != "string")
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof e}`,
    );
  if (e === "bright")
    return {
      color: e,
      value: a === "dark" ? r.white : r.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Qi(a === "dark" ? r.white : r.black, r.luminanceThreshold),
      variable: "--mantine-color-bright",
    };
  if (e === "dimmed")
    return {
      color: e,
      value: a === "dark" ? r.colors.dark[2] : r.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: Qi(
        a === "dark" ? r.colors.dark[2] : r.colors.gray[6],
        r.luminanceThreshold,
      ),
      variable: "--mantine-color-dimmed",
    };
  if (e === "white" || e === "black")
    return {
      color: e,
      value: e === "white" ? r.white : r.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Qi(e === "white" ? r.white : r.black, r.luminanceThreshold),
      variable: `--mantine-color-${e}`,
    };
  const [i, s] = e.split("."),
    u = s ? Number(s) : void 0,
    f = i in r.colors;
  if (f) {
    const h = u !== void 0 ? r.colors[i][u] : r.colors[i][nl(r, a || "light")];
    return {
      color: i,
      value: h,
      shade: u,
      isThemeColor: f,
      isLight: Qi(h, r.luminanceThreshold),
      variable: s ? `--mantine-color-${i}-${u}` : `--mantine-color-${i}-filled`,
    };
  }
  return {
    color: e,
    value: e,
    isThemeColor: f,
    isLight: Qi(e, r.luminanceThreshold),
    shade: u,
    variable: void 0,
  };
}
function rl(e, r) {
  const a = gl({ color: e || r.primaryColor, theme: r });
  return a.variable ? `var(${a.variable})` : e;
}
function wd(e, r) {
  const a = {
      from: e?.from || r.defaultGradient.from,
      to: e?.to || r.defaultGradient.to,
      deg: e?.deg ?? r.defaultGradient.deg ?? 0,
    },
    i = rl(a.from, r),
    s = rl(a.to, r);
  return `linear-gradient(${a.deg}deg, ${i} 0%, ${s} 100%)`;
}
function Wn(e, r) {
  if (typeof e != "string" || r > 1 || r < 0) return "rgba(0, 0, 0, 1)";
  if (e.startsWith("var(")) {
    const u = (1 - r) * 100;
    return `color-mix(in srgb, ${e}, transparent ${u}%)`;
  }
  if (e.startsWith("oklch"))
    return e.includes("/")
      ? e.replace(/\/\s*[\d.]+\s*\)/, `/ ${r})`)
      : e.replace(")", ` / ${r})`);
  const { r: a, g: i, b: s } = nh(e);
  return `rgba(${a}, ${i}, ${s}, ${r})`;
}
const xo = Wn,
  TC = ({ color: e, theme: r, variant: a, gradient: i, autoContrast: s }) => {
    const u = gl({ color: e, theme: r }),
      f = typeof s == "boolean" ? s : r.autoContrast;
    if (a === "none")
      return {
        background: "transparent",
        hover: "transparent",
        color: "inherit",
        border: "none",
      };
    if (a === "filled") {
      const h =
        f && u.isLight
          ? "var(--mantine-color-black)"
          : "var(--mantine-color-white)";
      return u.isThemeColor
        ? u.shade === void 0
          ? {
              background: `var(--mantine-color-${e}-filled)`,
              hover: `var(--mantine-color-${e}-filled-hover)`,
              color: h,
              border: `${K(1)} solid transparent`,
            }
          : {
              background: `var(--mantine-color-${u.color}-${u.shade})`,
              hover: `var(--mantine-color-${u.color}-${u.shade === 9 ? 8 : u.shade + 1})`,
              color: h,
              border: `${K(1)} solid transparent`,
            }
        : {
            background: e,
            hover: Vs(e, 0.1),
            color: h,
            border: `${K(1)} solid transparent`,
          };
    }
    if (a === "light") {
      if (u.isThemeColor) {
        if (u.shade === void 0)
          return {
            background: `var(--mantine-color-${e}-light)`,
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${K(1)} solid transparent`,
          };
        const h = r.colors[u.color][u.shade];
        return {
          background: Wn(h, 0.1),
          hover: Wn(h, 0.12),
          color: `var(--mantine-color-${u.color}-${Math.min(u.shade, 6)})`,
          border: `${K(1)} solid transparent`,
        };
      }
      return {
        background: Wn(e, 0.1),
        hover: Wn(e, 0.12),
        color: e,
        border: `${K(1)} solid transparent`,
      };
    }
    if (a === "outline")
      return u.isThemeColor
        ? u.shade === void 0
          ? {
              background: "transparent",
              hover: `var(--mantine-color-${e}-outline-hover)`,
              color: `var(--mantine-color-${e}-outline)`,
              border: `${K(1)} solid var(--mantine-color-${e}-outline)`,
            }
          : {
              background: "transparent",
              hover: Wn(r.colors[u.color][u.shade], 0.05),
              color: `var(--mantine-color-${u.color}-${u.shade})`,
              border: `${K(1)} solid var(--mantine-color-${u.color}-${u.shade})`,
            }
        : {
            background: "transparent",
            hover: Wn(e, 0.05),
            color: e,
            border: `${K(1)} solid ${e}`,
          };
    if (a === "subtle") {
      if (u.isThemeColor) {
        if (u.shade === void 0)
          return {
            background: "transparent",
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${K(1)} solid transparent`,
          };
        const h = r.colors[u.color][u.shade];
        return {
          background: "transparent",
          hover: Wn(h, 0.12),
          color: `var(--mantine-color-${u.color}-${Math.min(u.shade, 6)})`,
          border: `${K(1)} solid transparent`,
        };
      }
      return {
        background: "transparent",
        hover: Wn(e, 0.12),
        color: e,
        border: `${K(1)} solid transparent`,
      };
    }
    return a === "transparent"
      ? u.isThemeColor
        ? u.shade === void 0
          ? {
              background: "transparent",
              hover: "transparent",
              color: `var(--mantine-color-${e}-light-color)`,
              border: `${K(1)} solid transparent`,
            }
          : {
              background: "transparent",
              hover: "transparent",
              color: `var(--mantine-color-${u.color}-${Math.min(u.shade, 6)})`,
              border: `${K(1)} solid transparent`,
            }
        : {
            background: "transparent",
            hover: "transparent",
            color: e,
            border: `${K(1)} solid transparent`,
          }
      : a === "white"
        ? u.isThemeColor
          ? u.shade === void 0
            ? {
                background: "var(--mantine-color-white)",
                hover: Vs(r.white, 0.01),
                color: `var(--mantine-color-${e}-filled)`,
                border: `${K(1)} solid transparent`,
              }
            : {
                background: "var(--mantine-color-white)",
                hover: Vs(r.white, 0.01),
                color: `var(--mantine-color-${u.color}-${u.shade})`,
                border: `${K(1)} solid transparent`,
              }
          : {
              background: "var(--mantine-color-white)",
              hover: Vs(r.white, 0.01),
              color: e,
              border: `${K(1)} solid transparent`,
            }
        : a === "gradient"
          ? {
              background: wd(i, r),
              hover: wd(i, r),
              color: "var(--mantine-color-white)",
              border: "none",
            }
          : a === "default"
            ? {
                background: "var(--mantine-color-default)",
                hover: "var(--mantine-color-default-hover)",
                color: "var(--mantine-color-default-color)",
                border: `${K(1)} solid var(--mantine-color-default-border)`,
              }
            : {};
  },
  AC = {
    dark: [
      "#C9C9C9",
      "#b8b8b8",
      "#828282",
      "#696969",
      "#424242",
      "#3b3b3b",
      "#2e2e2e",
      "#242424",
      "#1f1f1f",
      "#141414",
    ],
    gray: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
    red: [
      "#fff5f5",
      "#ffe3e3",
      "#ffc9c9",
      "#ffa8a8",
      "#ff8787",
      "#ff6b6b",
      "#fa5252",
      "#f03e3e",
      "#e03131",
      "#c92a2a",
    ],
    pink: [
      "#fff0f6",
      "#ffdeeb",
      "#fcc2d7",
      "#faa2c1",
      "#f783ac",
      "#f06595",
      "#e64980",
      "#d6336c",
      "#c2255c",
      "#a61e4d",
    ],
    grape: [
      "#f8f0fc",
      "#f3d9fa",
      "#eebefa",
      "#e599f7",
      "#da77f2",
      "#cc5de8",
      "#be4bdb",
      "#ae3ec9",
      "#9c36b5",
      "#862e9c",
    ],
    violet: [
      "#f3f0ff",
      "#e5dbff",
      "#d0bfff",
      "#b197fc",
      "#9775fa",
      "#845ef7",
      "#7950f2",
      "#7048e8",
      "#6741d9",
      "#5f3dc4",
    ],
    indigo: [
      "#edf2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4c6ef5",
      "#4263eb",
      "#3b5bdb",
      "#364fc7",
    ],
    blue: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab",
    ],
    cyan: [
      "#e3fafc",
      "#c5f6fa",
      "#99e9f2",
      "#66d9e8",
      "#3bc9db",
      "#22b8cf",
      "#15aabf",
      "#1098ad",
      "#0c8599",
      "#0b7285",
    ],
    teal: [
      "#e6fcf5",
      "#c3fae8",
      "#96f2d7",
      "#63e6be",
      "#38d9a9",
      "#20c997",
      "#12b886",
      "#0ca678",
      "#099268",
      "#087f5b",
    ],
    green: [
      "#ebfbee",
      "#d3f9d8",
      "#b2f2bb",
      "#8ce99a",
      "#69db7c",
      "#51cf66",
      "#40c057",
      "#37b24d",
      "#2f9e44",
      "#2b8a3e",
    ],
    lime: [
      "#f4fce3",
      "#e9fac8",
      "#d8f5a2",
      "#c0eb75",
      "#a9e34b",
      "#94d82d",
      "#82c91e",
      "#74b816",
      "#66a80f",
      "#5c940d",
    ],
    yellow: [
      "#fff9db",
      "#fff3bf",
      "#ffec99",
      "#ffe066",
      "#ffd43b",
      "#fcc419",
      "#fab005",
      "#f59f00",
      "#f08c00",
      "#e67700",
    ],
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b",
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#d9480f",
    ],
  },
  sv =
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  wu = {
    scale: 1,
    fontSmoothing: !0,
    focusRing: "auto",
    white: "#fff",
    black: "#000",
    colors: AC,
    primaryShade: { light: 6, dark: 8 },
    primaryColor: "blue",
    variantColorResolver: TC,
    autoContrast: !1,
    luminanceThreshold: 0.3,
    fontFamily: sv,
    fontFamilyMonospace:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    respectReducedMotion: !1,
    cursorType: "default",
    defaultGradient: { from: "blue", to: "cyan", deg: 45 },
    defaultRadius: "sm",
    activeClassName: "mantine-active",
    focusClassName: "",
    headings: {
      fontFamily: sv,
      fontWeight: "700",
      textWrap: "wrap",
      sizes: {
        h1: { fontSize: K(34), lineHeight: "1.3" },
        h2: { fontSize: K(26), lineHeight: "1.35" },
        h3: { fontSize: K(22), lineHeight: "1.4" },
        h4: { fontSize: K(18), lineHeight: "1.45" },
        h5: { fontSize: K(16), lineHeight: "1.5" },
        h6: { fontSize: K(14), lineHeight: "1.5" },
      },
    },
    fontSizes: { xs: K(12), sm: K(14), md: K(16), lg: K(18), xl: K(20) },
    lineHeights: { xs: "1.4", sm: "1.45", md: "1.55", lg: "1.6", xl: "1.65" },
    radius: { xs: K(2), sm: K(4), md: K(8), lg: K(16), xl: K(32) },
    spacing: { xs: K(10), sm: K(12), md: K(16), lg: K(20), xl: K(32) },
    breakpoints: { xs: "36em", sm: "48em", md: "62em", lg: "75em", xl: "88em" },
    shadows: {
      xs: `0 ${K(1)} ${K(3)} rgba(0, 0, 0, 0.05), 0 ${K(1)} ${K(2)} rgba(0, 0, 0, 0.1)`,
      sm: `0 ${K(1)} ${K(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${K(10)} ${K(15)} ${K(-5)}, rgba(0, 0, 0, 0.04) 0 ${K(7)} ${K(7)} ${K(-5)}`,
      md: `0 ${K(1)} ${K(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${K(20)} ${K(25)} ${K(-5)}, rgba(0, 0, 0, 0.04) 0 ${K(10)} ${K(10)} ${K(-5)}`,
      lg: `0 ${K(1)} ${K(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${K(28)} ${K(23)} ${K(-7)}, rgba(0, 0, 0, 0.04) 0 ${K(12)} ${K(12)} ${K(-7)}`,
      xl: `0 ${K(1)} ${K(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${K(36)} ${K(28)} ${K(-7)}, rgba(0, 0, 0, 0.04) 0 ${K(17)} ${K(17)} ${K(-7)}`,
    },
    other: {},
    components: {},
  };
function uv(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function zC({ key: e = "mantine-color-scheme-value" } = {}) {
  let r;
  return {
    get: (a) => {
      if (typeof window > "u") return a;
      try {
        const i = window.localStorage.getItem(e);
        return uv(i) ? i : a;
      } catch {
        return a;
      }
    },
    set: (a) => {
      try {
        window.localStorage.setItem(e, a);
      } catch (i) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          i,
        );
      }
    },
    subscribe: (a) => {
      (r = (i) => {
        i.storageArea === window.localStorage &&
          i.key === e &&
          uv(i.newValue) &&
          a(i.newValue);
      }),
        window.addEventListener("storage", r);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", r);
    },
    clear: () => {
      window.localStorage.removeItem(e);
    },
  };
}
const OC =
    "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color",
  cv =
    "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function ud(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function fv(e) {
  if (!(e.primaryColor in e.colors)) throw new Error(OC);
  if (
    typeof e.primaryShade == "object" &&
    (!ud(e.primaryShade.dark) || !ud(e.primaryShade.light))
  )
    throw new Error(cv);
  if (typeof e.primaryShade == "number" && !ud(e.primaryShade))
    throw new Error(cv);
}
function X0(e, r) {
  if (!r) return fv(e), e;
  const a = Jd(e, r);
  return (
    r.fontFamily &&
      !r.headings?.fontFamily &&
      (a.headings.fontFamily = r.fontFamily),
    fv(a),
    a
  );
}
const rh = x.createContext(null),
  jC = () => x.useContext(rh) || wu;
function sn() {
  const e = x.useContext(rh);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app",
    );
  return e;
}
function K0({ theme: e, children: r, inherit: a = !0 }) {
  const i = jC(),
    s = x.useMemo(() => X0(a ? i : wu, e), [e, i, a]);
  return v.jsx(rh.Provider, { value: s, children: r });
}
K0.displayName = "@mantine/core/MantineThemeProvider";
function DC() {
  const e = sn(),
    r = th(),
    a = Jn(e.breakpoints).reduce((i, s) => {
      const u = e.breakpoints[s].includes("px"),
        f = q2(e.breakpoints[s]),
        h = u ? `${f - 0.1}px` : iv(f - 0.1),
        p = u ? `${f}px` : iv(f);
      return `${i}@media (max-width: ${h}) {.mantine-visible-from-${s} {display: none !important;}}@media (min-width: ${p}) {.mantine-hidden-from-${s} {display: none !important;}}`;
    }, "");
  return v.jsx("style", {
    "data-mantine-styles": "classes",
    nonce: r?.(),
    dangerouslySetInnerHTML: { __html: a },
  });
}
function cd(e) {
  return Object.entries(e)
    .map(([r, a]) => `${r}: ${a};`)
    .join("");
}
function Xi(e, r) {
  return (Array.isArray(e) ? e : [e]).reduce((i, s) => `${s}{${i}}`, r);
}
function NC(e, r) {
  const a = cd(e.variables),
    i = a ? Xi(r, a) : "",
    s = cd(e.dark),
    u = cd(e.light),
    f = s
      ? Xi(
          r === ":host"
            ? `${r}([data-mantine-color-scheme="dark"])`
            : `${r}[data-mantine-color-scheme="dark"]`,
          s,
        )
      : "",
    h = u
      ? Xi(
          r === ":host"
            ? `${r}([data-mantine-color-scheme="light"])`
            : `${r}[data-mantine-color-scheme="light"]`,
          u,
        )
      : "";
  return `${i}${f}${h}`;
}
function MC({ color: e, theme: r, autoContrast: a }) {
  return r.autoContrast && gl({ color: e || r.primaryColor, theme: r }).isLight
    ? "var(--mantine-color-black)"
    : "var(--mantine-color-white)";
}
function dv(e, r) {
  return MC({
    color: e.colors[e.primaryColor][nl(e, r)],
    theme: e,
    autoContrast: null,
  });
}
function qs({
  theme: e,
  color: r,
  colorScheme: a,
  name: i = r,
  withColorValues: s = !0,
}) {
  if (!e.colors[r]) return {};
  if (a === "light") {
    const h = nl(e, "light"),
      p = {
        [`--mantine-color-${i}-text`]: `var(--mantine-color-${i}-filled)`,
        [`--mantine-color-${i}-filled`]: `var(--mantine-color-${i}-${h})`,
        [`--mantine-color-${i}-filled-hover`]: `var(--mantine-color-${i}-${h === 9 ? 8 : h + 1})`,
        [`--mantine-color-${i}-light`]: xo(e.colors[r][h], 0.1),
        [`--mantine-color-${i}-light-hover`]: xo(e.colors[r][h], 0.12),
        [`--mantine-color-${i}-light-color`]: `var(--mantine-color-${i}-${h})`,
        [`--mantine-color-${i}-outline`]: `var(--mantine-color-${i}-${h})`,
        [`--mantine-color-${i}-outline-hover`]: xo(e.colors[r][h], 0.05),
      };
    return s
      ? {
          [`--mantine-color-${i}-0`]: e.colors[r][0],
          [`--mantine-color-${i}-1`]: e.colors[r][1],
          [`--mantine-color-${i}-2`]: e.colors[r][2],
          [`--mantine-color-${i}-3`]: e.colors[r][3],
          [`--mantine-color-${i}-4`]: e.colors[r][4],
          [`--mantine-color-${i}-5`]: e.colors[r][5],
          [`--mantine-color-${i}-6`]: e.colors[r][6],
          [`--mantine-color-${i}-7`]: e.colors[r][7],
          [`--mantine-color-${i}-8`]: e.colors[r][8],
          [`--mantine-color-${i}-9`]: e.colors[r][9],
          ...p,
        }
      : p;
  }
  const u = nl(e, "dark"),
    f = {
      [`--mantine-color-${i}-text`]: `var(--mantine-color-${i}-4)`,
      [`--mantine-color-${i}-filled`]: `var(--mantine-color-${i}-${u})`,
      [`--mantine-color-${i}-filled-hover`]: `var(--mantine-color-${i}-${u === 9 ? 8 : u + 1})`,
      [`--mantine-color-${i}-light`]: xo(e.colors[r][Math.max(0, u - 2)], 0.15),
      [`--mantine-color-${i}-light-hover`]: xo(
        e.colors[r][Math.max(0, u - 2)],
        0.2,
      ),
      [`--mantine-color-${i}-light-color`]: `var(--mantine-color-${i}-${Math.max(u - 5, 0)})`,
      [`--mantine-color-${i}-outline`]: `var(--mantine-color-${i}-${Math.max(u - 4, 0)})`,
      [`--mantine-color-${i}-outline-hover`]: xo(
        e.colors[r][Math.max(u - 4, 0)],
        0.05,
      ),
    };
  return s
    ? {
        [`--mantine-color-${i}-0`]: e.colors[r][0],
        [`--mantine-color-${i}-1`]: e.colors[r][1],
        [`--mantine-color-${i}-2`]: e.colors[r][2],
        [`--mantine-color-${i}-3`]: e.colors[r][3],
        [`--mantine-color-${i}-4`]: e.colors[r][4],
        [`--mantine-color-${i}-5`]: e.colors[r][5],
        [`--mantine-color-${i}-6`]: e.colors[r][6],
        [`--mantine-color-${i}-7`]: e.colors[r][7],
        [`--mantine-color-${i}-8`]: e.colors[r][8],
        [`--mantine-color-${i}-9`]: e.colors[r][9],
        ...f,
      }
    : f;
}
function $C(e) {
  return !!e && typeof e == "object" && "mantine-virtual-color" in e;
}
function wo(e, r, a) {
  Jn(r).forEach((i) => Object.assign(e, { [`--mantine-${a}-${i}`]: r[i] }));
}
const I0 = (e) => {
  const r = nl(e, "light"),
    a =
      e.defaultRadius in e.radius
        ? e.radius[e.defaultRadius]
        : K(e.defaultRadius),
    i = {
      variables: {
        "--mantine-scale": e.scale.toString(),
        "--mantine-cursor-type": e.cursorType,
        "--mantine-color-scheme": "light dark",
        "--mantine-webkit-font-smoothing": e.fontSmoothing
          ? "antialiased"
          : "unset",
        "--mantine-moz-font-smoothing": e.fontSmoothing ? "grayscale" : "unset",
        "--mantine-color-white": e.white,
        "--mantine-color-black": e.black,
        "--mantine-line-height": e.lineHeights.md,
        "--mantine-font-family": e.fontFamily,
        "--mantine-font-family-monospace": e.fontFamilyMonospace,
        "--mantine-font-family-headings": e.headings.fontFamily,
        "--mantine-heading-font-weight": e.headings.fontWeight,
        "--mantine-heading-text-wrap": e.headings.textWrap,
        "--mantine-radius-default": a,
        "--mantine-primary-color-filled": `var(--mantine-color-${e.primaryColor}-filled)`,
        "--mantine-primary-color-filled-hover": `var(--mantine-color-${e.primaryColor}-filled-hover)`,
        "--mantine-primary-color-light": `var(--mantine-color-${e.primaryColor}-light)`,
        "--mantine-primary-color-light-hover": `var(--mantine-color-${e.primaryColor}-light-hover)`,
        "--mantine-primary-color-light-color": `var(--mantine-color-${e.primaryColor}-light-color)`,
      },
      light: {
        "--mantine-primary-color-contrast": dv(e, "light"),
        "--mantine-color-bright": "var(--mantine-color-black)",
        "--mantine-color-text": e.black,
        "--mantine-color-body": e.white,
        "--mantine-color-error": "var(--mantine-color-red-6)",
        "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
        "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-${r})`,
        "--mantine-color-default": "var(--mantine-color-white)",
        "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
        "--mantine-color-default-color": "var(--mantine-color-black)",
        "--mantine-color-default-border": "var(--mantine-color-gray-4)",
        "--mantine-color-dimmed": "var(--mantine-color-gray-6)",
        "--mantine-color-disabled": "var(--mantine-color-gray-2)",
        "--mantine-color-disabled-color": "var(--mantine-color-gray-5)",
        "--mantine-color-disabled-border": "var(--mantine-color-gray-3)",
      },
      dark: {
        "--mantine-primary-color-contrast": dv(e, "dark"),
        "--mantine-color-bright": "var(--mantine-color-white)",
        "--mantine-color-text": "var(--mantine-color-dark-0)",
        "--mantine-color-body": "var(--mantine-color-dark-7)",
        "--mantine-color-error": "var(--mantine-color-red-8)",
        "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
        "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-4)`,
        "--mantine-color-default": "var(--mantine-color-dark-6)",
        "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
        "--mantine-color-default-color": "var(--mantine-color-white)",
        "--mantine-color-default-border": "var(--mantine-color-dark-4)",
        "--mantine-color-dimmed": "var(--mantine-color-dark-2)",
        "--mantine-color-disabled": "var(--mantine-color-dark-6)",
        "--mantine-color-disabled-color": "var(--mantine-color-dark-3)",
        "--mantine-color-disabled-border": "var(--mantine-color-dark-4)",
      },
    };
  wo(i.variables, e.breakpoints, "breakpoint"),
    wo(i.variables, e.spacing, "spacing"),
    wo(i.variables, e.fontSizes, "font-size"),
    wo(i.variables, e.lineHeights, "line-height"),
    wo(i.variables, e.shadows, "shadow"),
    wo(i.variables, e.radius, "radius"),
    e.colors[e.primaryColor].forEach((u, f) => {
      i.variables[`--mantine-primary-color-${f}`] =
        `var(--mantine-color-${e.primaryColor}-${f})`;
    }),
    Jn(e.colors).forEach((u) => {
      const f = e.colors[u];
      if ($C(f)) {
        Object.assign(
          i.light,
          qs({
            theme: e,
            name: f.name,
            color: f.light,
            colorScheme: "light",
            withColorValues: !0,
          }),
        ),
          Object.assign(
            i.dark,
            qs({
              theme: e,
              name: f.name,
              color: f.dark,
              colorScheme: "dark",
              withColorValues: !0,
            }),
          );
        return;
      }
      f.forEach((h, p) => {
        i.variables[`--mantine-color-${u}-${p}`] = h;
      }),
        Object.assign(
          i.light,
          qs({ theme: e, color: u, colorScheme: "light", withColorValues: !1 }),
        ),
        Object.assign(
          i.dark,
          qs({ theme: e, color: u, colorScheme: "dark", withColorValues: !1 }),
        );
    });
  const s = e.headings.sizes;
  return (
    Jn(s).forEach((u) => {
      (i.variables[`--mantine-${u}-font-size`] = s[u].fontSize),
        (i.variables[`--mantine-${u}-line-height`] = s[u].lineHeight),
        (i.variables[`--mantine-${u}-font-weight`] =
          s[u].fontWeight || e.headings.fontWeight);
    }),
    i
  );
};
function kC({ theme: e, generator: r }) {
  const a = I0(e),
    i = r?.(e);
  return i ? Jd(a, i) : a;
}
const fd = I0(wu);
function LC(e) {
  const r = { variables: {}, light: {}, dark: {} };
  return (
    Jn(e.variables).forEach((a) => {
      fd.variables[a] !== e.variables[a] && (r.variables[a] = e.variables[a]);
    }),
    Jn(e.light).forEach((a) => {
      fd.light[a] !== e.light[a] && (r.light[a] = e.light[a]);
    }),
    Jn(e.dark).forEach((a) => {
      fd.dark[a] !== e.dark[a] && (r.dark[a] = e.dark[a]);
    }),
    r
  );
}
function UC(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function W0({ cssVariablesSelector: e, deduplicateCssVariables: r }) {
  const a = sn(),
    i = th(),
    s = mC(),
    u = kC({ theme: a, generator: s }),
    f = e === ":root" && r,
    h = f ? LC(u) : u,
    p = NC(h, e);
  return p
    ? v.jsx("style", {
        "data-mantine-styles": !0,
        nonce: i?.(),
        dangerouslySetInnerHTML: { __html: `${p}${f ? "" : UC(e)}` },
      })
    : null;
}
W0.displayName = "@mantine/CssVariables";
function Co(e, r) {
  const a =
      typeof window < "u" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-color-scheme: dark)")?.matches,
    i = e !== "auto" ? e : a ? "dark" : "light";
  r()?.setAttribute("data-mantine-color-scheme", i);
}
function HC({
  manager: e,
  defaultColorScheme: r,
  getRootElement: a,
  forceColorScheme: i,
}) {
  const s = x.useRef(null),
    [u, f] = x.useState(() => e.get(r)),
    h = i || u,
    p = x.useCallback(
      (g) => {
        i || (Co(g, a), f(g), e.set(g));
      },
      [e.set, h, i],
    ),
    m = x.useCallback(() => {
      f(r), Co(r, a), e.clear();
    }, [e.clear, r]);
  return (
    x.useEffect(
      () => (e.subscribe(p), e.unsubscribe),
      [e.subscribe, e.unsubscribe],
    ),
    pl(() => {
      Co(e.get(r), a);
    }, []),
    x.useEffect(() => {
      if (i) return Co(i, a), () => {};
      i === void 0 && Co(u, a),
        typeof window < "u" &&
          "matchMedia" in window &&
          (s.current = window.matchMedia("(prefers-color-scheme: dark)"));
      const g = (y) => {
        u === "auto" && Co(y.matches ? "dark" : "light", a);
      };
      return (
        s.current?.addEventListener("change", g),
        () => s.current?.removeEventListener("change", g)
      );
    }, [u, i]),
    { colorScheme: h, setColorScheme: p, clearColorScheme: m }
  );
}
function BC({ respectReducedMotion: e, getRootElement: r }) {
  pl(() => {
    e && r()?.setAttribute("data-respect-reduced-motion", "true");
  }, [e]);
}
function J0({
  theme: e,
  children: r,
  getStyleNonce: a,
  withStaticClasses: i = !0,
  withGlobalClasses: s = !0,
  deduplicateCssVariables: u = !0,
  withCssVariables: f = !0,
  cssVariablesSelector: h = ":root",
  classNamesPrefix: p = "mantine",
  colorSchemeManager: m = zC(),
  defaultColorScheme: g = "light",
  getRootElement: y = () => document.documentElement,
  cssVariablesResolver: S,
  forceColorScheme: w,
  stylesTransform: E,
  env: T,
}) {
  const {
    colorScheme: R,
    setColorScheme: _,
    clearColorScheme: j,
  } = HC({
    defaultColorScheme: g,
    forceColorScheme: w,
    manager: m,
    getRootElement: y,
  });
  return (
    BC({
      respectReducedMotion: e?.respectReducedMotion || !1,
      getRootElement: y,
    }),
    v.jsx(Q0.Provider, {
      value: {
        colorScheme: R,
        setColorScheme: _,
        clearColorScheme: j,
        getRootElement: y,
        classNamesPrefix: p,
        getStyleNonce: a,
        cssVariablesResolver: S,
        cssVariablesSelector: h,
        withStaticClasses: i,
        stylesTransform: E,
        env: T,
      },
      children: v.jsxs(K0, {
        theme: e,
        children: [
          f &&
            v.jsx(W0, { cssVariablesSelector: h, deduplicateCssVariables: u }),
          s && v.jsx(DC, {}),
          r,
        ],
      }),
    })
  );
}
J0.displayName = "@mantine/core/MantineProvider";
function Uo({ classNames: e, styles: r, props: a, stylesCtx: i }) {
  const s = sn();
  return {
    resolvedClassNames: Su({
      theme: s,
      classNames: e,
      props: a,
      stylesCtx: i || void 0,
    }),
    resolvedStyles: lu({
      theme: s,
      styles: r,
      props: a,
      stylesCtx: i || void 0,
    }),
  };
}
const PC = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never",
};
function ZC({ theme: e, options: r, unstyled: a }) {
  return Pn(
    r?.focusable && !a && (e.focusClassName || PC[e.focusRing]),
    r?.active && !a && e.activeClassName,
  );
}
function VC({ selector: e, stylesCtx: r, options: a, props: i, theme: s }) {
  return Su({
    theme: s,
    classNames: a?.classNames,
    props: a?.props || i,
    stylesCtx: r,
  })[e];
}
function hv({ selector: e, stylesCtx: r, theme: a, classNames: i, props: s }) {
  return Su({ theme: a, classNames: i, props: s, stylesCtx: r })[e];
}
function qC({ rootSelector: e, selector: r, className: a }) {
  return e === r ? a : void 0;
}
function YC({ selector: e, classes: r, unstyled: a }) {
  return a ? void 0 : r[e];
}
function GC({
  themeName: e,
  classNamesPrefix: r,
  selector: a,
  withStaticClass: i,
}) {
  return i === !1 ? [] : e.map((s) => `${r}-${s}-${a}`);
}
function FC({ themeName: e, theme: r, selector: a, props: i, stylesCtx: s }) {
  return e.map(
    (u) =>
      Su({
        theme: r,
        classNames: r.components[u]?.classNames,
        props: i,
        stylesCtx: s,
      })?.[a],
  );
}
function QC({ options: e, classes: r, selector: a, unstyled: i }) {
  return e?.variant && !i ? r[`${a}--${e.variant}`] : void 0;
}
function XC({
  theme: e,
  options: r,
  themeName: a,
  selector: i,
  classNamesPrefix: s,
  classNames: u,
  classes: f,
  unstyled: h,
  className: p,
  rootSelector: m,
  props: g,
  stylesCtx: y,
  withStaticClasses: S,
  headless: w,
  transformedStyles: E,
}) {
  return Pn(
    ZC({ theme: e, options: r, unstyled: h || w }),
    FC({ theme: e, themeName: a, selector: i, props: g, stylesCtx: y }),
    QC({ options: r, classes: f, selector: i, unstyled: h }),
    hv({ selector: i, stylesCtx: y, theme: e, classNames: u, props: g }),
    hv({ selector: i, stylesCtx: y, theme: e, classNames: E, props: g }),
    VC({ selector: i, stylesCtx: y, options: r, props: g, theme: e }),
    qC({ rootSelector: m, selector: i, className: p }),
    YC({ selector: i, classes: f, unstyled: h || w }),
    S &&
      !w &&
      GC({
        themeName: a,
        classNamesPrefix: s,
        selector: i,
        withStaticClass: r?.withStaticClass,
      }),
    r?.className,
  );
}
function KC({ theme: e, themeName: r, props: a, stylesCtx: i, selector: s }) {
  return r
    .map(
      (u) =>
        lu({
          theme: e,
          styles: e.components[u]?.styles,
          props: a,
          stylesCtx: i,
        })[s],
    )
    .reduce((u, f) => ({ ...u, ...f }), {});
}
function Cd({ style: e, theme: r }) {
  return Array.isArray(e)
    ? [...e].reduce((a, i) => ({ ...a, ...Cd({ style: i, theme: r }) }), {})
    : typeof e == "function"
      ? e(r)
      : (e ?? {});
}
function IC(e) {
  return e.reduce(
    (r, a) => (
      a &&
        Object.keys(a).forEach((i) => {
          r[i] = { ...r[i], ...yu(a[i]) };
        }),
      r
    ),
    {},
  );
}
function WC({
  vars: e,
  varsResolver: r,
  theme: a,
  props: i,
  stylesCtx: s,
  selector: u,
  themeName: f,
  headless: h,
}) {
  return IC([
    h ? {} : r?.(a, i, s),
    ...f.map((p) => a.components?.[p]?.vars?.(a, i, s)),
    e?.(a, i, s),
  ])?.[u];
}
function JC({
  theme: e,
  themeName: r,
  selector: a,
  options: i,
  props: s,
  stylesCtx: u,
  rootSelector: f,
  styles: h,
  style: p,
  vars: m,
  varsResolver: g,
  headless: y,
  withStylesTransform: S,
}) {
  return {
    ...(!S &&
      KC({ theme: e, themeName: r, props: s, stylesCtx: u, selector: a })),
    ...(!S && lu({ theme: e, styles: h, props: s, stylesCtx: u })[a]),
    ...(!S &&
      lu({ theme: e, styles: i?.styles, props: i?.props || s, stylesCtx: u })[
        a
      ]),
    ...WC({
      theme: e,
      props: s,
      stylesCtx: u,
      vars: m,
      varsResolver: g,
      selector: a,
      themeName: r,
      headless: y,
    }),
    ...(f === a ? Cd({ style: p, theme: e }) : null),
    ...Cd({ style: i?.style, theme: e }),
  };
}
function eE({ props: e, stylesCtx: r, themeName: a }) {
  const i = sn(),
    s = SC()?.();
  return {
    getTransformedStyles: (f) =>
      s
        ? [
            ...f.map((p) => s(p, { props: e, theme: i, ctx: r })),
            ...a.map((p) =>
              s(i.components[p]?.styles, { props: e, theme: i, ctx: r }),
            ),
          ].filter(Boolean)
        : [],
    withStylesTransform: !!s,
  };
}
function Ee({
  name: e,
  classes: r,
  props: a,
  stylesCtx: i,
  className: s,
  style: u,
  rootSelector: f = "root",
  unstyled: h,
  classNames: p,
  styles: m,
  vars: g,
  varsResolver: y,
}) {
  const S = sn(),
    w = gC(),
    E = yC(),
    T = vC(),
    R = (Array.isArray(e) ? e : [e]).filter((A) => A),
    { withStylesTransform: _, getTransformedStyles: j } = eE({
      props: a,
      stylesCtx: i,
      themeName: R,
    });
  return (A, D) => ({
    className: XC({
      theme: S,
      options: D,
      themeName: R,
      selector: A,
      classNamesPrefix: w,
      classNames: p,
      classes: r,
      unstyled: h,
      className: s,
      rootSelector: f,
      props: a,
      stylesCtx: i,
      withStaticClasses: E,
      headless: T,
      transformedStyles: j([D?.styles, m]),
    }),
    style: JC({
      theme: S,
      themeName: R,
      selector: A,
      options: D,
      props: a,
      stylesCtx: i,
      rootSelector: f,
      styles: m,
      style: u,
      vars: g,
      varsResolver: y,
      headless: T,
      withStylesTransform: _,
    }),
  });
}
function ae(e, r, a) {
  const i = sn(),
    s = i.components[e]?.defaultProps,
    u = typeof s == "function" ? s(i) : s;
  return { ...r, ...u, ...yu(a) };
}
function dd(e) {
  return Jn(e)
    .reduce((r, a) => (e[a] !== void 0 ? `${r}${Z2(a)}:${e[a]};` : r), "")
    .trim();
}
function tE({ selector: e, styles: r, media: a, container: i }) {
  const s = r ? dd(r) : "",
    u = Array.isArray(a)
      ? a.map((h) => `@media${h.query}{${e}{${dd(h.styles)}}}`)
      : [],
    f = Array.isArray(i)
      ? i.map((h) => `@container ${h.query}{${e}{${dd(h.styles)}}}`)
      : [];
  return `${s ? `${e}{${s}}` : ""}${u.join("")}${f.join("")}`.trim();
}
function eb(e) {
  const r = th();
  return v.jsx("style", {
    "data-mantine-styles": "inline",
    nonce: r?.(),
    dangerouslySetInnerHTML: { __html: tE(e) },
  });
}
function yl(e) {
  const {
    m: r,
    mx: a,
    my: i,
    mt: s,
    mb: u,
    ml: f,
    mr: h,
    me: p,
    ms: m,
    p: g,
    px: y,
    py: S,
    pt: w,
    pb: E,
    pl: T,
    pr: R,
    pe: _,
    ps: j,
    bd: A,
    bdrs: D,
    bg: U,
    c: k,
    opacity: Z,
    ff: V,
    fz: W,
    fw: ee,
    lts: pe,
    ta: oe,
    lh: ce,
    fs: fe,
    tt: le,
    td: M,
    w: Q,
    miw: Y,
    maw: re,
    h: O,
    mih: G,
    mah: ne,
    bgsz: J,
    bgp: ie,
    bgr: me,
    bga: de,
    pos: te,
    top: ue,
    left: Ae,
    bottom: Ve,
    right: Ie,
    inset: St,
    display: qe,
    flex: xt,
    hiddenFrom: un,
    visibleFrom: qn,
    lightHidden: ft,
    darkHidden: it,
    sx: _n,
    ...Yn
  } = e;
  return {
    styleProps: yu({
      m: r,
      mx: a,
      my: i,
      mt: s,
      mb: u,
      ml: f,
      mr: h,
      me: p,
      ms: m,
      p: g,
      px: y,
      py: S,
      pt: w,
      pb: E,
      pl: T,
      pr: R,
      pe: _,
      ps: j,
      bd: A,
      bg: U,
      c: k,
      opacity: Z,
      ff: V,
      fz: W,
      fw: ee,
      lts: pe,
      ta: oe,
      lh: ce,
      fs: fe,
      tt: le,
      td: M,
      w: Q,
      miw: Y,
      maw: re,
      h: O,
      mih: G,
      mah: ne,
      bgsz: J,
      bgp: ie,
      bgr: me,
      bga: de,
      pos: te,
      top: ue,
      left: Ae,
      bottom: Ve,
      right: Ie,
      inset: St,
      display: qe,
      flex: xt,
      bdrs: D,
      hiddenFrom: un,
      visibleFrom: qn,
      lightHidden: ft,
      darkHidden: it,
      sx: _n,
    }),
    rest: Yn,
  };
}
const nE = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bdrs: { type: "radius", property: "borderRadius" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" },
};
function ah(e, r) {
  const a = gl({ color: e, theme: r });
  return a.color === "dimmed"
    ? "var(--mantine-color-dimmed)"
    : a.color === "bright"
      ? "var(--mantine-color-bright)"
      : a.variable
        ? `var(${a.variable})`
        : a.color;
}
function rE(e, r) {
  const a = gl({ color: e, theme: r });
  return a.isThemeColor && a.shade === void 0
    ? `var(--mantine-color-${a.color}-text)`
    : ah(e, r);
}
function aE(e, r) {
  if (typeof e == "number") return K(e);
  if (typeof e == "string") {
    const [a, i, ...s] = e.split(" ").filter((f) => f.trim() !== "");
    let u = `${K(a)}`;
    return (
      i && (u += ` ${i}`),
      s.length > 0 && (u += ` ${ah(s.join(" "), r)}`),
      u.trim()
    );
  }
  return e;
}
const pv = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)",
};
function oE(e) {
  return typeof e == "string" && e in pv ? pv[e] : e;
}
const iE = ["h1", "h2", "h3", "h4", "h5", "h6"];
function lE(e, r) {
  return typeof e == "string" && e in r.fontSizes
    ? `var(--mantine-font-size-${e})`
    : typeof e == "string" && iE.includes(e)
      ? `var(--mantine-${e}-font-size)`
      : typeof e == "number" || typeof e == "string"
        ? K(e)
        : e;
}
function sE(e) {
  return e;
}
const uE = ["h1", "h2", "h3", "h4", "h5", "h6"];
function cE(e, r) {
  return typeof e == "string" && e in r.lineHeights
    ? `var(--mantine-line-height-${e})`
    : typeof e == "string" && uE.includes(e)
      ? `var(--mantine-${e}-line-height)`
      : e;
}
function fE(e, r) {
  return typeof e == "string" && e in r.radius
    ? `var(--mantine-radius-${e})`
    : typeof e == "number" || typeof e == "string"
      ? K(e)
      : e;
}
function dE(e) {
  return typeof e == "number" ? K(e) : e;
}
function hE(e, r) {
  if (typeof e == "number") return K(e);
  if (typeof e == "string") {
    const a = e.replace("-", "");
    if (!(a in r.spacing)) return K(e);
    const i = `--mantine-spacing-${a}`;
    return e.startsWith("-") ? `calc(var(${i}) * -1)` : `var(${i})`;
  }
  return e;
}
const hd = {
  color: ah,
  textColor: rE,
  fontSize: lE,
  spacing: hE,
  radius: fE,
  identity: sE,
  size: dE,
  lineHeight: cE,
  fontFamily: oE,
  border: aE,
};
function mv(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function pE({ media: e, ...r }) {
  const i = Object.keys(e)
    .sort((s, u) => Number(mv(s)) - Number(mv(u)))
    .map((s) => ({ query: s, styles: e[s] }));
  return { ...r, media: i };
}
function mE(e) {
  if (typeof e != "object" || e === null) return !1;
  const r = Object.keys(e);
  return !(r.length === 1 && r[0] === "base");
}
function gE(e) {
  return typeof e == "object" && e !== null
    ? "base" in e
      ? e.base
      : void 0
    : e;
}
function yE(e) {
  return typeof e == "object" && e !== null
    ? Jn(e).filter((r) => r !== "base")
    : [];
}
function vE(e, r) {
  return typeof e == "object" && e !== null && r in e ? e[r] : e;
}
function tb({ styleProps: e, data: r, theme: a }) {
  return pE(
    Jn(e).reduce(
      (i, s) => {
        if (s === "hiddenFrom" || s === "visibleFrom" || s === "sx") return i;
        const u = r[s],
          f = Array.isArray(u.property) ? u.property : [u.property],
          h = gE(e[s]);
        if (!mE(e[s]))
          return (
            f.forEach((m) => {
              i.inlineStyles[m] = hd[u.type](h, a);
            }),
            i
          );
        i.hasResponsiveStyles = !0;
        const p = yE(e[s]);
        return (
          f.forEach((m) => {
            h != null && (i.styles[m] = hd[u.type](h, a)),
              p.forEach((g) => {
                const y = `(min-width: ${a.breakpoints[g]})`;
                i.media[y] = { ...i.media[y], [m]: hd[u.type](vE(e[s], g), a) };
              });
          }),
          i
        );
      },
      { hasResponsiveStyles: !1, styles: {}, inlineStyles: {}, media: {} },
    ),
  );
}
function nb() {
  return `__m__-${x.useId().replace(/:/g, "")}`;
}
function rb(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function bE(e) {
  return Object.keys(e).reduce((r, a) => {
    const i = e[a];
    return (
      i === void 0 || i === "" || i === !1 || i === null || (r[rb(a)] = e[a]), r
    );
  }, {});
}
function ab(e) {
  return e
    ? typeof e == "string"
      ? { [rb(e)]: !0 }
      : Array.isArray(e)
        ? [...e].reduce((r, a) => ({ ...r, ...ab(a) }), {})
        : bE(e)
    : null;
}
function Ed(e, r) {
  return Array.isArray(e)
    ? [...e].reduce((a, i) => ({ ...a, ...Ed(i, r) }), {})
    : typeof e == "function"
      ? e(r)
      : (e ?? {});
}
function SE({ theme: e, style: r, vars: a, styleProps: i }) {
  const s = Ed(r, e),
    u = Ed(a, e);
  return { ...s, ...u, ...i };
}
const ob = x.forwardRef(
  (
    {
      component: e,
      style: r,
      __vars: a,
      className: i,
      variant: s,
      mod: u,
      size: f,
      hiddenFrom: h,
      visibleFrom: p,
      lightHidden: m,
      darkHidden: g,
      renderRoot: y,
      __size: S,
      ...w
    },
    E,
  ) => {
    const T = sn(),
      R = e || "div",
      { styleProps: _, rest: j } = yl(w),
      D = bC()?.()?.(_.sx),
      U = nb(),
      k = tb({ styleProps: _, theme: T, data: nE }),
      Z = {
        ref: E,
        style: SE({ theme: T, style: r, vars: a, styleProps: k.inlineStyles }),
        className: Pn(i, D, {
          [U]: k.hasResponsiveStyles,
          "mantine-light-hidden": m,
          "mantine-dark-hidden": g,
          [`mantine-hidden-from-${h}`]: h,
          [`mantine-visible-from-${p}`]: p,
        }),
        "data-variant": s,
        "data-size": P0(f) ? void 0 : f || void 0,
        size: S,
        ...ab(u),
        ...j,
      };
    return v.jsxs(v.Fragment, {
      children: [
        k.hasResponsiveStyles &&
          v.jsx(eb, { selector: `.${U}`, styles: k.styles, media: k.media }),
        typeof y == "function" ? y(Z) : v.jsx(R, { ...Z }),
      ],
    });
  },
);
ob.displayName = "@mantine/core/Box";
const ge = ob;
function ib(e) {
  return e;
}
function Se(e) {
  const r = x.forwardRef(e);
  return (
    (r.extend = ib),
    (r.withProps = (a) => {
      const i = x.forwardRef((s, u) => v.jsx(r, { ...a, ...s, ref: u }));
      return (
        (i.extend = r.extend),
        (i.displayName = `WithProps(${r.displayName})`),
        i
      );
    }),
    r
  );
}
function Kt(e) {
  const r = x.forwardRef(e);
  return (
    (r.withProps = (a) => {
      const i = x.forwardRef((s, u) => v.jsx(r, { ...a, ...s, ref: u }));
      return (
        (i.extend = r.extend),
        (i.displayName = `WithProps(${r.displayName})`),
        i
      );
    }),
    (r.extend = ib),
    r
  );
}
const xE = x.createContext({
  dir: "ltr",
  toggleDirection: () => {},
  setDirection: () => {},
});
function oh() {
  return x.useContext(xE);
}
var ih = E0();
const wE = qd(ih);
function Cu() {
  return typeof window < "u";
}
function Ho(e) {
  return lb(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ln(e) {
  var r;
  return (
    (e == null || (r = e.ownerDocument) == null ? void 0 : r.defaultView) ||
    window
  );
}
function rr(e) {
  var r;
  return (r = (lb(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : r.documentElement;
}
function lb(e) {
  return Cu() ? e instanceof Node || e instanceof ln(e).Node : !1;
}
function Bt(e) {
  return Cu() ? e instanceof Element || e instanceof ln(e).Element : !1;
}
function tr(e) {
  return Cu() ? e instanceof HTMLElement || e instanceof ln(e).HTMLElement : !1;
}
function gv(e) {
  return !Cu() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof ln(e).ShadowRoot;
}
const CE = new Set(["inline", "contents"]);
function vl(e) {
  const { overflow: r, overflowX: a, overflowY: i, display: s } = $n(e);
  return /auto|scroll|overlay|hidden|clip/.test(r + i + a) && !CE.has(s);
}
const EE = new Set(["table", "td", "th"]);
function _E(e) {
  return EE.has(Ho(e));
}
const RE = [":popover-open", ":modal"];
function Eu(e) {
  return RE.some((r) => {
    try {
      return e.matches(r);
    } catch {
      return !1;
    }
  });
}
const TE = ["transform", "translate", "scale", "rotate", "perspective"],
  AE = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  zE = ["paint", "layout", "strict", "content"];
function lh(e) {
  const r = sh(),
    a = Bt(e) ? $n(e) : e;
  return (
    TE.some((i) => (a[i] ? a[i] !== "none" : !1)) ||
    (a.containerType ? a.containerType !== "normal" : !1) ||
    (!r && (a.backdropFilter ? a.backdropFilter !== "none" : !1)) ||
    (!r && (a.filter ? a.filter !== "none" : !1)) ||
    AE.some((i) => (a.willChange || "").includes(i)) ||
    zE.some((i) => (a.contain || "").includes(i))
  );
}
function OE(e) {
  let r = Kr(e);
  for (; tr(r) && !Ao(r); ) {
    if (lh(r)) return r;
    if (Eu(r)) return null;
    r = Kr(r);
  }
  return null;
}
function sh() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const jE = new Set(["html", "body", "#document"]);
function Ao(e) {
  return jE.has(Ho(e));
}
function $n(e) {
  return ln(e).getComputedStyle(e);
}
function _u(e) {
  return Bt(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Kr(e) {
  if (Ho(e) === "html") return e;
  const r = e.assignedSlot || e.parentNode || (gv(e) && e.host) || rr(e);
  return gv(r) ? r.host : r;
}
function sb(e) {
  const r = Kr(e);
  return Ao(r)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : tr(r) && vl(r)
      ? r
      : sb(r);
}
function al(e, r, a) {
  var i;
  r === void 0 && (r = []), a === void 0 && (a = !0);
  const s = sb(e),
    u = s === ((i = e.ownerDocument) == null ? void 0 : i.body),
    f = ln(s);
  if (u) {
    const h = _d(f);
    return r.concat(
      f,
      f.visualViewport || [],
      vl(s) ? s : [],
      h && a ? al(h) : [],
    );
  }
  return r.concat(s, al(s, [], a));
}
function _d(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
const DE = ["top", "right", "bottom", "left"],
  kn = Math.min,
  Nt = Math.max,
  su = Math.round,
  Ys = Math.floor,
  er = (e) => ({ x: e, y: e }),
  NE = { left: "right", right: "left", bottom: "top", top: "bottom" },
  ME = { start: "end", end: "start" };
function Rd(e, r, a) {
  return Nt(e, kn(r, a));
}
function nr(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Ln(e) {
  return e.split("-")[0];
}
function Bo(e) {
  return e.split("-")[1];
}
function uh(e) {
  return e === "x" ? "y" : "x";
}
function ch(e) {
  return e === "y" ? "height" : "width";
}
const $E = new Set(["top", "bottom"]);
function jn(e) {
  return $E.has(Ln(e)) ? "y" : "x";
}
function fh(e) {
  return uh(jn(e));
}
function kE(e, r, a) {
  a === void 0 && (a = !1);
  const i = Bo(e),
    s = fh(e),
    u = ch(s);
  let f =
    s === "x"
      ? i === (a ? "end" : "start")
        ? "right"
        : "left"
      : i === "start"
        ? "bottom"
        : "top";
  return r.reference[u] > r.floating[u] && (f = uu(f)), [f, uu(f)];
}
function LE(e) {
  const r = uu(e);
  return [Td(e), r, Td(r)];
}
function Td(e) {
  return e.replace(/start|end/g, (r) => ME[r]);
}
const yv = ["left", "right"],
  vv = ["right", "left"],
  UE = ["top", "bottom"],
  HE = ["bottom", "top"];
function BE(e, r, a) {
  switch (e) {
    case "top":
    case "bottom":
      return a ? (r ? vv : yv) : r ? yv : vv;
    case "left":
    case "right":
      return r ? UE : HE;
    default:
      return [];
  }
}
function PE(e, r, a, i) {
  const s = Bo(e);
  let u = BE(Ln(e), a === "start", i);
  return (
    s && ((u = u.map((f) => f + "-" + s)), r && (u = u.concat(u.map(Td)))), u
  );
}
function uu(e) {
  return e.replace(/left|right|bottom|top/g, (r) => NE[r]);
}
function ZE(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function dh(e) {
  return typeof e != "number"
    ? ZE(e)
    : { top: e, right: e, bottom: e, left: e };
}
function zo(e) {
  const { x: r, y: a, width: i, height: s } = e;
  return {
    width: i,
    height: s,
    top: a,
    left: r,
    right: r + i,
    bottom: a + s,
    x: r,
    y: a,
  };
}
function bv(e, r, a) {
  let { reference: i, floating: s } = e;
  const u = jn(r),
    f = fh(r),
    h = ch(f),
    p = Ln(r),
    m = u === "y",
    g = i.x + i.width / 2 - s.width / 2,
    y = i.y + i.height / 2 - s.height / 2,
    S = i[h] / 2 - s[h] / 2;
  let w;
  switch (p) {
    case "top":
      w = { x: g, y: i.y - s.height };
      break;
    case "bottom":
      w = { x: g, y: i.y + i.height };
      break;
    case "right":
      w = { x: i.x + i.width, y };
      break;
    case "left":
      w = { x: i.x - s.width, y };
      break;
    default:
      w = { x: i.x, y: i.y };
  }
  switch (Bo(r)) {
    case "start":
      w[f] -= S * (a && m ? -1 : 1);
      break;
    case "end":
      w[f] += S * (a && m ? -1 : 1);
      break;
  }
  return w;
}
const VE = async (e, r, a) => {
  const {
      placement: i = "bottom",
      strategy: s = "absolute",
      middleware: u = [],
      platform: f,
    } = a,
    h = u.filter(Boolean),
    p = await (f.isRTL == null ? void 0 : f.isRTL(r));
  let m = await f.getElementRects({ reference: e, floating: r, strategy: s }),
    { x: g, y } = bv(m, i, p),
    S = i,
    w = {},
    E = 0;
  for (let T = 0; T < h.length; T++) {
    const { name: R, fn: _ } = h[T],
      {
        x: j,
        y: A,
        data: D,
        reset: U,
      } = await _({
        x: g,
        y,
        initialPlacement: i,
        placement: S,
        strategy: s,
        middlewareData: w,
        rects: m,
        platform: f,
        elements: { reference: e, floating: r },
      });
    (g = j ?? g),
      (y = A ?? y),
      (w = { ...w, [R]: { ...w[R], ...D } }),
      U &&
        E <= 50 &&
        (E++,
        typeof U == "object" &&
          (U.placement && (S = U.placement),
          U.rects &&
            (m =
              U.rects === !0
                ? await f.getElementRects({
                    reference: e,
                    floating: r,
                    strategy: s,
                  })
                : U.rects),
          ({ x: g, y } = bv(m, S, p))),
        (T = -1));
  }
  return { x: g, y, placement: S, strategy: s, middlewareData: w };
};
async function ol(e, r) {
  var a;
  r === void 0 && (r = {});
  const { x: i, y: s, platform: u, rects: f, elements: h, strategy: p } = e,
    {
      boundary: m = "clippingAncestors",
      rootBoundary: g = "viewport",
      elementContext: y = "floating",
      altBoundary: S = !1,
      padding: w = 0,
    } = nr(r, e),
    E = dh(w),
    R = h[S ? (y === "floating" ? "reference" : "floating") : y],
    _ = zo(
      await u.getClippingRect({
        element:
          (a = await (u.isElement == null ? void 0 : u.isElement(R))) == null ||
          a
            ? R
            : R.contextElement ||
              (await (u.getDocumentElement == null
                ? void 0
                : u.getDocumentElement(h.floating))),
        boundary: m,
        rootBoundary: g,
        strategy: p,
      }),
    ),
    j =
      y === "floating"
        ? { x: i, y: s, width: f.floating.width, height: f.floating.height }
        : f.reference,
    A = await (u.getOffsetParent == null
      ? void 0
      : u.getOffsetParent(h.floating)),
    D = (await (u.isElement == null ? void 0 : u.isElement(A)))
      ? (await (u.getScale == null ? void 0 : u.getScale(A))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    U = zo(
      u.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: h,
            rect: j,
            offsetParent: A,
            strategy: p,
          })
        : j,
    );
  return {
    top: (_.top - U.top + E.top) / D.y,
    bottom: (U.bottom - _.bottom + E.bottom) / D.y,
    left: (_.left - U.left + E.left) / D.x,
    right: (U.right - _.right + E.right) / D.x,
  };
}
const qE = (e) => ({
    name: "arrow",
    options: e,
    async fn(r) {
      const {
          x: a,
          y: i,
          placement: s,
          rects: u,
          platform: f,
          elements: h,
          middlewareData: p,
        } = r,
        { element: m, padding: g = 0 } = nr(e, r) || {};
      if (m == null) return {};
      const y = dh(g),
        S = { x: a, y: i },
        w = fh(s),
        E = ch(w),
        T = await f.getDimensions(m),
        R = w === "y",
        _ = R ? "top" : "left",
        j = R ? "bottom" : "right",
        A = R ? "clientHeight" : "clientWidth",
        D = u.reference[E] + u.reference[w] - S[w] - u.floating[E],
        U = S[w] - u.reference[w],
        k = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m));
      let Z = k ? k[A] : 0;
      (!Z || !(await (f.isElement == null ? void 0 : f.isElement(k)))) &&
        (Z = h.floating[A] || u.floating[E]);
      const V = D / 2 - U / 2,
        W = Z / 2 - T[E] / 2 - 1,
        ee = kn(y[_], W),
        pe = kn(y[j], W),
        oe = ee,
        ce = Z - T[E] - pe,
        fe = Z / 2 - T[E] / 2 + V,
        le = Rd(oe, fe, ce),
        M =
          !p.arrow &&
          Bo(s) != null &&
          fe !== le &&
          u.reference[E] / 2 - (fe < oe ? ee : pe) - T[E] / 2 < 0,
        Q = M ? (fe < oe ? fe - oe : fe - ce) : 0;
      return {
        [w]: S[w] + Q,
        data: {
          [w]: le,
          centerOffset: fe - le - Q,
          ...(M && { alignmentOffset: Q }),
        },
        reset: M,
      };
    },
  }),
  YE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(r) {
          var a, i;
          const {
              placement: s,
              middlewareData: u,
              rects: f,
              initialPlacement: h,
              platform: p,
              elements: m,
            } = r,
            {
              mainAxis: g = !0,
              crossAxis: y = !0,
              fallbackPlacements: S,
              fallbackStrategy: w = "bestFit",
              fallbackAxisSideDirection: E = "none",
              flipAlignment: T = !0,
              ...R
            } = nr(e, r);
          if ((a = u.arrow) != null && a.alignmentOffset) return {};
          const _ = Ln(s),
            j = jn(h),
            A = Ln(h) === h,
            D = await (p.isRTL == null ? void 0 : p.isRTL(m.floating)),
            U = S || (A || !T ? [uu(h)] : LE(h)),
            k = E !== "none";
          !S && k && U.push(...PE(h, T, E, D));
          const Z = [h, ...U],
            V = await ol(r, R),
            W = [];
          let ee = ((i = u.flip) == null ? void 0 : i.overflows) || [];
          if ((g && W.push(V[_]), y)) {
            const fe = kE(s, f, D);
            W.push(V[fe[0]], V[fe[1]]);
          }
          if (
            ((ee = [...ee, { placement: s, overflows: W }]),
            !W.every((fe) => fe <= 0))
          ) {
            var pe, oe;
            const fe = (((pe = u.flip) == null ? void 0 : pe.index) || 0) + 1,
              le = Z[fe];
            if (
              le &&
              (!(y === "alignment" ? j !== jn(le) : !1) ||
                ee.every((Y) => Y.overflows[0] > 0 && jn(Y.placement) === j))
            )
              return {
                data: { index: fe, overflows: ee },
                reset: { placement: le },
              };
            let M =
              (oe = ee
                .filter((Q) => Q.overflows[0] <= 0)
                .sort((Q, Y) => Q.overflows[1] - Y.overflows[1])[0]) == null
                ? void 0
                : oe.placement;
            if (!M)
              switch (w) {
                case "bestFit": {
                  var ce;
                  const Q =
                    (ce = ee
                      .filter((Y) => {
                        if (k) {
                          const re = jn(Y.placement);
                          return re === j || re === "y";
                        }
                        return !0;
                      })
                      .map((Y) => [
                        Y.placement,
                        Y.overflows
                          .filter((re) => re > 0)
                          .reduce((re, O) => re + O, 0),
                      ])
                      .sort((Y, re) => Y[1] - re[1])[0]) == null
                      ? void 0
                      : ce[0];
                  Q && (M = Q);
                  break;
                }
                case "initialPlacement":
                  M = h;
                  break;
              }
            if (s !== M) return { reset: { placement: M } };
          }
          return {};
        },
      }
    );
  };
function Sv(e, r) {
  return {
    top: e.top - r.height,
    right: e.right - r.width,
    bottom: e.bottom - r.height,
    left: e.left - r.width,
  };
}
function xv(e) {
  return DE.some((r) => e[r] >= 0);
}
const GE = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "hide",
      options: e,
      async fn(r) {
        const { rects: a } = r,
          { strategy: i = "referenceHidden", ...s } = nr(e, r);
        switch (i) {
          case "referenceHidden": {
            const u = await ol(r, { ...s, elementContext: "reference" }),
              f = Sv(u, a.reference);
            return {
              data: { referenceHiddenOffsets: f, referenceHidden: xv(f) },
            };
          }
          case "escaped": {
            const u = await ol(r, { ...s, altBoundary: !0 }),
              f = Sv(u, a.floating);
            return { data: { escapedOffsets: f, escaped: xv(f) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
function ub(e) {
  const r = kn(...e.map((u) => u.left)),
    a = kn(...e.map((u) => u.top)),
    i = Nt(...e.map((u) => u.right)),
    s = Nt(...e.map((u) => u.bottom));
  return { x: r, y: a, width: i - r, height: s - a };
}
function FE(e) {
  const r = e.slice().sort((s, u) => s.y - u.y),
    a = [];
  let i = null;
  for (let s = 0; s < r.length; s++) {
    const u = r[s];
    !i || u.y - i.y > i.height / 2 ? a.push([u]) : a[a.length - 1].push(u),
      (i = u);
  }
  return a.map((s) => zo(ub(s)));
}
const QE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "inline",
        options: e,
        async fn(r) {
          const {
              placement: a,
              elements: i,
              rects: s,
              platform: u,
              strategy: f,
            } = r,
            { padding: h = 2, x: p, y: m } = nr(e, r),
            g = Array.from(
              (await (u.getClientRects == null
                ? void 0
                : u.getClientRects(i.reference))) || [],
            ),
            y = FE(g),
            S = zo(ub(g)),
            w = dh(h);
          function E() {
            if (
              y.length === 2 &&
              y[0].left > y[1].right &&
              p != null &&
              m != null
            )
              return (
                y.find(
                  (R) =>
                    p > R.left - w.left &&
                    p < R.right + w.right &&
                    m > R.top - w.top &&
                    m < R.bottom + w.bottom,
                ) || S
              );
            if (y.length >= 2) {
              if (jn(a) === "y") {
                const ee = y[0],
                  pe = y[y.length - 1],
                  oe = Ln(a) === "top",
                  ce = ee.top,
                  fe = pe.bottom,
                  le = oe ? ee.left : pe.left,
                  M = oe ? ee.right : pe.right,
                  Q = M - le,
                  Y = fe - ce;
                return {
                  top: ce,
                  bottom: fe,
                  left: le,
                  right: M,
                  width: Q,
                  height: Y,
                  x: le,
                  y: ce,
                };
              }
              const R = Ln(a) === "left",
                _ = Nt(...y.map((ee) => ee.right)),
                j = kn(...y.map((ee) => ee.left)),
                A = y.filter((ee) => (R ? ee.left === j : ee.right === _)),
                D = A[0].top,
                U = A[A.length - 1].bottom,
                k = j,
                Z = _,
                V = Z - k,
                W = U - D;
              return {
                top: D,
                bottom: U,
                left: k,
                right: Z,
                width: V,
                height: W,
                x: k,
                y: D,
              };
            }
            return S;
          }
          const T = await u.getElementRects({
            reference: { getBoundingClientRect: E },
            floating: i.floating,
            strategy: f,
          });
          return s.reference.x !== T.reference.x ||
            s.reference.y !== T.reference.y ||
            s.reference.width !== T.reference.width ||
            s.reference.height !== T.reference.height
            ? { reset: { rects: T } }
            : {};
        },
      }
    );
  },
  cb = new Set(["left", "top"]);
async function XE(e, r) {
  const { placement: a, platform: i, elements: s } = e,
    u = await (i.isRTL == null ? void 0 : i.isRTL(s.floating)),
    f = Ln(a),
    h = Bo(a),
    p = jn(a) === "y",
    m = cb.has(f) ? -1 : 1,
    g = u && p ? -1 : 1,
    y = nr(r, e);
  let {
    mainAxis: S,
    crossAxis: w,
    alignmentAxis: E,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    h && typeof E == "number" && (w = h === "end" ? E * -1 : E),
    p ? { x: w * g, y: S * m } : { x: S * m, y: w * g }
  );
}
const KE = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(r) {
          var a, i;
          const { x: s, y: u, placement: f, middlewareData: h } = r,
            p = await XE(r, e);
          return f === ((a = h.offset) == null ? void 0 : a.placement) &&
            (i = h.arrow) != null &&
            i.alignmentOffset
            ? {}
            : { x: s + p.x, y: u + p.y, data: { ...p, placement: f } };
        },
      }
    );
  },
  IE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(r) {
          const { x: a, y: i, placement: s } = r,
            {
              mainAxis: u = !0,
              crossAxis: f = !1,
              limiter: h = {
                fn: (R) => {
                  let { x: _, y: j } = R;
                  return { x: _, y: j };
                },
              },
              ...p
            } = nr(e, r),
            m = { x: a, y: i },
            g = await ol(r, p),
            y = jn(Ln(s)),
            S = uh(y);
          let w = m[S],
            E = m[y];
          if (u) {
            const R = S === "y" ? "top" : "left",
              _ = S === "y" ? "bottom" : "right",
              j = w + g[R],
              A = w - g[_];
            w = Rd(j, w, A);
          }
          if (f) {
            const R = y === "y" ? "top" : "left",
              _ = y === "y" ? "bottom" : "right",
              j = E + g[R],
              A = E - g[_];
            E = Rd(j, E, A);
          }
          const T = h.fn({ ...r, [S]: w, [y]: E });
          return {
            ...T,
            data: { x: T.x - a, y: T.y - i, enabled: { [S]: u, [y]: f } },
          };
        },
      }
    );
  },
  WE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(r) {
          const { x: a, y: i, placement: s, rects: u, middlewareData: f } = r,
            { offset: h = 0, mainAxis: p = !0, crossAxis: m = !0 } = nr(e, r),
            g = { x: a, y: i },
            y = jn(s),
            S = uh(y);
          let w = g[S],
            E = g[y];
          const T = nr(h, r),
            R =
              typeof T == "number"
                ? { mainAxis: T, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...T };
          if (p) {
            const A = S === "y" ? "height" : "width",
              D = u.reference[S] - u.floating[A] + R.mainAxis,
              U = u.reference[S] + u.reference[A] - R.mainAxis;
            w < D ? (w = D) : w > U && (w = U);
          }
          if (m) {
            var _, j;
            const A = S === "y" ? "width" : "height",
              D = cb.has(Ln(s)),
              U =
                u.reference[y] -
                u.floating[A] +
                ((D && ((_ = f.offset) == null ? void 0 : _[y])) || 0) +
                (D ? 0 : R.crossAxis),
              k =
                u.reference[y] +
                u.reference[A] +
                (D ? 0 : ((j = f.offset) == null ? void 0 : j[y]) || 0) -
                (D ? R.crossAxis : 0);
            E < U ? (E = U) : E > k && (E = k);
          }
          return { [S]: w, [y]: E };
        },
      }
    );
  },
  JE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(r) {
          var a, i;
          const { placement: s, rects: u, platform: f, elements: h } = r,
            { apply: p = () => {}, ...m } = nr(e, r),
            g = await ol(r, m),
            y = Ln(s),
            S = Bo(s),
            w = jn(s) === "y",
            { width: E, height: T } = u.floating;
          let R, _;
          y === "top" || y === "bottom"
            ? ((R = y),
              (_ =
                S ===
                ((await (f.isRTL == null ? void 0 : f.isRTL(h.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((_ = y), (R = S === "end" ? "top" : "bottom"));
          const j = T - g.top - g.bottom,
            A = E - g.left - g.right,
            D = kn(T - g[R], j),
            U = kn(E - g[_], A),
            k = !r.middlewareData.shift;
          let Z = D,
            V = U;
          if (
            ((a = r.middlewareData.shift) != null && a.enabled.x && (V = A),
            (i = r.middlewareData.shift) != null && i.enabled.y && (Z = j),
            k && !S)
          ) {
            const ee = Nt(g.left, 0),
              pe = Nt(g.right, 0),
              oe = Nt(g.top, 0),
              ce = Nt(g.bottom, 0);
            w
              ? (V =
                  E -
                  2 * (ee !== 0 || pe !== 0 ? ee + pe : Nt(g.left, g.right)))
              : (Z =
                  T -
                  2 * (oe !== 0 || ce !== 0 ? oe + ce : Nt(g.top, g.bottom)));
          }
          await p({ ...r, availableWidth: V, availableHeight: Z });
          const W = await f.getDimensions(h.floating);
          return E !== W.width || T !== W.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function fb(e) {
  const r = $n(e);
  let a = parseFloat(r.width) || 0,
    i = parseFloat(r.height) || 0;
  const s = tr(e),
    u = s ? e.offsetWidth : a,
    f = s ? e.offsetHeight : i,
    h = su(a) !== u || su(i) !== f;
  return h && ((a = u), (i = f)), { width: a, height: i, $: h };
}
function hh(e) {
  return Bt(e) ? e : e.contextElement;
}
function _o(e) {
  const r = hh(e);
  if (!tr(r)) return er(1);
  const a = r.getBoundingClientRect(),
    { width: i, height: s, $: u } = fb(r);
  let f = (u ? su(a.width) : a.width) / i,
    h = (u ? su(a.height) : a.height) / s;
  return (
    (!f || !Number.isFinite(f)) && (f = 1),
    (!h || !Number.isFinite(h)) && (h = 1),
    { x: f, y: h }
  );
}
const e_ = er(0);
function db(e) {
  const r = ln(e);
  return !sh() || !r.visualViewport
    ? e_
    : { x: r.visualViewport.offsetLeft, y: r.visualViewport.offsetTop };
}
function t_(e, r, a) {
  return r === void 0 && (r = !1), !a || (r && a !== ln(e)) ? !1 : r;
}
function Ea(e, r, a, i) {
  r === void 0 && (r = !1), a === void 0 && (a = !1);
  const s = e.getBoundingClientRect(),
    u = hh(e);
  let f = er(1);
  r && (i ? Bt(i) && (f = _o(i)) : (f = _o(e)));
  const h = t_(u, a, i) ? db(u) : er(0);
  let p = (s.left + h.x) / f.x,
    m = (s.top + h.y) / f.y,
    g = s.width / f.x,
    y = s.height / f.y;
  if (u) {
    const S = ln(u),
      w = i && Bt(i) ? ln(i) : i;
    let E = S,
      T = _d(E);
    for (; T && i && w !== E; ) {
      const R = _o(T),
        _ = T.getBoundingClientRect(),
        j = $n(T),
        A = _.left + (T.clientLeft + parseFloat(j.paddingLeft)) * R.x,
        D = _.top + (T.clientTop + parseFloat(j.paddingTop)) * R.y;
      (p *= R.x),
        (m *= R.y),
        (g *= R.x),
        (y *= R.y),
        (p += A),
        (m += D),
        (E = ln(T)),
        (T = _d(E));
    }
  }
  return zo({ width: g, height: y, x: p, y: m });
}
function ph(e, r) {
  const a = _u(e).scrollLeft;
  return r ? r.left + a : Ea(rr(e)).left + a;
}
function hb(e, r, a) {
  a === void 0 && (a = !1);
  const i = e.getBoundingClientRect(),
    s = i.left + r.scrollLeft - (a ? 0 : ph(e, i)),
    u = i.top + r.scrollTop;
  return { x: s, y: u };
}
function n_(e) {
  let { elements: r, rect: a, offsetParent: i, strategy: s } = e;
  const u = s === "fixed",
    f = rr(i),
    h = r ? Eu(r.floating) : !1;
  if (i === f || (h && u)) return a;
  let p = { scrollLeft: 0, scrollTop: 0 },
    m = er(1);
  const g = er(0),
    y = tr(i);
  if (
    (y || (!y && !u)) &&
    ((Ho(i) !== "body" || vl(f)) && (p = _u(i)), tr(i))
  ) {
    const w = Ea(i);
    (m = _o(i)), (g.x = w.x + i.clientLeft), (g.y = w.y + i.clientTop);
  }
  const S = f && !y && !u ? hb(f, p, !0) : er(0);
  return {
    width: a.width * m.x,
    height: a.height * m.y,
    x: a.x * m.x - p.scrollLeft * m.x + g.x + S.x,
    y: a.y * m.y - p.scrollTop * m.y + g.y + S.y,
  };
}
function r_(e) {
  return Array.from(e.getClientRects());
}
function a_(e) {
  const r = rr(e),
    a = _u(e),
    i = e.ownerDocument.body,
    s = Nt(r.scrollWidth, r.clientWidth, i.scrollWidth, i.clientWidth),
    u = Nt(r.scrollHeight, r.clientHeight, i.scrollHeight, i.clientHeight);
  let f = -a.scrollLeft + ph(e);
  const h = -a.scrollTop;
  return (
    $n(i).direction === "rtl" && (f += Nt(r.clientWidth, i.clientWidth) - s),
    { width: s, height: u, x: f, y: h }
  );
}
function o_(e, r) {
  const a = ln(e),
    i = rr(e),
    s = a.visualViewport;
  let u = i.clientWidth,
    f = i.clientHeight,
    h = 0,
    p = 0;
  if (s) {
    (u = s.width), (f = s.height);
    const m = sh();
    (!m || (m && r === "fixed")) && ((h = s.offsetLeft), (p = s.offsetTop));
  }
  return { width: u, height: f, x: h, y: p };
}
const i_ = new Set(["absolute", "fixed"]);
function l_(e, r) {
  const a = Ea(e, !0, r === "fixed"),
    i = a.top + e.clientTop,
    s = a.left + e.clientLeft,
    u = tr(e) ? _o(e) : er(1),
    f = e.clientWidth * u.x,
    h = e.clientHeight * u.y,
    p = s * u.x,
    m = i * u.y;
  return { width: f, height: h, x: p, y: m };
}
function wv(e, r, a) {
  let i;
  if (r === "viewport") i = o_(e, a);
  else if (r === "document") i = a_(rr(e));
  else if (Bt(r)) i = l_(r, a);
  else {
    const s = db(e);
    i = { x: r.x - s.x, y: r.y - s.y, width: r.width, height: r.height };
  }
  return zo(i);
}
function pb(e, r) {
  const a = Kr(e);
  return a === r || !Bt(a) || Ao(a)
    ? !1
    : $n(a).position === "fixed" || pb(a, r);
}
function s_(e, r) {
  const a = r.get(e);
  if (a) return a;
  let i = al(e, [], !1).filter((h) => Bt(h) && Ho(h) !== "body"),
    s = null;
  const u = $n(e).position === "fixed";
  let f = u ? Kr(e) : e;
  for (; Bt(f) && !Ao(f); ) {
    const h = $n(f),
      p = lh(f);
    !p && h.position === "fixed" && (s = null),
      (
        u
          ? !p && !s
          : (!p && h.position === "static" && !!s && i_.has(s.position)) ||
            (vl(f) && !p && pb(e, f))
      )
        ? (i = i.filter((g) => g !== f))
        : (s = h),
      (f = Kr(f));
  }
  return r.set(e, i), i;
}
function u_(e) {
  let { element: r, boundary: a, rootBoundary: i, strategy: s } = e;
  const f = [
      ...(a === "clippingAncestors"
        ? Eu(r)
          ? []
          : s_(r, this._c)
        : [].concat(a)),
      i,
    ],
    h = f[0],
    p = f.reduce(
      (m, g) => {
        const y = wv(r, g, s);
        return (
          (m.top = Nt(y.top, m.top)),
          (m.right = kn(y.right, m.right)),
          (m.bottom = kn(y.bottom, m.bottom)),
          (m.left = Nt(y.left, m.left)),
          m
        );
      },
      wv(r, h, s),
    );
  return {
    width: p.right - p.left,
    height: p.bottom - p.top,
    x: p.left,
    y: p.top,
  };
}
function c_(e) {
  const { width: r, height: a } = fb(e);
  return { width: r, height: a };
}
function f_(e, r, a) {
  const i = tr(r),
    s = rr(r),
    u = a === "fixed",
    f = Ea(e, !0, u, r);
  let h = { scrollLeft: 0, scrollTop: 0 };
  const p = er(0);
  function m() {
    p.x = ph(s);
  }
  if (i || (!i && !u))
    if (((Ho(r) !== "body" || vl(s)) && (h = _u(r)), i)) {
      const w = Ea(r, !0, u, r);
      (p.x = w.x + r.clientLeft), (p.y = w.y + r.clientTop);
    } else s && m();
  u && !i && s && m();
  const g = s && !i && !u ? hb(s, h) : er(0),
    y = f.left + h.scrollLeft - p.x - g.x,
    S = f.top + h.scrollTop - p.y - g.y;
  return { x: y, y: S, width: f.width, height: f.height };
}
function pd(e) {
  return $n(e).position === "static";
}
function Cv(e, r) {
  if (!tr(e) || $n(e).position === "fixed") return null;
  if (r) return r(e);
  let a = e.offsetParent;
  return rr(e) === a && (a = a.ownerDocument.body), a;
}
function mb(e, r) {
  const a = ln(e);
  if (Eu(e)) return a;
  if (!tr(e)) {
    let s = Kr(e);
    for (; s && !Ao(s); ) {
      if (Bt(s) && !pd(s)) return s;
      s = Kr(s);
    }
    return a;
  }
  let i = Cv(e, r);
  for (; i && _E(i) && pd(i); ) i = Cv(i, r);
  return i && Ao(i) && pd(i) && !lh(i) ? a : i || OE(e) || a;
}
const d_ = async function (e) {
  const r = this.getOffsetParent || mb,
    a = this.getDimensions,
    i = await a(e.floating);
  return {
    reference: f_(e.reference, await r(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: i.width, height: i.height },
  };
};
function h_(e) {
  return $n(e).direction === "rtl";
}
const p_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: n_,
  getDocumentElement: rr,
  getClippingRect: u_,
  getOffsetParent: mb,
  getElementRects: d_,
  getClientRects: r_,
  getDimensions: c_,
  getScale: _o,
  isElement: Bt,
  isRTL: h_,
};
function gb(e, r) {
  return (
    e.x === r.x && e.y === r.y && e.width === r.width && e.height === r.height
  );
}
function m_(e, r) {
  let a = null,
    i;
  const s = rr(e);
  function u() {
    var h;
    clearTimeout(i), (h = a) == null || h.disconnect(), (a = null);
  }
  function f(h, p) {
    h === void 0 && (h = !1), p === void 0 && (p = 1), u();
    const m = e.getBoundingClientRect(),
      { left: g, top: y, width: S, height: w } = m;
    if ((h || r(), !S || !w)) return;
    const E = Ys(y),
      T = Ys(s.clientWidth - (g + S)),
      R = Ys(s.clientHeight - (y + w)),
      _ = Ys(g),
      A = {
        rootMargin: -E + "px " + -T + "px " + -R + "px " + -_ + "px",
        threshold: Nt(0, kn(1, p)) || 1,
      };
    let D = !0;
    function U(k) {
      const Z = k[0].intersectionRatio;
      if (Z !== p) {
        if (!D) return f();
        Z
          ? f(!1, Z)
          : (i = setTimeout(() => {
              f(!1, 1e-7);
            }, 1e3));
      }
      Z === 1 && !gb(m, e.getBoundingClientRect()) && f(), (D = !1);
    }
    try {
      a = new IntersectionObserver(U, { ...A, root: s.ownerDocument });
    } catch {
      a = new IntersectionObserver(U, A);
    }
    a.observe(e);
  }
  return f(!0), u;
}
function Ev(e, r, a, i) {
  i === void 0 && (i = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: u = !0,
      elementResize: f = typeof ResizeObserver == "function",
      layoutShift: h = typeof IntersectionObserver == "function",
      animationFrame: p = !1,
    } = i,
    m = hh(e),
    g = s || u ? [...(m ? al(m) : []), ...al(r)] : [];
  g.forEach((_) => {
    s && _.addEventListener("scroll", a, { passive: !0 }),
      u && _.addEventListener("resize", a);
  });
  const y = m && h ? m_(m, a) : null;
  let S = -1,
    w = null;
  f &&
    ((w = new ResizeObserver((_) => {
      let [j] = _;
      j &&
        j.target === m &&
        w &&
        (w.unobserve(r),
        cancelAnimationFrame(S),
        (S = requestAnimationFrame(() => {
          var A;
          (A = w) == null || A.observe(r);
        }))),
        a();
    })),
    m && !p && w.observe(m),
    w.observe(r));
  let E,
    T = p ? Ea(e) : null;
  p && R();
  function R() {
    const _ = Ea(e);
    T && !gb(T, _) && a(), (T = _), (E = requestAnimationFrame(R));
  }
  return (
    a(),
    () => {
      var _;
      g.forEach((j) => {
        s && j.removeEventListener("scroll", a),
          u && j.removeEventListener("resize", a);
      }),
        y?.(),
        (_ = w) == null || _.disconnect(),
        (w = null),
        p && cancelAnimationFrame(E);
    }
  );
}
const g_ = KE,
  y_ = IE,
  v_ = YE,
  b_ = JE,
  S_ = GE,
  _v = qE,
  x_ = QE,
  w_ = WE,
  C_ = (e, r, a) => {
    const i = new Map(),
      s = { platform: p_, ...a },
      u = { ...s.platform, _c: i };
    return VE(e, r, { ...s, platform: u });
  };
var E_ = typeof document < "u",
  __ = function () {},
  ru = E_ ? x.useLayoutEffect : __;
function cu(e, r) {
  if (e === r) return !0;
  if (typeof e != typeof r) return !1;
  if (typeof e == "function" && e.toString() === r.toString()) return !0;
  let a, i, s;
  if (e && r && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((a = e.length), a !== r.length)) return !1;
      for (i = a; i-- !== 0; ) if (!cu(e[i], r[i])) return !1;
      return !0;
    }
    if (((s = Object.keys(e)), (a = s.length), a !== Object.keys(r).length))
      return !1;
    for (i = a; i-- !== 0; ) if (!{}.hasOwnProperty.call(r, s[i])) return !1;
    for (i = a; i-- !== 0; ) {
      const u = s[i];
      if (!(u === "_owner" && e.$$typeof) && !cu(e[u], r[u])) return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
}
function yb(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Rv(e, r) {
  const a = yb(e);
  return Math.round(r * a) / a;
}
function md(e) {
  const r = x.useRef(e);
  return (
    ru(() => {
      r.current = e;
    }),
    r
  );
}
function R_(e) {
  e === void 0 && (e = {});
  const {
      placement: r = "bottom",
      strategy: a = "absolute",
      middleware: i = [],
      platform: s,
      elements: { reference: u, floating: f } = {},
      transform: h = !0,
      whileElementsMounted: p,
      open: m,
    } = e,
    [g, y] = x.useState({
      x: 0,
      y: 0,
      strategy: a,
      placement: r,
      middlewareData: {},
      isPositioned: !1,
    }),
    [S, w] = x.useState(i);
  cu(S, i) || w(i);
  const [E, T] = x.useState(null),
    [R, _] = x.useState(null),
    j = x.useCallback((Y) => {
      Y !== k.current && ((k.current = Y), T(Y));
    }, []),
    A = x.useCallback((Y) => {
      Y !== Z.current && ((Z.current = Y), _(Y));
    }, []),
    D = u || E,
    U = f || R,
    k = x.useRef(null),
    Z = x.useRef(null),
    V = x.useRef(g),
    W = p != null,
    ee = md(p),
    pe = md(s),
    oe = md(m),
    ce = x.useCallback(() => {
      if (!k.current || !Z.current) return;
      const Y = { placement: r, strategy: a, middleware: S };
      pe.current && (Y.platform = pe.current),
        C_(k.current, Z.current, Y).then((re) => {
          const O = { ...re, isPositioned: oe.current !== !1 };
          fe.current &&
            !cu(V.current, O) &&
            ((V.current = O),
            ih.flushSync(() => {
              y(O);
            }));
        });
    }, [S, r, a, pe, oe]);
  ru(() => {
    m === !1 &&
      V.current.isPositioned &&
      ((V.current.isPositioned = !1), y((Y) => ({ ...Y, isPositioned: !1 })));
  }, [m]);
  const fe = x.useRef(!1);
  ru(
    () => (
      (fe.current = !0),
      () => {
        fe.current = !1;
      }
    ),
    [],
  ),
    ru(() => {
      if ((D && (k.current = D), U && (Z.current = U), D && U)) {
        if (ee.current) return ee.current(D, U, ce);
        ce();
      }
    }, [D, U, ce, ee, W]);
  const le = x.useMemo(
      () => ({ reference: k, floating: Z, setReference: j, setFloating: A }),
      [j, A],
    ),
    M = x.useMemo(() => ({ reference: D, floating: U }), [D, U]),
    Q = x.useMemo(() => {
      const Y = { position: a, left: 0, top: 0 };
      if (!M.floating) return Y;
      const re = Rv(M.floating, g.x),
        O = Rv(M.floating, g.y);
      return h
        ? {
            ...Y,
            transform: "translate(" + re + "px, " + O + "px)",
            ...(yb(M.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: a, left: re, top: O };
    }, [a, h, M.floating, g.x, g.y]);
  return x.useMemo(
    () => ({ ...g, update: ce, refs: le, elements: M, floatingStyles: Q }),
    [g, ce, le, M, Q],
  );
}
const T_ = (e) => {
    function r(a) {
      return {}.hasOwnProperty.call(a, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(a) {
        const { element: i, padding: s } = typeof e == "function" ? e(a) : e;
        return i && r(i)
          ? i.current != null
            ? _v({ element: i.current, padding: s }).fn(a)
            : {}
          : i
            ? _v({ element: i, padding: s }).fn(a)
            : {};
      },
    };
  },
  A_ = (e, r) => ({ ...g_(e), options: [e, r] }),
  z_ = (e, r) => ({ ...y_(e), options: [e, r] }),
  Tv = (e, r) => ({ ...w_(e), options: [e, r] }),
  Av = (e, r) => ({ ...v_(e), options: [e, r] }),
  O_ = (e, r) => ({ ...b_(e), options: [e, r] }),
  j_ = (e, r) => ({ ...S_(e), options: [e, r] }),
  zv = (e, r) => ({ ...x_(e), options: [e, r] }),
  D_ = (e, r) => ({ ...T_(e), options: [e, r] });
function N_(e) {
  return x.useMemo(
    () =>
      e.every((r) => r == null)
        ? null
        : (r) => {
            e.forEach((a) => {
              typeof a == "function" ? a(r) : a != null && (a.current = r);
            });
          },
    e,
  );
}
const vb = { ...hw },
  M_ = vb.useInsertionEffect,
  $_ = M_ || ((e) => e());
function k_(e) {
  const r = x.useRef(() => {});
  return (
    $_(() => {
      r.current = e;
    }),
    x.useCallback(function () {
      for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
        i[s] = arguments[s];
      return r.current == null ? void 0 : r.current(...i);
    }, [])
  );
}
var Ad = typeof document < "u" ? x.useLayoutEffect : x.useEffect;
let Ov = !1,
  L_ = 0;
const jv = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + L_++;
function U_() {
  const [e, r] = x.useState(() => (Ov ? jv() : void 0));
  return (
    Ad(() => {
      e == null && r(jv());
    }, []),
    x.useEffect(() => {
      Ov = !0;
    }, []),
    e
  );
}
const H_ = vb.useId,
  B_ = H_ || U_;
function P_() {
  const e = new Map();
  return {
    emit(r, a) {
      var i;
      (i = e.get(r)) == null || i.forEach((s) => s(a));
    },
    on(r, a) {
      e.set(r, [...(e.get(r) || []), a]);
    },
    off(r, a) {
      var i;
      e.set(
        r,
        ((i = e.get(r)) == null ? void 0 : i.filter((s) => s !== a)) || [],
      );
    },
  };
}
const Z_ = x.createContext(null),
  V_ = x.createContext(null),
  q_ = () => {
    var e;
    return ((e = x.useContext(Z_)) == null ? void 0 : e.id) || null;
  },
  Y_ = () => x.useContext(V_);
function G_(e) {
  const { open: r = !1, onOpenChange: a, elements: i } = e,
    s = B_(),
    u = x.useRef({}),
    [f] = x.useState(() => P_()),
    h = q_() != null,
    [p, m] = x.useState(i.reference),
    g = k_((w, E, T) => {
      (u.current.openEvent = w ? E : void 0),
        f.emit("openchange", { open: w, event: E, reason: T, nested: h }),
        a?.(w, E, T);
    }),
    y = x.useMemo(() => ({ setPositionReference: m }), []),
    S = x.useMemo(
      () => ({
        reference: p || i.reference || null,
        floating: i.floating || null,
        domReference: i.reference,
      }),
      [p, i.reference, i.floating],
    );
  return x.useMemo(
    () => ({
      dataRef: u,
      open: r,
      onOpenChange: g,
      elements: S,
      events: f,
      floatingId: s,
      refs: y,
    }),
    [r, g, S, f, s, y],
  );
}
function F_(e) {
  e === void 0 && (e = {});
  const { nodeId: r } = e,
    a = G_({
      ...e,
      elements: { reference: null, floating: null, ...e.elements },
    }),
    i = e.rootContext || a,
    s = i.elements,
    [u, f] = x.useState(null),
    [h, p] = x.useState(null),
    g = s?.domReference || u,
    y = x.useRef(null),
    S = Y_();
  Ad(() => {
    g && (y.current = g);
  }, [g]);
  const w = R_({ ...e, elements: { ...s, ...(h && { reference: h }) } }),
    E = x.useCallback(
      (A) => {
        const D = Bt(A)
          ? {
              getBoundingClientRect: () => A.getBoundingClientRect(),
              contextElement: A,
            }
          : A;
        p(D), w.refs.setReference(D);
      },
      [w.refs],
    ),
    T = x.useCallback(
      (A) => {
        (Bt(A) || A === null) && ((y.current = A), f(A)),
          (Bt(w.refs.reference.current) ||
            w.refs.reference.current === null ||
            (A !== null && !Bt(A))) &&
            w.refs.setReference(A);
      },
      [w.refs],
    ),
    R = x.useMemo(
      () => ({
        ...w.refs,
        setReference: T,
        setPositionReference: E,
        domReference: y,
      }),
      [w.refs, T, E],
    ),
    _ = x.useMemo(() => ({ ...w.elements, domReference: g }), [w.elements, g]),
    j = x.useMemo(
      () => ({ ...w, ...i, refs: R, elements: _, nodeId: r }),
      [w, R, _, r, i],
    );
  return (
    Ad(() => {
      i.dataRef.current.floatingContext = j;
      const A = S?.nodesRef.current.find((D) => D.id === r);
      A && (A.context = j);
    }),
    x.useMemo(() => ({ ...w, context: j, refs: R, elements: _ }), [w, R, _, j])
  );
}
const [Q_, wn] = hl("ScrollArea.Root component was not found in tree");
function Oo(e, r) {
  const a = xa(r);
  pl(() => {
    let i = 0;
    if (e) {
      const s = new ResizeObserver(() => {
        cancelAnimationFrame(i), (i = window.requestAnimationFrame(a));
      });
      return (
        s.observe(e),
        () => {
          window.cancelAnimationFrame(i), s.unobserve(e);
        }
      );
    }
  }, [e, a]);
}
const X_ = x.forwardRef((e, r) => {
    const { style: a, ...i } = e,
      s = wn(),
      [u, f] = x.useState(0),
      [h, p] = x.useState(0),
      m = !!(u && h);
    return (
      Oo(s.scrollbarX, () => {
        const g = s.scrollbarX?.offsetHeight || 0;
        s.onCornerHeightChange(g), p(g);
      }),
      Oo(s.scrollbarY, () => {
        const g = s.scrollbarY?.offsetWidth || 0;
        s.onCornerWidthChange(g), f(g);
      }),
      m
        ? v.jsx("div", { ...i, ref: r, style: { ...a, width: u, height: h } })
        : null
    );
  }),
  K_ = x.forwardRef((e, r) => {
    const a = wn(),
      i = !!(a.scrollbarX && a.scrollbarY);
    return a.type !== "scroll" && i ? v.jsx(X_, { ...e, ref: r }) : null;
  }),
  I_ = { scrollHideDelay: 1e3, type: "hover" },
  bb = x.forwardRef((e, r) => {
    const {
        type: a,
        scrollHideDelay: i,
        scrollbars: s,
        getStyles: u,
        ...f
      } = ae("ScrollAreaRoot", I_, e),
      [h, p] = x.useState(null),
      [m, g] = x.useState(null),
      [y, S] = x.useState(null),
      [w, E] = x.useState(null),
      [T, R] = x.useState(null),
      [_, j] = x.useState(0),
      [A, D] = x.useState(0),
      [U, k] = x.useState(!1),
      [Z, V] = x.useState(!1),
      W = Zt(r, (ee) => p(ee));
    return v.jsx(Q_, {
      value: {
        type: a,
        scrollHideDelay: i,
        scrollArea: h,
        viewport: m,
        onViewportChange: g,
        content: y,
        onContentChange: S,
        scrollbarX: w,
        onScrollbarXChange: E,
        scrollbarXEnabled: U,
        onScrollbarXEnabledChange: k,
        scrollbarY: T,
        onScrollbarYChange: R,
        scrollbarYEnabled: Z,
        onScrollbarYEnabledChange: V,
        onCornerWidthChange: j,
        onCornerHeightChange: D,
        getStyles: u,
      },
      children: v.jsx(ge, {
        ...f,
        ref: W,
        __vars: {
          "--sa-corner-width": s !== "xy" ? "0px" : `${_}px`,
          "--sa-corner-height": s !== "xy" ? "0px" : `${A}px`,
        },
      }),
    });
  });
bb.displayName = "@mantine/core/ScrollAreaRoot";
function Sb(e, r) {
  const a = e / r;
  return Number.isNaN(a) ? 0 : a;
}
function Ru(e) {
  const r = Sb(e.viewport, e.content),
    a = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    i = (e.scrollbar.size - a) * r;
  return Math.max(i, 18);
}
function xb(e, r) {
  return (a) => {
    if (e[0] === e[1] || r[0] === r[1]) return r[0];
    const i = (r[1] - r[0]) / (e[1] - e[0]);
    return r[0] + i * (a - e[0]);
  };
}
function W_(e, [r, a]) {
  return Math.min(a, Math.max(r, e));
}
function Dv(e, r, a = "ltr") {
  const i = Ru(r),
    s = r.scrollbar.paddingStart + r.scrollbar.paddingEnd,
    u = r.scrollbar.size - s,
    f = r.content - r.viewport,
    h = u - i,
    p = a === "ltr" ? [0, f] : [f * -1, 0],
    m = W_(e, p);
  return xb([0, f], [0, h])(m);
}
function J_(e, r, a, i = "ltr") {
  const s = Ru(a),
    u = s / 2,
    f = r || u,
    h = s - f,
    p = a.scrollbar.paddingStart + f,
    m = a.scrollbar.size - a.scrollbar.paddingEnd - h,
    g = a.content - a.viewport,
    y = i === "ltr" ? [0, g] : [g * -1, 0];
  return xb([p, m], y)(e);
}
function wb(e, r) {
  return e > 0 && e < r;
}
function fu(e) {
  return e ? parseInt(e, 10) : 0;
}
function wa(e, r, { checkForDefaultPrevented: a = !0 } = {}) {
  return (i) => {
    e?.(i), (a === !1 || !i.defaultPrevented) && r?.(i);
  };
}
const [eR, Cb] = hl("ScrollAreaScrollbar was not found in tree"),
  Eb = x.forwardRef((e, r) => {
    const {
        sizes: a,
        hasThumb: i,
        onThumbChange: s,
        onThumbPointerUp: u,
        onThumbPointerDown: f,
        onThumbPositionChange: h,
        onDragScroll: p,
        onWheelScroll: m,
        onResize: g,
        ...y
      } = e,
      S = wn(),
      [w, E] = x.useState(null),
      T = Zt(r, (V) => E(V)),
      R = x.useRef(null),
      _ = x.useRef(""),
      { viewport: j } = S,
      A = a.content - a.viewport,
      D = xa(m),
      U = xa(h),
      k = bu(g, 10),
      Z = (V) => {
        if (R.current) {
          const W = V.clientX - R.current.left,
            ee = V.clientY - R.current.top;
          p({ x: W, y: ee });
        }
      };
    return (
      x.useEffect(() => {
        const V = (W) => {
          const ee = W.target;
          w?.contains(ee) && D(W, A);
        };
        return (
          document.addEventListener("wheel", V, { passive: !1 }),
          () => document.removeEventListener("wheel", V, { passive: !1 })
        );
      }, [j, w, A, D]),
      x.useEffect(U, [a, U]),
      Oo(w, k),
      Oo(S.content, k),
      v.jsx(eR, {
        value: {
          scrollbar: w,
          hasThumb: i,
          onThumbChange: xa(s),
          onThumbPointerUp: xa(u),
          onThumbPositionChange: U,
          onThumbPointerDown: xa(f),
        },
        children: v.jsx("div", {
          ...y,
          ref: T,
          "data-mantine-scrollbar": !0,
          style: { position: "absolute", ...y.style },
          onPointerDown: wa(e.onPointerDown, (V) => {
            V.preventDefault(),
              V.button === 0 &&
                (V.target.setPointerCapture(V.pointerId),
                (R.current = w.getBoundingClientRect()),
                (_.current = document.body.style.webkitUserSelect),
                (document.body.style.webkitUserSelect = "none"),
                Z(V));
          }),
          onPointerMove: wa(e.onPointerMove, Z),
          onPointerUp: wa(e.onPointerUp, (V) => {
            const W = V.target;
            W.hasPointerCapture(V.pointerId) &&
              (V.preventDefault(), W.releasePointerCapture(V.pointerId));
          }),
          onLostPointerCapture: () => {
            (document.body.style.webkitUserSelect = _.current),
              (R.current = null);
          },
        }),
      })
    );
  }),
  _b = x.forwardRef((e, r) => {
    const { sizes: a, onSizesChange: i, style: s, ...u } = e,
      f = wn(),
      [h, p] = x.useState(),
      m = x.useRef(null),
      g = Zt(r, m, f.onScrollbarXChange);
    return (
      x.useEffect(() => {
        m.current && p(getComputedStyle(m.current));
      }, [m]),
      v.jsx(Eb, {
        "data-orientation": "horizontal",
        ...u,
        ref: g,
        sizes: a,
        style: { ...s, "--sa-thumb-width": `${Ru(a)}px` },
        onThumbPointerDown: (y) => e.onThumbPointerDown(y.x),
        onDragScroll: (y) => e.onDragScroll(y.x),
        onWheelScroll: (y, S) => {
          if (f.viewport) {
            const w = f.viewport.scrollLeft + y.deltaX;
            e.onWheelScroll(w), wb(w, S) && y.preventDefault();
          }
        },
        onResize: () => {
          m.current &&
            f.viewport &&
            h &&
            i({
              content: f.viewport.scrollWidth,
              viewport: f.viewport.offsetWidth,
              scrollbar: {
                size: m.current.clientWidth,
                paddingStart: fu(h.paddingLeft),
                paddingEnd: fu(h.paddingRight),
              },
            });
        },
      })
    );
  });
_b.displayName = "@mantine/core/ScrollAreaScrollbarX";
const Rb = x.forwardRef((e, r) => {
  const { sizes: a, onSizesChange: i, style: s, ...u } = e,
    f = wn(),
    [h, p] = x.useState(),
    m = x.useRef(null),
    g = Zt(r, m, f.onScrollbarYChange);
  return (
    x.useEffect(() => {
      m.current && p(window.getComputedStyle(m.current));
    }, []),
    v.jsx(Eb, {
      ...u,
      "data-orientation": "vertical",
      ref: g,
      sizes: a,
      style: { "--sa-thumb-height": `${Ru(a)}px`, ...s },
      onThumbPointerDown: (y) => e.onThumbPointerDown(y.y),
      onDragScroll: (y) => e.onDragScroll(y.y),
      onWheelScroll: (y, S) => {
        if (f.viewport) {
          const w = f.viewport.scrollTop + y.deltaY;
          e.onWheelScroll(w), wb(w, S) && y.preventDefault();
        }
      },
      onResize: () => {
        m.current &&
          f.viewport &&
          h &&
          i({
            content: f.viewport.scrollHeight,
            viewport: f.viewport.offsetHeight,
            scrollbar: {
              size: m.current.clientHeight,
              paddingStart: fu(h.paddingTop),
              paddingEnd: fu(h.paddingBottom),
            },
          });
      },
    })
  );
});
Rb.displayName = "@mantine/core/ScrollAreaScrollbarY";
const Tu = x.forwardRef((e, r) => {
  const { orientation: a = "vertical", ...i } = e,
    { dir: s } = oh(),
    u = wn(),
    f = x.useRef(null),
    h = x.useRef(0),
    [p, m] = x.useState({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
    }),
    g = Sb(p.viewport, p.content),
    y = {
      ...i,
      sizes: p,
      onSizesChange: m,
      hasThumb: g > 0 && g < 1,
      onThumbChange: (w) => {
        f.current = w;
      },
      onThumbPointerUp: () => {
        h.current = 0;
      },
      onThumbPointerDown: (w) => {
        h.current = w;
      },
    },
    S = (w, E) => J_(w, h.current, p, E);
  return a === "horizontal"
    ? v.jsx(_b, {
        ...y,
        ref: r,
        onThumbPositionChange: () => {
          if (u.viewport && f.current) {
            const w = u.viewport.scrollLeft,
              E = Dv(w, p, s);
            f.current.style.transform = `translate3d(${E}px, 0, 0)`;
          }
        },
        onWheelScroll: (w) => {
          u.viewport && (u.viewport.scrollLeft = w);
        },
        onDragScroll: (w) => {
          u.viewport && (u.viewport.scrollLeft = S(w, s));
        },
      })
    : a === "vertical"
      ? v.jsx(Rb, {
          ...y,
          ref: r,
          onThumbPositionChange: () => {
            if (u.viewport && f.current) {
              const w = u.viewport.scrollTop,
                E = Dv(w, p);
              p.scrollbar.size === 0
                ? f.current.style.setProperty("--thumb-opacity", "0")
                : f.current.style.setProperty("--thumb-opacity", "1"),
                (f.current.style.transform = `translate3d(0, ${E}px, 0)`);
            }
          },
          onWheelScroll: (w) => {
            u.viewport && (u.viewport.scrollTop = w);
          },
          onDragScroll: (w) => {
            u.viewport && (u.viewport.scrollTop = S(w));
          },
        })
      : null;
});
Tu.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const mh = x.forwardRef((e, r) => {
  const a = wn(),
    { forceMount: i, ...s } = e,
    [u, f] = x.useState(!1),
    h = e.orientation === "horizontal",
    p = bu(() => {
      if (a.viewport) {
        const m = a.viewport.offsetWidth < a.viewport.scrollWidth,
          g = a.viewport.offsetHeight < a.viewport.scrollHeight;
        f(h ? m : g);
      }
    }, 10);
  return (
    Oo(a.viewport, p),
    Oo(a.content, p),
    i || u
      ? v.jsx(Tu, { "data-state": u ? "visible" : "hidden", ...s, ref: r })
      : null
  );
});
mh.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const Tb = x.forwardRef((e, r) => {
  const { forceMount: a, ...i } = e,
    s = wn(),
    [u, f] = x.useState(!1);
  return (
    x.useEffect(() => {
      const { scrollArea: h } = s;
      let p = 0;
      if (h) {
        const m = () => {
            window.clearTimeout(p), f(!0);
          },
          g = () => {
            p = window.setTimeout(() => f(!1), s.scrollHideDelay);
          };
        return (
          h.addEventListener("pointerenter", m),
          h.addEventListener("pointerleave", g),
          () => {
            window.clearTimeout(p),
              h.removeEventListener("pointerenter", m),
              h.removeEventListener("pointerleave", g);
          }
        );
      }
    }, [s.scrollArea, s.scrollHideDelay]),
    a || u
      ? v.jsx(mh, { "data-state": u ? "visible" : "hidden", ...i, ref: r })
      : null
  );
});
Tb.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const tR = x.forwardRef((e, r) => {
    const { forceMount: a, ...i } = e,
      s = wn(),
      u = e.orientation === "horizontal",
      [f, h] = x.useState("hidden"),
      p = bu(() => h("idle"), 100);
    return (
      x.useEffect(() => {
        if (f === "idle") {
          const m = window.setTimeout(() => h("hidden"), s.scrollHideDelay);
          return () => window.clearTimeout(m);
        }
      }, [f, s.scrollHideDelay]),
      x.useEffect(() => {
        const { viewport: m } = s,
          g = u ? "scrollLeft" : "scrollTop";
        if (m) {
          let y = m[g];
          const S = () => {
            const w = m[g];
            y !== w && (h("scrolling"), p()), (y = w);
          };
          return (
            m.addEventListener("scroll", S),
            () => m.removeEventListener("scroll", S)
          );
        }
      }, [s.viewport, u, p]),
      a || f !== "hidden"
        ? v.jsx(Tu, {
            "data-state": f === "hidden" ? "hidden" : "visible",
            ...i,
            ref: r,
            onPointerEnter: wa(e.onPointerEnter, () => h("interacting")),
            onPointerLeave: wa(e.onPointerLeave, () => h("idle")),
          })
        : null
    );
  }),
  zd = x.forwardRef((e, r) => {
    const { forceMount: a, ...i } = e,
      s = wn(),
      { onScrollbarXEnabledChange: u, onScrollbarYEnabledChange: f } = s,
      h = e.orientation === "horizontal";
    return (
      x.useEffect(
        () => (
          h ? u(!0) : f(!0),
          () => {
            h ? u(!1) : f(!1);
          }
        ),
        [h, u, f],
      ),
      s.type === "hover"
        ? v.jsx(Tb, { ...i, ref: r, forceMount: a })
        : s.type === "scroll"
          ? v.jsx(tR, { ...i, ref: r, forceMount: a })
          : s.type === "auto"
            ? v.jsx(mh, { ...i, ref: r, forceMount: a })
            : s.type === "always"
              ? v.jsx(Tu, { ...i, ref: r })
              : null
    );
  });
zd.displayName = "@mantine/core/ScrollAreaScrollbar";
function nR(e, r = () => {}) {
  let a = { left: e.scrollLeft, top: e.scrollTop },
    i = 0;
  return (
    (function s() {
      const u = { left: e.scrollLeft, top: e.scrollTop },
        f = a.left !== u.left,
        h = a.top !== u.top;
      (f || h) && r(), (a = u), (i = window.requestAnimationFrame(s));
    })(),
    () => window.cancelAnimationFrame(i)
  );
}
const Ab = x.forwardRef((e, r) => {
  const { style: a, ...i } = e,
    s = wn(),
    u = Cb(),
    { onThumbPositionChange: f } = u,
    h = Zt(r, (g) => u.onThumbChange(g)),
    p = x.useRef(void 0),
    m = bu(() => {
      p.current && (p.current(), (p.current = void 0));
    }, 100);
  return (
    x.useEffect(() => {
      const { viewport: g } = s;
      if (g) {
        const y = () => {
          if ((m(), !p.current)) {
            const S = nR(g, f);
            (p.current = S), f();
          }
        };
        return (
          f(),
          g.addEventListener("scroll", y),
          () => g.removeEventListener("scroll", y)
        );
      }
    }, [s.viewport, m, f]),
    v.jsx("div", {
      "data-state": u.hasThumb ? "visible" : "hidden",
      ...i,
      ref: h,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...a,
      },
      onPointerDownCapture: wa(e.onPointerDownCapture, (g) => {
        const S = g.target.getBoundingClientRect(),
          w = g.clientX - S.left,
          E = g.clientY - S.top;
        u.onThumbPointerDown({ x: w, y: E });
      }),
      onPointerUp: wa(e.onPointerUp, u.onThumbPointerUp),
    })
  );
});
Ab.displayName = "@mantine/core/ScrollAreaThumb";
const Od = x.forwardRef((e, r) => {
  const { forceMount: a, ...i } = e,
    s = Cb();
  return a || s.hasThumb ? v.jsx(Ab, { ref: r, ...i }) : null;
});
Od.displayName = "@mantine/core/ScrollAreaThumb";
const zb = x.forwardRef(({ children: e, style: r, ...a }, i) => {
  const s = wn(),
    u = Zt(i, s.onViewportChange);
  return v.jsx(ge, {
    ...a,
    ref: u,
    style: {
      overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
      ...r,
    },
    children: v.jsx("div", {
      ...s.getStyles("content"),
      ref: s.onContentChange,
      children: e,
    }),
  });
});
zb.displayName = "@mantine/core/ScrollAreaViewport";
var gh = {
  root: "m_d57069b5",
  viewport: "m_c0783ff9",
  viewportInner: "m_f8f631dd",
  scrollbar: "m_c44ba933",
  thumb: "m_d8b5e363",
  corner: "m_21657268",
  content: "m_b1336c6",
};
const Ob = { scrollHideDelay: 1e3, type: "hover", scrollbars: "xy" },
  rR = (e, { scrollbarSize: r, overscrollBehavior: a }) => ({
    root: {
      "--scrollarea-scrollbar-size": K(r),
      "--scrollarea-over-scroll-behavior": a,
    },
  }),
  bl = Se((e, r) => {
    const a = ae("ScrollArea", Ob, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        scrollbarSize: p,
        vars: m,
        type: g,
        scrollHideDelay: y,
        viewportProps: S,
        viewportRef: w,
        onScrollPositionChange: E,
        children: T,
        offsetScrollbars: R,
        scrollbars: _,
        onBottomReached: j,
        onTopReached: A,
        overscrollBehavior: D,
        ...U
      } = a,
      [k, Z] = x.useState(!1),
      [V, W] = x.useState(!1),
      [ee, pe] = x.useState(!1),
      oe = Ee({
        name: "ScrollArea",
        props: a,
        classes: gh,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: m,
        varsResolver: rR,
      }),
      ce = x.useRef(null),
      fe = N_([w, ce]);
    return (
      x.useEffect(() => {
        if (!ce.current || R !== "present") return;
        const le = ce.current,
          M = new ResizeObserver(() => {
            const {
              scrollHeight: Q,
              clientHeight: Y,
              scrollWidth: re,
              clientWidth: O,
            } = le;
            W(Q > Y), pe(re > O);
          });
        return M.observe(le), () => M.disconnect();
      }, [ce, R]),
      v.jsxs(bb, {
        getStyles: oe,
        type: g === "never" ? "always" : g,
        scrollHideDelay: y,
        ref: r,
        scrollbars: _,
        ...oe("root"),
        ...U,
        children: [
          v.jsx(zb, {
            ...S,
            ...oe("viewport", { style: S?.style }),
            ref: fe,
            "data-offset-scrollbars": R === !0 ? "xy" : R || void 0,
            "data-scrollbars": _ || void 0,
            "data-horizontal-hidden": R === "present" && !ee ? "true" : void 0,
            "data-vertical-hidden": R === "present" && !V ? "true" : void 0,
            onScroll: (le) => {
              S?.onScroll?.(le),
                E?.({
                  x: le.currentTarget.scrollLeft,
                  y: le.currentTarget.scrollTop,
                });
              const {
                scrollTop: M,
                scrollHeight: Q,
                clientHeight: Y,
              } = le.currentTarget;
              M - (Q - Y) >= -0.6 && j?.(), M === 0 && A?.();
            },
            children: T,
          }),
          (_ === "xy" || _ === "x") &&
            v.jsx(zd, {
              ...oe("scrollbar"),
              orientation: "horizontal",
              "data-hidden":
                g === "never" || (R === "present" && !ee) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => Z(!0),
              onMouseLeave: () => Z(!1),
              children: v.jsx(Od, { ...oe("thumb") }),
            }),
          (_ === "xy" || _ === "y") &&
            v.jsx(zd, {
              ...oe("scrollbar"),
              orientation: "vertical",
              "data-hidden":
                g === "never" || (R === "present" && !V) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => Z(!0),
              onMouseLeave: () => Z(!1),
              children: v.jsx(Od, { ...oe("thumb") }),
            }),
          v.jsx(K_, {
            ...oe("corner"),
            "data-hovered": k || void 0,
            "data-hidden": g === "never" || void 0,
          }),
        ],
      })
    );
  });
bl.displayName = "@mantine/core/ScrollArea";
const yh = Se((e, r) => {
  const {
    children: a,
    classNames: i,
    styles: s,
    scrollbarSize: u,
    scrollHideDelay: f,
    type: h,
    dir: p,
    offsetScrollbars: m,
    viewportRef: g,
    onScrollPositionChange: y,
    unstyled: S,
    variant: w,
    viewportProps: E,
    scrollbars: T,
    style: R,
    vars: _,
    onBottomReached: j,
    onTopReached: A,
    ...D
  } = ae("ScrollAreaAutosize", Ob, e);
  return v.jsx(ge, {
    ...D,
    ref: r,
    style: [{ display: "flex", overflow: "auto" }, R],
    children: v.jsx(ge, {
      style: { display: "flex", flexDirection: "column", flex: 1 },
      children: v.jsx(bl, {
        classNames: i,
        styles: s,
        scrollHideDelay: f,
        scrollbarSize: u,
        type: h,
        dir: p,
        offsetScrollbars: m,
        viewportRef: g,
        onScrollPositionChange: y,
        unstyled: S,
        variant: w,
        viewportProps: E,
        vars: _,
        scrollbars: T,
        onBottomReached: j,
        onTopReached: A,
        children: a,
      }),
    }),
  });
});
bl.classes = gh;
yh.displayName = "@mantine/core/ScrollAreaAutosize";
yh.classes = gh;
bl.Autosize = yh;
var jb = { root: "m_87cf2631" };
const aR = { __staticSelector: "UnstyledButton" },
  Sl = Kt((e, r) => {
    const a = ae("UnstyledButton", aR, e),
      {
        className: i,
        component: s = "button",
        __staticSelector: u,
        unstyled: f,
        classNames: h,
        styles: p,
        style: m,
        ...g
      } = a,
      y = Ee({
        name: u,
        props: a,
        classes: jb,
        className: i,
        style: m,
        classNames: h,
        styles: p,
        unstyled: f,
      });
    return v.jsx(ge, {
      ...y("root", { focusable: !0 }),
      component: s,
      ref: r,
      type: s === "button" ? "button" : void 0,
      ...g,
    });
  });
Sl.classes = jb;
Sl.displayName = "@mantine/core/UnstyledButton";
var Db = { root: "m_515a97f8" };
const oR = {},
  vh = Se((e, r) => {
    const a = ae("VisuallyHidden", oR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        ...m
      } = a,
      g = Ee({
        name: "VisuallyHidden",
        classes: Db,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
      });
    return v.jsx(ge, { component: "span", ref: r, ...g("root"), ...m });
  });
vh.classes = Db;
vh.displayName = "@mantine/core/VisuallyHidden";
var Nb = { root: "m_1b7284a3" };
const iR = {},
  lR = (e, { radius: r, shadow: a }) => ({
    root: {
      "--paper-radius": r === void 0 ? void 0 : Bn(r),
      "--paper-shadow": Z0(a),
    },
  }),
  Jr = Kt((e, r) => {
    const a = ae("Paper", iR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        withBorder: p,
        vars: m,
        radius: g,
        shadow: y,
        variant: S,
        mod: w,
        ...E
      } = a,
      T = Ee({
        name: "Paper",
        props: a,
        classes: Nb,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: m,
        varsResolver: lR,
      });
    return v.jsx(ge, {
      ref: r,
      mod: [{ "data-with-border": p }, w],
      ...T("root"),
      variant: S,
      ...E,
    });
  });
Jr.classes = Nb;
Jr.displayName = "@mantine/core/Paper";
function Nv(e, r, a, i) {
  return e === "center" || i === "center"
    ? { top: r }
    : e === "end"
      ? { bottom: a }
      : e === "start"
        ? { top: a }
        : {};
}
function Mv(e, r, a, i, s) {
  return e === "center" || i === "center"
    ? { left: r }
    : e === "end"
      ? { [s === "ltr" ? "right" : "left"]: a }
      : e === "start"
        ? { [s === "ltr" ? "left" : "right"]: a }
        : {};
}
const sR = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius",
};
function uR({
  position: e,
  arrowSize: r,
  arrowOffset: a,
  arrowRadius: i,
  arrowPosition: s,
  arrowX: u,
  arrowY: f,
  dir: h,
}) {
  const [p, m = "center"] = e.split("-"),
    g = {
      width: r,
      height: r,
      transform: "rotate(45deg)",
      position: "absolute",
      [sR[p]]: i,
    },
    y = -r / 2;
  return p === "left"
    ? {
        ...g,
        ...Nv(m, f, a, s),
        right: y,
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
      }
    : p === "right"
      ? {
          ...g,
          ...Nv(m, f, a, s),
          left: y,
          borderRightColor: "transparent",
          borderTopColor: "transparent",
          clipPath: "polygon(0 100%, 0 0, 100% 100%)",
        }
      : p === "top"
        ? {
            ...g,
            ...Mv(m, u, a, s, h),
            bottom: y,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          }
        : p === "bottom"
          ? {
              ...g,
              ...Mv(m, u, a, s, h),
              top: y,
              borderBottomColor: "transparent",
              borderRightColor: "transparent",
              clipPath: "polygon(0 100%, 0 0, 100% 0)",
            }
          : {};
}
const Mb = x.forwardRef(
  (
    {
      position: e,
      arrowSize: r,
      arrowOffset: a,
      arrowRadius: i,
      arrowPosition: s,
      visible: u,
      arrowX: f,
      arrowY: h,
      style: p,
      ...m
    },
    g,
  ) => {
    const { dir: y } = oh();
    return u
      ? v.jsx("div", {
          ...m,
          ref: g,
          style: {
            ...p,
            ...uR({
              position: e,
              arrowSize: r,
              arrowOffset: a,
              arrowRadius: i,
              arrowPosition: s,
              dir: y,
              arrowX: f,
              arrowY: h,
            }),
          },
        })
      : null;
  },
);
Mb.displayName = "@mantine/core/FloatingArrow";
function cR(e, r) {
  if (e === "rtl" && (r.includes("right") || r.includes("left"))) {
    const [a, i] = r.split("-"),
      s = a === "right" ? "left" : "right";
    return i === void 0 ? s : `${s}-${i}`;
  }
  return r;
}
var $b = { root: "m_9814e45f" };
const fR = { zIndex: eh("modal") },
  dR = (
    e,
    {
      gradient: r,
      color: a,
      backgroundOpacity: i,
      blur: s,
      radius: u,
      zIndex: f,
    },
  ) => ({
    root: {
      "--overlay-bg":
        r ||
        ((a !== void 0 || i !== void 0) && Wn(a || "#000", i ?? 0.6)) ||
        void 0,
      "--overlay-filter": s ? `blur(${K(s)})` : void 0,
      "--overlay-radius": u === void 0 ? void 0 : Bn(u),
      "--overlay-z-index": f?.toString(),
    },
  }),
  bh = Kt((e, r) => {
    const a = ae("Overlay", fR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        fixed: m,
        center: g,
        children: y,
        radius: S,
        zIndex: w,
        gradient: E,
        blur: T,
        color: R,
        backgroundOpacity: _,
        mod: j,
        ...A
      } = a,
      D = Ee({
        name: "Overlay",
        props: a,
        classes: $b,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: dR,
      });
    return v.jsx(ge, {
      ref: r,
      ...D("root"),
      mod: [{ center: g, fixed: m }, j],
      ...A,
      children: y,
    });
  });
bh.classes = $b;
bh.displayName = "@mantine/core/Overlay";
function gd(e) {
  const r = document.createElement("div");
  return (
    r.setAttribute("data-portal", "true"),
    typeof e.className == "string" &&
      r.classList.add(...e.className.split(" ").filter(Boolean)),
    typeof e.style == "object" && Object.assign(r.style, e.style),
    typeof e.id == "string" && r.setAttribute("id", e.id),
    r
  );
}
function hR({ target: e, reuseTargetNode: r, ...a }) {
  if (e) return typeof e == "string" ? document.querySelector(e) || gd(a) : e;
  if (r) {
    const i = document.querySelector("[data-mantine-shared-portal-node]");
    if (i) return i;
    const s = gd(a);
    return (
      s.setAttribute("data-mantine-shared-portal-node", "true"),
      document.body.appendChild(s),
      s
    );
  }
  return gd(a);
}
const pR = { reuseTargetNode: !0 },
  kb = Se((e, r) => {
    const {
        children: a,
        target: i,
        reuseTargetNode: s,
        ...u
      } = ae("Portal", pR, e),
      [f, h] = x.useState(!1),
      p = x.useRef(null);
    return (
      pl(
        () => (
          h(!0),
          (p.current = hR({ target: i, reuseTargetNode: s, ...u })),
          iu(r, p.current),
          !i && !s && p.current && document.body.appendChild(p.current),
          () => {
            !i && !s && p.current && document.body.removeChild(p.current);
          }
        ),
        [i],
      ),
      !f || !p.current
        ? null
        : ih.createPortal(v.jsx(v.Fragment, { children: a }), p.current)
    );
  });
kb.displayName = "@mantine/core/Portal";
const Au = Se(({ withinPortal: e = !0, children: r, ...a }, i) =>
  xu() === "test" || !e
    ? v.jsx(v.Fragment, { children: r })
    : v.jsx(kb, { ref: i, ...a, children: r }),
);
Au.displayName = "@mantine/core/OptionalPortal";
const Ki = (e) => ({
    in: { opacity: 1, transform: "scale(1)" },
    out: {
      opacity: 0,
      transform: `scale(.9) translateY(${e === "bottom" ? 10 : -10}px)`,
    },
    transitionProperty: "transform, opacity",
  }),
  Gs = {
    fade: {
      in: { opacity: 1 },
      out: { opacity: 0 },
      transitionProperty: "opacity",
    },
    "fade-up": {
      in: { opacity: 1, transform: "translateY(0)" },
      out: { opacity: 0, transform: "translateY(30px)" },
      transitionProperty: "opacity, transform",
    },
    "fade-down": {
      in: { opacity: 1, transform: "translateY(0)" },
      out: { opacity: 0, transform: "translateY(-30px)" },
      transitionProperty: "opacity, transform",
    },
    "fade-left": {
      in: { opacity: 1, transform: "translateX(0)" },
      out: { opacity: 0, transform: "translateX(30px)" },
      transitionProperty: "opacity, transform",
    },
    "fade-right": {
      in: { opacity: 1, transform: "translateX(0)" },
      out: { opacity: 0, transform: "translateX(-30px)" },
      transitionProperty: "opacity, transform",
    },
    scale: {
      in: { opacity: 1, transform: "scale(1)" },
      out: { opacity: 0, transform: "scale(0)" },
      common: { transformOrigin: "top" },
      transitionProperty: "transform, opacity",
    },
    "scale-y": {
      in: { opacity: 1, transform: "scaleY(1)" },
      out: { opacity: 0, transform: "scaleY(0)" },
      common: { transformOrigin: "top" },
      transitionProperty: "transform, opacity",
    },
    "scale-x": {
      in: { opacity: 1, transform: "scaleX(1)" },
      out: { opacity: 0, transform: "scaleX(0)" },
      common: { transformOrigin: "left" },
      transitionProperty: "transform, opacity",
    },
    "skew-up": {
      in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
      out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
      common: { transformOrigin: "top" },
      transitionProperty: "transform, opacity",
    },
    "skew-down": {
      in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
      out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
      common: { transformOrigin: "bottom" },
      transitionProperty: "transform, opacity",
    },
    "rotate-left": {
      in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
      out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
      common: { transformOrigin: "bottom" },
      transitionProperty: "transform, opacity",
    },
    "rotate-right": {
      in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
      out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
      common: { transformOrigin: "top" },
      transitionProperty: "transform, opacity",
    },
    "slide-down": {
      in: { opacity: 1, transform: "translateY(0)" },
      out: { opacity: 0, transform: "translateY(-100%)" },
      common: { transformOrigin: "top" },
      transitionProperty: "transform, opacity",
    },
    "slide-up": {
      in: { opacity: 1, transform: "translateY(0)" },
      out: { opacity: 0, transform: "translateY(100%)" },
      common: { transformOrigin: "bottom" },
      transitionProperty: "transform, opacity",
    },
    "slide-left": {
      in: { opacity: 1, transform: "translateX(0)" },
      out: { opacity: 0, transform: "translateX(100%)" },
      common: { transformOrigin: "left" },
      transitionProperty: "transform, opacity",
    },
    "slide-right": {
      in: { opacity: 1, transform: "translateX(0)" },
      out: { opacity: 0, transform: "translateX(-100%)" },
      common: { transformOrigin: "right" },
      transitionProperty: "transform, opacity",
    },
    pop: { ...Ki("bottom"), common: { transformOrigin: "center center" } },
    "pop-bottom-left": {
      ...Ki("bottom"),
      common: { transformOrigin: "bottom left" },
    },
    "pop-bottom-right": {
      ...Ki("bottom"),
      common: { transformOrigin: "bottom right" },
    },
    "pop-top-left": { ...Ki("top"), common: { transformOrigin: "top left" } },
    "pop-top-right": { ...Ki("top"), common: { transformOrigin: "top right" } },
  },
  $v = {
    entering: "in",
    entered: "in",
    exiting: "out",
    exited: "out",
    "pre-exiting": "out",
    "pre-entering": "out",
  };
function mR({ transition: e, state: r, duration: a, timingFunction: i }) {
  const s = {
    WebkitBackfaceVisibility: "hidden",
    willChange: "transform, opacity",
    transitionDuration: `${a}ms`,
    transitionTimingFunction: i,
  };
  return typeof e == "string"
    ? e in Gs
      ? {
          transitionProperty: Gs[e].transitionProperty,
          ...s,
          ...Gs[e].common,
          ...Gs[e][$v[r]],
        }
      : {}
    : {
        transitionProperty: e.transitionProperty,
        ...s,
        ...e.common,
        ...e[$v[r]],
      };
}
function gR({
  duration: e,
  exitDuration: r,
  timingFunction: a,
  mounted: i,
  onEnter: s,
  onExit: u,
  onEntered: f,
  onExited: h,
  enterDelay: p,
  exitDelay: m,
}) {
  const g = sn(),
    y = cC(),
    S = g.respectReducedMotion ? y : !1,
    [w, E] = x.useState(S ? 0 : e),
    [T, R] = x.useState(i ? "entered" : "exited"),
    _ = x.useRef(-1),
    j = x.useRef(-1),
    A = x.useRef(-1);
  function D() {
    window.clearTimeout(_.current),
      window.clearTimeout(j.current),
      cancelAnimationFrame(A.current);
  }
  const U = (Z) => {
      D();
      const V = Z ? s : u,
        W = Z ? f : h,
        ee = S ? 0 : Z ? e : r;
      E(ee),
        ee === 0
          ? (typeof V == "function" && V(),
            typeof W == "function" && W(),
            R(Z ? "entered" : "exited"))
          : (A.current = requestAnimationFrame(() => {
              wE.flushSync(() => {
                R(Z ? "pre-entering" : "pre-exiting");
              }),
                (A.current = requestAnimationFrame(() => {
                  typeof V == "function" && V(),
                    R(Z ? "entering" : "exiting"),
                    (_.current = window.setTimeout(() => {
                      typeof W == "function" && W(),
                        R(Z ? "entered" : "exited");
                    }, ee));
                }));
            }));
    },
    k = (Z) => {
      if ((D(), typeof (Z ? p : m) != "number")) {
        U(Z);
        return;
      }
      j.current = window.setTimeout(
        () => {
          U(Z);
        },
        Z ? p : m,
      );
    };
  return (
    Ji(() => {
      k(i);
    }, [i]),
    x.useEffect(
      () => () => {
        D();
      },
      [],
    ),
    {
      transitionDuration: w,
      transitionStatus: T,
      transitionTimingFunction: a || "ease",
    }
  );
}
function Po({
  keepMounted: e,
  transition: r = "fade",
  duration: a = 250,
  exitDuration: i = a,
  mounted: s,
  children: u,
  timingFunction: f = "ease",
  onExit: h,
  onEntered: p,
  onEnter: m,
  onExited: g,
  enterDelay: y,
  exitDelay: S,
}) {
  const w = xu(),
    {
      transitionDuration: E,
      transitionStatus: T,
      transitionTimingFunction: R,
    } = gR({
      mounted: s,
      exitDuration: i,
      duration: a,
      timingFunction: f,
      onExit: h,
      onEntered: p,
      onEnter: m,
      onExited: g,
      enterDelay: y,
      exitDelay: S,
    });
  return E === 0 || w === "test"
    ? s
      ? v.jsx(v.Fragment, { children: u({}) })
      : e
        ? u({ display: "none" })
        : null
    : T === "exited"
      ? e
        ? u({ display: "none" })
        : null
      : v.jsx(v.Fragment, {
          children: u(
            mR({ transition: r, duration: E, state: T, timingFunction: R }),
          ),
        });
}
Po.displayName = "@mantine/core/Transition";
const [yR, Lb] = hl("Popover component was not found in the tree");
function Sh({ children: e, active: r = !0, refProp: a = "ref", innerRef: i }) {
  const s = iC(r),
    u = Zt(s, i);
  return dl(e) ? x.cloneElement(e, { [a]: u }) : e;
}
function Ub(e) {
  return v.jsx(vh, { tabIndex: -1, "data-autofocus": !0, ...e });
}
Sh.displayName = "@mantine/core/FocusTrap";
Ub.displayName = "@mantine/core/FocusTrapInitialFocus";
Sh.InitialFocus = Ub;
var Hb = { dropdown: "m_38a85659", arrow: "m_a31dc6c1", overlay: "m_3d7bc908" };
const vR = {},
  xh = Se((e, r) => {
    const a = ae("PopoverDropdown", vR, e),
      {
        className: i,
        style: s,
        vars: u,
        children: f,
        onKeyDownCapture: h,
        variant: p,
        classNames: m,
        styles: g,
        ...y
      } = a,
      S = Lb(),
      w = eC({ opened: S.opened, shouldReturnFocus: S.returnFocus }),
      E = S.withRoles
        ? {
            "aria-labelledby": S.getTargetId(),
            id: S.getDropdownId(),
            role: "dialog",
            tabIndex: -1,
          }
        : {},
      T = Zt(r, S.floating);
    return S.disabled
      ? null
      : v.jsx(Au, {
          ...S.portalProps,
          withinPortal: S.withinPortal,
          children: v.jsx(Po, {
            mounted: S.opened,
            ...S.transitionProps,
            transition: S.transitionProps?.transition || "fade",
            duration: S.transitionProps?.duration ?? 150,
            keepMounted: S.keepMounted,
            exitDuration:
              typeof S.transitionProps?.exitDuration == "number"
                ? S.transitionProps.exitDuration
                : S.transitionProps?.duration,
            children: (R) =>
              v.jsx(Sh, {
                active: S.trapFocus && S.opened,
                innerRef: T,
                children: v.jsxs(ge, {
                  ...E,
                  ...y,
                  variant: p,
                  onKeyDownCapture: F2(
                    () => {
                      S.onClose?.(), S.onDismiss?.();
                    },
                    { active: S.closeOnEscape, onTrigger: w, onKeyDown: h },
                  ),
                  "data-position": S.placement,
                  "data-fixed": S.floatingStrategy === "fixed" || void 0,
                  ...S.getStyles("dropdown", {
                    className: i,
                    props: a,
                    classNames: m,
                    styles: g,
                    style: [
                      {
                        ...R,
                        zIndex: S.zIndex,
                        top: S.y ?? 0,
                        left: S.x ?? 0,
                        width: S.width === "target" ? void 0 : K(S.width),
                        ...(S.referenceHidden ? { display: "none" } : null),
                      },
                      S.resolvedStyles.dropdown,
                      g?.dropdown,
                      s,
                    ],
                  }),
                  children: [
                    f,
                    v.jsx(Mb, {
                      ref: S.arrowRef,
                      arrowX: S.arrowX,
                      arrowY: S.arrowY,
                      visible: S.withArrow,
                      position: S.placement,
                      arrowSize: S.arrowSize,
                      arrowRadius: S.arrowRadius,
                      arrowOffset: S.arrowOffset,
                      arrowPosition: S.arrowPosition,
                      ...S.getStyles("arrow", {
                        props: a,
                        classNames: m,
                        styles: g,
                      }),
                    }),
                  ],
                }),
              }),
          }),
        });
  });
xh.classes = Hb;
xh.displayName = "@mantine/core/PopoverDropdown";
const bR = { refProp: "ref", popupType: "dialog" },
  Bb = Se((e, r) => {
    const {
      children: a,
      refProp: i,
      popupType: s,
      ...u
    } = ae("PopoverTarget", bR, e);
    if (!dl(a))
      throw new Error(
        "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const f = u,
      h = Lb(),
      p = Zt(h.reference, G0(a), r),
      m = h.withRoles
        ? {
            "aria-haspopup": s,
            "aria-expanded": h.opened,
            "aria-controls": h.getDropdownId(),
            id: h.getTargetId(),
          }
        : {};
    return x.cloneElement(a, {
      ...f,
      ...m,
      ...h.targetProps,
      className: Pn(h.targetProps.className, f.className, a.props.className),
      [i]: p,
      ...(h.controlled
        ? null
        : {
            onClick: () => {
              h.onToggle(), a.props.onClick?.();
            },
          }),
    });
  });
Bb.displayName = "@mantine/core/PopoverTarget";
function SR(e) {
  if (e === void 0) return { shift: !0, flip: !0 };
  const r = { ...e };
  return (
    e.shift === void 0 && (r.shift = !0), e.flip === void 0 && (r.flip = !0), r
  );
}
function xR(e, r, a) {
  const i = SR(e.middlewares),
    s = [A_(e.offset), j_()];
  return (
    e.dropdownVisible &&
      a !== "test" &&
      e.preventPositionChangeWhenVisible &&
      ((i.flip = !1), (i.shift = !1)),
    i.shift &&
      s.push(
        z_(
          typeof i.shift == "boolean"
            ? { limiter: Tv(), padding: 5 }
            : { limiter: Tv(), padding: 5, ...i.shift },
        ),
      ),
    i.flip && s.push(typeof i.flip == "boolean" ? Av() : Av(i.flip)),
    i.inline && s.push(typeof i.inline == "boolean" ? zv() : zv(i.inline)),
    s.push(D_({ element: e.arrowRef, padding: e.arrowOffset })),
    (i.size || e.width === "target") &&
      s.push(
        O_({
          ...(typeof i.size == "boolean" ? {} : i.size),
          apply({ rects: u, availableWidth: f, availableHeight: h, ...p }) {
            const g = r().refs.floating.current?.style ?? {};
            i.size &&
              (typeof i.size == "object" && i.size.apply
                ? i.size.apply({
                    rects: u,
                    availableWidth: f,
                    availableHeight: h,
                    ...p,
                  })
                : Object.assign(g, {
                    maxWidth: `${f}px`,
                    maxHeight: `${h}px`,
                  })),
              e.width === "target" &&
                Object.assign(g, { width: `${u.reference.width}px` });
          },
        }),
      ),
    s
  );
}
function wR(e) {
  const r = xu(),
    [a, i] = To({
      value: e.opened,
      defaultValue: e.defaultOpened,
      finalValue: !1,
      onChange: e.onChange,
    }),
    s = x.useRef(a),
    u = () => {
      a && !e.disabled && i(!1);
    },
    f = () => {
      e.disabled || i(!a);
    },
    h = F_({
      strategy: e.strategy,
      placement: e.preventPositionChangeWhenVisible
        ? e.positionRef.current
        : e.position,
      middleware: xR(e, () => h, r),
      whileElementsMounted: e.keepMounted ? void 0 : Ev,
    });
  return (
    x.useEffect(() => {
      if (
        !(
          !e.keepMounted ||
          !h.refs.reference.current ||
          !h.refs.floating.current
        ) &&
        a
      )
        return Ev(h.refs.reference.current, h.refs.floating.current, h.update);
    }, [e.keepMounted, a, h.refs.reference, h.refs.floating, h.update]),
    Ji(() => {
      e.onPositionChange?.(h.placement), (e.positionRef.current = h.placement);
    }, [h.placement]),
    Ji(() => {
      a !== s.current && (a ? e.onOpen?.() : e.onClose?.()), (s.current = a);
    }, [a, e.onClose, e.onOpen]),
    Ji(() => {
      let p = -1;
      return (
        a && (p = window.setTimeout(() => e.setDropdownVisible(!0), 4)),
        () => {
          window.clearTimeout(p);
        }
      );
    }, [a, e.position]),
    {
      floating: h,
      controlled: typeof e.opened == "boolean",
      opened: a,
      onClose: u,
      onToggle: f,
    }
  );
}
const CR = {
    position: "bottom",
    offset: 8,
    positionDependencies: [],
    transitionProps: { transition: "fade", duration: 150 },
    middlewares: { flip: !0, shift: !0, inline: !1 },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: "side",
    closeOnClickOutside: !0,
    withinPortal: !0,
    closeOnEscape: !0,
    trapFocus: !1,
    withRoles: !0,
    returnFocus: !1,
    withOverlay: !1,
    hideDetached: !0,
    clickOutsideEvents: ["mousedown", "touchstart"],
    zIndex: eh("popover"),
    __staticSelector: "Popover",
    width: "max-content",
  },
  ER = (e, { radius: r, shadow: a }) => ({
    dropdown: {
      "--popover-radius": r === void 0 ? void 0 : Bn(r),
      "--popover-shadow": Z0(a),
    },
  });
function ea(e) {
  const r = ae("Popover", CR, e),
    {
      children: a,
      position: i,
      offset: s,
      onPositionChange: u,
      positionDependencies: f,
      opened: h,
      transitionProps: p,
      onExitTransitionEnd: m,
      onEnterTransitionEnd: g,
      width: y,
      middlewares: S,
      withArrow: w,
      arrowSize: E,
      arrowOffset: T,
      arrowRadius: R,
      arrowPosition: _,
      unstyled: j,
      classNames: A,
      styles: D,
      closeOnClickOutside: U,
      withinPortal: k,
      portalProps: Z,
      closeOnEscape: V,
      clickOutsideEvents: W,
      trapFocus: ee,
      onClose: pe,
      onDismiss: oe,
      onOpen: ce,
      onChange: fe,
      zIndex: le,
      radius: M,
      shadow: Q,
      id: Y,
      defaultOpened: re,
      __staticSelector: O,
      withRoles: G,
      disabled: ne,
      returnFocus: J,
      variant: ie,
      keepMounted: me,
      vars: de,
      floatingStrategy: te,
      withOverlay: ue,
      overlayProps: Ae,
      hideDetached: Ve,
      preventPositionChangeWhenVisible: Ie,
      ...St
    } = r,
    qe = Ee({
      name: O,
      props: r,
      classes: Hb,
      classNames: A,
      styles: D,
      unstyled: j,
      rootSelector: "dropdown",
      vars: de,
      varsResolver: ER,
    }),
    { resolvedStyles: xt } = Uo({ classNames: A, styles: D, props: r }),
    [un, qn] = x.useState(h ?? re ?? !1),
    ft = x.useRef(i),
    it = x.useRef(null),
    [_n, Yn] = x.useState(null),
    [lt, Go] = x.useState(null),
    { dir: ja } = oh(),
    Fo = xu(),
    Da = ml(Y),
    Ye = wR({
      middlewares: S,
      width: y,
      position: cR(ja, i),
      offset: typeof s == "number" ? s + (w ? E / 2 : 0) : s,
      arrowRef: it,
      arrowOffset: T,
      onPositionChange: u,
      positionDependencies: f,
      opened: h,
      defaultOpened: re,
      onChange: fe,
      onOpen: ce,
      onClose: pe,
      onDismiss: oe,
      strategy: te,
      dropdownVisible: un,
      setDropdownVisible: qn,
      positionRef: ft,
      disabled: ne,
      preventPositionChangeWhenVisible: Ie,
      keepMounted: me,
    });
  K2(
    () => {
      U && (Ye.onClose(), oe?.());
    },
    W,
    [_n, lt],
  );
  const wt = x.useCallback(
      (Rn) => {
        Yn(Rn), Ye.floating.refs.setReference(Rn);
      },
      [Ye.floating.refs.setReference],
    ),
    cn = x.useCallback(
      (Rn) => {
        Go(Rn), Ye.floating.refs.setFloating(Rn);
      },
      [Ye.floating.refs.setFloating],
    ),
    Ct = x.useCallback(() => {
      p?.onExited?.(), m?.(), qn(!1), (ft.current = i);
    }, [p?.onExited, m]),
    Na = x.useCallback(() => {
      p?.onEntered?.(), g?.();
    }, [p?.onEntered, g]);
  return v.jsxs(yR, {
    value: {
      returnFocus: J,
      disabled: ne,
      controlled: Ye.controlled,
      reference: wt,
      floating: cn,
      x: Ye.floating.x,
      y: Ye.floating.y,
      arrowX: Ye.floating?.middlewareData?.arrow?.x,
      arrowY: Ye.floating?.middlewareData?.arrow?.y,
      opened: Ye.opened,
      arrowRef: it,
      transitionProps: { ...p, onExited: Ct, onEntered: Na },
      width: y,
      withArrow: w,
      arrowSize: E,
      arrowOffset: T,
      arrowRadius: R,
      arrowPosition: _,
      placement: Ye.floating.placement,
      trapFocus: ee,
      withinPortal: k,
      portalProps: Z,
      zIndex: le,
      radius: M,
      shadow: Q,
      closeOnEscape: V,
      onDismiss: oe,
      onClose: Ye.onClose,
      onToggle: Ye.onToggle,
      getTargetId: () => `${Da}-target`,
      getDropdownId: () => `${Da}-dropdown`,
      withRoles: G,
      targetProps: St,
      __staticSelector: O,
      classNames: A,
      styles: D,
      unstyled: j,
      variant: ie,
      keepMounted: me,
      getStyles: qe,
      resolvedStyles: xt,
      floatingStrategy: te,
      referenceHidden:
        Ve && Fo !== "test"
          ? Ye.floating.middlewareData.hide?.referenceHidden
          : !1,
    },
    children: [
      a,
      ue &&
        v.jsx(Po, {
          transition: "fade",
          mounted: Ye.opened,
          duration: p?.duration || 250,
          exitDuration: p?.exitDuration || 250,
          children: (Rn) =>
            v.jsx(Au, {
              withinPortal: k,
              children: v.jsx(bh, {
                ...Ae,
                ...qe("overlay", {
                  className: Ae?.className,
                  style: [Rn, Ae?.style],
                }),
              }),
            }),
        }),
    ],
  });
}
ea.Target = Bb;
ea.Dropdown = xh;
ea.displayName = "@mantine/core/Popover";
ea.extend = (e) => e;
var Dn = {
  root: "m_5ae2e3c",
  barsLoader: "m_7a2bd4cd",
  bar: "m_870bb79",
  "bars-loader-animation": "m_5d2b3b9d",
  dotsLoader: "m_4e3f22d7",
  dot: "m_870c4af",
  "loader-dots-animation": "m_aac34a1",
  ovalLoader: "m_b34414df",
  "oval-loader-animation": "m_f8e89c4b",
};
const Pb = x.forwardRef(({ className: e, ...r }, a) =>
  v.jsxs(ge, {
    component: "span",
    className: Pn(Dn.barsLoader, e),
    ...r,
    ref: a,
    children: [
      v.jsx("span", { className: Dn.bar }),
      v.jsx("span", { className: Dn.bar }),
      v.jsx("span", { className: Dn.bar }),
    ],
  }),
);
Pb.displayName = "@mantine/core/Bars";
const Zb = x.forwardRef(({ className: e, ...r }, a) =>
  v.jsxs(ge, {
    component: "span",
    className: Pn(Dn.dotsLoader, e),
    ...r,
    ref: a,
    children: [
      v.jsx("span", { className: Dn.dot }),
      v.jsx("span", { className: Dn.dot }),
      v.jsx("span", { className: Dn.dot }),
    ],
  }),
);
Zb.displayName = "@mantine/core/Dots";
const Vb = x.forwardRef(({ className: e, ...r }, a) =>
  v.jsx(ge, {
    component: "span",
    className: Pn(Dn.ovalLoader, e),
    ...r,
    ref: a,
  }),
);
Vb.displayName = "@mantine/core/Oval";
const qb = { bars: Pb, oval: Vb, dots: Zb },
  _R = { loaders: qb, type: "oval" },
  RR = (e, { size: r, color: a }) => ({
    root: {
      "--loader-size": He(r, "loader-size"),
      "--loader-color": a ? rl(a, e) : void 0,
    },
  }),
  Zo = Se((e, r) => {
    const a = ae("Loader", _R, e),
      {
        size: i,
        color: s,
        type: u,
        vars: f,
        className: h,
        style: p,
        classNames: m,
        styles: g,
        unstyled: y,
        loaders: S,
        variant: w,
        children: E,
        ...T
      } = a,
      R = Ee({
        name: "Loader",
        props: a,
        classes: Dn,
        className: h,
        style: p,
        classNames: m,
        styles: g,
        unstyled: y,
        vars: f,
        varsResolver: RR,
      });
    return E
      ? v.jsx(ge, { ...R("root"), ref: r, ...T, children: E })
      : v.jsx(ge, {
          ...R("root"),
          ref: r,
          component: S[u],
          variant: w,
          size: i,
          ...T,
        });
  });
Zo.defaultLoaders = qb;
Zo.classes = Dn;
Zo.displayName = "@mantine/core/Loader";
var Vo = {
  root: "m_8d3f4000",
  icon: "m_8d3afb97",
  loader: "m_302b9fb1",
  group: "m_1a0f1b21",
  groupSection: "m_437b6484",
};
const kv = { orientation: "horizontal" },
  TR = (e, { borderWidth: r }) => ({ group: { "--ai-border-width": K(r) } }),
  wh = Se((e, r) => {
    const a = ae("ActionIconGroup", kv, e),
      {
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        orientation: p,
        vars: m,
        borderWidth: g,
        variant: y,
        mod: S,
        ...w
      } = ae("ActionIconGroup", kv, e),
      E = Ee({
        name: "ActionIconGroup",
        props: a,
        classes: Vo,
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: m,
        varsResolver: TR,
        rootSelector: "group",
      });
    return v.jsx(ge, {
      ...E("group"),
      ref: r,
      variant: y,
      mod: [{ "data-orientation": p }, S],
      role: "group",
      ...w,
    });
  });
wh.classes = Vo;
wh.displayName = "@mantine/core/ActionIconGroup";
const Lv = {},
  AR = (
    e,
    { radius: r, color: a, gradient: i, variant: s, autoContrast: u, size: f },
  ) => {
    const h = e.variantColorResolver({
      color: a || e.primaryColor,
      theme: e,
      gradient: i,
      variant: s || "filled",
      autoContrast: u,
    });
    return {
      groupSection: {
        "--section-height": He(f, "section-height"),
        "--section-padding-x": He(f, "section-padding-x"),
        "--section-fz": Pt(f),
        "--section-radius": r === void 0 ? void 0 : Bn(r),
        "--section-bg": a || s ? h.background : void 0,
        "--section-color": h.color,
        "--section-bd": a || s ? h.border : void 0,
      },
    };
  },
  Ch = Se((e, r) => {
    const a = ae("ActionIconGroupSection", Lv, e),
      {
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: p,
        variant: m,
        gradient: g,
        radius: y,
        autoContrast: S,
        ...w
      } = ae("ActionIconGroupSection", Lv, e),
      E = Ee({
        name: "ActionIconGroupSection",
        props: a,
        classes: Vo,
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: AR,
        rootSelector: "groupSection",
      });
    return v.jsx(ge, { ...E("groupSection"), ref: r, variant: m, ...w });
  });
Ch.classes = Vo;
Ch.displayName = "@mantine/core/ActionIconGroupSection";
const zR = {},
  OR = (
    e,
    { size: r, radius: a, variant: i, gradient: s, color: u, autoContrast: f },
  ) => {
    const h = e.variantColorResolver({
      color: u || e.primaryColor,
      theme: e,
      gradient: s,
      variant: i || "filled",
      autoContrast: f,
    });
    return {
      root: {
        "--ai-size": He(r, "ai-size"),
        "--ai-radius": a === void 0 ? void 0 : Bn(a),
        "--ai-bg": u || i ? h.background : void 0,
        "--ai-hover": u || i ? h.hover : void 0,
        "--ai-hover-color": u || i ? h.hoverColor : void 0,
        "--ai-color": h.color,
        "--ai-bd": u || i ? h.border : void 0,
      },
    };
  },
  Nn = Kt((e, r) => {
    const a = ae("ActionIcon", zR, e),
      {
        className: i,
        unstyled: s,
        variant: u,
        classNames: f,
        styles: h,
        style: p,
        loading: m,
        loaderProps: g,
        size: y,
        color: S,
        radius: w,
        __staticSelector: E,
        gradient: T,
        vars: R,
        children: _,
        disabled: j,
        "data-disabled": A,
        autoContrast: D,
        mod: U,
        ...k
      } = a,
      Z = Ee({
        name: ["ActionIcon", E],
        props: a,
        className: i,
        style: p,
        classes: Vo,
        classNames: f,
        styles: h,
        unstyled: s,
        vars: R,
        varsResolver: OR,
      });
    return v.jsxs(Sl, {
      ...Z("root", { active: !j && !m && !A }),
      ...k,
      unstyled: s,
      variant: u,
      size: y,
      disabled: j || m,
      ref: r,
      mod: [{ loading: m, disabled: j || A }, U],
      children: [
        v.jsx(Po, {
          mounted: !!m,
          transition: "slide-down",
          duration: 150,
          children: (V) =>
            v.jsx(ge, {
              component: "span",
              ...Z("loader", { style: V }),
              "aria-hidden": !0,
              children: v.jsx(Zo, {
                color: "var(--ai-color)",
                size: "calc(var(--ai-size) * 0.55)",
                ...g,
              }),
            }),
        }),
        v.jsx(ge, {
          component: "span",
          mod: { loading: m },
          ...Z("icon"),
          children: _,
        }),
      ],
    });
  });
Nn.classes = Vo;
Nn.displayName = "@mantine/core/ActionIcon";
Nn.Group = wh;
Nn.GroupSection = Ch;
const Yb = x.forwardRef(
  ({ size: e = "var(--cb-icon-size, 70%)", style: r, ...a }, i) =>
    v.jsx("svg", {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...r, width: e, height: e },
      ref: i,
      ...a,
      children: v.jsx("path", {
        d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    }),
);
Yb.displayName = "@mantine/core/CloseIcon";
var Gb = { root: "m_86a44da5", "root--subtle": "m_220c80f2" };
const jR = { variant: "subtle" },
  DR = (e, { size: r, radius: a, iconSize: i }) => ({
    root: {
      "--cb-size": He(r, "cb-size"),
      "--cb-radius": a === void 0 ? void 0 : Bn(a),
      "--cb-icon-size": K(i),
    },
  }),
  qo = Kt((e, r) => {
    const a = ae("CloseButton", jR, e),
      {
        iconSize: i,
        children: s,
        vars: u,
        radius: f,
        className: h,
        classNames: p,
        style: m,
        styles: g,
        unstyled: y,
        "data-disabled": S,
        disabled: w,
        variant: E,
        icon: T,
        mod: R,
        __staticSelector: _,
        ...j
      } = a,
      A = Ee({
        name: _ || "CloseButton",
        props: a,
        className: h,
        style: m,
        classes: Gb,
        classNames: p,
        styles: g,
        unstyled: y,
        vars: u,
        varsResolver: DR,
      });
    return v.jsxs(Sl, {
      ref: r,
      ...j,
      unstyled: y,
      variant: E,
      disabled: w,
      mod: [{ disabled: w || S }, R],
      ...A("root", { variant: E, active: !w && !S }),
      children: [T || v.jsx(Yb, {}), s],
    });
  });
qo.classes = Gb;
qo.displayName = "@mantine/core/CloseButton";
function NR(e) {
  return x.Children.toArray(e).filter(Boolean);
}
var Fb = { root: "m_4081bf90" };
const MR = {
    preventGrowOverflow: !0,
    gap: "md",
    align: "center",
    justify: "flex-start",
    wrap: "wrap",
  },
  $R = (
    e,
    { grow: r, preventGrowOverflow: a, gap: i, align: s, justify: u, wrap: f },
    { childWidth: h },
  ) => ({
    root: {
      "--group-child-width": r && a ? h : void 0,
      "--group-gap": Cr(i),
      "--group-align": s,
      "--group-justify": u,
      "--group-wrap": f,
    },
  }),
  xl = Se((e, r) => {
    const a = ae("Group", MR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        children: p,
        gap: m,
        align: g,
        justify: y,
        wrap: S,
        grow: w,
        preventGrowOverflow: E,
        vars: T,
        variant: R,
        __size: _,
        mod: j,
        ...A
      } = a,
      D = NR(p),
      U = D.length,
      k = Cr(m ?? "md"),
      V = { childWidth: `calc(${100 / U}% - (${k} - ${k} / ${U}))` },
      W = Ee({
        name: "Group",
        props: a,
        stylesCtx: V,
        className: s,
        style: u,
        classes: Fb,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: T,
        varsResolver: $R,
      });
    return v.jsx(ge, {
      ...W("root"),
      ref: r,
      variant: R,
      mod: [{ grow: w }, j],
      size: _,
      ...A,
      children: D,
    });
  });
xl.classes = Fb;
xl.displayName = "@mantine/core/Group";
const [kR, LR] = vu({ size: "sm" }),
  UR = {},
  Qb = Se((e, r) => {
    const a = ae("InputClearButton", UR, e),
      { size: i, variant: s, vars: u, classNames: f, styles: h, ...p } = a,
      m = LR(),
      { resolvedClassNames: g, resolvedStyles: y } = Uo({
        classNames: f,
        styles: h,
        props: a,
      });
    return v.jsx(qo, {
      variant: s || "transparent",
      ref: r,
      size: i || m?.size || "sm",
      classNames: g,
      styles: y,
      __staticSelector: "InputClearButton",
      ...p,
    });
  });
Qb.displayName = "@mantine/core/InputClearButton";
const [HR, wl] = vu({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0,
});
var Cn = {
  wrapper: "m_6c018570",
  input: "m_8fb7ebe7",
  section: "m_82577fc2",
  placeholder: "m_88bacfd0",
  root: "m_46b77525",
  label: "m_8fdc1311",
  required: "m_78a94662",
  error: "m_8f816625",
  description: "m_fe47ce59",
};
const Uv = {},
  BR = (e, { size: r }) => ({
    description: {
      "--input-description-size":
        r === void 0 ? void 0 : `calc(${Pt(r)} - ${K(2)})`,
    },
  }),
  zu = Se((e, r) => {
    const a = ae("InputDescription", Uv, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        size: m,
        __staticSelector: g,
        __inheritStyles: y = !0,
        variant: S,
        ...w
      } = ae("InputDescription", Uv, a),
      E = wl(),
      T = Ee({
        name: ["InputWrapper", g],
        props: a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        rootSelector: "description",
        vars: p,
        varsResolver: BR,
      }),
      R = (y && E?.getStyles) || T;
    return v.jsx(ge, {
      component: "p",
      ref: r,
      variant: S,
      size: m,
      ...R("description", E?.getStyles ? { className: s, style: u } : void 0),
      ...w,
    });
  });
zu.classes = Cn;
zu.displayName = "@mantine/core/InputDescription";
const PR = {},
  ZR = (e, { size: r }) => ({
    error: {
      "--input-error-size": r === void 0 ? void 0 : `calc(${Pt(r)} - ${K(2)})`,
    },
  }),
  Ou = Se((e, r) => {
    const a = ae("InputError", PR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        size: m,
        __staticSelector: g,
        __inheritStyles: y = !0,
        variant: S,
        ...w
      } = a,
      E = Ee({
        name: ["InputWrapper", g],
        props: a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        rootSelector: "error",
        vars: p,
        varsResolver: ZR,
      }),
      T = wl(),
      R = (y && T?.getStyles) || E;
    return v.jsx(ge, {
      component: "p",
      ref: r,
      variant: S,
      size: m,
      ...R("error", T?.getStyles ? { className: s, style: u } : void 0),
      ...w,
    });
  });
Ou.classes = Cn;
Ou.displayName = "@mantine/core/InputError";
const Hv = { labelElement: "label" },
  VR = (e, { size: r }) => ({
    label: { "--input-label-size": Pt(r), "--input-asterisk-color": void 0 },
  }),
  ju = Se((e, r) => {
    const a = ae("InputLabel", Hv, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        labelElement: m,
        size: g,
        required: y,
        htmlFor: S,
        onMouseDown: w,
        children: E,
        __staticSelector: T,
        variant: R,
        mod: _,
        ...j
      } = ae("InputLabel", Hv, a),
      A = Ee({
        name: ["InputWrapper", T],
        props: a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        rootSelector: "label",
        vars: p,
        varsResolver: VR,
      }),
      D = wl(),
      U = D?.getStyles || A;
    return v.jsxs(ge, {
      ...U("label", D?.getStyles ? { className: s, style: u } : void 0),
      component: m,
      variant: R,
      size: g,
      ref: r,
      htmlFor: m === "label" ? S : void 0,
      mod: [{ required: y }, _],
      onMouseDown: (k) => {
        w?.(k), !k.defaultPrevented && k.detail > 1 && k.preventDefault();
      },
      ...j,
      children: [
        E,
        y &&
          v.jsx("span", {
            ...U("required"),
            "aria-hidden": !0,
            children: " *",
          }),
      ],
    });
  });
ju.classes = Cn;
ju.displayName = "@mantine/core/InputLabel";
const Bv = {},
  Eh = Se((e, r) => {
    const a = ae("InputPlaceholder", Bv, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        __staticSelector: m,
        variant: g,
        error: y,
        mod: S,
        ...w
      } = ae("InputPlaceholder", Bv, a),
      E = Ee({
        name: ["InputPlaceholder", m],
        props: a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        rootSelector: "placeholder",
      });
    return v.jsx(ge, {
      ...E("placeholder"),
      mod: [{ error: !!y }, S],
      component: "span",
      variant: g,
      ref: r,
      ...w,
    });
  });
Eh.classes = Cn;
Eh.displayName = "@mantine/core/InputPlaceholder";
function qR(e, { hasDescription: r, hasError: a }) {
  const i = e.findIndex((p) => p === "input"),
    s = e.slice(0, i),
    u = e.slice(i + 1),
    f = (r && s.includes("description")) || (a && s.includes("error"));
  return {
    offsetBottom:
      (r && u.includes("description")) || (a && u.includes("error")),
    offsetTop: f,
  };
}
const YR = {
    labelElement: "label",
    inputContainer: (e) => e,
    inputWrapperOrder: ["label", "description", "input", "error"],
  },
  GR = (e, { size: r }) => ({
    label: { "--input-label-size": Pt(r), "--input-asterisk-color": void 0 },
    error: {
      "--input-error-size": r === void 0 ? void 0 : `calc(${Pt(r)} - ${K(2)})`,
    },
    description: {
      "--input-description-size":
        r === void 0 ? void 0 : `calc(${Pt(r)} - ${K(2)})`,
    },
  }),
  _h = Se((e, r) => {
    const a = ae("InputWrapper", YR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        size: m,
        variant: g,
        __staticSelector: y,
        inputContainer: S,
        inputWrapperOrder: w,
        label: E,
        error: T,
        description: R,
        labelProps: _,
        descriptionProps: j,
        errorProps: A,
        labelElement: D,
        children: U,
        withAsterisk: k,
        id: Z,
        required: V,
        __stylesApiProps: W,
        mod: ee,
        ...pe
      } = a,
      oe = Ee({
        name: ["InputWrapper", y],
        props: W || a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: GR,
      }),
      ce = { size: m, variant: g, __staticSelector: y },
      fe = ml(Z),
      le = typeof k == "boolean" ? k : V,
      M = A?.id || `${fe}-error`,
      Q = j?.id || `${fe}-description`,
      Y = fe,
      re = !!T && typeof T != "boolean",
      O = !!R,
      G = `${re ? M : ""} ${O ? Q : ""}`,
      ne = G.trim().length > 0 ? G.trim() : void 0,
      J = _?.id || `${fe}-label`,
      ie =
        E &&
        v.jsx(
          ju,
          {
            labelElement: D,
            id: J,
            htmlFor: Y,
            required: le,
            ...ce,
            ..._,
            children: E,
          },
          "label",
        ),
      me =
        O &&
        v.jsx(
          zu,
          {
            ...j,
            ...ce,
            size: j?.size || ce.size,
            id: j?.id || Q,
            children: R,
          },
          "description",
        ),
      de = v.jsx(x.Fragment, { children: S(U) }, "input"),
      te =
        re &&
        x.createElement(
          Ou,
          {
            ...A,
            ...ce,
            size: A?.size || ce.size,
            key: "error",
            id: A?.id || M,
          },
          T,
        ),
      ue = w.map((Ae) => {
        switch (Ae) {
          case "label":
            return ie;
          case "input":
            return de;
          case "description":
            return me;
          case "error":
            return te;
          default:
            return null;
        }
      });
    return v.jsx(HR, {
      value: {
        getStyles: oe,
        describedBy: ne,
        inputId: Y,
        labelId: J,
        ...qR(w, { hasDescription: O, hasError: re }),
      },
      children: v.jsx(ge, {
        ref: r,
        variant: g,
        size: m,
        mod: [{ error: !!T }, ee],
        ...oe("root"),
        ...pe,
        children: ue,
      }),
    });
  });
_h.classes = Cn;
_h.displayName = "@mantine/core/InputWrapper";
const FR = {
    variant: "default",
    leftSectionPointerEvents: "none",
    rightSectionPointerEvents: "none",
    withAria: !0,
    withErrorStyles: !0,
  },
  QR = (e, r, a) => ({
    wrapper: {
      "--input-margin-top": a.offsetTop
        ? "calc(var(--mantine-spacing-xs) / 2)"
        : void 0,
      "--input-margin-bottom": a.offsetBottom
        ? "calc(var(--mantine-spacing-xs) / 2)"
        : void 0,
      "--input-height": He(r.size, "input-height"),
      "--input-fz": Pt(r.size),
      "--input-radius": r.radius === void 0 ? void 0 : Bn(r.radius),
      "--input-left-section-width":
        r.leftSectionWidth !== void 0 ? K(r.leftSectionWidth) : void 0,
      "--input-right-section-width":
        r.rightSectionWidth !== void 0 ? K(r.rightSectionWidth) : void 0,
      "--input-padding-y": r.multiline ? He(r.size, "input-padding-y") : void 0,
      "--input-left-section-pointer-events": r.leftSectionPointerEvents,
      "--input-right-section-pointer-events": r.rightSectionPointerEvents,
    },
  }),
  vt = Kt((e, r) => {
    const a = ae("Input", FR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        required: p,
        __staticSelector: m,
        __stylesApiProps: g,
        size: y,
        wrapperProps: S,
        error: w,
        disabled: E,
        leftSection: T,
        leftSectionProps: R,
        leftSectionWidth: _,
        rightSection: j,
        rightSectionProps: A,
        rightSectionWidth: D,
        rightSectionPointerEvents: U,
        leftSectionPointerEvents: k,
        variant: Z,
        vars: V,
        pointer: W,
        multiline: ee,
        radius: pe,
        id: oe,
        withAria: ce,
        withErrorStyles: fe,
        mod: le,
        inputSize: M,
        __clearSection: Q,
        __clearable: Y,
        __defaultRightSection: re,
        ...O
      } = a,
      { styleProps: G, rest: ne } = yl(O),
      J = wl(),
      ie = { offsetBottom: J?.offsetBottom, offsetTop: J?.offsetTop },
      me = Ee({
        name: ["Input", m],
        props: g || a,
        classes: Cn,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        stylesCtx: ie,
        rootSelector: "wrapper",
        vars: V,
        varsResolver: QR,
      }),
      de = ce
        ? {
            required: p,
            disabled: E,
            "aria-invalid": !!w,
            "aria-describedby": J?.describedBy,
            id: J?.inputId || oe,
          }
        : {},
      te = j || (Y && Q) || re;
    return v.jsx(kR, {
      value: { size: y || "sm" },
      children: v.jsxs(ge, {
        ...me("wrapper"),
        ...G,
        ...S,
        mod: [
          {
            error: !!w && fe,
            pointer: W,
            disabled: E,
            multiline: ee,
            "data-with-right-section": !!te,
            "data-with-left-section": !!T,
          },
          le,
        ],
        variant: Z,
        size: y,
        children: [
          T &&
            v.jsx("div", {
              ...R,
              "data-position": "left",
              ...me("section", { className: R?.className, style: R?.style }),
              children: T,
            }),
          v.jsx(ge, {
            component: "input",
            ...ne,
            ...de,
            ref: r,
            required: p,
            mod: { disabled: E, error: !!w && fe },
            variant: Z,
            __size: M,
            ...me("input"),
          }),
          te &&
            v.jsx("div", {
              ...A,
              "data-position": "right",
              ...me("section", { className: A?.className, style: A?.style }),
              children: te,
            }),
        ],
      }),
    });
  });
vt.classes = Cn;
vt.Wrapper = _h;
vt.Label = ju;
vt.Error = Ou;
vt.Description = zu;
vt.Placeholder = Eh;
vt.ClearButton = Qb;
vt.displayName = "@mantine/core/Input";
function XR(e, r, a) {
  const i = ae(e, r, a),
    {
      label: s,
      description: u,
      error: f,
      required: h,
      classNames: p,
      styles: m,
      className: g,
      unstyled: y,
      __staticSelector: S,
      __stylesApiProps: w,
      errorProps: E,
      labelProps: T,
      descriptionProps: R,
      wrapperProps: _,
      id: j,
      size: A,
      style: D,
      inputContainer: U,
      inputWrapperOrder: k,
      withAsterisk: Z,
      variant: V,
      vars: W,
      mod: ee,
      ...pe
    } = i,
    { styleProps: oe, rest: ce } = yl(pe),
    fe = {
      label: s,
      description: u,
      error: f,
      required: h,
      classNames: p,
      className: g,
      __staticSelector: S,
      __stylesApiProps: w || i,
      errorProps: E,
      labelProps: T,
      descriptionProps: R,
      unstyled: y,
      styles: m,
      size: A,
      style: D,
      inputContainer: U,
      inputWrapperOrder: k,
      withAsterisk: Z,
      variant: V,
      id: j,
      mod: ee,
      ..._,
    };
  return {
    ...ce,
    classNames: p,
    styles: m,
    unstyled: y,
    wrapperProps: { ...fe, ...oe },
    inputProps: {
      required: h,
      classNames: p,
      styles: m,
      unstyled: y,
      size: A,
      __staticSelector: S,
      __stylesApiProps: w || i,
      error: f,
      variant: V,
      id: j,
    },
  };
}
const KR = { __staticSelector: "InputBase", withAria: !0 },
  It = Kt((e, r) => {
    const { inputProps: a, wrapperProps: i, ...s } = XR("InputBase", KR, e);
    return v.jsx(vt.Wrapper, {
      ...i,
      children: v.jsx(vt, { ...a, ...s, ref: r }),
    });
  });
It.classes = { ...vt.classes, ...vt.Wrapper.classes };
It.displayName = "@mantine/core/InputBase";
const IR = {
  gap: { type: "spacing", property: "gap" },
  rowGap: { type: "spacing", property: "rowGap" },
  columnGap: { type: "spacing", property: "columnGap" },
  align: { type: "identity", property: "alignItems" },
  justify: { type: "identity", property: "justifyContent" },
  wrap: { type: "identity", property: "flexWrap" },
  direction: { type: "identity", property: "flexDirection" },
};
var Xb = { root: "m_8bffd616" };
const WR = {},
  ar = Kt((e, r) => {
    const a = ae("Flex", WR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        gap: m,
        rowGap: g,
        columnGap: y,
        align: S,
        justify: w,
        wrap: E,
        direction: T,
        ...R
      } = a,
      _ = Ee({
        name: "Flex",
        classes: Xb,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
      }),
      j = sn(),
      A = nb(),
      D = tb({
        styleProps: {
          gap: m,
          rowGap: g,
          columnGap: y,
          align: S,
          justify: w,
          wrap: E,
          direction: T,
        },
        theme: j,
        data: IR,
      });
    return v.jsxs(v.Fragment, {
      children: [
        D.hasResponsiveStyles &&
          v.jsx(eb, { selector: `.${A}`, styles: D.styles, media: D.media }),
        v.jsx(ge, {
          ref: r,
          ..._("root", { className: A, style: yu(D.inlineStyles) }),
          ...R,
        }),
      ],
    });
  });
ar.classes = Xb;
ar.displayName = "@mantine/core/Flex";
var Kb = { root: "m_7f854edf" };
const JR = {
    position: { bottom: 0, right: 0 },
    zIndex: eh("modal"),
    withinPortal: !0,
  },
  e4 = (e, { zIndex: r, position: a }) => ({
    root: {
      "--affix-z-index": r?.toString(),
      "--affix-top": Cr(a?.top),
      "--affix-left": Cr(a?.left),
      "--affix-bottom": Cr(a?.bottom),
      "--affix-right": Cr(a?.right),
    },
  }),
  Du = Se((e, r) => {
    const a = ae("Affix", JR, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        portalProps: m,
        zIndex: g,
        withinPortal: y,
        position: S,
        ...w
      } = a,
      E = Ee({
        name: "Affix",
        classes: Kb,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: e4,
      });
    return v.jsx(Au, {
      ...m,
      withinPortal: y,
      children: v.jsx(ge, { ref: r, ...E("root"), ...w }),
    });
  });
Du.classes = Kb;
Du.displayName = "@mantine/core/Affix";
var Ib = { root: "m_b6d8b162" };
function t4(e) {
  if (e === "start") return "start";
  if (e === "end" || e) return "end";
}
const n4 = { inherit: !1 },
  r4 = (e, { variant: r, lineClamp: a, gradient: i, size: s, color: u }) => ({
    root: {
      "--text-fz": Pt(s),
      "--text-lh": Q2(s),
      "--text-gradient": r === "gradient" ? wd(i, e) : void 0,
      "--text-line-clamp": typeof a == "number" ? a.toString() : void 0,
      "--text-color": u ? rl(u, e) : void 0,
    },
  }),
  jo = Kt((e, r) => {
    const a = ae("Text", n4, e),
      {
        lineClamp: i,
        truncate: s,
        inline: u,
        inherit: f,
        gradient: h,
        span: p,
        __staticSelector: m,
        vars: g,
        className: y,
        style: S,
        classNames: w,
        styles: E,
        unstyled: T,
        variant: R,
        mod: _,
        size: j,
        ...A
      } = a,
      D = Ee({
        name: ["Text", m],
        props: a,
        classes: Ib,
        className: y,
        style: S,
        classNames: w,
        styles: E,
        unstyled: T,
        vars: g,
        varsResolver: r4,
      });
    return v.jsx(ge, {
      ...D("root", { focusable: !0 }),
      ref: r,
      component: p ? "span" : "p",
      variant: R,
      mod: [
        {
          "data-truncate": t4(s),
          "data-line-clamp": typeof i == "number",
          "data-inline": u,
          "data-inherit": f,
        },
        _,
      ],
      size: j,
      ...A,
    });
  });
jo.classes = Ib;
jo.displayName = "@mantine/core/Text";
function Wb(e) {
  return typeof e == "string"
    ? { value: e, label: e }
    : "value" in e && !("label" in e)
      ? { value: e.value, label: e.value, disabled: e.disabled }
      : typeof e == "number"
        ? { value: e.toString(), label: e.toString() }
        : "group" in e
          ? { group: e.group, items: e.items.map((r) => Wb(r)) }
          : e;
}
function a4(e) {
  return e ? e.map((r) => Wb(r)) : [];
}
function Jb(e) {
  return e.reduce(
    (r, a) => ("group" in a ? { ...r, ...Jb(a.items) } : ((r[a.value] = a), r)),
    {},
  );
}
var Xt = {
  dropdown: "m_88b62a41",
  search: "m_985517d8",
  options: "m_b2821a6e",
  option: "m_92253aa5",
  empty: "m_2530cd1d",
  header: "m_858f94bd",
  footer: "m_82b967cb",
  group: "m_254f3e4f",
  groupLabel: "m_2bb2e9e5",
  chevron: "m_2943220b",
  optionsDropdownOption: "m_390b5f4",
  optionsDropdownCheckIcon: "m_8ee53fc2",
};
const o4 = { error: null },
  i4 = (e, { size: r, color: a }) => ({
    chevron: {
      "--combobox-chevron-size": He(r, "combobox-chevron-size"),
      "--combobox-chevron-color": a ? rl(a, e) : void 0,
    },
  }),
  Rh = Se((e, r) => {
    const a = ae("ComboboxChevron", o4, e),
      {
        size: i,
        error: s,
        style: u,
        className: f,
        classNames: h,
        styles: p,
        unstyled: m,
        vars: g,
        mod: y,
        ...S
      } = a,
      w = Ee({
        name: "ComboboxChevron",
        classes: Xt,
        props: a,
        style: u,
        className: f,
        classNames: h,
        styles: p,
        unstyled: m,
        vars: g,
        varsResolver: i4,
        rootSelector: "chevron",
      });
    return v.jsx(ge, {
      component: "svg",
      ...S,
      ...w("chevron"),
      size: i,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error: s }, y],
      ref: r,
      children: v.jsx("path", {
        d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }),
    });
  });
Rh.classes = Xt;
Rh.displayName = "@mantine/core/ComboboxChevron";
const [l4, En] = hl("Combobox component was not found in tree"),
  e1 = x.forwardRef(
    ({ size: e, onMouseDown: r, onClick: a, onClear: i, ...s }, u) =>
      v.jsx(vt.ClearButton, {
        ref: u,
        tabIndex: -1,
        "aria-hidden": !0,
        ...s,
        onMouseDown: (f) => {
          f.preventDefault(), r?.(f);
        },
        onClick: (f) => {
          i(), a?.(f);
        },
      }),
  );
e1.displayName = "@mantine/core/ComboboxClearButton";
const s4 = {},
  Th = Se((e, r) => {
    const {
        classNames: a,
        styles: i,
        className: s,
        style: u,
        hidden: f,
        ...h
      } = ae("ComboboxDropdown", s4, e),
      p = En();
    return v.jsx(ea.Dropdown, {
      ...h,
      ref: r,
      role: "presentation",
      "data-hidden": f || void 0,
      ...p.getStyles("dropdown", {
        className: s,
        style: u,
        classNames: a,
        styles: i,
      }),
    });
  });
Th.classes = Xt;
Th.displayName = "@mantine/core/ComboboxDropdown";
const u4 = { refProp: "ref" },
  t1 = Se((e, r) => {
    const { children: a, refProp: i } = ae("ComboboxDropdownTarget", u4, e);
    if ((En(), !dl(a)))
      throw new Error(
        "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    return v.jsx(ea.Target, { ref: r, refProp: i, children: a });
  });
t1.displayName = "@mantine/core/ComboboxDropdownTarget";
const c4 = {},
  Ah = Se((e, r) => {
    const {
        classNames: a,
        className: i,
        style: s,
        styles: u,
        vars: f,
        ...h
      } = ae("ComboboxEmpty", c4, e),
      p = En();
    return v.jsx(ge, {
      ref: r,
      ...p.getStyles("empty", {
        className: i,
        classNames: a,
        styles: u,
        style: s,
      }),
      ...h,
    });
  });
Ah.classes = Xt;
Ah.displayName = "@mantine/core/ComboboxEmpty";
function zh({
  onKeyDown: e,
  withKeyboardNavigation: r,
  withAriaAttributes: a,
  withExpandedAttribute: i,
  targetType: s,
  autoComplete: u,
}) {
  const f = En(),
    [h, p] = x.useState(null),
    m = (y) => {
      if ((e?.(y), !f.readOnly && r)) {
        if (y.nativeEvent.isComposing) return;
        if (
          (y.nativeEvent.code === "ArrowDown" &&
            (y.preventDefault(),
            f.store.dropdownOpened
              ? p(f.store.selectNextOption())
              : (f.store.openDropdown("keyboard"),
                p(f.store.selectActiveOption()),
                f.store.updateSelectedOptionIndex("selected", {
                  scrollIntoView: !0,
                }))),
          y.nativeEvent.code === "ArrowUp" &&
            (y.preventDefault(),
            f.store.dropdownOpened
              ? p(f.store.selectPreviousOption())
              : (f.store.openDropdown("keyboard"),
                p(f.store.selectActiveOption()),
                f.store.updateSelectedOptionIndex("selected", {
                  scrollIntoView: !0,
                }))),
          y.nativeEvent.code === "Enter" ||
            y.nativeEvent.code === "NumpadEnter")
        ) {
          if (y.nativeEvent.keyCode === 229) return;
          const S = f.store.getSelectedOptionIndex();
          f.store.dropdownOpened && S !== -1
            ? (y.preventDefault(), f.store.clickSelectedOption())
            : s === "button" &&
              (y.preventDefault(), f.store.openDropdown("keyboard"));
        }
        y.key === "Escape" && f.store.closeDropdown("keyboard"),
          y.nativeEvent.code === "Space" &&
            s === "button" &&
            (y.preventDefault(), f.store.toggleDropdown("keyboard"));
      }
    };
  return {
    ...(a
      ? {
          "aria-haspopup": "listbox",
          "aria-expanded": i
            ? !!(f.store.listId && f.store.dropdownOpened)
            : void 0,
          "aria-controls":
            f.store.dropdownOpened && f.store.listId ? f.store.listId : void 0,
          "aria-activedescendant": (f.store.dropdownOpened && h) || void 0,
          autoComplete: u,
          "data-expanded": f.store.dropdownOpened || void 0,
          "data-mantine-stop-propagation": f.store.dropdownOpened || void 0,
        }
      : {}),
    onKeyDown: m,
  };
}
const f4 = {
    refProp: "ref",
    targetType: "input",
    withKeyboardNavigation: !0,
    withAriaAttributes: !0,
    withExpandedAttribute: !1,
    autoComplete: "off",
  },
  n1 = Se((e, r) => {
    const {
      children: a,
      refProp: i,
      withKeyboardNavigation: s,
      withAriaAttributes: u,
      withExpandedAttribute: f,
      targetType: h,
      autoComplete: p,
      ...m
    } = ae("ComboboxEventsTarget", f4, e);
    if (!dl(a))
      throw new Error(
        "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const g = En(),
      y = zh({
        targetType: h,
        withAriaAttributes: u,
        withKeyboardNavigation: s,
        withExpandedAttribute: f,
        onKeyDown: a.props.onKeyDown,
        autoComplete: p,
      });
    return x.cloneElement(a, {
      ...y,
      ...m,
      [i]: Zt(r, g.store.targetRef, G0(a)),
    });
  });
n1.displayName = "@mantine/core/ComboboxEventsTarget";
const d4 = {},
  Oh = Se((e, r) => {
    const {
        classNames: a,
        className: i,
        style: s,
        styles: u,
        vars: f,
        ...h
      } = ae("ComboboxFooter", d4, e),
      p = En();
    return v.jsx(ge, {
      ref: r,
      ...p.getStyles("footer", {
        className: i,
        classNames: a,
        style: s,
        styles: u,
      }),
      ...h,
      onMouseDown: (m) => {
        m.preventDefault();
      },
    });
  });
Oh.classes = Xt;
Oh.displayName = "@mantine/core/ComboboxFooter";
const h4 = {},
  jh = Se((e, r) => {
    const {
        classNames: a,
        className: i,
        style: s,
        styles: u,
        vars: f,
        children: h,
        label: p,
        ...m
      } = ae("ComboboxGroup", h4, e),
      g = En();
    return v.jsxs(ge, {
      ref: r,
      ...g.getStyles("group", {
        className: i,
        classNames: a,
        style: s,
        styles: u,
      }),
      ...m,
      children: [
        p &&
          v.jsx("div", {
            ...g.getStyles("groupLabel", { classNames: a, styles: u }),
            children: p,
          }),
        h,
      ],
    });
  });
jh.classes = Xt;
jh.displayName = "@mantine/core/ComboboxGroup";
const p4 = {},
  Dh = Se((e, r) => {
    const {
        classNames: a,
        className: i,
        style: s,
        styles: u,
        vars: f,
        ...h
      } = ae("ComboboxHeader", p4, e),
      p = En();
    return v.jsx(ge, {
      ref: r,
      ...p.getStyles("header", {
        className: i,
        classNames: a,
        style: s,
        styles: u,
      }),
      ...h,
      onMouseDown: (m) => {
        m.preventDefault();
      },
    });
  });
Dh.classes = Xt;
Dh.displayName = "@mantine/core/ComboboxHeader";
function r1({ value: e, valuesDivider: r = ",", ...a }) {
  return v.jsx("input", {
    type: "hidden",
    value: Array.isArray(e) ? e.join(r) : e || "",
    ...a,
  });
}
r1.displayName = "@mantine/core/ComboboxHiddenInput";
const m4 = {},
  Nh = Se((e, r) => {
    const a = ae("ComboboxOption", m4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        vars: h,
        onClick: p,
        id: m,
        active: g,
        onMouseDown: y,
        onMouseOver: S,
        disabled: w,
        selected: E,
        mod: T,
        ...R
      } = a,
      _ = En(),
      j = x.useId(),
      A = m || j;
    return v.jsx(ge, {
      ..._.getStyles("option", {
        className: s,
        classNames: i,
        styles: f,
        style: u,
      }),
      ...R,
      ref: r,
      id: A,
      mod: [
        "combobox-option",
        {
          "combobox-active": g,
          "combobox-disabled": w,
          "combobox-selected": E,
        },
        T,
      ],
      role: "option",
      onClick: (D) => {
        w ? D.preventDefault() : (_.onOptionSubmit?.(a.value, a), p?.(D));
      },
      onMouseDown: (D) => {
        D.preventDefault(), y?.(D);
      },
      onMouseOver: (D) => {
        _.resetSelectionOnOptionHover && _.store.resetSelectedOption(), S?.(D);
      },
    });
  });
Nh.classes = Xt;
Nh.displayName = "@mantine/core/ComboboxOption";
const g4 = {},
  Mh = Se((e, r) => {
    const a = ae("ComboboxOptions", g4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        id: h,
        onMouseDown: p,
        labelledBy: m,
        ...g
      } = a,
      y = En(),
      S = ml(h);
    return (
      x.useEffect(() => {
        y.store.setListId(S);
      }, [S]),
      v.jsx(ge, {
        ref: r,
        ...y.getStyles("options", {
          className: s,
          style: u,
          classNames: i,
          styles: f,
        }),
        ...g,
        id: S,
        role: "listbox",
        "aria-labelledby": m,
        onMouseDown: (w) => {
          w.preventDefault(), p?.(w);
        },
      })
    );
  });
Mh.classes = Xt;
Mh.displayName = "@mantine/core/ComboboxOptions";
const y4 = { withAriaAttributes: !0, withKeyboardNavigation: !0 },
  $h = Se((e, r) => {
    const a = ae("ComboboxSearch", y4, e),
      {
        classNames: i,
        styles: s,
        unstyled: u,
        vars: f,
        withAriaAttributes: h,
        onKeyDown: p,
        withKeyboardNavigation: m,
        size: g,
        ...y
      } = a,
      S = En(),
      w = S.getStyles("search"),
      E = zh({
        targetType: "input",
        withAriaAttributes: h,
        withKeyboardNavigation: m,
        withExpandedAttribute: !1,
        onKeyDown: p,
        autoComplete: "off",
      });
    return v.jsx(vt, {
      ref: Zt(r, S.store.searchRef),
      classNames: [{ input: w.className }, i],
      styles: [{ input: w.style }, s],
      size: g || S.size,
      ...E,
      ...y,
      __staticSelector: "Combobox",
    });
  });
$h.classes = Xt;
$h.displayName = "@mantine/core/ComboboxSearch";
const v4 = {
    refProp: "ref",
    targetType: "input",
    withKeyboardNavigation: !0,
    withAriaAttributes: !0,
    withExpandedAttribute: !1,
    autoComplete: "off",
  },
  a1 = Se((e, r) => {
    const {
      children: a,
      refProp: i,
      withKeyboardNavigation: s,
      withAriaAttributes: u,
      withExpandedAttribute: f,
      targetType: h,
      autoComplete: p,
      ...m
    } = ae("ComboboxTarget", v4, e);
    if (!dl(a))
      throw new Error(
        "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported",
      );
    const g = En(),
      y = zh({
        targetType: h,
        withAriaAttributes: u,
        withKeyboardNavigation: s,
        withExpandedAttribute: f,
        onKeyDown: a.props.onKeyDown,
        autoComplete: p,
      }),
      S = x.cloneElement(a, { ...y, ...m });
    return v.jsx(ea.Target, { ref: Zt(r, g.store.targetRef), children: S });
  });
a1.displayName = "@mantine/core/ComboboxTarget";
function b4(e, r, a) {
  for (let i = e - 1; i >= 0; i -= 1)
    if (!r[i].hasAttribute("data-combobox-disabled")) return i;
  if (a) {
    for (let i = r.length - 1; i > -1; i -= 1)
      if (!r[i].hasAttribute("data-combobox-disabled")) return i;
  }
  return e;
}
function S4(e, r, a) {
  for (let i = e + 1; i < r.length; i += 1)
    if (!r[i].hasAttribute("data-combobox-disabled")) return i;
  if (a) {
    for (let i = 0; i < r.length; i += 1)
      if (!r[i].hasAttribute("data-combobox-disabled")) return i;
  }
  return e;
}
function x4(e) {
  for (let r = 0; r < e.length; r += 1)
    if (!e[r].hasAttribute("data-combobox-disabled")) return r;
  return -1;
}
function kh({
  defaultOpened: e,
  opened: r,
  onOpenedChange: a,
  onDropdownClose: i,
  onDropdownOpen: s,
  loop: u = !0,
  scrollBehavior: f = "instant",
} = {}) {
  const [h, p] = To({ value: r, defaultValue: e, finalValue: !1, onChange: a }),
    m = x.useRef(null),
    g = x.useRef(-1),
    y = x.useRef(null),
    S = x.useRef(null),
    w = x.useRef(-1),
    E = x.useRef(-1),
    T = x.useRef(-1),
    R = x.useCallback(
      (M = "unknown") => {
        h || (p(!0), s?.(M));
      },
      [p, s, h],
    ),
    _ = x.useCallback(
      (M = "unknown") => {
        h && (p(!1), i?.(M));
      },
      [p, i, h],
    ),
    j = x.useCallback(
      (M = "unknown") => {
        h ? _(M) : R(M);
      },
      [_, R, h],
    ),
    A = x.useCallback(() => {
      const M = document.querySelector(
        `#${m.current} [data-combobox-selected]`,
      );
      M?.removeAttribute("data-combobox-selected"),
        M?.removeAttribute("aria-selected");
    }, []),
    D = x.useCallback(
      (M) => {
        const Y = document
          .getElementById(m.current)
          ?.querySelectorAll("[data-combobox-option]");
        if (!Y) return null;
        const re = M >= Y.length ? 0 : M < 0 ? Y.length - 1 : M;
        return (
          (g.current = re),
          Y?.[re] && !Y[re].hasAttribute("data-combobox-disabled")
            ? (A(),
              Y[re].setAttribute("data-combobox-selected", "true"),
              Y[re].setAttribute("aria-selected", "true"),
              Y[re].scrollIntoView({ block: "nearest", behavior: f }),
              Y[re].id)
            : null
        );
      },
      [f, A],
    ),
    U = x.useCallback(() => {
      const M = document.querySelector(`#${m.current} [data-combobox-active]`);
      if (M) {
        const Q = document.querySelectorAll(
            `#${m.current} [data-combobox-option]`,
          ),
          Y = Array.from(Q).findIndex((re) => re === M);
        return D(Y);
      }
      return D(0);
    }, [D]),
    k = x.useCallback(
      () =>
        D(
          S4(
            g.current,
            document.querySelectorAll(`#${m.current} [data-combobox-option]`),
            u,
          ),
        ),
      [D, u],
    ),
    Z = x.useCallback(
      () =>
        D(
          b4(
            g.current,
            document.querySelectorAll(`#${m.current} [data-combobox-option]`),
            u,
          ),
        ),
      [D, u],
    ),
    V = x.useCallback(
      () =>
        D(
          x4(document.querySelectorAll(`#${m.current} [data-combobox-option]`)),
        ),
      [D],
    ),
    W = x.useCallback((M = "selected", Q) => {
      T.current = window.setTimeout(() => {
        const Y = document.querySelectorAll(
            `#${m.current} [data-combobox-option]`,
          ),
          re = Array.from(Y).findIndex((O) =>
            O.hasAttribute(`data-combobox-${M}`),
          );
        (g.current = re),
          Q?.scrollIntoView &&
            Y[re]?.scrollIntoView({ block: "nearest", behavior: f });
      }, 0);
    }, []),
    ee = x.useCallback(() => {
      (g.current = -1), A();
    }, [A]),
    pe = x.useCallback(() => {
      document
        .querySelectorAll(`#${m.current} [data-combobox-option]`)
        ?.[g.current]?.click();
    }, []),
    oe = x.useCallback((M) => {
      m.current = M;
    }, []),
    ce = x.useCallback(() => {
      w.current = window.setTimeout(() => y.current.focus(), 0);
    }, []),
    fe = x.useCallback(() => {
      E.current = window.setTimeout(() => S.current.focus(), 0);
    }, []),
    le = x.useCallback(() => g.current, []);
  return (
    x.useEffect(
      () => () => {
        window.clearTimeout(w.current),
          window.clearTimeout(E.current),
          window.clearTimeout(T.current);
      },
      [],
    ),
    {
      dropdownOpened: h,
      openDropdown: R,
      closeDropdown: _,
      toggleDropdown: j,
      selectedOptionIndex: g.current,
      getSelectedOptionIndex: le,
      selectOption: D,
      selectFirstOption: V,
      selectActiveOption: U,
      selectNextOption: k,
      selectPreviousOption: Z,
      resetSelectedOption: ee,
      updateSelectedOptionIndex: W,
      listId: m.current,
      setListId: oe,
      clickSelectedOption: pe,
      searchRef: y,
      focusSearchInput: ce,
      targetRef: S,
      focusTarget: fe,
    }
  );
}
const w4 = {
    keepMounted: !0,
    withinPortal: !0,
    resetSelectionOnOptionHover: !1,
    width: "target",
    transitionProps: { transition: "fade", duration: 0 },
    size: "sm",
  },
  C4 = (e, { size: r, dropdownPadding: a }) => ({
    options: {
      "--combobox-option-fz": Pt(r),
      "--combobox-option-padding": He(r, "combobox-option-padding"),
    },
    dropdown: {
      "--combobox-padding": a === void 0 ? void 0 : K(a),
      "--combobox-option-fz": Pt(r),
      "--combobox-option-padding": He(r, "combobox-option-padding"),
    },
  });
function ze(e) {
  const r = ae("Combobox", w4, e),
    {
      classNames: a,
      styles: i,
      unstyled: s,
      children: u,
      store: f,
      vars: h,
      onOptionSubmit: p,
      onClose: m,
      size: g,
      dropdownPadding: y,
      resetSelectionOnOptionHover: S,
      __staticSelector: w,
      readOnly: E,
      ...T
    } = r,
    R = kh(),
    _ = f || R,
    j = Ee({
      name: w || "Combobox",
      classes: Xt,
      props: r,
      classNames: a,
      styles: i,
      unstyled: s,
      vars: h,
      varsResolver: C4,
    }),
    A = () => {
      m?.(), _.closeDropdown();
    };
  return v.jsx(l4, {
    value: {
      getStyles: j,
      store: _,
      onOptionSubmit: p,
      size: g,
      resetSelectionOnOptionHover: S,
      readOnly: E,
    },
    children: v.jsx(ea, {
      opened: _.dropdownOpened,
      preventPositionChangeWhenVisible: !0,
      ...T,
      onChange: (D) => !D && A(),
      withRoles: !1,
      unstyled: s,
      children: u,
    }),
  });
}
const E4 = (e) => e;
ze.extend = E4;
ze.classes = Xt;
ze.displayName = "@mantine/core/Combobox";
ze.Target = a1;
ze.Dropdown = Th;
ze.Options = Mh;
ze.Option = Nh;
ze.Search = $h;
ze.Empty = Ah;
ze.Chevron = Rh;
ze.Footer = Oh;
ze.Header = Dh;
ze.EventsTarget = n1;
ze.DropdownTarget = t1;
ze.Group = jh;
ze.ClearButton = e1;
ze.HiddenInput = r1;
function _4({ size: e, style: r, ...a }) {
  const i = e !== void 0 ? { width: K(e), height: K(e), ...r } : r;
  return v.jsx("svg", {
    viewBox: "0 0 10 7",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: i,
    "aria-hidden": !0,
    ...a,
    children: v.jsx("path", {
      d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
}
function Do(e) {
  return "group" in e;
}
function o1({ options: e, search: r, limit: a }) {
  const i = r.trim().toLowerCase(),
    s = [];
  for (let u = 0; u < e.length; u += 1) {
    const f = e[u];
    if (s.length === a) return s;
    Do(f) &&
      s.push({
        group: f.group,
        items: o1({ options: f.items, search: r, limit: a - s.length }),
      }),
      Do(f) || (f.label.toLowerCase().includes(i) && s.push(f));
  }
  return s;
}
function R4(e) {
  if (e.length === 0) return !0;
  for (const r of e) if (!("group" in r) || r.items.length > 0) return !1;
  return !0;
}
function i1(e, r = new Set()) {
  if (Array.isArray(e))
    for (const a of e)
      if (Do(a)) i1(a.items, r);
      else {
        if (typeof a.value > "u")
          throw new Error(
            "[@mantine/core] Each option must have value property",
          );
        if (typeof a.value != "string")
          throw new Error(
            `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof a.value}`,
          );
        if (r.has(a.value))
          throw new Error(
            `[@mantine/core] Duplicate options are not supported. Option with value "${a.value}" was provided more than once`,
          );
        r.add(a.value);
      }
}
function T4(e, r) {
  return Array.isArray(e) ? e.includes(r) : e === r;
}
function l1({
  data: e,
  withCheckIcon: r,
  value: a,
  checkIconPosition: i,
  unstyled: s,
  renderOption: u,
}) {
  if (!Do(e)) {
    const h = T4(a, e.value),
      p = r && h && v.jsx(_4, { className: Xt.optionsDropdownCheckIcon }),
      m = v.jsxs(v.Fragment, {
        children: [
          i === "left" && p,
          v.jsx("span", { children: e.label }),
          i === "right" && p,
        ],
      });
    return v.jsx(ze.Option, {
      value: e.value,
      disabled: e.disabled,
      className: Pn({ [Xt.optionsDropdownOption]: !s }),
      "data-reverse": i === "right" || void 0,
      "data-checked": h || void 0,
      "aria-selected": h,
      active: h,
      children: typeof u == "function" ? u({ option: e, checked: h }) : m,
    });
  }
  const f = e.items.map((h) =>
    v.jsx(
      l1,
      {
        data: h,
        value: a,
        unstyled: s,
        withCheckIcon: r,
        checkIconPosition: i,
        renderOption: u,
      },
      h.value,
    ),
  );
  return v.jsx(ze.Group, { label: e.group, children: f });
}
function A4({
  data: e,
  hidden: r,
  hiddenWhenEmpty: a,
  filter: i,
  search: s,
  limit: u,
  maxDropdownHeight: f,
  withScrollArea: h = !0,
  filterOptions: p = !0,
  withCheckIcon: m = !1,
  value: g,
  checkIconPosition: y,
  nothingFoundMessage: S,
  unstyled: w,
  labelId: E,
  renderOption: T,
  scrollAreaProps: R,
  "aria-label": _,
}) {
  i1(e);
  const A =
      typeof s == "string"
        ? (i || o1)({ options: e, search: p ? s : "", limit: u ?? 1 / 0 })
        : e,
    D = R4(A),
    U = A.map((k) =>
      v.jsx(
        l1,
        {
          data: k,
          withCheckIcon: m,
          value: g,
          checkIconPosition: y,
          unstyled: w,
          renderOption: T,
        },
        Do(k) ? k.group : k.value,
      ),
    );
  return v.jsx(ze.Dropdown, {
    hidden: r || (a && D),
    "data-composed": !0,
    children: v.jsxs(ze.Options, {
      labelledBy: E,
      "aria-label": _,
      children: [
        h
          ? v.jsx(bl.Autosize, {
              mah: f ?? 220,
              type: "scroll",
              scrollbarSize: "var(--combobox-padding)",
              offsetScrollbars: "y",
              ...R,
              children: U,
            })
          : U,
        D && S && v.jsx(ze.Empty, { children: S }),
      ],
    }),
  });
}
const s1 = x.createContext(null),
  z4 = s1.Provider;
function O4() {
  return { withinGroup: !!x.useContext(s1) };
}
var Nu = {
  group: "m_11def92b",
  root: "m_f85678b6",
  image: "m_11f8ac07",
  placeholder: "m_104cd71f",
};
const j4 = {},
  D4 = (e, { spacing: r }) => ({ group: { "--ag-spacing": Cr(r) } }),
  Lh = Se((e, r) => {
    const a = ae("AvatarGroup", j4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        spacing: m,
        ...g
      } = a,
      y = Ee({
        name: "AvatarGroup",
        classes: Nu,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: D4,
        rootSelector: "group",
      });
    return v.jsx(z4, {
      value: !0,
      children: v.jsx(ge, { ref: r, ...y("group"), ...g }),
    });
  });
Lh.classes = Nu;
Lh.displayName = "@mantine/core/AvatarGroup";
function N4(e) {
  return v.jsx("svg", {
    ...e,
    "data-avatar-placeholder-icon": !0,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: v.jsx("path", {
      d: "M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
}
function M4(e) {
  let r = 0;
  for (let a = 0; a < e.length; a += 1) {
    const i = e.charCodeAt(a);
    (r = (r << 5) - r + i), (r |= 0);
  }
  return r;
}
const $4 = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
];
function k4(e, r = $4) {
  const a = M4(e),
    i = Math.abs(a) % r.length;
  return r[i];
}
function L4(e, r = 2) {
  const a = e.split(" ");
  return a.length === 1
    ? e.slice(0, r).toUpperCase()
    : a
        .map((i) => i[0])
        .slice(0, r)
        .join("")
        .toUpperCase();
}
const U4 = {},
  H4 = (
    e,
    {
      size: r,
      radius: a,
      variant: i,
      gradient: s,
      color: u,
      autoContrast: f,
      name: h,
      allowedInitialsColors: p,
    },
  ) => {
    const m = u === "initials" && typeof h == "string" ? k4(h, p) : u,
      g = e.variantColorResolver({
        color: m || "gray",
        theme: e,
        gradient: s,
        variant: i || "light",
        autoContrast: f,
      });
    return {
      root: {
        "--avatar-size": He(r, "avatar-size"),
        "--avatar-radius": a === void 0 ? void 0 : Bn(a),
        "--avatar-bg": m || i ? g.background : void 0,
        "--avatar-color": m || i ? g.color : void 0,
        "--avatar-bd": m || i ? g.border : void 0,
      },
    };
  },
  Cl = Kt((e, r) => {
    const a = ae("Avatar", U4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        src: m,
        alt: g,
        radius: y,
        color: S,
        gradient: w,
        imageProps: E,
        children: T,
        autoContrast: R,
        mod: _,
        name: j,
        allowedInitialsColors: A,
        ...D
      } = a,
      U = O4(),
      [k, Z] = x.useState(!m),
      V = Ee({
        name: "Avatar",
        props: a,
        classes: Nu,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: H4,
      });
    return (
      x.useEffect(() => Z(!m), [m]),
      v.jsx(ge, {
        ...V("root"),
        mod: [{ "within-group": U.withinGroup }, _],
        ref: r,
        ...D,
        children:
          k || !m
            ? v.jsx("span", {
                ...V("placeholder"),
                title: g,
                children: T || (typeof j == "string" && L4(j)) || v.jsx(N4, {}),
              })
            : v.jsx("img", {
                ...E,
                ...V("image"),
                src: m,
                alt: g,
                onError: (W) => {
                  Z(!0), E?.onError?.(W);
                },
              }),
      })
    );
  });
Cl.classes = Nu;
Cl.displayName = "@mantine/core/Avatar";
Cl.Group = Lh;
var Yo = {
  root: "m_77c9d27d",
  inner: "m_80f1301b",
  label: "m_811560b9",
  section: "m_a74036a",
  loader: "m_a25b86ee",
  group: "m_80d6d844",
  groupSection: "m_70be2a01",
};
const Pv = { orientation: "horizontal" },
  B4 = (e, { borderWidth: r }) => ({
    group: { "--button-border-width": K(r) },
  }),
  Uh = Se((e, r) => {
    const a = ae("ButtonGroup", Pv, e),
      {
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        orientation: p,
        vars: m,
        borderWidth: g,
        variant: y,
        mod: S,
        ...w
      } = ae("ButtonGroup", Pv, e),
      E = Ee({
        name: "ButtonGroup",
        props: a,
        classes: Yo,
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: m,
        varsResolver: B4,
        rootSelector: "group",
      });
    return v.jsx(ge, {
      ...E("group"),
      ref: r,
      variant: y,
      mod: [{ "data-orientation": p }, S],
      role: "group",
      ...w,
    });
  });
Uh.classes = Yo;
Uh.displayName = "@mantine/core/ButtonGroup";
const Zv = {},
  P4 = (
    e,
    { radius: r, color: a, gradient: i, variant: s, autoContrast: u, size: f },
  ) => {
    const h = e.variantColorResolver({
      color: a || e.primaryColor,
      theme: e,
      gradient: i,
      variant: s || "filled",
      autoContrast: u,
    });
    return {
      groupSection: {
        "--section-height": He(f, "section-height"),
        "--section-padding-x": He(f, "section-padding-x"),
        "--section-fz": f?.includes("compact")
          ? Pt(f.replace("compact-", ""))
          : Pt(f),
        "--section-radius": r === void 0 ? void 0 : Bn(r),
        "--section-bg": a || s ? h.background : void 0,
        "--section-color": h.color,
        "--section-bd": a || s ? h.border : void 0,
      },
    };
  },
  Hh = Se((e, r) => {
    const a = ae("ButtonGroupSection", Zv, e),
      {
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: p,
        variant: m,
        gradient: g,
        radius: y,
        autoContrast: S,
        ...w
      } = ae("ButtonGroupSection", Zv, e),
      E = Ee({
        name: "ButtonGroupSection",
        props: a,
        classes: Yo,
        className: i,
        style: s,
        classNames: u,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: P4,
        rootSelector: "groupSection",
      });
    return v.jsx(ge, { ...E("groupSection"), ref: r, variant: m, ...w });
  });
Hh.classes = Yo;
Hh.displayName = "@mantine/core/ButtonGroupSection";
const Z4 = {
    in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${K(1)}))` },
    out: { opacity: 0, transform: "translate(-50%, -200%)" },
    common: { transformOrigin: "center" },
    transitionProperty: "transform, opacity",
  },
  V4 = {},
  q4 = (
    e,
    {
      radius: r,
      color: a,
      gradient: i,
      variant: s,
      size: u,
      justify: f,
      autoContrast: h,
    },
  ) => {
    const p = e.variantColorResolver({
      color: a || e.primaryColor,
      theme: e,
      gradient: i,
      variant: s || "filled",
      autoContrast: h,
    });
    return {
      root: {
        "--button-justify": f,
        "--button-height": He(u, "button-height"),
        "--button-padding-x": He(u, "button-padding-x"),
        "--button-fz": u?.includes("compact")
          ? Pt(u.replace("compact-", ""))
          : Pt(u),
        "--button-radius": r === void 0 ? void 0 : Bn(r),
        "--button-bg": a || s ? p.background : void 0,
        "--button-hover": a || s ? p.hover : void 0,
        "--button-color": p.color,
        "--button-bd": a || s ? p.border : void 0,
        "--button-hover-color": a || s ? p.hoverColor : void 0,
      },
    };
  },
  $t = Kt((e, r) => {
    const a = ae("Button", V4, e),
      {
        style: i,
        vars: s,
        className: u,
        color: f,
        disabled: h,
        children: p,
        leftSection: m,
        rightSection: g,
        fullWidth: y,
        variant: S,
        radius: w,
        loading: E,
        loaderProps: T,
        gradient: R,
        classNames: _,
        styles: j,
        unstyled: A,
        "data-disabled": D,
        autoContrast: U,
        mod: k,
        ...Z
      } = a,
      V = Ee({
        name: "Button",
        props: a,
        classes: Yo,
        className: u,
        style: i,
        classNames: _,
        styles: j,
        unstyled: A,
        vars: s,
        varsResolver: q4,
      }),
      W = !!m,
      ee = !!g;
    return v.jsxs(Sl, {
      ref: r,
      ...V("root", { active: !h && !E && !D }),
      unstyled: A,
      variant: S,
      disabled: h || E,
      mod: [
        {
          disabled: h || D,
          loading: E,
          block: y,
          "with-left-section": W,
          "with-right-section": ee,
        },
        k,
      ],
      ...Z,
      children: [
        v.jsx(Po, {
          mounted: !!E,
          transition: Z4,
          duration: 150,
          children: (pe) =>
            v.jsx(ge, {
              component: "span",
              ...V("loader", { style: pe }),
              "aria-hidden": !0,
              children: v.jsx(Zo, {
                color: "var(--button-color)",
                size: "calc(var(--button-height) / 1.8)",
                ...T,
              }),
            }),
        }),
        v.jsxs("span", {
          ...V("inner"),
          children: [
            m &&
              v.jsx(ge, {
                component: "span",
                ...V("section"),
                mod: { position: "left" },
                children: m,
              }),
            v.jsx(ge, {
              component: "span",
              mod: { loading: E },
              ...V("label"),
              children: p,
            }),
            g &&
              v.jsx(ge, {
                component: "span",
                ...V("section"),
                mod: { position: "right" },
                children: g,
              }),
          ],
        }),
      ],
    });
  });
$t.classes = Yo;
$t.displayName = "@mantine/core/Button";
$t.Group = Uh;
$t.GroupSection = Hh;
const [Y4, G4] = hl("Card component was not found in tree");
var Bh = { root: "m_e615b15f", section: "m_599a2148" };
const F4 = {},
  Mu = Kt((e, r) => {
    const a = ae("CardSection", F4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        vars: h,
        withBorder: p,
        inheritPadding: m,
        mod: g,
        ...y
      } = a,
      S = G4();
    return v.jsx(ge, {
      ref: r,
      mod: [{ "with-border": p, "inherit-padding": m }, g],
      ...S.getStyles("section", {
        className: s,
        style: u,
        styles: f,
        classNames: i,
      }),
      ...y,
    });
  });
Mu.classes = Bh;
Mu.displayName = "@mantine/core/CardSection";
const Q4 = {},
  X4 = (e, { padding: r }) => ({ root: { "--card-padding": Cr(r) } }),
  El = Kt((e, r) => {
    const a = ae("Card", Q4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        children: m,
        padding: g,
        ...y
      } = a,
      S = Ee({
        name: "Card",
        props: a,
        classes: Bh,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: X4,
      }),
      w = x.Children.toArray(m),
      E = w.map((T, R) =>
        typeof T == "object" && T && "type" in T && T.type === Mu
          ? x.cloneElement(T, {
              "data-first-section": R === 0 || void 0,
              "data-last-section": R === w.length - 1 || void 0,
            })
          : T,
      );
    return v.jsx(Y4, {
      value: { getStyles: S },
      children: v.jsx(Jr, {
        ref: r,
        unstyled: h,
        ...S("root"),
        ...y,
        children: E,
      }),
    });
  });
El.classes = Bh;
El.displayName = "@mantine/core/Card";
El.Section = Mu;
var u1 = { root: "m_4451eb3a" };
const K4 = {},
  Vt = Kt((e, r) => {
    const a = ae("Center", K4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        inline: m,
        mod: g,
        ...y
      } = a,
      S = Ee({
        name: "Center",
        props: a,
        classes: u1,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
      });
    return v.jsx(ge, { ref: r, mod: [{ inline: m }, g], ...S("root"), ...y });
  });
Vt.classes = u1;
Vt.displayName = "@mantine/core/Center";
var c1 = { root: "m_7485cace" };
const I4 = {},
  W4 = (e, { size: r, fluid: a }) => ({
    root: { "--container-size": a ? void 0 : He(r, "container-size") },
  }),
  qt = Se((e, r) => {
    const a = ae("Container", I4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        fluid: m,
        mod: g,
        ...y
      } = a,
      S = Ee({
        name: "Container",
        classes: c1,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: W4,
      });
    return v.jsx(ge, { ref: r, mod: [{ fluid: m }, g], ...S("root"), ...y });
  });
qt.classes = c1;
qt.displayName = "@mantine/core/Container";
var f1 = { root: "m_e2125a27", closeButton: "m_5abab665" };
const J4 = {
    shadow: "md",
    p: "md",
    withBorder: !1,
    transitionProps: { transition: "pop-top-right", duration: 200 },
    position: { bottom: 30, right: 30 },
  },
  eT = (e, { size: r }) => ({
    root: { "--dialog-size": He(r, "dialog-size") },
  }),
  Ph = Se((e, r) => {
    const a = ae("Dialog", J4, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        zIndex: m,
        position: g,
        keepMounted: y,
        opened: S,
        transitionProps: w,
        withCloseButton: E,
        withinPortal: T,
        children: R,
        onClose: _,
        portalProps: j,
        ...A
      } = a,
      D = Ee({
        name: "Dialog",
        classes: f1,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: eT,
      });
    return v.jsx(Du, {
      zIndex: m,
      position: g,
      ref: r,
      withinPortal: T,
      portalProps: j,
      unstyled: h,
      children: v.jsx(Po, {
        keepMounted: y,
        mounted: S,
        ...w,
        children: (U) =>
          v.jsxs(Jr, {
            unstyled: h,
            ...D("root", { style: U }),
            ...A,
            children: [
              E && v.jsx(qo, { onClick: _, unstyled: h, ...D("closeButton") }),
              R,
            ],
          }),
      }),
    });
  });
Ph.classes = f1;
Ph.displayName = "@mantine/core/Dialog";
const tT = { multiple: !1 },
  d1 = x.forwardRef((e, r) => {
    const {
        onChange: a,
        children: i,
        multiple: s,
        accept: u,
        name: f,
        form: h,
        resetRef: p,
        disabled: m,
        capture: g,
        inputProps: y,
        ...S
      } = ae("FileButton", tT, e),
      w = x.useRef(null),
      E = () => {
        !m && w.current?.click();
      },
      T = (_) => {
        if (_.currentTarget.files === null) return a(s ? [] : null);
        a(
          s
            ? Array.from(_.currentTarget.files)
            : _.currentTarget.files[0] || null,
        );
      };
    return (
      iu(p, () => {
        w.current && (w.current.value = "");
      }),
      v.jsxs(v.Fragment, {
        children: [
          v.jsx("input", {
            style: { display: "none" },
            type: "file",
            accept: u,
            multiple: s,
            onChange: T,
            ref: Zt(r, w),
            name: f,
            form: h,
            capture: g,
            ...y,
          }),
          i({ onClick: E, ...S }),
        ],
      })
    );
  });
d1.displayName = "@mantine/core/FileButton";
const nT = ({ value: e }) =>
    v.jsx("div", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      children: Array.isArray(e) ? e.map((r) => r.name).join(", ") : e?.name,
    }),
  rT = { valueComponent: nT },
  Zh = Se((e, r) => {
    const a = ae("FileInput", rT, e),
      {
        unstyled: i,
        vars: s,
        onChange: u,
        value: f,
        defaultValue: h,
        multiple: p,
        accept: m,
        name: g,
        form: y,
        valueComponent: S,
        clearable: w,
        clearButtonProps: E,
        readOnly: T,
        capture: R,
        fileInputProps: _,
        rightSection: j,
        size: A,
        placeholder: D,
        component: U,
        resetRef: k,
        classNames: Z,
        styles: V,
        ...W
      } = a,
      ee = x.useRef(null),
      { resolvedClassNames: pe, resolvedStyles: oe } = Uo({
        classNames: Z,
        styles: V,
        props: a,
      }),
      [ce, fe] = To({
        value: f,
        defaultValue: h,
        onChange: u,
        finalValue: p ? [] : null,
      }),
      le = Array.isArray(ce) ? ce.length !== 0 : ce !== null,
      M =
        j ||
        (w && le && !T
          ? v.jsx(qo, {
              ...E,
              variant: "subtle",
              onClick: () => fe(p ? [] : null),
              size: A,
              unstyled: i,
            })
          : null);
    return (
      x.useEffect(() => {
        ((Array.isArray(ce) && ce.length === 0) || ce === null) &&
          ee.current?.();
      }, [ce]),
      v.jsx(d1, {
        onChange: fe,
        multiple: p,
        accept: m,
        name: g,
        form: y,
        resetRef: Zt(ee, k),
        disabled: T,
        capture: R,
        inputProps: _,
        children: (Q) =>
          v.jsx(It, {
            component: U || "button",
            ref: r,
            rightSection: M,
            ...Q,
            ...W,
            __staticSelector: "FileInput",
            multiline: !0,
            type: "button",
            pointer: !0,
            __stylesApiProps: a,
            unstyled: i,
            size: A,
            classNames: Z,
            styles: V,
            children: le
              ? v.jsx(S, { value: ce })
              : v.jsx(vt.Placeholder, {
                  __staticSelector: "FileInput",
                  classNames: pe,
                  styles: oe,
                  children: D,
                }),
          }),
      })
    );
  });
Zh.classes = It.classes;
Zh.displayName = "@mantine/core/FileInput";
const aT = Zh;
function jd() {
  return (
    (jd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var a = arguments[r];
            for (var i in a) ({}).hasOwnProperty.call(a, i) && (e[i] = a[i]);
          }
          return e;
        }),
    jd.apply(null, arguments)
  );
}
function oT(e, r) {
  if (e == null) return {};
  var a = {};
  for (var i in e)
    if ({}.hasOwnProperty.call(e, i)) {
      if (r.indexOf(i) !== -1) continue;
      a[i] = e[i];
    }
  return a;
}
var iT = x.useLayoutEffect,
  lT = function (r) {
    var a = Ca.useRef(r);
    return (
      iT(function () {
        a.current = r;
      }),
      a
    );
  },
  Vv = function (r, a) {
    if (typeof r == "function") {
      r(a);
      return;
    }
    r.current = a;
  },
  sT = function (r, a) {
    var i = Ca.useRef();
    return Ca.useCallback(
      function (s) {
        (r.current = s),
          i.current && Vv(i.current, null),
          (i.current = a),
          a && Vv(a, s);
      },
      [a],
    );
  },
  qv = {
    "min-height": "0",
    "max-height": "none",
    height: "0",
    visibility: "hidden",
    overflow: "hidden",
    position: "absolute",
    "z-index": "-1000",
    top: "0",
    right: "0",
    display: "block",
  },
  uT = function (r) {
    Object.keys(qv).forEach(function (a) {
      r.style.setProperty(a, qv[a], "important");
    });
  },
  Yv = uT,
  Ht = null,
  Gv = function (r, a) {
    var i = r.scrollHeight;
    return a.sizingStyle.boxSizing === "border-box"
      ? i + a.borderSize
      : i - a.paddingSize;
  };
function cT(e, r, a, i) {
  a === void 0 && (a = 1),
    i === void 0 && (i = 1 / 0),
    Ht ||
      ((Ht = document.createElement("textarea")),
      Ht.setAttribute("tabindex", "-1"),
      Ht.setAttribute("aria-hidden", "true"),
      Yv(Ht)),
    Ht.parentNode === null && document.body.appendChild(Ht);
  var s = e.paddingSize,
    u = e.borderSize,
    f = e.sizingStyle,
    h = f.boxSizing;
  Object.keys(f).forEach(function (S) {
    var w = S;
    Ht.style[w] = f[w];
  }),
    Yv(Ht),
    (Ht.value = r);
  var p = Gv(Ht, e);
  (Ht.value = r), (p = Gv(Ht, e)), (Ht.value = "x");
  var m = Ht.scrollHeight - s,
    g = m * a;
  h === "border-box" && (g = g + s + u), (p = Math.max(g, p));
  var y = m * i;
  return h === "border-box" && (y = y + s + u), (p = Math.min(y, p)), [p, m];
}
var Fv = function () {},
  fT = function (r, a) {
    return r.reduce(function (i, s) {
      return (i[s] = a[s]), i;
    }, {});
  },
  dT = [
    "borderBottomWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderTopWidth",
    "boxSizing",
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "letterSpacing",
    "lineHeight",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "tabSize",
    "textIndent",
    "textRendering",
    "textTransform",
    "width",
    "wordBreak",
    "wordSpacing",
    "scrollbarGutter",
  ],
  hT = !!document.documentElement.currentStyle,
  pT = function (r) {
    var a = window.getComputedStyle(r);
    if (a === null) return null;
    var i = fT(dT, a),
      s = i.boxSizing;
    if (s === "") return null;
    hT &&
      s === "border-box" &&
      (i.width =
        parseFloat(i.width) +
        parseFloat(i.borderRightWidth) +
        parseFloat(i.borderLeftWidth) +
        parseFloat(i.paddingRight) +
        parseFloat(i.paddingLeft) +
        "px");
    var u = parseFloat(i.paddingBottom) + parseFloat(i.paddingTop),
      f = parseFloat(i.borderBottomWidth) + parseFloat(i.borderTopWidth);
    return { sizingStyle: i, paddingSize: u, borderSize: f };
  },
  mT = pT;
function Vh(e, r, a) {
  var i = lT(a);
  x.useLayoutEffect(function () {
    var s = function (f) {
      return i.current(f);
    };
    if (e)
      return (
        e.addEventListener(r, s),
        function () {
          return e.removeEventListener(r, s);
        }
      );
  }, []);
}
var gT = function (r, a) {
    Vh(document.body, "reset", function (i) {
      r.current.form === i.target && a(i);
    });
  },
  yT = function (r) {
    Vh(window, "resize", r);
  },
  vT = function (r) {
    Vh(document.fonts, "loadingdone", r);
  },
  bT = [
    "cacheMeasurements",
    "maxRows",
    "minRows",
    "onChange",
    "onHeightChange",
  ],
  ST = function (r, a) {
    var i = r.cacheMeasurements,
      s = r.maxRows,
      u = r.minRows,
      f = r.onChange,
      h = f === void 0 ? Fv : f,
      p = r.onHeightChange,
      m = p === void 0 ? Fv : p,
      g = oT(r, bT),
      y = g.value !== void 0,
      S = x.useRef(null),
      w = sT(S, a),
      E = x.useRef(0),
      T = x.useRef(),
      R = function () {
        var A = S.current,
          D = i && T.current ? T.current : mT(A);
        if (D) {
          T.current = D;
          var U = cT(D, A.value || A.placeholder || "x", u, s),
            k = U[0],
            Z = U[1];
          E.current !== k &&
            ((E.current = k),
            A.style.setProperty("height", k + "px", "important"),
            m(k, { rowHeight: Z }));
        }
      },
      _ = function (A) {
        y || R(), h(A);
      };
    return (
      x.useLayoutEffect(R),
      gT(S, function () {
        if (!y) {
          var j = S.current.value;
          requestAnimationFrame(function () {
            var A = S.current;
            A && j !== A.value && R();
          });
        }
      }),
      yT(R),
      vT(R),
      x.createElement("textarea", jd({}, g, { onChange: _, ref: w }))
    );
  },
  xT = x.forwardRef(ST);
const wT = {},
  qh = Se((e, r) => {
    const {
        autosize: a,
        maxRows: i,
        minRows: s,
        __staticSelector: u,
        resize: f,
        ...h
      } = ae("Textarea", wT, e),
      p = a && dC() !== "test",
      m = p ? { maxRows: i, minRows: s } : {};
    return v.jsx(It, {
      component: p ? xT : "textarea",
      ref: r,
      ...h,
      __staticSelector: u || "Textarea",
      multiline: !0,
      "data-no-overflow": (a && i === void 0) || void 0,
      __vars: { "--input-resize": f },
      ...m,
    });
  });
qh.classes = It.classes;
qh.displayName = "@mantine/core/Textarea";
const [CT, Yh] = vu(),
  [ET, _T] = vu();
var $u = {
  root: "m_7cda1cd6",
  "root--default": "m_44da308b",
  "root--contrast": "m_e3a01f8",
  label: "m_1e0e6180",
  remove: "m_ae386778",
  group: "m_1dcfd90b",
};
const RT = {},
  TT = (e, { gap: r }, { size: a }) => ({
    group: { "--pg-gap": r !== void 0 ? He(r) : He(a, "pg-gap") },
  }),
  Gh = Se((e, r) => {
    const a = ae("PillGroup", RT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        size: m,
        disabled: g,
        ...y
      } = a,
      w = Yh()?.size || m || void 0,
      E = Ee({
        name: "PillGroup",
        classes: $u,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: TT,
        stylesCtx: { size: w },
        rootSelector: "group",
      });
    return v.jsx(ET, {
      value: { size: w, disabled: g },
      children: v.jsx(ge, { ref: r, size: w, ...E("group"), ...y }),
    });
  });
Gh.classes = $u;
Gh.displayName = "@mantine/core/PillGroup";
const AT = { variant: "default" },
  zT = (e, { radius: r }, { size: a }) => ({
    root: {
      "--pill-fz": He(a, "pill-fz"),
      "--pill-height": He(a, "pill-height"),
      "--pill-radius": r === void 0 ? void 0 : Bn(r),
    },
  }),
  il = Se((e, r) => {
    const a = ae("Pill", AT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        variant: m,
        children: g,
        withRemoveButton: y,
        onRemove: S,
        removeButtonProps: w,
        radius: E,
        size: T,
        disabled: R,
        mod: _,
        ...j
      } = a,
      A = _T(),
      D = Yh(),
      U = T || A?.size || void 0,
      k = D?.variant === "filled" ? "contrast" : m || "default",
      Z = Ee({
        name: "Pill",
        classes: $u,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: zT,
        stylesCtx: { size: U },
      });
    return v.jsxs(ge, {
      component: "span",
      ref: r,
      variant: k,
      size: U,
      ...Z("root", { variant: k }),
      mod: [{ "with-remove": y && !R, disabled: R || A?.disabled }, _],
      ...j,
      children: [
        v.jsx("span", { ...Z("label"), children: g }),
        y &&
          v.jsx(qo, {
            variant: "transparent",
            radius: E,
            tabIndex: -1,
            "aria-hidden": !0,
            unstyled: h,
            ...w,
            ...Z("remove", { className: w?.className, style: w?.style }),
            onMouseDown: (V) => {
              V.preventDefault(), V.stopPropagation(), w?.onMouseDown?.(V);
            },
            onClick: (V) => {
              V.stopPropagation(), S?.(), w?.onClick?.(V);
            },
          }),
      ],
    });
  });
il.classes = $u;
il.displayName = "@mantine/core/Pill";
il.Group = Gh;
var h1 = { field: "m_45c4369d" };
const OT = { type: "visible" },
  Fh = Se((e, r) => {
    const a = ae("PillsInputField", OT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        type: m,
        disabled: g,
        id: y,
        pointer: S,
        mod: w,
        ...E
      } = a,
      T = Yh(),
      R = wl(),
      _ = Ee({
        name: "PillsInputField",
        classes: h1,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        rootSelector: "field",
      }),
      j = g || T?.disabled;
    return v.jsx(ge, {
      component: "input",
      ref: Zt(r, T?.fieldRef),
      "data-type": m,
      disabled: j,
      mod: [{ disabled: j, pointer: S }, w],
      ..._("field"),
      ...E,
      id: R?.inputId || y,
      "aria-invalid": T?.hasError,
      "aria-describedby": R?.describedBy,
      type: "text",
      onMouseDown: (A) => !S && A.stopPropagation(),
    });
  });
Fh.classes = h1;
Fh.displayName = "@mantine/core/PillsInputField";
const jT = { size: "sm" },
  du = Se((e, r) => {
    const a = ae("PillsInput", jT, e),
      {
        children: i,
        onMouseDown: s,
        onClick: u,
        size: f,
        disabled: h,
        __staticSelector: p,
        error: m,
        variant: g,
        ...y
      } = a,
      S = x.useRef(null);
    return v.jsx(CT, {
      value: { fieldRef: S, size: f, disabled: h, hasError: !!m, variant: g },
      children: v.jsx(It, {
        size: f,
        error: m,
        variant: g,
        component: "div",
        ref: r,
        "data-no-overflow": !0,
        onMouseDown: (w) => {
          w.preventDefault(), s?.(w), S.current?.focus();
        },
        onClick: (w) => {
          w.preventDefault(),
            w.currentTarget.closest("fieldset")?.disabled ||
              (S.current?.focus(), u?.(w));
        },
        ...y,
        multiline: !0,
        disabled: h,
        __staticSelector: p || "PillsInput",
        withAria: !1,
        children: i,
      }),
    });
  });
du.displayName = "@mantine/core/PillsInput";
du.Field = Fh;
function DT({ data: e, value: r }) {
  const a = r.map((s) => s.trim().toLowerCase());
  return e.reduce(
    (s, u) => (
      Do(u)
        ? s.push({
            group: u.group,
            items: u.items.filter(
              (f) => a.indexOf(f.value.toLowerCase().trim()) === -1,
            ),
          })
        : a.indexOf(u.value.toLowerCase().trim()) === -1 && s.push(u),
      s
    ),
    [],
  );
}
const NT = {
    maxValues: 1 / 0,
    withCheckIcon: !0,
    checkIconPosition: "left",
    hiddenInputValuesDivider: ",",
  },
  Qh = Se((e, r) => {
    const a = ae("MultiSelect", NT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        size: m,
        value: g,
        defaultValue: y,
        onChange: S,
        onKeyDown: w,
        variant: E,
        data: T,
        dropdownOpened: R,
        defaultDropdownOpened: _,
        onDropdownOpen: j,
        onDropdownClose: A,
        selectFirstOptionOnChange: D,
        onOptionSubmit: U,
        comboboxProps: k,
        filter: Z,
        limit: V,
        withScrollArea: W,
        maxDropdownHeight: ee,
        searchValue: pe,
        defaultSearchValue: oe,
        onSearchChange: ce,
        readOnly: fe,
        disabled: le,
        onFocus: M,
        onBlur: Q,
        radius: Y,
        rightSection: re,
        rightSectionWidth: O,
        rightSectionPointerEvents: G,
        rightSectionProps: ne,
        leftSection: J,
        leftSectionWidth: ie,
        leftSectionPointerEvents: me,
        leftSectionProps: de,
        inputContainer: te,
        inputWrapperOrder: ue,
        withAsterisk: Ae,
        labelProps: Ve,
        descriptionProps: Ie,
        errorProps: St,
        wrapperProps: qe,
        description: xt,
        label: un,
        error: qn,
        maxValues: ft,
        searchable: it,
        nothingFoundMessage: _n,
        withCheckIcon: Yn,
        checkIconPosition: lt,
        hidePickedOptions: Go,
        withErrorStyles: ja,
        name: Fo,
        form: Da,
        id: Ye,
        clearable: wt,
        clearButtonProps: cn,
        hiddenInputProps: Ct,
        placeholder: Na,
        hiddenInputValuesDivider: Rn,
        required: Zu,
        mod: Ma,
        renderOption: $a,
        onRemove: Tn,
        onClear: ka,
        scrollAreaProps: ta,
        chevronColor: Vu,
        ...Qo
      } = a,
      La = ml(Ye),
      na = a4(T),
      fn = Jb(na),
      Lt = kh({
        opened: R,
        defaultOpened: _,
        onDropdownOpen: j,
        onDropdownClose: () => {
          A?.(), Lt.resetSelectedOption();
        },
      }),
      {
        styleProps: zl,
        rest: { type: qu, autoComplete: Xo, ...Ko },
      } = yl(Qo),
      [dt, ra] = To({ value: g, defaultValue: y, finalValue: [], onChange: S }),
      [Wt, ht] = To({
        value: pe,
        defaultValue: oe,
        finalValue: "",
        onChange: ce,
      }),
      st = (je) => {
        ht(je), Lt.resetSelectedOption();
      },
      Gn = Ee({
        name: "MultiSelect",
        classes: {},
        props: a,
        classNames: i,
        styles: f,
        unstyled: h,
      }),
      { resolvedClassNames: Ua, resolvedStyles: Ol } = Uo({
        props: a,
        styles: f,
        classNames: i,
      }),
      Yu = (je) => {
        w?.(je),
          je.key === " " && !it && (je.preventDefault(), Lt.toggleDropdown()),
          je.key === "Backspace" &&
            Wt.length === 0 &&
            dt.length > 0 &&
            (Tn?.(dt[dt.length - 1]), ra(dt.slice(0, dt.length - 1)));
      },
      jl = dt.map((je, lr) =>
        v.jsx(
          il,
          {
            withRemoveButton: !fe && !fn[je]?.disabled,
            onRemove: () => {
              ra(dt.filter((Tr) => je !== Tr)), Tn?.(je);
            },
            unstyled: h,
            disabled: le,
            ...Gn("pill"),
            children: fn[je]?.label || je,
          },
          `${je}-${lr}`,
        ),
      );
    x.useEffect(() => {
      D && Lt.selectFirstOption();
    }, [D, Wt]);
    const Rr = v.jsx(ze.ClearButton, {
        ...cn,
        onClear: () => {
          ka?.(), ra([]), st("");
        },
      }),
      Io = DT({ data: na, value: dt }),
      ir = wt && dt.length > 0 && !le && !fe;
    return v.jsxs(v.Fragment, {
      children: [
        v.jsxs(ze, {
          store: Lt,
          classNames: Ua,
          styles: Ol,
          unstyled: h,
          size: m,
          readOnly: fe,
          __staticSelector: "MultiSelect",
          onOptionSubmit: (je) => {
            U?.(je),
              st(""),
              Lt.updateSelectedOptionIndex("selected"),
              dt.includes(fn[je].value)
                ? (ra(dt.filter((lr) => lr !== fn[je].value)),
                  Tn?.(fn[je].value))
                : dt.length < ft && ra([...dt, fn[je].value]);
          },
          ...k,
          children: [
            v.jsx(ze.DropdownTarget, {
              children: v.jsx(du, {
                ...zl,
                __staticSelector: "MultiSelect",
                classNames: Ua,
                styles: Ol,
                unstyled: h,
                size: m,
                className: s,
                style: u,
                variant: E,
                disabled: le,
                radius: Y,
                __defaultRightSection: v.jsx(ze.Chevron, {
                  size: m,
                  error: qn,
                  unstyled: h,
                  color: Vu,
                }),
                __clearSection: Rr,
                __clearable: ir,
                rightSection: re,
                rightSectionPointerEvents: G || (Rr ? "all" : "none"),
                rightSectionWidth: O,
                rightSectionProps: ne,
                leftSection: J,
                leftSectionWidth: ie,
                leftSectionPointerEvents: me,
                leftSectionProps: de,
                inputContainer: te,
                inputWrapperOrder: ue,
                withAsterisk: Ae,
                labelProps: Ve,
                descriptionProps: Ie,
                errorProps: St,
                wrapperProps: qe,
                description: xt,
                label: un,
                error: qn,
                withErrorStyles: ja,
                __stylesApiProps: {
                  ...a,
                  rightSectionPointerEvents: G || (ir ? "all" : "none"),
                  multiline: !0,
                },
                pointer: !it,
                onClick: () => (it ? Lt.openDropdown() : Lt.toggleDropdown()),
                "data-expanded": Lt.dropdownOpened || void 0,
                id: La,
                required: Zu,
                mod: Ma,
                children: v.jsxs(il.Group, {
                  disabled: le,
                  unstyled: h,
                  ...Gn("pillsList"),
                  children: [
                    jl,
                    v.jsx(ze.EventsTarget, {
                      autoComplete: Xo,
                      children: v.jsx(du.Field, {
                        ...Ko,
                        ref: r,
                        id: La,
                        placeholder: Na,
                        type: !it && !Na ? "hidden" : "visible",
                        ...Gn("inputField"),
                        unstyled: h,
                        onFocus: (je) => {
                          M?.(je), it && Lt.openDropdown();
                        },
                        onBlur: (je) => {
                          Q?.(je), Lt.closeDropdown(), st("");
                        },
                        onKeyDown: Yu,
                        value: Wt,
                        onChange: (je) => {
                          st(je.currentTarget.value),
                            it && Lt.openDropdown(),
                            D && Lt.selectFirstOption();
                        },
                        disabled: le,
                        readOnly: fe || !it,
                        pointer: !it,
                      }),
                    }),
                  ],
                }),
              }),
            }),
            v.jsx(A4, {
              data: Go ? Io : na,
              hidden: fe || le,
              filter: Z,
              search: Wt,
              limit: V,
              hiddenWhenEmpty: !_n,
              withScrollArea: W,
              maxDropdownHeight: ee,
              filterOptions: it,
              value: dt,
              checkIconPosition: lt,
              withCheckIcon: Yn,
              nothingFoundMessage: _n,
              unstyled: h,
              labelId: un ? `${La}-label` : void 0,
              "aria-label": un ? void 0 : Qo["aria-label"],
              renderOption: $a,
              scrollAreaProps: ta,
            }),
          ],
        }),
        v.jsx(ze.HiddenInput, {
          name: Fo,
          valuesDivider: Rn,
          value: dt,
          form: Da,
          disabled: le,
          ...Ct,
        }),
      ],
    });
  });
Qh.classes = { ...It.classes, ...ze.classes };
Qh.displayName = "@mantine/core/MultiSelect";
const MT = ({ reveal: e }) =>
  v.jsx("svg", {
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" },
    children: v.jsx("path", {
      d: e
        ? "M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
        : "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }),
  });
var Dd = {
  root: "m_f61ca620",
  input: "m_ccf8da4c",
  innerInput: "m_f2d85dd2",
  visibilityToggle: "m_b1072d44",
};
const $T = { visibilityToggleIcon: MT },
  kT = (e, { size: r }) => ({
    root: {
      "--psi-icon-size": He(r, "psi-icon-size"),
      "--psi-button-size": He(r, "psi-button-size"),
    },
  }),
  _l = Se((e, r) => {
    const a = ae("PasswordInput", $T, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        required: m,
        error: g,
        leftSection: y,
        disabled: S,
        id: w,
        variant: E,
        inputContainer: T,
        description: R,
        label: _,
        size: j,
        errorProps: A,
        descriptionProps: D,
        labelProps: U,
        withAsterisk: k,
        inputWrapperOrder: Z,
        wrapperProps: V,
        radius: W,
        rightSection: ee,
        rightSectionWidth: pe,
        rightSectionPointerEvents: oe,
        leftSectionWidth: ce,
        visible: fe,
        defaultVisible: le,
        onVisibilityChange: M,
        visibilityToggleIcon: Q,
        visibilityToggleButtonProps: Y,
        rightSectionProps: re,
        leftSectionProps: O,
        leftSectionPointerEvents: G,
        withErrorStyles: ne,
        mod: J,
        ...ie
      } = a,
      me = ml(w),
      [de, te] = To({
        value: fe,
        defaultValue: le,
        finalValue: !1,
        onChange: M,
      }),
      ue = () => te(!de),
      Ae = Ee({
        name: "PasswordInput",
        classes: Dd,
        props: a,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: kT,
      }),
      { resolvedClassNames: Ve, resolvedStyles: Ie } = Uo({
        classNames: i,
        styles: f,
        props: a,
      }),
      { styleProps: St, rest: qe } = yl(ie),
      xt = A?.id || `${me}-error`,
      un = D?.id || `${me}-description`,
      it = `${!!g && typeof g != "boolean" ? xt : ""} ${!!R ? un : ""}`,
      _n = it.trim().length > 0 ? it.trim() : void 0,
      Yn = v.jsx(Nn, {
        ...Ae("visibilityToggle"),
        disabled: S,
        radius: W,
        "aria-hidden": !Y,
        tabIndex: -1,
        ...Y,
        variant: Y?.variant ?? "subtle",
        color: "gray",
        unstyled: h,
        onTouchEnd: (lt) => {
          lt.preventDefault(), Y?.onTouchEnd?.(lt), ue();
        },
        onMouseDown: (lt) => {
          lt.preventDefault(), Y?.onMouseDown?.(lt), ue();
        },
        onKeyDown: (lt) => {
          Y?.onKeyDown?.(lt), lt.key === " " && (lt.preventDefault(), ue());
        },
        children: v.jsx(Q, { reveal: de }),
      });
    return v.jsx(vt.Wrapper, {
      required: m,
      id: me,
      label: _,
      error: g,
      description: R,
      size: j,
      classNames: Ve,
      styles: Ie,
      __staticSelector: "PasswordInput",
      unstyled: h,
      withAsterisk: k,
      inputWrapperOrder: Z,
      inputContainer: T,
      variant: E,
      labelProps: { ...U, htmlFor: me },
      descriptionProps: { ...D, id: un },
      errorProps: { ...A, id: xt },
      mod: J,
      ...Ae("root"),
      ...St,
      ...V,
      children: v.jsx(vt, {
        component: "div",
        error: g,
        leftSection: y,
        size: j,
        classNames: { ...Ve, input: Pn(Dd.input, Ve.input) },
        styles: Ie,
        radius: W,
        disabled: S,
        __staticSelector: "PasswordInput",
        rightSectionWidth: pe,
        rightSection: ee ?? Yn,
        variant: E,
        unstyled: h,
        leftSectionWidth: ce,
        rightSectionPointerEvents: oe || "all",
        rightSectionProps: re,
        leftSectionProps: O,
        leftSectionPointerEvents: G,
        withAria: !1,
        withErrorStyles: ne,
        children: v.jsx("input", {
          required: m,
          "data-invalid": !!g || void 0,
          "data-with-left-section": !!y || void 0,
          ...Ae("innerInput"),
          disabled: S,
          id: me,
          ref: r,
          ...qe,
          "aria-describedby": _n,
          autoComplete: qe.autoComplete || "off",
          type: de ? "text" : "password",
        }),
      }),
    });
  });
_l.classes = { ...It.classes, ...Dd };
_l.displayName = "@mantine/core/PasswordInput";
var p1 = { root: "m_6d731127" };
const LT = { gap: "md", align: "stretch", justify: "flex-start" },
  UT = (e, { gap: r, align: a, justify: i }) => ({
    root: { "--stack-gap": Cr(r), "--stack-align": a, "--stack-justify": i },
  }),
  Zn = Se((e, r) => {
    const a = ae("Stack", LT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        vars: p,
        align: m,
        justify: g,
        gap: y,
        variant: S,
        ...w
      } = a,
      E = Ee({
        name: "Stack",
        props: a,
        classes: p1,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: p,
        varsResolver: UT,
      });
    return v.jsx(ge, { ref: r, ...E("root"), variant: S, ...w });
  });
Zn.classes = p1;
Zn.displayName = "@mantine/core/Stack";
const HT = {},
  _a = Se((e, r) => {
    const a = ae("TextInput", HT, e);
    return v.jsx(It, {
      component: "input",
      ref: r,
      ...a,
      __staticSelector: "TextInput",
    });
  });
_a.classes = It.classes;
_a.displayName = "@mantine/core/TextInput";
const BT = ["h1", "h2", "h3", "h4", "h5", "h6"],
  PT = ["xs", "sm", "md", "lg", "xl"];
function ZT(e, r) {
  const a = r !== void 0 ? r : `h${e}`;
  return BT.includes(a)
    ? {
        fontSize: `var(--mantine-${a}-font-size)`,
        fontWeight: `var(--mantine-${a}-font-weight)`,
        lineHeight: `var(--mantine-${a}-line-height)`,
      }
    : PT.includes(a)
      ? {
          fontSize: `var(--mantine-font-size-${a})`,
          fontWeight: `var(--mantine-h${e}-font-weight)`,
          lineHeight: `var(--mantine-h${e}-line-height)`,
        }
      : {
          fontSize: K(a),
          fontWeight: `var(--mantine-h${e}-font-weight)`,
          lineHeight: `var(--mantine-h${e}-line-height)`,
        };
}
var m1 = { root: "m_8a5d1357" };
const VT = { order: 1 },
  qT = (e, { order: r, size: a, lineClamp: i, textWrap: s }) => {
    const u = ZT(r || 1, a);
    return {
      root: {
        "--title-fw": u.fontWeight,
        "--title-lh": u.lineHeight,
        "--title-fz": u.fontSize,
        "--title-line-clamp": typeof i == "number" ? i.toString() : void 0,
        "--title-text-wrap": s,
      },
    };
  },
  Mt = Se((e, r) => {
    const a = ae("Title", VT, e),
      {
        classNames: i,
        className: s,
        style: u,
        styles: f,
        unstyled: h,
        order: p,
        vars: m,
        size: g,
        variant: y,
        lineClamp: S,
        textWrap: w,
        mod: E,
        ...T
      } = a,
      R = Ee({
        name: "Title",
        props: a,
        classes: m1,
        className: s,
        style: u,
        classNames: i,
        styles: f,
        unstyled: h,
        vars: m,
        varsResolver: qT,
      });
    return [1, 2, 3, 4, 5, 6].includes(p)
      ? v.jsx(ge, {
          ...R("root"),
          component: `h${p}`,
          variant: y,
          ref: r,
          mod: [{ order: p, "data-line-clamp": typeof S == "number" }, E],
          size: g,
          ...T,
        })
      : null;
  });
Mt.classes = m1;
Mt.displayName = "@mantine/core/Title";
var Rl = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  ku = typeof window > "u" || "Deno" in globalThis;
function xn() {}
function YT(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function GT(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function FT(e, r) {
  return Math.max(e + (r || 0) - Date.now(), 0);
}
function Nd(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function QT(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Qv(e, r) {
  const {
    type: a = "all",
    exact: i,
    fetchStatus: s,
    predicate: u,
    queryKey: f,
    stale: h,
  } = e;
  if (f) {
    if (i) {
      if (r.queryHash !== Xh(f, r.options)) return !1;
    } else if (!ll(r.queryKey, f)) return !1;
  }
  if (a !== "all") {
    const p = r.isActive();
    if ((a === "active" && !p) || (a === "inactive" && p)) return !1;
  }
  return !(
    (typeof h == "boolean" && r.isStale() !== h) ||
    (s && s !== r.state.fetchStatus) ||
    (u && !u(r))
  );
}
function Xv(e, r) {
  const { exact: a, status: i, predicate: s, mutationKey: u } = e;
  if (u) {
    if (!r.options.mutationKey) return !1;
    if (a) {
      if (Ra(r.options.mutationKey) !== Ra(u)) return !1;
    } else if (!ll(r.options.mutationKey, u)) return !1;
  }
  return !((i && r.state.status !== i) || (s && !s(r)));
}
function Xh(e, r) {
  return (r?.queryKeyHashFn || Ra)(e);
}
function Ra(e) {
  return JSON.stringify(e, (r, a) =>
    Md(a)
      ? Object.keys(a)
          .sort()
          .reduce((i, s) => ((i[s] = a[s]), i), {})
      : a,
  );
}
function ll(e, r) {
  return e === r
    ? !0
    : typeof e != typeof r
      ? !1
      : e && r && typeof e == "object" && typeof r == "object"
        ? Object.keys(r).every((a) => ll(e[a], r[a]))
        : !1;
}
function g1(e, r) {
  if (e === r) return e;
  const a = Kv(e) && Kv(r);
  if (a || (Md(e) && Md(r))) {
    const i = a ? e : Object.keys(e),
      s = i.length,
      u = a ? r : Object.keys(r),
      f = u.length,
      h = a ? [] : {},
      p = new Set(i);
    let m = 0;
    for (let g = 0; g < f; g++) {
      const y = a ? g : u[g];
      ((!a && p.has(y)) || a) && e[y] === void 0 && r[y] === void 0
        ? ((h[y] = void 0), m++)
        : ((h[y] = g1(e[y], r[y])), h[y] === e[y] && e[y] !== void 0 && m++);
    }
    return s === f && m === s ? e : h;
  }
  return r;
}
function XT(e, r) {
  if (!r || Object.keys(e).length !== Object.keys(r).length) return !1;
  for (const a in e) if (e[a] !== r[a]) return !1;
  return !0;
}
function Kv(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Md(e) {
  if (!Iv(e)) return !1;
  const r = e.constructor;
  if (r === void 0) return !0;
  const a = r.prototype;
  return !(
    !Iv(a) ||
    !a.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Iv(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function KT(e) {
  return new Promise((r) => {
    setTimeout(r, e);
  });
}
function IT(e, r, a) {
  return typeof a.structuralSharing == "function"
    ? a.structuralSharing(e, r)
    : a.structuralSharing !== !1
      ? g1(e, r)
      : r;
}
function WT(e, r, a = 0) {
  const i = [...e, r];
  return a && i.length > a ? i.slice(1) : i;
}
function JT(e, r, a = 0) {
  const i = [r, ...e];
  return a && i.length > a ? i.slice(0, -1) : i;
}
var Kh = Symbol();
function y1(e, r) {
  return !e.queryFn && r?.initialPromise
    ? () => r.initialPromise
    : !e.queryFn || e.queryFn === Kh
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function eA(e, r) {
  return typeof e == "function" ? e(...r) : !!e;
}
var tA = class extends Rl {
    #e;
    #t;
    #n;
    constructor() {
      super(),
        (this.#n = (e) => {
          if (!ku && window.addEventListener) {
            const r = () => e();
            return (
              window.addEventListener("visibilitychange", r, !1),
              () => {
                window.removeEventListener("visibilitychange", r);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      (this.#n = e),
        this.#t?.(),
        (this.#t = e((r) => {
          typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
        }));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach((r) => {
        r(e);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  v1 = new tA(),
  nA = class extends Rl {
    #e = !0;
    #t;
    #n;
    constructor() {
      super(),
        (this.#n = (e) => {
          if (!ku && window.addEventListener) {
            const r = () => e(!0),
              a = () => e(!1);
            return (
              window.addEventListener("online", r, !1),
              window.addEventListener("offline", a, !1),
              () => {
                window.removeEventListener("online", r),
                  window.removeEventListener("offline", a);
              }
            );
          }
        });
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      (this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this)));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((a) => {
          a(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  hu = new nA();
function rA() {
  let e, r;
  const a = new Promise((s, u) => {
    (e = s), (r = u);
  });
  (a.status = "pending"), a.catch(() => {});
  function i(s) {
    Object.assign(a, s), delete a.resolve, delete a.reject;
  }
  return (
    (a.resolve = (s) => {
      i({ status: "fulfilled", value: s }), e(s);
    }),
    (a.reject = (s) => {
      i({ status: "rejected", reason: s }), r(s);
    }),
    a
  );
}
function aA(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function b1(e) {
  return (e ?? "online") === "online" ? hu.isOnline() : !0;
}
var S1 = class extends Error {
  constructor(e) {
    super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent);
  }
};
function yd(e) {
  return e instanceof S1;
}
function x1(e) {
  let r = !1,
    a = 0,
    i = !1,
    s;
  const u = rA(),
    f = (T) => {
      i || (S(new S1(T)), e.abort?.());
    },
    h = () => {
      r = !0;
    },
    p = () => {
      r = !1;
    },
    m = () =>
      v1.isFocused() &&
      (e.networkMode === "always" || hu.isOnline()) &&
      e.canRun(),
    g = () => b1(e.networkMode) && e.canRun(),
    y = (T) => {
      i || ((i = !0), e.onSuccess?.(T), s?.(), u.resolve(T));
    },
    S = (T) => {
      i || ((i = !0), e.onError?.(T), s?.(), u.reject(T));
    },
    w = () =>
      new Promise((T) => {
        (s = (R) => {
          (i || m()) && T(R);
        }),
          e.onPause?.();
      }).then(() => {
        (s = void 0), i || e.onContinue?.();
      }),
    E = () => {
      if (i) return;
      let T;
      const R = a === 0 ? e.initialPromise : void 0;
      try {
        T = R ?? e.fn();
      } catch (_) {
        T = Promise.reject(_);
      }
      Promise.resolve(T)
        .then(y)
        .catch((_) => {
          if (i) return;
          const j = e.retry ?? (ku ? 0 : 3),
            A = e.retryDelay ?? aA,
            D = typeof A == "function" ? A(a, _) : A,
            U =
              j === !0 ||
              (typeof j == "number" && a < j) ||
              (typeof j == "function" && j(a, _));
          if (r || !U) {
            S(_);
            return;
          }
          a++,
            e.onFail?.(a, _),
            KT(D)
              .then(() => (m() ? void 0 : w()))
              .then(() => {
                r ? S(_) : E();
              });
        });
    };
  return {
    promise: u,
    cancel: f,
    continue: () => (s?.(), u),
    cancelRetry: h,
    continueRetry: p,
    canStart: g,
    start: () => (g() ? E() : w().then(E), u),
  };
}
var oA = (e) => setTimeout(e, 0);
function iA() {
  let e = [],
    r = 0,
    a = (h) => {
      h();
    },
    i = (h) => {
      h();
    },
    s = oA;
  const u = (h) => {
      r
        ? e.push(h)
        : s(() => {
            a(h);
          });
    },
    f = () => {
      const h = e;
      (e = []),
        h.length &&
          s(() => {
            i(() => {
              h.forEach((p) => {
                a(p);
              });
            });
          });
    };
  return {
    batch: (h) => {
      let p;
      r++;
      try {
        p = h();
      } finally {
        r--, r || f();
      }
      return p;
    },
    batchCalls:
      (h) =>
      (...p) => {
        u(() => {
          h(...p);
        });
      },
    schedule: u,
    setNotifyFunction: (h) => {
      a = h;
    },
    setBatchNotifyFunction: (h) => {
      i = h;
    },
    setScheduler: (h) => {
      s = h;
    },
  };
}
var At = iA(),
  w1 = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout(),
        GT(this.gcTime) &&
          (this.#e = setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime));
    }
    updateGcTime(e) {
      this.gcTime = Math.max(
        this.gcTime || 0,
        e ?? (ku ? 1 / 0 : 5 * 60 * 1e3),
      );
    }
    clearGcTimeout() {
      this.#e && (clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  lA = class extends w1 {
    #e;
    #t;
    #n;
    #r;
    #a;
    #i;
    #l;
    constructor(e) {
      super(),
        (this.#l = !1),
        (this.#i = e.defaultOptions),
        this.setOptions(e.options),
        (this.observers = []),
        (this.#r = e.client),
        (this.#n = this.#r.getQueryCache()),
        (this.queryKey = e.queryKey),
        (this.queryHash = e.queryHash),
        (this.#e = uA(this.options)),
        (this.state = e.state ?? this.#e),
        this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#a?.promise;
    }
    setOptions(e) {
      (this.options = { ...this.#i, ...e }),
        this.updateGcTime(this.options.gcTime);
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(e, r) {
      const a = IT(this.state.data, e, this.options);
      return (
        this.#o({
          data: a,
          type: "success",
          dataUpdatedAt: r?.updatedAt,
          manual: r?.manual,
        }),
        a
      );
    }
    setState(e, r) {
      this.#o({ type: "setState", state: e, setStateOptions: r });
    }
    cancel(e) {
      const r = this.#a?.promise;
      return this.#a?.cancel(e), r ? r.then(xn).catch(xn) : Promise.resolve();
    }
    destroy() {
      super.destroy(), this.cancel({ silent: !0 });
    }
    reset() {
      this.destroy(), this.setState(this.#e);
    }
    isActive() {
      return this.observers.some((e) => QT(e.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === Kh ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => Nd(e.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((e) => e.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(e = 0) {
      return this.state.data === void 0
        ? !0
        : e === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !FT(this.state.dataUpdatedAt, e);
    }
    onFocus() {
      this.observers
        .find((r) => r.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#a?.continue();
    }
    onOnline() {
      this.observers
        .find((r) => r.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#a?.continue();
    }
    addObserver(e) {
      this.observers.includes(e) ||
        (this.observers.push(e),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: e }));
    }
    removeObserver(e) {
      this.observers.includes(e) &&
        ((this.observers = this.observers.filter((r) => r !== e)),
        this.observers.length ||
          (this.#a &&
            (this.#l ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: e }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#o({ type: "invalidate" });
    }
    fetch(e, r) {
      if (this.state.fetchStatus !== "idle") {
        if (this.state.data !== void 0 && r?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#a) return this.#a.continueRetry(), this.#a.promise;
      }
      if ((e && this.setOptions(e), !this.options.queryFn)) {
        const p = this.observers.find((m) => m.options.queryFn);
        p && this.setOptions(p.options);
      }
      const a = new AbortController(),
        i = (p) => {
          Object.defineProperty(p, "signal", {
            enumerable: !0,
            get: () => ((this.#l = !0), a.signal),
          });
        },
        s = () => {
          const p = y1(this.options, r),
            g = (() => {
              const y = {
                client: this.#r,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return i(y), y;
            })();
          return (
            (this.#l = !1),
            this.options.persister ? this.options.persister(p, g, this) : p(g)
          );
        },
        f = (() => {
          const p = {
            fetchOptions: r,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#r,
            state: this.state,
            fetchFn: s,
          };
          return i(p), p;
        })();
      this.options.behavior?.onFetch(f, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== f.fetchOptions?.meta) &&
          this.#o({ type: "fetch", meta: f.fetchOptions?.meta });
      const h = (p) => {
        (yd(p) && p.silent) || this.#o({ type: "error", error: p }),
          yd(p) ||
            (this.#n.config.onError?.(p, this),
            this.#n.config.onSettled?.(this.state.data, p, this)),
          this.scheduleGc();
      };
      return (
        (this.#a = x1({
          initialPromise: r?.initialPromise,
          fn: f.fetchFn,
          abort: a.abort.bind(a),
          onSuccess: (p) => {
            if (p === void 0) {
              h(new Error(`${this.queryHash} data is undefined`));
              return;
            }
            try {
              this.setData(p);
            } catch (m) {
              h(m);
              return;
            }
            this.#n.config.onSuccess?.(p, this),
              this.#n.config.onSettled?.(p, this.state.error, this),
              this.scheduleGc();
          },
          onError: h,
          onFail: (p, m) => {
            this.#o({ type: "failed", failureCount: p, error: m });
          },
          onPause: () => {
            this.#o({ type: "pause" });
          },
          onContinue: () => {
            this.#o({ type: "continue" });
          },
          retry: f.options.retry,
          retryDelay: f.options.retryDelay,
          networkMode: f.options.networkMode,
          canRun: () => !0,
        })),
        this.#a.start()
      );
    }
    #o(e) {
      const r = (a) => {
        switch (e.type) {
          case "failed":
            return {
              ...a,
              fetchFailureCount: e.failureCount,
              fetchFailureReason: e.error,
            };
          case "pause":
            return { ...a, fetchStatus: "paused" };
          case "continue":
            return { ...a, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...a,
              ...sA(a.data, this.options),
              fetchMeta: e.meta ?? null,
            };
          case "success":
            return (
              (this.#t = void 0),
              {
                ...a,
                data: e.data,
                dataUpdateCount: a.dataUpdateCount + 1,
                dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
                error: null,
                isInvalidated: !1,
                status: "success",
                ...(!e.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              }
            );
          case "error":
            const i = e.error;
            return yd(i) && i.revert && this.#t
              ? { ...this.#t, fetchStatus: "idle" }
              : {
                  ...a,
                  error: i,
                  errorUpdateCount: a.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: a.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: "idle",
                  status: "error",
                };
          case "invalidate":
            return { ...a, isInvalidated: !0 };
          case "setState":
            return { ...a, ...e.state };
        }
      };
      (this.state = r(this.state)),
        At.batch(() => {
          this.observers.forEach((a) => {
            a.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: e });
        });
    }
  };
function sA(e, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: b1(r.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function uA(e) {
  const r =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    a = r !== void 0,
    i = a
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: r,
    dataUpdateCount: 0,
    dataUpdatedAt: a ? (i ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: a ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var cA = class extends Rl {
    constructor(e = {}) {
      super(), (this.config = e), (this.#e = new Map());
    }
    #e;
    build(e, r, a) {
      const i = r.queryKey,
        s = r.queryHash ?? Xh(i, r);
      let u = this.get(s);
      return (
        u ||
          ((u = new lA({
            client: e,
            queryKey: i,
            queryHash: s,
            options: e.defaultQueryOptions(r),
            state: a,
            defaultOptions: e.getQueryDefaults(i),
          })),
          this.add(u)),
        u
      );
    }
    add(e) {
      this.#e.has(e.queryHash) ||
        (this.#e.set(e.queryHash, e), this.notify({ type: "added", query: e }));
    }
    remove(e) {
      const r = this.#e.get(e.queryHash);
      r &&
        (e.destroy(),
        r === e && this.#e.delete(e.queryHash),
        this.notify({ type: "removed", query: e }));
    }
    clear() {
      At.batch(() => {
        this.getAll().forEach((e) => {
          this.remove(e);
        });
      });
    }
    get(e) {
      return this.#e.get(e);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(e) {
      const r = { exact: !0, ...e };
      return this.getAll().find((a) => Qv(r, a));
    }
    findAll(e = {}) {
      const r = this.getAll();
      return Object.keys(e).length > 0 ? r.filter((a) => Qv(e, a)) : r;
    }
    notify(e) {
      At.batch(() => {
        this.listeners.forEach((r) => {
          r(e);
        });
      });
    }
    onFocus() {
      At.batch(() => {
        this.getAll().forEach((e) => {
          e.onFocus();
        });
      });
    }
    onOnline() {
      At.batch(() => {
        this.getAll().forEach((e) => {
          e.onOnline();
        });
      });
    }
  },
  fA = class extends w1 {
    #e;
    #t;
    #n;
    constructor(e) {
      super(),
        (this.mutationId = e.mutationId),
        (this.#t = e.mutationCache),
        (this.#e = []),
        (this.state = e.state || C1()),
        this.setOptions(e.options),
        this.scheduleGc();
    }
    setOptions(e) {
      (this.options = e), this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(e) {
      this.#e.includes(e) ||
        (this.#e.push(e),
        this.clearGcTimeout(),
        this.#t.notify({ type: "observerAdded", mutation: this, observer: e }));
    }
    removeObserver(e) {
      (this.#e = this.#e.filter((r) => r !== e)),
        this.scheduleGc(),
        this.#t.notify({
          type: "observerRemoved",
          mutation: this,
          observer: e,
        });
    }
    optionalRemove() {
      this.#e.length ||
        (this.state.status === "pending"
          ? this.scheduleGc()
          : this.#t.remove(this));
    }
    continue() {
      return this.#n?.continue() ?? this.execute(this.state.variables);
    }
    async execute(e) {
      const r = () => {
        this.#r({ type: "continue" });
      };
      this.#n = x1({
        fn: () =>
          this.options.mutationFn
            ? this.options.mutationFn(e)
            : Promise.reject(new Error("No mutationFn found")),
        onFail: (s, u) => {
          this.#r({ type: "failed", failureCount: s, error: u });
        },
        onPause: () => {
          this.#r({ type: "pause" });
        },
        onContinue: r,
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#t.canRun(this),
      });
      const a = this.state.status === "pending",
        i = !this.#n.canStart();
      try {
        if (a) r();
        else {
          this.#r({ type: "pending", variables: e, isPaused: i }),
            await this.#t.config.onMutate?.(e, this);
          const u = await this.options.onMutate?.(e);
          u !== this.state.context &&
            this.#r({ type: "pending", context: u, variables: e, isPaused: i });
        }
        const s = await this.#n.start();
        return (
          await this.#t.config.onSuccess?.(s, e, this.state.context, this),
          await this.options.onSuccess?.(s, e, this.state.context),
          await this.#t.config.onSettled?.(
            s,
            null,
            this.state.variables,
            this.state.context,
            this,
          ),
          await this.options.onSettled?.(s, null, e, this.state.context),
          this.#r({ type: "success", data: s }),
          s
        );
      } catch (s) {
        try {
          throw (
            (await this.#t.config.onError?.(s, e, this.state.context, this),
            await this.options.onError?.(s, e, this.state.context),
            await this.#t.config.onSettled?.(
              void 0,
              s,
              this.state.variables,
              this.state.context,
              this,
            ),
            await this.options.onSettled?.(void 0, s, e, this.state.context),
            s)
          );
        } finally {
          this.#r({ type: "error", error: s });
        }
      } finally {
        this.#t.runNext(this);
      }
    }
    #r(e) {
      const r = (a) => {
        switch (e.type) {
          case "failed":
            return {
              ...a,
              failureCount: e.failureCount,
              failureReason: e.error,
            };
          case "pause":
            return { ...a, isPaused: !0 };
          case "continue":
            return { ...a, isPaused: !1 };
          case "pending":
            return {
              ...a,
              context: e.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: e.isPaused,
              status: "pending",
              variables: e.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...a,
              data: e.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...a,
              data: void 0,
              error: e.error,
              failureCount: a.failureCount + 1,
              failureReason: e.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = r(this.state)),
        At.batch(() => {
          this.#e.forEach((a) => {
            a.onMutationUpdate(e);
          }),
            this.#t.notify({ mutation: this, type: "updated", action: e });
        });
    }
  };
function C1() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var dA = class extends Rl {
  constructor(e = {}) {
    super(),
      (this.config = e),
      (this.#e = new Set()),
      (this.#t = new Map()),
      (this.#n = 0);
  }
  #e;
  #t;
  #n;
  build(e, r, a) {
    const i = new fA({
      mutationCache: this,
      mutationId: ++this.#n,
      options: e.defaultMutationOptions(r),
      state: a,
    });
    return this.add(i), i;
  }
  add(e) {
    this.#e.add(e);
    const r = Fs(e);
    if (typeof r == "string") {
      const a = this.#t.get(r);
      a ? a.push(e) : this.#t.set(r, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#e.delete(e)) {
      const r = Fs(e);
      if (typeof r == "string") {
        const a = this.#t.get(r);
        if (a)
          if (a.length > 1) {
            const i = a.indexOf(e);
            i !== -1 && a.splice(i, 1);
          } else a[0] === e && this.#t.delete(r);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const r = Fs(e);
    if (typeof r == "string") {
      const i = this.#t.get(r)?.find((s) => s.state.status === "pending");
      return !i || i === e;
    } else return !0;
  }
  runNext(e) {
    const r = Fs(e);
    return typeof r == "string"
      ? (this.#t
          .get(r)
          ?.find((i) => i !== e && i.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    At.batch(() => {
      this.#e.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }),
        this.#e.clear(),
        this.#t.clear();
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(e) {
    const r = { exact: !0, ...e };
    return this.getAll().find((a) => Xv(r, a));
  }
  findAll(e = {}) {
    return this.getAll().filter((r) => Xv(e, r));
  }
  notify(e) {
    At.batch(() => {
      this.listeners.forEach((r) => {
        r(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((r) => r.state.isPaused);
    return At.batch(() => Promise.all(e.map((r) => r.continue().catch(xn))));
  }
};
function Fs(e) {
  return e.options.scope?.id;
}
function Wv(e) {
  return {
    onFetch: (r, a) => {
      const i = r.options,
        s = r.fetchOptions?.meta?.fetchMore?.direction,
        u = r.state.data?.pages || [],
        f = r.state.data?.pageParams || [];
      let h = { pages: [], pageParams: [] },
        p = 0;
      const m = async () => {
        let g = !1;
        const y = (E) => {
            Object.defineProperty(E, "signal", {
              enumerable: !0,
              get: () => (
                r.signal.aborted
                  ? (g = !0)
                  : r.signal.addEventListener("abort", () => {
                      g = !0;
                    }),
                r.signal
              ),
            });
          },
          S = y1(r.options, r.fetchOptions),
          w = async (E, T, R) => {
            if (g) return Promise.reject();
            if (T == null && E.pages.length) return Promise.resolve(E);
            const j = (() => {
                const k = {
                  client: r.client,
                  queryKey: r.queryKey,
                  pageParam: T,
                  direction: R ? "backward" : "forward",
                  meta: r.options.meta,
                };
                return y(k), k;
              })(),
              A = await S(j),
              { maxPages: D } = r.options,
              U = R ? JT : WT;
            return {
              pages: U(E.pages, A, D),
              pageParams: U(E.pageParams, T, D),
            };
          };
        if (s && u.length) {
          const E = s === "backward",
            T = E ? hA : Jv,
            R = { pages: u, pageParams: f },
            _ = T(i, R);
          h = await w(R, _, E);
        } else {
          const E = e ?? u.length;
          do {
            const T = p === 0 ? (f[0] ?? i.initialPageParam) : Jv(i, h);
            if (p > 0 && T == null) break;
            (h = await w(h, T)), p++;
          } while (p < E);
        }
        return h;
      };
      r.options.persister
        ? (r.fetchFn = () =>
            r.options.persister?.(
              m,
              {
                client: r.client,
                queryKey: r.queryKey,
                meta: r.options.meta,
                signal: r.signal,
              },
              a,
            ))
        : (r.fetchFn = m);
    },
  };
}
function Jv(e, { pages: r, pageParams: a }) {
  const i = r.length - 1;
  return r.length > 0 ? e.getNextPageParam(r[i], r, a[i], a) : void 0;
}
function hA(e, { pages: r, pageParams: a }) {
  return r.length > 0 ? e.getPreviousPageParam?.(r[0], r, a[0], a) : void 0;
}
var pA = class {
    #e;
    #t;
    #n;
    #r;
    #a;
    #i;
    #l;
    #o;
    constructor(e = {}) {
      (this.#e = e.queryCache || new cA()),
        (this.#t = e.mutationCache || new dA()),
        (this.#n = e.defaultOptions || {}),
        (this.#r = new Map()),
        (this.#a = new Map()),
        (this.#i = 0);
    }
    mount() {
      this.#i++,
        this.#i === 1 &&
          ((this.#l = v1.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#o = hu.subscribe(async (e) => {
            e && (await this.resumePausedMutations(), this.#e.onOnline());
          })));
    }
    unmount() {
      this.#i--,
        this.#i === 0 &&
          (this.#l?.(), (this.#l = void 0), this.#o?.(), (this.#o = void 0));
    }
    isFetching(e) {
      return this.#e.findAll({ ...e, fetchStatus: "fetching" }).length;
    }
    isMutating(e) {
      return this.#t.findAll({ ...e, status: "pending" }).length;
    }
    getQueryData(e) {
      const r = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(r.queryHash)?.state.data;
    }
    ensureQueryData(e) {
      const r = this.defaultQueryOptions(e),
        a = this.#e.build(this, r),
        i = a.state.data;
      return i === void 0
        ? this.fetchQuery(e)
        : (e.revalidateIfStale &&
            a.isStaleByTime(Nd(r.staleTime, a)) &&
            this.prefetchQuery(r),
          Promise.resolve(i));
    }
    getQueriesData(e) {
      return this.#e.findAll(e).map(({ queryKey: r, state: a }) => {
        const i = a.data;
        return [r, i];
      });
    }
    setQueryData(e, r, a) {
      const i = this.defaultQueryOptions({ queryKey: e }),
        u = this.#e.get(i.queryHash)?.state.data,
        f = YT(r, u);
      if (f !== void 0)
        return this.#e.build(this, i).setData(f, { ...a, manual: !0 });
    }
    setQueriesData(e, r, a) {
      return At.batch(() =>
        this.#e
          .findAll(e)
          .map(({ queryKey: i }) => [i, this.setQueryData(i, r, a)]),
      );
    }
    getQueryState(e) {
      const r = this.defaultQueryOptions({ queryKey: e });
      return this.#e.get(r.queryHash)?.state;
    }
    removeQueries(e) {
      const r = this.#e;
      At.batch(() => {
        r.findAll(e).forEach((a) => {
          r.remove(a);
        });
      });
    }
    resetQueries(e, r) {
      const a = this.#e;
      return At.batch(
        () => (
          a.findAll(e).forEach((i) => {
            i.reset();
          }),
          this.refetchQueries({ type: "active", ...e }, r)
        ),
      );
    }
    cancelQueries(e, r = {}) {
      const a = { revert: !0, ...r },
        i = At.batch(() => this.#e.findAll(e).map((s) => s.cancel(a)));
      return Promise.all(i).then(xn).catch(xn);
    }
    invalidateQueries(e, r = {}) {
      return At.batch(
        () => (
          this.#e.findAll(e).forEach((a) => {
            a.invalidate();
          }),
          e?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                r,
              )
        ),
      );
    }
    refetchQueries(e, r = {}) {
      const a = { ...r, cancelRefetch: r.cancelRefetch ?? !0 },
        i = At.batch(() =>
          this.#e
            .findAll(e)
            .filter((s) => !s.isDisabled() && !s.isStatic())
            .map((s) => {
              let u = s.fetch(void 0, a);
              return (
                a.throwOnError || (u = u.catch(xn)),
                s.state.fetchStatus === "paused" ? Promise.resolve() : u
              );
            }),
        );
      return Promise.all(i).then(xn);
    }
    fetchQuery(e) {
      const r = this.defaultQueryOptions(e);
      r.retry === void 0 && (r.retry = !1);
      const a = this.#e.build(this, r);
      return a.isStaleByTime(Nd(r.staleTime, a))
        ? a.fetch(r)
        : Promise.resolve(a.state.data);
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(xn).catch(xn);
    }
    fetchInfiniteQuery(e) {
      return (e.behavior = Wv(e.pages)), this.fetchQuery(e);
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(xn).catch(xn);
    }
    ensureInfiniteQueryData(e) {
      return (e.behavior = Wv(e.pages)), this.ensureQueryData(e);
    }
    resumePausedMutations() {
      return hu.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(e) {
      this.#n = e;
    }
    setQueryDefaults(e, r) {
      this.#r.set(Ra(e), { queryKey: e, defaultOptions: r });
    }
    getQueryDefaults(e) {
      const r = [...this.#r.values()],
        a = {};
      return (
        r.forEach((i) => {
          ll(e, i.queryKey) && Object.assign(a, i.defaultOptions);
        }),
        a
      );
    }
    setMutationDefaults(e, r) {
      this.#a.set(Ra(e), { mutationKey: e, defaultOptions: r });
    }
    getMutationDefaults(e) {
      const r = [...this.#a.values()],
        a = {};
      return (
        r.forEach((i) => {
          ll(e, i.mutationKey) && Object.assign(a, i.defaultOptions);
        }),
        a
      );
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const r = {
        ...this.#n.queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0,
      };
      return (
        r.queryHash || (r.queryHash = Xh(r.queryKey, r)),
        r.refetchOnReconnect === void 0 &&
          (r.refetchOnReconnect = r.networkMode !== "always"),
        r.throwOnError === void 0 && (r.throwOnError = !!r.suspense),
        !r.networkMode && r.persister && (r.networkMode = "offlineFirst"),
        r.queryFn === Kh && (r.enabled = !1),
        r
      );
    }
    defaultMutationOptions(e) {
      return e?._defaulted
        ? e
        : {
            ...this.#n.mutations,
            ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
            ...e,
            _defaulted: !0,
          };
    }
    clear() {
      this.#e.clear(), this.#t.clear();
    }
  },
  mA = class extends Rl {
    #e;
    #t = void 0;
    #n;
    #r;
    constructor(r, a) {
      super(), (this.#e = r), this.setOptions(a), this.bindMethods(), this.#a();
    }
    bindMethods() {
      (this.mutate = this.mutate.bind(this)),
        (this.reset = this.reset.bind(this));
    }
    setOptions(r) {
      const a = this.options;
      (this.options = this.#e.defaultMutationOptions(r)),
        XT(this.options, a) ||
          this.#e.getMutationCache().notify({
            type: "observerOptionsUpdated",
            mutation: this.#n,
            observer: this,
          }),
        a?.mutationKey &&
        this.options.mutationKey &&
        Ra(a.mutationKey) !== Ra(this.options.mutationKey)
          ? this.reset()
          : this.#n?.state.status === "pending" &&
            this.#n.setOptions(this.options);
    }
    onUnsubscribe() {
      this.hasListeners() || this.#n?.removeObserver(this);
    }
    onMutationUpdate(r) {
      this.#a(), this.#i(r);
    }
    getCurrentResult() {
      return this.#t;
    }
    reset() {
      this.#n?.removeObserver(this), (this.#n = void 0), this.#a(), this.#i();
    }
    mutate(r, a) {
      return (
        (this.#r = a),
        this.#n?.removeObserver(this),
        (this.#n = this.#e.getMutationCache().build(this.#e, this.options)),
        this.#n.addObserver(this),
        this.#n.execute(r)
      );
    }
    #a() {
      const r = this.#n?.state ?? C1();
      this.#t = {
        ...r,
        isPending: r.status === "pending",
        isSuccess: r.status === "success",
        isError: r.status === "error",
        isIdle: r.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      };
    }
    #i(r) {
      At.batch(() => {
        if (this.#r && this.hasListeners()) {
          const a = this.#t.variables,
            i = this.#t.context;
          r?.type === "success"
            ? (this.#r.onSuccess?.(r.data, a, i),
              this.#r.onSettled?.(r.data, null, a, i))
            : r?.type === "error" &&
              (this.#r.onError?.(r.error, a, i),
              this.#r.onSettled?.(void 0, r.error, a, i));
        }
        this.listeners.forEach((a) => {
          a(this.#t);
        });
      });
    }
  },
  E1 = x.createContext(void 0),
  gA = (e) => {
    const r = x.useContext(E1);
    if (!r)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return r;
  },
  yA = ({ client: e, children: r }) => (
    x.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    v.jsx(E1.Provider, { value: e, children: r })
  );
function vA(e, r) {
  const a = gA(),
    [i] = x.useState(() => new mA(a, e));
  x.useEffect(() => {
    i.setOptions(e);
  }, [i, e]);
  const s = x.useSyncExternalStore(
      x.useCallback((f) => i.subscribe(At.batchCalls(f)), [i]),
      () => i.getCurrentResult(),
      () => i.getCurrentResult(),
    ),
    u = x.useCallback(
      (f, h) => {
        i.mutate(f, h).catch(xn);
      },
      [i],
    );
  if (s.error && eA(i.options.throwOnError, [s.error])) throw s.error;
  return { ...s, mutate: u, mutateAsync: s.mutate };
}
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var bA = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
  },
};
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const za = (e, r, a, i) => {
  const s = x.forwardRef(
    (
      {
        color: u = "currentColor",
        size: f = 24,
        stroke: h = 2,
        title: p,
        className: m,
        children: g,
        ...y
      },
      S,
    ) =>
      x.createElement(
        "svg",
        {
          ref: S,
          ...bA[e],
          width: f,
          height: f,
          className: ["tabler-icon", `tabler-icon-${r}`, m].join(" "),
          strokeWidth: h,
          stroke: u,
          ...y,
        },
        [
          p && x.createElement("title", { key: "svg-title" }, p),
          ...i.map(([w, E]) => x.createElement(w, E)),
          ...(Array.isArray(g) ? g : [g]),
        ],
      ),
  );
  return (s.displayName = `${a}`), s;
};
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var SA = za("outline", "briefcase-2", "IconBriefcase2", [
  [
    "path",
    {
      d: "M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z",
      key: "svg-0",
    },
  ],
  ["path", { d: "M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2", key: "svg-1" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var xA = za("outline", "calendar-check", "IconCalendarCheck", [
  [
    "path",
    {
      d: "M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6",
      key: "svg-0",
    },
  ],
  ["path", { d: "M16 3v4", key: "svg-1" }],
  ["path", { d: "M8 3v4", key: "svg-2" }],
  ["path", { d: "M4 11h16", key: "svg-3" }],
  ["path", { d: "M15 19l2 2l4 -4", key: "svg-4" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var wA = za("outline", "chevron-left", "IconChevronLeft", [
  ["path", { d: "M15 6l-6 6l6 6", key: "svg-0" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var au = za("outline", "chevron-right", "IconChevronRight", [
  ["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var CA = za("outline", "pencil", "IconPencil", [
  [
    "path",
    {
      d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
      key: "svg-0",
    },
  ],
  ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var _1 = za("outline", "trash", "IconTrash", [
  ["path", { d: "M4 7l16 0", key: "svg-0" }],
  ["path", { d: "M10 11l0 6", key: "svg-1" }],
  ["path", { d: "M14 11l0 6", key: "svg-2" }],
  [
    "path",
    { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" },
  ],
  ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }],
]);
/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ var EA = za("outline", "user", "IconUser", [
  ["path", { d: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", key: "svg-0" }],
  ["path", { d: "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", key: "svg-1" }],
]);
const _A = (e) => {
    const { name: r, description: a, avatarSrc: i } = e,
      s = sn();
    return v.jsxs(ar, {
      children: [
        v.jsx(Cl, { src: i, alt: "host avatar", mr: "xs" }),
        v.jsxs(ge, {
          style: { flexBasis: "100%" },
          children: [
            v.jsx(jo, {
              size: s.fontSizes.md,
              lh: s.lineHeights.sm,
              fw: 400,
              children: r,
            }),
            !!a &&
              v.jsx(jo, {
                size: s.fontSizes.sm,
                lh: s.lineHeights.xs,
                c: s.colors.gray[6],
                fw: 400,
                children: a,
              }),
          ],
        }),
      ],
    });
  },
  RA = (e) => {
    const { name: r, description: a, avatarSrc: i, date: s, time: u } = e,
      f = sn(),
      h = kt(),
      p = x.useCallback(() => {
        h("/details");
      }, [h]);
    return v.jsx(El, {
      withBorder: !0,
      shadow: f.shadows.sm,
      children: v.jsxs(ar, {
        align: "center",
        children: [
          v.jsxs(Zn, {
            flex: 1,
            children: [
              v.jsx(_A, { name: r, description: a, avatarSrc: i }),
              v.jsxs(jo, { children: [s, " ", u] }),
            ],
          }),
          v.jsx(Nn, { size: "xl", onClick: p, children: v.jsx(au, {}) }),
        ],
      }),
    });
  },
  R1 = (e) => {
    const { title: r, actionText: a, onActionClick: i, children: s } = e,
      u = sn();
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(jo, { size: "32px", mb: u.spacing.md, fw: 700, children: r }),
        v.jsx(ge, { mb: u.spacing.md, children: s }),
        !!a &&
          v.jsx(ar, {
            direction: "row-reverse",
            children: v.jsx($t, { size: "lg", onClick: i, children: a }),
          }),
      ],
    });
  };
function TA(e) {
  if (!/^[0-9a-zA-Z-]+$/.test(e))
    throw new Error(
      `[@mantine/use-form] Form name "${e}" is invalid, it should contain only letters, numbers and dashes`,
    );
}
const AA = typeof window < "u" ? x.useLayoutEffect : x.useEffect;
function Tt(e, r) {
  AA(() => {
    if (e)
      return (
        window.addEventListener(e, r), () => window.removeEventListener(e, r)
      );
  }, [e]);
}
function zA(e, r) {
  e && TA(e),
    Tt(`mantine-form:${e}:set-field-value`, (a) =>
      r.setFieldValue(a.detail.path, a.detail.value),
    ),
    Tt(`mantine-form:${e}:set-values`, (a) => r.setValues(a.detail)),
    Tt(`mantine-form:${e}:set-initial-values`, (a) =>
      r.setInitialValues(a.detail),
    ),
    Tt(`mantine-form:${e}:set-errors`, (a) => r.setErrors(a.detail)),
    Tt(`mantine-form:${e}:set-field-error`, (a) =>
      r.setFieldError(a.detail.path, a.detail.error),
    ),
    Tt(`mantine-form:${e}:clear-field-error`, (a) =>
      r.clearFieldError(a.detail),
    ),
    Tt(`mantine-form:${e}:clear-errors`, r.clearErrors),
    Tt(`mantine-form:${e}:reset`, r.reset),
    Tt(`mantine-form:${e}:validate`, r.validate),
    Tt(`mantine-form:${e}:validate-field`, (a) => r.validateField(a.detail)),
    Tt(`mantine-form:${e}:reorder-list-item`, (a) =>
      r.reorderListItem(a.detail.path, a.detail.payload),
    ),
    Tt(`mantine-form:${e}:remove-list-item`, (a) =>
      r.removeListItem(a.detail.path, a.detail.index),
    ),
    Tt(`mantine-form:${e}:insert-list-item`, (a) =>
      r.insertListItem(a.detail.path, a.detail.item, a.detail.index),
    ),
    Tt(`mantine-form:${e}:set-dirty`, (a) => r.setDirty(a.detail)),
    Tt(`mantine-form:${e}:set-touched`, (a) => r.setTouched(a.detail)),
    Tt(`mantine-form:${e}:reset-dirty`, (a) => r.resetDirty(a.detail)),
    Tt(`mantine-form:${e}:reset-touched`, r.resetTouched);
}
function OA(e) {
  return (r) => {
    if (!r) e(r);
    else if (typeof r == "function") e(r);
    else if (typeof r == "object" && "nativeEvent" in r) {
      const { currentTarget: a } = r;
      a instanceof HTMLInputElement
        ? a.type === "checkbox"
          ? e(a.checked)
          : e(a.value)
        : (a instanceof HTMLTextAreaElement ||
            a instanceof HTMLSelectElement) &&
          e(a.value);
    } else e(r);
  };
}
function $d(e) {
  return e === null || typeof e != "object"
    ? {}
    : Object.keys(e).reduce((r, a) => {
        const i = e[a];
        return i != null && i !== !1 && (r[a] = i), r;
      }, {});
}
function jA(e) {
  const [r, a] = x.useState($d(e)),
    i = x.useRef(r),
    s = x.useCallback((p) => {
      a((m) => {
        const g = $d(typeof p == "function" ? p(m) : p);
        return (i.current = g), g;
      });
    }, []),
    u = x.useCallback(() => s({}), []),
    f = x.useCallback(
      (p) => {
        i.current[p] !== void 0 &&
          s((m) => {
            const g = { ...m };
            return delete g[p], g;
          });
      },
      [r],
    ),
    h = x.useCallback(
      (p, m) => {
        m == null || m === !1
          ? f(p)
          : i.current[p] !== m && s((g) => ({ ...g, [p]: m }));
      },
      [r],
    );
  return {
    errorsState: r,
    setErrors: s,
    clearErrors: u,
    setFieldError: h,
    clearFieldError: f,
  };
}
function kd(e, r) {
  if (r === null || typeof r != "object") return {};
  const a = { ...r };
  return (
    Object.keys(r).forEach((i) => {
      i.includes(`${String(e)}.`) && delete a[i];
    }),
    a
  );
}
function e0(e, r) {
  const a = e.substring(r.length + 1).split(".")[0];
  return parseInt(a, 10);
}
function t0(e, r, a, i) {
  if (r === void 0) return a;
  const s = `${String(e)}`;
  let u = a;
  i === -1 && (u = kd(`${s}.${r}`, u));
  const f = { ...u },
    h = new Set();
  return (
    Object.entries(u)
      .filter(([p]) => {
        if (!p.startsWith(`${s}.`)) return !1;
        const m = e0(p, s);
        return Number.isNaN(m) ? !1 : m >= r;
      })
      .forEach(([p, m]) => {
        const g = e0(p, s),
          y = p.replace(`${s}.${g}`, `${s}.${g + i}`);
        (f[y] = m), h.add(y), h.has(p) || delete f[p];
      }),
    f
  );
}
function DA(e, { from: r, to: a }, i) {
  const s = `${e}.${r}`,
    u = `${e}.${a}`,
    f = { ...i },
    h = new Set();
  return (
    Object.keys(i).forEach((p) => {
      if (h.has(p)) return;
      let m, g;
      if (
        (p.startsWith(s)
          ? ((m = p), (g = p.replace(s, u)))
          : p.startsWith(u) && ((m = p.replace(u, s)), (g = p)),
        m && g)
      ) {
        const y = f[m],
          S = f[g];
        S === void 0 ? delete f[m] : (f[m] = S),
          y === void 0 ? delete f[g] : (f[g] = y),
          h.add(m),
          h.add(g);
      }
    }),
    f
  );
}
function n0(e, r, a) {
  typeof a.value == "object" && (a.value = Eo(a.value)),
    !a.enumerable ||
    a.get ||
    a.set ||
    !a.configurable ||
    !a.writable ||
    r === "__proto__"
      ? Object.defineProperty(e, r, a)
      : (e[r] = a.value);
}
function Eo(e) {
  if (typeof e != "object") return e;
  var r = 0,
    a,
    i,
    s,
    u = Object.prototype.toString.call(e);
  if (
    (u === "[object Object]"
      ? (s = Object.create(e.__proto__ || null))
      : u === "[object Array]"
        ? (s = Array(e.length))
        : u === "[object Set]"
          ? ((s = new Set()),
            e.forEach(function (f) {
              s.add(Eo(f));
            }))
          : u === "[object Map]"
            ? ((s = new Map()),
              e.forEach(function (f, h) {
                s.set(Eo(h), Eo(f));
              }))
            : u === "[object Date]"
              ? (s = new Date(+e))
              : u === "[object RegExp]"
                ? (s = new RegExp(e.source, e.flags))
                : u === "[object DataView]"
                  ? (s = new e.constructor(Eo(e.buffer)))
                  : u === "[object ArrayBuffer]"
                    ? (s = e.slice(0))
                    : u.slice(-6) === "Array]" && (s = new e.constructor(e)),
    s)
  ) {
    for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
      n0(s, i[r], Object.getOwnPropertyDescriptor(e, i[r]));
    for (r = 0, i = Object.getOwnPropertyNames(e); r < i.length; r++)
      (Object.hasOwnProperty.call(s, (a = i[r])) && s[a] === e[a]) ||
        n0(s, a, Object.getOwnPropertyDescriptor(e, a));
  }
  return s || e;
}
function T1(e) {
  return typeof e != "string" ? [] : e.split(".");
}
function at(e, r) {
  const a = T1(e);
  if (a.length === 0 || typeof r != "object" || r === null) return;
  let i = r[a[0]];
  for (let s = 1; s < a.length && i != null; s += 1) i = i[a[s]];
  return i;
}
function Tl(e, r, a) {
  const i = T1(e);
  if (i.length === 0) return a;
  const s = Eo(a);
  if (i.length === 1) return (s[i[0]] = r), s;
  let u = s[i[0]];
  for (let f = 1; f < i.length - 1; f += 1) {
    if (u === void 0) return s;
    u = u[i[f]];
  }
  return (u[i[i.length - 1]] = r), s;
}
function NA(e, { from: r, to: a }, i) {
  const s = at(e, i);
  if (!Array.isArray(s)) return i;
  const u = [...s],
    f = s[r];
  return u.splice(r, 1), u.splice(a, 0, f), Tl(e, u, i);
}
function MA(e, r, a, i) {
  const s = at(e, i);
  if (!Array.isArray(s)) return i;
  const u = [...s];
  return u.splice(typeof a == "number" ? a : u.length, 0, r), Tl(e, u, i);
}
function $A(e, r, a) {
  const i = at(e, a);
  return Array.isArray(i)
    ? Tl(
        e,
        i.filter((s, u) => u !== r),
        a,
      )
    : a;
}
function kA(e, r, a, i) {
  const s = at(e, i);
  if (!Array.isArray(s) || s.length <= a) return i;
  const u = [...s];
  return (u[a] = r), Tl(e, u, i);
}
function LA({ $values: e, $errors: r, $status: a }) {
  const i = x.useCallback((h, p) => {
      a.clearFieldDirty(h),
        r.setErrors((m) => DA(h, p, m)),
        e.setValues({ values: NA(h, p, e.refValues.current), updateState: !0 });
    }, []),
    s = x.useCallback((h, p) => {
      a.clearFieldDirty(h),
        r.setErrors((m) => t0(h, p, m, -1)),
        e.setValues({ values: $A(h, p, e.refValues.current), updateState: !0 });
    }, []),
    u = x.useCallback((h, p, m) => {
      a.clearFieldDirty(h),
        r.setErrors((g) => t0(h, m, g, 1)),
        e.setValues({
          values: MA(h, p, m, e.refValues.current),
          updateState: !0,
        });
    }, []),
    f = x.useCallback((h, p, m) => {
      a.clearFieldDirty(h),
        e.setValues({
          values: kA(h, m, p, e.refValues.current),
          updateState: !0,
        });
    }, []);
  return {
    reorderListItem: i,
    removeListItem: s,
    insertListItem: u,
    replaceListItem: f,
  };
}
var vd, r0;
function UA() {
  return (
    r0 ||
      ((r0 = 1),
      (vd = function e(r, a) {
        if (r === a) return !0;
        if (r && a && typeof r == "object" && typeof a == "object") {
          if (r.constructor !== a.constructor) return !1;
          var i, s, u;
          if (Array.isArray(r)) {
            if (((i = r.length), i != a.length)) return !1;
            for (s = i; s-- !== 0; ) if (!e(r[s], a[s])) return !1;
            return !0;
          }
          if (r.constructor === RegExp)
            return r.source === a.source && r.flags === a.flags;
          if (r.valueOf !== Object.prototype.valueOf)
            return r.valueOf() === a.valueOf();
          if (r.toString !== Object.prototype.toString)
            return r.toString() === a.toString();
          if (
            ((u = Object.keys(r)), (i = u.length), i !== Object.keys(a).length)
          )
            return !1;
          for (s = i; s-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(a, u[s])) return !1;
          for (s = i; s-- !== 0; ) {
            var f = u[s];
            if (!e(r[f], a[f])) return !1;
          }
          return !0;
        }
        return r !== r && a !== a;
      })),
    vd
  );
}
var HA = UA();
const Qs = qd(HA);
function Ii(e, r) {
  const a = Object.keys(e);
  if (typeof r == "string") {
    const i = a.filter((s) => s.startsWith(`${r}.`));
    return e[r] || i.some((s) => e[s]) || !1;
  }
  return a.some((i) => e[i]);
}
function BA({ initialDirty: e, initialTouched: r, mode: a, $values: i }) {
  const [s, u] = x.useState(r),
    [f, h] = x.useState(e),
    p = x.useRef(r),
    m = x.useRef(e),
    g = x.useCallback((k) => {
      const Z = typeof k == "function" ? k(p.current) : k;
      (p.current = Z), a === "controlled" && u(Z);
    }, []),
    y = x.useCallback((k, Z = !1) => {
      const V = typeof k == "function" ? k(m.current) : k;
      (m.current = V), (a === "controlled" || Z) && h(V);
    }, []),
    S = x.useCallback(() => g({}), []),
    w = x.useCallback((k) => {
      const Z = k ? { ...i.refValues.current, ...k } : i.refValues.current;
      i.setValuesSnapshot(Z), y({});
    }, []),
    E = x.useCallback((k, Z) => {
      g((V) => (Ii(V, k) === Z ? V : { ...V, [k]: Z }));
    }, []),
    T = x.useCallback((k, Z, V) => {
      y((W) => (Ii(W, k) === Z ? W : { ...W, [k]: Z }), V);
    }, []),
    R = x.useCallback((k, Z) => {
      const V = Ii(m.current, k),
        W = !Qs(at(k, i.getValuesSnapshot()), Z),
        ee = kd(k, m.current);
      (ee[k] = W), y(ee, V !== W);
    }, []),
    _ = x.useCallback((k) => Ii(p.current, k), []),
    j = x.useCallback(
      (k) =>
        y((Z) => {
          if (typeof k != "string") return Z;
          const V = kd(k, Z);
          return delete V[k], Qs(V, Z) ? Z : V;
        }),
      [],
    ),
    A = x.useCallback((k) => {
      if (k) {
        const V = at(k, m.current);
        if (typeof V == "boolean") return V;
        const W = at(k, i.refValues.current),
          ee = at(k, i.valuesSnapshot.current);
        return !Qs(W, ee);
      }
      return Object.keys(m.current).length > 0
        ? Ii(m.current)
        : !Qs(i.refValues.current, i.valuesSnapshot.current);
    }, []),
    D = x.useCallback(() => m.current, []),
    U = x.useCallback(() => p.current, []);
  return {
    touchedState: s,
    dirtyState: f,
    touchedRef: p,
    dirtyRef: m,
    setTouched: g,
    setDirty: y,
    resetDirty: w,
    resetTouched: S,
    isTouched: _,
    setFieldTouched: E,
    setFieldDirty: T,
    setTouchedState: u,
    setDirtyState: h,
    clearFieldDirty: j,
    isDirty: A,
    getDirty: D,
    getTouched: U,
    setCalculatedFieldDirty: R,
  };
}
function PA({ initialValues: e, onValuesChange: r, mode: a }) {
  const i = x.useRef(!1),
    [s, u] = x.useState(e || {}),
    f = x.useRef(s),
    h = x.useRef(s),
    p = x.useCallback(
      ({
        values: R,
        subscribers: _,
        updateState: j = !0,
        mergeWithPreviousValues: A = !0,
      }) => {
        const D = f.current,
          U = R instanceof Function ? R(f.current) : R,
          k = A ? { ...D, ...U } : U;
        (f.current = k),
          j && (u(k), a === "uncontrolled" && (f.current = k)),
          r?.(k, D),
          _?.filter(Boolean).forEach((Z) =>
            Z({ updatedValues: k, previousValues: D }),
          );
      },
      [r],
    ),
    m = x.useCallback(
      (R) => {
        const _ = at(R.path, f.current),
          j = R.value instanceof Function ? R.value(_) : R.value;
        if (_ !== j) {
          const A = f.current,
            D = Tl(R.path, j, f.current);
          p({ values: D, updateState: R.updateState }),
            R.subscribers
              ?.filter(Boolean)
              .forEach((U) =>
                U({ path: R.path, updatedValues: D, previousValues: A }),
              );
        }
      },
      [p],
    ),
    g = x.useCallback((R) => {
      h.current = R;
    }, []),
    y = x.useCallback(
      (R, _) => {
        i.current ||
          ((i.current = !0),
          p({ values: R, updateState: a === "controlled" }),
          g(R),
          _());
      },
      [p],
    ),
    S = x.useCallback(() => {
      p({ values: h.current, updateState: !0, mergeWithPreviousValues: !1 });
    }, [p]),
    w = x.useCallback(() => f.current, []),
    E = x.useCallback(() => h.current, []),
    T = x.useCallback(
      (R, _) => {
        const j = at(R, h.current);
        typeof j > "u" ||
          m({
            path: R,
            value: j,
            updateState: a === "controlled",
            subscribers: _,
          });
      },
      [m, a],
    );
  return {
    initialized: i,
    stateValues: s,
    refValues: f,
    valuesSnapshot: h,
    setValues: p,
    setFieldValue: m,
    resetValues: S,
    setValuesSnapshot: g,
    initialize: y,
    getValues: w,
    getValuesSnapshot: E,
    resetField: T,
  };
}
function ZA({ $status: e, cascadeUpdates: r }) {
  const a = x.useRef({}),
    i = x.useCallback((u, f) => {
      x.useEffect(
        () => (
          (a.current[u] = a.current[u] || []),
          a.current[u].push(f),
          () => {
            a.current[u] = a.current[u].filter((h) => h !== f);
          }
        ),
        [f],
      );
    }, []),
    s = x.useCallback((u) => {
      const f =
        a.current[u]?.map(
          (h) => (p) =>
            h({
              previousValue: at(u, p.previousValues),
              value: at(u, p.updatedValues),
              touched: e.isTouched(u),
              dirty: e.isDirty(u),
            }),
        ) ?? [];
      if (r)
        for (const h in a.current)
          (h.startsWith(`${u}.`) || u.startsWith(`${h}.`)) &&
            f.push(
              ...a.current[h].map(
                (p) => (m) =>
                  p({
                    previousValue: at(h, m.previousValues),
                    value: at(h, m.updatedValues),
                    touched: e.isTouched(h),
                    dirty: e.isDirty(h),
                  }),
              ),
            );
      return f;
    }, []);
  return { subscribers: a, watch: i, getFieldSubscribers: s };
}
function a0(e, r) {
  return e ? `${e}-${r.toString()}` : r.toString();
}
const Xs = Symbol("root-rule");
function o0(e) {
  const r = $d(e);
  return { hasErrors: Object.keys(r).length > 0, errors: r };
}
function Ld(e, r, a = "", i = {}) {
  return typeof e != "object" || e === null
    ? i
    : Object.keys(e).reduce((s, u) => {
        const f = e[u],
          h = `${a === "" ? "" : `${a}.`}${u}`,
          p = at(h, r);
        let m = !1;
        return (
          typeof f == "function" && (s[h] = f(p, r, h)),
          typeof f == "object" &&
            Array.isArray(p) &&
            ((m = !0),
            p.forEach((g, y) => Ld(f, r, `${h}.${y}`, s)),
            Xs in f && (s[h] = f[Xs](p, r, h))),
          typeof f == "object" &&
            typeof p == "object" &&
            p !== null &&
            (m || Ld(f, r, h, s), Xs in f && (s[h] = f[Xs](p, r, h))),
          s
        );
      }, i);
}
function Ud(e, r) {
  return o0(typeof e == "function" ? e(r) : Ld(e, r));
}
function Ks(e, r, a) {
  if (typeof e != "string") return { hasError: !1, error: null };
  const i = Ud(r, a),
    s = Object.keys(i.errors).find((u) =>
      e.split(".").every((f, h) => f === u.split(".")[h]),
    );
  return { hasError: !!s, error: s ? i.errors[s] : null };
}
const VA = "__MANTINE_FORM_INDEX__";
function i0(e, r) {
  return r
    ? typeof r == "boolean"
      ? r
      : Array.isArray(r)
        ? r.includes(e.replace(/[.][0-9]+/g, `.${VA}`))
        : !1
    : !1;
}
function Lu({
  name: e,
  mode: r = "controlled",
  initialValues: a,
  initialErrors: i = {},
  initialDirty: s = {},
  initialTouched: u = {},
  clearInputErrorOnChange: f = !0,
  validateInputOnChange: h = !1,
  validateInputOnBlur: p = !1,
  onValuesChange: m,
  transformValues: g = (R) => R,
  enhanceGetInputProps: y,
  validate: S,
  onSubmitPreventDefault: w = "always",
  touchTrigger: E = "change",
  cascadeUpdates: T = !1,
} = {}) {
  const R = jA(i),
    _ = PA({ initialValues: a, onValuesChange: m, mode: r }),
    j = BA({ initialDirty: s, initialTouched: u, $values: _, mode: r }),
    A = LA({ $values: _, $errors: R, $status: j }),
    D = ZA({ $status: j, cascadeUpdates: T }),
    [U, k] = x.useState(0),
    [Z, V] = x.useState({}),
    [W, ee] = x.useState(!1),
    pe = x.useCallback(() => {
      _.resetValues(),
        R.clearErrors(),
        j.resetDirty(),
        j.resetTouched(),
        r === "uncontrolled" && k((te) => te + 1);
    }, []),
    oe = x.useCallback(
      (te) => {
        f && R.clearErrors(),
          r === "uncontrolled" && k((ue) => ue + 1),
          Object.keys(D.subscribers.current).forEach((ue) => {
            const Ae = at(ue, _.refValues.current),
              Ve = at(ue, te);
            Ae !== Ve &&
              D.getFieldSubscribers(ue).forEach((Ie) =>
                Ie({ previousValues: te, updatedValues: _.refValues.current }),
              );
          });
      },
      [f],
    ),
    ce = x.useCallback(
      (te) => {
        const ue = _.refValues.current;
        _.initialize(te, () => r === "uncontrolled" && k((Ae) => Ae + 1)),
          oe(ue);
      },
      [oe],
    ),
    fe = x.useCallback(
      (te, ue, Ae) => {
        const Ve = i0(te, h),
          Ie = ue instanceof Function ? ue(at(te, _.refValues.current)) : ue;
        j.setCalculatedFieldDirty(te, Ie),
          E === "change" && j.setFieldTouched(te, !0),
          !Ve && f && R.clearFieldError(te),
          _.setFieldValue({
            path: te,
            value: ue,
            updateState: r === "controlled",
            subscribers: [
              ...D.getFieldSubscribers(te),
              Ve
                ? (St) => {
                    const qe = Ks(te, S, St.updatedValues);
                    qe.hasError
                      ? R.setFieldError(te, qe.error)
                      : R.clearFieldError(te);
                  }
                : null,
              Ae?.forceUpdate !== !1 && r !== "controlled"
                ? () => V((St) => ({ ...St, [te]: (St[te] || 0) + 1 }))
                : null,
            ],
          });
      },
      [m, S],
    ),
    le = x.useCallback(
      (te) => {
        const ue = _.refValues.current;
        _.setValues({ values: te, updateState: r === "controlled" }), oe(ue);
      },
      [m, oe],
    ),
    M = x.useCallback(() => {
      const te = Ud(S, _.refValues.current);
      return R.setErrors(te.errors), te;
    }, [S]),
    Q = x.useCallback(
      (te) => {
        const ue = Ks(te, S, _.refValues.current);
        return (
          ue.hasError ? R.setFieldError(te, ue.error) : R.clearFieldError(te),
          ue
        );
      },
      [S],
    ),
    Y = (
      te,
      {
        type: ue = "input",
        withError: Ae = !0,
        withFocus: Ve = !0,
        ...Ie
      } = {},
    ) => {
      const qe = {
        onChange: OA((xt) => fe(te, xt, { forceUpdate: !1 })),
        "data-path": a0(e, te),
      };
      return (
        Ae && (qe.error = R.errorsState[te]),
        ue === "checkbox"
          ? (qe[r === "controlled" ? "checked" : "defaultChecked"] = at(
              te,
              _.refValues.current,
            ))
          : (qe[r === "controlled" ? "value" : "defaultValue"] = at(
              te,
              _.refValues.current,
            )),
        Ve &&
          ((qe.onFocus = () => j.setFieldTouched(te, !0)),
          (qe.onBlur = () => {
            if (i0(te, p)) {
              const xt = Ks(te, S, _.refValues.current);
              xt.hasError
                ? R.setFieldError(te, xt.error)
                : R.clearFieldError(te);
            }
          })),
        Object.assign(
          qe,
          y?.({
            inputProps: qe,
            field: te,
            options: { type: ue, withError: Ae, withFocus: Ve, ...Ie },
            form: de,
          }),
        )
      );
    },
    re = (te, ue) => (Ae) => {
      w === "always" && Ae?.preventDefault();
      const Ve = M();
      if (Ve.hasErrors)
        w === "validation-failed" && Ae?.preventDefault(),
          ue?.(Ve.errors, _.refValues.current, Ae);
      else {
        const Ie = te?.(g(_.refValues.current), Ae);
        Ie instanceof Promise && (ee(!0), Ie.finally(() => ee(!1)));
      }
    },
    O = (te) => g(te || _.refValues.current),
    G = x.useCallback((te) => {
      te.preventDefault(), pe();
    }, []),
    ne = x.useCallback(
      (te) =>
        te
          ? !Ks(te, S, _.refValues.current).hasError
          : !Ud(S, _.refValues.current).hasErrors,
      [S],
    ),
    J = (te) => `${U}-${String(te)}-${Z[String(te)] || 0}`,
    ie = x.useCallback(
      (te) => document.querySelector(`[data-path="${a0(e, te)}"]`),
      [],
    ),
    me = x.useCallback(
      (te) => {
        _.resetField(te, [
          r !== "controlled"
            ? () => V((ue) => ({ ...ue, [te]: (ue[te] || 0) + 1 }))
            : null,
        ]);
      },
      [_.resetField, r, V],
    ),
    de = {
      watch: D.watch,
      initialized: _.initialized.current,
      values: r === "uncontrolled" ? _.refValues.current : _.stateValues,
      getValues: _.getValues,
      getInitialValues: _.getValuesSnapshot,
      setInitialValues: _.setValuesSnapshot,
      resetField: me,
      initialize: ce,
      setValues: le,
      setFieldValue: fe,
      submitting: W,
      setSubmitting: ee,
      errors: R.errorsState,
      setErrors: R.setErrors,
      setFieldError: R.setFieldError,
      clearFieldError: R.clearFieldError,
      clearErrors: R.clearErrors,
      resetDirty: j.resetDirty,
      setTouched: j.setTouched,
      setDirty: j.setDirty,
      isTouched: j.isTouched,
      resetTouched: j.resetTouched,
      isDirty: j.isDirty,
      getTouched: j.getTouched,
      getDirty: j.getDirty,
      reorderListItem: A.reorderListItem,
      insertListItem: A.insertListItem,
      removeListItem: A.removeListItem,
      replaceListItem: A.replaceListItem,
      reset: pe,
      validate: M,
      validateField: Q,
      getInputProps: Y,
      onSubmit: re,
      onReset: G,
      isValid: ne,
      getTransformedValues: O,
      key: J,
      getInputNode: ie,
    };
  return zA(e, de), de;
}
function I(e, r, a) {
  function i(h, p) {
    var m;
    Object.defineProperty(h, "_zod", { value: h._zod ?? {}, enumerable: !1 }),
      (m = h._zod).traits ?? (m.traits = new Set()),
      h._zod.traits.add(e),
      r(h, p);
    for (const g in f.prototype)
      g in h || Object.defineProperty(h, g, { value: f.prototype[g].bind(h) });
    (h._zod.constr = f), (h._zod.def = p);
  }
  const s = a?.Parent ?? Object;
  class u extends s {}
  Object.defineProperty(u, "name", { value: e });
  function f(h) {
    var p;
    const m = a?.Parent ? new u() : this;
    i(m, h), (p = m._zod).deferred ?? (p.deferred = []);
    for (const g of m._zod.deferred) g();
    return m;
  }
  return (
    Object.defineProperty(f, "init", { value: i }),
    Object.defineProperty(f, Symbol.hasInstance, {
      value: (h) =>
        a?.Parent && h instanceof a.Parent ? !0 : h?._zod?.traits?.has(e),
    }),
    Object.defineProperty(f, "name", { value: e }),
    f
  );
}
class sl extends Error {
  constructor() {
    super(
      "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
    );
  }
}
const A1 = {};
function Ta(e) {
  return A1;
}
function qA(e) {
  const r = Object.values(e).filter((i) => typeof i == "number");
  return Object.entries(e)
    .filter(([i, s]) => r.indexOf(+i) === -1)
    .map(([i, s]) => s);
}
function YA(e, r) {
  return typeof r == "bigint" ? r.toString() : r;
}
function z1(e) {
  return {
    get value() {
      {
        const r = e();
        return Object.defineProperty(this, "value", { value: r }), r;
      }
    },
  };
}
function Ih(e) {
  return e == null;
}
function Wh(e) {
  const r = e.startsWith("^") ? 1 : 0,
    a = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(r, a);
}
function Ze(e, r, a) {
  Object.defineProperty(e, r, {
    get() {
      {
        const i = a();
        return (e[r] = i), i;
      }
    },
    set(i) {
      Object.defineProperty(e, r, { value: i });
    },
    configurable: !0,
  });
}
function Jh(e, r, a) {
  Object.defineProperty(e, r, {
    value: a,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function Wi(e) {
  return JSON.stringify(e);
}
const O1 = Error.captureStackTrace ? Error.captureStackTrace : (...e) => {};
function Hd(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const GA = z1(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function Bd(e) {
  if (Hd(e) === !1) return !1;
  const r = e.constructor;
  if (r === void 0) return !0;
  const a = r.prototype;
  return !(
    Hd(a) === !1 ||
    Object.prototype.hasOwnProperty.call(a, "isPrototypeOf") === !1
  );
}
const FA = new Set(["string", "number", "symbol"]);
function Uu(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Oa(e, r, a) {
  const i = new e._zod.constr(r ?? e._zod.def);
  return (!r || a?.parent) && (i._zod.parent = e), i;
}
function xe(e) {
  const r = e;
  if (!r) return {};
  if (typeof r == "string") return { error: () => r };
  if (r?.message !== void 0) {
    if (r?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    r.error = r.message;
  }
  return (
    delete r.message,
    typeof r.error == "string" ? { ...r, error: () => r.error } : r
  );
}
function QA(e) {
  return Object.keys(e).filter(
    (r) => e[r]._zod.optin === "optional" && e[r]._zod.optout === "optional",
  );
}
function XA(e, r) {
  const a = {},
    i = e._zod.def;
  for (const s in r) {
    if (!(s in i.shape)) throw new Error(`Unrecognized key: "${s}"`);
    r[s] && (a[s] = i.shape[s]);
  }
  return Oa(e, { ...e._zod.def, shape: a, checks: [] });
}
function KA(e, r) {
  const a = { ...e._zod.def.shape },
    i = e._zod.def;
  for (const s in r) {
    if (!(s in i.shape)) throw new Error(`Unrecognized key: "${s}"`);
    r[s] && delete a[s];
  }
  return Oa(e, { ...e._zod.def, shape: a, checks: [] });
}
function IA(e, r) {
  if (!Bd(r))
    throw new Error("Invalid input to extend: expected a plain object");
  const a = {
    ...e._zod.def,
    get shape() {
      const i = { ...e._zod.def.shape, ...r };
      return Jh(this, "shape", i), i;
    },
    checks: [],
  };
  return Oa(e, a);
}
function WA(e, r) {
  return Oa(e, {
    ...e._zod.def,
    get shape() {
      const a = { ...e._zod.def.shape, ...r._zod.def.shape };
      return Jh(this, "shape", a), a;
    },
    catchall: r._zod.def.catchall,
    checks: [],
  });
}
function JA(e, r, a) {
  const i = r._zod.def.shape,
    s = { ...i };
  if (a)
    for (const u in a) {
      if (!(u in i)) throw new Error(`Unrecognized key: "${u}"`);
      a[u] && (s[u] = e ? new e({ type: "optional", innerType: i[u] }) : i[u]);
    }
  else
    for (const u in i)
      s[u] = e ? new e({ type: "optional", innerType: i[u] }) : i[u];
  return Oa(r, { ...r._zod.def, shape: s, checks: [] });
}
function e3(e, r, a) {
  const i = r._zod.def.shape,
    s = { ...i };
  if (a)
    for (const u in a) {
      if (!(u in s)) throw new Error(`Unrecognized key: "${u}"`);
      a[u] && (s[u] = new e({ type: "nonoptional", innerType: i[u] }));
    }
  else
    for (const u in i) s[u] = new e({ type: "nonoptional", innerType: i[u] });
  return Oa(r, { ...r._zod.def, shape: s, checks: [] });
}
function el(e, r = 0) {
  for (let a = r; a < e.issues.length; a++)
    if (e.issues[a]?.continue !== !0) return !0;
  return !1;
}
function ep(e, r) {
  return r.map((a) => {
    var i;
    return (i = a).path ?? (i.path = []), a.path.unshift(e), a;
  });
}
function Is(e) {
  return typeof e == "string" ? e : e?.message;
}
function Aa(e, r, a) {
  const i = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const s =
      Is(e.inst?._zod.def?.error?.(e)) ??
      Is(r?.error?.(e)) ??
      Is(a.customError?.(e)) ??
      Is(a.localeError?.(e)) ??
      "Invalid input";
    i.message = s;
  }
  return delete i.inst, delete i.continue, r?.reportInput || delete i.input, i;
}
function tp(e) {
  return Array.isArray(e)
    ? "array"
    : typeof e == "string"
      ? "string"
      : "unknown";
}
function ul(...e) {
  const [r, a, i] = e;
  return typeof r == "string"
    ? { message: r, code: "custom", input: a, inst: i }
    : { ...r };
}
const j1 = (e, r) => {
    (e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: r, enumerable: !1 }),
      Object.defineProperty(e, "message", {
        get() {
          return JSON.stringify(r, YA, 2);
        },
        enumerable: !0,
      }),
      Object.defineProperty(e, "toString", {
        value: () => e.message,
        enumerable: !1,
      });
  },
  np = I("$ZodError", j1),
  rp = I("$ZodError", j1, { Parent: Error });
function t3(e, r = (a) => a.message) {
  const a = {},
    i = [];
  for (const s of e.issues)
    s.path.length > 0
      ? ((a[s.path[0]] = a[s.path[0]] || []), a[s.path[0]].push(r(s)))
      : i.push(r(s));
  return { formErrors: i, fieldErrors: a };
}
function n3(e, r) {
  const a =
      r ||
      function (u) {
        return u.message;
      },
    i = { _errors: [] },
    s = (u) => {
      for (const f of u.issues)
        if (f.code === "invalid_union" && f.errors.length)
          f.errors.map((h) => s({ issues: h }));
        else if (f.code === "invalid_key") s({ issues: f.issues });
        else if (f.code === "invalid_element") s({ issues: f.issues });
        else if (f.path.length === 0) i._errors.push(a(f));
        else {
          let h = i,
            p = 0;
          for (; p < f.path.length; ) {
            const m = f.path[p];
            p === f.path.length - 1
              ? ((h[m] = h[m] || { _errors: [] }), h[m]._errors.push(a(f)))
              : (h[m] = h[m] || { _errors: [] }),
              (h = h[m]),
              p++;
          }
        }
    };
  return s(e), i;
}
const D1 = (e) => (r, a, i, s) => {
    const u = i ? Object.assign(i, { async: !1 }) : { async: !1 },
      f = r._zod.run({ value: a, issues: [] }, u);
    if (f instanceof Promise) throw new sl();
    if (f.issues.length) {
      const h = new (s?.Err ?? e)(f.issues.map((p) => Aa(p, u, Ta())));
      throw (O1(h, s?.callee), h);
    }
    return f.value;
  },
  r3 = D1(rp),
  a3 = (e) => async (r, a, i, s) => {
    const u = i ? Object.assign(i, { async: !0 }) : { async: !0 };
    let f = r._zod.run({ value: a, issues: [] }, u);
    if ((f instanceof Promise && (f = await f), f.issues.length)) {
      const h = new (s?.Err ?? e)(f.issues.map((p) => Aa(p, u, Ta())));
      throw (O1(h, s?.callee), h);
    }
    return f.value;
  },
  N1 = (e) => (r, a, i) => {
    const s = i ? { ...i, async: !1 } : { async: !1 },
      u = r._zod.run({ value: a, issues: [] }, s);
    if (u instanceof Promise) throw new sl();
    return u.issues.length
      ? {
          success: !1,
          error: new (e ?? np)(u.issues.map((f) => Aa(f, s, Ta()))),
        }
      : { success: !0, data: u.value };
  },
  o3 = N1(rp),
  M1 = (e) => async (r, a, i) => {
    const s = i ? Object.assign(i, { async: !0 }) : { async: !0 };
    let u = r._zod.run({ value: a, issues: [] }, s);
    return (
      u instanceof Promise && (u = await u),
      u.issues.length
        ? { success: !1, error: new e(u.issues.map((f) => Aa(f, s, Ta()))) }
        : { success: !0, data: u.value }
    );
  },
  i3 = M1(rp),
  l3 = /^[cC][^\s-]{8,}$/,
  s3 = /^[0-9a-z]+$/,
  u3 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  c3 = /^[0-9a-vA-V]{20}$/,
  f3 = /^[A-Za-z0-9]{27}$/,
  d3 = /^[a-zA-Z0-9_-]{21}$/,
  h3 =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  p3 =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  l0 = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/,
  m3 =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  g3 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function y3() {
  return new RegExp(g3, "u");
}
const v3 =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  b3 =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/,
  S3 =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  x3 =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  w3 =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  $1 = /^[A-Za-z0-9_-]*$/,
  C3 = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/,
  E3 = /^\+(?:[0-9]){6,14}[0-9]$/,
  k1 =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  _3 = new RegExp(`^${k1}$`);
function L1(e) {
  const r = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number"
    ? e.precision === -1
      ? `${r}`
      : e.precision === 0
        ? `${r}:[0-5]\\d`
        : `${r}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${r}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function R3(e) {
  return new RegExp(`^${L1(e)}$`);
}
function T3(e) {
  const r = L1({ precision: e.precision }),
    a = ["Z"];
  e.local && a.push(""), e.offset && a.push("([+-]\\d{2}:\\d{2})");
  const i = `${r}(?:${a.join("|")})`;
  return new RegExp(`^${k1}T(?:${i})$`);
}
const A3 = (e) => {
    const r = e
      ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}`
      : "[\\s\\S]*";
    return new RegExp(`^${r}$`);
  },
  z3 = /^[^A-Z]*$/,
  O3 = /^[^a-z]*$/,
  or = I("$ZodCheck", (e, r) => {
    var a;
    e._zod ?? (e._zod = {}),
      (e._zod.def = r),
      (a = e._zod).onattach ?? (a.onattach = []);
  }),
  j3 = I("$ZodCheckMaxLength", (e, r) => {
    var a;
    or.init(e, r),
      (a = e._zod.def).when ??
        (a.when = (i) => {
          const s = i.value;
          return !Ih(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        r.maximum < s && (i._zod.bag.maximum = r.maximum);
      }),
      (e._zod.check = (i) => {
        const s = i.value;
        if (s.length <= r.maximum) return;
        const f = tp(s);
        i.issues.push({
          origin: f,
          code: "too_big",
          maximum: r.maximum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !r.abort,
        });
      });
  }),
  D3 = I("$ZodCheckMinLength", (e, r) => {
    var a;
    or.init(e, r),
      (a = e._zod.def).when ??
        (a.when = (i) => {
          const s = i.value;
          return !Ih(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        r.minimum > s && (i._zod.bag.minimum = r.minimum);
      }),
      (e._zod.check = (i) => {
        const s = i.value;
        if (s.length >= r.minimum) return;
        const f = tp(s);
        i.issues.push({
          origin: f,
          code: "too_small",
          minimum: r.minimum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !r.abort,
        });
      });
  }),
  N3 = I("$ZodCheckLengthEquals", (e, r) => {
    var a;
    or.init(e, r),
      (a = e._zod.def).when ??
        (a.when = (i) => {
          const s = i.value;
          return !Ih(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        (s.minimum = r.length), (s.maximum = r.length), (s.length = r.length);
      }),
      (e._zod.check = (i) => {
        const s = i.value,
          u = s.length;
        if (u === r.length) return;
        const f = tp(s),
          h = u > r.length;
        i.issues.push({
          origin: f,
          ...(h
            ? { code: "too_big", maximum: r.length }
            : { code: "too_small", minimum: r.length }),
          inclusive: !0,
          exact: !0,
          input: i.value,
          inst: e,
          continue: !r.abort,
        });
      });
  }),
  Hu = I("$ZodCheckStringFormat", (e, r) => {
    var a, i;
    or.init(e, r),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        (u.format = r.format),
          r.pattern &&
            (u.patterns ?? (u.patterns = new Set()), u.patterns.add(r.pattern));
      }),
      r.pattern
        ? ((a = e._zod).check ??
          (a.check = (s) => {
            (r.pattern.lastIndex = 0),
              !r.pattern.test(s.value) &&
                s.issues.push({
                  origin: "string",
                  code: "invalid_format",
                  format: r.format,
                  input: s.value,
                  ...(r.pattern ? { pattern: r.pattern.toString() } : {}),
                  inst: e,
                  continue: !r.abort,
                });
          }))
        : ((i = e._zod).check ?? (i.check = () => {}));
  }),
  M3 = I("$ZodCheckRegex", (e, r) => {
    Hu.init(e, r),
      (e._zod.check = (a) => {
        (r.pattern.lastIndex = 0),
          !r.pattern.test(a.value) &&
            a.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "regex",
              input: a.value,
              pattern: r.pattern.toString(),
              inst: e,
              continue: !r.abort,
            });
      });
  }),
  $3 = I("$ZodCheckLowerCase", (e, r) => {
    r.pattern ?? (r.pattern = z3), Hu.init(e, r);
  }),
  k3 = I("$ZodCheckUpperCase", (e, r) => {
    r.pattern ?? (r.pattern = O3), Hu.init(e, r);
  }),
  L3 = I("$ZodCheckIncludes", (e, r) => {
    or.init(e, r);
    const a = Uu(r.includes),
      i = new RegExp(
        typeof r.position == "number" ? `^.{${r.position}}${a}` : a,
      );
    (r.pattern = i),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        u.patterns ?? (u.patterns = new Set()), u.patterns.add(i);
      }),
      (e._zod.check = (s) => {
        s.value.includes(r.includes, r.position) ||
          s.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: r.includes,
            input: s.value,
            inst: e,
            continue: !r.abort,
          });
      });
  }),
  U3 = I("$ZodCheckStartsWith", (e, r) => {
    or.init(e, r);
    const a = new RegExp(`^${Uu(r.prefix)}.*`);
    r.pattern ?? (r.pattern = a),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        s.patterns ?? (s.patterns = new Set()), s.patterns.add(a);
      }),
      (e._zod.check = (i) => {
        i.value.startsWith(r.prefix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: r.prefix,
            input: i.value,
            inst: e,
            continue: !r.abort,
          });
      });
  }),
  H3 = I("$ZodCheckEndsWith", (e, r) => {
    or.init(e, r);
    const a = new RegExp(`.*${Uu(r.suffix)}$`);
    r.pattern ?? (r.pattern = a),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        s.patterns ?? (s.patterns = new Set()), s.patterns.add(a);
      }),
      (e._zod.check = (i) => {
        i.value.endsWith(r.suffix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: r.suffix,
            input: i.value,
            inst: e,
            continue: !r.abort,
          });
      });
  }),
  B3 = I("$ZodCheckOverwrite", (e, r) => {
    or.init(e, r),
      (e._zod.check = (a) => {
        a.value = r.tx(a.value);
      });
  });
class P3 {
  constructor(r = []) {
    (this.content = []), (this.indent = 0), this && (this.args = r);
  }
  indented(r) {
    (this.indent += 1), r(this), (this.indent -= 1);
  }
  write(r) {
    if (typeof r == "function") {
      r(this, { execution: "sync" }), r(this, { execution: "async" });
      return;
    }
    const i = r
        .split(
          `
`,
        )
        .filter((f) => f),
      s = Math.min(...i.map((f) => f.length - f.trimStart().length)),
      u = i.map((f) => f.slice(s)).map((f) => " ".repeat(this.indent * 2) + f);
    for (const f of u) this.content.push(f);
  }
  compile() {
    const r = Function,
      a = this?.args,
      s = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
    return new r(
      ...a,
      s.join(`
`),
    );
  }
}
const Z3 = { major: 4, minor: 0, patch: 5 },
  ot = I("$ZodType", (e, r) => {
    var a;
    e ?? (e = {}),
      (e._zod.def = r),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = Z3);
    const i = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has("$ZodCheck") && i.unshift(e);
    for (const s of i) for (const u of s._zod.onattach) u(e);
    if (i.length === 0)
      (a = e._zod).deferred ?? (a.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        });
    else {
      const s = (u, f, h) => {
        let p = el(u),
          m;
        for (const g of f) {
          if (g._zod.def.when) {
            if (!g._zod.def.when(u)) continue;
          } else if (p) continue;
          const y = u.issues.length,
            S = g._zod.check(u);
          if (S instanceof Promise && h?.async === !1) throw new sl();
          if (m || S instanceof Promise)
            m = (m ?? Promise.resolve()).then(async () => {
              await S, u.issues.length !== y && (p || (p = el(u, y)));
            });
          else {
            if (u.issues.length === y) continue;
            p || (p = el(u, y));
          }
        }
        return m ? m.then(() => u) : u;
      };
      e._zod.run = (u, f) => {
        const h = e._zod.parse(u, f);
        if (h instanceof Promise) {
          if (f.async === !1) throw new sl();
          return h.then((p) => s(p, i, f));
        }
        return s(h, i, f);
      };
    }
    e["~standard"] = {
      validate: (s) => {
        try {
          const u = o3(e, s);
          return u.success ? { value: u.data } : { issues: u.error?.issues };
        } catch {
          return i3(e, s).then((f) =>
            f.success ? { value: f.data } : { issues: f.error?.issues },
          );
        }
      },
      vendor: "zod",
      version: 1,
    };
  }),
  ap = I("$ZodString", (e, r) => {
    ot.init(e, r),
      (e._zod.pattern =
        [...(e?._zod.bag?.patterns ?? [])].pop() ?? A3(e._zod.bag)),
      (e._zod.parse = (a, i) => {
        if (r.coerce)
          try {
            a.value = String(a.value);
          } catch {}
        return (
          typeof a.value == "string" ||
            a.issues.push({
              expected: "string",
              code: "invalid_type",
              input: a.value,
              inst: e,
            }),
          a
        );
      });
  }),
  Qe = I("$ZodStringFormat", (e, r) => {
    Hu.init(e, r), ap.init(e, r);
  }),
  V3 = I("$ZodGUID", (e, r) => {
    r.pattern ?? (r.pattern = p3), Qe.init(e, r);
  }),
  q3 = I("$ZodUUID", (e, r) => {
    if (r.version) {
      const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        r.version
      ];
      if (i === void 0) throw new Error(`Invalid UUID version: "${r.version}"`);
      r.pattern ?? (r.pattern = l0(i));
    } else r.pattern ?? (r.pattern = l0());
    Qe.init(e, r);
  }),
  Y3 = I("$ZodEmail", (e, r) => {
    r.pattern ?? (r.pattern = m3), Qe.init(e, r);
  }),
  G3 = I("$ZodURL", (e, r) => {
    Qe.init(e, r),
      (e._zod.check = (a) => {
        try {
          const i = a.value,
            s = new URL(i),
            u = s.href;
          r.hostname &&
            ((r.hostname.lastIndex = 0),
            r.hostname.test(s.hostname) ||
              a.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: C3.source,
                input: a.value,
                inst: e,
                continue: !r.abort,
              })),
            r.protocol &&
              ((r.protocol.lastIndex = 0),
              r.protocol.test(
                s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol,
              ) ||
                a.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: r.protocol.source,
                  input: a.value,
                  inst: e,
                  continue: !r.abort,
                })),
            !i.endsWith("/") && u.endsWith("/")
              ? (a.value = u.slice(0, -1))
              : (a.value = u);
          return;
        } catch {
          a.issues.push({
            code: "invalid_format",
            format: "url",
            input: a.value,
            inst: e,
            continue: !r.abort,
          });
        }
      });
  }),
  F3 = I("$ZodEmoji", (e, r) => {
    r.pattern ?? (r.pattern = y3()), Qe.init(e, r);
  }),
  Q3 = I("$ZodNanoID", (e, r) => {
    r.pattern ?? (r.pattern = d3), Qe.init(e, r);
  }),
  X3 = I("$ZodCUID", (e, r) => {
    r.pattern ?? (r.pattern = l3), Qe.init(e, r);
  }),
  K3 = I("$ZodCUID2", (e, r) => {
    r.pattern ?? (r.pattern = s3), Qe.init(e, r);
  }),
  I3 = I("$ZodULID", (e, r) => {
    r.pattern ?? (r.pattern = u3), Qe.init(e, r);
  }),
  W3 = I("$ZodXID", (e, r) => {
    r.pattern ?? (r.pattern = c3), Qe.init(e, r);
  }),
  J3 = I("$ZodKSUID", (e, r) => {
    r.pattern ?? (r.pattern = f3), Qe.init(e, r);
  }),
  e9 = I("$ZodISODateTime", (e, r) => {
    r.pattern ?? (r.pattern = T3(r)), Qe.init(e, r);
  }),
  t9 = I("$ZodISODate", (e, r) => {
    r.pattern ?? (r.pattern = _3), Qe.init(e, r);
  }),
  n9 = I("$ZodISOTime", (e, r) => {
    r.pattern ?? (r.pattern = R3(r)), Qe.init(e, r);
  }),
  r9 = I("$ZodISODuration", (e, r) => {
    r.pattern ?? (r.pattern = h3), Qe.init(e, r);
  }),
  a9 = I("$ZodIPv4", (e, r) => {
    r.pattern ?? (r.pattern = v3),
      Qe.init(e, r),
      e._zod.onattach.push((a) => {
        const i = a._zod.bag;
        i.format = "ipv4";
      });
  }),
  o9 = I("$ZodIPv6", (e, r) => {
    r.pattern ?? (r.pattern = b3),
      Qe.init(e, r),
      e._zod.onattach.push((a) => {
        const i = a._zod.bag;
        i.format = "ipv6";
      }),
      (e._zod.check = (a) => {
        try {
          new URL(`http://[${a.value}]`);
        } catch {
          a.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: a.value,
            inst: e,
            continue: !r.abort,
          });
        }
      });
  }),
  i9 = I("$ZodCIDRv4", (e, r) => {
    r.pattern ?? (r.pattern = S3), Qe.init(e, r);
  }),
  l9 = I("$ZodCIDRv6", (e, r) => {
    r.pattern ?? (r.pattern = x3),
      Qe.init(e, r),
      (e._zod.check = (a) => {
        const [i, s] = a.value.split("/");
        try {
          if (!s) throw new Error();
          const u = Number(s);
          if (`${u}` !== s) throw new Error();
          if (u < 0 || u > 128) throw new Error();
          new URL(`http://[${i}]`);
        } catch {
          a.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: a.value,
            inst: e,
            continue: !r.abort,
          });
        }
      });
  });
function U1(e) {
  if (e === "") return !0;
  if (e.length % 4 !== 0) return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const s9 = I("$ZodBase64", (e, r) => {
  r.pattern ?? (r.pattern = w3),
    Qe.init(e, r),
    e._zod.onattach.push((a) => {
      a._zod.bag.contentEncoding = "base64";
    }),
    (e._zod.check = (a) => {
      U1(a.value) ||
        a.issues.push({
          code: "invalid_format",
          format: "base64",
          input: a.value,
          inst: e,
          continue: !r.abort,
        });
    });
});
function u9(e) {
  if (!$1.test(e)) return !1;
  const r = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/")),
    a = r.padEnd(Math.ceil(r.length / 4) * 4, "=");
  return U1(a);
}
const c9 = I("$ZodBase64URL", (e, r) => {
    r.pattern ?? (r.pattern = $1),
      Qe.init(e, r),
      e._zod.onattach.push((a) => {
        a._zod.bag.contentEncoding = "base64url";
      }),
      (e._zod.check = (a) => {
        u9(a.value) ||
          a.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: a.value,
            inst: e,
            continue: !r.abort,
          });
      });
  }),
  f9 = I("$ZodE164", (e, r) => {
    r.pattern ?? (r.pattern = E3), Qe.init(e, r);
  });
function d9(e, r = null) {
  try {
    const a = e.split(".");
    if (a.length !== 3) return !1;
    const [i] = a;
    if (!i) return !1;
    const s = JSON.parse(atob(i));
    return !(
      ("typ" in s && s?.typ !== "JWT") ||
      !s.alg ||
      (r && (!("alg" in s) || s.alg !== r))
    );
  } catch {
    return !1;
  }
}
const h9 = I("$ZodJWT", (e, r) => {
    Qe.init(e, r),
      (e._zod.check = (a) => {
        d9(a.value, r.alg) ||
          a.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: a.value,
            inst: e,
            continue: !r.abort,
          });
      });
  }),
  p9 = I("$ZodUnknown", (e, r) => {
    ot.init(e, r), (e._zod.parse = (a) => a);
  }),
  m9 = I("$ZodNever", (e, r) => {
    ot.init(e, r),
      (e._zod.parse = (a, i) => (
        a.issues.push({
          expected: "never",
          code: "invalid_type",
          input: a.value,
          inst: e,
        }),
        a
      ));
  });
function s0(e, r, a) {
  e.issues.length && r.issues.push(...ep(a, e.issues)), (r.value[a] = e.value);
}
const g9 = I("$ZodArray", (e, r) => {
  ot.init(e, r),
    (e._zod.parse = (a, i) => {
      const s = a.value;
      if (!Array.isArray(s))
        return (
          a.issues.push({
            expected: "array",
            code: "invalid_type",
            input: s,
            inst: e,
          }),
          a
        );
      a.value = Array(s.length);
      const u = [];
      for (let f = 0; f < s.length; f++) {
        const h = s[f],
          p = r.element._zod.run({ value: h, issues: [] }, i);
        p instanceof Promise ? u.push(p.then((m) => s0(m, a, f))) : s0(p, a, f);
      }
      return u.length ? Promise.all(u).then(() => a) : a;
    });
});
function Ws(e, r, a) {
  e.issues.length && r.issues.push(...ep(a, e.issues)), (r.value[a] = e.value);
}
function u0(e, r, a, i) {
  e.issues.length
    ? i[a] === void 0
      ? a in i
        ? (r.value[a] = void 0)
        : (r.value[a] = e.value)
      : r.issues.push(...ep(a, e.issues))
    : e.value === void 0
      ? a in i && (r.value[a] = void 0)
      : (r.value[a] = e.value);
}
const y9 = I("$ZodObject", (e, r) => {
  ot.init(e, r);
  const a = z1(() => {
    const y = Object.keys(r.shape);
    for (const w of y)
      if (!(r.shape[w] instanceof ot))
        throw new Error(`Invalid element at key "${w}": expected a Zod schema`);
    const S = QA(r.shape);
    return {
      shape: r.shape,
      keys: y,
      keySet: new Set(y),
      numKeys: y.length,
      optionalKeys: new Set(S),
    };
  });
  Ze(e._zod, "propValues", () => {
    const y = r.shape,
      S = {};
    for (const w in y) {
      const E = y[w]._zod;
      if (E.values) {
        S[w] ?? (S[w] = new Set());
        for (const T of E.values) S[w].add(T);
      }
    }
    return S;
  });
  const i = (y) => {
    const S = new P3(["shape", "payload", "ctx"]),
      w = a.value,
      E = (j) => {
        const A = Wi(j);
        return `shape[${A}]._zod.run({ value: input[${A}], issues: [] }, ctx)`;
      };
    S.write("const input = payload.value;");
    const T = Object.create(null);
    let R = 0;
    for (const j of w.keys) T[j] = `key_${R++}`;
    S.write("const newResult = {}");
    for (const j of w.keys)
      if (w.optionalKeys.has(j)) {
        const A = T[j];
        S.write(`const ${A} = ${E(j)};`);
        const D = Wi(j);
        S.write(`
        if (${A}.issues.length) {
          if (input[${D}] === undefined) {
            if (${D} in input) {
              newResult[${D}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${A}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${D}, ...iss.path] : [${D}],
              }))
            );
          }
        } else if (${A}.value === undefined) {
          if (${D} in input) newResult[${D}] = undefined;
        } else {
          newResult[${D}] = ${A}.value;
        }
        `);
      } else {
        const A = T[j];
        S.write(`const ${A} = ${E(j)};`),
          S.write(`
          if (${A}.issues.length) payload.issues = payload.issues.concat(${A}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${Wi(j)}, ...iss.path] : [${Wi(j)}]
          })));`),
          S.write(`newResult[${Wi(j)}] = ${A}.value`);
      }
    S.write("payload.value = newResult;"), S.write("return payload;");
    const _ = S.compile();
    return (j, A) => _(y, j, A);
  };
  let s;
  const u = Hd,
    f = !A1.jitless,
    p = f && GA.value,
    m = r.catchall;
  let g;
  e._zod.parse = (y, S) => {
    g ?? (g = a.value);
    const w = y.value;
    if (!u(w))
      return (
        y.issues.push({
          expected: "object",
          code: "invalid_type",
          input: w,
          inst: e,
        }),
        y
      );
    const E = [];
    if (f && p && S?.async === !1 && S.jitless !== !0)
      s || (s = i(r.shape)), (y = s(y, S));
    else {
      y.value = {};
      const A = g.shape;
      for (const D of g.keys) {
        const U = A[D],
          k = U._zod.run({ value: w[D], issues: [] }, S),
          Z = U._zod.optin === "optional" && U._zod.optout === "optional";
        k instanceof Promise
          ? E.push(k.then((V) => (Z ? u0(V, y, D, w) : Ws(V, y, D))))
          : Z
            ? u0(k, y, D, w)
            : Ws(k, y, D);
      }
    }
    if (!m) return E.length ? Promise.all(E).then(() => y) : y;
    const T = [],
      R = g.keySet,
      _ = m._zod,
      j = _.def.type;
    for (const A of Object.keys(w)) {
      if (R.has(A)) continue;
      if (j === "never") {
        T.push(A);
        continue;
      }
      const D = _.run({ value: w[A], issues: [] }, S);
      D instanceof Promise ? E.push(D.then((U) => Ws(U, y, A))) : Ws(D, y, A);
    }
    return (
      T.length &&
        y.issues.push({
          code: "unrecognized_keys",
          keys: T,
          input: w,
          inst: e,
        }),
      E.length ? Promise.all(E).then(() => y) : y
    );
  };
});
function c0(e, r, a, i) {
  for (const s of e) if (s.issues.length === 0) return (r.value = s.value), r;
  return (
    r.issues.push({
      code: "invalid_union",
      input: r.value,
      inst: a,
      errors: e.map((s) => s.issues.map((u) => Aa(u, i, Ta()))),
    }),
    r
  );
}
const v9 = I("$ZodUnion", (e, r) => {
    ot.init(e, r),
      Ze(e._zod, "optin", () =>
        r.options.some((a) => a._zod.optin === "optional")
          ? "optional"
          : void 0,
      ),
      Ze(e._zod, "optout", () =>
        r.options.some((a) => a._zod.optout === "optional")
          ? "optional"
          : void 0,
      ),
      Ze(e._zod, "values", () => {
        if (r.options.every((a) => a._zod.values))
          return new Set(r.options.flatMap((a) => Array.from(a._zod.values)));
      }),
      Ze(e._zod, "pattern", () => {
        if (r.options.every((a) => a._zod.pattern)) {
          const a = r.options.map((i) => i._zod.pattern);
          return new RegExp(`^(${a.map((i) => Wh(i.source)).join("|")})$`);
        }
      }),
      (e._zod.parse = (a, i) => {
        let s = !1;
        const u = [];
        for (const f of r.options) {
          const h = f._zod.run({ value: a.value, issues: [] }, i);
          if (h instanceof Promise) u.push(h), (s = !0);
          else {
            if (h.issues.length === 0) return h;
            u.push(h);
          }
        }
        return s ? Promise.all(u).then((f) => c0(f, a, e, i)) : c0(u, a, e, i);
      });
  }),
  b9 = I("$ZodIntersection", (e, r) => {
    ot.init(e, r),
      (e._zod.parse = (a, i) => {
        const s = a.value,
          u = r.left._zod.run({ value: s, issues: [] }, i),
          f = r.right._zod.run({ value: s, issues: [] }, i);
        return u instanceof Promise || f instanceof Promise
          ? Promise.all([u, f]).then(([p, m]) => f0(a, p, m))
          : f0(a, u, f);
      });
  });
function Pd(e, r) {
  if (e === r) return { valid: !0, data: e };
  if (e instanceof Date && r instanceof Date && +e == +r)
    return { valid: !0, data: e };
  if (Bd(e) && Bd(r)) {
    const a = Object.keys(r),
      i = Object.keys(e).filter((u) => a.indexOf(u) !== -1),
      s = { ...e, ...r };
    for (const u of i) {
      const f = Pd(e[u], r[u]);
      if (!f.valid)
        return { valid: !1, mergeErrorPath: [u, ...f.mergeErrorPath] };
      s[u] = f.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(e) && Array.isArray(r)) {
    if (e.length !== r.length) return { valid: !1, mergeErrorPath: [] };
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i],
        u = r[i],
        f = Pd(s, u);
      if (!f.valid)
        return { valid: !1, mergeErrorPath: [i, ...f.mergeErrorPath] };
      a.push(f.data);
    }
    return { valid: !0, data: a };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function f0(e, r, a) {
  if (
    (r.issues.length && e.issues.push(...r.issues),
    a.issues.length && e.issues.push(...a.issues),
    el(e))
  )
    return e;
  const i = Pd(r.value, a.value);
  if (!i.valid)
    throw new Error(
      `Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`,
    );
  return (e.value = i.data), e;
}
const S9 = I("$ZodEnum", (e, r) => {
    ot.init(e, r);
    const a = qA(r.entries);
    (e._zod.values = new Set(a)),
      (e._zod.pattern = new RegExp(
        `^(${a
          .filter((i) => FA.has(typeof i))
          .map((i) => (typeof i == "string" ? Uu(i) : i.toString()))
          .join("|")})$`,
      )),
      (e._zod.parse = (i, s) => {
        const u = i.value;
        return (
          e._zod.values.has(u) ||
            i.issues.push({
              code: "invalid_value",
              values: a,
              input: u,
              inst: e,
            }),
          i
        );
      });
  }),
  x9 = I("$ZodTransform", (e, r) => {
    ot.init(e, r),
      (e._zod.parse = (a, i) => {
        const s = r.transform(a.value, a);
        if (i.async)
          return (s instanceof Promise ? s : Promise.resolve(s)).then(
            (f) => ((a.value = f), a),
          );
        if (s instanceof Promise) throw new sl();
        return (a.value = s), a;
      });
  }),
  w9 = I("$ZodOptional", (e, r) => {
    ot.init(e, r),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      Ze(e._zod, "values", () =>
        r.innerType._zod.values
          ? new Set([...r.innerType._zod.values, void 0])
          : void 0,
      ),
      Ze(e._zod, "pattern", () => {
        const a = r.innerType._zod.pattern;
        return a ? new RegExp(`^(${Wh(a.source)})?$`) : void 0;
      }),
      (e._zod.parse = (a, i) =>
        r.innerType._zod.optin === "optional"
          ? r.innerType._zod.run(a, i)
          : a.value === void 0
            ? a
            : r.innerType._zod.run(a, i));
  }),
  C9 = I("$ZodNullable", (e, r) => {
    ot.init(e, r),
      Ze(e._zod, "optin", () => r.innerType._zod.optin),
      Ze(e._zod, "optout", () => r.innerType._zod.optout),
      Ze(e._zod, "pattern", () => {
        const a = r.innerType._zod.pattern;
        return a ? new RegExp(`^(${Wh(a.source)}|null)$`) : void 0;
      }),
      Ze(e._zod, "values", () =>
        r.innerType._zod.values
          ? new Set([...r.innerType._zod.values, null])
          : void 0,
      ),
      (e._zod.parse = (a, i) =>
        a.value === null ? a : r.innerType._zod.run(a, i));
  }),
  E9 = I("$ZodDefault", (e, r) => {
    ot.init(e, r),
      (e._zod.optin = "optional"),
      Ze(e._zod, "values", () => r.innerType._zod.values),
      (e._zod.parse = (a, i) => {
        if (a.value === void 0) return (a.value = r.defaultValue), a;
        const s = r.innerType._zod.run(a, i);
        return s instanceof Promise ? s.then((u) => d0(u, r)) : d0(s, r);
      });
  });
function d0(e, r) {
  return e.value === void 0 && (e.value = r.defaultValue), e;
}
const _9 = I("$ZodPrefault", (e, r) => {
    ot.init(e, r),
      (e._zod.optin = "optional"),
      Ze(e._zod, "values", () => r.innerType._zod.values),
      (e._zod.parse = (a, i) => (
        a.value === void 0 && (a.value = r.defaultValue),
        r.innerType._zod.run(a, i)
      ));
  }),
  R9 = I("$ZodNonOptional", (e, r) => {
    ot.init(e, r),
      Ze(e._zod, "values", () => {
        const a = r.innerType._zod.values;
        return a ? new Set([...a].filter((i) => i !== void 0)) : void 0;
      }),
      (e._zod.parse = (a, i) => {
        const s = r.innerType._zod.run(a, i);
        return s instanceof Promise ? s.then((u) => h0(u, e)) : h0(s, e);
      });
  });
function h0(e, r) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: e.value,
        inst: r,
      }),
    e
  );
}
const T9 = I("$ZodCatch", (e, r) => {
    ot.init(e, r),
      (e._zod.optin = "optional"),
      Ze(e._zod, "optout", () => r.innerType._zod.optout),
      Ze(e._zod, "values", () => r.innerType._zod.values),
      (e._zod.parse = (a, i) => {
        const s = r.innerType._zod.run(a, i);
        return s instanceof Promise
          ? s.then(
              (u) => (
                (a.value = u.value),
                u.issues.length &&
                  ((a.value = r.catchValue({
                    ...a,
                    error: { issues: u.issues.map((f) => Aa(f, i, Ta())) },
                    input: a.value,
                  })),
                  (a.issues = [])),
                a
              ),
            )
          : ((a.value = s.value),
            s.issues.length &&
              ((a.value = r.catchValue({
                ...a,
                error: { issues: s.issues.map((u) => Aa(u, i, Ta())) },
                input: a.value,
              })),
              (a.issues = [])),
            a);
      });
  }),
  A9 = I("$ZodPipe", (e, r) => {
    ot.init(e, r),
      Ze(e._zod, "values", () => r.in._zod.values),
      Ze(e._zod, "optin", () => r.in._zod.optin),
      Ze(e._zod, "optout", () => r.out._zod.optout),
      Ze(e._zod, "propValues", () => r.in._zod.propValues),
      (e._zod.parse = (a, i) => {
        const s = r.in._zod.run(a, i);
        return s instanceof Promise ? s.then((u) => p0(u, r, i)) : p0(s, r, i);
      });
  });
function p0(e, r, a) {
  return el(e) ? e : r.out._zod.run({ value: e.value, issues: e.issues }, a);
}
const z9 = I("$ZodReadonly", (e, r) => {
  ot.init(e, r),
    Ze(e._zod, "propValues", () => r.innerType._zod.propValues),
    Ze(e._zod, "values", () => r.innerType._zod.values),
    Ze(e._zod, "optin", () => r.innerType._zod.optin),
    Ze(e._zod, "optout", () => r.innerType._zod.optout),
    (e._zod.parse = (a, i) => {
      const s = r.innerType._zod.run(a, i);
      return s instanceof Promise ? s.then(m0) : m0(s);
    });
});
function m0(e) {
  return (e.value = Object.freeze(e.value)), e;
}
const O9 = I("$ZodCustom", (e, r) => {
  or.init(e, r),
    ot.init(e, r),
    (e._zod.parse = (a, i) => a),
    (e._zod.check = (a) => {
      const i = a.value,
        s = r.fn(i);
      if (s instanceof Promise) return s.then((u) => g0(u, a, i, e));
      g0(s, a, i, e);
    });
});
function g0(e, r, a, i) {
  if (!e) {
    const s = {
      code: "custom",
      input: a,
      inst: i,
      path: [...(i._zod.def.path ?? [])],
      continue: !i._zod.def.abort,
    };
    i._zod.def.params && (s.params = i._zod.def.params), r.issues.push(ul(s));
  }
}
class j9 {
  constructor() {
    (this._map = new Map()), (this._idmap = new Map());
  }
  add(r, ...a) {
    const i = a[0];
    if ((this._map.set(r, i), i && typeof i == "object" && "id" in i)) {
      if (this._idmap.has(i.id))
        throw new Error(`ID ${i.id} already exists in the registry`);
      this._idmap.set(i.id, r);
    }
    return this;
  }
  clear() {
    return (this._map = new Map()), (this._idmap = new Map()), this;
  }
  remove(r) {
    const a = this._map.get(r);
    return (
      a && typeof a == "object" && "id" in a && this._idmap.delete(a.id),
      this._map.delete(r),
      this
    );
  }
  get(r) {
    const a = r._zod.parent;
    if (a) {
      const i = { ...(this.get(a) ?? {}) };
      return delete i.id, { ...i, ...this._map.get(r) };
    }
    return this._map.get(r);
  }
  has(r) {
    return this._map.has(r);
  }
}
function D9() {
  return new j9();
}
const Js = D9();
function N9(e, r) {
  return new e({ type: "string", ...xe(r) });
}
function M9(e, r) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function y0(e, r) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function $9(e, r) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function k9(e, r) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...xe(r),
  });
}
function L9(e, r) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...xe(r),
  });
}
function U9(e, r) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...xe(r),
  });
}
function H9(e, r) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function B9(e, r) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function P9(e, r) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function Z9(e, r) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function V9(e, r) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function q9(e, r) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function Y9(e, r) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function G9(e, r) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function F9(e, r) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function Q9(e, r) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function X9(e, r) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function K9(e, r) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function I9(e, r) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function W9(e, r) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function J9(e, r) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function ez(e, r) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...xe(r),
  });
}
function tz(e, r) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...xe(r),
  });
}
function nz(e, r) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...xe(r),
  });
}
function rz(e, r) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...xe(r),
  });
}
function az(e, r) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...xe(r),
  });
}
function oz(e) {
  return new e({ type: "unknown" });
}
function iz(e, r) {
  return new e({ type: "never", ...xe(r) });
}
function H1(e, r) {
  return new j3({ check: "max_length", ...xe(r), maximum: e });
}
function pu(e, r) {
  return new D3({ check: "min_length", ...xe(r), minimum: e });
}
function B1(e, r) {
  return new N3({ check: "length_equals", ...xe(r), length: e });
}
function lz(e, r) {
  return new M3({
    check: "string_format",
    format: "regex",
    ...xe(r),
    pattern: e,
  });
}
function sz(e) {
  return new $3({ check: "string_format", format: "lowercase", ...xe(e) });
}
function uz(e) {
  return new k3({ check: "string_format", format: "uppercase", ...xe(e) });
}
function cz(e, r) {
  return new L3({
    check: "string_format",
    format: "includes",
    ...xe(r),
    includes: e,
  });
}
function fz(e, r) {
  return new U3({
    check: "string_format",
    format: "starts_with",
    ...xe(r),
    prefix: e,
  });
}
function dz(e, r) {
  return new H3({
    check: "string_format",
    format: "ends_with",
    ...xe(r),
    suffix: e,
  });
}
function Al(e) {
  return new B3({ check: "overwrite", tx: e });
}
function hz(e) {
  return Al((r) => r.normalize(e));
}
function pz() {
  return Al((e) => e.trim());
}
function mz() {
  return Al((e) => e.toLowerCase());
}
function gz() {
  return Al((e) => e.toUpperCase());
}
function yz(e, r, a) {
  return new e({ type: "array", element: r, ...xe(a) });
}
function vz(e, r, a) {
  return new e({ type: "custom", check: "custom", fn: r, ...xe(a) });
}
function Bu(e, r) {
  return (a) => {
    try {
      return r3(e, a), {};
    } catch (i) {
      if (i instanceof np) {
        const s = {};
        return (
          i.issues.forEach((u) => {
            s[u.path.join(".")] = u.message;
          }),
          s
        );
      }
      throw i;
    }
  };
}
const bz = I("ZodISODateTime", (e, r) => {
  e9.init(e, r), Ke.init(e, r);
});
function Sz(e) {
  return tz(bz, e);
}
const xz = I("ZodISODate", (e, r) => {
  t9.init(e, r), Ke.init(e, r);
});
function wz(e) {
  return nz(xz, e);
}
const Cz = I("ZodISOTime", (e, r) => {
  n9.init(e, r), Ke.init(e, r);
});
function Ez(e) {
  return rz(Cz, e);
}
const _z = I("ZodISODuration", (e, r) => {
  r9.init(e, r), Ke.init(e, r);
});
function Rz(e) {
  return az(_z, e);
}
const Tz = (e, r) => {
    np.init(e, r),
      (e.name = "ZodError"),
      Object.defineProperties(e, {
        format: { value: (a) => n3(e, a) },
        flatten: { value: (a) => t3(e, a) },
        addIssue: { value: (a) => e.issues.push(a) },
        addIssues: { value: (a) => e.issues.push(...a) },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      });
  },
  Pu = I("ZodError", Tz, { Parent: Error }),
  Az = D1(Pu),
  zz = a3(Pu),
  Oz = N1(Pu),
  jz = M1(Pu),
  bt = I(
    "ZodType",
    (e, r) => (
      ot.init(e, r),
      (e.def = r),
      Object.defineProperty(e, "_def", { value: r }),
      (e.check = (...a) =>
        e.clone({
          ...r,
          checks: [
            ...(r.checks ?? []),
            ...a.map((i) =>
              typeof i == "function"
                ? { _zod: { check: i, def: { check: "custom" }, onattach: [] } }
                : i,
            ),
          ],
        })),
      (e.clone = (a, i) => Oa(e, a, i)),
      (e.brand = () => e),
      (e.register = (a, i) => (a.add(e, i), e)),
      (e.parse = (a, i) => Az(e, a, i, { callee: e.parse })),
      (e.safeParse = (a, i) => Oz(e, a, i)),
      (e.parseAsync = async (a, i) => zz(e, a, i, { callee: e.parseAsync })),
      (e.safeParseAsync = async (a, i) => jz(e, a, i)),
      (e.spa = e.safeParseAsync),
      (e.refine = (a, i) => e.check(xO(a, i))),
      (e.superRefine = (a) => e.check(wO(a))),
      (e.overwrite = (a) => e.check(Al(a))),
      (e.optional = () => S0(e)),
      (e.nullable = () => x0(e)),
      (e.nullish = () => S0(x0(e))),
      (e.nonoptional = (a) => hO(e, a)),
      (e.array = () => Zd(e)),
      (e.or = (a) => nO([e, a])),
      (e.and = (a) => aO(e, a)),
      (e.transform = (a) => w0(e, lO(a))),
      (e.default = (a) => cO(e, a)),
      (e.prefault = (a) => dO(e, a)),
      (e.catch = (a) => mO(e, a)),
      (e.pipe = (a) => w0(e, a)),
      (e.readonly = () => vO(e)),
      (e.describe = (a) => {
        const i = e.clone();
        return Js.add(i, { description: a }), i;
      }),
      Object.defineProperty(e, "description", {
        get() {
          return Js.get(e)?.description;
        },
        configurable: !0,
      }),
      (e.meta = (...a) => {
        if (a.length === 0) return Js.get(e);
        const i = e.clone();
        return Js.add(i, a[0]), i;
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      e
    ),
  ),
  P1 = I("_ZodString", (e, r) => {
    ap.init(e, r), bt.init(e, r);
    const a = e._zod.bag;
    (e.format = a.format ?? null),
      (e.minLength = a.minimum ?? null),
      (e.maxLength = a.maximum ?? null),
      (e.regex = (...i) => e.check(lz(...i))),
      (e.includes = (...i) => e.check(cz(...i))),
      (e.startsWith = (...i) => e.check(fz(...i))),
      (e.endsWith = (...i) => e.check(dz(...i))),
      (e.min = (...i) => e.check(pu(...i))),
      (e.max = (...i) => e.check(H1(...i))),
      (e.length = (...i) => e.check(B1(...i))),
      (e.nonempty = (...i) => e.check(pu(1, ...i))),
      (e.lowercase = (i) => e.check(sz(i))),
      (e.uppercase = (i) => e.check(uz(i))),
      (e.trim = () => e.check(pz())),
      (e.normalize = (...i) => e.check(hz(...i))),
      (e.toLowerCase = () => e.check(mz())),
      (e.toUpperCase = () => e.check(gz()));
  }),
  Dz = I("ZodString", (e, r) => {
    ap.init(e, r),
      P1.init(e, r),
      (e.email = (a) => e.check(M9(Nz, a))),
      (e.url = (a) => e.check(H9(Mz, a))),
      (e.jwt = (a) => e.check(ez(Xz, a))),
      (e.emoji = (a) => e.check(B9($z, a))),
      (e.guid = (a) => e.check(y0(v0, a))),
      (e.uuid = (a) => e.check($9(eu, a))),
      (e.uuidv4 = (a) => e.check(k9(eu, a))),
      (e.uuidv6 = (a) => e.check(L9(eu, a))),
      (e.uuidv7 = (a) => e.check(U9(eu, a))),
      (e.nanoid = (a) => e.check(P9(kz, a))),
      (e.guid = (a) => e.check(y0(v0, a))),
      (e.cuid = (a) => e.check(Z9(Lz, a))),
      (e.cuid2 = (a) => e.check(V9(Uz, a))),
      (e.ulid = (a) => e.check(q9(Hz, a))),
      (e.base64 = (a) => e.check(I9(Gz, a))),
      (e.base64url = (a) => e.check(W9(Fz, a))),
      (e.xid = (a) => e.check(Y9(Bz, a))),
      (e.ksuid = (a) => e.check(G9(Pz, a))),
      (e.ipv4 = (a) => e.check(F9(Zz, a))),
      (e.ipv6 = (a) => e.check(Q9(Vz, a))),
      (e.cidrv4 = (a) => e.check(X9(qz, a))),
      (e.cidrv6 = (a) => e.check(K9(Yz, a))),
      (e.e164 = (a) => e.check(J9(Qz, a))),
      (e.datetime = (a) => e.check(Sz(a))),
      (e.date = (a) => e.check(wz(a))),
      (e.time = (a) => e.check(Ez(a))),
      (e.duration = (a) => e.check(Rz(a)));
  });
function Dt(e) {
  return N9(Dz, e);
}
const Ke = I("ZodStringFormat", (e, r) => {
    Qe.init(e, r), P1.init(e, r);
  }),
  Nz = I("ZodEmail", (e, r) => {
    Y3.init(e, r), Ke.init(e, r);
  }),
  v0 = I("ZodGUID", (e, r) => {
    V3.init(e, r), Ke.init(e, r);
  }),
  eu = I("ZodUUID", (e, r) => {
    q3.init(e, r), Ke.init(e, r);
  }),
  Mz = I("ZodURL", (e, r) => {
    G3.init(e, r), Ke.init(e, r);
  }),
  $z = I("ZodEmoji", (e, r) => {
    F3.init(e, r), Ke.init(e, r);
  }),
  kz = I("ZodNanoID", (e, r) => {
    Q3.init(e, r), Ke.init(e, r);
  }),
  Lz = I("ZodCUID", (e, r) => {
    X3.init(e, r), Ke.init(e, r);
  }),
  Uz = I("ZodCUID2", (e, r) => {
    K3.init(e, r), Ke.init(e, r);
  }),
  Hz = I("ZodULID", (e, r) => {
    I3.init(e, r), Ke.init(e, r);
  }),
  Bz = I("ZodXID", (e, r) => {
    W3.init(e, r), Ke.init(e, r);
  }),
  Pz = I("ZodKSUID", (e, r) => {
    J3.init(e, r), Ke.init(e, r);
  }),
  Zz = I("ZodIPv4", (e, r) => {
    a9.init(e, r), Ke.init(e, r);
  }),
  Vz = I("ZodIPv6", (e, r) => {
    o9.init(e, r), Ke.init(e, r);
  }),
  qz = I("ZodCIDRv4", (e, r) => {
    i9.init(e, r), Ke.init(e, r);
  }),
  Yz = I("ZodCIDRv6", (e, r) => {
    l9.init(e, r), Ke.init(e, r);
  }),
  Gz = I("ZodBase64", (e, r) => {
    s9.init(e, r), Ke.init(e, r);
  }),
  Fz = I("ZodBase64URL", (e, r) => {
    c9.init(e, r), Ke.init(e, r);
  }),
  Qz = I("ZodE164", (e, r) => {
    f9.init(e, r), Ke.init(e, r);
  }),
  Xz = I("ZodJWT", (e, r) => {
    h9.init(e, r), Ke.init(e, r);
  }),
  Kz = I("ZodUnknown", (e, r) => {
    p9.init(e, r), bt.init(e, r);
  });
function b0() {
  return oz(Kz);
}
const Iz = I("ZodNever", (e, r) => {
  m9.init(e, r), bt.init(e, r);
});
function Wz(e) {
  return iz(Iz, e);
}
const Jz = I("ZodArray", (e, r) => {
  g9.init(e, r),
    bt.init(e, r),
    (e.element = r.element),
    (e.min = (a, i) => e.check(pu(a, i))),
    (e.nonempty = (a) => e.check(pu(1, a))),
    (e.max = (a, i) => e.check(H1(a, i))),
    (e.length = (a, i) => e.check(B1(a, i))),
    (e.unwrap = () => e.element);
});
function Zd(e, r) {
  return yz(Jz, e, r);
}
const eO = I("ZodObject", (e, r) => {
  y9.init(e, r),
    bt.init(e, r),
    Ze(e, "shape", () => r.shape),
    (e.keyof = () => oO(Object.keys(e._zod.def.shape))),
    (e.catchall = (a) => e.clone({ ...e._zod.def, catchall: a })),
    (e.passthrough = () => e.clone({ ...e._zod.def, catchall: b0() })),
    (e.loose = () => e.clone({ ...e._zod.def, catchall: b0() })),
    (e.strict = () => e.clone({ ...e._zod.def, catchall: Wz() })),
    (e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
    (e.extend = (a) => IA(e, a)),
    (e.merge = (a) => WA(e, a)),
    (e.pick = (a) => XA(e, a)),
    (e.omit = (a) => KA(e, a)),
    (e.partial = (...a) => JA(Z1, e, a[0])),
    (e.required = (...a) => e3(V1, e, a[0]));
});
function No(e, r) {
  const a = {
    type: "object",
    get shape() {
      return Jh(this, "shape", { ...e }), this.shape;
    },
    ...xe(r),
  };
  return new eO(a);
}
const tO = I("ZodUnion", (e, r) => {
  v9.init(e, r), bt.init(e, r), (e.options = r.options);
});
function nO(e, r) {
  return new tO({ type: "union", options: e, ...xe(r) });
}
const rO = I("ZodIntersection", (e, r) => {
  b9.init(e, r), bt.init(e, r);
});
function aO(e, r) {
  return new rO({ type: "intersection", left: e, right: r });
}
const Vd = I("ZodEnum", (e, r) => {
  S9.init(e, r),
    bt.init(e, r),
    (e.enum = r.entries),
    (e.options = Object.values(r.entries));
  const a = new Set(Object.keys(r.entries));
  (e.extract = (i, s) => {
    const u = {};
    for (const f of i)
      if (a.has(f)) u[f] = r.entries[f];
      else throw new Error(`Key ${f} not found in enum`);
    return new Vd({ ...r, checks: [], ...xe(s), entries: u });
  }),
    (e.exclude = (i, s) => {
      const u = { ...r.entries };
      for (const f of i)
        if (a.has(f)) delete u[f];
        else throw new Error(`Key ${f} not found in enum`);
      return new Vd({ ...r, checks: [], ...xe(s), entries: u });
    });
});
function oO(e, r) {
  const a = Array.isArray(e) ? Object.fromEntries(e.map((i) => [i, i])) : e;
  return new Vd({ type: "enum", entries: a, ...xe(r) });
}
const iO = I("ZodTransform", (e, r) => {
  x9.init(e, r),
    bt.init(e, r),
    (e._zod.parse = (a, i) => {
      a.addIssue = (u) => {
        if (typeof u == "string") a.issues.push(ul(u, a.value, r));
        else {
          const f = u;
          f.fatal && (f.continue = !1),
            f.code ?? (f.code = "custom"),
            f.input ?? (f.input = a.value),
            f.inst ?? (f.inst = e),
            f.continue ?? (f.continue = !0),
            a.issues.push(ul(f));
        }
      };
      const s = r.transform(a.value, a);
      return s instanceof Promise
        ? s.then((u) => ((a.value = u), a))
        : ((a.value = s), a);
    });
});
function lO(e) {
  return new iO({ type: "transform", transform: e });
}
const Z1 = I("ZodOptional", (e, r) => {
  w9.init(e, r), bt.init(e, r), (e.unwrap = () => e._zod.def.innerType);
});
function S0(e) {
  return new Z1({ type: "optional", innerType: e });
}
const sO = I("ZodNullable", (e, r) => {
  C9.init(e, r), bt.init(e, r), (e.unwrap = () => e._zod.def.innerType);
});
function x0(e) {
  return new sO({ type: "nullable", innerType: e });
}
const uO = I("ZodDefault", (e, r) => {
  E9.init(e, r),
    bt.init(e, r),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap);
});
function cO(e, r) {
  return new uO({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof r == "function" ? r() : r;
    },
  });
}
const fO = I("ZodPrefault", (e, r) => {
  _9.init(e, r), bt.init(e, r), (e.unwrap = () => e._zod.def.innerType);
});
function dO(e, r) {
  return new fO({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof r == "function" ? r() : r;
    },
  });
}
const V1 = I("ZodNonOptional", (e, r) => {
  R9.init(e, r), bt.init(e, r), (e.unwrap = () => e._zod.def.innerType);
});
function hO(e, r) {
  return new V1({ type: "nonoptional", innerType: e, ...xe(r) });
}
const pO = I("ZodCatch", (e, r) => {
  T9.init(e, r),
    bt.init(e, r),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap);
});
function mO(e, r) {
  return new pO({
    type: "catch",
    innerType: e,
    catchValue: typeof r == "function" ? r : () => r,
  });
}
const gO = I("ZodPipe", (e, r) => {
  A9.init(e, r), bt.init(e, r), (e.in = r.in), (e.out = r.out);
});
function w0(e, r) {
  return new gO({ type: "pipe", in: e, out: r });
}
const yO = I("ZodReadonly", (e, r) => {
  z9.init(e, r), bt.init(e, r);
});
function vO(e) {
  return new yO({ type: "readonly", innerType: e });
}
const bO = I("ZodCustom", (e, r) => {
  O9.init(e, r), bt.init(e, r);
});
function SO(e) {
  const r = new or({ check: "custom" });
  return (r._zod.check = e), r;
}
function xO(e, r = {}) {
  return vz(bO, e, r);
}
function wO(e) {
  const r = SO(
    (a) => (
      (a.addIssue = (i) => {
        if (typeof i == "string") a.issues.push(ul(i, a.value, r._zod.def));
        else {
          const s = i;
          s.fatal && (s.continue = !1),
            s.code ?? (s.code = "custom"),
            s.input ?? (s.input = a.value),
            s.inst ?? (s.inst = r),
            s.continue ?? (s.continue = !r._zod.def.abort),
            a.issues.push(ul(s));
        }
      }),
      e(a.value, a)
    ),
  );
  return r;
}
const CO = No({ login: Dt().min(6), password: Dt().min(6) }),
  EO = (e) => {
    const r = Lu({
      initialValues: { login: "", password: "" },
      validate: Bu(CO),
    });
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Mt, { children: "Login" }),
        v.jsx(Jr, {
          withBorder: !0,
          shadow: "md",
          p: 30,
          mt: 30,
          radius: "md",
          children: v.jsxs("form", {
            onSubmit: r.onSubmit(e.onSubmit),
            children: [
              v.jsx(_a, {
                label: "Login",
                placeholder: "you@example.com",
                required: !0,
                ...r.getInputProps("login"),
              }),
              v.jsx(_l, {
                label: "Password",
                placeholder: "Password",
                mt: "md",
                required: !0,
                ...r.getInputProps("password"),
              }),
              v.jsx($t, {
                fullWidth: !0,
                mt: "xl",
                size: "lg",
                type: "submit",
                children: "Sign in",
              }),
            ],
          }),
        }),
      ],
    });
  };
var _O = { input: "m_468e7eda" };
const RO = {},
  Mo = Se((e, r) => {
    const a = ae("TimeInput", RO, e),
      {
        classNames: i,
        styles: s,
        unstyled: u,
        vars: f,
        withSeconds: h,
        minTime: p,
        maxTime: m,
        value: g,
        onChange: y,
        step: S,
        ...w
      } = a,
      { resolvedClassNames: E, resolvedStyles: T } = Uo({
        classNames: i,
        styles: s,
        props: a,
      }),
      R = (j) => {
        if (p !== void 0 || m !== void 0) {
          const [A, D, U] = j.split(":").map(Number);
          if (p) {
            const [k, Z, V] = p.split(":").map(Number);
            if (
              A < k ||
              (A === k && D < Z) ||
              (h && A === k && D === Z && U < V)
            )
              return -1;
          }
          if (m) {
            const [k, Z, V] = m.split(":").map(Number);
            if (
              A > k ||
              (A === k && D > Z) ||
              (h && A === k && D === Z && U > V)
            )
              return 1;
          }
        }
        return 0;
      },
      _ = (j) => {
        if ((a.onBlur?.(j), p !== void 0 || m !== void 0)) {
          const A = j.currentTarget.value;
          if (A) {
            const D = R(A);
            D === 1
              ? (m && (j.currentTarget.value = m), a.onChange?.(j))
              : D === -1 && (p && (j.currentTarget.value = p), a.onChange?.(j));
          }
        }
      };
    return v.jsx(It, {
      classNames: { ...E, input: Pn(_O.input, E?.input) },
      styles: T,
      unstyled: u,
      ref: r,
      value: g,
      step: S ?? (h ? 1 : 60),
      ...w,
      onChange: y,
      onBlur: _,
      type: "time",
      __staticSelector: "TimeInput",
    });
  });
Mo.classes = It.classes;
Mo.displayName = "@mantine/dates/TimeInput";
const TO = No({
    name: Dt().nonempty(),
    description: Dt().optional(),
    workingDays: Zd(Dt()).nonempty(),
    workingHours: Zd(No({ start: Dt().min(1), end: Dt().min(1) })).nonempty(),
    login: Dt().min(6),
    password: Dt().min(6),
  }),
  q1 = (e) => {
    const { item: r } = e,
      [a, i] = x.useState(null),
      s = !!r,
      u = Lu({
        initialValues: {
          avatar: r?.avatar ?? null,
          name: r?.name ?? "",
          description: r?.description ?? "",
          workingDays: r?.workingDays ?? [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          workingHours: r?.workingHours ?? [
            { start: "09:00", end: "13:00" },
            { start: "14:00", end: "18:00" },
          ],
          ...(s ? {} : { login: "", password: "" }),
        },
        validate: Bu(TO),
      }),
      f = (p) => {
        console.log("Form submitted:", p);
      },
      h = (p) => {
        if ((u.setFieldValue("avatar", p), p)) {
          const m = new FileReader();
          (m.onload = () => i(m.result)), m.readAsDataURL(p);
        } else i(null);
      };
    return v.jsxs(v.Fragment, {
      children: [
        v.jsxs(Mt, {
          mb: "md",
          children: [s ? "Edit" : "Create New", " Host"],
        }),
        v.jsx(Jr, {
          withBorder: !0,
          shadow: "sm",
          p: "lg",
          radius: "md",
          children: v.jsx("form", {
            onSubmit: u.onSubmit(f),
            children: v.jsxs(Zn, {
              children: [
                v.jsx(Cl, { src: a, size: 80, radius: "xl" }),
                v.jsx(aT, {
                  label: "Avatar",
                  placeholder: "Upload avatar",
                  accept: "image/*",
                  onChange: h,
                }),
                v.jsx(_a, {
                  label: "Name",
                  placeholder: "John Doe",
                  withAsterisk: !0,
                  ...u.getInputProps("name"),
                }),
                v.jsx(qh, {
                  label: "Description",
                  placeholder: "Brief description...",
                  autosize: !0,
                  minRows: 2,
                  ...u.getInputProps("description"),
                }),
                v.jsx(Qh, {
                  label: "Working Days",
                  placeholder: "Select working days",
                  data: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  searchable: !0,
                  clearable: !0,
                  withAsterisk: !0,
                  ...u.getInputProps("workingDays"),
                }),
                u.values.workingHours.map((p, m) =>
                  v.jsxs(
                    xl,
                    {
                      children: [
                        v.jsx(Mo, {
                          flex: 1,
                          label: "Start Time",
                          value: u.values.workingHours[m].start,
                          onChange: (g) =>
                            u.setFieldValue(
                              `workingHours.${m}.start`,
                              g.target.value,
                            ),
                          required: !0,
                        }),
                        v.jsx(Mo, {
                          flex: 1,
                          label: "End Time",
                          value: u.values.workingHours[m].end,
                          onChange: (g) =>
                            u.setFieldValue(
                              `workingHours.${m}.end`,
                              g.target.value,
                            ),
                          required: !0,
                        }),
                        v.jsx(Nn, {
                          size: "lg",
                          variant: "default",
                          style: { alignSelf: "end" },
                          onClick: () => {
                            const g = u.getValues().workingHours;
                            g.splice(m, 1), u.setFieldValue("workingHours", g);
                          },
                          children: v.jsx(_1, { stroke: 1.5, color: "red" }),
                        }),
                      ],
                    },
                    m,
                  ),
                ),
                v.jsx($t, {
                  variant: "light",
                  onClick: () =>
                    u.setFieldValue("workingHours", [
                      ...u.values.workingHours,
                      { start: "", end: "" },
                    ]),
                  children: "+ Add Working Hours",
                }),
                !s &&
                  v.jsxs(v.Fragment, {
                    children: [
                      v.jsx(_a, {
                        label: "Login",
                        placeholder: "Login",
                        withAsterisk: !0,
                        ...u.getInputProps("login"),
                      }),
                      v.jsx(_l, {
                        label: "Password",
                        placeholder: "••••••••",
                        withAsterisk: !0,
                        ...u.getInputProps("password"),
                      }),
                    ],
                  }),
                v.jsxs($t, {
                  type: "submit",
                  fullWidth: !0,
                  mt: "md",
                  children: [s ? "Edit" : "Create New", " Host"],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  AO = No({ name: Dt().nonempty(), login: Dt().min(6), password: Dt().min(6) }),
  Y1 = (e) => {
    const { item: r } = e,
      a = !!r,
      i = Lu({
        initialValues: {
          name: r?.name ?? "",
          ...(a ? {} : { login: "", password: "" }),
        },
        validate: Bu(AO),
      }),
      s = (u) => {
        console.log("Form submitted:", u);
      };
    return v.jsxs(v.Fragment, {
      children: [
        v.jsxs(Mt, {
          mb: "md",
          children: [a ? "Edit" : "Create New", " Client"],
        }),
        v.jsx(Jr, {
          withBorder: !0,
          shadow: "sm",
          p: "lg",
          radius: "md",
          children: v.jsx("form", {
            onSubmit: i.onSubmit(s),
            children: v.jsxs(Zn, {
              children: [
                v.jsx(_a, {
                  label: "Name",
                  placeholder: "John Doe",
                  withAsterisk: !0,
                  ...i.getInputProps("name"),
                }),
                !a &&
                  v.jsxs(v.Fragment, {
                    children: [
                      v.jsx(_a, {
                        label: "Login",
                        placeholder: "Login",
                        withAsterisk: !0,
                        ...i.getInputProps("login"),
                      }),
                      v.jsx(_l, {
                        label: "Password",
                        placeholder: "••••••••",
                        withAsterisk: !0,
                        ...i.getInputProps("password"),
                      }),
                    ],
                  }),
                v.jsxs($t, {
                  type: "submit",
                  fullWidth: !0,
                  mt: "md",
                  children: [a ? "Edit" : "Create New", " Client"],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  zO = No({
    clientId: Dt().nonempty(),
    hsotId: Dt().nonempty(),
    timeSlot: No({ start: Dt().min(1), end: Dt().min(1) }),
  }),
  C0 = (e) => {
    const {
        label: r,
        placeholder: a,
        withAsterisk: i,
        value: s,
        fetchFn: u,
        onChange: f,
      } = e,
      [h, p] = x.useState(!1),
      [m, g] = x.useState([]),
      y = kh({ onDropdownClose: () => y.resetSelectedOption() });
    x.useEffect(() => {
      p(!0),
        u().then((E) => {
          g(E), p(!1);
        });
    }, [u]);
    const S = m.map((E) =>
        v.jsx(ze.Option, { value: E.value, children: E.label }, E.value),
      ),
      w = m.find((E) => E.value === s)?.label;
    return v.jsxs(ze, {
      store: y,
      withinPortal: !1,
      onOptionSubmit: (E) => {
        f && f(E), y.closeDropdown();
      },
      children: [
        v.jsx(ze.Target, {
          children: v.jsx(It, {
            label: r,
            component: "button",
            type: "button",
            pointer: !0,
            rightSection: h ? v.jsx(Zo, { size: 18 }) : v.jsx(ze.Chevron, {}),
            onClick: () => y.toggleDropdown(),
            rightSectionPointerEvents: "none",
            withAsterisk: i,
            children: w || v.jsx(vt.Placeholder, { children: a }),
          }),
        }),
        v.jsx(ze.Dropdown, {
          children: v.jsx(ze.Options, {
            children: h ? v.jsx(ze.Empty, { children: "Loading...." }) : S,
          }),
        }),
      ],
    });
  },
  OO = async () => [
    { value: "fu039jf39", label: "Client1" },
    { value: "ffu390jf", label: "Client2" },
    { value: "fu2234", label: "Client3" },
  ],
  jO = async () => [
    { value: "ogkrjf39", label: "Host1" },
    { value: "fjjv390jf", label: "Host2" },
    { value: "fr822234", label: "Host3" },
  ],
  G1 = (e) => {
    const { item: r } = e,
      a = !!r,
      i = Lu({
        initialValues: {
          clientId: r?.clientId ?? "",
          hostId: r?.hostId ?? "",
          timeSlot: r?.timeSlot ?? { start: "", end: "" },
        },
        validate: Bu(zO),
      }),
      s = (u) => {
        console.log("Form submitted:", u);
      };
    return v.jsxs(v.Fragment, {
      children: [
        v.jsxs(Mt, {
          mb: "md",
          children: [a ? "Edit" : "Create New", " Booking"],
        }),
        v.jsx(Jr, {
          withBorder: !0,
          shadow: "sm",
          p: "lg",
          radius: "md",
          children: v.jsx("form", {
            onSubmit: i.onSubmit(s),
            children: v.jsxs(Zn, {
              children: [
                v.jsx(C0, {
                  label: "Client",
                  placeholder: "Client",
                  withAsterisk: !0,
                  value: i.values.clientId,
                  onChange: (u) => {
                    i.setFieldValue("clientId", u);
                  },
                  fetchFn: OO,
                }),
                v.jsx(C0, {
                  label: "Host",
                  placeholder: "Host",
                  withAsterisk: !0,
                  value: i.values.hostId,
                  onChange: (u) => {
                    i.setFieldValue("hostId", u);
                  },
                  fetchFn: jO,
                }),
                v.jsxs(xl, {
                  children: [
                    v.jsx(Mo, {
                      flex: 1,
                      label: "Start Time",
                      value: i.values.timeSlot.start,
                      onChange: (u) =>
                        i.setFieldValue("timeSlot.start", u.target.value),
                      required: !0,
                    }),
                    v.jsx(Mo, {
                      flex: 1,
                      label: "End Time",
                      value: i.values.timeSlot.end,
                      onChange: (u) =>
                        i.setFieldValue("timeSlot.end", u.target.value),
                      required: !0,
                    }),
                  ],
                }),
                v.jsxs($t, {
                  type: "submit",
                  fullWidth: !0,
                  mt: "md",
                  children: [a ? "Edit" : "Create New", " Booking"],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  Ro = (e) => {
    const {
        icon: r,
        title: a,
        description: i,
        onDeleteClick: s,
        deleteIcon: u,
        onDetailsClick: f,
        detailsIcon: h,
      } = e,
      p = sn();
    return v.jsx(El, {
      withBorder: !0,
      shadow: p.shadows.sm,
      children: v.jsxs(xl, {
        align: "center",
        children: [
          !!r &&
            v.jsx(Nn, {
              variant: "subtle",
              size: "xl",
              style: { pointerEvents: "none" },
              children: r,
            }),
          v.jsxs(Zn, { flex: 1, children: [a, i] }),
          !!s &&
            v.jsx(Nn, {
              size: "xl",
              variant: "default",
              onClick: s,
              children: u || v.jsx(_1, { stroke: 1.5, color: "red" }),
            }),
          !!f &&
            v.jsx(Nn, {
              size: "xl",
              onClick: f,
              children: h || v.jsx(CA, { stroke: 1.5 }),
            }),
        ],
      }),
    });
  },
  Vn = (e) => {
    const { children: r, onBack: a } = e;
    return v.jsx(Ph, {
      opened: !0,
      display: "none",
      children: v.jsx(Du, {
        position: { bottom: 32, left: "50%" },
        style: { transform: "translate(-50%, 0)" },
        children: v.jsxs(ar, {
          w: "100vw",
          px: "md",
          align: "center",
          children: [
            !!a &&
              v.jsx(Nn, {
                size: "xl",
                radius: "xl",
                onClick: a,
                children: v.jsx(wA, {}),
              }),
            r,
          ],
        }),
      }),
    });
  };
x.createContext(null);
const DO = "http://localhost:3000";
async function NO({
  url: e,
  method: r,
  body: a,
  headers: i,
  pathParams: s,
  queryParams: u,
  signal: f,
}) {
  let h;
  try {
    const p = { "Content-Type": "application/json", ...i };
    p["Content-Type"]?.toLowerCase().includes("multipart/form-data") &&
      delete p["Content-Type"];
    const m = await window.fetch(`${DO}${MO(e, u, s)}`, {
      signal: f,
      method: r.toUpperCase(),
      body: a ? (a instanceof FormData ? a : JSON.stringify(a)) : void 0,
      headers: p,
    });
    if (m.ok)
      return m.headers.get("content-type")?.includes("json")
        ? await m.json()
        : await m.blob();
    try {
      h = await m.json();
    } catch (g) {
      h = {
        status: "unknown",
        payload:
          g instanceof Error
            ? `Unexpected error (${g.message})`
            : "Unexpected error",
      };
    }
  } catch (p) {
    throw {
      name: "unknown",
      message:
        p instanceof Error ? `Network error (${p.message})` : "Network error",
      stack: p,
    };
  }
  throw h;
}
const MO = (e, r = {}, a = {}) => {
    let i = new URLSearchParams(r).toString();
    return (
      i && (i = `?${i}`),
      e.replace(/\{\w*\}/g, (s) => a[s.slice(1, -1)] ?? "") + i
    );
  },
  $O = (e, r) => NO({ url: "/auth/login", method: "post", ...e, signal: r }),
  kO = { auth: { authLogin: $O } },
  F1 = x.createContext(null),
  LO = ({ children: e }) => {
    const r = kt(),
      [a, i] = x.useState(null),
      s = vA({ mutationFn: kO.auth.authLogin }),
      u = async (f, h) => {
        await s.mutateAsync(
          { body: { login: f, password: h } },
          {
            onSuccess: (p) => {
              i(p.accessToken), r("/");
            },
          },
        );
      };
    return v.jsx(F1.Provider, {
      value: { accessToken: a, login: u },
      children: e,
    });
  },
  Q1 = () => {
    const e = x.useContext(F1);
    if (!e) throw new Error("Outside of Auth context");
    return e;
  },
  UO = () => {
    const { accessToken: e } = Q1();
    return e ? v.jsx(i2, {}) : v.jsx(o2, { to: "/login", replace: !0 });
  },
  HO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/create");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(R1, {
              title: "Nearest bookings",
              actionText: "See All",
              children: v.jsx(RA, {
                id: "12",
                name: "Name",
                description: "Description",
                date: "14.07.2025",
                time: "18:00",
              }),
            }),
          }),
        }),
        v.jsx(Vn, {
          children: v.jsx($t, {
            size: "lg",
            fullWidth: !0,
            px: "48px",
            onClick: r,
            children: "New Booking",
          }),
        }),
      ],
    });
  },
  BO = () => 123,
  PO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(R1, { title: "Booking Details" }),
          }),
        }),
        v.jsx(Vn, {
          onBack: r,
          children: v.jsxs(ar, {
            flex: 1,
            justify: "center",
            children: [
              v.jsx($t, {
                size: "lg",
                px: "28px",
                mr: "md",
                children: "Cancel",
              }),
              v.jsx($t, { size: "lg", px: "28px", children: "Reshedule" }),
            ],
          }),
        }),
      ],
    });
  },
  ZO = () => {
    const { login: e } = Q1(),
      r = (a) => {
        const { login: i, password: s } = a;
        e(i, s);
      };
    return v.jsx(Vt, {
      h: "100vh",
      children: v.jsx(qt, {
        maw: 640,
        w: "100%",
        mb: "64px",
        children: v.jsx(EO, { onSubmit: r }),
      }),
    });
  },
  VO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/hosts");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(q1, {}),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  qO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/hosts");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(q1, {
              item: {
                name: "Host",
                description: "Some Host Description",
                workingDays: ["Monday", "Tuesday", "Wednesday"],
                workingHours: [
                  { start: "09:00", end: "13:00" },
                  { start: "14:00", end: "18:00" },
                ],
              },
            }),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  YO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/clients");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(Y1, {}),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  GO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/clients");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(Y1, { item: { name: "Client" } }),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  FO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/bookings");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(G1, {}),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  QO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/bookings");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsx(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: v.jsx(G1, {
              item: {
                clientId: "fu039jf39",
                hostId: "ogkrjf39",
                timeSlot: { start: "09:00", end: "13:00" },
              },
            }),
          }),
        }),
        v.jsx(Vn, { onBack: r }),
      ],
    });
  },
  XO = () => {
    const e = kt(),
      r = () => {
        e("/admin/clients");
      },
      a = () => {
        e("/admin/hosts");
      },
      i = () => {
        e("/admin/bookings");
      };
    return v.jsx(Vt, {
      h: "100vh",
      children: v.jsxs(qt, {
        maw: 640,
        w: "100%",
        mb: "64px",
        children: [
          v.jsx(Mt, { mb: "md", children: "Dashboard" }),
          v.jsxs(Zn, {
            children: [
              v.jsx(Ro, {
                icon: v.jsx(EA, {}),
                title: v.jsx(Mt, { order: 4, children: "Clients" }),
                onDetailsClick: r,
                detailsIcon: v.jsx(au, {}),
              }),
              v.jsx(Ro, {
                icon: v.jsx(SA, {}),
                title: v.jsx(Mt, { order: 4, children: "Hosts" }),
                onDetailsClick: a,
                detailsIcon: v.jsx(au, {}),
              }),
              v.jsx(Ro, {
                icon: v.jsx(xA, {}),
                title: v.jsx(Mt, { order: 4, children: "Bookings" }),
                onDetailsClick: i,
                detailsIcon: v.jsx(au, {}),
              }),
            ],
          }),
        ],
      }),
    });
  },
  op = (e, r = 20) => (e.length > r ? e.slice(0, r) + "…" : e),
  KO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/clients/edit");
      }, [e]),
      a = () => {},
      i = x.useCallback(() => {
        e("/admin");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsxs(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: [
              v.jsx(Mt, { mb: "md", children: "Clients" }),
              v.jsx(Zn, {
                children: v.jsx(Ro, {
                  title: v.jsx(Mt, {
                    order: 4,
                    children: op("SomeClientNickname"),
                  }),
                  onDeleteClick: a,
                  onDetailsClick: r,
                }),
              }),
            ],
          }),
        }),
        v.jsx(Vn, {
          onBack: i,
          children: v.jsx(ar, {
            flex: 1,
            justify: "center",
            children: v.jsx($t, {
              size: "lg",
              px: "48px",
              children: "Create New Client",
            }),
          }),
        }),
      ],
    });
  },
  IO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/hosts/edit");
      }, [e]),
      a = () => {},
      i = x.useCallback(() => {
        e("/admin");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsxs(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: [
              v.jsx(Mt, { mb: "md", children: "Hosts" }),
              v.jsx(Zn, {
                children: v.jsx(Ro, {
                  title: v.jsx(Mt, { order: 4, children: op("Host1") }),
                  onDeleteClick: a,
                  onDetailsClick: r,
                }),
              }),
            ],
          }),
        }),
        v.jsx(Vn, {
          onBack: i,
          children: v.jsx(ar, {
            flex: 1,
            justify: "center",
            children: v.jsx($t, {
              size: "lg",
              px: "48px",
              children: "Create New Host",
            }),
          }),
        }),
      ],
    });
  },
  WO = () => {
    const e = kt(),
      r = x.useCallback(() => {
        e("/admin/bookings/edit");
      }, [e]),
      a = () => {},
      i = x.useCallback(() => {
        e("/admin");
      }, [e]);
    return v.jsxs(v.Fragment, {
      children: [
        v.jsx(Vt, {
          h: "100vh",
          children: v.jsxs(qt, {
            maw: 640,
            w: "100%",
            mb: "64px",
            children: [
              v.jsx(Mt, { mb: "md", children: "Bookings" }),
              v.jsx(Zn, {
                children: v.jsx(Ro, {
                  title: v.jsx(Mt, { order: 4, children: op("Booking1") }),
                  onDeleteClick: a,
                  onDetailsClick: r,
                }),
              }),
            ],
          }),
        }),
        v.jsx(Vn, {
          onBack: i,
          children: v.jsx(ar, {
            flex: 1,
            justify: "center",
            children: v.jsx($t, {
              size: "lg",
              px: "48px",
              children: "Create New Booking",
            }),
          }),
        }),
      ],
    });
  },
  JO = {},
  e6 = X0(wu, JO),
  t6 = new pA(),
  n6 = () =>
    v.jsx(D2, {
      basename: "/",
      children: v.jsx(yA, {
        client: t6,
        children: v.jsx(J0, {
          theme: e6,
          children: v.jsx(LO, {
            children: v.jsxs(s2, {
              children: [
                v.jsx(jt, { path: "/login", element: v.jsx(ZO, {}) }),
                v.jsxs(jt, {
                  element: v.jsx(UO, {}),
                  children: [
                    v.jsx(jt, { path: "/", element: v.jsx(HO, {}) }),
                    v.jsx(jt, { path: "/create", element: v.jsx(BO, {}) }),
                    v.jsx(jt, { path: "/details", element: v.jsx(PO, {}) }),
                    v.jsx(jt, { path: "/admin/hosts", element: v.jsx(IO, {}) }),
                    v.jsx(jt, {
                      path: "/admin/hosts/create",
                      element: v.jsx(VO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/hosts/edit",
                      element: v.jsx(qO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/clients",
                      element: v.jsx(KO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/clients/create",
                      element: v.jsx(YO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/clients/edit",
                      element: v.jsx(GO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/bookings",
                      element: v.jsx(WO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/bookings/create",
                      element: v.jsx(FO, {}),
                    }),
                    v.jsx(jt, {
                      path: "/admin/bookings/edit",
                      element: v.jsx(QO, {}),
                    }),
                    v.jsx(jt, { path: "/admin", element: v.jsx(XO, {}) }),
                  ],
                }),
              ],
            }),
          }),
        }),
      }),
    });
dw.createRoot(document.getElementById("root")).render(v.jsx(n6, {}));
