const Discord = require("discord.js");
const Token = require("token.js");
const token = new token();
const client = new Discord.Client();

client.login(token);

client.on("ready", () => {
    writeLog("システム", "準備が整いました。");
});

client.on("message", message => {
    const sender = message.member;
    if(sender.id !== "356430678684073986") {
        writeLog("メッセージ受信", message.content + " <--- " + sender.user.tag + "(#" + message.channel.name + " << " + message.guild.name + ")");
    }
});
function sendMessage(channel, message) {
    writeLog("メッセージ送信", message + " ---> #" + channel.name);
    channel.send(message);
}

function writeLog(title, detail) {
    console.log("-----\n"+ title + "\n\n    " + detail + "\n");
}