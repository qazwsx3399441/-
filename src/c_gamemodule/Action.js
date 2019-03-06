/**
 *Created by LRJ on 2018/6/28.
 *Describe : 龙骨动画基类
*/
(function () {
    cc.Action = function (modelId, scene, loadComplete) {
        this.__super.call(this);
        this.modelId = modelId;
        this.mainData = D.round[this.modelId];
        this.loadComplete = loadComplete;
        this.scene = scene;
        this.init();
    };

    Laya.class(cc.Action, "cc.Action", Laya.Component);
    var _proto = cc.Action.prototype;

    _proto.init = function () {

        this.initEvent();
    };

    _proto.initEvent = function () {
        this.templet = new Laya.Templet();
        //通过加载直接创建动画
        this.templet.on(Event.COMPLETE, this, function () {
            this.armature = this.templet.buildArmature(0);
            this.addChild(this.armature);
            this.scene.addChild(this);
            //创建完毕回调
            if (this.loadComplete) {
                this.loadComplete();
            }
        });
        this.templet.loadAni("res/dragonBones/" + this.mainData.name + ".sk");
    };

    //播放动作
    _proto.play = function (indexOrName, loop) {
        this.armature.play(indexOrName, loop);
    };
    _proto.stop = function (indexOrName, loop) {
        this.armature.stop(indexOrName);
    };

    //设置动作结束回调
    _proto.setComPlete = function (completeHandler) {
        if (this.completeHandler) {
            //如果有回调，取消掉
            this.armature.off(Event.STOPPED, this, this.completeHandler);
        }
        if (completeHandler) {
            //动作停止回调
            this.completeHandler = completeHandler;
            this.armature.on(Event.STOPPED, this, this.completeHandler);
        }
    };

    _proto.setModelScale = function (scale) {
        this.armature.scaleX = scale;
        this.armature.scaleY = scale;
    };

    _proto.setPosition = function (x, y) {
        if (typeof (x) == "number" && typeof (y) == "number") {
            this.templet.x = x;
            this.templet.x = y;
        } else {
            console.log("error:参数错误")
        }
    };

    //删除 并 回收资源, 并清除自身的引用
    _proto.dispose = function () {
        this.destroy();
    };

})();
