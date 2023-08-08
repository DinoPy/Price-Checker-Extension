

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["app/immutable/nodes/1.46c59c30.js","app/immutable/chunks/scheduler.e2281038.js","app/immutable/chunks/index.e5e2aa14.js","app/immutable/chunks/singletons.19bdee94.js","app/immutable/chunks/index.6c6d8c28.js"];
export const stylesheets = [];
export const fonts = [];
