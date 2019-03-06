/**
 * Created by Administrator on 2018/2/23 0023.
 */
(function () {
    cc.Utils = function () {
        this._pool = Laya.Pool;

    };

    Laya.class(cc.Utils, "cc.Utils");
    var _proto = cc.Utils.prototype;

    _proto.getColor = function (index) {
        return this.colorConfig[index];
    };

    /**按键注册事件 */
    _proto.onBtnEvent = function (node, caller, callback) {
        if (node == undefined) {
            console.log("控件不存在")
        }
        node.on(Event.CLICK, caller, callback);
    };
    _proto.offBtnEvent = function (node, caller, callback) {
        if (node == undefined) {
            console.log("控件不存在");
        }
        node.off(Event.CLICK, caller, callback);
    };

    /**按键注册事件(放大) */
    _proto.onBtnScaleEvent = function (node, caller, callback) {
        if (node == undefined) {
            console.log("控件不存在");
        }
        var bkScaleX = node.scaleX ? node.scaleX : 1;
        var bkScaleY = node.scaleY ? node.scaleY : 1;
        node.offAll();
        node.anchorX = isNaN(node.anchorX) ? 0 : node.anchorX;
        node.anchorY = isNaN(node.anchorY) ? 0 : node.anchorY;
        var x = node.x + (node.width * 0.5 - node.width * node.anchorX);
        var y = node.y + (node.height * 0.5 - node.height * node.anchorY);
        node.anchorX = 0.5;
        node.anchorY = 0.5;
        node.x = x;
        node.y = y;

        node.on(Laya.Event.MOUSE_DOWN, caller, function (e) {
            e.target.scale(bkScaleX * 1.1, bkScaleY * 1.1);
            e.stopPropagation();
        });
        node.on(Laya.Event.ROLL_OUT, caller, function (e) {
            e.currentTarget.scale(bkScaleX, bkScaleY);
            e.stopPropagation();
        });
        node.on(Laya.Event.MOUSE_UP, caller, function (e) {
            e.target.scale(bkScaleX, bkScaleY);
            e.stopPropagation();
        });
        node.on(Laya.Event.CLICK, caller, function (e) {
            if (callback != undefined) {
                callback.bind(caller)(e);
            }
            if (e.stopPropagation != undefined) {
                e.stopPropagation();
            }
        });
    };

    //随机
    _proto.random = function (min, max) {
        var value = Math.floor(Math.random() * (max + 1 - min) + min);
        return value;
    };

    //模糊滤镜(在webGl模式下可用)
    _proto.setImgBlur = function (imgNode, value) {
        if (imgNode) {
            value = value || 5;
            var blurFilter = new Laya.BlurFilter();
            blurFilter.strength = value;
            imgNode.filters = [blurFilter];
        }
    };
    //发光滤镜
    /**
     * 图片，颜色"#232628"，范围
     */
    _proto.setImgGlow = function (imgNode, color, value) {
        if (imgNode) {
            value = value || 10;
            color = "#ffff00" || color;
            //创建一个发光滤镜
            var glowFilter = new Laya.GlowFilter(color, value, 0, 0);
            //设置滤镜集合为发光滤镜
            imgNode.filters = [glowFilter];
        }
    };
    //颜色滤镜
    _proto.setImgColor = function (imgNode, Mat) {
        //创建一个颜色滤镜对象
        var Filter = new Laya.ColorFilter(Mat);
        imgNode.filters = [Filter];
    };

    _proto.clearFilters = function (imgNode) {
        imgNode.filters = [];
    };

    /**
     * 通过name搜索child
     * @param parent
     * @param childName
     * @returns {AnimationNode|Node|节点对象}
     */
    _proto.getChildDeep = function (parent, childName) {
        var child = parent.getChildByName(childName);
        if (child)
            return child;
        for (var i = 0; i < parent._childs.length; i++) {
            child = utils.getChildDeep(parent._childs[i], childName);
            if (child)
                return child;
        }
    };

    // 修改list的_$set_selectedIndex方法（selectHandler多了个参数index, cell, list）
    _proto.listSelectEx = function (list) {
        Laya.getset(0, list, 'selectedIndex', function () {
            return this._selectedIndex;
        }, function (value) {
            if (this._selectedIndex != value) {
                this._selectedIndex = value;
                this.changeSelectStatus();
                this.event(/*laya.events.Event.CHANGE*/"change");
                this.selectHandler && this.selectHandler.runWith([value, this.getCell(value), this]);
                this.startIndex = this._startIndex;
            }
        });
    };

    /**
     * 设置HTML LABEL(可变颜色)控件string
     * @param htmlLabel
     * @param str
     * @param isInit
     */
    _proto.setHtmlLabel = function (htmlLabel, str, isInit) {
        if (!isInit) {
            htmlLabel.style.fontSize = 24;
            htmlLabel.style.font = "黑体";
            htmlLabel.style.color = "#ffffff";
            htmlLabel.style.align = "center";
        }
        htmlLabel.innerHTML = utils.getString(str);
    };

    /**
     * 设置使用资源，添加引用计数
     * @param resArray
     */
    _proto.setResUsed = function (resArray) {
        for (var i = 0; i < resArray.length; i++) {
            G.addResCount("img", resArray[i].url);
        }
    };
    /**
     * 设置资源
     * @param resArray
     */
    _proto.setResUnused = function (resArray) {
        for (var i = 0; i < resArray.length; i++) {
            G.delResCount(resArray[i].url);
        }
    };

    /**
     * 从对象池里获取，时间线实例 (一次性调用时才用)
     * @param complete 动画结束时回调， 自动回收到对象池（new Handler(this, this.complete, args)）
     * @returns {*}
     */
    _proto.getTimeLine = function (complete) {
        var self = this;
        var timeLine = this._pool.getItemByClass("TimeLine", Laya.TimeLine);
        timeLine.reset();
        var onComplete = function () {
            self._pool.recover("TimeLine", timeLine);
            if (complete)
                complete.run();
        };
        timeLine.on(Laya.Event.COMPLETE, this, onComplete);
        return timeLine;
    };

    /**
     * UI节点转换到目标节点下的坐标
     * @param node 节点
     * @param targetNode 目标节点
     * @returns {转换后的坐标的点|Point}
     */
    _proto.transPos = function (node, targetNode) {
        var endGlobalPos = new Laya.Point();
        node.localToGlobal(endGlobalPos);
        //图标移动动画
        var endPos = targetNode.globalToLocal(endGlobalPos, true);
        return endPos;
    };

    /** 提示 */
    _proto.prompt = function (message) {
        if (!message)
            return;
        if (!this.m_systemPrompt) {
            this.m_systemPrompt = uiManager.openUI(cc.Prompt);
        }
        this.m_systemPrompt.prompt(message);
    };

    /** 移动提示 */
    _proto.movePrompt = function (msg) {
        if (!this.m_movePrompt) {
            this.m_movePrompt = uiManager.openUI(cc.MovePrompt);
        }
        this.m_movePrompt.addPrompt(msg);
    };

    /**
    * 两点间距离
    */
    _proto.dis = function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    /**
    * 检测两个矩形是否碰撞
    * @return
    */
    _proto.isCollisionWithRect = function (node1, node2) {
        var x1 = node1.x;
        var x2 = node2.x;
        var y1 = node1.y;
        var y2 = node2.y;
        var w1 = node1.width;
        var h1 = node1.height;
        var w2 = node2.width;
        var h2 = node2.height;
        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        } else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        } else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        } else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        return true;
    };

    //像素碰撞 精度：2px （节点需要添加Graphics）
    _proto.pixelsCollison = function (node1, node2) {
        var isHit = false;
        if (this.isCollisionWithRect(node1, node2)) {
            var s1 = node1.width * node1.height;
            var s2 = node2.width * node2.height;
            if (s1 >= s2) {
                var small = node2;
                var big = node1;
            } else {
                var small = node1
                var big = node2;
            }
            var lc = parseInt(small.height / 2);   //高检测次数
            var rc = parseInt(small.width / 2);    //宽检测次数
            var point = new Laya.Point();
            var x = null, y = null, x1 = null, y1 = null;
            for (var i = 0; i < lc; i++) {
                for (var j = 0; j < rc; j++) {
                    x = 2 * j;
                    y = 2 * i;
                    //判断是否是空像素 isPixel = 0为空
                    if (small.hitArea.isHit(x, y)) {
                        x1 = x + small.parent.x - big.parent.x;
                        y1 = y + small.parent.y - big.parent.y;
                        if (big.hitArea.isHit(x1, y1)) {
                            return true
                        }
                    }
                }
            }
        }
        return false;
    };

    //获取图片（X,Y）像素
    _proto.getPixels = function (node, x, y) {
        var Pixels = node.source.getPixels(x, y, 1, 1);
        return Pixels;
    };

    //模糊判定精灵重合
    _proto.isFit = function (node1, node2) {
        if (!node1.anchorX) {
            node1.anchorX = 0;
        }
        if (!node2.anchorX) {
            node2.anchorX = 0;
        }
        if (!node1.anchorY) {
            node1.anchorY = 0;
        }
        if (!node2.anchorY) {
            node2.anchorY = 0;
        }
        var x1 = node1.x - node1.anchorX * node1.width;
        var x2 = node2.x - node2.anchorX * node2.width;
        var y1 = node1.y - node1.anchorY * node1.height;
        var y2 = node2.y - node2.anchorY * node2.height;
        if (Math.abs(x1 - x2) <= 15 && Math.abs(y1 - y2) <= 15) {
            return true;
        }
        return false;
    };

    //是否处于边界
    _proto.isBorder = function (node) {
        if (node.x <= 0 || node.y <= 0 || node.x > Laya.stage.width - node.width || node.y > Laya.stage.height - node.height) {
            return true;
        } else {
            return false;
        }
    };

})();