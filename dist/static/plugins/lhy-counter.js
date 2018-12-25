class LHYCounter {
    // 构造器
    constructor({id, store, change}) {
        // 异常处理
        if(!id) { throw "LHYCounter：missing param of ‘id’.";}
        // 添加属性
        this.container = document.getElementById(id);
        this.upBtn     = this.container.querySelector('.lhy-counter-btn-up');
        this.downBtn   = this.container.querySelector('.lhy-counter-btn-down');
        this.input     = this.container.querySelector('.lhy-counter-input');
        this.height    = this.container.offsetHeight;
        // 初始化
        this.init();
        // 添加事件
        let _this = this;
        this.input.oninput = function() {
            if(this.value && this.value < 1) {
                this.value = 1;
            }else if(this.value && this.value > store) {
                this.value = store;
            }
            change(this.value);
        }
        this.input.onblur = function() {
            if(!this.value) {
                this.value = 1;
            }
        }
        this.downBtn.onclick = function() {
            if(_this.input.value == 1) { return; }
            _this.input.value = --_this.input.value;
            change(_this.input.value);
        }
        this.upBtn.onclick = function() {
            if(_this.input.value == store) { return; }
            _this.input.value = ++_this.input.value;
            change(_this.input.value);
        }
    }
    // 初始化
    init() {
        this.input.value = 1;
        this.upBtn.style.lineHeight   = this.height + "px";
        this.downBtn.style.lineHeight = this.height + "px";
    }
}








