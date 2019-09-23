import { VhallDoc } from '../sdk/vhall-mpsdk-doc-1.0.0.js'
Page({
  /**
   * 页面的初始数据
   */
  docSdk: null,
  data: {
    imageUrl: '',
    appId: '',
    channelId: '',
    roomId: '',
    accountId: '',
    token: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    for (const key in options) {
      if (this.data.hasOwnProperty(key)) {
        this.data[key] = options[key]
      }
    }
    const opt = {
      appId: this.data.appId,
      channelId: this.data.channelId,
      roomId: this.data.roomId,
      accountId: this.data.accountId,
      token: this.data.token,
      THIS: this,
      initType: 'watch',
      delay: 2000
    }
    //console.log(VhallDoc)
    VhallDoc.createInstance(
      opt,
      res => {
        this.docSdk = res

        this.docSdk.loadDoc(res => {
          console.log(res)
        })
        this.docSdk.onPageChange(param => {
          console.log(param)
        })
        this.docSdk.onSwitchChage(param => {
          console.log(param)
        })
      },
      e => {
        // 实例化失败
        console.log(e)
        wx.showToast({
          title: `实例化失败`,
          icon: 'none',
          duration: 2000
        })
      }
    )
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

  prevFun() {},
  nextFun() {}
})
