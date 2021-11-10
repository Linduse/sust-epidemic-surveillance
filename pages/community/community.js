// pages/community/community.js
import request from '../../utils/request';
import provice from '../../components/picker/province'
import city from '../../components/picker/city.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    fromColor:"green",
    toColor:"green",
    fromText:"全部地区低风险",
    toText:"全部地区低风险",
    fromCityPolicy:{},
    toCityPolicy:{},
    multiIndexFrom:[0,0],
    multiIndexTo:[],
    clickFrom:false,
    multiArray:[provice,city[0].children],
    multiArray1:[provice,city[0].children],
    detailPolicy: {},
    detailIndex:[],
  },
  swatch() {
    console.log("交换位置")
    let tmpFromIndex = this.data.multiIndexFrom
    let tmpToIndex = this.data.multiIndexTo
    if(tmpToIndex.length == 0) {
      wx.showToast({
        title: '请选择目的地',
        icon: 'error'
      })
    } else{
      this.setData({
        multiIndexFrom: tmpToIndex,
        multiIndexTo: tmpFromIndex
      })
      this.getFromCity()
      this.getToCity()
    }
    
  },
  //跳转到另一个页面
  popup(e) {
    let click = e.currentTarget.dataset.click
    console.log("进入政策详情页面")
    let city = "北京市"
    if(click == "true") {
      city = this.data.multiArray[1][this.data.multiIndexFrom[1]].name
    } else {
      city = this.data.multiArray1[1][this.data.multiIndexTo[1]].name
    }
    wx.navigateTo({
      url: '/pages/policydetail/policydetail?click=' + click + "&city=" + city,
    })
  },
  async getFromCity() {
    console.log("开始获取离开城市政策")
    console.log(city[this.data.multiIndexFrom[0]].children[this.data.multiIndexFrom[1]].name)
    let cityPolicy=await request('/api/v1/user/policy',{city:city[this.data.multiIndexFrom[0]].children[this.data.multiIndexFrom[1]].name})
    console.log(cityPolicy.data)
    this.setData({
      fromCityPolicy:cityPolicy.data
    })
    this.fromCityLevel();
  },
  async getToCity() {
    console.log("开始获取进入城市政策")
    let cityPolicy=await request('/api/v1/user/policy',{city:this.data.multiArray1[1][this.data.multiIndexTo[1]].name})
    console.log(cityPolicy.data)
    this.setData({
      toCityPolicy:cityPolicy.data
    })
    this.toCityLevel()
  },
  fromCityLevel() {
    if(this.data.fromCityPolicy.levelTag!= null) {
      let level = this.data.fromCityPolicy.levelTag;
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
  toCityLevel() {
    if(this.data.toCityPolicy.levelTag!= null) {
      let level = this.data.toCityPolicy.levelTag;
      if(level == 1) {
        this.setData({
          toText: "全部地区高风险",
          toColor: "#red"
        })
      } else if(level == 2) {
        this.setData({
          toText: "部分地区高风险",
          toColor: "red"
        })
      }else if(level == 3) {
        this.setData({
          toText: "部分地区中、高风险",
          toColor: "#FFCC00"
        })
      } else if(level == 4) {
        this.setData({
          toText: "全部地区中风险",
          toColor: "#FFCC00"
        })
      } else if(level == 5) {
        this.setData({
          toText: "部分地区中风险",
          toColor: "#FFCC00"
        })
      } else if(level == 6) {
        this.setData({
          toText: "全部低风险",
          toColor: "green"
        })
      }
    }
  },
    //选择器改变
    fromBindMultiPickerChange: function (e) {
        console.log('picker1发送选择改变，携带值为', e.detail.value)
        this.setData({
          multiIndexFrom: e.detail.value,
        })
        this.getFromCity()
    },
    fromMultiPickerColumnChange(e) {
      
      if(e.detail.column == 0) {
        let index = e.detail.value
        console.log(index)
        this.setData({
          multiArray:[provice,city[index].children],
        })
      }
    },
    toBindMultiPickerChange: function (e) {
        console.log('picker2发送选择改变，携带值为', e.detail.value)
        this.setData({
          multiIndexTo: e.detail.value
        })
        this.getToCity();
    },
    toMultiPickerColumnChange(e) {
      if(e.detail.column == 0) {
        let index = e.detail.value
        console.log(index)
        this.setData({
          multiArray1:[provice,city[index].children],
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFromCity();
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