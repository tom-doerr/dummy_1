# Task Manager

A simple client-side task manager web application. Tasks are stored in your browser using `localStorage`.

The app now supports priority levels `1-9`, comma separated tags and basic time tracking for each task. Tasks are automatically sorted by priority and high/low priority items are visually highlighted. An optional on-device language model integration (see `public/llm.js`) can parse natural language commands to add or edit tasks.

## Setup

Run the provided environment setup script which installs dependencies:

```bash
./setup_env.sh
```

## Running

```bash
npm start
```

The app will be available at [http://localhost:8080](http://localhost:8080).

## Local Hosting

Running `npm start` serves the static files from `public/` so you can test the
app locally at `http://localhost:8080`.

## Deploying online

You can publish the project for free using **GitHub Pages**. A workflow file
(`.github/workflows/pages.yml`) deploys the contents of the `public/` directory
whenever you push to the `main` branch.

To enable Pages deployment:

1. Enable GitHub Pages in the repository settings and choose "GitHub Actions" as
   the source.
2. Push to `main` and the site will be built and published automatically at a
   URL like `https://<user>.github.io/<repo>/`.

## GitHub deployment workflow

The Pages workflow installs dependencies, runs tests and uploads the `public/`
folder. Each successful run publishes an updated version of the site.

## Testing

```bash
npm test
```

