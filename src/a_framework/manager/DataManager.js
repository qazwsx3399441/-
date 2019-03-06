/**
 * Created by Administrator on 2018/2/23 0023.
 * 数据管理
 */
/**
 *  mainDataManager
 * */
(function () {
    cc.DataManager = function () {
        this._data = {};
        this.init();
    };

    Laya.class(cc.DataManager, "cc.DataManager");
    var _proto = cc.DataManager.prototype;

    _proto.init = function(){

    };

    //获取数据
    _proto.getData = function(key){
        return this._data[key];
    };

    /**
     * 设置数据
     * @param key
     * @param data
     * @param isReplace 是否覆盖已有数据
     */
    _proto.setData = function(key, data, isReplace){
        if(!this._data[key]){
            this._data[key] = data;
        }else{
            if(isReplace){
                this._data[key] = data;
            }else{
                console.log("已存在数据");
            }
        }
    };

    _proto.clearData = function(){
        this._data = {};
    };

})();