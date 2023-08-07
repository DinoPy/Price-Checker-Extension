import { c as create_ssr_component, a as subscribe, d as each, v as validate_component } from "../../../chunks/ssr.js";
import { l as links, e as error } from "../../../chunks/products.js";
import { P as Page$1 } from "../../../chunks/_page.js";
import Page$2 from "../PopUp/_page.svelte.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-rgpza3{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:1em}@media(max-width: 2100px){.container.svelte-rgpza3{grid-template-columns:1fr 1fr 1fr;font-size:1.2em}}@media(max-width: 1400px){.container.svelte-rgpza3{grid-template-columns:1fr 1fr}}@media(max-width: 700px){.container.svelte-rgpza3{grid-template-columns:1fr;font-size:1em}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $links, $$unsubscribe_links;
  let $error, $$unsubscribe_error;
  $$unsubscribe_links = subscribe(links, (value) => $links = value);
  $$unsubscribe_error = subscribe(error, (value) => $error = value);
  $$result.css.add(css);
  $$unsubscribe_links();
  $$unsubscribe_error();
  return `<div class="container svelte-rgpza3">${each($links, (link, i) => {
    return `<div>${validate_component(Page$1, "Product").$$render($$result, { prod: link }, {}, {})} </div>`;
  })} ${$error.isError ? `${validate_component(Page$2, "PopUp").$$render(
    $$result,
    {
      message: $error.message,
      timeout: $error.duration
    },
    {},
    {}
  )}` : ``}  </div>`;
});
export {
  Page as default
};
