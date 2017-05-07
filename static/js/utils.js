/**
 * Created by austin on 5/7/17.
 */

export function redirect(toPage) {
  window.location.href = `http://${window.location.host}/${toPage}`;
}

