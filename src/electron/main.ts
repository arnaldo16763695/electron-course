import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData } from "./resourceManager.js";
// type test = string;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(
      path.join(path.join(app.getAppPath(), "/dist-react/index.html"))
    );
  }
  pollResources(mainWindow);
  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });
});
