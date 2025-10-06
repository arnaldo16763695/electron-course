const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_:any, stats:any) => {
      callback(stats);
    });
  },
//   getStaticData: () => console.log("static"),
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
