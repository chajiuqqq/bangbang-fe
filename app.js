//app.js
App({
  onLaunch: function () {
    console.info('loading app...');
<<<<<<< HEAD
    wx.login({
      success: (res) => {
        console.info(res)
      },
    })
=======
>>>>>>> 23a1043cf99798c6518940a02faeeaf27743e1fd
    // wx.showLoading({
    //   title: '登录中',
    //   mask: true
    // });
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
          method:'POST',
    
          success: function (res) {

            var skey = res.data.skey;

            console.info('already login, skey is', skey);

            //如果获取不到skey，则重试
            if(!skey) {
              that.login(cb);
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
          // 未注册用户
          if (res.statusCode === 400) {
            that.registerUser(cb);
          }
          else {
            that.globalData.userInfo = res.data;
            wx.hideLoading();
            cb();
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
          wx.navigateTo({
            url: '/pages/authority/authority'
          })
        }else{
        //有授权时
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              userInfo = {
                nickname: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
              };
              that.request({
                url: '/user',	
                method: 'post',
                data: userInfo,
                success: function (res) {
                  that.globalData.userInfo = userInfo;
                  cb();
                  wx.hideLoading();
                }
              });
            },
            //授权失败，用默认值注册
            fail: function() {
              that.request({
                url: '/user',
                method: 'post',
                data: that.globalData.userInfo,
                success: function () {
                  cb();
                  wx.hideLoading();
                }
              });
            }
          })
        }
      },
    })
    
  },
  //封装wx.request，自动添加host以及API版本号
  request: function(obj) {
    var skey = wx.getStorageSync('skey');
    obj.url = config.host + obj.url;
    obj.header = {
      skey: skey
    };
    
    return wx.request(obj);
  },
  
  globalData: {
    //默认值
    userInfo: {
      nickname: '新手',
      avatarUrl: 'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png'
    }
  }
})