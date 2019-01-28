require('../less/common.less');
require('../less/normalized.less');
require('../less/brand.less');
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
            let brandData = response
            $("#brandMain").html(`
            <div class="titleWrap">
                <img src="${brandData.brand.home.img}">
                <div class="wordWrap">
                    <p>${brandData.brand.home.title}</p>
                    <p>${brandData.brand.home.details}</p>
                    <p>${brandData.brand.home.more}</p>
                </div>
            </div>
            <div class="SeparateWrap">
                <span>资讯聚焦</span>
                <a>更多资讯></a>
            </div>
            <ul class="phoneShow">
                ${(function(){//自调用函数
                    let phoneSh = [];
                    //动态生成brand页面的phone介绍
                    brandData.brand.content.forEach((phoneAll,index) => {
                        phoneSh[index] = `
                        <li class="phoneGoods">
                            <a>
                                <div class="phoneGoodsWrap">
                                    <img src="${phoneAll.img}" class="phoneGoodsPic">
                                </div>
                                <div class="phoneGoodsDes">
                                ${phoneAll.date != "" ? `<p class="phoneGoodsDate">${phoneAll.date}</p>` : ""}
                                ${phoneAll.browse != "" ? `<p class="phoneGoodsBrowse">${phoneAll.browse} 人浏览</p>` : ""}
                                ${phoneAll.title != "" ? `<p class="phoneGoodsTitle">${phoneAll.title}</p>` : ""}
                                ${phoneAll.details != "" ? `<p class="phoneGoodsDetails">${phoneAll.details}</p>` : ""}
                                ${phoneAll.more != "" ? `<p class="phoneGoodsMore">${phoneAll.more} ></p>` : ""}
                                </div>
                            </a>
                        </li>
                        `
                    });
                    return phoneSh.join("")
                })()}
            </ul>
            <div class="SeparateWrap">
                <span>产品美学</span>
            </div>
            <ul class="productEsthetics">
                ${(function(){
                    let productEsShow = [];
                    brandData.brand.phoneDetail.forEach((estheticsAll,index) => {
                        productEsShow[index] = `
                        <li class="estheticsGoods">
                            <div class="esGoodsDetails">
                                <p>${estheticsAll.title}</p>
                                <p>${estheticsAll.details}</p>
                            </div>
                            <div class="esGoodsImgS">
                                <img src="${estheticsAll.img}" class="esGoodsImgSmall">
                            </div>
                            <div class="esGoodsDescribe">
                                <p>${estheticsAll.describe}</p>
                                <a>${estheticsAll.know}</a>
                            </div>
                            <div class="esGoodsImgL">
                                <img src="${estheticsAll.img}" class="esGoodsImgLarge">
                            </div>
                        </li>
                        `
                    });
                    return productEsShow.join("")
                })()}
            </ul>
            <div class="titleWrap">
                <img src="${brandData.brand.video.img}">
                <div class="wordWrap">
                    <p>影像空间</p>
                    <p>记录你的美</p>
                    <p>开始欣赏</p>
                </div>
            </div>
            <div class="SeparateWrap">
                <span>活动臻选</span>
            </div>

            <ul class="phoneShow">
                ${(function(){//自调用函数
                    let phoneSh = [];
                    //动态生成brand页面的phone介绍
                    brandData.brand.activity.forEach((phoneAll,index) => {
                        phoneSh[index] = `
                        <li class="phoneGoods chooseObj">
                            <a>
                                <div class="phoneGoodsWrap">
                                    <img src="${phoneAll.img}" class="phoneGoodsPic">
                                </div>
                                <div class="phoneGoodsDes chooseObjWord">
                                    ${phoneAll.title != "" ? `<p class="phoneGoodsTitle">${phoneAll.title}</p>` : ""}
                                    ${phoneAll.details != "" ? `<p class="phoneGoodsDetails">${phoneAll.details}</p>` : ""}
                                    ${phoneAll.more != "" ? `<p class="phoneGoodsMore">${phoneAll.more} ></p>` : ""}
                                </div>
                            </a>
                        </li>
                        `
                    });
                    return phoneSh.join("")
                })()}
            </ul>
            `)

            //brand页面
            //产品美学的hover
            $(".estheticsGoods").hover(function(){
                $(this).css({"width":"68.5%"}).siblings($(".estheticsGoods")).css({"width":"10%"})
                $(this).find($(".esGoodsDescribe")).css({"opacity":"1","top":"-220px"})
                $(this).find($(".esGoodsImgL img")).css({"opacity":"1"})
                $(this).find($(".esGoodsImgS img")).css({"opacity":"0"})
                $(this).siblings($(".esGoodsDetails")).css({"opacity":"0.5"})
            },function(){
                $(this).css({"width":"24.5%"}).siblings($(".estheticsGoods")).css({"width":"24.5%"})
                $(this).find($(".esGoodsDescribe")).css({"opacity":"0"})
                $(this).find($(".esGoodsImgL img")).css({"opacity":"0"})
                $(this).find($(".esGoodsImgS img")).css({"opacity":"1"})
                $(this).siblings($(".esGoodsDetails")).css({"opacity":"1"})
            })
        }
    });
});