// 小屏幕显示菜单
function barShow(){
    $(".li").hover(function(){
        $(".tab-bgShow").css("display","block")
    },function(){
        $(".tab-bgShow").css("display","none")
    }
    )
    $(".user-show").mouseleave(function(){
        $('.user-mark').css('display','none');
    }).mouseover(function(){
        $('.user-mark').css('display','block');
    });
}
// 登陆注册状态显示
function loginState(url){
    // 判断是否登陆
    if(sessionStorage.isLogin) {
        $('.user-login').css("display","none");
        
        $('.edit').css("display","block");
        $('.userInfos').css("display","block");
        $('.userInfos').html(`<a><i class="iconfont">&#xe81e;</i> ${sessionStorage.user}</a>`);
        
    }else{
        $('.user-login').css("display","block");
        $('.userInfos').css("display","none");
        $('.edit').css("display","none");
        $('.user-login').click(function(){
            location.href = url;
        });
    }
    $('.edit').click(function(){
        sessionStorage.clear();
        window.location.reload();
    });
}
//跳转购物车页面
function goShopping(){
    let goShopp = $(".user-login").prev().prev().prev()
    goShopp.click(function(){
        window.open('../pages/shoppingcart.html','_self');
    })
}
function goToTop(){
    //回到顶部插件初始化
    $("#gotop").click(function(e) {
        TweenMax.to(window, 1.5, {scrollTo:0, ease: Expo.easeInOut});
        var huojian = new TimelineLite();
         huojian.to("#gotop1", 1, {rotationY:720, scale:0.6, y:"+=40", ease:  Power4.easeOut})
         .to("#gotop1", 1, {y:-1000, opacity:0, ease:  Power4.easeOut}, 0.6)
         .to("#gotop1", 1, {y:0, rotationY:0, opacity:1, scale:1, ease: Expo.easeOut, clearProps: "all"}, "1.4");
    });
    //超出一个屏幕高度，totop显示
    $(document).scroll(function(){
        //console.log(123)
        let top=$(document).scrollTop();
        if(top<600){
            $('.brandIconfont').hide();
        }else{
            $('.brandIconfont').show();
        }
    })
}              
// 商城页面异步加载选项卡切换数据
function mall(){
    $.ajax({
        url:"../json/mall.json",
        type:"GET",
        success:function(datas){
            var htmlStr = "";
            $(datas).each(function(index,data){
                htmlStr += `
                <li>
                    <span>${data.title}</span>
                    <span>></span>
                    <div class="category-box">
                        <div class="category-detailBox">
                            <div class="category-detail">
                                <div class="category-title"><span>${data.title}</span><a href="javascript:;">全部${data.title}></a></div>
                                <div class="sub-box">
                                ${(function(){
                                    if(data.sub){
                                        var subHtml = '';
                                        $(data.sub).each(function(index, subItem){
                                            subHtml += `
                                                <div class="sub">
                                                    <img src="${subItem.img}">
                                                    <span>${subItem.service}</span>
                                                </div>
                                            `;
                                        });
                                        return subHtml;
                                    }
                                    else{
                                        return '';
                                    }
                                })()}
                                </div>
                                <ul class="category-product">
                                    ${(function(){
                                        var phoneStr = '';
                                        $(data.phone).each(function(index,phone){
                                            phoneStr += `
                                                <li>
                                                    <img src="${phone.img}">
                                                    <span>${phone.service}</span>
                                                </li>
                                            `;
                                        });
                                        return phoneStr;
                                    })()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                `;
            });
        $('.main-list').html(htmlStr);
        var flash = new LHYFlash({
            id: "flash-box",
            imgs: [
                "https://shopstatic.vivo.com.cn/vivoshop/commodity/20181119/2018111919432777472_original.jpg",
                "https://shopstatic.vivo.com.cn/vivoshop/commodity/20181119/20181119195127520814_original.jpg",
                "https://shopstatic.vivo.com.cn/vivoshop/commodity/20181119/20181119194129593105_original.jpg",
                "https://shopstatic.vivo.com.cn/vivoshop/commodity/20181119/20181119194221569977_original.jpg",
                "https://shopstatic.vivo.com.cn/vivoshop/commodity/20181119/2018111919425299637_original.jpg",
            ]
        });
        }
    });
    $.ajax({
        url:"../json/mall-main.json",
        success:function(datas){
            console.log(datas);
            var imgListStr = "";
            var hotStr = "";
            var phoneStr = "";
            var accessoriesStr = "";
            $(datas).each(function(index, data){
                    $(data.boxList).each(function(index,imgList){
                        imgListStr+=`
                            <div class="imgList">
                            <img src="${imgList.img}">
                            </div>
                        `;
                    });
                    $(data.hotSelling).each(function(index,phone){
                        hotStr += `
                            <div class="infos-box">
                                <div class="infos-image"><img src="${phone.img}"></div>
                                <p>${phone.name}</p>
                                <p>${phone.des}</p>
                                <p>${phone.price}</p>
                                <div class="prom">
                                    <span>查看详情</span>
                                </div>
                            </div>
                        `;
                    });
                    $(data.fineHandset).each(function(index,phone){
                        //console.log(index);
                        if(index == "0"){
                            phoneStr += `
                            <div class="infos-box">
                                <div class="infos-image"><img src="${phone.img}"></div>
                                
                            </div>
                            `;
                        }else{
                            phoneStr += `
                            <div class="infos-box">
                                <div class="infos-image"><img src="${phone.img}"></div>
                                <p>${phone.name}</p>
                                <p>${phone.des}</p>
                                <p>${phone.price}</p>
                                <div class="prom">
                                    <span>查看详情</span>
                                </div>
                            </div>
                            `;
                        }
                        
                    });
                    $(data.fineAccessories).each(function(index,phone){
                        accessoriesStr += `
                        <div class="infos-box">
                            <div class="infos-image"><img src="${phone.img}"></div>
                            <p>${phone.name}</p>
                            <p>${phone.des}</p>
                            <p>${phone.price}</p>
                            <div class="prom">
                                <span>查看详情</span>
                            </div>
                        </div>
                        `;    
                        
                    });
            });
            $('.main-box').html(imgListStr);
            $('.hotSelling .box-list').html(hotStr);
            $('.fineHandset .box-list').html(phoneStr);
            $('.fineAccessories .box-list').html(accessoriesStr);
            $('.infos-box').each(function(index,item){
                $(item).click(function(){
                    location.href = `details.html?id=${index}`;
                });
            });
        }
        
    });
}
// 商城详情页数据异步加载
function detail(){
    var hash = window.location.href.split("?")[1];
    var hashName = hash.split("=")[0];
    var hashIndex = hash.split("=")[1];
    $.ajax({
        url:"../json/details.json",
        async:false,
        success:function(res){
            var htmlStr = "";
            var obj = res[hashIndex];
            console.log(obj);
            htmlStr += `<div class="crumbs">
                            <span><a href="mall.html">商城首页</a></span>
                            <span class="crumbNext"> > </span>
                            <span><a href="javascript:;">手机产品</a></span>
                            <span class="crumbNext"> > </span>
                            <span>${obj.series}</span>
                        </div>
                        <div class="container">
                            <div class="left">
                                    <div class="picBox">   
                                            <div class="bigBox">
                                                <div class="mirror"></div>
                                                <img src="${obj.img[0]}">
                                            </div> 
                                    </div>  
                                
                                <div class="smallBox">
                                    ${(function(){
                                        var imgStr = "";
                                        $(obj.img).each(function(index,image){
                                            imgStr += `
                                                <div class="imgHover">
                                                <img src="${image}">
                                                <span></span>
                                                </div>
                                            `;
                                        });
                                        return imgStr;
                                    })()}
                                </div>
                                <div class="star">
                                    <span>收藏商品（69728收藏）</span>
                                    <span>分享</span>
                                </div>
                            </div>
                            <div class="right">
                                    <div class="right-bigbox">        
                                        <img class="img-big" src="${obj.img[0]}">
                                    </div>
                                <h1>${obj.name}</h1>
                                <p>${obj.tops}<span>${obj.des}</span></p>
                                <div class="prod-summary-box">
                                    <div class="prod-price">
                                        <span>
                                            <def>￥</def>${obj.price}
                                        </span>
                                        ${(function(){
                                            if(obj.delPrice){
                                                return `<span>￥${obj.delPrice}</span>`;
                                            }else{
                                                return '<span></span>';
                                            }
                                        })()}
                                    </div>
                                    <div class="prod-promotion">
                                        <div class="laser">
                                            <span class="integral">积分</span>
                                            <span>购买即送${obj.price}积分</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="server-support">
                                    <span>商品支持：</span>
                                    <span><i class="iconfont">&#xe606;</i>花呗分期</span>
                                    <span><i class="iconfont">&#xe606;</i>以旧换新</span>
                                </div>
                                <div class="prod-params">
                                    <p>选择版本容量</p>
                                    ${(function(){
                                        var paramsStr = "";
                                        $(obj.sec).each(function(index,item){
                                            paramsStr += `
                                                <div class="nettype-tags">
                                                    ${item}
                                                </div>
                                            `;
                                        });
                                        return paramsStr;
                                    })()}
                                </div>
                                <div class="prod-color">
                                    <p>选择颜色</p>
                                    <div class="color-tags">
                                        <span></span> 红色
                                    </div>
                                    <div class="color-tags">
                                        <span></span> 黑色
                                    </div>
                                </div>
                                <div class="sku-service">
                                    <p>选择套餐</p>
                                    <div class="sku-service-box">
                                       官方标配
                                    </div>
                                    <div class="sku-service-box">
                                        乐欣手环套餐
                                    </div>
                                </div>
                                <div class="terms">
                                    <p>
                                        <input type="checkbox"> 我已阅读并同意<a href="javascript:;">vivo服务条款</a>
                                    </p>
                                </div>
                                <div class="num-add">
                                    <p>数量</p>
                                    <div class="lhy-counter-wrapper" id="ct1">
                                        <span class="lhy-counter-btn lhy-counter-btn-down">-</span>
                                        <input class="lhy-counter-input" type="number">
                                        <span class="lhy-counter-btn lhy-counter-btn-up">+</span>
                                    </div>
                                    <span>(限购5部)</span>
                                </div>
                                <div class="choiceTotal-box">
                                    <span class="end-price">总计xxx元</span>
                                    <span>已选：<span class="end-choose">XXX版本多少件</span></span>
                                </div>
                                <div class="end-btn">
                                    <button type="button" id="end-btn-shopcart">加入购物车</button>
                                    <button type="button">立即购买</button>
                                </div>
                            </div>
                        </div>`;
            
            $('.content').html(htmlStr);
            var counter1 = new LHYCounter({
                id: 'ct1',
                store: 5,
            });

            $('.imgHover:eq(0)').find('span').addClass('after');
            
            $(".smallBox .imgHover").hover(function(){
                        let src = $(this).children("img").attr("src");
                        $(".bigBox img").attr("src",src);
                        $(".right-bigbox img").attr("src",src);
                        $(this).find('span').addClass('after').parent().siblings().find('span').removeClass('after');
                    });
            $('.bigBox').mouseover(function(){
                $(".right-bigbox").css('display','block');
            }).mouseleave(function(){
                $(".right-bigbox").css('display','none');
            });
            $('.nettype-tags').eq(0).addClass('on');
            $('.nettype-tags').each(function(index,item){
                $(item).click(function(){
                    $(this).addClass('on').siblings().removeClass('on');
                });
            });
            $('.color-tags').eq(0).addClass('on');
            $('.color-tags').each(function(index,item){
                $(item).click(function(){
                    $(this).addClass('on').siblings().removeClass('on');
                });
            });
            $('.sku-service-box').eq(0).addClass('on');
            $('.sku-service-box').each(function(index,item){
                $(item).click(function(){
                    $(this).addClass('on').siblings().removeClass('on');
                });
            });
            // 放大镜效果
            magnifier();

            //已选商品
            let showToUs = function(){
                let capacity = $.trim($(".nettype-tags.on").html())
                let chooseColor = $.trim($(".color-tags.on").text())
                let setMeal = $.trim($(".sku-service-box.on").text())
                let goodsNum = $.trim($(".lhy-counter-input").val())
                let everyPrice = $.trim($(".prod-price>span").first().text())
                //在获取的数据中，取到数字
                let everyPriceNum = everyPrice.replace(/[^0-9]/ig,"")
                let AllPriceNum = goodsNum * everyPriceNum
                $(".end-price").text(`总计${AllPriceNum}元`) 
                $(".end-choose").html(`
                        ${capacity} —— ${chooseColor} —— ${setMeal} ——  ${goodsNum} 
                `)                
            }
            showToUs();
            $(".nettype-tags").click(function(){
                showToUs()
            })
            $(".color-tags").click(function(){
                showToUs();
            })
            $(".sku-service-box").click(function(){
                showToUs()
            })
            $(".lhy-counter-btn").click(function(){
                showToUs();
            })
            
            //判断阅读协议
            let readProtocol = $(".terms>p>input").is(":checked")
            $(".terms>p>input").click(function(){
                readProtocol = !readProtocol
                console.log(readProtocol)
            })
            
            //加入购物车判断
            $("#end-btn-shopcart").click(function(){
                showToUs();
                //本地数据
                let defaultD = [{phoneP:"商品",Version:"版本容量",price:"单价",sPrice:"小计",num:"数量"}]
                //判断是否有本地数据
                //有就根据本地数据初始化
                //没有就初始化空数组
                let shopping = [];
                if(localStorage.shopping) {
                    shopping = JSON.parse(localStorage.shopping)
                }else{
                    shopping = defaultD
                }
                console.log(123)
                console.log(shopping)
                let loData = $(".end-choose").text()
                //清空格
                let localDa = loData.replace(/(^\s+)|(\s+$)/g,"");
                let localData = localDa.split("——")
                let phonePic = $(".bigBox>img")[0].src
                //创建订单
                let everyPrice = $.trim($(".prod-price>span").first().text())
                let everyPriceNum = everyPrice.replace(/[^0-9]/ig,"") 
                let goodsNum = $.trim($(".lhy-counter-input").val())
                let AllPriceNum = goodsNum * everyPriceNum
                let dataListAdd = {
                    "phoneP":phonePic,
                    "Version":localData[0],
                    "price":everyPriceNum,
                    "sPrice":AllPriceNum,
                    "num":localData[3]
                }
                
                let defaultData = JSON.stringify(shopping)
                //console.log(dataListAdd)
                if(readProtocol == false){
                    alert("请认真阅读服务条款")
                }else{    
                    // 重复商品处理
                    let rootArr = [];
                    if(localStorage.shopping) {
                        rootArr = JSON.parse(localStorage.shopping);
                        let flag = false;                       
                        for(let i = 0, len = rootArr.length; i < len; i++) {
                            if(dataListAdd.phoneP == shopping[i].phoneP) {
                                alert("该商品已存在，可以看看其他商品哟~~~~~~~~~");
                                window.open("../pages/mall.html")
                                window.close()
                                flag = true;
                                break;
                            }
                        }
                        if(!flag) {
                        //购物车数据添加到本地
                            shopping.push(dataListAdd)
                            localStorage.shopping = JSON.stringify(shopping)
                            window.open("../pages/shoppingcart.html")
                        }
                    }else{
                        shopping.push(dataListAdd)
                        localStorage.shopping = JSON.stringify(shopping)
                        window.open("../pages/shoppingcart.html")
                    }   
                }
            })
        }
    });
}
//放大镜效果
function magnifier(){
    var container = $('.container');
    var smBox = $('.bigBox');
    var smImg = $('.bigBox img');
    var bgBox = $('.right-bigbox');
    var bgImg = $('.img-big');
    var mirror = $('.mirror');   
        // 2.更新大图片尺寸
        var _width = parseInt($(smImg).width()) * parseInt($(bgBox).width()) / parseInt($(mirror).width()) + "px";
        var _height = parseInt($(smImg).height()) * parseInt($(bgBox).height()) / parseInt($(mirror).height()) + "px";

        $(bgImg).css({
            "width":_width,
            "height":_height
        });
        
        // // 3.鼠标移动
        $(smBox).mousemove(function(event) {
            // 3.1计算放大镜位置
            var _left = event.clientX - $(smBox).offset().left - parseInt($(mirror).width()) / 2 + window.pageXOffset ;
            var _top = event.clientY  - $(smBox).offset().top - parseInt($(mirror).height()) / 2 + window.pageYOffset ;
            
            // 放大镜能移动的最大距离(水平/垂直)
            var mirrorMaxX = parseInt($(smBox).width()) - parseInt($(mirror).width());
            var mirrorMaxY = parseInt($(smBox).height()) - parseInt($(mirror).height());
            // 大图最大移动距离()
            // 3.2异常出理,可移动距离大于或小于最大可移动距离的处理
            if(_left < 0){
                _left = 0;
            }else if (_left > mirrorMaxX){
                _left = mirrorMaxX;
            }
            if(_top < 0){
                _top = 0;
            }else if(_top > mirrorMaxY){
                _top = mirrorMaxY;
            }
            // 3.3更新放大镜位置
            $(".mirror").css({
                "top":_top,
                "left":_left
            })           
            // 大图定位位置
            var  big_left = - ($(bgImg).width() - $(".bigBox").width())*_left / mirrorMaxX;
            var big_top = - ($(bgImg).height() - $(".bigBox").height())*_top / mirrorMaxY;
            console.log(big_left,big_top)
            $(".right-bigbox img").css({
                "top":big_top,
                "left":big_left
            })
            
        });
    
}
// 主页的跳转子页面
function enterOver(){
    $('.vc-main-box').click(function(){
        location.href = 'static/pages/z1.html';
    });
}
export{
    barShow,
    mall,
    detail,
    loginState,
    goShopping,
    goToTop,
    enterOver
}
