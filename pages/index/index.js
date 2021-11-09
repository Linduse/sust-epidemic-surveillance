import request from '../../utils/request'
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
    barData:{
      xdata:[],//柱状图国家名称
      ydata:[],//柱状图疫情数据
      barTitle:""//柱状图标题
    },
    barType:1,//柱状图类型
    chinaAllProvinceEpidemicData:{},

    theadData: ["地区","现有","疑似","累计","治愈","死亡"],
    tbodyData:{},

    tAddHeadData:["地区","现有病例","新增本土"],
    tAddBodyData:{},

    tGlobalHeadData:["地区","新增","累计","现有","治愈","死亡"],
    tGlobalBodyData:{},

    worldDataList:[],
    worldDataPoint:[],
    worldMapTitle:"世界疫情累计确诊地图",
    
    worldEpidemicTotalData:{},
    worldEpidemicAddData:{},

    chinaAndWorldAddConfirmTrend:{},//国内外新增确诊趋势数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.getChinaEpidemicTotalData()
    this.getChinaEpidemicAddData()
    this.getAllProvinceEpidemicData()
    this.getLatelyAddConfirmEpidemicData()
    this.getAllProvinceEpidemicDataForWXFrom()
    this.getAllProvinceEpidemicDataTodayAddForWXFrom()
    this.getAllCountryEpidemic()
    this.getWorldEpidemicDataAndTodayAddEpidemicData()
    this.getEpidemicDataTopTenCountry(this.data.barType)
    this.getChinaAndWorldAddConfirmTrend()
    this.getAllCountryEpidemicData()
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

  // 获取中国各个省份的今日新增疫情数据加载微信小程序树形表格
  async getAllProvinceEpidemicDataTodayAddForWXFrom(){
    let data=await request('/api/v1/user/epidemic-data-today/getAllProvinceEpidemicDataTodayAddForWXFrom');
    this.setData({
      tAddBodyData:data.data.result
    })
  },  
  // 获取中国各个省份的详细疫情数据加载微信小程序树形表格
  async getAllProvinceEpidemicDataForWXFrom(){
    let data=await request('/api/v1/user/epidemic-data/getAllProvinceEpidemicDataForWXFrom');
    this.setData({
      tbodyData:data.data.result
    })
  },
  //获取世界各国累计确诊疫情数据加载世界地图
  async getAllCountryEpidemic(){
    let data=await request('/api/v1/user/epidemic-data/getAllCountryEpidemicData');
    this.setData({
      worldDataList:data.data.list,
      worldMapTitle:"世界疫情累计确诊地图"
    })
  },

  //获取世界各国现有确诊疫情数据加载世界地图
  async getAllCountryNowConfirmEpidemicData(){
    let data=await request('/api/v1/user/epidemic-data/getAllCountryNowConfirmEpidemicData');
    this.setData({
      worldDataList:data.data.list,
      worldMapTitle:"世界疫情现有确诊地图"
    })
  },
   //获取全球疫情数据及今日新增疫情数据
   async getWorldEpidemicDataAndTodayAddEpidemicData(){
    let data=await request('/api/v1/user/epidemic-data/getWorldEpidemicDataAndTodayAddEpidemicData');
    this.setData({
      worldEpidemicTotalData:data.data.worldEpidemicTotalData,
      worldEpidemicAddData:data.data.worldEpidemicAddData
    })
  },
  //获取全球疫情数据Top10，加载柱状图
  async getEpidemicDataTopTenCountry(barType){
    let data=await request('/api/v1/user/epidemic-data/getEpidemicDataTopTenCountry'+'/'+barType);
    this.setData({
     barData:data.data
    })
  },
  //柱状图类型更换 点击事件
   changeBarType:function(type){
      this.setData({
        barType:type.target.dataset.type
       })
       this.getEpidemicDataTopTenCountry(this.data.barType)
   },
  //获取国内/国外新增确诊趋势数据
  async getChinaAndWorldAddConfirmTrend(){
    let data=await request('/api/v1/user/epidemic-data/getChinaAndWorldAddConfirmTrend');
    this.setData({
      chinaAndWorldAddConfirmTrend:data.data
    })
  },
  //获取世界各国疫情数据
  async getAllCountryEpidemicData(){
    let data=await request('/api/v1/user/epidemic-data/getAllCountryEpidemicDataForWXFrom');
    this.setData({
      tGlobalBodyData:data.data.result
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