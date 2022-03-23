import { languageData } from "@/js/lang.js";
import { QueryParams } from "@/js/params.js";

import nunjucks from "nunjucks/browser/nunjucks.min.js";

const JSON_PATH_RESUME_LIST = "./resumes.json";

class ResumeGenerator {
  initPage() {
    languageData.loadLanguage();

    let resumePath = QueryParams.getUrlParam("resume_json", null);
    if (resumePath != null) {
      this.readJsonResume(resumePath, (jsonData) => {
        this.renderResumeHTML(jsonData);
      });
    } else {
      this.readJsonList();
    }
  }

  readJsonList() {
    fetch(JSON_PATH_RESUME_LIST)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        return response.json();
      })
      .then((jsonData) => {
        nunjucks.render(
          "selection.html",
          {
            data: jsonData
          },
          (err, res) => {
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

  readJsonResume(path_resume, callback_success) {
    fetch(path_resume)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        return response.json();
      })
      .then((jsonData) => {
        callback_success(jsonData);
      })
      .catch((error) => {
        console.log("JSON Error! Cannot read data...");
        console.log(error);
      });
  }

  renderResumeHTML(jsonData) {
    var lang = languageData.getUrlLang();
    if (!(lang in jsonData.resume)) {
      alert("Language has not values: " + lang);
      return;
    }

    window.document.title = jsonData.resume[lang].basics.name + " [" + jsonData.resume[lang].basics.label + "]";

    nunjucks.render(
      "resume.html",
      {
        data: jsonData,
        lang: lang,
        i18n: this.getLangValue,
        formatDate: this.formatDate,
        formatEducation: this.formatEducation
      },
      (err, res) => {
        if (err != null) {
          console.log("An error occured");
          console.log(err);
        }

        document.getElementById("main").innerHTML = res;
      }
    );
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
