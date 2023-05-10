'use strict'
;(() => {
	require('../js/unpack/hackrequire/index.js')
	const e = require('../core.wxvpkg/0322709e47d35f2deac5acd1748dddf4.js'),
		r =
			require('../core.wxvpkg/9e358ebfb64a7d64d6b1c44b6e560381.js').default,
		n =
			require('../core.wxvpkg/fb234dd516321fadc9732d99111bc45e.js').default,
		i = require('../core.wxvpkg/30b1550fa2e235a30c3f8b4bec7c59a3.js')
	const s = async () => {
		!(function () {
			const e = require('../core.wxvpkg/28241807b29451e8d39d305e9396a62a.js')
			e.initGlobal(global, nw.Window.get()),
				e.preventDefault(document),
				e.initCli(global),
				global.windowMap.set('LOGIN', global.Win),
				(global.isDevWindow = !1)
		})()
		const s = n.asyncBegin(
			'startup,report',
			'meaningfulRender',
			null,
			{},
			{ ts: window.tracingOrigin }
		)
		n.begin('startup,report', 'init'),
			require('../core.wxvpkg/b7691e109ad844af265d9385e5205802.js'),
			i.setConfig({ version: global.appVersion, pageUrl: 'entrance' }),
			e.addRecoveryMenu(global.Win, nw),
			requestIdleCallback(async () => {
				var e
				if (
					null === (e = global.appConfig) || void 0 === e
						? void 0
						: e.isDev
				) {
					const e = require('../core.wxvpkg/4433c817fe13c68d0498e4263ed273df.js')
					window.__testHandlerRemainTask = () => {
						e.handlerRemainTask()
					}
				} else {
					require('../core.wxvpkg/4433c817fe13c68d0498e4263ed273df.js').handlerRemainTask()
				}
			})
		require('../core.wxvpkg/36a64af66922f8ba03faddeab7c82048.js').default.start()
		const a = require('../core.wxvpkg/3a67b0cd649abaa7a873f3edfc2be587.js')
		r.ready('firstRender', () => {
			n.asyncEnd(s), r.signal(['meaningfulRender', 'fullRender'])
		}),
			a.launch(),
			n.end()
	}
	if ('complete' === window.document.readyState) s()
	else {
		const e = n.asyncBegin('startup,report', 'waitForLoadEvent')
		window.addEventListener('load', () => {
			n.asyncEnd(e), s()
		})
	}
})()
