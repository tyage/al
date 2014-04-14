<?
$styles[] = '/css/action';
$scripts[] = '/js/action';
?>

<div id="ALroom" style="border-left:0px;border-right:0px;border-bottom:solid 10px #cc6600">

<div id="ALhelp">
	<img alt="ヘルプ" src="/image/help.png" id="ALhelpToggle">
</div>
<img src="/image/sushi/ebi.gif" id="addSushi">

</div>

<style type="text/css"><!--
#rooms{
	border-width: 3px 0px 10px 0px;
	border-bottom : solid 10px #CC6600;
}
 --></style>

<script type="text/javascript"><!--
window.onload = function(){
	AL.ini.window.scroll.bottom = 5;
	AL.ini.window.loop.x = true;
	
	AL.set();
	
	AL.def.type = "block";
	AL.def.isPushable = false;
	AL.def.elem.className = "ALblock";
	new AL.item({y:350,x:100,width:100,height:50,content:"SUSHI取り"});
	
	AL.def.width = 32;
	AL.def.height = 43;
	AL.def.img.stop = "/image/door.gif";
	AL.def.isBlockable = [];
	AL.def.elem.className = "ALitem";
	new AL.item({y:307,x:137,href:"/garbage/sushi.php",linkDetail:"寿司キャッチャー"});
	
	AL.def.width = 32;
	AL.def.height = 32;
	AL.def.isBlockable = ["top","right","bottom","left"];
	AL.def.baseSpeed = {
		gy : 3,
		rx : 1/2,
		ry : 1/2
	}
	AL.def.isPushable = true;
	new AL.item({
		type : "control",
		baseSpeed : {
			x : 1,
			jy : 40
		},
		img : {
			stop : "/image/sushi/maguro.gif"
		}
	});
	
	for(var i=Math.floor(Math.random()*5)+5;i>0;i--){
	  	new AL.item({
	  		type : "block",
			y : AL.ini.window.height - 32,
			img : {
				stop : "/image/sushi/dish.gif"
			}
		});
	}
	new AL.item({
		type : "block",
		y : AL.ini.window.height - 32,
		img : {
			stop : "/image/sushi/shokunin.gif"
		}
	});
	
	AL.start();
	
	document.getElementById("addSushi").onmousedown = function(){
		new AL.item({
			type : "rand",
			baseSpeed : {
				x : 5,
				jy : 30
			},
			img : {
				stop : "/image/sushi/ebi.gif"
			}
		});
	};
	
};
--></script>
