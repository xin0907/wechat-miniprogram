var BASE_DEVICE_WIDTH = 750;
var isIOS = navigator.userAgent.match('iPhone');
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth =
	window.__checkDeviceWidth__ ||
	function () {
		var newDeviceWidth = window.screen.width || 375;
		var newDeviceDPR = window.devicePixelRatio || 2;
		var newDeviceHeight = window.screen.height || 375;
		if (
			window.screen.orientation &&
			/^landscape/.test(window.screen.orientation.type || '')
		)
			newDeviceWidth = newDeviceHeight;
		if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
			deviceWidth = newDeviceWidth;
			deviceDPR = newDeviceDPR;
		}
	};
checkDeviceWidth();
// 0.0001
var eps = 1e-4;
var transformRPX =
	window.__transformRpx__ ||
	function (number, newDeviceWidth) {
		if (number === 0) return 0;
		number = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth);
		number = Math.floor(number + eps);
		if (number === 0) {
			if (deviceDPR === 1 || !isIOS) {
				return 1;
			} else {
				return 0.5;
			}
		}
		return number;
	};
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
var __COMMON_STYLESHEETS__ = __COMMON_STYLESHEETS__ || {} % s;
var setCssToHead = function (file, _xcInvalid, info) {
	var Ca = {};
	var css_id;
	var info = info || {};
	var _C = __COMMON_STYLESHEETS__;
	function makeup(file, opt) {
		var _n = typeof file === 'string';
		if (_n && Ca.hasOwnProperty(file)) return '';
		if (_n) Ca[file] = 1;
		var ex = _n ? _C[file] : file;
		var res = '';
		for (var i = ex.length - 1; i >= 0; i--) {
			var content = ex[i];
			if (typeof content === 'object') {
				var op = content[0];
				if (op == 0)
					res =
						transformRPX(content[1], opt.deviceWidth) + 'px' + res;
				else if (op == 1) res = opt.suffix + res;
				else if (op == 2) res = makeup(content[1], opt) + res;
			} else res = content + res;
		}
		return res;
	}
	var styleSheetManager = window.__styleSheetManager2__;
	var rewritor = function (suffix, opt, style) {
		opt = opt || {};
		suffix = suffix || '';
		opt.suffix = suffix;
		if (opt.allowIllegalSelector != undefined && _xcInvalid != undefined) {
			if (opt.allowIllegalSelector)
				console.warn('For developer:' + _xcInvalid);
			else {
				console.error(_xcInvalid);
			}
		}
		Ca = {};
		css = makeup(file, opt);
		if (styleSheetManager) {
			var key = (info.path || Math.random()) + ':' + suffix;
			if (!style) {
				styleSheetManager.addItem(key, info.path);
				window.__rpxRecalculatingFuncs__.push(function (size) {
					opt.deviceWidth = size.width;
					rewritor(suffix, opt, true);
				});
			}
			styleSheetManager.setCss(key, css);
			return;
		}
		if (!style) {
			var head =
				document.head || document.getElementsByTagName('head')[0];
			style = document.createElement('style');
			style.type = 'text/css';
			style.setAttribute('wxss:path', info.path);
			head.appendChild(style);
			window.__rpxRecalculatingFuncs__.push(function (size) {
				opt.deviceWidth = size.width;
				rewritor(suffix, opt, style);
			});
		}
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			if (style.childNodes.length == 0)
				style.appendChild(document.createTextNode(css));
			else style.childNodes[0].nodeValue = css;
		}
	};
	return rewritor;
};
setCssToHead([
	'.',
	[1],
	'userinfo { display: flex; flex-direction: column; align-items: center; color: #aaa; }\n.',
	[1],
	'userinfo-avatar { overflow: hidden; width: ',
	[0, 128],
	'; height: ',
	[0, 128],
	'; margin: ',
	[0, 20],
	'; border-radius: 50%; }\n.',
	[1],
	'usermotto { margin-top: 200px; }\n',
])(typeof __wxAppSuffixCode__ == 'undefined' ? undefined : __wxAppSuffixCode__);

/*
这个函数是用于将 CSS 样式表应用到页面上的工具函数。它返回一个重写 CSS 样式的函数 rewritor，接受三个参数：file（要重写的 CSS 文件或样式数组）、_xcInvalid（用于报告错误的异常对象）、info（包含文件路径等信息的对象）。 rewritor 函数会将原始样式表根据提供的参数进行转换和优化，并将其应用到给定的 style 元素中。
具体来说，rewritor 函数会在调用时处理样式表，如果提供了 styleSheetManager，它会使用这个管理器来管理样式表；否则，它会创建一个新的 style 元素并将样式表应用到其中。此外，这个函数还支持动态调整样式表大小并自动重新计算其内部元素的样式。
makeup 函数在其中扮演了非常重要的角色，它会递归处理样式表中的每一个属性，并将其转换为正确的格式。例如，对于包含表示 rpx 单位的数字的某些属性，它会通过调用 transformRPX 函数将其转换为相应的像素值。最终，makeup 函数会将所有属性拼接在一起并返回。
总之，这个函数的作用在于提供了一种方便地运用 CSS 样式表到页面上的方法，并自动处理样式表中可能出现的特殊符号等问题，提供了优化和自适应的功能。
*/


