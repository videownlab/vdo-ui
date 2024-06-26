export default { get, set, remove, clear,getAddress };

function get(key) {
  let str = localStorage.getItem(key);
  let json = null;
  if (!str) {
    return str;
  }
  try {
    json = JSON.parse(str);
  } catch (e) {
    console.log(e);
  }
  if (!json || typeof json != "object") {
    return str;
  }
  if ('v' in json) {
    return json.v;
  }
  else if ('data' in json) {
    return json.data;
  }
  return json;
}
function set(key, value) {
  let type = typeof value;
  let json = {
    type,
    v: value,
  };
  localStorage.setItem(key, JSON.stringify(json));
}
function remove(key) {
  localStorage.removeItem(key);
}
function clear() {
  localStorage.clear();
}
function getAddress() {
  let tmp = get('account');
  if (tmp && tmp.address) {
    return tmp.address;
  }
  return null;
}