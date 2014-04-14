<?
$title = "サンプルその2";
$styles[] = '/css/action';
$scripts[] = '/js/action';
?>

<style type="text/css"><!-- 
#ALroom div.ALblock{
	border : 0px;
	background : transparent;
}
 --></style>

<div id="ALroom">

<div id="ALhelp">
	<img alt="ヘルプ" src="/image/help.png" id="ALhelpToggle">
</div>
<img src="/image/masao/kame/left.gif" id="addKame">
<img src="/image/masao/mariri/stop.gif" id="addMariri">
<img src="/image/masao/hino/left.gif" id="addHino">
<img src="/image/masao/poppi/left.gif" id="addPoppi">
<img src="/image/masao/left.gif" id="SpeedChange">

</div>

<script type="text/javascript"><!--
$(window).load(function(){
	document.getElementById("SpeedChange").onmousedown = function(){
		if(AL.ini.timerSpeed == 10){
			AL.ini.timerSpeed = 50;
			this.src = "/image/masao/left.gif";
		}else{
			AL.ini.timerSpeed = 10;
			this.src = "/image/masao/left2.gif";
		}
		AL.restart();
	};
	
	AL.set();
	
	AL.ini.window.bounce = {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0
	};
	
	AL.def.type = "block";
	AL.def.height = 32;
	AL.def.width = 32;
	AL.def.isPushable = false;
	AL.def.bounce = {
		top : 0,
		left : 0,
		bottom : 0,
		right : 0
	};
	
	for(i=0;i<10;i++){
		new AL.item({y:350,x:100+i*32,img:{stop:"/image/masao/item/block"+(i+1)+".gif"}});
	}
	new AL.item({y:200,x:300,width:64*5,isBlockable:["top","right","left"],elem:{style:{background:"url('/image/masao/item/cloud.gif')"}}});
	new AL.item({y:AL.ini.window.height-32,x:50,bounce:{top:1.5},img:{stop:"/image/masao/item/bound.gif"}});
	new AL.item({type:"elevator",img:{stop:"/image/masao/item/elevator.gif"},x:650,y:300,width:80,height:16,baseSpeed:{y:5},max:{y:400},min:{y:50}});
	
	AL.def.type = "rand";
	AL.def.bounce = {
		top : 1,
		left : 0,
		bottom : 0,
		right : 0
	};
	AL.def.isPushable = true;
	AL.def.baseSpeed = {
		gy : 3,
		rx : 1/2,
		ry : 1/2
	};
	
	new AL.item({
		type : "control",
		baseSpeed : {
			x : 1,
			jy : 40
		},
		bounce : {
			top : 0
		},
		img : {
			stop : "/image/masao/stop.gif",
			left : "/image/masao/left.gif",
			left2 : "/image/masao/left2.gif",
			right : "/image/masao/right.gif",
			right2 : "/image/masao/right2.gif",
			uright : "/image/masao/uright.gif",
			uleft : "/image/masao/uleft.gif",
			dright : "/image/masao/dright.gif",
			dleft : "/image/masao/dleft.gif",
			bright : "/image/masao/bright.gif",
			bleft : "/image/masao/bleft.gif"
		}
	});
	
	AL.start();
	
	document.getElementById("addKame").onmousedown = function(){
		new AL.item({
			baseSpeed : {
				x : 5,
				y : 0
			},
			img : {
				stop : "/image/masao/kame/left.gif",
				left : "/image/masao/kame/left.gif",
				left2 : "/image/masao/kame/left2.gif",
				right : "/image/masao/kame/right.gif",
				right2 : "/image/masao/kame/right2.gif",
				tleft : "/image/masao/kame/tleft.gif",
				tright : "/image/masao/kame/tright.gif"
			},
			isTreadable : true
		});
	};
	document.getElementById("addMariri").onmousedown = function(){
		new AL.item({
			baseSpeed : {
				x : 5,
				jy : 30
			},
			jumpRate : 5,
			img : {
				stop : "/image/masao/mariri/stop.gif",
				jleft : "/image/masao/mariri/jleft.gif",
				jright : "/image/masao/mariri/jright.gif",
				dleft : "/image/masao/mariri/dleft.gif",
				dright : "/image/masao/mariri/dright.gif",
				tleft : "/image/masao/mariri/tleft.gif",
				tright : "/image/masao/mariri/tright.gif"
			},
			isTreadable : true
		});
	};
	document.getElementById("addHino").onmousedown = function(){
		new AL.item({
			bounce : {
				top : 0
			},
			baseSpeed : {
				x : 5,
				y : 0
			},
			img : {
				stop : "/image/masao/hino/left.gif",
				left : "/image/masao/hino/left.gif",
				left2 : "/image/masao/hino/left2.gif",
				right : "/image/masao/hino/right.gif",
				right2 : "/image/masao/hino/right2.gif"
			}
		});
	};
	document.getElementById("addPoppi").onmousedown = function(){
		new AL.item({
			baseSpeed : {
				x : 5,
				y : 0,
				gy : 0
			},
			img : {
				stop : "/image/masao/poppi/left.gif",
				left : "/image/masao/poppi/left.gif",
				left2 : "/image/masao/poppi/left2.gif",
				right : "/image/masao/poppi/right.gif",
				right2 : "/image/masao/poppi/right2.gif",
				tleft : "/image/masao/poppi/tleft.gif",
				tright : "/image/masao/poppi/tright.gif"
			},
			isTreadable : true
		});
	};
});
--></script>

<br>

<div id="explain">

<h2>ブロック</h2>

<h3>デフォルト値</h3><br>
<textarea cols="100" rows="10">
AL.def.type = "block";
AL.def.height = 32;
AL.def.width = 32;
AL.def.bounce = {
  top : 0,
  left : 0,
  bottom : 0,
  right : 0
};
AL.def.isPushable = false;
</textarea><br>
<br>
<h3>十種類のブロック</h3><br>
<textarea cols="100" rows="10">
for(i=0;i&lt;10;i++){
  new AL.item({
    y : 350,
    x : 100+i*32,
    img : {
      stop : "/image/masao/item/block" + (i+1) + ".gif"
    }
  });
}
</textarea><br>
<br>
<h3>雲</h3><br>
<textarea cols="100" rows="10">
//雲を三つつなげるのではなく、何もないブロックの背景に雲を当てはめている
new AL.item({
  y : 200,
  x : 300,
  width : 64*5,
  elem : {
    style : {
      background : "url('/image/masao/item/cloud.gif')"
    }
  }
  isBlockable:["top","right","left"]
});
</textarea><br>
<br>
<h3>バネ</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  y : AL.ini.window.height-32,
  x : 50,
  bounce : {
    top : 1.5
  },
  img : {
    stop : "/image/masao/item/bound.gif"
  }
});
</textarea><br>
<br>
<h3>エレベータ</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  type : "elevator",
  x : 650,
  y : 300,
  width : 80,
  height : 16,
  baseSpeed : {
    y : 5
  },
  max : {
    y : 400
  },
  min : {
    y : 50
  },
  img : {
    stop : "/image/masao/item/elevator.gif"
  }
});
</textarea><br>
<br>

<h2>キャラ</h2>

<h3>デフォルト値</h3><br>
<textarea cols="100" rows="10">
AL.def.type = "rand";
AL.def.height = 32;
AL.def.width = 32;
AL.def.bounce = {
  top : 1,
  left : 0,
  bottom : 0,
  right : 0
};
AL.def.baseSpeed = {
  gy : 3,
  rx : 1/2,
  ry : 1/2
};
AL.def.isPushable = true;
AL.def.isTreadable = true;
</textarea><br>
<br>
<h3>正男</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  type : "control",
  baseSpeed : {
    x : 1,
    jy : 40
  },
  bounce : {
    top : 0
  },
  img : {
    stop : "/image/masao/stop.gif",
    left : "/image/masao/left.gif",
    left2 : "/image/masao/left2.gif",
    right : "/image/masao/right.gif",
    right2 : "/image/masao/right2.gif",
    uright : "/image/masao/uright.gif",
    uleft : "/image/masao/uleft.gif",
    dright : "/image/masao/dright.gif",
    dleft : "/image/masao/dleft.gif",
    bright : "/image/masao/bright.gif",
    bleft : "/image/masao/bleft.gif"
  },
  isTreadable : true
});
</textarea><br>
<br>
<h3>亀</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  baseSpeed : {
    x : 5,
    y : 0
  },
  img : {
    stop : "/image/masao/kame/left.gif",
    left : "/image/masao/kame/left.gif",
    left2 : "/image/masao/kame/left2.gif",
    right : "/image/masao/kame/right.gif",
    right2 : "/image/masao/kame/right2.gif",
    tleft : "/image/masao/kame/tleft.gif",
    tright : "/image/masao/kame/tright.gif"
  }
});
</textarea><br>
<br>
<h3>マリリ</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  baseSpeed : {
    x : 5,
    jy : 30
  },
  jumpRate : 5,
  img : {
    stop : "/image/masao/mariri/stop.gif",
    jleft : "/image/masao/mariri/jleft.gif",
    jright : "/image/masao/mariri/jright.gif",
    dleft : "/image/masao/mariri/dleft.gif",
    dright : "/image/masao/mariri/dright.gif",
    tleft : "/image/masao/mariri/tleft.gif",
    tright : "/image/masao/mariri/tright.gif"
  }
});
</textarea><br>
<br>
<h3>ヒノララシ</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  bounce : {
    top : 0
  },
  baseSpeed : {
    x : 5,
    y : 0
  },
  img : {
    stop : "/image/masao/hino/left.gif",
    left : "/image/masao/hino/left.gif",
    left2 : "/image/masao/hino/left2.gif",
    right : "/image/masao/hino/right.gif",
    right2 : "/image/masao/hino/right2.gif"
  }
});
</textarea><br>
<br>
<h3>ポッピー</h3><br>
<textarea cols="100" rows="10">
new AL.item({
  baseSpeed : {
    x : 5,
    y : 0,
    gy : 0
  },
  img : {
    stop : "/image/masao/poppi/left.gif",
    left : "/image/masao/poppi/left.gif",
    left2 : "/image/masao/poppi/left2.gif",
    right : "/image/masao/poppi/right.gif",
    right2 : "/image/masao/poppi/right2.gif",
    tleft : "/image/masao/poppi/tleft.gif",
    tright : "/image/masao/poppi/tright.gif"
  }
});
</textarea><br>
<br>

<h2>イベント</h2>

<h3>高速正男にする</h3><br>
<textarea cols="100" rows="10">
AL.ini.timerSpeed = AL.ini.timerSpeed == 10 ? 50 : 10;
AL.restart();
</textarea>

</div>