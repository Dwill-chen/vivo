require('../less/common.less');
require('../less/normalized.less');
require('../less/store.less');
import {barShow,loginState,goShopping,goToTop} from './function.js';
(function(){
    barShow();
    goShopping();
    loginState("login-register.html");
    goToTop();
    var appendNumber = 7;
    var prependNumber = 1;
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.13, 39.75), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
      mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
          ]}));	  
    map.setCurrentCity("北京房山区长沟大街专卖店");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
})();