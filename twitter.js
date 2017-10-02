/*eslint no-console: ['error', { allow: ['log'] }] */

'use strict';

const twitter = require('twitter');
const wikipedia = require('./wikipedia.js');
const token = require('./token.js');

const bot = new twitter(token.twitter);

const writeLog = (title, detail) => {
	console.log('-----\n'+ title + '\n\n    ' + detail + '\n');
};


const sendMessage = (text, replyid, screen_name) => {
	bot.post('statuses/update', {
		status: '@' + screen_name + ' ' + text, 
		in_reply_to_status_id: replyid
	})
	// tweet variable never used(yet).
		.then(() => {
			writeLog('ツイート送信', text + ' ---> @' + screen_name);
		})
		.catch((error) => {
			throw error;
		});
};

const extract = (tweet) => {
	const sToha = /^(.*)#とは$/;
	const mToha = /^(.*)\s#とは$/;

	if(sToha.test(tweet)) {
		const messagetext = tweet.match(mToha);
		if(1 in messagetext) return messagetext[1];
	}
	return null;
};

const generateTweet = (word, search) => {
	if(search !== null) {
		writeLog('Wikipedia', '「' + word + '」のWikipediaページが見つかりました。');
		const result = search.substr(0, 101) + '\n' + 'https://ja.wikipedia.org/wiki/' + encodeURIComponent(word);
		return result;         
	} else {
		writeLog('Wikipedia', 'Wikipediaに「' + word + '」というページは存在しません。');
		const result = 'Wikipediaにそのページは存在しません。';
		return result;
	}
};

writeLog('システム', '準備が整いました。');

bot.stream('user', {}, (stream) => {

	stream.on('data', (event) => {
        
		if(event.retweeted_status) {
			writeLog('RTフィルタ', 'リツイートのためスキップ');
			return;
		}
        
		const word = extract(event.text);
		if (word != null) {
			writeLog('ツイート受信', event.text + ' <--- @' + event.user.screen_name);            
			const search = wikipedia.search(word);
			const tweet = generateTweet(word, search);
			sendMessage(tweet, event.id_str, event.user.screen_name);    
		}
	});

	stream.on('error', (error) => {
		throw error;
	});
});

// テスト用
exports.extract = extract;
