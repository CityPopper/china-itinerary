import { spawn } from 'node:child_process';
import { build } from './build.mjs';

build();
const server = spawn('browser-sync', ['start', '--server', 'public', '--files', 'public/**/*', '--listen', '0.0.0.0', '--port', '3000', '--no-open', '--no-ui', '--no-notify'], { stdio: 'inherit' });
let lastError;
const watcher = setInterval(() => {
  try {
    build();
    lastError = undefined;
  } catch (error) {
    if (error.message !== lastError) console.error(error.message);
    lastError = error.message;
  }
}, 500);
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => { clearInterval(watcher); server.kill(signal); });
}
server.on('exit', code => { clearInterval(watcher); process.exitCode = code ?? 0; });
