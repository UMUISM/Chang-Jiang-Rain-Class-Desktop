// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, Menu } = require('electron')
const menuAction = require("./menuAction")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        frame: true,
        title: "长江 · 雨课堂",
        webPreferences: {
            nodeIntegration: true
        },
    })

    const menu = Menu.buildFromTemplate(menuAction)
    Menu.setApplicationMenu(menu)

    // and load the index.html of the app.
    mainWindow.loadURL(`https://changjiang.yuketang.cn/`)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // close dialog
    mainWindow.on('close', e => {
        e.preventDefault();
        dialog.showMessageBox({
            type: 'info',
            title: '提示',
            message: '确认退出？',
            buttons: ['确认', '取消'],
            cancelId: 1,
        }).then(idx => {
            console.log(idx)
            if (idx.response == 1) {
                console.log('index==1，取消关闭')
                e.preventDefault();
            } else {
                console.log('index==0，关闭')
                mainWindow = null
                app.exit();
            }
        })
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})
