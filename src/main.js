import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { resumeSelection } from "./js/selection.js";
import { resumeGenerator } from "./js/resume.js";

resumeGenerator.initPage();

// *****
// const sendButton = document.querySelector('button')
// sendButton.addEventListener('click', sendMessage)
// OR line below :
window.resumeSelection = resumeSelection;
