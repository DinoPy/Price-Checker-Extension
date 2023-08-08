export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "app",
	appPath: "app",
	assets: new Set([".DS_Store","favicon.png","images/.DS_Store","images/delete.svg","images/genius.svg","images/icons/altex.ico","images/icons/emag.ico","images/icons/epic.ico","images/icons/evomag.ico","images/icons/pcgarage.ico","images/icons/steam.ico","images/refresh.svg","manifest.json"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".ico":"image/vnd.microsoft.icon",".json":"application/json"},
	_: {
		client: {"start":"app/immutable/entry/start.dd14a9ed.js","app":"app/immutable/entry/app.f8d8539c.js","imports":["app/immutable/entry/start.dd14a9ed.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/singletons.19bdee94.js","app/immutable/chunks/index.6c6d8c28.js","app/immutable/entry/app.f8d8539c.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/Add_Container",
				pattern: /^\/Add_Container\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/Header",
				pattern: /^\/Header\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/PopUp",
				pattern: /^\/PopUp\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/Products_Container",
				pattern: /^\/Products_Container\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/Products_Container/Product",
				pattern: /^\/Products_Container\/Product\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
