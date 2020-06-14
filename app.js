//app.js
var config = require('./config')
App({
  onLaunch: function () {
    // 暂时清理一下
    wx.clearStorage({
      complete: (res) => {},
    })
    console.info('loading app...');
    wx.showLoading({
      title: '登录中',
      mask: true
    });
  },
  
  //检测是否登录
  checkLogin: function (cb) {
    console.info('check login...');
    var skey = wx.getStorageSync('skey');
    if (skey) {
      this.getUserInfo(cb);
    }
    else {
      this.login(cb);
    }
    
  },

  //登录
  //step1，调用wx.login获取code
  //step2，发送code到腾讯云，并且返回第三方skey，存储到本地
  //step3，获取用户信息
  login: function (cb) {
    console.info('login...');
    var that = this;
    wx.login({
      success: function (res) {
        // 登录请求
        wx.request({
          url: config.host + '/user/login',
          data: {
            code: res.code
          },
          success: function (res) {

            var skey = res.data.skey;

            console.info('already login, skey is', skey);

            //如果获取不到skey，则重试
            if(!skey) {
              that.login();
              return;
            }

            wx.setStorageSync('skey', skey);
            that.getUserInfo(cb);
          }
        })
      }
    });
  },

  //获取用户信息
  //对于未登录用户，重新登录
  //对于未注册用户，注册新用户
  //对于已注册用户，全局写入用户信息
  getUserInfo: function (cb) {
    var that = this;
    this.request({
      url: '/user',
      success: function (res) {
          //skey超时,重新获取skey
          if(res.statusCode == 401){
            wx.clearStorage({
              complete: (res) => {},
            })
            console.log("skey已过期...正在重新获取")
            that.login()
          }
          // 未注册用户
          else if (res.statusCode == 400) {
            that.registerUser(cb);
          }
          else {
            console.log('已注册，skey未过期:',wx.getStorageSync('skey'))
            if(cb){
              cb()
            }
            that.globalData.userInfo = res.data;
            wx.hideLoading();
          }
        }
      
    });
  },

  //注册用户
  //在User表中添加记录
  //授权失败写入默认用户信息，否则写入通过wx.getUserInfo获取的用户信息
  registerUser: function (cb) {
    var that = this;
    wx.getSetting({
      success: (res) => {
        //没有权限时
        if(!res.authSetting['scope.userInfo']){
          console.log('未获得授权，正在跳转...')
          wx.navigateTo({
            url: '/pages/authority/authority'
          })
        }else{
        //有授权时
          wx.getUserInfo({
            success: function (res) {
              console.log('已获得授权，正在注册...')
              var userInfo = res.userInfo;
              userInfo = {
                nickname: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
              };
              that.request({
                url: '/user',	
                method: 'POST',
                data: userInfo,
                success: function (res) {
                  that.globalData.userInfo = userInfo;
                  wx.hideLoading();
                }
              });
            },
            //授权失败，用默认值注册
            fail: function() {
              that.request({
                url: '/user',
                method: 'POST',
                data: that.globalData.userInfo,
                success: function () {
                  
                  wx.hideLoading();
                }
              });
            },
            complete:()=>{
              if(cb){
                cb()
              }
            }
          })
        }
      },
    })
    
  },
  //封装wx.request，自动添加host以及API版本号
  request: function(obj) {
    var skey = wx.getStorageSync('skey');
    if(!skey){
      skey = 'qqq'
    }
    obj.url = config.host + obj.url;
    obj.url = obj.url + '?skey=' + skey;
    return wx.request(obj);
  },

  takeOrder:function(order){
    wx.showModal({
      title:'确定接单吗',
      success:(res)=>{
        if(res.confirm){
          this.judge(order)
            .then((res)=>{
              wx.showToast({
                title: '接单成功'
              })
              wx.navigateTo({
                url: `/pages/task/task?orderId=${res}`
              })
            },(err)=>{
              wx.showToast({
                title: err.errmsg,
                icon:'none'
              })
            })
        }
      }
    })
  },
  judge:function(obj){
    return new Promise(function(resolve,reject){
      let currentOpenid = getApp().globalData.userInfo.openId
      if(currentOpenid != obj.customerId){
        getApp().request({
          url:`/order/${obj.orderId}`,
          method:'PUT',
          data:{
            option:0
          },
          success:(res)=>{
            if(res.statusCode == 200){
              resolve(obj.orderId)
            }else if(res.statusCode == 401){
              reject({errmsg:'请先完善帮手信息'})
            }else{
              reject({errmsg:'接单失败'})
            }
          },
          fail:(err)=>{
            console.log(err)
            reject({errmsg:'接单失败'})
          }
        })
      }else{
        reject({errmsg:'不可接自己的单'})
      }
    })
  },
  
  globalData: {
    //默认值
    userInfo: {
      nickname: '新手',
      avatarUrl: 'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png'
    },
    selectedAddress:{},
    //我的订单页 我的订单：0 我接的单：1，用于控制每个订单项下button的显示
    currentMyOrderIndex:0
  }
})