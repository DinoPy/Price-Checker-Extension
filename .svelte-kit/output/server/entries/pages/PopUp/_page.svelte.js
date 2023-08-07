import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
import { e as error } from "../../../chunks/products.js";
/* empty css                                                   */const css = {
  code: ".popup-container.svelte-d0vve6{width:fit-content;min-height:80px;background-color:var(--accent);border-radius:1em;padding:0.5em 1em;position:absolute;top:3em;right:10px;animation:svelte-d0vve6-pop-up ease-in 200ms;font-size:.8em;font-family:Arial}@keyframes svelte-d0vve6-pop-up{0%{right:-250px}100%{right:10px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message } = $$props;
  let { timeout = 5e3 } = $$props;
  let isActive = true;
  setTimeout(
    () => {
      isActive = false;
      error.update((e) => ({ ...e, isError: false }));
    },
    timeout
  );
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.timeout === void 0 && $$bindings.timeout && timeout !== void 0)
    $$bindings.timeout(timeout);
  $$result.css.add(css);
  return `${isActive ? `<pre class="popup-container svelte-d0vve6">${escape(JSON.stringify(message, null, 2))}</pre>` : ``}`;
});
export {
  Page as default
};
