/**
 * Created by Administrator on 2018/2/25 0025.
 * 计时器管理
 */
(function (_super) {
    cc.UpdateManager = function () {
        this.id = 0;
        this.LoopArr = {};
        Laya.timer.frameLoop(1, this, this.update);
    };

    Laya.class(cc.UpdateManager, "cc.UpdateManager", _super);
    var _proto = cc.UpdateManager.prototype;

    _proto.update = function () {
        var frameInterval = Laya.timer.delta / 1000;
        G.FRAME_INTERVAL = frameInterval > 0.03 ? 0.03 : frameInterval;
        G.NOW = Laya.Browser.now();
        for (var key in this.LoopArr) {
            var item = this.LoopArr[key];
            if (!item.caller) {
                console.log("warning:有方法没被移除" + item.func);
                continue;
            }
            if (item.type == G.ENUM_LOOP_TYPE.FRAME) {
                //帧循环
                item.frame++;
                if (item.frame == item.targetFrame) {
                    item.func();
                    if (item.isOnce) {
                        delete this.LoopArr[key];
                    } else {
                        item.frame = 0;
                    }
                }
            } else if (item.type == G.ENUM_LOOP_TYPE.TIME) {
                //时间循环
                item.time += frameInterval;
                if (item.time >= item.targetTime) {
                    item.func();
                    if (item.isOnce) {
                        delete this.LoopArr[key];
                    } else {
                        item.time = 0;
                    }
                }
            }
        }
    };

    /**
     * 帧循环
     * @param delay 帧数
     * @param caller
     * @param func
     * @param args
     * @returns {string}
     */
    _proto.frameLoop = function (delay, caller, func, args) {
        var funcID = this.id++;
        var key = "FL" + funcID;
        var item = {
            frame: 0,
            targetFrame: delay,
            func: func.bind(caller, args),
            args: args,
            caller: caller,
            type: G.ENUM_LOOP_TYPE.FRAME,
            id: funcID
        };
        this.LoopArr[key] = item;
        //添加到父类updateArr里方便移除时一起移除
        if (caller.$updateArr) {
            caller.$updateArr.push(key);
        } else {
            caller.$updateArr = [key];
        }
        return key;
    };

    /**
     * 帧循环只调用一次
     * @param delay
     * @param caller
     * @param func
     * @param args
     * @returns {string}
     */
    _proto.frameOnce = function (delay, caller, func, args) {
        var funcID = this.id++;
        var key = "FO" + funcID;
        var item = {
            frame: 0,
            targetFrame: delay,
            func: func.bind(caller, args),
            args: args,
            isOnce: true,
            caller: caller,
            type: G.ENUM_LOOP_TYPE.FRAME,
            id: funcID
        };
        if (caller.$updateArr) {
            caller.$updateArr.push(key);
        } else {
            caller.$updateArr = [key];
        }
        this.LoopArr[key] = item;
        return key;
    };

    /**
     * 时间循环
     * @param delay 时间
     * @param caller
     * @param func
     * @param args
     * @returns {string}
     */
    _proto.timeLoop = function (delay, caller, func, args) {
        var funcID = this.id++;
        var key = "TL" + funcID;
        var item = {
            time: 0,
            targetTime: delay,
            func: func.bind(caller, args),
            args: args,
            caller: caller,
            type: G.ENUM_LOOP_TYPE.TIME,
            id: funcID
        };
        if (caller.$updateArr) {
            caller.$updateArr.push(key);
        } else {
            caller.$updateArr = [key];
        }
        this.LoopArr[key] = item;
        return key;
    };

    /**
     * 时间循环 只调用一次
     * @param delay
     * @param caller
     * @param func
     * @param args
     * @returns {string}
     */
    _proto.timeOnce = function (delay, caller, func, args) {
        var funcID = this.id++;
        var key = "TO" + funcID;
        var item = {
            time: 0,
            targetTime: delay,
            func: func.bind(caller, args),
            args: args,
            caller: caller,
            isOnce: true,
            type: G.ENUM_LOOP_TYPE.TIME,
            id: funcID
        };
        if (caller.$updateArr) {
            caller.$updateArr.push(key);
        } else {
            caller.$updateArr = [key];
        }
        this.LoopArr[key] = item;
        return key;
    };

    /**
     * 清除循环
     * @param key
     */
    _proto.clear = function (key, caller) {
        if (this.LoopArr[key]) {
            delete this.LoopArr[key];
        }
        if (caller) {
            caller.$updateArr.remove(key)
        }
    };

    _proto.clearAll = function (caller) {
        if (caller.$updateArr) {
            for (var i = 0; i < caller.$updateArr.length; i++) {
                var key = caller.$updateArr[i];
                this.clear(key);
            }
            caller.$updateArr = null;
        }
    }
})();
