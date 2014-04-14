AL=function(){var o=null,k=[],j={up:false,down:false,left:false,right:false,space:false},g={timerSpeed:50,keyno:{37:"left",38:"up",39:"right",40:"down",32:"space"},window:{width:750,height:500,bounce:{top:0.5,right:0.5,bottom:0.5,left:0.5},scroll:{top:0,right:0,bottom:0,left:0},loop:{x:false,y:false}}},p={type:"block",x:"rand",y:"rand",width:32,height:32,jumpRate:20,limit:-1,baseSpeed:{x:0,y:0,jx:0,jy:0,gx:0,gy:0,rx:0,ry:0},maxSpeed:{},minSpeed:{},speed:{},bounce:{top:1/2,right:1/2,bottom:1/2,left:1/2},scroll:{},img:{},elem:{},isBlocked:{},isBlockable:["top","right","bottom","left"],isPushable:true},h={room:null,link:null,help:null};var i=function(c){this.no=k.length;this.x=this.y=this.width=this.height=this.link=this.href=this.linkDetail=this.jumpRate=this.limit=this.content=this.type=null;this.isDeleted=this.isTreadable=this.isDeletable=this.isPushable=false;this.old={x:0,y:0,sx:0,sy:0};this.max={x:0,y:0};this.min={x:0,y:0};this.baseSpeed={x:0,y:0,jx:0,jy:0,gx:0,gy:0,rx:0,ry:0};this.maxSpeed={x:0,y:0};this.minSpeed={x:0,y:0};this.speed={x:0,y:0};this.bounce={top:0,right:0,bottom:0,left:0};this.scroll={top:0,right:0,bottom:0,left:0};this.img={now:null,stop:null,up:null,right:null,right2:null,down:null,left:null,left2:null,uleft:null,uright:null,dleft:null,dright:null,bleft:null,bright:null,tleft:null,tright:null};this.elem={};this.isBlocked={up:false,right:false,down:false,left:false};this.isBlockable=[];n(this,p);n(this,c);var d={top:false,right:false,bottom:false,left:false};for(var f=this.isBlockable.length;f>0;f--){d[this.isBlockable[f-1]]=true}this.isBlockable=this.isBlockable.length>0?d:null;if(this.x=="rand")this.x=Math.round(Math.random()*g.window.width);if(this.y=="rand")this.y=Math.round(Math.random()*g.window.height);this.old.sx=this.speed.x;this.old.sy=this.speed.y;this.old.x=this.x;this.old.y=this.y;this.createElement();n(this.elem,p.elem);n(this.elem,c.elem);k.push(this)};i.prototype.createElement=function(){if(this.img.stop){this.elem=document.createElement("img");this.elem.setAttribute("src",this.img.stop);this.img.now=this.img.stop}else{this.elem=document.createElement("div");this.elem.innerHTML=this.content||""}this.elem.setAttribute("no",this.no);if(this.href!=null){var l=document.createElement("a");l.setAttribute("href",this.href);l.setAttribute("title",this.linkDetail);l.appendChild(this.elem);this.elem=l;m(this.elem,"mouseover",function(c,d){var f=k[d.getAttribute("no")];q(f.x+f.width,f.y+f.height,f)});m(this.elem,"mouseout",function(c,d){h.linkDetail.style.display="none"})}if(this.isDeletable){m(this.elem,"mousedown",function(c,d){k[d.getAttribute("no")].kill()})}this.elem.className="ALitem";this.elem.style.position="absolute";this.elem.setAttribute("no",this.no);this.elem.style.width=this.width+"px";this.elem.style.height=this.height+"px";this.reload();h.room.appendChild(this.elem)};i.prototype.move=function(){if(--this.limit==0)this.kill();if(this.isDeleted)return false;this.old.sx=this.speed.x;this.old.sy=this.speed.y;this.old.x=this.x;this.old.y=this.y;this.changeSpeed();this.x+=this.speed.x;this.y+=this.speed.y;if(this.link!=null){if(!this.isTouch(this.link)){this.link=null;h.linkDetail.style.display="none"}else if(j.space){clearInterval(o);window.location=this.link.href}}if(this.isPushable)this.blockAll();this.changeImage();this.reload()};i.prototype.changeSpeed=function(){this.speed.x+=this.baseSpeed.gx;this.speed.y+=this.baseSpeed.gy;switch(this.type){case"control":this.speed.x+=(j.right?this.baseSpeed.x:0)-(j.left?this.baseSpeed.x:0);this.speed.y+=(j.down?this.baseSpeed.y:0)-(j.up?this.baseSpeed.y:0);if(j.up&&this.isBlocked.down)this.speed.y=-this.baseSpeed.jy;if(j.down&&this.isBlocked.up)this.speed.y=this.baseSpeed.jy;if(j.left&&this.isBlocked.right)this.speed.x=-this.baseSpeed.jx;if(j.right&&this.isBlocked.left)this.speed.x=this.baseSpeed.jx;break;case"rand":this.speed.x+=Math.round(Math.random()*this.baseSpeed.x*2-this.baseSpeed.x);this.speed.y+=Math.round(Math.random()*this.baseSpeed.y*2-this.baseSpeed.y);if(this.isBlocked.down&&Math.random()*this.jumpRate<1)this.speed.y=-this.baseSpeed.jy;if(this.isBlocked.up&&Math.random()*this.jumpRate<1)this.speed.y=this.baseSpeed.jy;if(this.isBlocked.right&&Math.random()*this.jumpRate<1)this.speed.x=-this.baseSpeed.jx;if(this.isBlocked.left&&Math.random()*this.jumpRate<1)this.speed.x=this.baseSpeed.jx;break;case"elevator":if(this.speed.x==0)this.speed.x=this.baseSpeed.x;if(this.speed.y==0)this.speed.y=this.baseSpeed.y;if(this.max.x<this.x||this.isBlocked.left)this.speed.x=-Math.abs(this.baseSpeed.x);else if(this.min.x>this.x||this.isBlocked.right)this.speed.x=Math.abs(this.baseSpeed.x);if(this.max.y<this.y||this.isBlocked.down)this.speed.y=-Math.abs(this.baseSpeed.y);else if(this.min.y>this.y||this.isBlocked.up)this.speed.y=Math.abs(this.baseSpeed.y);break;case"block":break}if(this.speed.x>0)this.speed.x=this.speed.x-this.baseSpeed.rx>0?this.speed.x-this.baseSpeed.rx:0;if(this.speed.x<0)this.speed.x=this.speed.x+this.baseSpeed.rx<0?this.speed.x+this.baseSpeed.rx:0;if(this.speed.y>0)this.speed.y=this.speed.y-this.baseSpeed.ry>0?this.speed.y-this.baseSpeed.ry:0;if(this.speed.y<0)this.speed.y=this.speed.y+this.baseSpeed.ry<0?this.speed.y+this.baseSpeed.ry:0;if(this.maxSpeed.x>0&&Math.abs(this.speed.x)>this.maxSpeed.x)this.speed.x=this.speed.x>0?this.maxSpeed.x:-this.maxSpeed.x;if(this.maxSpeed.y>0&&Math.abs(this.speed.y)>this.maxSpeed.y)this.speed.y=this.speed.y>0?this.maxSpeed.y:-this.maxSpeed.y;if(this.minSpeed.x>0&&Math.abs(this.speed.x)<this.minSpeed.x)this.speed.x=this.speed.x>0?this.minSpeed.x:-this.minSpeed.x;if(this.minSpeed.y>0&&Math.abs(this.speed.y)<this.minSpeed.y)this.speed.y=this.speed.y>0?this.minSpeed.y:-this.minSpeed.y};i.prototype.blockAll=function(){this.isBlocked={up:false,right:false,down:false,left:false};for(var c=k.length;c>0;c--){var d=k[c-1];if(c-1==this.no||d.isDeleted)continue;if(this.type=="control"&&d.href!=null&&this.isTouch(d))this.reloadLink(d);if(!d.isBlockable)continue;if(this.x+this.width>d.x&&this.x<d.x+d.width){if(d.isBlockable.top&&this.old.y+this.height<=d.old.y&&this.y+this.height>=d.y)this.block(d,"down");if(d.isBlockable.bottom&&this.old.y>=d.old.y+d.height&&this.y<=d.y+d.height)this.block(d,"up")}if(this.y+this.height>d.y&&this.y<d.y+d.height){if(d.isBlockable.right&&this.old.x>=d.old.x+d.width&&this.x<=d.x+d.width)this.block(d,"left");if(d.isBlockable.left&&this.old.x+this.width<=d.old.x&&this.x+this.width>=d.x)this.block(d,"right")}}this.windowBlock()};i.prototype.block=function(c,d){switch(d){case"right":var f=l="left";this.x=c.x-this.width+(c.speed.x<0?c.speed.x:0);break;case"left":var f=l="right";this.x=c.x+c.width+(c.speed.x>0?c.speed.x:0);break;case"up":var l="down",f="bottom";if(this.isTreadable)this.beTreated();this.y=c.y+c.height+(c.speed.y>0?c.speed.y:0);break;case"down":var l="up",f="top";if(c.isTreadable)c.beTreated();this.y=c.y-this.height+(c.speed.y<0?c.speed.y:0);break}switch(d){case"right":case"left":if(c.isPushable)c.speed.x+=this.speed.x;this.speed.x*=-c.bounce[f];this.y+=c.speed.y+(c.scroll[f]<0&&!this.isBlocked.up)||(c.scroll[f]>0&&!this.isBlocked.down)?c.scroll[f]:0;break;case"up":case"down":if(c.isPushable)c.speed.y+=this.speed.y;this.speed.y*=-c.bounce[f];this.x+=c.speed.x+(c.scroll[f]<0&&!this.isBlocked.left)||(c.scroll[f]>0&&!this.isBlocked.right)?c.scroll[f]:0;break}this.isBlocked[d]=true};i.prototype.windowBlock=function(){if(this.x+this.width>g.window.width){if(g.window.loop.x){if(this.x>g.window.width)this.old.x=this.x=0}else{this.isBlocked.right=true;this.x=g.window.width-this.width;this.speed.x*=-g.window.bounce.right}this.y+=this.isBlocked.down||this.isBlocked.up?0:g.window.scroll.right}if(this.x<0){if(g.window.loop.x){if(this.x+this.width<0)this.old.x=this.x=g.window.width-this.width}else{this.isBlocked.left=true;this.x=0;this.speed.x*=-g.window.bounce.left}this.y+=this.isBlocked.down||this.isBlocked.up?0:g.window.scroll.left}if(this.y<0){if(g.window.loop.y){if(this.y+this.height<0)this.old.y=this.y=g.window.height-this.height}else{this.isBlocked.up=true;this.y=0;this.speed.y*=-g.window.bounce.top}this.x+=(g.window.scroll.top<0&&!this.isBlocked.left)||(g.window.scroll.top>0&&!this.isBlocked.right)?g.window.scroll.top:0}if(this.y+this.height>g.window.height){if(g.window.loop.y){if(this.y>g.window.height)this.old.y=this.y=0}else{this.isBlocked.down=true;this.y=g.window.height-this.height;this.speed.y*=-g.window.bounce.bottom}this.x+=(g.window.scroll.bottom<0&&!this.isBlocked.left)||(g.window.scroll.bottom>0&&!this.isBlocked.right)?g.window.scroll.bottom:0}};i.prototype.reloadLink=function(c){if(this.link==null)this.link=c;q(this.x+this.width,this.y+this.height,c)};i.prototype.changeImage=function(){var c=null;dif={};dif.x=this.x-this.old.x;dif.y=this.y-this.old.y;dif.sx=this.speed.x-this.old.sx;dif.sy=this.speed.y-this.old.sy;if(dif.y<0){if(dif.x>0)c=this.img.uright;else if(dif.x<0)c=this.img.uleft;else c=this.img.up}else if(dif.y>0){if(dif.x>0)c=this.img.dright;else if(dif.x<0)c=this.img.dleft;else c=this.img.down}else{if(dif.x>0)c=(dif.sx<0?this.img.bright:(this.img.now==this.img.right?this.img.right2:this.img.right));else if(dif.x<0)c=(dif.sx<0?(this.img.now==this.img.left?this.img.left2:this.img.left):this.img.bleft);else c=this.img.stop}if(c&&c!=this.img.now){this.img.now=c;this.elem.setAttribute("src",c)}};i.prototype.reload=function(){this.elem.style.left=Math.round(this.x)+"px";this.elem.style.top=Math.round(this.y)+"px"};i.prototype.kill=function(){h.room.removeChild(this.elem);this.isDeleted=true};i.prototype.beTreated=function(){this.limit=10;this.isDeleted=true;img=this.speed.x<0?this.img.tleft:this.img.tright;if(img)this.elem.setAttribute("src",img)};i.prototype.isTouch=function(c){return(Math.abs((this.x+this.width/2)-(c.x+c.width/2))<this.width/2+c.width/2&&Math.abs((this.y+this.height/2)-(c.y+c.height/2))<this.height/2+c.height/2)};function u(){h={room:document.getElementById("ALroom")||function(){var c=document.createElement("div");c.setAttribute("id","ALroom");document.getElementsByTagName("body")[0].appendChild(c);return c}(),linkDetail:document.getElementById("ALlinkDetail")||function(){var c=document.createElement("div");c.setAttribute("id","ALlinkDetail");c.style.position="absolute";document.getElementById("ALroom").appendChild(c);return c}(),help:document.getElementById("ALhelp")||function(){var c=document.createElement("div");c.setAttribute("id","ALhelp");document.getElementById("ALroom").appendChild(c);return c}(),helpToggle:document.getElementById("ALhelpToggle")||function(){var c=document.createElement("div");c.style.width="32px";c.style.height="32px";c.innerHTML="？";c.setAttribute("id","ALhelpToggle");document.getElementById("ALhelp").appendChild(c);return c}(),helpContent:document.getElementById("ALhelpContent")||function(){var c=document.createElement("div");c.style.position="absolute";c.innerHTML="↑：ジャンプ<br>→：右へ加速<br>←：左へ加速<br>↓：下に加速<br>スペース：リンク先へ飛ぶ";c.setAttribute("id","ALhelpContent");document.getElementById("ALhelp").appendChild(c);return c}()};h.helpContent.style.display="none";h.linkDetail.style.display="none";m(document,"keydown",function(c,d){var f=r(c);if(g.keyno[f]){j[g.keyno[f]]=true;s(c);false}});m(document,"keyup",function(c,d){var f=r(c);if(g.keyno[f]){j[g.keyno[f]]=false;s(c);false}});m(h.helpToggle,"mousedown",function(c,d){h.helpContent.style.display=(h.helpContent.style.display=="block"?"none":"block")})}function q(c,d,f){h.linkDetail.style.left=c+"px";h.linkDetail.style.top=d+"px";if(h.linkDetail.style.display=="none"){h.linkDetail.style.display="block";h.linkDetail.innerHTML=f.linkDetail||f.href}}function t(){h.room.style.width=g.window.width+"px";h.room.style.height=g.window.height+"px";o=setInterval(function(){for(var c=k.length;c>0;c--)k[c-1].move()},g.timerSpeed)}function v(){clearInterval(o);t()}function r(c){if(document.all)return event.keyCode;else if(document.getElementById)return(c.keyCode)?c.keyCode:c.charCode;else if(document.layers)return c.which}function s(c){if(!c||!c.preventDefault)window.event.returnValue=false;else c.preventDefault()}function m(c,d,f){if(c.addEventListener)c.addEventListener(d,function(e){f(e,this)},false);else if(c.attachEvent)c.attachEvent("on"+d,function(){f(null,event.srcElement)});else c["on"+d]=f}function n(c,d){for(var f in d){if(w(d[f])){if(c[f]==null)c[f]={};try{c[f]=n(c[f],d[f])}catch(e){}}else{c[f]=d[f]}}return c}function x(c){return c.constructor===Array}function w(c){return typeof c=="object"&&!x(c)}return{key:j,ini:g,def:p,items:k,elems:h,item:i,set:u,start:t,restart:v}}();