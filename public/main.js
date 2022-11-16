const { app, BrowserWindow, ipcMain } = require("electron");
require("@electron/remote/main").initialize();

const { getTransporterOptions } = require("../src/utils/transporterServices");

global.authMail = null;
const OS = require("os");
const url = require("url");
const path = require("path");
const nodemailer = require("nodemailer");
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

ipcMain.on("login-smtp", async (event, { email, password }) => {
  try {
    const options = getTransporterOptions(email);
    global.authMail = nodemailer.createTransport({
      ...options,
      auth: {
        user: email,
        pass: password,
      },
    });

    const message = {
      title: "Login realizado com sucesso!",
      message: "Agora você pode enviar emails.",
    };
    event.sender.send("success-toast", { ...message });
  } catch (error) {
    const message = error?.message;
    event.sender.send("error-toast", { message });
  }
});

ipcMain.on("send-mail", async (event, mailOptions) => {
  try {
    await global.authMail?.sendMail({ ...mailOptions }, function (error, info) {
      if (error) {
        const message = {
          title: "Erro ao enviar email",
          message:
            error?.command === "AUTH LOGIN"
              ? "Falha na autenticação (AUTH LOGIN)"
              : error.command,
        };
        event.sender.send("error-toast", { ...message });

        if (error?.command === "AUTH LOGIN") {
          event.sender.send("logout", {});
        }
        console.log(error);
      } else {
        const message = {
          title: "Sucesso!",
          message: `Email enviado para ${mailOptions.to}.`,
        };
        event.sender.send("success-toast", { ...message });
      }
    });
  } catch (error) {
    const message = {
      title: "Erro ao enviar email",
      message: error?.status,
    };
    event.sender.send("error-toast", { ...message });
    console.log(error);
  }
});

ipcMain.on("close-main-window", () => OS.platform !== "darwin" && app.quit());
