/**
 * Created by Administrator on 2018/2/23 0023.
 * 自定义事件派发器
 */
(function (_super) {
    //自定义事件类型，根据需求添加
    cc.EventDispatcher = function () {

    };

    Laya.class(cc.EventDispatcher, "cc.EventDispatcher",_super);
    var _proto = cc.EventDispatcher.prototype;

    /**添加自定义事件监听，窗口类事件无需再手动清除*/
    _proto.addEventListen = function(eventType,caller,handler){
        this.on(eventType,caller,handler);
    };

    /**删除自定义事件,关闭UI时，会自动清除*/
    _proto.removeEventListen = function(eventType,caller,handler){
        this.off(eventType,caller,handler);
    };

    /**派发自定义事件*/
    _proto.dispatchEvent = function(eventTag,data){
        // console.log ("DispatchEvent..." + eventTag);
        var e = {data : data, name : eventTag};
        this.event(eventTag,e);
        e = null;
    };

})(Laya.EventDispatcher);
