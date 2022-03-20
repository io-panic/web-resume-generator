const LANGUAGE_DEFAULT = "en";
const LANGUAGE_QUERY_PARAM = "lang";
const LANGUAGE_PATH_JSON_PREFIX = "./locales/";
const LANGUAGE_PATH_JSON_SUFFIX = ".json";

class LanguageData {
  #jsonLangData = [];

  loadLanguage() {
    var jsonLangFile = LANGUAGE_PATH_JSON_PREFIX + this.getUrlLang() + LANGUAGE_PATH_JSON_SUFFIX;

    fetch(jsonLangFile)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        return response.json();
      })
      .then((jsonLang) => {
        this._setJsonLangData(jsonLang);
      })
      .catch(() => {
        console.error(jsonLangFile);
      });
  }

  _setJsonLangData(jsonLangData) {
    this.#jsonLangData = jsonLangData;
  }

  getJsonLangData() {
    return this.#jsonLangData;
  }

  getUrlLang() {
    let lang = LANGUAGE_DEFAULT;
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(LANGUAGE_QUERY_PARAM)) {
      lang = urlParams.get(LANGUAGE_QUERY_PARAM);
    }

    return lang;
  }

  getLangValue(key) {
    let result;

    key.split(".").map((k, i, values) => {
      if (result === undefined) {
        result = this.getJsonLangData()[k];
      } else {
        result = result[k];
      }
    });

    return result;
  }
}

export const languageData = new LanguageData();
