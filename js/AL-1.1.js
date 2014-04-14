/*
 * AL JavaScript Library v1.1
 * http://tyage.sakura.ne.jp/lib/js/AL/
 *
 * Copyright (c) 2009 チャゲ
 */
 AL = function(){

var 
charas = [],
blocks = [],
links = [],
key = {
	up : false,
	down : false,
	left : false,
	right : false,
	space : false
},
ini = {
	timer : 50,
	keyno : {
		37 : "left",
		38 : "up",
		39 : "right",
		40 : "down",
		32 : "space"
	},
	window : {
		width : 750,
		height : 500,
		bound : {
			top : 0.5,
			right : 0.5,
			bottom : 0.5,
			left : 0.5
		}
	},
	scroll : {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0
	},
	loop : {
		x : false,
		y : false
	}
},
def = {
	chara : {
		x : "rand",
		y : "rand",
		width : 32,
		height : 32,
		jumpRate : 20,
		limit : -1,
		baseSpeed : {
			x : 1,
			y : 30,
			gx : 0,
			gy : 2,
			rx : 1/2,
			ry : 1/2
		},
		bound : {
			top : 1/2,
			right : 1/2,
			bottom : 1/2,
			left : 1/2
		},
		isBlockable : ["top","right","bottom","left"],
		isMovable : true
	},
	link : {
		x : "rand",
		y : "rand",
		isBlockable : ["top","right","bottom","left"]
	},
	block : {
		type : "block",
		x : "rand",
		y : "rand",
		bound : {
			top : 1/2,
			right : 1/2,
			bottom : 1/2,
			left : 1/2
		},
		isBlockable : ["top","right","bottom","left"]
	}
},
elems = {
	room : null,
	blocks : null,
	links : null,
	charas : null,
	help : null
};

var chara = function(config){
	this.no = charas.length;
	this.x = this.y = this.width = this.height = this.link = this.jumpRate = this.limit = this.string = null;
	this.isMovable = this.isDeleted = this.isControlable = this.isTreadable = this.isDeletable = false;
	this.baseSpeed = {x:0,y:0,gx:0,gy:0,rx:0,ry:0};
	this.maxSpeed = {x:0,y:0};
	this.speed = {x:0,y:0};
	this.bound = {top:0,right:0,bottom:0,left:0};
	this.img = {now:null,stop:null,up:null,right:null,right2:null,down:null,left:null,left2:null,uleft:null,uright:null,dleft:null,dright:null,bleft:null,bright:null,tleft:null,tright:null};
	this.isBlocked = {
		up : false,
		right : false,
		down : false,
		left : false
	};
	this.isBlockable = [];
	
	for(var key in def.chara){
		this[key] = (typeof def.chara[key] == "object" ? OverWrite(this[key],def.chara[key]) : def.chara[key]);
	}
	for(var key in config){
		this[key] = (typeof config[key] == "object" ? OverWrite(this[key],config[key]) : config[key]);
	}
	
	if(this.x == "rand") this.x = Math.floor(Math.random()*ini.window.width);
	if(this.y == "rand") this.y = Math.floor(Math.random()*ini.window.height);
	this.oldx = this.x;
	this.oldy = this.y;
	
	if(this.img.stop){
		this.elem = document.createElement("img");
		this.elem.setAttribute("src",this.img.stop);
		this.img.now = this.img.stop;
	}else{
		this.elem = document.createElement("div");
		this.elem.innerHTML = this.string || "";
	}
	if(this.isDeletable){
		addEvent(this.elem,"mousedown",function(e,obj){
			charas[obj.getAttribute("no")].isDeleted = true;
			elems.room.removeChild(obj);
		});
	}
	this.elem.setAttribute("class","ALchara");
	this.elem.setAttribute("no",this.no);
	this.elem.style.width = this.width + "px";
	this.elem.style.height = this.height + "px";
	this.reload();
	elems.room.appendChild(this.elem);
};
chara.prototype.move = function(){
	if(--this.limit == 0) elems.room.removeChild(this.elem);
	if(this.isDeleted) return false;
	
	this.oldsx = this.speed.x;
	this.oldsy = this.speed.y;
	
	if(this.isMovable){
		if(this.isControlable){
			this.speed.x += (key.right ? this.baseSpeed.x : 0) - (key.left ? this.baseSpeed.x : 0);
			this.speed.y += (key.down ? this.baseSpeed.gy : 0);
			if(key.up && this.isBlocked.down) this.speed.y = -this.baseSpeed.y;
		}else{
			this.speed.x += (Math.floor(Math.random()*this.baseSpeed.x+1/2 - this.baseSpeed.x/2));
			if(this.isBlocked.down && Math.random()*this.jumpRate < 1) this.speed.y = -this.baseSpeed.y;
		}
	}
	
	if(this.speed.x > 0) this.speed.x -= this.baseSpeed.rx;
	if(this.speed.x < 0) this.speed.x += this.baseSpeed.rx;
	if(this.speed.y > 0) this.speed.y -= this.baseSpeed.ry;
	if(this.speed.y < 0) this.speed.y += this.baseSpeed.ry;
	this.speed.x += this.baseSpeed.gx;
	this.speed.y += this.baseSpeed.gy;
	
	if(this.maxSpeed.x > 0 && Math.abs(this.speed.x) > this.maxSpeed.x) this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
	if(this.maxSpeed.y > 0 && Math.abs(this.speed.y) > this.maxSpeed.y) this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
	
	this.x += this.speed.x;
	this.y += this.speed.y;
	
	this.block();
	
	if(this.isControlable) this.CheckLick();
	
	this.ChangeImage();
	
	this.reload();
};
chara.prototype.reload = function(){
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	this.oldx = this.x;
	this.oldy = this.y;
	this.elem.style.left = this.x + "px";
	this.elem.style.top = this.y + "px";
};
chara.prototype.block = function(){
	this.isBlocked = {
		up : false,
		right : false,
		down : false,
		left : false
	};
	
	if(this.x + this.width > ini.window.width){
		this.isBlocked.right = true;
		
		if(ini.loop.x){
			this.x = 0;
			this.oldx = this.x;
		}else{
			this.x = ini.window.width - this.width;
			this.speed.x *= -ini.window.bound.right;
		}
		this.y += this.isBlocked.down || this.isBlocked.up ? 0 : ini.scroll.right;
	}else if(this.x < 0){
		this.isBlocked.left = true;
		
		if(ini.loop.x){
			this.x = ini.window.width - this.width;
			this.oldx = this.x;
		}else{
			this.x = 0;
			this.speed.x *= -ini.window.bound.left;
		}
		this.y += this.isBlocked.down || this.isBlocked.up ? 0 : ini.scroll.left;
	}
	if(this.y < 0){
		this.isBlocked.up = true;
		
		if(ini.loop.y){
			this.y = ini.window.height - this.height;
			this.oldy = this.y;
		}else{
			this.y = 0;
			this.speed.y *= -ini.window.bound.top;
		}
		this.x += (ini.scroll.top < 0 && !this.isBlocked.left) || (ini.scroll.top > 0 && !this.isBlocked.right) ? ini.scroll.top : 0;
	}else if(this.y + this.height > ini.window.height){
		this.isBlocked.down = true;
		
		if(ini.loop.y){
			this.y = 0;
			this.oldy = this.y;
		}else{
			this.y = ini.window.height - this.height;
			this.speed.y *= -ini.window.bound.bottom;
		}
		this.x += (ini.scroll.bottom < 0 && !this.isBlocked.left) || (ini.scroll.bottom > 0 && !this.isBlocked.right) ? ini.scroll.bottom : 0;
	}
	
	for(var i=blocks.length;i>0;i--){
		var block = blocks[i-1];
		
		var isBlocked = this.CheckBlock(block);
		if(isBlocked.down){
			this.x += block.scroll.top;
			this.y = block.y - this.height;
			this.speed.y -= this.baseSpeed.gy;
			this.speed.y *= -block.bound.top;
		}else if(isBlocked.up){
			this.x += block.scroll.bottom;
			this.y = block.y + block.height;
			this.speed.y -= this.baseSpeed.gy;
			this.speed.y *= -block.bound.bottom;
		}else if(isBlocked.left){
			this.x = block.x - this.width;
			this.y += block.scroll.right;
			this.speed.x -= this.baseSpeed.gx;
			this.speed.x *= -block.bound.right;
		}else if(isBlocked.right){
			this.x = block.x + block.width;
			this.y += block.scroll.left;
			this.speed.x -= this.baseSpeed.gx;
			this.speed.x *= -block.bound.left;
		}
	}
	
	for(var i=charas.length;i>0;i--){
		var chara = charas[i-1];
		if(i-1 == this.no || chara.isDeleted) continue;
		
		var isBlocked = this.CheckBlock(chara);
		if(isBlocked.down){
			if(chara.isTreadable){
				charas[i-1].isDeleted = true;
				charas[i-1].limit = 10;
				img = (this.difx < 0 ? chara.img.tleft : chara.img.tright);
				if(img) charas[i-1].elem.setAttribute("src",img);
			}
			
			charas[i-1].speed.y += this.speed.y;
			this.y = chara.y - this.height;
			this.speed.y *= -chara.bound.top;
		}else if(isBlocked.up){
			charas[i-1].speed.y += this.speed.y;
			this.y = chara.y + chara.height;
			this.speed.y *= -chara.bound.bottom;
		}else if(isBlocked.left){
			charas[i-1].speed.x += this.speed.x;
			this.x = chara.x - this.width;
			this.speed.x *= -chara.bound.right;
		}else if(isBlocked.right){
			charas[i-1].speed.x += this.speed.x;
			this.x = chara.x + chara.width;
			this.speed.x *= -chara.bound.left;
		}
	}
	
};
chara.prototype.CheckLick = function(){
	if(this.link != null){
		if(key.space){
			window.location = this.link.href;
			chara.prototype.move = function(){};
		}
		if(!this.isTouch(this.link)){
			this.link = null;
			elems.help.style.display = "none";
		}
	}else{
		for(var i=links.length;i>0;i--){
			var link = links[i-1];
			if(this.isTouch(link)){
				this.link = link;
				elems.help.style.display = "block";
				break;
			}
		}
	}
	elems.help.style.left = (this.x + this.width) + "px";
	elems.help.style.top = (this.y + this.height) + "px";
};
chara.prototype.ChangeImage = function(){
	var img = null;
	
	// スピードだと跳ねるときの誤差でうまくいかないので、座標差で調べる
	this.difx = Math.floor(this.x - this.oldx);
	this.dify = Math.floor(this.y - this.oldy);
	this.difsx = Math.floor(this.speed.x - this.oldsx);
	this.difsy = Math.floor(this.speed.y - this.oldsy);
	
	if(this.dify < 0){
		if(this.difx > 0) img = this.img.uright;
		else if(this.difx < 0) img = this.img.uleft;
		else img = this.img.up;
	}else if(this.dify > 0){
		if(this.difx > 0) img = this.img.dright;
		else if(this.difx < 0) img = this.img.dleft;
		else img = this.img.down;
	}else{
		// なぜか分らないがこうしないといけない・・・
		if(this.difx > 0) img = (this.difsx < 0 ? this.img.bright : (this.img.now == this.img.right ? this.img.right2 : this.img.right) );
		else if(this.difx < 0) img = (this.difsx < 0 ? (this.img.now == this.img.left ? this.img.left2 : this.img.left) : this.img.bleft );
		else img = this.img.stop;
	}
	if(img && img != this.img.now){
		this.img.now = img;
		this.elem.setAttribute("src",img);
	}
};
chara.prototype.CheckBlock = function(block){
	var isBlocked = {
		up : false,
		right : false,
		down : false,
		left : false
	};
	var isBlockable = {
		top : false,
		right : false,
		bottom : false,
		left : false
	};
	if(block.isBlockable){
		for(i=block.isBlockable.length;i>0;i--){
			isBlockable[block.isBlockable[i-1]] = true;
		}
	}
	
	if(this.x + this.width >= block.x && this.x <= block.x + block.width){
		if(isBlockable.top && this.oldy + this.height <= block.oldy && this.y + this.height >= block.y){
			this.isBlocked.down = true;
			isBlocked.down = true;
		}else if(isBlockable.bottom && this.oldy >= block.oldy + block.height && this.y <= block.y + block.height){
			this.isBlocked.up = true;
			isBlocked.up = true;
		}
	}
	if(this.y + this.height >= block.y && this.y <= block.y + block.height){
		if(isBlockable.right && this.oldx + this.width <= block.oldx && this.x + this.width >= block.x){
			this.isBlocked.left = true;
			isBlocked.left = true;
		}else if(isBlockable.left && this.oldx >= block.oldx + block.width && this.x <= block.x + block.width){
			this.isBlocked.right = true;
			isBlocked.right = true;
		}
	}
	
	return isBlocked;
}
chara.prototype.isTouch = function(block){
	return (Math.abs( (this.x + this.width/2) - (block.x + block.width/2) ) < this.width/2 + block.width/2 && Math.abs( (this.y + this.height/2) - (block.y + block.height/2) ) < this.height/2 + block.height/2);
}

var link = function(config){
	this.x = this.y = this.width = this.height = this.href = this.img = this.string = null;
	this.isBlock = false;
	this.bound = {top:0,right:0,bottom:0,left:0};
	this.isBlockable = [];
	
	for(var key in def.link){
		this[key] = (typeof def.link[key] == "object" ? OverWrite(this[key],def.link[key]) : def.link[key]);
	}
	for(var key in config){
		this[key] = (typeof config[key] == "object" ? OverWrite(this[key],config[key]) : config[key]);
	}
	
	if(this.x == "rand") this.x = Math.floor(Math.random()*ini.window.width);
	if(this.y == "rand") this.y = Math.floor(Math.random()*ini.window.height);
	
	if(this.isBlock) blocks.push(this);
	
	this.elem = document.createElement("a");
	this.elem.setAttribute("class","ALlink");
	this.elem.setAttribute("href",this.href);
	this.elem.style.width = this.width + "px";
	this.elem.style.height = this.height + "px";
	this.elem.style.left = this.x + "px";
	this.elem.style.top = this.y + "px";
	if(this.img){
		var child = document.createElement("img");
		child.setAttribute("src",this.img);
	}else{
		var child = document.createElement("div");
		child.innerHTML = this.string || "";
	}
	this.elem.appendChild(child);
	elems.room.appendChild(this.elem);
};

var block = function(config){
	this.x = this.y = this.oldx = this.oldy = this.width = this.height = this.img = this.string = this.type = null;
	this.bound = {top:0,right:0,bottom:0,left:0};
	this.scroll = {top:0,right:0,bottom:0,left:0};
	this.max = {x:0,y:0};
	this.min = {x:0,y:0};
	this.speed = {x:0,y:0};
	this.isBlockable = [];
	
	for(var key in def.block){
		this[key] = (typeof def.block[key] == "object" ? OverWrite(this[key],def.block[key]) : def.block[key]);
	}
	for(var key in config){
		this[key] = (typeof config[key] == "object" ? OverWrite(this[key],config[key]) : config[key]);
	}
	
	if(this.x == "rand") this.x = Math.floor(Math.random()*ini.window.width);
	if(this.y == "rand") this.y = Math.floor(Math.random()*ini.window.height);
	this.oldx = this.x;
	this.oldy = this.y;
	
	if(this.img){
		this.elem = document.createElement("img");
		this.elem.setAttribute("src",this.img);
	}else{
		this.elem = document.createElement("div");
		this.elem.innerHTML = this.string || "";
	}
	this.elem.setAttribute("class","ALblock");
	this.elem.style.width = this.width + "px";
	this.elem.style.height = this.height + "px";
	this.elem.style.left = this.x + "px";
	this.elem.style.top = this.y + "px";
	elems.room.appendChild(this.elem);
};
block.prototype.move = function(){
	if(this.type == "block") return;
	
	this.oldx = this.x;
	this.oldy = this.y;
	this.x += this.speed.x;
	this.y += this.speed.y;
	if(this.max.x && this.x > this.max.x){
		this.x = this.max.x;
		if(this.type=="elevator") this.speed.x *= -1;
	}
	if(this.max.y && this.y > this.max.y){
		this.y = this.max.y;
		if(this.type=="elevator") this.speed.y *= -1;
	}
	if(this.min.x && this.x < this.min.x){
		this.x = this.min.x;
		if(this.type=="elevator") this.speed.x *= -1;
	}
	if(this.min.y && this.y < this.min.y){
		this.y = this.min.y;
		if(this.type=="elevator") this.speed.y *= -1;
	}
	
	this.elem.style.left = this.x + "px";
	this.elem.style.top = this.y + "px";
};

function set(){
	elems = {
		room : document.getElementById("ALroom") || function(){
			var elem = document.createElement("div");
			elem.setAttribute("id","ALroom");
			document.getElementsByTagName("body")[0].appendChild(elem);
			return elem;
		}(),
		help : document.getElementById("ALhelp") || function(){
			var elem = document.createElement("div");
			elem.setAttribute("id","ALhelp");
			document.getElementById("ALroom").appendChild(elem);
			return elem;
		}()
	};
	
	addEvent(document,"keydown",function(e,obj){
		var keycode = GetKeyCode(e);
		if(ini.keyno[keycode]){
			key[ini.keyno[keycode]] = true;
			preventDefault(e);
			false;
		}
	});
	addEvent(document,"keyup",function(e,obj){
		var keycode = GetKeyCode(e);
		if(ini.keyno[keycode]){
			key[ini.keyno[keycode]] = false;
			preventDefault(e);
			false;
		}
	});
}
function start(){
	elems.room.style.width = ini.window.width + "px";
	elems.room.style.height = ini.window.height + "px";
	elems.help.style.display = "none";
	
	setInterval(function(){
		for(var i=blocks.length;i>0;i--) blocks[i-1].move();
		for(var i=charas.length;i>0;i--) charas[i-1].move();
	},ini.timer);
}

function GetKeyCode(e){
	if(document.all) return event.keyCode;
	else if(document.getElementById) return (e.keyCode) ? e.keyCode: e.charCode;
	else if(document.layers) return e.which;
}
function preventDefault(e){
	try{
		if(!e.preventDefault) window.event.returnValue = false;
		else e.preventDefault();
	}catch(e){}
}
function addEvent(elem,type,handle){
	if (elem.addEventListener) elem.addEventListener(type,function(e){handle(e,this);},false);
	else if (elem.attachEvent) elem.attachEvent("on" + type,function(){handle(null,event.srcElement);});
	else elem["on" + type] = handle;
}
function OverWrite(old,over){
	for(var key in over){
		old[key] = (typeof over[key] == "object" ? OverWrite(old[key],over[key]) : over[key]);
	}
	return old;
}

return {
	key : key,
	ini : ini,
	def : def,
	charas : charas,
	blocks : blocks,
	links : links,
	elems : elems,
	chara : chara,
	link : link,
	block : block,
	set : set,
	start : start
};

}();
