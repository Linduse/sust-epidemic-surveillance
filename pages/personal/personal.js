// pages/personal/personal.js
import request from '../../utils/request';
let routePlan = requirePlugin('routePlan');

var QQMapWX = require('../../components/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({
  data: {
    selectorVisible: false,
    selectedProvince: "null",
    selectedCity: null,
    search: "",
    latitude: "",
    longitude: "",
    markers:[],
    page: 1,
    pageSize: 5,
    nat:[],
    distance:[],
    line:[]
  },
  showSelector() {
    console.log("选择城市")
    this.setData({
      selectorVisible: true,
    });
  },
  onSelectCity(e) {
    const { province, city } = e.detail;
    let name =province.name
    if(name=="重庆" || name=="上海" || name=="北京" || name=="天津") {
      name = name + "市"
    } else {
      name=name +"省"
    }
    this.setData({
      selectedProvince: name,
      selectedCity: city.name,
    });
  },
  async search() {
    let natList=await request('/api/v1/user/nat', {province: this.data.selectedProvince, search_key: this.data.selectedCity + this.data.search,pn: this.data.page, pageSize: this.data.pageSize})
    if(natList.success) {
      this.setData({
        nat: natList.data.list
      })
      let markers = []
      var dis = [];
      for(var i = 0; i < natList.data.list.length; i++) {
        //获取返回的经纬度
        let lat_lo = natList.data.list[i].lat_lon.split(',') 
        //组装一个对象
        let marker = {title: natList.data.list[i].name, latitude: lat_lo[1],longitude: lat_lo[0]}
        //保存对象
        markers.push(marker)
        //计算每个对象
        qqmapsdk.calculateDistance({
          //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
          //若起点有数据则采用起点坐标，若为空默认当前地址
          from: this.data.latitude + ',' + this.data.longitude, 
          to: lat_lo[1] + "," + lat_lo[0], //终点坐标
          //成功后的回调
          success: (res) =>{
            var res = res.result
            dis.push(res.elements[0].distance); //将返回数据存入dis数组，
            this.setData({
              distance:dis
            })
          },
          fail: function(error) {
            console.error(error);
          }
        });
      }
      this.setData({
        markers: markers,
      })
    } else {
      wx.showToast({
        title: '获取数据失败',
        icon: "error"
      })
    }
  },
  async lower(e) {
    console.log("滑动到底部")
    let page = e.currentTarget.dataset.order / this.data.pageSize
    let natList=await request('/api/v1/user/nat', {province: this.data.selectedProvince, search_key: this.data.selectedCity + this.data.search, pn: page + 1, pageSize: this.data.pageSize})
    if(natList.success) {
      let nat = this.data.nat
      for(let i = 0; i < natList.data.list.length; i++) {
        nat.push(natList.data.list[i])
      }
      this.setData({
        nat: nat
      })
      let markers = this.data.markers
      var dis = this.data.distance;
      for(var i = 0; i < natList.data.list.length; i++) {
        //获取返回的经纬度
        let lat_lo = natList.data.list[i].lat_lon.split(',') 
        //组装一个对象
        let marker = {title: natList.data.list[i].name, latitude: lat_lo[1],longitude: lat_lo[0]}
        //保存对象
        markers.push(marker)
        //计算每个对象
        qqmapsdk.calculateDistance({
          //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
          //若起点有数据则采用起点坐标，若为空默认当前地址
          from: this.data.latitude + ',' + this.data.longitude, 
          to: lat_lo[1] + "," + lat_lo[0], //终点坐标
          //成功后的回调
          success: (res) =>{
            var res = res.result
            dis.push(res.elements[0].distance); //将返回数据存入dis数组，
            this.setData({
              distance:dis
            })
          },
          fail: function(error) {
            console.error(error);
          }
        });
      }
      this.setData({
        markers: markers,
      })
    } else {
      wx.showToast({
        title: '获取数据失败',
        icon: "error"
      })
    }
  },
  routePlanning(e) {
    console.log("开始路线规划")
    let index = e.currentTarget.dataset.index
    let key = 'PHWBZ-N2RHF-IU6JE-JZ6O5-KLVCO-HYFB4';  //使用在腾讯位置服务申请的key
    let referer = 'applet';  
    let endPoint = JSON.stringify({
      'name': this.data.markers[index].title,
      'latitude': this.data.markers[index].latitude,
      'longitude': this.data.markers[index].longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
    })
  },
  getInput(e) {
    let input = e.detail.value
    this.setData({
      search: input
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'PHWBZ-N2RHF-IU6JE-JZ6O5-KLVCO-HYFB4'
    });
    wx.getLocation({
      altitude: 'true',
      type: 'gcj02 ',
      isHighAccuracy: true,
      success: res => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        qqmapsdk.reverseGeocoder({
          location:{
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res =>{
            console.log("逆地址转换")
            console.log(res)
            this.setData({
              selectedProvince: res.result.address_component.province,
              selectedCity: res.result.address_component.city
            })
          }
        })
      }
    })
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