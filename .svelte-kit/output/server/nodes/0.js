import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["app/immutable/nodes/0.5be92dcc.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js"];
export const stylesheets = ["app/immutable/assets/0.f5290e06.css"];
export const fonts = [];
