export function getItem(key) {
    try {
      let tmp = localStorage.getItem(key);
      if (!tmp) {
        return tmp;
      }
      tmp = JSON.parse(tmp);
      return tmp.v;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  export function setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify({ v: value }));
  }
  export function removeItem(key) {
    return localStorage.removeItem(key);
  }
  export function clearItems() {
    return localStorage.clear();
  }
  