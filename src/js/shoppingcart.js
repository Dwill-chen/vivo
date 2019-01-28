require('../less/common.less');
require('../less/normalized.less');
require('../less/shoppingcart.less');
import {barShow,loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    loginState("login-register.html");
    goShopping();
    goToTop();
    let shopping = JSON.parse(localStorage.shopping)
    //计算生成的本地数据的key值数量
    let dataArr = Object.getOwnPropertyNames(shopping[0])
    console.log(dataArr)
    console.log(shopping.length)
    let ulGenerate = function(){
        $("#shopp-show").html(`
        <ul class="show-wrap">
            <li>全选
                <input type="checkbox" class="allCheck">
            </li>
            ${(function(){//自执行函数，立即执行
                let showWrap = [];
                //动态生成显示区域的 标题部分
                dataArr.forEach((data,index) => {
                    let wrapHead = ["商品","版本和容量","单价","小计","数量"]
                    showWrap[index] = `
                    <li class="wrapHead">${wrapHead[index]}</li>
                    `
                });
                return showWrap.join("")
            })()}
            <li>操作</li>
        </ul>
        ${(function(){//自执行函数，立即执行
            let wrapBox = [];
            //动态生成内容区域，即一横排
            shopping.forEach((data,i) => {
                //获取每一个对象的内容 即{}里的内容
                let inum = i
                let listContent = shopping[i]
                //console.log(listContent)
                //因为我们定义了一个存储数据的defaultD，i=0的时候就是这个默认，所以动态生成的时候，i-1
                wrapBox[i-1] = `
                <ul class="wrap-box" index="${inum-1}">
                    <li>选择
                        <input type="checkbox" class="everyCheck" name="selectOne">
                    </li>
                    ${(function(){//自执行函数，立即执行
                        //传值进j的for循环，取到src
                        let Ndata = data
                        let wrapContent = [];
                        //动态生成每一横排的内容
                        dataArr.forEach((key,j) => {
                            let PicSrc = Ndata.phoneP    
                            console.log(PicSrc)                        
                            //获取key对应的值
                            let kong = []
                            for (key in shopping[i]){
                                // console.log(key);     //获取key值
                                // console.log(json[key]); //获取对应的value值
                                kong.push(shopping[i][key])
                            }
                            //console.log(kong)
                            //获取每一个对象内，对应的key比如dataArr[0]是heroName
                            let vaContent = dataArr[j]
                            //console.log(vaContent)
                            wrapContent[0]=`<li><img src="${PicSrc}"></li>`
                            wrapContent[2]=`<li class="goodsEveryPrice">${kong[2]}</li>`
                            wrapContent[j] = `<li class="vaContent">${kong[j]}</li>`
                            wrapContent[4]=`<li><span class="goodsBtn goodDel">-</span><span class="goodsCount">${kong[j]}</span><span class="goodsBtn goodAdd">+</span></li>`
                        });
                        return wrapContent.join("")
                    })()}
                    <li class="operation">
                        <span class="edit">查看</span>
                        <span class="deleteHero">删除</span>
                    </li>
                </ul>
                `
            });
            return wrapBox.join("")
        })()}
    `)
    }
    //根据本地数据生成页面
    ulGenerate()
    //购物车没有商品
    let shopFu = function(){
        let shopUlWrap = $(".wrap-box")
        console.log(123123123)
        console.log(shopUlWrap.length)
        if(shopUlWrap.length == 0){
            $(".shopHide").css({"display":"block"})
        }
    }
    //查看按钮
    $(".edit").click(function(){
        console.log($(".everyCheck").prop("checked"))
    })
    // 计算总计
    function calcTotal() {
        //单选框input
        let checkBoxes = $('input[name="selectOne"]');
        //单价
        let priceSpans = $('.goodsEveryPrice');
        //数量
        let countInputs = $('.goodsCount');
        let totalCount = 0;
        let totalPrice = 0;
        for (let i = 0; i < priceSpans.length; i += 1) {
            // 复选框被勾中的购物车项才进行计算
            if ($(checkBoxes[i]).prop('checked')) {
                // 强调: jQuery对象使用下标运算或get方法会还原成原生的JavaScript对象
                let price = Number($(priceSpans[i]).text());
                console.log(price)
                let count = Number($(countInputs[i]).text());
                
                totalCount += count;
                console.log(totalCount)
                totalPrice += price * count;
            }
        }
        $('.allGoodsSum').text(totalCount);
        $('.goodsPrice').text(totalPrice.toFixed(2));
    }
    // 单个商品删除
    $('.deleteHero').on('click', function() {
        if (window.confirm('确定要删除该项吗?')) {
            //找到这条数据的index,因为我们的本地数据，第一条是默认数据，所以deleteindex + 1
            let deleteIndex = Number($(this).parent().parent()[0].getAttribute("index")) 
            let deIndex = deleteIndex + 1
            // console.log(deIndex)
            // console.log(shopping)
            let Newshopping = []
            //删除对应的localstorage
            Newshopping = shopping.splice(deIndex, 1)
            //console.log(shopping)
            //更新本地数据
            localStorage.shopping = JSON.stringify(shopping)
            //删除对应的页面元素
            $(this).parent().parent().remove();
            calcTotal();
        }
        shopFu()
    });
    //选中商品的删除
    $('.deleteBtn').on('click', function() {
        if(window.confirm("确定要删除选中项吗")){
            $('.wrap-box').each(function() {
                //根据选中状态来删除
                if ($(this).find('input[name="selectOne"]').prop('checked')) {
                    //删除本地数据
                    //找到index
                    let deleteIndex = Number($(this)[0].getAttribute("index"))
                    let deIndex = deleteIndex + 1
                    let Newshopping = []
                    Newshopping = shopping.splice(deIndex, 1)
                    localStorage.shopping = JSON.stringify(shopping)
                    //删除页面元素
                    $(this).remove();
                }
            });
            calcTotal();
        }
        shopFu()
    });
    // 减少和添加商品数量
    $('.goodsBtn').on('click', function() {
        $(this).parent().parent().find('input[name="selectOne"]').prop('checked', true);
        if ($(this).text() == '-') {
            let count = Number($(this).next().text());
            
            if (count > 1) {
                count -= 1;
                //根据加减给数量赋值
                $(this).next().text(count);
            } else {
                alert('商品数量最少为1');
            }
        } else {
            let count = Number($(this).prev().text());
            if (count < 5) {
                count += 1;
                $(this).prev().text(count);
            } else {
                alert('商品数量最多为5');
            }
        }
        let price = Number($(this).parent().prev().prev().text());
        let count = Number($(this).parent().children(".goodsCount").text());
        console.log(count)
        $(this).parent().prev().text((price * count));
        calcTotal();
    });
    //全选
    $('.allCheck').on('change', function() {
        if ($(this).prop('checked')) {
            $('.wrap-box input[type="checkbox"]').prop('checked', true);
            calcTotal();
        } else {
            $('.wrap-box input[type="checkbox"]').prop('checked', false);
            $('.allGoodsSum').text(0);
            $('.goodsPrice').text("0.00");
        }
        shopFu()
    });
    // 单个商品项的选择 对应的事件
    $('input[name="selectOne"]').on('change', function() {
        calcTotal();
        if (!$(this).prop('checked')) {
            $('.allCheck').prop('checked', false);
        }
    });
});