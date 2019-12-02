// pages/index.js
import { appId, channelId, roomId, token } from '../../const/indexConst'
Page({
  /**
   * 页面的初始数据
   */

  data: {
    appId, //'d317f559', //'321453e4', // 'd317f559',  需要将此处appId改为自己的
    channelId, //'ch_2ae4abff', //'ch_1a348b67'需要将此处inavId改为自己的
    roomId, //'lss_190966fd',
    token, //需要将此处token改为自己的
    accountId: `miniProgram_${Math.floor(1000 + Math.random() * 9000)}`, //需要将此处accountId改为自己的
    initType: 'watch',
    keep: 1
  },

  gotoPush() {
    let url
    if (this.data.initType == 'watch') {
      url = `../docWatch/docWatch?channelId=${this.data.channelId}&appId=${this.data.appId}&accountId=${this.data.accountId}&token=${this.data.token}&roomId=${this.data.roomId}`
    } else {
      url = `../docAct/docAct?channelId=${this.data.channelId}&appId=${this.data.appId}&accountId=${this.data.accountId}&token=${this.data.token}&keep=${this.data.keep}&roomId=${this.data.roomId}`
    }
    wx.navigateTo({
      url: url
    })
  },

  getinput(e) {
    this.setData({ [e.currentTarget.id]: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
