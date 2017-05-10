/**
 * Created by austin on 5/7/17.
 */

/**
 * NO BEGGING SLASH PLZ
 * @param toPage
 * @return {string}
 */
export function makeUrl(toPage) {
  return `http://${window.location.host}/${toPage}`;
}


/**
 * NO BEGINNING SLASH PLZ
 * @param toPage
 */
export function redirect(toPage) {
  window.location.href = makeUrl(toPage);
}

/**
 * @see http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param query
 * @return {*}
 */
export function getQueryParams(query) {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {});
}
