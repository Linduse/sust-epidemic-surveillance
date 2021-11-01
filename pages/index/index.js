import request from '../../utils/request'
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chinaEpidemicTotalData:{},
    chinaEpidemicAddData:{},
    dataList:[],
    dataPoint:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.getChinaEpidemicTotalData()
    this.getChinaEpidemicAddData()
    this.getAllProvinceEpidemicData()
  },
  
  //获取最新疫情数据
  async getChinaEpidemicTotalData(){
    let chinaEpidemicTotalData=await request('/api/v1/user/epidemic-data/getChinaEpidemicTotalData');
    this.setData({
      chinaEpidemicTotalData:chinaEpidemicTotalData.data.chinaEpidemicTotalData
    })
  },
 //获取最新疫情新增数据
  async getChinaEpidemicAddData(){
    let chinaEpidemicAddData=await request('/api/v1/user/epidemic-data-trend/getTodayEpidemicDataTrend');
    this.setData({
      chinaEpidemicAddData:chinaEpidemicAddData.data.chinaEpidemicAddData
    })
  },
  //获取各个省疫情累积确诊数据
  async getAllProvinceEpidemicData(){
    let dataList=await request('/api/v1/user/epidemic-data/getAllProvinceEpidemicData');
    // console.log(dataList.data.list);
    this.setData({
      dataList:dataList.data.list
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