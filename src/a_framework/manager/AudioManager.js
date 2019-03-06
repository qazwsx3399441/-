/**
 *Created by LRJ on 2018/5/8.
 *Describe : 音效管理
 */

(function () {
    cc.AudioManager = function () {
        this.soundManager = Laya.SoundManager;
        this.isBGM = sessionStroage.getItem("isBGM") ? sessionStroage.getItem("isBGM") : true;
        this.setBGMVolume(1);
        this.soundManager.setSoundVolume(1);
        // for(var key in D.music){
        //     this.soundManager.setSoundVolume(0.5, D.music[key].path);
        // }
        this.playBGM();
    };

    Laya.class(cc.AudioManager, "cc.AudioManager");
    var _proto = cc.AudioManager.prototype;

    _proto.playBGM = function () {
        this.soundManager.playMusic("music/bgm.mp3", 0);
        this.isPlaying = true;
    };
    _proto.stopBGM = function () {
        this.soundManager.stopMusic();
        this.isPlaying = false;
    };
    _proto.setBGMMuted = function (play) {
        this.soundManager.musicMuted = !play;
        sessionStroage.setItem("isBGM", play);
        this.isBGM = play;
    };
    _proto.setBGMVolume = function (value) {
        this.soundManager.musicVolume = value;
    };

    _proto.playSound = function (id, complete, canRepeat, loop) {
        if(!canRepeat){
            this.stopSound(id); 
        }
        var loop = loop ? 1 : loop;
        if(G.LANGUAGE == 1){
            var temp = D.music[id].path;
        }else if(G.LANGUAGE == 2){
            var temp = D.music[id].path_fujian;
        }else{
            var temp = D.music[id].path;
        }
        this.soundManager.playSound(temp, loop, new Handler(this, function () {
            if (complete) {
                complete();
            }
        }));
    };

    _proto.stopSound = function (id) {
        if(G.LANGUAGE == 1){
            var temp = D.music[id].path;
        }else if(G.LANGUAGE == 2){
            var temp = D.music[id].path_fujian;
        }else{
            var temp = D.music[id].path;
        }
        this.soundManager.stopSound(temp);
    };

    _proto.stopAll = function(){
        this.soundManager.stopAllSound();
    }
})();