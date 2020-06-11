//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text1:"附近订单",
    post:"发布订单",
    text2:"订单编号：",
    // tasknum:"20200602",
    // name:"张三李四",
    text3:"任务：",
    // task:"取快递",
    text4:"期望送达时间：",
    text5:"佣金：",
    // tasktime:"20200602 14:29",
    text6:"￥",
    // taskprice:"15",
    text7:"接单",
    list:[
      {
        id:0,
        tasknum:"20200602",
        name:"蔡佳晨",
        task:"取快递",
        tasktime:"13:00-14:00",
        taskprice:"15",
        phonenum:"17717969475",
        address:"上海奉贤",
        request:"麻烦送到男生寝室3楼301"
      },
      {
        id:1,
        tasknum:"20200603",
        name:"周莹",
        task:"取外卖",
        tasktime:"8:00-9:00",
        phonenum:"13567800818",
        taskprice:"10",
        address:"浙江宁波",
        request:"放到33号楼寝室楼下就可以啦"
      },
      {
        id:2,
        tasknum:"20200604",
        name:"王登辉",
        task:"打印",
        tasktime:"19:00-20:00",
        taskprice:"8",
        phonenum:"13984271804",
        address:"贵州遵义",
        request:"麻烦双面打印，打印10份，谢谢"
      },
      {
        id:3,
        tasknum:"20200605",
        name:"张世明",
        task:"取快递",
        tasktime:"9:00-10:00",
        taskprice:"12",
        phonenum:"19121549171",
        address:"上海普陀",
        request:"请尽快送到，谢谢"
      },
      {
        id:4,
        tasknum:"20200606",
        name:"张智斌",
        task:"取外卖",
        tasktime:"12:00-13:00",
        taskprice:"10",
        phonenum:"13501702595",
        address:"上海浦东",
        request:"外卖含汤，请小心"
      }
      ]
  },
  gotodetail:function(e){
    let tasknum = e.currentTarget.dataset.tasknum;
    let name=e.currentTarget.dataset.name;
    let task=e.currentTarget.dataset.task;
    let tasktime=e.currentTarget.dataset.tasktime;
    let taskprice=e.currentTarget.dataset.taskprice;
    let phonenum=e.currentTarget.dataset.phonenum;
    let address=e.currentTarget.dataset.address;
    let request=e.currentTarget.dataset.request;
    console.log(e);
    wx.navigateTo({

      url: '../task/task?tasknum=' + tasknum+'&name='+name+'&task='+task+'&tasktime='+tasktime+'&taskprice='+taskprice+"&phonenum="+phonenum+"&address="+address+"&request="+request,

    })

},
GetThisTask:function(e){

},
  // gotopost:function(){
  //   wx.navigateTo({
  //     url:"../posttask/posttask"
  //   })
  // },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
  },
  getUserInfo: function(e) {
   
  }
})
