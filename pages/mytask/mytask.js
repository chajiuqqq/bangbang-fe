// pages/category/category.js
var util = require('../../utils/util.js');
var courseData = require('../../data/data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let categoryArr = util.getCategory();
    _this.setData({
      categories: categoryArr
    });
  },

  //左侧选择标题
  selectTab: function (event) {
    let _this = this,
      index = event.currentTarget.dataset.index,
      categoryArr = _this.data.categories;
    for (let i = 0; i < categoryArr.length; i++) {
      categoryArr[i].active = ""; //false
    }
    categoryArr[index].active = "true";
    _this.setData({
      categories: categoryArr
    });
  },
  //右侧选中某一标题跳转商品列表页
  onGoodsTap: function (e) {
    let index = e.currentTarget.dataset.postid;
    let title = e.currentTarget.dataset.title;
    let status = e.currentTarget.dataset.status;
    let Customer_id = e.currentTarget.dataset.customer_id;
    let Customer_name = e.currentTarget.dataset.customer_name;
    let Customer_phone = e.currentTarget.dataset.customer_phone;
    let Helper_id = e.currentTarget.dataset.helper_id;
    let Helper_name = e.currentTarget.dataset.helper_name;
    let Helper_phone = e.currentTarget.dataset.helper_phone;
    let amount = e.currentTarget.dataset.amount;
    let Content = e.currentTarget.dataset.content;
    let Target_address = e.currentTarget.dataset.target_address;
    let Pay_status = e.currentTarget.dataset.pay_status;
    let Review_status = e.currentTarget.dataset.review_status;
    wx.setStorage({
      key: 'category_key',
      data: {
        title,
        index,
        status,
        Customer_id,
        Customer_name,
        Customer_phone,
        Helper_id,
        Helper_name,
        Helper_phone,
        amount,
        Content,
        Target_address,
        Pay_status,
        Review_status
      },
      success: function () {
        wx.navigateTo({
          url: '/pages/productInfo/productInfo?id=' + index 
               + "&title" + title + "&status" + status + "&Customer_id" + Customer_id
               + "&Customer_name" + Customer_name + "&Customer_phone" + Customer_phone + "&Helper_id" + Helper_id 
               + "&Helper_name" + Helper_name + "&Helper_phone" + Helper_phone + "&amount" + amount + "&Content" 
               + Content + "&Target_address" + Target_address + "&Pay_status" + Pay_status + "&Review_status" + Review_status,
        })
      }
    })
  }
})