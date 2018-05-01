var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    navbar:["国内","国际","财经","娱乐","军事","体育","其他"],
    newstype: ["gn", "gj", "cj", "yl", "js", "ty", "other"],
    currentTab:0,
    listNews:[0,1,2,3,4,5,6,7,8],
    list: [0,1,2,3,4,5,6],
    data:"",
    title:"",
    source:"",
    image:"",
    id:"",
    defaultImage:"/images/defaultImage.jpg"    
  },

  details(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id,
    })
  },

  navbarTap: function (e) {     
    this.setData({
       currentTab: e.currentTarget.dataset.idx,  //通过监听点击哪个tap版块获取到索引    
    })  
    this.getNews()
    },
  onLoad: function (options) {
      this.getNews()
  },

  getNews(){
      var that =this
      
      wx.request({
      url: 'https://test-miniprogram.com/api/news/list', 
      data: {
        type: that.data.newstype[that.data.currentTab]
      },
      success: function (res) {
        
        let result = res.data.result        
        let listNews = []        
        for(let i = 0;i<result.length;i++){          
           listNews.push({
              id:result[i].id,
              title:result[i].title,
              date: util.formatTime(result[i].date),//对日期字段进行截取，由原字段"2018-03-10T00:36:48.000Z" 取其中时间 00:36
              source: result[i].source || "未知来源",
              image:result[i].firstImage || defaultImage,
            })/* 用数组分别保存id、标题、时间、新闻出处、图片路径，id用于传递到详情页面 */
      }
        that.setData ({
            listNews:listNews
           })
       },
    complete:function(){
        wx.stopPullDownRefresh()
    }
    })
  },

  onPullDownRefresh: function () {
    this.getNews()
  },

})