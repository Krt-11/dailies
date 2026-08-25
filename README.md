# Dailies

A collection of small standalone projects hosted together with GitHub Pages.

## Structure

```text
dailies/
├── index.html
├── .nojekyll
├── apartments/
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── README.md
└── hawaii/
    └── index.html
```

The root `index.html` is the Dailies home page. Each project has its own `index.html`, so GitHub Pages can route directly to:

- `/apartments/`
- `/hawaii/`

## Adding a new project

1. Create a new folder inside `dailies`, such as `dailies/my-project/`.
2. Put that project's `index.html` and any CSS/JS/assets inside the folder.
3. Add a card/link for the project in the root `index.html`.
4. Commit and push.

Because the links are relative (`./project-name/`), this also works when `dailies` is itself hosted under another repository path.
