/**
 *Created by LRJ on 2018/7/7.
 *Describe : Loading界面
 */

(function () {
    cc.LoadingWin = function (argObj) {
        this.__super.call(this, argObj);
        if (argObj) {
            this.complete = argObj.complete;
        }
        this.init();
    };

    Laya.class(cc.LoadingWin, "cc.LoadingWin", cc.BaseUIForms);
    var _proto = cc.LoadingWin.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "LOADING",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.NORMAL, //UI窗体显示类型
            LucencyType: G.ENUM_UIFORM_LUCENY_TYPE.TRANS_LUCENCE //UI窗体透明度类型
        };
        this.loadRes(resArray, uiConfig);
    };

    _proto.loadResComplete = function () {
        this.__super.prototype.loadResComplete.call(this);
        this.initUI();
        this.initEvent();
    };

    _proto.initUI = function () {
        this.mainUI = new ui.game.LoadingViewUI();
        this.addChild(this.mainUI);

        var self = this;
        this.mainUI.img_bg.x = Laya.stage.width;
        this.mainUI.img_logo.x = Laya.stage.width;
        var middle = Laya.stage.width / 2;
        var width = Laya.stage.width;
        this.timeLine_bgin = new Laya.TimeLine();
        this.timeLine_bgin.addLabel("action1", 0).to(this.mainUI.img_bg, { width: width / 2 + 100, x: middle - 50 }, 200, null, 0)
            .addLabel("action2", 0).to(this.mainUI.img_bg, { width: width + 100, x: - 50 }, 300, null, 0)
            .addLabel("action3", 0).to(this.mainUI.img_bg, { width: width + 100, x: - 50 }, 400, null, 0);

        this.timeLine_logoin = new Laya.TimeLine();
        this.timeLine_logoin.addLabel("action1", 0).to(this.mainUI.img_logo, { x: middle - this.mainUI.img_logo.width / 2 }, 300, null, 0)
        // .addLabel("action2", 0).to(this.mainUI.img_logo, { x: middle - this.mainUI.img_logo.width / 2 }, 40, null, 0);

        this.timeLine_bgin.on(Event.LABEL, this, function (label) {
            if (label == "action2") {
                self.timeLine_logoin.play(0, false);
            }
        });

        this.timeLine_bgout = new Laya.TimeLine();
        this.timeLine_bgout.addLabel("action1", 0).to(this.mainUI.img_bg, { width: 0, }, 300, null, 0);

        this.timeLine_logoout = new Laya.TimeLine();
        this.timeLine_logoout.addLabel("action1", 0).to(this.mainUI.img_logo, { x: - this.mainUI.img_logo.width }, 300, null, 0)
        // .addLabel("action2", 0).to(this.mainUI.img_logo, { x: -this.mainUI.img_logo.width }, 200, null, 0);

        this.timeLine_logoout.on(Event.COMPLETE, this, function (label) {
            self.timeLine_bgout.play(0, false);
        });

        this.showLoading(this.complete);
    };

    _proto.showLoading = function (complete) {
        if (complete) {
            this.timeLine_bgin.on(Event.COMPLETE, this, function () {
                complete();
            });
        }
        this.timeLine_bgin.play(0, false);
    };

    _proto.hideLoading = function (complete) {
        var self = this;
        audioManager.playSound(1029);
        this.timeLine_bgout.on(Event.COMPLETE, this, function () {
            complete && complete();
            self.closed();
        });
        this.timeLine_logoout.play(0, false);
    };

    //事件监听
    _proto.initEvent = function () {
        var self = this;
    };

    _proto.closed = function () {
        this.doClose();
    };

})();