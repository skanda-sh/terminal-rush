/* =============================================================================
   TERMINAL RUSH ⚡ // Core Game Engine v2.3
   Features: Mid-run Lockout, Menu Return, Shuffle Queue, Debrief Actions
   ============================================================================= */

// --- 1. SYNTHESIZED 8-BIT AUDIO ENGINE ---
class SoundFxEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playKey() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.14);
  }

  playCombo() {
    if (!this.enabled) return;
    this.init();
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + (idx * 0.04);
      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.08);
    });
  }

  playTick(pitch = 800) {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playGameOver() {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }
}

const sfx = new SoundFxEngine();

// --- 2. COMMAND DATABASE ---
const COMMAND_DATABASE = {
  linux: {
    easy: [
      { cmd: "ls -la", out: "drwxr-xr-x 5 runner staff 160B .  -rw-r--r-- 1 runner staff 2.4KB config.json" },
      { cmd: "pwd", out: "/home/runner/production/service" },
      { cmd: "cat /etc/os-release", out: "PRETTY_NAME=\"Ubuntu 24.04 LTS\" NAME=\"Ubuntu\" VERSION_ID=\"24.04\"" },
      { cmd: "whoami", out: "root@production-edge-01" },
      { cmd: "mkdir -p src/controllers", out: "Created directory hierarchy: 'src/controllers'" },
      { cmd: "uptime", out: "17:28:10 up 42 days, 3 users, load average: 0.14, 0.22, 0.18" },
      { cmd: "touch .env.local", out: "Created empty file .env.local" },
      { cmd: "clear", out: "Terminal buffer flushed." },
      { cmd: "df -h", out: "Filesystem     Size  Used Avail Use% Mounted on\n/dev/sda1       50G   14G   34G  30% /" }
    ],
    normal: [
      { cmd: "systemctl status nginx", out: "● nginx.service - Active: active (running) since Wed 10:14:22 UTC" },
      { cmd: "grep -rnw './logs' -e 'ERROR'", out: "logs/app.log:412: [ERROR] Connection pool timeout after 5000ms" },
      { cmd: "chmod -R 755 /var/www/html", out: "Applied recursive permissions (755) to /var/www/html" },
      { cmd: "tar -czvf backup.tar.gz ./data", out: "a ./data\na ./data/prod.db\nBackup archived successfully." },
      { cmd: "journalctl -u api --lines=5", out: "Oct 29 17:20:01 node-01 api[9012]: Handling incoming request /v1/tokens" },
      { cmd: "curl -I https://api.dev/v1/health", out: "HTTP/2 200 OK\ncontent-type: application/json\nx-cache: HIT" },
      { cmd: "tail -f /var/log/syslog", out: "systemd[1]: Started Daily apt upgrade and clean activities." },
      { cmd: "sed -i 's/DEBUG=True/DEBUG=False/' .env", out: "Configuration patched for production environment." }
    ],
    hard: [
      { cmd: "find . -type f -name '*.log' -delete", out: "Scanned and purged 18 stale runtime log files." },
      { cmd: "netstat -tulnp | grep :8080", out: "tcp   0   0 0.0.0.0:8080   0.0.0.0:*   LISTEN   4102/node" },
      { cmd: "ps aux --sort=-%mem | head -n 5", out: "USER  PID  %CPU %MEM  COMMAND\nroot  892  2.1  14.2  python3 -m app.main" },
      { cmd: "rsync -avz -e ssh ./dist user@srv:/app", out: "sending incremental file list\nsent 4.2MB bytes/sec total size 18.2MB" },
      { cmd: "awk -F: '{print $1, $3}' /etc/passwd", out: "root 0\ndaemon 1\nrunner 1000\nnobody 65534" },
      { cmd: "iptables -A INPUT -p tcp --dport 22 -j ACCEPT", out: "Firewall rule appended to INPUT chain." }
    ]
  },
  git: {
    easy: [
      { cmd: "git status", out: "On branch main\nYour branch is up to date with 'origin/main'." },
      { cmd: "git branch", out: "* main\n  feature/auth\n  hotfix/cache-leak" },
      { cmd: "git add .", out: "Staged 3 files for commit." },
      { cmd: "git log --oneline -n 3", out: "a81d02c feat: add stdout stream\n5c3011b fix: typo detection\n9f12b04 init" },
      { cmd: "git pull origin main", out: "From github.com:skanda-sh/terminal-rush\nAlready up to date." },
      { cmd: "git branch -d patch-1", out: "Deleted branch patch-1 (was a39df12)." },
      { cmd: "git fetch --all", out: "Fetching origin\nFetching upstream" }
    ],
    normal: [
      { cmd: "git checkout -b feature/jwt-auth", out: "Switched to a new branch 'feature/jwt-auth'" },
      { cmd: "git commit -m \"fix: latency spike\"", out: "[main d9801ca] fix: latency spike\n 2 files changed, 14 insertions(+)" },
      { cmd: "git stash pop", out: "On branch main\nChanges applied from stash@{0}: modified script.js" },
      { cmd: "git remote -v", out: "origin  https://github.com/skanda-sh/terminal-rush.git (fetch)" },
      { cmd: "git diff HEAD~1", out: "diff --git a/script.js b/script.js\n- const timeout = 1000;\n+ const timeout = 500;" },
      { cmd: "git merge --no-ff feature/cache", out: "Merge made by the 'ort' strategy. 4 files modified." },
      { cmd: "git tag -a v2.0 -m \"Release 2.0\"", out: "Tag v2.0 created pointing to commit d9801ca" }
    ],
    hard: [
      { cmd: "git rebase -i HEAD~3", out: "Successfully rebased and updated refs/heads/main." },
      { cmd: "git cherry-pick 7f9b2c1", out: "[main c19a002] feat: cherry-picked routing logic\n Date: Wed Oct 29" },
      { cmd: "git reset --soft HEAD~1", out: "Head moved back 1 commit. Working directory changes staged." },
      { cmd: "git clean -fd", out: "Removing temp/cache_dump.json\nRemoving test_output.bin" },
      { cmd: "git log --graph --oneline --decorate", out: "* 91a82c (HEAD -> main) feat: deck shuffle\n* c19a002 cherry-pick fix\n* a81d02c initial setup" }
    ]
  },
  cloud: {
    easy: [
      { cmd: "docker ps", out: "CONTAINER ID   IMAGE         COMMAND     STATUS          PORTS\n8c901ab9e8   redis:alpine  \"redis\"     Up 3 hours      0.0.0.0:6379" },
      { cmd: "docker images", out: "REPOSITORY   TAG       IMAGE ID       SIZE\napi-gateway  v2.1      9b34a1029c     142MB" },
      { cmd: "kubectl get pods", out: "NAME                          READY   STATUS    RESTARTS   AGE\nbackend-deploy-79f8c6-a1     1/1     Running   0          4d" },
      { cmd: "docker compose down", out: "Stopping network default... Container db removed." },
      { cmd: "docker stop redis-cluster", out: "redis-cluster gracefully terminated." },
      { cmd: "kubectl get nodes", out: "NAME          STATUS   ROLES           AGE   VERSION\nnode-pool-01  Ready    control-plane   32d   v1.29.2" }
    ],
    normal: [
      { cmd: "docker build -t app:v1 .", out: "[+] Building 4.8s (11/11) FINISHED => exporting to image app:v1" },
      { cmd: "docker run -d -p 80:80 nginx", out: "cf81a09d3b241c888 (container running in background on port 80)" },
      { cmd: "docker logs -f --tail 20 redis", out: "* Ready to accept connections tcp 6379\n* DB loaded from disk: 0.002s" },
      { cmd: "kubectl logs deployment/api -f", out: "2026-10-29 [INFO] Worker pool initialized with 4 concurrency slots." },
      { cmd: "docker exec -it web sh", out: "/var/www # Connected to container shell." },
      { cmd: "docker compose up -d --build", out: "[+] Running 3/3\n✔ Network app_default Created\n✔ Container app-db-1 Started" }
    ],
    hard: [
      { cmd: "docker system prune -a --volumes -f", out: "Deleted Containers: 4\nDeleted Images: 12\nTotal reclaimed space: 4.81GB" },
      { cmd: "kubectl scale deployment api --replicas=5", out: "deployment.apps/api scaled to 5 replicas" },
      { cmd: "docker exec -it postgres psql -U root", out: "psql (16.2)\nType \"help\" for help.\nroot=# \\conninfo" },
      { cmd: "kubectl rollout restart deployment/worker", out: "deployment.apps/worker restarted across cluster." }
    ]
  }
};

// --- 3. STATE ---
const gameState = {
  active: false,
  isEnded: false,
  timeLeft: 60,
  timerInterval: null,
  currentPack: 'all',
  currentDiff: 'normal',
  commandQueue: [],
  lastCommandText: null,
  activeCommand: null,
  score: 0,
  combo: 1.0,
  consecutiveSuccess: 0,
  totalCharsTyped: 0,
  correctCharsTyped: 0,
  completedLines: 0,
  lineStartTime: null,
  bestScore: parseInt(localStorage.getItem('tr_best_score')) || 0,
  bestWpm: parseInt(localStorage.getItem('tr_best_wpm')) || 0
};

// DOM References
const configBar = document.getElementById('config-bar');
const targetDisplay = document.getElementById('target-display');
const cmdInput = document.getElementById('cmd-input');
const stdoutStream = document.getElementById('stdout-stream');
const stdoutStatus = document.getElementById('stdout-status');

const statTime = document.getElementById('stat-time');
const statWpm = document.getElementById('stat-wpm');
const statAccuracy = document.getElementById('stat-accuracy');
const statScore = document.getElementById('stat-score');
const statCombo = document.getElementById('stat-combo');
const bestScoreEl = document.getElementById('best-score');
const bestWpmEl = document.getElementById('best-wpm');

// Modal Elements
const debriefModal = document.getElementById('debrief-modal');
const debriefScore = document.getElementById('debrief-score');
const debriefWpm = document.getElementById('debrief-wpm');
const debriefAccuracy = document.getElementById('debrief-accuracy');
const debriefLines = document.getElementById('debrief-lines');
const newRecordBanner = document.getElementById('new-record-banner');
const rebootBtn = document.getElementById('reboot-btn');
const menuBtn = document.getElementById('menu-btn');

const themeSelect = document.getElementById('theme-select');
const crtToggle = document.getElementById('crt-toggle');
const audioToggle = document.getElementById('audio-toggle');

// Initialize UI
bestScoreEl.textContent = gameState.bestScore;
bestWpmEl.textContent = gameState.bestWpm;

// --- 4. SHUFFLE QUEUE ---
function shuffleDeck(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getBaseCommandPool() {
  let pool = [];
  const packs = gameState.currentPack === 'all' ? ['linux', 'git', 'cloud'] : [gameState.currentPack];
  packs.forEach(packName => {
    if (COMMAND_DATABASE[packName] && COMMAND_DATABASE[packName][gameState.currentDiff]) {
      pool = pool.concat(COMMAND_DATABASE[packName][gameState.currentDiff]);
    }
  });
  return pool;
}

function refillDeck() {
  const rawPool = getBaseCommandPool();
  let freshDeck = shuffleDeck(rawPool);

  if (freshDeck.length > 1 && gameState.lastCommandText && freshDeck[0].cmd === gameState.lastCommandText) {
    const swapTarget = Math.floor(Math.random() * (freshDeck.length - 1)) + 1;
    [freshDeck[0], freshDeck[swapTarget]] = [freshDeck[swapTarget], freshDeck[0]];
  }

  gameState.commandQueue = freshDeck;
}

function nextCommand() {
  if (!gameState.commandQueue || gameState.commandQueue.length === 0) {
    refillDeck();
  }

  const pick = gameState.commandQueue.shift();
  gameState.activeCommand = pick;
  gameState.lastCommandText = pick.cmd;
  gameState.lineStartTime = Date.now();
  cmdInput.value = '';
  renderTarget(pick.cmd, '');
}

function renderTarget(targetText, currentInput) {
  let html = '';
  for (let i = 0; i < targetText.length; i++) {
    const targetChar = targetText[i];
    const typedChar = currentInput[i];

    if (typedChar === undefined) {
      html += `<span class="target-char char-pending">${escapeHtml(targetChar)}</span>`;
    } else if (typedChar === targetChar) {
      html += `<span class="target-char char-correct">${escapeHtml(targetChar)}</span>`;
    } else {
      html += `<span class="target-char char-incorrect">${escapeHtml(targetChar)}</span>`;
    }
  }
  targetDisplay.innerHTML = html;
}

function escapeHtml(str) {
  if (str === ' ') return '&nbsp;';
  if (str === '<') return '&lt;';
  if (str === '>') return '&gt;';
  return str;
}

function pushStdout(text, type = 'out') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = text;
  stdoutStream.appendChild(entry);
  stdoutStream.scrollTop = stdoutStream.scrollHeight;
}

// --- 5. GAME LIFECYCLE ---
function startGame() {
  debriefModal.classList.add('hidden');
  newRecordBanner.classList.add('hidden');

  // Freeze config options during active play
  configBar.classList.add('locked');

  gameState.active = true;
  gameState.isEnded = false;
  gameState.timeLeft = 60;
  gameState.score = 0;
  gameState.combo = 1.0;
  gameState.consecutiveSuccess = 0;
  gameState.totalCharsTyped = 0;
  gameState.correctCharsTyped = 0;
  gameState.completedLines = 0;
  gameState.lastCommandText = null;
  gameState.commandQueue = [];

  cmdInput.disabled = false;
  cmdInput.value = '';
  cmdInput.focus();

  statTime.textContent = '60s';
  statTime.classList.remove('critical');
  statScore.textContent = '0';
  statCombo.textContent = '1.0x';
  statAccuracy.textContent = '100%';
  statWpm.textContent = '0';
  stdoutStatus.textContent = 'RUN ACTIVE';

  stdoutStream.innerHTML = '';
  pushStdout('[SYSTEM]: Kernel initialized. Clock counting down 60s.', 'sys');

  nextCommand();

  clearInterval(gameState.timerInterval);
  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--;
    statTime.textContent = `${gameState.timeLeft}s`;

    if (gameState.timeLeft <= 10 && gameState.timeLeft > 0) {
      statTime.classList.add('critical');
      const pitch = gameState.timeLeft <= 3 ? 1200 : 800;
      sfx.playTick(pitch);
    }

    updateWpm();

    if (gameState.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameState.active = false;
  gameState.isEnded = true;
  clearInterval(gameState.timerInterval);

  statTime.classList.remove('critical');
  stdoutStatus.textContent = 'STANDBY';

  // Lock input field
  cmdInput.disabled = true;
  cmdInput.blur();

  sfx.playGameOver();
  pushStdout(`[SESSION REPORT]: Run finished. Score: ${gameState.score}`, 'sys');

  const finalWpm = calculateWpm();
  const finalAcc = Math.round((gameState.correctCharsTyped / (gameState.totalCharsTyped || 1)) * 100);

  let isNewRecord = false;
  if (gameState.score > gameState.bestScore) {
    gameState.bestScore = gameState.score;
    localStorage.setItem('tr_best_score', gameState.score);
    bestScoreEl.textContent = gameState.score;
    isNewRecord = true;
  }
  if (finalWpm > gameState.bestWpm) {
    gameState.bestWpm = finalWpm;
    localStorage.setItem('tr_best_wpm', finalWpm);
    bestWpmEl.textContent = finalWpm;
    isNewRecord = true;
  }

  debriefScore.textContent = gameState.score;
  debriefWpm.textContent = finalWpm;
  debriefAccuracy.textContent = `${finalAcc}%`;
  debriefLines.textContent = gameState.completedLines;

  if (isNewRecord) {
    newRecordBanner.classList.remove('hidden');
  }

  debriefModal.classList.remove('hidden');
}

// Return to Standby Menu to reconfigure packs or difficulty
function returnToMenu() {
  debriefModal.classList.add('hidden');
  configBar.classList.remove('locked');

  gameState.active = false;
  gameState.isEnded = false;
  clearInterval(gameState.timerInterval);

  cmdInput.disabled = false;
  cmdInput.value = '';
  cmdInput.focus();

  statTime.textContent = '60s';
  statTime.classList.remove('critical');
  statScore.textContent = '0';
  statCombo.textContent = '1.0x';
  statAccuracy.textContent = '100%';
  statWpm.textContent = '0';
  stdoutStatus.textContent = 'IDLE';

  targetDisplay.innerHTML = `Press ENTER or Start Typing to Boot Engine...`;
  pushStdout('[SYSTEM]: Returned to Standby. Packs and difficulty unlocked.', 'sys');
}

function calculateWpm() {
  const elapsedMinutes = (60 - gameState.timeLeft) / 60;
  if (elapsedMinutes <= 0) return 0;
  return Math.round((gameState.correctCharsTyped / 5) / elapsedMinutes);
}

function updateWpm() {
  const wpm = calculateWpm();
  statWpm.textContent = isNaN(wpm) ? 0 : wpm;
}

// --- 6. INPUT PROCESSING ---
cmdInput.addEventListener('input', () => {
  if (!gameState.active && !gameState.isEnded) {
    startGame();
  }

  if (!gameState.active) return;

  const typed = cmdInput.value;
  const target = gameState.activeCommand.cmd;

  gameState.totalCharsTyped++;
  const lastCharIndex = typed.length - 1;

  if (lastCharIndex >= 0 && lastCharIndex < target.length) {
    if (typed[lastCharIndex] === target[lastCharIndex]) {
      gameState.correctCharsTyped++;
      sfx.playKey();
    } else {
      sfx.playError();
    }
  }

  renderTarget(target, typed);

  const acc = Math.round((gameState.correctCharsTyped / gameState.totalCharsTyped) * 100);
  statAccuracy.textContent = `${isNaN(acc) ? 100 : acc}%`;
});

cmdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (!gameState.active && !gameState.isEnded) {
      startGame();
      return;
    }

    if (!gameState.active) return;

    const typed = cmdInput.value.trim();
    const target = gameState.activeCommand.cmd.trim();

    if (typed === target) {
      gameState.completedLines++;
      gameState.consecutiveSuccess++;
      const timeTakenSec = (Date.now() - gameState.lineStartTime) / 1000;
      const speedBonus = timeTakenSec < 4.0 ? Math.round((4.0 - timeTakenSec) * 15) : 0;
      const basePoints = target.length * 10;
      const lineScore = Math.round((basePoints + speedBonus) * gameState.combo);

      gameState.score += lineScore;
      statScore.textContent = gameState.score;

      if (gameState.consecutiveSuccess % 3 === 0 && gameState.combo < 3.0) {
        gameState.combo = parseFloat((gameState.combo + 0.25).toFixed(2));
        statCombo.textContent = `${gameState.combo}x`;
        sfx.playCombo();
      } else {
        sfx.playSuccess();
      }

      pushStdout(`$ ${target}`, 'cmd');
      pushStdout(gameState.activeCommand.out, 'out');
      nextCommand();
    } else {
      sfx.playError();
      gameState.combo = 1.0;
      gameState.consecutiveSuccess = 0;
      statCombo.textContent = '1.0x';
      pushStdout(`$ ${cmdInput.value}`, 'cmd');
      pushStdout(`bash: command failed or syntax error`, 'err');
    }
  } else if (e.key === 'Escape') {
    if (gameState.active) {
      endGame();
    }
  }
});

// Modal Event Listeners
rebootBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', returnToMenu);

window.addEventListener('keydown', (e) => {
  if (gameState.isEnded) {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      startGame();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      returnToMenu();
    }
  }
});

// --- 7. CONTROLS ---
themeSelect.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.target.value);
});

crtToggle.addEventListener('click', () => {
  document.body.classList.toggle('crt-active');
  const active = document.body.classList.contains('crt-active');
  crtToggle.textContent = `CRT: ${active ? 'ON' : 'OFF'}`;
});

audioToggle.addEventListener('click', () => {
  const enabled = sfx.toggle();
  audioToggle.textContent = `AUDIO: ${enabled ? 'ON' : 'OFF'}`;
});

// Pack Selector (Guard: Disallowed when running)
document.querySelectorAll('.pack-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (gameState.active) return;
    document.querySelectorAll('.pack-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    gameState.currentPack = btn.dataset.pack;
    gameState.commandQueue = [];
  });
});

// Difficulty Selector (Guard: Disallowed when running)
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (gameState.active) return;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    gameState.currentDiff = btn.dataset.diff;
    gameState.commandQueue = [];
  });
});