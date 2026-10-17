# TERMINAL RUSH

A fast-paced typing arcade game with a cyberpunk terminal aesthetic. Race against a 60-second clock to type terminal commands as quickly and accurately as you can.

![Terminal Rush](https://img.shields.io/badge/status-playable-brightgreen) ![No Dependencies](https://img.shields.io/badge/dependencies-none-blue) ![Vanilla JS](https://img.shields.io/badge/tech-HTML%20%2B%20CSS%20%2B%20JS-orange)

---

## Features

- **60-second timed runs** — type as many commands as you can before the clock runs out.
- **Three difficulty levels** — Easy (basic commands), Normal (intermediate tooling), Hard (complex one-liners and code snippets).
- **120+ curated commands** — Linux utilities, Git workflows, Docker, Kubernetes, SQL, JavaScript snippets, and more.
- **Real-time visual feedback** — each character lights up green (correct) or red (incorrect) as you type.
- **Combo system** — chain correct submissions for a score multiplier (up to 3×).
- **Speed bonus** — submit lines quickly for extra points.
- **Live stats** — score, WPM, accuracy, combo, and lines completed update in real time.
- **Personal bests** — your best score and WPM are saved locally in the browser via `localStorage`.
- **Premium dark terminal aesthetic** — scanline overlay, neon green accents, monospace typography.
- **Fully responsive** — works on desktop and mobile screens.
- **Zero dependencies** — no frameworks, no build tools, no server required.

## Controls

| Key | Action |
|-----|--------|
| Type normally | Match the displayed command |
| `Enter` | Submit the current line |
| `Backspace` | Edit your input before submitting |
| `Esc` | Abort the current run (with confirmation) or return to menu |

## Scoring

| Component | Details |
|-----------|---------|
| **Base points** | 10 points per correctly typed character |
| **Speed bonus** | Up to 50 bonus points for submitting within 4 seconds |
| **Combo multiplier** | 1× base + 0.25× per consecutive correct submission (max 3×) |
| **Incorrect submission** | 2 points per correct character, no speed bonus, combo resets |
| **WPM** | (Correctly typed characters ÷ 5) ÷ elapsed minutes |
| **Accuracy** | Correct characters across all attempts ÷ total characters typed |

## Project Structure

```
Terminal-Rush/
├── index.html    # Game page — open this to play
├── style.css     # Dark terminal aesthetic styles
├── script.js     # Game logic, scoring, state management
└── README.md     # This file
```

## Running Locally

1. Clone or download this repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. That's it — no install, no build step, no server required.

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/Terminal-Rush.git
cd Terminal-Rush

# Open in browser (macOS)
open index.html

# Open in browser (Windows)
start index.html

# Open in browser (Linux)
xdg-open index.html
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g. `main`) and folder (`/ (root)`).
4. Click **Save**. Your game will be live at `https://YOUR_USERNAME.github.io/Terminal-Rush/` within a minute.

## Browser Support

Any modern browser with ES6 support:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Data Storage

Personal best scores are stored in your browser's `localStorage`. No data is sent to any server. Clearing your browser data will reset your personal bests.

## License

MIT — feel free to fork, modify, and share.
