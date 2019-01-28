require('../less/common.less');
require('../less/normalized.less');
require('../less/details.less');
import {barShow, detail,loginState,goShopping} from './function.js';
$(function(){
    barShow();
    detail();  
    goShopping();
    loginState("login-register.html");     
});