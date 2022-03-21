import { languageData } from "./lang.js";
import nunjucks from "nunjucks/browser/nunjucks.min.js";

const JSON_RESUME_DATA_PATH = "./resume-data.json";

class ResumeGenerator {
  initPage() {
    languageData.loadLanguage();
    this.readJsonResume();
  }

  readJsonResume() {
    fetch(JSON_RESUME_DATA_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        return response.json();
      })
      .then((jsonData) => {
        var lang = languageData.getUrlLang();
        if (!(lang in jsonData.resume)) {
          alert("Language has not values: " + lang);
          return;
        }

        window.document.title = jsonData.resume[lang].basics.name + " [" + jsonData.resume[lang].basics.label + "]";

        nunjucks.render(
          "layout.html",
          {
            data: jsonData,
            lang: lang,
            i18n: this.getLangValue,
            formatDate: this.formatDate,
            formatEducation: this.formatEducation
          },
          function (err, res) {
            if (err != null) {
              console.log("An error occured");
              console.log(err);
            }

            document.getElementById("main").innerHTML = res;
          }
        );
      })
      .catch((error) => {
        console.log("JSON Error! Cannot read data...");
        console.log(error);
      });
  }

  // special case because this function is called from nunjucks
  //   and so "this" in function doesn't reference the expected object...
  getLangValue(key) {
    return languageData.getLangValue(key);
  }

  formatDate(dateString) {
    // yyyy-mm-dd
    if (dateString.trim() === "") {
      return "...";
    } else {
      var toFormat = new Date(dateString);
      return languageData.getLangValue("months." + toFormat.getMonth()) + " " + toFormat.getFullYear();
    }
  }

  formatEducation(studyArea, studyType) {
    var prop = "en";
    if (languageData.getUrlLang() === "fr") {
      var firstLetter = studyArea.substr(0, 1).toLowerCase();
      var prop = ["é"].indexOf(firstLetter) !== -1 ? "d'" : "en ";
    } else {
      var firstLetter = studyArea.substr(0, 1).toLowerCase();
      var prop = ["a", "e", "i", "o", "u"].indexOf(firstLetter) !== -1 ? "of " : "in ";
    }

    return studyType + " " + prop + studyArea;
  }
}

export const resumeGenerator = new ResumeGenerator();
