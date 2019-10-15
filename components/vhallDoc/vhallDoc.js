// import { VhallDoc } from '../../pages/src/main.js'
import { VhallDoc } from './sdk/vhall-mpsdk-doc-1.0.0'
Component({
  behaviors: [],
  options: {
    styleIsolation: 'isolated'
  },
  // 属性定义（详情参见下文）
  properties: {
    docData: {
      // 属性名
      type: Object,
      value: {
        appId: '',
        channelId: '',
        accountId: '',
        token: '',
        delay: 0
      }
    }
  },
  docSdk: null,
  drawFun: null,
  docSdkEvent: null,
  data: {
    // 私有数据，可用于模板渲染
    vhallDoc: [],
    switchStatus: false
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {}
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() {
    // this.data = { ...this.data, ...this.properties.docData }
    const opt = {
      ...this.properties.docData,
      THIS: this,
      canvasBoxId: 'vhallDoc'
    }
    console.log(opt)
    VhallDoc.createInstance(
      opt,
      ({ docSdk, Event, message }) => {
        this.docSdk = docSdk
        // 将sdk句柄抛出，用于页面卸载或隐藏时断开socket链接
        this.triggerEvent('getDocSdk', docSdk)
        message.on(Event.CREATECONTAINER, param => {
          this.triggerEvent('createContainer', param)
        })
        message.on(Event.EVENTPAGECHANGE, param => {
          this.triggerEvent('pageChange', param)
        })
        message.on(Event.DESTROYCONTAINER, param => {
          this.triggerEvent('destroyContainer', param)
        })
        message.on(Event.ACTIVECONTAINER, param => {
          this.triggerEvent('activeContainer', param)
        })
        message.on(Event.EVENTSWITCHCHANGE, param => {
          this.triggerEvent('switchChange', param)
        })
        docSdk.loadDoc(
          param => {
            this.triggerEvent('loadDocSucc', param)
          },
          param => {
            this.triggerEvent('loadDocFail', param)
          }
        )
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

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {},
    hide: function() {},
    resize: function() {}
  },

  methods: {
    onMyButtonTap: function() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {}
  }
})
