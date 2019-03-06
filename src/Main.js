(function () {
    (function () {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true);
        // 不支持WebGL时自动切换至Canvas
        Laya.init(G.STAGE.WIDTH, G.STAGE.HEIGHT, Laya.WebGL);
        if (Laya.Browser.onWeiXin) {
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
        }
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
    })();

    //打印点击的控件
    function clickStageFun(e) {
        if (G.printClick) {
            console.info("点击了：", e.target);
        }
    }

    Laya.stage.on(Laya.Event.CLICK, window, clickStageFun);

    // Laya.stage._setScreenSize = Laya.stage.setScreenSize;
    // Laya.stage.setScreenSize = function (screenWidth, screenHeight, doNotCheck) {

    //     if (Laya.stage._isInputting()) return;//处于输入状态不进行尺寸调整，否则容易出现异常。

    //     G.PHONEINFO = Laya.Browser.onMiniGame ? wx.getSystemInfoSync() : null;
    //     if (G.PHONEINFO && G.PHONEINFO.model == "iPhone X") {
    //         G.STAGE = { WIDTH: G.PHONEINFO.windowWidth * 2, HEIGHT: G.PHONEINFO.windowHeight * 2 };   //iPhone X屏幕大小
    //     } else {
    //         G.STAGE = { WIDTH: 1280, HEIGHT: 720 };   //屏幕大小
    //     }

    //     this._scaleMode = Laya.Stage.SCALE_SHOWALL;
    //     this.designHeight = G.STAGE.HEIGHT;
    //     this.designWidth = G.STAGE.WIDTH;
    //     this._setScreenSize(screenWidth, screenHeight);
    //     if (Laya.Browser.onWeiXin) {
    //         sharedCanvas.width = Laya.stage.width;
    //         sharedCanvas.height = Laya.stage.height;
    //     }
    // };

    function calcWH() {
        var maxHeight = 854;
        var minHeight = 720;
        var data = {};
        var clientWidth = Laya.Browser.clientWidth * Laya.Browser.pixelRatio;
        var clientHeight = Laya.Browser.clientHeight * Laya.Browser.pixelRatio;
        var rateMin = 1280 / maxHeight;
        var rateMax = 1280 / minHeight;
        var clientRate;

        if (!Laya.Browser.onPC) {
            clientRate = (clientHeight > clientWidth) ? (clientHeight / clientWidth) : (clientWidth / clientHeight);
        } else {
            clientRate = clientWidth / clientHeight;
        }

        var trueRate = clientRate;
        if (clientRate > rateMax) {//过细
            data['scaleMode'] = Laya.Stage.SCALE_FIXED_AUTO;
            data['height'] = minHeight;
            data['width'] = 1280;

        } else if (clientRate < rateMin) {//过粗
            data['scaleMode'] = Laya.Stage.SCALE_FIXED_AUTO;
            data['height'] = maxHeight;
            data['width'] = 1280;
        } else {
            data['scaleMode'] = Laya.Stage.SCALE_FIXED_HEIGHT;
            data['height'] = 720;
            data['width'] = 1280;
        }
        data['trueRate'] = trueRate;

        return data;
    }

    Laya.stage._setScreenSize = Laya.stage.setScreenSize;
    Laya.stage.setScreenSize = function (screenWidth, screenHeight, doNotCheck) {

        if (Laya.stage._isInputting()) return;//处于输入状态不进行尺寸调整，否则容易出现异常。

        var tem = calcWH();
        this._scaleMode = tem.scaleMode;
        this.designHeight = tem.height;
        this.designWidth = tem.width;
        this._setScreenSize(screenWidth, screenHeight);
        if (Laya.Browser.onWeiXin) {
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            //屏蔽postMessage wxxx 也不能解决iphone6 黑屏问题
            wx.postMessage({ type: "winSize", width: Laya.stage.width, height: Laya.stage.height });
        }
    };


    sessionStroage = Laya.LocalStorage;
    //类实例化
    utils = new cc.Utils();
    uiManager = new cc.UIManager();
    cdManager = new cc.CdTickManager();
    updateManager = new cc.UpdateManager();
    eventDispatcher = new cc.EventDispatcher();
    dataManager = new cc.DataManager();
    sceneManager = new cc.SceneManager();
    audioManager = new cc.AudioManager();
    wxUtils = new cc.wxUtils();

    //进入游戏
    //加载通用资源
    Laya.loader.load(G.COMMONRES, Laya.Handler.create(this, function () {
        onLoaded();
    }));

    function onLoaded() {
        Laya.MouseManager.multiTouchEnabled = false;        //关闭多点触控
        uiManager.openUI(cc.StartWin);
        // uiManager.openUI(cc.GameWin);
    }
})();