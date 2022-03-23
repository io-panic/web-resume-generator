import { select } from "nunjucks/src/filters";
import { resumeGenerator } from "@/js/resume.js";

class ResumeSelection {
  displayResumeInfo(selectedOption) {
    let resume_filename = selectedOption.value;

    resumeGenerator.readJsonResume(resume_filename, (jsonData) => {
      document.getElementById("resume_filename").innerHTML = resume_filename;
      document.getElementById("resume_title").innerHTML = selectedOption.options[selectedOption.selectedIndex].text;
      document.getElementById("resume_description").innerHTML = jsonData.description;
      document.getElementById("resume_lastupdate").innerHTML = jsonData.last_update;
    });
  }
}

export const resumeSelection = new ResumeSelection();
