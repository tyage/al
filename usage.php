<?php
$title = "使い方";
require_once("/home/tyage/www/header.php");
?>

<div id="explain">

ダウンロードした後に、下の3つを設定してください。

<ul>
	<li><a href="#html">HTML</a></li>
	<li><a href="#css">CSS</a></li>
	<li><a href="#js">JavaScript</a></li>
</ul>

<h4>例</h4>
<textarea cols="100" rows="25">
<div id="ALroom" style="position:relative;border:1px solid #000000;"></div>

<script type="text/javascript" src="http://tyage.sakura.ne.jp/js/action.js"></script>
<script type="text/javascript"><!-- 
AL.set();

AL.def.type = "block";
AL.def.isPushable = false;
AL.def.elem = {
  style : {
    backgroundColor : "#000000"
  }
};
new AL.item({
  y : 300,
  x : 300,
  width : 100,
  height : 30
});
new AL.item({
  y : 200,
  x : 500,
  width : 100,
  height : 100
});
new AL.item({
  y : 100,
  x : 200,
  width : 150,
  height : 50
});

new AL.item({
  type : "elevator",
  x : AL.ini.window.width - 120,
  y : AL.ini.window.height - 50,
  width : 100,
  height : 20,
  baseSpeed : {y : 5},
  max : {y : AL.ini.window.height - 50},
  min : {y : 50}
});

new AL.item({
  type : "control",
  width : 32,
  height : 32,
  baseSpeed : {
    x : 1,
    jy : 40,
    gy : 3,
    rx : 1/2,
    ry : 1/2
  },
  img : {
    stop : "http://tyage.sakura.ne.jp/img/masao/stop.gif",
    left : "http://tyage.sakura.ne.jp/img/masao/left.gif",
    right : "http://tyage.sakura.ne.jp/img/masao/right.gif"
  },
  elem : {
    style : {
      backgroundColor : "transparent"
    }
  },
  isPushable : true
});

AL.start();
 --></script>
</textarea><br>

<br>

<h2><a name="html">HTML</a></h2>
<pre>
以下のように読み込むだけでもいいですが、ヘルプなどを少し変えることも出来ます。
</pre>
<textarea cols="100" rows="2">
<script type="text/javascript" src="AL.js"></script>
</textarea>
<br>
<br>
<pre>
例えば、ヘルプを画像に変えて、ヘルプの内容も変えたいときはこのようにします。
</pre>
<textarea cols="100" rows="5">
<div id="ALroom">
  <div id="ALhelp">
    <img src="help.gif" id="ALhelpToggle">
    <div id="ALhelpContent">
      ヘルプ内容
    </div>
  </div>
</div>
</textarea>
<br>

<h2><a name="css">CSS</a></h2>
<pre>
CSSでデザインをまとめて設定できます。
</pre>
<textarea cols="100" rows="10">
/* 部屋全体 */
#ALroom{}

/* アイテム */
.ALitem{}

/* リンク詳細 */
#ALlinkDetail{}

/* ヘルプ */
#ALhelp{}

/* ヘルプトグル */
#ALhelpToggle{}

/* ヘルプの内容 */
#ALhelpContent{}
</textarea>
<br>
<h4>例</h4>
<textarea cols="100" rows="10">
#ALroom{
	position : relative;/* またはposition:absoluteとすることで部屋の中で移動するようになる。 */
	margin-left : auto;
	margin-right : auto;
	border : solid 3px #000000;
	background : #efefff;
	padding : 0px;
}
#ALroom .ALitem{
	z-index : 2;
	cursor : pointer;
}
#ALlinkDetail,#ALhelpContent{
	z-index : 3;
	border : solid 2px #9966ff;
	background : #eeeeee;
	padding : 5px;
}
</textarea>
<br>
<br>

<h2><a name="js">JavaScript</a></h2>
<br>

<h3>基本</h3>
<textarea cols="100" rows="5">
//初期設定
AL.set();

//スタート
AL.start();
</textarea><br>
<table>
<caption>ALオブジェクトのプロパティ、メソッド一覧</caption>
<thead><tr><th>名前</th><th>説明</th></tr></thead>
<tbody>
<?php
	$al = array("key" => "設定したキーが押されているか","ini" => "全体の設定","def" => "アイテムのデフォルト値","items" => "アイテム一覧","elems" => "ヘルプや部屋全体などの要素","item()" => "アイテム生成関数","set()" => "キーコードを取得したり、要素を生成したりする","start()" => "実際にキャラが動き出す","restart()" => "タイマーを設定しなおしたり、全体の大きさを変える時に使う");
	foreach($al as $key => $value){
		print "<tr><td>{$key}</td><td>{$value}</td></tr>";
	}
?>
</tbody>
</table>
<br>
<br>

<h3>全体の設定の変更</h3>

<pre>
AL.iniオブジェクトを変更することで変更できます。
AL.ini.window.width、AL.ini.window.height、AL.ini.timerSpeedは変更後にAL.restart()する必要があります。
</pre>
<h4>例</h4>
<textarea cols="100" rows="5">
//横にループさせる
AL.ini.loop.x = true;

//下についてもバウンドさせない
AL.ini.window.bounce.bottom = 0;
</textarea><br>
<br>

<pre>
AL.iniは以下のようになっています。
値はデフォルト値です。
</pre>
<textarea cols="100" rows="20">
AL.ini = {
  timerSpeed : 50, //タイマーのスピード（ミリ秒）
  //上下左右に対応するキーコード
  keyno : {
    37 : "left",
    38 : "up",
    39 : "right",
    40 : "down",
    32 : "space"
  },
  //表示画面に関するデータ
  window : {
    width : 750, //幅
    height : 500, //高さ
    //壁に当たったときの跳ね返り率
    bounce : {
      top : 0.5,
      right : 0.5,
      bottom : 0.5,
      left : 0.5
    },
    //壁に当たったときにどれだけスクロールさせるか
    //（top,bottomだと左、right,leftだと下向きが正）
    scroll : {
      top : 0,
      right : 0,
      bottom : 0,
      left : 0
    },
    //ループするか
    loop : {
      x : false,
      y : false
    }
  }
};
</textarea>
<br>
<br>

<h3>アイテムの追加</h3>
<pre>
AL.set()をした後に行ってください。

new AL.item()を実行することでキャラを生成できます。
引数にオブジェクトを渡すことで設定ができます。
生成した後でも設定できます。
また、生成したキャラ,ブロック,リンクの要素は、生成した要素のelemプロパティで参照できます。
</pre>
<h4>例</h4>
<textarea cols="100" rows="10">
AL.item({
	x:200,
	y:300,
	width:32,
	height:32,
	img : {
		stop : "chara.gif"
	}
});
</textarea><br>
<br>

<pre>
アイテム作成時に設定できる内容は以下のようになります。
値はデフォルト値です。
デフォルト値はAL.defで変更できます。
</pre>	
<textarea cols="100" rows="50">
AL.def = {
  x : "rand", //右上からのpx単位での距離（"rand"だとランダム）
  y : "rand", //右上からのpx単位での距離（"rand"だとランダム）
  width : 32, //幅
  height : 32, //高さ
  link : null, //リンク先
  linkDetail : null, //リンク先の説明
  jumpRate : 20, //どれくらいの確率でジャンプするか（高いほどジャンプする確率が低い）
  content : "", //表示する文字（imgが設定されている場合は表示されない）
  limit : -1, //あと何更新で消すか（負の場合は消さない）
  isTreadable : false, //他のキャラから踏みつけられると消えるか
  isDeletable : false, //クリックすると消えるか
  isPushable : true, //他のキャラから押されると動くか
  //動ける最大の座標
  max : {
    x : 0,
    y : 0
  },
  //動ける最小の座標
  min : {
    x : 0,
    y : 0
  },
  //基本となるスピード
  baseSpeed : {
    x : 0, //横向きのスピード
    y : 0, //縦向きのスピード
    jx : 0, //横にジャンプするときのスピード
    jy : 0, //縦にジャンプするときのスピード
    gx : 0, //横向きの重力
    gy : 0, //縦向きの重力
    rx : 0, //横向きの空気抵抗
    ry : 0 //縦向きの空気抵抗
  },
  //最大スピード
  maxSpeed : {
    x : 0,
    y : 0
  },
  //最小スピード
  minSpeed : {
    x : 0,
    y : 0
  },
  //現在のスピード
  speed : {
    x : 0,
    y : 0
  },
  //ぶつかってきた物体の跳ね返らせ率
  bounce : {
    top : 1/2,
    right : 1/2,
    bottom : 1/2,
    left : 1/2
  },
  //ぶつかってきた物体をどれだけスクロールさせるか
  scroll : {
    top : 0,
    right : 0,
    bottom : 0,
    left : 0
  },
  //画像
  img : {
    now : null, //現在
    stop : null, //停止
    up : null, //ジャンプ
    right : null, //右に移動
    right2 : null, //右に移動二つ目（rightと交互に表示）
    down : null, //落下
    left : null, //左に移動
    left2 : null, //左に移動二つ目（leftと交互に表示）
    uleft : null, //左向きにジャンプ
    uright : null, //右向きにジャンプ
    dleft : null, //左向きに落下
    dright : null, //右向きに落下
    bleft : null, //左に移動しながら減速
    bright : null, //右に移動しながら減速
    tleft : null, //左を向きながら踏み潰される
    tright : null //右を向きながら踏み潰される
  },
  elem : {}, //DOMを使った要素の設定
  isBlockable : ["top","right","bottom","left"] //他のキャラがぶつかったときに、ブロックする場所
}
</textarea>
<br>

</div>
<?php require_once("/home/tyage/www/footer.php"); ?>