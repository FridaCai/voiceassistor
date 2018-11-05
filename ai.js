const voicePath = ''


// 设置APPID/AK/SK
var APP_ID = "14669216";
var API_KEY = "Z1hRUxcCGuBiCEKjMCqeUESF";
var SECRET_KEY = "XZBqcpYIOv8PRnoPFZ1FFGoodagMind8";

exports.run = async function() {
    var AipSpeechClient = require("baidu-aip-sdk").speech;

    var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

    var HttpClient = require("baidu-aip-sdk").HttpClient;

    HttpClient.setRequestOptions({timeout: 5000});

    HttpClient.setRequestInterceptor(function(requestOptions) {
        requestOptions.timeout = 5000;
        return requestOptions;
    });



    const filename = 'voice.pcm';
    const type = 'pcm';
    const lang = '1737'; //1536--chinese; 1737--english

    let fs = require('fs');
    let voice = fs.readFileSync(filename);
    let voiceBuffer = new Buffer(voice);

    // 识别本地文件
    return await client.recognize(voiceBuffer, type, 16000, {
        dev_pid: lang, 
    })
}
