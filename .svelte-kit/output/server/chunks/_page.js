import { g as getContext, c as create_ssr_component, a as subscribe, b as add_attribute, e as escape } from "./ssr.js";
import axios from "axios";
import { l as links, e as error } from "./products.js";
import { r as readable } from "./index.js";
const PERMITED_HOSTS = [
  { name: "Epic Games", host: "store.epicgames.com", icon: "images/icons/epic.ico" },
  { name: "Steam", host: "store.steampowered.com", icon: "images/icons/steam.ico" },
  { name: "PcGarage", host: "www.pcgarage.ro", icon: "images/icons/pcgarage.ico" },
  { name: "Evomag", host: "www.evomag.ro", icon: "images/icons/evomag.ico" },
  { name: "Emag", host: "www.emag.ro", icon: "images/icons/emag.ico" },
  { name: "Altex", host: "altex.ro", icon: "images/icons/altex.ico" }
];
class Subscribable {
  constructor() {
    this.listeners = [];
  }
  subscribe(listener) {
    const callback = listener || (() => void 0);
    this.listeners.push(callback);
    this.onSubscribe();
    return () => {
      this.listeners = this.listeners.filter((x) => x !== callback);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.length > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}
const isServer = typeof window === "undefined";
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return Object.assign(Object.assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
  }
  return Object.assign(Object.assign({}, arg2), { queryKey: arg1 });
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === "function") {
      return Object.assign(Object.assign({}, arg3), { mutationKey: arg1, mutationFn: arg2 });
    }
    return Object.assign(Object.assign({}, arg2), { mutationKey: arg1 });
  }
  if (typeof arg1 === "function") {
    return Object.assign(Object.assign({}, arg2), { mutationFn: arg1 });
  }
  return Object.assign({}, arg1);
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [Object.assign(Object.assign({}, arg2), { queryKey: arg1 }), arg3] : [arg1 || {}, arg2];
}
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return "all";
  } else if (active === false && inactive === false) {
    return "none";
  } else {
    const isActive = active !== null && active !== void 0 ? active : !inactive;
    return isActive ? "active" : "inactive";
  }
}
function matchQuery(filters, query) {
  const { active, exact, fetching, inactive, predicate, queryKey, stale } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  const queryStatusFilter = mapQueryStatusFilter(active, inactive);
  if (queryStatusFilter === "none") {
    return false;
  } else if (queryStatusFilter !== "all") {
    const isActive = query.isActive();
    if (queryStatusFilter === "active" && !isActive) {
      return false;
    }
    if (queryStatusFilter === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetching === "boolean" && query.isFetching() !== fetching) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, fetching, predicate, mutationKey } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options === null || options === void 0 ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  const asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
function stableValueHash(value) {
  return JSON.stringify(value, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = Array.isArray(a) && Array.isArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isQueryKey(value) {
  return typeof value === "string" || Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch((error2) => setTimeout(() => {
    throw error2;
  }));
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
}
class FocusManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
}
const focusManager = new FocusManager();
class OnlineManager extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && (window === null || window === void 0 ? void 0 : window.addEventListener)) {
        const listener = () => onOnline();
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return () => {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    var _a;
    if (!this.hasListeners()) {
      (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _a;
    this.setup = setup;
    (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
}
const onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function isCancelable(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.cancel) === "function";
}
class CancelledError {
  constructor(options) {
    this.revert = options === null || options === void 0 ? void 0 : options.revert;
    this.silent = options === null || options === void 0 ? void 0 : options.silent;
  }
}
function isCancelledError(value) {
  return value instanceof CancelledError;
}
class Retryer {
  constructor(config) {
    let cancelRetry = false;
    let cancelFn;
    let continueFn;
    let promiseResolve;
    let promiseReject;
    this.abort = config.abort;
    this.cancel = (cancelOptions) => cancelFn === null || cancelFn === void 0 ? void 0 : cancelFn(cancelOptions);
    this.cancelRetry = () => {
      cancelRetry = true;
    };
    this.continueRetry = () => {
      cancelRetry = false;
    };
    this.continue = () => continueFn === null || continueFn === void 0 ? void 0 : continueFn();
    this.failureCount = 0;
    this.isPaused = false;
    this.isResolved = false;
    this.isTransportCancelable = false;
    this.promise = new Promise((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });
    const resolve = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onSuccess) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseResolve(value);
      }
    };
    const reject = (value) => {
      var _a;
      if (!this.isResolved) {
        this.isResolved = true;
        (_a = config.onError) === null || _a === void 0 ? void 0 : _a.call(config, value);
        continueFn === null || continueFn === void 0 ? void 0 : continueFn();
        promiseReject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        var _a;
        continueFn = continueResolve;
        this.isPaused = true;
        (_a = config.onPause) === null || _a === void 0 ? void 0 : _a.call(config);
      }).then(() => {
        var _a;
        continueFn = void 0;
        this.isPaused = false;
        (_a = config.onContinue) === null || _a === void 0 ? void 0 : _a.call(config);
      });
    };
    const run = () => {
      if (this.isResolved) {
        return;
      }
      let promiseOrValue;
      try {
        promiseOrValue = config.fn();
      } catch (error2) {
        promiseOrValue = Promise.reject(error2);
      }
      cancelFn = (cancelOptions) => {
        var _a;
        if (!this.isResolved) {
          reject(new CancelledError(cancelOptions));
          (_a = this.abort) === null || _a === void 0 ? void 0 : _a.call(this);
          if (isCancelable(promiseOrValue)) {
            try {
              promiseOrValue.cancel();
            } catch (_b) {
            }
          }
        }
      };
      this.isTransportCancelable = isCancelable(promiseOrValue);
      Promise.resolve(promiseOrValue).then(resolve).catch((error2) => {
        var _a, _b, _c;
        if (this.isResolved) {
          return;
        }
        const retry = (_a = config.retry) !== null && _a !== void 0 ? _a : 3;
        const retryDelay = (_b = config.retryDelay) !== null && _b !== void 0 ? _b : defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(this.failureCount, error2) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && this.failureCount < retry || typeof retry === "function" && retry(this.failureCount, error2);
        if (cancelRetry || !shouldRetry) {
          reject(error2);
          return;
        }
        this.failureCount++;
        (_c = config.onFail) === null || _c === void 0 ? void 0 : _c.call(config, this.failureCount, error2);
        sleep(delay).then(() => {
          if (!focusManager.isFocused() || !onlineManager.isOnline()) {
            return pause();
          }
        }).then(() => {
          if (cancelRetry) {
            reject(error2);
          } else {
            run();
          }
        });
      });
    };
    run();
  }
}
class NotifyManager {
  constructor() {
    this.queue = [];
    this.transactions = 0;
    this.notifyFn = (callback) => {
      callback();
    };
    this.batchNotifyFn = (callback) => {
      callback();
    };
  }
  batch(callback) {
    let result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  }
  schedule(callback) {
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        this.notifyFn(callback);
      });
    }
  }
  /**
   * All calls to the wrapped function will be batched.
   */
  batchCalls(callback) {
    return (...args) => {
      this.schedule(() => {
        callback(...args);
      });
    };
  }
  flush() {
    const queue = this.queue;
    this.queue = [];
    if (queue.length) {
      scheduleMicrotask(() => {
        this.batchNotifyFn(() => {
          queue.forEach((callback) => {
            this.notifyFn(callback);
          });
        });
      });
    }
  }
  /**
   * Use this method to set a custom notify function.
   * This can be used to for example wrap notifications with `React.act` while running tests.
   */
  setNotifyFunction(fn) {
    this.notifyFn = fn;
  }
  /**
   * Use this method to set a custom function to batch notifications together into a single tick.
   * By default React Query will use the batch function provided by ReactDOM or React Native.
   */
  setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  }
}
const notifyManager = new NotifyManager();
let logger = console;
function getLogger() {
  return logger;
}
class Mutation {
  constructor(config) {
    this.options = Object.assign(Object.assign({}, config.defaultOptions), config.options);
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.meta = config.meta;
  }
  setState(state) {
    this.dispatch({ type: "setState", state });
  }
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((x) => x !== observer);
  }
  cancel() {
    if (this.retryer) {
      this.retryer.cancel();
      return this.retryer.promise.then(noop).catch(noop);
    }
    return Promise.resolve();
  }
  continue() {
    if (this.retryer) {
      this.retryer.continue();
      return this.retryer.promise;
    }
    return this.execute();
  }
  execute() {
    let data;
    const restored = this.state.status === "loading";
    let promise = Promise.resolve();
    if (!restored) {
      this.dispatch({ type: "loading", variables: this.options.variables });
      promise = promise.then(() => {
        var _a, _b;
        (_b = (_a = this.mutationCache.config).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables, this);
      }).then(() => {
        var _a, _b;
        return (_b = (_a = this.options).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables);
      }).then((context) => {
        if (context !== this.state.context) {
          this.dispatch({
            type: "loading",
            context,
            variables: this.state.variables
          });
        }
      });
    }
    return promise.then(() => this.executeMutation()).then((result) => {
      var _a, _b;
      data = result;
      (_b = (_a = this.mutationCache.config).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context, this);
    }).then(() => {
      var _a, _b;
      return (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context);
    }).then(() => {
      var _a, _b;
      return (_b = (_a = this.options).onSettled) === null || _b === void 0 ? void 0 : _b.call(_a, data, null, this.state.variables, this.state.context);
    }).then(() => {
      this.dispatch({ type: "success", data });
      return data;
    }).catch((error2) => {
      var _a, _b;
      (_b = (_a = this.mutationCache.config).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error2, this.state.variables, this.state.context, this);
      getLogger().error(error2);
      return Promise.resolve().then(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.options).onError) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, error2, this.state.variables, this.state.context);
      }).then(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.options).onSettled) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, void 0, error2, this.state.variables, this.state.context);
      }).then(() => {
        this.dispatch({ type: "error", error: error2 });
        throw error2;
      });
    });
  }
  executeMutation() {
    var _a;
    this.retryer = new Retryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject("No mutationFn found");
        }
        return this.options.mutationFn(this.state.variables);
      },
      onFail: () => {
        this.dispatch({ type: "failed" });
      },
      onPause: () => {
        this.dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.dispatch({ type: "continue" });
      },
      retry: (_a = this.options.retry) !== null && _a !== void 0 ? _a : 0,
      retryDelay: this.options.retryDelay
    });
    return this.retryer.promise;
  }
  dispatch(action) {
    this.state = reducer(this.state, action);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify(this);
    });
  }
}
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}
function reducer(state, action) {
  switch (action.type) {
    case "failed":
      return Object.assign(Object.assign({}, state), { failureCount: state.failureCount + 1 });
    case "pause":
      return Object.assign(Object.assign({}, state), { isPaused: true });
    case "continue":
      return Object.assign(Object.assign({}, state), { isPaused: false });
    case "loading":
      return Object.assign(Object.assign({}, state), { context: action.context, data: void 0, error: null, isPaused: false, status: "loading", variables: action.variables });
    case "success":
      return Object.assign(Object.assign({}, state), { data: action.data, error: null, status: "success", isPaused: false });
    case "error":
      return Object.assign(Object.assign({}, state), { data: void 0, error: action.error, failureCount: state.failureCount + 1, isPaused: false, status: "error" });
    case "setState":
      return Object.assign(Object.assign({}, state), action.state);
    default:
      return state;
  }
}
class MutationObserver extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.setOptions(options);
    this.bindMethods();
    this.updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    this.options = this.client.defaultMutationOptions(options);
  }
  onUnsubscribe() {
    var _a;
    if (!this.listeners.length) {
      (_a = this.currentMutation) === null || _a === void 0 ? void 0 : _a.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.updateResult();
    const notifyOptions = {
      listeners: true
    };
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error") {
      notifyOptions.onError = true;
    }
    this.notify(notifyOptions);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  reset() {
    this.currentMutation = void 0;
    this.updateResult();
    this.notify({ listeners: true });
  }
  mutate(variables, options) {
    this.mutateOptions = options;
    if (this.currentMutation) {
      this.currentMutation.removeObserver(this);
    }
    this.currentMutation = this.client.getMutationCache().build(this.client, Object.assign(Object.assign({}, this.options), { variables: typeof variables !== "undefined" ? variables : this.options.variables }));
    this.currentMutation.addObserver(this);
    return this.currentMutation.execute();
  }
  updateResult() {
    const state = this.currentMutation ? this.currentMutation.state : getDefaultState();
    const result = Object.assign(Object.assign({}, state), { isLoading: state.status === "loading", isSuccess: state.status === "success", isError: state.status === "error", isIdle: state.status === "idle", mutate: this.mutate, reset: this.reset });
    this.currentResult = result;
  }
  notify(options) {
    notifyManager.batch(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (this.mutateOptions) {
        if (options.onSuccess) {
          (_b = (_a = this.mutateOptions).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentResult.data, this.currentResult.variables, this.currentResult.context);
          (_d = (_c = this.mutateOptions).onSettled) === null || _d === void 0 ? void 0 : _d.call(_c, this.currentResult.data, null, this.currentResult.variables, this.currentResult.context);
        } else if (options.onError) {
          (_f = (_e = this.mutateOptions).onError) === null || _f === void 0 ? void 0 : _f.call(_e, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
          (_h = (_g = this.mutateOptions).onSettled) === null || _h === void 0 ? void 0 : _h.call(_g, void 0, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
        }
      }
      if (options.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.currentResult);
        });
      }
    });
  }
}
function useQueryClient() {
  const queryClient = getContext("queryClient");
  if (!queryClient) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return queryClient;
}
function useMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  const queryClient = useQueryClient();
  const observer = new MutationObserver(queryClient, options);
  const mutate = (variables, mutateOptions) => {
    observer.mutate(variables, mutateOptions).catch(noop);
  };
  const initialResult = observer.getCurrentResult();
  const initialMutationResult = Object.assign(Object.assign({}, initialResult), { mutate, mutateAsync: initialResult.mutate });
  const { subscribe: subscribe2 } = readable(initialMutationResult, (set) => {
    return observer.subscribe(notifyManager.batchCalls((result) => {
      if (observer.hasListeners()) {
        set(Object.assign(Object.assign({}, result), { mutate, mutateAsync: result.mutate }));
      }
    }));
  });
  function setOptions(arg12, arg22, arg32) {
    if (observer.hasListeners()) {
      const newOptions = parseMutationArgs(arg12, arg22, arg32);
      observer.setOptions(newOptions);
    }
  }
  return { subscribe: subscribe2, setOptions };
}
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".product-container.svelte-1wtjx76{min-height:fit-content;height:100%;width:100%;padding:0.5em 1em;background-color:var(--secondary);border-radius:1em;display:flex;gap:1em;position:relative}h2.svelte-1wtjx76,a.svelte-1wtjx76{width:100%;height:5ch;text-decoration:none;overflow:hidden;text-overflow:ellipsis}.preview-img.svelte-1wtjx76{width:50%;height:fit-content;object-fit:contain;border-radius:5%;align-self:center}.icon.svelte-1wtjx76{height:18px}.icon-btn.svelte-1wtjx76{height:fit-content;border:none;background-color:inherit;cursor:pointer}.buttons-box.svelte-1wtjx76{position:absolute;bottom:0;right:0;width:fit-content;display:flex;align-items:center;justify-content:center}.prices.svelte-1wtjx76{display:flex;gap:.4em;justify-items:center;font-family:Arial}.savedPrice.svelte-1wtjx76{font-size:.6em;align-self:end}.savedPrice.svelte-1wtjx76::before{content:'('\n    }.savedPrice.svelte-1wtjx76::after{content:')'\n    }.img-replacement.svelte-1wtjx76{width:100%;height:7em;aspect-ratio:21/10;border-radius:5%}.title-replacement.svelte-1wtjx76{height:1.5em;width:10em;margin-bottom:5px}.price-replacement.svelte-1wtjx76{height:1.4em;width:5em;margin-bottom:5px}.button-replacement.svelte-1wtjx76{height:1.4em;width:1.6em;display:inline-block}.loading.svelte-1wtjx76{background:#eee;background:linear-gradient(\n            110deg,\n            #ececec 8%,\n            #f5f5f5 18%,\n            #ececec 33%\n        );border-radius:5px;background-size:200% 100%;animation:1.5s svelte-1wtjx76-shine linear infinite}@keyframes svelte-1wtjx76-shine{to{background-position-x:-200%}}.store-icon.svelte-1wtjx76{height:15px}.icons.svelte-1wtjx76{position:absolute;top:6px;right:6px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let savedPrice;
  let $mutation, $$unsubscribe_mutation;
  let $links, $$unsubscribe_links;
  $$unsubscribe_links = subscribe(links, (value) => $links = value);
  let { prod } = $$props;
  const remove = () => {
    links.update((links2) => links2.filter((l) => l !== prod));
    localStorage.setItem("urls", JSON.stringify($links));
    localStorage.removeItem(prod);
  };
  const getHost = () => {
    if (typeof window === "undefined")
      return;
    let URL = new window.URL(prod);
    const host2 = URL.host;
    URL = null;
    const currentHost = PERMITED_HOSTS.filter((h) => host2 === h.host);
    return currentHost[0];
  };
  const host = getHost();
  const mutation = useMutation((url) => axios.post("http://localhost:3000/api/scraper/", { url, details: host }), {
    onSuccess: (data) => {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString();
      if (savedPrice.price === "No saved price" || savedPrice.date !== today) {
        localStorage.setItem(prod, JSON.stringify({ price: data.data.data.price, date: today }));
        savedPrice = { price: data.data.data.price, date: today };
      }
    },
    onError: (err) => {
      if (err.response.status === 404) {
        remove();
        error.update((e) => ({
          ...e,
          isError: !e.isError,
          message: err.response.data.error
        }));
      }
    }
  });
  $$unsubscribe_mutation = subscribe(mutation, (value) => $mutation = value);
  $mutation.mutate(prod);
  if ($$props.prod === void 0 && $$bindings.prod && prod !== void 0)
    $$bindings.prod(prod);
  $$result.css.add(css);
  savedPrice = JSON.parse(localStorage.getItem(prod)) || {
    price: "No saved price",
    date: (/* @__PURE__ */ new Date()).toLocaleDateString()
  };
  $$unsubscribe_mutation();
  $$unsubscribe_links();
  return `<div class="product-container svelte-1wtjx76">${$mutation.isLoading ? `<div class="img-replacement loading svelte-1wtjx76"></div> <div data-svelte-h="svelte-1ld65mi"><div class="title-replacement loading svelte-1wtjx76"></div> <div class="price-replacement loading svelte-1wtjx76"></div> <div class="buttons-box svelte-1wtjx76"><div class="button-replacement loading svelte-1wtjx76"></div> <div class="button-replacement loading svelte-1wtjx76"></div></div></div>` : `${$mutation.isError ? `<div data-svelte-h="svelte-6oqvn7">Error... Try again later</div>` : `${$mutation.isSuccess ? `<img class="preview-img svelte-1wtjx76"${add_attribute("src", $mutation.data.data.data.src, 0)} alt="Preview image"> <div><a${add_attribute("href", $mutation.data.data.data.url, 0)} target="_blank" class="svelte-1wtjx76"><h2 class="svelte-1wtjx76">${escape($mutation.data.data.data.title)}</h2></a> <div class="prices svelte-1wtjx76"><p class="currentPrice">${escape($mutation.data.data.data.price)}</p> <p class="savedPrice svelte-1wtjx76" title="Yesterday's price">${escape(savedPrice.price)}</p></div> <div class="buttons-box svelte-1wtjx76"><button class="icon-btn svelte-1wtjx76" data-svelte-h="svelte-19bgayu"><img class="icon svelte-1wtjx76" src="images/refresh.svg" alt="Refresh"></button> <button class="icon-btn svelte-1wtjx76" data-svelte-h="svelte-1n90p9w"><img class="icon svelte-1wtjx76" src="images/delete.svg" alt="Remove"></button></div> <div class="icons svelte-1wtjx76">${$mutation.data.data.data.isGenius ? `<img class="store-icon svelte-1wtjx76" src="images/genius.svg" alt="Genius">` : ``} <img class="store-icon svelte-1wtjx76"${add_attribute("src", host.icon, 0)}${add_attribute("alt", host.name, 0)}></div></div>` : ``}`}`} </div>`;
});
export {
  Mutation as M,
  Page as P,
  Retryer as R,
  Subscribable as S,
  isCancelledError as a,
  getLogger as b,
  notifyManager as c,
  matchMutation as d,
  ensureQueryKeyArray as e,
  functionalUpdate as f,
  getAbortController as g,
  hashQueryKeyByOptions as h,
  isValidTimeout as i,
  isCancelable as j,
  focusManager as k,
  parseQueryArgs as l,
  matchQuery as m,
  noop as n,
  onlineManager as o,
  parseFilterArgs as p,
  hashQueryKey as q,
  replaceEqualDeep as r,
  partialMatchKey as s,
  timeUntilStale as t
};
