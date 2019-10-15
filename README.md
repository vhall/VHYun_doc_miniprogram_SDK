# vhall-mpsdk-doc

微吼云文档小程序 自定义组件 1.0 版，目前实现了观看端的自由画笔和橡皮擦功能

当前未考虑演示端发起的文档或白板宽度小于手机屏宽的情况，亦未考虑横竖屏切换的情况，默认竖屏；
组件的宽度为 canvas 画布宽，组件的高 = 当前组件宽度/发起端画布的宽 \* 发起端画布高 计算得出

### 目录结构

- index 为入口文件夹
- docWatch 为 demo 示例（先在 vhallyun 演示端发起文档直播）
- components 下的 vhallDoc 为文档组件
- 其余为微信小程序必要文件

### 微信后台合法域名配置

- request 合法域名：https://api.vhallyun.com
- webscoket 合法域名：wss://chat01.e.vhall.com，wss://msg01-open.e.vhall.com

### 使用方法如下

- wxml 中引入 vhallDoc 组件，并挂载监听函数(组件可以从 git 上拿到)

```html
<vhallDoc
  doc-data="{{docData}}"
  bind:pageChange="pageChange"
  bind:destroyContainer="destroyContainer"
  bind:createContainer="createContainer"
  bind:getDocSdk="getDocSdk"
  bind:activeContainer="activeContainer"
  bind:switchChange="switchChange"
  bind:loadDocSucc="loadDocSucc"
  bind:loadDocFail="loadDocFail"
></vhallDoc>
```

- docData 为初始化 sdk 所必须的数据，建议在页面的 onLoad 函数中用 wx:if 显示 vhallDoc 组件，避免传入的 doc-data 数据错误,传入 doc-data 的数据格式：

```javascript
/**
* 前4个为必传参数
*/
docData: {
	appId: '',
	channelId: '',
	accountId: '',
	token: '',
    delay:0 //选填 - 收到消息（翻页、画笔、橡皮擦）后延迟多少秒处理，默认0
}
```

- 监听方法说明:

```javascript

  /**
   * 文档加载完成
   * id 当前正在演示的文档id
   * type 当前正在演示的文档类型 document | board | '' （文档|白板|当前没有实例）
   * slideIndex 当前页
   * slidesTotal 总页数
   * swtichStatus 当前演示端文档开关状态 on - 打开 | off - 关闭
   */
  loadDocSucc({
    detail: { id, type, slideIndex, slidesTotal, switchStatus }
  }) {
    console.log({
      id,
      type,
      slideIndex,
      slidesTotal,
      switchStatus
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
  destroyContainer({ detail: { id} }) {
    console.log(
      `文档已被销毁，被销毁的文档id为：${id}`
    )
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
   * @returns {Object} - docSdk sdk句柄，用于在 onHide 和 onUnload 事件中断开socket链接
   */
  getDocSdk({ detail: { docSdk } }) {
    this.docSdk = docSdk
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
  },

  /**
   * 演示端打开，关闭演示开关后触发
   * swtichStatus：on - 打开 | off - 关闭
   */
  switchChange({ detail: { swtichStatus } }) {
    console.log({ swtichStatus })
  }
```
