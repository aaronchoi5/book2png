/**
 * Created by LESANCE on 2016/08/17.
 */
var Pubnub;
var uuid = "";
var room = "";
//定義
function publish() {
	Pubnub = PUBNUB({
		publish_key : 'pub-c-bf20d32e-261c-4788-ab6e-2b255f78cf60',
		subscribe_key : 'sub-c-832e50ce-6442-11e6-9d13-0619f8945a4f'
	})
	Pubnub.subscribe({
		channel : "book2png",
		message : function(msg, env){
			pubnubcmd(msg);
		},
		connect : function(){
			console.log("connect");
			uuid = Pubnub.uuid();
			console.log(uuid);
		}
	});
}
function pubnubsend(cmd, opt) {
	Pubnub.publish({
		channel : "book2png",
		message : JSON.stringify({uuid:uuid, cmd:cmd, opt:opt})
	});
}
function pubnubcmd(msg){
	var msgs = JSON.parse(msg);
	if(msgs.uuid != uuid){
		switch(msgs.cmd){
		case "book":
			if(room == msgs.opt.pass){
				booksave("P", msgs.opt.book);
				$("#roomid").remove();
			}
		}
	}
	console.log(msgs.cmd);
	console.log(msgs.opt);
}