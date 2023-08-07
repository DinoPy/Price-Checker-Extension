import{s as Z,a as ce,u as he,g as de,b as fe,o as me,f as ve,h as ye,n as pe}from"../chunks/scheduler.e2281038.js";import{S as ee,i as te,k as D,l as Q,u as M,v as S,w,x as U,s as B,e as ge,f as V,c as be,a as Oe,d as K,o as qe,g as L,h as Ce}from"../chunks/index.e5e2aa14.js";import{component as _e}from"./3.aceb17bc.js";import{component as Pe}from"./6.6509eeb0.js";import{component as Fe}from"./4.5e4f4a13.js";import{i as De,f as Qe,r as je,n as y,t as Ae,e as Me,g as se,R as Se,a as E,b as we,c as m,S as ie,h as ae,p as _,m as W,M as Ue,d as z,j as J,k as I,o as R,l as H,q as A,s as X}from"../chunks/7.66af08c7.js";class $e{constructor(e){this.abortSignalConsumed=!1,this.hadObservers=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||this.getDefaultState(this.options),this.state=this.initialState,this.meta=e.meta,this.scheduleGc()}setOptions(e){var t;this.options=Object.assign(Object.assign({},this.defaultOptions),e),this.meta=e==null?void 0:e.meta,this.cacheTime=Math.max(this.cacheTime||0,(t=this.options.cacheTime)!==null&&t!==void 0?t:5*60*1e3)}setDefaultOptions(e){this.defaultOptions=e}scheduleGc(){this.clearGcTimeout(),De(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}clearGcTimeout(){clearTimeout(this.gcTimeout),this.gcTimeout=void 0}optionalRemove(){this.observers.length||(this.state.isFetching?this.hadObservers&&this.scheduleGc():this.cache.remove(this))}setData(e,t){var s,i;const a=this.state.data;let r=Qe(e,a);return!((i=(s=this.options).isDataEqual)===null||i===void 0)&&i.call(s,a,r)?r=a:this.options.structuralSharing!==!1&&(r=je(a,r)),this.dispatch({data:r,type:"success",dataUpdatedAt:t==null?void 0:t.updatedAt}),r}setState(e,t){this.dispatch({type:"setState",state:e,setStateOptions:t})}cancel(e){var t;const s=this.promise;return(t=this.retryer)===null||t===void 0||t.cancel(e),s?s.then(y).catch(y):Promise.resolve()}destroy(){this.clearGcTimeout(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>e.options.enabled!==!1)}isFetching(){return this.state.isFetching}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!Ae(this.state.dataUpdatedAt,e)}onFocus(){var e;const t=this.observers.find(s=>s.shouldFetchOnWindowFocus());t&&t.refetch(),(e=this.retryer)===null||e===void 0||e.continue()}onOnline(){var e;const t=this.observers.find(s=>s.shouldFetchOnReconnect());t&&t.refetch(),(e=this.retryer)===null||e===void 0||e.continue()}addObserver(e){this.observers.indexOf(e)===-1&&(this.observers.push(e),this.hadObservers=!0,this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.indexOf(e)!==-1&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.retryer&&(this.retryer.isTransportCancelable||this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.cacheTime?this.scheduleGc():this.cache.remove(this)),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,t){var s,i,a,r,u,n;if(this.state.isFetching){if(this.state.dataUpdatedAt&&(t!=null&&t.cancelRefetch))this.cancel({silent:!0});else if(this.promise)return(s=this.retryer)===null||s===void 0||s.continueRetry(),this.promise}if(e&&this.setOptions(e),!this.options.queryFn){const c=this.observers.find(b=>b.options.queryFn);c&&this.setOptions(c.options)}const l=Me(this.queryKey),g=se(),j={queryKey:l,pageParam:void 0,meta:this.meta};Object.defineProperty(j,"signal",{enumerable:!0,get:()=>{if(g)return this.abortSignalConsumed=!0,g.signal}});const d=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(j)):Promise.reject("Missing queryFn"),p={fetchOptions:t,options:this.options,queryKey:l,state:this.state,fetchFn:d,meta:this.meta};return!((i=this.options.behavior)===null||i===void 0)&&i.onFetch&&((a=this.options.behavior)===null||a===void 0||a.onFetch(p)),this.revertState=this.state,(!this.state.isFetching||this.state.fetchMeta!==((r=p.fetchOptions)===null||r===void 0?void 0:r.meta))&&this.dispatch({type:"fetch",meta:(u=p.fetchOptions)===null||u===void 0?void 0:u.meta}),this.retryer=new Se({fn:p.fetchFn,abort:(n=g==null?void 0:g.abort)===null||n===void 0?void 0:n.bind(g),onSuccess:c=>{var b,v;this.setData(c),(v=(b=this.cache.config).onSuccess)===null||v===void 0||v.call(b,c,this),this.cacheTime===0&&this.optionalRemove()},onError:c=>{var b,v;E(c)&&c.silent||this.dispatch({type:"error",error:c}),E(c)||((v=(b=this.cache.config).onError)===null||v===void 0||v.call(b,c,this),we().error(c)),this.cacheTime===0&&this.optionalRemove()},onFail:()=>{this.dispatch({type:"failed"})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:p.options.retry,retryDelay:p.options.retryDelay}),this.promise=this.retryer.promise,this.promise}dispatch(e){this.state=this.reducer(this.state,e),m.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate(e)}),this.cache.notify({query:this,type:"queryUpdated",action:e})})}getDefaultState(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,i=typeof e.initialData<"u"?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0,a=typeof t<"u";return{data:t,dataUpdateCount:0,dataUpdatedAt:a?i??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchMeta:null,isFetching:!1,isInvalidated:!1,isPaused:!1,status:a?"success":"idle"}}reducer(e,t){var s,i;switch(t.type){case"failed":return Object.assign(Object.assign({},e),{fetchFailureCount:e.fetchFailureCount+1});case"pause":return Object.assign(Object.assign({},e),{isPaused:!0});case"continue":return Object.assign(Object.assign({},e),{isPaused:!1});case"fetch":return Object.assign(Object.assign(Object.assign({},e),{fetchFailureCount:0,fetchMeta:(s=t.meta)!==null&&s!==void 0?s:null,isFetching:!0,isPaused:!1}),!e.dataUpdatedAt&&{error:null,status:"loading"});case"success":return Object.assign(Object.assign({},e),{data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:(i=t.dataUpdatedAt)!==null&&i!==void 0?i:Date.now(),error:null,fetchFailureCount:0,isFetching:!1,isInvalidated:!1,isPaused:!1,status:"success"});case"error":const a=t.error;return E(a)&&a.revert&&this.revertState?Object.assign({},this.revertState):Object.assign(Object.assign({},e),{error:a,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,isFetching:!1,isPaused:!1,status:"error"});case"invalidate":return Object.assign(Object.assign({},e),{isInvalidated:!0});case"setState":return Object.assign(Object.assign({},e),t.state);default:return e}}}class ne extends ie{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,t,s){var i;const a=t.queryKey,r=(i=t.queryHash)!==null&&i!==void 0?i:ae(a,t);let u=this.get(r);return u||(u=new $e({cache:this,queryKey:a,queryHash:r,options:e.defaultQueryOptions(t),state:s,defaultOptions:e.getQueryDefaults(a),meta:t.meta}),this.add(u)),u}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"queryAdded",query:e}))}remove(e){const t=this.queriesMap[e.queryHash];t&&(e.destroy(),this.queries=this.queries.filter(s=>s!==e),t===e&&delete this.queriesMap[e.queryHash],this.notify({type:"queryRemoved",query:e}))}clear(){m.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,t){const[s]=_(e,t);return typeof s.exact>"u"&&(s.exact=!0),this.queries.find(i=>W(s,i))}findAll(e,t){const[s]=_(e,t);return Object.keys(s).length>0?this.queries.filter(i=>W(s,i)):this.queries}notify(e){m.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){m.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){m.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}class re extends ie{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,t,s){const i=new Ue({mutationCache:this,mutationId:++this.mutationId,options:e.defaultMutationOptions(t),state:s,defaultOptions:t.mutationKey?e.getMutationDefaults(t.mutationKey):void 0,meta:t.meta});return this.add(i),i}add(e){this.mutations.push(e),this.notify(e)}remove(e){this.mutations=this.mutations.filter(t=>t!==e),e.cancel(),this.notify(e)}clear(){m.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return typeof e.exact>"u"&&(e.exact=!0),this.mutations.find(t=>z(e,t))}findAll(e){return this.mutations.filter(t=>z(e,t))}notify(e){m.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){this.resumePausedMutations()}onOnline(){this.resumePausedMutations()}resumePausedMutations(){const e=this.mutations.filter(t=>t.state.isPaused);return m.batch(()=>e.reduce((t,s)=>t.then(()=>s.continue().catch(y)),Promise.resolve()))}}function Te(){return{onFetch:o=>{o.fetchFn=()=>{var e,t,s,i,a,r;const u=(t=(e=o.fetchOptions)===null||e===void 0?void 0:e.meta)===null||t===void 0?void 0:t.refetchPage,n=(i=(s=o.fetchOptions)===null||s===void 0?void 0:s.meta)===null||i===void 0?void 0:i.fetchMore,l=n==null?void 0:n.pageParam,g=(n==null?void 0:n.direction)==="forward",j=(n==null?void 0:n.direction)==="backward",d=((a=o.state.data)===null||a===void 0?void 0:a.pages)||[],p=((r=o.state.data)===null||r===void 0?void 0:r.pageParams)||[],c=se(),b=c==null?void 0:c.signal;let v=p,x=!1;const oe=o.options.queryFn||(()=>Promise.reject("Missing queryFn")),$=(h,q,f,C)=>(v=C?[q,...v]:[...v,q],C?[f,...h]:[...h,f]),P=(h,q,f,C)=>{if(x)return Promise.reject("Cancelled");if(typeof f>"u"&&!q&&h.length)return Promise.resolve(h);const N={queryKey:o.queryKey,signal:b,pageParam:f,meta:o.meta},F=oe(N),k=Promise.resolve(F).then(T=>$(h,f,T,C));if(J(F)){const T=k;T.cancel=F.cancel}return k};let O;if(!d.length)O=P([]);else if(g){const h=typeof l<"u",q=h?l:Y(o.options,d);O=P(d,h,q)}else if(j){const h=typeof l<"u",q=h?l:Ke(o.options,d);O=P(d,h,q,!0)}else{v=[];const h=typeof o.options.getNextPageParam>"u";O=(u&&d[0]?u(d[0],0,d):!0)?P([],h,p[0]):Promise.resolve($([],p[0],d[0]));for(let f=1;f<d.length;f++)O=O.then(C=>{if(u&&d[f]?u(d[f],f,d):!0){const F=h?p[f]:Y(o.options,C);return P(C,h,F)}return Promise.resolve($(C,p[f],d[f]))})}const G=O.then(h=>({pages:h,pageParams:v})),le=G;return le.cancel=()=>{x=!0,c==null||c.abort(),J(O)&&O.cancel()},G}}}}function Y(o,e){var t;return(t=o.getNextPageParam)===null||t===void 0?void 0:t.call(o,e[e.length-1],e)}function Ke(o,e){var t;return(t=o.getPreviousPageParam)===null||t===void 0?void 0:t.call(o,e[0],e)}class ue{constructor(e={}){this.queryCache=e.queryCache||new ne,this.mutationCache=e.mutationCache||new re,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[]}mount(){this.unsubscribeFocus=I.subscribe(()=>{I.isFocused()&&R.isOnline()&&(this.mutationCache.onFocus(),this.queryCache.onFocus())}),this.unsubscribeOnline=R.subscribe(()=>{I.isFocused()&&R.isOnline()&&(this.mutationCache.onOnline(),this.queryCache.onOnline())})}unmount(){var e,t;(e=this.unsubscribeFocus)===null||e===void 0||e.call(this),(t=this.unsubscribeOnline)===null||t===void 0||t.call(this)}isFetching(e,t){const[s]=_(e,t);return s.fetching=!0,this.queryCache.findAll(s).length}isMutating(e){return this.mutationCache.findAll(Object.assign(Object.assign({},e),{fetching:!0})).length}getQueryData(e,t){var s;return(s=this.queryCache.find(e,t))===null||s===void 0?void 0:s.state.data}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:t,state:s})=>{const i=s.data;return[t,i]})}setQueryData(e,t,s){const i=H(e),a=this.defaultQueryOptions(i);return this.queryCache.build(this,a).setData(t,s)}setQueriesData(e,t,s){return m.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:i})=>[i,this.setQueryData(i,t,s)]))}getQueryState(e,t){var s;return(s=this.queryCache.find(e,t))===null||s===void 0?void 0:s.state}removeQueries(e,t){const[s]=_(e,t),i=this.queryCache;m.batch(()=>{i.findAll(s).forEach(a=>{i.remove(a)})})}resetQueries(e,t,s){const[i,a]=_(e,t,s),r=this.queryCache,u=Object.assign(Object.assign({},i),{active:!0});return m.batch(()=>(r.findAll(i).forEach(n=>{n.reset()}),this.refetchQueries(u,a)))}cancelQueries(e,t,s){const[i,a={}]=_(e,t,s);typeof a.revert>"u"&&(a.revert=!0);const r=m.batch(()=>this.queryCache.findAll(i).map(u=>u.cancel(a)));return Promise.all(r).then(y).catch(y)}invalidateQueries(e,t,s){var i,a,r;const[u,n]=_(e,t,s),l=Object.assign(Object.assign({},u),{active:(a=(i=u.refetchActive)!==null&&i!==void 0?i:u.active)!==null&&a!==void 0?a:!0,inactive:(r=u.refetchInactive)!==null&&r!==void 0?r:!1});return m.batch(()=>(this.queryCache.findAll(u).forEach(g=>{g.invalidate()}),this.refetchQueries(l,n)))}refetchQueries(e,t,s){const[i,a]=_(e,t,s),r=m.batch(()=>this.queryCache.findAll(i).map(n=>n.fetch(void 0,Object.assign(Object.assign({},a),{meta:{refetchPage:i==null?void 0:i.refetchPage}}))));let u=Promise.all(r).then(y);return a!=null&&a.throwOnError||(u=u.catch(y)),u}fetchQuery(e,t,s){const i=H(e,t,s),a=this.defaultQueryOptions(i);typeof a.retry>"u"&&(a.retry=!1);const r=this.queryCache.build(this,a);return r.isStaleByTime(a.staleTime)?r.fetch(a):Promise.resolve(r.state.data)}prefetchQuery(e,t,s){return this.fetchQuery(e,t,s).then(y).catch(y)}fetchInfiniteQuery(e,t,s){const i=H(e,t,s);return i.behavior=Te(),this.fetchQuery(i)}prefetchInfiniteQuery(e,t,s){return this.fetchInfiniteQuery(e,t,s).then(y).catch(y)}cancelMutations(){const e=m.batch(()=>this.mutationCache.getAll().map(t=>t.cancel()));return Promise.all(e).then(y).catch(y)}resumePausedMutations(){return this.getMutationCache().resumePausedMutations()}executeMutation(e){return this.mutationCache.build(this,e).execute()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,t){const s=this.queryDefaults.find(i=>A(e)===A(i.queryKey));s?s.defaultOptions=t:this.queryDefaults.push({queryKey:e,defaultOptions:t})}getQueryDefaults(e){var t;return e?(t=this.queryDefaults.find(s=>X(e,s.queryKey)))===null||t===void 0?void 0:t.defaultOptions:void 0}setMutationDefaults(e,t){const s=this.mutationDefaults.find(i=>A(e)===A(i.mutationKey));s?s.defaultOptions=t:this.mutationDefaults.push({mutationKey:e,defaultOptions:t})}getMutationDefaults(e){var t;return e?(t=this.mutationDefaults.find(s=>X(e,s.mutationKey)))===null||t===void 0?void 0:t.defaultOptions:void 0}defaultQueryOptions(e){if(e!=null&&e._defaulted)return e;const t=Object.assign(Object.assign(Object.assign(Object.assign({},this.defaultOptions.queries),this.getQueryDefaults(e==null?void 0:e.queryKey)),e),{_defaulted:!0});return!t.queryHash&&t.queryKey&&(t.queryHash=ae(t.queryKey,t)),t}defaultQueryObserverOptions(e){return this.defaultQueryOptions(e)}defaultMutationOptions(e){return e!=null&&e._defaulted?e:Object.assign(Object.assign(Object.assign(Object.assign({},this.defaultOptions.mutations),this.getMutationDefaults(e==null?void 0:e.mutationKey)),e),{_defaulted:!0})}clear(){this.queryCache.clear(),this.mutationCache.clear()}}function Ee(o){let e;const t=o[5].default,s=ce(t,o,o[4],null);return{c(){s&&s.c()},l(i){s&&s.l(i)},m(i,a){s&&s.m(i,a),e=!0},p(i,[a]){s&&s.p&&(!e||a&16)&&he(s,t,i,i[4],e?fe(t,i[4],a,null):de(i[4]),null)},i(i){e||(D(s,i),e=!0)},o(i){Q(s,i),e=!1},d(i){s&&s.d(i)}}}function Ie(o,e,t){let{$$slots:s={},$$scope:i}=e,{queryCache:a=new ne}=e,{mutationCache:r=new re}=e,{defaultOptions:u={}}=e,{client:n=new ue({queryCache:a,mutationCache:r,defaultOptions:u})}=e;return me(()=>{n.mount()}),ve("queryClient",n),ye(()=>{n.unmount()}),o.$$set=l=>{"queryCache"in l&&t(0,a=l.queryCache),"mutationCache"in l&&t(1,r=l.mutationCache),"defaultOptions"in l&&t(2,u=l.defaultOptions),"client"in l&&t(3,n=l.client),"$$scope"in l&&t(4,i=l.$$scope)},[a,r,u,n,i,s]}class Re extends ee{constructor(e){super(),te(this,e,Ie,Ee,Z,{queryCache:0,mutationCache:1,defaultOptions:2,client:3})}}const He=Re;function xe(o){let e,t,s,i,a,r,u;return e=new Fe({}),i=new _e({}),r=new Pe({}),{c(){M(e.$$.fragment),t=B(),s=ge("div"),M(i.$$.fragment),a=B(),M(r.$$.fragment),this.h()},l(n){S(e.$$.fragment,n),t=V(n),s=be(n,"DIV",{class:!0});var l=Oe(s);S(i.$$.fragment,l),a=V(l),S(r.$$.fragment,l),l.forEach(K),this.h()},h(){qe(s,"class","mainContainer svelte-kjgcjw")},m(n,l){w(e,n,l),L(n,t,l),L(n,s,l),w(i,s,null),Ce(s,a),w(r,s,null),u=!0},p:pe,i(n){u||(D(e.$$.fragment,n),D(i.$$.fragment,n),D(r.$$.fragment,n),u=!0)},o(n){Q(e.$$.fragment,n),Q(i.$$.fragment,n),Q(r.$$.fragment,n),u=!1},d(n){n&&(K(t),K(s)),U(e,n),U(i),U(r)}}}function Ge(o){let e,t;return e=new He({props:{client:o[0],$$slots:{default:[xe]},$$scope:{ctx:o}}}),{c(){M(e.$$.fragment)},l(s){S(e.$$.fragment,s)},m(s,i){w(e,s,i),t=!0},p(s,[i]){const a={};i&2&&(a.$$scope={dirty:i,ctx:s}),e.$set(a)},i(s){t||(D(e.$$.fragment,s),t=!0)},o(s){Q(e.$$.fragment,s),t=!1},d(s){U(e,s)}}}function Ne(o){return[new ue]}class Je extends ee{constructor(e){super(),te(this,e,Ne,Ge,Z,{})}}export{Je as component};
