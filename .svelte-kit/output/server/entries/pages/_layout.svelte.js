import { c as create_ssr_component } from "../../chunks/ssr.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@300;400&display=swap');*{margin:0;box-sizing:border-box}:root{--primary:hsl(40 100% 50% / 1);--secondary:hsl(40 83% 95% / 1);--accent:hsl(40 93% 57% / 1);--background:#fdfdfd;--textColor:#020500;--text-primary:'Handjet', cursive;--text-secondary:'Arial'}body{background-color:var(--background);font-family:var(--text-primary);color:var(--textColor)}a{color:var(--textColor)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
