# Random Joke Generator

A small web app that fetches jokes from the JokeAPI and displays a random one.

## Features

- Random joke generation
- Category filter (Programming, Misc, Dark, Pun, Spooky, Christmas, Any)
- Copy joke to clipboard
- Share joke via native share API if available
- Responsive design

## Run locally

Because this is a static app, you can launch it by serving the folder locally.

### Option 1: Directly open the file
Open `index.html` in a browser.

### Option 2: Local server
```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## API used

- https://v2.jokeapi.dev/

## Files

- `index.html` — UI structure
- `styles.css` — styling
- `app.js` — API fetch and interaction logic
