/**
 *Created by LRJ on 2018/5/4.
 *Describe : 固定提示
 */

(function () {

    /**
     * 系统文字提示。如xxx功能未开放等。
     * @constructor
     */
    cc.Prompt = function () {
        cc.Prompt.__super.call(this);
        this.needCloseBtn = false;
        this.init();
    };

    Laya.class(cc.Prompt, "cc.Prompt", cc.BaseUIForms);
    var _proto = cc.Prompt.prototype;

    _proto.init = function () {
        var resArray = [

        ];
        var uiConfig = {
            zOrder: "PROMPT",  // UI所在层级
            ShowMode: G.ENUM_UIFORM_SHOW_MODE.NORMAL, //UI窗体显示类型
            LucencyType: G.ENUM_UIFORM_LUCENY_TYPE.TRANS_LUCENCE //UI窗体透明度类型
        };
        this.loadRes(resArray, uiConfig);

        this.bgSprite = new Laya.Image("ui/image9.png");
        this.bgSprite.width = Laya.stage.width - 40;
        this.bgSprite.height = 50;
        this.bgSprite.anchorX = 0.5;
        this.bgSprite.anchorY = 0.5;
        this.bgSprite.x = Laya.stage.width / 2;
        this.bgSprite.y = Laya.stage.height / 9;
        this.bgSprite.sizeGrid = "12,12,12,12";
        this.addChild(this.bgSprite);

        this.textOffx = 30;
        this.textOffy = 15;

        this.tipText = new Laya.Label();
        this.bgSprite.addChild(this.tipText);
        this.tipText.width = this.bgSprite.width - this.textOffx * 2;
        this.tipText.fontSize = 30;
        this.tipText.align = "center";
        this.tipText.color = "#ffffff";
        this.tipText.y = this.textOffy;

        this.timeLine = new Laya.TimeLine();
        this.timeLine.addLabel("scale", 0).to(this.bgSprite, {scaleX:1.2, scaleY:1.2, alpha:1}, 100, null, 0)
            .addLabel("back", 0).to(this.bgSprite, {scaleX:1.0, scaleY:1.0, alpha:1}, 100, null, 0)
            .addLabel("show", 0).to(this.bgSprite, {alpha:1}, 1000, null, 0)
            .addLabel("hide", 0).to(this.bgSprite, {alpha:0}, 1000, null, 0);
        this.timeLine.on(laya.events.Event.COMPLETE, this, this.onComplete);

        this.mouseThrough = true;
    };

    _proto.removeRes = function () {
        this.timeLine.destroy();
    };

    _proto.onComplete = function () {
        this.visible = false;
    };


    /** 获得物品提示 */
    _proto.prompt = function (msg) {
        this.tipText.text = msg;
        this.tipText.x = this.textOffx;
        this.bgSprite.height = 30+this.textOffx;
        this.timeLine.play(0, false);
        this.visible = true;
    };

    _proto.resize = function () {
        if (this.bgSprite) {
            this.bgSprite.width = Laya.stage.width-40;
            this.bgSprite.height = this.tipText.contextHeight+this.textOffx;
            this.bgSprite.x = Laya.stage.width/2;
            this.bgSprite.y = Laya.stage.height/8;
            if (this.tipText) {
                this.tipText.style.width = this.bgSprite.width-this.textOffx*2;
            }
        }
    };

})();