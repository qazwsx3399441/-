/**
 * Created by Administrator on 2018/2/23 0023.
 * 常量 以及 一些原生方法重写或增加
 */
(function () {
    /**
     * 常量
     */
    //场景
    G.ENUM_SCENE_TYPE = {
        LOGIN: 0,    //登录
        MAIN: 1,     //主城
        GAME: 2      //游戏
    };
    // 窗体显示类型,窗体不同的显示方式
    G.ENUM_UIFORM_SHOW_MODE = {
        NORMAL: 0,         //普通
        HIDE_OTHER: 1,     //隐藏其他全屏(需要隐藏所有其他窗体,并存全屏，可返回上一级全屏)
        REVERSE_CHANGE: 2  //反向切换，弹窗界面(主要应用与"弹出窗体"，维护多个弹出窗体的层级关系，按先进后出原则显示)
    };
    //窗体透明度类型(窗口类的界面有用)
    G.ENUM_UIFORM_LUCENY_TYPE = {
        LUCENCY: 0,      //完全透明，不能穿透
        TRANS_LUCENCE: 1,//半透明，不能穿透
        PENTRATE: 3      //可以穿透
    };
    //窗体层级
    G.ENUM_UIFORM_ZORDER = {
        BG: 0,       //背景层
        UI: 100,     //ui层(主城界面，menu,等)
        GAME: 200,   // 战斗场景
        LOADING: 250, //loading
        POP: 300,  //最上层ui弹窗
        PROMPT: 400, //对话框层
        WX: 500    //微信开放域
    };

    G.STAGE = { WIDTH: 1280, HEIGHT: 720 };   //屏幕大小
    G.MAXSCORE = 0;  //最高分数
    G.MAXLV = null; //当前已通关关卡
    G.OVERPLAYCOUNT = 2;  //超过此次数 ，需要分享
    G.isClickShare = false; //是否点击过分享
    G.ISCLICKSHARE = null; //是否有分享过
    G.LANGUAGE = 1;//语言类型
    G.CANPLAY=1;//可以玩的关卡

    //拼图
    G.MAX_LENGTH = 50; //距离正确位置允许的最大距离
    G.GAME_TYPE = 1;    //大关卡类型（4种类型）
    G.GAME_ROUND = 0;    //小关卡数
    G.ROUND = 0;        //当前连续通关数，用于分享界面显示判定
    G.OPEN_NEW_UI = false;//是否打开新的游戏界面（用于分享界面关闭后）
    G.rightbtn=0;//正确的盒子
    G.selecttimes=1;//选择对的次数
    G.rightshinumber=0;//正确时针答案
    G.rightfennumber=0;//正确分针答案

    //计时器类型
    G.ENUM_LOOP_TYPE = {
        FRAME: 0,//帧循环
        TIME: 1//时间循环
    };

    G.FRAME_INTERVAL = 0;   //帧数

    G.NOW = Laya.Browser.now();

    /**
     * 扩展增加原生数组压入数组方法
     * @param items
     */
    Array.prototype.pushAll = function (items) {
        if (!items)
            return;

        if (!(items instanceof Array))
            throw new error("参数items必须为数组类型");

        for (var i = 0; i < items.length; i++) {
            this.push(items[i]);
        }
    };

    /**
     * 扩展增加原生数组指定位置插入方法
     * @param index
     * @param item
     */
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    /**
     * 扩展增加原生数组删除方法
     * @param item
     */
    Array.prototype.remove = function (item) {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] == item) {
                this.splice(i, 1);
            }
        }
    };

    /**
     * 扩展增加原生数组删除方法
     * @param index
     */
    Array.prototype.removeAt = function (index) {
        var item = this[index];
        this.splice(index, 1);
        return item;
    };

    /**
     * 扩展增加原生数组清空所有数据方法
     */
    Array.prototype.removeAll = function () {
        // this.splice(0, this.length);
        this.length = 0;
    };

    /**
     * 扩展增加原生数组是否包含某个元素
     * @param item
     */
    Array.prototype.contains = function (item) {
        return this.indexOf(item) != -1;
    };

    /**
     * 扩展增加原生数组读取最后一个元素方法
     */
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
    /**
     * 销毁数组对象
     */
    Array.prototype.disposeArray = function () {
        if (!this || this.length == 0) return;
        for (var i = this.length - 1; i >= 0; i--) {
            this[i].dispose();
        }
        this.removeAll();
    };

    /**
     * 扩展增加原生数组 是否为空
     */
    Array.prototype.isEmpty = function () {
        return this.length == 0;
    };

    /**
     * 克隆对象 或者数组
     * @param obj
     * @returns {*}
     */
    G.clone = function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0; i < obj.length; ++i) {
                copy[i] = G.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = G.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    /**
     * 扩展增加原生时间格式化 newDate.format('yyyy-MM-dd h:m:s')
     */
    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };

    /**
     * 判断字符串是否以某个字符串开头
     * @param str
     * @returns {boolean}
     */
    String.prototype.startWith = function (str) {
        var key = "^" + str;
        var reg = Pool.getItem(key, RegExp);
        if (reg == null)
            reg = new RegExp(key);
        var result = reg.test(this);
        Pool.recover(key, reg);
        return result;
    };

    String.prototype.endWith = function (str) {
        var key = str + "$";
        var reg = Pool.getItem(key, RegExp);
        if (reg == null)
            reg = new RegExp(key);
        var result = reg.test(this);
        Pool.recover(key, reg);
        return result;
    };

    /**
     * 替换所有指定字符串
     * @param oldVal
     * @param newVal
     * @returns {string}
     */
    String.prototype.replaceAll = function (oldVal, newVal) {
        return this.split(oldVal).join(newVal);
    };

    /*********************图片资源管理***************************/
    //通用资源不管理
    G.resManager = { "img": {} };
    /**
     * 资源引用次数递减，再界面被移除时候使用
     * @param resArray 界面中的this.resArray
     */
    G.delResCount = function (resArray) {
        if (resArray) {
            var resManager = G.resManager["img"];
            for (var i = 0; i < resArray.length; i++) {
                var url = resArray[i].url;
                resManager[url] -= 1;
                if (resManager[url] == 0) {
                    G.clearRes(url);
                }
            }
        }
    };
    // 销毁资源
    G.clearRes = function (url) {
        // 两种方式都使用,防止引擎修改
        Laya.loader.clearRes(url);
        url = laya.net.URL.formatURL(url);
        Laya.loader.clearRes(url);
    };
    G.addResCount = function (type, url) {
        var resManager = G.resManager[type];
        if (resManager[url]) {
            resManager[url] += 1;
        } else {
            resManager[url] = 1;
        }
    };

    //复制对象
    G.copyProperties = function (src, dest) {
        for (var key in src) {
            dest[key] = src[key];
        }
    };

    //获取对象长度
    G.getLength = function (map) {
        var count = 0;
        for (var k in map) {
            count++;
        }
        return count;
    };
})();