// 451-455
		//Tweet Strings
		var comment = "&#12459;&#12540;&#12489;&#27604; " + cnt.C + ":" + cnt.I + ":" + cnt.S;
		deckurlplus = " http://aa1.versus.jp/revolt/?" + url_plus;
		$("#txttweet").val(comment);
		$("#tweetbase").css("display", "block");
		
// 458-481
// Twitter
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
	//&#12525;&#12464;&#20445;&#23384;
	if(Book.length == 50){
		booksave("T", Book.join(":"));
	}
}