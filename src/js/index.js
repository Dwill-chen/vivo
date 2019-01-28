require('../less/common.less');
require('../less/normalized.less');
require('../less/index.less');
import {barShow,loginState,enterOver} from './function.js';
$(function(){
    barShow();
    loginState("static/pages/login-register.html");
    enterOver();
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2
          // 进度条
          // type : 'progressbar',  
          // progressbarOpposite: true,   
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
});