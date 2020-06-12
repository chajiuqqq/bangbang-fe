// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    taskprice:'',
    text1:"￥",
    text2:"联系电话：",
    phonenum:'',
    text3:"订单编号：",
    tasknum:'',
    text4:"下单时间：",
    tasktime:'',
    text5:"地址：",
    address:'',
    text6:"服务要求：",
    max: 150, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
    text8:"立即抢单",
    request:''
  },

inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    console.log(len)

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

    console.log(this.data)
  },

  GetThisTask:function(e){

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name= options.name;
    var task= options.task;
    var tasknum= options.tasknum;
    var tasktime= options.tasktime;
    var taskprice= options.taskprice;
    var phonenum= options.phonenum;
    var address= options.address;
    var request= options.request;
    this.setData({
      name:name,
      task:task,
      tasknum:tasknum,
      tasktime:tasktime,
      taskprice:taskprice,
      phonenum:phonenum,
      address:address,
      request:request,
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