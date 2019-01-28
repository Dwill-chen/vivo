require('../less/common.less');
require('../less/normalized.less');
require('../less/z1.less');
import {barShow, loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    loginState("login-register.html"); 
    goToTop();
    // 4.所有懒加载
    // 获取动画元素
    let animateBox = $(".animation-wrapper").toArray();
    let _height = $(window).height();
    // 当前滚动的距离
    let _offset = 0;
    // 将动画元素在页面中的位置存到_locations集合
    let locations = [];
    $(animateBox).each(function(index,item){
        locations[index] = $(item).offset().top;
    });
    $(window).scroll(function(){
        // 获取当前页面滚动的距离
        _offset =  $(document).scrollTop();
        $(locations).each(function(index,location){
            if(_height + _offset > location + 80) {
                $(animateBox).eq(index).addClass('running');
            };
        });
    });
})