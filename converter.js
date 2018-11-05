const { execSync } = require('child_process');

const ffmpegPath = '/Applications/ffmpeg';
exports.run = function(wavFile) {
    const command1 = `${ffmpegPath} -y  -i ${wavFile}  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 voice.pcm `;
    execSync(command1, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};