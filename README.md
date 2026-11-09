# WildlifeWise Frontend

This package contains the frontend portion for the AI-Based Wildlife Learning Assistant.

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

If your teammate uses different route function names, update the `url_for()` calls in the templates to match.

## Integration notes
1. Copy `templates/` and `static/` into the shared Flask project root. Do not replace your teammate's `app.py`.
2. The animal directory currently contains sample cards so the UI works before the JSON API is ready. Replace these cards with Jinja loops over the animal dataset/API when the backend is ready.
3. The chatbot currently displays clearly-labelled demonstration responses. In `static/js/script.js`, find `handleChatSubmit()` and replace the demo answer with a `fetch()` call to the agreed Flask endpoint. Example request body is `{question: text}`; align it with your teammate's API contract.
4. The animal modal facts are sample educational summaries. Use the verified dataset as the source of truth before final submission.
5. Images are loaded from remote Unsplash image URLs in CSS, so the page needs an internet connection for those photos. For offline demo, download appropriately licensed images into `static/images/` and change the CSS backgrounds to local paths.
6. The `photo-wolf` image URL is intentionally a gradient fallback if the remote image fails; replace with a verified wolf photo URL or local asset before the demo.
7. The UI does not claim to provide professional wildlife identification or scientific advice.
