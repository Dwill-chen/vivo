require('../less/common.less');
require('../less/normalized.less');
require('../less/service.less');
import {barShow, loginState,goShopping,goToTop} from './function.js';
$(function(){
    barShow();
    goShopping();
    goToTop();
    loginState("login-register.html");   
});