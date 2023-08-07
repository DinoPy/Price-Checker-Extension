import { c as create_ssr_component, a as subscribe, b as add_attribute } from "../../../chunks/ssr.js";
import { l as links } from "../../../chunks/products.js";
/* empty css                                                   */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".add_container.svelte-mrld77{display:flex;align-items:center;justify-self:center;margin-bottom:1em}.input_container.svelte-mrld77{align-self:stretch;flex-grow:1;flex-shrink:1;margin-right:0.3em}.url_add_input.svelte-mrld77{width:100%;height:100%;padding:0.5em 1em;color:#252525;border:2px solid var(--accent);border-radius:0.5em}.url_add_button.svelte-mrld77{padding:0.2em 1.5em;background-color:var(--accent);border:none;border-radius:0.2rem;font-weight:700;font-size:1.6rem;cursor:pointer}.url_add_button.svelte-mrld77:active{transform:scale(0.95)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_links;
  $$unsubscribe_links = subscribe(links, (value) => value);
  let URL = "";
  let addInput;
  $$result.css.add(css);
  $$unsubscribe_links();
  return `<form class="add_container svelte-mrld77"><div class="input_container svelte-mrld77"><input placeholder="URL here" class="url_add_input svelte-mrld77"${add_attribute("value", URL, 0)}${add_attribute("this", addInput, 0)}></div> <button class="url_add_button svelte-mrld77" data-svelte-h="svelte-dit7f6">Add</button> </form>`;
});
export {
  Page as default
};
