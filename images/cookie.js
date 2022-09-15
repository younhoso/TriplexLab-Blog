function _setCookie(name, value, maxCookie) {
  const _value = maxCookie ?? "3rd parameter Nothing to display";
  let _expires;
  let _path;
  if (typeof _value === "object") {
    const { expires, path } = _value;
    _expires = expires;
    _path = path;
  } else {
    _expires = _value;
  }
  const _date = new Date();
  _date.setTime(_date.getTime() + _expires * 60 * 60 * 24 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + _date.toUTCString() + ";path=" + _path;
  return _value;
}

function _getCookie(name) {
  const _value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return _value ? _value[2] : null;
}

function _removeCookie(name) {
  const date = new Date();
  document.cookie =
    name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}

export { _setCookie, _getCookie, _removeCookie };
