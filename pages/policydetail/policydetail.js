// pages/policydetail/policydetail.js
import request from '../../utils/request';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    clickFrom: 'true',
    city: "北京市",
    detailCityPolicy:{},
    num: 3
  },
  observers: {
    'detailPolicy': (res) => {
      console.log(res)
    }
  },
   // 打电话
   phone(e) {
    let phone = e.currentTarget.dataset.number
    console.log(phone)
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  traffic(e) {
    let index = e.currentTarget.dataset.index
    console.log("当前下标"+index)
    this.setData({ 
      index:index,
    })
  },
  all() {
    let num = this.data.detailCityPolicy.cityPhone.length
    this.setData({
      num:num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let click = options.click
      let city = options.city
      console.log(city)
      this.setData({
        city: city,
        clickFrom: click
      })
     this.getCityPolicy()
  },

  async getCityPolicy() {
    console.log("开始获取城市政策")
    let cityPolicy=await request('/api/v1/user/policy',{city:this.data.city})
    console.log(cityPolicy.data)
    this.setData({
      detailCityPolicy:cityPolicy.data
    })
    this.cityLevel();
  },
  cityLevel() {
    if(this.data.detailCityPolicy.levelTag!= null) {
      let level = this.data.detailCityPolicy.levelTag;
      if(level == 1) {
        this.setData({
          fromText: "全部地区高风险",
          fromColor: "#red"
        })
      } else if(level == 2) {
        this.setData({
          fromText: "部分地区高风险",
          fromColor: "red"
        })
      }else if(level == 3) {
        this.setData({
          fromText: "部分地区中、高风险",
          fromColor: "#FFCC00"
        })
      } else if(level == 4) {
        this.setData({
          fromText: "全部地区中风险",
          fromColor: "#FFCC00"
        })
      } else if(level == 5) {
        this.setData({
          fromText: "部分地区中风险",
          fromColor: "#FFCC00"
        })
      } else if(level == 6) {
        this.setData({
          fromText: "全部低风险",
          fromColor: "green"
        })
      }
    }
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