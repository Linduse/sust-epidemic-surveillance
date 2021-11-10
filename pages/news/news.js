// pages/news/news.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    headerPictureUrl:"/static/images/picture/header.png",//顶部图片地址
    nav: ["今日资讯","科大要闻","通知公告","防控知识"],//导航栏
    navSelect:1,
    articleList:[
      {
        title:"北京化工大学刘永春教授做客我校“前沿科学报告”-陕西科技大学"
      },
      {
        title:"杨帆老师团队获第一届全国高校电子信息类专业课程实验教学案例设计竞赛一等奖-陕西科技大学"
      },
      {
        title:"我校荣获“2021年易班优课大学生党史学习知识竞赛”百强高校优秀组织奖-陕西科技大学"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleListByType()
  },

  //更换资讯类型
  changeNavSelect:function(navSelect){
    this.setData({
      navSelect:navSelect.target.dataset.navselect
     })
     this.getArticleListByType()
  },
  //产看资讯详情
  viewDetails:function(articleId){
    console.log(articleId);
    const id=articleId.target.dataset.articleid; 
    wx.navigateTo({
      url: '../articledetails/articledetails?id='+id,
    })
  },
    //获取文章标题列表
    async getArticleListByType(){
      let data=await request('/api/v1/user/article/getArticleListByType'+'/'+this.data.navSelect);
      this.setData({
        articleList:data.data.list
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