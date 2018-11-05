let express = require('express');
let url = require('url');
let fs = require('fs');

let app = express();
let converter = require('./converter');
let ai = require('./ai');
let vscodeController = require('./vscodeController');
 
app.use(express.static(__dirname + '/public')); // exposes index.html, per below
 
app.get('/request', function(req, res){
    setTimeout(()=>{
        req = url.parse(req.url);
        let param = req.query;
        if(param){
            let name = url.parse(decodeURI(req.path),true).query.name; //解析参数为id的值
            if(name){
                run(name).then((resp)=>{
                    clear(name);//delete tmp pcm file
                    res.send(resp);

                    if(resp.err_msg == 'success.' && resp.err_no==0){
                        let command = resp.result[0];
                        command = command.replace(/,/g, '');
                        command = command.replace(/，/g, '');
                        vscodeController.run(command);
                    }
                });
            }
        }
    },500)
    
});
 
app.listen(13579);



async function run(name){
        converter.run(name); //convert wav file to pcm.
        return await ai.run();
}

function clear(name){
    //delete voice.pcm
    let voicePath = 'voice.pcm';
    fs.unlinkSync(voicePath);
    fs.unlinkSync(name);
}
