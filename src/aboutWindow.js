const { dialog } = require('electron')

module.exports = function aboutWindow() {
    dialog.showMessageBox({
        type: 'info',
        title: '关于',
        message: '长江 · 雨课堂 桌面端提供的基础交互均为网页版\n- 本地不会存储任何非法数据\n- 不会与第三方服务器通信。\n\n\tCopyright (c) Yuzuki 2021 MIT协议'
    })
}