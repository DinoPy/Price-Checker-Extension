

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/PopUp/_page.svelte.js')).default;
export const imports = ["app/immutable/nodes/5.6776b6ec.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js","app/immutable/chunks/products.f1639b1b.js","app/immutable/chunks/index.6c6d8c28.js"];
export const stylesheets = ["app/immutable/assets/_page.79cfb33e.css"];
export const fonts = [];
