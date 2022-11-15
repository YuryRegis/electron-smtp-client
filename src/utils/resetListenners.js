const { ipcRenderer } = window.require("electron");

const listeners = ["success-toast", "error-toast"];
function resetAllListeners() {
  listeners.map((listener) => resetListener(listener));
}

function resetListener(channel) {
  ipcRenderer.removeAllListeners(channel);
}

export default resetAllListeners;
