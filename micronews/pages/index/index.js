Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar:["国内","国际","财经","娱乐","军事","体育","其他"],
    newstype: ["gn", "gj", "cj", "yl", "js", "ty", "other"],
    currentTab:0,
    listnews:[0,1,2,3,4,5,6,7,8],
    list: [0, 1, 2, 3, 4, 5, 6],
    data:"",
    title:"",
    source:"",
    image:"",
    id:""    
  },

  details(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.id,
    })
  },

  navbarTap: function (e) {     
    this.setData({
       currentTab: e.currentTarget.dataset.idx,      
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
        
       //console.log(result)
        let listnew = []
        for(let i = 0;i<result.length;i++){          
           listnew.push({
              id:result[i].id,
              title:result[i].title,
              date: result[i].date.substr(11,5),
              source:result[i].source,
              image:result[i].firstImage
            })
           //console.log(result[i].date.substr(11, 5))
        
      }
        that.setData ({
            listnews:listnew
           })
       }
    })
  },

  onPullDownRefresh: function () {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

})