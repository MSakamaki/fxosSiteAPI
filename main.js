
/* server define */
var mongoose = require('mongoose'),
    restServer = require('restify').createServer();
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
var eventlist = [{
	name: "FxOSミートアップ #4",
	date: "yyyy-mm-dd",
	ditail: "説明 4"
},{
	name: "FxOSミートアップ #5",
	date: "yyyy-mm-dd",
	ditail: "説明 5"
},{
	name: "FxOSミートアップ #6",
	date: "yyyy-mm-dd",
	ditail: "説明 6"
}];

var menberList =[{
	name: " User Name"
},{
	name: " User Name"
},{
	name: " User Name"
}];

var getEvents = function(req,res,next){
	res.send(JSON.stringify(eventlist));
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


/*************************** mongo DB ***************************/
var db = mongoose.connect('mongodb://localhost/readfxos');

var fxosSite = new mongoose.Schema({ key: String, value: String });
var fxosEvent = db.model('fxosEvent', fxosSite);


var dbUpd = function(address, keyg){
    fncSect(address, function(){
        console.log('update', address, keyg);
        model.update(
            {"address": address},
            {$set : {keyg : keyg }},
            { upsert : false , multi : false},
            function(err){ 
                if(err){ console.log('heUpd err:',err);}
            }
        );
    }, function() {
        console.log('insert', address, keyg);
        var mdl = new model();
        mdl.address=address;
        mdl.keyg=keyg;
        mdl.save(function(err){ if(err){ console.log('err', err);} });
    });
}
var fncSect = function(address, updfnc, insfnc){
    console.log('fncSect');
    model.find({"address": address}, function(err,item){
        console.log('fncSect-001',err,item);
        if(err || item===null){return;}
        if(item.length){
            updfnc();
        }else{
            insfnc();
        }
        show();
    });
}

/* db base */
var shows = function(){
    model.find({}, function(err, item){
        item.forEach(function(lst){
            console.log('address:',lst.address, 'keyg:', lst.keyg, 'JSON:', lst);
        });
    });
}
var getGdata=function(fnc){
    model.find({}, function(err, item){
        fnc(item);
    });
}
var deleteAllGdata=function(){
    model.remove({}, function(err){
        console.log('err:', err);
    });
}

/* utill*/
var keygen = function(n, b) {
    b = b || '';
    var a = 'abcdefghijklmnopqrstuvwxyz'
        + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        + '0123456789'
        + b;
    a = a.split('');
    var s = '';
    for (var i = 0; i < n; i++) {
        s += a[Math.floor(Math.random() * a.length)];
    }
    return s;
};