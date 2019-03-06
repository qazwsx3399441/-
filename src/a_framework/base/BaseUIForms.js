/**
 *Created by LRJ on 2018/2/25.
 *Describe : ui基类
 */
(function (_super) {
    cc.BaseUIForms = function (argObj) {
        cc.BaseUIForms.__super.call(this);
        this._uiConfig = {
            Zorder: null,  // UI所在层级
            ShowMode: null, //UI窗体显示类型
            LucencyType: null //UI窗体透明度类型
        };
        this.mouseEnabled = true;    // 是否可以点击操作
        this.isResComplete = false;   //资源是否加载完成
        this._event = {};
        this._aniArr = [];
        this._uiChild = [];
        this._aniID = 0;
        this.resArray = null;
        this.isClose = false;
        this.windowName = this.__className;
        this.hiding();  //初始不显示。资源加载完成时再显示。
    };

    Laya.class(cc.BaseUIForms, "cc.BaseUIForms", _super);
    var _proto = cc.BaseUIForms.prototype;

    _proto.getUiConfig = function () {
        return this._uiConfig;
    };

    /**加载资源*/
    _proto.loadRes = function (resArray, uiConfig) {
        //Laya.MouseManager.instance.disableMouseEvent = true;//UI加载中，禁止鼠标事件，防止打开新UI
        this.isLoadResRun = true;
        this.resArray = resArray;
        this._uiConfig = uiConfig;
        if (this.resArray.length === 0) {
            this.onLoadResComplete();
            return;
        }
        utils.setResUsed(this.resArray);
        Laya.loader.load(this.resArray, Laya.Handler.create(this, this.onLoadResComplete));
    };

    _proto.onLoadResComplete = function () {
        if (!this.isResComplete) {
            this.show();
            this.isResComplete = true;
            this.isLoadResRun = false;
            this.loadResComplete();
            if (this._uiConfig.ShowMode == G.ENUM_UIFORM_SHOW_MODE.HIDE_OTHER) {
                //隐藏其他界面
                uiManager.hideOther(this);
            } else if (this._uiConfig.ShowMode == G.ENUM_UIFORM_SHOW_MODE.REVERSE_CHANGE) {
                //如果是非全屏界面
                this.setMask();
            }
        }
    };
    /**加载资源完成后的响应事件*/
    //override
    _proto.loadResComplete = function () {

    };
    _proto.initUI = function () {

    };
    _proto.handlerUITouchEvent = function () {

    };

    //隐藏界面
    _proto.hiding = function () {
        this.visible = false;
        this.mouseEnabled = false;
    };
    //显示界面
    _proto.show = function () {
        this.visible = true;
        this.mouseEnabled = true;
    };
    /**
     * 冻结界面，不可点击
     */
    _proto.freeze = function () {
        this.visible = true;
        this.mouseEnabled = false;
    };

    //注册监听事件
    _proto.addEvent = function (EventName, callback) {
        this._event[EventName] = callback.bind(this);
        eventDispatcher.addEventListen(EventName, this, this._event[EventName]);
    };

    //移除监听
    _proto.removeEvent = function (EventName) {
        eventDispatcher.removeEventListen(EventName, this, this._event[EventName]);
    };
    //移除所有监听
    _proto.removeAllEvent = function () {
        for (var key in this._event) {
            this.removeEvent(key);
        }
    };
    /**派发自定义事件*/
    _proto.dispatchEvent = function (eventTag, event) {
        eventDispatcher.dispatchEvent(eventTag, event)
    };

    /**添加半透背景*/
    _proto.setMask = function () {
        // 防止重复设置
        if (this.bgSprite) {
            this.bgSprite.destroy();
        }
        this.mouseThrough = false;
        switch (this._uiConfig.LucencyType) {
            case 0:
                this.bgSprite = new Laya.Box();
                this.setShield(true);
                break;
            case 1:
                this.bgSprite = new Laya.Image("comp/blank.png");
                this.bgSprite.alpha = 0.7;
                this.setShield(true);
                break;
            case 2:
                this.bgSprite = new Laya.Image("comp/blank.png");
                this.bgSprite.alpha = 0.3;
                this.setShield(true);
                break;
            case 3:

                break;
        }
        if (this.bgSprite) {
            this.bgSprite.zOrder = -1;
            this.bgSprite.top = 0;
            this.bgSprite.bottom = 0;
            this.bgSprite.left = 0;
            this.bgSprite.right = 0;
            this.bgSprite.sizeGrid = "1,1,1,1";
            this.addChild(this.bgSprite);
        }
    };

    //设置屏蔽下层事件开关(是否点击关闭)
    _proto.setShield = function (isClose) {
        if (!this.bgSprite) {
            this.setMask();
        }
        if (isClose) {
            utils.onBtnEvent(this.bgSprite, this, this.doClose);
        } else {
            utils.onBtnEvent(this.bgSprite, this, function () { });
        }
    };

    /**
     * 播放动画， 方便统一管理
     * @param ani
     * @param isLoop
     */
    _proto.playAni = function (ani, isLoop) {
        if (ani._aniID) {
            this._aniArr.push(ani);
        }
        ani.play(0, isLoop);
        ani.$isPlaying = true;
    };
    _proto.stopAllAni = function () {
        for (var i = 0; i < this._aniArr.length; i++) {
            var ani = this._aniArr[i];
            if (ani.$isPlaying) {
                ani.stop();
            }
        }
    };
    _proto.resumeAllAni = function () {
        for (var i = 0; i < this._aniArr.length; i++) {
            var ani = this._aniArr[i];
            if (ani.$isPlaying) {
                ani.play(0, ani.loop);
            }
        }
    };

    /**
     * 隐藏半透黑底
     */
    _proto.hideAlphaBg = function () {
        if (this.bgSprite)
            this.bgSprite.visible = false;
    };

    _proto.removeFrameLoop = function () {
        if (this.$updateArr) {
            for (var i = 0; i < this.$updateArr.length; i++) {
                updateManager.clear(this.$updateArr[i]);
            }
        }
    };

    _proto.doClose = function () {
        if (!this.isClose) {
            if (this._uiChild) {
                for (var i = 0; i < this._uiChild.length; i++) {
                    uiManager.removeUI(this._uiChild[i]);
                }
            }
            uiManager.removeUI(this);
        }
    };

    //重新设置界面大小
    _proto.resize = function () {
        if (this._uiConfig.ShowMode != G.ENUM_UIFORM_SHOW_MODE.REVERSE_CHANGE) {
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

        if (this.bgSprite) {
            this.bgSprite.width = Laya.stage.width;
            this.bgSprite.height = Laya.stage.height;
        }
    };
})(Laya.Component);