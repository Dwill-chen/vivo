require('../less/common.less');
require('../less/normalized.less');
require("../less/funtouchos.less");
import {barShow,loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    loginState();
    loginState("login-register.html");
    goShopping();
    goToTop();
    // 2.整体切换
    // 圆圈
    let squareBtn = $(".circel-change").toArray();
    // 手机图
    let bigImg = $(".bigIMG").toArray();
    // 文字
    let twoText = $(".sqText").toArray();
    // 背景图
    let bgImg = $(".backBg").toArray();
    $(squareBtn).each(function(index,item){
        $(item).click(function(){
            if($(squareBtn).eq(index).hasClass("show1")){
                $(squareBtn).eq(index).removeClass("show1");
            };
             // 切换圆圈
            $(squareBtn).eq(index).siblings().addClass("show1");
            // 切换文字
            $(twoText).eq(index).removeClass("sqText-show").siblings().addClass("sqText-show");
            // 切换手机图
            $(bigImg).eq(index).removeClass("pic-change").siblings().addClass("pic-change");
            // 切换背景图
            $(bgImg).eq(index).removeClass("show-bg").siblings().addClass("show-bg");
        });
    })
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
    // 5. 照片选项切换
    // 获取所有点击的li标签
    let clickTab = $(".funtouch-five-click li").toArray();
    // 获取所有图片
    let imgBg = $(".pic-bg").toArray();
    let icons = $(".icon").toArray();
    $(clickTab).each(function(index,item){
        $(item).click(function(){
            if($(icons).eq(index).hasClass("selected")){
                $(icons).eq(index).removeClass("selected");
                // 滚条切换
                $(item).find(".border-long").removeClass("long");
            };
            // 图标切换
            $(icons).eq(index).addClass("selected").parent().siblings().find(".icon").removeClass("selected");
            // 滚条切换
            $(item).find(".border-long").addClass("long").parents(item).siblings().find(".border-long").removeClass("long");
            // 图片切换
            $(imgBg).eq(index).addClass("pic-bg-show").parent().siblings().find(imgBg).removeClass('pic-bg-show');
        });
    });
    // 14.扫一扫的切换
    // 获取所有点击的li标签
    let fortyTab = $(".forty-tab li").toArray();
    // 获取所有图片
    let fortyImg = $(".forty-img-f img").toArray();
    // 获取所有图标
    let firtyIocn = $(".ico").toArray();
    // 获取所有的文字标签
    let fortyTe = $(".forty-test").toArray();
    // 获取所有li的下边框
    let fortyLong = $(".forty-long").toArray();
    $(fortyTab).each(function(index,item){
        $(item).click(function(){
            if($(firtyIocn).eq(index).hasClass("icon-show")){
                $(firtyIocn).eq(index).removeClass("icon-show");
            };
           // 切换图标
            $(firtyIocn).eq(index).addClass("icon-show").parent().siblings().find(".ico").removeClass("icon-show");
            // 切换文字
            $(fortyTe).eq(index).addClass("icon-show").parent().siblings().find(".forty-test").removeClass("icon-show");
            // 切换长条
            $(fortyLong).eq(index).addClass("long-show").parent().siblings().find(".forty-long").removeClass("long-show");
            // 切换图片
            $(fortyImg).eq(index).addClass("forty-img-floor").parent().siblings().find(fortyImg).removeClass("forty-img-floor");
        });
    });
    // 16.轮播图
    var mySwiper = new Swiper('.swiper-container',{
        loop:true,
        normalizeSlideIndex:false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    });    
});