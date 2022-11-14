const { app, BrowserWindow, ipcMain } = require("electron");
require("@electron/remote/main").initialize();

const OS = require("os");
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
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./build/index.html")}`
  );

  // For PRODUCTION only
  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "./build/index.html"),
  //     protocol: "file",
  //     slashes: true,
  //   })
  // );
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

ipcMain.on("login-smtp", (event, { email, password }) => {
  try {
    //
    event.sender.send("success-toast", {});
  } catch (error) {
    //
    const message = "Arquivo ou diretório inválido!";
    event.sender.send("error-toast", { message });
  }
});

ipcMain.on("close-main-window", () => OS.platform !== "darwin" && app.quit());
