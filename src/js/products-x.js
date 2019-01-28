require('../less/common.less');
require('../less/normalized.less');
require('../less/products-x.less');
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
            let XData = response
            //console.log(response)
            $("#XMain").html(`
                <div class="XHome">
                    <div class="XHomeImg">
                    </div>
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/files/image/series/20181119/30f962db1360083d1a240ea29def0ef6.jpg">
                    <ul class="XHomeWordsWrap">
                        <li><a>进一步了解</a></li>
                        <li><a>立即购买</a></li>
                        <li><a>门店选购</a></li>
                    </ul>
                </div>
                <div class="XSwiper-wrap">
                    <div class="swiper-container XHomePhone">
                        <div class="swiper-wrapper swiper-XWrap">
                            <div class="swiper-slide swiper-XSlide">
                                <ul class="XPhoneWrap">
                                    ${(function(){
                                        let XPhoneAll = [];
                                        XData.succession.Xsuc.forEach((XPhone,index) => {
                                            XPhoneAll[index]=`
                                                <li class="XPhoneGoods">
                                                    <a>
                                                        <img src="${XPhone.img}">
                                                        <p>${XPhone.phone}</p>
                                                        ${XPhone.Stock != "" ? `<p class="phoneGoodsStock">${XPhone.Stock}</p>` : ""}
                                                    </a>
                                                </li>
                                            `                                        
                                        });
                                        return XPhoneAll.join("")                                                                        
                                    })()}
                                </ul>
                            </div>
                        </div>                          
                    </div>
                    <div class="swiper-button-prev XSwiperBtnP"></div>
                    <div class="swiper-button-next XSwiperBtnN"></div> 
                </div>
                <ul class="XPhoneDes">
                    ${(function(){
                        let XPhoneDesAll = [];
                        XData.succession.XDes.XDesTB.forEach((phoneDesTB,index) => {
                            XPhoneDesAll[index]=`
                                <li class="XPhoneLi">
                                    <img src="${phoneDesTB.img}">
                                    <div class="XPhoneLi-wrap">
                                        <p class="XPhoneLi-wrapPhone">${phoneDesTB.phone}</p>
                                        <p class="XPhoneLi-wrapTitle">${phoneDesTB.title}</p>
                                        ${phoneDesTB.des != "" ? `<p class="XPhoneLi-wrapDes">${phoneDesTB.des}</p>` : ""}
                                        <a>${phoneDesTB.know}</a>
                                        <a>${phoneDesTB.buy}</a>
                                    </div>
                                </li>
                            `
                        });
                        return XPhoneDesAll.join("")
                    })()}
                </ul>
                <ul class="XPhoneDesLR">
                ${(function(){
                    let XPhoneDesLRAll = [];
                    XData.succession.XDes.XDesLR.forEach((phoneDesLR,index) => {
                        XPhoneDesLRAll[index]=`
                            <li class="XPhoneLRLi">
                                <img src="${phoneDesLR.img}">
                                <div class="XPhoneLRLi-wrap">
                                    <p class="XPhoneLRLi-wrapPhone">${phoneDesLR.phone}</p>
                                    <p class="XPhoneLRLi-wrapTitle">${phoneDesLR.title}</p>
                                    ${phoneDesLR.des != "" ? `<p class="XPhoneLRLi-wrapDes">${phoneDesLR.des}</p>` : ""}
                                    <a>${phoneDesLR.know}</a>
                                    <a>${phoneDesLR.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return XPhoneDesLRAll.join("")
                })()}
                </ul>
                <div class="XProduct">
                    <img src="https://wwwstatic.vivo.com.cn/vivoportal/web/dist/constFile/productSeries/Xplay/moreAccessories.png">
                    <br><a>更多配件</a>
                </div>
                <ul class="XPhoneParts">
                ${(function(){
                    let XPhonePartsAll = [];
                    XData.succession.XDes.XMore.forEach((phonePatrs,index) => {
                        XPhonePartsAll[index]=`
                            <li class="XPhonePartsLi">
                                <img src="${phonePatrs.img}">
                                <div class="XPhonePartsLi-wrap">
                                    <p class="XPhonePartsLi-wrapPhone">${phonePatrs.name}</p>
                                    <p class="XPhonePartsLi-wrapTitle">${phonePatrs.title}</p>
                                    <a>${phonePatrs.buy}</a>
                                </div>
                            </li>
                        `
                    });
                    return XPhonePartsAll.join("")
                })()}
                </ul>

            `)
            //swiper初始化,ajax异步加载，保证拿到了数据，生成，再做初始化,若在外面，因为异步加载,加载的时候，可能数据还没得到
            //swiper初始化
                let XSwiper = new Swiper('.swiper-container', {
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
            if(XData.succession.Xsuc.length < 6){
                XSwiper.autoplay.stop();//禁止轮播
                XSwiper.allowSlidePrev = false //禁止左右滑动
                XSwiper.allowSlideNext = false
            }
        }
    });
});