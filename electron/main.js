'use strict';
// DoraPlay - Processo principal (Electron / PC). HTTP feito aqui (sem CORS, TLS livre).
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

let win = null;

function httpGet(urlStr, timeoutMs, redirects) {
  redirects = redirects || 0;
  return new Promise((resolve) => {
    let u; try { u = new URL(urlStr); } catch (e) { return resolve({ ok: false, status: 0, text: '', error: 'URL invalida' }); }
    const mod = u.protocol === 'https:' ? https : http;
    const opts = { method: 'GET', rejectUnauthorized: false, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept': 'application/json, text/plain, */*' } };
    let done = false; const finish = (v) => { if (!done) { done = true; resolve(v); } };
    const req = mod.request(urlStr, opts, (res) => {
      const code = res.statusCode || 0;
      if ([301, 302, 303, 307, 308].includes(code) && res.headers.location && redirects < 5) { res.resume(); let n; try { n = new URL(res.headers.location, urlStr).toString(); } catch (e) { return finish({ ok: false, status: code, text: '', error: 'redirect' }); } return httpGet(n, timeoutMs, redirects + 1).then(finish); }
      let data = ''; res.setEncoding('utf8'); res.on('data', c => data += c); res.on('end', () => finish({ ok: code >= 200 && code < 300, status: code, text: data, error: (code >= 200 && code < 300) ? '' : ('HTTP ' + code) }));
    });
    req.on('error', (err) => finish({ ok: false, status: 0, text: '', error: String((err && err.message) || err) }));
    req.setTimeout(timeoutMs || 20000, () => { req.destroy(); finish({ ok: false, status: 0, text: '', error: 'timeout' }); });
    req.end();
  });
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 1024, minHeight: 600, backgroundColor: '#0a0810', show: false, title: 'LOLLIFLIX PRO',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, webSecurity: false, allowRunningInsecureContent: true, backgroundThrottling: false }
  });
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  win.once('ready-to-show', () => win.show());
  win.webContents.on('certificate-error', (e, url, err, cert, cb) => { e.preventDefault(); cb(true); });
  win.on('closed', () => { win = null; });
}
app.on('certificate-error', (e, wc, url, err, cert, cb) => { e.preventDefault(); cb(true); });
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

ipcMain.handle('http:get', async (e, arg) => httpGet(arg && arg.url, arg && arg.timeoutMs));
ipcMain.on('win:min', () => { if (win) win.minimize(); });
ipcMain.on('win:max', () => { if (win) { win.isMaximized() ? win.unmaximize() : win.maximize(); } });
ipcMain.on('win:close', () => { if (win) win.close(); });
ipcMain.on('win:fullscreen', (e, on) => { if (win) win.setFullScreen(!!on); });

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
