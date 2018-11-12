

const fs = require('fs');
const { execSync } = require('child_process');
const codePath = '/Applications/Visual\\ Studio\\ Code\\ 2.app/Contents/Resources/app/bin/code';
const chromePath = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome';
const webpage = "file:///Users/liupai/FridaStation/voiceassistor/bootstrap-3.3.7/docs/examples/dashboard/index.html";

var async = require('async');

const cmdActMapping = [{
  cmd: '打开.*',//打开VS扣的，
  acts: [
  //   {

  //   act: `cd asset`,
  //   delay: 2000
  // },
  {
    act:`${codePath} bootstrap-3.3.7/docs/examples/dashboard/index.html`, 
    delay: 0
  }],
},{
  cmd: '[第,d,b](\\d+)[行,航]改[为,成](.*)',
  acts: [{
    act: `node editfile.js $1 $2`,//第84行改为你好语音助手 //第112行改为今天单某要好好表现哦，
    delay: 0 
  },{
    act:`${codePath} -g bootstrap-3.3.7/docs/examples/dashboard/index.html:$1`, 
    delay:0
  }]
},{
  cmd:'[执运]行',
  acts:[{
    act:`${chromePath} ${webpage}`,//运行
    delay:0
  }]
}]


exports.run = async function(command) {
  let _cmdActMapping = JSON.parse(JSON.stringify(cmdActMapping));
  let mapItem = _cmdActMapping.find((item)=>{
    let cmd = item.cmd;

    let reg = new RegExp(cmd);
    if(reg.test(command)){
      let result = reg.exec(command);
      if(result.length ==3){
        item.acts[0].act = item.acts[0].act.replace('$1', result[1]).replace('$2', result[2]);
        item.acts[1].act = item.acts[1].act.replace('$1', result[1]);
      }
        
      return true;
    }
  });
  let acts = mapItem.acts;


  console.log('=========')
  console.log(command);
  console.log(acts);

  let tasks = [];
  acts.map((item)=>{
    tasks.push((callback)=>{
      execSync(item.act, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
      setTimeout(callback, item.delay)
    })
  })
  

  async.series(tasks, function(err,result){
    if(err) return console.log(err);
  });
  
}




// //edit file
// var writeStream = fs.createWriteStream("index.html");
// writeStream.write("hello frida");
// writeStream.write("Thank You.");
// writeStream.end();


// setTimeout(()=>{
//     var writeStream = fs.createWriteStream("index.html");
//     writeStream.write("\nhi");
//     writeStream.end();

//     setTimeout(()=>{
//         
//         execSync(command, (error, stdout, stderr) => {
//             if (error) {
//             console.error(`exec error: ${error}`);
//             return;
//             }
//             console.log(`stdout: ${stdout}`);
//             console.log(`stderr: ${stderr}`);
//         });
//     }, 2000)    
    
// }, 2000)


// }


