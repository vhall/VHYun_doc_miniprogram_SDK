# VHYun_doc_miniprogram_SDK

微吼云文档小程序 sdk1.0 版，目前实现了观看端的功能

### 目录结构

- index 为入口文件夹
- docWatch 为 demo 示例（先在 vhallyun 演示端发起文档直播）
- sdk 文档 sdk 存放目录
- 其余为微信小程序必要文件

### 微信后台合法域名配置

- request 合法域名：https://api.vhallyun.com
- webscoket 合法域名：wss://chat01.e.vhall.com，wss://msg01-open.e.vhall.com

### 使用方法如下

· 先实例化 sdk

```javascript
//小程序data内保留字段：imageUrl
data: {
  imageUrl: '' //该字段是演示图片地址，为sdk内部使用
}

import { VhallDoc } from '../sdk/vhall-mpsdk-doc-1.0.0.js'

/*
 * @return {Object} res - 当前实例化后的sdk
 **/
const opt = {
  appId: this.data.appId, // appid
  channelId: this.data.channelId, //微吼云聊天房间id
  accountId: this.data.accountId, // 账户id
  token: this.data.token, // 个人账户token
  THIS: this, // 当前微信小程序实例
  delay: 1000 // 观看端收到翻页消息后多少毫秒翻页默认1000毫秒
}
VhallDoc.createInstance(
  opt,
  res => {
    this.docSdk = res
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
```

### 加载文档

```javascript
/* 加载文档
 * @return{Number} slideIndex 当前页
 *  @return{Number} slidesTotal 总页码
 * @return{Number} switchStatus 0 - 演示端未打开文档开关  1 - 演示端已打开文档开关
 */
this.docSdk.loadDoc(({ slideIndex, slidesTotal, switchStatus }) => {})
```

### 监听翻页成功函数

```javascript

/* 监听翻页成功函数
 * @return{Number} slideIndex 当前页
 * @param {Number} slidesTotal 失败函数
 **/
this.docSdk.onPageChange(({ slideIndex, slidesTotal })=> { //slideIndex 当前页码 // slidesTotal 总页数 })
```

### 观看端监听演示端文档开关函数

```javascript
/* 观看端监听演示端文档开关函数
* @return {String} swtichStatus 开 - on  关 - off
**/
this.docSdk.onSwitchChage(（{swtichStatus}）=> {})
```
