/**
 * Created by Administrator on 2018/2/25 0025.
 * UI管理
 */
(function (_super) {
    cc.UIManager = function () {
        this._id = 0;
        this._uiList = {};

        this.layers = {};
        for (var key in G.ENUM_UIFORM_ZORDER) {
            var box = this.createBox();
            box.right = 0;
            box.left = 0;
            box.top = 0;
            box.bottom = 0;
            this.layers[key] = box;
            box.zOrder = G.ENUM_UIFORM_ZORDER[key];
            Laya.stage.addChild(box);
        }
        this._stage = Laya.stage;
    };

    Laya.class(cc.UIManager, "cc.UIManager", _super);
    var _proto = cc.UIManager.prototype;

    _proto.createBox = function () {
        var box = new Laya.Box();
        box.left = 0;
        box.right = 0;
        box.top = 0;
        box.bottom = 0;
        box.mouseThrough = true;
        return box;
    };
    /**
     * 添加UI
     * @param openWindowClass UI类名
     * @param caller    父节点
     * @param argObj    参数
     * @param callBack  界面加载完成回调
     * @param shield  是否需要屏蔽下层界面
     */
    _proto.openUI = function (openWindowClass, caller, argObj, callBack, shield) {
        var windowName = openWindowClass.__className;
        if (!windowName) return null;
        //判断是否已经存在，防止重复加入
        var r = this.getUI(openWindowClass);
        if (r) return r;

        var layer = new openWindowClass(argObj, callBack);
        if (layer) {
            layer.$name = windowName;
            layer.$id = this._id++;
            layer.width = Laya.stage.width;
            layer.height = Laya.stage.height;
            this._uiList[windowName] = layer;
            if (caller) {
                caller.addChild(layer);
                caller._uiChild.push(layer);
                if (shield) {
                    layer.mouseThrough = false;
                } else {
                    layer.mouseThrough = true;
                }
            } else {
                this.layers[layer.getUiConfig().zOrder].addChild(layer);
            }
            //屏蔽下层BOX UI
            var curBox = this.layers[layer.getUiConfig().zOrder];
            if (layer.getUiConfig().zOrder != "PROMPT") {
                for (var key in G.ENUM_UIFORM_ZORDER) {
                    var box = this.layers[key];
                    if (box.zOrder < curBox.zOrder) {
                        box.mouseEnabled = false;
                    }
                }
            }

            return layer;
        }
    };

    /**
     * 隐藏同层级的其他UI， 停止UI上的动作，动画
     */
    _proto.hideOther = function (layer) {
        var uiList = this.layers[layer.getUiConfig().zOrder]._childs;
        for (var i = 0; i < uiList.length; i++) {
            if (uiList[i] != layer) {
                uiList[i].hiding();
                uiList[i].stopAllAni();
            }
        }
    };
    _proto.showOther = function (uiType) {
        var uiList = this.layers[uiType]._childs;
        for (var i = 0; i < uiList.length; i++) {
            uiList[i].show();
            uiList[i].resumeAllAni();
        }
    };

    /**
     * 移除UI
     * @param layer
     */
    _proto.removeUI = function (layer) {
        if (!layer.isClose) {
            layer.isClose = true;
            updateManager.clearAll(layer);
            layer.removeAllEvent();
            layer.removeFrameLoop();
            if (layer.getUiConfig().ShowMode == G.ENUM_UIFORM_SHOW_MODE.HIDE_OTHER) {
                //显示同层UI
                this.showOther(layer.getUiConfig().zOrder);
            }
            utils.setResUnused(layer.resArray);
            layer.destroy();
            //如果界面主层级 已清空 取消下层屏蔽
            var curBox = this.layers[layer.getUiConfig().zOrder];
            if (curBox._childs.length <= 0) {
                for (var key in G.ENUM_UIFORM_ZORDER) {
                    var box = this.layers[key];
                    if (box.zOrder < curBox.zOrder) {
                        box.mouseEnabled = true;
                    }
                }
            }
            delete this._uiList[layer.$name];
        }
    };

    //获取UI 判断是否添加
    _proto.getUI = function (windowClass) {
        if (!windowClass) return null;
        var windowName = windowClass.__className;
        return this._uiList[windowName];
    };
    _proto.getUIByType = function (type) {
        return this.layers[type];
    };

    /**
     * 显示加载界面
     * @param loadingUI
     */
    _proto.showLoadingUI = function (loadingUI) {

    };

    //重置界面大小
    _proto.resize = function () {
        for (var key in this.layers) {
            this.layers[key].width = Laya.stage.width;
            this.layers[key].height = Laya.stage.height;
            var uiList = this.layers[key]._childs;
            for (var i = 0; i < uiList.length; i++) {
                uiList[i].resize();
                for (var j = 0; j < uiList[i]._uiChild.length; j++) {
                    uiList[i]._uiChild[j].resize();
                }
            }
        }
    };
})();
