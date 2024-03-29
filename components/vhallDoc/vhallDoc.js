// import main from '../../sdk/main'
import main from './sdk/vhall-mpsdk-doc-1.0.0'
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
        roomId: '',
        accountId: '',
        token: '',
        delay: 0,
        keep: 1
      }
    }
  },
  docSdk: null,
  VhallDoc: null,
  drawFun: null,
  docSdkEvent: null,
  data: {
    // 私有数据，可用于模板渲染
    vhallDoc: [],
    switchStatus: true,
    vhallDocImg: {
      imgVw: '',
      imgVh: ''
    }
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
    this.VhallDoc = new main()
    // this.data = { ...this.data, ...this.properties.docData }
    const opt = {
      ...this.properties.docData,
      THIS: this,
      canvasBoxId: 'vhallDoc'
    }
    this.VhallDoc.createInstance(
      opt,
      res => {
        const { docSdk, ROLE_TYPE, message, Event } = res
        this.docSdk = res.docSdk
        this.roleType = res.ROLE_TYPE
        this.message = res.message
        // 将sdk句柄抛出，用于页面卸载或隐藏时断开socket链接、设置权限
        this.triggerEvent('getDocSdk', {
          docSdk,
          roleType: ROLE_TYPE,
          Event
        })
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
        if (this.properties.docData.keep == 1) {
          docSdk.keepDoc(() => {
            docSdk.loadDoc(
              param => {
                this.triggerEvent('loadDocSucc', param)
              },
              param => {
                this.triggerEvent('loadDocFail', param)
              }
            )
          })
        } else if (this.properties.docData.keep == 0) {
          docSdk.resetDoc(() => {
            docSdk.loadDoc(
              param => {
                this.triggerEvent('loadDocSucc', param)
              },
              param => {
                this.triggerEvent('loadDocFail', param)
              }
            )
          })
        } else {
          docSdk.loadDoc(
            param => {
              this.triggerEvent('loadDocSucc', param)
            },
            param => {
              this.triggerEvent('loadDocFail', param)
            }
          )
        }
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
    hide() {},
    resize() {}
  },

  methods: {
    _prev() {
      this.docSdk.prev()
    },
    _next() {
      this.docSdk.next()
    },
    _createDoc(param) {
      return new Promise(resolve => {
        this.docSdk.createDoc(param, res => {
          resolve(res)
        })
      })
    },
    _keepDoc() {
      this.docSdk.keepDoc()
    },
    _createBoard(param) {
      this.docSdk.createBoard(param)
    },
    _touchstart(e) {
      this.docSdk.touchstart(e)
    },
    _touchmove(e) {
      this.docSdk.touchmove(e)
    },
    _touchend(e) {
      this.docSdk.touchend(e)
    },
    _setStroke(color) {
      this.docSdk.setStroke(color)
    },
    _setStrokeWidth(width) {
      this.docSdk.setStrokeWidth(width)
    },
    _setEraser() {
      this.docSdk.setEraser()
    },
    _setPen() {
      this.docSdk.setPen()
    },
    _switchOnContainer() {
      this.docSdk.switchOnContainer()
    },
    _switchOffContainer() {
      this.docSdk.switchOffContainer()
    },
    _setRole(e) {
      this.docSdk.setRole(e)
    },
    _destroyContainer() {
      this.docSdk.destroyContainer()
    },
    _clearCanvas() {
      this.docSdk.clearCanvas()
    },
    _destoryVhallDoc() {
      this.docSdk.destroyInstance()
      this.vhallDoc = []
      this.docSdk = null
      this.VhallDoc = null
    }
  }
})
