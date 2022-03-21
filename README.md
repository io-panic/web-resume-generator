# resume-cv

Create your CV using a JSON file

# Vite + Bootstrap 5 + Nunjucks

Use a vanillaJS project with Vite to create a small app

# Why ?

Because you are a programmer you need to use something else than Word for your resume and here, you got it. This project use a simple JSON file for the data (inspired from https://jsonresume.org/). Javascript library "nunjucks" (https://mozilla.github.io/nunjucks/) for the template style and then the layout is based on bootstrap (https://getbootstrap.com/docs/5.0/getting-started/introduction/).

Still some work should be done, but you can start with that exemple to create the coolest resume.

The file "script.js" contains the default language that is used ('en'), you need to copy this part to create your resume in another language (eg; copy all the 'en' section to create an 'es' section). When you access the index.html, you will need to provide this new language; index.html?lang=es

If you add another language, don't forget to also add the required data in the folder locales/

# NOTE:

This project has been created only as a quick way to create a simple resume and not as a 'professionnal' software
