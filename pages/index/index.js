import request from '../../utils/request'
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './china';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chinaEpidemicTotalData:{},
    chinaEpidemicAddData:{},
    dataList:[],
    dataPoint:[],
    chinaMapTitle:"中国疫情累计确诊地图",
    lineData:{
      xdata:[],//折线图日期
      ydata:[],//折线图数据
      lineTitle:""//折线图标题
    },
    chinaAllProvinceEpidemicData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.getChinaEpidemicTotalData()
    this.getChinaEpidemicAddData()
    this.getAllProvinceEpidemicData()
    this.getLatelyAddConfirmEpidemicData()
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
  //获取各个省疫情累积确诊数据，加载地图
  async getAllProvinceEpidemicData(){
    let dataList=await request('/api/v1/user/epidemic-data/getAllProvinceEpidemicData');
    this.setData({
      dataList:dataList.data.list,
      chinaMapTitle:"中国疫情累计确诊地图"
    })
  },
  //获取各个省现有确诊数据,加载地图
  async getAllProvinceNowConfirmData(){
    let dataList=await request('/api/v1/user/epidemic-data/getAllProvinceNowConfirmData');
    this.setData({
      dataList:dataList.data.list,
      chinaMapTitle:"中国疫情现有确诊地图"
    })
  },
  //获取近十五天内国内新增疫情数据，加载折线图
  async getLatelyAddConfirmEpidemicData(){
    let data=await request('/api/v1/user/epidemic-data-trend/getLatelyAddConfirmEpidemicData');
    this.setData({
      lineData:data.data
    })
  },
    //获取近十五天内国内境外输入疫情数据，加载折线图
    async getLatelyImportedCaseEpidemicData(){
      let data=await request('/api/v1/user/epidemic-data-trend/getLatelyImportedCaseEpidemicData');
      this.setData({
        lineData:data.data
      })
    },

  //获取15天内国内新增确诊病例
  
  //地图模块
  //1.设置图标需要的option

  //2.初始化图表




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