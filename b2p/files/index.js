var CCOLOR = {CN:"無",CF:"火",CA:"水",CE:"地",CW:"風",IT:"道",IP:"武",IO:"防",IR:"巻",SG:"瞬",SL:"瞬",SX:"呪",SY:"呪",SZ:"呪"}
var CTYPE = {C:"クリーチャー",I:"アイテム",S:"スペル"}
var Book = [];
var Fav = [];
var exmode = false;
var xline = 6;
var urlflg = false;
var deckurlplus = '';
//初期処理だよ
$(document).ready(function(){
	//カード情報取得
	SetCardData();
	Cards.forEach(function(val,idx,arr){
		$("#cardlist").append(CreateBtn(val.id, "set"));
	});
	$("#tweetbase").click(function(){$("#tweetbase").css('display',"none");});
	$("#tweetframe").click(function(){return false;});
	if(localStorage.favcards){
		Fav = localStorage.favcards.split(",");
	}
	//OS判定
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		if (confirm("PHONE用ページに移動しますか？")){
			location.href = "iphone.htm";
		}
	} else {
		//placeholder
		var rnd = Math.floor(Math.random() * 400);
		if(rnd >= 1 && rnd <= 20){
			$("#txtsearch").attr("placeholder", "キーワード検索 !スペース区切りでアンド検索");
		}
		if(rnd >= 21 && rnd <= 40){
			$("#txtsearch").attr("placeholder", "キーワード検索 !カードリストクリックで追加");
		}
		if(rnd >= 41 && rnd <= 60){
			$("#txtsearch").attr("placeholder", "キーワード検索 !デッキリストクリックで減少");
		}
		if(rnd >= 61 && rnd <= 80){
			$("#txtsearch").attr("placeholder", "キーワード検索 !カードリスト右クリックで減少");
		}
		if(rnd >= 101 && rnd <= 110){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「book」 選択カードのみ表示");
		}
		if(rnd >= 111 && rnd <= 120){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「NSR」レアリティ選択");
		}
		if(rnd >= 121 && rnd <= 130){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「fav」 お気に入りのみ表示");
		}
		if(rnd >= 131 && rnd <= 140){
			$("#txtsearch").attr("placeholder", "キーワード検索 !右クリックで★お気に入り");
		}
		if(rnd >= 141 && rnd <= 150){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「st=40 hp=40」でミノとか");
		}
		if(rnd >= 151 && rnd <= 160){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「st>60」でST60以上だ");
		}
		if(rnd >= 161 && rnd <= 170){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「クリーチャー」でクリーチャー");
		}
		if(rnd >= 171 && rnd <= 180){
			$("#txtsearch").attr("placeholder", "キーワード検索 !「火水」で火と水クリーチャー");
		}
		if(rnd >= 301 && rnd <= 302){
			$("#txtsearch").attr("placeholder", "「League of Legends」はGoogleで検索");
		}
		if(rnd >= 303 && rnd <= 304){
			$("#txtsearch").attr("placeholder", "「Hearthstone」はGoogleで検索");
		}
		if(rnd >= 305 && rnd <= 306){
			$("#txtsearch").attr("placeholder", "「Hearthstone」はGoogleで検索");
		}
		console.log(navigator.userAgent);
	}
	//初期表示判定
	var urlParam = location.search.substring(1);
	if(urlParam){
		for(var i=0; i<=49; i++){
			if(urlParam.substr(i*2, 2)){
				Book.push(N2N4(urlParam.substr(i*2, 2)));
			}
		}
		$("#txtsearch").val('book');
		DispSearch();
		DispBook();
	}
});
//クリック操作
function SetBook(id){
	if(Book.length < 50){
		var finds = $.grep(Book, function(val, idx){
			return (val == id);
		});
		if(finds.length < 4){
			var count = finds.length + 1;
			$("#count"+id).html(count);
			Book.push(id);
			DispBook();
		}
		if(Book.length == 50){
			//ログ保存
			booksave("A", Book.join(":"));
		}
	}
}
function DelBook(id){
	var idx = Book.indexOf(id);
	if(idx >= 0){
		//Book
		Book[idx] = null;
		Book = Book.filter(function(val,idx,arr){
			return(val != null)
		});
		//List
		var finds = $.grep(Book, function(val, idx){
			return (val == id);
		});
		if(finds.length == 0){
			$("#count"+id).empty();
		}else{
			$("#count"+id).html(finds.length);
		}
		//再表示
		DispBook();
		if(Book.length == 49){
			//登録使用不可
			$("#entrybtn").disabled = true;
		}
	}else{
		if(Fav.includes(id)){
			Fav = Fav.filter(function(val,idx,arr){return (val != id);});
		}else{
			Fav.push(id);
		}
		var card = Cards.find(function(val, idx, arr){return (val.id == id)});
		if(Fav.includes(id)){
			$('#cname'+id).html("★"+card.name);
		}else{
			$('#cname'+id).html(card.name);
		}
		//localStorageに保存だよ
		localStorage.favcards = Fav.join(",");
	}
}
//カード一覧
function DispCardlist(flg){
	$("#txtsearch").val("");
	$("#cardlist").empty();
	Cards.forEach(function(val,idx,arr){
		switch(flg) {
		case "C":
		case "I":
		case "S":
			if (val.type != flg) {
				return false
			}
			break;
		case "CN":
		case "CF":
		case "CA":
		case "CE":
		case "CW":
		case "IP":
		case "IO":
		case "IT":
		case "IR":
		case "SG":
		case "SL":
		case "SX":
		case "SY":
		case "SZ":
			if (val.color != flg) {
				return false;
			}
			break;
		}
		$("#cardlist").append(CreateBtn(val.id, "set"));
	});
}
//検索表示
function DispSearch() {
	var txt = $("#txtsearch").val();
	var words, cmds;
	var hit, pass;
	var cmdcomp = false;
	if (txt.length > 0) {
		//クリア
		$("#cardlist").empty();
		//コマンド解析
		words = txt.split(" ");
		if(["simu","test","log","net","send","post"].includes(words[0])){
			//特殊コマンド
			switch(words[0]){
			case "simu": //ドローシミュレート
				Book.forEach(function(val,idx,arr){
					$("#cardlist").append(CreateBtn(val, "simu"));
				});
				cmdcomp = true;
				break;
			case "test": //出力テスト
				TestPng();
				cmdcomp = true;
				break;
			case "log": //ログ表示
				booklist();
				cmdcomp = true;
				break;
			case "net":
				//PUBNUB
				publish();
				cmdcomp = true;
				break;
			case "send": //PUBNUB
				if(Book.length == 50 && words.length >= 2 && words[1].length == 4){
					pubnubsend("book", {book:Book.join(":"), pass:words[1]});
					cmdcomp = true;
				}
				break;
			case "post": //PUBNUB
				if(words.length >= 2 && words[1].length == 4){
					room = words[1];
					$("#roomid").remove();
					var btn = $("<button>");
					btn.html("〒"+room);
					btn.attr("id", "roomid");
					btn.addClass("post");
					$("#menu").append(btn);
					cmdcomp = true;
				}
				break;
			}
			if(cmdcomp){
				$("#txtsearch").val("");
			}
		}else{
			//通常検索体系
			Cards.forEach(function(card, idx, arr) {
				hit = 0;
				pass = 0;
				words.forEach(function(word, idx, arr){
					//比較式
					if(cmds = /(st|hp|cost)([/</>/=])(\d+)/.exec(word)){
						if(["st","hp"].includes(cmds[1]) && card.type != "C"){
							pass++;
						}else{
							var cmd = card[cmds[1]]+cmds[2]+"="+cmds[3];
							if(eval(cmd)){
								hit++;
							}else{
								pass++;
							}
						}
					}else{
						switch(true){
						case word == "":
							break;
						case /[無火水地風]+/g.test(word):
							var re = new RegExp("["+word+"]");
							if(re.test(CCOLOR[card.color])){
								hit++;
							}else{
								pass++;
							}
							break;
						case /[NSR]+/g.test(word):
							var re = new RegExp("["+word+"]");
							if(re.test(card.rare)){
								hit++;
							}else{
								pass++;
							}
							break;
						case ["クリーチャー","アイテム","スペル"].includes(word):
							if(CTYPE[card.type] == word){
								hit++;
							}else{
								pass++;
							}
							break;
						case word == "ex":
							exmode = true;
							break;
						case word == "book": //[検索]ブック内存在
							if(Book.includes(card.id)){
								hit++;
							}else{
								pass++;
							}
							break;
						case word == "★":
						case word == "fav": //[検索]★
							if(Fav.includes(card.id)){
								hit++;
							}else{
								pass++;
							}
							break;
						default: //[検索]キーワード一致
							if(card.keyword.split(":").includes(word)) {
								hit++;
							}else{
								if(card.name.indexOf(word) >= 0){
									hit++;
								}else{
									pass++;
								}
							}
						}
					}
				});
				if(hit > 0 && pass == 0){
					$("#cardlist").append(CreateBtn(card.id, "set"));
				}
			});
			exmode = false;
		}
	}
}
function ClearSearch(){
	//ESC
	if(event.keyCode == 27){
		$("#txtsearch").val("");
		$("#cardlist").empty();
	}
}
//
function CreateBtn(id, flg){
	var card = Cards.find(function(val, idx, arr){return (val.id == id)});
	var btn = $('<div>');
	btn.addClass("card");
	btn.css("background-image", "url('images/"+card.img+".jpg')");
	if(flg == "set"){
		btn.attr("id",card.id);
	}
	if(flg == "simu"){
		btn.css("order", Math.floor(Math.random()*999999));
	}
	//カード名
	var cname = $('<div>');
	cname.addClass("cname");
	if(Fav.includes(id)){
		cname.html("★"+card.name);
	}else{
		cname.html(card.name);
	}
	if(flg == "set"){
		cname.attr("id","cname"+card.id);
	}
	btn.append(cname);
	//枚数
	var count = $('<div>');
	count.addClass("count");
	if(flg == "set"){
		count.attr("id", "count" + card.id);
		var finds = $.grep(Book, function(val, idx){
			return (val == card.id);
		});
		if(finds.length > 0){
			count.html(finds.length);
		}
	}
	btn.append(count);
	//EX MODE
	var ability = $('<div>');
	ability.addClass("ability");
	if(exmode){
		if(card.keyword != ""){
			var words = card.keyword.split(":");
			words.forEach(function(val,idx,arr){
				ability.append($('<div>').html(val));
			});
		}
		if(card.type == "C"){
			ability.append($('<div>').html(card.st+" / "+card.hp))
		}
	}
	btn.append(ability);
	if(flg == "set"){
		btn.click(function () {
			SetBook(card.id)
		});
		btn.contextmenu(function () {
			DelBook(card.id);
			return false;
		});
	}
	return btn;
}
//ブック表示
function DispBook(){
	$("#bookline").empty();
	Book.sort();
	Book.forEach(function(val, idx, arr){
		$("#bookline").append(CreateListLine(val));
	});
}
function CreateListLine(id){
	var card = Cards.find(function(val, idx, arr){return (val.id == id)});
	var btn = $('<div>'+card.name+'</div>');
	btn.addClass("cardline");
	var btncolor = "CN";
	switch(card.type){
	case "C":
		btncolor = card.color;
		break;
	case "I":
	case "S":
		btncolor = card.type;
		break;
	}
	btn.addClass("btn"+btncolor);
	btn.click(function(){DelBook(card.id)});
	return btn;
}
//イメージ処理
function CreateBookImage() {
	if(Book.length < 1){
		alert("1枚くらいは選択してからどうぞ");
	}else {
		var BookImg = [];
		var url_plus = '';
		var cnt = {"C": 0, "I": 0, "S": 0}
		//ブック圧縮
		Book.forEach(function (val, idx, arr) {
			if (BookImg.findIndex(function (card, idx, arr) {
					return (val == card.id);
				}) == -1) {
				BookImg.push({
					id: val, cnt: Book.filter(function (val2, idx, arr) {
						return (val == val2);
					}).length
				});
			}
		});
		//Canvasサイズ
		var cvs = document.getElementById("cvsbook");
		cvs.height = Math.floor((BookImg.length + (xline - 1)) / xline) * 100;
		//イメージ描き込み
		BookImg.forEach(function (val, idx, arr) {
			IMGWRITE(val.id, val.cnt, (idx % xline), Math.floor(idx / xline));
		});
		//カード枚数
		Book.forEach(function (val, idx, arr) {
			var card = Cards.find(function (val2, idx, arr) {
				return (val2.id == val)
			});
			cnt[card.type] += 1;
			url_plus += N4N2(card.id);
		});
		//Tweet Strings
		var comment = "カード比 " + cnt.C + ":" + cnt.I + ":" + cnt.S;
		deckurlplus = " http://aa1.versus.jp/revolt/?" + url_plus;
		$("#txttweet").val(comment);
		$("#tweetbase").css("display", "block");
	}
}
//ついーと
function Tweet(){
	var cvs = document.getElementById("cvsbook");
	var png = cvs.toDataURL('image/png');
	var sendimg = png.split(",")[1];
	var comment = $("#txttweet").val();
	if(urlflg == true){
		comment += deckurlplus;
	}
	//localStrage
	localStorage.sendpng = sendimg;
	localStorage.comment = comment;
	//Twitter
	if(localStorage.twky1){
		$.post("tweet.php",{u1:localStorage.twky1, u2:localStorage.twky2, png:sendimg, cmt:comment});
	}else {
		window.open("twoauth.php", "new");
	}
	$("#tweetbase").css("display", "none");
	//ログ保存
	if(Book.length == 50){
		booksave("T", Book.join(":"));
	}
}
function deckurl(){
	if(urlflg == false){
		$("#deckurl").css("color","#0084B4");
		urlflg = true;
	}else{
		$("#deckurl").css("color","#cccccc");
		urlflg = false;
	}
}
//出力テスト
function TestPng() {
	$("#workground").css("display","block");
	var BookImg = [];
	//ブックデータ
	Book.forEach(function(val, idx, arr){
		if(BookImg.findIndex(function(card,idx,arr){return(val==card.id);}) == -1){
			BookImg.push({id:val, cnt:Book.filter(function(val2,idx,arr){return(val==val2);}).length});
			console.log(val+":"+Book.filter(function(val2,idx,arr){return(val==val2);}).length);
		}
	});
	var cvs = document.getElementById("cvsbook");
	cvs.height = Math.floor((BookImg.length + (xline - 1)) / xline) * 100;

	BookImg.forEach(function(val, idx, arr){
		IMGWRITE(val.id, val.cnt, (idx % xline), Math.floor(idx / xline));
	});
}
//ストレージ関連
function booksave(mark, bookdata){
	var date = new Date();
	var format = 'YYYYMMDDhhmmss';
	format = format.replace(/YYYY/g, date.getFullYear());
	format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
	format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
	format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
	format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
	format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	var savename = "book"+mark+format;
	for(var i=0; i<localStorage.length; i++){
		if(localStorage.getItem(localStorage.key(i)) == bookdata){
			localStorage.removeItem(localStorage.key(i));
		}
	}
	//
	localStorage.setItem(savename, bookdata);
}
function bookload(bookdata){
	Book = bookdata.split(":");
	$("#txtsearch").val("");
	DispBook();
}
//ブック表示
function booklist(){
	$("#bookline").empty();
	for(var i=0; i<localStorage.length; i++){
		if(localStorage.key(i).substring(0, 4) == "book"){
			var btn = CreateBook(localStorage.key(i));
			$("#bookline").append(btn);
		}
	}
}
function CreateBook(key){
	var sort = ["CN","CF","CA","CE","CW","I","S"];
	var count = {CN:0, CF:0, CA:0, CE:0, CW:0, I:0, S:0, ALL:0}
	var color = {CN:"#CCCCCC",CF:"#880000",CA:"#000088",CE:"#008800",CW:"#CC6600",I:"#666666",S:"#880088"}
	var totalparcent = 0;
	var parcent = 0;
	var spacer = "";
	var colorbar = "";
	var btn = $('<div>'+key.substring(4)+'</div>');
	btn.addClass("bookline");
	//カウント
	var book = localStorage.getItem(key).split(":");
	book.forEach(function(bcard,idx,arr){
		var card = Cards.find(function(val, idx, arr){return (val.id == bcard)});
		if(card.type == "C") {
			count[card.color] += 1;
		}else{
			count[card.type] += 1;
		}
		count.ALL += 1;
	});
	//背景生成
	var data = book.join(":");
	sort.forEach(function(val,idx,arr){
		if(count[val] >= 1){
			parcent = totalparcent + (count[val] / count.ALL) * 100;
			colorbar += spacer+color[val]+" "+totalparcent+"%,"+color[val]+" "+parcent+"%";
			spacer = ",";
			totalparcent = parcent;
		}
	});
	btn.mouseover(function(){bookpreview(data)});
	btn.click(function(){bookload(data)});
	btn.css("background","linear-gradient(to right,"+colorbar+")");
	//戻し
	return btn;
}
function bookpreview(bookdata){
	$("#cardlist").empty();
	var book = bookdata.split(":");
	book.forEach(function(val,idx,arr){
		$("#cardlist").append(CreateBtn(val,"prev"));
	});
}
//PosseにPOST
function PostPosse(){
	if(Book.length < 50){
		alert("50枚選択してからどうぞ");
	}else{
		var url = "http://www.revoltposse.net/books/new_via_adu?book[data]=";
		var book = Book.join(":");
		//Twitter
		window.open(url+book, "new");
		//ログ保存
		if(Book.length == 50){
			booksave("P", book);
		}
	}
}
//ページジャンプ
function Rank2Png(){
	window.open("https://t.co/LPcEGc3EfT", "new");
}
function Discord(){
	window.open("https://discord.gg/3Nfp4b7", "new");
}
//イメージ処理
function IMGWRITE(id, cnt, x ,y) {
	var card_w = 80;
	var card_h = 100;
	var card = Cards.find(function (val, idx, arr) {
		return (val.id == id)
	});
	var canvas = document.getElementById('cvsbook');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.onload = function(){
		//文字
		//if(cnt >= 2){
		//	for(var i=1; i<=cnt-1; i++){
		//		ctx.fillStyle = 'rgba(32, 32, 32, 0.7)';
		//		ctx.fillRect(x * card_w + 2 * i, y * card_h + 1 * i, 77, 97);
		//	}
		//}
		//画像を描画
		ctx.drawImage(img, x * card_w, y * card_h, 77, 97);
		//文字
		if(cnt >= 2){
			//文字枠
			ctx.fillStyle = 'rgba(32, 32, 32, 0.7)';
			ctx.fillRect(x * card_w + 51, y * card_h + 76, 24, 12);
			//文字
			ctx.font = "bold 24px Noto Sans JP";
			ctx.fillStyle = '#ffffff';
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 4;
			ctx.lineJoin = 'round';
			ctx.strokeText(cnt, x * card_w + 56, y * card_h + 90);
			ctx.fillText(cnt, x * card_w + 56, y * card_h + 90);
		}
	}
	img.src = "images/" + card.img + ".jpg";
}
//コード変換機
function N2N4(n2){
	var grpN = ['A','B','C','D','E','G','H'];
	var grpC = [44,48,48,48,48,75,133];
	var alpha = "0abcdefghijklmnopqrstuvwx"; //25進
	var num10 = 0;
	var grp10 = 0;
	var retCode = '';
	//10進
	num10 += 25 * alpha.indexOf(n2.substr(0,1));
	num10 += alpha.indexOf(n2.substr(1,1));
	//リスト比較
	for(var i=0; i<=6; i++){
		if(grp10 + grpC[i] >= num10){
			retCode += grpN[i];
			retCode += (`000${num10 - grp10}`).slice(-3);
			return retCode;
			break;
		}
		grp10 += grpC[i];
	}
}
function N4N2(n4){
	//var grpN = {A:29,B:48,C:48,D:48,E:48,G:75,H:133}
	var grpN = ['A','B','C','D','E','G','H'];
	var grpC = [44,48,48,48,48,75,133];
	var alpha = "0abcdefghijklmnopqrstuvwx"; //25進
	var num10 = 0;
	var retCode = '';
	//リスト比較
	for(var i=0; i<=6; i++){
		if(grpN[i]==n4.substr(0,1)){
			num10 += Number(n4.substr(1,3));
			break;
		}
		num10 += Number(grpC[i]);
	}
	retCode += alpha.substr(Math.floor(num10/25), 1);
	retCode += alpha.substr(num10 % 25, 1);
	return retCode;
}