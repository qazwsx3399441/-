/**
 *Created by LRJ on 2018/5/7.
 *Describe : 分享界面
 */

(function () {
    cc.ShareWin = function (argObj) {
        this.__super.call(this, argObj);
        this.times = 0;             //进度条控制变量
        this.timeLength = 5;        //动画命名变量
        this.init();
    };

    Laya.class(cc.ShareWin, "cc.ShareWin", cc.BaseUIForms);
    var _proto = cc.ShareWin.prototype;

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
        this.mainUI = new ui.game.ShareViewUI();
        this.addChild(this.mainUI);

        // G.MAXSCORE = sessionStroage.getItem("maxScore");
        // if(!G.MAXSCORE){
        //     G.MAXSCORE = 0;
        //     sessionStroage.setItem("maxScore", G.MAXSCORE);
        // }
        this.mainUI.label_score.text = "总数:" + 0;
        this.mainUI.ani1 = new Laya.TimeLine();
        this.mainUI.img_bg.centerY = 700;
        this.mainUI.ani1.addLabel("move1", 0).to(this.mainUI.img_bg, { centerY: -100 }, 300, null, 0)
            .addLabel("move2", 0).to(this.mainUI.img_bg, { centerY: 0 }, 80, null, 0);
        this.mainUI.ani1.play(0, false);
        this.mainUI.ani1.on(Event.COMPLETE, this, function () {
            this.mainUI.img_bg.centerY = 0;
            wxUtils.show();
            wxUtils.postMsg({ type: "showShareUI" });
            //进度条变化增长
            this.scoreKey = updateManager.timeLoop(0.025, this, function () {
                this.times += 0.05;
                var number = parseInt(G.MAXSCORE * this.times);
                var _percent = this.times;
                this.mainUI.img_boold.width = (this.mainUI.img_booldBg.width - 10) * _percent;
                this.mainUI.label_score.text = "总数:" + number;
                audioManager.playSound(1024, null, true);
                if(this.times >= 1){
                    this.mainUI.label_score.text = "总数:" + G.MAXSCORE;
                    this.mainUI.img_boold.width = (this.mainUI.img_booldBg.width - 10);
                    updateManager.clear(this.scoreKey,this)
                }
            });
        })
    };

    //事件监听
    _proto.initEvent = function () {
        var self = this;
        utils.onBtnScaleEvent(this.mainUI.btn_again, this, this.closed);
        utils.onBtnScaleEvent(this.mainUI.label_checkAll, this, this.showRank);
        //分享
        utils.onBtnScaleEvent(this.mainUI.btn_share, this, function () {
            var _id = utils.random(1001,1007);
            var temp = D.round[_id].answer;
            audioManager.playSound(1023);
            sessionStroage.setItem("hasShare", true);
            sessionStroage.setItem("shareSecond", true);
            wxUtils.postMsg({ type: "hideShareUI" });
            wxUtils.stopShow();
            G.isClickShare = true;
            if (wxUtils.isWX) {
                wx.shareAppMessage({
                    imageUrl: "share.jpg",
                    title: temp
                })
            }
        });
    };

    //排行榜显示
    _proto.showRank = function () {
        audioManager.playSound(1023);
        wxUtils.postMsg({ type: "hideShareUI" });
        uiManager.openUI(cc.RankWin, this, { isShowShare: true });
        this.UIdown();
    };

    //分享界面上升
    _proto.UIup = function () {
        this.timeLine_shenji3 = new Laya.TimeLine();
        this.mainUI.img_bg.centerY = 720;
        this.timeLine_shenji3.addLabel("move1", 0).to(this.mainUI.img_bg, { centerY: -100 }, 300, null, 0)
            .addLabel("move2", 0).to(this.mainUI.img_bg, { centerY: 0 }, 80, null, 0);
        this.timeLine_shenji3.on(Event.COMPLETE, this, function () {
            this.mainUI.img_bg.centerY = 0;
            wxUtils.show();
            wxUtils.postMsg({ type: "showShareUI" });
            this.timeLine_shenji3.destroy();
            this.timeLine_shenji3 = null;
        });
        this.timeLine_shenji3.play(0, false);
    };
    //分享界面下降
    _proto.UIdown = function () {
        this.timeLine_shenji4 = new Laya.TimeLine();
        this.timeLine_shenji4.addLabel("move1", 0).to(this.mainUI.img_bg, { centerY: 800 }, 400, null, 0);
        this.timeLine_shenji4.on(Event.COMPLETE, this, function () {
            // wxUtils.postMsg({ type: "hideShareUI" });
            // wxUtils.stopShow();
            this.mainUI.img_bg.centerY = 800;
            this.timeLine_shenji4.destroy();
            this.timeLine_shenji4 = null;
        });
        this.timeLine_shenji4.play(0, false);
    };

    _proto.closed = function () {
        for(var i = 1; i < (this.timeLength); i++){
            if(this["timeLine_shenji" + i]){
                this["timeLine_shenji" + i].destroy();
            }
        }
        updateManager.clearAll(this);
        audioManager.stopAll();
        audioManager.playSound(1023);
        wxUtils.postMsg({ type: "hideShareUI" });
        wxUtils.stopShow();
        if(G.OPEN_NEW_UI){
            var temp = uiManager.getUI(cc.GameWin);
            if(temp){
                temp.mainUI.btn_back.visible = false;
                if(G.GAME_TYPE < 6){
                    temp.bool_again = true;
                }
                updateManager.timeOnce(1, temp, function () {
                    temp.closed();
                })
            }
        }
        this.doClose();
    };

})();