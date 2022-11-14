const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();

const url = require("url");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
    },
  });

  // For DEVELOPMENT only
  // win.loadURL(
  //   isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "./build/index.html")}`
  // );

  // For PRODUCTION only
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
