// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fromColor:"green",
      toColor:"green",
      fromText:"全部地区低风险",
      toText:"全部地区低风险",
      cityPolicy:{},
      multiIndexFrom:[0,0],
      multiIndexTo:[],
      multiArray:[['北京市','天津市','上海市','重庆市'],['北京市','朝阳区']],
      // 弹出层
      show: false,
      duration: 300,
      position: 'bottom',
      round: true,
      overlay: true,
      customStyle: 'height: 40%;',
      overlayStyle: ''
  },
  //选择器改变
  fromBindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndexFrom: e.detail.value
    })
  },
  toBindMultiPickerChange: function (e) {
    console.log(this.data.multiIndexTo.length)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndexTo: e.detail.value
    })
    console.log(this.data.multiIndexTo.length)
  },
  //点击弹出遮罩层
  popup(e) {
    console.log("弹出一层")
    this.setData({
      show: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})