require('../less/common.less');
require('../less/normalized.less');
require('../less/mall.less');
import {barShow,mall,loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    goToTop();
    mall(); 
    goShopping();
    loginState("login-register.html");
});