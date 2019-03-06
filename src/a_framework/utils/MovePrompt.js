/**
 *Created by LRJ on 2018/5/4.
 *Describe : 浮动提示
 */

(function () {
    cc.MovePrompt = function () {
        cc.MovePrompt.__super.call(this);
        this.needCloseBtn = false;
        this.init();
    };

    Laya.class(cc.MovePrompt, "cc.MovePrompt", cc.BaseUIForms);
    var _proto = cc.MovePrompt.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "PROMPT",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.NORMAL, //UI窗体显示类型
            LucencyType: G.ENUM_UIFORM_LUCENY_TYPE.TRANS_LUCENCE //UI窗体透明度类型
        };
        this.loadRes(resArray, uiConfig);

        this.frameCount = 0;
        Laya.timer.frameLoop(1, this, this.update);
        this.paramsArray = [];
        this.promptArray = [];

        this.mouseThrough = true;
    };

    _proto.removeRes = function () {
        this.paramsArray = [];
        Laya.timer.clear(this, this.update);
    };

    _proto.addPrompt = function (msg) {
        if (this.paramsArray.length < 20) {
            this.paramsArray.push({"msg": msg});
        }
    };

    _proto.update = function () {
        if (this.frameCount++ < 15) {
            return;
        }
        var index = 0;
        for (var i = this.promptArray.length - 1; i >= 0; i--) {
            if (this.promptArray[i - 1] != undefined && this.promptArray[i].y - 40 <= this.promptArray[i - 1].y) {
                index = i;
                break;
            }
        }
        if (index > 0) {
            for (var i = index; i > 0; i--) {
                this.collFly(this.promptArray[i - 1]);
            }
        }

        this.frameCount = 0;
        if (this.paramsArray.length > 0) {
            var params = this.paramsArray.shift();
            this.prompt(params.msg);
        }
    };

    /** 获得物品提示 */
    _proto.prompt = function (msg) {
        var spr = new Laya.Image("ui/image9.png");
        spr.y = Laya.stage.height / 2;
        spr.sizeGrid = "5,5,5,5";
        this.addChild(spr);

        var text2 = new Laya.Text();
        text2.fontSize = 26;
        text2.color = "#ffffff";
        text2.text = msg;
        spr.addChild(text2);

        spr.size(text2.width + 100, text2.height + 20);
        spr.x = (Laya.stage.width - spr.width) / 2;
        text2.x = 50;
        text2.y = (spr.height - text2.height) / 2;

        this.promptArray.push(spr);

        Laya.Tween.to(spr, {
            y: Laya.stage.height / 4
        }, 1500, Laya.Ease.expoOut, new Laya.Handler(this, function () {
            this.removeSpr(spr);
        }));
    };

    _proto.collFly = function (spr) {
        if (!spr.m_delayTime) {
            spr.m_delayTime = 1;
        } else {
            spr.m_delayTime++;
        }
        if (spr.m_delayTime > 7) {
            return;
        }
        Laya.Tween.clearTween(spr);

        Laya.Tween.to(spr, {
            y: Laya.stage.height / 4 - 50 * spr.m_delayTime
        }, Math.max(100, 800 - spr.m_delayTime * 100), Laya.Ease.expoOut, new Laya.Handler(this, function () {
            this.removeSpr(spr);
        }));
    };

    _proto.removeSpr = function (spr) {
        this.promptArray.remove(spr);
        spr.removeSelf();
    };

})();