require('../less/common.less');
require('../less/normalized.less');
require('../less/products-nex.less');
import {barShow,loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    loginState("login-register.html");
    goShopping();
    goToTop();
    $.ajax({
        url: "../json/vivoBrand.json",
        type: "GET",
        success: (response) => {
            let NexData = response
            //console.log(response)
            $("#NexMain").html(`
                <div class="NexHome">
                    <div class="NexHomeImg">
                    </div>
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/files/image/series/20180611/2018061109300284195_original.jpg">
                    <ul class="NexHomeWordsWrap">
                        <li><a>进一步了解</a></li>
                        <li><a>立即购买</a></li>
                        <li><a>门店选购</a></li>
                    </ul>
                </div>
                <div class="NexSwiper-wrap">
                    <div class="swiper-container NexHomePhone">
                        <div class="swiper-wrapper swiper-NexWrap">
                            <div class="swiper-slide swiper-NexSlide">
                                <ul class="NexPhoneWrap">
                                    ${(function(){
                                        let NexPhoneAll = [];
                                        NexData.succession.NEXsuc.forEach((NexPhone,index) => {
                                            NexPhoneAll[index]=`
                                                <li class="NexPhoneGoods">
                                                    <a>
                                                        <img src="${NexPhone.img}">
                                                        <p>${NexPhone.phone}</p>
                                                        ${NexPhone.Stock != "" ? `<p class="phoneGoodsStock">${NexPhone.Stock}</p>` : ""}
                                                    </a>
                                                </li>
                                            `                                        
                                        });
                                        return NexPhoneAll.join("")                                                                        
                                    })()}
                                </ul>
                            </div>
                        </div>                          
                    </div>
                    <div class="swiper-button-prev NexSwiperBtnP"></div>
                    <div class="swiper-button-next NexSwiperBtnN"></div> 
                </div>
                <ul class="NexPhoneDes">
                    ${(function(){
                        let NexPhoneDesAll = [];
                        NexData.succession.NEXDes.NEXDesTB.forEach((phoneDesTB,index) => {
                            NexPhoneDesAll[index]=`
                                <li class="NexPhoneLi">
                                    <img src="${phoneDesTB.img}">
                                    <div class="NexPhoneLi-wrap">
                                        <p class="NexPhoneLi-wrapPhone">${phoneDesTB.phone}</p>
                                        <p class="NexPhoneLi-wrapTitle">${phoneDesTB.title}</p>
                                        ${phoneDesTB.des != "" ? `<p class="NexPhoneLi-wrapDes">${phoneDesTB.des}</p>` : ""}
                                        <a>${phoneDesTB.know}</a>
                                        <a>${phoneDesTB.buy}</a>
                                    </div>
                                </li>
                            `
                        });
                        return NexPhoneDesAll.join("")
                    })()}
                </ul>
                <ul class="NexPhoneDesLR">
                ${(function(){
                    let NexPhoneDesLRAll = [];
                    NexData.succession.NEXDes.NEXDesLR.forEach((phoneDesLR,index) => {
                        NexPhoneDesLRAll[index]=`
                            <li class="NexPhoneLRLi">
                                <img src="${phoneDesLR.img}">
                                <div class="NexPhoneLRLi-wrap">
                                    <p class="NexPhoneLRLi-wrapPhone">${phoneDesLR.phone}</p>
                                    <p class="NexPhoneLRLi-wrapTitle">${phoneDesLR.title}</p>
                                    ${phoneDesLR.des != "" ? `<p class="NexPhoneLRLi-wrapDes">${phoneDesLR.des}</p>` : ""}
                                    <a>${phoneDesLR.know}</a>
                                    <a>${phoneDesLR.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return NexPhoneDesLRAll.join("")
                })()}
                </ul>
                <div class="NexProduct">
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/web/dist/constFile/productSeries/Xplay/moreAccessories.png">
                    <br><a>更多配件</a>
                </div>
                <ul class="NexPhoneParts">
                ${(function(){
                    let NexPhonePartsAll = [];
                    NexData.succession.NEXDes.NEXMore.forEach((phonePatrs,index) => {
                        NexPhonePartsAll[index]=`
                            <li class="NexPhonePartsLi">
                                <img src="${phonePatrs.img}">
                                <div class="NexPhonePartsLi-wrap">
                                    <p class="NexPhonePartsLi-wrapPhone">${phonePatrs.name}</p>
                                    <p class="NexPhonePartsLi-wrapTitle">${phonePatrs.title}</p>
                                    <a>${phonePatrs.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return NexPhonePartsAll.join("")
                })()}
                </ul>

            `)
            //swiper初始化,ajax异步加载，保证拿到了数据，生成，再做初始化,若在外面，因为异步加载,加载的时候，可能数据还没得到
            //swiper初始化
                let NexSwiper = new Swiper('.swiper-container', {
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
           console.log()
            if(NexData.succession.NEXsuc.length < 6){
                NexSwiper.autoplay.stop();//禁止轮播
                NexSwiper.allowSlidePrev = false //禁止左右滑动
                NexSwiper.allowSlideNext = false
            }
        }
    });
});