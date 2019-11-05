// pages/docWatch/docWatch.js
import utils from '../utils/utils'
Page({
  /**
   * 页面的初始数据
   */
  docSdk: null, // sdk实例，本demo中仅用于onhide和onunload中断开连接
  vhallDoc: null, // 组件实例
  roleType: null, // 设置权限时用到的名称（默认普通观众，即roleType.SPECTATOR）
  data: {
    showDoc: false,
    docData: {
      appId: '',
      channelId: '',
      roomId: '',
      accountId: '',
      token: '',
      keep: 1,
      roomId: ''
    },
    pageNumber: true,
    type: 'board',
    slideIndex: '',
    slidesTotal: '',
    showModel: false,
    width: false,
    color: false,
    clear: false,
    r: 33,
    g: 33,
    b: 33,
    w: 2,
    eraser: false,
    canvasHeight: 50, // 其实这个是操作栏的高度，不是canvas的高度。。直接使用100vh，因此不需要读取设备的宽高
    pageType: 'whiteBoard',
    bgColor: 'white',
    movePosition: [-1, -1],
    prevPosition: [-1, -1],
    switchChecked: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    for (const key in options) {
      if (this.data.docData.hasOwnProperty(key)) {
        this.data.docData[key] = options[key]
      }
    }
    this.setData({ showDoc: true })
    this.setData({ docData: this.data.docData })
    this.vhallDoc = this.selectComponent('#vhallDoc')
  },
  // 页面卸载
  onUnload() {
    if (this.docSdk) {
      this.docSdk.destroyInstance()
      this.docSdk = null
    }
    wx.showToast({
      title: '连接已断开~',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.docSdk) {
      this.docSdk.destroyInstance()
      this.docSdk = null
    }
    wx.showToast({
      title: '连接已断开~',
      icon: 'none',
      duration: 2000
    })
    wx.navigateBack({})
  },

  /**
   * 文档加载完成
   * id 当前正在演示的文档id
   * type 当前正在演示的文档类型 document | board | '' （文档、白板）
   * slideIndex 当前页
   * slidesTotal 总页数
   * switchStatus 当前演示端文档开关状态 on - 打开 | off - 关闭
   */
  loadDocSucc({ detail: { id, type, slideIndex, slidesTotal, switchStatus } }) {
    console.log({
      id,
      type,
      slideIndex,
      slidesTotal,
      switchStatus
    })
    this.setData({
      slidesTotal,
      slideIndex,
      pageNumber: type == 'board' || type == '',
      switchChecked: switchStatus == 'on' ? true : false
    })
    // console.log()
  },

  /**
   * 文档加载失败函数
   * e - ajax 失败回调信息
   */
  loadDocFail(e) {
    console.log('文档加载失败', e)
  },

  /**
   * 文档翻页完成后触发
   * slideIndex 当前页
   * slidesTotal 总页数
   */
  pageChange({ detail: { slideIndex, slidesTotal } }) {
    this.setData({ slidesTotal, slideIndex })
    console.log('翻页了', { slideIndex, slidesTotal })
  },

  /**
   * 观看端销毁容器后触发
   * id 销毁容器的id
   */
  destroyContainer({ detail: { id } }) {
    console.log(`文档已被销毁，被销毁的文档id为：${id}`)
    this.setData({ pageNumber: true })
  },

  /**
   * 观看端创建容器后触发
   * id 创建容器的id
   * type 创建容器类型 board | document （白板 / 文档）
   */
  createContainer({ detail: { id, type } }) {
    console.log('创建容器', { id, type })
  },

  /**
   * sdk实例化完成后触发
   * docSdk sdk句柄，用于在 onHide 和 onUnload 事件中断开socket链接
   */
  getDocSdk(e) {
    this.docSdk = e.detail.docSdk
    this.roleType = e.detail.roleType
    this.setRole(this.roleType.HOST)
  },

  /**
   * 演示端切换容器后触发
   * id 当前正在演示的容器id
   * type：document/board (文档、白板)当前正在演示的doc类型
   * slideIndex type为 document 时表示当前页码，type为 board 时为 0
   * slidesTotal type为 document 时表示当前doc总页码，type为 board 时为 0
   */
  activeContainer({ detail: { id, slidesTotal, slideIndex, type } }) {
    console.log('激活文档', id, slidesTotal, slideIndex, type)
    this.setData({ slidesTotal, slideIndex, pageNumber: type == 'board' })
  },

  /**
   * 演示端打开，关闭演示开关后触发
   * switchStatus：on - 打开 | off - 关闭
   */
  switchChange({ detail: { switchStatus } }) {
    console.log({ switchStatus })
  },
  /**
   * 上一页
   */
  prev() {
    this.vhallDoc._prev()
  },
  /**
   * 下一页
   */
  next() {
    this.vhallDoc._next()
  },
  createDoc() {
    this.setData({ showModel: true })
  },
  /**
   * 新建白板
   */
  createBoard() {
    const query = wx.createSelectorQuery().in(this)
    query
      .select('.vhallDocBox')
      .boundingClientRect(res => {
        this.vhallDoc._createBoard({
          cw: res.width,
          ch: res.height,
          backgroundColor: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
            Math.random() * 255
          )},${Math.floor(Math.random() * 255)})`
        })
      })
      .exec()
  },
  tapBtn(e) {
    utils.tapBtn(e, this, 1)
  },
  /**
   * 修改画笔颜色
   * */

  changeColor(e) {
    utils.changeColor(e, this)
    this.vhallDoc._setStroke(
      `rgba(${this.data.r}, ${this.data.g}, ${this.data.b},1)`
    )
  },
  /**
   * 修改画笔宽度
   * */

  changeWidth(e) {
    utils.changeWidth(e, this, 130 + e.detail.value, 1)
    this.vhallDoc._setStrokeWidth(this.data.w)
  },
  /**
   * 清空画布
   */
  clearCanvas() {
    // 重置
    this.vhallDoc._clearCanvas()
    this.setData({
      clear: false,
      canvasHeight: 50
    })
  },
  /**
   *
   * 设置橡皮擦
   *
   */
  setEraser() {
    this.vhallDoc._setEraser()
    this.setData({
      clear: false,
      canvasHeight: 50
    })
    wx.showToast({
      title: '当前选择橡皮擦~',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 新建文档
   * @param {String} - docId 文档id
   */
  confirmDoc({ detail: { docId } }) {
    if (docId) {
      const query = wx.createSelectorQuery().in(this)
      query
        .select('.vhallDocBox')
        .boundingClientRect(res => {
          this.vhallDoc._createDoc(
            {
              documentId: docId,
              cw: res.width,
              ch: res.height
            },
            () => {}
          )
        })
        .exec()
    }
  },
  /**
   * 选择自由画笔
   */
  choosePencial() {
    this.vhallDoc._setPen()
    wx.showToast({
      title: '当前选择自由画笔~',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 观众是否可见 - 开关
   */
  changeSwitch(e) {
    this.data.switchChecked = e.detail.value
    if (e.detail.value) {
      this.vhallDoc._switchOnContainer()
    } else {
      this.vhallDoc._switchOffContainer()
    }
  },
  /**
   * 设置为主讲人
   */
  setRole(e) {
    // 设置为主持人
    this.vhallDoc._setRole(e)
  },
  /**
   * 销毁当前容器
   */
  sendDestroy() {
    this.vhallDoc._destroyContainer()
  }
})
