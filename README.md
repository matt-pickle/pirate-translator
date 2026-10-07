# Pirate Translator

Type something in plain English and get it back in pirate speak.

Pirate Translator is a small single-page app with one job. You write up to 200 characters on a parchment scroll, press **Translate**, and the pirate version appears in the panel below. The translation itself comes from the [Pirate Monkeyness](https://pirate.monkeyness.com) translator API; the app is the front end around it. It works on desktop and on your phone.

## Features

- **Translate on demand.** Your text is sent to the pirate API when you press Translate, and the result replaces whatever was shown before.
- **A scroll you can type on.** The input is a transparent text area laid over a parchment image, so the words appear to be written on the scroll itself. Longer text scrolls inside it with a thin scrollbar styled to match.
- **Fits your screen.** The layout is a CSS grid that keeps the scroll at the top of the page and the translation panel at the bottom at any size. On narrow screens the text gets smaller and the background image is repositioned.
- **Hover that behaves on touch screens.** The Translate button highlights when you hover with a mouse. On a touch screen it highlights only while your finger is down, so it never gets stuck in the hovered state after a tap.
- **Tells you when it can't translate.** If the request fails or the API can't be reached, the app shows an error in place of the translation. Pressing Translate with nothing typed does nothing.

## Built with

- [React 16](https://react.dev) function components and the `useState` hook
- [Create React App](https://create-react-app.dev) (`react-scripts` 5) for the build, dev server, and Jest test runner
- Plain CSS with Grid and media queries, with no UI library
- The browser's `fetch` API to call the [Pirate Monkeyness](https://pirate.monkeyness.com/api.html) translator API
- Hosted on [Netlify](https://www.netlify.com)
- [Quintessential](https://fonts.google.com/specimen/Quintessential) from Google Fonts for the handwriting on the scroll

## Architecture

The app is a React single-page app that Create React App builds into static files. It has no server code of its own and needs no API key. The Pirate Monkeyness API doesn't send the CORS headers a browser needs to call it from another site, so the app requests `/api/translate` on its own origin and a proxy forwards that to `pirate.monkeyness.com`. In development the proxy is the `proxy` setting in `package.json`; on the live site it is a rewrite rule in `netlify.toml`.

`App` owns the only two pieces of state: the text you typed and the translation that came back. It passes the text and its change handler down to `InputBox`, which makes the text area a controlled input, and passes the translation down to `OutputBox`, which only displays it. Pressing Translate runs `handleSubmit` in `App`, which makes one `GET` request with the URL-encoded text in the query string and stores the plain-text response.

```
pirate-translator/
├── package.json             Dependencies, the start, build, and test scripts, and the
│                            development proxy to the translator API
├── netlify.toml             Netlify build settings and the rule that forwards /api/*
│                            to the translator API
│
├── public/
│   ├── index.html           HTML shell the app mounts into; loads the Quintessential font
│   ├── scroll-small.png     Parchment scroll behind the text area
│   └── favicon.png          Browser tab icon
│
└── src/
    ├── index.js             Mounts App and imports the stylesheet
    ├── App.test.js          Smoke test: App renders without crashing
    │
    ├── components/
    │   ├── App.js           Holds the input text and the translation, calls the API,
    │   │                    and shows the credits
    │   ├── InputBox.js      The scroll: parchment image, text area, and Translate button
    │   ├── OutputBox.js     Panel that displays the translation or the error message
    │   └── Button.js        Button with the mouse and touch hover handling
    │
    ├── styles/
    │   └── styles.css       All styling: the page grid, the scroll overlay, the output
    │                        panel, and the breakpoints
    │
    └── images/
        └── background.jpg   Full-page beach scene with the pirate
```

## Credits

- Parchment scroll by Brgfx on [Freepik](https://www.freepik.com)
- Background image by upklyak on [Freepik](https://www.freepik.com/vectors/tree)
- Translations by [Pirate Monkeyness](https://pirate.monkeyness.com) by Tim Moses, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
