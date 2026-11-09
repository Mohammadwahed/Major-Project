# WildlifeWise Frontend

## Included
- `templates/`: Home, animal directory, chatbot, about, quiz and conservation pages.
- `static/css/style.css`: Responsive visual design.
- `static/js/script.js`: Mobile navigation, animal search/filter/modal, demo chatbot UI, and interactive quiz.

## Flask route names expected
The templates use Flask `url_for()` and expect these endpoint names:
- `home` -> `/`
- `animals` -> `/animals`
- `chatbot` -> `/chatbot`
- `quiz` -> `/quiz`
- `conservation` -> `/conservation`
- `about` -> `/about`

