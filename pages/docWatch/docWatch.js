// pages/docWatch/docWatch.js
Page({
  /**
   * 页面的初始数据
   */
  docSdk: null, // sdk实例
  data: {
    showDoc: false,
    docData: {
      appId: '',
      channelId: '',
      roomId: '',
      accountId: '',
      token: ''
    },
    pageNumber: true,
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
    this.vhallDoc = this.selectComponent('#vhallDoc')
  },
  // 页面卸载
  onUnload() {
    try {
      this.vhallDoc._destoryVhallDoc()
    } catch (error) {
      console.log(error)
    }
    this.docSdk = null
    this.vhallDoc = null
    wx.showToast({
      title: '连接已断开~',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    try {
      this.vhallDoc._destoryVhallDoc()
    } catch (error) {
      console.log(error)
    }
    this.docSdk = null
    this.vhallDoc = null
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
      pageNumber: type == 'board' || type == '' || switchStatus == 'off'
    })
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
   * docSdk sdk句柄
   */
  getDocSdk(e) {
    this.docSdk = e.detail.docSdk
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
    switchStatus == 'off'
      ? this.setData({ pageNumber: true })
      : this.setData({ pageNumber: false })
  }
})
