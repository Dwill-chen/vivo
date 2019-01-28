require('../less/normalized.less');
require('../less/login-register.less');
$(function () {
    let _isLogin = true;
    // 1. 点击前往注册
    $('.go-register').on('click', function () {
        // 显示注册
        $('.register').removeClass('hidden');
        $('.login').addClass('hidden');
        $('.title').text("账号注册");
        $('.login-register-btn').text("注册");
        _isLogin = false;
    });
    // 2. 点击返回登陆
    $('.go-login').on('click', function () {
        $('.register').addClass('hidden');
        $('.login').removeClass('hidden');
        $('.title').text("账号登陆");
        $('.login-register-btn').text("登陆");
    });
    // 3. 表单验证
    $('.input-box input').on('input', function () {
        let type = this.className;
        if (Validate.test(type, $(this).val())) {
            // 合法
            $(this).parent().removeClass('error');
        } else {
            // 不合法
            $(this).parent().addClass('error');
        }
    });
    // 4. 点击登陆注册按钮
    $('.login-register-btn').on('click', function () {
        let isThrough = true;
        let $inputs = _isLogin ? $(".input-box:lt(2) input") : $(".input-box input");
        // 表单异常处理
        for (let i = 0, len = $inputs.length; i < len; i++) {
            if (!$inputs.eq(i).val() || $inputs.eq(i).parent().hasClass('error')) {
                isThrough = false;
                break;
            }
        }
        if (!isThrough) {
            alert("信息为空或信息不合法！");
            return;
        }
        Bmob.initialize("0c211ce431e5e6d65e5c73fcb414b4b5", "6e455562d3e8407c32498e915b8a1511");
        if (_isLogin) {
            // 登陆
            Bmob.User.login($('.username').val(), $('.password').val()).then(res => {
                alert("登陆成功");
                location.href="../../index.html";
                sessionStorage.isLogin = true;
                sessionStorage.user = $('.username').val();
            }).catch(err => {
                alert(err.error);
            });
        } else {
            // 注册
            // 创建用户对象
            let user = {};
            $inputs.each((index, input) => {
                let key = $(input).attr('class');
                let val = $(input).val();
                user[key] = val;
            });
            // 调用BMOB注册用户
            Bmob.User.register(user).then(res => {
                alert('register success!');
                location.href = "../../index.html";
                sessionStorage.isLogin = true;
            }).catch(err => {
                alert(err.error);
            });
        }
    });
});