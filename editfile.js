

const fs = require('fs');

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

let filename = 'bootstrap-3.3.7/docs/examples/dashboard/index.html';
let line = process.argv[2];
let content = process.argv[3];

var data = fs.readFileSync(filename, 'utf8');
let arr = data.split('\n')
arr[line-1] = content;

let newContent = arr.join('\n')
console.log(newContent)


var writeStream = fs.createWriteStream(filename);
writeStream.write(newContent);
writeStream.end();