# Vibrant Todo

A small single-page todo app with vibrant colors, localStorage persistence, and handy features.

Files:
- `index.html` — app entry
- `styles.css` — styling (responsive + colourful)
- `app.js` — functionality (add/edit/delete/complete/filters/localStorage)

How to run:
1. Open `index.html` in your browser, or run a quick local server in the project folder. For example (PowerShell):

```powershell
# from the project folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Features:
- Add tasks via the input or the Add button
- Edit tasks inline
- Mark tasks complete/uncomplete
- Filter by All / Active / Completed
- Clear completed tasks
- Data saved in localStorage (auto-loaded)

Next steps / suggestions:
- Add due dates & reminders
- Add categories / colors per task
- Sync with a backend or a cloud store

License: MIT
