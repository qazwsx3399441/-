/**
 *Created by LRJ on 2018/5/7.
 *Describe : 排行榜界面
 */

(function () {
    cc.RankWin = function (argObj) {
        this.__super.call(this, argObj);
        if (argObj.isShowShare) {
            this.isShowShare = argObj.isShowShare;
        }
        this.init();
    };

    Laya.class(cc.RankWin, "cc.RankWin", cc.BaseUIForms);
    var _proto = cc.RankWin.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "UI",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.REVERSE_CHANGE, //UI窗体显示类型
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
        this.mainUI = new ui.game.RankViewUI();
        this.addChild(this.mainUI);
        wxUtils.show();
        wxUtils.postMsg({ type: "showRank" });
    };

    //事件监听
    _proto.initEvent = function () {
        var self = this;
        utils.onBtnScaleEvent(this.mainUI.btn_close, this, this.closed);
    };

    _proto.closed = function () {
        audioManager.playSound(1023);
        wxUtils.postMsg({ type: "hideRank" });
        if (this.isShowShare) {
            // wxUtils.postMsg({ type: "showShareUI" });
            var _r = uiManager.getUI(cc.ShareWin);
            _r.UIup();
        } else {
            wxUtils.stopShow();
        }
        this.doClose();
    };

})();