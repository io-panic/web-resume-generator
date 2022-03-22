export class QueryParams {
  static getUrlParam(param, default_value) {
    let value = default_value;
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(param)) {
      value = urlParams.get(param);
    }

    return value;
  }
}
