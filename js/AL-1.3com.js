AL=function(){var o=null,k=[],i={up:false,down:false,left:false,right:false,space:false},f={timerSpeed:50,keyno:{37:"left",38:"up",39:"right",40:"down",32:"space"},window:{width:750,height:500,bounce:{top:0.5,right:0.5,bottom:0.5,left:0.5},scroll:{top:0,right:0,bottom:0,left:0},loop:{x:false,y:false}}},p={type:"block",x:"rand",y:"rand",width:32,height:32,jumpRate:20,limit:-1,baseSpeed:{x:0,y:0,jx:0,jy:0,gx:0,gy:0,rx:0,ry:0},maxSpeed:{},minSpeed:{},speed:{},bounce:{top:1/2,right:1/2,bottom:1/2,left:1/2},scroll:{},img:{},elem:{},isBlocked:{},isBlockable:["top","right","bottom","left"],isPushable:true},h={room:null,link:null,help:null};var j=function(g){this.no=k.length;this.x=this.y=this.width=this.height=this.link=this.linkDetail=this.jumpRate=this.limit=this.content=this.type=null;this.isDeleted=this.isTreadable=this.isDeletable=this.isPushable=false;this.old={x:0,y:0,sx:0,sy:0};this.max={x:0,y:0};this.min={x:0,y:0};this.baseSpeed={x:0,y:0,jx:0,jy:0,gx:0,gy:0,rx:0,ry:0};this.maxSpeed={x:0,y:0};this.minSpeed={x:0,y:0};this.speed={x:0,y:0};this.bounce={top:0,right:0,bottom:0,left:0};this.scroll={top:0,right:0,bottom:0,left:0};this.img={now:null,stop:null,up:null,right:null,right2:null,down:null,left:null,left2:null,uleft:null,uright:null,dleft:null,dright:null,bleft:null,bright:null,tleft:null,tright:null};this.elem={};this.isBlocked={up:false,right:false,down:false,left:false};this.isBlockable=[];m(this,p);m(this,g);if(this.x=="rand")this.x=Math.round(Math.random()*f.window.width);if(this.y=="rand")this.y=Math.round(Math.random()*f.window.height);this.old.sx=this.speed.x;this.old.sy=this.speed.y;this.old.x=this.x;this.old.y=this.y;if(this.img.stop){this.elem=document.createElement("img");this.elem.setAttribute("src",this.img.stop);this.img.now=this.img.stop}else{this.elem=document.createElement("div");this.elem.innerHTML=this.content||""}if(this.href!=null){var l=document.createElement("a");l.setAttribute("href",this.href);l.setAttribute("title",this.linkDetail);l.appendChild(this.elem);this.elem=l}this.elem.className="ALitem";this.elem.style.position="absolute";this.elem.setAttribute("no",this.no);this.elem.style.width=this.width+"px";this.elem.style.height=this.height+"px";m(this.elem,p.elem);m(this.elem,g.elem);this.reload();h.room.appendChild(this.elem);if(this.isDeletable){n(this.elem,"mousedown",function(c,d){k[d.getAttribute("no")].kill()})}k.push(this)};j.prototype.move=function(){if(--this.limit==0)this.kill();if(this.isDeleted)return false;this.old.sx=this.speed.x;this.old.sy=this.speed.y;this.old.x=this.x;this.old.y=this.y;this.changeSpeed();this.x+=this.speed.x;this.y+=this.speed.y;if(this.link!=null){if(!this.isTouch(this.link)){this.link=null;h.linkDetail.style.display="none"}else if(i.space){clearInterval(o);window.location=this.link.href}}if(this.isPushable)this.block();this.changeImage();this.reload()};j.prototype.changeSpeed=function(){this.speed.x+=this.baseSpeed.gx;this.speed.y+=this.baseSpeed.gy;switch(this.type){case"control":this.speed.x+=(i.right?this.baseSpeed.x:0)-(i.left?this.baseSpeed.x:0);this.speed.y+=(i.down?this.baseSpeed.y:0)-(i.up?this.baseSpeed.y:0);if(i.up&&this.isBlocked.down)this.speed.y=-this.baseSpeed.jy;if(i.down&&this.isBlocked.up)this.speed.y=this.baseSpeed.jy;if(i.left&&this.isBlocked.right)this.speed.x=-this.baseSpeed.jx;if(i.right&&this.isBlocked.left)this.speed.x=this.baseSpeed.jx;break;case"rand":this.speed.x+=Math.round(Math.random()*this.baseSpeed.x*2-this.baseSpeed.x);this.speed.y+=Math.round(Math.random()*this.baseSpeed.y*2-this.baseSpeed.y);if(this.isBlocked.down&&Math.random()*this.jumpRate<1)this.speed.y=-this.baseSpeed.jy;if(this.isBlocked.up&&Math.random()*this.jumpRate<1)this.speed.y=this.baseSpeed.jy;if(this.isBlocked.right&&Math.random()*this.jumpRate<1)this.speed.y=-this.baseSpeed.jy;if(this.isBlocked.left&&Math.random()*this.jumpRate<1)this.speed.y=this.baseSpeed.jy;break;case"elevator":if(this.speed.x==0)this.speed.x=this.baseSpeed.x;if(this.speed.y==0)this.speed.y=this.baseSpeed.y;if(this.max.x<this.x||this.isBlocked.left)this.speed.x=-Math.abs(this.baseSpeed.x);else if(this.min.x>this.x||this.isBlocked.right)this.speed.x=Math.abs(this.baseSpeed.x);if(this.max.y<this.y||this.isBlocked.down)this.speed.y=-Math.abs(this.baseSpeed.y);else if(this.min.y>this.y||this.isBlocked.up)this.speed.y=Math.abs(this.baseSpeed.y);break;case"block":break}if(this.speed.x>0)this.speed.x=this.speed.x-this.baseSpeed.rx>0?this.speed.x-this.baseSpeed.rx:0;if(this.speed.x<0)this.speed.x=this.speed.x+this.baseSpeed.rx<0?this.speed.x+this.baseSpeed.rx:0;if(this.speed.y>0)this.speed.y=this.speed.y-this.baseSpeed.ry>0?this.speed.y-this.baseSpeed.ry:0;if(this.speed.y<0)this.speed.y=this.speed.y+this.baseSpeed.ry<0?this.speed.y+this.baseSpeed.ry:0;if(this.maxSpeed.x>0&&Math.abs(this.speed.x)>this.maxSpeed.x)this.speed.x=this.speed.x>0?this.maxSpeed.x:-this.maxSpeed.x;if(this.maxSpeed.y>0&&Math.abs(this.speed.y)>this.maxSpeed.y)this.speed.y=this.speed.y>0?this.maxSpeed.y:-this.maxSpeed.y;if(this.minSpeed.x>0&&Math.abs(this.speed.x)<this.minSpeed.x)this.speed.x=this.speed.x>0?this.minSpeed.x:-this.minSpeed.x;if(this.minSpeed.y>0&&Math.abs(this.speed.y)<this.minSpeed.y)this.speed.y=this.speed.y>0?this.minSpeed.y:-this.minSpeed.y};j.prototype.block=function(){this.isBlocked={up:false,right:false,down:false,left:false};for(var c=k.length;c>0;c--){var d=k[c-1];if(c-1==this.no||d.isDeleted)continue;var g={top:false,right:false,bottom:false,left:false};if(d.isBlockable){for(var l=d.isBlockable.length;l>0;l--){g[d.isBlockable[l-1]]=true}}if(this.x+this.width>d.x&&this.x<d.x+d.width){if(g.top&&this.old.y+this.height<=d.old.y&&this.y+this.height>=d.y){if(d.isTreadable)d.beTreated();if(d.isPushable)d.speed.y+=this.speed.y;this.speed.y*=-d.bounce.top;this.y=d.y-this.height+(d.speed.y<0?d.speed.y:0);this.x+=d.speed.x+(d.scroll.top<0&&!this.isBlocked.left)||(d.scroll.top>0&&!this.isBlocked.right)?d.scroll.top:0;this.isBlocked.down=true}if(g.bottom&&this.old.y>=d.old.y+d.height&&this.y<=d.y+d.height){if(this.isTreadable)this.beTreated();if(d.isPushable)d.speed.y+=this.speed.y;this.speed.y*=-d.bounce.bottom;this.y=d.y+d.height+(d.speed.y>0?d.speed.y:0);this.x+=d.speed.x+(d.scroll.bottom<0&&!this.isBlocked.left)||(d.scroll.bottom>0&&!this.isBlocked.right)?d.scroll.bottom:0;this.isBlocked.up=true}}if(this.y+this.height>d.y&&this.y<d.y+d.height){if(g.left&&this.old.x>=d.old.x+d.width&&this.x<=d.x+d.width){if(d.isPushable)d.speed.x+=this.speed.x;this.speed.x*=-d.bounce.left;this.x=d.x+d.width+(d.speed.x>0?d.speed.x:0);this.y+=d.speed.y+(d.scroll.left<0&&!this.isBlocked.up)||(d.scroll.left>0&&!this.isBlocked.down)?d.scroll.left:0;this.isBlocked.left=true}if(g.right&&this.old.x+this.width<=d.old.x&&this.x+this.width>=d.x){if(d.isPushable)d.speed.x+=this.speed.x;this.speed.x*=-d.bounce.right;this.x=d.x-this.width+(d.speed.x<0?d.speed.x:0);this.y+=d.speed.y+(d.scroll.right<0&&!this.isBlocked.up)||(d.scroll.right>0&&!this.isBlocked.down)?d.scroll.right:0;this.isBlocked.right=true}}if(this.type=="control"&&d.href){if(this.isTouch(d))this.reloadLink(d)}}if(this.x+this.width>f.window.width){if(f.window.loop.x){if(this.x>f.window.width)this.old.x=this.x=0}else{this.isBlocked.right=true;this.x=f.window.width-this.width;this.speed.x*=-f.window.bounce.right}this.y+=this.isBlocked.down||this.isBlocked.up?0:f.window.scroll.right}if(this.x<0){if(f.window.loop.x){if(this.x+this.width<0)this.old.x=this.x=f.window.width-this.width}else{this.isBlocked.left=true;this.x=0;this.speed.x*=-f.window.bounce.left}this.y+=this.isBlocked.down||this.isBlocked.up?0:f.window.scroll.left}if(this.y<0){if(f.window.loop.y){if(this.y+this.height<0)this.old.y=this.y=f.window.height-this.height}else{this.isBlocked.up=true;this.y=0;this.speed.y*=-f.window.bounce.top}this.x+=(f.window.scroll.top<0&&!this.isBlocked.left)||(f.window.scroll.top>0&&!this.isBlocked.right)?f.window.scroll.top:0}if(this.y+this.height>f.window.height){if(f.window.loop.y){if(this.y>f.window.height)this.old.y=this.y=0}else{this.isBlocked.down=true;this.y=f.window.height-this.height;this.speed.y*=-f.window.bounce.bottom}this.x+=(f.window.scroll.bottom<0&&!this.isBlocked.left)||(f.window.scroll.bottom>0&&!this.isBlocked.right)?f.window.scroll.bottom:0}};j.prototype.reloadLink=function(c){if(this.link==null){this.link=c;h.linkDetail.style.display="block";h.linkDetail.innerHTML=c.linkDetail||c.href}h.linkDetail.style.left=(this.x+this.width)+"px";h.linkDetail.style.top=(this.y+this.height)+"px"};j.prototype.changeImage=function(){var c=null;dif={};dif.x=this.x-this.old.x;dif.y=this.y-this.old.y;dif.sx=this.speed.x-this.old.sx;dif.sy=this.speed.y-this.old.sy;if(dif.y<0){if(dif.x>0)c=this.img.uright;else if(dif.x<0)c=this.img.uleft;else c=this.img.up}else if(dif.y>0){if(dif.x>0)c=this.img.dright;else if(dif.x<0)c=this.img.dleft;else c=this.img.down}else{if(dif.x>0)c=(dif.sx<0?this.img.bright:(this.img.now==this.img.right?this.img.right2:this.img.right));else if(dif.x<0)c=(dif.sx<0?(this.img.now==this.img.left?this.img.left2:this.img.left):this.img.bleft);else c=this.img.stop}if(c&&c!=this.img.now){this.img.now=c;this.elem.setAttribute("src",c)}};j.prototype.reload=function(){this.elem.style.left=Math.round(this.x)+"px";this.elem.style.top=Math.round(this.y)+"px"};j.prototype.kill=function(){h.room.removeChild(this.elem);this.isDeleted=true};j.prototype.beTreated=function(){this.limit=10;this.isDeleted=true;img=this.speed.x<0?this.img.tleft:this.img.tright;if(img)this.elem.setAttribute("src",img)};j.prototype.isTouch=function(c){return(Math.abs((this.x+this.width/2)-(c.x+c.width/2))<this.width/2+c.width/2&&Math.abs((this.y+this.height/2)-(c.y+c.height/2))<this.height/2+c.height/2)};function t(){h={room:document.getElementById("ALroom")||function(){var c=document.createElement("div");c.setAttribute("id","ALroom");document.getElementsByTagName("body")[0].appendChild(c);return c}(),linkDetail:document.getElementById("ALlinkDetail")||function(){var c=document.createElement("div");c.setAttribute("id","ALlinkDetail");c.style.position="absolute";document.getElementById("ALroom").appendChild(c);return c}(),help:document.getElementById("ALhelp")||function(){var c=document.createElement("div");c.setAttribute("id","ALhelp");document.getElementById("ALroom").appendChild(c);return c}(),helpToggle:document.getElementById("ALhelpToggle")||function(){var c=document.createElement("div");c.style.width="32px";c.style.height="32px";c.innerHTML="？";c.setAttribute("id","ALhelpToggle");document.getElementById("ALhelp").appendChild(c);return c}(),helpContent:document.getElementById("ALhelpContent")||function(){var c=document.createElement("div");c.style.position="absolute";c.innerHTML="↑：ジャンプ<br>→：右へ加速<br>←：左へ加速<br>↓：下に加速<br>スペース：リンク先へ飛ぶ";c.setAttribute("id","ALhelpContent");document.getElementById("ALhelp").appendChild(c);return c}()};h.helpContent.style.display="none";h.linkDetail.style.display="none";n(document,"keydown",function(c,d){var g=q(c);if(f.keyno[g]){i[f.keyno[g]]=true;r(c);false}});n(document,"keyup",function(c,d){var g=q(c);if(f.keyno[g]){i[f.keyno[g]]=false;r(c);false}});n(h.helpToggle,"mousedown",function(c,d){h.helpContent.style.display=(h.helpContent.style.display=="block"?"none":"block")})}function s(){h.room.style.width=f.window.width+"px";h.room.style.height=f.window.height+"px";o=setInterval(function(){for(var c=k.length;c>0;c--)k[c-1].move()},f.timerSpeed)}function u(){clearInterval(o);s()}function q(c){if(document.all)return event.keyCode;else if(document.getElementById)return(c.keyCode)?c.keyCode:c.charCode;else if(document.layers)return c.which}function r(c){try{if(!c.preventDefault)window.event.returnValue=false;else c.preventDefault()}catch(c){}}function n(c,d,g){if(c.addEventListener)c.addEventListener(d,function(e){g(e,this)},false);else if(c.attachEvent)c.attachEvent("on"+d,function(){g(null,event.srcElement)});else c["on"+d]=g}function m(c,d){for(var g in d){if(v(d[g])){if(c[g]==null)c[g]={};try{c[g]=m(c[g],d[g])}catch(e){}}else{c[g]=d[g]}}return c}function w(c){return c.constructor===Array}function v(c){return typeof c=="object"&&!w(c)}return{key:i,ini:f,def:p,items:k,elems:h,item:j,set:t,start:s,restart:u}}();