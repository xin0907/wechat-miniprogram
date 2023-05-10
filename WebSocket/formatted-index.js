!(function (t) {
	var e = {};

	function n(r) {
		if (e[r]) return e[r].exports;
		var o = (e[r] = {
			i: r,
			l: !1,
			exports: {},
		});
		return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
	}
	(n.m = t),
		(n.c = e),
		(n.d = function (t, e, r) {
			n.o(t, e) ||
				Object.defineProperty(t, e, {
					enumerable: !0,
					get: r,
				});
		}),
		(n.r = function (t) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, {
					value: 'Module',
				}),
				Object.defineProperty(t, '__esModule', {
					value: !0,
				});
		}),
		(n.t = function (t, e) {
			if ((1 & e && (t = n(t)), 8 & e)) return t;
			if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, 'default', {
					enumerable: !0,
					value: t,
				}),
				2 & e && 'string' != typeof t)
			)
				for (var o in t)
					n.d(
						r,
						o,
						function (e) {
							return t[e];
						}.bind(null, o)
					);
			return r;
		}),
		(n.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return n.d(e, 'a', e), e;
		}),
		(n.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(n.p = ''),
		n((n.s = 155));
})([
	function (t, e) {
		var n = Object.prototype.toString;
		(e = function (t) {
			return n.call(t);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(14);
		(e = Object.keys
			? Object.keys
			: function (t) {
					var e = [];
					for (var n in t) r(t, n) && e.push(n);
					return e;
			  }),
			(t.exports = e);
	},
	,
	// websocket
	function (t, e, n) {
		'use strict';
		const r = window.navigator || window.__global.navigator,
			o = window.WebSocket || window.__global.WebSocket,
			i = window.prompt || window.__global.prompt,
			s = r.userAgent.match(/port\/(\d*)/),
			a = s ? parseInt(s[1]) : 9974,
			c = 'ws://127.0.0.1:' + a;
		window.__maxConnectTryTime = 10;
		t.exports = class {
			constructor(t, e = !0) {
				(this._protocol = t),
					(this._needToken = e),
					(this._ws = null),
					(this._msgQueue = []),
					(this._callback = new Set()),
					(this._parseJson = null),
					(this.tryTime = 0),
					'complete' === document.readyState
						? setTimeout(() => {
								this.connect();
						  })
						: window.addEventListener('load', () => {
								this.connect();
						  });
			}
			connect() {
				if (!a) return;
				if (
					(this.tryTime++, this.tryTime >= window.__maxConnectTryTime)
				)
					return void console.error(
						'当前应用通道断开且重连次数已满，请重新编译应用'
					);
				let t = this._protocol;
				if (this._needToken) {
					t = `${t}#${i('GET_MESSAGE_TOKEN')}#`;
				}
				(this._ws = new o(c, t)),
					(this._ws.onopen = () => {
						const t = [].concat(this._msgQueue);
						(this._msgQueue = []),
							t.forEach(t => {
								this.send(t);
							});
					}),
					(this._ws.onclose = () => {
						(this._ws = null),
							setTimeout(() => {
								this.connect();
							}, 150);
					}),
					(this._ws.onmessage = t => {
						try {
							const e = this._parseJson
								? this._parseJson(t.data)
								: JSON.parse(t.data);
							this._callback.forEach(t => {
								try {
									t.call(this, e);
								} catch (t) {
									console.error('onmessage', t);
								}
							});
						} catch (t) {
							console.error('onmessage', t);
						}
					});
			}
			send(t) {
				this._ws && this._ws.readyState === o.OPEN
					? this._ws.send(JSON.stringify(t))
					: this._msgQueue.push(t);
			}
			registerCallback(t) {
				'function' == typeof t && this._callback.add(t);
			}
			removeCallback(t) {
				this._callback.delete(t);
			}
		};
	},
	function (t, e, n) {
		var r = n(12),
			o = n(1),
			i = n(15);
		(e = function (t, e, n) {
			var s, a;
			if (((e = i(e, n)), r(t)))
				for (s = 0, a = t.length; s < a; s++) e(t[s], s, t);
			else {
				var c = o(t);
				for (s = 0, a = c.length; s < a; s++) e(t[c[s]], c[s], t);
			}
			return t;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(0);
		(e = function (t) {
			var e = r(t);
			return (
				'[object Function]' === e ||
				'[object GeneratorFunction]' === e ||
				'[object AsyncFunction]' === e
			);
		}),
			(t.exports = e);
	},
	,
	function (t, e) {
		(e = function (t) {
			return void 0 === t;
		}),
			(t.exports = e);
	},
	,
	function (t, e, n) {
		var r = n(0);
		(e = Array.isArray
			? Array.isArray
			: function (t) {
					return '[object Array]' === r(t);
			  }),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.setJSONParser =
				e.setPageframeReady =
				e.removeCallback =
				e.registerCallback =
				e.send =
				e.getMessager =
					void 0);
		const r = n(36),
			o = n(3);
		let i,
			s = !1,
			a = [],
			c = !1;
		const u = new Set();
		e.getMessager = () => {
			if (i) return i;
			const t = 'WEBVIEW_' + r.webviewID;
			return (i = new o(t)), i;
		};
		const l = t => {
				u.forEach(e => {
					try {
						e(t);
					} catch (t) {}
				});
			},
			h = t => {
				if (s) l(t);
				else {
					const { command: e } = t;
					switch (e) {
						case 'WEBVIEW_ON_EVENT':
						case 'APPSERVICE_PUBLISH':
						case 'APPSERVICE_PUBLISH_SYNC':
							a.push(t);
							break;
						default:
							l(t);
					}
				}
			};

		function d(t) {
			t.fromWebviewID = r.webviewID;
			e.getMessager().send(t);
		}

		function p(t) {
			if ((u.add(t), !c)) {
				e.getMessager().registerCallback(h), (c = !0);
			}
		}

		function f(t) {
			if ((u.delete(t), !c)) {
				e.getMessager().registerCallback(h), (c = !0);
			}
		}

		function g(t, n) {
			if (s === t) return;
			s = t;
			(e.getMessager()._parseJson = n),
				t && (a.forEach(t => l(t)), (a = []));
		}
		(e.send = d),
			(e.registerCallback = p),
			(e.removeCallback = f),
			(e.setPageframeReady = g),
			(e.setJSONParser = function (t) {
				e.getMessager()._parseJson = t;
			}),
			(e.default = {
				send: d,
				registerCallback: p,
				removeCallback: f,
				setPageframeReady: g,
			});
	},
	,
	function (t, e, n) {
		var r = n(19),
			o = n(5),
			i = Math.pow(2, 53) - 1;
		(e = function (t) {
			if (!t) return !1;
			var e = t.length;
			return r(e) && e >= 0 && e <= i && !o(t);
		}),
			(t.exports = e);
	},
	,
	function (t, e) {
		var n = Object.prototype.hasOwnProperty;
		(e = function (t, e) {
			return n.call(t, e);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(7);
		(e = function (t, e, n) {
			if (r(e)) return t;
			switch (null == n ? 3 : n) {
				case 1:
					return function (n) {
						return t.call(e, n);
					};
				case 3:
					return function (n, r, o) {
						return t.call(e, n, r, o);
					};
				case 4:
					return function (n, r, o, i) {
						return t.call(e, n, r, o, i);
					};
			}
			return function () {
				return t.apply(e, arguments);
			};
		}),
			(t.exports = e);
	},
	,
	function (t, e) {
		(e = function (t) {
			var e = typeof t;
			return !!t && ('function' === e || 'object' === e);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(7),
			o = n(4);
		(e = function (t, e) {
			return function (n) {
				return (
					o(arguments, function (i, s) {
						if (0 !== s) {
							var a = t(i);
							o(a, function (t) {
								(e && !r(n[t])) || (n[t] = i[t]);
							});
						}
					}),
					n
				);
			};
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(0);
		(e = function (t) {
			return '[object Number]' === r(t);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(5),
			o = n(17),
			i = n(9),
			s = n(15),
			a = n(29),
			c = n(21),
			u = n(32);
		(e = function (t, e, n) {
			return null == t
				? c
				: r(t)
				? s(t, e, n)
				: o(t) && !i(t)
				? a(t)
				: u(t);
		}),
			(t.exports = e);
	},
	function (t, e) {
		(e = function (t) {
			return t;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';

		function r(t) {
			return !!t && !!t.getAttribute(e.PAGE_HANDLER_CONTAINER_ATTRIBUTE);
		}

		function o(t) {
			return t ? +t.replace('px', '') : 0;
		}

		function i(t) {
			const { BASE_DEVICE_WIDTH: e, innerWidth: n } = window;
			let r = (t / n) * e;
			return (
				(r = r > 0 ? Math.ceil((t / n) * e) : Math.floor((t / n) * e)),
				r + 'rpx'
			);
		}

		function s(t) {
			const n = `[${e.PAGE_HANDLER_NODE_ATTRIBUTE}="${t}"]`;
			return document.querySelectorAll(n);
		}

		function a(t) {
			return (
				((null == t ? void 0 : t.getAttribute) &&
					t.getAttribute(e.PAGE_HANDLER_NODE_ATTRIBUTE)) ||
				''
			);
		}
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.isEmptyElement =
				e.debounce =
				e.isMac =
				e.getNewCursorArray =
				e.getLeft =
				e.getTop =
				e.getNodeInfo =
				e.getNodeIndex =
				e.getNodeId =
				e.getNodesById =
				e.getNodeById =
				e.numToRpx =
				e.pxToNum =
				e.pxToRpx =
				e.rpxToNum =
				e.getActualTarget =
				e.isPageNode =
				e.PAGE_HANDLER_CONTAINER_ATTRIBUTE =
				e.PAGE_HANDLER_NODE_ATTRIBUTE =
					void 0),
			(e.PAGE_HANDLER_NODE_ATTRIBUTE = 'data-ib-structured-id'),
			(e.PAGE_HANDLER_CONTAINER_ATTRIBUTE = 'data-ib-structured-page'),
			(e.isPageNode = r),
			(e.getActualTarget = function (t) {
				if (!(null == t ? void 0 : t.getAttribute)) return null;
				if (r(t)) return null;
				for (; !t.getAttribute(e.PAGE_HANDLER_NODE_ATTRIBUTE); )
					if (!(t = t.parentElement) || !t.getAttribute) return null;
				return t;
			}),
			(e.rpxToNum = function (t) {
				if (!t) return 0;
				const { BASE_DEVICE_WIDTH: e, innerWidth: n } = window,
					r = +t.replace('rpx', '');
				return Math.floor(n / e) * r;
			}),
			(e.pxToRpx = function (t) {
				return i(o(t));
			}),
			(e.pxToNum = o),
			(e.numToRpx = i),
			(e.getNodeById = function (t) {
				const n = `[${e.PAGE_HANDLER_NODE_ATTRIBUTE}="${t}"]`;
				return document.querySelector(n);
			}),
			(e.getNodesById = s),
			(e.getNodeId = a),
			(e.getNodeIndex = function (t, e) {
				const n = s(t);
				return [].indexOf.call(n, e);
			}),
			(e.getNodeInfo = function (t) {
				if (!t || !t.getBoundingClientRect) return null;
				const e = t.tagName.toLocaleLowerCase();
				let n = t.getBoundingClientRect();
				if ('wx-image' === e) {
					const e = t.querySelector('div');
					e && (n = e.getBoundingClientRect());
				}
				if ('body' === e) {
					const t = document.querySelector('html');
					t && (n = t.getBoundingClientRect());
				}
				return (
					(null == t
						? void 0
						: t.getAttribute('exparser:info-custom-component')) &&
						0 === n.width &&
						0 === n.height &&
						1 === t.childElementCount &&
						t.firstElementChild &&
						(n = t.firstElementChild.getBoundingClientRect()),
					{
						nodeId: a(t) || '',
						width: n.width,
						height: n.height,
						left: n.left + window.scrollX,
						top: n.top + window.scrollY,
						clientRects: n,
					}
				);
			}),
			(e.getTop = function t(e) {
				let n = e.offsetTop;
				return null != e.offsetParent && (n += t(e.offsetParent)), n;
			}),
			(e.getLeft = function t(e) {
				let n = e.offsetLeft;
				return null != e.offsetParent && (n += t(e.offsetParent)), n;
			}),
			(e.getNewCursorArray = function (t) {
				const e = [
					'ns-resize',
					'nesw-resize',
					'ew-resize',
					'nwse-resize',
					'ns-resize',
					'nesw-resize',
					'ew-resize',
					'nwse-resize',
				];
				let n = 0;
				if (
					(t && ((n = Math.floor(t / 45)), t % 45 > 22.5 && (n += 1)),
					n > 1)
				) {
					const t = 8 - n;
					return e.slice(n, n + t).concat(e.slice(0, n));
				}
				return e;
			}),
			(e.isMac = function () {
				return 0 === navigator.platform.indexOf('Mac');
			}),
			(e.debounce = function (t, e) {
				let n = null;
				return function () {
					const r = this,
						o = arguments;
					clearTimeout(n),
						(n = setTimeout(() => {
							t.apply(r, o);
						}, e));
				};
			}),
			(e.isEmptyElement = function (t) {
				return (
					[
						'WX-IMAGE',
						'WX-INPUT',
						'WX-ICON',
						'WX-RADIO',
						'WX-TEXTAREA',
					].indexOf(t.tagName) > -1
				);
			});
	},
	function (t, e, n) {
		'use strict';
		var r = Object.prototype.hasOwnProperty,
			o = '~';

		function i() {}

		function s(t, e, n) {
			(this.fn = t), (this.context = e), (this.once = n || !1);
		}

		function a() {
			(this._events = new i()), (this._eventsCount = 0);
		}
		Object.create &&
			((i.prototype = Object.create(null)),
			new i().__proto__ || (o = !1)),
			(a.prototype.eventNames = function () {
				var t,
					e,
					n = [];
				if (0 === this._eventsCount) return n;
				for (e in (t = this._events))
					r.call(t, e) && n.push(o ? e.slice(1) : e);
				return Object.getOwnPropertySymbols
					? n.concat(Object.getOwnPropertySymbols(t))
					: n;
			}),
			(a.prototype.listeners = function (t, e) {
				var n = o ? o + t : t,
					r = this._events[n];
				if (e) return !!r;
				if (!r) return [];
				if (r.fn) return [r.fn];
				for (var i = 0, s = r.length, a = new Array(s); i < s; i++)
					a[i] = r[i].fn;
				return a;
			}),
			(a.prototype.emit = function (t, e, n, r, i, s) {
				var a = o ? o + t : t;
				if (!this._events[a]) return !1;
				var c,
					u,
					l = this._events[a],
					h = arguments.length;
				if (l.fn) {
					switch (
						(l.once && this.removeListener(t, l.fn, void 0, !0), h)
					) {
						case 1:
							return l.fn.call(l.context), !0;
						case 2:
							return l.fn.call(l.context, e), !0;
						case 3:
							return l.fn.call(l.context, e, n), !0;
						case 4:
							return l.fn.call(l.context, e, n, r), !0;
						case 5:
							return l.fn.call(l.context, e, n, r, i), !0;
						case 6:
							return l.fn.call(l.context, e, n, r, i, s), !0;
					}
					for (u = 1, c = new Array(h - 1); u < h; u++)
						c[u - 1] = arguments[u];
					l.fn.apply(l.context, c);
				} else {
					var d,
						p = l.length;
					for (u = 0; u < p; u++)
						switch (
							(l[u].once &&
								this.removeListener(t, l[u].fn, void 0, !0),
							h)
						) {
							case 1:
								l[u].fn.call(l[u].context);
								break;
							case 2:
								l[u].fn.call(l[u].context, e);
								break;
							case 3:
								l[u].fn.call(l[u].context, e, n);
								break;
							case 4:
								l[u].fn.call(l[u].context, e, n, r);
								break;
							default:
								if (!c)
									for (
										d = 1, c = new Array(h - 1);
										d < h;
										d++
									)
										c[d - 1] = arguments[d];
								l[u].fn.apply(l[u].context, c);
						}
				}
				return !0;
			}),
			(a.prototype.on = function (t, e, n) {
				var r = new s(e, n || this),
					i = o ? o + t : t;
				return (
					this._events[i]
						? this._events[i].fn
							? (this._events[i] = [this._events[i], r])
							: this._events[i].push(r)
						: ((this._events[i] = r), this._eventsCount++),
					this
				);
			}),
			(a.prototype.once = function (t, e, n) {
				var r = new s(e, n || this, !0),
					i = o ? o + t : t;
				return (
					this._events[i]
						? this._events[i].fn
							? (this._events[i] = [this._events[i], r])
							: this._events[i].push(r)
						: ((this._events[i] = r), this._eventsCount++),
					this
				);
			}),
			(a.prototype.removeListener = function (t, e, n, r) {
				var s = o ? o + t : t;
				if (!this._events[s]) return this;
				if (!e)
					return (
						0 == --this._eventsCount
							? (this._events = new i())
							: delete this._events[s],
						this
					);
				var a = this._events[s];
				if (a.fn)
					a.fn !== e ||
						(r && !a.once) ||
						(n && a.context !== n) ||
						(0 == --this._eventsCount
							? (this._events = new i())
							: delete this._events[s]);
				else {
					for (var c = 0, u = [], l = a.length; c < l; c++)
						(a[c].fn !== e ||
							(r && !a[c].once) ||
							(n && a[c].context !== n)) &&
							u.push(a[c]);
					u.length
						? (this._events[s] = 1 === u.length ? u[0] : u)
						: 0 == --this._eventsCount
						? (this._events = new i())
						: delete this._events[s];
				}
				return this;
			}),
			(a.prototype.removeAllListeners = function (t) {
				var e;
				return (
					t
						? ((e = o ? o + t : t),
						  this._events[e] &&
								(0 == --this._eventsCount
									? (this._events = new i())
									: delete this._events[e]))
						: ((this._events = new i()), (this._eventsCount = 0)),
					this
				);
			}),
			(a.prototype.off = a.prototype.removeListener),
			(a.prototype.addListener = a.prototype.on),
			(a.prototype.setMaxListeners = function () {
				return this;
			}),
			(a.prefixed = o),
			(a.EventEmitter = a),
			(t.exports = a);
	},
	,
	,
	,
	,
	,
	function (t, e, n) {
		var r = n(30),
			o = n(31);
		(e = function (t) {
			return (
				(t = r({}, t)),
				function (e) {
					return o(e, t);
				}
			);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(1);
		(e = n(18)(r)), (t.exports = e);
	},
	function (t, e, n) {
		var r = n(1);
		(e = function (t, e) {
			var n = r(e),
				o = n.length;
			if (null == t) return !o;
			t = Object(t);
			for (var i = 0; i < o; i++) {
				var s = n[i];
				if (e[s] !== t[s] || !(s in t)) return !1;
			}
			return !0;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(9),
			o = n(33);
		(e = function (t) {
			return r(t)
				? function (e) {
						return o(e, t);
				  }
				: ((e = t),
				  function (t) {
						return null == t ? void 0 : t[e];
				  });
			var e;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(7),
			o = n(34);
		(e = function (t, e) {
			var n;
			for (n = (e = o(e, t)).shift(); !r(n); ) {
				if (null == (t = t[n])) return;
				n = e.shift();
			}
			return t;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(14),
			o = n(9);
		e = function (t, e) {
			if (o(t)) return t;
			if (e && r(e, t)) return [t];
			var n = [];
			return (
				t.replace(i, function (t, e, r, o) {
					n.push(r ? o.replace(s, '$1') : e || t);
				}),
				n
			);
		};
		var i =
				/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
			s = /\\(\\)?/g;
		t.exports = e;
	},
	function (t, e, n) {
		var r = n(0);
		(e = function (t) {
			return '[object String]' === r(t);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.webviewID = void 0);
		const r = navigator.userAgent,
			o = r.indexOf(' devtoolsedit') > 0,
			i = r.indexOf(' appservicedevtools') > 0;
		if (((e.webviewID = ''), o)) e.webviewID = 'devtoolsedit';
		else if (i) e.webviewID = 'appservicedevtools';
		else {
			const t = r.match(/webview\/(\d*)/);
			if (t) {
				const n = parseInt(t[1], 10);
				isNaN(n) || (e.webviewID = n);
			}
		}
	},
	,
	,
	,
	,
	,
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.appEventEmitter = void 0);
		const r = n(23);
		class o extends r.EventEmitter {
			constructor() {
				super(),
					(this.instanceScopeListeners = new Set()),
					(this.instanceScope = () => ({
						on: (t, e) => (
							this.on(t, e),
							this.instanceScopeListeners.add({
								event: t,
								fn: e,
							}),
							this
						),
						once: (t, e) => (
							this.once(t, e),
							this.instanceScopeListeners.add({
								event: t,
								fn: e,
							}),
							this
						),
						off: this.off.bind(this),
					})),
					this.initAutoClean();
			}
			initAutoClean() {
				this.on('RESET_INSTANCE', () => {
					for (const { event: t, fn: e } of this
						.instanceScopeListeners)
						this.off(t, e);
					this.instanceScopeListeners.clear();
				});
			}
		}
		(e.appEventEmitter = new o()), (e.default = e.appEventEmitter);
	},
	function (t, e, n) {
		(e = n(18)(n(44), !0)), (t.exports = e);
	},
	function (t, e, n) {
		var r = n(1),
			o = n(45),
			i = n(46),
			s = Object.getOwnPropertyNames,
			a = Object.getOwnPropertySymbols;
		(e = function (t) {
			var e =
					arguments.length > 1 && void 0 !== arguments[1]
						? arguments[1]
						: {},
				n = e.prototype,
				c = void 0 === n || n,
				u = e.unenumerable,
				l = void 0 !== u && u,
				h = e.symbol,
				d = void 0 !== h && h,
				p = [];
			if ((l || d) && s) {
				var f = r;
				l && s && (f = s);
				do {
					(p = p.concat(f(t))), d && a && (p = p.concat(a(t)));
				} while (c && (t = o(t)) && t !== Object.prototype);
				p = i(p);
			} else if (c) for (var g in t) p.push(g);
			else p = r(t);
			return p;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(17),
			o = n(5),
			i = Object.getPrototypeOf,
			s = {}.constructor;
		(e = function (t) {
			if (r(t)) {
				if (i) return i(t);
				var e = t.__proto__;
				return e || null === e
					? e
					: o(t.constructor)
					? t.constructor.prototype
					: t instanceof s
					? s.prototype
					: void 0;
			}
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(47);

		function o(t, e) {
			return t === e;
		}
		(e = function (t, e) {
			return (
				(e = e || o),
				r(t, function (t, n, r) {
					for (var o = r.length; ++n < o; ) if (e(t, r[n])) return !1;
					return !0;
				})
			);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(20),
			o = n(4);
		(e = function (t, e, n) {
			var i = [];
			return (
				(e = r(e, n)),
				o(t, function (t, n, r) {
					e(t, n, r) && i.push(t);
				}),
				i
			);
		}),
			(t.exports = e);
	},
	,
	,
	,
	,
	,
	,
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.default = {
				Success: 0,
				NoSuchElement: 7,
			});
	},
	function (t, e, n) {
		'use strict';
		t.exports = {
			webview: {
				scroll: 'Driver.scroll',
				getTagName: 'Driver.getTagName',
				getAttribute: 'Driver.getAttribute',
				getLocation: 'Driver.getLocation',
				getSize: 'Driver.getSize',
				getRect: 'Driver.getRect',
				getCssValue: 'Driver.getCssValue',
				getProperty: 'Driver.getProperty',
				elementFromPoint: 'Driver.elementFromPoint',
				getContentSize: 'Driver.getContentSize',
				findElement: 'Driver.findElement',
				findElements: 'Driver.findElements',
				sendKeys: 'Driver.sendKeys',
				focus: 'Driver.focus',
				scrollIntoView: 'Driver.scrollIntoView',
				actionElementFromPoint: 'Driver.actionElementFromPoint',
				tapElement: 'Driver.tapElement',
				longtapElement: 'Driver.longtapElement',
				touchDown: 'Driver.touchDown',
				touchUp: 'Driver.touchUp',
				touchMove: 'Driver.touchMove',
				findShadowRoot: 'Driver.findShadowRoot',
				findElementInWebviewShadowRoot:
					'Driver.findElementInWebviewShadowRoot',
				clickContextMenu: 'Driver.clickContextMenu',
			},
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.PAGE_HANDLER_EVENT = e.SYNC_EVENT_NAME = void 0),
			(e.SYNC_EVENT_NAME = {
				WX_EVENT: 11,
				REQUEST_SAVE: 12,
				COMPONENT_DEF: 21,
				SAVE_STATE: 22,
				RESTORE_STATE: 23,
				LAYOUT_READY: 31,
				SET_DATA_CALLBACK: 32,
				FLOW_SET_DATA: 33,
				FLUSH_BLOCKED: 43,
				FLOW_GROUP: 41,
				FLOW_GROUP_END: 42,
				FLOW_DEPTH: 2,
				FLOW_INITIAL_CREATION: 3,
				FLOW_UPDATE: 6,
				FLOW_DATA_OBSERVER: 8,
				FLOW_APPLY_PROPERTY: 4,
				FLOW_MINIPULATE_CHILD: 7,
				FLOW_CREATE_NODE: 5,
				FLOW_REPEAT: 9,
				FLOW_VIEW_INFO: 63,
				REQUEST_TAB: 51,
				COMPONENT_DEF_TAB: 52,
				FLOW_CREATE_TAB: 53,
				DESTROY_TAB: 54,
				REQUEST_BROADCAST_VIEW_ID: 61,
				RESPONSE_BROADCAST_VIEW_ID: 62,
				BANNING_MAP: 90,
				CALL_METHOD_FROM_WXS: 50,
				RESPONSE_VIEW_INFO: 64,
				FLOW_SET_NODE_ANIMATION_INFO: 100,
				ANIMATION_TRANSITION_END: 101,
				FLOW_CLEAR_NODE_ANIMATION_INFO: 102,
				CLEAR_ANIMATION_COMPLETE: 103,
			}),
			(e.PAGE_HANDLER_EVENT = {
				READY: 'ready',
				SCROLL: 'scroll',
				LEAVE: 'leave',
				SELECT_NODE: 'selectnode',
				UNSELECT_NODE: 'unselectnode',
				HOVER_NODE: 'hovernode',
				UPDATE_RENDER: 'updaterender',
				CONTEXT_MENU: 'contextmenu',
				RESIZING: 'resizing',
				END_RESIZE: 'endresize',
				DRAGGING: 'dragging',
				START_DRAG: 'startdrag',
				INIT_DRAG: 'initdrag',
				END_DRAG: 'engdrag',
				DROP: 'drop',
				END_DROP: 'enddrop',
				ROTATING: 'rotating',
				END_ROTATE: 'endrotate',
				DBL_CLICK: 'dblclick',
				SIZE_CHANGE: 'sizechange',
				UPDATE_STYLE: 'updatestyle',
				MOUSE_DOWN: 'mousedown',
				MOUSE_MOVE: 'mousemove',
				MOUSE_UP: 'mouseup',
				GO_BACK: 'goback',
				GO_AHEAD: 'goahead',
				DELETE_NODE: 'deletenode',
				OUTER_MOUSE_MOVE: 'outerMouseMove',
				OUTER_MOUSE_UP: 'outerMouseUp',
				COPY_NODE: 'copynode',
				CUT_NODE: 'cutnode',
				PASTE_NODE: 'pastenode',
				ACTION_TIPS: 'actiontips',
			});
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.touchEnd =
				e.touchStart =
				e.dispatchTouchEvent =
				e.importStyle =
				e.getElement =
				e.getElementByXpath =
				e.transSelector =
				e.saveTouches =
				e.normalizeTouches =
					void 0);
		const r = n(98),
			o = n(7),
			i = n(99),
			s = n(43),
			a = n(185),
			c = n(4),
			u = n(189);

		function l(t, e) {
			const n = window.scrollY,
				r = window.scrollX;
			return i(
				e,
				e => (
					o(e.pageX) && e.clientX
						? (e.pageX = e.clientX + r)
						: e.pageX && o(e.clientX) && (e.clientX = e.pageX - r),
					o(e.pageY) && e.clientY
						? (e.pageY = e.clientY + n)
						: e.pageY && o(e.clientY) && (e.clientY = e.pageY - n),
					s(e, {
						target: t,
						identifier: 0,
						pageX: 0,
						pageY: 0,
						clientX: 0,
						clientY: 0,
						force: 1,
					}),
					e
				)
			);
		}

		function h(t, e = '') {
			const n = a.parse(t);
			return (
				c(n, t => {
					c(t, t => {
						'tag' === t.type
							? 'page' === t.value
								? (t.value = 'body')
								: (t.value = 'wx-' + t.value)
							: 'class' === t.type && e
							? (t.value = `${e}--${t.value}`)
							: 'id' === t.type &&
							  ((t.type = 'attribute'),
							  (t.value = `${CSS.escape(
									'exparser:info-attr-id'
							  )}="${t.value}"`));
					});
				}),
				a.stringify(n)
			);
		}

		function d(t) {
			let e = null;
			if (t.startsWith('/')) {
				var n = r.default.parse(t);
				console.log('evaluator:', t, n);
				const o = n.evaluate({
					node: document.body,
					isHtml: !0,
				});
				o.size > 0 && (e = o.nodes[0]);
			}
			return e;
		}

		function p(t, e, n) {
			const { touches: r, changedTouches: o } = n,
				i = document.createEvent('Event');
			i.initEvent(t, !0, !0),
				(i.touches = l(e, r)),
				(i.changedTouches = l(e, o)),
				e.dispatchEvent(i);
		}

		function f(t) {
			const e = t.offsetLeft + t.offsetWidth / 2,
				n = t.offsetTop + t.offsetHeight / 2;
			return {
				identifier: 0,
				pageX: e,
				pageY: n,
				clientX: e - window.pageXOffset,
				clientY: n - window.pageYOffset,
			};
		}
		(e.normalizeTouches = l),
			(e.saveTouches = function (t) {
				const e = [
					'clientX',
					'clientY',
					'force',
					'identifier',
					'pageX',
					'pageY',
					'radiusX',
					'radiusY',
					'region',
					'rotationAngle',
					'screenX',
					'screenY',
				];
				return i(t, t => {
					const n = {};
					return (
						e.forEach(e => {
							t[e] && (n[e] = t[e]);
						}),
						n
					);
				});
			}),
			(e.transSelector = h),
			(e.getElementByXpath = d),
			(e.getElement = function (t, e) {
				let n = null;
				const r = t;
				if (t.startsWith('/')) n = d(t);
				else {
					const r = h(t);
					(n = window.document.querySelector(r)),
						n || console.warn('not target', r, e);
				}
				return {
					node: n,
					targetUsed: r,
				};
			}),
			(e.importStyle = function (t) {
				const e = document.createElement('style');
				document.getElementsByTagName('head')[0].appendChild(e),
					e.appendChild(document.createTextNode(t));
			}),
			(e.dispatchTouchEvent = p),
			(e.touchStart = function (t, e = {}) {
				let { touches: n = [], changedTouches: r = [] } = e;
				u(n) && (n = [f(t)]),
					u(r) && (r = [f(t)]),
					p('touchstart', t, {
						touches: n,
						changedTouches: r,
					});
			}),
			(e.touchEnd = function (t, e = {}) {
				const { touches: n = [] } = e;
				let { changedTouches: r = [] } = e;
				u(r) && (r = [f(t)]),
					p('touchend', t, {
						touches: n,
						changedTouches: r,
					});
			});
	},
	,
	,
	,
	,
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Timing = void 0);
		const r = new Set([
				'USERCODE_REQUIRED',
				'PAGEFRAME_GENERATE_FUNC_READY',
			]),
			o = [];
		let i;
		class s {
			constructor(t) {
				(this.records = []),
					(this.countdownRecords = new Set()),
					(this._commonRecordReported = !1),
					(this._pendingReport = []),
					(this.onMutation = t => {
						if (this.countdownRecords.size > 0)
							for (const e of t)
								if (e.addedNodes)
									for (const t of e.addedNodes)
										if (
											t instanceof HTMLScriptElement &&
											t.hasAttribute('countdownid')
										) {
											const e =
												t.getAttribute('countdownid');
											let n;
											for (const t of this
												.countdownRecords)
												if (
													t.countdownid === e &&
													(t.received++,
													t.received >= t.expect)
												) {
													this.addPoint(
														t.name,
														Date.now()
													),
														(n = t);
													break;
												}
											n &&
												this.countdownRecords.delete(n);
										}
					}),
					(this.report = () => {
						clearTimeout(this._reportTimer),
							this._blocked
								? (this._reportTimer = setTimeout(
										this.report,
										5e3
								  ))
								: this._pendingReport.length &&
								  (this._commonRecordReported ||
										(this._pendingReport.unshift(...o),
										(this._commonRecordReported = !0)),
								  i.send({
										command: 'TIMING_REPORT',
										data: this._pendingReport,
										common: this._commonMsg,
								  }),
								  (this._pendingReport = []),
								  (this._reportTimer = setTimeout(
										this.report,
										5e3
								  )));
					}),
					(this.observer = new t.MutationObserver(this.onMutation)),
					this.observer.observe(t.document.head, {
						childList: !0,
					}),
					(this._blocked = t.blocked),
					this.init();
			}
			static setMessager(t) {
				i = t;
			}
			init() {
				setTimeout(this.report, 5e3);
			}
			setBlocked(t) {
				(this._blocked = t), t || this.report();
			}
			addCost(t, e, n, r) {
				const o = {
					type: 'cost',
					name: t,
					start: e,
					end: n,
					cost: n - e,
					opt: r,
				};
				this.records.push(o), this._pendingReport.push(o);
			}
			addPoint(t, e = Date.now()) {
				const n = {
					type: 'point',
					name: t,
					value: e,
				};
				this.records.push(n),
					this._pendingReport.push(n),
					r.has(t) && this.report();
			}
			static addCommonPoint(t, e = Date.now()) {
				o.push({
					type: 'point',
					name: t,
					value: e,
				});
			}
			prepareScriptCountdownReport(t, e, n) {
				this.countdownRecords.add({
					name: t,
					countdownid: e,
					expect: n,
					received: 0,
				});
			}
			setCommonMessage(t) {
				this._commonMsg = t;
			}
		}
		(e.Timing = s), (window.__global.Timing = s);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = navigator.userAgent,
			o = -1 !== r.indexOf('Android'),
			i = -1 !== r.indexOf('iPhone'),
			s = -1 !== r.indexOf('weapp'),
			a = r.match(/webview\/(\d*)/),
			c = a ? parseInt(a[1], 10) : 0;
		e.default = {
			isAndroid: o,
			isiPhone: i,
			webviewID: c,
			isWeapp: s,
		};
	},
    // publish?
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.registerBeforePublish = void 0);
		const r = n(10),
			o = new Map();
		(e.registerBeforePublish = function (t, e) {
			o.set(t, e);
		}),
			(e.default = function (t) {
				return function (e, n) {
					for (const t of o.values()) {
						let r = !0;
						if ((t && (r = t(e, n)), !r)) return;
					}
					r.default.send({
						command: 'WEBVIEW_PUBLISH',
						data: {
							eventName: e,
							data: n,
						},
						common: t,
					});
				};
			});
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10),
			o = n(36),
			i = n(54),
			s = n(55),
			{ webview: a } = s,
			c =
				window.MutationObserver ||
				window.WebKitMutationObserver ||
				window.MozMutationObserver;
		class u {
			constructor() {
				(this.ELEMENTS_INFO = {}),
					(this.ELEMENTS_WEAK_MAP = new WeakMap()),
					(this.getElementId = t => {
						let e = this.ELEMENTS_WEAK_MAP.get(t);
						return (
							e ||
								((e = `${
									o.webviewID
								}_${Math.random()}${Date.now()}`),
								(this.ELEMENTS_INFO[e] = t),
								this.ELEMENTS_WEAK_MAP.set(t, e)),
							e
						);
					}),
					(this.getDOM = t => this.ELEMENTS_INFO[t]),
					(this.removeDOM = t => {
						const e = this.ELEMENTS_WEAK_MAP.get(t);
						return (
							e &&
								(delete this.ELEMENTS_INFO[e],
								this.ELEMENTS_WEAK_MAP.delete(t)),
							e
						);
					});
				new c(t => {
					t.forEach(t => {
						t.removedNodes.length > 0 &&
							t.removedNodes.forEach(t => {
								t && this.removeDOM(t);
							});
					});
				}).observe(document, {
					childList: !0,
				});
			}
		}
		e.default = class {
			constructor() {
				(this.nodeManager = new u()),
					(this.findElement = (t, e) => {
						if ('css selector' === t) {
							const t = document.querySelector(e);
							if (t)
								return {
									status: i.default.Success,
									value: {
										WEBVIEW_ELEMENT:
											this.nodeManager.getElementId(t),
									},
								};
						}
						return {
							status: i.default.NoSuchElement,
							value: {
								message: 'no such element',
							},
						};
					}),
					(this.findElements = (t, e) => {
						if ('css selector' === t) {
							const t = document.querySelectorAll(e),
								n = [];
							return (
								t.forEach(t => {
									n.push(this.nodeManager.getElementId(t));
								}),
								{
									status: i.default.Success,
									value: n,
								}
							);
						}
						return {
							status: i.default.NoSuchElement,
							value: {
								message: 'no such element',
							},
						};
					}),
					(this.scroll = (t, e) => (
						document.documentElement &&
							((document.documentElement.scrollLeft += t),
							(document.documentElement.scrollTop += e)),
						(document.body.scrollLeft += t),
						(document.body.scrollTop += e),
						{
							status: i.default.Success,
						}
					)),
					(this.getTagName = t => {
						const e = this.nodeManager.getDOM(t);
						return e
							? {
									status: i.default.Success,
									value: e.tagName.toLowerCase(),
							  }
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.getCssValue = (t, e) => {
						const n = this.nodeManager.getDOM(t);
						if (!n)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const r = window.getComputedStyle(n);
						return {
							status: i.default.Success,
							value: r[e],
						};
					}),
					(this.getProperty = (t, e) => {
						const n = this.nodeManager.getDOM(t);
						return n
							? {
									status: i.default.Success,
									value: n[e],
							  }
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.getLocation = t => {
						const e = this.nodeManager.getDOM(t);
						if (!e)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const n = e.getBoundingClientRect();
						return {
							status: i.default.Success,
							value: {
								x: n.left,
								y: n.top,
							},
						};
					}),
					(this.getSize = t => {
						const e = this.nodeManager.getDOM(t);
						if (!e)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const n = e.getBoundingClientRect();
						return {
							status: i.default.Success,
							value: {
								width: n.width,
								height: n.height,
							},
						};
					}),
					(this.getRect = t => {
						const e = this.nodeManager.getDOM(t);
						if (!e)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const n = e.getBoundingClientRect();
						let r = e;
						return (
							'wx-scroll-view' === e.localName &&
								(r = e.querySelector('div div') || e),
							{
								status: i.default.Success,
								value: {
									x: n.left,
									y: n.top,
									width: n.width,
									height: n.height,
									scrollTop: r.scrollTop,
									scrollLeft: r.scrollLeft,
									scrollHeight: r.scrollHeight,
									scrollWidth: r.scrollWidth,
								},
							}
						);
					}),
					(this.getAttribute = (t, e) => {
						const n = this.nodeManager.getDOM(t);
						return n
							? {
									status: i.default.Success,
									value: n.getAttribute(e),
							  }
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.elementFromPoint = (t, e) => {
						const n = document.elementFromPoint(t, e);
						return n
							? {
									status: i.default.Success,
									value: {
										WEBVIEW_ELEMENT:
											this.nodeManager.getElementId(n),
									},
							  }
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.focus = t => {
						const e = this.nodeManager.getDOM(t);
						return e || e
							? (e.focus(),
							  {
									status: i.default.Success,
							  })
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.getContentSize = () => ({
						status: i.default.Success,
						value: {
							windowHeight: window.innerHeight,
							windowWidth: window.innerWidth,
							scrollTop:
								document.body.scrollTop ||
								document.documentElement.scrollTop,
							scrollLeft:
								document.body.scrollLeft ||
								document.documentElement.scrollLeft,
							scrollHeight:
								document.body.scrollHeight ||
								document.documentElement.scrollHeight,
							scrollWidth:
								document.body.scrollWidth ||
								document.documentElement.scrollWidth,
						},
					})),
					(this.findShadowRoot = t => {
						const e = document.querySelector(t);
						if (!e || !e.shadowRoot)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const n = e.shadowRoot;
						return {
							status: i.default.Success,
							value: {
								WEBVIEW_SHADOW_ROOT:
									this.nodeManager.getElementId(n),
							},
						};
					}),
					(this.findElementInWebviewShadowRoot = (t, e) => {
						const n = this.nodeManager.getDOM(e);
						if (!n)
							return {
								status: i.default.NoSuchElement,
								value: {
									message: 'shadow root not found',
								},
							};
						const r = n.querySelector(t);
						return r
							? {
									status: i.default.Success,
									value: {
										WEBVIEW_ELEMENT:
											this.nodeManager.getElementId(r),
									},
							  }
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					}),
					(this.clickContextMenu = t => (
						$contextMenuClicked(t),
						{
							status: i.default.Success,
						}
					)),
					(this.scrollIntoView = t => {
						const e = this.nodeManager.getDOM(t);
						return e
							? (e.scrollIntoView(),
							  {
									status: i.default.Success,
							  })
							: {
									status: i.default.NoSuchElement,
									value: {
										message: 'no such element',
									},
							  };
					});
			}
			init(t = {}) {
				const e = {
					[a.findElement]: ({ using: t, value: e }) =>
						this.findElement(t, e),
					[a.findElements]: ({ using: t, value: e }) =>
						this.findElements(t, e),
					[a.scroll]: ({ xoffset: t, yoffset: e }) =>
						this.scroll(t, e),
					[a.getTagName]: ({ ELEMENT: t }) => this.getTagName(t),
					[a.getAttribute]: ({ ELEMENT: t, name: e }) =>
						this.getAttribute(t, e),
					[a.getCssValue]: ({ ELEMENT: t, propertyName: e }) =>
						this.getCssValue(t, e),
					[a.getProperty]: ({ ELEMENT: t, propertyName: e }) =>
						this.getProperty(t, e),
					[a.getSize]: ({ ELEMENT: t }) => this.getSize(t),
					[a.getRect]: ({ ELEMENT: t }) => this.getRect(t),
					[a.getLocation]: ({ ELEMENT: t }) => this.getLocation(t),
					[a.elementFromPoint]: ({ x: t, y: e }) =>
						this.elementFromPoint(t, e),
					[a.getContentSize]: this.getContentSize,
					[a.focus]: ({ ELEMENT: t }) => this.focus(t),
					[a.scrollIntoView]: ({ ELEMENT: t }) =>
						this.scrollIntoView(t),
					[a.findShadowRoot]: ({ selector: t }) =>
						this.findShadowRoot(t),
					[a.findElementInWebviewShadowRoot]: ({
						selector: t,
						shadowRootHostId: e,
					}) => this.findElementInWebviewShadowRoot(t, e),
					[a.clickContextMenu]: ({ id: t }) =>
						this.clickContextMenu(t),
				};
				r.default.registerCallback(({ command: n, data: o }) => {
					const i = t[n] || e[n];
					if (i) {
						const t = i(o);
						r.default.send({
							command: n + '.callback',
							data: {
								callbackID: o.callbackID,
								res: t,
							},
						});
					}
				});
			}
		};
	},
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.registerBeforeInvoke = void 0);
		const r = n(10),
			o = n(95),
			i = n(159),
			s = n(42),
			a = n(160),
			c = n(162),
			{ coverRes: u, evaluateRes: l } = a,
			h = {
				removeHTMLWebView: !0,
			},
			d = new Map();
		(e.registerBeforeInvoke = function (t, e) {
			d.set(t, e);
		}),
			(e.default = t => {
				let e = {},
					n = 1,
					a = !1,
					p = !1;
				const f = t => {
                    // 调用完毕后向 view 层发送命令，渲染层根据此标识知道api调用完毕，然后执行对应的回调
						const { command: n, data: r } = t;
						if ('WEBVIEW_INVOKE_CALLBACK' === n) {
							const t = r.callbackID,
								n = e[t];
							'function' == typeof n && n(r.res), delete e[t];
						}
					},
					g = function (t, e = !1) {
						return function (n) {
							'function' == typeof t &&
								(l(n),
								e
									? t(n)
									: setTimeout(() => {
											t(n);
									  }, 0));
						};
					};
				return (
					s.default.once('RESET_INSTANCE', () => {
						(p = !0), (e = {}), r.default.removeCallback(f);
					}),
					a || ((a = !0), r.default.registerCallback(f)),
					function (s, a, l) {
						if (p) return;
						for (const t of d.values()) {
							let e = !0;
							if ((t && (e = t(s, a)), !e)) return;
						}
						if ('disableScrollBounce' === s)
							return void o.default.togglePullDownRefresh(
								a.disable
							);
						const f = h[s],
							E = g(l, f);
						if (i.default[s]) return void i.default[s](s, a, E);
						const m = n++;
						if (!f)
							return (
								(e[m] = g(l, !0)),
								void r.default.send({
									command: 'WEBVIEW_INVOKE',
									data: {
										api: s,
										args: a,
										callbackID: m,
									},
									common: t,
								})
							);
						const v = c.sync(s, a);
						v.needImplement
							? i.default[s](s, a, E)
							: (u(v), delete v.to, E(v));
					}
				);
			});
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(157),
			o = n(158),
			i = n(10);
		let s, a, c;
		e.default = {
			init: function (t) {
				const e = t.document;
				(s = t),
					(a = v),
					(c = function (t) {
						g = t;
					});
				let n,
					u,
					l = !1,
					h = 0,
					d = 0,
					p = null,
					f = null,
					g = !1,
					E = !1;

				function m() {
					p ||
						((p = e.createElement('div')),
						(f = e.createElement('i')),
						n || (n = t.__wxConfig.window.backgroundTextStyle),
						u ||
							(u =
								t.__wxConfig.window.backgroundColorTop ||
								t.__wxConfig.window.backgroundColor ||
								'#ffffff'),
						(f.style.backgroundImage =
							'light' !== n
								? `url(${r.default})`
								: `url(${o.default})`),
						(f.style.width = '32px'),
						(f.style.position = 'absolute'),
						(f.style.height = '6px'),
						(f.style.left = '50%'),
						(f.style.bottom = '20px'),
						(f.style.backgroundRepeat = 'no-repeat'),
						(f.style.marginLeft = '-16px'),
						(f.style.backgroundSize = 'cover'),
						p.appendChild(f),
						(p.style.left = '0px'),
						(p.style.height = '0px'),
						(p.style.width = '100%'),
						(p.style.position = 'fixed'),
						(p.style.top = '0px'),
						(p.style.backgroundColor = u)),
						'1' !== e.body.getAttribute('data-insertloading') &&
							(e.body.setAttribute('data-insertloading', '1'),
							e.body.insertBefore(p, e.body.firstChild));
				}

				function v() {
					(t.document.body.style.transition = 'all linear 0.3s'),
						(t.document.body.style.marginTop = '0px'),
						p &&
							((p.style.transition = 'all linear 0.3s'),
							(t.document.body.style.marginTop = '0px'),
							(p.style.height = '0px'));
				}

				function _() {
					i.default.send({
						command: 'PULLDOWN_REFRESH',
					});
				}
				i.default.registerCallback(e => {
					const { command: i, data: s } = e;
					if (
						('STOP_PULLDOWN_REFRESH' === i && v(),
						'START_PULLDOWN_REFRESH' === i)
					) {
						if (!t.__wxConfig.window.enablePullDownRefresh || g)
							return;
						m(),
							(p.style.height = '50px'),
							(t.document.body.style.transition = 'all linear 0'),
							(t.document.body.style.marginTop = '50px'),
							_();
					}
					'SET_BACKGROUND_COLOR' === i &&
						((u = s.backgroundColorTop || s.backgroundColor),
						m(),
						(p.style.backgroundColor = u)),
						'SET_BACKGROUND_TEXT_STYLE' === i &&
							((n = s.textStyle || 'dark'),
							m(),
							(f.style.backgroundImage =
								'light' !== n
									? `url(${r.default})`
									: `url(${o.default})`));
				}),
					(t.enablePullDownRefresh = function () {
						E ||
							(t.addEventListener(
								'touchstart',
								e => {
									0 === t.scrollY &&
										(m(),
										(l = !0),
										(h = e.touches[0].pageY),
										(t.document.body.style.transition =
											'all linear 0'),
										(p.style.transition = 'all linear 0'));
								},
								!0
							),
							t.addEventListener('touchmove', e => {
								l &&
									t.__wxConfig.window.enablePullDownRefresh &&
									!g &&
									((d = e.touches[0].pageY - h),
									(d = Math.max(0, d)),
									(d = Math.min(100, d)),
									(t.document.body.style.marginTop =
										d + 'px'),
									(p.style.height = d + 'px'));
							}),
							t.addEventListener('touchend', () => {
								(l = !1),
									d > 50
										? (_(),
										  (d = 50),
										  (t.document.body.style.marginTop =
												d + 'px'),
										  (p.style.height = d + 'px'),
										  setTimeout(v, 3e3))
										: v();
							}),
							(E = !0));
					});
			},
			reset: () => a(),
			togglePullDownRefresh: t => c(t),
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.modifierMap =
				e.KeyNameMap =
				e.KeyCodeMap =
				e.KEYNAME =
				e.AVOID_NAME =
					void 0);
		const r = n(22);
		(e.AVOID_NAME = {
			INPUT: 'INPUT',
		}),
			(e.KEYNAME = {
				CTRL: 'Ctrl',
				SHIFT: 'Shift',
				ALT: 'Alt',
				C: 'C',
				V: 'V',
				X: 'X',
				Z: 'Z',
				DELETE: 'delete',
				UP: 'up',
				DOWN: 'down',
				LEFT: 'left',
				RIGHT: 'right',
				DEL: 'del',
			}),
			(e.KeyCodeMap = {
				18: e.KEYNAME.ALT,
				67: e.KEYNAME.C,
				86: e.KEYNAME.V,
				88: e.KEYNAME.X,
				90: e.KEYNAME.Z,
				8: e.KEYNAME.DELETE,
				46: e.KEYNAME.DEL,
				38: e.KEYNAME.UP,
				40: e.KEYNAME.DOWN,
				37: e.KEYNAME.LEFT,
				39: e.KEYNAME.RIGHT,
			}),
			r.isMac()
				? ((e.KeyCodeMap[91] = e.KEYNAME.CTRL),
				  (e.KeyCodeMap[93] = e.KEYNAME.CTRL))
				: (e.KeyCodeMap[17] = e.KEYNAME.CTRL),
			(e.KeyNameMap = {});
		for (const t in e.KeyCodeMap) {
			const n = e.KeyCodeMap[t];
			e.KeyNameMap[n] = t;
		}
		e.modifierMap = {
			16: 'shiftKey',
			18: 'altKey',
			17: 'ctrlKey',
			91: 'metaKey',
			93: 'metaKey',
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.domFinder = void 0);
		const r = n(57),
			o = n(100);
		const i = new (class {
			findChild(t, e) {
				var n, r;
				let o;
				const i =
					null === (n = null == t ? void 0 : t.__wxElement) ||
					void 0 === n
						? void 0
						: n.$;
				if (i)
					for (const t in i) {
						let n = e;
						for (
							;
							n &&
							!(null === (r = null == n ? void 0 : n.tagName) ||
							void 0 === r
								? void 0
								: r.startsWith('WX-'));

						) {
							if (i[t] === e) {
								o = t;
								break;
							}
							n = n.parentElement;
						}
						if (o) break;
					}
				return o;
			}
			getActualWXMLNode(t) {
				const e = (null == t ? void 0 : t.tagName)
					? t
					: (null == t ? void 0 : t.$$)
					? null == t
						? void 0
						: t.$$
					: t;
				return o.getParentWXMLNode(e);
			}
			async getDomInfo(t, e) {
				let n, r;
				const o = this.getActualWXMLNode(t);
				if ('touchmove' === e && !o) return;
				t !== o && (n = this.findChild(o, t));
				const {
					targetCandidates: i,
					tagName: s,
					selector: a,
					xPath: c,
				} = this.getTargetSelector(o);
				switch (s) {
					case 'input':
					case 'textarea':
						r = await this.getInputNodeValue(o);
						break;
					case 'editor':
						r = await this.getEditorNodeValue(o);
						break;
					case 'scroll-view':
						r = this.getScrollViewNodeValue(o);
						break;
					case 'movable-view':
						r = this.getMovableViewNodeValue(o);
						break;
					case 'swiper':
						r = this.getSwiperNodeValue(o);
						break;
					case 'picker-view':
						r = await this.getPickerViewNodeValue(o);
						break;
					case 'slider':
						r = this.getSliderNodeValue(o);
				}
				return {
					innerText: null == o ? void 0 : o.innerText,
					childName: n,
					tagName: s,
					selector: a,
					nodeValue: r,
					xPath: c,
					targetCandidates: i,
				};
			}
			getTargetSelector(t) {
				var e, n, i, s;
				if (null === t)
					return {
						targetCandidates: [],
						tagName: '',
						selector: '',
						xPath: '',
					};
				const a = t.tagName.toLowerCase().replace('wx-', ''),
					c =
						(null ===
							(n =
								null ===
									(e = null == t ? void 0 : t.__wxElement) ||
								void 0 === e
									? void 0
									: e.classList) || void 0 === n
							? void 0
							: n._rawNames) || [],
					u =
						(null === (i = null == t ? void 0 : t.__wxElement) ||
						void 0 === i
							? void 0
							: i._hoverClass) || [],
					l = window.__autotestIgnoreSelectorLst || [],
					h = c
						.filter(t => {
							const e = l.find(e => new RegExp(e).test(t));
							return !u.includes(t) && !e;
						})
						.map(t => '.' + t)
						.join(''),
					d = o.xPathGen(t);
				let p =
					null === (s = null == t ? void 0 : t.__wxElement) ||
					void 0 === s
						? void 0
						: s.__id;
				const f = l.find(t => new RegExp(t).test(p));
				p = f ? null : p;
				let g = h ? [`${a}${h}`, h] : [];
				g = g.filter(t => {
					const e = r.transSelector(t);
					return 1 === window.document.querySelectorAll(e).length;
				});
				const E = [p ? '#' + p : null, ...g, d].filter(t => t);
				return {
					targetCandidates: E,
					tagName: a,
					selector: E[0],
					xPath: d,
				};
			}
			isScrollView(t) {
				return 'WX-SCROLL-VIEW' === (null == t ? void 0 : t.tagName);
			}
			isMovableView(t) {
				return 'WX-MOVABLE-VIEW' === (null == t ? void 0 : t.tagName);
			}
			isSwiper(t) {
				return 'WX-SWIPER' === (null == t ? void 0 : t.tagName);
			}
			isPickerView(t) {
				return 'WX-PICKER-VIEW' === (null == t ? void 0 : t.tagName);
			}
			isSlider(t) {
				return 'WX-SLIDER' === (null == t ? void 0 : t.tagName);
			}
			getMoveEventNode(t) {
				var e, n;
				const r = (null == t ? void 0 : t.tagName)
						? t
						: (null == t ? void 0 : t.$$)
						? null == t
							? void 0
							: t.$$
						: t,
					o =
						null ===
							(n =
								null ===
									(e = null == r ? void 0 : r.__wxElement) ||
								void 0 === e
									? void 0
									: e.__wxEvents) || void 0 === n
							? void 0
							: n.touchmove;
				return null === r ||
					o ||
					this.isScrollView(r) ||
					this.isMovableView(r) ||
					this.isSwiper(r) ||
					this.isPickerView(r) ||
					this.isSlider(r)
					? r
					: this.getMoveEventNode(r.parentElement);
			}
			getScrollViewNodeValue(t) {
				const e = (null == t ? void 0 : t.__wxElement) || {};
				return {
					x: e._lastScrollLeft || 0,
					y: e._lastScrollTop || 0,
				};
			}
			getMovableViewNodeValue(t) {
				const e = (null == t ? void 0 : t.__wxElement) || {};
				return {
					x: e._translateX || 0,
					y: e._translateY || 0,
				};
			}
			getSwiperNodeValue(t) {
				return (
					((null == t ? void 0 : t.__wxElement) || {}).current || 0
				);
			}
			async getPickerViewNodeValue(t) {
				return new Promise(e => {
					var n;
					const r = (null == t ? void 0 : t.__wxElement) || {};
					(null === (n = r.childNodes) || void 0 === n
						? void 0
						: n.length) > 0
						? setTimeout(() => {
								e(r.childNodes.map(t => t._current));
						  }, 0)
						: e([]);
				});
			}
			getSliderNodeValue(t) {
				return ((null == t ? void 0 : t.__wxElement) || {}).value || 0;
			}
			async getInputNodeValue(t) {
				return new Promise(e => {
					const n = (null == t ? void 0 : t.__wxElement) || {};
					setTimeout(() => {
						e(n.value || '');
					}, 0);
				});
			}
			async getEditorNodeValue(t) {
				return new Promise(e => {
					const n = (null == t ? void 0 : t.__wxElement) || {};
					setTimeout(() => {
						e({
							html: n._html,
							delta: n._delta,
						});
					}, 0);
				});
			}
		})();
		e.domFinder = i;
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(184);
		r.NodeTest.localNameMatches = function (t, e, n) {
			const r = 'wx-' + t;
			var o = n.localName || n.nodeName;
			return e.caseInsensitive
				? t.toLowerCase() === o.toLowerCase() ||
						r.toLowerCase() === o.toLowerCase()
				: t === o || r === o;
		};
		const o = r.PathExpr.applyStep;
		(r.PathExpr.applyStep = function (t, e, n) {
			var i = [];
			switch (((e.contextNode = n), t.axis)) {
				case r.Step.CHILD:
					for (var s = [e.contextNode.firstChild]; s.length > 0; )
						for (var a = s.shift(); null !== a; ) {
							var c = a.localName || a.nodeName;
							c.startsWith('wx-') || c.startsWith('#')
								? t.nodeTest.matches(a, e) && i.push(a)
								: null !== a.firstChild && s.push(a.firstChild),
								(a = a.nextSibling);
						}
					break;
				default:
					i = o.call(r.PathExpr, t, e, n);
			}
			return i;
		}),
			(e.default = r);
	},
	function (t, e, n) {
		var r = n(20),
			o = n(1),
			i = n(12);
		(e = function (t, e, n) {
			e = r(e, n);
			for (
				var s = !i(t) && o(t), a = (s || t).length, c = Array(a), u = 0;
				u < a;
				u++
			) {
				var l = s ? s[u] : u;
				c[u] = e(t[l], l, t);
			}
			return c;
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';

		function r(t) {
			var e;
			return null === t ||
				(null === (e = null == t ? void 0 : t.tagName) || void 0 === e
					? void 0
					: e.startsWith('WX-'))
				? t
				: r(t.parentElement);
		}

		function o(t) {
			var e;
			if (
				!(null === (e = null == t ? void 0 : t.__wxElement) ||
				void 0 === e
					? void 0
					: e.parentNode)
			)
				return null;
			return r(t.parentElement);
		}
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Step =
				e._xPathIndex =
				e._xPathValue =
				e.xPathGen =
				e.getParentNode =
				e._getParentNode =
				e.getParentWXMLNode =
				e.getParentTagNode =
					void 0),
			(e.getParentTagNode = function t(e, n) {
				var r;
				return null === e ||
					(null === (r = null == e ? void 0 : e.tagName) ||
					void 0 === r
						? void 0
						: r.toLowerCase()) ===
						(null == n ? void 0 : n.toLowerCase())
					? e
					: t(e.parentElement, n);
			}),
			(e.getParentWXMLNode = r),
			(e._getParentNode = function (t) {
				var e, n;
				if (
					!(null === (e = null == t ? void 0 : t.__wxElement) ||
					void 0 === e
						? void 0
						: e.parentNode)
				)
					return null;
				const r = t =>
						(null == t ? void 0 : t.__virtual)
							? r(t.parentNode)
							: t,
					o = t.__wxElement.parentNode;
				return null === (n = r(o)) || void 0 === n ? void 0 : n.$$;
			}),
			(e.getParentNode = o);
		e.xPathGen = (t, n) => {
			const r = [];
			let i = t;
			for (; i; ) {
				const t = e._xPathValue(i, n);
				if (!t) break;
				if ((r.push(t), t.optimized)) break;
				if (!i.__wxElement) break;
				i = o(i);
			}
			return (
				r.reverse(),
				(r.length && r[0].optimized ? '' : '/') + r.join('/')
			);
		};
		e._xPathValue = (t, n) => {
			let r;
			const o = e._xPathIndex(t);
			if (-1 === o) return null;
			switch (t.nodeType) {
				case Node.ELEMENT_NODE:
					if (n && t.getAttribute('id'))
						return new i(`//*[@id="${t.getAttribute('id')}"]`, !0);
					r = t.localName.replace('wx-', '');
					break;
				case Node.ATTRIBUTE_NODE:
					r = '@' + t.nodeName;
					break;
				case Node.TEXT_NODE:
				case Node.CDATA_SECTION_NODE:
					r = 'text()';
					break;
				case Node.PROCESSING_INSTRUCTION_NODE:
					r = 'processing-instruction()';
					break;
				case Node.COMMENT_NODE:
					r = 'comment()';
					break;
				case Node.DOCUMENT_NODE:
				default:
					r = '';
			}
			return (
				o > 0 && (r += `[${o}]`),
				new i(r, t.nodeType === Node.DOCUMENT_NODE)
			);
		};
		e._xPathIndex = function (t) {
			function e(t, e) {
				if (t === e) return !0;
				if (
					t.nodeType === Node.ELEMENT_NODE &&
					e.nodeType === Node.ELEMENT_NODE
				)
					return t.localName === e.localName;
				if (t.nodeType === e.nodeType) return !0;
				return (
					(t.nodeType === Node.CDATA_SECTION_NODE
						? Node.TEXT_NODE
						: t.nodeType) ===
					(e.nodeType === Node.CDATA_SECTION_NODE
						? Node.TEXT_NODE
						: e.nodeType)
				);
			}
			const n = t.parentNode ? t.parentNode.children : null;
			if (!n) return 0;
			let r;
			for (let o = 0; o < n.length; ++o)
				if (e(t, n[o]) && n[o] !== t) {
					r = !0;
					break;
				}
			if (!r) return 0;
			let o = 1;
			for (let r = 0; r < n.length; ++r)
				if (e(t, n[r])) {
					if (n[r] === t) return o;
					++o;
				}
			return -1;
		};
		class i {
			constructor(t, e) {
				(this.value = t), (this.optimized = e || !1);
			}
			toString() {
				return this.value;
			}
		}
		e.Step = i;
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.replayer = void 0);
		const r = n(57),
			o = n(102);
		const i = new (class {
			constructor() {
				this._isReplay = !1;
			}
			get isReplay() {
				return this._isReplay;
			}
			startReplay() {
				this._isReplay = !0;
			}
			sleep(t) {
				return new Promise(e => {
					setTimeout(e, t);
				});
			}
			genEvent(t, e) {
				const n = t.eventData || {},
					o = n.detail || {};
				let i = n.touches || [],
					s = n.changedTouches || [];
				(i = r.normalizeTouches(e, i)), (s = r.normalizeTouches(e, s));
				const a = document.createEvent('Event');
				a.initEvent(t.command, !0, !0),
					(a.touches = i),
					(a.changedTouches = s);
				const c = {
					bubbles: !0,
					capturePhase: !0,
					composed: !0,
					extraFields: {
						_allowWriteOnly: !0,
						touches: i,
						changedTouches: s,
					},
					originalEvent: a,
				};
				return window.exparser.Event.create(t.command, o, c);
			}
			async replayCommand(t) {
				var e, n, i, s, a, c;
				const u = t.path,
					l = location.pathname.replace('/__pageframe__/', '');
				if (u !== l)
					return {
						error: {
							message: `[pageframe] path error: ${l} not equal to ${u}`,
						},
					};
				const { node: h, targetUsed: d } = r.getElement(
					t.target,
					t.targetCandidates
				);
				if (h) {
					const u = t.childName
						? null ===
								(n =
									null ===
										(e =
											null == h
												? void 0
												: h.__wxElement) || void 0 === e
										? void 0
										: e.$) || void 0 === n
							? void 0
							: n[t.childName]
						: h;
					if (!u)
						return {
							error: {
								message: `[pageframe] can not get node of selector: ${t.target}, childName: ${t.childName}`,
							},
						};
					if (
						o.inputTagNames.includes(h.tagName) ||
						o.editorTagNames.includes(h.tagName)
					) {
						const e = t.waitfor;
						if (
							((isNaN(e) || e < 800) && (await this.sleep(600)),
							'input' === t.command)
						)
							if (o.inputTagNames.includes(h.tagName))
								u.value = t.value;
							else if (o.editorTagNames.includes(h.tagName)) {
								const e =
										null ===
											(s =
												null ===
													(i =
														null == t
															? void 0
															: t.eventData) ||
												void 0 === i
													? void 0
													: i.detail) || void 0 === s
											? void 0
											: s.html,
									n = u.querySelector('.ql-editor');
								n ? (n.innerHTML = e) : (u.innerHTML = e);
							}
						const n = this.genEvent(t, u);
						window.exparser.Event.dispatchEvent(u, n),
							'input' === t.command &&
								setTimeout(() => {
									const t = document.createEvent('Event');
									t.initEvent('blur', !0, !0),
										u.dispatchEvent(t);
								}, 100);
					} else if ('scroll' === t.command) {
						const e =
								(null ===
									(a = null == t ? void 0 : t.eventData) ||
								void 0 === a
									? void 0
									: a.scrollDetail) || {},
							n = e.scrollTop,
							r = e.scrollLeft;
						if (u !== document) {
							let t = u;
							if ('WX-SCROLL-VIEW' === u.tagName) {
								const e = u.__wxElement.$;
								t = e.main.$$ ? e.main.$$ : e.main;
							}
							isNaN(n) || (t.scrollTop = Number(n)),
								isNaN(r) || (t.scrollLeft = Number(r));
						} else this.setScrollTop(n);
					} else if ('assert' === t.commandType)
						switch (t.command) {
							case 'assertVisible':
								return;
							case 'assertText': {
								const e = h,
									n = null == e ? void 0 : e.innerText;
								if (n === t.text) return;
								return {
									error: {
										message: `[pageframe] assertText error: ${n} not equal to ${t.text}`,
									},
								};
							}
							default:
								return {
									error: {
										message:
											'[pageframe] no such command: ' +
											t.command,
									},
								};
						}
					else if ('map' === t.tagName) {
						const e = this.genEvent(t, u),
							n =
								null ===
									(c = null == h ? void 0 : h.__wxElement) ||
								void 0 === c
									? void 0
									: c.__methodCaller;
						if (!n)
							return {
								error: {
									message: `[pageframe] can not get node of selector: ${t.target} no methodCaller`,
								},
							};
						window.exparser.Event.dispatchEvent(n, e);
					} else if ('tap' === t.command)
						if (t.useExparserEvent) {
							const e = this.genEvent(t, u);
							__virtualDOM__.wrapTapMark(() => {
								window.exparser.Event.dispatchEvent(u, e);
							});
						} else {
							const e = (t.eventData || {}).detail || {};
							r.touchStart(u, e), r.touchEnd(u, e);
						}
					else {
						const e = this.genEvent(t, u);
						window.exparser.Event.dispatchEvent(u, e);
					}
					return {
						targetUsed: d,
					};
				}
				return {
					error: {
						message:
							'[pageframe] can not get node of selector: ' +
							t.target,
					},
				};
			}
			setScrollTop(t) {
				(document.documentElement.scrollTop = t),
					(document.body.scrollTop = t);
			}
		})();
		e.replayer = i;
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.mapEvent =
				e.scrollViewTagNames =
				e.editorTagNames =
				e.inputTagNames =
				e.AutoTestEvent =
				e.inputEventElements =
					void 0),
			(e.inputEventElements = ['input', 'textarea']),
			(e.AutoTestEvent = {
				stopRecord: 'autoTest.stopRecord',
				changeAssertMode: 'autoTest.changeAssertMode',
				startRecord: 'autoTest.startRecord',
				replayRecord: 'autoTest.replayRecord',
				startReplay: 'autoTest.startReplay',
			}),
			(e.inputTagNames = [
				'INPUT',
				'WX-INPUT',
				'TEXTAREA',
				'WX-TEXTAREA',
			]),
			(e.editorTagNames = ['WX-EDITOR']),
			(e.scrollViewTagNames = ['WX-SCROLL-VIEW', 'SCROLL-VIEW']),
			(e.mapEvent = [
				'tap',
				'markertap',
				'labeltap',
				'controltap',
				'updated',
				'regionchange',
				'poitap',
				'anchorpointtap',
			]);
	},
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	,
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(156),
			o = n(94),
			i = n(64),
			s = n(163),
			a = n(164);
		n(165);
		const c = n(166),
			u = n(95),
			l = n(167),
			h = n(168),
			d = n(10),
			p = n(62),
			f = n(169),
			g = n(183);
		p.Timing.setMessager(d.default),
			(window.__global.timing = new p.Timing({
				document: document,
				MutationObserver:
					window.MutationObserver || window.__global.MutationObserver,
			})),
			(window.getNewWeixinJSBridge = () => {
				const t = {},
					{ on: e, triggerOnEvent: n } = r.default();
				return Object.assign(
					Object.assign(
						{
							on: e,
							invoke: o.default(t),
							publish: i.default(t),
							subscribe: s.default(),
						},
						a.default()
					),
					{
						__triggerOnEvent: n,
						__setCommonPayload(e, n) {
							t[e] = n;
						},
					}
				);
			}),
			(window.WeixinJSBridge = window.getNewWeixinJSBridge()),
			(window.InterfaceBuilder = f.default);
		let E = !1;

		function m() {
			new c.default().init(), new l.default();
			const t = new g.UIRecorder(window, d.default);
			(window.uiRecorder = t),
				console.log('__autotest', window.__autotest),
				window.__autotest && t.init();
			const e = document.createEvent('UIEvent');
			e.initEvent('WeixinJSBridgeReady', !1, !1),
				document.dispatchEvent(e),
				u.default.init(window),
				h.default.init(),
				window.addEventListener(
					'touchstart',
					() => {
						E ||
							((E = !0),
							d.default.send({
								command: 'FIRST_TOUCH',
							}));
					},
					!0
				);
		}
		'complete' === document.readyState
			? m()
			: window.addEventListener('load', () => {
					m();
			  }),
			(history.pushState = function (...t) {
				const e = t[2],
					n = e.slice(e.indexOf('__pageframe__') + 14);
				(window.document.head.querySelector('title').innerText =
					'Webview: ' + n),
					History.prototype.pushState.apply(history, t);
			}),
			p.Timing.addCommonPoint('PAGEFRAME_JSDEBUG_LOADED');
	},
    // on 小程序开发者工具要触发渲染层的某个动作时，借助 websocket
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10),
			o = n(63),
			i = n(42);
		e.default = () => {
			let t = {},
				e = !1,
				n = !1;
			const s = t => {
				const { command: e, data: n } = t;
                // 表示这个命令是来自开发者工具的，并通过 eventName 执行什么事件什么方法
				'WEBVIEW_ON_EVENT' === e && a(n.eventName, n.data);
			};

			function a(e, n) {
				const r = t[e];
				'function' == typeof r && r(n, o.default.webviewID);
			}
			return (
				i.default.once('RESET_INSTANCE', () => {
					(n = !0), (t = {}), r.default.removeCallback(s);
				}),
				e || ((e = !0), r.default.registerCallback(s)),
				{
					on: function (e, r) {
						n || (r && (t[e] = r));
					},
					triggerOnEvent: a,
				}
			);
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.default =
				'data:image/gif;base64,R0lGODlhQAAMAMQZAPT09Orq6ubm5unp6dPT06ysrPz8/NbW1q+vr9fX1+vr687Ozv39/fr6+tXV1Z6ens3NzZ2dnZubm66urpycnKurq+Xl5czMzJmZmf///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjFEQzRGRkU4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjFEQzRGRkQ4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplY2RjM2MyNC03NDBkLTQ1NzMtOTc0Ni1iZGQ2MzhlMjEyYjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MGUzZDU2Ny1jZTk1LTExNzktYWFmZC04MmQ1NzRhYmI2YzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJFAAZACwAAAAAQAAMAAAFvmCWMQTyPAjBiGzrukOyLMnw3jegCIICtIACZkgs/HC3xuHCbB4ayJshYKlaA4aRkMgtZKOtZXPsALuo1nQgQ+C6MQSzaDCuX2xyQHpvASDeXAhyGQl2YwmDCnxpChKARBSDEIZNEIMCi1YCjo8YD5KUTAuXmVUCf52CcoWhiHKKpQptnXFydKF4ZnqlAAZbbxVfcg6UZYMZaHxrGUFvRscZSnYOUMdTysIkExEREyrQLAMHMwe54AABPAFHGSEAIfkECRQAGQAsAAAAAEAADAAABb9gJgKKICiAqK4syxDI8yAE097tkCxLMqyGgGVIDBhwOEABw2wWUshW43CpWg8NkZDIDURdy6a4cPyqqNa0IwPgui1QM0FMxxDMokF6fxko3lwKeBkIdWIIgwl8aQkCgEQCgxKGTRSDEItWEI6PFpF4k5QYD5eZVQt/nYJ4haKIeIqmCW2dcV9zond4eqY/W29egwZhdRVleA6ZaxlBwMd4SnVPgyJTfA5ZKgABJgG21C8TERETNdQrAwc8Bz8iIQAh+QQFFAAZACwAAAAAQAAMAAAFv2AmDsmyJIOormwLKIKgAG3dMgTyPAjBqI3DZUg8NGw2Q8DCbAYMyBqggKlaC7SMkMh1RFvLpjjwXTGo1nTBMOC6L6lyBiCuW7JlQnqPISTeXAlyGQp2YgqDCHxpCBCARBCDAoZNAoMSi1YUjo8XC5KUTJZymJkYD3+dgnKFoYhyiqYIbZ1xZXSheF96pgQZDo9egxlhdmSDBmh8FVBBbw5Hw0rGUMNTfFgrAwcmB7bDIgABMQG6wzgTERETPiIhADs=');
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.default =
				'data:image/gif;base64,R0lGODlhQAAMAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q5MjI2RkE4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q5MjI2Rjk4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTgxYjFkOTMtMDAyMC00YmJiLWI1ZTEtOGIyODUxZDMzMzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECRQAAQAsAAAAAEAADAAAAkVMgInG7a7Wmy+CZhWlOe3ZLaH3YWEJnaOErhd6uCscj7Q8w+6Nn3re6nV4tp/QQvQFjxFaLeN8IqVNZzE5pbKi2SiVUQAAIfkECRQAAQAsAAAAAEAADAAAAkWMgWnL3QmBmy7KZSGlWe3aXeH1YSNZBqN6pkfrnjL6yS47h7cd53q/AvosO1hq2CkGj60l01kKQqM/ZYZBvGGvWpPGUAAAIfkEBRQAAQAsAAAAAEAADAAAAkWMgWnL7amcbBCuWufEVj+OHCDgfWDJjGqGBivZvm/rrrRsxzmKq/de6o1+Pp0QQxwah8Uk0smpnWjSKLVZDVFTrG02UgAAOw==');
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		e.default = {
			reportKeyValue: (t, e, n) => {
				n({
					errMsg: t + ':ok',
				});
			},
			reportIDKey: (t, e, n) => {
				n({
					errMsg: t + ':ok',
				});
			},
			traceEvent: (t, e, n) => {
				n({
					errMsg: t + ':ok',
				});
			},
		};
	},
	function (t, e, n) {
		'use strict';
		const r = n(161);

		function o(t) {
			const e = r.atob(t),
				n = e.length,
				o = new Uint8Array(n);
			for (let t = 0; t < n; t++) o[t] = e.charCodeAt(t);
			return o.buffer;
		}
		t.exports = {
			getQueryString: function (t) {
				var e = new RegExp(`(^|&)${t}=([^&]*)(&|$)`, 'i'),
					n = window.location.search.substr(1).match(e);
				return null != n ? unescape(n[2]) : null;
			},
			evaluateRes: function (t) {
				var e, n;
				if (!t.__codes) return;
				const r = t.__codes,
					o = window.__global.asLoader;
				let i = null;
				if (o) {
					const t = o.frames.get(o.currentFrameId);
					i =
						null !==
							(n =
								null ===
									(e =
										t.iframe.contentWindow.__global
											.asSubLoader) || void 0 === e
									? void 0
									: e.activeAppDocument) && void 0 !== n
							? n
							: t.iframe.contentDocument;
				} else i = window.document;
				for (let t = 0, e = r.length; t < e; t++) {
					const e = i.createElement('script');
					(e.text = r[t]), i.head.appendChild(e);
				}
			},
			coverRes: t => {
				if (null == t ? void 0 : t.__cover) {
					for (const e in t.__cover)
						if (
							('base64' === e &&
								((t[t.__cover[e]] = o(t.base64)),
								delete t.base64),
							'base64Array' === e &&
								((t[t.__cover[e]] = t.base64Array.map(t =>
									o(t)
								)),
								delete t.base64Array),
							'base64Entries' === e)
						) {
							const n = t.__cover[e] || [];
							for (const e of n) t[e.key] = o(e.base64);
							delete t.base64Entries;
						}
					delete t.__cover;
				}
			},
			base64ToArrayBuffer: o,
			arrayBufferToBase64: function (t) {
				let e = '';
				const n = new Uint8Array(t),
					o = n.byteLength;
				for (let t = 0; t < o; t++) e += String.fromCharCode(n[t]);
				return r.btoa(e);
			},
		};
	},
	function (t, e, n) {
		'use strict';
		t.exports = window.__global;
	},
	function (t, e, n) {
		'use strict';
		const r = n(63);
		t.exports = {
			sync: (t, e, n) => {
				const o = {
						api: t,
						args: e,
						options: n,
						webviewID: r.default.webviewID,
					},
					i = new window.__global.XMLHttpRequest();
				return (
					i.open(
						'POST',
						`${location.origin}/apihelper/jssdk?t=${Date.now()}`,
						!1
					),
					i.send(JSON.stringify(o)),
					200 === i.status
						? JSON.parse(i.responseText)
						: {
								errMsg: t + ':fail',
						  }
				);
			},
		};
	},
    // subscribe
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10),
			o = n(42);
		e.default = () => {
			let t = {},
				e = !1,
				n = !1;
			const i = e => {
				const { command: n, data: r, webviewID: o } = e;
				'APPSERVICE_PUBLISH' === n &&
					(function (e, n, r) {
						const o = t[e];
						o.length > 10 &&
							console.warn(
								`The event subscribed on '${e}' is over 10`
							);
						for (const t of o) 'function' == typeof t && t(n, r);
					})(r.eventName, r.data, o);
			};
			return (
				o.default.once('RESET_INSTANCE', () => {
					(n = !0), (t = {}), r.default.removeCallback(i);
				}),
				e || ((e = !0), r.default.registerCallback(i)),
				function (e, r) {
					n || (t[e] || (t[e] = []), t[e].push(r));
				}
			);
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10),
			o = n(42);
		e.default = () => {
			let t = {},
				e = !1,
				n = !1;
			const i = t => {
				const { command: e, data: n } = t;
				'APPSERVICE_PUBLISH_SYNC' === e &&
					s(n.eventName, n.data, n.callbackID);
			};

			function s(e, r, o) {
				if (n) return;
				const i = t[e];
				'function' == typeof i &&
					i(r, (t, e) => {
						a(
							o,
							JSON.stringify([
								null == t ? void 0 : t.toString(),
								e,
							])
						);
					});
			}

			function a(t, e) {
				n ||
					r.default.send({
						command: 'SUBSCRIBE_SYNC_CALLBACK',
						data: {
							callbackID: t,
							res: e,
						},
					});
			}
			return (
				o.default.once('RESET_INSTANCE', () => {
					(n = !0), (t = {}), r.default.removeCallback(i);
				}),
				e || ((e = !0), r.default.registerCallback(i)),
				{
					subscribeSync: function (e, r) {
						n || (t[e] = r);
					},
					returnSync: a,
					subscribeSyncHandler: s,
				}
			);
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.PageframeLoader = void 0);
		const r = n(10),
			o = n(42),
			i = n(63),
			s = () => {},
			a = location.pathname.endsWith('instanceframe.html');
		class c {
			constructor() {
				(this.globalSessionId = Date.now()),
					(this.appResourceScriptList = {}),
					(this.canonicalUrlMap = {}),
					(this.verbose = !1),
					(this.messagerCallback = t => {
						const { command: e, webviewID: n } = t;
						n === i.default.webviewID &&
							'RESET' === e &&
							(r.setPageframeReady(!1),
							o.default.emit('RESET_INSTANCE'));
					}),
					r.registerCallback(this.messagerCallback);
			}
			loadAppResourceScripts(t) {
				return this.loadScripts(t);
			}
			async loadScripts(t) {
				if (t) {
					const e = [],
						n = document.createElement('script');
					for (const r of t) {
						if (r.src) {
							n.src = r.src;
							const t = n.src,
								o = this.getCanonicalUrl(t);
							if (this.appResourceScriptList[t]) {
								const n = this.appResourceScriptList[t].onLoad;
								e.push(n), r.async || (await n);
								continue;
							}
							const i = this.canonicalUrlMap[o]
								? this.appResourceScriptList[
										this.canonicalUrlMap[o]
								  ]
								: null;
							i && (await i.onLoad),
								(this.canonicalUrlMap[o] = t),
								(this.appResourceScriptList[t] = {
									status: 'loading',
									onLoad: void 0,
									__resolve: void 0,
									__reject: void 0,
									canonicalUrl: o,
								}),
								(this.appResourceScriptList[t].onLoad =
									new Promise((e, n) => {
										(this.appResourceScriptList[
											t
										].__resolve = e),
											(this.appResourceScriptList[
												t
											].__reject = n);
									}));
						}
						const t = document.createElement('script');
						t.charset = 'UTF-8';
						let o,
							i = !0;
						for (const e in r)
							'async' === e && (i = !1), (t[e] = r[e]);
						if (t.src) {
							const n = this.appResourceScriptList[t.src];
							(n.startTime = Date.now()),
								(o = new Promise(e => {
									t.addEventListener('load', () => {
										n.__resolve(),
											(n.status = 'loaded'),
											(n.loadTime =
												Date.now() - n.startTime),
											e();
									}),
										t.addEventListener('error', t => {
											n.__reject(t),
												(n.status = 'error'),
												(n.loadTime =
													Date.now() - n.startTime),
												e();
										}),
										document.head.appendChild(t);
								})),
								e.push(o);
						} else document.head.appendChild(t);
						i && (await o);
					}
					return Promise.all(e).then(() => {});
				}
			}
			collectMarkedAppResourceScripts() {
				const t = [...document.head.getElementsByTagName('script')];
				for (const e of t)
					e.src &&
						!this.appResourceScriptList[e.src] &&
						e.hasAttribute('data-appresource') &&
						(this.appResourceScriptList[e.src] = {
							status: 'loaded',
							onLoad: Promise.resolve(),
							__resolve: s,
							__reject: s,
							canonicalUrl: this.getCanonicalUrl(e.src),
						});
			}
			displayError(t = 'html', e) {
				document.body.innerHTML = decodeURIComponent(e);
			}
			getCanonicalUrl(t) {
				return t.replace(/\?.+$/, '');
			}
		}
		if (((e.PageframeLoader = c), a)) {
			const t = new c();
			(window.isMultiFrameArch = !0),
				(window.pageframeLoader = t),
				r.setPageframeReady(!0);
		} else r.setPageframeReady(!0);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(65),
			o = n(54),
			i = n(55),
			{ webview: s } = i;
		class a extends r.default {
			constructor() {
				super(...arguments),
					(this.LAST_X = 0),
					(this.LAST_Y = 0),
					(this.tapElement = (t, e) => {
						const n = (this.ACTIVE_ELEMENT =
							this.nodeManager.getDOM(t));
						if (!n)
							return {
								status: o.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						const r = n.getBoundingClientRect(),
							i = r.left + r.width / 2,
							s = r.top + r.height / 2,
							a = new Touch({
								identifier: 1,
								target: n,
								clientX: i,
								clientY: s,
								pageX: i,
								pageY: s,
							}),
							c = new TouchEvent('touchstart', {
								bubbles: !0,
								touches: [a],
								targetTouches: [a],
								changedTouches: [a],
							}),
							u = new TouchEvent('touchend', {
								bubbles: !0,
								changedTouches: [a],
							});
						return (
							n.dispatchEvent(c),
							e
								? setTimeout(() => n.dispatchEvent(u), 500)
								: n.dispatchEvent(u),
							{
								status: o.default.Success,
							}
						);
					}),
					(this.touchDown = (t, e) => {
						const n = (this.ACTIVE_ELEMENT =
							document.elementFromPoint(t, e));
						(this.LAST_X = t), (this.LAST_Y = e);
						const r = new Touch({
								identifier: 1,
								target: n,
								clientX: t,
								clientY: e,
								pageX: t,
								pageY: e,
							}),
							i = new TouchEvent('touchstart', {
								bubbles: !0,
								touches: [r],
								targetTouches: [r],
								changedTouches: [r],
							});
						return (
							n.dispatchEvent(i),
							{
								status: o.default.Success,
							}
						);
					}),
					(this.touchUp = (t, e) => {
						const n =
								this.ACTIVE_ELEMENT ||
								document.elementFromPoint(t, e),
							r = new Touch({
								identifier: 1,
								target: n,
								clientX: t,
								clientY: e,
								pageX: t,
								pageY: e,
							});
						(this.ACTIVE_ELEMENT = null),
							(this.LAST_X = 0),
							(this.LAST_Y = 0);
						const i = new TouchEvent('touchend', {
							bubbles: !0,
							changedTouches: [r],
						});
						return (
							n.dispatchEvent(i),
							{
								status: o.default.Success,
							}
						);
					}),
					(this.touchMove = (t, e) => {
						const n =
								this.ACTIVE_ELEMENT ||
								document.elementFromPoint(t, e),
							r = new Touch({
								identifier: 1,
								target: n,
								clientX: t,
								clientY: e,
								pageX: t,
								pageY: e,
							}),
							i = new TouchEvent('touchmove', {
								bubbles: !0,
								touches: [r],
								targetTouches: [r],
								changedTouches: [r],
							});
						return (
							!n.dispatchEvent(i) ||
								((document.documentElement.scrollLeft +=
									this.LAST_X - t),
								(document.documentElement.scrollTop +=
									this.LAST_Y - e)),
							(this.LAST_X = t),
							(this.LAST_Y = e),
							{
								status: o.default.Success,
							}
						);
					}),
					(this.actionElementFromPoint = (t, e) => {
						const n = document.elementFromPoint(t, e);
						if (!n)
							return {
								status: o.default.NoSuchElement,
								value: {
									message: 'no such element',
								},
							};
						let r = n;
						for (; !r.getAttribute('t_action'); )
							if (
								((r = r.parentElement),
								!r || r === document.body)
							) {
								r = n;
								break;
							}
						return {
							status: o.default.Success,
							value: {
								WEBVIEW_ELEMENT:
									this.nodeManager.getElementId(r),
							},
						};
					});
			}
			init() {
				super.init({
					[s.tapElement]: ({ ELEMENT: t }) => this.tapElement(t),
					[s.longtapElement]: ({ ELEMENT: t }) =>
						this.tapElement(t, !0),
					[s.touchDown]: ({ x: t, y: e }) => this.touchDown(t, e),
					[s.touchUp]: ({ x: t, y: e }) => this.touchUp(t, e),
					[s.touchMove]: ({ x: t, y: e }) => this.touchMove(t, e),
					[s.actionElementFromPoint]: ({ x: t, y: e }) =>
						this.actionElementFromPoint(t, e),
				});
			}
		}
		e.default = a;
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10),
			o =
				window.MutationObserver ||
				window.WebKitMutationObserver ||
				window.MozMutationObserver;
		e.default = class {
			constructor() {
				(this.scopedata = []),
					(this.oldScopeData = ''),
					(this.showScopeData = () => {
						const t = this;
						window.__virtualDOM__ && window.__DOMTree__
							? window.__virtualDOM__.spreadScopeDataToDOMNode()
							: setTimeout(() => {
									t.showScopeData();
							  }, 200);
					}),
					(this.mapNodes = t => {
						const e = this,
							n = t.childNodes;
						n &&
							n.forEach(t => {
								const n = e.getAttributes(t);
								n.attributes &&
									n.attributes.length > 0 &&
									e.scopedata.indexOf(n.attributes[1]) < 0 &&
									e.scopedata.push(n.attributes[1]),
									t.hasChildNodes && e.mapNodes(t);
							});
					}),
					(this.getAttributes = t => {
						const e = [];
						if (null == t ? void 0 : t.attributes)
							for (
								let n = 0, r = t.attributes.length;
								n < r;
								n++
							) {
								const r = t.attributes[n];
								'wx:scope-data' === r.name &&
									(e.push(r.name), e.push(r.value));
							}
						return {
							attributes: e,
						};
					}),
					(this.pageStart = () => {
						this.mapNodes(document.body),
							(this.oldScopeData = this.scopedata.toString()),
							r.default.send({
								command: 'SCOPEDATA',
								data: this.scopedata,
							});
					}),
					(this.addObserver = t => {
						const e = this,
							n = new o(() => {
								(this.scopedata = []),
									n.disconnect(),
									this.showScopeData(),
									this.mapNodes(document.body),
									e.addObserver(document.body),
									this.oldScopeData !==
										this.scopedata.toString() &&
										((this.oldScopeData =
											this.scopedata.toString()),
										r.default.send({
											command: 'SCOPEDATA',
											data: this.scopedata,
										}));
							});
						n.observe(t, {
							attributes: !0,
							characterData: !0,
							subtree: !0,
						});
					}),
					(this.compare = t => {
						if (
							'APPSERVICE_PUBLISH' === t.command &&
							'vdSyncBatch' === t.data.eventName
						) {
							if (
								((this.scopedata = []),
								this.showScopeData(),
								this.mapNodes(document.body),
								this.oldScopeData === this.scopedata.toString())
							)
								return;
							(this.oldScopeData = this.scopedata.toString()),
								r.default.send({
									command: 'SCOPEDATA',
									data: this.scopedata,
								});
						}
					}),
					setTimeout(() => {
						var t;
						(null === (t = window.__devtoolsConfig) || void 0 === t
							? void 0
							: t.scopeDataCheck) &&
							(this.showScopeData(),
							this.addObserver(document.body),
							this.pageStart(),
							r.default.registerCallback(t => {
								this.compare(t);
							}));
					}, 1e3);
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(10);
		e.default = {
			init: function () {
				r.default.registerCallback(t => {
					var e;
					const { command: n, scriptFile: o, skeletonConfig: i } = t;
					if ('GEN_SKELETON' === n) {
						const t = window.document.createElement('script');
						(t.textContent = o),
							window.document.body.appendChild(t);
						const n =
							null === (e = window.Skeleton) || void 0 === e
								? void 0
								: e.genSkeleton(i);
						r.default.send(
							Object.assign(
								{
									cmd: 'GEN_SKELETON_FINISHED',
								},
								n
							)
						);
					}
				});
			},
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		const r = n(170),
			o = n(171),
			i = n(172),
			s = n(173),
			a = n(174),
			c = n(175),
			u = n(94),
			l = n(64),
			h = n(56),
			d = n(22),
			p = n(10),
			f = n(176),
			g = n(178),
			E = n(179),
			m = `\n  [${d.PAGE_HANDLER_NODE_ATTRIBUTE}] {\n    cursor: pointer;\n  }\n\n  [data-ib-structured-id="root"] {\n    width: 100%;\n    height: 100%;\n  }\n\n  #__ib-container {\n    position: 'absolute';\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    position: absolute;\n    z-index: 1000000;\n    pointer-events: none;\n  }\n`;
		class v extends r.EventEmitter {
			constructor() {
				super(),
					(this._mounted = !1),
					(this._ready = !1),
					(this._actionTipsStatus = {
						'no-drag': !1,
						'jump-custom-component': !1,
						'disabled-drag': !1,
					}),
					(this.isPressAlt = !1),
					(this.isPressCrtl = !1),
					(this.handleClick = t => {
						this.stopImmediatePropagation(t);
					}),
					(this.handledbClick = t => {
						const e = d.getActualTarget(t.target);
						if (e) {
							if (
								Boolean(
									e.getAttribute(
										'exparser:info-custom-component'
									)
								)
							) {
								const t = e.getAttribute('is');
								this.sendMsg({
									eventName: 'editCustomComponent',
									data: {
										customName: t,
									},
								});
							}
						}
					}),
					(this.handleScroll = t => {
						this.stopImmediatePropagation(t),
							this.emit(h.PAGE_HANDLER_EVENT.SCROLL, t),
							this.resetSelect();
					}),
					(this.handleMouseDown = t => {
						const e = d.getActualTarget(t.target);
						e &&
							(this.selectNode(e, 'user'),
							this.stopImmediatePropagation(t)),
							this.emit(h.PAGE_HANDLER_EVENT.MOUSE_DOWN, t);
					}),
					(this.handleMouseLeave = t => {
						this.stopImmediatePropagation(t);
					}),
					(this.handleMouseMove = t => {
						const e = d.getActualTarget(t.target);
						e
							? (this.hoverNode(e, t),
							  this.altTipsCheck(),
							  this.stopImmediatePropagation(t))
							: this.unHover(),
							this.emit(h.PAGE_HANDLER_EVENT.MOUSE_MOVE, t);
					}),
					(this.handleMouseUp = t => {
						this.stopImmediatePropagation(t),
							this.emit(h.PAGE_HANDLER_EVENT.MOUSE_UP, t);
					}),
					(this.beforeInvoke = t =>
						!!g.ENABLE_INVOKE_API_MAP[t] ||
						(console.log('invoke disabled', t), !1)),
					(this.beforePublish = (t, e) => {
						if ('vdSync' === t) {
							const t = ((e || {}).data || [])[0];
							if (
								(t === h.SYNC_EVENT_NAME.SET_DATA_CALLBACK &&
									this.onUpdateRender(),
								t === h.SYNC_EVENT_NAME.WX_EVENT)
							)
								return !1;
						}
						return 'tapAnyWhere' !== t;
					}),
					(this.sendMsg = t => {
						p.default.send({
							command: 'IBWEBVIEW_PUBLISH',
							data: t,
						});
					}),
					(this.copyNodeByShortCut = () => {
						const t = this._selectedNodeId,
							e = d.getNodeById(t);
						t &&
							e &&
							this.sendMsg({
								eventName: h.PAGE_HANDLER_EVENT.COPY_NODE,
								data: {
									nodeId: t,
								},
							});
					}),
					(this.cutNodeByShortCut = () => {
						const t = this._selectedNodeId,
							e = d.getNodeById(t);
						t &&
							e &&
							this.sendMsg({
								eventName: h.PAGE_HANDLER_EVENT.CUT_NODE,
								data: {
									nodeId: t,
								},
							});
					}),
					(this.pasteNodeByShortCut = () => {
						this.sendMsg({
							eventName: h.PAGE_HANDLER_EVENT.PASTE_NODE,
							data: {},
						});
					}),
					(this.window = window),
					(this.document = document),
					(this.auxiliaryService = new E.AuxiliaryService(this)),
					(this.rotater = new o.default()),
					(this.selector = new s.Selector(this)),
					(this.resizer = new a.Resizer(this)),
					(this.dragger = new c.Dragger(this)),
					(this.sorter = new i.Sorter(this)),
					(this._container = document.createElement('div')),
					(this._style = document.createElement('style')),
					(this._container.id = '__ib-container'),
					(this._styleText = m),
					(this._selectedNodeId = ''),
					(this._selectedNodeIndex = 0),
					(this._hoveredNodeId = ''),
					(this._hoveredNode = null),
					(this._selectedNode = null),
					l.registerBeforePublish('ib', this.beforePublish),
					u.registerBeforeInvoke('ib', this.beforeInvoke);
			}
			get container() {
				return this._container;
			}
			get selectedNodeId() {
				return this._selectedNodeId;
			}
			get selectedNode() {
				return this._selectedNode;
			}
			get selectedNodeIndex() {
				return this._selectedNodeIndex;
			}
			get selectedNodeSelector() {
				return `${this._selectedNodeId}#${this._selectedNodeIndex}`;
			}
			get hoveredNodeId() {
				return this._hoveredNodeId;
			}
			get hoveredNode() {
				return this._hoveredNode;
			}
			async mount() {
				this._mounted ||
					(this.selector.mount(),
					this.sorter.mount(),
					this.resizer.mount(),
					this.dragger.mount(),
					this.rotater.mount(),
					this.auxiliaryService.mount(),
					document.documentElement.setAttribute(
						d.PAGE_HANDLER_NODE_ATTRIBUTE,
						'root'
					),
					document.body.setAttribute(
						d.PAGE_HANDLER_NODE_ATTRIBUTE,
						'body'
					),
					document.documentElement.appendChild(this._container),
					this.styleMount(),
					this.bindEvent(),
					(this._mounted = !0));
			}
			addStyle(t) {
				this._styleText += t;
			}
			styleMount() {
				const t = document.createTextNode(this._styleText);
				this._style.appendChild(t),
					this._container.appendChild(this._style);
			}
			hideActionTips(t) {
				(this._actionTipsStatus[t] = !1), this.setActionTips();
			}
			showActionTips(t) {
				(this._actionTipsStatus[t] = !0), this.setActionTips();
			}
			setActionTips() {
				let t = 'warn',
					e = '',
					n = '';
				this._actionTipsStatus['jump-custom-component'] &&
					((e = '双击编辑自定义组件'), (n = 'jump-custom-component')),
					this._actionTipsStatus['no-drag'] &&
						((e =
							'当前元素为 static 布局，按住 cmd/ctrl 可以强制拖动元素'),
						(t = 'error'),
						(n = 'no-drag')),
					this._actionTipsStatus['disabled-drag'] &&
						((e = '当前元素为空标签元素，不可添加子元素'),
						(t = 'error'),
						(n = 'disabled-drag')),
					this.sendMsg({
						eventName: h.PAGE_HANDLER_EVENT.ACTION_TIPS,
						data: {
							type: t,
							content: e,
							action: n,
						},
					});
			}
			bindEvent() {
				const { document: t } = this;
				window.addEventListener(
					'DOMNodeRemoved',
					e => {
						(e = e || event).relatedNode === t.documentElement &&
							setTimeout(() => {
								this.onUpdateRender();
							}, 200);
					},
					!1
				),
					window.addEventListener('click', this.handleClick, !1),
					window.addEventListener('dblclick', this.handledbClick, !1),
					window.addEventListener('mouseup', this.handleMouseUp, !1),
					window.addEventListener(
						'mousemove',
						this.handleMouseMove,
						!1
					),
					window.addEventListener(
						'mouseout',
						this.handleMouseLeave,
						!1
					),
					window.addEventListener(
						'mousedown',
						this.handleMouseDown,
						!1
					),
					t.addEventListener('mousewheel', this.handleMouseMove, !1),
					window.addEventListener(
						'contextmenu',
						t => {
							t.preventDefault(),
								this.emit(h.PAGE_HANDLER_EVENT.CONTEXT_MENU, t);
						},
						!1
					),
					window.addEventListener('scroll', this.handleScroll, !1),
					window.addEventListener('wheel', this.handleScroll, !1),
					p.default.registerCallback(t => {
						const { command: e, data: n } = t;
						'IBSERVICE_PUBLISH' === e &&
							this.handleServiceMessage(n);
					}),
					this.on(h.PAGE_HANDLER_EVENT.END_RESIZE, this.updateStyle),
					this.on(h.PAGE_HANDLER_EVENT.END_DRAG, this.updateStyle),
					f.shortCutService
						.addCommand(
							[f.KEYNAME.DELETE],
							() => {
								this.deleteNodeByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.DEL],
							() => {
								this.deleteNodeByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.UP],
							() => {
								this.moveNodeByShortCut(f.KEYNAME.UP);
							},
							!0
						)
						.addCommand(
							[f.KEYNAME.LEFT],
							() => {
								this.moveNodeByShortCut(f.KEYNAME.LEFT);
							},
							!0
						)
						.addCommand(
							[f.KEYNAME.DOWN],
							() => {
								this.moveNodeByShortCut(f.KEYNAME.DOWN);
							},
							!0
						)
						.addCommand(
							[f.KEYNAME.RIGHT],
							() => {
								this.moveNodeByShortCut(f.KEYNAME.RIGHT);
							},
							!0
						)
						.addCommand(
							[f.KEYNAME.CTRL, f.KEYNAME.C],
							() => {
								this.copyNodeByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.CTRL, f.KEYNAME.V],
							() => {
								this.pasteNodeByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.CTRL, f.KEYNAME.X],
							() => {
								this.cutNodeByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.CTRL, f.KEYNAME.Z],
							() => {
								this.goBackByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.CTRL, f.KEYNAME.SHIFT, f.KEYNAME.Z],
							() => {
								this.goAheadByShortCut();
							},
							!1
						)
						.addCommand(
							[f.KEYNAME.ALT],
							() => {
								(this.isPressAlt = !0), this.altTipsCheck();
							},
							!1,
							() => {
								(this.isPressAlt = !1), this.altTipsCheck();
							}
						)
						.addCommand(
							[f.KEYNAME.CTRL],
							() => {
								this.isPressCrtl = !0;
							},
							!1,
							() => {
								this.isPressCrtl = !1;
							}
						);
			}
			altTipsCheck() {
				if (!this.selectedNode) return;
				if (!this.isPressAlt)
					return void this.auxiliaryService.unCheckDistance();
				const t = this.hoveredNode || this.selectedNode.parentNode;
				this.auxiliaryService.checkDistance(this.selectedNode, [t], !0);
			}
			stopImmediatePropagation(t) {
				t.stopPropagation(), t.stopImmediatePropagation();
			}
			resetSelect(t = !1) {
				this.selectedNodeId &&
					((this._selectedNode = d.getNodesById(this.selectedNodeId)[
						this.selectedNodeIndex
					]),
					this.altTipsCheck(),
					t ||
						this.emit(
							h.PAGE_HANDLER_EVENT.SELECT_NODE,
							this.selectedNodeId,
							this._selectedNode
						));
			}
			handleServiceMessage(t = {}) {
				const e = t.data || {},
					n = d.getNodeById(e.nodeId);
				switch (t.eventName) {
					case h.PAGE_HANDLER_EVENT.HOVER_NODE:
						this.hoverNode(n);
						break;
					case h.PAGE_HANDLER_EVENT.SELECT_NODE:
						this.selectNode(n, e.origin || 'remote');
						break;
					case h.PAGE_HANDLER_EVENT.OUTER_MOUSE_UP: {
						console.log('OUTER_MOUSE_UP');
						const t = new Event('mouseup', {
							bubbles: !0,
							cancelable: !0,
						});
						(t.clientX = e.x),
							(t.clientY = e.y),
							(t.isOuterMouseMove = !0),
							this.emit(h.PAGE_HANDLER_EVENT.MOUSE_UP, t);
						break;
					}
					case h.PAGE_HANDLER_EVENT.OUTER_MOUSE_MOVE: {
						const t = document.elementFromPoint(e.x, e.y),
							n = new Event('mousemove', {
								bubbles: !0,
								cancelable: !0,
							});
						(n.clientX = e.x),
							(n.clientY = e.y),
							(n.isOuterMouseMove = !0),
							(n._compInfo = e.compInfo),
							t ? t.dispatchEvent(n) : this.unHover();
						break;
					}
				}
			}
			onUpdateRender() {
				this.mount(),
					document.documentElement.contains(this._container) ||
						document.documentElement.appendChild(this._container),
					setTimeout(() => {
						this.resetSelect();
					}, 100),
					this._ready ||
						((this._ready = !0),
						this.sendMsg({
							eventName: h.PAGE_HANDLER_EVENT.READY,
							data: {},
						})),
					this.emit(h.PAGE_HANDLER_EVENT.UPDATE_RENDER),
					this.sendMsg({
						eventName: h.PAGE_HANDLER_EVENT.UPDATE_RENDER,
						data: {},
					});
			}
			getPageNode() {
				return document.querySelector(
					`[${d.PAGE_HANDLER_CONTAINER_ATTRIBUTE}]`
				);
			}
			updateStyle(t, e = {}, n) {
				this.sendMsg({
					eventName: h.PAGE_HANDLER_EVENT.UPDATE_STYLE,
					data: {
						nodeId: t,
						info: e,
						deleteArr: n,
					},
				});
			}
			hoverNode(t, e) {
				const n = d.getNodeId(t),
					r = null == e ? void 0 : e.isOuterMouseMove;
				this.emit(h.PAGE_HANDLER_EVENT.HOVER_NODE, t, r),
					this.sendMsg({
						eventName: h.PAGE_HANDLER_EVENT.HOVER_NODE,
						data: {
							nodeId: n,
							info: {
								tagName: t.tagName,
								isEmptyElement: d.isEmptyElement(t),
							},
						},
					}),
					(this._hoveredNodeId = n || ''),
					(this._hoveredNode = t);
			}
			unHover() {
				this.selector.unHover(),
					(this._hoveredNodeId = ''),
					(this._hoveredNode = null);
			}
			unselect() {
				this.emit(h.PAGE_HANDLER_EVENT.UNSELECT_NODE, null, null),
					(this._selectedNodeId = ''),
					(this._selectedNodeIndex = 0),
					(this._selectedNode = null);
			}
			selectNode(t, e = 'user') {
				const n = d.getNodeId(t);
				this.checkVisible(t) || this.scrollToNode(t),
					(this._selectedNodeId = n || ''),
					(this._selectedNodeIndex = d.getNodeIndex(n, t)),
					(this._selectedNode = t),
					this.emit(h.PAGE_HANDLER_EVENT.SELECT_NODE, n, t),
					this.sendMsg({
						eventName: h.PAGE_HANDLER_EVENT.SELECT_NODE,
						data: {
							nodeId: n,
							info: {
								origin: e,
							},
						},
					});
			}
			scrollToNode(t) {
				t && window.scrollTo(0, t.offsetTop - 40);
			}
			checkVisible(t) {
				const e = t.getBoundingClientRect(),
					n = Math.max(
						document.documentElement.clientHeight,
						window.innerHeight
					);
				return !(e.bottom < 0 || e.top - n >= 0);
			}
			evalJs(t, e) {
				const { document: n } = this,
					r = n.createElement('script');
				(r.id = t), (r.innerHTML = e), n.body.appendChild(r);
			}
			moveNodeByShortCut(t) {
				if (!this.selectedNodeId) return;
				let e = 0,
					n = 0;
				switch (t) {
					case f.KEYNAME.LEFT:
						e = -1;
						break;
					case f.KEYNAME.RIGHT:
						e = 1;
						break;
					case f.KEYNAME.UP:
						n = -1;
						break;
					case f.KEYNAME.DOWN:
						n = 1;
				}
				this.dragger.moveTo(e, n);
			}
			deleteNodeByShortCut() {
				this.selectedNodeId &&
					this.sendMsg({
						eventName: h.PAGE_HANDLER_EVENT.DELETE_NODE,
						data: {
							nodeId: this.selectedNodeId,
						},
					});
			}
			goBackByShortCut() {
				this.sendMsg({
					eventName: h.PAGE_HANDLER_EVENT.GO_BACK,
					data: {},
				});
			}
			goAheadByShortCut() {
				this.sendMsg({
					eventName: h.PAGE_HANDLER_EVENT.GO_AHEAD,
					data: {},
				});
			}
		}
		e.default = v;
	},
	function (t, e, n) {
		'use strict';
		var r,
			o = 'object' == typeof Reflect ? Reflect : null,
			i =
				o && 'function' == typeof o.apply
					? o.apply
					: function (t, e, n) {
							return Function.prototype.apply.call(t, e, n);
					  };
		r =
			o && 'function' == typeof o.ownKeys
				? o.ownKeys
				: Object.getOwnPropertySymbols
				? function (t) {
						return Object.getOwnPropertyNames(t).concat(
							Object.getOwnPropertySymbols(t)
						);
				  }
				: function (t) {
						return Object.getOwnPropertyNames(t);
				  };
		var s =
			Number.isNaN ||
			function (t) {
				return t != t;
			};

		function a() {
			a.init.call(this);
		}
		(t.exports = a),
			(t.exports.once = function (t, e) {
				return new Promise(function (n, r) {
					function o() {
						void 0 !== i && t.removeListener('error', i),
							n([].slice.call(arguments));
					}
					var i;
					'error' !== e &&
						((i = function (n) {
							t.removeListener(e, o), r(n);
						}),
						t.once('error', i)),
						t.once(e, o);
				});
			}),
			(a.EventEmitter = a),
			(a.prototype._events = void 0),
			(a.prototype._eventsCount = 0),
			(a.prototype._maxListeners = void 0);
		var c = 10;

		function u(t) {
			if ('function' != typeof t)
				throw new TypeError(
					'The "listener" argument must be of type Function. Received type ' +
						typeof t
				);
		}

		function l(t) {
			return void 0 === t._maxListeners
				? a.defaultMaxListeners
				: t._maxListeners;
		}

		function h(t, e, n, r) {
			var o, i, s, a;
			if (
				(u(n),
				void 0 === (i = t._events)
					? ((i = t._events = Object.create(null)),
					  (t._eventsCount = 0))
					: (void 0 !== i.newListener &&
							(t.emit(
								'newListener',
								e,
								n.listener ? n.listener : n
							),
							(i = t._events)),
					  (s = i[e])),
				void 0 === s)
			)
				(s = i[e] = n), ++t._eventsCount;
			else if (
				('function' == typeof s
					? (s = i[e] = r ? [n, s] : [s, n])
					: r
					? s.unshift(n)
					: s.push(n),
				(o = l(t)) > 0 && s.length > o && !s.warned)
			) {
				s.warned = !0;
				var c = new Error(
					'Possible EventEmitter memory leak detected. ' +
						s.length +
						' ' +
						String(e) +
						' listeners added. Use emitter.setMaxListeners() to increase limit'
				);
				(c.name = 'MaxListenersExceededWarning'),
					(c.emitter = t),
					(c.type = e),
					(c.count = s.length),
					(a = c),
					console && console.warn && console.warn(a);
			}
			return t;
		}

		function d() {
			if (!this.fired)
				return (
					this.target.removeListener(this.type, this.wrapFn),
					(this.fired = !0),
					0 === arguments.length
						? this.listener.call(this.target)
						: this.listener.apply(this.target, arguments)
				);
		}

		function p(t, e, n) {
			var r = {
					fired: !1,
					wrapFn: void 0,
					target: t,
					type: e,
					listener: n,
				},
				o = d.bind(r);
			return (o.listener = n), (r.wrapFn = o), o;
		}

		function f(t, e, n) {
			var r = t._events;
			if (void 0 === r) return [];
			var o = r[e];
			return void 0 === o
				? []
				: 'function' == typeof o
				? n
					? [o.listener || o]
					: [o]
				: n
				? (function (t) {
						for (
							var e = new Array(t.length), n = 0;
							n < e.length;
							++n
						)
							e[n] = t[n].listener || t[n];
						return e;
				  })(o)
				: E(o, o.length);
		}

		function g(t) {
			var e = this._events;
			if (void 0 !== e) {
				var n = e[t];
				if ('function' == typeof n) return 1;
				if (void 0 !== n) return n.length;
			}
			return 0;
		}

		function E(t, e) {
			for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
			return n;
		}
		Object.defineProperty(a, 'defaultMaxListeners', {
			enumerable: !0,
			get: function () {
				return c;
			},
			set: function (t) {
				if ('number' != typeof t || t < 0 || s(t))
					throw new RangeError(
						'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
							t +
							'.'
					);
				c = t;
			},
		}),
			(a.init = function () {
				(void 0 !== this._events &&
					this._events !== Object.getPrototypeOf(this)._events) ||
					((this._events = Object.create(null)),
					(this._eventsCount = 0)),
					(this._maxListeners = this._maxListeners || void 0);
			}),
			(a.prototype.setMaxListeners = function (t) {
				if ('number' != typeof t || t < 0 || s(t))
					throw new RangeError(
						'The value of "n" is out of range. It must be a non-negative number. Received ' +
							t +
							'.'
					);
				return (this._maxListeners = t), this;
			}),
			(a.prototype.getMaxListeners = function () {
				return l(this);
			}),
			(a.prototype.emit = function (t) {
				for (var e = [], n = 1; n < arguments.length; n++)
					e.push(arguments[n]);
				var r = 'error' === t,
					o = this._events;
				if (void 0 !== o) r = r && void 0 === o.error;
				else if (!r) return !1;
				if (r) {
					var s;
					if ((e.length > 0 && (s = e[0]), s instanceof Error))
						throw s;
					var a = new Error(
						'Unhandled error.' + (s ? ' (' + s.message + ')' : '')
					);
					throw ((a.context = s), a);
				}
				var c = o[t];
				if (void 0 === c) return !1;
				if ('function' == typeof c) i(c, this, e);
				else {
					var u = c.length,
						l = E(c, u);
					for (n = 0; n < u; ++n) i(l[n], this, e);
				}
				return !0;
			}),
			(a.prototype.addListener = function (t, e) {
				return h(this, t, e, !1);
			}),
			(a.prototype.on = a.prototype.addListener),
			(a.prototype.prependListener = function (t, e) {
				return h(this, t, e, !0);
			}),
			(a.prototype.once = function (t, e) {
				return u(e), this.on(t, p(this, t, e)), this;
			}),
			(a.prototype.prependOnceListener = function (t, e) {
				return u(e), this.prependListener(t, p(this, t, e)), this;
			}),
			(a.prototype.removeListener = function (t, e) {
				var n, r, o, i, s;
				if ((u(e), void 0 === (r = this._events))) return this;
				if (void 0 === (n = r[t])) return this;
				if (n === e || n.listener === e)
					0 == --this._eventsCount
						? (this._events = Object.create(null))
						: (delete r[t],
						  r.removeListener &&
								this.emit(
									'removeListener',
									t,
									n.listener || e
								));
				else if ('function' != typeof n) {
					for (o = -1, i = n.length - 1; i >= 0; i--)
						if (n[i] === e || n[i].listener === e) {
							(s = n[i].listener), (o = i);
							break;
						}
					if (o < 0) return this;
					0 === o
						? n.shift()
						: (function (t, e) {
								for (; e + 1 < t.length; e++) t[e] = t[e + 1];
								t.pop();
						  })(n, o),
						1 === n.length && (r[t] = n[0]),
						void 0 !== r.removeListener &&
							this.emit('removeListener', t, s || e);
				}
				return this;
			}),
			(a.prototype.off = a.prototype.removeListener),
			(a.prototype.removeAllListeners = function (t) {
				var e, n, r;
				if (void 0 === (n = this._events)) return this;
				if (void 0 === n.removeListener)
					return (
						0 === arguments.length
							? ((this._events = Object.create(null)),
							  (this._eventsCount = 0))
							: void 0 !== n[t] &&
							  (0 == --this._eventsCount
									? (this._events = Object.create(null))
									: delete n[t]),
						this
					);
				if (0 === arguments.length) {
					var o,
						i = Object.keys(n);
					for (r = 0; r < i.length; ++r)
						'removeListener' !== (o = i[r]) &&
							this.removeAllListeners(o);
					return (
						this.removeAllListeners('removeListener'),
						(this._events = Object.create(null)),
						(this._eventsCount = 0),
						this
					);
				}
				if ('function' == typeof (e = n[t])) this.removeListener(t, e);
				else if (void 0 !== e)
					for (r = e.length - 1; r >= 0; r--)
						this.removeListener(t, e[r]);
				return this;
			}),
			(a.prototype.listeners = function (t) {
				return f(this, t, !0);
			}),
			(a.prototype.rawListeners = function (t) {
				return f(this, t, !1);
			}),
			(a.listenerCount = function (t, e) {
				return 'function' == typeof t.listenerCount
					? t.listenerCount(e)
					: g.call(t, e);
			}),
			(a.prototype.listenerCount = g),
			(a.prototype.eventNames = function () {
				return this._eventsCount > 0 ? r(this._events) : [];
			});
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		});
		e.default = class {
			mount() {}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Sorter = void 0);
		e.Sorter = class {
			constructor(t) {
				(this._enable = !0), (this.ib = t);
			}
			mount() {
				this.registerListeners(), this.initStyle();
			}
			initStyle() {
				this.ib.addStyle(
					'\n      .sortable-ghost {\n        border: 4px solid #1bef35b3;\n        background: #1bef35b3;\n        opacity: 0.3;\n      }\n      .sortable-drag {\n        background: #1c77bf33\n      }\n    '
				);
			}
			unmount() {
				this.destorySortable();
			}
			enable(t) {
				return (this._enable = t);
			}
			registerListeners() {}
			initSortable() {
				this.destorySortable();
				document.body && this._enable;
			}
			destorySortable() {
				var t, e;
				try {
					null ===
						(e =
							null === (t = this.sortable) || void 0 === t
								? void 0
								: t.destroy) ||
						void 0 === e ||
						e.call(t),
						(this.sortable = void 0);
				} catch (t) {
					console.log(t);
				}
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Selector = void 0);
		const r = n(22),
			o = n(56);
		e.Selector = class {
			constructor(t) {
				(this.objResizeObserver = null),
					(this.objIntersectionObserver = null),
					(this.lastSelectedNodeRect = {}),
					(this.hover = (t, e) => {
						if (!t) return;
						const n = r.getNodeInfo(t);
						let o = '';
						if (
							(e &&
								((o = 'background: rgba(38, 158, 84, .4);'),
								(this._hoverNode.innerHTML = ''),
								r.isEmptyElement(t)
									? ((o = ''),
									  this.ib.showActionTips('disabled-drag'))
									: this.ib.hideActionTips('disabled-drag')),
							n)
						) {
							const t = `\n        border: 1px dashed #269e54;\n        ${o}\n      `;
							this.updateStyle(this._hoverNode, n, t);
						}
					}),
					(this.mouseup = t => {
						console.log('mouseup', t),
							t.isOuterMouseMove &&
								this.ib.hideActionTips('disabled-drag');
					}),
					(this.unHover = () => {
						this._hoverNode &&
							((this._hoverNode.style.display = 'none'),
							(this._hoverNode.innerHTML = '')),
							this.ib.hideActionTips('disabled-drag');
					}),
					(this.unSelect = () => {
						this._selectNodeWrapper &&
							(this._selectNodeWrapper.remove(),
							(this._selectNodeWrapper =
								this.createNode('select-wrapper')),
							this._container.appendChild(
								this._selectNodeWrapper
							),
							(this._selectNodeWrapper.style.display = 'none'));
						const t = document.querySelectorAll(
							'.__ib-selected-node'
						);
						for (const e of t)
							e.classList.remove('__ib-selected-node'),
								e.classList.remove(
									'__ib-selected-node-notdrag'
								);
						return (
							this.unHover(), this.unObserverSelectedNode(), this
						);
					}),
					(this.select = (t, e) => {
						if ((this.unSelect(), !t || !e)) return;
						const n = document.createDocumentFragment();
						r.getNodesById(t).forEach(o => {
							const i = r.getNodeInfo(o);
							if (!i) return;
							if (o === e) {
								e.classList.add('__ib-selected-node');
								'static' === getComputedStyle(e).position &&
									e.classList.add(
										'__ib-selected-node-notdrag'
									);
							}
							const s = this.createNode('select'),
								a = e.tagName || '';
							(
								null == o
									? void 0
									: o.getAttribute(
											'exparser:info-custom-component'
									  )
							)
								? this.ib.showActionTips(
										'jump-custom-component'
								  )
								: this.ib.hideActionTips(
										'jump-custom-component'
								  ),
								s.setAttribute('data-id', t),
								s.setAttribute(
									'data-desc',
									a.replace('WX-', '')
								);
							let c = '\n        cursor: move;\n      ';
							o !== e &&
								(c =
									'\n          background: #269e54;\n          opacity: 0.1;\n        '),
								this.updateStyle(s, i, c),
								n.appendChild(s);
						}),
							this._selectNodeWrapper.appendChild(n),
							(this._selectNodeWrapper.style.display = 'block'),
							this.observerSelectedNode();
					}),
					(this.ib = t),
					(this._container = document.createElement('div')),
					(this._container.id = '__ib-selector-wrapper'),
					(this._hoverNode = this.createNode('hover')),
					(this._selectNodeWrapper =
						this.createNode('select-wrapper'));
			}
			mount() {
				this._container.appendChild(this._hoverNode),
					this._container.appendChild(this._selectNodeWrapper),
					this.ib.container.appendChild(this._container),
					this.registerListeners(),
					this.ib.addStyle(
						'\n      .__ib-selected-node,\n      .__ib-selected-node > * {\n        cursor: move;\n      }\n\n      .__ib-selected-node[is],\n      .__ib-selected-node[is] > * {\n        cursor: pointer;\n      }\n\n      .__ib-selected-node-notdrag,\n      .__ib-selected-node-notdrag > *,\n      .__ib-selected-node-notdrag[is],\n      .__ib-selected-node-notdrag[is] > * {\n        cursor: pointer;\n      }\n\n\n      .__ib-selector-select::before {\n        font-size: 10px;\n        position: absolute;\n        left: -1px;\n        top: 0;\n        content: attr(data-desc);\n        background: rgb(38,158, 84);\n        color: #fff;\n        padding: 0 1px;\n        /* font-weight: bold; */\n        box-sizing: border-box;\n        transform: translateY(-100%);\n        /* color: rgb(38, 158, 84); */\n        border: 1px solid rgb(38,158,84);\n      }\n\n      .__ib-selector-select-tips {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        left: 0;\n        top: 0;\n        background: rgba(38, 158, 84, 1);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        color: #fff;\n        font-size: 12px;\n        overflow: hidden;\n      }\n\n      .__ib-selector-select-tips: hover {\n        opacity: 1;\n      }\n\n      .__ib-selector-select-tips[data-action="jump-custom-c omponent"] {\n        background: rgba(232, 139, 59, .7);\n      }\n\n      .__ib-selector-select-tips[data-action="no-drag"] {\n        background: rgba(247, 166, 166, .9);\n      }\n\n      .__ib-selector-select-tips[data-action="disbaled-drag"] {\n        background: rgba(247, 166, 166, .9);\n      }\n\n      .__ib-selector-select-tips svg {\n        width: 10%;\n        height: 10%;\n        min-width: 14px;\n        min-height: 14px;\n        max-width: 48px;\n        max-height: 48px;\n        fill: #fff;\n      }\n    '
					);
			}
			registerListeners() {
				this.ib.on(o.PAGE_HANDLER_EVENT.UPDATE_RENDER, this.select),
					this.ib.on(o.PAGE_HANDLER_EVENT.SELECT_NODE, this.select),
					this.ib.on(o.PAGE_HANDLER_EVENT.DRAGGING, this.select),
					this.ib.on(o.PAGE_HANDLER_EVENT.RESIZING, this.select),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.unSelect
					),
					this.ib.on(o.PAGE_HANDLER_EVENT.HOVER_NODE, this.hover),
					this.ib.on(o.PAGE_HANDLER_EVENT.MOUSE_UP, this.mouseup),
					this.ib.on(o.PAGE_HANDLER_EVENT.LEAVE, this.unHover);
			}
			unmount() {
				this.ib.off(o.PAGE_HANDLER_EVENT.UPDATE_RENDER, this.select),
					this.ib.off(o.PAGE_HANDLER_EVENT.SELECT_NODE, this.select),
					this.ib.off(o.PAGE_HANDLER_EVENT.DRAGGING, this.select),
					this.ib.off(o.PAGE_HANDLER_EVENT.RESIZING, this.select),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.unSelect
					),
					this.ib.off(o.PAGE_HANDLER_EVENT.HOVER_NODE, this.hover),
					this.ib.off(o.PAGE_HANDLER_EVENT.MOUSE_UP, this.mouseup),
					this.ib.off(o.PAGE_HANDLER_EVENT.LEAVE, this.unHover);
			}
			createNode(t) {
				const e = document.createElement('div');
				return (
					(e.className = '__ib-selector-' + t),
					(e.style.display = 'none'),
					e
				);
			}
			hideSelectorTips(t, e) {
				const [n, r = '0'] = t.split('#'),
					o = +r,
					i = this._selectNodeWrapper.querySelectorAll(
						`.__ib-selector-select[data-id="${n}"]`
					)[o];
				if (i) {
					const t = i.querySelector(
						`.__ib-selector-select-tips[data-action="${e}"]`
					);
					t && t.remove();
				}
			}
			observerSelectedNode() {
				this.unObserverSelectedNode(),
					this.ib.selectedNode &&
						((this.lastSelectedNodeRect = {
							width: this.ib.selectedNode.clientWidth,
							height: this.ib.selectedNode.clientHeight,
						}),
						(this.objResizeObserver = new ResizeObserver(t => {
							window.requestAnimationFrame(() => {
								if (Array.isArray(t) && t.length) {
									var e = t[0].target;
									e === this.ib.selectedNode &&
										((e.clientWidth ===
											this.lastSelectedNodeRect.width &&
											e.clientHeight ===
												this.lastSelectedNodeRect
													.height) ||
											(this.select(
												this.ib.selectedNodeId,
												this.ib.selectedNode
											),
											this.ib.resetSelect(!0),
											(this.lastSelectedNodeRect = {
												width: e.clientWidth,
												height: e.clientHeight,
											})));
								}
							});
						})),
						this.objResizeObserver.observe(this.ib.selectedNode));
			}
			unObserverSelectedNode() {
				var t, e, n, r;
				null ===
					(e =
						null === (t = this.objResizeObserver) || void 0 === t
							? void 0
							: t.disconnect) ||
					void 0 === e ||
					e.call(t),
					null ===
						(r =
							null === (n = this.objIntersectionObserver) ||
							void 0 === n
								? void 0
								: n.disconnect) ||
						void 0 === r ||
						r.call(n);
			}
			update() {}
			updateStyle(t, e, n = '') {
				const { width: r, height: o, top: i, left: s } = e;
				t.style.cssText = `\n      position: absolute;\n      width: ${r}px;\n      height: ${o}px;\n      left: ${s}px;\n      top: ${i}px;\n      border: 1px solid #269e54;\n      box-sizing: border-box;\n      ${n}\n    `;
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Resizer = void 0);
		const r = n(22),
			o = n(56);
		var i;
		!(function (t) {
			(t.TOP = 't'),
				(t.TOP_RIGHT = 'tr'),
				(t.RIGHT = 'r'),
				(t.BOTTOM_RIGHT = 'br'),
				(t.BOTTOM = 'b'),
				(t.BOTTOM_LEFT = 'bl'),
				(t.LEFT = 'l'),
				(t.TOP_LEFT = 'tl');
		})(i || (i = {}));
		e.Resizer = class {
			constructor(t) {
				(this._direction = ''),
					(this.canResize = !1),
					(this.effectX = 0),
					(this.effectY = 0),
					(this.hasResized = !1),
					(this.newSize = null),
					(this.isInline = !1),
					(this.target = null),
					(this.cursorStyle = null),
					(this.deleteArr = []),
					(this.originPoint = {
						startX: 0,
						startY: 0,
						width: 0,
						height: 0,
						left: 0,
						position: '',
						top: 0,
					}),
					(this.resetState = () => {
						(this.canResize = !1),
							(this.isInline = !1),
							(this.originPoint = {
								startX: 0,
								startY: 0,
								width: 0,
								height: 0,
								position: '',
								left: 0,
								top: 0,
							}),
							(this.newSize = null),
							this.cursorStyle &&
								this._container.removeChild(this.cursorStyle),
							(this.cursorStyle = null),
							(this.hasResized = !1),
							(this.deleteArr = []);
					}),
					(this.addCursorStyle = t => {
						this.cursorStyle ||
							((this.cursorStyle =
								document.createElement('style')),
							this._container.appendChild(this.cursorStyle)),
							(this.cursorStyle.innerHTML = `\n      * { cursor: ${t} !important; }\n    `);
					}),
					(this.handleMouseDown = t => {
						const e = t.target;
						if (
							!e ||
							!e.matches(
								'.__ib-resizer-cursor-wrapper .__ib-resizer-cursor'
							)
						)
							return;
						if (!this.target) return;
						(this._direction = e.getAttribute('data-direction')),
							(this.canResize = !0),
							this.addCursorStyle(e.style.cursor),
							(this.effectX = this._direction.includes('r')
								? 1
								: this._direction.includes('l')
								? -1
								: 0),
							(this.effectY = this._direction.includes('b')
								? 1
								: this._direction.includes('t')
								? -1
								: 0);
						const n = getComputedStyle(this.target);
						'inline' === n.display && (this.isInline = !0),
							(this.originPoint = {
								startX: t.clientX,
								startY: t.clientY,
								width: this.target.clientWidth,
								height: this.target.clientHeight,
								position: n.position,
								left: r.pxToNum(n.left),
								top: r.pxToNum(n.top),
							}),
							this.ib.dragger.setCanDrag(!1),
							t.stopPropagation();
					}),
					(this.handleMouseMove = t => {
						if (!this.canResize || !this.target) return;
						const { startX: e, startY: n } = this.originPoint,
							i = t.clientX - e,
							s = t.clientY - n,
							{ width: a, height: c } = this.originPoint;
						if (!this.canResize || !this.target) return;
						if (
							((this.newSize = this.calucateSize(i, s)),
							this.newSize.width === a &&
								this.newSize.height === c)
						)
							return;
						const u = this.ib.auxiliaryService.checkSize(
							this.target,
							this.newSize.width,
							this.newSize.height
						);
						u.nearWidthNode
							? ((this.newSize.width += u.minWidthDifferent),
							  this.showSizeLine(
									u.nearWidthNode,
									'width',
									this.newSize.width
							  ))
							: this.hideSizeLine('width'),
							u.nearHeightNode
								? ((this.newSize.height +=
										u.minHeightDifferent),
								  this.showSizeLine(
										u.nearHeightNode,
										'height',
										this.newSize.height
								  ))
								: this.hideSizeLine('height'),
							this.showSizeTips(
								`${r.numToRpx(
									this.newSize.width
								)} x ${r.numToRpx(this.newSize.height)}`,
								t.clientX,
								t.clientY
							);
						const l = {
							width: this.newSize.width + 'px',
							height: this.newSize.height + 'px',
						};
						this.hasResized ||
							((l.boxSizing = 'border-box'),
							this.isInline && (l.display = 'inline-block'));
						const h = getComputedStyle(this.target);
						if ('static' !== h.position)
							switch (this._direction) {
								case 'tl':
									(l.left = this.originPoint.left + i + 'px'),
										(l.top =
											this.originPoint.top + s + 'px');
									break;
								case 'tr':
									l.top = this.originPoint.top + s + 'px';
									break;
								case 'bl':
									l.left = this.originPoint.left + i + 'px';
							}
						'0' !== h.flexGrow &&
							((l.flex = 'none'),
							(l.flexGrow = 0),
							this.deleteArr.push('flex'),
							this.deleteArr.push('flexGrow')),
							(this.hasResized = !0),
							Object.assign(this.target.style, l),
							this.ib.emit(
								o.PAGE_HANDLER_EVENT.RESIZING,
								this.ib.selectedNodeId,
								this.target
							),
							t.stopPropagation();
					}),
					(this.handleMouseUp = () => {
						if (this.canResize) {
							if (
								this.target &&
								this.hasResized &&
								this.newSize
							) {
								const t = getComputedStyle(this.target),
									e = {
										width: r.numToRpx(this.newSize.width),
										height: r.numToRpx(this.newSize.height),
										display: t.display,
										'box-sizing': t.boxSizing,
									};
								'static' !== t.position &&
									((e.left = r.pxToRpx(t.left)),
									(e.top = r.pxToRpx(t.top))),
									this.ib.emit(
										o.PAGE_HANDLER_EVENT.END_RESIZE,
										r.getNodeId(this.target),
										e,
										this.deleteArr
									);
							}
							this.resetState(),
								this.hideAllSizeLine(),
								this.hideSizeTips(),
								this.ib.dragger.setCanDrag(!0);
						} else this.hideAllSizeLine();
					}),
					(this.onUnSelect = () => {
						this.removeCursor(), this.resetState();
					}),
					(this.update = (t, e) => {
						if (
							(this.removeCursor(),
							e && e !== document.documentElement)
						) {
							this.target = e;
							if (
								'inline' ===
								getComputedStyle(this.target).display
							)
								return;
							const t = r.getNodeInfo(e);
							t &&
								((this._resizeCursorWrapper.style.cssText = `\n          position: absolute;\n          width: ${t.width}px;\n          height: ${t.height}px;\n          left: ${t.left}px;\n          top: ${t.top}px;\n          box-sizing: border-box;\n        `),
								this.createCursorNode(
									this._resizeCursorWrapper
								),
								this._container.appendChild(
									this._resizeCursorWrapper
								));
						}
					}),
					(this.ib = t),
					(this._container = document.createElement('div')),
					(this._container.id = '__ib-resizer-wrapper'),
					(this._resizeCursorWrapper = document.createElement('div')),
					(this._resizeCursorWrapper.className =
						'__ib-resizer-cursor-wrapper'),
					(this._sizeTipsNode = document.createElement('div')),
					(this._sizeTipsNode.className = '__ib-resizer-size-tips'),
					(this._widthSizeTipsNode = document.createElement('div')),
					(this._widthSizeTipsNode.className =
						'__ib-resizer-width-line'),
					(this._heightSizeTipsNode = document.createElement('div')),
					(this._heightSizeTipsNode.className =
						'__ib-resizer-height-line'),
					(this._widthSizeTipsCompareNode =
						document.createElement('div')),
					(this._widthSizeTipsCompareNode.className =
						'__ib-resizer-near-width-line'),
					(this._heightSizeTipsCompareNode =
						document.createElement('div')),
					(this._heightSizeTipsCompareNode.className =
						'__ib-resizer-near-height-line');
			}
			mount() {
				this._resizeCursorWrapper.appendChild(this._sizeTipsNode),
					this._resizeCursorWrapper.appendChild(
						this._widthSizeTipsNode
					),
					this._resizeCursorWrapper.appendChild(
						this._heightSizeTipsNode
					),
					this._container.appendChild(this._widthSizeTipsCompareNode),
					this._container.appendChild(
						this._heightSizeTipsCompareNode
					),
					this._container.appendChild(this._resizeCursorWrapper),
					this.ib.container.appendChild(this._container),
					this.registerListeners(),
					this.ib.addStyle(
						'\n      .__ib-resizer-cursor {\n        position: absolute;\n        pointer-events: all;\n        width: 6px;\n        height: 6px;\n        background: #fff;\n        border: 1px solid #269e54;\n      }\n\n      .__ib-resizer-cursor-t {\n        left: 50%;\n        top: -4px;\n        transform: translateX(-50%);\n      }\n      .__ib-resizer-cursor-tr {\n        right: -4px;\n        top: -4px;\n      }\n\n      .__ib-resizer-cursor-r {\n        right: -4px;\n        top: 50%;\n        transform: translateY(-50%);\n      }\n\n      .__ib-resizer-cursor-br {\n        right: -3px;\n        bottom: -3px;\n      }\n\n      .__ib-resizer-cursor-b {\n        left: 50%;\n        bottom: -4px;\n        transform: translateX(-50%);\n      }\n\n      .__ib-resizer-cursor-bl {\n        left: -4px;\n        bottom: -4px;\n      }\n\n      .__ib-resizer-cursor-l {\n        left: -4px;\n        top: 50%;\n        transform: translateY(-50%);\n      }\n\n      .__ib-resizer-cursor-tl {\n        left: -4px;\n        top: -4px;\n      }\n\n      .__ib-resizer-size-tips {\n        position: fixed;\n        background: rgba(0, 0, 0, .6);\n        color: #fff;\n        border-radius: 4px;\n        line-height: 16px;\n        font-size: 12px;\n        padding: 2px 6px;\n        display: none;\n      }\n\n      .__ib-resizer-near-width-line,\n      .__ib-resizer-near-height-line,\n      .__ib-resizer-width-line,\n      .__ib-resizer-height-line {\n        display: none;\n        position: absolute;\n        box-sizing: border-box;\n      }\n\n      .__ib-resizer-near-width-line {\n        height: 8px;\n        border-left: 2px solid #0b98f1;\n        border-right: 2px solid #0b98f1;\n      }\n\n      .__ib-resizer-near-height-line {\n        width: 8px;\n        border-top: 2px solid #0b98f1;\n        border-bottom: 2px solid #0b98f1;\n      }\n\n      .__ib-resizer-near-width-line:after {\n        content: "";\n        position: absolute;\n        width: 100%;\n        height: 1px;\n        background: #0b98f1;\n        left: 0;\n        top: 50%;\n      }\n\n      .__ib-resizer-near-height-line:after {\n        content: "";\n        position: absolute;\n        height: 100%;\n        width: 1px;\n        background: #0b98f1;\n        left: 50%;\n        top: 0;\n      }\n\n\n      .__ib-resizer-width-line {\n        line-height: 14px;\n        color: #0b98f1;\n        text-align: center;\n        width: 100%;\n        border-left: 2px solid #0b98f1;\n        border-right: 2px solid #0b98f1;\n        top: -16px;\n        height: 8px;\n        left: 0;\n        box-sizing: border-box;\n      }\n\n      .__ib-resizer-width-line:before {\n        content: "";\n        position: absolute;\n        width: 100%;\n        height: 1px;\n        background: #0b98f1;\n        left: 0;\n        top: 50%;\n    }\n\n      .__ib-resizer-width-line:after {\n        content: attr(data-value);\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        transform: translate(-50%, -120%);\n        padding: 0 4px;\n        font-size: 10px;\n        background: #0b98f1;\n        color: #fff;\n        border-radius: 20px;\n      }\n\n      .__ib-resizer-height-line {\n        display: none;\n        position: absolute;\n        line-height: 14px;\n        color: #0b98f1;\n        text-align: center;\n        height: 100%;\n        border-top: 2px solid #0b98f1;\n        border-bottom: 2px solid #0b98f1;\n        left: -16px;\n        top: 0;\n        width: 8px;\n        box-sizing: border-box;\n\n      }\n\n      .__ib-resizer-height-line:before {\n        content: "";\n        position: absolute;\n        height: 100%;\n        width: 1px;\n        background: #0b98f1;\n        left: 50%;\n        top: 0;\n    }\n\n      .__ib-resizer-height-line:after {\n        content: attr(data-value);\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        background: #fff;\n        transform: translate(-110%, -50%);\n        padding: 0 4px;\n        font-size: 10px;\n        transfrom: rotate(-90deg);\n        background: #0b98f1;\n        color: #fff;\n        border-radius: 20px;\n      }\n\n    '
					);
			}
			registerListeners() {
				this.ib.on(o.PAGE_HANDLER_EVENT.SELECT_NODE, this.update),
					this.ib.on(o.PAGE_HANDLER_EVENT.DRAGGING, this.update),
					this.ib.on(o.PAGE_HANDLER_EVENT.RESIZING, this.update),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.onUnSelect
					),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.MOUSE_MOVE,
						this.handleMouseMove
					),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.MOUSE_UP,
						this.handleMouseUp
					);
			}
			unmount() {
				this.ib.off(o.PAGE_HANDLER_EVENT.SELECT_NODE, this.update),
					this.ib.off(o.PAGE_HANDLER_EVENT.DRAGGING, this.update),
					this.ib.off(o.PAGE_HANDLER_EVENT.RESIZING, this.update),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.onUnSelect
					),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.MOUSE_MOVE,
						this.handleMouseMove
					),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.MOUSE_UP,
						this.handleMouseUp
					);
			}
			showSizeTips(t, e, n) {
				(this._sizeTipsNode.innerText = t),
					(this._sizeTipsNode.style.left = e + 20 + 'px'),
					(this._sizeTipsNode.style.top = n + 20 + 'px'),
					(this._sizeTipsNode.style.display = 'block');
			}
			hideSizeTips() {
				(this._sizeTipsNode.innerText = ''),
					(this._sizeTipsNode.style.left = '-1px'),
					(this._sizeTipsNode.style.top = '-1px'),
					(this._sizeTipsNode.style.display = 'none');
			}
			showSizeLine(t, e, n) {
				t &&
					('width' === e
						? (this._widthSizeTipsNode.setAttribute(
								'data-value',
								r.numToRpx(n)
						  ),
						  (this._widthSizeTipsNode.style.display = 'block'),
						  (this._widthSizeTipsCompareNode.style.display =
								'block'),
						  (this._widthSizeTipsCompareNode.style.cssText = `\n        display: block;\n        width: ${
								t.width
						  }px;\n        left: ${t.left}px;\n        top: ${
								t.top - 16
						  }px;\n      `))
						: (this._heightSizeTipsNode.setAttribute(
								'data-value',
								r.numToRpx(n)
						  ),
						  (this._heightSizeTipsNode.style.display = 'block'),
						  (this._heightSizeTipsCompareNode.style.cssText = `\n        display: block;\n        height: ${
								t.height
						  }px;\n        left: ${t.left - 16}px;\n        top: ${
								t.top
						  }px;\n      `)));
			}
			hideSizeLine(t) {
				'width' === t
					? ((this._widthSizeTipsNode.style.display = 'none'),
					  (this._widthSizeTipsCompareNode.style.display = 'none'))
					: ((this._heightSizeTipsNode.style.display = 'none'),
					  (this._heightSizeTipsCompareNode.style.display = 'none'));
			}
			hideAllSizeLine() {
				this.hideSizeLine('width'), this.hideSizeLine('height');
			}
			calucateSize(t, e) {
				return {
					width: this.originPoint.width + t * this.effectX,
					height: this.originPoint.height + e * this.effectY,
				};
			}
			removeCursor() {
				this._resizeCursorWrapper
					.querySelectorAll('.__ib-resizer-cursor')
					.forEach(t => {
						t.remove();
					});
			}
			createCursorNode(t) {
				const e = r.getNewCursorArray(0);
				['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'].map((n, r) => {
					const o = document.createElement('div');
					(o.className =
						'__ib-resizer-cursor __ib-resizer-cursor-' + n),
						o.setAttribute('data-direction', n),
						(o.style.cursor = e[r]),
						o.addEventListener(
							'mousedown',
							this.handleMouseDown,
							!1
						),
						t.appendChild(o);
				});
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.Dragger = void 0);
		const r = n(22),
			o = n(56);
		e.Dragger = class {
			constructor(t) {
				(this.startX = 0),
					(this.startY = 0),
					(this.left = 0),
					(this.top = 0),
					(this.newPosition = {}),
					(this.hasMoved = !1),
					(this.isMouseDown = !1),
					(this.isStatic = !1),
					(this.target = null),
					(this.selectedNodes = []),
					(this.canDrag = !0),
					(this.onSelectNode = (t, e) => {
						(this.target = e),
							(this.selectedNodes = r.getNodesById(t));
					}),
					(this.onUnSelect = () => {
						this.resetState();
					}),
					(this.handleMouseDown = t => {
						this.target &&
							(this.beforeDrag(),
							(this.startX = t.clientX),
							(this.startY = t.clientY),
							(this.isMouseDown = !0));
					}),
					(this.handleMouseMove = t => {
						const { startX: e, startY: n } = this;
						let r = t.clientX - e,
							o = t.clientY - n;
						if (!this.isMouseDown || !this.target || !this.canDrag)
							return;
						if (0 === r && 0 === o) return;
						if (this.isStatic) {
							if (!this.ib.isPressCrtl)
								return void this.ib.showActionTips('no-drag');
							(this.canDrag = !0),
								(this.target.style.position =
									this.newPosition.position || 'relative');
						}
						const i = this.left + r,
							s = this.top + o;
						(this.target.style.left = i + 'px'),
							(this.target.style.top = s + 'px');
						const a = this.ib.auxiliaryService.checkLocation(
							this.target
						);
						(r -= a.deltaX),
							(o -= a.deltaY),
							this.updatePosition(r, o);
						const c = [];
						a.deltaXCompareNode && c.push(a.deltaXCompareNode),
							a.deltaYCompareNode && c.push(a.deltaYCompareNode),
							this.ib.auxiliaryService.checkDistance(
								this.target,
								c
							),
							this.ib.auxiliaryService.checkLocation(this.target);
					}),
					(this.endDrag = () => {
						this.canDrag &&
							this.hasMoved &&
							this.target &&
							!this.isStatic &&
							this.ib.emit(
								o.PAGE_HANDLER_EVENT.END_DRAG,
								r.getNodeId(this.target),
								this.newPosition
							),
							this.ib.auxiliaryService.uncheck(500),
							this.ib.selector.hideSelectorTips(
								this.ib.selectedNodeSelector,
								'no-drag'
							),
							this.resetState();
					}),
					(this.resetState = () => {
						(this.isMouseDown = !1),
							(this.target = null),
							(this.hasMoved = !1),
							(this.canDrag = !0),
							(this.newPosition = {}),
							this.ib.hideActionTips('no-drag');
					}),
					(this.ib = t),
					(this.endDragDebounce = r.debounce(this.endDrag, 400));
			}
			setCanDrag(t) {
				this.canDrag = t;
			}
			mount() {
				this.registerListeners();
			}
			registerListeners() {
				this.ib.on(o.PAGE_HANDLER_EVENT.SELECT_NODE, this.onSelectNode),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.SIZE_CHANGE,
						this.onSelectNode
					),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.onUnSelect
					),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.MOUSE_DOWN,
						this.handleMouseDown
					),
					this.ib.on(
						o.PAGE_HANDLER_EVENT.MOUSE_MOVE,
						this.handleMouseMove
					),
					this.ib.on(o.PAGE_HANDLER_EVENT.MOUSE_UP, this.endDrag);
			}
			unmount() {
				this.ib.off(
					o.PAGE_HANDLER_EVENT.SELECT_NODE,
					this.onSelectNode
				),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.SIZE_CHANGE,
						this.onSelectNode
					),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.UNSELECT_NODE,
						this.onUnSelect
					),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.MOUSE_DOWN,
						this.handleMouseDown
					),
					this.ib.off(
						o.PAGE_HANDLER_EVENT.MOUSE_MOVE,
						this.handleMouseMove
					),
					this.ib.off(o.PAGE_HANDLER_EVENT.MOUSE_UP, this.endDrag);
			}
			isEnableDrag() {
				return (
					this.target &&
					!this.isStatic &&
					this.canDrag &&
					this.isMouseDown
				);
			}
			beforeDrag() {
				if (this.target) {
					const t = getComputedStyle(this.target),
						e = t.position;
					(this.newPosition.position = e),
						'static' === e
							? ((this.newPosition.position = 'relative'),
							  (this.isStatic = !0))
							: (this.isStatic = !1),
						(this.left = r.pxToNum(t.left)),
						(this.top = r.pxToNum(t.top));
				}
			}
			moveTo(t, e) {
				const n = this.ib.selectedNode;
				n &&
					((this.target = n),
					this.beforeDrag(),
					this.updatePosition(t, e),
					this.endDragDebounce());
			}
			updatePosition(t, e) {
				if (this.target && this.canDrag) {
					const n = this.left + t;
					(this.newPosition.left = r.numToRpx(n)),
						(this.target.style.left = n + 'px');
					const i = this.top + e;
					(this.newPosition.top = r.numToRpx(i)),
						(this.target.style.top = i + 'px'),
						(this.hasMoved = n !== this.left || i !== this.top),
						this.ib.emit(
							o.PAGE_HANDLER_EVENT.DRAGGING,
							this.ib.selectedNodeId,
							this.target
						);
				}
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.shortCutService = void 0);
		const r = n(177),
			o = n(96);
		(e.shortCutService = new (class {
			constructor(t = window.document) {
				(this.keyDownHandler = t => {
					var e;
					if (t.target && this.isAvoid(t.target.tagName)) return;
					const n = o.KeyCodeMap[t.keyCode];
					if (n) {
						if (this.activeKey.includes(n))
							(null === (e = this.shortCutHandlerMap[n]) ||
							void 0 === e
								? void 0
								: e.isContinuous) && this.execHandler(t);
						else if (
							(this.activeKey.push(n),
							this.execHandler(t),
							t.metaKey && !o.modifierMap[t.keyCode])
						) {
							const t = this.activeKey.indexOf(n);
							t >= 0 && this.activeKey.splice(t, 1);
						}
						console.warn(this.activeKey, this);
					}
				}),
					(this.execHandler = t => {
						const e = this.activeKey.join(this.separator);
						if (this.shortCutHandlerMap[e]) {
							t && (t.preventDefault(), t.stopPropagation());
							const n = this.shortCutHandlerMap[e].handler;
							'function' == typeof n && n(t);
						}
					}),
					(this.keyUpHandler = t => {
						if (t.target && this.isAvoid(t.target.tagName)) return;
						if (this.activeKey.length < 1) return;
						const e = o.KeyCodeMap[t.keyCode];
						if (e) {
							const n = this.activeKey.indexOf(e);
							n >= 0 && this.activeKey.splice(n, 1);
							const r = this.shortCutHandlerMap[e];
							if (r) {
								const e = r.keyUpHandler;
								'function' == typeof e && e(t);
							}
						}
						console.warn(this.activeKey), (this.activeKey = []);
					}),
					(this.shortCutHandlerMap = {}),
					(this.element = t),
					(this.activeKey = []),
					(this.separator = '+'),
					this.enable();
			}
			enable() {
				this.listen();
			}
			unenable() {
				this.offListener();
			}
			listen() {
				this.element.addEventListener('keydown', this.keyDownHandler),
					this.element.addEventListener('keyup', this.keyUpHandler);
			}
			isAvoid(t) {
				return void 0 !== o.AVOID_NAME[t];
			}
			addCommand(t, e, n, r) {
				const o = t.join(this.separator);
				return (
					(this.shortCutHandlerMap[o] = {
						handler: e,
						isContinuous: n,
					}),
					r && (this.shortCutHandlerMap[o].keyUpHandler = r),
					this
				);
			}
			offCommand(t) {
				return (
					delete this.shortCutHandlerMap[t.join(this.separator)], this
				);
			}
			offAllCommand() {
				this.shortCutHandlerMap = {};
			}
			offListener() {
				this.element.removeEventListener(
					'keydown',
					this.keyDownHandler
				),
					this.element.removeEventListener(
						'keyup',
						this.keyUpHandler
					);
			}
			off() {
				this.offAllCommand(), this.offListener();
			}
		})()),
			r.__exportStar(n(96), e);
	},
	function (t, e, n) {
		'use strict';
		n.r(e),
			n.d(e, '__extends', function () {
				return o;
			}),
			n.d(e, '__assign', function () {
				return i;
			}),
			n.d(e, '__rest', function () {
				return s;
			}),
			n.d(e, '__decorate', function () {
				return a;
			}),
			n.d(e, '__param', function () {
				return c;
			}),
			n.d(e, '__metadata', function () {
				return u;
			}),
			n.d(e, '__awaiter', function () {
				return l;
			}),
			n.d(e, '__generator', function () {
				return h;
			}),
			n.d(e, '__createBinding', function () {
				return d;
			}),
			n.d(e, '__exportStar', function () {
				return p;
			}),
			n.d(e, '__values', function () {
				return f;
			}),
			n.d(e, '__read', function () {
				return g;
			}),
			n.d(e, '__spread', function () {
				return E;
			}),
			n.d(e, '__spreadArrays', function () {
				return m;
			}),
			n.d(e, '__await', function () {
				return v;
			}),
			n.d(e, '__asyncGenerator', function () {
				return _;
			}),
			n.d(e, '__asyncDelegator', function () {
				return N;
			}),
			n.d(e, '__asyncValues', function () {
				return b;
			}),
			n.d(e, '__makeTemplateObject', function () {
				return y;
			}),
			n.d(e, '__importStar', function () {
				return w;
			}),
			n.d(e, '__importDefault', function () {
				return A;
			}),
			n.d(e, '__classPrivateFieldGet', function () {
				return T;
			}),
			n.d(e, '__classPrivateFieldSet', function () {
				return S;
			});
		/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
		var r = function (t, e) {
			return (r =
				Object.setPrototypeOf ||
				({
					__proto__: [],
				} instanceof Array &&
					function (t, e) {
						t.__proto__ = e;
					}) ||
				function (t, e) {
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
				})(t, e);
		};

		function o(t, e) {
			function n() {
				this.constructor = t;
			}
			r(t, e),
				(t.prototype =
					null === e
						? Object.create(e)
						: ((n.prototype = e.prototype), new n()));
		}
		var i = function () {
			return (i =
				Object.assign ||
				function (t) {
					for (var e, n = 1, r = arguments.length; n < r; n++)
						for (var o in (e = arguments[n]))
							Object.prototype.hasOwnProperty.call(e, o) &&
								(t[o] = e[o]);
					return t;
				}).apply(this, arguments);
		};

		function s(t, e) {
			var n = {};
			for (var r in t)
				Object.prototype.hasOwnProperty.call(t, r) &&
					e.indexOf(r) < 0 &&
					(n[r] = t[r]);
			if (
				null != t &&
				'function' == typeof Object.getOwnPropertySymbols
			) {
				var o = 0;
				for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
					e.indexOf(r[o]) < 0 &&
						Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
						(n[r[o]] = t[r[o]]);
			}
			return n;
		}

		function a(t, e, n, r) {
			var o,
				i = arguments.length,
				s =
					i < 3
						? e
						: null === r
						? (r = Object.getOwnPropertyDescriptor(e, n))
						: r;
			if (
				'object' == typeof Reflect &&
				'function' == typeof Reflect.decorate
			)
				s = Reflect.decorate(t, e, n, r);
			else
				for (var a = t.length - 1; a >= 0; a--)
					(o = t[a]) &&
						(s =
							(i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s);
			return i > 3 && s && Object.defineProperty(e, n, s), s;
		}

		function c(t, e) {
			return function (n, r) {
				e(n, r, t);
			};
		}

		function u(t, e) {
			if (
				'object' == typeof Reflect &&
				'function' == typeof Reflect.metadata
			)
				return Reflect.metadata(t, e);
		}

		function l(t, e, n, r) {
			return new (n || (n = Promise))(function (o, i) {
				function s(t) {
					try {
						c(r.next(t));
					} catch (t) {
						i(t);
					}
				}

				function a(t) {
					try {
						c(r.throw(t));
					} catch (t) {
						i(t);
					}
				}

				function c(t) {
					var e;
					t.done
						? o(t.value)
						: ((e = t.value),
						  e instanceof n
								? e
								: new n(function (t) {
										t(e);
								  })).then(s, a);
				}
				c((r = r.apply(t, e || [])).next());
			});
		}

		function h(t, e) {
			var n,
				r,
				o,
				i,
				s = {
					label: 0,
					sent: function () {
						if (1 & o[0]) throw o[1];
						return o[1];
					},
					trys: [],
					ops: [],
				};
			return (
				(i = {
					next: a(0),
					throw: a(1),
					return: a(2),
				}),
				'function' == typeof Symbol &&
					(i[Symbol.iterator] = function () {
						return this;
					}),
				i
			);

			function a(i) {
				return function (a) {
					return (function (i) {
						if (n)
							throw new TypeError(
								'Generator is already executing.'
							);
						for (; s; )
							try {
								if (
									((n = 1),
									r &&
										(o =
											2 & i[0]
												? r.return
												: i[0]
												? r.throw ||
												  ((o = r.return) && o.call(r),
												  0)
												: r.next) &&
										!(o = o.call(r, i[1])).done)
								)
									return o;
								switch (
									((r = 0),
									o && (i = [2 & i[0], o.value]),
									i[0])
								) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return (
											s.label++,
											{
												value: i[1],
												done: !1,
											}
										);
									case 5:
										s.label++, (r = i[1]), (i = [0]);
										continue;
									case 7:
										(i = s.ops.pop()), s.trys.pop();
										continue;
									default:
										if (
											!((o = s.trys),
											(o =
												o.length > 0 &&
												o[o.length - 1]) ||
												(6 !== i[0] && 2 !== i[0]))
										) {
											s = 0;
											continue;
										}
										if (
											3 === i[0] &&
											(!o || (i[1] > o[0] && i[1] < o[3]))
										) {
											s.label = i[1];
											break;
										}
										if (6 === i[0] && s.label < o[1]) {
											(s.label = o[1]), (o = i);
											break;
										}
										if (o && s.label < o[2]) {
											(s.label = o[2]), s.ops.push(i);
											break;
										}
										o[2] && s.ops.pop(), s.trys.pop();
										continue;
								}
								i = e.call(t, s);
							} catch (t) {
								(i = [6, t]), (r = 0);
							} finally {
								n = o = 0;
							}
						if (5 & i[0]) throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0,
						};
					})([i, a]);
				};
			}
		}

		function d(t, e, n, r) {
			void 0 === r && (r = n), (t[r] = e[n]);
		}

		function p(t, e) {
			for (var n in t)
				'default' === n || e.hasOwnProperty(n) || (e[n] = t[n]);
		}

		function f(t) {
			var e = 'function' == typeof Symbol && Symbol.iterator,
				n = e && t[e],
				r = 0;
			if (n) return n.call(t);
			if (t && 'number' == typeof t.length)
				return {
					next: function () {
						return (
							t && r >= t.length && (t = void 0),
							{
								value: t && t[r++],
								done: !t,
							}
						);
					},
				};
			throw new TypeError(
				e
					? 'Object is not iterable.'
					: 'Symbol.iterator is not defined.'
			);
		}

		function g(t, e) {
			var n = 'function' == typeof Symbol && t[Symbol.iterator];
			if (!n) return t;
			var r,
				o,
				i = n.call(t),
				s = [];
			try {
				for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
					s.push(r.value);
			} catch (t) {
				o = {
					error: t,
				};
			} finally {
				try {
					r && !r.done && (n = i.return) && n.call(i);
				} finally {
					if (o) throw o.error;
				}
			}
			return s;
		}

		function E() {
			for (var t = [], e = 0; e < arguments.length; e++)
				t = t.concat(g(arguments[e]));
			return t;
		}

		function m() {
			for (var t = 0, e = 0, n = arguments.length; e < n; e++)
				t += arguments[e].length;
			var r = Array(t),
				o = 0;
			for (e = 0; e < n; e++)
				for (var i = arguments[e], s = 0, a = i.length; s < a; s++, o++)
					r[o] = i[s];
			return r;
		}

		function v(t) {
			return this instanceof v ? ((this.v = t), this) : new v(t);
		}

		function _(t, e, n) {
			if (!Symbol.asyncIterator)
				throw new TypeError('Symbol.asyncIterator is not defined.');
			var r,
				o = n.apply(t, e || []),
				i = [];
			return (
				(r = {}),
				s('next'),
				s('throw'),
				s('return'),
				(r[Symbol.asyncIterator] = function () {
					return this;
				}),
				r
			);

			function s(t) {
				o[t] &&
					(r[t] = function (e) {
						return new Promise(function (n, r) {
							i.push([t, e, n, r]) > 1 || a(t, e);
						});
					});
			}

			function a(t, e) {
				try {
					(n = o[t](e)).value instanceof v
						? Promise.resolve(n.value.v).then(c, u)
						: l(i[0][2], n);
				} catch (t) {
					l(i[0][3], t);
				}
				var n;
			}

			function c(t) {
				a('next', t);
			}

			function u(t) {
				a('throw', t);
			}

			function l(t, e) {
				t(e), i.shift(), i.length && a(i[0][0], i[0][1]);
			}
		}

		function N(t) {
			var e, n;
			return (
				(e = {}),
				r('next'),
				r('throw', function (t) {
					throw t;
				}),
				r('return'),
				(e[Symbol.iterator] = function () {
					return this;
				}),
				e
			);

			function r(r, o) {
				e[r] = t[r]
					? function (e) {
							return (n = !n)
								? {
										value: v(t[r](e)),
										done: 'return' === r,
								  }
								: o
								? o(e)
								: e;
					  }
					: o;
			}
		}

		function b(t) {
			if (!Symbol.asyncIterator)
				throw new TypeError('Symbol.asyncIterator is not defined.');
			var e,
				n = t[Symbol.asyncIterator];
			return n
				? n.call(t)
				: ((t = f(t)),
				  (e = {}),
				  r('next'),
				  r('throw'),
				  r('return'),
				  (e[Symbol.asyncIterator] = function () {
						return this;
				  }),
				  e);

			function r(n) {
				e[n] =
					t[n] &&
					function (e) {
						return new Promise(function (r, o) {
							(function (t, e, n, r) {
								Promise.resolve(r).then(function (e) {
									t({
										value: e,
										done: n,
									});
								}, e);
							})(r, o, (e = t[n](e)).done, e.value);
						});
					};
			}
		}

		function y(t, e) {
			return (
				Object.defineProperty
					? Object.defineProperty(t, 'raw', {
							value: e,
					  })
					: (t.raw = e),
				t
			);
		}

		function w(t) {
			if (t && t.__esModule) return t;
			var e = {};
			if (null != t)
				for (var n in t)
					Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
			return (e.default = t), e;
		}

		function A(t) {
			return t && t.__esModule
				? t
				: {
						default: t,
				  };
		}

		function T(t, e) {
			if (!e.has(t))
				throw new TypeError(
					'attempted to get private field on non-instance'
				);
			return e.get(t);
		}

		function S(t, e, n) {
			if (!e.has(t))
				throw new TypeError(
					'attempted to set private field on non-instance'
				);
			return e.set(t, n), n;
		}
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.ENABLE_INVOKE_API_MAP = void 0),
			(e.ENABLE_INVOKE_API_MAP = {
				initReady: !0,
				getUserAutoFillData: !0,
				setUserAutoFillData: !0,
				requestAuthUserAutoFillData: !0,
				deleteUserAutoFillData: !0,
				insertHTMLWebView: !0,
				updateHTMLWebView: !0,
				removeHTMLWebView: !0,
				private_geolocation: !0,
				remoteDebugInfo: !0,
				setGlobalStorage: !0,
				getGlobalStorage: !0,
				getGlobalStorageInfo: !0,
				removeGlobalStorage: !0,
				setNavigationBarTitle: !0,
				setNavigationBarColor: !0,
				setBackgroundTextStyle: !0,
				setBackgroundColor: !0,
				loadComponents: !0,
			});
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.AuxiliaryService = void 0);
		const r = n(180),
			o = n(181),
			i = n(182);
		e.AuxiliaryService = class {
			constructor(t) {
				(this.checkLocation = (t, e) => {
					if (!(null == e ? void 0 : e.length)) {
						let n = t.parentNode;
						const r = n.children;
						'body' === n.tagName.toLocaleLowerCase() &&
							(n = document.querySelector('html')),
							(e = [n, ...r]);
					}
					return this.locationCheckService.check(t, e);
				}),
					(this.checkDistance = (t, e, n) => {
						if (!(null == e ? void 0 : e.length)) {
							let n = t.parentNode;
							const r = n.children;
							'body' === n.tagName.toLocaleLowerCase() &&
								(n = document.querySelector('html')),
								(e = [n, ...r]);
						}
						return (
							this.distanceCheckService.uncheck(),
							this.distanceCheckService.check(t, e, n)
						);
					}),
					(this.ib = t),
					(this.locationCheckService = new r.LocationCheckService(
						this.ib
					)),
					(this.sizeCheckService = new o.SizeCheckService(this.ib)),
					(this.distanceCheckService = new i.DistanceCheckService(
						this.ib
					));
			}
			mount() {
				this.locationCheckService.mount(),
					this.sizeCheckService.mount(),
					this.distanceCheckService.mount();
			}
			unmount() {
				this.locationCheckService.unmount(),
					this.sizeCheckService.unmount(),
					this.distanceCheckService.unmount();
			}
			unCheckDistance() {
				this.distanceCheckService.uncheck();
			}
			checkSize(t, e, n) {
				return this.sizeCheckService.check(t, e, n);
			}
			uncheck(t) {
				const e = () => {
					this.locationCheckService.uncheck(),
						this.sizeCheckService.uncheck(),
						this.distanceCheckService.uncheck();
				};
				t ? setTimeout(e, t) : e();
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.LocationCheckService = void 0);
		const r = n(22);

		function o(t) {
			let e = t[0];
			return (
				t.forEach(t => {
					Math.abs(e) > Math.abs(t) && (e = t);
				}),
				e
			);
		}
		e.LocationCheckService = class {
			constructor(t, e) {
				(this._inited = !1),
					(this._lineNodes = {
						xt: null,
						xc: null,
						xb: null,
						yl: null,
						yc: null,
						yr: null,
					}),
					(this.options = {
						gap: 10,
					}),
					(this.ib = t),
					(this._locationLineWrapper = document.createElement('div')),
					(this._locationLineWrapper.id =
						'__ib-location-line-wrapper'),
					(this.options = Object.assign(this.options, e));
			}
			mount() {
				this.initLines(), this.initStyle(), (this._inited = !0);
			}
			initLines() {
				var t, e;
				if (this._inited) return;
				const n = document.createDocumentFragment();
				for (const t in this._lineNodes) {
					const e = document.createElement('div'),
						r = t.startsWith('x')
							? '__ib-location-line-x'
							: '__ib-location-line-y';
					e.classList.add('__ib-location-line', r),
						e.setAttribute('data-direction', t),
						n.appendChild(e),
						(this._lineNodes[t] = e);
				}
				this._locationLineWrapper.appendChild(n),
					null ===
						(e =
							null === (t = this.ib.container) || void 0 === t
								? void 0
								: t.appendChild) ||
						void 0 === e ||
						e.call(t, this._locationLineWrapper);
			}
			initStyle() {
				this.ib.addStyle(
					'\n      #__ib-location-line-wrapper {\n        position: fixed;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        bottom: 0;\n      }\n\n      .__ib-location-line {\n        display: none;\n        opacity:0.7;\n        position:absolute;\n        z-index: 10000;\n      }\n\n      .__ib-location-line-y {\n        height:100%;\n        top:0;\n        border-left: 1px dashed #8080ff;\n        transform: translateX(-1px);\n      }\n\n      .__ib-location-line-x {\n        width:100%;\n        left:0;\n        border-bottom: 1px dashed #8080ff;\n        transform: translateY(-1px);\n      }\n\n      .__ib-location-line-y[data-distance="0"] {\n        border-left-color: #f50022;\n        border-left-style: solid;\n      }\n      .__ib-location-line-x[data-distance="0"] {\n        border-bottom-color: #f50022;\n        border-bottom-style: solid;\n      }\n\n    '
				);
			}
			unmount() {}
			showLine(t, e, n) {
				const r = this._lineNodes[t];
				if (r) {
					r.style.display = 'block';
					const o = t.startsWith('x') ? 'top' : 'left';
					(r.style[o] = e + 'px'),
						r.setAttribute('data-distance', n.toString());
				}
			}
			hideLine(t) {
				const e = t || Object.values(this._lineNodes);
				null == e ||
					e.forEach(t => {
						t &&
							((t.style.display = 'none'),
							t.removeAttribute('data-distance'));
					}),
					Array.from(
						document.querySelectorAll('.__ib-location-line-active')
					).forEach(t =>
						t.classList.remove('__ib-location-line-active')
					);
			}
			calcLocationDelta(t, e) {
				var n;
				if (!t || !e || t === e) return null;
				const r = t.getBoundingClientRect(),
					i = r.left,
					s = r.right,
					a = r.top,
					c = r.bottom,
					u = e.getBoundingClientRect(),
					l = r.width / 2,
					h = u.width / 2,
					d = r.height / 2,
					p = u.height / 2,
					f = u.top + p,
					g = u.left + h,
					E = a - u.top,
					m = c - u.top,
					v = a - f,
					_ = a + d - f,
					N = c - f,
					b = c - u.bottom,
					y = a - u.bottom,
					w = i - u.left,
					A = s - u.left,
					T = i - g,
					S = i + l - g,
					R = s - g,
					x = s - u.right,
					O = i - u.right,
					C =
						null === (n = this.ib.container) || void 0 === n
							? void 0
							: n.getBoundingClientRect(),
					D = u.top + C.top,
					L = u.bottom + C.top,
					M = u.left + C.left,
					I = u.right + C.left;
				return {
					xt: {
						distance: o([E, m]),
						position: D,
					},
					xc: {
						distance: o([v, _, N]),
						position: D + p,
					},
					xb: {
						distance: o([b, y]),
						position: L,
					},
					yl: {
						distance: o([w, A]),
						position: M,
					},
					yc: {
						distance: o([T, S, R]),
						position: M + h,
					},
					yr: {
						distance: o([x, O]),
						position: I,
					},
				};
			}
			check(t, e) {
				var n;
				this.uncheck();
				let o = null,
					i = null,
					s = null,
					a = null,
					c = null,
					u = null;
				const l = ['xt', 'xc', 'xb'],
					h = ['yl', 'yc', 'yr'],
					d =
						null === (n = r.getNodeInfo(t)) || void 0 === n
							? void 0
							: n.clientRects;
				return (
					Array.from(e).forEach(e => {
						var n;
						const p = this.calcLocationDelta(t, e);
						if (!p) return;
						const f =
							null === (n = r.getNodeInfo(e)) || void 0 === n
								? void 0
								: n.clientRects;
						for (const t of l) {
							const n = p[t],
								{ distance: r, position: o } = n;
							if (
								this.isNearly(r) &&
								(this.showLine(t, o, r),
								null === i || Math.abs(i) >= Math.abs(r))
							) {
								let t;
								(i = r),
									f.right < d.left && (t = d.left - f.right),
									f.left > d.right && (t = f.left - d.right),
									t && (!u || t < u) && ((u = t), (a = e));
							}
						}
						for (const t of h) {
							const n = p[t],
								{ distance: r, position: i } = n;
							if (
								this.isNearly(r) &&
								(this.showLine(t, i, r),
								null === o || Math.abs(o) >= Math.abs(r))
							) {
								let t;
								(o = r),
									f.bottom < d.top && (t = d.top - f.bottom),
									f.top > d.bottom && (t = f.top - d.bottom),
									t && (!c || t < c) && ((c = t), (s = e));
							}
						}
					}),
					{
						deltaX: o || 0,
						deltaY: i || 0,
						deltaXCompareNode: s,
						deltaYCompareNode: a,
					}
				);
			}
			isNearly(t) {
				return Math.abs(t) <= this.options.gap;
			}
			uncheck() {
				this.hideLine();
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.SizeCheckService = void 0);
		const r = n(22);
		e.SizeCheckService = class {
			constructor(t, e) {
				(this.options = {
					gap: 10,
				}),
					(this.ib = t),
					(this._sizeTipsWrapper = document.createElement('div')),
					(this._sizeTipsWrapper.id = '__ib-size-tips-wrapper'),
					(this.options = Object.assign(this.options, e)),
					(this.container =
						this.options.container || this.ib.container);
			}
			mount() {}
			unmount() {}
			check(t, e, n) {
				const o = [...t.parentNode.children],
					i = e,
					s = n;
				let a = 0,
					c = 0,
					u = null,
					l = null;
				return (
					Array.from(o).forEach(e => {
						if (e === t) return;
						const n = e.clientWidth,
							o = e.clientHeight,
							h = n - i,
							d = o - s;
						this.isNearly(h) &&
							(!a || Math.abs(h) < Math.abs(a)) &&
							((a = h), (u = r.getNodeInfo(e))),
							this.isNearly(d) &&
								(!c || Math.abs(d) < Math.abs(c)) &&
								((c = d), (l = r.getNodeInfo(e)));
					}),
					{
						minWidthDifferent: a,
						minHeightDifferent: c,
						nearWidthNode: u,
						nearHeightNode: l,
					}
				);
			}
			isNearly(t) {
				return !!t && Math.abs(t) <= this.options.gap;
			}
			uncheck() {}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.DistanceCheckService = void 0);
		const r = n(22);
		e.DistanceCheckService = class {
			constructor(t, e) {
				(this.distanceTipsArr = []),
					(this.options = {
						gap: 10,
					}),
					(this.ib = t),
					(this.options = Object.assign(this.options, e)),
					(this._distanceWrapper = document.createElement('div')),
					(this._distanceWrapper.id = '__ib-distance-tips-wrapper');
			}
			mount() {
				this.ib.container.appendChild(this._distanceWrapper),
					this.initStyle();
			}
			initStyle() {
				this.ib.addStyle(
					'\n      .__ib-distance-width-tips {\n        display: none;\n        position: absolute;\n        line-height: 14px;\n        color: #0b98f1;\n        text-align: center;\n        width: 100%;\n        border-left: 1px solid #0b98f1;\n        border-right: 1px solid #0b98f1;\n        top: -16px;\n        height: 8px;\n        left: 0;\n        box-sizing: border-box;\n        transform: translateY(-50%);\n      }\n\n      .__ib-distance-width-tips:before {\n        content: "";\n        position: absolute;\n        width: 100%;\n        height: 1px;\n        background: #0b98f1;\n        left: 0;\n        top: 50%;\n      }\n\n      .__ib-distance-width-tips:after {\n        content: attr(data-value);\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        transform: translate(-50%, -120%);\n        padding: 0 4px;\n        font-size: 10px;\n        background: #0b98f1;\n        color: #fff;\n        border-radius: 20px;\n      }\n\n      .__ib-distance-height-tips {\n        display: none;\n        position: absolute;\n        line-height: 14px;\n        color: #0b98f1;\n        text-align: center;\n        height: 100%;\n        border-top: 1px solid #0b98f1;\n        border-bottom: 1px solid #0b98f1;\n        left: -16px;\n        top: 0;\n        width: 8px;\n        box-sizing: border-box;\n        transform: translateX(-50%);\n      }\n\n      .__ib-distance-height-tips:before {\n        content: "";\n        position: absolute;\n        height: 100%;\n        width: 1px;\n        background: #0b98f1;\n        left: 50%;\n        top: 0;\n      }\n\n      .__ib-distance-height-tips:after {\n        content: attr(data-value);\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        background: #fff;\n        transform: translate(-110%, -50%);\n        padding: 0 4px;\n        font-size: 10px;\n        transfrom: rotate(-90deg);\n        background: #0b98f1;\n        color: #fff;\n        border-radius: 20px;\n      }\n\n      .__ib-extension-line {\n        display: none;\n        position: absolute;\n      }\n\n      .__ib-extension-width-line {\n        border-left: 1px dashed #e2384f;\n      }\n\n      .__ib-extension-height-line {\n        border-top: 1px dashed #e2384f;\n      }\n    '
				);
			}
			unmount() {}
			setPositionStyle(t, e) {
				var n;
				const r =
					null === (n = this.ib.container) || void 0 === n
						? void 0
						: n.getBoundingClientRect();
				t.style.cssText = `\n      display: block;\n      width: ${
					e.width
				}px;\n      height: ${e.height}px;\n      left: ${
					e.left - r.left
				}px;\n      top: ${e.top - r.top}px;\n    `;
			}
			detailedCheck(t, e) {
				const n = this.roughlyCheck(t, e),
					r = t.left + t.width / 2,
					o = t.top + t.height / 2;
				let i = null;
				return (
					t.top > e.top &&
						t.top < e.bottom &&
						((i = null),
						r < e.left &&
							(i = {
								left: t.left,
								top: e.top,
								width: e.left - t.left,
								height: 1,
							}),
						r > e.right &&
							(i = {
								left: e.right,
								top: e.top,
								width: t.right - e.right,
								height: 1,
							}),
						n.push({
							type: 'height',
							left: r,
							top: e.top,
							width: 8,
							height: t.top - e.top,
							diagonal: i,
						})),
					t.bottom > e.top &&
						t.bottom < e.bottom &&
						((i = null),
						r < e.left &&
							(i = {
								left: t.left,
								top: e.bottom,
								width: e.left - t.left,
								height: 1,
							}),
						r > e.right &&
							(i = {
								left: e.right,
								top: e.bottom,
								width: t.right - e.right,
								height: 1,
							}),
						n.push({
							type: 'height',
							left: r,
							top: t.bottom,
							width: 8,
							height: e.bottom - t.bottom,
							diagonal: i,
						})),
					t.left > e.left &&
						t.left < e.right &&
						((i = null),
						o < e.top &&
							(i = {
								left: e.left,
								top: t.top,
								height: e.top - t.top,
								width: 1,
							}),
						o > e.bottom &&
							(i = {
								left: e.left,
								top: e.bottom,
								height: t.bottom - e.bottom,
								width: 1,
							}),
						n.push({
							type: 'width',
							left: e.left,
							top: o,
							width: t.left - e.left,
							height: 8,
							diagonal: i,
						})),
					t.right > e.left &&
						t.right < e.right &&
						(o < e.top &&
							(i = {
								left: e.right,
								top: t.top,
								height: e.top - t.top,
								width: 1,
							}),
						o > e.bottom &&
							(i = {
								left: e.right,
								top: e.bottom,
								height: t.bottom - e.bottom,
								width: 1,
							}),
						n.push({
							type: 'width',
							left: t.right,
							top: o,
							width: e.right - t.right,
							height: 8,
							diagonal: i,
						})),
					n
				);
			}
			roughlyCheck(t, e) {
				const n = [],
					r = t.left + t.width / 2,
					o = t.top + t.height / 2;
				let i;
				return (
					t.top > e.bottom &&
						((i = null),
						r < e.left &&
							(i = {
								left: t.left,
								top: e.bottom,
								width: e.left - t.left,
								height: 1,
							}),
						r > e.right &&
							(i = {
								left: e.right,
								top: e.bottom,
								width: t.right - e.right,
								height: 1,
							}),
						n.push({
							type: 'height',
							left: r,
							top: e.bottom,
							width: 8,
							height: t.top - e.bottom,
							diagonal: i,
						})),
					t.bottom < e.top &&
						((i = null),
						r < e.left &&
							(i = {
								left: t.left,
								top: e.top,
								width: e.left - t.left,
								height: 1,
							}),
						r > e.right &&
							(i = {
								left: e.right,
								top: e.top,
								width: t.right - e.right,
								height: 1,
							}),
						n.push({
							type: 'height',
							left: r,
							top: t.bottom,
							width: 8,
							height: e.top - t.bottom,
							diagonal: i,
						})),
					t.left > e.right &&
						((i = null),
						o < e.top &&
							(i = {
								left: e.right,
								top: t.top,
								height: e.top - t.top,
								width: 1,
							}),
						o > e.bottom &&
							(i = {
								left: e.right,
								top: e.bottom,
								height: t.bottom - e.bottom,
								width: 1,
							}),
						n.push({
							type: 'width',
							left: e.right,
							top: o,
							width: t.left - e.right,
							height: 8,
							diagonal: i,
						})),
					t.right < e.left &&
						((i = null),
						o < e.top &&
							(i = {
								left: e.left,
								top: t.top,
								height: e.top - t.top,
								width: 1,
							}),
						o > e.bottom &&
							(i = {
								left: e.left,
								top: e.bottom,
								height: t.bottom - e.bottom,
								width: 1,
							}),
						n.push({
							type: 'width',
							left: t.right,
							top: o,
							width: e.left - t.right,
							height: 8,
							diagonal: i,
						})),
					n
				);
			}
			check(t, e = [], n) {
				var o;
				if (!e.length || !t) return;
				const i =
					null === (o = r.getNodeInfo(t)) || void 0 === o
						? void 0
						: o.clientRects;
				Array.from(e).forEach(t => {
					var e;
					const o =
						null === (e = r.getNodeInfo(t)) || void 0 === e
							? void 0
							: e.clientRects;
					if (n) {
						const t = this.detailedCheck(i, o);
						this.distanceTipsArr = this.distanceTipsArr.concat(t);
					} else {
						const t = this.roughlyCheck(i, o);
						this.distanceTipsArr = this.distanceTipsArr.concat(t);
					}
				}),
					this.render();
			}
			renderExtensionLine() {}
			render() {
				this.distanceTipsArr.forEach(t => {
					const e = document.createElement('div');
					if (
						(e.classList.add(
							'`__ib-distance-tips',
							`__ib-distance-${t.type}-tips`
						),
						this.setPositionStyle(e, t),
						this._distanceWrapper.appendChild(e),
						e.setAttribute('data-value', r.numToRpx(t[t.type])),
						t.diagonal)
					) {
						const e = document.createElement('div');
						e.classList.add(
							'__ib-extension-line',
							`__ib-extension-${t.type}-line`
						),
							this.setPositionStyle(e, t.diagonal),
							this._distanceWrapper.appendChild(e);
					}
				});
			}
			uncheck() {
				(this._distanceWrapper.innerHTML = ''),
					(this.distanceTipsArr = []);
			}
		};
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.UIRecorder = void 0);
		const r = n(97),
			o = n(101),
			i = n(191),
			s = n(102),
			a = n(194),
			c = n(57),
			u = n(64),
			l = n(98);
		window.xpath = l.default;
		const h = t => {
			if (3 === t.nodeType) return !0;
			const e = t.localName;
			if ('wx-content' === e) return !1;
			if ('body' === e) return !0;
			if (/^wx-/.test(e)) return !0;
			if (t.attributes && t.attributes.length > 0)
				for (let e = 0, n = t.attributes.length; e < n; e++) {
					if (
						'exparser:info-custom-component' ===
						t.attributes[e].name
					)
						return !0;
				}
			return !1;
		};
		e.UIRecorder = class {
			constructor(t, e) {
				(this.isStop = !1),
					(this.highlight = new a.HighLight()),
					(this.beforePublish = (t, e) => {
						if (!1 === window.__autotest) return !0;
						if ('PAGE_EVENT' === t) {
							const t = e.data || {},
								n = t.nodeId;
							this.handlePageEvent(n, t);
						}
						return !0;
					}),
					(this.handlePageEvent = async (t, e) => {
						var n, r, o, i, s, a, u, l;
						const h = window.__virtualDOM__;
						if (!t || !h) return;
						const d = h.getNodeById(t);
						if (!d)
							return void console.warn(
								'[handlePageEvent] get node by id error',
								t
							);
						let p,
							f = d.__methodCaller ? d.__methodCaller : d;
						if (
							'BODY' ===
							(null ===
								(n = null == f ? void 0 : f.__domElement) ||
							void 0 === n
								? void 0
								: n.tagName)
						) {
							const t =
									null ===
										(o =
											null ===
												(r =
													null == e
														? void 0
														: e.data) ||
											void 0 === r
												? void 0
												: r.target) || void 0 === o
										? void 0
										: o.id,
								n = c.getElement('#' + t);
							if (!n.node)
								return void console.warn(
									'[handlePageEvent] get node by id error',
									t
								);
							f = n.node;
						}
						if (
							(null === (i = null == f ? void 0 : f.$) ||
							void 0 === i
								? void 0
								: i.map) ||
							'WX-MAP' === f.tagName
						) {
							const t = (
									null === (s = null == f ? void 0 : f.$) ||
									void 0 === s
										? void 0
										: s.map
								)
									? null === (a = null == f ? void 0 : f.$) ||
									  void 0 === a
										? void 0
										: a.map.$$
									: f,
								n = e.data;
							if (n._userTap) p = await this.formatRecorder(t, n);
							else {
								const r = e.eventName;
								let o;
								if (
									null ===
										(u =
											null == t
												? void 0
												: t.__wxElement) || void 0 === u
										? void 0
										: u.__wxEventHandleName
								) {
									const e =
											null ===
												(l =
													null == t
														? void 0
														: t.__wxElement) ||
											void 0 === l
												? void 0
												: l.__wxEventHandleName,
										n = Object.keys(e);
									for (const t of n) e[t] === r && (o = t);
								}
								o &&
									((p = await this.formatRecorder(t, n)),
									p && (p.command = o));
							}
						}
						p &&
							this.messager.send({
								command: 'autoTest.command',
								data: {
									command: p,
								},
							});
					}),
					(this.handleMouseOver = t => {
						let e = t.target;
						if (
							e &&
							e !== document &&
							e !== this._lastHighLightTarget
						) {
							for (; e && !h(e); ) e = e.parentElement;
							e &&
								(this._highlightTimer &&
									(clearTimeout(this._highlightTimer),
									(this._highlightTimer = void 0)),
								(this._highlightTimer = setTimeout(() => {
									this.highlight.show(e),
										(this._lastHighLightTarget = e);
								}, 100)));
						}
					}),
					(this.el = t),
					(this.assertMode = ''),
					(this.messager = e),
					this.initMessager(),
					window.__autoListening && i.patchAuto();
			}
			init() {
				(this.assertMode = window.__autotestAssertMode || ''),
					this.initEventRecorder(),
					u.registerBeforePublish('UIRecorder', this.beforePublish);
			}
			addHoverHandle() {
				document.addEventListener('mousemove', this.handleMouseOver);
			}
			removeHoverHandle() {
				this.highlight.hide(),
					document.removeEventListener(
						'mousemove',
						this.handleMouseOver
					);
			}
			initMessager() {
				const t = {
					[s.AutoTestEvent.startRecord]: () => {
						this.initEventRecorder();
					},
					[s.AutoTestEvent.stopRecord]: () => {
						console.log('[amin] stopRecord'), this.dispose();
					},
					[s.AutoTestEvent.replayRecord]: ({ command: t }) => {
						o.replayer.replayCommand(t);
					},
					[s.AutoTestEvent.changeAssertMode]: ({ assertMode: t }) => {
						(this.assertMode = t),
							this.assertMode
								? this.addHoverHandle()
								: this.removeHoverHandle();
					},
					[s.AutoTestEvent.startReplay]: () => {
						o.replayer.startReplay(), i.patchAuto();
					},
				};
				this.messager.registerCallback(({ command: e, data: n }) => {
					const r = t[e];
					if (r) {
						const t = r(n);
						this.messager.send({
							command: 'autoTest.callback',
							data: {
								callbackID: n.callbackID,
								res: t,
								command: e,
							},
						});
					}
				});
			}
			initEventRecorder() {
				if (
					(console.warn('initEventRecorder'),
					this.originEventDispatch)
				)
					return void console.log('you are inited!');
				const t = window.exparser.Event,
					e = t.dispatchEvent;
				(this.originEventDispatch = e),
					(t.dispatchEvent = (t, n) => {
						'' === this.assertMode
							? (e(t, n), this.isStop || this.recordEvent(t, n))
							: this.recordAssert(t, n);
					});
			}
			async recordAssert(t, e) {
				var n;
				const o = e.type;
				if ('tap' === o && e.__originalEvent) {
					const i = 'shadow' === t.is ? t.__wxHost.$$ : t,
						s = await r.domFinder.getDomInfo(i, o);
					if (!s) return;
					const a = Object.assign(Object.assign({}, s), {
						command: this.assertMode,
						text: s.innerText,
						value:
							null !== (n = s.nodeValue) && void 0 !== n
								? n
								: null,
						tagName: s.tagName,
						target: s.targetCandidates[0],
						childName: s.childName,
						src: location.pathname.replace('/__pageframe__/', ''),
						timeStamp: e.timeStamp,
						eventData: {},
					});
					a &&
						this.messager.send({
							command: 'autoTest.command',
							data: {
								command: a,
							},
						});
				}
			}
			async recordEvent(t, e) {
				var n;
				const r = [
						'load',
						'canceltap',
						'mouseover',
						'mouseout',
						'longtap',
						'wheel',
					],
					o = {
						confirm: ['WX-INPUT', 'all'],
						input: ['WX-EDITOR', 'all'],
						columnchange: ['WX-PICKER'],
						change: ['WX-PICKER'],
					},
					i = e.type;
				let a;
				const c = null == t ? void 0 : t.$$,
					u = 'WX-MAP' === (null == c ? void 0 : c.tagName);
				if (t.tagName || t === document || o[i] || u) {
					if (o[i]) {
						const e = (null == t ? void 0 : t.$$)
								? null === (n = null == t ? void 0 : t.$$) ||
								  void 0 === n
									? void 0
									: n.tagName
								: null == t
								? void 0
								: t.tagName,
							r = o[i];
						if (!r.includes(e) && !r.includes('all')) return;
						t = t.$$ ? t.$$ : t;
					} else u && (t = t.$$);
					if (
						s.inputTagNames.includes(t.tagName) ||
						s.editorTagNames.includes(t.tagName)
					)
						a = await this.formatInput(t, e);
					else if (e.__originalEvent && !r.includes(i))
						a =
							'scrollend' === i
								? await this.formatScroll(t, e)
								: await this.formatRecorder(t, e);
					else if (o[i]) a = await this.formatRecorder(t, e);
					else if (u) {
						if (r.includes(i)) return;
						a = await this.formatRecorder(t, e);
					}
					a &&
						this.messager.send({
							command: 'autoTest.command',
							data: {
								command: a,
							},
						});
				}
			}
			getScrollInfo(t, e) {
				var n, r, o, i, a, c, u, l;
				return '/' === e
					? {
							scrollTop:
								document.documentElement.scrollTop ||
								document.body.scrollTop,
							scrollLeft:
								document.documentElement.scrollLeft ||
								document.body.scrollLeft,
					  }
					: s.scrollViewTagNames.includes(t.tagName)
					? {
							scrollTop:
								null ===
									(i =
										null ===
											(o =
												null ===
													(r =
														null ===
															(n =
																t.__wxElement) ||
														void 0 === n
															? void 0
															: n.$) ||
												void 0 === r
													? void 0
													: r.main) || void 0 === o
											? void 0
											: o.$$) || void 0 === i
									? void 0
									: i.scrollTop,
							scrollLeft:
								null ===
									(l =
										null ===
											(u =
												null ===
													(c =
														null ===
															(a =
																t.__wxElement) ||
														void 0 === a
															? void 0
															: a.$) ||
												void 0 === c
													? void 0
													: c.main) || void 0 === u
											? void 0
											: u.$$) || void 0 === l
									? void 0
									: l.scrollLeft,
					  }
					: {
							scrollTop: t.scrollTop,
							scrollLeft: t.scrollLeft,
					  };
			}
			async formatScroll(t, e) {
				const n = e.type,
					o = 'shadow' === t.is ? t.__wxHost.$$ : t,
					i = await r.domFinder.getDomInfo(o, n);
				if (!i) return;
				const s = i.xPath || '/',
					{ scrollTop: a, scrollLeft: c } = this.getScrollInfo(t, s);
				return Object.assign(Object.assign({}, i), {
					tagName: i.tagName,
					command: 'scroll',
					text: i.innerText,
					xPath: s,
					target: i.targetCandidates[0] || s,
					src: location.pathname.replace('/__pageframe__/', ''),
					timeStamp: e.timeStamp,
					eventData: {
						scrollDetail: {
							scrollTop: a,
							scrollLeft: c,
						},
					},
				});
			}
			async formatRecorder(t, e) {
				var n;
				const o = e.type,
					i = await r.domFinder.getDomInfo(t, o);
				if (!i) return;
				if ('map' === i.tagName && e.__originalEvent) return;
				const s = c.saveTouches(e.changedTouches || []),
					a = c.saveTouches(e.touches || []),
					u = i.xPath;
				return Object.assign(Object.assign({}, i), {
					value:
						null !== (n = i.nodeValue) && void 0 !== n ? n : null,
					tagName: i.tagName,
					command: o,
					text: i.innerText,
					xPath: u,
					target: i.targetCandidates[0],
					childName: i.childName,
					src: location.pathname.replace('/__pageframe__/', ''),
					timeStamp: e.timeStamp,
					eventData: {
						detail: e.detail,
						changedTouches: s,
						touches: a,
					},
				});
			}
			async formatInput(t, e) {
				const n = e.type;
				if (
					![
						'input',
						'confirm',
						'touchstart',
						'touchend',
						'tap',
					].includes(n)
				)
					return;
				const o = await r.domFinder.getDomInfo(t, n);
				if (!o) return;
				const i = o.xPath;
				return Object.assign(Object.assign({}, o), {
					value: e.target.value,
					tagName: o.tagName,
					command: n,
					text: o.innerText,
					xPath: i,
					target: o.targetCandidates[0],
					childName: o.childName,
					src: location.pathname.replace('/__pageframe__/', ''),
					timeStamp: e.timeStamp,
					eventData: {
						detail: e.detail,
					},
				});
			}
			dispose() {
				(this.isStop = !0),
					(window.__autotest = !1),
					this.originEventDispatch &&
						((window.exparser.Event.dispatchEvent =
							this.originEventDispatch),
						(this.originEventDispatch = void 0));
			}
		};
	},
	function (t, e, n) {
		!(function (t) {
			'use strict';
			var e = function (t, e) {
					for (var n = 0; n < e.length; n += 1) t(e[n], n, e);
				},
				n = function (t, n, r) {
					var o = n;
					return (
						e(function (e, n) {
							o = t(o, e, n);
						}, r),
						o
					);
				},
				r = function (t, n) {
					var r = new Array(n.length);
					return (
						e(function (e, n) {
							r[n] = t(e);
						}, n),
						r
					);
				};

			function o(t) {
				return t.toString();
			}
			var i = function (t, e) {
					return e.join(t);
				},
				s = function (t, e, n) {
					return t + n + e;
				},
				a = Array.prototype.concat;

			function c(t, e) {
				for (var n = Object(t), r = 1; r < arguments.length; r++) {
					var o = arguments[r];
					if (null != o)
						for (var i in o)
							Object.prototype.hasOwnProperty.call(o, i) &&
								(n[i] = o[i]);
				}
				return n;
			}

			function u() {
				this.init();
			}

			function l(t) {
				this.expression = t;
			}

			function h(t, e, n) {
				e in t || (t[e] = n);
			}

			function d() {}

			function p(t) {
				arguments.length > 0 && this.init(t);
			}

			function f(t) {
				arguments.length > 0 && this.init(t);
			}

			function g(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function E(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function m(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function v(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function _(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function N(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function b(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function y(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function w(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function A(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function T(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function S(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function R(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function x(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function O(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function C(t, e, n) {
				arguments.length > 0 && this.init(t, e, n);
			}

			function D(t) {
				for (; t && t.parentNode; ) t = t.parentNode;
				return t;
			}

			function L(t, e, n) {
				return C.applyPredicates(t.predicates, e, C.applyStep(t, e, n));
			}

			function M(t, e, n) {
				return (function (t) {
					for (var e = [], n = 0; n < t.length; n += 32767) {
						var r = t.slice(n, n + 32767);
						e = a.apply(e, r);
					}
					return e;
				})(r(L.bind(null, n, t), e));
			}

			function I(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function P(t, e, n) {
				arguments.length > 0 && this.init(t, e, n);
			}

			function k(t, e) {
				arguments.length > 0 && this.init(t, e);
			}

			function V(t) {
				arguments.length > 0 && this.init(t);
			}

			function U(t, e) {
				arguments.length > 0 && this.init(t, e);
			}
			(u.prototype = new Object()),
				(u.prototype.constructor = u),
				(u.superclass = Object.prototype),
				(u.prototype.init = function () {
					(this.reduceActions = []),
						(this.reduceActions[3] = function (t) {
							return new E(t[0], t[2]);
						}),
						(this.reduceActions[5] = function (t) {
							return new m(t[0], t[2]);
						}),
						(this.reduceActions[7] = function (t) {
							return new v(t[0], t[2]);
						}),
						(this.reduceActions[8] = function (t) {
							return new _(t[0], t[2]);
						}),
						(this.reduceActions[10] = function (t) {
							return new N(t[0], t[2]);
						}),
						(this.reduceActions[11] = function (t) {
							return new b(t[0], t[2]);
						}),
						(this.reduceActions[12] = function (t) {
							return new y(t[0], t[2]);
						}),
						(this.reduceActions[13] = function (t) {
							return new w(t[0], t[2]);
						}),
						(this.reduceActions[15] = function (t) {
							return new A(t[0], t[2]);
						}),
						(this.reduceActions[16] = function (t) {
							return new T(t[0], t[2]);
						}),
						(this.reduceActions[18] = function (t) {
							return new S(t[0], t[2]);
						}),
						(this.reduceActions[19] = function (t) {
							return new R(t[0], t[2]);
						}),
						(this.reduceActions[20] = function (t) {
							return new x(t[0], t[2]);
						}),
						(this.reduceActions[22] = function (t) {
							return new f(t[1]);
						}),
						(this.reduceActions[24] = function (t) {
							return new O(t[0], t[2]);
						}),
						(this.reduceActions[25] = function (t) {
							return new C(void 0, void 0, t[0]);
						}),
						(this.reduceActions[27] = function (t) {
							return (t[0].locationPath = t[2]), t[0];
						}),
						(this.reduceActions[28] = function (t) {
							return (
								(t[0].locationPath = t[2]),
								t[0].locationPath.steps.unshift(
									new P(P.DESCENDANTORSELF, k.nodeTest, [])
								),
								t[0]
							);
						}),
						(this.reduceActions[29] = function (t) {
							return new C(t[0], [], void 0);
						}),
						(this.reduceActions[30] = function (t) {
							return Z.instance_of(t[0], C)
								? (null == t[0].filterPredicates &&
										(t[0].filterPredicates = []),
								  t[0].filterPredicates.push(t[1]),
								  t[0])
								: new C(t[0], [t[1]], void 0);
						}),
						(this.reduceActions[32] = function (t) {
							return t[1];
						}),
						(this.reduceActions[33] = function (t) {
							return new W(t[0]);
						}),
						(this.reduceActions[34] = function (t) {
							return new G(t[0]);
						}),
						(this.reduceActions[36] = function (t) {
							return new U(t[0], []);
						}),
						(this.reduceActions[37] = function (t) {
							return new U(t[0], t[2]);
						}),
						(this.reduceActions[38] = function (t) {
							return [t[0]];
						}),
						(this.reduceActions[39] = function (t) {
							return t[2].unshift(t[0]), t[2];
						}),
						(this.reduceActions[43] = function (t) {
							return new I(!0, []);
						}),
						(this.reduceActions[44] = function (t) {
							return (t[1].absolute = !0), t[1];
						}),
						(this.reduceActions[46] = function (t) {
							return new I(!1, [t[0]]);
						}),
						(this.reduceActions[47] = function (t) {
							return t[0].steps.push(t[2]), t[0];
						}),
						(this.reduceActions[49] = function (t) {
							return new P(t[0], t[1], []);
						}),
						(this.reduceActions[50] = function (t) {
							return new P(P.CHILD, t[0], []);
						}),
						(this.reduceActions[51] = function (t) {
							return new P(t[0], t[1], t[2]);
						}),
						(this.reduceActions[52] = function (t) {
							return new P(P.CHILD, t[0], t[1]);
						}),
						(this.reduceActions[54] = function (t) {
							return [t[0]];
						}),
						(this.reduceActions[55] = function (t) {
							return t[1].unshift(t[0]), t[1];
						}),
						(this.reduceActions[56] = function (t) {
							return 'ancestor' == t[0]
								? P.ANCESTOR
								: 'ancestor-or-self' == t[0]
								? P.ANCESTORORSELF
								: 'attribute' == t[0]
								? P.ATTRIBUTE
								: 'child' == t[0]
								? P.CHILD
								: 'descendant' == t[0]
								? P.DESCENDANT
								: 'descendant-or-self' == t[0]
								? P.DESCENDANTORSELF
								: 'following' == t[0]
								? P.FOLLOWING
								: 'following-sibling' == t[0]
								? P.FOLLOWINGSIBLING
								: 'namespace' == t[0]
								? P.NAMESPACE
								: 'parent' == t[0]
								? P.PARENT
								: 'preceding' == t[0]
								? P.PRECEDING
								: 'preceding-sibling' == t[0]
								? P.PRECEDINGSIBLING
								: 'self' == t[0]
								? P.SELF
								: -1;
						}),
						(this.reduceActions[57] = function (t) {
							return P.ATTRIBUTE;
						}),
						(this.reduceActions[59] = function (t) {
							return 'comment' == t[0]
								? k.commentTest
								: 'text' == t[0]
								? k.textTest
								: 'processing-instruction' == t[0]
								? k.anyPiTest
								: 'node' == t[0]
								? k.nodeTest
								: new k(-1, void 0);
						}),
						(this.reduceActions[60] = function (t) {
							return new k.PITest(t[2]);
						}),
						(this.reduceActions[61] = function (t) {
							return t[1];
						}),
						(this.reduceActions[63] = function (t) {
							return (
								(t[1].absolute = !0),
								t[1].steps.unshift(
									new P(P.DESCENDANTORSELF, k.nodeTest, [])
								),
								t[1]
							);
						}),
						(this.reduceActions[64] = function (t) {
							return (
								t[0].steps.push(
									new P(P.DESCENDANTORSELF, k.nodeTest, [])
								),
								t[0].steps.push(t[2]),
								t[0]
							);
						}),
						(this.reduceActions[65] = function (t) {
							return new P(P.SELF, k.nodeTest, []);
						}),
						(this.reduceActions[66] = function (t) {
							return new P(P.PARENT, k.nodeTest, []);
						}),
						(this.reduceActions[67] = function (t) {
							return new V(t[1]);
						}),
						(this.reduceActions[68] = function (t) {
							return k.nameTestAny;
						}),
						(this.reduceActions[69] = function (t) {
							return new k.NameTestPrefixAny(t[0].split(':')[0]);
						}),
						(this.reduceActions[70] = function (t) {
							return new k.NameTestQName(t[0]);
						});
				}),
				(u.actionTable = [
					' s s        sssssssss    s ss  s  ss',
					'                 s                  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'                rrrrr               ',
					' s s        sssssssss    s ss  s  ss',
					'rs  rrrrrrrr s  sssssrrrrrr  rrs rs ',
					' s s        sssssssss    s ss  s  ss',
					'                            s       ',
					'                            s       ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'  s                                 ',
					'                            s       ',
					' s           s  sssss          s  s ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'a                                   ',
					'r       s                    rr  r  ',
					'r      sr                    rr  r  ',
					'r   s  rr            s       rr  r  ',
					'r   rssrr            rss     rr  r  ',
					'r   rrrrr            rrrss   rr  r  ',
					'r   rrrrrsss         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrrs  rr  r  ',
					'r   rrrrrrrr         rrrrrr  rr  r  ',
					'r   rrrrrrrr         rrrrrr  rr  r  ',
					'r  srrrrrrrr         rrrrrrs rr sr  ',
					'r  srrrrrrrr         rrrrrrs rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r   rrrrrrrr         rrrrrr  rr  r  ',
					'r   rrrrrrrr         rrrrrr  rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'                sssss               ',
					'r  rrrrrrrrr         rrrrrrr rr sr  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'                             s      ',
					'r  srrrrrrrr         rrrrrrs rr  r  ',
					'r   rrrrrrrr         rrrrr   rr  r  ',
					'              s                     ',
					'                             s      ',
					'                rrrrr               ',
					' s s        sssssssss    s sss s  ss',
					'r  srrrrrrrr         rrrrrrs rr  r  ',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s s        sssssssss      ss  s  ss',
					' s s        sssssssss    s ss  s  ss',
					' s           s  sssss          s  s ',
					' s           s  sssss          s  s ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					' s           s  sssss          s  s ',
					' s           s  sssss          s  s ',
					'r  rrrrrrrrr         rrrrrrr rr sr  ',
					'r  rrrrrrrrr         rrrrrrr rr sr  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'                             s      ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'                             rr     ',
					'                             s      ',
					'                             rs     ',
					'r      sr                    rr  r  ',
					'r   s  rr            s       rr  r  ',
					'r   rssrr            rss     rr  r  ',
					'r   rssrr            rss     rr  r  ',
					'r   rrrrr            rrrss   rr  r  ',
					'r   rrrrr            rrrss   rr  r  ',
					'r   rrrrr            rrrss   rr  r  ',
					'r   rrrrr            rrrss   rr  r  ',
					'r   rrrrrsss         rrrrr   rr  r  ',
					'r   rrrrrsss         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrr   rr  r  ',
					'r   rrrrrrrr         rrrrrr  rr  r  ',
					'                                 r  ',
					'                                 s  ',
					'r  srrrrrrrr         rrrrrrs rr  r  ',
					'r  srrrrrrrr         rrrrrrs rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr  r  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					' s s        sssssssss    s ss  s  ss',
					'r  rrrrrrrrr         rrrrrrr rr rr  ',
					'                             r      ',
				]),
				(u.actionTableNumber = [
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					'                 J                  ',
					'a  aaaaaaaaa         aaaaaaa aa  a  ',
					'                YYYYY               ',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					'K1  KKKKKKKK .  +*)(\'KKKKKK  KK# K" ',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					'                            N       ',
					'                            O       ',
					'e  eeeeeeeee         eeeeeee ee ee  ',
					'f  fffffffff         fffffff ff ff  ',
					'd  ddddddddd         ddddddd dd dd  ',
					'B  BBBBBBBBB         BBBBBBB BB BB  ',
					'A  AAAAAAAAA         AAAAAAA AA AA  ',
					'  P                                 ',
					'                            Q       ',
					' 1           .  +*)(\'          #  " ',
					'b  bbbbbbbbb         bbbbbbb bb  b  ',
					'                                    ',
					'!       S                    !!  !  ',
					'"      T"                    ""  "  ',
					'$   V  $$            U       $$  $  ',
					'&   &ZY&&            &XW     &&  &  ',
					')   )))))            )))\\[   ))  )  ',
					'.   ....._^]         .....   ..  .  ',
					'1   11111111         11111   11  1  ',
					'5   55555555         55555`  55  5  ',
					'7   77777777         777777  77  7  ',
					'9   99999999         999999  99  9  ',
					':  c::::::::         ::::::b :: a:  ',
					'I  fIIIIIIII         IIIIIIe II  I  ',
					'=  =========         ======= == ==  ',
					'?  ?????????         ??????? ?? ??  ',
					'C  CCCCCCCCC         CCCCCCC CC CC  ',
					'J   JJJJJJJJ         JJJJJJ  JJ  J  ',
					'M   MMMMMMMM         MMMMMM  MM  M  ',
					'N  NNNNNNNNN         NNNNNNN NN  N  ',
					'P  PPPPPPPPP         PPPPPPP PP  P  ',
					"                +*)('               ",
					'R  RRRRRRRRR         RRRRRRR RR aR  ',
					'U  UUUUUUUUU         UUUUUUU UU  U  ',
					'Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ',
					'c  ccccccccc         ccccccc cc cc  ',
					'                             j      ',
					'L  fLLLLLLLL         LLLLLLe LL  L  ',
					'6   66666666         66666   66  6  ',
					'              k                     ',
					'                             l      ',
					'                XXXXX               ',
					' 1 0        /.-,+*)(\'    & %$m #  "!',
					'_  f________         ______e __  _  ',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1 0        /.-,+*)(\'      %$  #  "!',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					' 1           .  +*)(\'          #  " ',
					' 1           .  +*)(\'          #  " ',
					'>  >>>>>>>>>         >>>>>>> >> >>  ',
					' 1           .  +*)(\'          #  " ',
					' 1           .  +*)(\'          #  " ',
					'Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ',
					'V  VVVVVVVVV         VVVVVVV VV aV  ',
					'T  TTTTTTTTT         TTTTTTT TT  T  ',
					'@  @@@@@@@@@         @@@@@@@ @@ @@  ',
					'                                   ',
					'[  [[[[[[[[[         [[[[[[[ [[ [[  ',
					'D  DDDDDDDDD         DDDDDDD DD DD  ',
					'                             HH     ',
					'                                   ',
					'                             F     ',
					'#      T#                    ##  #  ',
					'%   V  %%            U       %%  %  ',
					"'   'ZY''            'XW     ''  '  ",
					'(   (ZY((            (XW     ((  (  ',
					'+   +++++            +++\\[   ++  +  ',
					'*   *****            ***\\[   **  *  ',
					'-   -----            ---\\[   --  -  ',
					',   ,,,,,            ,,,\\[   ,,  ,  ',
					'0   00000_^]         00000   00  0  ',
					'/   /////_^]         /////   //  /  ',
					'2   22222222         22222   22  2  ',
					'3   33333333         33333   33  3  ',
					'4   44444444         44444   44  4  ',
					'8   88888888         888888  88  8  ',
					'                                 ^  ',
					'                                   ',
					';  f;;;;;;;;         ;;;;;;e ;;  ;  ',
					'<  f<<<<<<<<         <<<<<<e <<  <  ',
					'O  OOOOOOOOO         OOOOOOO OO  O  ',
					'`  `````````         ``````` ``  `  ',
					'S  SSSSSSSSS         SSSSSSS SS  S  ',
					'W  WWWWWWWWW         WWWWWWW WW  W  ',
					'\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ',
					'E  EEEEEEEEE         EEEEEEE EE EE  ',
					' 1 0        /.-,+*)(\'    & %$  #  "!',
					']  ]]]]]]]]]         ]]]]]]] ]] ]]  ',
					'                             G      ',
				]),
				(u.gotoTable = [
					'3456789:;<=>?@ AB  CDEFGH IJ ',
					'                             ',
					'                             ',
					'                             ',
					'L456789:;<=>?@ AB  CDEFGH IJ ',
					'            M        EFGH IJ ',
					'       N;<=>?@ AB  CDEFGH IJ ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'            S        EFGH IJ ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'              e              ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                        h  J ',
					'              i          j   ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'o456789:;<=>?@ ABpqCDEFGH IJ ',
					'                             ',
					'  r6789:;<=>?@ AB  CDEFGH IJ ',
					'   s789:;<=>?@ AB  CDEFGH IJ ',
					'    t89:;<=>?@ AB  CDEFGH IJ ',
					'    u89:;<=>?@ AB  CDEFGH IJ ',
					'     v9:;<=>?@ AB  CDEFGH IJ ',
					'     w9:;<=>?@ AB  CDEFGH IJ ',
					'     x9:;<=>?@ AB  CDEFGH IJ ',
					'     y9:;<=>?@ AB  CDEFGH IJ ',
					'      z:;<=>?@ AB  CDEFGH IJ ',
					'      {:;<=>?@ AB  CDEFGH IJ ',
					'       |;<=>?@ AB  CDEFGH IJ ',
					'       };<=>?@ AB  CDEFGH IJ ',
					'       ~;<=>?@ AB  CDEFGH IJ ',
					'         =>?@ AB  CDEFGH IJ ',
					'456789:;<=>?@ AB  CDEFGH IJ',
					'                    EFGH IJ ',
					'                    EFGH IJ ',
					'                             ',
					'                      GH IJ ',
					'                      GH IJ ',
					'              i             ',
					'              i             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'                             ',
					'o456789:;<=>?@ ABqCDEFGH IJ ',
					'                             ',
					'                             ',
				]),
				(u.productions = [
					[1, 1, 2],
					[2, 1, 3],
					[3, 1, 4],
					[3, 3, 3, -9, 4],
					[4, 1, 5],
					[4, 3, 4, -8, 5],
					[5, 1, 6],
					[5, 3, 5, -22, 6],
					[5, 3, 5, -5, 6],
					[6, 1, 7],
					[6, 3, 6, -23, 7],
					[6, 3, 6, -24, 7],
					[6, 3, 6, -6, 7],
					[6, 3, 6, -7, 7],
					[7, 1, 8],
					[7, 3, 7, -25, 8],
					[7, 3, 7, -26, 8],
					[8, 1, 9],
					[8, 3, 8, -12, 9],
					[8, 3, 8, -11, 9],
					[8, 3, 8, -10, 9],
					[9, 1, 10],
					[9, 2, -26, 9],
					[10, 1, 11],
					[10, 3, 10, -27, 11],
					[11, 1, 12],
					[11, 1, 13],
					[11, 3, 13, -28, 14],
					[11, 3, 13, -4, 14],
					[13, 1, 15],
					[13, 2, 13, 16],
					[15, 1, 17],
					[15, 3, -29, 2, -30],
					[15, 1, -15],
					[15, 1, -16],
					[15, 1, 18],
					[18, 3, -13, -29, -30],
					[18, 4, -13, -29, 19, -30],
					[19, 1, 20],
					[19, 3, 20, -31, 19],
					[20, 1, 2],
					[12, 1, 14],
					[12, 1, 21],
					[21, 1, -28],
					[21, 2, -28, 14],
					[21, 1, 22],
					[14, 1, 23],
					[14, 3, 14, -28, 23],
					[14, 1, 24],
					[23, 2, 25, 26],
					[23, 1, 26],
					[23, 3, 25, 26, 27],
					[23, 2, 26, 27],
					[23, 1, 28],
					[27, 1, 16],
					[27, 2, 16, 27],
					[25, 2, -14, -3],
					[25, 1, -32],
					[26, 1, 29],
					[26, 3, -20, -29, -30],
					[26, 4, -21, -29, -15, -30],
					[16, 3, -33, 30, -34],
					[30, 1, 2],
					[22, 2, -4, 14],
					[24, 3, 14, -4, 23],
					[28, 1, -35],
					[28, 1, -2],
					[17, 2, -36, -18],
					[29, 1, -17],
					[29, 1, -19],
					[29, 1, -18],
				]),
				(u.DOUBLEDOT = 2),
				(u.DOUBLECOLON = 3),
				(u.DOUBLESLASH = 4),
				(u.NOTEQUAL = 5),
				(u.LESSTHANOREQUAL = 6),
				(u.GREATERTHANOREQUAL = 7),
				(u.AND = 8),
				(u.OR = 9),
				(u.MOD = 10),
				(u.DIV = 11),
				(u.MULTIPLYOPERATOR = 12),
				(u.FUNCTIONNAME = 13),
				(u.AXISNAME = 14),
				(u.LITERAL = 15),
				(u.NUMBER = 16),
				(u.ASTERISKNAMETEST = 17),
				(u.QNAME = 18),
				(u.NCNAMECOLONASTERISK = 19),
				(u.NODETYPE = 20),
				(u.PROCESSINGINSTRUCTIONWITHLITERAL = 21),
				(u.EQUALS = 22),
				(u.LESSTHAN = 23),
				(u.GREATERTHAN = 24),
				(u.PLUS = 25),
				(u.MINUS = 26),
				(u.BAR = 27),
				(u.SLASH = 28),
				(u.LEFTPARENTHESIS = 29),
				(u.RIGHTPARENTHESIS = 30),
				(u.COMMA = 31),
				(u.AT = 32),
				(u.LEFTBRACKET = 33),
				(u.RIGHTBRACKET = 34),
				(u.DOT = 35),
				(u.DOLLAR = 36),
				(u.prototype.tokenize = function (t) {
					for (
						var e = [],
							n = [],
							r = t + '\0',
							o = 0,
							i = r.charAt(o++);
						;

					) {
						for (
							;
							' ' == i || '\t' == i || '\r' == i || '\n' == i;

						)
							i = r.charAt(o++);
						if ('\0' == i || o >= r.length) break;
						if ('(' != i)
							if (')' != i)
								if ('[' != i)
									if (']' != i)
										if ('@' != i)
											if (',' != i)
												if ('|' != i)
													if ('+' != i)
														if ('-' != i)
															if ('=' != i)
																if ('$' != i)
																	if (
																		'.' != i
																	)
																		if (
																			"'" !=
																				i &&
																			'"' !=
																				i
																		)
																			if (
																				i >=
																					'0' &&
																				i <=
																					'9'
																			) {
																				h =
																					i;
																				for (
																					i =
																						r.charAt(
																							o++
																						);
																					i >=
																						'0' &&
																					i <=
																						'9';

																				)
																					(h +=
																						i),
																						(i =
																							r.charAt(
																								o++
																							));
																				if (
																					'.' ==
																						i &&
																					r.charAt(
																						o
																					) >=
																						'0' &&
																					r.charAt(
																						o
																					) <=
																						'9'
																				)
																					for (
																						h +=
																							i,
																							h +=
																								r.charAt(
																									o++
																								),
																							i =
																								r.charAt(
																									o++
																								);
																						i >=
																							'0' &&
																						i <=
																							'9';

																					)
																						(h +=
																							i),
																							(i =
																								r.charAt(
																									o++
																								));
																				e.push(
																					u.NUMBER
																				),
																					n.push(
																						h
																					);
																			} else if (
																				'*' !=
																				i
																			)
																				if (
																					':' !=
																						i ||
																					':' !=
																						r.charAt(
																							o
																						)
																				)
																					if (
																						'/' !=
																						i
																					)
																						if (
																							'!' !=
																								i ||
																							'=' !=
																								r.charAt(
																									o
																								)
																						)
																							if (
																								'<' !=
																								i
																							)
																								if (
																									'>' !=
																									i
																								) {
																									if (
																										'_' !=
																											i &&
																										!Z.isLetter(
																											i.charCodeAt(
																												0
																											)
																										)
																									)
																										throw new Error(
																											'Unexpected character ' +
																												i
																										);
																									var s =
																										i;
																									for (
																										i =
																											r.charAt(
																												o++
																											);
																										Z.isNCNameChar(
																											i.charCodeAt(
																												0
																											)
																										);

																									)
																										(s +=
																											i),
																											(i =
																												r.charAt(
																													o++
																												));
																									if (
																										e.length >
																											0 &&
																										(a =
																											e[
																												e.length -
																													1
																											]) !=
																											u.AT &&
																										a !=
																											u.DOUBLECOLON &&
																										a !=
																											u.LEFTPARENTHESIS &&
																										a !=
																											u.LEFTBRACKET &&
																										a !=
																											u.AND &&
																										a !=
																											u.OR &&
																										a !=
																											u.MOD &&
																										a !=
																											u.DIV &&
																										a !=
																											u.MULTIPLYOPERATOR &&
																										a !=
																											u.SLASH &&
																										a !=
																											u.DOUBLESLASH &&
																										a !=
																											u.BAR &&
																										a !=
																											u.PLUS &&
																										a !=
																											u.MINUS &&
																										a !=
																											u.EQUALS &&
																										a !=
																											u.NOTEQUAL &&
																										a !=
																											u.LESSTHAN &&
																										a !=
																											u.LESSTHANOREQUAL &&
																										a !=
																											u.GREATERTHAN &&
																										a !=
																											u.GREATERTHANOREQUAL
																									) {
																										if (
																											'and' ==
																											s
																										) {
																											e.push(
																												u.AND
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																										if (
																											'or' ==
																											s
																										) {
																											e.push(
																												u.OR
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																										if (
																											'mod' ==
																											s
																										) {
																											e.push(
																												u.MOD
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																										if (
																											'div' ==
																											s
																										) {
																											e.push(
																												u.DIV
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																									}
																									if (
																										':' ==
																										i
																									) {
																										if (
																											'*' ==
																											r.charAt(
																												o
																											)
																										) {
																											e.push(
																												u.NCNAMECOLONASTERISK
																											),
																												n.push(
																													s +
																														':*'
																												),
																												o++,
																												(i =
																													r.charAt(
																														o++
																													));
																											continue;
																										}
																										if (
																											'_' ==
																												r.charAt(
																													o
																												) ||
																											Z.isLetter(
																												r.charCodeAt(
																													o
																												)
																											)
																										) {
																											for (
																												s +=
																													':',
																													i =
																														r.charAt(
																															o++
																														);
																												Z.isNCNameChar(
																													i.charCodeAt(
																														0
																													)
																												);

																											)
																												(s +=
																													i),
																													(i =
																														r.charAt(
																															o++
																														));
																											if (
																												'(' ==
																												i
																											) {
																												e.push(
																													u.FUNCTIONNAME
																												),
																													n.push(
																														s
																													);
																												continue;
																											}
																											e.push(
																												u.QNAME
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																										if (
																											':' ==
																											r.charAt(
																												o
																											)
																										) {
																											e.push(
																												u.AXISNAME
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																									}
																									if (
																										'(' ==
																										i
																									) {
																										if (
																											'comment' ==
																												s ||
																											'text' ==
																												s ||
																											'node' ==
																												s
																										) {
																											e.push(
																												u.NODETYPE
																											),
																												n.push(
																													s
																												);
																											continue;
																										}
																										if (
																											'processing-instruction' ==
																											s
																										) {
																											')' ==
																											r.charAt(
																												o
																											)
																												? e.push(
																														u.NODETYPE
																												  )
																												: e.push(
																														u.PROCESSINGINSTRUCTIONWITHLITERAL
																												  ),
																												n.push(
																													s
																												);
																											continue;
																										}
																										e.push(
																											u.FUNCTIONNAME
																										),
																											n.push(
																												s
																											);
																										continue;
																									}
																									e.push(
																										u.QNAME
																									),
																										n.push(
																											s
																										);
																								} else {
																									if (
																										'=' ==
																										r.charAt(
																											o
																										)
																									) {
																										e.push(
																											u.GREATERTHANOREQUAL
																										),
																											n.push(
																												'>='
																											),
																											o++,
																											(i =
																												r.charAt(
																													o++
																												));
																										continue;
																									}
																									e.push(
																										u.GREATERTHAN
																									),
																										n.push(
																											'>'
																										),
																										(i =
																											r.charAt(
																												o++
																											));
																								}
																							else {
																								if (
																									'=' ==
																									r.charAt(
																										o
																									)
																								) {
																									e.push(
																										u.LESSTHANOREQUAL
																									),
																										n.push(
																											'<='
																										),
																										o++,
																										(i =
																											r.charAt(
																												o++
																											));
																									continue;
																								}
																								e.push(
																									u.LESSTHAN
																								),
																									n.push(
																										'<'
																									),
																									(i =
																										r.charAt(
																											o++
																										));
																							}
																						else
																							e.push(
																								u.NOTEQUAL
																							),
																								n.push(
																									'!='
																								),
																								o++,
																								(i =
																									r.charAt(
																										o++
																									));
																					else {
																						if (
																							'/' ==
																							(i =
																								r.charAt(
																									o++
																								))
																						) {
																							e.push(
																								u.DOUBLESLASH
																							),
																								n.push(
																									'//'
																								),
																								(i =
																									r.charAt(
																										o++
																									));
																							continue;
																						}
																						e.push(
																							u.SLASH
																						),
																							n.push(
																								'/'
																							);
																					}
																				else
																					e.push(
																						u.DOUBLECOLON
																					),
																						n.push(
																							'::'
																						),
																						o++,
																						(i =
																							r.charAt(
																								o++
																							));
																			else {
																				var a;
																				if (
																					e.length >
																						0 &&
																					(a =
																						e[
																							e.length -
																								1
																						]) !=
																						u.AT &&
																					a !=
																						u.DOUBLECOLON &&
																					a !=
																						u.LEFTPARENTHESIS &&
																					a !=
																						u.LEFTBRACKET &&
																					a !=
																						u.AND &&
																					a !=
																						u.OR &&
																					a !=
																						u.MOD &&
																					a !=
																						u.DIV &&
																					a !=
																						u.MULTIPLYOPERATOR &&
																					a !=
																						u.SLASH &&
																					a !=
																						u.DOUBLESLASH &&
																					a !=
																						u.BAR &&
																					a !=
																						u.PLUS &&
																					a !=
																						u.MINUS &&
																					a !=
																						u.EQUALS &&
																					a !=
																						u.NOTEQUAL &&
																					a !=
																						u.LESSTHAN &&
																					a !=
																						u.LESSTHANOREQUAL &&
																					a !=
																						u.GREATERTHAN &&
																					a !=
																						u.GREATERTHANOREQUAL
																				) {
																					e.push(
																						u.MULTIPLYOPERATOR
																					),
																						n.push(
																							i
																						),
																						(i =
																							r.charAt(
																								o++
																							));
																					continue;
																				}
																				e.push(
																					u.ASTERISKNAMETEST
																				),
																					n.push(
																						i
																					),
																					(i =
																						r.charAt(
																							o++
																						));
																			}
																		else {
																			for (
																				var c =
																						i,
																					l =
																						'';
																				o <
																					r.length &&
																				(i =
																					r.charAt(
																						o
																					)) !==
																					c;

																			)
																				(l +=
																					i),
																					(o += 1);
																			if (
																				i !==
																				c
																			)
																				throw q.fromMessage(
																					'Unterminated string literal: ' +
																						c +
																						l
																				);
																			(o += 1),
																				e.push(
																					u.LITERAL
																				),
																				n.push(
																					l
																				),
																				(i =
																					r.charAt(
																						o++
																					));
																		}
																	else {
																		if (
																			'.' ==
																			(i =
																				r.charAt(
																					o++
																				))
																		) {
																			e.push(
																				u.DOUBLEDOT
																			),
																				n.push(
																					'..'
																				),
																				(i =
																					r.charAt(
																						o++
																					));
																			continue;
																		}
																		if (
																			i >=
																				'0' &&
																			i <=
																				'9'
																		) {
																			var h =
																				'.' +
																				i;
																			for (
																				i =
																					r.charAt(
																						o++
																					);
																				i >=
																					'0' &&
																				i <=
																					'9';

																			)
																				(h +=
																					i),
																					(i =
																						r.charAt(
																							o++
																						));
																			e.push(
																				u.NUMBER
																			),
																				n.push(
																					h
																				);
																			continue;
																		}
																		e.push(
																			u.DOT
																		),
																			n.push(
																				'.'
																			);
																	}
																else
																	e.push(
																		u.DOLLAR
																	),
																		n.push(
																			i
																		),
																		(i =
																			r.charAt(
																				o++
																			));
															else
																e.push(
																	u.EQUALS
																),
																	n.push(i),
																	(i =
																		r.charAt(
																			o++
																		));
														else
															e.push(u.MINUS),
																n.push(i),
																(i = r.charAt(
																	o++
																));
													else
														e.push(u.PLUS),
															n.push(i),
															(i = r.charAt(o++));
												else
													e.push(u.BAR),
														n.push(i),
														(i = r.charAt(o++));
											else
												e.push(u.COMMA),
													n.push(i),
													(i = r.charAt(o++));
										else
											e.push(u.AT),
												n.push(i),
												(i = r.charAt(o++));
									else
										e.push(u.RIGHTBRACKET),
											n.push(i),
											(i = r.charAt(o++));
								else
									e.push(u.LEFTBRACKET),
										n.push(i),
										(i = r.charAt(o++));
							else
								e.push(u.RIGHTPARENTHESIS),
									n.push(i),
									(i = r.charAt(o++));
						else
							e.push(u.LEFTPARENTHESIS),
								n.push(i),
								(i = r.charAt(o++));
					}
					return e.push(1), n.push('[EOF]'), [e, n];
				}),
				(u.SHIFT = 's'),
				(u.REDUCE = 'r'),
				(u.ACCEPT = 'a'),
				(u.prototype.parse = function (t) {
					var e,
						n,
						r = this.tokenize(t);
					if (null != r) {
						(e = r[0]), (n = r[1]);
						var o,
							i,
							s = 0,
							a = [],
							c = [],
							h = [];
						for (
							a.push(0),
								c.push(1),
								h.push('_S'),
								o = e[s],
								i = n[s++];
							;

						)
							switch (
								((t = a[a.length - 1]),
								u.actionTable[t].charAt(o - 1))
							) {
								case u.SHIFT:
									c.push(-o),
										h.push(i),
										a.push(
											u.actionTableNumber[t].charCodeAt(
												o - 1
											) - 32
										),
										(o = e[s]),
										(i = n[s++]);
									break;
								case u.REDUCE:
									for (
										var d =
												u.productions[
													u.actionTableNumber[
														t
													].charCodeAt(o - 1) - 32
												][1],
											p = [],
											f = 0;
										f < d;
										f++
									)
										c.pop(), p.unshift(h.pop()), a.pop();
									var g = a[a.length - 1];
									c.push(
										u.productions[
											u.actionTableNumber[t].charCodeAt(
												o - 1
											) - 32
										][0]
									),
										null ==
										this.reduceActions[
											u.actionTableNumber[t].charCodeAt(
												o - 1
											) - 32
										]
											? h.push(p[0])
											: h.push(
													this.reduceActions[
														u.actionTableNumber[
															t
														].charCodeAt(o - 1) - 32
													](p)
											  ),
										a.push(
											u.gotoTable[g].charCodeAt(
												u.productions[
													u.actionTableNumber[
														t
													].charCodeAt(o - 1) - 32
												][0] - 2
											) - 33
										);
									break;
								case u.ACCEPT:
									return new l(h.pop());
								default:
									throw new Error('XPath parse error');
							}
					}
				}),
				(l.prototype = new Object()),
				(l.prototype.constructor = l),
				(l.superclass = Object.prototype),
				(l.prototype.toString = function () {
					return this.expression.toString();
				}),
				(l.prototype.evaluate = function (t) {
					return (
						(t.contextNode = t.expressionContextNode),
						(t.contextSize = 1),
						(t.contextPosition = 1),
						t.isHtml &&
							(h(t, 'caseInsensitive', !0),
							h(t, 'allowAnyNamespaceForNoPrefix', !0)),
						h(t, 'caseInsensitive', !1),
						this.expression.evaluate(t)
					);
				}),
				(l.XML_NAMESPACE_URI = 'http://www.w3.org/XML/1998/namespace'),
				(l.XMLNS_NAMESPACE_URI = 'http://www.w3.org/2000/xmlns/'),
				(d.prototype = new Object()),
				(d.prototype.constructor = d),
				(d.superclass = Object.prototype),
				(d.prototype.init = function () {}),
				(d.prototype.toString = function () {
					return '<Expression>';
				}),
				(d.prototype.evaluate = function (t) {
					throw new Error('Could not evaluate expression.');
				}),
				(p.prototype = new d()),
				(p.prototype.constructor = p),
				(p.superclass = d.prototype),
				(p.prototype.init = function (t) {
					this.rhs = t;
				}),
				(f.prototype = new p()),
				(f.prototype.constructor = f),
				(f.superclass = p.prototype),
				(f.prototype.init = function (t) {
					f.superclass.init.call(this, t);
				}),
				(f.prototype.evaluate = function (t) {
					return this.rhs.evaluate(t).number().negate();
				}),
				(f.prototype.toString = function () {
					return '-' + this.rhs.toString();
				}),
				(g.prototype = new d()),
				(g.prototype.constructor = g),
				(g.superclass = d.prototype),
				(g.prototype.init = function (t, e) {
					(this.lhs = t), (this.rhs = e);
				}),
				(E.prototype = new g()),
				(E.prototype.constructor = E),
				(E.superclass = g.prototype),
				(E.prototype.init = function (t, e) {
					E.superclass.init.call(this, t, e);
				}),
				(E.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' or ' +
						this.rhs.toString() +
						')'
					);
				}),
				(E.prototype.evaluate = function (t) {
					var e = this.lhs.evaluate(t).bool();
					return e.booleanValue() ? e : this.rhs.evaluate(t).bool();
				}),
				(m.prototype = new g()),
				(m.prototype.constructor = m),
				(m.superclass = g.prototype),
				(m.prototype.init = function (t, e) {
					m.superclass.init.call(this, t, e);
				}),
				(m.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' and ' +
						this.rhs.toString() +
						')'
					);
				}),
				(m.prototype.evaluate = function (t) {
					var e = this.lhs.evaluate(t).bool();
					return e.booleanValue() ? this.rhs.evaluate(t).bool() : e;
				}),
				(v.prototype = new g()),
				(v.prototype.constructor = v),
				(v.superclass = g.prototype),
				(v.prototype.init = function (t, e) {
					v.superclass.init.call(this, t, e);
				}),
				(v.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' = ' +
						this.rhs.toString() +
						')'
					);
				}),
				(v.prototype.evaluate = function (t) {
					return this.lhs.evaluate(t).equals(this.rhs.evaluate(t));
				}),
				(_.prototype = new g()),
				(_.prototype.constructor = _),
				(_.superclass = g.prototype),
				(_.prototype.init = function (t, e) {
					_.superclass.init.call(this, t, e);
				}),
				(_.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' != ' +
						this.rhs.toString() +
						')'
					);
				}),
				(_.prototype.evaluate = function (t) {
					return this.lhs.evaluate(t).notequal(this.rhs.evaluate(t));
				}),
				(N.prototype = new g()),
				(N.prototype.constructor = N),
				(N.superclass = g.prototype),
				(N.prototype.init = function (t, e) {
					N.superclass.init.call(this, t, e);
				}),
				(N.prototype.evaluate = function (t) {
					return this.lhs.evaluate(t).lessthan(this.rhs.evaluate(t));
				}),
				(N.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' < ' +
						this.rhs.toString() +
						')'
					);
				}),
				(b.prototype = new g()),
				(b.prototype.constructor = b),
				(b.superclass = g.prototype),
				(b.prototype.init = function (t, e) {
					b.superclass.init.call(this, t, e);
				}),
				(b.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.greaterthan(this.rhs.evaluate(t));
				}),
				(b.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' > ' +
						this.rhs.toString() +
						')'
					);
				}),
				(y.prototype = new g()),
				(y.prototype.constructor = y),
				(y.superclass = g.prototype),
				(y.prototype.init = function (t, e) {
					y.superclass.init.call(this, t, e);
				}),
				(y.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.lessthanorequal(this.rhs.evaluate(t));
				}),
				(y.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' <= ' +
						this.rhs.toString() +
						')'
					);
				}),
				(w.prototype = new g()),
				(w.prototype.constructor = w),
				(w.superclass = g.prototype),
				(w.prototype.init = function (t, e) {
					w.superclass.init.call(this, t, e);
				}),
				(w.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.greaterthanorequal(this.rhs.evaluate(t));
				}),
				(w.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' >= ' +
						this.rhs.toString() +
						')'
					);
				}),
				(A.prototype = new g()),
				(A.prototype.constructor = A),
				(A.superclass = g.prototype),
				(A.prototype.init = function (t, e) {
					A.superclass.init.call(this, t, e);
				}),
				(A.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.number()
						.plus(this.rhs.evaluate(t).number());
				}),
				(A.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' + ' +
						this.rhs.toString() +
						')'
					);
				}),
				(T.prototype = new g()),
				(T.prototype.constructor = T),
				(T.superclass = g.prototype),
				(T.prototype.init = function (t, e) {
					T.superclass.init.call(this, t, e);
				}),
				(T.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.number()
						.minus(this.rhs.evaluate(t).number());
				}),
				(T.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' - ' +
						this.rhs.toString() +
						')'
					);
				}),
				(S.prototype = new g()),
				(S.prototype.constructor = S),
				(S.superclass = g.prototype),
				(S.prototype.init = function (t, e) {
					S.superclass.init.call(this, t, e);
				}),
				(S.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.number()
						.multiply(this.rhs.evaluate(t).number());
				}),
				(S.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' * ' +
						this.rhs.toString() +
						')'
					);
				}),
				(R.prototype = new g()),
				(R.prototype.constructor = R),
				(R.superclass = g.prototype),
				(R.prototype.init = function (t, e) {
					R.superclass.init.call(this, t, e);
				}),
				(R.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.number()
						.div(this.rhs.evaluate(t).number());
				}),
				(R.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' div ' +
						this.rhs.toString() +
						')'
					);
				}),
				(x.prototype = new g()),
				(x.prototype.constructor = x),
				(x.superclass = g.prototype),
				(x.prototype.init = function (t, e) {
					x.superclass.init.call(this, t, e);
				}),
				(x.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.number()
						.mod(this.rhs.evaluate(t).number());
				}),
				(x.prototype.toString = function () {
					return (
						'(' +
						this.lhs.toString() +
						' mod ' +
						this.rhs.toString() +
						')'
					);
				}),
				(O.prototype = new g()),
				(O.prototype.constructor = O),
				(O.superclass = g.prototype),
				(O.prototype.init = function (t, e) {
					O.superclass.init.call(this, t, e);
				}),
				(O.prototype.evaluate = function (t) {
					return this.lhs
						.evaluate(t)
						.nodeset()
						.union(this.rhs.evaluate(t).nodeset());
				}),
				(O.prototype.toString = function () {
					return r(o, [this.lhs, this.rhs]).join(' | ');
				}),
				(C.prototype = new d()),
				(C.prototype.constructor = C),
				(C.superclass = d.prototype),
				(C.prototype.init = function (t, e, n) {
					C.superclass.init.call(this),
						(this.filter = t),
						(this.filterPredicates = e),
						(this.locationPath = n);
				}),
				(C.applyPredicates = function (t, r, o) {
					if (0 === t.length) return o;
					var i = r.extend({});
					return n(
						function (t, n) {
							return (
								(i.contextSize = t.length),
								(r = function (t, e) {
									return (
										(i.contextNode = t),
										(i.contextPosition = e + 1),
										C.predicateMatches(n, i)
									);
								}),
								(o = []),
								e(function (t, e) {
									r(t, e) && o.push(t);
								}, t),
								o
							);
							var r, o;
						},
						o,
						t
					);
				}),
				(C.getRoot = function (t, e) {
					var n = e[0];
					if (9 === n.nodeType) return n;
					if (t.virtualRoot) return t.virtualRoot;
					var r = n.ownerDocument;
					if (r) return r;
					for (var o = n; null != o.parentNode; ) o = o.parentNode;
					return o;
				}),
				(C.applyStep = function (t, e, n) {
					var r = [];
					switch (((e.contextNode = n), t.axis)) {
						case P.ANCESTOR:
							if (e.contextNode === e.virtualRoot) break;
							for (
								o =
									2 == e.contextNode.nodeType
										? C.getOwnerElement(e.contextNode)
										: e.contextNode.parentNode;
								null != o &&
								(t.nodeTest.matches(o, e) && r.push(o),
								o !== e.virtualRoot);

							)
								o = o.parentNode;
							break;
						case P.ANCESTORORSELF:
							for (
								var o = e.contextNode;
								null != o &&
								(t.nodeTest.matches(o, e) && r.push(o),
								o !== e.virtualRoot);
								o =
									2 == o.nodeType
										? C.getOwnerElement(o)
										: o.parentNode
							);
							break;
						case P.ATTRIBUTE:
							var i = e.contextNode.attributes;
							if (null != i)
								for (var s = 0; s < i.length; s++) {
									o = i.item(s);
									t.nodeTest.matches(o, e) && r.push(o);
								}
							break;
						case P.CHILD:
							for (
								o = e.contextNode.firstChild;
								null != o;
								o = o.nextSibling
							)
								t.nodeTest.matches(o, e) && r.push(o);
							break;
						case P.DESCENDANT:
							for (
								var a = [e.contextNode.firstChild];
								a.length > 0;

							)
								for (o = a.pop(); null != o; )
									t.nodeTest.matches(o, e) && r.push(o),
										null != o.firstChild
											? (a.push(o.nextSibling),
											  (o = o.firstChild))
											: (o = o.nextSibling);
							break;
						case P.DESCENDANTORSELF:
							t.nodeTest.matches(e.contextNode, e) &&
								r.push(e.contextNode);
							for (a = [e.contextNode.firstChild]; a.length > 0; )
								for (o = a.pop(); null != o; )
									t.nodeTest.matches(o, e) && r.push(o),
										null != o.firstChild
											? (a.push(o.nextSibling),
											  (o = o.firstChild))
											: (o = o.nextSibling);
							break;
						case P.FOLLOWING:
							if (e.contextNode === e.virtualRoot) break;
							a = [];
							null != e.contextNode.firstChild
								? a.unshift(e.contextNode.firstChild)
								: a.unshift(e.contextNode.nextSibling);
							for (
								o = e.contextNode.parentNode;
								null != o &&
								9 != o.nodeType &&
								o !== e.virtualRoot;
								o = o.parentNode
							)
								a.unshift(o.nextSibling);
							do {
								for (o = a.pop(); null != o; )
									t.nodeTest.matches(o, e) && r.push(o),
										null != o.firstChild
											? (a.push(o.nextSibling),
											  (o = o.firstChild))
											: (o = o.nextSibling);
							} while (a.length > 0);
							break;
						case P.FOLLOWINGSIBLING:
							if (e.contextNode === e.virtualRoot) break;
							for (
								o = e.contextNode.nextSibling;
								null != o;
								o = o.nextSibling
							)
								t.nodeTest.matches(o, e) && r.push(o);
							break;
						case P.NAMESPACE:
							var c = {};
							if (1 == e.contextNode.nodeType) {
								(c.xml = l.XML_NAMESPACE_URI),
									(c.xmlns = l.XMLNS_NAMESPACE_URI);
								for (
									o = e.contextNode;
									null != o && 1 == o.nodeType;
									o = o.parentNode
								)
									for (s = 0; s < o.attributes.length; s++) {
										var u = o.attributes.item(s),
											h = String(u.name);
										if ('xmlns' == h)
											null == c[''] && (c[''] = u.value);
										else if (
											h.length > 6 &&
											'xmlns:' == h.substring(0, 6)
										) {
											null ==
												c[
													(d = h.substring(
														6,
														h.length
													))
												] && (c[d] = u.value);
										}
									}
								for (var d in c) {
									var p = new Y(d, c[d], e.contextNode);
									t.nodeTest.matches(p, e) && r.push(p);
								}
							}
							break;
						case P.PARENT:
							(o = null),
								e.contextNode !== e.virtualRoot &&
									(o =
										2 == e.contextNode.nodeType
											? C.getOwnerElement(e.contextNode)
											: e.contextNode.parentNode),
								null != o &&
									t.nodeTest.matches(o, e) &&
									r.push(o);
							break;
						case P.PRECEDING:
							a =
								null != e.virtualRoot
									? [e.virtualRoot]
									: [D(e.contextNode)];
							t: for (; a.length > 0; )
								for (o = a.pop(); null != o; ) {
									if (o == e.contextNode) break t;
									t.nodeTest.matches(o, e) && r.unshift(o),
										null != o.firstChild
											? (a.push(o.nextSibling),
											  (o = o.firstChild))
											: (o = o.nextSibling);
								}
							break;
						case P.PRECEDINGSIBLING:
							if (e.contextNode === e.virtualRoot) break;
							for (
								o = e.contextNode.previousSibling;
								null != o;
								o = o.previousSibling
							)
								t.nodeTest.matches(o, e) && r.push(o);
							break;
						case P.SELF:
							t.nodeTest.matches(e.contextNode, e) &&
								r.push(e.contextNode);
					}
					return r;
				}),
				(C.applySteps = function (t, e, r) {
					return n(M.bind(null, e), r, t);
				}),
				(C.prototype.applyFilter = function (t, e) {
					if (!this.filter)
						return {
							nodes: [t.contextNode],
						};
					var n = this.filter.evaluate(t);
					if (!Z.instance_of(n, z)) {
						if (
							(null != this.filterPredicates &&
								this.filterPredicates.length > 0) ||
							null != this.locationPath
						)
							throw new Error(
								'Path expression filter must evaluate to a nodeset if predicates or location path are used'
							);
						return {
							nonNodes: n,
						};
					}
					return {
						nodes: C.applyPredicates(
							this.filterPredicates || [],
							e,
							n.toUnsortedArray()
						),
					};
				}),
				(C.applyLocationPath = function (t, e, n) {
					if (!t) return n;
					var r = t.absolute ? [C.getRoot(e, n)] : n;
					return C.applySteps(t.steps, e, r);
				}),
				(C.prototype.evaluate = function (t) {
					var e = c(new j(), t),
						n = this.applyFilter(t, e);
					if ('nonNodes' in n) return n.nonNodes;
					var r = new z();
					return (
						r.addArray(
							C.applyLocationPath(this.locationPath, e, n.nodes)
						),
						r
					);
				}),
				(C.predicateMatches = function (t, e) {
					var n = t.evaluate(e);
					return Z.instance_of(n, G)
						? e.contextPosition === n.numberValue()
						: n.booleanValue();
				}),
				(C.predicateString = function (t) {
					return s('[', ']', t.toString());
				}),
				(C.predicatesString = function (t) {
					return i('', r(C.predicateString, t));
				}),
				(C.prototype.toString = function () {
					if (null != this.filter) {
						var t = o(this.filter);
						return Z.instance_of(this.filter, W)
							? s("'", "'", t)
							: null != this.filterPredicates &&
							  this.filterPredicates.length
							? s('(', ')', t) +
							  C.predicatesString(this.filterPredicates)
							: null != this.locationPath
							? t +
							  (this.locationPath.absolute ? '' : '/') +
							  o(this.locationPath)
							: t;
					}
					return o(this.locationPath);
				}),
				(C.getOwnerElement = function (t) {
					if (t.ownerElement) return t.ownerElement;
					try {
						if (t.selectSingleNode) return t.selectSingleNode('..');
					} catch (t) {}
					for (
						var e = (
								9 == t.nodeType ? t : t.ownerDocument
							).getElementsByTagName('*'),
							n = 0;
						n < e.length;
						n++
					)
						for (
							var r = e.item(n), o = r.attributes, i = 0;
							i < o.length;
							i++
						) {
							if (o.item(i) === t) return r;
						}
					return null;
				}),
				(I.prototype = new Object()),
				(I.prototype.constructor = I),
				(I.superclass = Object.prototype),
				(I.prototype.init = function (t, e) {
					(this.absolute = t), (this.steps = e);
				}),
				(I.prototype.toString = function () {
					return (
						(this.absolute ? '/' : '') + r(o, this.steps).join('/')
					);
				}),
				(P.prototype = new Object()),
				(P.prototype.constructor = P),
				(P.superclass = Object.prototype),
				(P.prototype.init = function (t, e, n) {
					(this.axis = t), (this.nodeTest = e), (this.predicates = n);
				}),
				(P.prototype.toString = function () {
					return (
						P.STEPNAMES[this.axis] +
						'::' +
						this.nodeTest.toString() +
						C.predicatesString(this.predicates)
					);
				}),
				(P.ANCESTOR = 0),
				(P.ANCESTORORSELF = 1),
				(P.ATTRIBUTE = 2),
				(P.CHILD = 3),
				(P.DESCENDANT = 4),
				(P.DESCENDANTORSELF = 5),
				(P.FOLLOWING = 6),
				(P.FOLLOWINGSIBLING = 7),
				(P.NAMESPACE = 8),
				(P.PARENT = 9),
				(P.PRECEDING = 10),
				(P.PRECEDINGSIBLING = 11),
				(P.SELF = 12),
				(P.STEPNAMES = n(
					function (t, e) {
						return (t[e[0]] = e[1]), t;
					},
					{},
					[
						[P.ANCESTOR, 'ancestor'],
						[P.ANCESTORORSELF, 'ancestor-or-self'],
						[P.ATTRIBUTE, 'attribute'],
						[P.CHILD, 'child'],
						[P.DESCENDANT, 'descendant'],
						[P.DESCENDANTORSELF, 'descendant-or-self'],
						[P.FOLLOWING, 'following'],
						[P.FOLLOWINGSIBLING, 'following-sibling'],
						[P.NAMESPACE, 'namespace'],
						[P.PARENT, 'parent'],
						[P.PRECEDING, 'preceding'],
						[P.PRECEDINGSIBLING, 'preceding-sibling'],
						[P.SELF, 'self'],
					]
				)),
				(k.prototype = new Object()),
				(k.prototype.constructor = k),
				(k.superclass = Object.prototype),
				(k.prototype.init = function (t, e) {
					(this.type = t), (this.value = e);
				}),
				(k.prototype.toString = function () {
					return '<unknown nodetest type>';
				}),
				(k.prototype.matches = function (t, e) {
					console.warn('unknown node test type');
				}),
				(k.NAMETESTANY = 0),
				(k.NAMETESTPREFIXANY = 1),
				(k.NAMETESTQNAME = 2),
				(k.COMMENT = 3),
				(k.TEXT = 4),
				(k.PI = 5),
				(k.NODE = 6),
				(k.isNodeType = function (t) {
					return function (e) {
						return (function (t, e) {
							for (var n = 0; n < t.length; n += 1)
								if (t[n] === e) return !0;
							return !1;
						})(t, e.nodeType);
					};
				}),
				(k.makeNodeTestType = function (t, e, n) {
					var r = n || function () {};
					return (
						(r.prototype = new k(t)),
						(r.prototype.constructor = r),
						c(r.prototype, e),
						r
					);
				}),
				(k.makeNodeTypeTest = function (t, e, n) {
					return new (k.makeNodeTestType(t, {
						matches: k.isNodeType(e),
						toString:
							((r = n),
							function () {
								return r;
							}),
					}))();
					var r;
				}),
				(k.hasPrefix = function (t) {
					return (
						t.prefix ||
						-1 !== (t.nodeName || t.tagName).indexOf(':')
					);
				}),
				(k.isElementOrAttribute = k.isNodeType([1, 2])),
				(k.nameSpaceMatches = function (t, e, n) {
					var r = n.namespaceURI || '';
					if (!t)
						return (
							!r ||
							(e.allowAnyNamespaceForNoPrefix && !k.hasPrefix(n))
						);
					var o = e.namespaceResolver.getNamespace(
						t,
						e.expressionContextNode
					);
					if (null == o) throw new Error('Cannot resolve QName ' + t);
					return o === r;
				}),
				(k.localNameMatches = function (t, e, n) {
					var r = n.localName || n.nodeName;
					return e.caseInsensitive
						? t.toLowerCase() === r.toLowerCase()
						: t === r;
				}),
				(k.NameTestPrefixAny = k.makeNodeTestType(
					k.NAMETESTPREFIXANY,
					{
						matches: function (t, e) {
							return (
								k.isElementOrAttribute(t) &&
								k.nameSpaceMatches(this.prefix, e, t)
							);
						},
						toString: function () {
							return this.prefix + ':*';
						},
					},
					function (t) {
						this.prefix = t;
					}
				)),
				(k.NameTestQName = k.makeNodeTestType(
					k.NAMETESTQNAME,
					{
						matches: function (t, e) {
							return (
								k.isNodeType([1, 2, Y.XPATH_NAMESPACE_NODE])(
									t
								) &&
								k.nameSpaceMatches(this.prefix, e, t) &&
								k.localNameMatches(this.localName, e, t)
							);
						},
						toString: function () {
							return this.name;
						},
					},
					function (t) {
						var e = t.split(':');
						(this.name = t),
							(this.prefix = e.length > 1 ? e[0] : null),
							(this.localName = e[e.length > 1 ? 1 : 0]);
					}
				)),
				(k.PITest = k.makeNodeTestType(
					k.PI,
					{
						matches: function (t, e) {
							return (
								k.isNodeType([7])(t) &&
								(t.target || t.nodeName) === this.name
							);
						},
						toString: function () {
							return s(
								'processing-instruction("',
								'")',
								this.name
							);
						},
					},
					function (t) {
						this.name = t;
					}
				)),
				(k.nameTestAny = k.makeNodeTypeTest(
					k.NAMETESTANY,
					[1, 2, Y.XPATH_NAMESPACE_NODE],
					'*'
				)),
				(k.textTest = k.makeNodeTypeTest(k.TEXT, [3, 4], 'text()')),
				(k.commentTest = k.makeNodeTypeTest(
					k.COMMENT,
					[8],
					'comment()'
				)),
				(k.nodeTest = k.makeNodeTypeTest(
					k.NODE,
					[1, 2, 3, 4, 7, 8, 9],
					'node()'
				)),
				(k.anyPiTest = k.makeNodeTypeTest(
					k.PI,
					[7],
					'processing-instruction()'
				)),
				(V.prototype = new d()),
				(V.prototype.constructor = V),
				(V.superclass = d.prototype),
				(V.prototype.init = function (t) {
					this.variable = t;
				}),
				(V.prototype.toString = function () {
					return '$' + this.variable;
				}),
				(V.prototype.evaluate = function (t) {
					var e = Z.resolveQName(
						this.variable,
						t.namespaceResolver,
						t.contextNode,
						!1
					);
					if (null == e[0])
						throw new Error('Cannot resolve QName ' + fn);
					var n = t.variableResolver.getVariable(e[1], e[0]);
					if (!n)
						throw q.fromMessage(
							'Undeclared variable: ' + this.toString()
						);
					return n;
				}),
				(U.prototype = new d()),
				(U.prototype.constructor = U),
				(U.superclass = d.prototype),
				(U.prototype.init = function (t, e) {
					(this.functionName = t), (this.arguments = e);
				}),
				(U.prototype.toString = function () {
					for (
						var t = this.functionName + '(', e = 0;
						e < this.arguments.length;
						e++
					)
						e > 0 && (t += ', '),
							(t += this.arguments[e].toString());
					return t + ')';
				}),
				(U.prototype.evaluate = function (t) {
					var e = K.getFunctionFromContext(this.functionName, t);
					if (!e)
						throw new Error(
							'Unknown function ' + this.functionName
						);
					var n = [t].concat(this.arguments);
					return e.apply(t.functionResolver.thisArg, n);
				});
			var H = new Object();

			function W(t) {
				arguments.length > 0 && this.init(t);
			}

			function G(t) {
				arguments.length > 0 && this.init(t);
			}

			function B(t) {
				arguments.length > 0 && this.init(t);
			}

			function F(t) {
				this.init(t);
			}

			function z() {
				this.init();
			}

			function Y(t, e, n) {
				(this.isXPathNamespace = !0),
					(this.ownerDocument = n.ownerDocument),
					(this.nodeName = '#namespace'),
					(this.prefix = t),
					(this.localName = t),
					(this.namespaceURI = e),
					(this.nodeValue = e),
					(this.ownerElement = n),
					(this.nodeType = Y.XPATH_NAMESPACE_NODE);
			}

			function j(t, e, n) {
				(this.variableResolver = null != t ? t : new X()),
					(this.namespaceResolver = null != e ? e : new Q()),
					(this.functionResolver = null != n ? n : new K());
			}

			function X() {}

			function K(t) {
				(this.thisArg = null != t ? t : $),
					(this.functions = new Object()),
					this.addStandardFunctions();
			}

			function Q() {}
			(H.equals = function (t, e) {
				return t.equals(e);
			}),
				(H.notequal = function (t, e) {
					return t.notequal(e);
				}),
				(H.lessthan = function (t, e) {
					return t.lessthan(e);
				}),
				(H.greaterthan = function (t, e) {
					return t.greaterthan(e);
				}),
				(H.lessthanorequal = function (t, e) {
					return t.lessthanorequal(e);
				}),
				(H.greaterthanorequal = function (t, e) {
					return t.greaterthanorequal(e);
				}),
				(W.prototype = new d()),
				(W.prototype.constructor = W),
				(W.superclass = d.prototype),
				(W.prototype.init = function (t) {
					this.str = String(t);
				}),
				(W.prototype.toString = function () {
					return this.str;
				}),
				(W.prototype.evaluate = function (t) {
					return this;
				}),
				(W.prototype.string = function () {
					return this;
				}),
				(W.prototype.number = function () {
					return new G(this.str);
				}),
				(W.prototype.bool = function () {
					return new B(this.str);
				}),
				(W.prototype.nodeset = function () {
					throw new Error('Cannot convert string to nodeset');
				}),
				(W.prototype.stringValue = function () {
					return this.str;
				}),
				(W.prototype.numberValue = function () {
					return this.number().numberValue();
				}),
				(W.prototype.booleanValue = function () {
					return this.bool().booleanValue();
				}),
				(W.prototype.equals = function (t) {
					return Z.instance_of(t, B)
						? this.bool().equals(t)
						: Z.instance_of(t, G)
						? this.number().equals(t)
						: Z.instance_of(t, z)
						? t.compareWithString(this, H.equals)
						: new B(this.str == t.str);
				}),
				(W.prototype.notequal = function (t) {
					return Z.instance_of(t, B)
						? this.bool().notequal(t)
						: Z.instance_of(t, G)
						? this.number().notequal(t)
						: Z.instance_of(t, z)
						? t.compareWithString(this, H.notequal)
						: new B(this.str != t.str);
				}),
				(W.prototype.lessthan = function (t) {
					return this.number().lessthan(t);
				}),
				(W.prototype.greaterthan = function (t) {
					return this.number().greaterthan(t);
				}),
				(W.prototype.lessthanorequal = function (t) {
					return this.number().lessthanorequal(t);
				}),
				(W.prototype.greaterthanorequal = function (t) {
					return this.number().greaterthanorequal(t);
				}),
				(G.prototype = new d()),
				(G.prototype.constructor = G),
				(G.superclass = d.prototype),
				(G.prototype.init = function (t) {
					this.num = 'string' == typeof t ? this.parse(t) : Number(t);
				}),
				(G.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/),
				(G.prototype.parse = function (t) {
					return this.numberFormat.test(t)
						? parseFloat(t)
						: Number.NaN;
				}),
				(G.prototype.toString = function () {
					var t = this.num.toString();
					return -1 !== t.indexOf('e-')
						? (function (t) {
								for (
									var e = t.split('e-'),
										n = e[0].replace('.', ''),
										r = Number(e[1]),
										o = 0;
									o < r - 1;
									o += 1
								)
									n = '0' + n;
								return '0.' + n;
						  })(t)
						: -1 !== t.indexOf('e')
						? (function (t) {
								for (
									var e = t.split('e'),
										n = e[0].replace('.', ''),
										r = Number(e[1]) + 1 - n.length,
										o = 0;
									o < r;
									o += 1
								)
									n += '0';
								return n;
						  })(t)
						: t;
				}),
				(G.prototype.evaluate = function (t) {
					return this;
				}),
				(G.prototype.string = function () {
					return new W(this.toString());
				}),
				(G.prototype.number = function () {
					return this;
				}),
				(G.prototype.bool = function () {
					return new B(this.num);
				}),
				(G.prototype.nodeset = function () {
					throw new Error('Cannot convert number to nodeset');
				}),
				(G.prototype.stringValue = function () {
					return this.string().stringValue();
				}),
				(G.prototype.numberValue = function () {
					return this.num;
				}),
				(G.prototype.booleanValue = function () {
					return this.bool().booleanValue();
				}),
				(G.prototype.negate = function () {
					return new G(-this.num);
				}),
				(G.prototype.equals = function (t) {
					return Z.instance_of(t, B)
						? this.bool().equals(t)
						: Z.instance_of(t, W)
						? this.equals(t.number())
						: Z.instance_of(t, z)
						? t.compareWithNumber(this, H.equals)
						: new B(this.num == t.num);
				}),
				(G.prototype.notequal = function (t) {
					return Z.instance_of(t, B)
						? this.bool().notequal(t)
						: Z.instance_of(t, W)
						? this.notequal(t.number())
						: Z.instance_of(t, z)
						? t.compareWithNumber(this, H.notequal)
						: new B(this.num != t.num);
				}),
				(G.prototype.lessthan = function (t) {
					return Z.instance_of(t, z)
						? t.compareWithNumber(this, H.greaterthan)
						: Z.instance_of(t, B) || Z.instance_of(t, W)
						? this.lessthan(t.number())
						: new B(this.num < t.num);
				}),
				(G.prototype.greaterthan = function (t) {
					return Z.instance_of(t, z)
						? t.compareWithNumber(this, H.lessthan)
						: Z.instance_of(t, B) || Z.instance_of(t, W)
						? this.greaterthan(t.number())
						: new B(this.num > t.num);
				}),
				(G.prototype.lessthanorequal = function (t) {
					return Z.instance_of(t, z)
						? t.compareWithNumber(this, H.greaterthanorequal)
						: Z.instance_of(t, B) || Z.instance_of(t, W)
						? this.lessthanorequal(t.number())
						: new B(this.num <= t.num);
				}),
				(G.prototype.greaterthanorequal = function (t) {
					return Z.instance_of(t, z)
						? t.compareWithNumber(this, H.lessthanorequal)
						: Z.instance_of(t, B) || Z.instance_of(t, W)
						? this.greaterthanorequal(t.number())
						: new B(this.num >= t.num);
				}),
				(G.prototype.plus = function (t) {
					return new G(this.num + t.num);
				}),
				(G.prototype.minus = function (t) {
					return new G(this.num - t.num);
				}),
				(G.prototype.multiply = function (t) {
					return new G(this.num * t.num);
				}),
				(G.prototype.div = function (t) {
					return new G(this.num / t.num);
				}),
				(G.prototype.mod = function (t) {
					return new G(this.num % t.num);
				}),
				(B.prototype = new d()),
				(B.prototype.constructor = B),
				(B.superclass = d.prototype),
				(B.prototype.init = function (t) {
					this.b = Boolean(t);
				}),
				(B.prototype.toString = function () {
					return this.b.toString();
				}),
				(B.prototype.evaluate = function (t) {
					return this;
				}),
				(B.prototype.string = function () {
					return new W(this.b);
				}),
				(B.prototype.number = function () {
					return new G(this.b);
				}),
				(B.prototype.bool = function () {
					return this;
				}),
				(B.prototype.nodeset = function () {
					throw new Error('Cannot convert boolean to nodeset');
				}),
				(B.prototype.stringValue = function () {
					return this.string().stringValue();
				}),
				(B.prototype.numberValue = function () {
					return this.number().numberValue();
				}),
				(B.prototype.booleanValue = function () {
					return this.b;
				}),
				(B.prototype.not = function () {
					return new B(!this.b);
				}),
				(B.prototype.equals = function (t) {
					return Z.instance_of(t, W) || Z.instance_of(t, G)
						? this.equals(t.bool())
						: Z.instance_of(t, z)
						? t.compareWithBoolean(this, H.equals)
						: new B(this.b == t.b);
				}),
				(B.prototype.notequal = function (t) {
					return Z.instance_of(t, W) || Z.instance_of(t, G)
						? this.notequal(t.bool())
						: Z.instance_of(t, z)
						? t.compareWithBoolean(this, H.notequal)
						: new B(this.b != t.b);
				}),
				(B.prototype.lessthan = function (t) {
					return this.number().lessthan(t);
				}),
				(B.prototype.greaterthan = function (t) {
					return this.number().greaterthan(t);
				}),
				(B.prototype.lessthanorequal = function (t) {
					return this.number().lessthanorequal(t);
				}),
				(B.prototype.greaterthanorequal = function (t) {
					return this.number().greaterthanorequal(t);
				}),
				(B.true_ = new B(!0)),
				(B.false_ = new B(!1)),
				(F.prototype = new Object()),
				(F.prototype.constructor = F),
				(F.superclass = Object.prototype),
				(F.prototype.init = function (t) {
					(this.left = null),
						(this.right = null),
						(this.node = t),
						(this.depth = 1);
				}),
				(F.prototype.balance = function () {
					var t = null == this.left ? 0 : this.left.depth,
						e = null == this.right ? 0 : this.right.depth;
					if (t > e + 1)
						(null == this.left.left ? 0 : this.left.left.depth) <
							(null == this.left.right
								? 0
								: this.left.right.depth) &&
							this.left.rotateRR(),
							this.rotateLL();
					else if (t + 1 < e) {
						var n =
							null == this.right.right
								? 0
								: this.right.right.depth;
						(null == this.right.left ? 0 : this.right.left.depth) >
							n && this.right.rotateLL(),
							this.rotateRR();
					}
				}),
				(F.prototype.rotateLL = function () {
					var t = this.node,
						e = this.right;
					(this.node = this.left.node),
						(this.right = this.left),
						(this.left = this.left.left),
						(this.right.left = this.right.right),
						(this.right.right = e),
						(this.right.node = t),
						this.right.updateInNewLocation(),
						this.updateInNewLocation();
				}),
				(F.prototype.rotateRR = function () {
					var t = this.node,
						e = this.left;
					(this.node = this.right.node),
						(this.left = this.right),
						(this.right = this.right.right),
						(this.left.right = this.left.left),
						(this.left.left = e),
						(this.left.node = t),
						this.left.updateInNewLocation(),
						this.updateInNewLocation();
				}),
				(F.prototype.updateInNewLocation = function () {
					this.getDepthFromChildren();
				}),
				(F.prototype.getDepthFromChildren = function () {
					(this.depth = null == this.node ? 0 : 1),
						null != this.left && (this.depth = this.left.depth + 1),
						null != this.right &&
							this.depth <= this.right.depth &&
							(this.depth = this.right.depth + 1);
				}),
				(F.prototype.add = function (t) {
					if (t === this.node) return !1;
					var e = (function (t, e) {
							if (t === e) return 0;
							if (t.compareDocumentPosition) {
								var n = t.compareDocumentPosition(e);
								return 1 & n || 10 & n ? 1 : 20 & n ? -1 : 0;
							}
							for (
								var r = 0, o = 0, i = t;
								null != i;
								i = i.parentNode || i.ownerElement
							)
								r++;
							for (
								var s = e;
								null != s;
								s = s.parentNode || s.ownerElement
							)
								o++;
							if (r > o) {
								for (; r > o; )
									(t = t.parentNode || t.ownerElement), r--;
								if (t === e) return 1;
							} else if (o > r) {
								for (; o > r; )
									(e = e.parentNode || e.ownerElement), o--;
								if (t === e) return -1;
							}
							for (
								var a = t.parentNode || t.ownerElement,
									c = e.parentNode || e.ownerElement;
								a !== c;

							)
								(e = c),
									(a = (t = a).parentNode || t.ownerElement),
									(c = e.parentNode || e.ownerElement);
							var u = Z.isAttribute(t),
								l = Z.isAttribute(e);
							if (u && !l) return -1;
							if (!u && l) return 1;
							if (a)
								for (
									var h = u ? a.attributes : a.childNodes,
										d = h.length,
										p = 0;
									p < d;
									p += 1
								) {
									var f = h[p];
									if (f === t) return -1;
									if (f === e) return 1;
								}
							throw new Error(
								'Unexpected: could not determine node order'
							);
						})(t, this.node),
						n = !1;
					return (
						-1 == e
							? null == this.left
								? ((this.left = new F(t)), (n = !0))
								: (n = this.left.add(t)) && this.balance()
							: 1 == e &&
							  (null == this.right
									? ((this.right = new F(t)), (n = !0))
									: (n = this.right.add(t)) &&
									  this.balance()),
						n && this.getDepthFromChildren(),
						n
					);
				}),
				(z.prototype = new d()),
				(z.prototype.constructor = z),
				(z.superclass = d.prototype),
				(z.prototype.init = function () {
					(this.tree = null), (this.nodes = []), (this.size = 0);
				}),
				(z.prototype.toString = function () {
					var t = this.first();
					return null == t ? '' : this.stringForNode(t);
				}),
				(z.prototype.evaluate = function (t) {
					return this;
				}),
				(z.prototype.string = function () {
					return new W(this.toString());
				}),
				(z.prototype.stringValue = function () {
					return this.toString();
				}),
				(z.prototype.number = function () {
					return new G(this.string());
				}),
				(z.prototype.numberValue = function () {
					return Number(this.string());
				}),
				(z.prototype.bool = function () {
					return new B(this.booleanValue());
				}),
				(z.prototype.booleanValue = function () {
					return !!this.size;
				}),
				(z.prototype.nodeset = function () {
					return this;
				}),
				(z.prototype.stringForNode = function (t) {
					return 9 == t.nodeType ||
						1 == t.nodeType ||
						11 === t.nodeType
						? this.stringForContainerNode(t)
						: 2 === t.nodeType
						? t.value || t.nodeValue
						: t.isNamespaceNode
						? t.namespace
						: t.nodeValue;
				}),
				(z.prototype.stringForContainerNode = function (t) {
					for (
						var e = '', n = t.firstChild;
						null != n;
						n = n.nextSibling
					) {
						var r = n.nodeType;
						(1 !== r &&
							3 !== r &&
							4 !== r &&
							9 !== r &&
							11 !== r) ||
							(e += this.stringForNode(n));
					}
					return e;
				}),
				(z.prototype.buildTree = function () {
					if (!this.tree && this.nodes.length) {
						this.tree = new F(this.nodes[0]);
						for (var t = 1; t < this.nodes.length; t += 1)
							this.tree.add(this.nodes[t]);
					}
					return this.tree;
				}),
				(z.prototype.first = function () {
					var t = this.buildTree();
					if (null == t) return null;
					for (; null != t.left; ) t = t.left;
					return t.node;
				}),
				(z.prototype.add = function (t) {
					for (var e = 0; e < this.nodes.length; e += 1)
						if (t === this.nodes[e]) return;
					(this.tree = null), this.nodes.push(t), (this.size += 1);
				}),
				(z.prototype.addArray = function (t) {
					var n = this;
					e(function (t) {
						n.add(t);
					}, t);
				}),
				(z.prototype.toArray = function () {
					var t = [];
					return this.toArrayRec(this.buildTree(), t), t;
				}),
				(z.prototype.toArrayRec = function (t, e) {
					null != t &&
						(this.toArrayRec(t.left, e),
						e.push(t.node),
						this.toArrayRec(t.right, e));
				}),
				(z.prototype.toUnsortedArray = function () {
					return this.nodes.slice();
				}),
				(z.prototype.compareWithString = function (t, e) {
					for (
						var n = this.toUnsortedArray(), r = 0;
						r < n.length;
						r++
					) {
						var o = n[r],
							i = e(new W(this.stringForNode(o)), t);
						if (i.booleanValue()) return i;
					}
					return new B(!1);
				}),
				(z.prototype.compareWithNumber = function (t, e) {
					for (
						var n = this.toUnsortedArray(), r = 0;
						r < n.length;
						r++
					) {
						var o = n[r],
							i = e(new G(this.stringForNode(o)), t);
						if (i.booleanValue()) return i;
					}
					return new B(!1);
				}),
				(z.prototype.compareWithBoolean = function (t, e) {
					return e(this.bool(), t);
				}),
				(z.prototype.compareWithNodeSet = function (t, e) {
					for (
						var n = this.toUnsortedArray(),
							r = function (t, n) {
								return e(n, t);
							},
							o = 0;
						o < n.length;
						o++
					) {
						var i = new W(this.stringForNode(n[o])),
							s = t.compareWithString(i, r);
						if (s.booleanValue()) return s;
					}
					return new B(!1);
				}),
				(z.compareWith = (function (t) {
					var e = Array.prototype.slice,
						n = t.length,
						r = function (t, n) {
							return function () {
								return n.apply(
									this,
									t.concat(e.call(arguments))
								);
							};
						},
						o = function () {
							var i = e.call(arguments);
							return i.length < n
								? r(i, o)
								: t.apply(this, e.apply(arguments, [0, n]));
						};
					return o;
				})(function (t, e) {
					return Z.instance_of(e, W)
						? this.compareWithString(e, t)
						: Z.instance_of(e, G)
						? this.compareWithNumber(e, t)
						: Z.instance_of(e, B)
						? this.compareWithBoolean(e, t)
						: this.compareWithNodeSet(e, t);
				})),
				(z.prototype.equals = z.compareWith(H.equals)),
				(z.prototype.notequal = z.compareWith(H.notequal)),
				(z.prototype.lessthan = z.compareWith(H.lessthan)),
				(z.prototype.greaterthan = z.compareWith(H.greaterthan)),
				(z.prototype.lessthanorequal = z.compareWith(
					H.lessthanorequal
				)),
				(z.prototype.greaterthanorequal = z.compareWith(
					H.greaterthanorequal
				)),
				(z.prototype.union = function (t) {
					var e = new z();
					return (
						e.addArray(this.toUnsortedArray()),
						e.addArray(t.toUnsortedArray()),
						e
					);
				}),
				(Y.prototype = new Object()),
				(Y.prototype.constructor = Y),
				(Y.superclass = Object.prototype),
				(Y.prototype.toString = function () {
					return (
						'{ "' + this.prefix + '", "' + this.namespaceURI + '" }'
					);
				}),
				(j.prototype = new Object()),
				(j.prototype.constructor = j),
				(j.superclass = Object.prototype),
				(j.prototype.extend = function (t) {
					return c(new j(), this, t);
				}),
				(X.prototype = new Object()),
				(X.prototype.constructor = X),
				(X.superclass = Object.prototype),
				(X.prototype.getVariable = function (t, e) {
					return null;
				}),
				(K.prototype = new Object()),
				(K.prototype.constructor = K),
				(K.superclass = Object.prototype),
				(K.prototype.addStandardFunctions = function () {
					(this.functions['{}last'] = $.last),
						(this.functions['{}position'] = $.position),
						(this.functions['{}count'] = $.count),
						(this.functions['{}id'] = $.id),
						(this.functions['{}local-name'] = $.localName),
						(this.functions['{}namespace-uri'] = $.namespaceURI),
						(this.functions['{}name'] = $.name),
						(this.functions['{}string'] = $.string),
						(this.functions['{}concat'] = $.concat),
						(this.functions['{}starts-with'] = $.startsWith),
						(this.functions['{}contains'] = $.contains),
						(this.functions['{}substring-before'] =
							$.substringBefore),
						(this.functions['{}substring-after'] =
							$.substringAfter),
						(this.functions['{}substring'] = $.substring),
						(this.functions['{}string-length'] = $.stringLength),
						(this.functions['{}normalize-space'] =
							$.normalizeSpace),
						(this.functions['{}translate'] = $.translate),
						(this.functions['{}boolean'] = $.boolean_),
						(this.functions['{}not'] = $.not),
						(this.functions['{}true'] = $.true_),
						(this.functions['{}false'] = $.false_),
						(this.functions['{}lang'] = $.lang),
						(this.functions['{}number'] = $.number),
						(this.functions['{}sum'] = $.sum),
						(this.functions['{}floor'] = $.floor),
						(this.functions['{}ceiling'] = $.ceiling),
						(this.functions['{}round'] = $.round);
				}),
				(K.prototype.addFunction = function (t, e, n) {
					this.functions['{' + t + '}' + e] = n;
				}),
				(K.getFunctionFromContext = function (t, e) {
					var n = Z.resolveQName(
						t,
						e.namespaceResolver,
						e.contextNode,
						!1
					);
					if (null === n[0])
						throw new Error('Cannot resolve QName ' + name);
					return e.functionResolver.getFunction(n[1], n[0]);
				}),
				(K.prototype.getFunction = function (t, e) {
					return this.functions['{' + e + '}' + t];
				}),
				(Q.prototype = new Object()),
				(Q.prototype.constructor = Q),
				(Q.superclass = Object.prototype),
				(Q.prototype.getNamespace = function (t, e) {
					if ('xml' == t) return l.XML_NAMESPACE_URI;
					if ('xmlns' == t) return l.XMLNS_NAMESPACE_URI;
					for (
						9 == e.nodeType
							? (e = e.documentElement)
							: 2 == e.nodeType
							? (e = C.getOwnerElement(e))
							: 1 != e.nodeType && (e = e.parentNode);
						null != e && 1 == e.nodeType;

					) {
						for (var n = e.attributes, r = 0; r < n.length; r++) {
							var o = n.item(r),
								i = o.name || o.nodeName;
							if (
								('xmlns' === i && '' === t) ||
								i === 'xmlns:' + t
							)
								return String(o.value || o.nodeValue);
						}
						e = e.parentNode;
					}
					return null;
				});
			var $ = new Object();
			($.last = function (t) {
				if (1 != arguments.length)
					throw new Error('Function last expects ()');
				return new G(t.contextSize);
			}),
				($.position = function (t) {
					if (1 != arguments.length)
						throw new Error('Function position expects ()');
					return new G(t.contextPosition);
				}),
				($.count = function () {
					var t,
						e = arguments[0];
					if (
						2 != arguments.length ||
						!Z.instance_of((t = arguments[1].evaluate(e)), z)
					)
						throw new Error('Function count expects (node-set)');
					return new G(t.size);
				}),
				($.id = function () {
					var t,
						e = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function id expects (object)');
					t = arguments[1].evaluate(e);
					for (
						var n = (t = Z.instance_of(t, z)
								? t.toArray().join(' ')
								: t.stringValue()).split(/[\x0d\x0a\x09\x20]+/),
							r = new z(),
							o =
								9 == e.contextNode.nodeType
									? e.contextNode
									: e.contextNode.ownerDocument,
							i = 0;
						i < n.length;
						i++
					) {
						var s;
						null !=
							(s = o.getElementById
								? o.getElementById(n[i])
								: Z.getElementById(o, n[i])) && r.add(s);
					}
					return r;
				}),
				($.localName = function (t, e) {
					var n;
					if (1 == arguments.length) n = t.contextNode;
					else {
						if (2 != arguments.length)
							throw new Error(
								'Function local-name expects (node-set?)'
							);
						n = e.evaluate(t).first();
					}
					return new W(
						null == n
							? ''
							: n.localName ||
							  n.baseName ||
							  n.target ||
							  n.nodeName ||
							  ''
					);
				}),
				($.namespaceURI = function () {
					var t,
						e = arguments[0];
					if (1 == arguments.length) t = e.contextNode;
					else {
						if (2 != arguments.length)
							throw new Error(
								'Function namespace-uri expects (node-set?)'
							);
						t = arguments[1].evaluate(e).first();
					}
					return new W(null == t ? '' : t.namespaceURI);
				}),
				($.name = function () {
					var t,
						e = arguments[0];
					if (1 == arguments.length) t = e.contextNode;
					else {
						if (2 != arguments.length)
							throw new Error(
								'Function name expects (node-set?)'
							);
						t = arguments[1].evaluate(e).first();
					}
					return null == t
						? new W('')
						: 1 == t.nodeType
						? new W(t.nodeName)
						: 2 == t.nodeType
						? new W(t.name || t.nodeName)
						: 7 === t.nodeType
						? new W(t.target || t.nodeName)
						: null == t.localName
						? new W('')
						: new W(t.localName);
				}),
				($.string = function () {
					var t = arguments[0];
					if (1 == arguments.length)
						return new W(z.prototype.stringForNode(t.contextNode));
					if (2 == arguments.length)
						return arguments[1].evaluate(t).string();
					throw new Error('Function string expects (object?)');
				}),
				($.concat = function (t) {
					if (arguments.length < 3)
						throw new Error(
							'Function concat expects (string, string[, string]*)'
						);
					for (var e = '', n = 1; n < arguments.length; n++)
						e += arguments[n].evaluate(t).stringValue();
					return new W(e);
				}),
				($.startsWith = function () {
					var t = arguments[0];
					if (3 != arguments.length)
						throw new Error(
							'Function startsWith expects (string, string)'
						);
					var e = arguments[1].evaluate(t).stringValue(),
						n = arguments[2].evaluate(t).stringValue();
					return new B(e.substring(0, n.length) == n);
				}),
				($.contains = function () {
					var t = arguments[0];
					if (3 != arguments.length)
						throw new Error(
							'Function contains expects (string, string)'
						);
					var e = arguments[1].evaluate(t).stringValue(),
						n = arguments[2].evaluate(t).stringValue();
					return new B(-1 !== e.indexOf(n));
				}),
				($.substringBefore = function () {
					var t = arguments[0];
					if (3 != arguments.length)
						throw new Error(
							'Function substring-before expects (string, string)'
						);
					var e = arguments[1].evaluate(t).stringValue(),
						n = arguments[2].evaluate(t).stringValue();
					return new W(e.substring(0, e.indexOf(n)));
				}),
				($.substringAfter = function () {
					var t = arguments[0];
					if (3 != arguments.length)
						throw new Error(
							'Function substring-after expects (string, string)'
						);
					var e = arguments[1].evaluate(t).stringValue(),
						n = arguments[2].evaluate(t).stringValue();
					if (0 == n.length) return new W(e);
					var r = e.indexOf(n);
					return new W(-1 == r ? '' : e.substring(r + n.length));
				}),
				($.substring = function () {
					var t = arguments[0];
					if (3 != arguments.length && 4 != arguments.length)
						throw new Error(
							'Function substring expects (string, number, number?)'
						);
					var e = arguments[1].evaluate(t).stringValue(),
						n =
							Math.round(arguments[2].evaluate(t).numberValue()) -
							1,
						r =
							4 == arguments.length
								? n +
								  Math.round(
										arguments[3].evaluate(t).numberValue()
								  )
								: void 0;
					return new W(e.substring(n, r));
				}),
				($.stringLength = function () {
					var t,
						e = arguments[0];
					if (1 == arguments.length)
						t = z.prototype.stringForNode(e.contextNode);
					else {
						if (2 != arguments.length)
							throw new Error(
								'Function string-length expects (string?)'
							);
						t = arguments[1].evaluate(e).stringValue();
					}
					return new G(t.length);
				}),
				($.normalizeSpace = function () {
					var t,
						e = arguments[0];
					if (1 == arguments.length)
						t = z.prototype.stringForNode(e.contextNode);
					else {
						if (2 != arguments.length)
							throw new Error(
								'Function normalize-space expects (string?)'
							);
						t = arguments[1].evaluate(e).stringValue();
					}
					for (
						var n = 0, r = t.length - 1;
						Z.isSpace(t.charCodeAt(r));

					)
						r--;
					for (var o = ''; n <= r && Z.isSpace(t.charCodeAt(n)); )
						n++;
					for (; n <= r; )
						if (Z.isSpace(t.charCodeAt(n)))
							for (
								o += ' ';
								n <= r && Z.isSpace(t.charCodeAt(n));

							)
								n++;
						else (o += t.charAt(n)), n++;
					return new W(o);
				}),
				($.translate = function (t, e, o, s) {
					if (4 != arguments.length)
						throw new Error(
							'Function translate expects (string, string, string)'
						);
					var a = e.evaluate(t).stringValue(),
						c = o.evaluate(t).stringValue(),
						u = s.evaluate(t).stringValue(),
						l = n(
							function (t, e, n) {
								return (
									e in t || (t[e] = n > u.length ? '' : u[n]),
									t
								);
							},
							{},
							c
						),
						h = i(
							'',
							r(function (t) {
								return t in l ? l[t] : t;
							}, a)
						);
					return new W(h);
				}),
				($.boolean_ = function () {
					var t = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function boolean expects (object)');
					return arguments[1].evaluate(t).bool();
				}),
				($.not = function (t, e) {
					if (2 != arguments.length)
						throw new Error('Function not expects (object)');
					return e.evaluate(t).bool().not();
				}),
				($.true_ = function () {
					if (1 != arguments.length)
						throw new Error('Function true expects ()');
					return B.true_;
				}),
				($.false_ = function () {
					if (1 != arguments.length)
						throw new Error('Function false expects ()');
					return B.false_;
				}),
				($.lang = function () {
					var t,
						e = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function lang expects (string)');
					for (
						var n = e.contextNode;
						null != n && 9 != n.nodeType;
						n = n.parentNode
					) {
						var r = n.getAttributeNS(l.XML_NAMESPACE_URI, 'lang');
						if (null != r) {
							t = String(r);
							break;
						}
					}
					if (null == t) return B.false_;
					var o = arguments[1].evaluate(e).stringValue();
					return new B(
						t.substring(0, o.length) == o &&
							(t.length == o.length || '-' == t.charAt(o.length))
					);
				}),
				($.number = function () {
					var t = arguments[0];
					if (1 != arguments.length && 2 != arguments.length)
						throw new Error('Function number expects (object?)');
					return 1 == arguments.length
						? new G(z.prototype.stringForNode(t.contextNode))
						: arguments[1].evaluate(t).number();
				}),
				($.sum = function () {
					var t,
						e = arguments[0];
					if (
						2 != arguments.length ||
						!Z.instance_of((t = arguments[1].evaluate(e)), z)
					)
						throw new Error('Function sum expects (node-set)');
					t = t.toUnsortedArray();
					for (var n = 0, r = 0; r < t.length; r++)
						n += new G(
							z.prototype.stringForNode(t[r])
						).numberValue();
					return new G(n);
				}),
				($.floor = function () {
					var t = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function floor expects (number)');
					return new G(
						Math.floor(arguments[1].evaluate(t).numberValue())
					);
				}),
				($.ceiling = function () {
					var t = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function ceiling expects (number)');
					return new G(
						Math.ceil(arguments[1].evaluate(t).numberValue())
					);
				}),
				($.round = function () {
					var t = arguments[0];
					if (2 != arguments.length)
						throw new Error('Function round expects (number)');
					return new G(
						Math.round(arguments[1].evaluate(t).numberValue())
					);
				});
			var Z = new Object();
			(Z.isAttribute = function (t) {
				return t && (2 === t.nodeType || t.ownerElement);
			}),
				(Z.splitQName = function (t) {
					var e = t.indexOf(':');
					return -1 == e
						? [null, t]
						: [t.substring(0, e), t.substring(e + 1)];
				}),
				(Z.resolveQName = function (t, e, n, r) {
					var o = Z.splitQName(t);
					return (
						null != o[0]
							? (o[0] = e.getNamespace(o[0], n))
							: r
							? ((o[0] = e.getNamespace('', n)),
							  null == o[0] && (o[0] = ''))
							: (o[0] = ''),
						o
					);
				}),
				(Z.isSpace = function (t) {
					return 9 == t || 13 == t || 10 == t || 32 == t;
				}),
				(Z.isLetter = function (t) {
					return (
						(t >= 65 && t <= 90) ||
						(t >= 97 && t <= 122) ||
						(t >= 192 && t <= 214) ||
						(t >= 216 && t <= 246) ||
						(t >= 248 && t <= 255) ||
						(t >= 256 && t <= 305) ||
						(t >= 308 && t <= 318) ||
						(t >= 321 && t <= 328) ||
						(t >= 330 && t <= 382) ||
						(t >= 384 && t <= 451) ||
						(t >= 461 && t <= 496) ||
						(t >= 500 && t <= 501) ||
						(t >= 506 && t <= 535) ||
						(t >= 592 && t <= 680) ||
						(t >= 699 && t <= 705) ||
						902 == t ||
						(t >= 904 && t <= 906) ||
						908 == t ||
						(t >= 910 && t <= 929) ||
						(t >= 931 && t <= 974) ||
						(t >= 976 && t <= 982) ||
						986 == t ||
						988 == t ||
						990 == t ||
						992 == t ||
						(t >= 994 && t <= 1011) ||
						(t >= 1025 && t <= 1036) ||
						(t >= 1038 && t <= 1103) ||
						(t >= 1105 && t <= 1116) ||
						(t >= 1118 && t <= 1153) ||
						(t >= 1168 && t <= 1220) ||
						(t >= 1223 && t <= 1224) ||
						(t >= 1227 && t <= 1228) ||
						(t >= 1232 && t <= 1259) ||
						(t >= 1262 && t <= 1269) ||
						(t >= 1272 && t <= 1273) ||
						(t >= 1329 && t <= 1366) ||
						1369 == t ||
						(t >= 1377 && t <= 1414) ||
						(t >= 1488 && t <= 1514) ||
						(t >= 1520 && t <= 1522) ||
						(t >= 1569 && t <= 1594) ||
						(t >= 1601 && t <= 1610) ||
						(t >= 1649 && t <= 1719) ||
						(t >= 1722 && t <= 1726) ||
						(t >= 1728 && t <= 1742) ||
						(t >= 1744 && t <= 1747) ||
						1749 == t ||
						(t >= 1765 && t <= 1766) ||
						(t >= 2309 && t <= 2361) ||
						2365 == t ||
						(t >= 2392 && t <= 2401) ||
						(t >= 2437 && t <= 2444) ||
						(t >= 2447 && t <= 2448) ||
						(t >= 2451 && t <= 2472) ||
						(t >= 2474 && t <= 2480) ||
						2482 == t ||
						(t >= 2486 && t <= 2489) ||
						(t >= 2524 && t <= 2525) ||
						(t >= 2527 && t <= 2529) ||
						(t >= 2544 && t <= 2545) ||
						(t >= 2565 && t <= 2570) ||
						(t >= 2575 && t <= 2576) ||
						(t >= 2579 && t <= 2600) ||
						(t >= 2602 && t <= 2608) ||
						(t >= 2610 && t <= 2611) ||
						(t >= 2613 && t <= 2614) ||
						(t >= 2616 && t <= 2617) ||
						(t >= 2649 && t <= 2652) ||
						2654 == t ||
						(t >= 2674 && t <= 2676) ||
						(t >= 2693 && t <= 2699) ||
						2701 == t ||
						(t >= 2703 && t <= 2705) ||
						(t >= 2707 && t <= 2728) ||
						(t >= 2730 && t <= 2736) ||
						(t >= 2738 && t <= 2739) ||
						(t >= 2741 && t <= 2745) ||
						2749 == t ||
						2784 == t ||
						(t >= 2821 && t <= 2828) ||
						(t >= 2831 && t <= 2832) ||
						(t >= 2835 && t <= 2856) ||
						(t >= 2858 && t <= 2864) ||
						(t >= 2866 && t <= 2867) ||
						(t >= 2870 && t <= 2873) ||
						2877 == t ||
						(t >= 2908 && t <= 2909) ||
						(t >= 2911 && t <= 2913) ||
						(t >= 2949 && t <= 2954) ||
						(t >= 2958 && t <= 2960) ||
						(t >= 2962 && t <= 2965) ||
						(t >= 2969 && t <= 2970) ||
						2972 == t ||
						(t >= 2974 && t <= 2975) ||
						(t >= 2979 && t <= 2980) ||
						(t >= 2984 && t <= 2986) ||
						(t >= 2990 && t <= 2997) ||
						(t >= 2999 && t <= 3001) ||
						(t >= 3077 && t <= 3084) ||
						(t >= 3086 && t <= 3088) ||
						(t >= 3090 && t <= 3112) ||
						(t >= 3114 && t <= 3123) ||
						(t >= 3125 && t <= 3129) ||
						(t >= 3168 && t <= 3169) ||
						(t >= 3205 && t <= 3212) ||
						(t >= 3214 && t <= 3216) ||
						(t >= 3218 && t <= 3240) ||
						(t >= 3242 && t <= 3251) ||
						(t >= 3253 && t <= 3257) ||
						3294 == t ||
						(t >= 3296 && t <= 3297) ||
						(t >= 3333 && t <= 3340) ||
						(t >= 3342 && t <= 3344) ||
						(t >= 3346 && t <= 3368) ||
						(t >= 3370 && t <= 3385) ||
						(t >= 3424 && t <= 3425) ||
						(t >= 3585 && t <= 3630) ||
						3632 == t ||
						(t >= 3634 && t <= 3635) ||
						(t >= 3648 && t <= 3653) ||
						(t >= 3713 && t <= 3714) ||
						3716 == t ||
						(t >= 3719 && t <= 3720) ||
						3722 == t ||
						3725 == t ||
						(t >= 3732 && t <= 3735) ||
						(t >= 3737 && t <= 3743) ||
						(t >= 3745 && t <= 3747) ||
						3749 == t ||
						3751 == t ||
						(t >= 3754 && t <= 3755) ||
						(t >= 3757 && t <= 3758) ||
						3760 == t ||
						(t >= 3762 && t <= 3763) ||
						3773 == t ||
						(t >= 3776 && t <= 3780) ||
						(t >= 3904 && t <= 3911) ||
						(t >= 3913 && t <= 3945) ||
						(t >= 4256 && t <= 4293) ||
						(t >= 4304 && t <= 4342) ||
						4352 == t ||
						(t >= 4354 && t <= 4355) ||
						(t >= 4357 && t <= 4359) ||
						4361 == t ||
						(t >= 4363 && t <= 4364) ||
						(t >= 4366 && t <= 4370) ||
						4412 == t ||
						4414 == t ||
						4416 == t ||
						4428 == t ||
						4430 == t ||
						4432 == t ||
						(t >= 4436 && t <= 4437) ||
						4441 == t ||
						(t >= 4447 && t <= 4449) ||
						4451 == t ||
						4453 == t ||
						4455 == t ||
						4457 == t ||
						(t >= 4461 && t <= 4462) ||
						(t >= 4466 && t <= 4467) ||
						4469 == t ||
						4510 == t ||
						4520 == t ||
						4523 == t ||
						(t >= 4526 && t <= 4527) ||
						(t >= 4535 && t <= 4536) ||
						4538 == t ||
						(t >= 4540 && t <= 4546) ||
						4587 == t ||
						4592 == t ||
						4601 == t ||
						(t >= 7680 && t <= 7835) ||
						(t >= 7840 && t <= 7929) ||
						(t >= 7936 && t <= 7957) ||
						(t >= 7960 && t <= 7965) ||
						(t >= 7968 && t <= 8005) ||
						(t >= 8008 && t <= 8013) ||
						(t >= 8016 && t <= 8023) ||
						8025 == t ||
						8027 == t ||
						8029 == t ||
						(t >= 8031 && t <= 8061) ||
						(t >= 8064 && t <= 8116) ||
						(t >= 8118 && t <= 8124) ||
						8126 == t ||
						(t >= 8130 && t <= 8132) ||
						(t >= 8134 && t <= 8140) ||
						(t >= 8144 && t <= 8147) ||
						(t >= 8150 && t <= 8155) ||
						(t >= 8160 && t <= 8172) ||
						(t >= 8178 && t <= 8180) ||
						(t >= 8182 && t <= 8188) ||
						8486 == t ||
						(t >= 8490 && t <= 8491) ||
						8494 == t ||
						(t >= 8576 && t <= 8578) ||
						(t >= 12353 && t <= 12436) ||
						(t >= 12449 && t <= 12538) ||
						(t >= 12549 && t <= 12588) ||
						(t >= 44032 && t <= 55203) ||
						(t >= 19968 && t <= 40869) ||
						12295 == t ||
						(t >= 12321 && t <= 12329)
					);
				}),
				(Z.isNCNameChar = function (t) {
					return (
						(t >= 48 && t <= 57) ||
						(t >= 1632 && t <= 1641) ||
						(t >= 1776 && t <= 1785) ||
						(t >= 2406 && t <= 2415) ||
						(t >= 2534 && t <= 2543) ||
						(t >= 2662 && t <= 2671) ||
						(t >= 2790 && t <= 2799) ||
						(t >= 2918 && t <= 2927) ||
						(t >= 3047 && t <= 3055) ||
						(t >= 3174 && t <= 3183) ||
						(t >= 3302 && t <= 3311) ||
						(t >= 3430 && t <= 3439) ||
						(t >= 3664 && t <= 3673) ||
						(t >= 3792 && t <= 3801) ||
						(t >= 3872 && t <= 3881) ||
						46 == t ||
						45 == t ||
						95 == t ||
						Z.isLetter(t) ||
						(t >= 768 && t <= 837) ||
						(t >= 864 && t <= 865) ||
						(t >= 1155 && t <= 1158) ||
						(t >= 1425 && t <= 1441) ||
						(t >= 1443 && t <= 1465) ||
						(t >= 1467 && t <= 1469) ||
						1471 == t ||
						(t >= 1473 && t <= 1474) ||
						1476 == t ||
						(t >= 1611 && t <= 1618) ||
						1648 == t ||
						(t >= 1750 && t <= 1756) ||
						(t >= 1757 && t <= 1759) ||
						(t >= 1760 && t <= 1764) ||
						(t >= 1767 && t <= 1768) ||
						(t >= 1770 && t <= 1773) ||
						(t >= 2305 && t <= 2307) ||
						2364 == t ||
						(t >= 2366 && t <= 2380) ||
						2381 == t ||
						(t >= 2385 && t <= 2388) ||
						(t >= 2402 && t <= 2403) ||
						(t >= 2433 && t <= 2435) ||
						2492 == t ||
						2494 == t ||
						2495 == t ||
						(t >= 2496 && t <= 2500) ||
						(t >= 2503 && t <= 2504) ||
						(t >= 2507 && t <= 2509) ||
						2519 == t ||
						(t >= 2530 && t <= 2531) ||
						2562 == t ||
						2620 == t ||
						2622 == t ||
						2623 == t ||
						(t >= 2624 && t <= 2626) ||
						(t >= 2631 && t <= 2632) ||
						(t >= 2635 && t <= 2637) ||
						(t >= 2672 && t <= 2673) ||
						(t >= 2689 && t <= 2691) ||
						2748 == t ||
						(t >= 2750 && t <= 2757) ||
						(t >= 2759 && t <= 2761) ||
						(t >= 2763 && t <= 2765) ||
						(t >= 2817 && t <= 2819) ||
						2876 == t ||
						(t >= 2878 && t <= 2883) ||
						(t >= 2887 && t <= 2888) ||
						(t >= 2891 && t <= 2893) ||
						(t >= 2902 && t <= 2903) ||
						(t >= 2946 && t <= 2947) ||
						(t >= 3006 && t <= 3010) ||
						(t >= 3014 && t <= 3016) ||
						(t >= 3018 && t <= 3021) ||
						3031 == t ||
						(t >= 3073 && t <= 3075) ||
						(t >= 3134 && t <= 3140) ||
						(t >= 3142 && t <= 3144) ||
						(t >= 3146 && t <= 3149) ||
						(t >= 3157 && t <= 3158) ||
						(t >= 3202 && t <= 3203) ||
						(t >= 3262 && t <= 3268) ||
						(t >= 3270 && t <= 3272) ||
						(t >= 3274 && t <= 3277) ||
						(t >= 3285 && t <= 3286) ||
						(t >= 3330 && t <= 3331) ||
						(t >= 3390 && t <= 3395) ||
						(t >= 3398 && t <= 3400) ||
						(t >= 3402 && t <= 3405) ||
						3415 == t ||
						3633 == t ||
						(t >= 3636 && t <= 3642) ||
						(t >= 3655 && t <= 3662) ||
						3761 == t ||
						(t >= 3764 && t <= 3769) ||
						(t >= 3771 && t <= 3772) ||
						(t >= 3784 && t <= 3789) ||
						(t >= 3864 && t <= 3865) ||
						3893 == t ||
						3895 == t ||
						3897 == t ||
						3902 == t ||
						3903 == t ||
						(t >= 3953 && t <= 3972) ||
						(t >= 3974 && t <= 3979) ||
						(t >= 3984 && t <= 3989) ||
						3991 == t ||
						(t >= 3993 && t <= 4013) ||
						(t >= 4017 && t <= 4023) ||
						4025 == t ||
						(t >= 8400 && t <= 8412) ||
						8417 == t ||
						(t >= 12330 && t <= 12335) ||
						12441 == t ||
						12442 == t ||
						183 == t ||
						720 == t ||
						721 == t ||
						903 == t ||
						1600 == t ||
						3654 == t ||
						3782 == t ||
						12293 == t ||
						(t >= 12337 && t <= 12341) ||
						(t >= 12445 && t <= 12446) ||
						(t >= 12540 && t <= 12542)
					);
				}),
				(Z.coalesceText = function (t) {
					for (var e = t.firstChild; null != e; e = e.nextSibling)
						if (3 == e.nodeType || 4 == e.nodeType) {
							var n = e.nodeValue,
								r = e;
							for (
								e = e.nextSibling;
								null != e &&
								(3 == e.nodeType || 4 == e.nodeType);

							) {
								n += e.nodeValue;
								var o = e;
								(e = e.nextSibling),
									o.parentNode.removeChild(o);
							}
							if (4 == r.nodeType) {
								var i = r.parentNode;
								if (null == r.nextSibling)
									i.removeChild(r),
										i.appendChild(
											i.ownerDocument.createTextNode(n)
										);
								else {
									var s = r.nextSibling;
									i.removeChild(r),
										i.insertBefore(
											i.ownerDocument.createTextNode(n),
											s
										);
								}
							} else r.nodeValue = n;
							if (null == e) break;
						} else 1 == e.nodeType && Z.coalesceText(e);
				}),
				(Z.instance_of = function (t, e) {
					for (; null != t; ) {
						if (t.constructor === e) return !0;
						if (t === Object) return !1;
						t = t.constructor.superclass;
					}
					return !1;
				}),
				(Z.getElementById = function (t, e) {
					if (
						1 == t.nodeType &&
						(t.getAttribute('id') == e ||
							t.getAttributeNS(null, 'id') == e)
					)
						return t;
					for (var n = t.firstChild; null != n; n = n.nextSibling) {
						var r = Z.getElementById(n, e);
						if (null != r) return r;
					}
					return null;
				});
			var q = (function () {
				function t(e, n, r) {
					var o = Error.call(
						this,
						(function (e, n) {
							var r = n ? ': ' + n.toString() : '';
							switch (e) {
								case t.INVALID_EXPRESSION_ERR:
									return 'Invalid expression' + r;
								case t.TYPE_ERR:
									return 'Type error' + r;
							}
							return null;
						})(e, n) || r
					);
					return (o.code = e), (o.exception = n), o;
				}
				return (
					(t.prototype = Object.create(Error.prototype)),
					(t.prototype.constructor = t),
					(t.superclass = Error),
					(t.prototype.toString = function () {
						return this.message;
					}),
					(t.fromMessage = function (e, n) {
						return new t(null, n, e);
					}),
					(t.INVALID_EXPRESSION_ERR = 51),
					(t.TYPE_ERR = 52),
					t
				);
			})();

			function J(t, e, n) {
				(this.xpath = n.parse(t)),
					(this.context = new j()),
					(this.context.namespaceResolver = new tt(e));
			}

			function tt(t) {
				this.xpathNSResolver = t;
			}

			function et(t) {
				(this.node = t), (this.namespaceResolver = new Q());
			}

			function nt(t, e) {
				switch (
					(e == nt.ANY_TYPE &&
						(t.constructor === W
							? (e = nt.STRING_TYPE)
							: t.constructor === G
							? (e = nt.NUMBER_TYPE)
							: t.constructor === B
							? (e = nt.BOOLEAN_TYPE)
							: t.constructor === z &&
							  (e = nt.UNORDERED_NODE_ITERATOR_TYPE)),
					(this.resultType = e),
					e)
				) {
					case nt.NUMBER_TYPE:
						return void (this.numberValue = t.numberValue());
					case nt.STRING_TYPE:
						return void (this.stringValue = t.stringValue());
					case nt.BOOLEAN_TYPE:
						return void (this.booleanValue = t.booleanValue());
					case nt.ANY_UNORDERED_NODE_TYPE:
					case nt.FIRST_ORDERED_NODE_TYPE:
						if (t.constructor === z)
							return void (this.singleNodeValue = t.first());
						break;
					case nt.UNORDERED_NODE_ITERATOR_TYPE:
					case nt.ORDERED_NODE_ITERATOR_TYPE:
						if (t.constructor === z)
							return (
								(this.invalidIteratorState = !1),
								(this.nodes = t.toArray()),
								void (this.iteratorIndex = 0)
							);
						break;
					case nt.UNORDERED_NODE_SNAPSHOT_TYPE:
					case nt.ORDERED_NODE_SNAPSHOT_TYPE:
						if (t.constructor === z)
							return (
								(this.nodes = t.toArray()),
								void (this.snapshotLength = this.nodes.length)
							);
				}
				throw new q(q.TYPE_ERR);
			}

			function rt(t, e) {
				(t.createExpression = function (t, n) {
					try {
						return new J(t, n, e);
					} catch (t) {
						throw new q(q.INVALID_EXPRESSION_ERR, t);
					}
				}),
					(t.createNSResolver = function (t) {
						return new et(t);
					}),
					(t.evaluate = function (n, r, o, i, s) {
						if (i < 0 || i > 9)
							throw {
								code: 0,
								toString: function () {
									return 'Request type not supported';
								},
							};
						return t.createExpression(n, o, e).evaluate(r, i, s);
					});
			}
			(J.prototype = {}),
				(J.prototype.constructor = J),
				(J.superclass = Object.prototype),
				(J.getOwnerDocument = function (t) {
					return 9 === t.nodeType ? t : t.ownerDocument;
				}),
				(J.detectHtmlDom = function (t) {
					if (!t) return !1;
					var e = J.getOwnerDocument(t);
					try {
						return e.implementation.hasFeature('HTML', '2.0');
					} catch (t) {
						return !0;
					}
				}),
				(J.prototype.evaluate = function (t, e, n) {
					return (
						(this.context.expressionContextNode = t),
						(this.context.caseInsensitive = J.detectHtmlDom(t)),
						new nt(this.xpath.evaluate(this.context), e)
					);
				}),
				(tt.prototype = {}),
				(tt.prototype.constructor = tt),
				(tt.superclass = Object.prototype),
				(tt.prototype.getNamespace = function (t, e) {
					return null == this.xpathNSResolver
						? null
						: this.xpathNSResolver.lookupNamespaceURI(t);
				}),
				(et.prototype = {}),
				(et.prototype.constructor = et),
				(et.superclass = Object.prototype),
				(et.prototype.lookupNamespaceURI = function (t) {
					return this.namespaceResolver.getNamespace(t, this.node);
				}),
				(nt.prototype = {}),
				(nt.prototype.constructor = nt),
				(nt.superclass = Object.prototype),
				(nt.prototype.iterateNext = function () {
					if (
						this.resultType != nt.UNORDERED_NODE_ITERATOR_TYPE &&
						this.resultType != nt.ORDERED_NODE_ITERATOR_TYPE
					)
						throw new q(q.TYPE_ERR);
					return this.nodes[this.iteratorIndex++];
				}),
				(nt.prototype.snapshotItem = function (t) {
					if (
						this.resultType != nt.UNORDERED_NODE_SNAPSHOT_TYPE &&
						this.resultType != nt.ORDERED_NODE_SNAPSHOT_TYPE
					)
						throw new q(q.TYPE_ERR);
					return this.nodes[t];
				}),
				(nt.ANY_TYPE = 0),
				(nt.NUMBER_TYPE = 1),
				(nt.STRING_TYPE = 2),
				(nt.BOOLEAN_TYPE = 3),
				(nt.UNORDERED_NODE_ITERATOR_TYPE = 4),
				(nt.ORDERED_NODE_ITERATOR_TYPE = 5),
				(nt.UNORDERED_NODE_SNAPSHOT_TYPE = 6),
				(nt.ORDERED_NODE_SNAPSHOT_TYPE = 7),
				(nt.ANY_UNORDERED_NODE_TYPE = 8),
				(nt.FIRST_ORDERED_NODE_TYPE = 9);
			try {
				var ot = !0;
				try {
					document.implementation &&
						document.implementation.hasFeature &&
						document.implementation.hasFeature('XPath', null) &&
						(ot = !1);
				} catch (t) {}
				ot && rt(document, new u());
			} catch (t) {}
			rt(t, new u()),
				(function () {
					var e = new u(),
						n = new Q(),
						r = new K(),
						o = new X();

					function i(t) {
						return {
							getNamespace: function (e, r) {
								return t(e, r) || n.getNamespace(e, r);
							},
						};
					}

					function s(t) {
						return t && 'function' == typeof t.getNamespace
							? i((e = t).getNamespace.bind(e))
							: 'function' == typeof t
							? i(t)
							: 'object' == typeof t
							? (function (t) {
									return i(function (e) {
										return t[e];
									});
							  })(t)
							: n;
						var e;
					}

					function a(t) {
						if (
							null == t ||
							t instanceof W ||
							t instanceof B ||
							t instanceof G ||
							t instanceof z
						)
							return t;
						switch (typeof t) {
							case 'string':
								return new W(t);
							case 'boolean':
								return new B(t);
							case 'number':
								return new G(t);
						}
						var e = new z();
						return e.addArray([].concat(t)), e;
					}

					function c(t) {
						return {
							getFunction: function (e, n) {
								var o = t(e, n);
								return o
									? (function (t) {
											return function (e) {
												var n = Array.prototype.slice
														.call(arguments, 1)
														.map(function (t) {
															return t.evaluate(
																e
															);
														}),
													r = t.apply(
														this,
														[].concat(e, n)
													);
												return a(r);
											};
									  })(o)
									: r.getFunction(e, n);
							},
						};
					}

					function l(t) {
						return t && 'function' == typeof t.getFunction
							? c((e = t).getFunction.bind(e))
							: 'function' == typeof t
							? c(t)
							: 'object' == typeof t
							? (function (t) {
									return c(function (e) {
										return t[e];
									});
							  })(t)
							: r;
						var e;
					}

					function h(t) {
						return {
							getVariable: function (e, n) {
								return a(t(e, n));
							},
						};
					}

					function d(t, e, n) {
						t in n && (e[t] = n[t]);
					}

					function p(t) {
						var e = new j();
						return (
							t
								? ((e.namespaceResolver = s(t.namespaces)),
								  (e.functionResolver = l(t.functions)),
								  (e.variableResolver = (function (t) {
										if (t) {
											if (
												'function' ==
												typeof t.getVariable
											)
												return h(t.getVariable.bind(t));
											if ('function' == typeof t)
												return h(t);
											if ('object' == typeof t)
												return h(function (e) {
													return t[e];
												});
										}
										return o;
								  })(t.variables)),
								  (e.expressionContextNode = t.node),
								  d('allowAnyNamespaceForNoPrefix', e, t),
								  d('isHtml', e, t))
								: (e.namespaceResolver = n),
							e
						);
					}
					var f = {
						evaluate: function (t) {
							return (function (t, e) {
								var n = p(e);
								return t.evaluate(n);
							})(this.expression, t);
						},
						evaluateNumber: function (t) {
							return this.evaluate(t).numberValue();
						},
						evaluateString: function (t) {
							return this.evaluate(t).stringValue();
						},
						evaluateBoolean: function (t) {
							return this.evaluate(t).booleanValue();
						},
						evaluateNodeSet: function (t) {
							return this.evaluate(t).nodeset();
						},
						select: function (t) {
							return this.evaluateNodeSet(t).toArray();
						},
						select1: function (t) {
							return this.select(t)[0];
						},
					};
					t.parse = function (t) {
						var n = e.parse(t);
						return Object.create(f, {
							expression: {
								value: n,
							},
						});
					};
				})(),
				c(t, {
					XPath: l,
					XPathParser: u,
					XPathResult: nt,
					Step: P,
					PathExpr: C,
					NodeTest: k,
					LocationPath: I,
					OrOperation: E,
					AndOperation: m,
					BarOperation: O,
					EqualsOperation: v,
					NotEqualOperation: _,
					LessThanOperation: N,
					GreaterThanOperation: b,
					LessThanOrEqualOperation: y,
					GreaterThanOrEqualOperation: w,
					PlusOperation: A,
					MinusOperation: T,
					MultiplyOperation: S,
					DivOperation: R,
					ModOperation: x,
					UnaryMinusOperation: f,
					FunctionCall: U,
					VariableReference: V,
					XPathContext: j,
					XNodeSet: z,
					XBoolean: B,
					XString: W,
					XNumber: G,
					NamespaceResolver: Q,
					FunctionResolver: K,
					VariableResolver: X,
					Utilities: Z,
				}),
				(t.select = function (e, n, r) {
					return t.selectWithResolver(e, n, null, r);
				}),
				(t.useNamespaces = function (e) {
					var n = {
						mappings: e || {},
						lookupNamespaceURI: function (t) {
							return this.mappings[t];
						},
					};
					return function (e, r, o) {
						return t.selectWithResolver(e, r, n, o);
					};
				}),
				(t.selectWithResolver = function (t, e, n, r) {
					var o = new J(t, n, new u()),
						i = nt.ANY_TYPE,
						s = o.evaluate(e, i, null);
					return (
						s.resultType == nt.STRING_TYPE
							? (s = s.stringValue)
							: s.resultType == nt.NUMBER_TYPE
							? (s = s.numberValue)
							: s.resultType == nt.BOOLEAN_TYPE
							? (s = s.booleanValue)
							: ((s = s.nodes), r && (s = s[0])),
						s
					);
				}),
				(t.select1 = function (e, n) {
					return t.select(e, n, !0);
				});
		})(e);
	},
	function (t, e, n) {
		var r = n(186),
			o = n(4),
			i = n(21),
			s = n(99),
			a = '[\\x20\\t\\r\\n\\f]',
			c = '(?:\\\\[\\da-fA-F]{1,6}'.concat(
				a,
				'?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+'
			),
			u = '\\['
				.concat(a, '*(')
				.concat(c, ')(?:')
				.concat(a, '*([*^$|!~]?=)')
				.concat(
					a,
					'*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|('
				)
				.concat(c, '))|)')
				.concat(a, '*\\]'),
			l = '::?('
				.concat(
					c,
					')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|'
				)
				.concat(u, ')*)|.*)\\)|)'),
			h = new RegExp('^'.concat(a, '*,').concat(a, '*')),
			d = new RegExp(
				'^'.concat(a, '*([>+~]|').concat(a, ')').concat(a, '*')
			),
			p = {
				id: {
					reg: new RegExp('^#('.concat(c, ')')),
					value: function (t) {
						return t.slice(1);
					},
					toStr: function (t) {
						return '#'.concat(t);
					},
				},
				class: {
					reg: new RegExp('^\\.('.concat(c, ')')),
					value: function (t) {
						return t.slice(1);
					},
					toStr: function (t) {
						return '.'.concat(t);
					},
				},
				tag: {
					reg: new RegExp('^('.concat(c, '|[*])')),
					value: i,
				},
				attribute: {
					reg: new RegExp('^'.concat(u)),
					value: function (t) {
						return t.slice(1, t.length - 1);
					},
					toStr: function (t) {
						return '['.concat(t, ']');
					},
				},
				pseudo: {
					reg: new RegExp('^'.concat(l)),
					value: i,
				},
			};
		o(p, function (t) {
			t.value || (t.value = i), t.toStr || (t.toStr = i);
		}),
			(e = {
				parse: function (t) {
					t = r(t);
					for (
						var e, n, i, s = [];
						t &&
						((i && !(n = h.exec(t))) ||
							(n && (t = t.slice(n[0].length)),
							(e = []),
							s.push(e)),
						(i = !1),
						(n = d.exec(t)) &&
							((i = n.shift()),
							(t = t.slice(i.length)),
							(i = r(i)) || (i = ' '),
							e.push({
								value: i,
								type: 'combinator',
							})),
						o(p, function (o, s) {
							var a = o.reg,
								c = o.value;
							(n = a.exec(t)) &&
								((i = n.shift()),
								(t = t.slice(i.length)),
								(i = r(i)),
								e.push({
									value: c(i),
									type: s,
								}));
						}),
						i);

					);
					return s;
				},
				stringify: function (t) {
					return s(t, function (t) {
						return (t = s(t, function (t) {
							var e = t.type,
								n = t.value;
							return 'combinator' === e
								? ' ' === n
									? n
									: ' '.concat(n, ' ')
								: p[e].toStr(n);
						})).join('');
					}).join(', ');
				},
			}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(187),
			o = n(188),
			i = /^\s+|\s+$/g;
		(e = function (t, e) {
			return null == e ? t.replace(i, '') : r(o(t, e), e);
		}),
			(t.exports = e);
	},
	function (t, e) {
		var n = /^\s+/;
		(e = function (t, e) {
			if (null == e) return t.replace(n, '');
			for (
				var r, o, i = 0, s = t.length, a = e.length, c = !0;
				c && i < s;

			)
				for (c = !1, r = -1, o = t.charAt(i); ++r < a; )
					if (o === e[r]) {
						(c = !0), i++;
						break;
					}
			return i >= s ? '' : t.substr(i, s);
		}),
			(t.exports = e);
	},
	function (t, e) {
		var n = /\s+$/;
		(e = function (t, e) {
			if (null == e) return t.replace(n, '');
			for (
				var r, o, i = t.length - 1, s = e.length, a = !0;
				a && i >= 0;

			)
				for (a = !1, r = -1, o = t.charAt(i); ++r < s; )
					if (o === e[r]) {
						(a = !0), i--;
						break;
					}
			return i >= 0 ? t.substring(0, i + 1) : '';
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(12),
			o = n(9),
			i = n(35),
			s = n(190),
			a = n(1);
		(e = function (t) {
			return (
				null == t ||
				(r(t) && (o(t) || i(t) || s(t))
					? 0 === t.length
					: 0 === a(t).length)
			);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		var r = n(0);
		(e = function (t) {
			return '[object Arguments]' === r(t);
		}),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.patchAuto = void 0);
		const r = n(57),
			o = n(101),
			i = n(100),
			s = n(97),
			a = n(192);
		let c = window.WeixinJSBridge,
			u = !1,
			l = [];

		function h() {
			u = !0;
			for (let t = 0, e = l.length; t < e; t++) l[t]();
			l = [];
		}
		const d = {
			'App.replayCommand': async t => await o.replayer.replayCommand(t),
			'App.getParentTagNode': async t => {
				const { tagName: e, target: n } = t,
					{ node: o } = r.getElement(n);
				if (o) {
					const t = 'page' === e ? 'body' : 'wx-' + e,
						n = i.getParentTagNode(o, t);
					console.log('[amin] you find node', o, n);
					const { targetCandidates: r, selector: a } =
						s.domFinder.getTargetSelector(n);
					return {
						targetCandidates: r,
						target: a,
					};
				}
				return {
					error: {
						message: `[pageframe] App.getParentTagNode error: cannot find ${e} node`,
					},
				};
			},
		};
		e.patchAuto = function () {
			var t;
			u ||
				((null == c ? void 0 : c.on)
					? h()
					: a(
							() => {
								var t;
								return null ===
									(t =
										null === window || void 0 === window
											? void 0
											: window.WeixinJSBridge) ||
									void 0 === t
									? void 0
									: t.on;
							},
							5e3,
							50
					  ).then(() => {
							(c = window.WeixinJSBridge), h();
					  })),
				(t = () => {
					c.subscribe('sendAutoMessage', async t => {
						const { method: e, params: n, id: r } = t,
							o = {
								id: r,
							};
						if (d[e]) {
							try {
								(o.result = await (async function (t, e) {
									if (d[t]) return (await d[t](e)) || {};
									console.warn(
										`extension webview ${t} unimplemented`
									);
								})(e, n)),
									(o.layer = 'pageframe');
							} catch (t) {
								t instanceof Error
									? (o.error = {
											message:
												'[pageframe auto] ' + t.message,
									  })
									: (o.error = {
											message:
												'[pageframe auto] unknow error',
									  });
							}
							c.invoke('sendAutoMessage', o);
						} else
							console.warn(
								`extension webview ${e} unimplemented~`
							);
					});
				}),
				u ? t() : l.push(t);
		};
	},
	function (t, e, n) {
		var r = n(193);
		(e = function (t) {
			var e =
					arguments.length > 1 && void 0 !== arguments[1]
						? arguments[1]
						: 0,
				n =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: 250;

			function o() {
				return new Promise(function (e, n) {
					try {
						e(t());
					} catch (t) {
						n(t);
					}
				});
			}
			return new Promise(function (t, i) {
				var s = r(),
					a = function () {
						o().then(function (o) {
							var c = r() - s;
							o
								? t(o)
								: e && c >= e
								? i(
										Error(
											'Wait timed out after '.concat(
												c,
												' ms'
											)
										)
								  )
								: setTimeout(a, n);
						}, i);
					};
				a();
			});
		}),
			(t.exports = e);
	},
	function (t, e) {
		(e = Date.now
			? Date.now
			: function () {
					return new Date().getTime();
			  }),
			(t.exports = e);
	},
	function (t, e, n) {
		'use strict';
		Object.defineProperty(e, '__esModule', {
			value: !0,
		}),
			(e.HighLight = void 0);
		const r = {
			contentColor: {
				r: 111,
				g: 168,
				b: 220,
				a: 0.66,
			},
			paddingColor: {
				r: 147,
				g: 196,
				b: 125,
				a: 0.55,
			},
			marginColor: {
				r: 246,
				g: 178,
				b: 107,
				a: 0.66,
			},
		};
		e.HighLight = class {
			constructor() {
				(this._inited = !1),
					(this._dom = null),
					(this._borderDom = null),
					(this._sizeDom = null),
					(this._target = null);
			}
			init() {
				(this._dom = document.createElement('div')),
					(this._borderDom = document.createElement('div')),
					(this._sizeDom = document.createElement('div')),
					this._dom.appendChild(this._borderDom),
					this._borderDom.appendChild(this._sizeDom),
					(this._dom.style.position = 'fixed'),
					(this._dom.style.pointerEvents = 'none'),
					(this._dom.style.zIndex = String(999999)),
					(this._inited = !0),
					this._dom.setAttribute('wx:highlight', 'true'),
					this._borderDom.setAttribute('wx:highlight', 'true'),
					this._sizeDom.setAttribute('wx:highlight', 'true');
			}
			pruneNum(t) {
				return t.toFixed(2).replace(/\.?(0{1,})$/i, '');
			}
			setDomStyle(t, e) {
				t &&
					((t.style.backgroundColor = e.backgroundColor),
					(t.style.borderColor = e.borderColor),
					(t.style.borderWidth = e.borderWidth),
					(t.style.borderStyle = 'solid'),
					['left', 'top', 'width', 'height'].forEach(n => {
						t.style[n] = e[n] + 'px';
					}));
			}
			formatConfigColorRgba(t, e) {
				const { r: n, g: r, b: o, a: i } = t[e];
				return `rgba(${n},${r},${o},${i})`;
			}
			show(t, e) {
				if (!t || t === this._target) return;
				this._inited || this.init();
				const n = e || r;
				console.log('config', n);
				const o = t.getBoundingClientRect(),
					i = window.getComputedStyle(t),
					s = {};
				[
					'width',
					'height',
					'marginLeft',
					'marginRight',
					'marginTop',
					'marginBottom',
					'paddingLeft',
					'paddingRight',
					'paddingTop',
					'paddingBottom',
					'borderLeftWidth',
					'borderRightWidth',
					'borderTopWidth',
					'borderBottomWidth',
				].forEach(t => {
					s[t] = parseFloat(i[t].replace('px', ''));
				});
				const { top: a, left: c, width: u, height: l } = o;
				this.setDomStyle(this._dom, {
					backgroundColor: 'transparent',
					borderColor: this.formatConfigColorRgba(n, 'marginColor'),
					borderWidth:
						[
							s.marginTop,
							s.marginRight,
							s.marginBottom,
							s.marginLeft,
						].join('px ') + 'px',
					top: a - s.marginTop,
					left: c - s.marginLeft,
					width: u,
					height: l,
				}),
					this.setDomStyle(this._sizeDom, {
						backgroundColor: this.formatConfigColorRgba(
							n,
							'contentColor'
						),
						borderColor: this.formatConfigColorRgba(
							n,
							'paddingColor'
						),
						borderWidth:
							[
								s.paddingTop,
								s.paddingRight,
								s.paddingBottom,
								s.paddingLeft,
							].join('px ') + 'px',
						top: a + s.paddingTop,
						left: c + s.paddingLeft,
						width:
							u -
							s.borderLeftWidth -
							s.borderRightWidth -
							s.paddingLeft -
							s.paddingRight,
						height:
							l -
							s.borderTopWidth -
							s.borderBottomWidth -
							s.paddingTop -
							s.paddingBottom,
					}),
					(this._target = t),
					document.body.appendChild(this._dom);
			}
			hide() {
				var t;
				(null === (t = this._dom) || void 0 === t
					? void 0
					: t.parentElement) &&
					this._dom.parentElement.removeChild(this._dom),
					(this._target = null);
			}
			dom() {
				return this._dom;
			}
			contain(t) {
				return (
					t === this._dom ||
					t === this._sizeDom ||
					t === this._borderDom
				);
			}
		};
	},
]);
