# TERMINAL RUSH ⚡

A fast-paced typing arcade game with a cyberpunk terminal aesthetic. Race against a 60-second clock to type command-line utilities, queries, and snippets as quickly and accurately as possible.

🔗 **Play Live:** [https://skanda-sh.github.io/terminal-rush/](https://skanda-sh.github.io/terminal-rush/)

---

## ✨ Features

- **60-Second Timed Runs:** Rapid-fire rounds testing speed and typing precision under time pressure.
- **Three Difficulty Levels:** Easy (basic shell tools), Normal (intermediate dev tools), and Hard (complex shell one-liners and syntax).
- **120+ Curated Commands:** Real-world commands spanning Linux utilities, Git workflows, Docker, Kubernetes, SQL, and JavaScript.
- **Real-Time Visual Feedback:** Character-level syntax validation with green/red visual indicators.
- **Combo & Multiplier Engine:** Chain consecutive correct submissions to build score multipliers up to 3×.
- **Live Performance Metrics:** Instant computation of WPM (Words Per Minute), accuracy percentages, combo streaks, and line counts.
- **Local Persistence:** High scores and personal bests saved across sessions using browser `localStorage`.
- **Zero Dependencies:** Pure vanilla HTML5, CSS3, and modern ES6 JavaScript—no build tools or external frameworks required.

---

## 🎮 Controls

| Key | Action |
| :--- | :--- |
| **Type normally** | Match the displayed terminal command |
| **Enter** | Submit the current command line |
| **Backspace** | Edit input before submitting |
| **Esc** | Abort current run or return to menu |

---

## 🧮 Scoring System

| Component | Calculation & Details |
| :--- | :--- |
| **Base Points** | 10 points per correctly typed character |
| **Speed Bonus** | Up to 50 bonus points for submitting within 4 seconds |
| **Combo Multiplier** | 1× base + 0.25× per consecutive correct entry (capped at 3×) |
| **Incorrect Entry** | 2 points per correct character, combo resets, zero speed bonus |
| **WPM** | `(Correct Characters ÷ 5) ÷ Elapsed Minutes` |
| **Accuracy** | `(Correct Characters Typed ÷ Total Keystrokes) × 100%` |

---

## 📂 Project Structure

```text
terminal-rush/
├── index.html    # Semantic game view & DOM structure
├── style.css     # Terminal styling, scanlines & neon accents
├── script.js     # State machine, timing loops, scoring & localStorage
└── README.md     # Documentation
```

---

## 💻 Running Locally

Clone the repository and launch directly in any browser:

```bash
# Clone the repository
git clone [https://github.com/skanda-sh/terminal-rush.git](https://github.com/skanda-sh/terminal-rush.git)
cd terminal-rush

# Open in browser (Windows PowerShell)
start index.html

# Open in browser (Linux)
xdg-open index.html
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
