<?
$title = "サンプルその2";
$styles[] = '/css/action';
$scripts[] = '/js/action';
?>

<div id="ALroom">

<div id="ALhelp">
	<img alt="ヘルプ" src="/image/help.png" id="ALhelpToggle">
</div>
<div id="addBox" style="background-color:#0000ff;width:16px;height:16px;"></div>

</div>

<script type="text/javascript"><!--
window.onload = function(){
	AL.set();
	
	AL.def.type = "block";
	AL.def.isPushable = false;
	AL.def.elem.className = "ALblock";
	new AL.item({
		type : "elevator",
		content : "◇",
		x : AL.ini.window.width - 120,
		y : AL.ini.window.height - 50,
		width : 100,
		height : 20,
		baseSpeed : {y : 5},
		max : {y : AL.ini.window.height - 50},
		min : {y : 50},
		elem : {
			style : {
				backgroundColor : "#ff0000"
			}
		}
	});
	new AL.item({content:"&lt;&lt;&lt;引力編&lt;&lt;&lt;",x:150,y:50,width:AL.ini.window.width-300,height:25,scroll:{top:-10}});
	new AL.item({content:"&gt;&gt;&gt;",x:0,y:200,width:AL.ini.window.width-250,height:25,scroll:{top:10}});
	new AL.item({content:"&lt;&lt;&lt;",x:100,y:350,width:AL.ini.window.width-250,height:25,scroll:{top:-10}});
	
	AL.def.width = 32;
	AL.def.height = 43;
	AL.def.img.stop = "/image/door.gif";
	AL.def.isBlockable = [];
	AL.def.elem.className = "ALitem";
	new AL.item({y:7,x:363,href:"/garbage/gravity",linkDetail:"引力は素晴らしい。"});
	
	AL.def.isPushable = true;
	AL.def.width = 32;
	AL.def.height = 32;
	AL.def.img.stop = null;
	AL.def.isBlockable = ["top","right","bottom","left"];
	new AL.item({
		type : "control",
		x : AL.ini.window.width - 300,
		y : 0,
		width : 16,
		height : 16,
		baseSpeed : {
			x : 1,
			jy : 40,
			gy : 3,
			rx : 1/2,
			ry : 1/2
		},
		elem : {
			style : {
				backgroundColor : "#ff0000"
			}
		}
	});
	
	AL.start();
	
	document.getElementById("addBox").onmousedown = function(){
		new AL.item({
			type : "rand",
			baseSpeed : {x : 5},
			x : AL.ini.window.width - 300,
			y : 0,
			width : 16,
			height : 16,
			baseSpeed : {
				x : 5,
				jy : 30,
				gy : 3,
				rx : 1/2,
				ry : 1/2
			},
			elem : {
				style : {
					backgroundColor : "#0000ff"
				}
			}
		});
	};
};
--></script>
