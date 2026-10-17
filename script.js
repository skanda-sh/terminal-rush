/* ===================================================
   TERMINAL RUSH — Game Logic
   Vanilla JS · No dependencies · No frameworks
   =================================================== */

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // Command pools by difficulty
  // ──────────────────────────────────────────────

  const COMMANDS = {
    easy: [
      'ls -la',
      'cd /home/user',
      'pwd',
      'cat README.md',
      'mkdir project',
      'rm -rf node_modules',
      'cp file.txt backup/',
      'mv old.js new.js',
      'echo "hello world"',
      'touch index.html',
      'clear',
      'whoami',
      'date +%Y-%m-%d',
      'head -n 10 log.txt',
      'tail -f server.log',
      'wc -l script.js',
      'chmod 755 deploy.sh',
      'ping localhost',
      'curl localhost:3000',
      'npm start',
      'git status',
      'git add .',
      'git commit -m "init"',
      'git push origin main',
      'git log --oneline',
      'git diff HEAD',
      'python3 app.py',
      'node server.js',
      'exit 0',
      'history | tail',
      'df -h',
      'free -m',
      'top -n 1',
      'ps aux | head',
      'kill -9 1234',
      'sudo reboot',
      'ssh user@host',
      'scp file.tar remote:/',
      'tar -xzf archive.tar.gz',
      'unzip package.zip',
    ],

    normal: [
      'grep -rn "TODO" src/',
      'find . -name "*.js" -type f',
      'awk \'{print $1}\' access.log',
      'sed -i "s/old/new/g" config.yml',
      'docker run -d -p 8080:80 nginx',
      'docker-compose up --build',
      'kubectl get pods -n production',
      'git rebase -i HEAD~3',
      'git stash pop',
      'git cherry-pick a1b2c3d',
      'npm install --save-dev eslint',
      'npx create-react-app ./myapp',
      'curl -X POST -H "Content-Type: application/json"',
      'ssh-keygen -t ed25519 -C "user@mail.com"',
      'openssl req -x509 -newkey rsa:4096',
      'rsync -avz src/ backup/src/',
      'ln -s /opt/bin/tool /usr/local/bin/tool',
      'crontab -e',
      'journalctl -u nginx --since today',
      'systemctl restart postgresql',
      'pg_dump -U admin mydb > dump.sql',
      'redis-cli SET session:token "abc123"',
      'python3 -m venv .venv && source .venv/bin/activate',
      'pip install -r requirements.txt',
      'export NODE_ENV=production',
      'env | grep PATH',
      'xargs -I {} cp {} /backup/',
      'sort -u names.txt | head -20',
      'diff --color src/old.js src/new.js',
      'watch -n 5 "df -h"',
      'netstat -tlnp | grep :443',
      'lsof -i :8080',
      'strace -p 42 -e trace=network',
      'chmod -R 644 public/',
      'chown www-data:www-data /var/www',
      'mount /dev/sdb1 /mnt/data',
      'tmux new -s dev',
      'screen -r session_name',
      'alias ll="ls -alF --color=auto"',
      'cat /etc/hosts | grep local',
    ],

    hard: [
      'awk \'BEGIN{FS=","} NR>1{sum+=$3} END{print sum/NR}\' data.csv',
      'find /var/log -mtime +30 -name "*.gz" -exec rm {} \\;',
      'docker exec -it $(docker ps -q --filter name=api) /bin/sh',
      'kubectl apply -f deployment.yaml --namespace=staging',
      'git log --graph --abbrev-commit --pretty=format:"%h %s (%cr)"',
      'openssl s_client -connect example.com:443 -servername example.com',
      'ssh -L 5432:db.internal:5432 -N bastion@jump.host.io',
      'tar -czf - /etc/nginx | ssh remote "cat > nginx_backup.tar.gz"',
      'curl -s https://api.github.com/repos/owner/repo | jq ".stargazers_count"',
      'for f in *.log; do gzip -9 "$f" && echo "compressed $f"; done',
      'while IFS= read -r line; do echo "${line^^}"; done < input.txt',
      'grep -Pzo "(?s)function\\s+\\w+\\(.*?\\)" src/*.js',
      'sed -E "s/([0-9]{4})-([0-9]{2})/\\2\\/\\1/g" dates.csv',
      'iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
      'certbot certonly --nginx -d example.com -d www.example.com',
      'pg_restore -U admin -d mydb --clean --if-exists dump.tar',
      'ansible-playbook -i inventory.ini deploy.yml --tags="app,db"',
      'terraform plan -var-file="prod.tfvars" -out=plan.bin',
      'SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;',
      'const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };',
      'Object.entries(config).filter(([k, v]) => v !== null).reduce((a, [k, v]) => ({...a, [k]: v}), {})',
      'Promise.allSettled(urls.map(u => fetch(u).then(r => r.json())))',
      'Array.from({length: 10}, (_, i) => ({ id: i, value: Math.random().toFixed(4) }))',
      'rsync -avz --delete --exclude=".git" --exclude="node_modules" src/ prod:~/app/',
      'ffmpeg -i input.mp4 -vf "scale=1280:-2" -crf 23 -preset slow output.mp4',
      'jq \'[.[] | select(.status == "active") | {name, email}]\' users.json',
      'xargs -P 4 -I {} sh -c \'curl -sL "{}" -o "$(basename {})"\'',
      'awk \'/^ERROR/{count++} END{printf "Errors: %d\\n", count}\' /var/log/app.log',
      'python3 -c "import json, sys; print(json.dumps(json.load(sys.stdin), indent=2))"',
      'git bisect start HEAD v2.0 -- src/core.js',
      'socat TCP-LISTEN:8080,fork TCP:internal.service:80',
      'dd if=/dev/urandom of=test.bin bs=1M count=100 status=progress',
      'trap \'echo "caught SIGTERM"; cleanup; exit 0\' SIGTERM',
      'inotifywait -m -r -e modify,create ./src | while read path action file; do echo "$action: $file"; done',
      'perf stat -e cache-misses,cache-references ./benchmark',
      'strace -f -e trace=open,read,write -p $(pgrep -f "node app")',
      'vault kv put secret/api-keys stripe="sk_live_abc123" github="ghp_xyz789"',
      'helm upgrade --install myapp ./chart -f values-prod.yaml --atomic --timeout=300s',
      'make -j$(nproc) CFLAGS="-O2 -Wall -Werror" && make install PREFIX=/usr/local',
      'nmap -sV -sC -p 22,80,443,8080 --script=vuln target.example.com',
    ],
  };

  // ──────────────────────────────────────────────
  // Constants
  // ──────────────────────────────────────────────

  const GAME_DURATION = 60; // seconds
  const POINTS_PER_CHAR = 10;
  const POINTS_PER_CHAR_WRONG = 2;
  const SPEED_BONUS_MAX = 50;
  const SPEED_BONUS_WINDOW = 4000; // ms — full bonus if submitted within this
  const COMBO_MULTIPLIER_STEP = 0.25;
  const COMBO_MULTIPLIER_CAP = 3;
  const LS_KEY_SCORE = 'tr_best_score';
  const LS_KEY_WPM = 'tr_best_wpm';

  // ──────────────────────────────────────────────
  // DOM references
  // ──────────────────────────────────────────────

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    welcome: $('#welcome-screen'),
    game: $('#game-screen'),
    results: $('#results-screen'),
  };

  const els = {
    // Welcome
    startBtn: $('#start-btn'),
    diffBtns: $$('.diff-btn'),
    pbScore: $('#pb-score'),
    pbWpm: $('#pb-wpm'),
    // Game
    statTime: $('#stat-time'),
    statScore: $('#stat-score'),
    statWpm: $('#stat-wpm'),
    statAccuracy: $('#stat-accuracy'),
    statLines: $('#stat-lines'),
    statCombo: $('#stat-combo'),
    targetText: $('#target-text'),
    gameInput: $('#game-input'),
    submitBtn: $('#submit-btn'),
    feedback: $('#feedback'),
    // Results
    resScore: $('#res-score'),
    resWpm: $('#res-wpm'),
    resAccuracy: $('#res-accuracy'),
    resLines: $('#res-lines'),
    resCombo: $('#res-combo'),
    resScoreBest: $('#res-score-best'),
    resWpmBest: $('#res-wpm-best'),
    playAgainBtn: $('#play-again-btn'),
    menuBtn: $('#menu-btn'),
    // Modal
    confirmModal: $('#confirm-modal'),
    modalCancel: $('#modal-cancel'),
    modalConfirm: $('#modal-confirm'),
  };

  // ──────────────────────────────────────────────
  // Game state
  // ──────────────────────────────────────────────

  let state = 'welcome'; // 'welcome' | 'playing' | 'results'
  let difficulty = 'normal';
  let timerInterval = null;
  let timeRemaining = GAME_DURATION;
  let startTimestamp = 0; // ms when run began
  let lineStartTimestamp = 0; // ms when current line appeared
  let currentTarget = '';
  let usedIndices = [];

  // Scoring
  let score = 0;
  let combo = 0;
  let bestCombo = 0;
  let linesCompleted = 0;
  let correctCharsTotal = 0; // characters from correct submissions
  let totalCharsAttempted = 0; // total characters typed across all submissions
  let correctCharsAttempted = 0; // correct chars across all submissions

  // Personal bests
  let bestScore = loadNumber(LS_KEY_SCORE);
  let bestWpm = loadNumber(LS_KEY_WPM);

  // ──────────────────────────────────────────────
  // Utility helpers
  // ──────────────────────────────────────────────

  /** Safely load a number from localStorage. Returns 0 on any failure. */
  function loadNumber(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return 0;
      const n = Number(raw);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    } catch {
      return 0;
    }
  }

  /** Safely save a number to localStorage. */
  function saveNumber(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Storage full or blocked — silently ignore
    }
  }

  /** Pick a random command from the current difficulty pool without immediate repeats. */
  function pickCommand() {
    const pool = COMMANDS[difficulty];
    if (usedIndices.length >= pool.length) {
      usedIndices = [];
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (usedIndices.includes(idx));
    usedIndices.push(idx);
    return pool[idx];
  }

  /** Escape HTML entities for safe rendering. */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ──────────────────────────────────────────────
  // Screen management
  // ──────────────────────────────────────────────

  function showScreen(name) {
    for (const key in screens) {
      screens[key].classList.toggle('active', key === name);
    }
    // Map screen names to game states
    const stateMap = { welcome: 'welcome', game: 'playing', results: 'results' };
    state = stateMap[name] || name;
  }

  // ──────────────────────────────────────────────
  // Welcome screen
  // ──────────────────────────────────────────────

  function refreshPersonalBests() {
    bestScore = loadNumber(LS_KEY_SCORE);
    bestWpm = loadNumber(LS_KEY_WPM);
    els.pbScore.textContent = bestScore > 0 ? bestScore.toLocaleString() : '—';
    els.pbWpm.textContent = bestWpm > 0 ? bestWpm : '—';
  }

  function initWelcome() {
    refreshPersonalBests();
    showScreen('welcome');
  }

  // Difficulty buttons
  els.diffBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      els.diffBtns.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      difficulty = btn.dataset.diff;
    });
  });

  // Start button
  els.startBtn.addEventListener('click', startRun);

  // ──────────────────────────────────────────────
  // Start a run
  // ──────────────────────────────────────────────

  function startRun() {
    if (state === 'playing') return; // prevent double-start

    // Reset state
    score = 0;
    combo = 0;
    bestCombo = 0;
    linesCompleted = 0;
    correctCharsTotal = 0;
    totalCharsAttempted = 0;
    correctCharsAttempted = 0;
    timeRemaining = GAME_DURATION;
    usedIndices = [];

    showScreen('game');
    updateStats();

    // Set first target
    nextTarget();

    // Focus input
    els.gameInput.disabled = false;
    els.gameInput.value = '';
    els.gameInput.focus();
    clearFeedback();

    // Start timer
    startTimestamp = Date.now();
    timerInterval = setInterval(tick, 1000);
  }

  // ──────────────────────────────────────────────
  // Timer
  // ──────────────────────────────────────────────

  function tick() {
    timeRemaining--;
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      endRun();
    }
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    els.statTime.textContent = timeRemaining;
    els.statTime.classList.remove('warning', 'danger');
    if (timeRemaining <= 5) {
      els.statTime.classList.add('danger');
    } else if (timeRemaining <= 15) {
      els.statTime.classList.add('warning');
    }
  }

  // ──────────────────────────────────────────────
  // Target rendering
  // ──────────────────────────────────────────────

  function nextTarget() {
    currentTarget = pickCommand();
    lineStartTimestamp = Date.now();
    renderTarget('');
  }

  /** Render the target with per-character colour coding based on input so far. */
  function renderTarget(inputValue) {
    let html = '';
    for (let i = 0; i < currentTarget.length; i++) {
      const ch = escapeHTML(currentTarget[i]);
      if (i < inputValue.length) {
        const isCorrect = inputValue[i] === currentTarget[i];
        const cls = isCorrect ? 'correct' : 'incorrect';
        html += `<span class="char ${cls}">${ch}</span>`;
      } else if (i === inputValue.length) {
        html += `<span class="char pending cursor">${ch}</span>`;
      } else {
        html += `<span class="char pending">${ch}</span>`;
      }
    }
    els.targetText.innerHTML = html;
  }

  // ──────────────────────────────────────────────
  // Input handling
  // ──────────────────────────────────────────────

  els.gameInput.addEventListener('input', () => {
    if (state !== 'playing') return;
    renderTarget(els.gameInput.value);
  });

  els.gameInput.addEventListener('keydown', (e) => {
    if (state !== 'playing') return;
    if (e.key === 'Enter') {
      e.preventDefault();
      submitLine();
    }
  });

  // Prevent form submission (no form, but belt-and-suspenders)
  els.gameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  els.submitBtn.addEventListener('click', () => {
    if (state !== 'playing') return;
    submitLine();
  });

  // Keep focus on the input during gameplay
  document.addEventListener('click', () => {
    if (state === 'playing' && !els.confirmModal.classList.contains('active')) {
      els.gameInput.focus();
    }
  });

  // ──────────────────────────────────────────────
  // Submission & scoring
  // ──────────────────────────────────────────────

  function submitLine() {
    if (state !== 'playing') return;

    const input = els.gameInput.value;
    if (input.length === 0) {
      showFeedback('Type something first!', 'incorrect');
      return;
    }

    // Count correct chars in this attempt
    let correctInAttempt = 0;
    for (let i = 0; i < Math.min(input.length, currentTarget.length); i++) {
      if (input[i] === currentTarget[i]) correctInAttempt++;
    }

    totalCharsAttempted += input.length;
    correctCharsAttempted += correctInAttempt;

    const isExactMatch = input === currentTarget;

    if (isExactMatch) {
      // ── Correct submission ──
      correctCharsTotal += currentTarget.length;
      combo++;
      if (combo > bestCombo) bestCombo = combo;
      linesCompleted++;

      // Speed bonus
      const elapsed = Date.now() - lineStartTimestamp;
      const speedRatio = Math.max(0, 1 - elapsed / SPEED_BONUS_WINDOW);
      const speedBonus = Math.round(SPEED_BONUS_MAX * speedRatio);

      // Combo multiplier
      const multiplier = Math.min(1 + combo * COMBO_MULTIPLIER_STEP, COMBO_MULTIPLIER_CAP);

      const linePoints = Math.round((currentTarget.length * POINTS_PER_CHAR + speedBonus) * multiplier);
      score += linePoints;

      let fb = `+${linePoints} pts`;
      if (speedBonus > 0) fb += ` (speed +${speedBonus})`;
      if (combo > 1) fb += ` · ${combo}x combo`;
      showFeedback(fb, 'correct');

    } else {
      // ── Incorrect submission ──
      const partialPoints = correctInAttempt * POINTS_PER_CHAR_WRONG;
      score += partialPoints;
      combo = 0;

      showFeedback(partialPoints > 0 ? `Incorrect — +${partialPoints} pts partial` : 'Incorrect — no points', 'incorrect');
    }

    // Advance to next target
    els.gameInput.value = '';
    nextTarget();
    updateStats();
    els.gameInput.focus();
  }

  // ──────────────────────────────────────────────
  // Live stats
  // ──────────────────────────────────────────────

  function updateStats() {
    els.statScore.textContent = score.toLocaleString();
    els.statLines.textContent = linesCompleted;
    els.statCombo.textContent = combo + 'x';
    updateTimerDisplay();

    // WPM: (correct chars / 5) / elapsed minutes
    const elapsedMs = Date.now() - startTimestamp;
    const elapsedMin = elapsedMs / 60000;
    const wpm = elapsedMin > 0 ? Math.round((correctCharsTotal / 5) / elapsedMin) : 0;
    els.statWpm.textContent = Number.isFinite(wpm) ? wpm : 0;

    // Accuracy
    const acc = totalCharsAttempted > 0
      ? Math.round((correctCharsAttempted / totalCharsAttempted) * 100)
      : 100;
    els.statAccuracy.textContent = (Number.isFinite(acc) ? acc : 100) + '%';
  }

  // ──────────────────────────────────────────────
  // Feedback
  // ──────────────────────────────────────────────

  function showFeedback(msg, cls) {
    els.feedback.textContent = msg;
    els.feedback.className = 'feedback ' + cls;
  }

  function clearFeedback() {
    els.feedback.textContent = '';
    els.feedback.className = 'feedback';
  }

  // ──────────────────────────────────────────────
  // End run
  // ──────────────────────────────────────────────

  function endRun() {
    clearInterval(timerInterval);
    timerInterval = null;
    state = 'results'; // block further input immediately

    els.gameInput.disabled = true;
    els.submitBtn.disabled = true;

    // Final WPM calc using full 60s
    const elapsedMin = GAME_DURATION / 60;
    const finalWpm = elapsedMin > 0 ? Math.round((correctCharsTotal / 5) / elapsedMin) : 0;
    const safeWpm = Number.isFinite(finalWpm) ? finalWpm : 0;

    // Final accuracy
    const finalAcc = totalCharsAttempted > 0
      ? Math.round((correctCharsAttempted / totalCharsAttempted) * 100)
      : 100;
    const safeAcc = Number.isFinite(finalAcc) ? finalAcc : 100;

    // Check personal bests
    let isNewBestScore = false;
    let isNewBestWpm = false;

    if (score > bestScore) {
      bestScore = score;
      saveNumber(LS_KEY_SCORE, bestScore);
      isNewBestScore = true;
    }
    if (safeWpm > bestWpm) {
      bestWpm = safeWpm;
      saveNumber(LS_KEY_WPM, bestWpm);
      isNewBestWpm = true;
    }

    // Populate results
    els.resScore.textContent = score.toLocaleString();
    els.resWpm.textContent = safeWpm;
    els.resAccuracy.textContent = safeAcc + '%';
    els.resLines.textContent = linesCompleted;
    els.resCombo.textContent = bestCombo + 'x';

    els.resScoreBest.hidden = !isNewBestScore;
    els.resWpmBest.hidden = !isNewBestWpm;

    // Re-enable submit btn for next round
    els.submitBtn.disabled = false;

    showScreen('results');
  }

  // ──────────────────────────────────────────────
  // Results actions
  // ──────────────────────────────────────────────

  els.playAgainBtn.addEventListener('click', () => {
    startRun();
  });

  els.menuBtn.addEventListener('click', () => {
    initWelcome();
  });

  // ──────────────────────────────────────────────
  // Abort / Escape handling
  // ──────────────────────────────────────────────

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();

      // If modal is open, close it (cancel)
      if (els.confirmModal.classList.contains('active')) {
        closeModal();
        els.gameInput.focus();
        return;
      }

      if (state === 'playing') {
        openModal();
      } else if (state === 'results') {
        initWelcome();
      }
    }
  });

  function openModal() {
    els.confirmModal.classList.add('active');
    els.modalCancel.focus();
  }

  function closeModal() {
    els.confirmModal.classList.remove('active');
  }

  els.modalCancel.addEventListener('click', () => {
    closeModal();
    els.gameInput.focus();
  });

  els.modalConfirm.addEventListener('click', () => {
    closeModal();
    abortRun();
  });

  function abortRun() {
    clearInterval(timerInterval);
    timerInterval = null;
    els.gameInput.disabled = true;
    initWelcome();
  }

  // ──────────────────────────────────────────────
  // Initialise
  // ──────────────────────────────────────────────

  initWelcome();

})();
