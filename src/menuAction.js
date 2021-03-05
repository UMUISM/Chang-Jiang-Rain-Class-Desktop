const app = require('electron')

const aboutWindow = require('./aboutWindow')

const isMac = process.platform === 'darwin'

const template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    {
        label: '文件',
        submenu: [
            isMac ? { role: 'close', label: '关闭' } : { role: 'quit', label: '退出' }
        ]
    },
    {
        label: '编辑',
        submenu: [
            { role: 'undo', label: '撤销' },
            { role: 'redo', label: '重做' },
            { type: 'separator' },
            { role: 'cut', label: '剪切' },
            { role: 'copy', label: '复制' },
            { role: 'paste', label: '粘贴' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ] : [
                { role: 'delete', label: '删除' },
                { type: 'separator' },
                { role: 'selectAll', label: '全选' }
            ])
        ]
    },
    {
        label: '视图',
        submenu: [
            { role: 'reload', label: '刷新' },
            { role: 'forceReload', label: '全局刷新' },
            { role: 'toggleDevTools', label: '开发者工具' },
            { type: 'separator' },
            { role: 'resetZoom', label: '恢复缩放' },
            { role: 'zoomIn', label: '放大' },
            { role: 'zoomOut', label: '缩小' },
            { type: 'separator' },
            { role: 'togglefullscreen', label: '全屏' }
        ]
    },
    {
        label: '窗口',
        submenu: [
            { role: 'minimize', label: '最小化' },
            { role: 'zoom', label: '最大化' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close', label: '关闭' }
            ])
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click: () => {
                    aboutWindow()
                }
            },
            {
                label: '检查更新',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://github.com/UMUISM/Chang-Jiang-Rain-Class-Desktop/releases')
                }
            }

        ]
    }
]

module.exports = template