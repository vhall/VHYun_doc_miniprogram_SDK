// 公用的修改颜色
function changeColor(e, _this) {
  let tempData = {}
  tempData[e.target.dataset.color] = e.detail.value
  _this.setData({
    ...tempData,
    eraser: false
  })
}

// 公用的修改画笔宽度
function changeWidth(e, _this, canvasHeight, pageType) {
  let c = {}
  if (pageType === 1) {
    c.canvasHeight = canvasHeight
  } else {
    c.canvasHeightLen = canvasHeight
  }
  _this.setData({
    w: e.detail.value,
    eraser: false,
    ...c
  })
}

// 点击按钮触发的事件
function tapBtn(e, _this, pageType) {
  let btnType = e.currentTarget.dataset.type
  //   console.log(e, _this, pageType)
  let c = {}

  switch (btnType) {
    // 画笔宽度
    case 'width':
      if (pageType === 1) {
        c.canvasHeight = !_this.data.width ? 130 + _this.data.w : 50
      } else if (pageType === 2) {
        c.canvasHeightLen = !_this.data.width
          ? Math.min(
              _this.data.canvasHeight,
              _this.data.windowHeight - _this.data.w - 130
            )
          : 0
      } else if (pageType === 3) {
        c.canvasHeight = 130
      }
      _this.setData({
        width: !_this.data.width,
        color: false,
        clear: false,
        ...c
      })
      return
    // 画笔颜色
    case 'color':
      if (pageType === 1) {
        c.canvasHeight = !_this.data.color ? 205 + _this.data.w : 50
        if (_this.data.pageType === 'whiteBoard') {
          c.canvasHeight += 64
        }
      } else if (pageType === 2) {
        c.canvasHeightLen = !_this.data.color
          ? Math.min(
              _this.data.canvasHeight,
              _this.data.windowHeight - _this.data.w - 205
            )
          : 0
      }
      _this.setData({
        width: false,
        color: !_this.data.color,
        clear: false,
        ...c
      })
      return
    // 清空按钮
    case 'clear':
      if (pageType === 1) {
        c.canvasHeight = !_this.data.clear ? 120 + _this.data.w : 50
      } else if (pageType === 2) {
        c.canvasHeightLen = !_this.data.clear
          ? Math.min(
              _this.data.canvasHeight,
              _this.data.windowHeight - _this.data.w - 120
            )
          : 0
      }
      _this.setData({
        width: false,
        color: false,
        clear: !_this.data.clear,
        ...c
      })
      return
    default:
      return
  }
}

module.exports = {
  changeColor: changeColor,
  changeWidth: changeWidth,
  tapBtn: tapBtn
}
