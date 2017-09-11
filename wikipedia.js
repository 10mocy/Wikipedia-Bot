const Discord = require("discord.js");
const https = require("https");
const client = new Discord.Client();

client.login("");
client.on("ready", () => {
    writeLog("システム", "準備が整いました。");
});

client.on("message", message => {
    let sender;
    let suffix;
    const channel = message.channel;
    
    if(channel.type === "dm") {
        sender = channel.lastMessage.author;
        suffix = sender.tag + "(ダイレクトメッセージ)";
    } else if(channel.type === "text") {
        sender = message.member;
        suffix = sender.tag + "(#" + channel.name + " << " + message.guild.name + ")";
    }

    if(sender.id !== "356430678684073986") {

        writeLog("メッセージ受信", message.content + " <--- " + suffix);
        const toha = /^(.*)[\s　]#とは$/;

        if(toha.test(message.content)) {
            let word = message.content.match(toha)[1];
            word = word.replace(/[\s　]/g, "");
            const url = "https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&redirects=1&explaintext=1&titles=" + encodeURIComponent(word);
            let content = "";
            let data;
            let wikiinfo;

            https.get(url, (res) => {
                res.setEncoding("utf8");

                res.on("data", (chunk) => {
                    content += chunk;
                });

                res.on("end", (res) => {
                    data = JSON.parse(content);
                    if(-1 in data.query.pages) {
                        
                        writeLog("Wikipedia", "Wikipediaに「" + word + "」というページは存在しません。");
                        sendMessage(channel, 
                            {
                                embed: {
                                    title: "Wikipediaに「" + word + "」というページは存在しません。",
                                    color: 16726072
                                }
                            },
                            suffix
                        );

                    } else {

                        for(key in data.query.pages) {
                            wikiinfo = data["query"]["pages"][key]["extract"].split(/。/);
                        }

                        writeLog("Wikipedia", "「" + word + "」のWikipediaページが見つかりました。");
                        sendMessage(channel,
                            {
                                embed: {
                                    title: "「" + word + "」の定義",
                                    description: wikiinfo[0] + "。",
                                    url: "https://ja.wikipedia.org/wiki/" + word
                                }
                            },
                            suffix
                        );

                    }
                });
            });

        }
    }
});

function sendMessage(channel, message, suffix) {
    writeLog("メッセージ送信", message + " ---> " + suffix);
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