

const fs = require('fs');
const { execSync } = require('child_process');
const codePath = '/Applications/Visual\\ Studio\\ Code\\ 2.app/Contents/Resources/app/bin/code';
const chromePath = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome';
const webpage = "file:///Users/liupai/FridaStation/voiceassistor/asset/index.html";



let command = `${codePath} .`;
execSync(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});




command = `${codePath} index.html`;
execSync(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });



//edit file
var writeStream = fs.createWriteStream("index.html");
writeStream.write("hello frida");
writeStream.write("Thank You.");
writeStream.end();


setTimeout(()=>{
    var writeStream = fs.createWriteStream("index.html");
    writeStream.write("\nhi");
    writeStream.end();

    setTimeout(()=>{
        command = `${chromePath} ${webpage}`;
        execSync(command, (error, stdout, stderr) => {
            if (error) {
            console.error(`exec error: ${error}`);
            return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }, 2000)    
    
}, 2000)


