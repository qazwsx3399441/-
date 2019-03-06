var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var Ani_bear1UI=(function(_super){
		function Ani_bear1UI(){
			
		    this.ani1=null;

			Ani_bear1UI.__super.call(this);
		}

		CLASS$(Ani_bear1UI,'ui.ani.Ani_bear1UI',_super);
		var __proto__=Ani_bear1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(Ani_bear1UI.uiView);

		}

		Ani_bear1UI.uiView={"type":"View","props":{"width":88,"height":92},"compId":1,"child":[{"type":"Box","props":{"y":54,"x":74,"width":315,"rotation":-15,"height":228,"anchorY":0.5,"anchorX":0.5},"compId":4,"child":[{"type":"Image","props":{"y":-64,"x":10,"skin":"gameComposition/image_Elephant01_04.png","rotation":15},"compId":6},{"type":"Image","props":{"y":137,"x":115,"width":88,"skin":"gameComposition/image_Elephant01_03.png","height":92,"anchorX":1},"compId":2},{"type":"Image","props":{"y":-75,"x":44,"skin":"gameComposition/image_Elephant01_01.png"}},{"type":"Image","props":{"y":21,"x":136,"skin":"gameComposition/image_Elephant01_02.png"}}]}],"animations":[{"nodes":[{"target":4,"keyframes":{"y":[{"value":55,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":-8,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":15},{"value":-8,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":45},{"value":55,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":50}],"x":[{"value":75,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":-163,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":15},{"value":-163,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":45},{"value":75,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":50}]}},{"target":2,"keyframes":{"x":[{"value":115,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":88,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":15}],"skewX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"skewX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"skewX","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"skewX","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"skewX","index":40}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"scaleX","index":30},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"scaleX","index":40}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":15},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":25},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"rotation","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"rotation","index":35},{"value":20,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"rotation","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"label":null,"key":"rotation","index":45},{"value":0,"tweenMethod":"linearNone","tween":true,"target":2,"key":"rotation","index":50}],"anchorX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"anchorX","index":0},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":2,"key":"anchorX","index":15}]}},{"target":6,"keyframes":{"y":[{"value":-41,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":0}],"x":[{"value":114,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":0}],"rotation":[{"value":15,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":15},{"value":15,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":25},{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"key":"rotation","index":30},{"value":15,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"rotation","index":40},{"value":20,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"rotation","index":45}],"anchorX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":6,"key":"anchorX","index":0}]}},{"target":1,"keyframes":{"width":[{"value":88,"tweenMethod":"linearNone","tween":true,"target":1,"key":"width","index":0},{"value":90,"tweenMethod":"linearNone","tween":true,"target":1,"key":"width","index":50}],"height":[{"value":92,"tweenMethod":"linearNone","tween":true,"target":1,"key":"height","index":0},{"value":90,"tweenMethod":"linearNone","tween":true,"target":1,"key":"height","index":50}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return Ani_bear1UI;
	})(View);
var Ani_bear2UI=(function(_super){
		function Ani_bear2UI(){
			
		    this.ani1=null;

			Ani_bear2UI.__super.call(this);
		}

		CLASS$(Ani_bear2UI,'ui.ani.Ani_bear2UI',_super);
		var __proto__=Ani_bear2UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(Ani_bear2UI.uiView);

		}

		Ani_bear2UI.uiView={"type":"View","props":{"width":90,"height":90},"child":[{"type":"Box","props":{"y":35,"x":55,"width":670,"height":230,"anchorY":0.5,"anchorX":0.5},"compId":6,"child":[{"type":"Image","props":{"y":-80,"x":211,"skin":"gameComposition/image_Elephant02_01.png"}},{"type":"Image","props":{"y":-59,"x":408,"skin":"gameComposition/image_Elephant02_04.png","rotation":0},"compId":5},{"type":"Image","props":{"y":29,"x":237,"skin":"gameComposition/image_Elephant02_02.png"}},{"type":"Image","props":{"y":106,"x":317,"skin":"gameComposition/image_Elephant02_03.png"},"compId":4}]}],"animations":[{"nodes":[{"target":6,"keyframes":{"y":[{"value":35,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":0},{"value":-70,"tweenMethod":"linearNone","tween":true,"target":6,"key":"y","index":15},{"value":-70,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"y","index":25},{"value":35,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"y","index":40}],"x":[{"value":55,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":0},{"value":334,"tweenMethod":"linearNone","tween":true,"target":6,"key":"x","index":15},{"value":334,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"x","index":25},{"value":55,"tweenMethod":"linearNone","tween":true,"target":6,"label":null,"key":"x","index":40}]}},{"target":5,"keyframes":{"y":[{"value":-60,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":-70,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":15},{"value":-70,"tweenMethod":"linearNone","tween":true,"target":5,"label":null,"key":"y","index":25}],"x":[{"value":428,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":430,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":15},{"value":430,"tweenMethod":"linearNone","tween":true,"target":5,"label":null,"key":"x","index":25}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":15},{"value":-20,"tweenMethod":"linearNone","tween":true,"target":5,"key":"rotation","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":5,"label":null,"key":"rotation","index":25}],"anchorX":[{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":5,"key":"anchorX","index":0}]}},{"target":4,"keyframes":{"y":[{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":0},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"key":"y","index":15},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":18},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":19},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":20},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":21},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":22},{"value":106,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"y","index":25}],"x":[{"value":430,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":15},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":18},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":19},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":20},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":21},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":22},{"value":412,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"x","index":25}],"skewX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"skewX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"skewX","index":15},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":18},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":19},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":21},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":22},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"skewX","index":25}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"scaleX","index":15},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":16},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":19},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":24},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":25},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":30},{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"scaleX","index":31}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"rotation","index":15},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":16},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":17},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":18},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":19},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":21},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":22},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":23},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":24},{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"label":null,"key":"rotation","index":25}],"anchorX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"anchorX","index":0}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return Ani_bear2UI;
	})(View);
var Ani_bulinbulinUI=(function(_super){
		function Ani_bulinbulinUI(){
			
		    this.Ani_bulinbulin=null;

			Ani_bulinbulinUI.__super.call(this);
		}

		CLASS$(Ani_bulinbulinUI,'ui.ani.Ani_bulinbulinUI',_super);
		var __proto__=Ani_bulinbulinUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(Ani_bulinbulinUI.uiView);

		}

		Ani_bulinbulinUI.uiView={"type":"View","props":{"x":138,"width":1280,"height":720},"child":[{"type":"Animation","props":{"y":236,"x":77,"width":1,"visible":false,"var":"Ani_bulinbulin","source":"bulingbuling/chitao01_01.png,bulingbuling/chitao01_02.png,bulingbuling/chitao01_03.png,bulingbuling/chitao01_04.png,bulingbuling/chitao01_05.png,bulingbuling/chitao01_06.png,bulingbuling/chitao01_07.png,bulingbuling/chitao01_08.png,bulingbuling/chitao01_09.png,bulingbuling/chitao01_10.png,bulingbuling/chitao01_11.png,bulingbuling/chitao01_12.png","pivotY":81,"pivotX":77,"mouseEnabled":false,"height":1}}]};
		return Ani_bulinbulinUI;
	})(View);
var GameView2UI=(function(_super){
		function GameView2UI(){
			
		    this.ani3=null;
		    this.bear2=null;
		    this.bear1=null;
		    this.box_elephant1=null;
		    this.image_5_1=null;
		    this.btn_1_0=null;
		    this.image_5_2=null;
		    this.btn_1_1=null;
		    this.image_5_3=null;
		    this.btn_1_2=null;
		    this.label_score=null;
		    this.btn_back=null;
		    this.btn_2_1=null;
		    this.btn_2_0=null;
		    this.image_2_2=null;
		    this.image_2_3=null;
		    this.image_2_1=null;
		    this.image_2_4=null;
		    this.box_1_1=null;
		    this.image_3_0=null;
		    this.image_3_1=null;
		    this.image_3_2=null;
		    this.image_3_3=null;
		    this.image_3_4=null;
		    this.image_3_5=null;
		    this.image_3_6=null;
		    this.image_3_7=null;
		    this.image_3_8=null;
		    this.image_3_9=null;
		    this.box_1_2=null;
		    this.image_2_5=null;
		    this.image_1_1=null;
		    this.image_1_2=null;
		    this.image_1_3=null;
		    this.image_1_4=null;
		    this.image_1_5=null;

			GameView2UI.__super.call(this);
		}

		CLASS$(GameView2UI,'ui.game.GameView2UI',_super);
		var __proto__=GameView2UI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.ani.Ani_bear2UI",ui.ani.Ani_bear2UI);
			View.regComponent("ui.ani.Ani_bear1UI",ui.ani.Ani_bear1UI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameView2UI.uiView);

		}

		GameView2UI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Ani_bear2","props":{"y":372,"x":543,"var":"bear2","bottom":258,"runtime":"ui.ani.Ani_bear2UI"}},{"type":"Ani_bear1","props":{"y":330,"x":524,"var":"bear1","bottom":298,"runtime":"ui.ani.Ani_bear1UI"}},{"type":"Image","props":{"y":0,"skin":"gameComposition/background.png","centerX":0}},{"type":"Box","props":{"var":"box_elephant1","centerY":180,"centerX":-304}},{"type":"Box","props":{"y":0,"x":0,"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"var":"image_5_1","skin":"gameComposition/btn_number.png","centerY":460,"centerX":-250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":15,"width":90,"var":"btn_1_0","scaleY":1,"scaleX":1,"mouseEnabled":true,"height":90,"centerY":0,"centerX":0,"anchorY":0,"anchorX":0}}]},{"type":"Image","props":{"var":"image_5_2","skin":"gameComposition/btn_number.png","centerY":460,"centerX":0},"child":[{"type":"Image","props":{"x":60,"width":90,"var":"btn_1_1","scaleY":1,"scaleX":1,"mouseEnabled":true,"height":90,"bottom":20,"anchorY":1,"anchorX":0.5}}]},{"type":"Image","props":{"var":"image_5_3","skin":"gameComposition/btn_number.png","centerY":460,"centerX":250},"child":[{"type":"Image","props":{"x":60,"width":90,"var":"btn_1_2","scaleY":1,"scaleX":1,"mouseEnabled":true,"height":90,"bottom":20,"anchorY":1,"anchorX":0.5}}]}]},{"type":"Image","props":{"width":182,"skin":"gameComposition/xiaohua_z_di.png","right":40,"height":71,"centerY":300},"child":[{"type":"Label","props":{"y":20,"x":75,"width":90,"var":"label_score","text":"1000","height":30,"fontSize":30,"color":"#000000","bold":true,"align":"center"}},{"type":"Image","props":{"y":35,"x":35,"width":65,"skin":"gameComposition/win_flowers.png","scaleY":1,"scaleX":1,"rotation":30,"height":70,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":110},{"type":"Image","props":{"y":35,"x":35,"width":65,"skin":"gameComposition/win_flowers.png","scaleY":1,"scaleX":1,"height":70,"anchorY":0.5,"anchorX":0.5,"alpha":0},"compId":11}]},{"type":"Image","props":{"y":40,"var":"btn_back","skin":"gameComposition/button_back.png","left":30}},{"type":"Box","props":{"width":1280,"height":720,"centerX":17,"bottom":35,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":155,"x":330,"skin":"gameComposition/121726371969655096.png"}},{"type":"Image","props":{"y":410,"x":605,"width":82,"var":"btn_2_1","skin":"gameComposition/image_minutehand.png","rotation":-90,"pivotY":20,"pivotX":0,"height":41}},{"type":"Image","props":{"y":410,"x":605,"width":66,"var":"btn_2_0","skin":"gameComposition/image_hourhand.png","rotation":-90,"pivotY":20,"height":41}},{"type":"Image","props":{"y":395,"x":590,"skin":"gameComposition/image_clock02.png"}},{"type":"Image","props":{"y":193,"x":540,"width":42,"var":"image_2_2","skin":"gameComposition/image_question.png","scaleY":0.8,"scaleX":0.8,"height":60,"alpha":1}},{"type":"Image","props":{"y":196,"x":590,"width":21,"skin":"gameComposition/image_colon.png","height":46}},{"type":"Image","props":{"y":193,"x":625,"width":42,"var":"image_2_3","skin":"gameComposition/image_question.png","scaleY":0.8,"scaleX":0.8,"height":60,"alpha":1}},{"type":"FontClip","props":{"y":217,"width":86,"var":"image_2_1","value":"0","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.4,"scaleX":0.4,"pivotY":64,"pivotX":41,"height":132,"centerX":-127,"align":"center"}},{"type":"FontClip","props":{"y":217,"x":694,"width":90,"var":"image_2_4","value":"0","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.4,"scaleX":0.4,"height":128,"anchorY":0.5,"anchorX":0.5}},{"type":"FontClip","props":{"y":427,"x":553,"width":94,"value":"0","sheet":"0123456789","scaleY":0.5,"scaleX":0.5,"height":147,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-345,"x":49,"width":98,"skin":"gameComposition/image_ninegrid_02.png","renderType":"mask","height":132,"anchorY":0.5,"anchorX":0.5,"alpha":1}},{"type":"Box","props":{"y":397,"x":66,"width":122,"var":"box_1_1","height":875,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"FontClip","props":{"y":-240,"x":14,"width":90,"var":"image_3_0","value":"0","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130,"anchorY":0,"anchorX":0,"alpha":1}},{"type":"FontClip","props":{"y":-120,"x":14,"width":90,"var":"image_3_1","value":"1","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":0,"x":14,"var":"image_3_2","value":"2","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":120,"x":14,"var":"image_3_3","value":"3","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":240,"x":14,"var":"image_3_4","value":"4","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":360,"x":14,"var":"image_3_5","value":"5","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":480,"x":14,"var":"image_3_6","value":"6","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":600,"x":14,"var":"image_3_7","value":"7","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":720,"x":14,"var":"image_3_8","value":"8","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":840,"x":14,"width":90,"var":"image_3_9","value":"9","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}}]}]},{"type":"FontClip","props":{"y":427,"x":644,"width":94,"value":"0","sheet":"0123456789","scaleY":0.5,"scaleX":0.5,"height":147,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-345,"x":49,"width":98,"skin":"gameComposition/image_ninegrid_02.png","renderType":"mask","height":132,"anchorY":0.5,"anchorX":0.5,"alpha":1}},{"type":"Box","props":{"y":397,"x":66,"width":122,"var":"box_1_2","height":875,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"FontClip","props":{"y":-240,"x":14,"width":90,"value":"0","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130,"anchorY":0,"anchorX":0,"alpha":1}},{"type":"FontClip","props":{"y":-120,"x":14,"width":90,"value":"1","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":0,"x":14,"value":"2","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":120,"x":14,"value":"3","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":240,"x":14,"value":"4","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":360,"x":14,"value":"5","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":480,"x":14,"value":"6","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":600,"x":14,"value":"7","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":720,"x":14,"value":"8","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}},{"type":"FontClip","props":{"y":840,"x":14,"value":"9","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":130}}]}]},{"type":"FontClip","props":{"y":217,"x":643,"width":90,"var":"image_2_5","skin":"gameComposition/number03.png","sheet":"0123456789","scaleY":0.4,"scaleX":0.4,"height":128,"anchorY":0.5,"anchorX":0.5,"alpha":0}}]},{"type":"Box","props":{"width":774,"height":72,"centerY":-360,"centerX":-230},"child":[{"type":"Image","props":{"top":39,"skin":"gameComposition/image_score.png","centerX":217}},{"type":"Image","props":{"y":69,"x":441,"var":"image_1_1","skin":"gameComposition/image_star.png","disabled":true,"alpha":1}},{"type":"Image","props":{"y":69,"x":514,"var":"image_1_2","skin":"gameComposition/image_star.png","disabled":true}},{"type":"Image","props":{"y":67,"x":588,"var":"image_1_3","skin":"gameComposition/image_star.png","disabled":true}},{"type":"Image","props":{"y":67,"x":661,"var":"image_1_4","skin":"gameComposition/image_star.png","disabled":true}},{"type":"Image","props":{"y":66,"x":733,"var":"image_1_5","skin":"gameComposition/image_star.png","disabled":true}}]}],"animations":[{"nodes":[],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[],"name":"ani2","id":2,"frameRate":24,"action":0},{"nodes":[{"target":110,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleY","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleY","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleX","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleX","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":110,"key":"scaleX","index":10}],"rotation":[{"value":30,"tweenMethod":"linearNone","tween":true,"target":110,"key":"rotation","index":0},{"value":390,"tweenMethod":"linearNone","tween":true,"target":110,"key":"rotation","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":110,"key":"alpha","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":110,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":110,"key":"alpha","index":10}]}},{"target":11,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":8}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":0},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":8}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":11,"key":"rotation","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":10}]}}],"name":"ani3","id":3,"frameRate":24,"action":0}]};
		return GameView2UI;
	})(View);
var LoadingViewUI=(function(_super){
		function LoadingViewUI(){
			
		    this.img_bg=null;
		    this.img_logo=null;

			LoadingViewUI.__super.call(this);
		}

		CLASS$(LoadingViewUI,'ui.game.LoadingViewUI',_super);
		var __proto__=LoadingViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoadingViewUI.uiView);

		}

		LoadingViewUI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"x":1280,"var":"img_bg","top":0,"skin":"ui/welcome/loadingBG.png","sizeGrid":"0,40,0,38","bottom":0}},{"type":"Image","props":{"x":1280,"var":"img_logo","skin":"welcome1/welcomeComposition/image_logo.png","centerY":0}}]};
		return LoadingViewUI;
	})(View);
var RankViewUI=(function(_super){
		function RankViewUI(){
			
		    this.btn_close=null;

			RankViewUI.__super.call(this);
		}

		CLASS$(RankViewUI,'ui.game.RankViewUI',_super);
		var __proto__=RankViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(RankViewUI.uiView);

		}

		RankViewUI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"skin":"ui/rank/baobeipaihang.png","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":44,"x":638,"var":"btn_close","skin":"ui/rank/no.png"}}]}]};
		return RankViewUI;
	})(View);
var SelectRound1UI=(function(_super){
		function SelectRound1UI(){
			
		    this.btn_2_5=null;
		    this.image_5_bg=null;
		    this.image_5_blue=null;
		    this.image_5_lock=null;
		    this.image_5_star=null;
		    this.image_5_number=null;
		    this.btn_2_4=null;
		    this.image_4_bg=null;
		    this.image_4_blue=null;
		    this.image_4_lock=null;
		    this.image_4_star=null;
		    this.image_4_number=null;
		    this.btn_2_3=null;
		    this.image_3_bg=null;
		    this.image_3_blue=null;
		    this.image_3_lock=null;
		    this.image_3_star=null;
		    this.image_3_number=null;
		    this.btn_2_2=null;
		    this.image_2_bg=null;
		    this.image_2_blue=null;
		    this.image_2_lock=null;
		    this.image_2_star=null;
		    this.image_2_number=null;
		    this.btn_2_1=null;
		    this.image_1_bg=null;
		    this.image_1_blue=null;
		    this.image_1_star=null;
		    this.image_1_number=null;
		    this.image_1_lock=null;
		    this.btn_back=null;

			SelectRound1UI.__super.call(this);
		}

		CLASS$(SelectRound1UI,'ui.game.SelectRound1UI',_super);
		var __proto__=SelectRound1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(SelectRound1UI.uiView);

		}

		SelectRound1UI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"welcome1/welcomeComposition/image_wall.png","right":0,"left":0,"bottom":0,"sizeGrid":"1,1,1,1"}},{"type":"Image","props":{"skin":"SelectRound/image_guanqiaBG02.png","sizeGrid":"3,3,3,3","right":0,"left":0,"height":250,"bottom":140},"child":[{"type":"Box","props":{"width":1280,"height":78,"centerY":30,"centerX":-60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Box","props":{"width":131,"var":"btn_2_5","left":950,"height":101,"disabled":false,"bottom":0},"child":[{"type":"Image","props":{"visible":false,"var":"image_5_bg","skin":"SelectRound/image_selectflower.png","left":0,"bottom":0,"alpha":1}},{"type":"Image","props":{"var":"image_5_blue","skin":"SelectRound/image_gamelevelsBG.png","mouseEnabled":false,"left":24,"bottom":30,"alpha":1}},{"type":"Image","props":{"var":"image_5_lock","skin":"SelectRound/image_selectlock.png","left":30,"bottom":34,"alpha":1}},{"type":"Image","props":{"visible":false,"var":"image_5_star","skin":"SelectRound/image_selectstar.png","left":11,"bottom":82,"alpha":1}},{"type":"FontClip","props":{"x":44,"width":44,"var":"image_5_number","value":"5","skin":"gameComposition/image_number02.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":70,"bottom":40,"alpha":0}}]},{"type":"Box","props":{"y":189,"width":131,"var":"btn_2_4","left":800,"height":101,"bottom":0},"child":[{"type":"Image","props":{"visible":false,"var":"image_4_bg","skin":"SelectRound/image_selectflower.png","left":0,"bottom":0,"alpha":1}},{"type":"Image","props":{"var":"image_4_blue","skin":"SelectRound/image_gamelevelsBG.png","mouseEnabled":false,"left":24,"bottom":30}},{"type":"Image","props":{"var":"image_4_lock","skin":"SelectRound/image_selectlock.png","left":30,"bottom":34,"alpha":1}},{"type":"Image","props":{"visible":false,"var":"image_4_star","skin":"SelectRound/image_selectstar.png","left":11,"bottom":82,"alpha":1}},{"type":"FontClip","props":{"x":41,"var":"image_4_number","value":"4","skin":"gameComposition/image_number02.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"bottom":45,"alpha":0}}]},{"type":"Box","props":{"y":189,"width":131,"var":"btn_2_3","left":650,"height":101,"bottom":0},"child":[{"type":"Image","props":{"visible":false,"var":"image_3_bg","skin":"SelectRound/image_selectflower.png","left":0,"bottom":0,"alpha":1}},{"type":"Image","props":{"var":"image_3_blue","skin":"SelectRound/image_gamelevelsBG.png","mouseEnabled":false,"left":24,"bottom":30}},{"type":"Image","props":{"var":"image_3_lock","skin":"SelectRound/image_selectlock.png","left":30,"bottom":34,"alpha":1}},{"type":"Image","props":{"visible":false,"var":"image_3_star","skin":"SelectRound/image_selectstar.png","left":11,"bottom":82,"alpha":1}},{"type":"FontClip","props":{"x":46,"var":"image_3_number","value":"3","skin":"gameComposition/image_number02.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"bottom":45,"alpha":0}}]},{"type":"Box","props":{"y":189,"width":131,"var":"btn_2_2","left":500,"height":101,"bottom":0},"child":[{"type":"Image","props":{"visible":false,"var":"image_2_bg","skin":"SelectRound/image_selectflower.png","left":0,"bottom":0,"alpha":1}},{"type":"Image","props":{"var":"image_2_blue","skin":"SelectRound/image_gamelevelsBG.png","mouseEnabled":false,"left":24,"bottom":30}},{"type":"Image","props":{"var":"image_2_lock","skin":"SelectRound/image_selectlock.png","left":30,"bottom":34,"alpha":1}},{"type":"Image","props":{"visible":false,"var":"image_2_star","skin":"SelectRound/image_selectstar.png","left":11,"bottom":82,"alpha":1}},{"type":"FontClip","props":{"x":44,"var":"image_2_number","value":"2","skin":"gameComposition/image_number02.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"bottom":45,"alpha":0}}]},{"type":"Box","props":{"y":189,"width":131,"var":"btn_2_1","left":350,"height":101,"bottom":0},"child":[{"type":"Image","props":{"visible":false,"var":"image_1_bg","skin":"SelectRound/image_selectflower.png","left":0,"bottom":0,"alpha":1}},{"type":"Image","props":{"var":"image_1_blue","skin":"SelectRound/image_gamelevelsBG.png","left":24,"bottom":30}},{"type":"Image","props":{"visible":false,"var":"image_1_star","skin":"SelectRound/image_selectstar.png","left":11,"bottom":82,"alpha":1}},{"type":"FontClip","props":{"x":45,"width":47,"var":"image_1_number","value":"1","skin":"gameComposition/image_number02.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"height":68,"bottom":40,"alpha":1}},{"type":"Image","props":{"y":-9,"x":-320,"var":"image_1_lock","skin":"SelectRound/image_selectlock.png","left":30,"bottom":34,"alpha":0}}]}]}]},{"type":"Image","props":{"width":469,"skin":"SelectRound/image_guanqiatupian.png","height":218,"centerY":-205,"centerX":-120},"child":[{"type":"Image","props":{"top":165,"skin":"SelectRound/word_renshizhong.png","right":35,"left":275,"bottom":10,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":39,"x":49,"var":"btn_back","skin":"gameComposition/button_back.png"}}]};
		return SelectRound1UI;
	})(View);
var ShareViewUI=(function(_super){
		function ShareViewUI(){
			
		    this.img_bg=null;
		    this.label_checkAll=null;
		    this.btn_share=null;
		    this.btn_again=null;
		    this.chengjiu=null;
		    this.img_chengjiudi=null;
		    this.img_booldBg=null;
		    this.img_boold=null;
		    this.label_score=null;

			ShareViewUI.__super.call(this);
		}

		CLASS$(ShareViewUI,'ui.game.ShareViewUI',_super);
		var __proto__=ShareViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ShareViewUI.uiView);

		}

		ShareViewUI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Image","props":{"width":750,"var":"img_bg","skin":"ui/rank/end_bg_01.png","sizeGrid":"100,0,100,0","height":670,"centerY":720,"centerX":0},"child":[{"type":"Label","props":{"var":"label_checkAll","underlineColor":"#ffffff","underline":true,"text":"查看完整排行》","fontSize":28,"color":"#fdfdfd","centerX":0,"bottom":10,"bold":true}},{"type":"Image","props":{"width":193,"var":"btn_share","skin":"ui/rank/button_share.png","height":111,"centerX":502,"bottom":0}},{"type":"Image","props":{"width":193,"var":"btn_again","skin":"ui/rank/button_next01.png","height":79,"centerY":165,"centerX":502}},{"type":"Box","props":{"width":714,"var":"chengjiu","top":92,"left":18,"height":234},"child":[{"type":"Image","props":{"top":0,"skin":"ui/rank/block_white.png","right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"var":"img_chengjiudi","top":3,"skin":"ui/rank/bg.png","right":3,"left":3,"bottom":3}}]}]},{"type":"Image","props":{"y":30,"width":366,"var":"img_booldBg","skin":"ui/rank/jidutiao_bg.PNG","height":45,"centerX":0},"child":[{"type":"Image","props":{"top":5,"right":5,"left":5,"bottom":5},"child":[{"type":"Image","props":{"x":0,"width":0,"var":"img_boold","top":0,"skin":"ui/rank/jidutiao_xue.png","bottom":0}}]},{"type":"Label","props":{"width":182,"var":"label_score","text":"总数：1000","height":33,"fontSize":30,"color":"#ffffff","centerY":0,"centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"width":50.6,"skin":"ui/rank/win_flowers.png","left":-10,"height":53.9,"centerY":0}}]}]}]};
		return ShareViewUI;
	})(View);
var StartView1UI=(function(_super){
		function StartView1UI(){
			
		    this.btn_music=null;
		    this.btn_share=null;
		    this.btn_rank=null;
		    this.btn_start=null;
		    this.box_elephant=null;

			StartView1UI.__super.call(this);
		}

		CLASS$(StartView1UI,'ui.game.StartView1UI',_super);
		var __proto__=StartView1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(StartView1UI.uiView);

		}

		StartView1UI.uiView={"type":"View","props":{"width":1280,"top":0,"right":0,"left":0,"height":720,"bottom":0},"child":[{"type":"Box","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"welcome1/welcomeComposition/background.png","right":0,"left":0,"bottom":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"var":"btn_music","top":50,"skin":"ui/welcome/button_shengyin.png","left":65}},{"type":"Image","props":{"skin":"welcome1/welcomeComposition/logo_elephant2.png","centerY":-200,"centerX":30}},{"type":"Image","props":{"var":"btn_share","skin":"welcome1/welcomeComposition/image_things_09.png","centerY":260,"centerX":430}},{"type":"Image","props":{"var":"btn_rank","skin":"welcome1/welcomeComposition/image_things_11.png","centerY":260,"centerX":550}},{"type":"Image","props":{"var":"btn_start","skin":"welcome1/welcomeComposition/image_things_12.png","centerY":260,"centerX":0}},{"type":"Box","props":{"var":"box_elephant","centerY":175,"centerX":-50}}]}]};
		return StartView1UI;
	})(View);