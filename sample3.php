<?
$styles[] = '/css/action';
$scripts[] = '/js/action';
?>

<div id="ALroom">

<div id="ALhelp">
	<img alt="ヘルプ" src="/image/help.png" id="ALhelpToggle">
</div>
<span id="addHima" class="ALitem">暇</span><span style="font-size:16px;">（※注：クリックで暇を潰せます。）</span>

</div>

<script type="text/javascript"><!--
window.onload = function(){
	AL.set();
	
	AL.def.type = "block";
	AL.def.isPushable = false;
	AL.def.elem.className = "ALblock";
	new AL.item({y:350,x:100,height:50,width:100,content:"寿司ゲー"});
	new AL.item({y:200,x:350,height:50,width:150,content:"玉遊び"});
	
	AL.def.width = 32;
	AL.def.height = 43;
	AL.def.img.stop = "/image/door.gif";
	AL.def.isBlockable = [];
	AL.def.elem.className = "ALitem";
	new AL.item({y:307,x:137,href:"/garbage/sushi",linkDetail:"寿司食べたい？"});
	new AL.item({y:157,x:410,href:"/garbage/gravity",linkDetail:"四角でも玉"});
	
	AL.def.img.stop = false;
	AL.def.width = 32;
	AL.def.height = 32;
	AL.def.isBlockable = ["top","right","bottom","left"];
	AL.def.isPushable = true;
	new AL.item({
		type : "control",
		baseSpeed : {
			x : 1,
			jy : 40,
			gy : 3,
			rx : 1/2,
			ry : 1/2
		},
		content : "俺"
	});
	
	AL.start();
	
	document.getElementById("addHima").onmousedown = function(){
		new AL.item({
			type : "rand",
			baseSpeed : {
				x : 5,
				jy : 30,
				gy : 3,
				rx : 1/2,
				ry : 1/2
			},
			content : "暇",
			isDeletable : true
		});
	};
	
};
--></script>
