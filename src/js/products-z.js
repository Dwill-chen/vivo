require('../less/common.less');
require('../less/normalized.less');
require('../less/products-z.less');
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
            let ZData = response
            //console.log(response)
            $("#ZMain").html(`
                <div class="ZHome">
                    <div class="ZHomeImg">
                    </div>
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/files/image/series/20181017/838248b7a2de6c4e70da05d6b54b4aa0.jpg">
                    <ul class="ZHomeWordsWrap">
                        <li><a>进一步了解</a></li>
                        <li><a>立即购买</a></li>
                    </ul>
                </div>
                <div class="ZSwiper-wrap">
                    <div class="swiper-container ZHomePhone">
                        <div class="swiper-wrapper swiper-ZWrap">
                            <div class="swiper-slide swiper-ZSlide">
                                <ul class="ZPhoneWrap">
                                    ${(function(){
                                        let ZPhoneAll = [];
                                        ZData.succession.Zsuc.forEach((ZPhone,index) => {
                                            ZPhoneAll[index]=`
                                                <li class="ZPhoneGoods">
                                                    <a>
                                                        <img src="${ZPhone.img}">
                                                        <p>${ZPhone.phone}</p>
                                                        ${ZPhone.Stock != "" ? `<p class="phoneGoodsStock">${ZPhone.Stock}</p>` : ""}
                                                    </a>
                                                </li>
                                            `                                        
                                        });
                                        return ZPhoneAll.join("")                                                                        
                                    })()}
                                </ul>
                            </div>
                        </div>                          
                    </div>
                    <div class="swiper-button-prev ZSwiperBtnP"></div>
                    <div class="swiper-button-next ZSwiperBtnN"></div> 
                </div>
                <ul class="ZPhoneDes">
                    ${(function(){
                        let ZPhoneDesAll = [];
                        ZData.succession.ZDes.ZDesTB.forEach((phoneDesTB,index) => {
                            ZPhoneDesAll[index]=`
                                <li class="ZPhoneLi">
                                    <img src="${phoneDesTB.img}">
                                    <div class="ZPhoneLi-wrap">
                                        <p class="ZPhoneLi-wrapPhone">${phoneDesTB.phone}</p>
                                        <p class="ZPhoneLi-wrapTitle">${phoneDesTB.title}</p>
                                        ${phoneDesTB.des != "" ? `<p class="ZPhoneLi-wrapDes">${phoneDesTB.des}</p>` : ""}
                                        <a>${phoneDesTB.know}</a>
                                        <a>${phoneDesTB.buy}</a>
                                    </div>
                                </li>
                            `
                        });
                        return ZPhoneDesAll.join("")
                    })()}
                </ul>
                <ul class="ZPhoneDesLR">
                ${(function(){
                    let ZPhoneDesLRAll = [];
                    ZData.succession.ZDes.ZDesLR.forEach((phoneDesLR,index) => {
                        ZPhoneDesLRAll[index]=`
                            <li class="ZPhoneLRLi">
                                <img src="${phoneDesLR.img}">
                                <div class="ZPhoneLRLi-wrap">
                                    <p class="ZPhoneLRLi-wrapPhone">${phoneDesLR.phone}</p>
                                    <p class="ZPhoneLRLi-wrapTitle">${phoneDesLR.title}</p>
                                    ${phoneDesLR.des != "" ? `<p class="ZPhoneLRLi-wrapDes">${phoneDesLR.des}</p>` : ""}
                                    <a>${phoneDesLR.know}</a>
                                    <a>${phoneDesLR.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return ZPhoneDesLRAll.join("")
                })()}
                </ul>
                <div class="ZProduct">
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/web/dist/constFile/productSeries/Xplay/moreAccessories.png">
                    <br><a>更多配件</a>
                </div>
                <ul class="ZPhoneParts">
                ${(function(){
                    let ZPhonePartsAll = [];
                    ZData.succession.ZDes.ZMore.forEach((phonePatrs,index) => {
                        ZPhonePartsAll[index]=`
                            <li class="ZPhonePartsLi">
                                <img src="${phonePatrs.img}">
                                <div class="ZPhonePartsLi-wrap">
                                    <p class="ZPhonePartsLi-wrapPhone">${phonePatrs.name}</p>
                                    <p class="ZPhonePartsLi-wrapTitle">${phonePatrs.title}</p>
                                    <a>${phonePatrs.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return ZPhonePartsAll.join("")
                })()}
                </ul>

            `)
            //swiper初始化,ajax异步加载，保证拿到了数据，生成，再做初始化,若在外面，因为异步加载,加载的时候，可能数据还没得到
            //swiper初始化
                let ZSwiper = new Swiper('.swiper-container', {
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
            if(ZData.succession.Zsuc.length < 6){
                ZSwiper.autoplay.stop();//禁止轮播
                ZSwiper.allowSlidePrev = false //禁止左右滑动
                ZSwiper.allowSlideNext = false
            }
        }
    });
});