let express = require('express');
let url = require('url');

let app = express();
let convertor = require('converter');
let ai = require('ai');
 
app.use(express.static(__dirname + '/public')); // exposes index.html, per below
 
app.get('/request', function(req, res){
    req = url.parse(req.url);
    let param = req.query;
    if(param){
    	let name = url.parse(decodeURI(req.url),true).query.name; //解析参数为id的值
		if(name){
			let resp = run(name);
			res.send(resp));
		}
    }
});
 
app.listen(13579);



function run(name){
	convertor(name); //convert wav file to pcm.
	let res = ai(); //run ai process
	clear();//delete tmp pcm file
	return res;
}
