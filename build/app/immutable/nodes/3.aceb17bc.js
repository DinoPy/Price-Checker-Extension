import{s as S,n as R,r as w,c as I,e as O}from"../chunks/scheduler.e2281038.js";import{S as T,i as k,e as h,s as D,c as g,a as C,d as v,f as P,y as N,o as p,g as j,h as y,z as L,A as b,B as A}from"../chunks/index.e5e2aa14.js";import{l as V}from"../chunks/products.f1639b1b.js";/* empty css                                                    */import{P as U}from"../chunks/contants.bc3a0448.js";function B(o){let s,l,e,i,t,f="Add",d,m;return{c(){s=h("form"),l=h("div"),e=h("input"),i=D(),t=h("button"),t.textContent=f,this.h()},l(a){s=g(a,"FORM",{class:!0});var r=C(s);l=g(r,"DIV",{class:!0});var _=C(l);e=g(_,"INPUT",{placeholder:!0,class:!0}),_.forEach(v),i=P(r),t=g(r,"BUTTON",{class:!0,["data-svelte-h"]:!0}),N(t)!=="svelte-dit7f6"&&(t.textContent=f),r.forEach(v),this.h()},h(){p(e,"placeholder","URL here"),p(e,"class","url_add_input svelte-mrld77"),p(l,"class","input_container svelte-mrld77"),p(t,"class","url_add_button svelte-mrld77"),p(s,"class","add_container svelte-mrld77")},m(a,r){j(a,s,r),y(s,l),y(l,e),L(e,o[0]),o[5](e),y(s,i),y(s,t),d||(m=[b(e,"change",o[3]),b(e,"input",o[4]),b(s,"submit",A(o[2]))],d=!0)},p(a,[r]){r&1&&e.value!==a[0]&&L(e,a[0])},i:R,o:R,d(a){a&&v(s),o[5](null),d=!1,w(m)}}}function M(o,s,l){let e;I(o,V,n=>l(6,e=n));let i="",t;const f=n=>{try{if(typeof window<"u")return new window.URL(n)}catch{return t.setCustomValidity("Invalid URL"),t.reportValidity(),null}},d=n=>{let c=!1;for(let u=0;u<U.length;u++)n.host===U[u].host&&(c=!0);return c||(t.setCustomValidity(`Only allowed ${U.map(u=>u.name).join(", ")}`),t.reportValidity()),console.log(c),c},m=n=>e.includes(n.trim())?(t.setCustomValidity("Duplicate URL"),t.reportValidity(),!0):!1,a=()=>{const n=f(i);!n||!d(n)||m(i)||(V.update(u=>[...u,i]),localStorage.setItem("urls",JSON.stringify(e)))},r=()=>{t.setCustomValidity(""),t.reportValidity()};function _(){i=this.value,l(0,i)}function E(n){O[n?"unshift":"push"](()=>{t=n,l(1,t)})}return[i,t,a,r,_,E]}class G extends T{constructor(s){super(),k(this,s,M,B,S,{})}}export{G as component};
