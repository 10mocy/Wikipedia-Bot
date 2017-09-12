const twitter = require("twitter");
const wikipedia = require("./wikipedia.js");
const token = require("./token.js");

const bot = new twitter(token.twitter);

writeLog("システム", "準備が整いました。");

bot.stream('user', {}, function(stream) {

    stream.on('data', function(event) {
        
        writeLog("ツイート受信", event.text + " <--- @" + event.user.screen_name);

        const sToha = /^(.*)#とは$/;
        const mToha = /^(.*)\s#とは$/;

        if(sToha.test(event.text)) {
            const word = event.text.match(mToha)[1];
            const search = wikipedia.search(word);
            let result;

            if(search !== null) {
                writeLog("Wikipedia", "「" + word + "」のWikipediaページが見つかりました。");
                result = search.substr(0, 101) + "\n" + "https://ja.wikipedia.org/wiki/" + encodeURIComponent(word);
            } else {
                writeLog("Wikipedia", "Wikipediaに「" + word + "」というページは存在しません。");
                result = "Wikipediaにそのページは存在しません。";
            }
            sendMessage(result, event.id_str, event.user.screen_name);
        }

    });

    stream.on('error', function(error) {
        throw error;
    });
});

function sendMessage(text, replyid, screen_name) {
    bot.post('statuses/update', {
        status: "@" + screen_name + " " + text, 
        in_reply_to_status_id: replyid
    })
        .then(function (tweet) {
            writeLog("ツイート送信", text + " ---> @" + screen_name);
        })
        .catch(function (error) {
            throw error;
        });
}

function writeLog(title, detail) {
    console.log("-----\n"+ title + "\n\n    " + detail + "\n");
}
