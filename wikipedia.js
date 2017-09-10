const Discord = require("discord.js");
const https = require("https");
/*const Token = require("token.js");
const token = new token();*/
const client = new Discord.Client();

client.login("MzU2NDMwNjc4Njg0MDczOTg2.DJbPdA.IsGc_lcbBh9nysa8bokBzHFEw2o");
client.on("ready", () => {
    writeLog("システム", "準備が整いました。");
});

client.on("message", message => {
    const sender = message.member;
    if(sender.id !== "356430678684073986") {
        writeLog("メッセージ受信", message.content + " <--- " + sender.user.tag + "(#" + message.channel.name + " << " + message.guild.name + ")");
        
        const toha = /^(.*)[\s　]#とは$/;
        if(toha.test(message.content)) {
            const word = message.content.match(toha)[1];
            const url = "https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&redirects=1&explaintext=1&titles=" + word;
            let content = "";
            let data;
            let temp_wikiinfo;
            let wikiinfo;

            https.get(url, (res) => {
                res.setEncoding("utf8");

                res.on("data", (chunk) => {
                    content += chunk;
                });

                res.on("end", (res) => {
                    data = JSON.parse(content);
                    for(key in data.query.pages) {
                        temp_wikiinfo = data["query"]["pages"][key]["extract"];
                        wikiinfo = temp_wikiinfo.match(/(.*。)/)[1];
                        console.log(wikiinfo);
                    }
                    sendMessage(message.channel,
                        {
                            embed: {
                                title: "「" + word + "」の定義",
                                description: wikiinfo,
                                color: 16726072,
                                url: "https://ja.wikipedia.org/wiki/" + word
                            }
                        }
                    );

                });
            });

        }
    }
});
function sendMessage(channel, message) {
    writeLog("メッセージ送信", message + " ---> #" + channel.name);
    channel.send(message);
}

function writeLog(title, detail) {
    console.log("-----\n"+ title + "\n\n    " + detail + "\n");
}

function replace(source, replacers) {
    let replaced = source;
    for(const replacer of replacers) {
        replaced = replaced.replace(replacer[0], replacer[1]);
    }
    return replaced;
}