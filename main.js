
/* server define */
var restServer = require('restify').createServer();
restServer.listen(3001, function() {
	console.log('listening at ', restServer.name, restServer.url);
});



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
var eventList = [
{ 
    title: "関東Firefox OS勉強会 3rd ごった煮",
    dateFrom: "2014/02/01 19:00",
    dateTo: "2014/02/01 20:00",
    url: "http://www.zusaar.com/event/924003",
    description: "関東FirefoxOS勉強会の3回目です。 まだまだ登壇者募集中です！ 会場 シナジーカフェ GMO Yours 東京都渋谷区桜丘町26番1号　セルリアンタワー 11階 参加費 無料 入場方法 セルリアンタワーのロビー（エスカレーターを上ったところ）で受付"
},{ 
    title: "関西Firefox OS勉強会 1st",
    dateFrom: "2014/02/01 19:00",
    dateTo: "2014/02/01 20:00",
    url: "http://atnd.org/events/39457",
    description: "遂に開発機が発売されたFirefox OSについての勉強会です。技術的な内容はもちろんのこと、Keon、PeakやFirefox OSをインストールしたNexus Sを実際に触ってみたり、そこから感じられるFirefox OS、スマートフォンの未来を話せたらと思います。"
}];

var menberList =[{
	name: " User Name"
},{
	name: " User Name"
},{
	name: " User Name"
}];

var getEvents = function(req,res,next){
    res.send(JSON.stringify(eventList));
}
var getUsers = function(req,res,next){
	res.send(JSON.stringify(menberList));
}

var rPost = function(req,res,next){
	res.send(201,"post action!");
	return next();
}
var rSend = function(req,res,next){
	console.log('/get', req.params.XxxX);
	var param = req.params.XxxX;
	try{
		res.send(JSON.stringify({ p : param }));
	}catch(e){ 
		console.log('err:',e);
		res.send(JSON.stringify({err:"505 server error!"}));
	}
	//return next();
}

restServer.get('/events', getEvents);
restServer.get('/users', getUsers);


/* rest URI */
restServer.put('/get', rSend);
restServer.get('/get/:XxxX', rSend);
restServer.head('/get/:XxxX',rSend);
restServer.del('/get/:XxxX', rSend);
restServer.post('/hello', rPost);


