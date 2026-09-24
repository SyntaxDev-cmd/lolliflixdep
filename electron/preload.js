'use strict';
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('native', {
  isDesktop: true,
  get: (url, timeoutMs) => ipcRenderer.invoke('http:get', { url: url, timeoutMs: timeoutMs }),
  win: {
    minimize: () => ipcRenderer.send('win:min'),
    maximize: () => ipcRenderer.send('win:max'),
    close: () => ipcRenderer.send('win:close'),
    fullscreen: (on) => ipcRenderer.send('win:fullscreen', on)
  }
});
