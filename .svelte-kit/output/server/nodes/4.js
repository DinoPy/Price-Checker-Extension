

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/Header/_page.svelte.js')).default;
export const imports = ["app/immutable/nodes/4.5e4f4a13.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js"];
export const stylesheets = ["app/immutable/assets/4.7e2dd1de.css"];
export const fonts = [];
