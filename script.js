const $ = id => document.getElementById(id);
let timerInterval = null;
let remaining = 12 * 60 * 60;

$('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('operator').value.trim();
  $('operatorName').textContent = name || 'operator';
  $('loginView').classList.add('hidden');
  $('appView').classList.remove('hidden');
  addTerminal('Session initialized for ' + (name || 'operator') + '.');
});

$('logoutBtn').addEventListener('click', () => {
  $('appView').classList.add('hidden');
  $('loginView').classList.remove('hidden');
  $('accessKey').value = '';
});

$('activateBtn').addEventListener('click', () => {
  if (!$('proxyCheck').checked && !$('accountCheck').checked) {
    $('activationMsg').textContent = 'Select at least one fictional package.';
    return;
  }
  const selected = [];
  if ($('proxyCheck').checked) selected.push('Proxy training package');
  if ($('accountCheck').checked) selected.push('Private-site access scenario');
  $('activationMsg').textContent = 'DEMO ACTIVATED: ' + selected.join(' + ') + '. No payment was taken.';
  remaining = 12 * 60 * 60;
  startTimer();
  addTerminal('Demo package activation complete. 12-hour visual timer started.');
});

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  updateTimer();
  timerInterval = setInterval(() => {
    if (remaining > 0) remaining--;
    updateTimer();
    if (remaining === 0) {
      clearInterval(timerInterval);
      $('activationMsg').textContent = 'The simulated 12-hour access window has ended.';
    }
  }, 1000);
}
function updateTimer() {
  const h = String(Math.floor(remaining / 3600)).padStart(2,'0');
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2,'0');
  const s = String(remaining % 60).padStart(2,'0');
  $('timer').textContent = `${h}:${m}:${s}`;
}

function addTerminal(message, cls='') {
  const p = document.createElement('p');
  p.textContent = '> ' + message;
  if (cls) p.className = cls;
  $('terminalOutput').appendChild(p);
  $('terminalOutput').scrollTop = $('terminalOutput').scrollHeight;
}
$('terminalForm').addEventListener('submit', e => {
  e.preventDefault();
  const cmd = $('commandInput').value.trim();
  if (!cmd) return;
  addTerminal(cmd);
  $('commandInput').value = '';
  const normalized = cmd.toLowerCase();
  if (normalized === 'clear') $('terminalOutput').innerHTML = '';
  else if (normalized === 'help') addTerminal('Available demo commands: help, scan-demo, status, clear');
  else if (normalized === 'status') addTerminal('LAB STATUS: ONLINE | NETWORK ACCESS: DISABLED | TARGET ACCESS: DISABLED');
  else if (normalized === 'scan-demo') {
    addTerminal('Starting fictional scan sequence...');
    setTimeout(() => addTerminal('SIMULATION COMPLETE: no device or network was scanned.'), 700);
  } else {
    addTerminal('Demo command accepted. Simulating workflow...');
    setTimeout(() => addTerminal('ACCESS COMPLETE — VISUAL DEMO ONLY. No external system was accessed.'), 650);
  }
});

$('photo').addEventListener('change', e => {
  const file = e.target.files[0];
  const preview = $('photoPreview');
  preview.innerHTML = '';
  if (!file) { preview.textContent = 'PHOTO PREVIEW'; return; }
  if (!file.type.startsWith('image/')) { preview.textContent = 'Please choose an image file.'; return; }
  const img = document.createElement('img');
  img.alt = 'Local preview of selected test image';
  img.src = URL.createObjectURL(file);
  preview.appendChild(img);
});

$('runScanBtn').addEventListener('click', () => {
  const phone = $('phone').value.trim();
  const insta = $('instagram').value.trim();
  const device = $('device').value.trim();
  const ip = $('ip').value.trim();
  const result = [
    'SIMULATED PROFILE ANALYSIS — COMPLETE',
    '------------------------------------',
    'Phone field: ' + (phone ? 'Test value entered' : 'Not provided'),
    'Instagram field: ' + (insta ? 'Test username entered' : 'Not provided'),
    'Device model: ' + (device || 'Not provided by operator'),
    'Example IP: ' + (ip || 'Not provided by operator'),
    'Photo: ' + ($('photo').files.length ? 'Local preview only; not uploaded' : 'Not selected'),
    '',
    'RESULT: INCONCLUSIVE TRAINING SCENARIO',
    'No identity lookup, IP lookup, tracking, phone access, or account access was performed.'
  ].join('\\n');
  $('scanResult').textContent = result;
  $('scanResult').classList.remove('hidden');
  addTerminal('Profile simulation completed. No external lookup performed.');
});
