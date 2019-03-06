/**
 *Created by LLC on 2018/8/18.
 *Describe : 游戏选择界面
 */
(function () {
    cc.SelectRoundWin = function () {
        this.__super.call(this);
        this.init();
    };

    Laya.class(cc.SelectRoundWin, "cc.SelectRoundWin", cc.BaseUIForms);
    var _proto = cc.SelectRoundWin.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "UI",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.NORMAL, //UI窗体显示类型
            LucencyType: G.ENUM_UIFORM_LUCENY_TYPE.TRANS_LUCENCE //UI窗体透明度类型
        };
        this.loadRes(resArray, uiConfig);
    };

    _proto.loadResComplete = function () {
        this.__super.prototype.loadResComplete.call(this);
        this.initUI();
        this.initEvent();

        //loding界面判定
        var loadingUI = uiManager.getUI(cc.LoadingWin);
        if (loadingUI) {
            loadingUI.hideLoading();
        }
    };

    _proto.initUI = function () {
        this.mainUI = new ui.game.SelectRound1UI();
        this.addChild(this.mainUI);
        for (var i = 1; i <= G.CANPLAY; i++) {
            this.mainUI["image_" + i + "_blue"].mouseEnabled = true;
            this.mainUI["image_" + i + "_number"].alpha = 1;
            this.mainUI["image_" + i + "_lock"].alpha = 0;
        }
        if (G.MAXLV > 0) {
            for (var j = 1; j <= G.MAXLV; j++) {

                this.mainUI["image_" + j + "_star"].visible = true;
            }
        }
        Laya.SoundManager.setMusicVolume(0.8);  //bgm音量
        //图标颜色判定
        // this.upDown();
    };

    _proto.initEvent = function () {
        // for (var i = 1; i < 6; i++) {
        //     this.mainUI["image_" + i + "_blue"].index = i;

        //     utils.onBtnScaleEvent(this.mainUI["image_" + i + "_blue"], this, this.recovery)
        // }
        for (var i = 1; i < 6; i++) {
            this.mainUI["image_" + i + "_blue"].index = i;
            utils.onBtnScaleEvent(this.mainUI["image_" + i + "_blue"], this, this.startGame)
        }
        utils.onBtnScaleEvent(this.mainUI.btn_back, this, this.Back)
    };
    //返回主界面
    _proto.Back = function () {
        var self = this;
        updateManager.clearAll(this);
        audioManager.playSound(1023);
        uiManager.openUI(cc.StartWin);
        self.doClose();
        // uiManager.openUI(cc.LoadingWin, null, {
        //     complete: function () {
        //         self.doClose();
        //         uiManager.openUI(cc.StartWin);
        //     }
        // });
    };

    //开始游戏
    _proto.startGame = function (date) {
        var self = this;
        G.GAME_TYPE = date.target.index;
        console.log("進了");
        for (var i = 1; i <= 5; i++) {
            if (i == G.GAME_TYPE)
                this.mainUI["image_" + i + "_bg"].visible = true;
            else
                this.mainUI["image_" + i + "_bg"].visible = false;
            updateManager.clearAll(this);
            console.log(G.GAME_TYPE);
        }
        audioManager.playSound(1023);
        uiManager.openUI(cc.LoadingWin, null, {
            complete: function () {
                self.doClose();
                uiManager.openUI(cc.GameWin);
            }
        });
    };
})();