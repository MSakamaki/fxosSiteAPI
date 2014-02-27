
/* server define */
var https = require('https');
var main_env = require('./.env');
var restServer = require('restify').createServer();
restServer.listen(3001, function() {
	console.log('listening at ', restServer.name, restServer.url);
});

/* settings */
var gcal_api = 'https://www.googleapis.com/calendar/v3/calendars/'+main_env.gcal_url+'/events?key=' + main_env.gcal_key;

/************************  REST Server *******************************/
restServer.use(
	/* cross Origin Option */
	function crossOrigin(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);

/* rest function */
var eventList = [{
    title: "FxOSコードリーディングミートアップ #5",
    dateFrom: "2014/03/14 19:30",
    dateTo: "2014/03/14 22:00",
    url: "http://atnd.org/events/47848",
    description: "2014年3月の「FxOSコードリーディングミートアップ #5」を開催します。"
},{
    title: "Firefox OS大喜利ハッカソン",
    subtitle: "Twitter APIを使ってみよう",
    dateFrom: "2014/03/15 09:30",
    dateTo: "2014/03/15 19:00",
    url: "http://atnd.org/events/47933",
    description: "ちょっぴり新春 Firefox OS ハッカソンから2ヶ月、そろそろハッカソンがしたくなる季節ですね。\n\n今回のお題は「Twitter APIを使う」。先日のFirefox OS勉強会 6thで作成したTwitterクライアントを改良するもよし、新しくアプリを作るもよし。\n(もちろん、まったく関係ないものを書いても構いません。)"
},{
    title: "Gecko勉強会 その3",
    subltitle: "ブラウザの仕組みを教わった上で、サクサク動くWebアプリの作り方を話し合う会",
    dateFrom: "2014/03/05 19:30",
    dateTo: "2014/03/05 21:30",
    url: "http://atnd.org/events/47662",
    description: "今回のテーマは「サクサク動くWebアプリの作り方」\n前半はMozilla Japanの @makoto_kato さんよりFirefoxの2D描画の仕組みをご紹介いただき、後半は「サクサク動くHTMLアプリの作り方」をテーマに参加している皆さんを交えてフリーディスカッションを行います。"
},{
    title: "FxOSコードリーディングミートアップ＃４",
    dateFrom: "2014/02/22 13:00",
    dateTo: "2014/02/22 18:00",
    url: "http://atnd.org/event/fxoscodereading4",
    description: "早くも四回目になりました\n\nFirefox OSはギークにリーチする端末にすると発表されて俄然ガジェオタ的に盛り上がってきましたよね！\n日本での発売は楽しみですがそれを待つまでもなくFxOSは触れます。今日もどこかでガジェット好きのみんながFxOSを触ってます。この機にちょっと中身も見てみませんか？"
}];

var getEvents = function(req,res,next){
    res.send(JSON.stringify(eventList));
}

var getGcalEvents = function(req,res,next){
    console.log(gcal_api);
    // 
  try{
    https.get(gcal_api, function(gcal_res) {
    var data='';
    console.log("statusCode: ", gcal_res.statusCode);
    gcal_res.on('data', function (chunk){
        var decoded_data = chunk.toString('utf8');
        data += decoded_data;
    });

    gcal_res.on('end',function(){
        console.log("end");
        try{
            res.send(JSON.parse(data));
        }catch(e){console.log(e);}
    });

    }).on('error', function(e) {
      console.log("Got error: ", e.message);
    });
  }catch(e){console.log(e);}
}


restServer.get('/events', getEvents);
restServer.get('/events/gcal', getGcalEvents);
