const twitter = require("twitter");
const wikipedia = require("./wikipedia.js");
const token = require("./token.js");

const bot = new twitter(token.twitter);

writeLog("システム", "準備が整いました。");

bot.stream('user', {}, function(stream) {

    stream.on('data', function(event) {
        
        writeLog("ツイート受信", event.text + " <--- @" + event.user.screen_name);
        
        const toha = /^(.*)#とは$/;
        if(toha.test(event.text)) {
            const word = event.text.match(toha)[1];
            const search = wikipedia.search(word);
            let result;

            if(search !== null) {
                result = search.substr(0, 101) + "\n" + "https://ja.wikipedia.org/wiki/" + encodeURIComponent(word);
            } else {
                result = "Wikipediaにそのページは存在していません。";
            }
            sendMessage(result, event.id);
        }

    });

    stream.on('error', function(error) {
        throw error;
    });
});

function sendMessage(text, screen_name, replyid) {
    bot.post('statuses/update', {
        status: text, 
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
