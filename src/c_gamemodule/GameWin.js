/**
 *Created by LLC on 2018/8/16.
 *Describe : 游戏界面
 */
(function () {
    cc.GameWin = function (argObj) {
        this.__super.call(this);

        G.OPEN_NEW_UI = false;
        this.NowLv = G.GAME_TYPE;              //关卡类型
        this.nowLv = G.GAME_ROUND;             //当前关卡

        this.init();
    };
    G.OPEN_NEW_UI = false;
    Laya.class(cc.GameWin, "cc.GameWin", cc.BaseUIForms);
    var _proto = cc.GameWin.prototype;

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

    _proto.loadResComplete = function () {//每個頁面都有回調的執行
        this.__super.prototype.loadResComplete.call(this);

        this.initUI();
        Laya.timer.once(1000, this, this.playSound1, false);
        Laya.timer.once(5000, this, this.begin, false);
        Laya.timer.once(6000, this, this.initEvent, false);

        //  this.Ani();
        //loding界面判定
        var loadingUI = uiManager.getUI(cc.LoadingWin);
        if (loadingUI) {
            loadingUI.hideLoading();

        }

    };

    _proto.initUI = function () {
        this.mainUI = new ui.game.GameView2UI(); //主关卡
        this.addChild(this.mainUI);
        //当前得分
        this.mainUI.label_score.text = G.MAXSCORE;
        this.box_1_1y = this.mainUI.box_1_1.y;
        this.box_1_2y = this.mainUI.box_1_2.y;
        this.movebool = true;
        this.movebool1 = true;
        if (G.GAME_TYPE == 1) {
            this.mainUI.image_2_3.alpha = 0;
            this.mainUI.image_2_5.value = 0;
            this.mainUI.image_2_5.alpha = 1;
        }
        else if (G.GAME_TYPE == 2) {
            this.mainUI.image_2_3.alpha = 0;
            this.mainUI.image_2_5.value = 3;
            this.mainUI.image_2_5.alpha = 1;
        }
        else {
            this.mainUI.image_2_3.skin = "gameComposition/image_question.png";
        }
        this.winAni = new cc.Action(1009, this.mainUI.box_elephant1, function () {
            this.winAni.setModelScale(0.97);
        }.bind(this))//或者self=this为了解决回调函数

        Laya.SoundManager.setMusicVolume(0.5);  //bgm音量
    };

    //动画
    _proto.playSound1 = function () {
        audioManager.playSound(1122);//进场的声音
    }

    _proto.Ani = function () {
        this.Ani_bulinbulin = new ui.ani.Ani_bulinbulinUI();
        this.Ani_bulin = this.Ani_bulinbulin.Ani_bulinbulin;
        this.mainUI.addChild(this.Ani_bulin);

        //时间轴动画
        this.timeLine_win = new Laya.TimeLine();
        this.timeLine_win.addLabel("move1", 0).to(this.mainUI["img_" + this.nowLv], { x: this.endX + 30 }, 400, null, 0)
            .addLabel("move2", 0).to(this.mainUI["img_" + this.nowLv], { x: this.endX }, 10, null, 0);
        this.timeLine_tishi = new Laya.TimeLine();
        this.timeLine_tishi.addLabel("alpha", 0).to(this.mainUI.label_backTishi, { alpha: 0 }, 1500, null, 0);

    };
    _proto.Ani_hourclock = function (number) {
        if (number <= 3) {
            var hourrotation = -(30 * (3 - number));
        }
        else {
            hourrotation = (number - 3) * 30;
        }
        this.timeLine_hourclock1 = new Laya.TimeLine();
        this.timeLine_hourclock2 = new Laya.TimeLine();
        this.timeLine_hourclock1.addLabel("action1", 0).to(this.mainUI.btn_2_0, { rotation: 270 }, 800, null, 0);
        this.timeLine_hourclock2.addLabel("action2", 0).to(this.mainUI.btn_2_0, { rotation: this.rotation + hourrotation }, 800, null, 0);
        this.timeLine_hourclock1.on(Event.COMPLETE, this, function () {
            this.mainUI.btn_2_0.rotation = -90;
            this.timeLine_hourclock2.play(0, false);

        })


        this.timeLine_hourclock2.on(Event.COMPLETE, this, function () {
            // updateManager.clear(this.tishiKey1, this);
            audioManager.stopSound(1115);
            if (G.GAME_TYPE < 3) {
                var _temp3 = utils.random(1016, 1017);//音效
                audioManager.playSound(_temp3);
            }
            if (number >= 10) {
                this.mainUI.image_2_1.value = 1;
            }
            else
                this.mainUI.image_2_1.value = 0;
            this.timeLine_hourclock1.destroy();
            this.timeLine_hourclock2.destroy();
        });

    };
    _proto.Ani_hourclock2 = function (number) {
        if (number == 1)
            var minrotation = -90;
        else if (number == 2)
            minrotation = 90;
        else if (number == 3)
            minrotation = -60;
        else
            minrotation = 120;

        this.timeLine_hourclock3 = new Laya.TimeLine();
        this.timeLine_hourclock4 = new Laya.TimeLine();
        this.timeLine_hourclock3.addLabel("action1", 0).to(this.mainUI.btn_2_1, { rotation: 270 }, 800, null, 0);
        this.timeLine_hourclock4.addLabel("action2", 0).to(this.mainUI.btn_2_1, { rotation: minrotation }, 800, null, 0);
        this.timeLine_hourclock3.play(0, false);
        this.playkey();
        this.timeLine_hourclock3.on(Event.COMPLETE, this, function () {
            this.mainUI.btn_2_1.rotation = -90;
            this.timeLine_hourclock4.play(0, false);
        })
        this.timeLine_hourclock4.on(Event.COMPLETE, this, function () {
            audioManager.stopSound(1115);
            this.timeLine_hourclock3.destroy();
            this.timeLine_hourclock4.destroy();
        })
    }
    _proto.initEvent = function () {//鼠标的工作
        //图片拖拽       
        for (var i = 0; i < 3; i++) {
            this.mainUI["btn_1_" + i].index = i;
            this.mainUI["btn_1_" + i].on(Event.MOUSE_DOWN, this, function (e) {//鼠标按下
                audioManager.playSound(1023);
                // e.target.startDrag(null, false, 0, 0);

            });
            this.mainUI["btn_1_" + i].on(Event.MOUSE_UP, this, function (e) {  //鼠标抬起
                if (G.GAME_TYPE <= 2)
                    this.judge(e);
                else
                    this.judgehigh(e);
                for (var j = 0; j < 3; j++) {
                    this.mainUI["btn_1_" + j].zOrder = 0;
                }
            });
        }

        utils.onBtnScaleEvent(this.mainUI.btn_back, this, function () {
            audioManager.playSound(1023);
            this.bool_again = false;
            if (!this.clickBackTime) {
                this.clickBackTime = new Date().getTime();

                // this.timeLine_tishi.play(0, false);
            } else {
                var now = new Date().getTime();
                if (now - this.clickBackTime < 1000) {
                    this.closed();
                } else {
                    this.clickBackTime = new Date().getTime();
                }
            }
        });     //返回按键
        this.timeLine_numberout2.on(Event.COMPLETE, this, function () {  //数字出去时间轴动画监控
            if (G.GAME_TYPE < 3 && G.GAME_ROUND != 5) {//第一关第二关

                this["Round" + G.GAME_TYPE]();
                Laya.timer.once(4000, this, this.numberinplay, false);

                this.mainUI.box_1_1.y = this.box_1_1y;
                this.mainUI.image_2_2.alpha = 1;

            }
            else if (G.GAME_TYPE == 3) {//第三关
                if (this.selecttimes == 2) {//答对了开始下一题
                    this.Round3();
                    this.mainUI.image_2_1.value = 0;
                    this.selecttimes = 1;
                    this.mainUI.box_1_1.y = this.box_1_1y;
                    this.mainUI.box_1_2.y = this.box_1_2y;
                    Laya.timer.once(4000, this, this.numberinplay, false);
                    this.mainUI.image_2_2.alpha = 1;
                    this.mainUI.image_2_3.alpha = 1;
                }
                else {

                    if (this.mainUI.btn_2_1.rotation == 90)//选择分位的数字
                        G.rightfennumber = 3;
                    else
                        G.rightfennumber = 0;


                    this.btnrandom(G.rightfennumber);

                    Laya.timer.once(1000, this, this.numberinplay, false);
                    this.selecttimes++;
                }
            }
            else {//第四关第五关
                if (this.selecttimes == 2) {//答对了开始下一题
                    this["Round" + G.GAME_TYPE]();
                    this.mainUI.image_2_1.value = 0;
                    this.selecttimes = 1;
                    this.mainUI.box_1_1.y = this.box_1_1y;
                    this.mainUI.box_1_2.y = this.box_1_2y;
                    Laya.timer.once(4000, this, this.numberinplay, false);
                    this.mainUI.image_2_2.alpha = 1;
                    this.mainUI.image_2_3.alpha = 1;
                }
                else {
                    if (this.mainUI.btn_2_1.rotation == 90 || this.mainUI.btn_2_1.rotation == 120)//选择分位的数字
                        G.rightfennumber = 3;
                    else if (this.mainUI.btn_2_1.rotation == -90 || this.mainUI.btn_2_1.rotation == -60)
                        G.rightfennumber = 0;
                    this.btnrandom(G.rightfennumber);
                    Laya.timer.once(1000, this, this.numberinplay, false);
                    this.selecttimes++;
                }
            }
        });
        this.mainUI.bear1.ani1.on(Event.COMPLETE, this, function () {//监控摆手的动画
            G.MAXSCORE = G.MAXSCORE + 5;
            this.mainUI.label_score.text = G.MAXSCORE;//加分
            this.mainUI.ani3.play(0, false);

            if (G.GAME_ROUND > 4) {
                G.GAME_ROUND = 0;
                G.OPEN_NEW_UI = true;
                // sessionStroage.setItem("ThisRoud", G.CANPLAY);

                uiManager.openUI(cc.ShareWin);
            } else {
                this.numberoutplay();
            }

        });
        this.mainUI.bear2.ani1.on(Event.COMPLETE, this, function () {//监控摆手的动画
            G.MAXSCORE = G.MAXSCORE + 5;
            this.mainUI.label_score.text = G.MAXSCORE;//加分
            this.mainUI.ani3.play(0, false);
            if (G.GAME_ROUND > 4) {
                G.GAME_ROUND = 0;
                G.OPEN_NEW_UI = true;
                // sessionStroage.setItem("ThisRoud", G.CANPLAY);

                uiManager.openUI(cc.ShareWin);
            } else {
                this.numberoutplay();
            }

        });
        this.timeLine_numberin2.on(Event.COMPLETE, this, function () {//数字进来时间轴动画监控
            var _temp = utils.random(1118, 1119);//提示的音效
            audioManager.playSound(_temp);
            this.mouseEnabledtrue();
        });
    };


    _proto.begin = function () {
        switch (G.GAME_TYPE) {
            case 1:
                this.Round1();
                break;
            case 2:
                this.Round2();
                break;
            case 3:
                this.Round3();
                break;
            case 4:
                this.Round4();
                break;
            case 5:
                this.Round5();
                break;
            default:
                console.log("没进循环");
        }
        var centerY = 280;
        this.timeLine_numberin0 = new Laya.TimeLine();
        this.timeLine_numberin1 = new Laya.TimeLine();
        this.timeLine_numberin2 = new Laya.TimeLine();
        this.timeLine_numberin0.addLabel("action1", 0).to(this.mainUI.image_5_1, { centerY: centerY + 10 }, 200, null, 0)
            .to(this.mainUI.image_5_1, { bottom: centerY }, 100, null, 0);
        this.timeLine_numberin1.addLabel("action1", 0).to(this.mainUI.image_5_2, { centerY: centerY + 10 }, 200, null, 0)
            .to(this.mainUI.image_5_2, { bottom: centerY }, 100, null, 0);
        this.timeLine_numberin2.addLabel("action1", 0).to(this.mainUI.image_5_3, { centerY: centerY + 10 }, 200, null, 0)
            .to(this.mainUI.image_5_3, { bottom: centerY }, 100, null, 0);
        Laya.timer.once(4000, this, this.numberinplay, false);
        var bottom2 = 460;
        this.timeLine_numberout0 = new Laya.TimeLine();
        this.timeLine_numberout1 = new Laya.TimeLine();
        this.timeLine_numberout2 = new Laya.TimeLine();
        this.timeLine_numberout0.addLabel("action1", 0).to(this.mainUI.image_5_1, { centerY: bottom2 }, 200, null, 0)
        this.timeLine_numberout1.addLabel("action2", 0).to(this.mainUI.image_5_2, { centerY: bottom2 }, 200, null, 0)
        this.timeLine_numberout2.addLabel("action3", 0).to(this.mainUI.image_5_3, { centerY: bottom2 }, 200, null, 0);
    };
    _proto.mouseEnabledtrue = function () {
        this.mainUI.btn_1_0.mouseEnabled = true;
        this.mainUI.btn_1_1.mouseEnabled = true;
        this.mainUI.btn_1_2.mouseEnabled = true;
    };
    _proto.playbear = function () {
        var x = utils.random(1, 2);
        if (x == 1)
            this.mainUI.bear1.ani1.play(0, false);
        else
            this.mainUI.bear2.ani1.play(0, false);

    };
    //图片正确判定
    _proto.judge = function (e) {
        if (e.target.index == G.rightbtn) {
            for (var i = 1118; i <= 1119; i++) {
                audioManager.stopSound(i);
            }
            updateManager.clear(this.tishiKey, this);
            this.mainUI.btn_1_0.mouseEnabled = false;
            this.mainUI.btn_1_1.mouseEnabled = false;
            this.mainUI.btn_1_2.mouseEnabled = false;



            G.GAME_ROUND++;
            this.mainUI.image_2_2.alpha = 0;
            this.movebool = true;
            this.movenumberkey = updateManager.frameLoop(1, this, this.movenumber, G.rightshinumber);//数字转动
            var _temp = utils.random(1020, 1022);//答对的音效
            this.winAni.play("elephant-yes", false);
            audioManager.playSound(_temp);
            Laya.timer.once(2000, this, this.playbear, false);


            for (var i = 0; i <= G.GAME_ROUND; i++) {//计分
                if (i != 0 && i <= 5) {
                    this.mainUI["image_1_" + i].disabled = false;
                }
            }
            if (G.GAME_ROUND > 4) {
                this.bool_again = true;
                G.CANPLAY = G.GAME_TYPE + 1;

                if (G.GAME_TYPE == G.MAXLV + 1)
                    G.MAXLV++;
                G.GAME_TYPE++;

            }
        }
        else {
            for (var i = 1118; i <= 1119; i++) {
                audioManager.stopSound(i);
            }//让它立刻停止音效
            this.winAni.play("elephant-no", false);
            updateManager.clear(this.tishiKey, this);//让它立刻停止音效
            var _temp2 = utils.random(1116, 1117);
            audioManager.playSound(_temp2);
            this.tishiKey = updateManager.timeLoop(8, this, function () {
                var _temp = utils.random(1112, 1113);
                audioManager.playSound(_temp);//配音不全暂时取消
            })
        }

    };

    //图片正确判定二
    _proto.judgehigh = function (e) {

        if (e.target.index == G.rightbtn) {
            for (var i = 1118; i <= 1119; i++) {
                audioManager.stopSound(i);
            }
            updateManager.clear(this.tishiKey, this);
            this.mainUI.btn_1_0.mouseEnabled = false;
            this.mainUI.btn_1_1.mouseEnabled = false;
            this.mainUI.btn_1_2.mouseEnabled = false;
            if (this.selecttimes == 1) {


                this.mainUI.image_2_2.alpha = 0;
                this.movebool = true;
                this.movenumberkey1 = updateManager.frameLoop(1, this, this.movenumber, G.rightshinumber);//時針移动
                this.numberoutplay();
            }
            else {

                G.GAME_ROUND++;
                this.mainUI.image_2_3.alpha = 0;
                this.movebool1 = true;
                this.movenumberkey2 = updateManager.frameLoop(1, this, this.movenumber1, G.rightfennumber);//分位变化
                var _temp = utils.random(1020, 1022);//答对的音效
                this.winAni.play("elephant-yes", false);
                audioManager.playSound(_temp);
                Laya.timer.once(2000, this, this.playbear, false);
                for (var i = 0; i <= G.GAME_ROUND; i++) {//计分
                    if (i != 0 && i <= 5) {
                        this.mainUI["image_1_" + i].disabled = false;
                    }
                }
                if (G.GAME_ROUND > 4) {
                    this.bool_again = true;
                    G.CANPLAY++;
                    G.GAME_TYPE++;
                    G.MAXLV++;
                    if (G.GAME_TYPE > 5) {
                        uiManager.openUI(cc.ShareWin);
                        G.CANPLAY = 5;
                        G.MAXLV = 5;
                        G.GAME_TYPE = 5;
                    }

                }

            }

        }
        else {
            for (var i = 1118; i <= 1119; i++) {
                audioManager.stopSound(i);
            }//让它立刻停止音效
            updateManager.clear(this.tishiKey, this);//让它立刻停止音效
            this.winAni.play("elephant-no", false);
            var _temp2 = utils.random(1116, 1117);//答错的音效
            audioManager.playSound(_temp2);
            this.tishiKey = updateManager.timeLoop(8, this, function () {
                var _temp = utils.random(1112, 1113);
                audioManager.playSound(_temp);//配音不全暂时取消
            })
        }
    };
    _proto.numberinplay = function () {
        audioManager.playSound(1023);
        this.timeLine_numberin0.play(0, false);
        this.timeLine_numberin1.play(0, false);
        this.timeLine_numberin2.play(0, false);
        this.tishiKey = updateManager.timeLoop(8, this, function () {
            var _temp = utils.random(1112, 1113);
            audioManager.playSound(_temp);//配音不全暂时取消
        })


    };
    _proto.numberoutplay = function () {
        this.timeLine_numberout0.play(0, false);
        this.timeLine_numberout1.play(0, false);
        this.timeLine_numberout2.play(0, false);

    };

    _proto.btnrandom = function (number) {
        var A = [];
        while (A.length < 3) {
            var random = utils.random(0, 9);
            if (!A.contains(random) && random != number) {
                A.push(random);
            }
        }
        var rightIndex = utils.random(0, 2);
        G.rightbtn = rightIndex;
        A[rightIndex] = number;

        for (var i = 0; i < 3; i++) {
            this.mainUI["btn_1_" + i].skin = "ui/number/" + A[i] + "_1.png";
        }
    };
    _proto.playkey = function () {
        audioManager.playSound(1115, null, false, 0);
        // audioManager.playSound(1115, null);
        // this.tishiKey1 = updateManager.timeLoop(0.5, this, function () {
        //     audioManager.playSound(1115, null);//配音不全暂时取消
        // })
    }
    _proto.Round1 = function () {//第一关
        this.mainUI.btn_2_1.rotation = -90;//调分针
        G.rightshinumber = utils.random(1, 5);//时针正确答案
        this.Ani_hourclock(G.rightshinumber);
        this.timeLine_hourclock1.play(0, false);
        this.playkey();

        // audioManager.playSound(1115,null,false,0);//配音不全暂时取消

        // this.mainUI.btn_2_0.rotation = -90;
        // this.timeLine_hourclock2.play(0, false);


        this.btnrandom(G.rightshinumber);


    };
    _proto.Round2 = function () {//第二关
        this.mainUI.btn_2_1.rotation = 90;
        G.rightshinumber = utils.random(1, 12);//时针正确答案
        if (G.rightshinumber > 9)
            G.rightshinumber -= 10;
        this.Ani_hourclock(G.rightshinumber);
        this.timeLine_hourclock1.play(0, false);
        this.playkey();
        // audioManager.playSound(1115, true);//配音不全暂时取消
        this.btnrandom(G.rightshinumber);

    };
    _proto.Round3 = function () {//第三关
        var clock = utils.random(1, 2);
        this.selecttimes = 1;
        if (clock == 1)
            this.Ani_hourclock2(clock);
        else
            this.Ani_hourclock2(clock);
        G.rightshinumber = utils.random(1, 12);//时针正确答案

        this.Ani_hourclock(G.rightshinumber);
        if (G.rightshinumber > 9)
            G.rightshinumber -= 10;
        this.timeLine_hourclock1.play(0, false);//播放时间轴动画
        this.playkey();
        this.btnrandom(G.rightshinumber);


    };
    _proto.Round4 = function () {//第四关
        var clock = utils.random(1, 4);
        this.selecttimes = 1;
        if (clock == 1) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 0;
        }
        else if (clock == 2) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 0;
        }
        else if (clock == 3) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 5;
        }
        else {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 5;
        }
        G.rightshinumber = utils.random(1, 12);//时针正确答案
        this.Ani_hourclock(G.rightshinumber);
        if (G.rightshinumber > 9)
            G.rightshinumber -= 10;
        this.timeLine_hourclock1.play(0, false);//播放时间轴动画
        this.playkey();
        this.btnrandom(G.rightshinumber);

    };
    _proto.Round5 = function () {//第五关
        var clock = utils.random(1, 4);
        this.selecttimes = 1;
        if (clock == 1) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 0;
        }
        else if (clock == 2) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 0;
        }
        else if (clock == 3) {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 5;
        }
        else {
            this.Ani_hourclock2(clock);
            this.mainUI.image_2_4.value = 5;
        }
        G.rightshinumber = utils.random(1, 12);//时针正确答案     
        this.Ani_hourclock(G.rightshinumber);
        if (G.rightshinumber > 9)
            G.rightshinumber -= 10;
        this.timeLine_hourclock1.play(0, false);//播放时间轴动画
        this.playkey();
        this.btnrandom(G.rightshinumber);

    };

    _proto.movenumber = function (number) {//一张图130
        if (number > 9)
            number -= 10;
        if (this.box_1_1y - this.mainUI.box_1_1.y >= (number + 1) * 120) {

            this.movebool = false;

        }
        if (this.movebool) {
            this.mainUI.box_1_1.y -= 12;

        } else {
            updateManager.clear(this.movenumberkey1, this);
            updateManager.clear(this.movenumberkey, this);
        }
    };
    _proto.movenumber1 = function (number) {//一张图130
        console.log(number);
        if (number > 9)
            number -= 10;
        if (this.box_1_2y - this.mainUI.box_1_2.y >= (number + 1) * 120) {

            this.movebool1 = false;


        }

        if (this.movebool1) {

            this.mainUI.box_1_2.y -= 12;

        } else {
            updateManager.clear(this.movenumberkey2, this);
        }
    };
    //分享
    _proto.share = function () {
        uiManager.openUI(cc.ShareWin);
    };


    //关闭界面
    _proto.closed = function () {
        var self = this;

        updateManager.clearAll(this);
        this.timeLine_numberin0.destroy();
        this.timeLine_numberin1.destroy();
        this.timeLine_numberin2.destroy();
        this.timeLine_numberout0.destroy();
        this.timeLine_numberout1.destroy();
        this.timeLine_numberout2.destroy();
        uiManager.openUI(cc.LoadingWin, null, {
            complete: function () {
                if (self.bool_again) {
                    self.doClose();
                    uiManager.openUI(cc.GameWin);
                } else {
                    self.doClose();
                    uiManager.openUI(cc.SelectRoundWin);
                }
            }
        });
    };

})();