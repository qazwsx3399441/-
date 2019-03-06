/**
 *Created by LRJ on 2018/2/28.
 *Describe : 主要管理主城和战斗场景的切换
 */

(function (_super) {
    cc.SceneManager = function () {

    };

    Laya.class(cc.SceneManager, "cc.SceneManager", _super);
    var _proto = cc.SceneManager.prototype;

    _proto.changScene = function(showType){
        var mainCity = uiManager.getUIByType("UI");
        var fight = uiManager.getUIByType("GAME");
        if(showType == "UI"){
            mainCity.visible = true;
            fight.visible = false;
        }else if(showType == "FIGHT"){
            mainCity.visible = false;
            fight.visible = true;
        }
    }
})();