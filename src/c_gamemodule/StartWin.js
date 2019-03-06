/**
 *Created by LLC on 2018/8/17.
 *Describe : 游戏开始界面
 */

(function () {
    cc.StartWin = function () {
        this.__super.call(this);
        this.isBGM = true;

        this.moveBool = true;
        this.init();
    };

    Laya.class(cc.StartWin, "cc.StartWin", cc.BaseUIForms);
    var _proto = cc.StartWin.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "UI",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.NORMAL, //UI窗体显示类型
            LucencyType: G.ENUM_UIFORM_LUCENY_TYPE.TRANS_LUCENCE //UI窗体透明度类型
        };
        this.loadRes(resArray, uiConfig);//加载资源
    };

    _proto.loadResComplete = function () {
        this.__super.prototype.loadResComplete.call(this);
        this.initUI();
        this.initEvent();
        wxUtils.postMsg({ type: "getUserID" });
    };

    _proto.initUI = function () {
        this.mainUI = new ui.game.StartView1UI();
        this.addChild(this.mainUI);
        this.winAni = new cc.Action(1008,this.mainUI.box_elephant, function () {
            this.winAni.play("elephant", true);
        }.bind(this));//或者self=this为了解决回调函数
        //加载界面判定
        var loadingUI = uiManager.getUI(cc.LoadingWin);
        if (loadingUI) {
            loadingUI.hideLoading(function () {
                updateManager.timeOnce(0.5, this, function () {
                    // audioManager.playSound(1121);
                });
            })
        } else {
            updateManager.timeOnce(0.5, this, function () {
                audioManager.playSound(1121);
            });
        }
        Laya.SoundManager.setMusicVolume(1);
    };

    _proto.initEvent = function () {
        utils.onBtnScaleEvent(this.mainUI.btn_start, this, this.startGame.bind(this, 1));                         //开始游戏
        utils.onBtnScaleEvent(this.mainUI.btn_share, this, this.share);                               //分享
        utils.onBtnScaleEvent(this.mainUI.btn_rank, this, this.showRank);                             //排行榜
        utils.onBtnScaleEvent(this.mainUI.btn_music, this, this.BgMusic);              //声音
    };

    //进入游戏
    _proto.startGame = function (type) {
        G.GAME_TYPE = type;         //关卡界面类型判断（0是数字关卡）
        var self = this;
        updateManager.clearAll(this);
        audioManager.stopAll();
        audioManager.playSound(1023);       //按键音
        uiManager.openUI(cc.SelectRoundWin);
        self.doClose();
    };

    // 分享
    _proto.share = function () {
        var _id = utils.random(1001, 1007);
        var temp = D.round[_id].answer;
        audioManager.playSound(1023);
        G.isClickShare = true;
        if (wxUtils.isWX) {
            wx.shareAppMessage({
                imageUrl: "share.jpg",
                title: temp
            })
        }
    };

    //排行榜
    _proto.showRank = function () {
        audioManager.playSound(1023);
        uiManager.openUI(cc.RankWin, this, { isShowShare: false });
    };

    //待定云移动
    _proto.moveCloud = function () {
        this.mainUI.img_cloud1.x -= 0.1;
        this.mainUI.img_cloud2.x += 0.2;

        if (this.mainUI.img_cloud1.x < -this.mainUI.img_cloud1.width) {
            this.mainUI.img_cloud1.x = Laya.stage.width + Math.random() * 30;
        }
        if (this.mainUI.img_cloud2.x > Laya.stage.width) {
            this.mainUI.img_cloud2.x = -this.mainUI.img_cloud2.width + Math.random() * 30;
        }
    };

    //ui规律晃动（关卡按键，logo）
    _proto.moveUI = function () {
        if (this.moveBool) {
            // this.mainUI.img_logo.top += 0.25;
            this.mainUI.btn_animal.bottom += 0.20;
            this.mainUI.btn_number.bottom -= 0.20;
            if (this.mainUI.btn_animal.bottom > 120) {
                this.moveBool = false;
            }
        } else {
            // this.mainUI.img_logo.top -= 0.25;
            this.mainUI.btn_animal.bottom -= 0.20;
            this.mainUI.btn_number.bottom += 0.20;
            if (this.mainUI.btn_animal.bottom < 108) {
                this.moveBool = true;
            }
        }
    };

    //背景音乐
    _proto.BgMusic = function () {
        audioManager.playSound(1023);
        this.isBGM = !this.isBGM;
        if (this.isBGM) {
            audioManager.playBGM();
            this.mainUI.btn_music.gray = false;
        } else {
            audioManager.stopBGM();
            this.mainUI.btn_music.gray = true;
        }
    };
})();
