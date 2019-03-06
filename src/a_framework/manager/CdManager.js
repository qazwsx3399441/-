/**
 *Created by LRJ on 2018/2/24.
 *Describe :倒计时管理, 每帧按帧率递减
 */
(function (_super) {
    cc.CdTickManager = function () {
        // item = [obj, cdName, stopValue];
        this._cds = [];
    };

    Laya.class(cc.CdTickManager, "cc.CdTickManager", _super);
    var _proto = cc.CdTickManager.prototype;

    /**
     * 添加计时
     * @param obj 时间变量的父节点
     * @param cdName 时间变量名
     * @param stopValue 最终时间
     * @param stopHandler 完成倒计时回调
     * @param addValue 递减方向（-1 or +1）
     */
    _proto.push = function (obj, cdName, stopValue, stopHandler, addValue) {
        (stopValue === void 0) && (stopValue = 0);
        (addValue != undefined) || (addValue = -1);
        if (!obj || !cdName || obj[cdName] <= stopValue)
            return;
        for (var i = 0; i < this._cds.length; i++) {
            var item = this._cds[i];
            if (item[0] == obj && item[1] == cdName)
                return;
        }
        this._cds.push([obj, cdName, stopValue, stopHandler, addValue]);
        if (this._cds.length == 1)
            Laya.timer.frameLoop(1, this, this.frameLoop);
    };
    // 移除计时
    _proto.remove = function(obj, cdName){
        for (var i = 0; i < this._cds.length; i++) {
            var item = this._cds[i];
            if (item && item[0] == obj && item[1] == cdName) {
                this._cds.removeAt(i);
                return  item[0][item[1]];
            }
        }
    };

    _proto.frameLoop = function () {
        for (var i = 0; i < this._cds.length; i++) {
            var item = this._cds[i];
            if (item && item[0]) {
                item[0][item[1]] += Laya.timer.delta / 1000 * item[4];
                if (item[0][item[1]] >= item[2])
                    continue;
            }
            item[3] && item[3].run();
            this._cds.removeAt(i);
            i--;
        }
        if (this._cds.length == 0)
            Laya.timer.clear(this, this.frameLoop);
    };

    _proto.clear = function () {
        this._cds = [];
    };
})();