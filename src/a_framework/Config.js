/**
 *Created by LRJ on 2018/3/2.
 *Describe : 配置文件
 */
G.VERSION = "v 1.0.0";    //版本号

G.DEBUG = false;    //是否在测试

G.printClick = false;   //是否打印点击的控件

//通用资源
G.COMMONRES = [
    { url: "res/atlas/comp.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/bulingbuling.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/ui/rank.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/ui/welcome.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/gameComposition.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/welcome1/welcomeComposition.json", type: Laya.Loader.ATLAS },
    { url: "res/atlas/SelectRound.json", type: Laya.Loader.ATLAS }
];

//设置调试模式
G.setDebugMode = function () {
    G.printClick = true;
    G.DEBUG = true;
    Laya.Stat.show(0, 0);
};