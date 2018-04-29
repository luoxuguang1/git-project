Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailtitle:'',
    detailsource:'',
    detailimage:'',
    detaildate:'',
    detailcontent:[],
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
     wx.request({
      url: 'https://test-miniprogram.com/api/news/detail?',
      data: {
        id: options.id  //id=1523074607677测试id
      },
      success: function (res) {
        let detail =[]
        var temp 
        let result = res.data.result
        //console.log(result.content)
        for (let i = 0; i < result.content.length; i++) {
          //console.log(result.content[i])
          if (result.content[i].type ==='p'){
              temp=  result.content[i].text
          }
          else if(result.content[i].type === 'image'){
            temp = result.content[i].src
          }
          else{
            temp = result.content[i].text
          }
          console.log(temp)
          detail.push({
            detailtype:result.content[i].type,
            detailcontent:temp,
            detailid: result.content[i].id
          })
          
        } console.log(detail)
        that.setData({
          detailtitle:result.title,
          detaildate: result.date.substr(11,5),
          detailimage:result.firstImage,
          detailsource:result.source,
          detailreadcount: result.readCount,
          detailcontent:detail
        })   
        }
      })
  
  }
 
})