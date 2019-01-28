require('../less/common.less');
require('../less/normalized.less');
require('../less/products-y.less');
import {barShow,loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    loginState("login-register.html");
    goShopping();
    goToTop();
    //数据加载
    $.ajax({
        url: "../json/vivoBrand.json",
        type: "GET",
        success: (response) => {
            let YData = response
            //console.log(response)
            $("#YMain").html(`
                <div class="YHome">
                    <div class="YHomeImg">
                    </div>
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/files/image/series/20180910/3ba1d6a7fdd4ca320f3b628197d7a298.jpg">
                    <ul class="YHomeWordsWrap">
                        <li><a>进一步了解</a></li>
                        <li><a>立即购买</a></li>
                        <li><a>门店选购</a></li>
                    </ul>
                </div>
                <div class="YSwiper-wrap">
                    <div class="swiper-container YHomePhone">
                        <div class="swiper-wrapper swiper-YWrap">
                            <div class="swiper-slide swiper-YSlide">
                                <ul class="YPhoneWrap">
                                    ${(function(){
                                        let YPhoneAll = [];
                                        YData.succession.Ysuc.forEach((YPhone,index) => {
                                            YPhoneAll[index]=`
                                                <li class="YPhoneGoods">
                                                    <a>
                                                        <img src="${YPhone.img}">
                                                        <p>${YPhone.phone}</p>
                                                        ${YPhone.Stock != "" ? `<p class="phoneGoodsStock">${YPhone.Stock}</p>` : ""}
                                                    </a>
                                                </li>
                                            `                                        
                                        });
                                        return YPhoneAll.join("")                                                                        
                                    })()}
                                </ul>
                            </div>
                        </div>                          
                    </div>
                    <div class="swiper-button-prev YSwiperBtnP"></div>
                    <div class="swiper-button-next YSwiperBtnN"></div> 
                </div>
                <ul class="YPhoneDes">
                    ${(function(){
                        let YPhoneDesAll = [];
                        YData.succession.YDes.YDesTB.forEach((phoneDesTB,index) => {
                            YPhoneDesAll[index]=`
                                <li class="YPhoneLi">
                                    <img src="${phoneDesTB.img}">
                                    <div class="YPhoneLi-wrap">
                                        <p class="YPhoneLi-wrapPhone">${phoneDesTB.phone}</p>
                                        <p class="YPhoneLi-wrapTitle">${phoneDesTB.title}</p>
                                        ${phoneDesTB.des != "" ? `<p class="YPhoneLi-wrapDes">${phoneDesTB.des}</p>` : ""}
                                        <a>${phoneDesTB.know}</a>
                                        <a>${phoneDesTB.buy}</a>
                                    </div>
                                </li>
                            `
                        });
                        return YPhoneDesAll.join("")
                    })()}
                </ul>
                <ul class="YPhoneDesLR">
                ${(function(){
                    let YPhoneDesLRAll = [];
                    YData.succession.YDes.YDesLR.forEach((phoneDesLR,index) => {
                        YPhoneDesLRAll[index]=`
                            <li class="YPhoneLRLi">
                                <img src="${phoneDesLR.img}">
                                <div class="YPhoneLRLi-wrap">
                                    <p class="YPhoneLRLi-wrapPhone">${phoneDesLR.phone}</p>
                                    <p class="YPhoneLRLi-wrapTitle">${phoneDesLR.title}</p>
                                    ${phoneDesLR.des != "" ? `<p class="YPhoneLRLi-wrapDes">${phoneDesLR.des}</p>` : ""}
                                    <a>${phoneDesLR.know}</a>
                                    <a>${phoneDesLR.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return YPhoneDesLRAll.join("")
                })()}
                </ul>
                <div class="YProduct">
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/web/dist/constFile/productSeries/Xplay/moreAccessories.png">
                    <br><a>更多配件</a>
                </div>
                <ul class="YPhoneParts">
                ${(function(){
                    let YPhonePartsAll = [];
                    YData.succession.YDes.YMore.forEach((phonePatrs,index) => {
                        YPhonePartsAll[index]=`
                            <li class="YPhonePartsLi">
                                <img src="${phonePatrs.img}">
                                <div class="YPhonePartsLi-wrap">
                                    <p class="YPhonePartsLi-wrapPhone">${phonePatrs.name}</p>
                                    <p class="YPhonePartsLi-wrapTitle">${phonePatrs.title}</p>
                                    <a>${phonePatrs.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return YPhonePartsAll.join("")
                })()}
                </ul>

            `)
            //swiper初始化,ajax异步加载，保证拿到了数据，生成，再做初始化,若在外面，因为异步加载,加载的时候，可能数据还没得到
            //swiper初始化
                let YSwiper = new Swiper('.swiper-container', {
                    // 自动播放
                    autoplay: true,
                    // 滚动持续时间
                    speed: 1000,
                    // 滚动方向
                    direction: 'horizontal',
                    // 循环模式
                    loop: true,
                    // 前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    //左右按钮控制
                    allowSlidePrev : true,
                    allowSlideNext : true,
                    //禁止拖动
                    noSwiping : true,
                    noSwipingClass : 'stop-swiping',
                }); 
            //轮播的判断
            if(YData.succession.Ysuc.length < 6){
                YSwiper.autoplay.stop();//禁止轮播
                YSwiper.allowSlidePrev = false //禁止左右滑动
                YSwiper.allowSlideNext = false
            }
        }
    });
});