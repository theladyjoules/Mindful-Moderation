function deleteCookie(name) {
  const cookieValue = getCookie( name );
  if( cookieValue ) {
    document.cookie = name + "="+cookieValue+";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function getCookie(name){
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log(cookieValue)
  return cookieValue
}

function setCookie(name, value, path = null, domain = null, maxAge = null, expires = null, secure = null){
  let cookieString = name+'='+value
  cookieString += path ? ';path='+path : ''
  cookieString += domain ? ';domain='+domain : ''
  cookieString += maxAge ? ';max-age='+maxAge : ''
  cookieString += expires ? ';expires='+expires +' GMT' : ''
  cookieString += secure ? ';secure' : ''
  console.log(cookieString)
  document.cookie = cookieString;
}

export {setCookie, getCookie, deleteCookie};