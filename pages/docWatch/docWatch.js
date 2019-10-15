// pages/docWatch/docWatch.js
Page({
  /**
   * 页面的初始数据
   */
  docSdk: null,
  data: {
    showDoc: false,
    docData: {
      appId: '',
      channelId: '',
      accountId: '',
      token: '',
      delay: 0
    },
    pageNumber: false,
    type: 'board',
    slideIndex: '',
    slidesTotal: ''
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
   * @param {String} - id 当前正在演示的文档id
   * @param {String} - type 当前正在演示的文档类型 document | board | '' （文档、白板）
   * @param {Number} - slideIndex 当前页
   * @param {Number} - slidesTotal 总页数
   * @param {String} - swtichStatus 当前演示端文档开关状态 on - 打开 | off - 关闭
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
      pageNumber: type == 'board' || type == ''
    })
  },

  /**
   * 文档加载失败函数
   * @param {Object} - e - ajax 失败回调信息
   */
  loadDocFail(e) {
    console.log('文档加载失败', e)
  },

  /**
   * 文档翻页完成后触发
   * @param {Number} - slideIndex 当前页
   * @param {Number} - slidesTotal 总页数
   */
  pageChange({ detail: { slideIndex, slidesTotal } }) {
    this.setData({ slidesTotal, slideIndex })
    console.log('翻页了', { slideIndex, slidesTotal })
  },

  /**
   * 观看端销毁容器后触发
   * @param {String} - id 销毁容器的id
   */
  destroyContainer({ detail: { id } }) {
    console.log(`文档已被销毁，被销毁的文档id为：${id}`)
    this.setData({ pageNumber:true})
  },

  /**
   * 观看端创建容器后触发
   * @param {String} - id 创建容器的id
   * @param {String} - type 创建容器类型 board | document （白板 / 文档）
   */
  createContainer({ detail: { id, type } }) {
    console.log('创建容器', { id, type })
  },

  /**
   * sdk实例化完成后触发
   * @returns {Object} - docSdk sdk句柄，用于在 onHide 和 onUnload 事件中断开socket链接
   */
  getDocSdk({ detail: { docSdk } }) {
    this.docSdk = docSdk
  },

  /**
   * 演示端切换容器后触发
   * @param {String} - id 当前正在演示的容器id
   * @param {String} - type：document/board (文档、白板)当前正在演示的doc类型
   * @param {Number} - slideIndex type为 document 时表示当前页码，type为 board 时为 0
   * @param {Number} - slidesTotal type为 document 时表示当前doc总页码，type为 board 时为 0
   */
  activeContainer({ detail: { id, slidesTotal, slideIndex, type } }) {
    console.log('激活文档', id, slidesTotal, slideIndex, type)
    this.setData({ slidesTotal, slideIndex, pageNumber: type == 'board' })
  },

  /**
   * 演示端打开，关闭演示开关后触发
   * @param {String} - swtichStatus：on - 打开 | off - 关闭
   */
  switchChange({ detail: { swtichStatus } }) {
    console.log({ swtichStatus })
  }
})
