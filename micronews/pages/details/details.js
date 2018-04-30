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
        id: 1523074607677/* options.id  //id=1523074607677测试id*/
      },/*通过index页面传递的对象，引用id项用于获取details页面数据*/
      success: function (res) {
        let detail =[]
        var temp 
        let result = res.data.result        
        for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].type ==='p'){
              temp=  result.content[i].text
          }
          else if(result.content[i].type === 'image'){
            temp = result.content[i].src
          }
          else{
            temp = result.content[i].text
          }/*按照原有数据保存，发现无法绑定字段显示，所以这里做了判断统一了字段：把type类型分别为p、image、strong统一为temp */
            detail.push({
            detailtype:result.content[i].type,
            detailcontent:temp,
            detailid: result.content[i].id
          })
          
        } 
        that.setData({
          detailtitle:result.title,
          detaildate: result.date.substr(11,5),
          detailsource:result.source ||'未知来源',
          detailreadcount: result.readCount,
          detailcontent:detail
        })  /*设置新闻页面标题及出处时间、阅读数量*/ 
        }
      })
  
  }
 
})