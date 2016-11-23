const util = {
  store: typeof window === 'undefined' ? undefined : window.localStorage,
  key: 'auth-token',
  get(key) {
    return this.store.getItem(this.key);
  },
  setKey(val) {
    if (val) {
      this.store.setItem(this.key, val);
    } else {
      this.store.removeItem(this.key);
    }
  }
};

export default util;
