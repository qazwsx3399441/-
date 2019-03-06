/**
 *Created by LRJ on 2018/5/10.
 *Describe : 微信工具包
 */

(function () {
    cc.wxUtils = function () {
        this.isWX = Laya.Browser.onMiniGame;
        var self = this;
        if (this.isWX) {
            wx.showShareMenu();
            wx.onShow(function () {
                if (wx.getUpdateManager) {
                    if (typeof wx.getUpdateManager === 'function') {
                        var updateManager = new wx.getUpdateManager();

                        updateManager.onCheckForUpdate(function (res) {
                            // 请求完新版本信息的回调
                            // console.log("=======", res);
                        })

                        updateManager.onUpdateReady(function () {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate()
                        })

                        updateManager.onUpdateFailed(function () {
                            // 新的版本下载失败
                        })
                    }
                }

                if (Laya.SoundManager._musicChannel) {
                    Laya.SoundManager._musicChannel.play && Laya.SoundManager._musicChannel.play();
                }

                if (G.isClickShare) {
                    sessionStroage.setItem("hasShare", true);
                    G.ISCLICKSHARE = true;
                }

                var layer = uiManager.getUI(cc.MainGameWin);
                if (layer && layer.isFlowerBoard) {
                    //处理返回时   小花面板残留
                    layer.timeLine_roundOver.pause();
                    layer.mainUI.img_flowerBoard.bottom = -130;
                    if (layer.curRound == 5) {
                        layer.playDuckLeave();
                        layer.isWin = true;
                    } else {
                        layer.nextRound();
                    }
                }
            });
            wx.onAudioInterruptionEnd(function () {
                if (Laya.SoundManager._musicChannel) {
                    Laya.SoundManager._musicChannel.play && Laya.SoundManager._musicChannel.play();
                }
            });
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        fail: function (res) {
                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                                // 处理用户拒绝授权的情况
                            }
                        },
                        success: function (res) {
                            self.userInfo = res.userInfo;
                        }
                    })
                }
            });
            var _id = utils.random(1001,1007);
            var temp = D.round[_id].answer;
            wx.onShareAppMessage(function () {
                return {
                    imageUrl: "share.jpg",
                    title: temp
                }
            });
        }
    };

    Laya.class(cc.wxUtils, "cc.wxUtils");
    var _proto = cc.wxUtils.prototype;

    _proto.stopShow = function () {
        if (this.isWX) {
            if (this.openDataTexture) {
                this.openDataTexture.bitmap.alwaysChange = false;
                this.openDataSprite.visible = false;
            }
        }
    };

    _proto.show = function () {
        if (this.isWX) {
            if (!this.openDataSprite) {
                this.openDataSprite = new Laya.Sprite();
                Laya.stage.addChild(this.openDataSprite);
                this.openDataSprite.zOrder = G.ENUM_UIFORM_ZORDER.WX;
                Laya.timer.once(300, this, function () {
                    this.openDataTexture = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                    this.openDataTexture.bitmap.alwaysChange = true;
                    this.openDataSprite.graphics.drawTexture(this.openDataTexture, 0, 0, Laya.stage.width, Laya.stage.height);
                });
            } else {
                this.openDataTexture.bitmap.alwaysChange = true;
                this.openDataSprite.visible = true;
            }
        }
    };

    //分享
    _proto.share = function (sp, width, height, string) {
        var htmlC = sp.drawToCanvas(width, height, 0, 0);
        var canvas = htmlC.getCanvas();
        canvas.toTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success: function (res) {
                wx.shareAppMessage({
                    imageUrl: res.tempFilePath,
                    title: string
                })
            }
        });
    };

    /**
     * 给开放域发送消息
     * @param data
     */
    _proto.postMsg = function (data) {
        if (this.isWX) {
            wx.postMessage(data);
        }
    };

    /**
     * 显示更多游戏
     */
    _proto.showMoreGame = function () {
        if (this.isWX) {
            if (!!wx.previewImage) {
                wx.previewImage({
                    current: "http://download.coolgame.cc/xiaochengxu/hongbao/xmhb.png",
                    urls: ["http://download.coolgame.cc/xiaochengxu/hongbao/xmhb.png"]
                });
            }

        }
    }

    //创建广告
    _proto.createAD = function () {
        var sysInfo = wx.getSystemInfoSync();
        var width = sysInfo.windowWidth;
        if (this.bannerAd) {
            this.bannerAd.destroy()
        }
        this.bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-c12d28d7310e8efb',
            style: {
                left: 0,
                top: 0,
                width: width
            }
        })
        var top = sysInfo.windowHeight - width / 3.5;
        this.bannerAd.style.top = top;
        this.bannerAd.show();
    };

    //显示广告
    _proto.showAD = function (visible) {
        if (visible) {
            this.createAD();
        } else {
            if (this.bannerAd) {
                this.bannerAd.hide();
            }
        }
    };
})();