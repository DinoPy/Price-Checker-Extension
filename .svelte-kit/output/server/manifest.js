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
		client: {"start":"app/immutable/entry/start.cb819ceb.js","app":"app/immutable/entry/app.bb0d473b.js","imports":["app/immutable/entry/start.cb819ceb.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/singletons.05cb4f71.js","app/immutable/chunks/index.6c6d8c28.js","app/immutable/entry/app.bb0d473b.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
